// sim_ch7.js - Chapter 7 Simulations (Projectile, Circular, SHM)

window.initProjectileSim = function() {
    var engine = new window.SimEngine('simProjectile');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var groundY = H * 0.85;
    var cannonX = 40, cannonY = groundY;
    var angle = 45 * Math.PI / 180;
    var speed = 200;
    var projectile = null;
    var trail = [];
    var g = 300;

    engine.canvas.addEventListener('pointerdown', function(e) {
        // Fire!
        var pos = engine.getPointerPos(e);
        // Adjust angle toward click
        angle = Math.atan2(-(pos.y - cannonY), pos.x - cannonX);
        angle = Math.max(0.1, Math.min(Math.PI / 2, angle));
        projectile = {
            x: cannonX + 30 * Math.cos(angle),
            y: cannonY - 30 * Math.sin(angle),
            vx: speed * Math.cos(angle),
            vy: -speed * Math.sin(angle)
        };
        trail = [{ x: projectile.x, y: projectile.y }];
    });

    engine.start(function(dt) {
        if (!projectile) return;
        projectile.vy += g * dt;
        projectile.x += projectile.vx * dt;
        projectile.y += projectile.vy * dt;
        trail.push({ x: projectile.x, y: projectile.y });
        if (trail.length > 500) trail.shift();
        if (projectile.y > groundY) {
            projectile.y = groundY;
            projectile = null;
        }
    }, function(ctx) {
        // Sky gradient
        var skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
        skyGrad.addColorStop(0, '#bfdbfe');
        skyGrad.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, groundY);

        // Ground
        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, groundY, W, H - groundY);
        ctx.fillStyle = '#65a30d';
        ctx.fillRect(0, groundY, W, 3);

        // Cannon
        ctx.save();
        ctx.translate(cannonX, cannonY);
        ctx.rotate(-angle);
        ctx.fillStyle = '#374151';
        ctx.fillRect(0, -6, 35, 12);
        ctx.restore();
        // Cannon base
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(cannonX, cannonY, 12, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        if (trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(trail[0].x, trail[0].y);
            for (var i = 1; i < trail.length; i++) {
                ctx.lineTo(trail[i].x, trail[i].y);
            }
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Projectile
        if (projectile) {
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(projectile.x, projectile.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#b91c1c';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Velocity vectors
            engine.drawVector(projectile.x, projectile.y, projectile.vx * 0.15, 0, '#3b82f6', 'v\u2093');
            engine.drawVector(projectile.x, projectile.y, 0, projectile.vy * 0.15, '#22c55e', 'v\u1D67');
            // Net velocity
            engine.drawVector(projectile.x, projectile.y, projectile.vx * 0.15, projectile.vy * 0.15, '#f59e0b', '');
        }

        // Angle display
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Projectile Motion', 15, 20);
        ctx.font = '13px sans-serif';
        ctx.fillText('\u03B8 = ' + (angle * 180 / Math.PI).toFixed(0) + '\u00B0', 15, 40);

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('คลิกที่จอเพื่อยิง (คลิกสูง = มุมมาก)', W / 2, H - 8);
    });
};

window.initCircularSim = function() {
    var engine = new window.SimEngine('simCircular');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var cx = W / 2, cy = H / 2;
    var R = Math.min(W, H) * 0.3;
    var theta = 0;
    var omega = 2; // rad/s
    var m = 2;

    engine.start(function(dt) {
        theta += omega * dt;
        if (theta > Math.PI * 2) theta -= Math.PI * 2;
    }, function(ctx) {
        // Orbit path
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Center
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#374151';
        ctx.fill();

        // Ball position
        var bx = cx + R * Math.cos(theta);
        var by = cy + R * Math.sin(theta);

        // String
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Ball
        var grad = ctx.createRadialGradient(bx - 2, by - 2, 2, bx, by, 14);
        grad.addColorStop(0, '#a78bfa');
        grad.addColorStop(1, '#7c3aed');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, 14, 0, Math.PI * 2);
        ctx.fill();

        // Centripetal force vector (pointing toward center)
        var fcx = cx - bx, fcy = cy - by;
        var fcLen = Math.sqrt(fcx * fcx + fcy * fcy);
        var fcScale = 50 / fcLen;
        engine.drawVector(bx, by, fcx * fcScale, fcy * fcScale, '#ef4444', 'Fc');

        // Velocity vector (tangential, perpendicular to radius)
        var vx = -R * omega * Math.sin(theta);
        var vy = R * omega * Math.cos(theta);
        var vLen = Math.sqrt(vx * vx + vy * vy);
        var vScale = 50 / vLen;
        engine.drawVector(bx, by, vx * vScale, vy * vScale, '#3b82f6', 'v');

        // Info
        var v_actual = R * omega * 0.01;
        var Fc_actual = m * v_actual * v_actual / (R * 0.01);
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('Fc = mv\u00B2/r', 15, 25);
        ctx.font = '13px sans-serif';
        ctx.fillText('\u03C9 = ' + omega.toFixed(1) + ' rad/s', 15, 48);
        ctx.fillText('v = ' + v_actual.toFixed(2) + ' m/s', 15, 66);
        ctx.fillText('Fc = ' + Fc_actual.toFixed(1) + ' N', 15, 84);
    });
};

