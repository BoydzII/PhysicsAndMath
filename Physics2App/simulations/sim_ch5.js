// sim_ch5.js - Chapter 5 Simulations (Work, Power, Kinetic, Potential, Conservation)
// Designed for clear educational demonstration and smooth, responsive interaction

// ==========================================
// 5.1 งาน (W = Fs cos θ)
// ==========================================
window.initWorkSimulation = function() {
    var engine = new window.SimEngine('simWork');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var groundY = H - 35;
    var boxW = 50, boxH = 40;
    var boxX = W * 0.25;
    var startBoxX = boxX;
    var isDragging = false;
    var pointerX = boxX + boxW / 2 + 80;
    var pointerY = groundY - boxH / 2 - 50;
    var totalDistance = 0;

    function getBoxCenter() {
        return { x: boxX + boxW / 2, y: groundY - boxH / 2 };
    }

    engine.canvas.style.cursor = 'grab';

    function onPointerDown(e) {
        isDragging = true;
        engine.canvas.style.cursor = 'grabbing';
        var pos = engine.getPointerPos(e);
        pointerX = pos.x;
        pointerY = pos.y;
        if (engine.canvas.setPointerCapture && e.pointerId !== undefined) {
            try { engine.canvas.setPointerCapture(e.pointerId); } catch(err) {}
        }
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        var pos = engine.getPointerPos(e);
        pointerX = pos.x;
        pointerY = Math.min(pos.y, groundY - 5); // Don't pull downwards below ground
    }

    function onPointerUp() {
        isDragging = false;
        engine.canvas.style.cursor = 'grab';
    }

    engine.canvas.addEventListener('pointerdown', onPointerDown);
    engine.canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    engine.start(function(dt) {
        W = engine.width;
        H = engine.height;
        groundY = H - 35;

        var center = getBoxCenter();
        var dx = pointerX - center.x;
        var dy = pointerY - center.y;
        if (dy > 0) dy = 0; // limit pull up only

        // In the classic approved version:
        // When pulling, box moves with strong friction/resistance towards pull direction
        if (isDragging && Math.abs(dx) > 15) {
            // Strong damping friction resistance (moves smoothly without tele-transporting)
            var moveStep = dx * 0.006;
            boxX += moveStep;
            totalDistance += Math.abs(moveStep);
        }

        // Clamp box within canvas
        if (boxX < 10) boxX = 10;
        if (boxX > W - boxW - 10) boxX = W - boxW - 10;
    }, function(ctx) {
        W = engine.width;
        H = engine.height;
        groundY = H - 35;

        var center = getBoxCenter();
        var dx = pointerX - center.x;
        var dy = pointerY - center.y;
        if (dy > 0) dy = 0;
        var dist = Math.sqrt(dx * dx + dy * dy);

        // Ground
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(0, groundY, W, H - groundY);
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, groundY, W, 2);

        // Distance markers / ruler on ground
        ctx.fillStyle = '#64748b';
        ctx.font = '10px sans-serif';
        for (var rx = 20; rx < W; rx += 40) {
            ctx.fillRect(rx, groundY, 1, 6);
        }

        // Box shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(boxX + 2, groundY - 2, boxW - 4, 4);

        // Wooden/metallic box
        var boxGrad = ctx.createLinearGradient(boxX, groundY - boxH, boxX + boxW, groundY);
        boxGrad.addColorStop(0, '#f87171');
        boxGrad.addColorStop(1, '#dc2626');
        ctx.fillStyle = boxGrad;
        ctx.beginPath();
        ctx.roundRect(boxX, groundY - boxH, boxW, boxH, 6);
        ctx.fill();
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Box label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('m = 5 kg', center.x, center.y + 4);

        // Pull Force Vector F (Diagonal)
        var F_val = 0;
        var angleDeg = 0;
        var Fx = 0;
        var Fy = 0;

        if (dist > 15) {
            var pullAngle = Math.atan2(dy, dx);
            angleDeg = Math.round(Math.abs(pullAngle * 180 / Math.PI));
            if (angleDeg > 90) angleDeg = 180 - angleDeg;

            // Scaled Force value for educational display
            F_val = Math.min(Math.round(dist * 0.8), 150);
            var angleRad = Math.abs(pullAngle);
            Fx = Math.round(F_val * Math.cos(pullAngle));
            Fy = Math.round(Math.abs(F_val * Math.sin(pullAngle)));

            var endX = center.x + dx;
            var endY = center.y + dy;

            // Draw Pull Rope / Force F
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 3.5;
            ctx.stroke();

            // Arrow head for F
            var headLen = 12;
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - headLen * Math.cos(pullAngle - Math.PI / 6), endY - headLen * Math.sin(pullAngle - Math.PI / 6));
            ctx.lineTo(endX - headLen * Math.cos(pullAngle + Math.PI / 6), endY - headLen * Math.sin(pullAngle + Math.PI / 6));
            ctx.closePath();
            ctx.fillStyle = '#2563eb';
            ctx.fill();

            // Label F
            ctx.font = 'bold 14px sans-serif';
            ctx.fillStyle = '#1d4ed8';
            ctx.fillText('F = ' + F_val + ' N', endX + (dx >= 0 ? 10 : -10), endY - 8);

            // Angle arc θ
            if (Math.abs(dx) > 25) {
                ctx.beginPath();
                var arcStart = dx >= 0 ? 0 : Math.PI;
                var arcEnd = pullAngle;
                ctx.arc(center.x, center.y, 24, Math.min(arcStart, arcEnd), Math.max(arcStart, arcEnd));
                ctx.strokeStyle = '#6366f1';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.font = 'bold 11px sans-serif';
                ctx.fillStyle = '#4338ca';
                ctx.fillText(angleDeg + '°', center.x + (dx >= 0 ? 34 : -34), center.y - 6);
            }

            // Component Fx (Horizontal dashed line with arrow) - NO friction vector per user request
            if (Math.abs(dx) > 15) {
                ctx.beginPath();
                ctx.moveTo(center.x, center.y);
                ctx.lineTo(endX, center.y);
                ctx.strokeStyle = '#dc2626'; // Red for Fx
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);

                var sgnX = dx >= 0 ? 1 : -1;
                ctx.beginPath();
                ctx.moveTo(endX, center.y);
                ctx.lineTo(endX - sgnX * 8, center.y - 4);
                ctx.lineTo(endX - sgnX * 8, center.y + 4);
                ctx.closePath();
                ctx.fillStyle = '#dc2626';
                ctx.fill();

                ctx.font = 'bold 12px sans-serif';
                ctx.fillStyle = '#dc2626';
                ctx.fillText('Fx = ' + Math.abs(Fx) + ' N', endX + sgnX * 18, center.y + 4);
            }

            // Component Fy (Vertical dashed line with arrow)
            if (Math.abs(dy) > 15) {
                ctx.beginPath();
                ctx.moveTo(endX, center.y);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = '#10b981'; // Green for Fy
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);

                var sgnY = dy >= 0 ? 1 : -1;
                ctx.beginPath();
                ctx.moveTo(endX, endY);
                ctx.lineTo(endX - 4, endY - sgnY * 8);
                ctx.lineTo(endX + 4, endY - sgnY * 8);
                ctx.closePath();
                ctx.fillStyle = '#10b981';
                ctx.fill();

                ctx.font = 'bold 12px sans-serif';
                ctx.fillStyle = '#059669';
                ctx.fillText('Fy = ' + Fy + ' N', endX - (dx >= 0 ? 25 : -25), (center.y + endY) / 2);
            }
            ctx.restore();
        }

        // Distance moved from initial start
        var sMeters = Math.abs((boxX - startBoxX) / 50).toFixed(2);
        var workJ = (Math.abs(Fx) * parseFloat(sMeters)).toFixed(1);

        // Educational Info Panel (Top Left)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.roundRect(10, 10, 220, 95, 8);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('สูตร: W = Fs cos θ = Fx · s', 18, 30);

        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#2563eb';
        ctx.fillText('แรงดึง F = ' + (F_val || 0) + ' N  (θ = ' + angleDeg + '°)', 18, 50);

        ctx.fillStyle = '#dc2626';
        ctx.fillText('แรงแนวราบ Fx = ' + Math.abs(Fx) + ' N', 18, 70);

        ctx.fillStyle = '#059669';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('ระยะทาง s = ' + sMeters + ' m  ➔  งาน W = ' + workJ + ' J', 18, 92);

        // Helpful user tip
        ctx.textAlign = 'center';
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText('👈 กดลากเมาส์/นิ้วเพื่อออกแรงดึงกล่อง (สังเกตการแตกแรง Fx และ Fy) 👉', W / 2, H - 12);
    });
};


