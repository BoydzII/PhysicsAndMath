// sim_ch5.js

window.initWorkSimulation = function() {
    const engine = new window.SimEngine('simWork');
    if (!engine.ctx) return;

    let block = { x: engine.width / 4, y: engine.height / 2, width: 80, height: 60, mass: 10 };
    let isDragging = false;
    let startX = block.x;
    let F_pull = 0;
    let f_friction = 50; // Constant kinetic friction for simplicity
    let distance = 0;
    let workDone = 0;

    engine.canvas.addEventListener('pointerdown', (e) => {
        const pos = engine.getPointerPos(e);
        if (pos.x >= block.x - block.width/2 && pos.x <= block.x + block.width/2 &&
            pos.y >= block.y - block.height/2 && pos.y <= block.y + block.height/2) {
            isDragging = true;
            startX = block.x;
        }
    });

    engine.canvas.addEventListener('pointerup', () => isDragging = false);
    engine.canvas.addEventListener('pointermove', (e) => {
        if (isDragging) {
            const pos = engine.getPointerPos(e);
            let targetX = Math.max(block.width/2, Math.min(engine.width - block.width/2, pos.x));
            if (targetX > block.x) {
                F_pull = 100; 
            } else if (targetX < block.x) {
                F_pull = -100;
            } else {
                F_pull = 0;
            }
            
            block.x = targetX;
            distance = Math.abs(block.x - startX);
            workDone = F_pull > 0 ? (F_pull - f_friction) * (distance/100) : (F_pull < 0 ? (-F_pull - f_friction) * (distance/100) : 0);
        } else {
            F_pull = 0;
        }
    });

    engine.start((dt) => {
        // Simple kinematic update based on drag
    }, (ctx) => {
        // Ground
        ctx.fillStyle = '#888';
        ctx.fillRect(0, block.y + block.height/2, engine.width, engine.height - (block.y + block.height/2));

        // Block
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.roundRect(block.x - block.width/2, block.y - block.height/2, block.width, block.height, 5);
        ctx.fill();
        ctx.stroke();

        // Vectors
        if (isDragging) {
            if (F_pull > 0) {
                engine.drawVector(block.x, block.y, 100, 0, '#3498db', 'F (Pull)');
                engine.drawVector(block.x, block.y + block.height/2, -50, 0, '#e67e22', 'f (Friction)');
            } else if (F_pull < 0) {
                engine.drawVector(block.x, block.y, -100, 0, '#3498db', 'F (Pull)');
                engine.drawVector(block.x, block.y + block.height/2, 50, 0, '#e67e22', 'f (Friction)');
            }
        }

        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(`Distance: ${(distance/100).toFixed(2)} m`, 20, 30);
        ctx.fillText(`Net Work: ${workDone.toFixed(2)} J`, 20, 50);
    });
};

window.initPowerSimulation = function() {
    const engine = new window.SimEngine('simPower');
    if (!engine.ctx) return;

    let mass = { y: engine.height - 40, v: 0, m: 50 };
    let F_lift = 600; 
    let g = 9.8;
    let power = 0;
    let lifting = false;

    engine.canvas.addEventListener('pointerdown', () => lifting = true);
    engine.canvas.addEventListener('pointerup', () => lifting = false);

    engine.start((dt) => {
        let a = 0;
        if (lifting) {
            a = (F_lift - mass.m * g) / mass.m;
        } else {
            a = -g; 
        }
        
        mass.v += a * (dt * 10); // Scaled time for visual
        mass.y -= mass.v * dt * 10;

        if (mass.y > engine.height - 40) {
            mass.y = engine.height - 40;
            mass.v = 0;
        }
        if (mass.y < 40) {
            mass.y = 40;
            mass.v = 0;
        }

        power = lifting && mass.v > 0 ? F_lift * mass.v * 0.1 : 0; 
    }, (ctx) => {
        // Crane wire
        ctx.beginPath();
        ctx.moveTo(engine.width / 2, 0);
        ctx.lineTo(engine.width / 2, mass.y);
        ctx.strokeStyle = '#7f8c8d';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Mass
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(engine.width / 2 - 30, mass.y, 60, 40);

        // UI
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(`Hold click to lift`, 20, 30);
        ctx.fillText(`Velocity: ${Math.max(0, mass.v).toFixed(1)} m/s`, 20, 50);
        ctx.fillText(`Power = F * v: ${power.toFixed(0)} W`, 20, 70);

        // Power bar
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(engine.width - 60, engine.height - 220, 40, 200);
        ctx.fillStyle = '#f1c40f';
        let barHeight = Math.min(200, power / 5);
        ctx.fillRect(engine.width - 60, engine.height - 20 - barHeight, 40, barHeight);
        ctx.strokeRect(engine.width - 60, engine.height - 220, 40, 200);
    });
};

