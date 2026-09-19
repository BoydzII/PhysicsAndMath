// sim_ch6.js - Chapter 6 Simulations (Momentum, Impulse, Collision)
(function() {
var M = window.SimMath;
var fmt = M.fmt;

// ==========================================
// 6.1 โมเมนตัม: p⃗ = m v⃗  — โต๊ะแอร์ฮอกกี้ ยิงเก็บดาว
// ==========================================
window.initMomentumSim = function() {
    var E = new window.SimEngine('simMomentum', { height: 360, bg: ['#ecfeff', '#e0f2fe'], grid: false });
    if (!E.ctx) return;

    var m = 1.0;
    var PPM = 60;                       // px ต่อเมตร
    var puck = { x: 2, y: 2.5, vx: 0, vy: 0, r: 0.28 };
    var aim = null;                     // จุดดึงหนังสติ๊ก
    var bounce = null;                  // ภาพ Δp⃗ ตอนชนขอบ
    var slowT = 0;
    var stars = [], score = 0, shots = 0;
    var friction = 0.06;

    // สเกลลูกศรแบบอิ่มตัว: ยาวตาม |p⃗| แต่ไม่ล้นจอ
    function pscale(pm) { return pm > 1e-6 ? 120 * (1 - Math.exp(-pm / 6)) / pm : 0; }
    function dims() { return { w: E.width / PPM, h: E.height / PPM }; }
    function spawnStar() {
        var d = dims();
        stars.push({ x: 0.8 + Math.random() * (d.w - 1.6), y: 0.9 + Math.random() * (d.h - 1.6), a: Math.random() * 6 });
    }
    function resetStars() { stars = []; for (var i = 0; i < 3; i++) spawnStar(); }
    resetStars();

    E.onDrag({
        down: function(p) {
            var dx = p.x / PPM - puck.x, dy = p.y / PPM - puck.y;
            if (Math.hypot(dx, dy) < puck.r + 0.5) { aim = { x: p.x / PPM, y: p.y / PPM }; puck.vx = puck.vy = 0; return true; }
            return false;
        },
        move: function(p) { aim = { x: p.x / PPM, y: p.y / PPM }; },
        up: function() {
            if (!aim) return;
            var dx = puck.x - aim.x, dy = puck.y - aim.y;
            var pull = Math.min(Math.hypot(dx, dy), 2.2);
            var ang = Math.atan2(dy, dx);
            puck.vx = Math.cos(ang) * pull * 3.2;
            puck.vy = Math.sin(ang) * pull * 3.2;
            if (pull > 0.1) shots++;
            aim = null;
        },
        hover: function(p) { return Math.hypot(p.x / PPM - puck.x, p.y / PPM - puck.y) < puck.r + 0.5; }
    });

    E.addSlider({ label: 'มวลลูกฮอกกี้ m', min: 0.2, max: 3, step: 0.1, value: m, unit: 'kg', format: function(v) { return v.toFixed(1) + ' kg'; }, onInput: function(v) { m = v; } });
    E.addSlider({ label: 'แรงเสียดทานโต๊ะ', min: 0, max: 0.3, step: 0.02, value: friction, format: function(v) { return v === 0 ? 'ไม่มี' : v.toFixed(2); }, onInput: function(v) { friction = v; } });
    var row = E.addRow();
    E.addButton('⏹ หยุดลูก', function() { puck.vx = puck.vy = 0; }, { row: row });
    E.addButton('↺ เริ่มเกมใหม่', function() { score = 0; shots = 0; puck.x = 2; puck.y = 2.5; puck.vx = puck.vy = 0; resetStars(); }, { row: row });

    E.start(function(dt) {
        if (slowT > 0) { slowT -= dt; dt *= 0.15; }
        var d = dims();
        var sp = Math.hypot(puck.vx, puck.vy);
        if (sp > 0) {
            var dec = Math.max(0, 1 - friction * dt * 3 / Math.max(sp, 0.3));
            puck.vx *= dec; puck.vy *= dec;
            if (sp < 0.03) puck.vx = puck.vy = 0;
        }
        puck.x += puck.vx * dt; puck.y += puck.vy * dt;
        var before = { x: puck.vx, y: puck.vy }, hit = false;
        if (puck.x < puck.r) { puck.x = puck.r; puck.vx = Math.abs(puck.vx); hit = true; }
        if (puck.x > d.w - puck.r) { puck.x = d.w - puck.r; puck.vx = -Math.abs(puck.vx); hit = true; }
        if (puck.y < puck.r) { puck.y = puck.r; puck.vy = Math.abs(puck.vy); hit = true; }
        if (puck.y > d.h - puck.r) { puck.y = d.h - puck.r; puck.vy = -Math.abs(puck.vy); hit = true; }
        if (hit && Math.hypot(before.x, before.y) > 0.8) {
            bounce = { x: puck.x, y: puck.y, p1: { x: m * before.x, y: m * before.y }, p2: { x: m * puck.vx, y: m * puck.vy }, t: 1.8 };
            slowT = 0.5;
        }
        if (bounce) { bounce.t -= dt / (slowT > 0 ? 0.15 : 1); if (bounce.t <= 0) bounce = null; }
        for (var i = stars.length - 1; i >= 0; i--) {
            var s = stars[i];
            s.a += dt * 2;
            if (Math.hypot(s.x - puck.x, s.y - puck.y) < puck.r + 0.25) {
                score++;
                E.burst(s.x * PPM, s.y * PPM, 30, ['#facc15', '#f59e0b', '#fde68a']);
                stars.splice(i, 1); spawnStar();
                if (score % 5 === 0) E.toast('เก็บดาวได้ ' + score + ' ดวง! ⭐', '#ca8a04');
            }
        }
    }, function(ctx) {
        var w = E.width, h = E.height;
        // โต๊ะ
        ctx.strokeStyle = '#0891b2'; ctx.lineWidth = 6; ctx.strokeRect(3, 3, w - 6, h - 6);
        ctx.strokeStyle = 'rgba(8,145,178,0.25)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
        ctx.beginPath(); ctx.arc(w / 2, h / 2, 50, 0, 7); ctx.stroke();
        for (var gx = 20; gx < w; gx += 24) for (var gy = 20; gy < h; gy += 24) { ctx.fillStyle = 'rgba(8,145,178,0.12)'; ctx.fillRect(gx, gy, 2, 2); }

        // ดาว
        stars.forEach(function(s) {
            var sx = s.x * PPM, sy = s.y * PPM, R = 14 + Math.sin(s.a) * 2;
            ctx.save(); ctx.translate(sx, sy); ctx.rotate(s.a * 0.3);
            ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2;
            ctx.beginPath();
            for (var k = 0; k < 10; k++) { var rr = k % 2 ? R * 0.45 : R, an = k * Math.PI / 5 - Math.PI / 2; ctx.lineTo(rr * Math.cos(an), rr * Math.sin(an)); }
            ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
        });

        var px = puck.x * PPM, py = puck.y * PPM, pr = puck.r * PPM * (0.8 + m * 0.12);
        // หนังสติ๊ก
        if (aim) {
            var ax = aim.x * PPM, ay = aim.y * PPM;
            ctx.strokeStyle = 'rgba(71,85,105,0.7)'; ctx.lineWidth = 3; ctx.setLineDash([6, 5]);
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ax, ay); ctx.stroke(); ctx.setLineDash([]);
            var dx = puck.x - aim.x, dy = puck.y - aim.y, pull = Math.min(Math.hypot(dx, dy), 2.2), an = Math.atan2(dy, dx);
            var vx = Math.cos(an) * pull * 3.2, vy = Math.sin(an) * pull * 3.2;
            var ks = pscale(m * Math.hypot(vx, vy));
            E.drawVector(px, py, vx * m * ks, vy * m * ks, '#dc2626', 'p⃗ = ' + fmt(m * Math.hypot(vx, vy), 2) + ' kg·m/s', { width: 4 });
        }
        // ลูก
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
        var pg = ctx.createRadialGradient(px - pr * 0.3, py - pr * 0.3, 2, px, py, pr);
        pg.addColorStop(0, '#f87171'); pg.addColorStop(1, '#991b1b');
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, pr, 0, 7); ctx.fill();
        ctx.restore();
        E.text(m.toFixed(1) + 'kg', px, py + 4, { size: 11, weight: 'bold', color: '#fff', align: 'center' });

        // เวกเตอร์โมเมนตัมและองค์ประกอบ
        var pxv = m * puck.vx, pyv = m * puck.vy, pm = Math.hypot(pxv, pyv), S = pscale(pm);
        if (!aim && pm > 0.05) {
            E.drawVector(px, py, pxv * S, 0, '#2563eb', 'pₓ', { width: 2.5, dash: [5, 4] });
            E.drawVector(px + pxv * S, py, 0, pyv * S, '#16a34a', 'pᵧ', { width: 2.5, dash: [5, 4] });
            E.drawVector(px, py, pxv * S, pyv * S, '#dc2626', 'p⃗', { width: 4 });
        }

        // Δp⃗ ตอนกระทบขอบ
        if (bounce) {
            var a = Math.min(1, bounce.t);
            ctx.save(); ctx.globalAlpha = a;
            var ox = M.clamp(bounce.x * PPM, 90, w - 90), oy = M.clamp(bounce.y * PPM, 90, h - 90);
            var s2 = pscale(Math.max(Math.hypot(bounce.p1.x, bounce.p1.y), Math.hypot(bounce.p2.x, bounce.p2.y)));
            E.drawVector(ox, oy, bounce.p1.x * s2, bounce.p1.y * s2, '#64748b', 'p⃗', { width: 3 });
            E.drawVector(ox, oy, bounce.p2.x * s2, bounce.p2.y * s2, '#dc2626', "p⃗′", { width: 3 });
            E.drawVector(ox + bounce.p1.x * s2, oy + bounce.p1.y * s2, (bounce.p2.x - bounce.p1.x) * s2, (bounce.p2.y - bounce.p1.y) * s2, '#7c3aed', 'Δp⃗', { width: 4 });
            ctx.restore();
            var dp = Math.hypot(bounce.p2.x - bounce.p1.x, bounce.p2.y - bounce.p1.y);
            E.text('Δp⃗ = p⃗′ − p⃗  (ขนาด ' + fmt(dp, 2) + ') ตั้งฉากกับขอบ', w / 2, h - 14, { size: 13, weight: 'bold', color: '#6d28d9', align: 'center', stroke: '#fff' });
        }

        E.card(12, 12, [
            { t: 'p⃗ = m v⃗', b: true, s: 15, c: '#1e1b4b' },
            { t: 'pₓ = ' + fmt(pxv, 2) + '   pᵧ = ' + fmt(-pyv, 2), s: 12, c: '#334155' },
            { t: '|p⃗| = √(pₓ² + pᵧ²) = ' + fmt(pm, 2) + ' kg·m/s', s: 12, b: true, c: '#b91c1c' },
            { t: '|v⃗| = ' + fmt(Math.hypot(puck.vx, puck.vy), 2) + ' m/s', s: 12, c: '#475569' }
        ]);
        E.card(w - 12, 12, [{ t: '⭐ ' + score + '   🎯 ยิง ' + shots + ' ครั้ง', b: true, s: 13, c: '#92400e' }], { alignRight: true, fill: 'rgba(254,249,195,0.95)', border: '#fde047' });
        if (!bounce && shots === 0) E.text('👆 กดที่ลูก ดึงถอยหลังแบบหนังสติ๊ก แล้วปล่อยไปเก็บดาว', w / 2, h - 14, { size: 13, color: '#155e75', align: 'center', stroke: '#fff', weight: 'bold' });
    });
};


