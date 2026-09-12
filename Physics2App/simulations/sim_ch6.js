// sim_ch6.js - Chapter 6 Simulations (Momentum, Impulse, Collision)

window.initMomentumSim = function() {
    var engine = new window.SimEngine('simMomentum');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var groundY = H * 0.65;
    var cw = 60, ch = 35;
    var cart = { x: W / 2, vx: 0, mass: 5 };
    var isDragging = false, lastX = 0;

    engine.canvas.addEventListener('pointerdown', function(e) {
        var pos = engine.getPointerPos(e);
        if (Math.abs(pos.x - cart.x) < cw / 2 + 10 && pos.y > groundY - ch - 10 && pos.y < groundY + 10) {
            isDragging = true;
            cart.vx = 0;
            lastX = pos.x;
            engine.canvas.setPointerCapture(e.pointerId);
        }
    });
    engine.canvas.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        var pos = engine.getPointerPos(e);
        cart.vx = (pos.x - lastX) * 3;
        cart.x = Math.max(cw / 2, Math.min(W - cw / 2, pos.x));
        lastX = pos.x;
    });
    engine.canvas.addEventListener('pointerup', function() { isDragging = false; });

    engine.start(function(dt) {
        if (isDragging) return;
        cart.x += cart.vx * dt;
        cart.vx *= 0.995;
        if (cart.x < cw / 2) { cart.x = cw / 2; cart.vx = Math.abs(cart.vx) * 0.8; }
        if (cart.x > W - cw / 2) { cart.x = W - cw / 2; cart.vx = -Math.abs(cart.vx) * 0.8; }
    }, function(ctx) {
        // Track
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(0, groundY, W, 6);

        // Cart body
        var grad = ctx.createLinearGradient(cart.x - cw / 2, groundY - ch, cart.x + cw / 2, groundY);
        grad.addColorStop(0, '#3b82f6');
        grad.addColorStop(1, '#1d4ed8');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(cart.x - cw / 2, groundY - ch, cw, ch, 5);
        ctx.fill();

        // Wheels
        ctx.fillStyle = '#374151';
        ctx.beginPath(); ctx.arc(cart.x - cw / 4, groundY + 3, 6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(cart.x + cw / 4, groundY + 3, 6, 0, Math.PI * 2); ctx.fill();

        // Mass label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(cart.mass + ' kg', cart.x, groundY - ch / 2 + 5);

        // Momentum vector
        var p = cart.mass * (cart.vx / 100);
        if (Math.abs(p) > 0.1) {
            var arrowLen = Math.min(Math.abs(p) * 20, 120) * Math.sign(p);
            engine.drawVector(cart.x, groundY - ch / 2, arrowLen, 0, '#ef4444', 'p = ' + Math.abs(p).toFixed(1) + ' kg\u00B7m/s');
        }

        // Info
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('p = mv', 15, 25);
        ctx.font = '13px sans-serif';
        ctx.fillText('v = ' + (cart.vx / 100).toFixed(2) + ' m/s', 15, 48);
        ctx.fillText('p = ' + Math.abs(p).toFixed(2) + ' kg\u00B7m/s', 15, 66);

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('\u2190 ลากรถแล้วปล่อย \u2192', W / 2, H - 10);
    });
};

window.initImpulseSim = function() {
    var engine = new window.SimEngine('simImpulse');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var groundY = H * 0.6;
    var rocketX = W * 0.15, rocketW = 30, rocketH = 50;
    var vx = 0, m = 10;
    var isThrusting = false;
    var F = 500;
    var graphData = [];
    var time = 0;

    engine.canvas.addEventListener('pointerdown', function() { isThrusting = true; });
    engine.canvas.addEventListener('pointerup', function() { isThrusting = false; });

    engine.start(function(dt) {
        time += dt;
        if (isThrusting) {
            vx += (F / m) * dt;
            graphData.push({ t: time, f: F });
        } else {
            graphData.push({ t: time, f: 0 });
        }
        rocketX += vx * dt;
        vx *= 0.998;

        if (rocketX > W - rocketW) { rocketX = W * 0.15; vx = 0; time = 0; graphData = []; }
        if (graphData.length > 200) graphData.shift();
    }, function(ctx) {
        // Ground
        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(0, groundY + rocketH / 2, W, H - groundY - rocketH / 2);

        // Rocket body
        var grad = ctx.createLinearGradient(rocketX, groundY - rocketH / 2, rocketX + rocketW, groundY + rocketH / 2);
        grad.addColorStop(0, '#6366f1');
        grad.addColorStop(1, '#4338ca');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(rocketX, groundY - rocketH / 2, rocketW, rocketH, 4);
        ctx.fill();

        // Nose cone
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(rocketX + rocketW, groundY - rocketH / 4);
        ctx.lineTo(rocketX + rocketW + 15, groundY);
        ctx.lineTo(rocketX + rocketW, groundY + rocketH / 4);
        ctx.closePath();
        ctx.fill();

        // Thrust flame
        if (isThrusting) {
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.moveTo(rocketX, groundY - 8);
            ctx.lineTo(rocketX - 20 - Math.random() * 15, groundY);
            ctx.lineTo(rocketX, groundY + 8);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.moveTo(rocketX, groundY - 5);
            ctx.lineTo(rocketX - 10 - Math.random() * 10, groundY);
            ctx.lineTo(rocketX, groundY + 5);
            ctx.closePath();
            ctx.fill();
        }

        // Force vector
        if (isThrusting) {
            engine.drawVector(rocketX + rocketW / 2, groundY, 60, 0, '#22c55e', 'F = ' + F + ' N');
        }

        // F-t Graph (bottom-right)
        var gx = W * 0.55, gy = 20, gw = W * 0.4, gh = H * 0.35;
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(gx, gy, gw, gh);
        ctx.strokeStyle = '#e2e8f0';
        ctx.strokeRect(gx, gy, gw, gh);

        // Axes
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx + 5, gy + gh - 5);
        ctx.lineTo(gx + gw - 5, gy + gh - 5);
        ctx.moveTo(gx + 5, gy + gh - 5);
        ctx.lineTo(gx + 5, gy + 5);
        ctx.stroke();
        ctx.fillStyle = '#374151';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('t', gx + gw / 2, gy + gh + 2);
        ctx.textAlign = 'right';
        ctx.fillText('F', gx, gy + gh / 2);

        // Plot
        if (graphData.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            var tRange = Math.max(graphData[graphData.length - 1].t - graphData[0].t, 1);
            for (var i = 0; i < graphData.length; i++) {
                var px = gx + 10 + ((graphData[i].t - graphData[0].t) / tRange) * (gw - 20);
                var py = gy + gh - 10 - (graphData[i].f / 600) * (gh - 20);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }

        // Info
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('J = F\u0394t = \u0394p', 15, 25);
        ctx.font = '13px sans-serif';
        ctx.fillText('v = ' + (vx * 0.01).toFixed(2) + ' m/s', 15, 48);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('กดค้างเพื่อจุดจรวด \uD83D\uDE80', W / 2, H - 10);
    });
};