// ==========================================
// 5.2 กำลัง (P = W/t = Fv)
// ==========================================
window.initPowerSimulation = function() {
    var engine = new window.SimEngine('simPower');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var ropeX = W * 0.48;
    var pulleyY = 28;
    var weightSize = 44;
    var weightY = H - 85;
    var isDragging = false;
    var lastY = weightY;
    var speed = 0;
    var prevWeightY = weightY;

    var mass = 100;    // kg
    var g = 10;
    var mg = mass * g; // 1000 N

    function getPos(e) {
        return engine.getPointerPos(e);
    }

    engine.canvas.style.cursor = 'grab';

    function onPointerDown(e) {
        var pos = getPos(e);
        if (pos.y >= weightY - 20 && pos.y <= weightY + weightSize + 20) {
            isDragging = true;
            lastY = pos.y;
            engine.canvas.style.cursor = 'grabbing';
            if (engine.canvas.setPointerCapture && e.pointerId !== undefined) {
                try { engine.canvas.setPointerCapture(e.pointerId); } catch(err) {}
            }
        }
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        var pos = getPos(e);
        var dy = pos.y - lastY;
        weightY += dy;
        lastY = pos.y;

        // Clamp inside crane range
        if (weightY < pulleyY + 30) weightY = pulleyY + 30;
        if (weightY > H - 85) weightY = H - 85;
    }

    function onPointerUp() {
        isDragging = false;
        engine.canvas.style.cursor = 'grab';
    }

    engine.canvas.addEventListener('pointerdown', onPointerDown);
    engine.canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Calculate speed based on interval
    var speedInterval = setInterval(function() {
        speed = (prevWeightY - weightY) / 0.05; // pixels/sec (positive = moving up)
        prevWeightY = weightY;
    }, 50);

    engine.start(function(dt) {
        W = engine.width;
        H = engine.height;
        ropeX = W * 0.48;
    }, function(ctx) {
        W = engine.width;
        H = engine.height;
        ropeX = W * 0.48;

        // Background Sky
        var skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, '#f0f9ff');
        skyGrad.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // Ground
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, H - 35, W, 35);
        ctx.fillStyle = '#64748b';
        ctx.fillRect(0, H - 35, W, 2);

        // Crane Tower
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(ropeX - 10, pulleyY, 20, H - 35 - pulleyY);
        // Crane Arm
        ctx.fillRect(ropeX - 80, pulleyY - 6, 160, 12);
        // Diagonal support beams
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(ropeX - 75, pulleyY + 6);
        ctx.lineTo(ropeX - 10, pulleyY + 50);
        ctx.moveTo(ropeX + 75, pulleyY + 6);
        ctx.lineTo(ropeX + 10, pulleyY + 50);
        ctx.stroke();

        // Pulley wheel
        ctx.beginPath();
        ctx.arc(ropeX, pulleyY, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#374151';
        ctx.fill();
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Cable / Rope
        ctx.beginPath();
        ctx.moveTo(ropeX, pulleyY + 14);
        ctx.lineTo(ropeX, weightY);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Weight box
        var boxGrad = ctx.createLinearGradient(ropeX - weightSize / 2, weightY, ropeX + weightSize / 2, weightY + weightSize);
        boxGrad.addColorStop(0, '#ef4444');
        boxGrad.addColorStop(1, '#b91c1c');
        ctx.fillStyle = boxGrad;
        ctx.beginPath();
        ctx.roundRect(ropeX - weightSize / 2, weightY, weightSize, weightSize, 6);
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Weight Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(mass + ' kg', ropeX, weightY + weightSize / 2 + 4);

        // Real-time values
        var travelRange = (H - 85) - (pulleyY + 30);
        var heightM = (((H - 85 - weightY) / travelRange) * 10).toFixed(1); // 0 - 10 m
        var speedMS = Math.abs((speed / travelRange) * 10).toFixed(1);       // m/s
        var isLifting = speed > 5;
        var powerVal = isLifting ? Math.round(mg * parseFloat(speedMS)) : 0;

        // Motion Arrow on the weight
        if (Math.abs(speed) > 10) {
            var dir = speed > 0 ? -1 : 1; // negative = up
            var arrowY = weightY + weightSize / 2;
            var arrowX = ropeX + weightSize / 2 + 15;
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX, arrowY + dir * 25);
            ctx.strokeStyle = dir < 0 ? '#10b981' : '#f59e0b';
            ctx.lineWidth = 3.5;
            ctx.stroke();

            var aHead = 8;
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY + dir * 25);
            ctx.lineTo(arrowX - aHead, arrowY + dir * 25 - dir * aHead);
            ctx.lineTo(arrowX + aHead, arrowY + dir * 25 - dir * aHead);
            ctx.closePath();
            ctx.fillStyle = dir < 0 ? '#10b981' : '#f59e0b';
            ctx.fill();

            ctx.font = 'bold 12px sans-serif';
            ctx.fillText(speedMS + ' m/s', arrowX + 22, arrowY + dir * 15);
        }

        // Info Card (Top Left)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.roundRect(10, 10, 200, 95, 8);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('สูตร: P = W/t = F·v', 18, 30);

        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText('แรงยก F = mg = ' + mg + ' N', 18, 50);

        ctx.fillStyle = '#2563eb';
        ctx.fillText('ความเร็ว v = ' + speedMS + ' m/s', 18, 70);

        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('กำลัง P = ' + powerVal + ' วัตต์ (W)', 18, 92);

        // Power Bar Graph on the Right Side
        var barW = 36;
        var maxBarH = 140;
        var barX = W - 60;
        var barBaseY = H - 50;
        var barH = Math.min((powerVal / 4000) * maxBarH, maxBarH);

        // Bar background
        ctx.fillStyle = 'rgba(226, 232, 240, 0.8)';
        ctx.fillRect(barX, barBaseY - maxBarH, barW, maxBarH);
        ctx.strokeStyle = '#cbd5e1';
        ctx.strokeRect(barX, barBaseY - maxBarH, barW, maxBarH);

        // Active Power Bar
        var pGrad = ctx.createLinearGradient(barX, barBaseY - barH, barX, barBaseY);
        pGrad.addColorStop(0, '#f97316');
        pGrad.addColorStop(1, '#ef4444');
        ctx.fillStyle = pGrad;
        ctx.fillRect(barX, barBaseY - barH, barW, barH);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Power (P)', barX + barW / 2, barBaseY - maxBarH - 8);
        ctx.fillStyle = '#dc2626';
        ctx.fillText(powerVal + ' W', barX + barW / 2, barBaseY + 16);

        // Tip
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText('👆 ลากกล่องน้ำหนักขึ้น-ลงเร็วๆ เพื่อสังเกตกำลัง (Power) ที่เพิ่มขึ้นตามความเร็ว', W / 2, H - 12);
    });
};


