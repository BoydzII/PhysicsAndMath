// sim_ch7.js - Chapter 7 Simulations (Projectile, Circular, SHM)
(function() {
var M = window.SimMath;
var fmt = M.fmt;

// ==========================================
// 7.1 โพรเจกไทล์: r⃗ = u⃗t + ½g⃗t² — ยิงให้ลงตะกร้า
// ==========================================
window.initProjectileSim = function() {
    var E = new window.SimEngine('simProjectile', { height: 380, bg: ['#bae6fd', '#f0f9ff'], grid: false });
    if (!E.ctx) return;

    var g = 9.8;
    var ang = 45, u = 15, h0 = 0;
    var ball = null, trail = [], ghosts = [], marks = [];
    var targetX = 20, score = 0, shots = 0;
    var aiming = false;
    var lastRes = null;
    var WORLD_W = 50;

    function newTarget() { targetX = 8 + Math.round(Math.random() * (WORLD_W - 14)); }
    newTarget();

    var geo = {};
    function layout() {
        var w = E.width, h = E.height;
        geo.gY = h - 34;
        geo.x0 = 40;
        geo.ppm = Math.min((w - 70) / WORLD_W, (geo.gY - 40) / 26);
    }
    function P(x, y) { return { x: geo.x0 + x * geo.ppm, y: geo.gY - y * geo.ppm }; }

    function fire() {
        var th = M.rad(ang);
        ball = { x: 0, y: h0, vx: u * Math.cos(th), vy: u * Math.sin(th), t: 0, maxY: h0 };
        trail = [{ x: 0, y: h0 }];
        marks = [];
        shots++;
    }

    E.onDrag({
        down: function(p) {
            layout();
            var c = P(0, h0);
            if (Math.hypot(p.x - c.x, p.y - c.y) < 80) { aiming = true; aimAt(p); return true; }
            return false;
        },
        move: function(p) { if (aiming) aimAt(p); },
        up: function() { if (aiming) { aiming = false; fire(); } },
        hover: function(p) { layout(); var c = P(0, h0); return Math.hypot(p.x - c.x, p.y - c.y) < 80; }
    });
    // ลากถอยหลังจากปืน (แบบหนังสติ๊ก): ทิศตรงข้ามคือทิศยิง ระยะดึงคืออัตราเร็ว
    function aimAt(p) {
        var c = P(0, h0);
        var dx = c.x - p.x, dy = p.y - c.y;
        var a = Math.round(M.deg(Math.atan2(dy, dx)));
        ang = M.clamp(a, 0, 90);
        u = Math.round(M.clamp(Math.hypot(dx, dy) / 5, 5, 25));
        slA.set(ang, true); slU.set(u, true);
    }

    var slA = E.addSlider({ label: 'มุมยิง θ', min: 0, max: 90, value: ang, format: function(v) { return v + '°'; }, onInput: function(v) { ang = v; } });
    var slU = E.addSlider({ label: 'อัตราเร็วต้น u', min: 5, max: 25, value: u, unit: 'm/s', onInput: function(v) { u = v; } });
    E.addSlider({ label: 'ความสูงหน้าผา', min: 0, max: 15, value: h0, unit: 'm', onInput: function(v) { h0 = v; } });
    var row = E.addRow();
    E.addButton('💥 ยิง!', fire, { primary: true, row: row });
    E.addButton('🎯 ย้ายตะกร้า', newTarget, { row: row });
    E.addButton('🧹 ล้างรอย', function() { ghosts = []; trail = []; marks = []; }, { row: row });

    E.start(function(dt) {
        if (!ball) return;
        var steps = 4, h = dt / steps;
        for (var i = 0; i < steps && ball; i++) {
            var px0 = ball.x, py0 = ball.y, pt0 = ball.t;
            ball.t += h;
            ball.vy -= g * h;
            ball.x += ball.vx * h; ball.y += ball.vy * h;
            ball.maxY = Math.max(ball.maxY, ball.y);
            if (ball.t >= marks.length * 0.4) marks.push({ x: ball.x, y: ball.y, vx: ball.vx, vy: ball.vy });
            if (ball.y <= 0) {
                // หาจุดตกด้วยการสอดแทรกเชิงเส้นระหว่างสองขั้นเวลา
                var fr = py0 / (py0 - ball.y);
                ball.x = px0 + (ball.x - px0) * fr;
                ball.t = pt0 + h * fr;
                ball.y = 0;
                trail.push({ x: ball.x, y: 0 });
                var land = ball.x;
                var hit = Math.abs(land - targetX) <= 1.3;
                ghosts.push(trail.slice());
                if (ghosts.length > 4) ghosts.shift();
                var res = { R: land, T: ball.t, H: ball.maxY };
                if (hit) {
                    score++;
                    var tp = P(targetX, 0);
                    E.burst(tp.x, tp.y - 20, 60);
                    E.toast('ลงตะกร้า! 🎯 R = ' + fmt(land, 1) + ' m', '#16a34a');
                    setTimeout(newTarget, 1200);
                } else {
                    E.toast((land < targetX ? 'สั้นไป ' : 'ไกลไป ') + fmt(Math.abs(land - targetX), 1) + ' m', '#ea580c');
                }
                lastRes = res;
                ball = null;
                break;
            }
            trail.push({ x: ball.x, y: ball.y });
        }
    }, function(ctx) {
        layout();
        var w = E.width, h = E.height;
        // เมฆ
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        [[0.2, 40], [0.55, 26], [0.85, 55]].forEach(function(c, i) {
            var cx = (c[0] * w + E.time * (6 + i * 3)) % (w + 120) - 60;
            ctx.beginPath(); ctx.arc(cx, c[1], 16, 0, 7); ctx.arc(cx + 18, c[1] - 8, 20, 0, 7); ctx.arc(cx + 38, c[1], 15, 0, 7); ctx.fill();
        });
        // พื้นหญ้า
        ctx.fillStyle = '#86efac'; ctx.fillRect(0, geo.gY, w, h - geo.gY);
        ctx.fillStyle = '#16a34a'; ctx.fillRect(0, geo.gY, w, 3);
        for (var m = 0; m <= WORLD_W; m += 10) { var q = P(m, 0); E.text(m + ' m', q.x, geo.gY + 18, { size: 11, color: '#166534', align: 'center' }); ctx.fillStyle = '#166534'; ctx.fillRect(q.x - 1, geo.gY, 2, 6); }
        // หน้าผา
        if (h0 > 0) {
            var c0 = P(0, h0);
            ctx.fillStyle = '#a8a29e'; ctx.fillRect(0, c0.y, geo.x0 + 14, geo.gY - c0.y);
            ctx.fillStyle = '#78716c'; ctx.fillRect(0, c0.y, geo.x0 + 14, 4);
        }
        // ตะกร้า
        var tp = P(targetX, 0), bw = 1.3 * geo.ppm * 2;
        ctx.fillStyle = '#b45309';
        ctx.beginPath(); ctx.moveTo(tp.x - bw / 2 - 4, tp.y - 26); ctx.lineTo(tp.x + bw / 2 + 4, tp.y - 26); ctx.lineTo(tp.x + bw / 2 - 3, tp.y); ctx.lineTo(tp.x - bw / 2 + 3, tp.y); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
        for (var k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(tp.x - bw / 2 + k * bw / 4, tp.y - 26); ctx.lineTo(tp.x - bw / 2 + k * bw / 4, tp.y); ctx.stroke(); }
        E.text('🎯 ' + targetX + ' m', tp.x, tp.y - 32, { size: 13, weight: 'bold', color: '#9a3412', align: 'center', stroke: '#fff' });

        // รอยเก่า
        ghosts.forEach(function(tr) {
            ctx.beginPath();
            tr.forEach(function(pt, i) { var q = P(pt.x, pt.y); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
            ctx.strokeStyle = 'rgba(100,116,139,0.35)'; ctx.lineWidth = 2; ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);
        });
        // รอยปัจจุบัน
        if (trail.length > 1) {
            ctx.beginPath();
            trail.forEach(function(pt, i) { var q = P(pt.x, pt.y); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
            ctx.strokeStyle = 'rgba(220,38,38,0.7)'; ctx.lineWidth = 2.5; ctx.stroke();
        }
        // เวกเตอร์ความเร็วทุก 0.4 s: vx คงตัว, vy เปลี่ยน
        var VS = 3.2;
        marks.forEach(function(mk) {
            var q = P(mk.x, mk.y);
            ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(q.x, q.y, 3, 0, 7); ctx.fill();
            E.drawVector(q.x, q.y, mk.vx * VS, 0, 'rgba(37,99,235,0.7)', '', { width: 2, head: 7 });
            E.drawVector(q.x, q.y, 0, -mk.vy * VS, 'rgba(22,163,74,0.7)', '', { width: 2, head: 7 });
        });

        // ปืนใหญ่
        var c = P(0, h0), th = M.rad(ang);
        if (!ball) {
            // เส้นแนวเล็ง (สั้น ๆ ไม่บอกคำตอบ)
            ctx.save(); ctx.setLineDash([4, 6]); ctx.strokeStyle = 'rgba(30,41,59,0.45)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(c.x + Math.cos(th) * (40 + u * 3), c.y - Math.sin(th) * (40 + u * 3)); ctx.stroke(); ctx.restore();
            E.drawVector(c.x, c.y, Math.cos(th) * u * VS, -Math.sin(th) * u * VS, '#f59e0b', 'u⃗', { width: 3.5 });
        }
        ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(-th);
        ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.roundRect(-6, -8, 44, 16, 6); ctx.fill();
        ctx.restore();
        ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(c.x, c.y, 13, Math.PI, 0); ctx.fill();
        ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(c.x - 8, c.y + 2, 6, 0, 7); ctx.arc(c.x + 8, c.y + 2, 6, 0, 7); ctx.fill();
        // มุม
        ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(c.x, c.y, 26, -th, 0); ctx.stroke();

        // ลูกกระสุนและเวกเตอร์
        if (ball) {
            var b = P(ball.x, ball.y);
            E.drawVector(b.x, b.y, ball.vx * VS, 0, '#2563eb', 'vₓ', { width: 2.5 });
            E.drawVector(b.x, b.y, 0, -ball.vy * VS, '#16a34a', 'vᵧ', { width: 2.5 });
            E.drawVector(b.x, b.y, ball.vx * VS, -ball.vy * VS, '#dc2626', 'v⃗', { width: 3.5 });
            ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(b.x, b.y, 7, 0, 7); ctx.fill();
        }

        var th2 = M.rad(ang);
        var ux = u * Math.cos(th2), uy = u * Math.sin(th2);
        var lines = [
            { t: 'v⃗ = u⃗ + g⃗t ,  s⃗ = u⃗t + ½g⃗t²', b: true, s: 13, c: '#1e1b4b' },
            { t: 'uₓ = u cos θ = ' + fmt(ux, 2) + '   uᵧ = u sin θ = ' + fmt(uy, 2), s: 12, c: '#334155' }
        ];
        if (ball) {
            lines.push({ t: 't = ' + fmt(ball.t, 2) + ' s   vₓ = ' + fmt(ball.vx, 2) + ' (คงตัว)', s: 12, c: '#1d4ed8', b: true });
            lines.push({ t: 'vᵧ = uᵧ − gt = ' + fmt(ball.vy, 2) + ' m/s', s: 12, c: '#15803d', b: true });
        } else if (lastRes) {
            lines.push({ t: 'ตกที่ R = ' + fmt(lastRes.R, 2) + ' m   ใช้เวลา ' + fmt(lastRes.T, 2) + ' s', s: 12, c: '#b91c1c', b: true });
            lines.push({ t: 'สูงสุด H = ' + fmt(lastRes.H, 2) + ' m', s: 12, c: '#475569' });
        } else {
            lines.push({ t: 'ลากถอยหลังจากปืนเพื่อเล็ง แล้วปล่อยยิง', s: 12, c: '#475569' });
        }
        E.card(w - 10, 10, lines, { alignRight: true });
        E.card(10, 10, [{ t: '🏆 ลงตะกร้า ' + score + ' / ยิง ' + shots, b: true, s: 13, c: '#92400e' }], { fill: 'rgba(254,249,195,0.95)', border: '#fde047' });
    });
};


// ==========================================
// 7.2 การเคลื่อนที่แบบวงกลม: v⃗ ⟂ a⃗c — ตัดเชือกให้ลงหลุม
// ==========================================
window.initCircularSim = function() {
    var E = new window.SimEngine('simCircular', { height: 380, bg: ['#f5f3ff', '#eef2ff'] });
    if (!E.ctx) return;

    var r = 1.0, v = 3, m = 1, dir = 1;
    var theta = 0, cut = null, trail = [];
    var hole = null, score = 0, tries = 0;

    var geo = {};
    function layout() {
        var w = E.width, h = E.height;
        geo.cx = w * 0.5; geo.cy = h * 0.52;
        geo.ppm = Math.min(w, h) * 0.34 / 1.5;
    }
    function newHole() {
        layout();
        var tries2 = 0, x, y;
        do {
            var a = Math.random() * Math.PI * 2, d = 1.8 + Math.random() * 1.2;
            x = Math.cos(a) * d; y = Math.sin(a) * d;
            var px = geo.cx + x * geo.ppm, py = geo.cy + y * geo.ppm;
            tries2++;
        } while ((px < 40 || px > E.width - 40 || py < 40 || py > E.height - 30 || (px < 270 && py < 130) || (px > E.width - 170 && py < 60)) && tries2 < 80);
        hole = { x: x, y: y };
    }
    newHole();

    E.addSlider({ label: 'รัศมี r', min: 0.5, max: 1.5, step: 0.1, value: r, unit: 'm', format: function(x) { return x.toFixed(1) + ' m'; }, onInput: function(x) { r = x; } });
    E.addSlider({ label: 'อัตราเร็ว v', min: 1, max: 6, step: 0.5, value: v, unit: 'm/s', format: function(x) { return x.toFixed(1) + ' m/s'; }, onInput: function(x) { v = x; } });
    E.addSlider({ label: 'มวล m', min: 0.5, max: 3, step: 0.5, value: m, unit: 'kg', format: function(x) { return x.toFixed(1) + ' kg'; }, onInput: function(x) { m = x; } });
    var row = E.addRow();
    E.addButton('✂️ ตัดเชือก!', function() {
        if (cut) return;
        var bx = r * Math.cos(theta), by = r * Math.sin(theta);
        cut = { x: bx, y: by, vx: -v * dir * Math.sin(theta), vy: v * dir * Math.cos(theta), t: 0 };
        tries++;
    }, { primary: true, cls: 'warn', row: row });
    E.addButton('🔗 ผูกใหม่', function() { cut = null; trail = []; }, { row: row });
    E.addButton('🔄 กลับทิศ', function() { dir = -dir; }, { row: row });
    E.addButton('🕳️ ย้ายหลุม', function() { newHole(); cut = null; }, { row: row });

    E.start(function(dt) {
        if (!cut) {
            theta += dir * (v / r) * dt;       // ω = v / r
            if (theta > Math.PI * 2) theta -= Math.PI * 2;
            if (theta < 0) theta += Math.PI * 2;
            trail.push(theta);
            if (trail.length > 40) trail.shift();
        } else if (!cut.end) {
            cut.t += dt;
            cut.x += cut.vx * dt; cut.y += cut.vy * dt;   // ไม่มีแรงลัพธ์ → เคลื่อนที่เป็นเส้นตรง
            if (hole && Math.hypot(cut.x - hole.x, cut.y - hole.y) < 0.22) {
                cut.end = 'in'; score++;
                E.burst(geo.cx + hole.x * geo.ppm, geo.cy + hole.y * geo.ppm, 60);
                E.toast('ลงหลุม! 🎉 วิ่งตามแนวเส้นสัมผัสพอดี', '#16a34a');
                setTimeout(function() { newHole(); cut = null; trail = []; }, 1500);
            } else if (Math.abs(cut.x * geo.ppm) > E.width || Math.abs(cut.y * geo.ppm) > E.height) {
                cut.end = 'out';
                E.toast('พลาด! ลองตัดเร็วหรือช้ากว่านี้', '#ea580c');
                setTimeout(function() { if (cut && cut.end === 'out') { cut = null; trail = []; } }, 1300);
            }
        }
    }, function(ctx) {
        layout();
        var w = E.width, h = E.height, cx = geo.cx, cy = geo.cy, R = r * geo.ppm;

        // หลุม
        if (hole) {
            var hx = cx + hole.x * geo.ppm, hy = cy + hole.y * geo.ppm;
            var hg = ctx.createRadialGradient(hx, hy, 2, hx, hy, 18);
            hg.addColorStop(0, '#0f172a'); hg.addColorStop(1, '#475569');
            ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(hx, hy, 16, 0, 7); ctx.fill();
            ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hx, hy, 20 + Math.sin(E.time * 4) * 2, 0, 7); ctx.stroke();
        }
        // วงโคจร
        ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = '#a5b4fc'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.restore();
        // รอยหาง
        if (!cut) trail.forEach(function(t, i) {
            ctx.fillStyle = 'rgba(124,58,237,' + (i / trail.length * 0.35) + ')';
            ctx.beginPath(); ctx.arc(cx + R * Math.cos(t), cy + R * Math.sin(t), 4 + i / trail.length * 6, 0, 7); ctx.fill();
        });
        // หมุด
        ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 7); ctx.fill();

        var br = 10 + m * 3;
        if (!cut) {
            var bx = cx + R * Math.cos(theta), by = cy + R * Math.sin(theta);
            ctx.strokeStyle = '#78716c'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
            var gg = ctx.createRadialGradient(bx - 4, by - 4, 2, bx, by, br);
            gg.addColorStop(0, '#c4b5fd'); gg.addColorStop(1, '#6d28d9');
            ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(bx, by, br, 0, 7); ctx.fill();
            // เวกเตอร์ v⃗ (สัมผัส) และ a⃗c (เข้าศูนย์กลาง) + มุมฉาก
            var tx = -dir * Math.sin(theta), ty = dir * Math.cos(theta);
            var nx = -Math.cos(theta), ny = -Math.sin(theta);
            var Lv = 20 + v * 12, La = Math.min(R - 12, 16 + (v * v / r) * 2.2);
            E.drawVector(bx, by, tx * Lv, ty * Lv, '#2563eb', 'v⃗', { width: 3.5 });
            E.drawVector(bx, by, nx * La, ny * La, '#dc2626', 'F⃗c', { width: 3.5 });
            var sq = 11;
            ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(bx + tx * sq, by + ty * sq); ctx.lineTo(bx + tx * sq + nx * sq, by + ty * sq + ny * sq); ctx.lineTo(bx + nx * sq, by + ny * sq); ctx.stroke();
        } else {
            // เส้นทางหลังตัดเชือก: ตามแนวเส้นสัมผัส
            ctx.save(); ctx.setLineDash([4, 5]); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
            var sx = cx + (cut.x - cut.vx * cut.t) * geo.ppm, sy = cy + (cut.y - cut.vy * cut.t) * geo.ppm;
            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(cx + cut.x * geo.ppm, cy + cut.y * geo.ppm); ctx.stroke(); ctx.restore();
            var px = cx + cut.x * geo.ppm, py = cy + cut.y * geo.ppm;
            if (cut.end !== 'in') {
                ctx.fillStyle = '#6d28d9'; ctx.beginPath(); ctx.arc(px, py, br, 0, 7); ctx.fill();
                var sp = Math.hypot(cut.vx, cut.vy);
                E.drawVector(px, py, cut.vx / sp * (20 + v * 12), cut.vy / sp * (20 + v * 12), '#2563eb', 'v⃗ (คงตัว)', { width: 3.5 });
            }
        }

        var w_ = v / r, ac = v * v / r, Fc = m * ac, T = 2 * Math.PI / w_;
        E.card(10, 10, [
            { t: 'v⃗ · a⃗c = va cos 90° = 0', b: true, s: 14, c: '#1e1b4b' },
            { t: '⇒ F⃗c ไม่ทำงาน อัตราเร็วจึงคงตัว', s: 12, c: '#6d28d9', b: true },
            { t: 'ω = v/r = ' + fmt(w_, 2) + ' rad/s   T = ' + fmt(T, 2) + ' s', s: 12, c: '#334155' },
            { t: 'ac = v²/r = ' + fmt(ac, 2) + ' m/s²', s: 12, c: '#b91c1c' },
            { t: 'Fc = mv²/r = ' + fmt(Fc, 2) + ' N', s: 13, c: '#b91c1c', b: true }
        ]);
        E.card(w - 10, 10, [{ t: '🕳️ ลงหลุม ' + score + ' / ' + tries, b: true, s: 13, c: '#92400e' }], { alignRight: true, fill: 'rgba(254,249,195,0.95)', border: '#fde047' });
        if (!cut && tries === 0) E.text('กด ✂️ ตัดเชือก ให้ลูกบอลพุ่งลงหลุม', w / 2, h - 12, { size: 13, weight: 'bold', color: '#4c1d95', align: 'center', stroke: '#fff' });
    });
};


// ==========================================
// 7.3 SHM: F⃗ = −kx⃗ , a⃗ = −ω²x⃗
// ==========================================
window.initSHMSim = function() {
    var E = new window.SimEngine('simSHM', { height: 400, bg: ['#f8fafc', '#f1f5f9'] });
    if (!E.ctx) return;

    var g = 9.8;
    var mode = 'spring';
    var m = 0.5, k = 20, L = 1.0;
    var A = 0.15;               // แอมพลิจูด (m) หรือมุม (rad) สำหรับลูกตุ้ม
    var t = 0, running = true, dragging = false;
    var hist = [];
    var counter = { n: 0, t0: null, last: null, prevX: 0 };
    var targetT = 1.0;
    var TARGETS = [0.8, 1.0, 1.2, 1.5, 2.0];
    var solved = false;

    function omega() { return mode === 'spring' ? Math.sqrt(k / m) : Math.sqrt(g / L); }
    function period() { return 2 * Math.PI / omega(); }
    function restart() { t = 0; hist = []; counter = { n: 0, t0: null, last: null, prevX: 0 }; }
    function checkTarget() {
        if (!solved && Math.abs(period() - targetT) < 0.02) {
            solved = true;
            E.toast('คาบ T = ' + fmt(period(), 2) + ' s ตรงเป้า! 🎉', '#16a34a');
            E.burst(E.width * 0.25, 90, 60);
        }
    }
    function newTarget() { var n; do { n = TARGETS[Math.floor(Math.random() * TARGETS.length)]; } while (n === targetT); targetT = n; solved = false; checkTarget(); }

    var geo = {};
    function layout() {
        var w = E.width, h = E.height;
        geo.split = Math.max(230, w * 0.45);
        geo.eqX = geo.split * 0.55;
        geo.sprY = h * 0.52;
        geo.ppm = Math.min(300, (geo.split * 0.36) / 0.25);
        geo.pivY = 120;
        geo.Lpx = Math.min(h - 150, 160) * (0.45 + L * 0.35);
    }
    function state() {
        var w0 = omega();
        return { x: A * Math.cos(w0 * t), v: -A * w0 * Math.sin(w0 * t), a: -A * w0 * w0 * Math.cos(w0 * t) };
    }

    E.onDrag({
        down: function(p) {
            layout();
            var q = massPos();
            if (Math.hypot(p.x - q.x, p.y - q.y) < 45) { dragging = true; return true; }
            return false;
        },
        move: function(p) {
            if (mode === 'spring') A = M.clamp((p.x - geo.eqX) / geo.ppm, -0.25, 0.25);
            else A = M.clamp(Math.atan2(p.x - geo.eqX, p.y - geo.pivY), -0.35, 0.35);
            t = 0; hist = [];
        },
        up: function() { dragging = false; restart(); if (A < 0) { A = -A; t = Math.PI / omega(); } if (A < 0.01) A = mode === 'spring' ? 0.1 : 0.2; },
        hover: function(p) { layout(); var q = massPos(); return Math.hypot(p.x - q.x, p.y - q.y) < 45; }
    });
    function massPos() {
        var s = state();
        if (dragging) s.x = A;
        if (mode === 'spring') return { x: geo.eqX + s.x * geo.ppm, y: geo.sprY };
        return { x: geo.eqX + Math.sin(s.x) * geo.Lpx, y: geo.pivY + Math.cos(s.x) * geo.Lpx };
    }

    var seg = E.addSegment([{ v: 'spring', t: 'มวล–สปริง' }, { v: 'pend', t: 'ลูกตุ้มอย่างง่าย' }], mode, function(v) {
        mode = v; A = v === 'spring' ? 0.15 : 0.25;
        slK.el.style.display = v === 'spring' ? '' : 'none';
        slL.el.style.display = v === 'spring' ? 'none' : '';
        solved = false; restart(); checkTarget();
    }, { label: 'ระบบ:' });
    var slM = E.addSlider({ label: 'มวล m', min: 0.1, max: 2, step: 0.05, value: m, unit: 'kg', format: function(v) { return v.toFixed(2) + ' kg'; }, onInput: function(v) { m = v; restart(); checkTarget(); } });
    var slK = E.addSlider({ label: 'ค่านิจสปริง k', min: 2, max: 80, step: 1, value: k, unit: 'N/m', onInput: function(v) { k = v; restart(); checkTarget(); } });
    var slL = E.addSlider({ label: 'ความยาวเชือก L', min: 0.1, max: 2.5, step: 0.05, value: L, unit: 'm', format: function(v) { return v.toFixed(2) + ' m'; }, onInput: function(v) { L = v; restart(); checkTarget(); } });
    slL.el.style.display = 'none';
    var row = E.addRow();
    var btn = E.addButton('⏸ หยุด', function() { running = !running; btn.innerHTML = running ? '⏸ หยุด' : '▶ เล่น'; }, { primary: true, row: row });
    E.addButton('🎯 เป้าคาบใหม่', newTarget, { row: row });

    E.start(function(dt) {
        if (!running || dragging) return;
        t += dt;
        var s = state();
        hist.push({ t: t, x: s.x, v: s.v, a: s.a });
        while (hist.length && t - hist[0].t > 4) hist.shift();
        // จับเวลาอัตโนมัติ: นับการผ่านจุดสมดุลขาเดียวกัน
        if (counter.prevX < 0 && s.x >= 0) {
            if (counter.t0 === null) counter.t0 = t; else { counter.n++; counter.last = t; }
        }
        counter.prevX = s.x;
    }, function(ctx) {
        layout();
        var w = E.width, h = E.height, s = state();
        if (dragging) { s = { x: A, v: 0, a: -omega() * omega() * A }; }
        var w0 = omega();

        if (mode === 'spring') {
            var y = geo.sprY, wallX = 22;
            ctx.fillStyle = '#e2e8f0'; ctx.fillRect(10, y + 22, geo.split - 20, 6);
            ctx.fillStyle = '#64748b'; ctx.fillRect(wallX - 10, y - 40, 10, 68);
            var mx = geo.eqX + s.x * geo.ppm, bw = 26 + m * 16;
            var coils = 12, x1 = wallX, x2 = mx - bw / 2, st = (x2 - x1) / coils;
            ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y);
            for (var i = 0; i < coils; i++) { ctx.lineTo(x1 + st * (i + 0.25), y - 12); ctx.lineTo(x1 + st * (i + 0.75), y + 12); }
            ctx.lineTo(x2, y); ctx.stroke();
            ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = '#94a3b8';
            ctx.beginPath(); ctx.moveTo(geo.eqX, y - 70); ctx.lineTo(geo.eqX, y + 60); ctx.stroke(); ctx.restore();
            E.text('x = 0', geo.eqX, y + 74, { size: 11, color: '#64748b', align: 'center' });
            ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.roundRect(mx - bw / 2, y - 20, bw, 40, 6); ctx.fill();
            E.text(m.toFixed(2), mx, y + 5, { size: 11, weight: 'bold', color: '#fff', align: 'center' });
            var S = geo.ppm;
            if (Math.abs(s.x) > 0.005) E.drawVector(geo.eqX, y + 42, s.x * S, 0, '#7c3aed', 'x⃗', { width: 3, head: 9 });
            if (Math.abs(s.v) > 0.01) E.drawVector(mx, y - 30, M.clamp(s.v / w0 * S, -110, 110), 0, '#2563eb', 'v⃗', { width: 3, head: 9 });
            if (Math.abs(s.a) > 0.01) E.drawVector(mx, y - 52, M.clamp(s.a / (w0 * w0) * S, -110, 110), 0, '#dc2626', 'a⃗ = −ω²x⃗', { width: 3, head: 9 });
        } else {
            var px = geo.eqX, py = geo.pivY;
            ctx.fillStyle = '#475569'; ctx.fillRect(px - 50, py - 8, 100, 8);
            var q = massPos();
            if (dragging) q = { x: px + Math.sin(A) * geo.Lpx, y: py + Math.cos(A) * geo.Lpx };
            ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = '#94a3b8';
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + geo.Lpx + 30); ctx.stroke(); ctx.restore();
            ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(q.x, q.y); ctx.stroke();
            var br = 10 + m * 6;
            var bg = ctx.createRadialGradient(q.x - 4, q.y - 4, 2, q.x, q.y, br);
            bg.addColorStop(0, '#fca5a5'); bg.addColorStop(1, '#b91c1c');
            ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(q.x, q.y, br, 0, 7); ctx.fill();
            var th = s.x, tx = Math.cos(th), ty = -Math.sin(th);
            var sc = geo.Lpx;
            if (Math.abs(s.v) > 0.01) E.drawVector(q.x, q.y, M.clamp(s.v / w0 * sc, -100, 100) * tx, M.clamp(s.v / w0 * sc, -100, 100) * ty, '#2563eb', 'v⃗', { width: 3, head: 9 });
            if (Math.abs(s.a) > 0.01) E.drawVector(q.x, q.y + br + 4, M.clamp(s.a / (w0 * w0) * sc, -100, 100), 0, '#dc2626', 'a⃗', { width: 3, head: 9 });
            E.text('L = ' + L.toFixed(2) + ' m', px + 8, py + geo.Lpx / 2, { size: 12, color: '#475569' });
        }

        // กราฟ x–t, v–t, a–t
        var gx = geo.split + 20, gw = w - gx - 16;
        var top = 16, each = (h - top - 16) / 3;
        var rows = [['x', '#7c3aed', 'x', A], ['v', '#2563eb', 'v', A * w0], ['a', '#dc2626', 'a', A * w0 * w0]];
        rows.forEach(function(rw, i) {
            var y0 = top + i * each, gh = each - 10, mid = y0 + gh / 2;
            ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.beginPath(); ctx.roundRect(gx - 8, y0 - 4, gw + 12, gh + 8, 8); ctx.fill();
            ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
            ctx.strokeStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(gx, mid); ctx.lineTo(gx + gw, mid); ctx.stroke();
            if (hist.length > 1) {
                var tEnd = hist[hist.length - 1].t;
                ctx.beginPath();
                hist.forEach(function(pt, j) {
                    var X = gx + gw - (tEnd - pt.t) / 4 * gw;
                    var Y = mid - pt[rw[2]] / (rw[3] * 1.15 || 1) * (gh / 2);
                    if (j) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
                });
                ctx.strokeStyle = rw[1]; ctx.lineWidth = 2.2; ctx.stroke();
            }
            E.text(rw[0] + '–t', gx + 2, y0 + 12, { size: 12, weight: 'bold', color: rw[1] });
        });

        var T = period();
        var measured = counter.n > 0 ? (counter.last - counter.t0) / counter.n : null;
        E.card(10, 10, [
            { t: 'a⃗ = −ω²x⃗ ,  ω = ' + (mode === 'spring' ? '√(k/m)' : '√(g/L)'), b: true, s: 13, c: '#1e1b4b' },
            { t: 'T = 2π' + (mode === 'spring' ? '√(m/k)' : '√(L/g)') + ' = ' + fmt(T, 2) + ' s', s: 13, b: true, c: '#0f766e' },
            { t: 'จับเวลา: ' + counter.n + ' รอบ' + (measured ? ' → T ≈ ' + fmt(measured, 2) + ' s' : ''), s: 12, c: '#475569' },
            { t: '🎯 ปรับให้ T = ' + targetT.toFixed(2) + ' s ' + (solved ? '✔' : ''), s: 12, b: true, c: solved ? '#15803d' : '#9a3412' }
        ]);
        if (hist.length < 5 && !dragging) E.text('ลากมวลเพื่อตั้งแอมพลิจูด', geo.split / 2, h - 12, { size: 12, color: '#475569', align: 'center' });
    });
};
})();