window.initCollisionSim = function() {
    var engine = new window.SimEngine('simCollision');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var groundY = H * 0.6;
    var cw = 55, ch = 35;
    var elastic = true;

    var cartA = { x: W * 0.25, vx: 120, mass: 3, color: '#ef4444' };
    var cartB = { x: W * 0.7, vx: -60, mass: 2, color: '#3b82f6' };

    function reset() {
        cartA.x = W * 0.25; cartA.vx = 120;
        cartB.x = W * 0.7; cartB.vx = -60;
    }

    // Toggle button
    engine.canvas.addEventListener('dblclick', function() {
        elastic = !elastic;
        reset();
    });

    engine.start(function(dt) {
        cartA.x += cartA.vx * dt;
        cartB.x += cartB.vx * dt;

        // Wall bounces
        if (cartA.x - cw / 2 < 0) { cartA.x = cw / 2; cartA.vx = Math.abs(cartA.vx); }
        if (cartB.x + cw / 2 > W) { cartB.x = W - cw / 2; cartB.vx = -Math.abs(cartB.vx); }

        // Collision detection
        if (Math.abs(cartA.x - cartB.x) < cw && cartA.vx > cartB.vx) {
            var m1 = cartA.mass, m2 = cartB.mass;
            var v1 = cartA.vx, v2 = cartB.vx;
            if (elastic) {
                cartA.vx = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
                cartB.vx = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
            } else {
                var vf = (m1 * v1 + m2 * v2) / (m1 + m2);
                cartA.vx = vf;
                cartB.vx = vf;
            }
        }
    }, function(ctx) {
        // Track
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(0, groundY, W, 6);

        // Draw carts
        [cartA, cartB].forEach(function(c) {
            var grad = ctx.createLinearGradient(c.x - cw / 2, groundY - ch, c.x + cw / 2, groundY);
            grad.addColorStop(0, c.color);
            grad.addColorStop(1, c.color.replace(/[0-9a-f]{2}$/i, '99'));
            ctx.fillStyle = c.color;
            ctx.beginPath();
            ctx.roundRect(c.x - cw / 2, groundY - ch, cw, ch, 5);
            ctx.fill();
            // Wheels
            ctx.fillStyle = '#374151';
            ctx.beginPath(); ctx.arc(c.x - cw / 4, groundY + 3, 5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(c.x + cw / 4, groundY + 3, 5, 0, Math.PI * 2); ctx.fill();
            // Mass label
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(c.mass + ' kg', c.x, groundY - ch / 2 + 5);
            // Velocity vector
            if (Math.abs(c.vx) > 2) {
                engine.drawVector(c.x, groundY - ch - 8, c.vx * 0.3, 0, c.color, '');
            }
        });

        // Info
        var pTotal = cartA.mass * cartA.vx + cartB.mass * cartB.vx;
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(elastic ? 'การชนแบบยืดหยุ่น' : 'การชนแบบไม่ยืดหยุ่น', 15, 25);
        ctx.font = '13px sans-serif';
        ctx.fillText('p\u2081 = ' + (cartA.mass * cartA.vx * 0.01).toFixed(1), 15, 48);
        ctx.fillText('p\u2082 = ' + (cartB.mass * cartB.vx * 0.01).toFixed(1), 15, 66);
        ctx.fillText('\u03A3p = ' + (pTotal * 0.01).toFixed(1) + ' kg\u00B7m/s', 15, 84);

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ดับเบิลคลิกเพื่อสลับ ยืดหยุ่น/ไม่ยืดหยุ่น', W / 2, H - 10);
    });
};
