class DrawingEngine {
  constructor(canvasId) {
    this.topic = 'work'; // default topic
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    // Presentation Canvas (Laser Pointer & Pointing Finger)
    this.presCanvas = document.getElementById('presentationCanvas');
    this.presCtx = this.presCanvas ? this.presCanvas.getContext('2d') : null;
    this.laserPoints = [];
    this.laserAnimRunning = false;
    this.currentLaserPos = null;
    this.currentFingerPos = null;
    this.laserBaseRadius = 9;
    this.fingerSize = 40;
    
    this.isDrawing = false;
    this.currentTool = 'pen'; // 'pen', 'eraser', 'highlight', 'laser', 'finger'
    this.currentColor = '#000000';
    this.baseLineWidth = 2.5;
    this.lineWidth = 2.5;
    this.eraserWidth = 32;
    this.highlightWidth = 22;

    // Drawing settings
    this.penOnlyMode = false; // When true: touch scrolls/pinches, ONLY stylus/pen draws
    this.highlightOnTop = true; // When true: ink & highlighter layer on top of problem text

    // Undo & Redo History (stores lightweight offscreen canvas snapshots)
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 25;

    this.points = [];
    this.prevMid = null;
    this.cachedRect = null;
    this.activePointers = new Set();

    this.initEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initKeyboardShortcuts();
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (w === 0 || h === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    this.dpr = dpr;

    // Preserve previous canvas content using offscreen canvas
    let tempCanvas = null;
    if (this.canvas.width > 0 && this.canvas.height > 0) {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = this.canvas.width;
      tempCanvas.height = this.canvas.height;
      const tCtx = tempCanvas.getContext('2d');
      tCtx.drawImage(this.canvas, 0, 0);
    }

    // High-DPI backing store for razor-sharp Retina lines
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.updateCtx();

    // Resize Presentation Canvas synchronously
    if (this.presCanvas) {
      this.presCanvas.width = Math.round(w * dpr);
      this.presCanvas.height = Math.round(h * dpr);
      this.presCanvas.style.width = '100%';
      this.presCanvas.style.height = '100%';
      if (this.presCtx) {
        this.presCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.presCtx.scale(dpr, dpr);
      }
    }

    if (tempCanvas) {
      this.ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width / dpr, tempCanvas.height / dpr);
    } else {
      this.loadData();
    }
  }

  updateCtx() {
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.imageSmoothingEnabled = true;

    if (this.currentTool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineWidth = this.eraserWidth;
      this.ctx.globalAlpha = 1.0;
    } else if (this.currentTool === 'highlight') {
      this.ctx.globalCompositeOperation = 'multiply';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.fillStyle = this.currentColor;
      this.ctx.lineWidth = this.highlightWidth;
      this.ctx.globalAlpha = 0.5;
    } else {
      // Pen: Rich, dark, fully opaque ink
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.fillStyle = this.currentColor;
      this.ctx.lineWidth = this.baseLineWidth;
      this.ctx.globalAlpha = 1.0;
    }
  }

  setTool(tool) {
    this.currentTool = tool;
    if (tool === 'highlight') {
      this.setHighlightOnTop(true);
    }
    if (tool !== 'laser' && tool !== 'finger') {
      this.clearPresentation();
    }
    this.updateCtx();
  }

  setColor(color) {
    this.currentColor = color;
    if (this.currentTool === 'eraser' || this.currentTool === 'laser' || this.currentTool === 'finger') {
      this.currentTool = 'pen';
    }
    this.updateCtx();
  }

  setSize(size) {
    const n = Number(size);
    this.baseLineWidth = n;
    this.lineWidth = n;

    // Adjust laser, finger, and highlighter proportionally
    if (n <= 1.8) {
      // Small
      this.laserBaseRadius = 5;
      this.fingerSize = 28;
      this.highlightWidth = 14;
      this.eraserWidth = 20;
    } else if (n <= 4) {
      // Medium
      this.laserBaseRadius = 9;
      this.fingerSize = 40;
      this.highlightWidth = 22;
      this.eraserWidth = 32;
    } else {
      // Large
      this.laserBaseRadius = 16;
      this.fingerSize = 58;
      this.highlightWidth = 34;
      this.eraserWidth = 48;
    }
    this.updateCtx();
  }

  setPenOnlyMode(enabled) {
    this.penOnlyMode = Boolean(enabled);
    if (this.canvas) {
      this.canvas.style.touchAction = this.penOnlyMode ? 'pan-x pan-y pinch-zoom' : 'none';
    }
  }

  setHighlightOnTop(onTop) {
    this.highlightOnTop = Boolean(onTop);
    const wrapper = this.canvas ? this.canvas.parentElement : null;
    if (wrapper) {
      if (this.highlightOnTop) {
        wrapper.classList.add('canvas-on-top');
      } else {
        wrapper.classList.remove('canvas-on-top');
      }
    }
  }