window.initSHMSim = function() {
    var engine = new window.SimEngine('simSHM');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var springY = H * 0.35;
    var wallX = 30;
    var eqX = W * 0.45; // Equilibrium position
    var A = 80; // Amplitude in pixels
    var omega = 4; // angular frequency
    var t = 0;
    var massX = eqX + A;
    var massW = 30, massH = 30;

    // Graph data
    var graphData = [];
    var graphMaxPoints = 200;

    engine.start(function(dt) {
        t += dt;
        massX = eqX + A * Math.cos(omega * t);
        graphData.push({ t: t, x: massX - eqX });
        if (graphData.length > graphMaxPoints) graphData.shift();
    }, function(ctx) {
        // --- Spring section (top) ---
        // Wall
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(wallX - 8, springY - 25, 10, 50);
        // Hatching
        for (var h = springY - 25; h < springY + 25; h += 8) {
            ctx.beginPath();
            ctx.moveTo(wallX - 8, h);
            ctx.lineTo(wallX + 2, h + 8);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Spring (coils)
        var numCoils = 12;
        var springStart = wallX + 2;
        var springEnd = massX - massW / 2;
        var coilWidth = (springEnd - springStart) / numCoils;
        ctx.beginPath();
        ctx.moveTo(springStart, springY);
        for (var i = 0; i < numCoils; i++) {
            var cx1 = springStart + coilWidth * (i + 0.25);
            var cx2 = springStart + coilWidth * (i + 0.75);
            ctx.lineTo(cx1, springY - 15);
            ctx.lineTo(cx2, springY + 15);
        }
        ctx.lineTo(springEnd, springY);
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Mass block
        var grad = ctx.createLinearGradient(massX - massW / 2, springY - massH / 2, massX + massW / 2, springY + massH / 2);
        grad.addColorStop(0, '#ef4444');
        grad.addColorStop(1, '#dc2626');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(massX - massW / 2, springY - massH / 2, massW, massH, 5);
        ctx.fill();
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Equilibrium line
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(eqX, springY - 40);
        ctx.lineTo(eqX, springY + 40);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('x=0', eqX, springY + 52);

        // Displacement marker
        if (Math.abs(massX - eqX) > 3) {
            ctx.beginPath();
            ctx.moveTo(eqX, springY + 35);
            ctx.lineTo(massX, springY + 35);
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            ctx.stroke();
            // Arrow head at mass end
            var dir = massX > eqX ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(massX, springY + 35);
            ctx.lineTo(massX - dir * 8, springY + 30);
            ctx.moveTo(massX, springY + 35);
            ctx.lineTo(massX - dir * 8, springY + 40);
            ctx.stroke();
            ctx.fillStyle = '#f59e0b';
            ctx.fillText('x', (eqX + massX) / 2, springY + 32);
        }

        // --- Graph section (bottom) ---
        var gx = 50, gy = H * 0.55, gw = W - 80, gh = H * 0.35;

        // Graph background
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.roundRect(gx - 10, gy - 10, gw + 20, gh + 25, 8);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.stroke();

        // Axes
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx, gy + gh / 2);
        ctx.lineTo(gx + gw, gy + gh / 2); // t-axis
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx, gy + gh); // x-axis
        ctx.stroke();

        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('t', gx + gw + 10, gy + gh / 2 + 5);
        ctx.textAlign = 'right';
        ctx.fillText('x', gx - 5, gy + 5);

        // Plot displacement
        if (graphData.length > 1) {
            ctx.beginPath();
            var tStart = graphData[0].t;
            var tEnd = graphData[graphData.length - 1].t;
            var tRange = Math.max(tEnd - tStart, 0.1);
            for (var j = 0; j < graphData.length; j++) {
                var px = gx + ((graphData[j].t - tStart) / tRange) * gw;
                var py = gy + gh / 2 - (graphData[j].x / (A * 1.2)) * (gh / 2);
                if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Info
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('x = A cos(\u03C9t)', 15, 20);
        ctx.font = '13px sans-serif';
        ctx.fillText('A = ' + (A * 0.01).toFixed(2) + ' m', W - 150, 20);
        ctx.fillText('\u03C9 = ' + omega.toFixed(1) + ' rad/s', W - 150, 38);
    });
};
