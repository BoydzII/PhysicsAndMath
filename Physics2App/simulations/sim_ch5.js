// sim_ch5.js - Chapter 5 Simulations (Work, Power, Kinetic, Potential, Conservation)
// ทุกซิมเก็บสถานะเป็นหน่วยจริง (m, s, N) แล้วแปลงเป็นพิกเซลทุกเฟรม → ย่อ/ขยาย/เต็มจอ ได้ไม่เพี้ยน
(function() {
var M = window.SimMath;
var fmt = M.fmt;

// ==========================================
// 5.1 งาน: W = F⃗ · s⃗ = Fs cos θ
// ==========================================
window.initWorkSimulation = function() {
    var E = new window.SimEngine('simWork', { height: 340, bg: ['#f8fafc', '#eef2ff'] });
    if (!E.ctx) return;

    var TRACK = 5;          // ระยะทางทั้งหมด (m)
    var SPEED = 1.0;        // อัตราเร็วคงตัวของกล่อง (m/s)
    var F = 30, thetaDeg = 60, below = false;
    var s = 0, W = 0, running = false, finished = false;
    var target = null;
    var TARGETS = [120, 75, -60, 0, 100, -100, 150, 50];

    function newMission() {
        var t;
        do { t = TARGETS[Math.floor(Math.random() * TARGETS.length)]; } while (target === t);
        target = t;
        reset();
    }
    function reset() { s = 0; W = 0; running = false; finished = false; btnRun.innerHTML = '▶ เริ่มเคลื่อนที่'; }

    var geo = {};
    function layout() {
        var w = E.width, h = E.height;
        geo.groundY = h - 58;
        geo.x0 = 60;
        geo.ppm = (w - 150) / TRACK;
        geo.boxW = 58; geo.boxH = 46;
        geo.fScale = Math.min(2.4, (h - 150) / 50 + 0.2);   // px ต่อ N
    }

    // ลากหัวลูกศร F เพื่อกำหนดขนาดและทิศ
    E.onDrag({
        down: function(p) { setFromPointer(p); return true; },
        move: function(p) { setFromPointer(p); }
    });
    function setFromPointer(p) {
        layout();
        var cx = geo.x0 + s * geo.ppm, cy = geo.groundY - geo.boxH / 2;
        var dx = p.x - cx, dy = p.y - cy;
        var mag = Math.sqrt(dx * dx + dy * dy) / geo.fScale;
        F = Math.round(M.clamp(mag, 0, 50));
        thetaDeg = Math.round(M.deg(Math.abs(Math.atan2(dy, dx))));
        below = dy > 0;
        slF.set(F, true); slT.set(thetaDeg, true);
    }

    var slF = E.addSlider({ label: 'ขนาดแรง F', min: 0, max: 50, value: F, unit: 'N', onInput: function(v) { F = v; } });
    var slT = E.addSlider({ label: 'มุม θ (แรง–การกระจัด)', min: 0, max: 180, value: thetaDeg, format: function(v) { return v + '°'; }, onInput: function(v) { thetaDeg = v; } });
    var row = E.addRow();
    var btnRun = E.addButton('▶ เริ่มเคลื่อนที่', function() {
        if (finished) reset();
        running = !running;
        btnRun.innerHTML = running ? '⏸ หยุด' : '▶ เคลื่อนที่ต่อ';
    }, { primary: true, row: row });
    E.addButton('↺ เริ่มใหม่', reset, { row: row });
    E.addButton('🎯 ภารกิจใหม่', newMission, { row: row });

    newMission();

    E.start(function(dt) {
        if (!running) return;
        var ds = Math.min(SPEED * dt, TRACK - s);
        // งานสะสม dW = F⃗ · ds⃗ = F cos θ ds
        W += F * Math.cos(M.rad(thetaDeg)) * ds;
        s += ds;
        if (s >= TRACK - 1e-9) {
            running = false; finished = true;
            btnRun.innerHTML = '▶ เล่นอีกครั้ง';
            var ok = Math.abs(W - target) <= Math.max(4, Math.abs(target) * 0.04);
            if (ok) { E.toast('สำเร็จ! W = ' + fmt(W, 0) + ' J ตรงเป้า 🎉', '#16a34a'); E.burst(E.width / 2, 80, 60); }
            else E.toast('ได้ W = ' + fmt(W, 0) + ' J  (เป้า ' + target + ' J) ลองปรับ F หรือ θ', '#ea580c');
        }
    }, function(ctx) {
        layout();
        var w = E.width, h = E.height, gY = geo.groundY;
        var th = M.rad(thetaDeg), sgn = below ? 1 : -1;

        // พื้นและไม้บรรทัด
        ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, gY, w, h - gY);
        ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, gY, w, 3);
        for (var m = 0; m <= TRACK; m++) {
            var rx = geo.x0 + m * geo.ppm;
            ctx.fillStyle = '#475569'; ctx.fillRect(rx - 1, gY, 2, 10);
            E.text(m + ' m', rx, gY + 24, { size: 12, align: 'center', color: '#475569' });
            for (var q = 1; q < 5 && m < TRACK; q++) { ctx.fillStyle = '#64748b'; ctx.fillRect(rx + q * geo.ppm / 5, gY, 1, 5); }
        }
        // ธงเส้นชัย
        var fx = geo.x0 + TRACK * geo.ppm;
        ctx.fillStyle = '#334155'; ctx.fillRect(fx + geo.boxW / 2 + 6, gY - 70, 3, 70);
        ctx.fillStyle = finished ? '#16a34a' : '#ef4444';
        ctx.beginPath(); ctx.moveTo(fx + geo.boxW / 2 + 9, gY - 70); ctx.lineTo(fx + geo.boxW / 2 + 32, gY - 62); ctx.lineTo(fx + geo.boxW / 2 + 9, gY - 54); ctx.fill();

        var cx = geo.x0 + s * geo.ppm, cy = gY - geo.boxH / 2;

        // เวกเตอร์การกระจัด s⃗
        if (s > 0.02) E.drawVector(geo.x0, gY + 38, s * geo.ppm, 0, '#7c3aed', 's⃗ = ' + fmt(s, 2) + ' m', { width: 3.5 });

        // กล่อง
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.18)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
        var bg = ctx.createLinearGradient(cx, cy - geo.boxH / 2, cx, cy + geo.boxH / 2);
        bg.addColorStop(0, '#5eead4'); bg.addColorStop(1, '#0f766e');
        ctx.fillStyle = bg;
        ctx.beginPath(); ctx.roundRect(cx - geo.boxW / 2, gY - geo.boxH, geo.boxW, geo.boxH, 6); ctx.fill();
        ctx.restore();
        ctx.strokeStyle = '#115e59'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx - geo.boxW / 2 + 6, gY - geo.boxH + 6); ctx.lineTo(cx + geo.boxW / 2 - 6, gY - 6);
        ctx.moveTo(cx + geo.boxW / 2 - 6, gY - geo.boxH + 6); ctx.lineTo(cx - geo.boxW / 2 + 6, gY - 6); ctx.stroke();
        if (running) {
            for (var i = 0; i < 3; i++) {
                ctx.strokeStyle = 'rgba(100,116,139,' + (0.5 - i * 0.15) + ')'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(cx - geo.boxW / 2 - 8 - i * 9, cy - 10 + i * 10); ctx.lineTo(cx - geo.boxW / 2 - 20 - i * 9, cy - 10 + i * 10); ctx.stroke();
            }
        }

        // แรง F⃗ + เงาของ F บนแนว s (F cos θ) + มุม θ
        var Lf = F * geo.fScale;
        var fdx = Lf * Math.cos(th), fdy = sgn * Lf * Math.sin(th);
        if (F > 0) {
            ctx.save();
            ctx.setLineDash([5, 4]); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(cx + fdx, cy + fdy); ctx.lineTo(cx + fdx, cy); ctx.stroke();
            ctx.setLineDash([]);
            // เส้นแนว s (แกนอ้างอิง)
            ctx.strokeStyle = 'rgba(124,58,237,0.35)'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(cx - Lf - 10, cy); ctx.lineTo(cx + Lf + 10, cy); ctx.stroke();
            ctx.restore();
            var proj = F * Math.cos(th);
            if (Math.abs(proj) > 0.5) E.drawVector(cx, cy, proj * geo.fScale, 0, '#f97316', 'F cos θ = ' + fmt(proj, 1) + ' N', { width: 6, labelSize: 13 });
            E.drawVector(cx, cy, fdx, fdy, '#2563eb', 'F⃗ = ' + F + ' N', { width: 4 });
            // มุม
            ctx.save();
            ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(cx, cy, 26, 0, sgn * th, sgn < 0); ctx.stroke();
            ctx.restore();
            E.text('θ', cx + 34 * Math.cos(th / 2), cy + sgn * 34 * Math.sin(th / 2) + 5, { size: 14, weight: 'bold', color: '#4338ca', align: 'center', stroke: '#fff' });
        }

        // การ์ดผลคูณเชิงสเกลาร์
        var cosT = Math.cos(th);
        var kind = Math.abs(cosT) < 0.02 ? ['งานเป็นศูนย์ (F⃗ ⟂ s⃗)', '#64748b'] : (cosT > 0 ? ['งานเป็นบวก (θ < 90°)', '#16a34a'] : ['งานเป็นลบ (θ > 90°)', '#dc2626']);
        E.card(10, 10, [
            { t: 'W = F⃗ · s⃗ = F s cos θ', b: true, s: 15, c: '#1e1b4b' },
            { t: '= (' + F + ')(' + fmt(s, 2) + ')(cos ' + thetaDeg + '°)', s: 13, c: '#334155' },
            { t: '= ' + fmt(W, 1) + ' J', b: true, s: 16, c: kind[1] },
            { t: kind[0], s: 12, b: true, c: kind[1] }
        ]);
        E.card(w - 10, 10, [
            { t: '🎯 ภารกิจ', b: true, s: 13, c: '#9a3412' },
            { t: 'ให้งานของแรง F = ' + (target > 0 ? '+' : '') + target + ' J', s: 13 },
            { t: 'เมื่อกล่องเลื่อนไป 5 m', s: 12, c: '#64748b' }
        ], { alignRight: true, fill: 'rgba(255,247,237,0.96)', border: '#fdba74' });
        if (!running && s === 0) E.text('👆 ลากบนภาพเพื่อหมุนลูกศร F⃗ แล้วกด ▶ เริ่ม', w / 2, gY - geo.boxH - 70 > 120 ? gY - geo.boxH - 70 : 150, { size: 13, align: 'center', color: '#475569', stroke: '#fff' });
    });
};