  clearPresentation() {
    this.laserPoints = [];
    this.currentLaserPos = null;
    this.currentFingerPos = null;
    this.laserAnimRunning = false;
    if (this.presCtx && this.canvas) {
      this.presCtx.clearRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
    }
  }

  addLaserPoint(pos) {
    const now = Date.now();
    this.laserPoints.push({ x: pos.x, y: pos.y, time: now });
    if (!this.laserAnimRunning) {
      this.laserAnimRunning = true;
      this.animatePresentation();
    }
  }

  animatePresentation() {
    if (!this.presCtx || !this.canvas) return;
    const now = Date.now();
    const cw = this.canvas.width / this.dpr;
    const ch = this.canvas.height / this.dpr;
    this.presCtx.clearRect(0, 0, cw, ch);

    // 1. Render Laser Beam & Trail
    if (this.currentTool === 'laser' || this.laserPoints.length > 0) {
      this.laserPoints = this.laserPoints.filter(p => now - p.time < 1000);

      if (this.laserPoints.length > 1) {
        for (let i = 1; i < this.laserPoints.length; i++) {
          const p0 = this.laserPoints[i - 1];
          const p1 = this.laserPoints[i];
          const age = now - p1.time;
          const alpha = Math.max(0, 1 - age / 1000);

          // Outer glowing trail
          this.presCtx.beginPath();
          this.presCtx.moveTo(p0.x, p0.y);
          this.presCtx.lineTo(p1.x, p1.y);
          this.presCtx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.45})`;
          this.presCtx.lineWidth = this.laserBaseRadius * 2.2;
          this.presCtx.lineCap = 'round';
          this.presCtx.lineJoin = 'round';
          this.presCtx.stroke();

          // Hot inner line
          this.presCtx.beginPath();
          this.presCtx.moveTo(p0.x, p0.y);
          this.presCtx.lineTo(p1.x, p1.y);
          this.presCtx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          this.presCtx.lineWidth = this.laserBaseRadius * 0.75;
          this.presCtx.stroke();
        }
      }

      // Glowing tip at current laser position
      if (this.currentLaserPos) {
        const x = this.currentLaserPos.x;
        const y = this.currentLaserPos.y;
        const r = this.laserBaseRadius;

        // Outer glow
        this.presCtx.beginPath();
        this.presCtx.arc(x, y, r * 2.4, 0, Math.PI * 2);
        this.presCtx.fillStyle = 'rgba(239, 68, 68, 0.35)';
        this.presCtx.fill();

        // Red Core
        this.presCtx.beginPath();
        this.presCtx.arc(x, y, r, 0, Math.PI * 2);
        this.presCtx.fillStyle = '#ef4444';
        this.presCtx.shadowColor = '#ef4444';
        this.presCtx.shadowBlur = 12;
        this.presCtx.fill();

        // White Center
        this.presCtx.beginPath();
        this.presCtx.arc(x, y, r * 0.4, 0, Math.PI * 2);
        this.presCtx.fillStyle = '#ffffff';
        this.presCtx.fill();
        this.presCtx.shadowBlur = 0;
      }
    }

    // 2. Render Pointing Finger
    if (this.currentTool === 'finger' && this.currentFingerPos) {
      const x = this.currentFingerPos.x;
      const y = this.currentFingerPos.y;
      const s = this.fingerSize;

      // Target ring
      this.presCtx.beginPath();
      this.presCtx.arc(x, y, s * 0.35, 0, Math.PI * 2);
      this.presCtx.fillStyle = 'rgba(37, 99, 235, 0.18)';
      this.presCtx.fill();
      this.presCtx.strokeStyle = 'rgba(37, 99, 235, 0.8)';
      this.presCtx.lineWidth = 2.5;
      this.presCtx.stroke();

      // Center dot
      this.presCtx.beginPath();
      this.presCtx.arc(x, y, 3.5, 0, Math.PI * 2);
      this.presCtx.fillStyle = '#1d4ed8';
      this.presCtx.fill();

      // Pointing hand 👉
      this.presCtx.font = `${s}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
      this.presCtx.textBaseline = 'middle';
      this.presCtx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      this.presCtx.shadowBlur = 10;
      this.presCtx.shadowOffsetX = 2;
      this.presCtx.shadowOffsetY = 4;
      this.presCtx.fillText('👉', x - s * 0.95, y - s * 0.05);
      this.presCtx.shadowBlur = 0;
    }

    if (this.laserPoints.length > 0 || (this.currentTool === 'laser' && this.currentLaserPos) || (this.currentTool === 'finger' && this.currentFingerPos)) {
      requestAnimationFrame(() => this.animatePresentation());
    } else {
      this.laserAnimRunning = false;
      this.presCtx.clearRect(0, 0, cw, ch);
    }
  }

