// sim_core.js - Core Physics Engine and UI Utilities
//
// ระบบพิกัด: ทุกซิมวาดใน "พิกัดตรรกะ" (engine.width × engine.height)
// - โหมดปกติ: พิกัดตรรกะ = ขนาดจริงบนจอ (px) คูณความคมชัดตาม devicePixelRatio
// - โหมดเต็มจอ: ขยายทั้งฉากด้วย engine.scale (ตัวหนังสือจึงใหญ่ขึ้นตามจอ)
//   และขยายพื้นที่ตรรกะให้เต็มจอ ซิมจึงต้องอ่าน engine.width / engine.height ทุกเฟรม
(function() {
var FONT = "'Sarabun','Prompt','Noto Sans Thai','Leelawadee UI',system-ui,sans-serif";
var active = [];

function fsElement() { return document.fullscreenElement || document.webkitFullscreenElement || null; }

class SimEngine {
    constructor(canvasId, opts) {
        opts = opts || {};
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) { this.ctx = null; return; }

        // หยุดซิมเก่าทั้งหมด (เปลี่ยนหัวข้อแล้ว canvas เดิมถูกลบทิ้ง แต่ลูปยังวิ่งอยู่)
        while (active.length) active.pop().destroy();
        active.push(this);

        this.ctx = this.canvas.getContext('2d');
        this.baseHeight = opts.height || 330;
        this.grid = opts.grid !== false;
        this.bg = opts.bg || null;
        this.isRunning = false;
        this.reqId = null;
        this.lastTime = 0;
        this.time = 0;
        this.scale = 1;
        this.dpr = 1;
        this._listeners = [];
        this._timers = [];
        this.particles = [];
        this.toasts = [];

        this.buildWrapper();
        this.resize();

        var self = this;
        if (window.ResizeObserver) {
            this._ro = new ResizeObserver(function() { self.resize(); });
            this._ro.observe(this.wrapper);
        } else {
            this.on(window, 'resize', function() { self.resize(); });
        }
        this.on(document, 'fullscreenchange', function() { self.onFsChange(); });
        this.on(document, 'webkitfullscreenchange', function() { self.onFsChange(); });
    }

    // ---------- โครง DOM: wrapper > stage(canvas + ปุ่มเต็มจอ) + แถบควบคุม ----------
    buildWrapper() {
        var canvas = this.canvas;
        var wrapper = document.createElement('div');
        wrapper.className = 'sim-wrapper';
        canvas.parentElement.insertBefore(wrapper, canvas);

        var stage = document.createElement('div');
        stage.className = 'sim-stage';
        wrapper.appendChild(stage);
        stage.appendChild(canvas);
        canvas.style.height = this.baseHeight + 'px';

        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'fs-btn';
        fsBtn.title = 'ขยายเต็มจอ';
        fsBtn.innerHTML = '<i class="ph ph-arrows-out-simple"></i>';
        fsBtn.onclick = function() {
            if (!fsElement()) {
                if (wrapper.requestFullscreen) wrapper.requestFullscreen().catch(function() {});
                else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            }
        };
        var controls = document.createElement('div');
        controls.className = 'sim-controls';
        wrapper.appendChild(controls);
        controls.appendChild(fsBtn);

        this.wrapper = wrapper;
        this.stage = stage;
        this.fsBtn = fsBtn;
        this.controls = controls;
    }

    isFullscreen() { return fsElement() === this.wrapper; }

    onFsChange() {
        var full = this.isFullscreen();
        this.wrapper.classList.toggle('is-full', full);
        this.fsBtn.innerHTML = full ? '<i class="ph ph-arrows-in-simple"></i>' : '<i class="ph ph-arrows-out-simple"></i>';
        this.fsBtn.title = full ? 'ออกจากเต็มจอ' : 'ขยายเต็มจอ';
        var self = this;
        this.resize();
        setTimeout(function() { self.resize(); }, 120);
    }

    resize() {
        if (!this.canvas || !this.canvas.isConnected) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        var c = this.canvas;
        var cssW, cssH, logicalW, logicalH, scale;

        if (this.isFullscreen()) {
            var availW = this.stage.clientWidth || window.innerWidth;
            var availH = this.stage.clientHeight || window.innerHeight;
            // ยึดขนาดตรรกะเดิมเป็นฐาน แล้วขยายทั้งฉาก → ตัวหนังสือใหญ่ขึ้นตามจอ
            var baseW = this.normalWidth || 520;
            scale = Math.min(availH / this.baseHeight, availW / baseW);
            scale = Math.max(scale, 1);
            cssW = availW; cssH = availH;
            logicalW = cssW / scale; logicalH = cssH / scale;
        } else {
            c.style.width = '';
            c.style.height = this.baseHeight + 'px';
            cssW = c.clientWidth || 520;
            cssH = c.clientHeight || this.baseHeight;
            scale = 1;
            logicalW = cssW; logicalH = cssH;
            this.normalWidth = cssW;
        }
        if (this.isFullscreen()) { c.style.width = cssW + 'px'; c.style.height = cssH + 'px'; }

        c.width = Math.round(cssW * dpr);
        c.height = Math.round(cssH * dpr);
        this.dpr = dpr;
        this.scale = scale;
        this.width = logicalW;
        this.height = logicalH;
        if (this.onResize) this.onResize(logicalW, logicalH);
        if (this.drawFn) this.renderFrame(0);   // การตั้ง canvas.width ล้างภาพ: วาดใหม่ทันทีไม่ต้องรอเฟรมถัดไป
    }

    // ---------- วงจรชีวิต ----------
    on(target, type, fn, opt) {
        target.addEventListener(type, fn, opt);
        this._listeners.push([target, type, fn, opt]);
    }
    every(ms, fn) { var id = setInterval(fn, ms); this._timers.push(id); return id; }

    destroy() {
        this.stop();
        this._listeners.forEach(function(l) { l[0].removeEventListener(l[1], l[2], l[3]); });
        this._listeners = [];
        this._timers.forEach(clearInterval);
        this._timers = [];
        if (this._ro) this._ro.disconnect();
    }

    start(updateFn, drawFn) {
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
        if (this.reqId) { cancelAnimationFrame(this.reqId); this.reqId = null; }
    }

    loop(now) {
        if (!this.isRunning) return;
        if (!this.canvas.isConnected) { this.destroy(); return; }
        var dt = (now - this.lastTime) / 1000;
        if (dt < 0) dt = 0;
        if (dt > 0.05) dt = 0.05;   // สลับแท็บกลับมา/เครื่องช้า: ไม่ให้กระโดดไกล
        this.lastTime = now;
        this.time += dt;
        if (this.updateFn) this.updateFn(dt);
        this.renderFrame(dt);
        var self = this;
        this.reqId = requestAnimationFrame(function(t) { self.loop(t); });
    }

    renderFrame(dt) {
        var ctx = this.ctx, k = this.scale * this.dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.setTransform(k, 0, 0, k, 0, 0);
        ctx.lineJoin = 'round';
        this.drawBackground();
        if (this.drawFn) { ctx.save(); this.drawFn(ctx); ctx.restore(); }
        this.updateDrawParticles(dt);
        this.drawToasts(dt);
    }

    drawBackground() {
        var ctx = this.ctx, W = this.width, H = this.height;
        if (this.bg) {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, this.bg[0]); g.addColorStop(1, this.bg[1]);
            ctx.fillStyle = g;
        } else {
            ctx.fillStyle = '#f8fafc';
        }
        ctx.fillRect(0, 0, W, H);
        if (this.grid) this.drawGrid();
    }

    drawGrid() {
        var ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = 'rgba(148,163,184,0.18)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var x = 0; x <= this.width; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, this.height); }
        for (var y = 0; y <= this.height; y += 40) { ctx.moveTo(0, y); ctx.lineTo(this.width, y); }
        ctx.stroke();
        ctx.restore();
    }

    // ---------- ตัวช่วยวาด ----------
    font(size, weight) { return (weight || 'normal') + ' ' + size + 'px ' + FONT; }

    // วาดข้อความ: ตัวอักษรที่ตามด้วย U+20D7 (เช่น 'F⃗') จะมีลูกศรเวกเตอร์วาดเหนือตัว
    // เพราะฟอนต์ส่วนใหญ่บน canvas แสดงเครื่องหมายรวมนี้เป็นกล่องสี่เหลี่ยม
    text(str, x, y, o) {
        o = o || {};
        str = String(str);
        var ctx = this.ctx, size = o.size || 14;
        ctx.save();
        ctx.font = this.font(size, o.weight);
        ctx.fillStyle = o.color || '#1e293b';
        if (str.indexOf('⃗') < 0) {
            ctx.textAlign = o.align || 'left';
            ctx.textBaseline = o.baseline || 'alphabetic';
            if (o.stroke) { ctx.lineWidth = 4; ctx.strokeStyle = o.stroke; ctx.strokeText(str, x, y); }
            ctx.fillText(str, x, y);
            ctx.restore();
            return;
        }
        var plain = str.replace(/⃗/g, '');
        var total = ctx.measureText(plain).width;
        var sx = o.align === 'center' ? x - total / 2 : (o.align === 'right' ? x - total : x);
        var bl = o.baseline || 'alphabetic';
        var by = bl === 'middle' ? y + size * 0.35 : (bl === 'top' ? y + size * 0.9 : (bl === 'bottom' ? y - size * 0.22 : y));
        ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
        var parts = str.split(/(.⃗)/);
        var cx = sx, arrows = [];
        parts.forEach(function(pt) {
            if (!pt) return;
            var isVec = pt.length === 2 && pt.charAt(1) === '⃗';
            var t = isVec ? pt.charAt(0) : pt;
            var w = ctx.measureText(t).width;
            if (o.stroke) { ctx.lineWidth = 4; ctx.strokeStyle = o.stroke; ctx.strokeText(t, cx, by); }
            ctx.fillText(t, cx, by);
            if (isVec) arrows.push([cx, w]);
            cx += w;
        });
        var ay = by - size * 0.92, hs = Math.max(2.5, size * 0.2);
        ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = Math.max(1.2, size * 0.09); ctx.lineCap = 'round';
        arrows.forEach(function(a) {
            var x1 = a[0] + a[1] * 0.1, x2 = a[0] + a[1] * 0.95;
            if (o.stroke) {
                ctx.save(); ctx.strokeStyle = o.stroke; ctx.lineWidth = ctx.lineWidth + 3;
                ctx.beginPath(); ctx.moveTo(x1, ay); ctx.lineTo(x2, ay); ctx.stroke(); ctx.restore();
            }
            ctx.beginPath(); ctx.moveTo(x1, ay); ctx.lineTo(x2, ay);
            ctx.moveTo(x2 - hs, ay - hs * 0.7); ctx.lineTo(x2, ay); ctx.lineTo(x2 - hs, ay + hs * 0.7);
            ctx.stroke();
        });
        ctx.restore();
    }

    measure(str, size, weight) {
        this.ctx.save();
        this.ctx.font = this.font(size, weight);
        var w = this.ctx.measureText(String(str).replace(/⃗/g, '')).width;
        this.ctx.restore();
        return w;
    }

    // การ์ดข้อมูล: lines = [{t:'ข้อความ', c:'#สี', b:true, s:ขนาด}]
    card(x, y, lines, o) {
        o = o || {};
        var pad = 9, lh = [], w = 0, self = this;
        lines.forEach(function(l) {
            var s = l.s || 13;
            lh.push(s + 6);
            w = Math.max(w, self.measure(l.t, s, l.b ? 'bold' : 'normal'));
        });
        var h = lh.reduce(function(a, b) { return a + b; }, 0) + pad * 2 - 4;
        w += pad * 2;
        if (o.alignRight) x = x - w;
        var ctx = this.ctx;
        ctx.save();
        ctx.shadowColor = 'rgba(15,23,42,0.12)';
        ctx.shadowBlur = 10; ctx.shadowOffsetY = 3;
        ctx.fillStyle = o.fill || 'rgba(255,255,255,0.94)';
        ctx.beginPath(); ctx.roundRect(x, y, w, h, 10); ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = o.border || '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
        var cy = y + pad;
        lines.forEach(function(l, i) {
            cy += lh[i] - 4;
            self.text(l.t, x + pad, cy, { size: l.s || 13, weight: l.b ? 'bold' : 'normal', color: l.c || '#1e293b' });
            cy += 4;
        });
        return { x: x, y: y, w: w, h: h };
    }

    // ลูกศรเวกเตอร์ (ป้ายชื่อมีเส้นขอบขาว อ่านง่ายบนพื้นหลังทุกแบบ)
    drawVector(x, y, dx, dy, color, label, o) {
        o = o || {};
        color = color || '#ef4444';
        var len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) return;
        var lw = o.width || 3;
        var headlen = Math.min(o.head || 12, len * 0.45);
        var angle = Math.atan2(dy, dx);
        var ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = color; ctx.fillStyle = color;
        ctx.lineWidth = lw; ctx.lineCap = 'round';
        if (o.dash) ctx.setLineDash(o.dash);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx - headlen * 0.6 * Math.cos(angle), y + dy - headlen * 0.6 * Math.sin(angle));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(x + dx, y + dy);
        ctx.lineTo(x + dx - headlen * Math.cos(angle - Math.PI / 7), y + dy - headlen * Math.sin(angle - Math.PI / 7));
        ctx.lineTo(x + dx - headlen * Math.cos(angle + Math.PI / 7), y + dy - headlen * Math.sin(angle + Math.PI / 7));
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        if (label) {
            var lx = x + dx + Math.cos(angle) * 8, ly = y + dy + Math.sin(angle) * 8;
            var al = Math.cos(angle) > 0.3 ? 'left' : (Math.cos(angle) < -0.3 ? 'right' : 'center');
            var bl = Math.sin(angle) > 0.3 ? 'top' : (Math.sin(angle) < -0.3 ? 'bottom' : 'middle');
            if (o.labelPos) { lx = o.labelPos[0]; ly = o.labelPos[1]; al = 'center'; bl = 'middle'; }
            this.text(label, lx, ly, { size: o.labelSize || 14, weight: 'bold', color: color, align: al, baseline: bl, stroke: 'rgba(255,255,255,0.9)' });
        }
    }

    drawRoundedRect(x, y, w, h, r, fillColor, strokeColor) {
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
        if (strokeColor) { ctx.strokeStyle = strokeColor; ctx.lineWidth = 2; ctx.stroke(); }
        ctx.restore();
    }

    // แท่งพลังงาน/ปริมาณ แนวตั้ง
    bar(x, baseY, w, maxH, frac, color, label, valueText) {
        var ctx = this.ctx;
        var f = Math.max(-1, Math.min(1, frac || 0));
        ctx.save();
        ctx.fillStyle = 'rgba(226,232,240,0.85)';
        ctx.beginPath(); ctx.roundRect(x, baseY - maxH, w, maxH, 5); ctx.fill();
        if (Math.abs(f) > 0.002) {
            var h = Math.abs(f) * maxH;
            ctx.fillStyle = color;
            ctx.beginPath();
            if (f > 0) ctx.roundRect(x, baseY - h, w, h, 5);
            else ctx.roundRect(x, baseY - maxH, w, h, 5);
            ctx.fill();
        }
        ctx.restore();
        if (label) this.text(label, x + w / 2, baseY + 15, { size: 12, weight: 'bold', align: 'center', color: '#334155' });
        if (valueText) this.text(valueText, x + w / 2, baseY - maxH - 6, { size: 12, weight: 'bold', align: 'center', color: color });
    }

    // ---------- เอฟเฟกต์: พลุฉลอง และข้อความเด้ง ----------
    burst(x, y, n, colors) {
        colors = colors || ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#a855f7', '#ec4899'];
        n = n || 40;
        for (var i = 0; i < n; i++) {
            var a = Math.random() * Math.PI * 2, s = 60 + Math.random() * 180;
            this.particles.push({
                x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 80,
                life: 1.2 + Math.random() * 0.6, age: 0,
                size: 3 + Math.random() * 4, rot: Math.random() * 6,
                color: colors[i % colors.length]
            });
        }
    }

    updateDrawParticles(dt) {
        if (!this.particles.length) return;
        var ctx = this.ctx;
        this.particles = this.particles.filter(function(p) {
            p.age += dt;
            p.vy += 260 * dt;
            p.x += p.vx * dt; p.y += p.vy * dt;
            p.rot += dt * 8;
            var a = 1 - p.age / p.life;
            if (a <= 0) return false;
            ctx.save();
            ctx.globalAlpha = a;
            ctx.translate(p.x, p.y); ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
            ctx.restore();
            return true;
        });
    }

    toast(msg, color) {
        this.toasts = [{ msg: msg, color: color || '#16a34a', age: 0, life: 2.2 }];
    }

    drawToasts(dt) {
        if (!this.toasts.length) return;
        var t = this.toasts[0];
        t.age += dt;
        if (t.age > t.life) { this.toasts = []; return; }
        var a = Math.min(1, t.age * 5, (t.life - t.age) * 3);
        var pop = 1 + 0.15 * Math.max(0, 1 - t.age * 4);
        var ctx = this.ctx, W = this.width;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.font = this.font(18, 'bold');
        var w = ctx.measureText(t.msg).width + 36;
        ctx.translate(W / 2, 46);
        ctx.scale(pop, pop);
        ctx.shadowColor = 'rgba(0,0,0,0.2)'; ctx.shadowBlur = 12;
        ctx.fillStyle = t.color;
        ctx.beginPath(); ctx.roundRect(-w / 2, -20, w, 40, 20); ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(t.msg, 0, 1);
        ctx.restore();
    }

    // ---------- แถบควบคุม (HTML ใต้ภาพ ขยายตามในโหมดเต็มจอ) ----------
    addSlider(o) {
        var self = this;
        var el = document.createElement('label');
        el.className = 'sim-ctl sim-slider';
        var fmt = o.format || function(v) { return v + (o.unit ? ' ' + o.unit : ''); };
        el.innerHTML = '<span class="sim-lbl"></span><input type="range"><output></output>';
        el.querySelector('.sim-lbl').innerHTML = o.label;
        var input = el.querySelector('input'), out = el.querySelector('output');
        input.min = o.min; input.max = o.max; input.step = o.step || 1; input.value = o.value;
        out.textContent = fmt(+input.value);
        input.addEventListener('input', function() {
            out.textContent = fmt(+input.value);
            if (o.onInput) o.onInput(+input.value);
        });
        (o.row || this.controls).appendChild(el);
        return {
            el: el,
            get value() { return +input.value; },
            set: function(v, silent) {
                input.value = v; out.textContent = fmt(+input.value);
                if (!silent && o.onInput) o.onInput(+input.value);
            },
            disable: function(d) { input.disabled = !!d; el.classList.toggle('off', !!d); }
        };
    }

    addButton(label, onClick, o) {
        o = o || {};
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'sim-btn' + (o.primary ? ' primary' : '') + (o.cls ? ' ' + o.cls : '');
        b.innerHTML = label;
        b.addEventListener('click', onClick);
        (o.row || this.controls).appendChild(b);
        return b;
    }

    // ปุ่มแบบเลือกได้ทีละหนึ่ง: items = [{v:'a', t:'ข้อความ'}]
    addSegment(items, value, onChange, o) {
        o = o || {};
        var box = document.createElement('div');
        box.className = 'sim-ctl sim-seg';
        if (o.label) { var s = document.createElement('span'); s.className = 'sim-lbl'; s.innerHTML = o.label; box.appendChild(s); }
        var btns = [];
        var api = {
            value: value,
            set: function(v, silent) {
                api.value = v;
                btns.forEach(function(b) { b.classList.toggle('on', b.dataset.v === String(v)); });
                if (!silent && onChange) onChange(v);
            }
        };
        items.forEach(function(it) {
            var b = document.createElement('button');
            b.type = 'button';
            b.dataset.v = it.v;
            b.innerHTML = it.t;
            b.addEventListener('click', function() { api.set(it.v); });
            box.appendChild(b); btns.push(b);
        });
        (o.row || this.controls).appendChild(box);
        api.set(value, true);
        return api;
    }

    addRow() {
        var r = document.createElement('div');
        r.className = 'sim-row';
        this.controls.appendChild(r);
        return r;
    }

    // ---------- ตัวชี้ ----------
    getPointerPos(e) {
        var rect = this.canvas.getBoundingClientRect();
        var clientX = e.clientX, clientY = e.clientY;
        if (e.touches && e.touches.length > 0) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
        return {
            x: (clientX - rect.left) * (this.width / (rect.width || 1)),
            y: (clientY - rect.top) * (this.height / (rect.height || 1))
        };
    }

    // ลากบนภาพ: handlers = {down(pos,e)→true ถ้าจับ, move(pos), up(pos)}
    onDrag(h) {
        var self = this, dragging = false, c = this.canvas;
        this.on(c, 'pointerdown', function(e) {
            var p = self.getPointerPos(e);
            if (h.down && h.down(p, e) === false) return;
            dragging = true;
            try { c.setPointerCapture(e.pointerId); } catch (err) {}
            e.preventDefault();
        });
        this.on(c, 'pointermove', function(e) {
            var p = self.getPointerPos(e);
            if (dragging) { if (h.move) h.move(p, e); }
            else if (h.hover) c.style.cursor = h.hover(p) ? 'grab' : 'default';
        });
        var end = function(e) {
            if (!dragging) return;
            dragging = false;
            if (h.up) h.up(self.getPointerPos(e), e);
        };
        this.on(c, 'pointerup', end);
        this.on(c, 'pointercancel', end);
    }
}

SimEngine.FONT = FONT;
SimEngine.active = active;   // ใช้ตรวจสอบ/ดีบัก: ซิมที่กำลังทำงาน
window.SimEngine = SimEngine;

// ตัวช่วยคณิต
window.SimMath = {
    clamp: function(v, a, b) { return Math.max(a, Math.min(b, v)); },
    lerp: function(a, b, t) { return a + (b - a) * t; },
    deg: function(r) { return r * 180 / Math.PI; },
    rad: function(d) { return d * Math.PI / 180; },
    fmt: function(v, d) { d = d === undefined ? 1 : d; var s = (+v).toFixed(d); return s === '-0' || /^-0\.0*$/.test(s) ? s.slice(1) : s; }
};
})();