// ==========================================
// 5.2 กำลัง: P = W/t = F⃗ · v⃗
// ==========================================
window.initPowerSimulation = function() {
    var E = new window.SimEngine('simPower', { height: 360, bg: ['#e0f2fe', '#f0f9ff'], grid: false });
    if (!E.ctx) return;

    var g = 10, HEIGHT = 10;
    var mass = 100;
    var cr = [
        { name: 'A', P: 2000, y: 0, t: 0, done: false, color: '#2563eb' },
        { name: 'B', P: 4000, y: 0, t: 0, done: false, color: '#db2777' }
    ];
    var running = false, finishedOrder = [];

    function reset() {
        running = false; finishedOrder = [];
        cr.forEach(function(c) { c.y = 0; c.t = 0; c.done = false; });
        btnGo.innerHTML = '🏁 เริ่มแข่งยก!';
    }

    E.addSlider({ label: 'มวลของ m', min: 20, max: 300, step: 10, value: mass, unit: 'kg', onInput: function(v) { mass = v; reset(); } });
    E.addSlider({ label: 'กำลังเครน A', min: 500, max: 8000, step: 100, value: cr[0].P, format: function(v) { return (v / 1000).toFixed(1) + ' kW'; }, onInput: function(v) { cr[0].P = v; reset(); } });
    E.addSlider({ label: 'กำลังเครน B', min: 500, max: 8000, step: 100, value: cr[1].P, format: function(v) { return (v / 1000).toFixed(1) + ' kW'; }, onInput: function(v) { cr[1].P = v; reset(); } });
    var row = E.addRow();
    var btnGo = E.addButton('🏁 เริ่มแข่งยก!', function() {
        if (finishedOrder.length === 2) reset();
        running = !running;
        btnGo.innerHTML = running ? '⏸ หยุด' : '▶ ต่อ';
    }, { primary: true, row: row });
    E.addButton('↺ เริ่มใหม่', reset, { row: row });

    E.start(function(dt) {
        if (!running) return;
        cr.forEach(function(c) {
            if (c.done) return;
            var v = c.P / (mass * g);        // F = mg (ยกด้วยความเร็วคงตัว) → v = P/F
            c.t += dt;
            c.y = Math.min(HEIGHT, c.y + v * dt);
            if (c.y >= HEIGHT) {
                c.done = true;
                c.t = mass * g * HEIGHT / c.P;
                finishedOrder.push(c);
                if (finishedOrder.length === 1) {
                    E.toast('เครน ' + c.name + ' ถึงก่อน! t = ' + fmt(c.t, 2) + ' s', c.color);
                    E.burst(c._px || E.width / 2, 70, 50);
                }
                if (finishedOrder.length === 2) { running = false; btnGo.innerHTML = '🏁 แข่งอีกรอบ'; }
            }
        });
    }, function(ctx) {
        var w = E.width, h = E.height;
        var gY = h - 34, topY = 70;
        var ppm = (gY - topY - 60) / HEIGHT;
        var leftCol = Math.max(250, w * 0.4);

        // พื้นดิน
        ctx.fillStyle = '#a3a3a3'; ctx.fillRect(0, gY, w, h - gY);
        ctx.fillStyle = '#737373'; ctx.fillRect(0, gY, w, 3);
        // เส้นเป้าความสูง 10 m
        var goalY = gY - HEIGHT * ppm - 40;
        ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(leftCol, goalY); ctx.lineTo(w - 10, goalY); ctx.stroke(); ctx.restore();
        E.text('🏁 เส้นชัย h = 10 m', leftCol + 4, goalY - 6, { size: 12, weight: 'bold', color: '#16a34a', stroke: '#fff' });

        var colW = (w - leftCol) / 2;
        cr.forEach(function(c, i) {
            var x = leftCol + colW * (i + 0.5);
            c._px = x;
            var boxS = 40;
            var boxTop = gY - boxS - c.y * ppm;
            // เสาและแขนเครน
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(x + 30, topY - 10, 10, gY - topY + 10);
            for (var yy = topY; yy < gY - 10; yy += 22) {
                ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(x + 30, yy); ctx.lineTo(x + 40, yy + 22); ctx.stroke();
            }
            ctx.fillStyle = '#f59e0b'; ctx.fillRect(x - 20, topY - 16, 70, 10);
            ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, topY - 4, 8, 0, Math.PI * 2); ctx.fill();
            // สลิง
            ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x, topY + 4); ctx.lineTo(x, boxTop); ctx.stroke();
            // กล่องมวล
            var gr = ctx.createLinearGradient(x - boxS / 2, boxTop, x + boxS / 2, boxTop + boxS);
            gr.addColorStop(0, c.color); gr.addColorStop(1, '#1e293b');
            ctx.fillStyle = gr;
            ctx.beginPath(); ctx.roundRect(x - boxS / 2, boxTop, boxS, boxS, 6); ctx.fill();
            E.text(mass + ' kg', x, boxTop + boxS / 2 + 5, { size: 12, weight: 'bold', color: '#fff', align: 'center' });
            // เวกเตอร์ F และ v (ทิศเดียวกัน θ = 0°)
            var v = c.P / (mass * g);
            if (!c.done && c.y > 0) E.drawVector(x - boxS / 2 - 12, boxTop + boxS / 2, 0, -Math.min(60, 12 + v * 8), '#16a34a', 'v⃗', { width: 3 });
            E.drawVector(x - boxS / 2 - 32, boxTop + boxS, 0, -38, c.color, 'F⃗', { width: 3 });
            // ป้ายชื่อเครน
            E.text('เครน ' + c.name, x + 5, gY + 22, { size: 14, weight: 'bold', color: c.color, align: 'center', plain: true });
            if (c.done) E.text('✔ ' + fmt(c.t, 2) + ' s', x, boxTop - 12, { size: 14, weight: 'bold', color: '#16a34a', align: 'center', stroke: '#fff' });
        });

        // การ์ดสูตรและตัวเลข
        var lines = [
            { t: 'P = W / t', b: true, s: 14, c: '#1e1b4b' },
            { t: '= F⃗ · v⃗ = Fv cos 0°', b: true, s: 14, c: '#1e1b4b' },
            { t: 'F = mg = ' + (mass * g) + ' N', s: 12, c: '#475569' },
            { t: '(ยกด้วยความเร็วคงตัว)', s: 11, c: '#64748b' }
        ];
        cr.forEach(function(c) {
            var v = c.P / (mass * g);
            lines.push({ t: 'เครน ' + c.name, s: 12, b: true, c: c.color, plain: true });
            lines.push({ t: 'v = P/F = ' + fmt(v, 2) + ' m/s', s: 13, b: true, c: c.color });
            lines.push({ t: 'W = ' + Math.round(mass * g * c.y) + ' J   t = ' + fmt(c.t, 2) + ' s', s: 12, c: '#334155' });
        });
        lines.push({ t: 'งานเท่ากัน = mgh = ' + (mass * g * HEIGHT) + ' J', s: 12, b: true, c: '#15803d' });
        E.card(10, 10, lines);
    });
};


