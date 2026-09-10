class DrawingEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    
    this.isDrawing = false;
    this.currentTool = 'pen'; // 'pen' or 'eraser'
    this.currentColor = '#000000';
    this.lineWidth = 2;
    this.eraserWidth = 20;

    // Paths storage for potential undo or redrawing on resize
    this.paths = [];
    this.currentPath = null;

    this.initEvents();
    this.resize();
    
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const parent = this.canvas.parentElement;
    // Save current canvas content
    let data;
    if (this.canvas.width > 0 && this.canvas.height > 0) {
      data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
    
    // Restore styling properties that reset on resize
    this.updateCtx();
    
    // Restore content
    if (data) {
      this.ctx.putImageData(data, 0, 0);
    }
  }

  updateCtx() {
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    if (this.currentTool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineWidth = this.eraserWidth;
    } else {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.lineWidth;
    }
  }

  setTool(tool) {
    this.currentTool = tool;
    this.updateCtx();
  }

  setColor(color) {
    this.currentColor = color;
    if (this.currentTool !== 'eraser') {
      this.currentTool = 'pen';
      this.updateCtx();
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paths = [];
    this.saveData();
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  initEvents() {
    const startDraw = (e) => {
      // Ignore right clicks
      if (e.button === 2) return;
      // Prevent scrolling while drawing on touch devices
      if (e.type === 'touchstart') e.preventDefault();

      this.isDrawing = true;
      const pos = this.getPointerPos(e);
      this.updateCtx();
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
      
      this.currentPath = {
        tool: this.currentTool,
        color: this.currentColor,
        points: [{x: pos.x, y: pos.y}]
      };
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      if (e.type === 'touchmove') e.preventDefault();

      const pos = this.getPointerPos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
      
      if (this.currentPath) {
        this.currentPath.points.push({x: pos.x, y: pos.y});
      }
    };

    const stopDraw = (e) => {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      
      if (this.currentPath) {
        this.paths.push(this.currentPath);
        this.currentPath = null;
        this.saveData();
      }
    };

    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    this.canvas.addEventListener('touchstart', startDraw, { passive: false });
    this.canvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDraw);
  }

  saveData() {
    localStorage.setItem('physics2_drawings', this.canvas.toDataURL());
  }

  loadData() {
    const dataURL = localStorage.getItem('physics2_drawings');
    if (dataURL) {
      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0);
      };
      img.src = dataURL;
    }
  }
}