window.initKineticSimulation = function() {
    const engine = new window.SimEngine('simKinetic');
    if (!engine.ctx) return;

    let car = { x: 50, y: engine.height / 2, v: 0, m: 1000 };
    let isDragging = false;

    engine.canvas.addEventListener('pointerdown', (e) => {
        isDragging = true;
        updateVel(e);
    });
    engine.canvas.addEventListener('pointermove', (e) => {
        if (isDragging) updateVel(e);
    });
    engine.canvas.addEventListener('pointerup', () => isDragging = false);

    function updateVel(e) {
        const pos = engine.getPointerPos(e);
        let targetV = (pos.x - 50) / 10;
        car.v = Math.max(0, Math.min(40, targetV));
    }

    engine.start((dt) => {
        car.x += car.v * dt * 5;
        if (car.x > engine.width + 50) car.x = -50;
    }, (ctx) => {
        // Ground
        ctx.fillStyle = '#34495e';
        ctx.fillRect(0, car.y + 20, engine.width, 10);

        // Car
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(car.x - 30, car.y - 20, 60, 40);
        
        let ke = 0.5 * car.m * car.v * car.v;

        // UI
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(`Drag horizontally to change velocity`, 20, 30);
        ctx.fillText(`Velocity: ${car.v.toFixed(1)} m/s`, 20, 50);
        ctx.fillText(`Mass: ${car.m} kg`, 20, 70);
        ctx.fillText(`KE = 1/2 m v² = ${(ke/1000).toFixed(1)} kJ`, 20, 90);

        engine.drawVector(car.x, car.y, car.v * 5, 0, '#2980b9', 'v');
    });
};

window.initPotentialSimulation = function() {
    const engine = new window.SimEngine('simPotential');
    if (!engine.ctx) return;

    // Gravity
    let ball = { x: engine.width / 4, y: 50, m: 2, v: 0, g: 9.8 };
    let h0 = engine.height - 50;

    // Elastic
    let spring = { x: 3 * engine.width / 4, y: engine.height / 2, k: 50, x0: engine.height / 2, m: 1, v: 0 };
    
    let isDraggingSpring = false;
    engine.canvas.addEventListener('pointerdown', (e) => {
        const pos = engine.getPointerPos(e);
        if (Math.abs(pos.x - spring.x) < 30 && Math.abs(pos.y - spring.y) < 30) {
            isDraggingSpring = true;
            spring.v = 0;
        } else if (pos.x < engine.width/2) {
            ball.y = pos.y;
            ball.v = 0;
        }
    });

    engine.canvas.addEventListener('pointermove', (e) => {
        if (isDraggingSpring) {
            const pos = engine.getPointerPos(e);
            spring.y = Math.max(50, Math.min(engine.height - 50, pos.y));
        }
    });

    engine.canvas.addEventListener('pointerup', () => isDraggingSpring = false);

    engine.start((dt) => {
        // Gravity update
        ball.v += ball.g * (dt * 10);
        ball.y += ball.v * dt * 10;
        if (ball.y > h0) {
            ball.y = h0;
            ball.v *= -0.8; 
        }

        // Spring update
        if (!isDraggingSpring) {
            let Fs = -spring.k * (spring.y - spring.x0);
            let a = Fs / spring.m;
            spring.v += a * dt * 10;
            spring.y += spring.v * dt * 10;
            spring.v *= 0.99; // damping
        }
    }, (ctx) => {
        // Divider
        ctx.beginPath();
        ctx.moveTo(engine.width / 2, 0);
        ctx.lineTo(engine.width / 2, engine.height);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();

        // Gravity Vis
        ctx.fillStyle = '#e67e22';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 20, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#000';
        let h = Math.max(0, h0 - ball.y) / 10;
        let gpe = ball.m * ball.g * h;
        ctx.fillText(`Gravity (Click to drop)`, 20, 30);
        ctx.fillText(`h: ${h.toFixed(1)} m`, 20, 50);
        ctx.fillText(`PE = mgh: ${gpe.toFixed(1)} J`, 20, 70);

        // Spring Vis
        ctx.beginPath();
        ctx.moveTo(spring.x, 0);
        ctx.lineTo(spring.x, spring.y);
        ctx.strokeStyle = '#7f8c8d';
        for(let i=0; i<10; i++) {
            ctx.lineTo(spring.x + (i%2==0?10:-10), (spring.y/10)*i);
        }
        ctx.lineTo(spring.x, spring.y);
        ctx.stroke();
        
        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(spring.x - 20, spring.y, 40, 40);

        let dx = Math.abs(spring.y - spring.x0) / 10;
        let epe = 0.5 * spring.k * dx * dx;
        ctx.fillStyle = '#000';
        ctx.fillText(`Elastic (Drag mass)`, engine.width/2 + 20, 30);
        ctx.fillText(`Δx: ${dx.toFixed(2)} m`, engine.width/2 + 20, 50);
        ctx.fillText(`PE = 1/2 kx²: ${epe.toFixed(1)} J`, engine.width/2 + 20, 70);
    });
};