// ==========================================
// 5.3 พลังงานจลน์: W_net = F⃗·s⃗ = ΔE_k
// ==========================================
window.initKineticSimulation = function() {
    var E = new window.SimEngine('simKinetic', { height: 340, bg: ['#f1f5f9', '#e2e8f0'], grid: false });
    if (!E.ctx) return;

    var TRACK = 12, GUN = 9.5, SLOW = 0.5;
    var m = 4, F = 20, sPush = 3, thetaDeg = 0;
    var x = 0, v = 0, running = false, done = false, measured = null;
    var target = 6;
    var TARGETS = [4, 5, 6, 7, 8];

    function reset() { x = 0; v = 0; running = false; done = false; measured = null; }
    function newMission() { var t; do { t = TARGETS[Math.floor(Math.random() * TARGETS.length)]; } while (t === target); target = t; reset(); }

    E.addSlider({ label: 'มวลรถ m', min: 1, max: 20, value: m, unit: 'kg', onInput: function(val) { m = val; reset(); } });
    E.addSlider({ label: 'แรงดัน F', min: 5, max: 60, value: F, unit: 'N', onInput: function(val) { F = val; reset(); } });
    E.addSlider({ label: 'ระยะที่ออกแรง s', min: 0.5, max: 6, step: 0.5, value: sPush, unit: 'm', onInput: function(val) { sPush = val; reset(); } });
    E.addSlider({ label: 'มุมของแรง θ', min: 0, max: 80, step: 5, value: thetaDeg, format: function(val) { return val + '°'; }, onInput: function(val) { thetaDeg = val; reset(); } });
    var row = E.addRow();
    E.addButton('🚀 ปล่อยรถ!', function() { reset(); running = true; }, { primary: true, row: row });
    E.addButton('🎯 ภารกิจใหม่', newMission, { row: row });

    E.start(function(dt) {
        if (!running) return;
        var t = dt * SLOW;
        var a = x < sPush ? F * Math.cos(M.rad(thetaDeg)) / m : 0;
        if (x < sPush) {
            // ออกแรงถึงระยะ sPush พอดี
            v += a * t;
            x += v * t;
            if (x >= sPush) { x = sPush; v = Math.sqrt(2 * F * Math.cos(M.rad(thetaDeg)) * sPush / m); }
        } else {
            x += v * t;
        }
        if (measured === null && x >= GUN) {
            measured = v;
            var ok = Math.abs(v - target) < 0.15;
            if (ok) { E.toast('ความเร็ว ' + fmt(v, 2) + ' m/s ตรงเป้า! 🎉', '#16a34a'); E.burst(E.width * 0.75, 90, 60); }
            else E.toast('วัดได้ ' + fmt(v, 2) + ' m/s  (เป้า ' + target + ' m/s)', '#ea580c');
        }
        if (x >= TRACK - 0.3) { x = TRACK - 0.3; running = false; done = true; }
    }, function(ctx) {
        var w = E.width, h = E.height;
        var gY = h - 60, x0 = 80, ppm = (w - 120) / TRACK;
        var cosT = Math.cos(M.rad(thetaDeg));
        var Wnet = F * cosT * Math.min(x, sPush);
        var Ek = 0.5 * m * v * v;

        // ถนน
        ctx.fillStyle = '#334155'; ctx.fillRect(0, gY, w, h - gY);
        ctx.save(); ctx.setLineDash([18, 12]); ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, gY + (h - gY) / 2); ctx.lineTo(w, gY + (h - gY) / 2); ctx.stroke(); ctx.restore();
        // เขตออกแรง
        ctx.fillStyle = 'rgba(34,197,94,0.18)';
        ctx.fillRect(x0, gY - 90, sPush * ppm, 90);
        ctx.fillStyle = '#16a34a'; ctx.fillRect(x0 + sPush * ppm - 1, gY - 90, 3, 90);
        E.text('เขตออกแรง s = ' + sPush + ' m', x0 + 4, gY - 76, { size: 12, weight: 'bold', color: '#15803d' });
        // เครื่องวัดความเร็ว
        var gx = x0 + GUN * ppm;
        ctx.fillStyle = '#0f172a'; ctx.fillRect(gx - 2, gY - 120, 4, 120);
        ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(gx - 46, gY - 150, 92, 34, 8); ctx.fill();
        E.text(measured === null ? '— m/s' : fmt(measured, 2) + ' m/s', gx, gY - 127, { size: 15, weight: 'bold', color: measured === null ? '#94a3b8' : '#4ade80', align: 'center' });
        E.text('📡 เครื่องวัด', gx, gY - 156, { size: 11, color: '#475569', align: 'center' });
        // กำแพงปลายทาง
        ctx.fillStyle = '#64748b'; ctx.fillRect(x0 + TRACK * ppm, gY - 60, 12, 60);

        // รถ
        var cx = x0 + x * ppm, cw = 70, ch = 30;
        ctx.save();
        var cg = ctx.createLinearGradient(cx - cw / 2, gY - ch - 16, cx + cw / 2, gY);
        cg.addColorStop(0, '#38bdf8'); cg.addColorStop(1, '#0369a1');
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.roundRect(cx - cw / 2, gY - ch - 8, cw, ch, 8); ctx.fill();
        ctx.beginPath(); ctx.roundRect(cx - cw / 4, gY - ch - 22, cw / 2, 16, 6); ctx.fill();
        ctx.fillStyle = '#e0f2fe'; ctx.beginPath(); ctx.roundRect(cx - cw / 4 + 4, gY - ch - 19, cw / 2 - 8, 11, 3); ctx.fill();
        var wheelA = x * ppm / 9;
        [-cw / 3, cw / 3].forEach(function(o) {
            ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(cx + o, gY - 8, 9, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath();
            ctx.moveTo(cx + o, gY - 8); ctx.lineTo(cx + o + 7 * Math.cos(wheelA), gY - 8 + 7 * Math.sin(wheelA)); ctx.stroke();
        });
        ctx.restore();
        E.text(m + ' kg', cx, gY - ch + 4, { size: 12, weight: 'bold', color: '#fff', align: 'center' });
        // แรง F⃗ (มุม θ) เฉพาะในเขตออกแรง
        if (x < sPush || (!running && x === 0)) {
            var L = 30 + F * 1.3, th = M.rad(thetaDeg);
            E.drawVector(cx - cw / 2 - 8 - L * Math.cos(th), gY - ch / 2 - 8 + L * Math.sin(th), L * Math.cos(th), -L * Math.sin(th), '#16a34a', 'F⃗', { width: 4 });
        }
        if (v > 0.05) E.drawVector(cx + cw / 2 + 4, gY - ch - 8, Math.min(120, v * 12), 0, '#ef4444', 'v⃗ = ' + fmt(v, 2) + ' m/s', { width: 3 });

        // แท่งเทียบ W กับ ΔEk
        var maxE = Math.max(F * sPush, 1);
        var bx = w - 118, bh = Math.max(70, gY - 250), by = 24 + bh;
        E.bar(bx, by, 36, bh, Wnet / maxE, '#16a34a', 'W', fmt(Wnet, 0) + ' J');
        E.bar(bx + 58, by, 36, bh, Ek / maxE, '#f97316', 'ΔEk', fmt(Ek, 0) + ' J');

        E.card(10, 10, [
            { t: 'W = F⃗ · s⃗ = F s cos θ', b: true, s: 15, c: '#1e1b4b' },
            { t: '= (' + F + ')(' + fmt(Math.min(x, sPush), 2) + ')(cos ' + thetaDeg + '°)', s: 12, c: '#334155' },
            { t: '= ' + fmt(Wnet, 1) + ' J', s: 14, b: true, c: '#15803d' },
            { t: 'ΔEk = ½mv² − ½mu²', b: true, s: 15, c: '#1e1b4b' },
            { t: '= ½(' + m + ')(' + fmt(v, 2) + ')² − 0', s: 12, c: '#334155' },
            { t: '= ' + fmt(Ek, 1) + ' J', s: 14, b: true, c: '#c2410c' },
            { t: '🎯 ภารกิจ: ให้รถผ่านเครื่องวัดที่ ' + target + ' m/s', s: 12, b: true, c: '#9a3412' }
        ]);
        if (SLOW < 1) E.text('ภาพช้าลง 2 เท่า', w - 10, h - 8, { size: 11, color: '#cbd5e1', align: 'right' });
    });
};


