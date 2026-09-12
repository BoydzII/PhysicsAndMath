// sim_ch5.js - Chapter 5 Simulations (Work, Power, Kinetic, Potential, Conservation)

window.initWorkSimulation = function() {
    var engine = new window.SimEngine('simWork');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var groundY = H * 0.7;
    var bw = 60, bh = 45;
    var blockX = W * 0.3;
    var isDragging = false;
    var startX = blockX;
    var distance = 0;
    var angle = 30 * Math.PI / 180;
    var F = 80;
    var friction = 30;

    engine.canvas.addEventListener('pointerdown', function(e) {
        var pos = engine.getPointerPos(e);
        if (pos.x > blockX - bw/2 && pos.x < blockX + bw/2 && pos.y > groundY - bh && pos.y < groundY) {
            isDragging = true;
            startX = blockX;
            engine.canvas.setPointerCapture(e.pointerId);
        }
    });
    engine.canvas.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        var pos = engine.getPointerPos(e);
        blockX = Math.max(bw/2 + 10, Math.min(W - bw/2 - 10, pos.x));
        distance = Math.abs(blockX - startX);
    });
    engine.canvas.addEventListener('pointerup', function() { isDragging = false; });

    engine.start(function(dt) {}, function(ctx) {
        // Ground
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(0, groundY, W, H - groundY);
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(0, groundY, W, 3);

        // Block (gradient)
        var grad = ctx.createLinearGradient(blockX - bw/2, groundY - bh, blockX + bw/2, groundY);
        grad.addColorStop(0, '#e74c3c');
        grad.addColorStop(1, '#c0392b');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(blockX - bw/2, groundY - bh, bw, bh, 6);
        ctx.fill();
        ctx.strokeStyle = '#a93226';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('m', blockX, groundY - bh/2 + 5);

        // Vectors
        if (isDragging && distance > 5) {
            var dir = blockX > startX ? 1 : -1;
            engine.drawVector(blockX, groundY - bh/2, dir * 80, -40, '#3498db', 'F');
            engine.drawVector(blockX, groundY - 5, -dir * 40, 0, '#e67e22', 'f');
        }

        // Info
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 16px sans-serif';
        var workNet = (F * Math.cos(angle) - friction) * (distance / 100);
        ctx.fillText('W = Fs cos\u03B8', 15, 25);
        ctx.font = '14px sans-serif';
        ctx.fillText('ระยะทาง = ' + (distance / 100).toFixed(2) + ' m', 15, 48);
        ctx.fillText('งานสุทธิ = ' + workNet.toFixed(1) + ' J', 15, 68);
        ctx.fillStyle = '#6b7280';
        ctx.font = '13px sans-serif';
        ctx.fillText('\u2190 ลากกล่องไปมา \u2192', W/2 - 60, H - 10);
    });
};

