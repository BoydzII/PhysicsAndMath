class DrawingEngine {
  constructor(canvasId) {
    this.topic = 'work'; // default topic
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    
    this.isDrawing = false;
    this.currentTool = 'pen'; // 'pen', 'eraser', 'highlight'
    this.currentColor = '#000000';
    this.baseLineWidth = 2.5;
    this.lineWidth = 2.5;
    this.eraserWidth = 32;
    this.highlightWidth = 18;

    // Undo & Redo History
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 25;

    this.lastX = 0;
    this.lastY = 0;

    this.initEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initKeyboardShortcuts();
  }

  resize() {
    const parent = this.canvas.parentElement;
    let data;
    if (this.canvas.width > 0 && this.canvas.height > 0) {
      data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
    
    this.updateCtx();
    
    if (data) {
      this.ctx.putImageData(data, 0, 0);
    } else {
      this.loadData();
    }
  }

  updateCtx() {
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    if (this.currentTool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineWidth = this.eraserWidth;
      this.ctx.globalAlpha = 1.0;
    } else if (this.currentTool === 'highlight') {
      this.ctx.globalCompositeOperation = 'multiply'; // GoodNotes style highlighter
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.highlightWidth;
      this.ctx.globalAlpha = 0.35;
    } else {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.lineWidth;
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

  pushUndoState(imageData) {
    if (!imageData) return;
    this.undoStack.push(imageData);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.redoStack = []; // Clear redo stack on new action
    this.updateUndoRedoUI();
  }

  undo() {
    if (this.undoStack.length === 0) return;
    const current = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.redoStack.push(current);
    const previous = this.undoStack.pop();
    this.ctx.putImageData(previous, 0, 0);
    this.saveData();
    this.updateUndoRedoUI();
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const current = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.undoStack.push(current);
    const next = this.redoStack.pop();
    this.ctx.putImageData(next, 0, 0);
    this.saveData();
    this.updateUndoRedoUI();
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
    if (this.canvas.width > 0 && this.canvas.height > 0) {
      const current = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.pushUndoState(current);
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (save) this.saveData();
    this.updateUndoRedoUI();
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const zoom = window.currentZoom || 1;
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
      pressure: e.pressure || 0.5
    };
  }

  initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in an input
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

    let savedImageData = null;
    let strokeSnapshot = null;
    let currentStrokePoints = [];

    const startDraw = (e) => {
      if (e.button === 2) return;
      // Palm rejection: Do not draw if it is a touch (finger). Allow pen (Apple Pencil) and mouse.
      if (e.pointerType === 'touch') return;

      this.isDrawing = true;
      const pos = this.getPointerPos(e);
      
      this.lastX = pos.x;
      this.lastY = pos.y;
      
      // Save canvas state before stroke begins
      strokeSnapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      savedImageData = strokeSnapshot;
      currentStrokePoints = [{x: pos.x, y: pos.y, p: pos.pressure}];
      
      this.updateCtx();
      this.canvas.setPointerCapture(e.pointerId);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const pos = this.getPointerPos(e);
      currentStrokePoints.push({x: pos.x, y: pos.y, p: pos.pressure});

      // Restore background before current stroke
      if (savedImageData) {
        this.ctx.putImageData(savedImageData, 0, 0);
      }

      // Apply pressure thickness if stylus
      if (this.currentTool === 'pen' && e.pointerType === 'pen') {
        const pFactor = pos.pressure ? Math.max(0.4, pos.pressure * 1.8) : 1;
        this.ctx.lineWidth = this.baseLineWidth * pFactor;
      }

      if (currentStrokePoints.length < 3) {
        this.ctx.beginPath();
        this.ctx.moveTo(currentStrokePoints[0].x, currentStrokePoints[0].y);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
        return;
      }

      // Quadratic Bézier Smoothing for GoodNotes-style natural ink
      this.ctx.beginPath();
      this.ctx.moveTo(currentStrokePoints[0].x, currentStrokePoints[0].y);
      for (let i = 1; i < currentStrokePoints.length - 1; i++) {
        const midX = (currentStrokePoints[i].x + currentStrokePoints[i + 1].x) / 2;
        const midY = (currentStrokePoints[i].y + currentStrokePoints[i + 1].y) / 2;
        this.ctx.quadraticCurveTo(currentStrokePoints[i].x, currentStrokePoints[i].y, midX, midY);
      }
      const last = currentStrokePoints[currentStrokePoints.length - 1];
      const secondLast = currentStrokePoints[currentStrokePoints.length - 2];
      this.ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);
      this.ctx.stroke();
    };

    const stopDraw = (e) => {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      this.canvas.releasePointerCapture(e.pointerId);
      
      if (strokeSnapshot && currentStrokePoints.length > 1) {
        this.pushUndoState(strokeSnapshot);
      }

      savedImageData = null;
      strokeSnapshot = null;
      currentStrokePoints = [];
      this.saveData();
    };

    this.canvas.addEventListener('pointerdown', startDraw);
    this.canvas.addEventListener('pointermove', draw);
    this.canvas.addEventListener('pointerup', stopDraw);
    this.canvas.addEventListener('pointercancel', stopDraw);
  }

  saveData() {
    localStorage.setItem('physics2_drawings_' + this.topic, this.canvas.toDataURL());
  }

  loadData() {
    this.undoStack = [];
    this.redoStack = [];
    this.updateUndoRedoUI();
    const dataURL = localStorage.getItem('physics2_drawings_' + this.topic);
    if (dataURL) {
      const img = new Image();
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0);
      };
      img.src = dataURL;
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