// ==========================================
// 5.4 พลังงานศักย์: Ep = mgh และ Ep = ½kx²
// ==========================================
window.initPotentialSimulation = function() {
    var E = new window.SimEngine('simPotential', { height: 360, bg: ['#f8fafc', '#f1f5f9'] });
    if (!E.ctx) return;

    var g = 10, m = 2, k = 200;
    var ref = 'floor';          // 'floor' | 'table'
    var TABLE = 1.2, MAXH = 4;
    var ball = { y: 3, vy: 0, falling: false, fromY: 3 };
    var spr = { x: 0.3, v: 0, free: false };   // x > 0 = ยืด, < 0 = หด (m)
    var drag = null;

    var geo = {};
    function layout() {
        var w = E.width, h = E.height;
        geo.split = Math.max(220, w * 0.46);
        geo.floorY = h - 40;
        geo.ppmY = (geo.floorY - 120) / MAXH;
        geo.ballX = geo.split * 0.58;
        geo.eqX = geo.split + (w - geo.split) * 0.52;   // จุดสมดุลของสปริง
        geo.sprY = h - 120;
        geo.ppmX = Math.min(180, (w - geo.split) * 0.32 / 0.5);
        geo.wallX = geo.split + 18;
    }
    function refY() { return ref === 'table' ? TABLE : 0; }

    E.onDrag({
        down: function(p) {
            layout();
            var by = geo.floorY - ball.y * geo.ppmY - 16;
            if (Math.abs(p.x - geo.ballX) < 40 && Math.abs(p.y - by) < 40) { drag = 'ball'; ball.falling = false; return true; }
            var bx = geo.eqX + spr.x * geo.ppmX;
            if (Math.abs(p.x - bx) < 40 && Math.abs(p.y - geo.sprY) < 40) { drag = 'spring'; spr.free = false; spr.v = 0; return true; }
            return false;
        },
        move: function(p) {
            if (drag === 'ball') { ball.y = M.clamp((geo.floorY - 16 - p.y) / geo.ppmY, 0, MAXH); ball.vy = 0; }
            if (drag === 'spring') { spr.x = M.clamp((p.x - geo.eqX) / geo.ppmX, -0.45, 0.5); }
        },
        up: function() { drag = null; },
        hover: function(p) {
            layout();
            var by = geo.floorY - ball.y * geo.ppmY - 16, bx = geo.eqX + spr.x * geo.ppmX;
            return (Math.abs(p.x - geo.ballX) < 40 && Math.abs(p.y - by) < 40) || (Math.abs(p.x - bx) < 40 && Math.abs(p.y - geo.sprY) < 40);
        }
    });

    E.addSlider({ label: 'มวล m', min: 0.5, max: 5, step: 0.5, value: m, unit: 'kg', onInput: function(v) { m = v; } });
    E.addSlider({ label: 'ค่านิจสปริง k', min: 50, max: 400, step: 10, value: k, unit: 'N/m', onInput: function(v) { k = v; } });
    E.addSegment([{ v: 'floor', t: 'พื้น' }, { v: 'table', t: 'โต๊ะ (1.2 m)' }], ref, function(v) { ref = v; }, { label: 'ระดับอ้างอิง h = 0 :' });
    var row = E.addRow();
    E.addButton('⬇ ปล่อยลูกบอล', function() { if (ball.y > 0.01) { ball.falling = true; ball.vy = 0; ball.fromY = ball.y; } }, { primary: true, row: row });
    E.addButton('↔ ปล่อยสปริง', function() { spr.free = !spr.free; }, { primary: true, row: row });
    E.addButton('↺ เริ่มใหม่', function() { ball.y = 3; ball.falling = false; spr.x = 0.3; spr.v = 0; spr.free = false; }, { row: row });

    E.start(function(dt) {
        if (ball.falling) {
            ball.vy -= g * dt;
            ball.y += ball.vy * dt;
            if (ball.y <= 0) {
                ball.y = 0; ball.falling = false;
                E.toast('W ของ mg = mg·Δh = ' + fmt(m * g * ball.fromY, 1) + ' J = −ΔEp', '#2563eb');
                ball.vy = 0;
            }
        }
        if (spr.free && !drag) {
            // F⃗ = −k x⃗  (อินทิเกรตแบบ semi-implicit)
            var steps = 4, h = dt / steps;
            for (var i = 0; i < steps; i++) { spr.v += (-k * spr.x / m) * h; spr.x += spr.v * h; }
        }
    }, function(ctx) {
        layout();
        var w = E.width, h = E.height;

        // ---------- ซ้าย: ศักย์โน้มถ่วง ----------
        ctx.fillStyle = '#bbf7d0'; ctx.fillRect(0, geo.floorY, geo.split, h - geo.floorY);
        ctx.fillStyle = '#16a34a'; ctx.fillRect(0, geo.floorY, geo.split, 3);
        // โต๊ะ
        var tY = geo.floorY - TABLE * geo.ppmY;
        ctx.fillStyle = '#a16207'; ctx.fillRect(geo.ballX + 30, tY, 50, 8);
        ctx.fillRect(geo.ballX + 34, tY + 8, 5, TABLE * geo.ppmY - 8); ctx.fillRect(geo.ballX + 71, tY + 8, 5, TABLE * geo.ppmY - 8);
        // ระดับอ้างอิง
        var r0 = geo.floorY - refY() * geo.ppmY;
        ctx.save(); ctx.setLineDash([7, 5]); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(8, r0); ctx.lineTo(geo.split - 10, r0); ctx.stroke(); ctx.restore();
        E.text('h = 0', 10, r0 - 5, { size: 12, weight: 'bold', color: '#7c3aed' });
        // ลูกบอล
        var by = geo.floorY - ball.y * geo.ppmY - 16;
        var hRel = ball.y - refY();
        // ไม้บรรทัดความสูงจากระดับอ้างอิง
        var rx = geo.ballX - 30;
        if (Math.abs(hRel) > 0.03) E.drawVector(rx, r0, 0, (by + 16) - r0, hRel >= 0 ? '#2563eb' : '#dc2626', '', { width: 2.5, head: 9 });
        E.text('h = ' + fmt(hRel, 2) + ' m', rx - 6, Math.max(120, (r0 + by + 16) / 2), { size: 13, weight: 'bold', color: hRel >= 0 ? '#1d4ed8' : '#b91c1c', baseline: 'middle', align: 'right', stroke: '#fff' });
        var bgd = ctx.createRadialGradient(geo.ballX - 5, by - 6, 2, geo.ballX, by, 16);
        bgd.addColorStop(0, '#fca5a5'); bgd.addColorStop(1, '#dc2626');
        ctx.fillStyle = bgd; ctx.beginPath(); ctx.arc(geo.ballX, by, 16, 0, Math.PI * 2); ctx.fill();
        E.text(m + 'kg', geo.ballX, by + 4, { size: 10, weight: 'bold', color: '#fff', align: 'center' });
        E.drawVector(geo.ballX, by + 18, 0, 24 + m * 4, '#0f766e', 'mg⃗', { width: 3, head: 9 });
        var Epg = m * g * hRel;
        E.card(8, 8, [
            { t: 'Ep = mgh', b: true, s: 14, c: '#1e1b4b' },
            { t: '= (' + m + ')(10)(' + fmt(hRel, 2) + ')', s: 12, c: '#475569' },
            { t: '= ' + fmt(Epg, 1) + ' J', b: true, s: 15, c: Epg >= 0 ? '#1d4ed8' : '#b91c1c' },
            { t: 'W ของ mg⃗ = mg⃗ · s⃗ = −ΔEp', s: 12, c: '#0f766e', b: true }
        ]);

        // ---------- ขวา: ศักย์ยืดหยุ่น ----------
        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(geo.split, 8); ctx.lineTo(geo.split, h - 8); ctx.stroke();
        var sy = geo.sprY;
        ctx.fillStyle = '#e2e8f0'; ctx.fillRect(geo.split + 1, sy + 20, w - geo.split, 6);
        ctx.fillStyle = '#64748b'; ctx.fillRect(geo.wallX - 10, sy - 40, 10, 66);
        var bx = geo.eqX + spr.x * geo.ppmX;
        // ขดสปริง
        var coils = 12, x1 = geo.wallX, x2 = bx - 22, step = (x2 - x1) / coils;
        ctx.strokeStyle = '#10b981'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, sy);
        for (var i = 0; i < coils; i++) { ctx.lineTo(x1 + step * (i + 0.25), sy - 13); ctx.lineTo(x1 + step * (i + 0.75), sy + 13); }
        ctx.lineTo(x2, sy); ctx.stroke();
        // ตำแหน่งสมดุล
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = '#94a3b8';
        ctx.beginPath(); ctx.moveTo(geo.eqX, sy - 50); ctx.lineTo(geo.eqX, sy + 30); ctx.stroke(); ctx.restore();
        E.text('x = 0', geo.eqX, sy - 54, { size: 11, color: '#64748b', align: 'center' });
        // มวล
        ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.roundRect(bx - 22, sy - 20, 44, 40, 6); ctx.fill();
        ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.stroke();
        E.text(m + 'kg', bx, sy + 5, { size: 11, weight: 'bold', color: '#fff', align: 'center' });
        // x⃗ และ F⃗ = −k x⃗
        if (Math.abs(spr.x) > 0.01) {
            E.drawVector(geo.eqX, sy + 42, spr.x * geo.ppmX, 0, '#7c3aed', 'x⃗', { width: 3, head: 9 });
            var Fs = -k * spr.x;
            E.drawVector(bx, sy - 30, M.clamp(Fs * 0.5, -120, 120), 0, '#dc2626', 'F⃗ = −kx⃗', { width: 3.5 });
        }
        var Eps = 0.5 * k * spr.x * spr.x;
        var Eks = 0.5 * m * spr.v * spr.v;

        // กราฟ F–x (พื้นที่ใต้กราฟ = ½kx²)
        var wide = (w - geo.split) > 380;
        var gw = wide ? 150 : Math.min(150, (w - geo.split) - 60), gh = wide ? 90 : 54;
        var gx0 = w - gw - 14, gy0 = wide ? 16 : 112;
        ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.beginPath(); ctx.roundRect(gx0 - 8, gy0 - 6, gw + 16, gh + 30, 8); ctx.fill();
        ctx.strokeStyle = '#e2e8f0'; ctx.stroke();
        var ox = gx0, oy = gy0 + gh;
        var X = Math.abs(spr.x), fmax = 400 * 0.5;
        var px = ox + X / 0.5 * gw, py = oy - (k * X) / fmax * gh;
        ctx.fillStyle = 'rgba(16,185,129,0.35)';
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(px, oy); ctx.lineTo(px, py); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#059669'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + gw, oy - (k * 0.5) / fmax * gh); ctx.stroke();
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(ox, gy0); ctx.lineTo(ox, oy); ctx.lineTo(ox + gw, oy); ctx.stroke();
        E.text('F', ox + 4, gy0 + 8, { size: 11, weight: 'bold' });
        E.text('x', ox + gw - 2, oy + 13, { size: 11, weight: 'bold', align: 'right' });
        E.text('พื้นที่ = ½kx²', ox + gw / 2, oy + 13, { size: 11, color: '#047857', align: 'center' });

        E.card(geo.split + 8, 8, [
            { t: 'Ep = ½kx²', b: true, s: 14, c: '#1e1b4b' },
            { t: '= ½(' + k + ')(' + fmt(spr.x, 2) + ')²', s: 12, c: '#475569' },
            { t: '= ' + fmt(Eps, 1) + ' J', b: true, s: 15, c: '#047857' },
            { t: spr.free ? 'Ek = ' + fmt(Eks, 1) + ' J · รวม ' + fmt(Eps + Eks, 1) + ' J' : 'ลากกล่องเพื่อยืด/หด', s: 12, c: '#475569' }
        ]);
    });
};