window.initPowerSimulation = function() {
    var engine = new window.SimEngine('simPower');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var m = 200, g = 9.8;
    var boxW = 50, boxH = 40;
    var boxY = H - 60;
    var vy = 0;
    var lifting = false;
    var Flift = m * g + 200;

    engine.canvas.addEventListener('pointerdown', function() { lifting = true; });
    engine.canvas.addEventListener('pointerup', function() { lifting = false; });

    engine.start(function(dt) {
        if (lifting) {
            var a = (Flift - m * g) / m;
            vy += a * dt;
            boxY -= vy * dt * 30;
        } else {
            vy += g * dt * 0.5;
            boxY += vy * dt * 20;
        }
        if (boxY > H - 60) { boxY = H - 60; vy = 0; }
        if (boxY < 50) { boxY = 50; vy = 0; }
    }, function(ctx) {
        var cx = W / 2;
        // Wire
        ctx.beginPath();
        ctx.moveTo(cx, 10);
        ctx.lineTo(cx, boxY);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Pulley
        ctx.beginPath();
        ctx.arc(cx, 15, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#64748b';
        ctx.fill();

        // Box (gradient)
        var grad = ctx.createLinearGradient(cx - boxW/2, boxY, cx + boxW/2, boxY + boxH);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(1, '#d97706');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(cx - boxW/2, boxY, boxW, boxH, 5);
        ctx.fill();
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Vectors
        if (lifting) engine.drawVector(cx, boxY, 0, -50, '#22c55e', 'F');
        engine.drawVector(cx + 5, boxY + boxH, 0, 30, '#ef4444', 'mg');

        // Power bar
        var power = lifting && vy > 0 ? Flift * vy : 0;
        var barH = Math.min(power * 0.3, H - 30);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(W - 50, H - 20 - barH, 30, barH);
        ctx.strokeStyle = '#1e40af';
        ctx.strokeRect(W - 50, H - 20 - barH, 30, barH);
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('P', W - 35, H - 5);
        ctx.fillText(power.toFixed(0) + ' W', W - 35, H - 25 - barH);

        // Info
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('P = Fv', 15, 25);
        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#6b7280';
        ctx.fillText('\u2191 กดค้างเพื่อยก \u2191', 15, H - 10);
    });
};

window.initKineticSimulation = function() {
    var engine = new window.SimEngine('simKinetic');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var groundY = H * 0.65;
    var carX = W * 0.2, carW = 70, carH = 30;
    var v = 0, m = 5;
    var isDragging = false;
    var lastX = 0;

    engine.canvas.addEventListener('pointerdown', function(e) {
        var pos = engine.getPointerPos(e);
        if (pos.y > groundY - carH - 10 && pos.y < groundY + 10) {
            isDragging = true;
            lastX = pos.x;
            engine.canvas.setPointerCapture(e.pointerId);
        }
    });
    engine.canvas.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        var pos = engine.getPointerPos(e);
        v = (pos.x - lastX) * 2;
        carX = Math.max(carW/2, Math.min(W - carW/2, pos.x));
        lastX = pos.x;
    });
    engine.canvas.addEventListener('pointerup', function() { isDragging = false; });

    engine.start(function(dt) {
        if (!isDragging) {
            carX += v * dt;
            v *= 0.98;
            if (carX < carW/2) { carX = carW/2; v = Math.abs(v); }
            if (carX > W - carW/2) { carX = W - carW/2; v = -Math.abs(v); }
        }
    }, function(ctx) {
        // Road
        ctx.fillStyle = '#374151';
        ctx.fillRect(0, groundY, W, H - groundY);
        ctx.setLineDash([20, 15]);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY + (H - groundY) / 2);
        ctx.lineTo(W, groundY + (H - groundY) / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Car body
        var grad = ctx.createLinearGradient(carX - carW/2, groundY - carH, carX + carW/2, groundY);
        grad.addColorStop(0, '#3b82f6');
        grad.addColorStop(1, '#2563eb');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(carX - carW/2, groundY - carH, carW, carH, 5);
        ctx.fill();
        // Wheels
        ctx.fillStyle = '#1f2937';
        ctx.beginPath(); ctx.arc(carX - carW/4, groundY, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(carX + carW/4, groundY, 8, 0, Math.PI * 2); ctx.fill();

        // Velocity vector
        if (Math.abs(v) > 2) {
            engine.drawVector(carX, groundY - carH/2, v * 0.5, 0, '#ef4444', 'v');
        }

        // KE Bar
        var KE = 0.5 * m * (v/100) * (v/100);
        var barH = Math.min(KE * 20, 120);
        ctx.fillStyle = '#f97316';
        ctx.fillRect(W - 60, 30, 35, barH);
        ctx.strokeStyle = '#ea580c';
        ctx.strokeRect(W - 60, 30, 35, barH);
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('KE', W - 42, 25);
        ctx.fillText(KE.toFixed(1) + ' J', W - 42, 50 + barH);

        // Info
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('KE = \u00BDmv\u00B2', 15, 25);
        ctx.font = '13px sans-serif';
        ctx.fillText('v = ' + (v/100).toFixed(2) + ' m/s', 15, 48);
        ctx.fillStyle = '#6b7280';
        ctx.fillText('\u2190 ลากรถไปมา \u2192', 15, H - 10);
    });
};

