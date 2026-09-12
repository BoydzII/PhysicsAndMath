class DrawingEngine {
  constructor(canvasId) {
    this.topic = 'work'; // default topic
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    
    this.isDrawing = false;
    this.currentTool = 'pen'; // 'pen', 'eraser', 'highlight'
    this.currentColor = '#000000';
    this.baseLineWidth = 2.5;
    this.lineWidth = 2.5;
    this.eraserWidth = 32;
    this.highlightWidth = 20;

    // Drawing settings
    this.penOnlyMode = false; // When true, only pen/stylus draws; when false, touch draws too

    // Undo & Redo History (stores lightweight offscreen canvas snapshots)
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 25;

    this.points = [];
    this.prevMid = null;

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
      this.ctx.globalCompositeOperation = 'multiply'; // GoodNotes style highlighter
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.fillStyle = this.currentColor;
      this.ctx.lineWidth = this.highlightWidth;
      this.ctx.globalAlpha = 0.45; // Vibrant and legible
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
    this.updateCtx();
  }

  setColor(color) {
    this.currentColor = color;
    if (this.currentTool === 'eraser') {
      this.currentTool = 'pen';
    }
    this.updateCtx();
  }

  setSize(size) {
    this.baseLineWidth = Number(size);
    this.lineWidth = Number(size);
    this.updateCtx();
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

    this.activePointers = new Set();

    const startDraw = (e) => {
      if (e.button === 2) return;
      // Auto palm-rejection: If pen is in use, ignore touches; otherwise allow single finger/stylus
      if (this.penOnlyMode && e.pointerType === 'touch') return;

      this.activePointers.add(e.pointerId);
      if (this.activePointers.size > 1) {
        if (this.isDrawing) {
          this.isDrawing = false;
          this.points = [];
          this.prevMid = null;
          this.undo();
        }
        return;
      }

      this.isDrawing = true;
      this.pushUndoState();
      this.cachedRect = this.canvas.getBoundingClientRect();

      const pos = this.getPointerPos(e);
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
      if (!this.isDrawing || this.activePointers.size > 1) return;
      const pos = this.getPointerPos(e);
      this.points.push(pos);

      const p = (e.pressure && e.pressure > 0) ? e.pressure : 0.5;
      if (this.currentTool === 'pen') {
        this.ctx.lineWidth = this.baseLineWidth * (0.8 + p * 0.7);
      }

      // Fast Incremental Bézier Midpoint Rendering (120 FPS, Zero putImageData lag)
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
        this.undo();
      }
    };

    this.canvas.addEventListener('pointerdown', startDraw);
    this.canvas.addEventListener('pointermove', draw);
    this.canvas.addEventListener('pointerup', stopDraw);
    this.canvas.addEventListener('pointercancel', cancelDraw);
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