  pushUndoState() {
    try {
      if (this.canvas.width === 0 || this.canvas.height === 0) return;
      const snapshot = document.createElement('canvas');
      snapshot.width = this.canvas.width;
      snapshot.height = this.canvas.height;
      const sCtx = snapshot.getContext('2d');
      sCtx.drawImage(this.canvas, 0, 0);

      this.undoStack.push(snapshot);
      if (this.undoStack.length > this.maxHistory) {
        this.undoStack.shift();
      }
      this.redoStack = [];
      this.updateUndoRedoUI();
    } catch (e) {
      console.warn('pushUndoState error:', e);
    }
  }

  undo() {
    if (this.undoStack.length === 0) return;
    try {
      const current = document.createElement('canvas');
      current.width = this.canvas.width;
      current.height = this.canvas.height;
      current.getContext('2d').drawImage(this.canvas, 0, 0);
      this.redoStack.push(current);

      const previous = this.undoStack.pop();
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(previous, 0, 0);
      this.ctx.restore();

      this.saveData();
      this.updateUndoRedoUI();
    } catch (e) {
      console.warn('undo error:', e);
    }
  }

  redo() {
    if (this.redoStack.length === 0) return;
    try {
      const current = document.createElement('canvas');
      current.width = this.canvas.width;
      current.height = this.canvas.height;
      current.getContext('2d').drawImage(this.canvas, 0, 0);
      this.undoStack.push(current);

      const next = this.redoStack.pop();
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(next, 0, 0);
      this.ctx.restore();

      this.saveData();
      this.updateUndoRedoUI();
    } catch (e) {
      console.warn('redo error:', e);
    }
  }

  updateUndoRedoUI() {
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    if (btnUndo) {
      btnUndo.disabled = this.undoStack.length === 0;
      btnUndo.style.opacity = this.undoStack.length === 0 ? '0.35' : '1';
    }
    if (btnRedo) {
      btnRedo.disabled = this.redoStack.length === 0;
      btnRedo.style.opacity = this.redoStack.length === 0 ? '0.35' : '1';
    }
  }

  clear(save = true) {
    try {
      if (this.canvas.width > 0 && this.canvas.height > 0) {
        this.pushUndoState();
      }
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.restore();

      if (save) this.saveData();
      this.updateUndoRedoUI();
    } catch (e) {
      console.warn('Canvas clear error:', e);
    }
  }

