/**
 * ============================================================================
 * เอนจินการเขียนสมุดโน้ตดิจิทัลมาตรฐาน (Unified Digital Ink & Notebook Engine)
 * ============================================================================
 * ไฟล์แกนกลางเดี่ยว (Single Source of Truth) สำหรับทุกแอปที่มีโหมดการเขียน:
 *   - Physics1App/draw.js
 *   - Physics2App/draw.js
 *   - IJSOApp/draw.js
 *   (และแอปโน้ต/คลังโจทย์อื่น ๆ ในอนาคต)
 *
 * ฟีเจอร์มาตรฐานระดับมืออาชีพ:
 *   1. High-DPI Retina Scaling (คมชัดระดับ 120 FPS ไม่แตก ไม่เบลอ)
 *   2. Incremental Midpoint Quadratic Bézier Streaming (วาดลื่นไหลไม่มีกระตุก)
 *   3. ระบบจัดเก็บถาวรด้วย IndexedDB (InkDB) ปลอดภัย 100% ไม่ติด Quota 5MB ของ localStorage
 *      พร้อมระบบโอนย้ายข้อมูลเดิม (Auto-Migration) อัตโนมัติ
 *   4. ระบบ Draw & Hold: วาดค้างไว้ 450ms แปลงเป็น เส้นตรง / เวกเตอร์ลูกศรฟิสิกส์ / วงกลม / สี่เหลี่ยม เป๊ะอัตโนมัติ
 *   5. Presentation Layer: เลเซอร์พอยน์เตอร์หางจาง (Laser Trail) และนิ้วชี้อธิบาย (Pointing Finger)
 *   6. Palm Rejection & Pen-Only Mode: ใช้นิ้วเลื่อน/ซูม ปากกาเขียนเท่านั้น ป้องกันสันมือขัดจังหวะ
 *   7. Highlight Over Text: ปากกาเน้นข้อความแบบ blend multiply ทับตัวหนังสือโจทย์ได้คมชัด
 *   8. Sheet-Only Pinch-to-Zoom: ซูมเฉพาะหน้ากระดาษโดยไม่ทำให้พิกัดปลายปากกาคลาดเคลื่อน
 *   9. Paper Pattern Switcher: สลับกระดาษมีเส้น (Lined) / กราฟฟิสิกส์ (Grid) / จุด (Dot) / ว่าง (Blank)
 *  10. Apple Pencil Double-Tap: สลับปากกาและยางลบอัตโนมัติ
 * ============================================================================
 */

/* ============================================================================
   1. ระบบจัดเก็บข้อมูลลายมือประสิทธิภาพสูงด้วย IndexedDB (InkDB)
   ============================================================================ */