// ==========================================
// 5.5 การอนุรักษ์พลังงานกล — ลานสเก็ต
// ==========================================
window.initConservationSimulation = function() {
    var E = new window.SimEngine('simConservation', { height: 370, bg: ['#dbeafe', '#f0f9ff'], grid: false });
    if (!E.ctx) return;

    var g = 9.8, m = 50, mu = 0;
    var L = 10;
    var shape = 'U';
    var TR = {
        U: function(x) { var u = (x - 5) / 5; return 5.5 * u * u; },
        W: function(x) { var u = (x - 5) / 5; return 10 * u * u * u * u - 8 * u * u + 2.5 + 1; },
        S: function(x) { return 5.5 / (1 + Math.exp(1.6 * (x - 3))) + 1.0 * Math.max(0, x - 7.5) * Math.max(0, x - 7.5); }
    };
    function y(x) { return TR[shape](x); }
    function dy(x) { return (y(x + 0.001) - y(x - 0.001)) / 0.002; }

    var s = { x: 1.2, dir: 1, e: 0, heat: 0, dragging: false, crossed: false };
    var trail = [];
    function place(x) { s.x = x; s.e = g * y(x); s.heat = 0; s.dir = x < 5 ? 1 : -1; s.crossed = false; trail = []; }
    place(1.2);

    var geo = {};
    function layout() {
        var w = E.width, h = E.height;
        geo.left = 36; geo.right = w - 150;
        geo.ppx = (geo.right - geo.left) / L;
        geo.base = h - 36;
        geo.ppy = Math.min(geo.ppx, (geo.base - 160) / 6.2);   // เว้นที่ด้านบนให้การ์ดสูตร
    }
    function toPx(x, yy) { return { x: geo.left + x * geo.ppx, y: geo.base - yy * geo.ppy }; }

    E.onDrag({
        down: function(p) {
            layout();
            var q = toPx(s.x, y(s.x));
            if (Math.hypot(p.x - q.x, p.y - (q.y - 16)) < 45) { s.dragging = true; return true; }
            return false;
        },
        move: function(p) { place(M.clamp((p.x - geo.left) / geo.ppx, 0.05, L - 0.05)); s.dragging = true; },
        up: function() { s.dragging = false; },
        hover: function(p) { layout(); var q = toPx(s.x, y(s.x)); return Math.hypot(p.x - q.x, p.y - (q.y - 16)) < 45; }
    });

    E.addSegment([{ v: 'U', t: 'ราง U' }, { v: 'W', t: 'ราง W (มีเนิน)' }, { v: 'S', t: 'ลาดลง' }], shape, function(v) { shape = v; place(v === 'S' ? 0.4 : 1.2); }, { label: 'รูปราง:' });
    E.addSlider({ label: 'มวลนักสเก็ต', min: 20, max: 100, step: 5, value: m, unit: 'kg', onInput: function(v) { m = v; } });
    E.addSlider({ label: 'แรงเสียดทาน μ', min: 0, max: 0.15, step: 0.01, value: mu, format: function(v) { return v.toFixed(2); }, onInput: function(v) { mu = v; } });
    E.addButton('↺ เริ่มใหม่', function() { place(shape === 'S' ? 0.4 : 1.2); }, {});

    E.start(function(dt) {
        if (s.dragging) return;
        var steps = 8, h = dt / steps;
        for (var i = 0; i < steps; i++) {
            var ke = s.e - g * y(s.x);
            var v = Math.sqrt(Math.max(0, 2 * ke));
            var slope = dy(s.x);
            var cosA = 1 / Math.sqrt(1 + slope * slope);
            // ใกล้จุดกลับตัว: เร่งออกจากจุดนิ่งตามทิศลาดลง
            if (v < 0.05) {
                if (mu > 0 && Math.abs(slope) < 0.08) break;   // หยุดนิ่งที่ก้นราง
                s.dir = slope > 0 ? -1 : 1; v = 0.05;
            }
            var nx = s.x + s.dir * v * cosA * h;
            if (nx <= 0.02 || nx >= L - 0.02) { s.dir *= -1; continue; }
            if (s.e - g * y(nx) < 0) { s.dir *= -1; continue; }
            // แรงเสียดทานทำงานลบ: W_f = −μ N s ≈ −μ mg cos α Δs
            if (mu > 0) {
                var ds = Math.abs(nx - s.x) / cosA;
                var loss = mu * g * cosA * ds;
                loss = Math.min(loss, Math.max(0, s.e - g * y(nx)));
                s.e -= loss; s.heat += loss;
            }
            s.x = nx;
        }
        if (shape === 'W' && !s.crossed && ((trail.length && trail[0].x < 5 && s.x > 5) || (trail.length && trail[0].x > 5 && s.x < 5))) {
            s.crossed = true; E.toast('ข้ามเนินได้! E ตั้งต้นพอ 🎉', '#16a34a'); E.burst(E.width * 0.4, 80, 50);
        }
        trail.push({ x: s.x, t: E.time });
        if (trail.length > 70) trail.splice(1, 1);
    }, function(ctx) {
        layout();
        var w = E.width, h = E.height;

        // ภูเขาฉากหลัง
        ctx.fillStyle = 'rgba(148,163,184,0.25)';
        ctx.beginPath(); ctx.moveTo(0, geo.base);
        for (var bx = 0; bx <= w; bx += 20) ctx.lineTo(bx, geo.base - 60 - 30 * Math.sin(bx / 60) - 20 * Math.sin(bx / 23));
        ctx.lineTo(w, geo.base); ctx.fill();

        // ราง
        ctx.beginPath();
        var p0 = toPx(0, y(0)); ctx.moveTo(p0.x, p0.y);
        for (var xx = 0; xx <= L + 1e-6; xx += 0.05) { var q = toPx(xx, y(xx)); ctx.lineTo(q.x, q.y); }
        ctx.lineTo(toPx(L, 0).x, geo.base + 30); ctx.lineTo(p0.x, geo.base + 30); ctx.closePath();
        var tg = ctx.createLinearGradient(0, 0, 0, geo.base);
        tg.addColorStop(0, '#94a3b8'); tg.addColorStop(1, '#475569');
        ctx.fillStyle = tg; ctx.fill();
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y);
        for (xx = 0; xx <= L + 1e-6; xx += 0.05) { q = toPx(xx, y(xx)); ctx.lineTo(q.x, q.y); }
        ctx.strokeStyle = mu > 0 ? '#a16207' : '#1e293b'; ctx.lineWidth = 5; ctx.stroke();
        // ระดับอ้างอิง
        ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(geo.left, geo.base); ctx.lineTo(geo.right, geo.base); ctx.stroke(); ctx.restore();
        E.text('h = 0', geo.left + 2, geo.base + 16, { size: 12, weight: 'bold', color: '#7c3aed' });
        // เส้นระดับพลังงานรวม (จุดสูงสุดที่ไปถึงได้)
        var eh = s.e / g;
        ctx.save(); ctx.setLineDash([3, 6]); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2;
        var ey = geo.base - eh * geo.ppy;
        ctx.beginPath(); ctx.moveTo(geo.left, ey); ctx.lineTo(geo.right, ey); ctx.stroke(); ctx.restore();
        E.text('ระดับพลังงานรวม', geo.right - 4, ey - 5, { size: 11, color: '#15803d', align: 'right', weight: 'bold', stroke: '#fff' });

        // รอยทาง
        trail.forEach(function(t, i) {
            var q = toPx(t.x, y(t.x));
            ctx.fillStyle = 'rgba(234,88,12,' + (i / trail.length * 0.5) + ')';
            ctx.beginPath(); ctx.arc(q.x, q.y - 16, 3, 0, Math.PI * 2); ctx.fill();
        });

        // นักสเก็ต
        var P = toPx(s.x, y(s.x));
        var ang = Math.atan2(-dy(s.x) * geo.ppy, geo.ppx);
        ctx.save();
        ctx.translate(P.x, P.y); ctx.rotate(ang);
        ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(-16, -7, 32, 5, 2); ctx.fill();
        ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(-10, -2, 3, 0, 7); ctx.arc(10, -2, 3, 0, 7); ctx.fill();
        ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.roundRect(-7, -32, 14, 25, 5); ctx.fill();
        ctx.fillStyle = '#fcd34d'; ctx.beginPath(); ctx.arc(0, -40, 8, 0, 7); ctx.fill();
        ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(0, -42, 8, Math.PI, 0); ctx.fill();
        ctx.restore();

        var hh = y(s.x);
        var ke = Math.max(0, s.e - g * hh) * m, pe = m * g * hh, heat = s.heat * m, tot = ke + pe + heat;
        var v = Math.sqrt(Math.max(0, 2 * (s.e - g * hh)));
        // ลูกศรความเร็ว (สัมผัสราง)
        if (v > 0.2) {
            var vl = Math.min(80, v * 9);
            var dirx = s.dir * Math.cos(ang), diry = s.dir * Math.sin(ang);
            E.drawVector(P.x, P.y - 18, dirx * vl, diry * vl, '#ef4444', 'v⃗', { width: 3 });
        }

        // แท่งพลังงาน
        var bx0 = w - 140, baseY = h - 48, maxH = Math.max(120, h - 190);
        var E0 = Math.max(tot, 1);
        E.bar(bx0, baseY, 26, maxH, ke / E0, '#f97316', 'Ek', fmt(ke / 1000, 2));
        E.bar(bx0 + 32, baseY, 26, maxH, pe / E0, '#3b82f6', 'Ep', fmt(pe / 1000, 2));
        E.bar(bx0 + 64, baseY, 26, maxH, heat / E0, '#ef4444', 'ร้อน', fmt(heat / 1000, 2));
        E.bar(bx0 + 96, baseY, 26, maxH, tot / E0, '#10b981', 'รวม', fmt(tot / 1000, 2));
        E.text('หน่วย kJ', bx0 + 60, baseY - maxH - 22, { size: 11, color: '#475569', align: 'center' });

        E.card(10, 10, [
            { t: mu > 0 ? 'Ek₁ + Ep₁ + W(f) = Ek₂ + Ep₂' : 'Ek₁ + Ep₁ = Ek₂ + Ep₂', b: true, s: 14, c: '#1e1b4b' },
            { t: 'h = ' + fmt(hh, 2) + ' m   v = ' + fmt(v, 2) + ' m/s', s: 13, c: '#334155' },
            { t: 'Ek = ½mv² = ' + fmt(ke, 0) + ' J', s: 12, c: '#c2410c' },
            { t: 'Ep = mgh = ' + fmt(pe, 0) + ' J', s: 12, c: '#1d4ed8' },
            { t: mu > 0 ? 'W(f) = f⃗ · s⃗ = −' + fmt(heat, 0) + ' J (กลายเป็นความร้อน)' : 'ไม่มีแรงเสียดทาน → E รวมคงตัว', s: 12, c: mu > 0 ? '#b91c1c' : '#15803d', b: true }
        ]);
        if (shape === 'W' && !s.crossed) E.text('🎯 ลากนักสเก็ตไปปล่อยให้ข้ามเนินกลางได้', geo.left + (geo.right - geo.left) / 2, h - 10, { size: 12, weight: 'bold', color: '#9a3412', align: 'center', stroke: '#fff' });
        else E.text('👆 ลากนักสเก็ตไปวางที่ใดก็ได้แล้วปล่อย', geo.left + (geo.right - geo.left) / 2, h - 10, { size: 12, color: '#334155', align: 'center', stroke: '#fff' });
    });
};
})();