window.initConservationSimulation = function() {
    const engine = new window.SimEngine('simConservation');
    if (!engine.ctx) return;

    let origin = { x: engine.width / 2, y: 50 };
    let L = 200;
    let theta = Math.PI / 3;
    let omega = 0;
    let m = 2;
    let g = 9.8;
    
    let isDragging = false;

    engine.canvas.addEventListener('pointerdown', (e) => {
        const pos = engine.getPointerPos(e);
        let px = origin.x + L * Math.sin(theta);
        let py = origin.y + L * Math.cos(theta);
        if (Math.hypot(pos.x - px, pos.y - py) < 40) {
            isDragging = true;
            omega = 0;
        }
    });

    engine.canvas.addEventListener('pointermove', (e) => {
        if (isDragging) {
            const pos = engine.getPointerPos(e);
            let dx = pos.x - origin.x;
            let dy = pos.y - origin.y;
            theta = Math.atan2(dx, dy);
        }
    });

    engine.canvas.addEventListener('pointerup', () => isDragging = false);

    engine.start((dt) => {
        if (!isDragging) {
            // Euler for pendulum
            let alpha = -(g / (L/100)) * Math.sin(theta);
            omega += alpha * dt * 3;
            // Add a little damping
            omega *= 0.999;
            theta += omega * dt * 3;
        }
    }, (ctx) => {
        let px = origin.x + L * Math.sin(theta);
        let py = origin.y + L * Math.cos(theta);

        // String
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(px, py);
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bob
        ctx.fillStyle = '#c0392b';
        ctx.beginPath();
        ctx.arc(px, py, 20, 0, Math.PI*2);
        ctx.fill();

        // Energy calcs
        let v = Math.abs(omega * (L/100));
        let h = (L - (py - origin.y)) / 100; // height from lowest point
        let pe = m * g * Math.max(0, h);
        let ke = 0.5 * m * v * v;
        let te = pe + ke;

        // UI bars
        let maxE = m * g * (L/100) * 2; // scale

        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText(`Drag bob to start`, 20, 30);
        
        let barY = engine.height - 100;
        ctx.fillText(`PE`, 20, barY + 15);
        ctx.fillStyle = '#3498db';
        ctx.fillRect(50, barY, (pe / maxE) * 100, 20);

        barY += 30;
        ctx.fillStyle = '#000';
        ctx.fillText(`KE`, 20, barY + 15);
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(50, barY, (ke / maxE) * 100, 20);

        barY += 30;
        ctx.fillStyle = '#000';
        ctx.fillText(`TE`, 20, barY + 15);
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(50, barY, (te / maxE) * 100, 20);
    });
};