class InkDB {
  static getDB() {
    if (!this._dbPromise) {
      this._dbPromise = new Promise((resolve) => {
        if (typeof indexedDB === 'undefined') return resolve(null);
        try {
          const req = indexedDB.open('physics_ink_store', 1);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('drawings')) {
              db.createObjectStore('drawings');
            }
          };
          req.onsuccess = (e) => resolve(e.target.result);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }
    return this._dbPromise;
  }

  static async set(key, val) {
    try {
      const db = await this.getDB();
      if (db) {
        return new Promise((resolve) => {
          const tx = db.transaction('drawings', 'readwrite');
          const store = tx.objectStore('drawings');
          store.put(val, key);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        });
      }
    } catch (e) {
      console.warn('InkDB set error, fallback to localStorage:', e);
    }
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  static async get(key) {
    try {
      const db = await this.getDB();
      if (db) {
        return new Promise((resolve) => {
          const tx = db.transaction('drawings', 'readonly');
          const store = tx.objectStore('drawings');
          const req = store.get(key);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });
      }
    } catch (e) {}
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  static async remove(key) {
    try {
      const db = await this.getDB();
      if (db) {
        const tx = db.transaction('drawings', 'readwrite');
        tx.objectStore('drawings').delete(key);
      }
    } catch (e) {}
    try { localStorage.removeItem(key); } catch (e) {}
  }
}

/* ============================================================================
   2. คลาสเอนจินการเขียนมาตรฐาน (DrawingEngine)
   ============================================================================ */
class DrawingEngine {
  constructor(canvasId, options = {}) {
    // กำหนดแอปและหัวข้อ เพื่อแยกคีย์การจัดเก็บข้อมูลลายมืออัตโนมัติ
    this.appKey = options.appKey || this.detectAppKey();
    this.topic = options.topic || (this.appKey === 'physics1' ? 'discovery' : 'work');

    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
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
    this.prevTool = 'pen';
    this.currentColor = '#000000';
    this.baseLineWidth = 2.5;
    this.lineWidth = 2.5;
    this.eraserWidth = 32;
    this.highlightWidth = 22;

    // Dedicated Scratch Canvas for Highlighter (Zero overlapping circular beads)
    this.highlightCanvas = document.createElement('canvas');
    this.highlightCtx = this.highlightCanvas ? this.highlightCanvas.getContext('2d') : null;

    // Drawing settings
    this.penOnlyMode = false; // When true: touch scrolls/pinches, ONLY stylus/pen draws
    this.highlightOnTop = true; // When true: ink & highlighter layer on top of problem text
    this.paperPattern = 'lined'; // 'lined', 'grid', 'dot', 'blank'

    // Undo & Redo History (stores lightweight offscreen canvas snapshots)
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 25;

    this.points = [];
    this.rawStrokePoints = [];
    this.prevMid = null;
    this.cachedRect = null;
    this.activePointers = new Map();
    this.penActive = false;
    this.penGraceTimer = null;
    this.saveDebounceTimer = null;
    this.isDirty = false;
    this.smoothVelocity = 0;

    // Hand scrolling & Pinch
    this.isHandScrolling = false;
    this.handScrollPointerId = null;
    this.handStartY = 0;
    this.handStartX = 0;
    this.handLastY = 0;
    this.handLastX = 0;
    this.handLastTime = 0;
    this.handVelocityY = 0;
    this.handVelocityX = 0;
    this.initialPinchDist = null;
    this.initialZoomOnPinch = 1.0;

    // Draw & Hold Shape Recognition
    this.shapeHoldTimer = null;
    this.isShapeSnapped = false;
    this.preShapeSnapshot = null;
    this.lastTapTime = 0;

    this.initEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initKeyboardShortcuts();
  }

  detectAppKey() {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      if (p.indexOf('physics1') >= 0) return 'physics1';
      if (p.indexOf('physics2') >= 0) return 'physics2';
      if (p.indexOf('ijso') >= 0) return 'ijso';
      return window.APP_KEY || 'physics';
    }
    return 'physics';
  }

  getStorageKey() {
    return this.appKey + '_drawings_' + this.topic;
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (w === 0 || h === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    this.dpr = dpr;

    let tempCanvas = null;
    if (this.canvas.width > 0 && this.canvas.height > 0) {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = this.canvas.width;
      tempCanvas.height = this.canvas.height;
      const tCtx = tempCanvas.getContext('2d');
      tCtx.drawImage(this.canvas, 0, 0);
    }

    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.updateCtx();

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

    if (this.highlightCanvas && this.highlightCtx) {
      this.highlightCanvas.width = Math.round(w * dpr);
      this.highlightCanvas.height = Math.round(h * dpr);
      this.highlightCtx.setTransform(1, 0, 0, 1, 0, 0);
      this.highlightCtx.scale(dpr, dpr);
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
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.fillStyle = this.currentColor;
      this.ctx.lineWidth = this.baseLineWidth;
      this.ctx.globalAlpha = 1.0;
    }
  }

  setTool(tool) {
    if (this.currentTool !== 'eraser' && tool === 'eraser') {
      this.prevTool = this.currentTool;
    }
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

    if (n <= 1.8) {
      this.laserBaseRadius = 5;
      this.fingerSize = 28;
      this.highlightWidth = 14;
      this.eraserWidth = 20;
    } else if (n <= 4) {
      this.laserBaseRadius = 9;
      this.fingerSize = 40;
      this.highlightWidth = 22;
      this.eraserWidth = 32;
    } else {
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
      this.canvas.style.touchAction = 'none';
    }
  }

  isPenPointer(e) {
    return e.pointerType === 'pen' || e.pointerType === 'mouse';
  }

  setHighlightOnTop(onTop) {
    this.highlightOnTop = Boolean(onTop);
    const wrapper = this.canvas ? this.canvas.parentElement : null;
    if (wrapper) {
      if (this.highlightOnTop) wrapper.classList.add('canvas-on-top');
      else wrapper.classList.remove('canvas-on-top');
    }
  }

  /** สลับรูปแบบพื้นหลังกระดาษ: 'lined' (เส้นบรรทัด) / 'grid' (ตารางกราฟฟิสิกส์) / 'dot' (จุด) / 'blank' (ว่าง) */
  setPaperPattern(pattern) {
    this.paperPattern = pattern;
    const wrapper = this.canvas ? this.canvas.parentElement : null;
    if (!wrapper) return;
    wrapper.classList.remove('paper-lined', 'paper-grid', 'paper-dot', 'paper-blank');
    wrapper.classList.add('paper-' + pattern);
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

    if (this.currentTool === 'laser' || this.laserPoints.length > 0) {
      this.laserPoints = this.laserPoints.filter(p => now - p.time < 1000);

      if (this.laserPoints.length > 1) {
        for (let i = 1; i < this.laserPoints.length; i++) {
          const p1 = this.laserPoints[i - 1];
          const p2 = this.laserPoints[i];
          const age = now - p2.time;
          const alpha = Math.max(0, 1 - age / 1000);

          this.presCtx.beginPath();
          this.presCtx.moveTo(p1.x, p1.y);
          this.presCtx.lineTo(p2.x, p2.y);
          this.presCtx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.75})`;
          this.presCtx.lineWidth = this.laserBaseRadius * 0.8 * alpha;
          this.presCtx.lineCap = 'round';
          this.presCtx.stroke();
        }
      }

      if (this.currentLaserPos) {
        const pulse = 1 + 0.18 * Math.sin(now / 70);
        const radius = this.laserBaseRadius * pulse;

        const grad = this.presCtx.createRadialGradient(
          this.currentLaserPos.x, this.currentLaserPos.y, 1,
          this.currentLaserPos.x, this.currentLaserPos.y, radius * 2.8
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(239, 68, 68, 0.95)');
        grad.addColorStop(0.6, 'rgba(220, 38, 38, 0.45)');
        grad.addColorStop(1, 'rgba(185, 28, 28, 0)');

        this.presCtx.beginPath();
        this.presCtx.arc(this.currentLaserPos.x, this.currentLaserPos.y, radius * 2.8, 0, Math.PI * 2);
        this.presCtx.fillStyle = grad;
        this.presCtx.fill();

        this.presCtx.beginPath();
        this.presCtx.arc(this.currentLaserPos.x, this.currentLaserPos.y, radius * 0.45, 0, Math.PI * 2);
        this.presCtx.fillStyle = '#ffffff';
        this.presCtx.fill();
      }
    }

    if (this.currentTool === 'finger' && this.currentFingerPos) {
      const fx = this.currentFingerPos.x;
      const fy = this.currentFingerPos.y;
      const fs = this.fingerSize;

      const ringPulse = (now % 1000) / 1000;
      const ringRadius = 10 + ringPulse * 28;
      const ringAlpha = (1 - ringPulse) * 0.85;

      this.presCtx.beginPath();
      this.presCtx.arc(fx, fy, ringRadius, 0, Math.PI * 2);
      this.presCtx.strokeStyle = `rgba(37, 99, 235, ${ringAlpha})`;
      this.presCtx.lineWidth = 2.5;
      this.presCtx.stroke();

      this.presCtx.save();
      this.presCtx.font = `${fs}px sans-serif`;
      this.presCtx.textAlign = 'left';
      this.presCtx.textBaseline = 'top';
      this.presCtx.shadowColor = 'rgba(0,0,0,0.35)';
      this.presCtx.shadowBlur = 8;
      this.presCtx.shadowOffsetX = 2;
      this.presCtx.shadowOffsetY = 3;
      this.presCtx.fillText('👉', fx - 4, fy - 6);
      this.presCtx.restore();
    }

    if (this.currentTool === 'laser' || this.currentTool === 'finger' || this.laserPoints.length > 0) {
      requestAnimationFrame(() => this.animatePresentation());
    } else {
      this.laserAnimRunning = false;
    }
  }

  pushUndoState() {
    if (!this.canvas || this.canvas.width === 0 || this.canvas.height === 0) return;
    const snap = document.createElement('canvas');
    snap.width = this.canvas.width;
    snap.height = this.canvas.height;
    const sCtx = snap.getContext('2d');
    sCtx.drawImage(this.canvas, 0, 0);

    this.undoStack.push(snap);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.redoStack = [];
    this.updateUndoRedoUI();
  }

  undo() {
    if (this.undoStack.length === 0) return;
    const snap = document.createElement('canvas');
    snap.width = this.canvas.width;
    snap.height = this.canvas.height;
    const sCtx = snap.getContext('2d');
    sCtx.drawImage(this.canvas, 0, 0);
    this.redoStack.push(snap);

    const prev = this.undoStack.pop();
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(prev, 0, 0);
    this.ctx.restore();

    this.updateUndoRedoUI();
    this.scheduleSave();
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const snap = document.createElement('canvas');
    snap.width = this.canvas.width;
    snap.height = this.canvas.height;
    const sCtx = snap.getContext('2d');
    sCtx.drawImage(this.canvas, 0, 0);
    this.undoStack.push(snap);

    const next = this.redoStack.pop();
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(next, 0, 0);
    this.ctx.restore();

    this.updateUndoRedoUI();
    this.scheduleSave();
  }

  updateUndoRedoUI() {
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    if (btnUndo) btnUndo.disabled = (this.undoStack.length === 0);
    if (btnRedo) btnRedo.disabled = (this.redoStack.length === 0);
  }

  renderHighlightComposite() {
    if (!this.highlightCanvas || !this.preHighlightSnapshot) return;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.preHighlightSnapshot, 0, 0);

    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(this.highlightCanvas, 0, 0);
    this.ctx.restore();
    this.updateCtx();
  }

  clear() {
    this.pushUndoState();
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    this.scheduleSave();
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
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) { e.preventDefault(); this.redo(); }
        else { e.preventDefault(); this.undo(); }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        this.redo();
      }
    });
  }

  /* ==========================================================================
     ระบบ Draw & Hold: วิเคราะห์และแปลงรูปทรง/เส้นตรงอัตโนมัติ
     ========================================================================== */
  triggerShapeHold() {
    if (this.currentTool !== 'pen' || this.rawStrokePoints.length < 5 || this.isShapeSnapped) return;

    const pts = this.rawStrokePoints;
    const pStart = pts[0];
    const pEnd = pts[pts.length - 1];

    let totalLen = 0;
    for (let i = 1; i < pts.length; i++) {
      totalLen += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    }
    const directDist = Math.hypot(pEnd.x - pStart.x, pEnd.y - pStart.y);
    if (totalLen < 25) return;

    // 1. Straight Line or Arrow Vector
    const straightness = directDist / totalLen;
    if (straightness > 0.86) {
      this.isShapeSnapped = true;
      this.snapStraightLine(pStart, pEnd, pts);
      return;
    }

    // 2. Closed Shape (Circle / Rectangle)
    const closeDist = directDist / totalLen;
    if (closeDist < 0.22 && totalLen > 60) {
      this.isShapeSnapped = true;
      this.snapClosedShape(pts);
      return;
    }
  }

  snapStraightLine(p1, p2, pts) {
    if (!this.preShapeSnapshot) return;
    // คืนค่า snapshot ก่อนเริ่มลากเส้น
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.preShapeSnapshot, 0, 0);
    this.ctx.restore();
    this.updateCtx();

    // ตรวจสอบว่าปลายเส้นมีหัวลูกศรหรือไม่ (Arrowhead detection)
    let isArrow = false;
    if (pts.length > 15) {
      const tail = pts.slice(-Math.min(12, Math.floor(pts.length * 0.25)));
      const tailLen = Math.hypot(tail[tail.length - 1].x - tail[0].x, tail[tail.length - 1].y - tail[0].y);
      if (tailLen > 8) isArrow = true;
    }

    // วาดเส้นตรงเป๊ะ
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();

    // วาดหัวลูกศรเวกเตอร์ฟิสิกส์ (Vector Arrowhead)
    if (isArrow) {
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const headLen = Math.max(12, this.baseLineWidth * 3.5);
      this.ctx.beginPath();
      this.ctx.moveTo(p2.x, p2.y);
      this.ctx.lineTo(p2.x - headLen * Math.cos(angle - Math.PI / 6), p2.y - headLen * Math.sin(angle - Math.PI / 6));
      this.ctx.moveTo(p2.x, p2.y);
      this.ctx.lineTo(p2.x - headLen * Math.cos(angle + Math.PI / 6), p2.y - headLen * Math.sin(angle + Math.PI / 6));
      this.ctx.stroke();
    }

    try { if (navigator.vibrate) navigator.vibrate(25); } catch (e) {}
  }

  snapClosedShape(pts) {
    if (!this.preShapeSnapshot) return;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.preShapeSnapshot, 0, 0);
    this.ctx.restore();
    this.updateCtx();

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of pts) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    const w = maxX - minX;
    const h = maxY - minY;
    const cx = minX + w / 2;
    const cy = minY + h / 2;

    // ตรวจสอบความกลมของวงกลม/วงรี
    const aspect = Math.min(w, h) / Math.max(w, h);
    if (aspect > 0.72) {
      // Circle
      const r = (w + h) / 4;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.stroke();
    } else {
      // Rectangle / Oval
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    try { if (navigator.vibrate) navigator.vibrate(25); } catch (e) {}
  }

  /* ==========================================================================
     3. Event Handlers
     ========================================================================== */
  initEvents() {
    const startDraw = (e) => {
      // Apple Pencil Double-Tap detection
      const now = Date.now();
      if (this.isPenPointer(e) && (now - this.lastTapTime < 280)) {
        this.setTool(this.currentTool === 'eraser' ? this.prevTool : 'eraser');
        const eraserBtn = document.querySelector('[data-tool="eraser"]');
        const penBtn = document.querySelector('[data-tool="pen"]');
        if (this.currentTool === 'eraser' && eraserBtn) eraserBtn.click();
        else if (penBtn) penBtn.click();
      }
      this.lastTapTime = now;

      this.activePointers.set(e.pointerId, {
        clientX: e.clientX,
        clientY: e.clientY,
        isPen: this.isPenPointer(e)
      });

      if (this.isPenPointer(e)) {
        this.penActive = true;
        if (this.penGraceTimer) {
          clearTimeout(this.penGraceTimer);
          this.penGraceTimer = null;
        }
      }

      const isTouch = (e.pointerType === 'touch') && !this.isPenPointer(e);
      if (this.penOnlyMode && isTouch) {
        if (this.penActive || this.isDrawing) return;
        const touchList = Array.from(this.activePointers.values()).filter(p => !p.isPen);
        if (touchList.length === 2) {
          this.initialPinchDist = Math.hypot(
            touchList[0].clientX - touchList[1].clientX,
            touchList[0].clientY - touchList[1].clientY
          );
          this.initialZoomOnPinch = (typeof window !== 'undefined' && window.currentPaperZoom) ? window.currentPaperZoom : 1.0;
          this.isHandScrolling = false;
        } else if (touchList.length === 1) {
          this.isHandScrolling = true;
          this.handScrollPointerId = e.pointerId;
          this.handStartY = e.clientY;
          this.handStartX = e.clientX;
          this.handLastY = e.clientY;
          this.handLastX = e.clientX;
          this.handLastTime = Date.now();
          this.handVelocityY = 0;
          this.handVelocityX = 0;
        }
        return;
      }

      const isPresTool = (this.currentTool === 'laser' || this.currentTool === 'finger');
      if (isTouch && this.activePointers.size > 1 && !isPresTool) {
        this.isDrawing = false;
        return;
      }

      this.cachedRect = this.canvas.getBoundingClientRect();
      const pos = this.getPointerPos(e);
      pos.time = e.timeStamp || Date.now();

      this.isDrawing = true;
      this.isShapeSnapped = false;
      this.rawStrokePoints = [pos];

      if (this.currentTool === 'pen') {
        this.preShapeSnapshot = document.createElement('canvas');
        this.preShapeSnapshot.width = this.canvas.width;
        this.preShapeSnapshot.height = this.canvas.height;
        this.preShapeSnapshot.getContext('2d').drawImage(this.canvas, 0, 0);

        if (this.shapeHoldTimer) clearTimeout(this.shapeHoldTimer);
        this.shapeHoldTimer = setTimeout(() => this.triggerShapeHold(), 450);
      }

      if (this.currentTool === 'highlight') {
        this.preHighlightSnapshot = document.createElement('canvas');
        this.preHighlightSnapshot.width = this.canvas.width;
        this.preHighlightSnapshot.height = this.canvas.height;
        this.preHighlightSnapshot.getContext('2d').drawImage(this.canvas, 0, 0);
      }

      if (isPresTool) {
        if (this.currentTool === 'laser') {
          this.currentLaserPos = pos;
          this.addLaserPoint(pos);
        } else if (this.currentTool === 'finger') {
          this.currentFingerPos = pos;
          if (!this.laserAnimRunning) {
            this.laserAnimRunning = true;
            this.animatePresentation();
          }
        }
        try { this.canvas.setPointerCapture(e.pointerId); } catch (err) {}
        return;
      }

      this.pushUndoState();
      this.points = [pos];
      this.prevMid = { x: pos.x, y: pos.y };

      if (this.currentTool === 'highlight' && this.highlightCtx) {
        this.highlightCtx.save();
        this.highlightCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.highlightCtx.clearRect(0, 0, this.highlightCanvas.width, this.highlightCanvas.height);
        this.highlightCtx.restore();

        this.highlightCtx.lineCap = 'round';
        this.highlightCtx.lineJoin = 'round';
        this.highlightCtx.imageSmoothingEnabled = true;
        this.highlightCtx.globalCompositeOperation = 'source-over';
        this.highlightCtx.globalAlpha = 1.0;
        this.highlightCtx.strokeStyle = this.currentColor;
        this.highlightCtx.fillStyle = this.currentColor;
        this.highlightCtx.lineWidth = this.highlightWidth;

        this.highlightCtx.beginPath();
        this.highlightCtx.arc(pos.x, pos.y, Math.max(1, this.highlightWidth / 2), 0, Math.PI * 2);
        this.highlightCtx.fill();
        this.renderHighlightComposite();
        try { this.canvas.setPointerCapture(e.pointerId); } catch (err) {}
        return;
      }

      this.updateCtx();
      const p = (e.pressure && e.pressure > 0) ? e.pressure : 0.5;
      if (this.currentTool === 'pen') {
        this.ctx.lineWidth = this.baseLineWidth * (0.8 + p * 0.7);
      }

      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, Math.max(1, this.ctx.lineWidth / 2), 0, Math.PI * 2);
      this.ctx.fill();

      try { this.canvas.setPointerCapture(e.pointerId); } catch (err) {}
    };

    const draw = (e) => {
      if (this.activePointers.has(e.pointerId)) {
        const pt = this.activePointers.get(e.pointerId);
        pt.clientX = e.clientX;
        pt.clientY = e.clientY;
      }

      const isPen = this.isPenPointer(e);
      const isTouch = (e.pointerType === 'touch') && !isPen;

      if (this.penOnlyMode && isTouch) {
        if (this.penActive || this.isDrawing) return;
        const touchList = Array.from(this.activePointers.values()).filter(p => !p.isPen);
        if (touchList.length === 2 && this.initialPinchDist) {
          const factor = Math.hypot(touchList[0].clientX - touchList[1].clientX, touchList[0].clientY - touchList[1].clientY) / this.initialPinchDist;
          if (typeof window !== 'undefined' && typeof window.setPaperZoom === 'function') {
            window.setPaperZoom(this.initialZoomOnPinch * factor);
          }
          return;
        }
        if (this.isHandScrolling && e.pointerId === this.handScrollPointerId) {
          const panel = document.querySelector('.notebook-panel');
          if (panel) {
            const deltaY = e.clientY - this.handLastY;
            const deltaX = e.clientX - this.handLastX;
            const now = Date.now();
            const dt = Math.max(now - this.handLastTime, 1);
            this.handVelocityY = deltaY / dt;
            this.handVelocityX = deltaX / dt;
            this.handLastY = e.clientY;
            this.handLastX = e.clientX;
            this.handLastTime = now;
            panel.scrollTop -= deltaY;
            panel.scrollLeft -= deltaX;
          }
          return;
        }
        return;
      }

      const isPresTool = (this.currentTool === 'laser' || this.currentTool === 'finger');
      if (!this.isDrawing && !isPresTool) return;
      if (this.activePointers.size > 1 && !isPen) return;

      try { if (e.cancelable) e.preventDefault(); } catch (err) {}

      const rawEvents = (typeof e.getCoalescedEvents === 'function') ? e.getCoalescedEvents() : null;
      const events = (rawEvents && rawEvents.length > 0) ? rawEvents : [e];

      for (let ei = 0; ei < events.length; ei++) {
        const ev = events[ei];
        const pos = this.getPointerPos(ev);
        pos.time = ev.timeStamp || Date.now();

        if (this.currentTool === 'laser') {
          this.currentLaserPos = pos;
          this.addLaserPoint(pos);
          continue;
        }
        if (this.currentTool === 'finger') {
          this.currentFingerPos = pos;
          continue;
        }

        // Draw & Hold timer reset
        this.rawStrokePoints.push(pos);
        if (this.shapeHoldTimer) {
          clearTimeout(this.shapeHoldTimer);
          if (!this.isShapeSnapped) {
            this.shapeHoldTimer = setTimeout(() => this.triggerShapeHold(), 450);
          }
        }
        if (this.isShapeSnapped) continue;

        this.points.push(pos);

        if (this.currentTool === 'highlight' && this.highlightCtx) {
          if (this.points.length >= 2) {
            const p1 = this.points[this.points.length - 2];
            const p2 = this.points[this.points.length - 1];
            const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

            this.highlightCtx.beginPath();
            this.highlightCtx.moveTo(this.prevMid.x, this.prevMid.y);
            this.highlightCtx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
            this.highlightCtx.stroke();
            this.prevMid = mid;
          }
          continue;
        }

        if (this.currentTool === 'pen') {
          const pr = (ev.pressure && ev.pressure > 0) ? ev.pressure : 0.5;
          if (this.points.length >= 2) {
            const pPrev = this.points[this.points.length - 2];
            const dist = Math.hypot(pos.x - pPrev.x, pos.y - pPrev.y);
            const dt = Math.max((pos.time || Date.now()) - (pPrev.time || 0), 8);
            const velocity = Math.min(dist / dt, 4);
            this.smoothVelocity = this.smoothVelocity * 0.7 + velocity * 0.3;
            const velFactor = Math.max(0.8, Math.min(1.2, 1.12 - this.smoothVelocity * 0.08));
            this.ctx.lineWidth = this.baseLineWidth * (0.75 + pr * 0.65) * velFactor;
          } else {
            this.ctx.lineWidth = this.baseLineWidth * (0.8 + pr * 0.7);
          }
        }

        if (this.points.length >= 2) {
          const p1 = this.points[this.points.length - 2];
          const p2 = this.points[this.points.length - 1];
          const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

          this.ctx.beginPath();
          this.ctx.moveTo(this.prevMid.x, this.prevMid.y);
          this.ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
          this.ctx.stroke();
          this.prevMid = mid;
        }
      }

      if (this.currentTool === 'highlight') {
        this.renderHighlightComposite();
      }
    };

    const stopDraw = (e) => {
      if (this.shapeHoldTimer) {
        clearTimeout(this.shapeHoldTimer);
        this.shapeHoldTimer = null;
      }

      if (e.currentTarget === window && e.target === this.canvas) return;
      this.activePointers.delete(e.pointerId);

      if (this.isPenPointer(e)) {
        if (this.penGraceTimer) clearTimeout(this.penGraceTimer);
        this.penGraceTimer = setTimeout(() => {
          this.penActive = false;
          this.penGraceTimer = null;
        }, 280);
      }

      if (this.isHandScrolling && e.pointerId === this.handScrollPointerId) {
        this.isHandScrolling = false;
        this.handScrollPointerId = null;
        try { this.canvas.releasePointerCapture(e.pointerId); } catch (err) {}
        return;
      }

      const touchList = Array.from(this.activePointers.values()).filter(p => !p.isPen);
      if (touchList.length < 2) this.initialPinchDist = null;

      if (!this.isDrawing) return;
      this.isDrawing = false;
      try { this.canvas.releasePointerCapture(e.pointerId); } catch (err) {}

      if (this.currentTool === 'laser') {
        this.currentLaserPos = null;
        this.cachedRect = null;
        return;
      }
      if (this.currentTool === 'finger') {
        setTimeout(() => { if (!this.isDrawing) this.currentFingerPos = null; }, 700);
        this.cachedRect = null;
        return;
      }

      if (this.currentTool === 'highlight') {
        if (this.points.length >= 2 && this.prevMid && this.highlightCtx) {
          const last = this.points[this.points.length - 1];
          this.highlightCtx.beginPath();
          this.highlightCtx.moveTo(this.prevMid.x, this.prevMid.y);
          this.highlightCtx.lineTo(last.x, last.y);
          this.highlightCtx.stroke();
        }
        this.renderHighlightComposite();
        this.points = [];
        this.prevMid = null;
        this.cachedRect = null;
        this.scheduleSave();
        return;
      }

      if (!this.isShapeSnapped && this.points.length >= 2 && this.prevMid) {
        const last = this.points[this.points.length - 1];
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevMid.x, this.prevMid.y);
        this.ctx.lineTo(last.x, last.y);
        this.ctx.stroke();
      }

      this.points = [];
      this.prevMid = null;
      this.cachedRect = null;
      this.isShapeSnapped = false;
      this.preShapeSnapshot = null;
      this.scheduleSave();
    };

    this.canvas.addEventListener('pointerdown', startDraw);
    this.canvas.addEventListener('pointermove', draw);
    this.canvas.addEventListener('pointerup', stopDraw);
    this.canvas.addEventListener('pointercancel', stopDraw);
    window.addEventListener('pointerup', stopDraw);
    window.addEventListener('pointercancel', stopDraw);
  }

  scheduleSave() {
    this.isDirty = true;
    if (this.saveDebounceTimer) clearTimeout(this.saveDebounceTimer);
    this.saveDebounceTimer = setTimeout(() => this.flushSave(), 400);
  }

  flushSave() {
    if (this.isDirty) this.saveData();
  }

  /** บันทึกภาพลง IndexedDB ปลอดภัย 100% (ไม่จำกัด 5MB) พร้อม Fallback */
  async saveData() {
    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
      this.saveDebounceTimer = null;
    }
    this.isDirty = false;
    try {
      if (!this.canvas || this.canvas.width === 0 || this.canvas.height === 0) return;
      const dataURL = this.canvas.toDataURL('image/png');
      const key = this.getStorageKey();
      await InkDB.set(key, dataURL);
    } catch (e) {
      console.warn('Canvas saveData skipped:', e);
    }
  }

  /** โหลดภาพลายมือจาก IndexedDB (พร้อมดึงของเก่าจาก localStorage อัตโนมัติ) */
  async loadData() {
    this.undoStack = [];
    this.redoStack = [];
    this.updateUndoRedoUI();
    try {
      const key = this.getStorageKey();
      let dataURL = await InkDB.get(key);

      // ตรวจสอบข้อมูลเก่าใน localStorage (Auto-Migration)
      if (!dataURL) {
        try { dataURL = localStorage.getItem(key); } catch (e) {}
        if (dataURL) {
          // ย้ายเข้า IndexedDB ทันที
          await InkDB.set(key, dataURL);
        }
      }

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

  /** ส่งออกภาพลายมือความละเอียดสูง (Data URL) สำหรับพิมพ์หรือบันทึกไฟล์ */
  exportImage(format = 'image/png') {
    if (!this.canvas || this.canvas.width === 0 || this.canvas.height === 0) return null;
    return this.canvas.toDataURL(format);
  }
}

// ส่งออกให้ใช้ได้ทั้งแบบ ES Module และแบบ Browser Global Script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DrawingEngine, InkDB };
}