// ==========================================
// 5.3 พลังงานจลน์ (KE = ½mv²)
// ==========================================
window.initKineticSimulation = function() {
    var engine = new window.SimEngine('simKinetic');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var groundY = H - 45;
    var carW = 65, carH = 32;
    var carX = W * 0.35;
    var isDragging = false;
    var lastX = carX;
    var v = 0; // m/s
    var m = 2; // kg

    function getPos(e) {
        return engine.getPointerPos(e);
    }

    engine.canvas.style.cursor = 'grab';

    function onPointerDown(e) {
        var pos = getPos(e);
        if (Math.abs(pos.x - carX) < 60 && pos.y > groundY - carH - 20 && pos.y < groundY + 20) {
            isDragging = true;
            lastX = pos.x;
            engine.canvas.style.cursor = 'grabbing';
            if (engine.canvas.setPointerCapture && e.pointerId !== undefined) {
                try { engine.canvas.setPointerCapture(e.pointerId); } catch(err) {}
            }
        }
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        var pos = getPos(e);
        carX = Math.max(carW / 2 + 10, Math.min(W - 120, pos.x));
    }

    function onPointerUp() {
        isDragging = false;
        engine.canvas.style.cursor = 'grab';
    }

    engine.canvas.addEventListener('pointerdown', onPointerDown);
    engine.canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Smooth speed calculation
    var speedInterval = setInterval(function() {
        v = (carX - lastX) / 0.05 / 30; // scaled m/s
        lastX = carX;
    }, 50);

    engine.start(function(dt) {
        W = engine.width;
        H = engine.height;
        groundY = H - 45;

        // If not dragging, car gradually slows down with gentle rolling resistance
        if (!isDragging && Math.abs(v) > 0.05) {
            carX += v * 30 * dt;
            v *= 0.95; // gentle rolling friction
            if (carX < carW / 2 + 10) { carX = carW / 2 + 10; v = -v * 0.6; }
            if (carX > W - 120) { carX = W - 120; v = -v * 0.6; }
        }
    }, function(ctx) {
        W = engine.width;
        H = engine.height;
        groundY = H - 45;

        // Road background
        ctx.fillStyle = '#334155';
        ctx.fillRect(0, groundY, W, H - groundY);
        // Road lane dashed line
        ctx.setLineDash([16, 12]);
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY + (H - groundY) / 2);
        ctx.lineTo(W, groundY + (H - groundY) / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Car body
        var carGrad = ctx.createLinearGradient(carX - carW / 2, groundY - carH, carX + carW / 2, groundY);
        carGrad.addColorStop(0, '#38bdf8');
        carGrad.addColorStop(1, '#0284c7');
        ctx.fillStyle = carGrad;
        ctx.beginPath();
        ctx.roundRect(carX - carW / 2, groundY - carH, carW, carH, 6);
        ctx.fill();
        ctx.strokeStyle = '#0369a1';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Cabin/Windshield
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.roundRect(carX - carW / 4, groundY - carH + 4, carW / 2, carH / 2 - 2, 3);
        ctx.fill();

        // Wheels
        ctx.fillStyle = '#1e293b';
        ctx.beginPath(); ctx.arc(carX - carW / 3, groundY + 2, 7, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(carX + carW / 3, groundY + 2, 7, 0, Math.PI * 2); ctx.fill();

        // Velocity Vector Arrow
        var absV = Math.abs(v);
        if (absV > 0.2) {
            var arrowLen = Math.min(absV * 25, 70) * (v >= 0 ? 1 : -1);
            var aX = carX + (v >= 0 ? carW / 2 : -carW / 2);
            var aY = groundY - carH / 2;

            ctx.beginPath();
            ctx.moveTo(aX, aY);
            ctx.lineTo(aX + arrowLen, aY);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.stroke();

            var aHead = 7 * (v >= 0 ? 1 : -1);
            ctx.beginPath();
            ctx.moveTo(aX + arrowLen, aY);
            ctx.lineTo(aX + arrowLen - aHead, aY - 5);
            ctx.lineTo(aX + arrowLen - aHead, aY + 5);
            ctx.closePath();
            ctx.fillStyle = '#ef4444';
            ctx.fill();
        }

        // Calculations
        var keVal = 0.5 * m * (absV * absV);

        // Info Card (Top Left)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.roundRect(10, 10, 220, 95, 8);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('สูตร: KE = ½mv²', 18, 30);

        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText('มวล m = ' + m + ' kg', 18, 50);

        ctx.fillStyle = '#0284c7';
        ctx.fillText('ความเร็ว v = ' + absV.toFixed(1) + ' m/s', 18, 70);

        ctx.fillStyle = '#ea580c';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('พลังงานจลน์ KE = ' + keVal.toFixed(1) + ' J', 18, 92);

        // Kinetic Energy Bar Graph on the Right
        var barW = 38;
        var maxBarH = 130;
        var barX = W - 65;
        var barBaseY = H - 55;
        var barH = Math.min((keVal / 25) * maxBarH, maxBarH);

        ctx.fillStyle = 'rgba(226, 232, 240, 0.8)';
        ctx.fillRect(barX, barBaseY - maxBarH, barW, maxBarH);
        ctx.strokeStyle = '#cbd5e1';
        ctx.strokeRect(barX, barBaseY - maxBarH, barW, maxBarH);

        var keGrad = ctx.createLinearGradient(barX, barBaseY - barH, barX, barBaseY);
        keGrad.addColorStop(0, '#f97316');
        keGrad.addColorStop(1, '#ea580c');
        ctx.fillStyle = keGrad;
        ctx.fillRect(barX, barBaseY - barH, barW, barH);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('KE', barX + barW / 2, barBaseY - maxBarH - 8);
        ctx.fillStyle = '#ea580c';
        ctx.fillText(keVal.toFixed(1) + ' J', barX + barW / 2, barBaseY + 16);

        // Tip
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText('👈 ลากรถไปมาเร็วๆ เพื่อสังเกตพลังงานจลน์ (KE) ที่เพิ่มขึ้นตามความเร็วยกกำลังสอง (v²) 👉', W / 2, H - 12);
    });
};


// ==========================================
// 5.4 พลังงานศักย์ (PE = mgh และ PE = ½kx²)
// ==========================================
window.initPotentialSimulation = function() {
    var engine = new window.SimEngine('simPotential');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var midX = W / 2;
    var groundY = H - 40;

    // --- Left: Gravitational Potential Energy ---
    var ballRadius = 18;
    var ballY = H * 0.45;
    var m = 2; // kg
    var g = 10;
    var isDraggingBall = false;

    // --- Right: Elastic Potential Energy ---
    var springNaturalX = W * 0.82;
    var springX = springNaturalX - 35;
    var k = 200; // N/m
    var isDraggingSpring = false;

    function getPos(e) {
        return engine.getPointerPos(e);
    }

    engine.canvas.style.cursor = 'pointer';

    function onPointerDown(e) {
        var pos = getPos(e);
        midX = engine.width / 2;

        if (pos.x < midX) {
            // Drag ball
            if (Math.abs(pos.x - midX / 2) < 45 && Math.abs(pos.y - ballY) < 45) {
                isDraggingBall = true;
                if (engine.canvas.setPointerCapture && e.pointerId !== undefined) {
                    try { engine.canvas.setPointerCapture(e.pointerId); } catch(err) {}
                }
            }
        } else {
            // Drag spring block
            if (Math.abs(pos.x - springX) < 40 && Math.abs(pos.y - (H / 2)) < 45) {
                isDraggingSpring = true;
                if (engine.canvas.setPointerCapture && e.pointerId !== undefined) {
                    try { engine.canvas.setPointerCapture(e.pointerId); } catch(err) {}
                }
            }
        }
    }

    function onPointerMove(e) {
        var pos = getPos(e);
        midX = engine.width / 2;

        if (isDraggingBall) {
            ballY = Math.max(ballRadius + 20, Math.min(groundY - ballRadius, pos.y));
        }
        if (isDraggingSpring) {
            springX = Math.max(midX + 25, Math.min(W - 35, pos.x));
        }
    }

    function onPointerUp() {
        isDraggingBall = false;
        isDraggingSpring = false;
    }

    engine.canvas.addEventListener('pointerdown', onPointerDown);
    engine.canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    engine.start(function(dt) {
        W = engine.width;
        H = engine.height;
        midX = W / 2;
        groundY = H - 40;
    }, function(ctx) {
        W = engine.width;
        H = engine.height;
        midX = W / 2;
        groundY = H - 40;

        // Middle dashed divider
        ctx.beginPath();
        ctx.setLineDash([6, 6]);
        ctx.moveTo(midX, 10);
        ctx.lineTo(midX, H - 10);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        // ==============================================
        // LEFT: Gravitational PE (PE = mgh)
        // ==============================================
        // Ground
        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, groundY, midX, H - groundY);
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(0, groundY, midX, 2);

        // Height calculation (0 to 10 m)
        var maxTravel = groundY - ballRadius - 25;
        var hMeters = (((groundY - ballRadius - ballY) / maxTravel) * 10).toFixed(1);
        if (hMeters < 0) hMeters = '0.0';
        var peG = (m * g * parseFloat(hMeters)).toFixed(1);

        // Height reference dashed line & arrow
        var rulerX = 25;
        ctx.beginPath();
        ctx.moveTo(rulerX, groundY);
        ctx.lineTo(rulerX, ballY);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Ruler arrowheads
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(rulerX, ballY); ctx.lineTo(rulerX - 4, ballY + 8); ctx.lineTo(rulerX + 4, ballY + 8); ctx.fill();

        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('h = ' + hMeters + ' m', rulerX + 32, (groundY + ballY) / 2);

        // Ball with 3D gradient
        var ballX = midX * 0.45;
        var ballGrad = ctx.createRadialGradient(ballX - 5, ballY - 5, 2, ballX, ballY, ballRadius);
        ballGrad.addColorStop(0, '#f87171');
        ballGrad.addColorStop(1, '#dc2626');
        ctx.fillStyle = ballGrad;
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m + 'kg', ballX, ballY + 4);

        // Left Info Card
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.roundRect(40, 15, midX - 60, 60, 6);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('ศักย์โน้มถ่วง: PE = mgh', 48, 33);
        ctx.fillStyle = '#2563eb';
        ctx.font = '12px sans-serif';
        ctx.fillText('m=2kg, g=10 ➔ PE = ' + peG + ' J', 48, 55);

        // PE_g Bar
        var barW = 22;
        var barMaxH = 90;
        var barX1 = midX - 35;
        var barH1 = Math.min((parseFloat(peG) / 200) * barMaxH, barMaxH);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(barX1, groundY - barMaxH, barW, barMaxH);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(barX1, groundY - barH1, barW, barH1);
        ctx.textAlign = 'center';
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.fillText('PE', barX1 + barW / 2, groundY + 14);

        // ==============================================
        // RIGHT: Elastic PE (PE = ½kx²)
        // ==============================================
        var centerY = H / 2;

        // Wall on far right
        ctx.fillStyle = '#64748b';
        ctx.fillRect(W - 20, centerY - 45, 12, 90);
        // Wall hatching
        for (var wy = centerY - 45; wy <= centerY + 40; wy += 10) {
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(W - 20, wy);
            ctx.lineTo(W - 8, wy + 8);
            ctx.stroke();
        }

        // Natural equilibrium position dashed line
        springNaturalX = W - 110;
        ctx.beginPath();
        ctx.moveTo(springNaturalX, centerY - 40);
        ctx.lineTo(springNaturalX, centerY + 40);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('x=0', springNaturalX, centerY - 44);

        // Spring Zigzag Coils from Wall to Spring Block
        var springWallX = W - 20;
        var blockLeftX = springX;
        var numCoils = 10;
        var coilStep = (springWallX - blockLeftX) / numCoils;

        ctx.beginPath();
        ctx.moveTo(springWallX, centerY);
        for (var i = 0; i < numCoils; i++) {
            var p1 = springWallX - coilStep * (i + 0.25);
            var p2 = springWallX - coilStep * (i + 0.75);
            ctx.lineTo(p1, centerY - 14);
            ctx.lineTo(p2, centerY + 14);
        }
        ctx.lineTo(blockLeftX, centerY);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // Mass block attached to spring
        var sBoxW = 28, sBoxH = 34;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.roundRect(blockLeftX - sBoxW, centerY - sBoxH / 2, sBoxW, sBoxH, 4);
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Elastic calculation
        var xDisplacement = ((springNaturalX - blockLeftX) / 60).toFixed(2); // meters
        var peE = (0.5 * k * (parseFloat(xDisplacement) * parseFloat(xDisplacement))).toFixed(1);

        // Right Info Card
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.roundRect(midX + 20, 15, midX - 60, 60, 6);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('ศักย์ยืดหยุ่น: PE = ½kx²', midX + 28, 33);
        ctx.fillStyle = '#059669';
        ctx.font = '12px sans-serif';
        ctx.fillText('k=200, x=' + Math.abs(xDisplacement) + 'm ➔ PE = ' + peE + ' J', midX + 28, 55);

        // PE_s Bar
        var barX2 = midX + 20;
        var barH2 = Math.min((parseFloat(peE) / 100) * barMaxH, barMaxH);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(barX2, groundY - barMaxH, barW, barMaxH);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(barX2, groundY - barH2, barW, barH2);
        ctx.textAlign = 'center';
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.fillText('PE', barX2 + barW / 2, groundY + 14);

        // Tips
        ctx.textAlign = 'center';
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText('ลากลูกบอลขึ้น-ลง (ศักย์โน้มถ่วง)  |  ลากกล่องสปริง ซ้าย-ขวา (ศักย์ยืดหยุ่น)', W / 2, H - 12);
    });
};