window.initPotentialSimulation = function() {
    var engine = new window.SimEngine('simPotential');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var ballR = 15;
    var ballY = H * 0.3;
    var groundY = H * 0.85;
    var m = 2, g = 10;
    var isDragging = false;

    engine.canvas.addEventListener('pointerdown', function(e) {
        var pos = engine.getPointerPos(e);
        if (Math.abs(pos.x - W * 0.3) < 30 && Math.abs(pos.y - ballY) < 30) {
            isDragging = true;
            engine.canvas.setPointerCapture(e.pointerId);
        }
    });
    engine.canvas.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        var pos = engine.getPointerPos(e);
        ballY = Math.max(ballR + 20, Math.min(groundY - ballR, pos.y));
    });
    engine.canvas.addEventListener('pointerup', function() { isDragging = false; });

    // Spring section
    var springK = 200, springX0 = W * 0.75, springX = springX0;
    var springDrag = false;
    engine.canvas.addEventListener('pointerdown', function(e) {
        var pos = engine.getPointerPos(e);
        if (Math.abs(pos.x - springX) < 20 && Math.abs(pos.y - (groundY - 20)) < 30) {
            springDrag = true;
            engine.canvas.setPointerCapture(e.pointerId);
        }
    });
    engine.canvas.addEventListener('pointermove', function(e) {
        if (!springDrag) return;
        var pos = engine.getPointerPos(e);
        springX = Math.max(springX0 - 80, Math.min(springX0 + 80, pos.x));
    });
    engine.canvas.addEventListener('pointerup', function() { springDrag = false; });

    engine.start(function(dt) {}, function(ctx) {
        // Divider
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#cbd5e1';
        ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();
        ctx.setLineDash([]);

        // --- Left: Gravity PE ---
        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('พลังงานศักย์โน้มถ่วง', W * 0.25, 18);

        // Ground
        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, groundY, W/2, H - groundY);

        // Height line
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath(); ctx.moveTo(W * 0.15, ballY); ctx.lineTo(W * 0.15, groundY); ctx.stroke();
        ctx.setLineDash([]);
        var h = (groundY - ballY) / 30;
        ctx.fillStyle = '#64748b';
        ctx.font = '13px sans-serif';
        ctx.fillText('h = ' + h.toFixed(1) + ' m', W * 0.15, (ballY + groundY) / 2);

        // Ball
        var grad = ctx.createRadialGradient(W * 0.3 - 4, ballY - 4, 2, W * 0.3, ballY, ballR);
        grad.addColorStop(0, '#fbbf24');
        grad.addColorStop(1, '#f59e0b');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(W * 0.3, ballY, ballR, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2; ctx.stroke();

        // PE gravity
        var PE_grav = m * g * h;
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('PE = mgh = ' + PE_grav.toFixed(0) + ' J', W * 0.25, groundY + 25);

        // --- Right: Spring PE ---
        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('พลังงานศักย์ยืดหยุ่น', W * 0.75, 18);

        // Wall
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(W/2 + 10, groundY - 60, 8, 60);

        // Spring (zigzag)
        var sx0 = W/2 + 18, sy = groundY - 30;
        var numCoils = 10;
        var coilW = (springX - sx0) / numCoils;
        ctx.beginPath();
        ctx.moveTo(sx0, sy);
        for (var i = 0; i < numCoils; i++) {
            var cx1 = sx0 + coilW * (i + 0.25);
            var cx2 = sx0 + coilW * (i + 0.75);
            ctx.lineTo(cx1, sy - 12);
            ctx.lineTo(cx2, sy + 12);
        }
        ctx.lineTo(springX, sy);
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Block on spring
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.roundRect(springX - 5, sy - 15, 25, 30, 4);
        ctx.fill();

        // PE spring
        var dx = (springX - springX0) / 100;
        var PE_spring = 0.5 * springK * dx * dx;
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('PE = \u00BDkx\u00B2 = ' + PE_spring.toFixed(1) + ' J', W * 0.75, groundY + 25);

        // Hints
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('\u2195 ลากลูกบอล', W * 0.25, H - 8);
        ctx.fillText('\u2194 ลากสปริง', W * 0.75, H - 8);
    });
};