// ==========================================
// 6.2 การดล: I⃗ = F⃗Δt = Δp⃗  — ปล่อยไข่ลงพื้นต่างชนิด
// ==========================================
window.initImpulseSim = function() {
    var E = new window.SimEngine('simImpulse', { height: 370, bg: ['#fefce8', '#fef9c3'], grid: false });
    if (!E.ctx) return;

    var g = 9.8, m = 0.06, BREAK = 25;
    var SURF = {
        concrete: { t: 'คอนกรีต', dt: 0.004, color: '#9ca3af', edge: '#6b7280' },
        wood: { t: 'แผ่นไม้', dt: 0.012, color: '#d97706', edge: '#92400e' },
        sponge: { t: 'ฟองน้ำ', dt: 0.05, color: '#facc15', edge: '#ca8a04' },
        pillow: { t: 'หมอน', dt: 0.15, color: '#c4b5fd', edge: '#7c3aed' }
    };
    var surf = 'wood', H0 = 1.0;
    var st = 'ready';           // ready | fall | impact | done
    var y = H0, v = 0, tImp = 0, broken = false, result = null;
    var history = [];
    var IMPACT_SHOW = 1.1;      // วินาทีที่ใช้แสดงช่วงกระทบแบบสโลว์

    function reset() { st = 'ready'; y = H0; v = 0; broken = false; result = null; tImp = 0; }

    E.addSegment([{ v: 'concrete', t: 'คอนกรีต' }, { v: 'wood', t: 'ไม้' }, { v: 'sponge', t: 'ฟองน้ำ' }, { v: 'pillow', t: 'หมอน' }], surf, function(v) { surf = v; reset(); }, { label: 'พื้น:' });
    E.addSlider({ label: 'ความสูงที่ปล่อย h', min: 0.2, max: 3, step: 0.1, value: H0, unit: 'm', format: function(v) { return v.toFixed(1) + ' m'; }, onInput: function(v) { H0 = v; reset(); } });
    var row = E.addRow();
    E.addButton('🥚 ปล่อยไข่!', function() { reset(); st = 'fall'; }, { primary: true, row: row });
    E.addButton('🧹 ล้างกราฟ', function() { history = []; }, { row: row });

    E.start(function(dt) {
        if (st === 'fall') {
            v += g * dt; y -= v * dt;
            if (y <= 0) {
                y = 0;
                var vImp = Math.sqrt(2 * g * H0);
                var S = SURF[surf];
                var dp = m * vImp;                          // Δp = 0 − (−mv) = mv (ทิศขึ้น)
                var Favg = dp / S.dt + m * g;               // แรงจากพื้นเฉลี่ย
                broken = Favg > BREAK;
                result = { v: vImp, dp: dp, dt: S.dt, F: Favg, surf: surf };
                history.push(result);
                if (history.length > 4) history.shift();
                st = 'impact'; tImp = 0;
            }
        } else if (st === 'impact') {
            tImp += dt;
            if (tImp >= IMPACT_SHOW) {
                st = 'done';
                if (broken) { E.toast('ไข่แตก! F เฉลี่ย ≈ ' + fmt(result.F, 1) + ' N', '#dc2626'); E.burst(E.width * 0.22, E.height - 60, 30, ['#fde047', '#facc15', '#fff7ed']); }
                else { E.toast('รอด! F เฉลี่ยเพียง ' + fmt(result.F, 1) + ' N 🎉', '#16a34a'); E.burst(E.width * 0.22, E.height - 90, 40); }
            }
        }
    }, function(ctx) {
        var w = E.width, h = E.height;
        var leftW = Math.max(170, w * 0.36);
        var floorY = h - 44, topY = 70;
        var ppm = (floorY - topY - 20) / 3;
        var ex = leftW * 0.55;
        var S = SURF[surf];

        // พื้น
        ctx.fillStyle = S.color; ctx.fillRect(10, floorY, leftW - 20, 26);
        ctx.strokeStyle = S.edge; ctx.lineWidth = 2; ctx.strokeRect(10, floorY, leftW - 20, 26);
        E.text(S.t + '  (Δt ≈ ' + (S.dt * 1000) + ' ms)', leftW / 2, floorY + 18, { size: 12, weight: 'bold', color: '#1f2937', align: 'center' });
        // ไม้บรรทัดความสูง
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(22, floorY); ctx.lineTo(22, floorY - 3 * ppm); ctx.stroke();
        for (var i = 0; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(22, floorY - i * ppm); ctx.lineTo(30, floorY - i * ppm); ctx.stroke(); E.text(i + ' m', 34, floorY - i * ppm + 4, { size: 11, color: '#64748b' }); }
        // มือ/จุดปล่อย
        var relY = floorY - H0 * ppm - 16;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = '#f59e0b';
        ctx.beginPath(); ctx.moveTo(ex - 40, relY); ctx.lineTo(ex + 40, relY); ctx.stroke(); ctx.restore();

        // ไข่
        var eyPix = floorY - y * ppm - 16;
        var squash = 1;
        if (st === 'impact') {
            var ph = Math.min(1, tImp / (IMPACT_SHOW * 0.6));
            squash = 1 - Math.sin(ph * Math.PI) * (0.1 + Math.min(0.35, S.dt * 2.5));
            if (broken && ph > 0.5) squash = 0;
        }
        if ((st === 'done' || (st === 'impact' && squash === 0)) && broken) {
            ctx.fillStyle = '#fff7ed';
            ctx.beginPath(); ctx.ellipse(ex, floorY - 3, 34, 7, 0, 0, 7); ctx.fill();
            ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.ellipse(ex + 4, floorY - 5, 12, 6, 0, 0, 7); ctx.fill();
            ctx.fillStyle = '#f5f5f4'; ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 1;
            [[-26, -8, 0.4], [22, -10, -0.5], [-8, -12, 0.1]].forEach(function(s) {
                ctx.save(); ctx.translate(ex + s[0], floorY + s[1]); ctx.rotate(s[2]);
                ctx.beginPath(); ctx.moveTo(-8, 4); ctx.lineTo(-3, -5); ctx.lineTo(2, 1); ctx.lineTo(8, -4); ctx.lineTo(7, 4); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
            });
        } else {
            ctx.save();
            ctx.translate(ex, floorY - 16 * squash - y * ppm);
            ctx.scale(1 + (1 - squash) * 0.6, squash);
            var eg = ctx.createRadialGradient(-5, -7, 2, 0, 0, 20);
            eg.addColorStop(0, '#ffffff'); eg.addColorStop(1, '#e7d3b0');
            ctx.fillStyle = eg; ctx.strokeStyle = '#b8a07a'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.ellipse(0, 0, 13, 16, 0, 0, 7); ctx.fill(); ctx.stroke();
            ctx.restore();
            if (st === 'done' && !broken) E.text('✨', ex + 20, floorY - 30, { size: 18 });
        }
        if (st === 'fall' && v > 0.2) E.drawVector(ex + 22, eyPix, 0, Math.min(70, v * 10), '#2563eb', 'v⃗', { width: 3 });
        if (st === 'impact' && squash > 0) E.drawVector(ex - 26, floorY - 4, 0, -Math.min(80, 20 + result.F), '#dc2626', 'F⃗', { width: 4 });

        // กราฟ F–t
        var gx = leftW + 30, gy = 20, gw = w - leftW - 50, gh = h - 172;
        ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.beginPath(); ctx.roundRect(gx - 20, gy - 10, gw + 34, gh + 40, 10); ctx.fill();
        ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1; ctx.stroke();
        var TMAX = 0.2;
        var FMAXavg = BREAK * 1.6;
        history.forEach(function(r) { FMAXavg = Math.max(FMAXavg, r.F * Math.PI / 2 * 1.1); });
        var oy = gy + gh;
        // เส้นขีดจำกัดไข่แตก
        var byk = oy - BREAK / FMAXavg * gh;
        ctx.save(); ctx.setLineDash([6, 4]); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(gx, byk); ctx.lineTo(gx + gw, byk); ctx.stroke(); ctx.restore();
        E.text('ไข่แตกเมื่อ F > ' + BREAK + ' N', gx + gw - 2, byk - 5, { size: 11, color: '#dc2626', align: 'right', weight: 'bold' });
        history.forEach(function(r, idx) {
            var Sx = SURF[r.surf], latest = idx === history.length - 1;
            var Fpk = (r.dp / r.dt) * Math.PI / 2;
            var prog = latest && st === 'impact' ? Math.min(1, tImp / (IMPACT_SHOW * 0.6)) : 1;
            ctx.beginPath(); ctx.moveTo(gx, oy);
            var N = 60;
            for (var k = 0; k <= N * prog; k++) {
                var tt = (k / N) * r.dt;
                ctx.lineTo(gx + tt / TMAX * gw, oy - (Fpk * Math.sin(Math.PI * k / N)) / FMAXavg * gh);
            }
            ctx.lineTo(gx + (prog * r.dt) / TMAX * gw, oy);
            ctx.closePath();
            ctx.globalAlpha = latest ? 0.45 : 0.18; ctx.fillStyle = Sx.edge; ctx.fill();
            ctx.globalAlpha = latest ? 1 : 0.5; ctx.strokeStyle = Sx.edge; ctx.lineWidth = latest ? 2.5 : 1.5; ctx.stroke();
            ctx.globalAlpha = 1;
        });
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, oy); ctx.lineTo(gx + gw, oy); ctx.stroke();
        E.text('F (N)', gx + 4, gy + 4, { size: 12, weight: 'bold' });
        E.text('t (s)', gx + gw, oy + 16, { size: 12, weight: 'bold', align: 'right' });
        E.text('0.1', gx + gw / 2, oy + 16, { size: 11, color: '#64748b', align: 'center' });
        E.text('พื้นที่ใต้กราฟ = การดล I = Δp', gx + gw / 2, oy + 30, { size: 12, color: '#7c3aed', align: 'center', weight: 'bold' });

        var r = result;
        E.card(leftW + 10, h - 108, [
            { t: 'I⃗ = F⃗Δt = Δp⃗ = mv⃗ − mu⃗', b: true, s: 13, c: '#1e1b4b' },
            { t: r ? 'u = √(2gh) = ' + fmt(r.v, 2) + ' m/s (ลง)' : 'm ไข่ = 60 g', s: 12, c: '#334155' },
            { t: r ? 'Δp = 0 − (−mu) = ' + fmt(r.dp, 3) + ' N·s' : 'Δp เท่ากันทุกพื้น (h เท่ากัน)', s: 12, c: '#7c3aed', b: true },
            { t: r ? 'F = Δp/Δt + mg ≈ ' + fmt(r.F, 1) + ' N' : 'แต่ Δt ต่างกัน → F ต่างกัน!', s: 12, c: r && r.F > BREAK ? '#dc2626' : '#15803d', b: true }
        ]);
    });
};