// ==========================================
// 5.5 การอนุรักษ์พลังงานกล (KE + PE = คงตัว)
// ==========================================
window.initConservationSimulation = function() {
    var engine = new window.SimEngine('simConservation');
    if (!engine.ctx) return;

    var W = engine.width, H = engine.height;
    var L = 140;
    var pivotX = W * 0.52;
    var pivotY = 32;
    var m = 2;
    var g = 10;

    var theta = Math.PI / 4;
    var omega = 0;
    var isDragging = false;
    var lastTime = performance.now();

    function getBobPos() {
        return {
            x: pivotX + L * Math.sin(theta),
            y: pivotY + L * Math.cos(theta)
        };
    }

    function getPos(e) {
        return engine.getPointerPos(e);
    }

    engine.canvas.style.cursor = 'grab';

    function onPointerDown(e) {
        var pos = getPos(e);
        var bob = getBobPos();
        if (Math.abs(pos.x - bob.x) < 35 && Math.abs(pos.y - bob.y) < 35) {
            isDragging = true;
            omega = 0;
            engine.canvas.style.cursor = 'grabbing';
            if (engine.canvas.setPointerCapture && e.pointerId !== undefined) {
                try { engine.canvas.setPointerCapture(e.pointerId); } catch(err) {}
            }
        }
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        var pos = getPos(e);
        var dx = pos.x - pivotX;
        var dy = pos.y - pivotY;
        if (dy < 10) dy = 10; // Don't flip above pivot
        theta = Math.atan2(dx, dy);
        // Limit angle to +/- 80 degrees
        theta = Math.max(-1.4, Math.min(1.4, theta));
        omega = 0;
    }

    function onPointerUp() {
        isDragging = false;
        engine.canvas.style.cursor = 'grab';
    }

    engine.canvas.addEventListener('pointerdown', onPointerDown);
    engine.canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    engine.start(function(dt) {
        W = engine.width;
        H = engine.height;
        pivotX = W * 0.52;

        if (!isDragging) {
            // Natural pendulum equation: alpha = - (g / L) * sin(theta)
            var alpha = - (g / (L / 100)) * Math.sin(theta);
            omega += alpha * dt;
            omega *= 0.999; // slight air damping
            theta += omega * dt;
        }
    }, function(ctx) {
        W = engine.width;
        H = engine.height;
        pivotX = W * 0.52;

        var bob = getBobPos();
        var lowestY = pivotY + L;

        // Reference line at lowest point
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(pivotX - 110, lowestY);
        ctx.lineTo(pivotX + 110, lowestY);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText('ระดับอ้างอิง h = 0', pivotX + 115, lowestY + 3);

        // Rope
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bob.x, bob.y);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Pivot mount
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#334155';
        ctx.fill();

        // Bob ball with 3D gradient
        var bobRadius = 16;
        var bobGrad = ctx.createRadialGradient(bob.x - 4, bob.y - 4, 2, bob.x, bob.y, bobRadius);
        bobGrad.addColorStop(0, '#f87171');
        bobGrad.addColorStop(1, '#dc2626');
        ctx.fillStyle = bobGrad;
        ctx.beginPath();
        ctx.arc(bob.x, bob.y, bobRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Physics Calculation
        var h = Math.max(0, (lowestY - bob.y) / 70); // height in meters
        var pe = m * g * h;
        var v = Math.abs(omega * (L / 100)); // m/s
        var ke = 0.5 * m * v * v;
        var total = pe + ke;

        // Energy Bar Chart on the Left Side
        var startX = 25;
        var barW = 26;
        var maxBarH = 110;
        var barBaseY = H - 55;
        var maxEnergy = Math.max(total, 25);

        // KE Bar (Orange)
        var keH = Math.min((ke / maxEnergy) * maxBarH, maxBarH);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(startX, barBaseY - maxBarH, barW, maxBarH);
        ctx.fillStyle = '#f97316';
        ctx.fillRect(startX, barBaseY - keH, barW, keH);
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('KE', startX + barW / 2, barBaseY + 15);
        ctx.fillText(ke.toFixed(0), startX + barW / 2, barBaseY - keH - 5);

        // PE Bar (Blue)
        var peH = Math.min((pe / maxEnergy) * maxBarH, maxBarH);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(startX + 36, barBaseY - maxBarH, barW, maxBarH);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(startX + 36, barBaseY - peH, barW, peH);
        ctx.fillStyle = '#1e293b';
        ctx.fillText('PE', startX + 36 + barW / 2, barBaseY + 15);
        ctx.fillText(pe.toFixed(0), startX + 36 + barW / 2, barBaseY - peH - 5);

        // Total Bar (Green)
        var totH = Math.min((total / maxEnergy) * maxBarH, maxBarH);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(startX + 72, barBaseY - maxBarH, barW, maxBarH);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(startX + 72, barBaseY - totH, barW, totH);
        ctx.fillStyle = '#1e293b';
        ctx.fillText('รวม', startX + 72 + barW / 2, barBaseY + 15);
        ctx.fillText(total.toFixed(0), startX + 72 + barW / 2, barBaseY - totH - 5);

        // Info Card (Top Right)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.roundRect(W - 220, 12, 165, 78, 8);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('กฎการอนุรักษ์พลังงานกล', W - 212, 30);
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#f97316';
        ctx.fillText('KE (จลน์) = ' + ke.toFixed(1) + ' J', W - 212, 48);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('PE (ศักย์) = ' + pe.toFixed(1) + ' J', W - 212, 65);
        ctx.fillStyle = '#059669';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('รวม E = ' + total.toFixed(1) + ' J (คงตัว)', W - 212, 82);

        // Tip
        ctx.textAlign = 'center';
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText('👈 ลากลูกตุ้มไปด้านข้างแล้วปล่อย สังเกตแท่งพลังงานแลกเปลี่ยนกัน แต่ผลรวม (Total) คงที่เสมอ 👉', W / 2, H - 12);
    });
};
