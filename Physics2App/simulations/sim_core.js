// sim_core.js - Core Physics Engine and UI Utilities
class SimEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) { this.ctx = null; return; }
        this.ctx = this.canvas.getContext('2d');

        // Set canvas resolution from CSS layout size
        const cw = this.canvas.clientWidth || 500;
        const ch = this.canvas.clientHeight || 300;
        this.canvas.width = cw;
        this.canvas.height = ch;
        this.width = cw;
        this.height = ch;

        this.isRunning = false;
        this.lastTime = 0;
        this.reqId = null;

        // Setup Fullscreen Wrapper
        this.setupFullscreen();
    }

    setupFullscreen() {
        if (!this.canvas) return;
        // Create wrapper if not exists
        if (!this.canvas.parentElement.classList.contains('sim-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'sim-wrapper';
            wrapper.style.cssText = 'position:relative; width:100%; border-radius:12px; overflow:hidden; background:#f8fafc; border:1px solid #e2e8f0;';
            // Insert wrapper
            this.canvas.parentElement.insertBefore(wrapper, this.canvas);
            wrapper.appendChild(this.canvas);

            // Add Fullscreen Button
            const fsBtn = document.createElement('button');
            fsBtn.innerHTML = '<i class="ph ph-arrows-out-simple"></i>';
            fsBtn.className = 'fs-btn';
            fsBtn.title = 'ขยายเต็มจอ';
            fsBtn.style.cssText = 'position:absolute; top:8px; right:8px; z-index:100; padding:6px 10px; background:rgba(255,255,255,0.92); border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.08); font-size:18px; display:flex; align-items:center; justify-content:center;';

            const self = this;
            fsBtn.onclick = function() {
                if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                    const el = wrapper;
                    if (el.requestFullscreen) {
                        el.requestFullscreen().catch(function(){});
                    } else if (el.webkitRequestFullscreen) {
                        el.webkitRequestFullscreen(); // Safari / iPad
                    }
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                }
            };
            wrapper.appendChild(fsBtn);

            // Handle Fullscreen changes (both standard and webkit)
            var onFsChange = function() {
                var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
                if (fsEl === wrapper) {
                    wrapper.style.background = '#f8fafc';
                    wrapper.style.display = 'flex';
                    wrapper.style.alignItems = 'center';
                    wrapper.style.justifyContent = 'center';
                    wrapper.style.borderRadius = '0';
                    self.canvas.style.width = '90vmin';
                    self.canvas.style.height = '60vmin';
                    // Re-size canvas internal resolution
                    setTimeout(function() {
                        self.canvas.width = self.canvas.clientWidth;
                        self.canvas.height = self.canvas.clientHeight;
                        self.width = self.canvas.width;
                        self.height = self.canvas.height;
                    }, 100);
                    fsBtn.innerHTML = '<i class="ph ph-arrows-in-simple"></i>';
                } else {
                    wrapper.style.display = 'block';
                    wrapper.style.borderRadius = '12px';
                    self.canvas.style.width = '';
                    self.canvas.style.height = '';
                    // Restore canvas resolution
                    setTimeout(function() {
                        var cw2 = self.canvas.clientWidth || 500;
                        var ch2 = self.canvas.clientHeight || 300;
                        self.canvas.width = cw2;
                        self.canvas.height = ch2;
                        self.width = cw2;
                        self.height = ch2;
                    }, 100);
                    fsBtn.innerHTML = '<i class="ph ph-arrows-out-simple"></i>';
                }
            };
            document.addEventListener('fullscreenchange', onFsChange);
            document.addEventListener('webkitfullscreenchange', onFsChange);
        }
    }

    start(updateFn, drawFn) {
        // Stop any existing loop first
        this.stop();
        this.isRunning = true;
        this.updateFn = updateFn;
        this.drawFn = drawFn;
        this.lastTime = performance.now();
        var self = this;
        this.reqId = requestAnimationFrame(function(t) { self.loop(t); });
    }

    stop() {
        this.isRunning = false;
        if (this.reqId) {
            cancelAnimationFrame(this.reqId);
            this.reqId = null;
        }
    }

    loop(currentTime) {
        if (!this.isRunning) return;

        var dt = (currentTime - this.lastTime) / 1000;
        // Cap dt to prevent massive jumps when tab is inactive
        if (dt > 0.1) dt = 0.016;
        this.lastTime = currentTime;

        // Refresh dimensions (in case of resize)
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Clear
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawGrid();

        if (this.updateFn) this.updateFn(dt);
        if (this.drawFn) this.drawFn(this.ctx);

        var self = this;
        this.reqId = requestAnimationFrame(function(t) { self.loop(t); });
    }

    drawGrid() {
        var ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (var x = 0; x <= this.width; x += 50) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
        }
        for (var y = 0; y <= this.height; y += 50) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
        }
        ctx.stroke();
        ctx.restore();
    }

    // Utility: Draw Vector Arrow
    drawVector(x, y, dx, dy, color, label) {
        color = color || '#ef4444';
        label = label || '';
        var len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) return; // Too small to draw
        var headlen = Math.min(12, len * 0.3);
        var angle = Math.atan2(dy, dx);
        var ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';

        // Shaft
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();

        // Arrowhead (filled triangle)
        ctx.beginPath();
        ctx.moveTo(x + dx, y + dy);
        ctx.lineTo(x + dx - headlen * Math.cos(angle - Math.PI / 6), y + dy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x + dx - headlen * Math.cos(angle + Math.PI / 6), y + dy - headlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();

        if (label) {
            ctx.font = 'bold 14px system-ui, sans-serif';
            ctx.fillText(label, x + dx + 6, y + dy - 6);
        }
        ctx.restore();
    }

    // Utility: Draw Rounded Rect
    drawRoundedRect(x, y, w, h, r, fillColor, strokeColor) {
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
        if (strokeColor) { ctx.strokeStyle = strokeColor; ctx.lineWidth = 2; ctx.stroke(); }
        ctx.restore();
    }

    // Utility: Get Pointer Pos considering CSS zoom and fullscreen
    getPointerPos(e) {
        var rect = this.canvas.getBoundingClientRect();
        var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
        var scaleX, scaleY;

        if (fsEl) {
            // In fullscreen: CSS width differs from canvas.width
            scaleX = this.canvas.width / rect.width;
            scaleY = this.canvas.height / rect.height;
        } else {
            // Normal mode: account for CSS zoom
            var zoom = window.currentZoom || 1;
            scaleX = (this.canvas.width / rect.width) / zoom;
            scaleY = (this.canvas.height / rect.height) / zoom;
        }

        var clientX = e.clientX;
        var clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }
}
window.SimEngine = SimEngine;
