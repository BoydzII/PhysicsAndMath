// sim_ch7.js

window.initProjectileSim = function() {
    const engine = new window.SimEngine('simProjectile');
    if (!engine.canvas) return;

    let projectiles = [];
    let cannonAngle = -Math.PI / 4;
    let cannonPower = 800;

    engine.canvas.addEventListener('pointerdown', (e) => {
        const pos = engine.getPointerPos(e);
        // Calculate angle towards click
        cannonAngle = Math.atan2(pos.y - (engine.height - 50), pos.x - 50);
        
        projectiles.push({
            x: 50,
            y: engine.height - 50,
            vx: Math.cos(cannonAngle) * cannonPower,
            vy: Math.sin(cannonAngle) * cannonPower,
            trail: [],
            active: true
        });
    });

    const g = 980; // gravity

    engine.start((dt) => {
        for (let p of projectiles) {
            if (!p.active) continue;
            p.vy += g * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            
            p.trail.push({x: p.x, y: p.y});
            if (p.trail.length > 100) p.trail.shift();
            
            if (p.y > engine.height || p.x > engine.width + 50 || p.x < -50) {
                p.active = false;
            }
        }
        projectiles = projectiles.filter(p => p.active || p.trail.length > 0);
    }, (ctx) => {
        // Draw cannon
        ctx.save();
        ctx.translate(50, engine.height - 50);
        ctx.rotate(cannonAngle);
        ctx.fillStyle = '#555';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(-10, -10, 60, 20, 5);
        } else {
            ctx.rect(-10, -10, 60, 20);
        }
        ctx.fill();
        ctx.restore();
        
        // Draw base
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(50, engine.height - 50, 20, Math.PI, 0);
        ctx.fill();

        for (let p of projectiles) {
            // Draw trail
            if (p.trail.length > 1) {
                ctx.beginPath();
                ctx.moveTo(p.trail[0].x, p.trail[0].y);
                for (let i = 1; i < p.trail.length; i++) {
                    ctx.lineTo(p.trail[i].x, p.trail[i].y);
                }
                ctx.strokeStyle = 'rgba(255, 100, 100, 0.5)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            if (p.active) {
                // Draw projectile
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
                ctx.fill();

                // Draw vectors
                engine.drawVector(p.x, p.y, p.vx * 0.1, 0, '#3498db', 'vx');
                engine.drawVector(p.x, p.y, 0, p.vy * 0.1, '#2ecc71', 'vy');
            } else {
                p.trail.shift(); // fade out trail
            }
        }
        
        // Help text
        ctx.fillStyle = '#7f8c8d';
        ctx.font = '16px sans-serif';
        ctx.fillText('Click anywhere to fire the cannon', 20, 30);
    });
};

window.initCircularSim = function() {
    const engine = new window.SimEngine('simCircular');
    if (!engine.canvas) return;

    let angle = 0;
    let radius = 150;
    let omega = 2; // angular velocity rad/s
    let cx = engine.width / 2;
    let cy = engine.height / 2;

    engine.start((dt) => {
        angle += omega * dt;
        cx = engine.width / 2;
        cy = engine.height / 2;
    }, (ctx) => {
        let px = cx + Math.cos(angle) * radius;
        let py = cy + Math.sin(angle) * radius;

        // Draw center
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw string
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = '#7f8c8d';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw path
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw mass
        ctx.fillStyle = '#9b59b6';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = 'transparent';

        // Vectors
        let vx = -Math.sin(angle) * omega * radius;
        let vy = Math.cos(angle) * omega * radius;
        engine.drawVector(px, py, vx * 0.3, vy * 0.3, '#e74c3c', 'v');

        let acx = -Math.cos(angle) * omega * omega * radius;
        let acy = -Math.sin(angle) * omega * omega * radius;
        engine.drawVector(px, py, acx * 0.08, acy * 0.08, '#3498db', 'Fc');
        
        ctx.fillStyle = '#7f8c8d';
        ctx.font = '16px sans-serif';
        ctx.fillText('Centripetal Force (Fc) and Velocity (v)', 20, 30);
    });
};

window.initSHMSim = function() {
    const engine = new window.SimEngine('simSHM');
    if (!engine.canvas) return;

    let time = 0;
    let amplitude = 120;
    let k = 10;
    let m = 2;
    let omega = Math.sqrt(k / m);
    let history = [];
    
    let baseY = engine.height * 0.3;
    let baseX = engine.width / 2;

    engine.start((dt) => {
        time += dt;
        let x = amplitude * Math.cos(omega * time);
        
        history.push({t: time, x: x});
        if (history.length > 500) history.shift();
        
        baseX = engine.width / 2;
    }, (ctx) => {
        let x = amplitude * Math.cos(omega * time);
        let px = baseX + x;
        let py = baseY;

        // Draw spring
        ctx.beginPath();
        ctx.moveTo(100, py);
        let coils = 20;
        let dx = (px - 100) / coils;
        for (let i = 0; i <= coils; i++) {
            let offset = (i === 0 || i === coils) ? 0 : ((i % 2 === 0) ? 12 : -12);
            ctx.lineTo(100 + i * dx, py + offset);
        }
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw wall
        ctx.fillStyle = '#7f8c8d';
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(80, py - 40, 20, 80, 4);
            ctx.fill();
        } else {
            ctx.fillRect(80, py - 40, 20, 80);
        }

        // Draw mass
        ctx.fillStyle = '#f1c40f';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(px - 25, py - 25, 50, 50, 8);
        } else {
            ctx.rect(px - 25, py - 25, 50, 50);
        }
        ctx.fill();
        ctx.shadowColor = 'transparent';

        // Draw graph
        let graphY = engine.height * 0.75;
        let graphH = engine.height * 0.3;
        
        // axis
        ctx.beginPath();
        ctx.moveTo(50, graphY);
        ctx.lineTo(engine.width - 50, graphY);
        ctx.strokeStyle = '#bdc3c7';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (history.length > 0) {
            ctx.beginPath();
            let tEnd = history[history.length - 1].t;
            let timeSpan = 6; // show last 6 seconds
            
            let started = false;
            for (let i = 0; i < history.length; i++) {
                let p = history[i];
                let gx = engine.width - 50 - ((tEnd - p.t) / timeSpan) * (engine.width - 100);
                let gy = graphY - (p.x / amplitude) * (graphH / 2);
                
                if (gx >= 50) {
                    if (!started) {
                        ctx.moveTo(gx, gy);
                        started = true;
                    } else {
                        ctx.lineTo(gx, gy);
                    }
                }
            }
            ctx.strokeStyle = '#e67e22';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        
        // Label graph
        ctx.fillStyle = '#555';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('Displacement vs Time', 50, graphY - graphH/2 - 5);
    });
};