// ==========================================
// 6.3 การชน: Σp⃗ ก่อน = Σp⃗ หลัง (1 มิติ และ 2 มิติ)
// ==========================================
window.initCollisionSim = function() {
    var E = new window.SimEngine('simCollision', { height: 370, bg: ['#f8fafc', '#eef2ff'] });
    if (!E.ctx) return;

    var mode = '1d', e = 1;
    var m1 = 2, m2 = 3, u1 = 4, u2 = -2, bOff = 0.4;
    var A, B, running = false, collided = false, pre = null, post = null, stuck = false;

    function reset() {
        running = false; collided = false; pre = null; post = null; stuck = false;
        if (mode === '1d') {
            A = { x: 2, y: 0, vx: u1, vy: 0 };
            B = { x: 8, y: 0, vx: u2, vy: 0 };
        } else {
            A = { x: 1.5, y: 0, vx: u1, vy: 0 };
            B = { x: 6, y: bOff * (R(m1) + R(m2)), vx: 0, vy: 0 };   // ระยะเยื้อง (สัดส่วนของผลบวกรัศมี)
        }
        pre = sums();
    }
    function R(mass) { return 0.3 + 0.07 * mass; }
    function sums() {
        return {
            px: m1 * A.vx + m2 * B.vx, py: m1 * A.vy + m2 * B.vy,
            ek: 0.5 * m1 * (A.vx * A.vx + A.vy * A.vy) + 0.5 * m2 * (B.vx * B.vx + B.vy * B.vy),
            pA: { x: m1 * A.vx, y: m1 * A.vy }, pB: { x: m2 * B.vx, y: m2 * B.vy }
        };
    }

    E.addSegment([{ v: '1d', t: '1 มิติ (รถทดลอง)' }, { v: '2d', t: '2 มิติ (ลูกกลม)' }], mode, function(v) { mode = v; slU2.disable(v === '2d'); slB.disable(v === '1d'); reset(); }, { label: 'แบบ:' });
    E.addSegment([{ v: '1', t: 'ยืดหยุ่น' }, { v: '0.5', t: 'ไม่ยืดหยุ่น' }, { v: '0', t: 'ติดกันไป' }], '1', function(v) { e = +v; reset(); }, { label: 'การชน:' });
    var r1 = E.addRow();
    E.addSlider({ label: 'm₁', min: 1, max: 6, step: 0.5, value: m1, unit: 'kg', row: r1, onInput: function(v) { m1 = v; reset(); } });
    E.addSlider({ label: 'u₁', min: 0.5, max: 6, step: 0.5, value: u1, unit: 'm/s', row: r1, onInput: function(v) { u1 = v; reset(); } });
    var r2 = E.addRow();
    E.addSlider({ label: 'm₂', min: 1, max: 6, step: 0.5, value: m2, unit: 'kg', row: r2, onInput: function(v) { m2 = v; reset(); } });
    var slU2 = E.addSlider({ label: 'u₂', min: -6, max: 6, step: 0.5, value: u2, unit: 'm/s', row: r2, onInput: function(v) { u2 = v; reset(); } });
    var slB = E.addSlider({ label: 'ระยะเยื้อง', min: 0, max: 0.95, step: 0.05, value: bOff, format: function(v) { return Math.round(v * 100) + '%'; }, row: r2, onInput: function(v) { bOff = v; reset(); } });
    slB.disable(true);
    var r3 = E.addRow();
    E.addButton('▶ ชน!', function() { if (collided || !running) { if (collided) reset(); running = true; } }, { primary: true, row: r3 });
    E.addButton('↺ ตั้งใหม่', reset, { row: r3 });
    reset();

    function collide() {
        var nx, ny;
        if (mode === '1d') { nx = 1; ny = 0; }
        else { var dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy); nx = dx / d; ny = dy / d; }
        var vrel = (A.vx - B.vx) * nx + (A.vy - B.vy) * ny;
        if (vrel <= 0) return false;
        // การดลตามแนวเส้นเชื่อมจุดศูนย์กลาง: J = (1+e) vrel / (1/m1 + 1/m2)
        var J = (1 + e) * vrel / (1 / m1 + 1 / m2);
        A.vx -= J / m1 * nx; A.vy -= J / m1 * ny;
        B.vx += J / m2 * nx; B.vy += J / m2 * ny;
        if (e === 0 && mode === '1d') stuck = true;
        return true;
    }

    E.start(function(dt) {
        if (!running) return;
        var steps = 6, h = dt / steps;
        for (var i = 0; i < steps; i++) {
            A.x += A.vx * h; A.y += A.vy * h;
            if (stuck) { B.vx = A.vx; B.x = A.x + R(m1) + R(m2); } else { B.x += B.vx * h; B.y += B.vy * h; }
            var dist = Math.hypot(B.x - A.x, B.y - A.y);
            var touch = mode === '1d' ? (B.x - A.x) <= R(m1) + R(m2) : dist <= R(m1) + R(m2);
            if (touch && !stuck && collide()) {
                if (!collided) { collided = true; post = sums(); E.burst(E.width * ((A.x + B.x) / 2) / 10, E.height * 0.45, 16, ['#94a3b8', '#fbbf24']); }
            }
        }
        if (collided) post = sums();
        var out = function(o) { return o.x < -1 || o.x > 11 || Math.abs(o.y) > 3; };
        if (out(A) || out(B)) running = false;
    }, function(ctx) {
        var w = E.width, h = E.height;
        var ppm = w / 10;
        var midY = mode === '1d' ? h * 0.56 : h * 0.44;
        function X(x) { return x * ppm; }
        function Y(y) { return midY + y * ppm; }

        if (mode === '1d') {
            ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, midY + 34, w, 8);
        }
        [[A, m1, '#ef4444', '1'], [B, m2, '#3b82f6', '2']].forEach(function(o) {
            var b = o[0], mass = o[1], col = o[2], rp = R(mass) * ppm;
            if (mode === '1d') {
                var cw = rp * 2, ch = 26 + mass * 3;
                ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.2)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
                ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(X(b.x) - rp, midY + 30 - ch, cw, ch, 6); ctx.fill(); ctx.restore();
                ctx.fillStyle = '#1f2937';
                ctx.beginPath(); ctx.arc(X(b.x) - rp * 0.55, midY + 32, 6, 0, 7); ctx.arc(X(b.x) + rp * 0.55, midY + 32, 6, 0, 7); ctx.fill();
                // กันชน: สปริง (ยืดหยุ่น) / ตีนตุ๊กแก (ติดกัน)
                ctx.strokeStyle = e === 0 ? '#16a34a' : '#475569'; ctx.lineWidth = 3;
                var sx = o[3] === '1' ? X(b.x) + rp : X(b.x) - rp;
                ctx.beginPath(); ctx.moveTo(sx, midY + 30 - ch * 0.75); ctx.lineTo(sx, midY + 30 - ch * 0.25); ctx.stroke();
                E.text('m' + (o[3] === '1' ? '₁' : '₂') + '=' + mass, X(b.x), midY + 30 - ch / 2 + 5, { size: 12, weight: 'bold', color: '#fff', align: 'center' });
                if (Math.abs(b.vx) > 0.05) E.drawVector(X(b.x), midY - ch - 8, b.vx * 14, 0, col, 'v=' + fmt(b.vx, 2), { width: 3 });
            } else {
                ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.2)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
                var gg = ctx.createRadialGradient(X(b.x) - rp * 0.3, Y(b.y) - rp * 0.3, 2, X(b.x), Y(b.y), rp);
                gg.addColorStop(0, '#fff'); gg.addColorStop(0.25, col); gg.addColorStop(1, col);
                ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(X(b.x), Y(b.y), rp, 0, 7); ctx.fill(); ctx.restore();
                E.text(o[3], X(b.x), Y(b.y) + 5, { size: 13, weight: 'bold', color: '#fff', align: 'center' });
                var kk = Math.min(7, 100 / Math.max(1, Math.hypot(pre.px, pre.py)));
                if (Math.hypot(b.vx, b.vy) > 0.05) E.drawVector(X(b.x), Y(b.y), b.vx * mass * kk, b.vy * mass * kk, col, 'p⃗' + (o[3] === '1' ? '₁' : '₂'), { width: 3 });
            }
        });

        var s = sums();
        // การ์ดตัวเลข
        var lines = [{ t: 'Σp⃗ ก่อน = Σp⃗ หลัง', b: true, s: 14, c: '#1e1b4b' }];
        if (mode === '1d') {
            lines.push({ t: 'm₁u₁ + m₂u₂ = m₁v₁ + m₂v₂', s: 12, c: '#334155' });
            lines.push({ t: 'Σp ก่อน = ' + fmt(pre.px, 2) + '   หลัง = ' + (post ? fmt(post.px, 2) : '—') + ' kg·m/s', s: 12, b: true, c: '#7c3aed' });
        } else {
            lines.push({ t: 'แยกแกน: Σpₓ และ Σpᵧ คงตัวทั้งคู่', s: 12, c: '#334155' });
            lines.push({ t: 'pₓ: ' + fmt(pre.px, 2) + ' → ' + fmt(s.px, 2) + '   pᵧ: ' + fmt(-pre.py, 2) + ' → ' + fmt(-s.py, 2), s: 12, b: true, c: '#7c3aed' });
        }
        lines.push({ t: 'ΣEk ก่อน = ' + fmt(pre.ek, 1) + ' J   หลัง = ' + (post ? fmt(post.ek, 1) : '—') + ' J', s: 12, c: post && post.ek < pre.ek - 0.05 ? '#dc2626' : '#15803d', b: true });
        if (post) lines.push({ t: post.ek < pre.ek - 0.05 ? 'พลังงานจลน์หายไป ' + fmt(pre.ek - post.ek, 1) + ' J (เป็นความร้อน/เสียง)' : 'พลังงานจลน์คงตัว → ยืดหยุ่นสมบูรณ์', s: 11, c: '#475569' });
        E.card(10, 10, lines);

        // แผนภาพบวกเวกเตอร์ (2 มิติ) หรือแท่ง Σp (1 มิติ)
        if (mode === '2d' && post) {
            var ox = 36, oy = h - 60, k = Math.min(9, 110 / Math.max(1e-6, Math.hypot(pre.px, pre.py)));
            ctx.fillStyle = 'rgba(255,255,255,0.93)'; ctx.beginPath(); ctx.roundRect(ox - 20, oy - 90, 180, 110, 10); ctx.fill();
            ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
            E.drawVector(ox, oy - 30, pre.px * k, pre.py * k, '#64748b', '', { width: 3 });
            E.drawVector(ox, oy - 30, post.pA.x * k, post.pA.y * k, '#ef4444', "p⃗₁′", { width: 3 });
            E.drawVector(ox + post.pA.x * k, oy - 30 + post.pA.y * k, post.pB.x * k, post.pB.y * k, '#3b82f6', "p⃗₂′", { width: 3 });
            E.text('p⃗₁ = p⃗₁′ + p⃗₂′ (หัวต่อหาง)', ox + 70, oy + 12, { size: 11, weight: 'bold', color: '#334155', align: 'center' });
        }
        if (!running && !collided) E.text('ตั้งค่าแล้วกด ▶ ชน!', w / 2, h - 14, { size: 13, color: '#475569', align: 'center', weight: 'bold' });
    });
};
})();