  getPointerPos(e) {
    const rect = this.cachedRect || this.canvas.getBoundingClientRect();
    const zoom = (typeof window !== 'undefined' && window.currentPaperZoom) ? window.currentPaperZoom : 1;
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
      pressure: e.pressure || 0.5
    };
  }

  initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && (e.key === 'z' || e.key === 'Z')) {
        if (e.shiftKey) {
          e.preventDefault();
          this.redo();
        } else {
          e.preventDefault();
          this.undo();
        }
      } else if (isCmdOrCtrl && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        this.redo();
      }
    });
  }

  initEvents() {
    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => this.resize(), 50);
      });
      this.resizeObserver.observe(this.canvas.parentElement);
    }

    const startDraw = (e) => {
      if (e.button === 2) return;
      
      // Palm Rejection / Pen-Only Mode: When enabled, ignore touch events so finger can scroll & pinch!
      if (this.penOnlyMode && e.pointerType === 'touch') {
        return;
      }

      this.activePointers.add(e.pointerId);
      if (this.activePointers.size > 1) {
        if (this.isDrawing) {
          this.isDrawing = false;
          this.points = [];
          this.prevMid = null;
          if (this.currentTool !== 'laser' && this.currentTool !== 'finger') {
            this.undo();
          }
        }
        return;
      }

      this.isDrawing = true;
      this.cachedRect = this.canvas.getBoundingClientRect();
      const pos = this.getPointerPos(e);

      // Handle Presentation Tools (Laser & Finger)
      if (this.currentTool === 'laser') {
        this.currentLaserPos = pos;
        this.addLaserPoint(pos);
        try { this.canvas.setPointerCapture(e.pointerId); } catch (err) {}
        return;
      }

      if (this.currentTool === 'finger') {
        this.currentFingerPos = pos;
        if (!this.laserAnimRunning) {
          this.laserAnimRunning = true;
          this.animatePresentation();
        }
        try { this.canvas.setPointerCapture(e.pointerId); } catch (err) {}
        return;
      }

      // Normal Ink Drawing
      this.pushUndoState();
      this.points = [pos];
      this.prevMid = { x: pos.x, y: pos.y };
      this.updateCtx();

      // Dynamic pressure line width
      const p = (e.pressure && e.pressure > 0) ? e.pressure : 0.5;
      if (this.currentTool === 'pen') {
        this.ctx.lineWidth = this.baseLineWidth * (0.8 + p * 0.7);
      }

      // Draw initial touch mark (dot)
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, Math.max(1, this.ctx.lineWidth / 2), 0, Math.PI * 2);
      this.ctx.fill();

      try {
        this.canvas.setPointerCapture(e.pointerId);
      } catch (err) {}
    };

    const draw = (e) => {
      const isPresTool = (this.currentTool === 'laser' || this.currentTool === 'finger');
      if (!this.isDrawing && !isPresTool) return;
      if (this.activePointers.size > 1) return;
      const pos = this.getPointerPos(e);

      // Presentation Tools
      if (this.currentTool === 'laser') {
        this.currentLaserPos = pos;
        this.addLaserPoint(pos);
        return;
      }

      if (this.currentTool === 'finger') {
        this.currentFingerPos = pos;
        if (!this.laserAnimRunning) {
          this.laserAnimRunning = true;
          this.animatePresentation();
        }
        return;
      }

      this.points.push(pos);

      const p = (e.pressure && e.pressure > 0) ? e.pressure : 0.5;
      if (this.currentTool === 'pen') {
        this.ctx.lineWidth = this.baseLineWidth * (0.8 + p * 0.7);
      }

      // Fast Incremental Bézier Midpoint Rendering (120 FPS, Zero lag)
      if (this.points.length >= 2) {
        const p1 = this.points[this.points.length - 2];
        const p2 = this.points[this.points.length - 1];
        const mid = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2
        };

        this.ctx.beginPath();
        this.ctx.moveTo(this.prevMid.x, this.prevMid.y);
        this.ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
        this.ctx.stroke();

        this.prevMid = mid;
      }
    };

    const stopDraw = (e) => {
      this.activePointers.delete(e.pointerId);
      if (!this.isDrawing) return;
      this.isDrawing = false;
      try {
        this.canvas.releasePointerCapture(e.pointerId);
      } catch (err) {}

      // Handle Presentation Tools Stop
      if (this.currentTool === 'laser') {
        this.currentLaserPos = null;
        this.cachedRect = null;
        return;
      }

      if (this.currentTool === 'finger') {
        setTimeout(() => {
          if (!this.isDrawing) {
            this.currentFingerPos = null;
          }
        }, 700);
        this.cachedRect = null;
        return;
      }

      // Draw last remaining segment to point
      if (this.points.length >= 2 && this.prevMid) {
        const last = this.points[this.points.length - 1];
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevMid.x, this.prevMid.y);
        this.ctx.lineTo(last.x, last.y);
        this.ctx.stroke();
      }

      this.points = [];
      this.prevMid = null;
      this.cachedRect = null;
      this.saveData();
    };

    const cancelDraw = (e) => {
      this.activePointers.delete(e.pointerId);
      this.cachedRect = null;
      if (this.isDrawing) {
        this.isDrawing = false;
        this.points = [];
        this.prevMid = null;
        if (this.currentTool === 'laser' || this.currentTool === 'finger') {
          this.clearPresentation();
        } else {
          this.undo();
        }
      }
    };

    this.canvas.addEventListener('pointerdown', startDraw);
    this.canvas.addEventListener('pointermove', draw);
    this.canvas.addEventListener('pointerup', stopDraw);
    this.canvas.addEventListener('pointercancel', cancelDraw);
    window.addEventListener('pointerup', stopDraw);
    window.addEventListener('pointercancel', cancelDraw);
    this.canvas.addEventListener('pointerleave', () => {
      if (this.currentTool === 'laser' || this.currentTool === 'finger') {
        if (!this.isDrawing) {
          this.currentLaserPos = null;
          this.currentFingerPos = null;
          this.clearPresentation();
        }
      }
    });
  }

  saveData() {
    try {
      if (!this.canvas || this.canvas.width === 0 || this.canvas.height === 0) return;
      const dataURL = this.canvas.toDataURL('image/png');
      localStorage.setItem('physics2_drawings_' + this.topic, dataURL);
    } catch (e) {
      console.warn('Canvas saveData skipped (quota exceeded):', e);
    }
  }

  loadData() {
    this.undoStack = [];
    this.redoStack = [];
    this.updateUndoRedoUI();
    try {
      const dataURL = localStorage.getItem('physics2_drawings_' + this.topic);
      if (dataURL) {
        const img = new Image();
        img.onload = () => {
          this.ctx.save();
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
          this.ctx.restore();
        };
        img.src = dataURL;
      } else {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
      }
    } catch (e) {
      console.warn('Canvas loadData error:', e);
    }
  }
}