window.initConservationSimulation = function() {
    var engine = new window.SimEngine('simConservation');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var L = 150;
    var pivotX = W / 2, pivotY = 40;
    var theta = Math.PI / 3;
    var omega = 0;
    var g = 9.8;
    var m = 1;
    var isDragging = false;
    var running = false;

    function bobPos() {
        return { x: pivotX + L * Math.sin(theta), y: pivotY + L * Math.cos(theta) };
    }

    engine.canvas.addEventListener('pointerdown', function(e) {
        var pos = engine.getPointerPos(e);
        var bob = bobPos();
        if (Math.abs(pos.x - bob.x) < 25 && Math.abs(pos.y - bob.y) < 25) {
            isDragging = true;
            running = false;
            omega = 0;
            engine.canvas.setPointerCapture(e.pointerId);
        }
    });
    engine.canvas.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        var pos = engine.getPointerPos(e);
        var dx = pos.x - pivotX;
        var dy = pos.y - pivotY;
        theta = Math.atan2(dx, dy);
        theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, theta));
    });
    engine.canvas.addEventListener('pointerup', function() {
        if (isDragging) {
            isDragging = false;
            running = true;
        }
    });

    engine.start(function(dt) {
        if (!running) return;
        var alpha = -(g / L) * Math.sin(theta);
        omega += alpha * dt;
        omega *= 0.999;
        theta += omega * dt;
    }, function(ctx) {
        var bob = bobPos();
        var restY = pivotY + L;
        var h = Math.max(0, (restY - bob.y) / 30);

        // String
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bob.x, bob.y);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pivot
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#374151';
        ctx.fill();

        // Bob
        var grad = ctx.createRadialGradient(bob.x - 3, bob.y - 3, 2, bob.x, bob.y, 18);
        grad.addColorStop(0, '#f472b6');
        grad.addColorStop(1, '#be185d');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bob.x, bob.y, 18, 0, Math.PI * 2);
        ctx.fill();

        // Reference line
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#cbd5e1';
        ctx.beginPath(); ctx.moveTo(50, restY); ctx.lineTo(W - 50, restY); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('จุดอ้างอิง', W - 55, restY - 5);

        // Energy bars
        var v = omega * L / 30;
        var KE = 0.5 * m * v * v;
        var PE = m * g * h;
        var maxE = m * g * 3.5;
        var barW = 30, barMaxH = 100;
        var bx1 = 20, bx2 = 60;

        // KE bar
        var keH = Math.min((KE / maxE) * barMaxH, barMaxH);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(bx1, H - 25 - keH, barW, keH);
        ctx.strokeStyle = '#1e40af';
        ctx.strokeRect(bx1, H - 25 - keH, barW, keH);

        // PE bar
        var peH = Math.min((PE / maxE) * barMaxH, barMaxH);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(bx2, H - 25 - peH, barW, peH);
        ctx.strokeStyle = '#15803d';
        ctx.strokeRect(bx2, H - 25 - peH, barW, peH);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#1f2937';
        ctx.font = '11px sans-serif';
        ctx.fillText('KE', bx1 + barW/2, H - 10);
        ctx.fillText('PE', bx2 + barW/2, H - 10);

        // Info
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('KE + PE = const', W - 170, 25);
        ctx.font = '13px sans-serif';
        ctx.fillText('KE = ' + KE.toFixed(1) + ' J', W - 170, 48);
        ctx.fillText('PE = ' + PE.toFixed(1) + ' J', W - 170, 66);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('\u2190 ลากลูกตุ้มแล้วปล่อย \u2192', W/2, H - 8);
    });
};
