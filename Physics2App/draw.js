class DrawingEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    
    this.isDrawing = false;
    this.currentTool = 'pen'; // 'pen', 'eraser', 'highlight'
    this.currentColor = '#000000';
    this.lineWidth = 2;
    this.eraserWidth = 30;
    this.highlightWidth = 16;

    this.paths = [];
    this.currentPath = null;
    this.lastX = 0;
    this.lastY = 0;

    this.initEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const parent = this.canvas.parentElement;
    let data;
    if (this.canvas.width > 0 && this.canvas.height > 0) {
      data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Set actual size in memory (scaled for retina display if needed, but keeping 1:1 for simplicity)
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
      this.ctx.globalAlpha = 0.3;
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

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paths = [];
    this.saveData();
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure || 0.5
    };
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
    let currentStrokePoints = [];

    const startDraw = (e) => {
      if (e.button === 2) return;
      this.isDrawing = true;
      const pos = this.getPointerPos(e);
      
      this.lastX = pos.x;
      this.lastY = pos.y;
      
      // Save canvas state before stroke begins
      savedImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      currentStrokePoints = [{x: pos.x, y: pos.y, p: pos.pressure}];
      
      this.updateCtx();
      this.canvas.setPointerCapture(e.pointerId);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const pos = this.getPointerPos(e);
      currentStrokePoints.push({x: pos.x, y: pos.y, p: pos.pressure});

      // Restore background
      if (savedImageData) {
        this.ctx.putImageData(savedImageData, 0, 0);
      }

      this.ctx.beginPath();
      this.ctx.moveTo(currentStrokePoints[0].x, currentStrokePoints[0].y);

      // Draw the entire current stroke as a single continuous path!
      // This prevents the overlapping "circles" issue with globalAlpha.
      for (let i = 1; i < currentStrokePoints.length; i++) {
        const p1 = currentStrokePoints[i-1];
        const p2 = currentStrokePoints[i];
        
        // Simple line drawing for the single path (we can use quadratic curve but for single path lineTo is fine)
        this.ctx.lineTo(p2.x, p2.y);
      }
      
      // Apply pressure thickness to the whole stroke (using average or max pressure, or just default)
      if (this.currentTool === 'pen' && e.pointerType === 'pen') {
          this.ctx.lineWidth = this.lineWidth * (pos.pressure * 2);
      }
      
      this.ctx.stroke();
    };

    const stopDraw = (e) => {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      this.canvas.releasePointerCapture(e.pointerId);
      savedImageData = null;
      currentStrokePoints = [];
      this.saveData();
    };

    this.canvas.addEventListener('pointerdown', startDraw);
    this.canvas.addEventListener('pointermove', draw);
    this.canvas.addEventListener('pointerup', stopDraw);
    this.canvas.addEventListener('pointercancel', stopDraw);
  }

  saveData() {
    localStorage.setItem('physics2_drawings', this.canvas.toDataURL());
  }

  loadData() {
    const dataURL = localStorage.getItem('physics2_drawings');
    if (dataURL) {
      const img = new Image();
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0);
      };
      img.src = dataURL;
    }
  }
}
