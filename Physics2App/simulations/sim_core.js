// sim_core.js - Core Physics Engine and UI Utilities
class SimEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.isRunning = false;
        this.lastTime = 0;
        this.reqId = null;

        // Setup Fullscreen Wrapper
        this.setupFullscreen();
    }

    setupFullscreen() {
        // Create wrapper if not exists
        if (!this.canvas.parentElement.classList.contains('sim-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'sim-wrapper';
            wrapper.style.position = 'relative';
            wrapper.style.width = '100%';
            // Insert wrapper
            this.canvas.parentElement.insertBefore(wrapper, this.canvas);
            wrapper.appendChild(this.canvas);

            // Add Fullscreen Button
            const fsBtn = document.createElement('button');
            fsBtn.innerHTML = '<i class="ph ph-arrows-out-simple"></i>';
            fsBtn.className = 'fs-btn';
            fsBtn.style.position = 'absolute';
            fsBtn.style.top = '8px';
            fsBtn.style.right = '8px';
            fsBtn.style.zIndex = '100';
            fsBtn.style.padding = '8px';
            fsBtn.style.background = 'rgba(255,255,255,0.9)';
            fsBtn.style.border = '1px solid #ccc';
            fsBtn.style.borderRadius = '8px';
            fsBtn.style.cursor = 'pointer';
            fsBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            
            fsBtn.onclick = () => {
                if (!document.fullscreenElement) {
                    wrapper.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else {
                    document.exitFullscreen();
                }
            };
            wrapper.appendChild(fsBtn);

            // Handle Fullscreen changes
            document.addEventListener('fullscreenchange', () => {
                if (document.fullscreenElement === wrapper) {
                    wrapper.style.background = '#f8fafc';
                    wrapper.style.display = 'flex';
                    wrapper.style.alignItems = 'center';
                    wrapper.style.justifyContent = 'center';
                    this.canvas.style.width = '100vmin';
                    this.canvas.style.height = 'auto';
                    fsBtn.innerHTML = '<i class="ph ph-arrows-in-simple"></i>';
                } else {
                    wrapper.style.background = 'transparent';
                    wrapper.style.display = 'block';
                    this.canvas.style.width = '';
                    this.canvas.style.height = '';
                    fsBtn.innerHTML = '<i class="ph ph-arrows-out-simple"></i>';
                }
            });
        }
    }

    start(updateFn, drawFn) {
        if (this.isRunning) return;
        this.isRunning = true;
        this.updateFn = updateFn;
        this.drawFn = drawFn;
        this.lastTime = performance.now();
        this.loop(this.lastTime);
    }

    stop() {
        this.isRunning = false;
        if (this.reqId) cancelAnimationFrame(this.reqId);
    }

    loop(currentTime) {
        if (!this.isRunning) return;
        
        let dt = (currentTime - this.lastTime) / 1000;
        // Cap dt to prevent massive jumps when tab is inactive
        if (dt > 0.1) dt = 0.1;
        this.lastTime = currentTime;

        // Clear and Draw Grid
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawGrid();

        if (this.updateFn) this.updateFn(dt);
        if (this.drawFn) this.drawFn(this.ctx);

        this.reqId = requestAnimationFrame((t) => this.loop(t));
    }

    drawGrid() {
        this.ctx.strokeStyle = '#e2e8f0';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        for (let x = 0; x <= this.width; x += 50) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
        }
        for (let y = 0; x <= this.height; y += 50) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
        }
        this.ctx.stroke();
    }

    // Utility: Draw Vector Arrow
    drawVector(x, y, dx, dy, color = '#ef4444', label = '') {
        const headlen = 10;
        const angle = Math.atan2(dy, dx);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + dx, y + dy);
        this.ctx.lineTo(x + dx - headlen * Math.cos(angle - Math.PI / 6), y + dy - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(x + dx, y + dy);
        this.ctx.lineTo(x + dx - headlen * Math.cos(angle + Math.PI / 6), y + dy - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        if (label) {
            this.ctx.fillStyle = color;
            this.ctx.font = '16px Prompt';
            this.ctx.fillText(label, x + dx + 5, y + dy + 5);
        }
    }

    // Utility: Get Pointer Pos considering CSS zoom
    getPointerPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        // If in fullscreen, zoom doesn't apply the same way, but getBoundingClientRect still works.
        // Wait, window.currentZoom is used in draw.js, we should use it here too if not in fullscreen.
        let zoom = 1;
        if (!document.fullscreenElement && window.currentZoom) {
            zoom = window.currentZoom;
        } else if (document.fullscreenElement) {
            // In fullscreen, the canvas might be scaled via CSS width/height.
            // Calculate scale ratio based on actual rect size vs canvas attribute size
            zoom = rect.width / this.width;
            return {
                x: (e.clientX - rect.left) / zoom,
                y: (e.clientY - rect.top) / zoom
            };
        }
        
        // Non-fullscreen iOS zoom handling
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        return {
            x: (clientX - rect.left) / zoom,
            y: (clientY - rect.top) / zoom
        };
    }
}
window.SimEngine = SimEngine;
