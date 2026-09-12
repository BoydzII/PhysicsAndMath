window.initMomentumSim = function() {
    const engine = new window.SimEngine('simMomentum');
    if (!engine.ctx) return;

    let cart = { x: 0, y: 0, vx: 5, vy: 0, mass: 2, width: 60, height: 30, color: '#3498db' };
    let isDragging = false;
    let lastPos = {x: 0, y: 0};
    
    engine.canvas.addEventListener('pointerdown', (e) => {
        const pos = engine.getPointerPos(e);
        if (Math.abs(pos.x - cart.x) < cart.width/2 && Math.abs(pos.y - cart.y) < cart.height/2) {
            isDragging = true;
            cart.vx = 0;
            cart.vy = 0;
            lastPos = pos;
        }
    });
    
    engine.canvas.addEventListener('pointermove', (e) => {
        if (isDragging) {
            const pos = engine.getPointerPos(e);
            cart.vx = (pos.x - lastPos.x) / 0.016; // approximate instant velocity
            cart.vy = (pos.y - lastPos.y) / 0.016;
            cart.x = pos.x;
            cart.y = pos.y;
            lastPos = pos;
        }
    });
    
    window.addEventListener('pointerup', () => {
        isDragging = false;
    });

    engine.start((dt) => {
        if (!isDragging) {
            cart.x += cart.vx * dt;
            cart.y += cart.vy * dt;
            
            // Bounce off walls
            if (cart.x + cart.width/2 > engine.width/2) { cart.x = engine.width/2 - cart.width/2; cart.vx *= -1; }
            if (cart.x - cart.width/2 < -engine.width/2) { cart.x = -engine.width/2 + cart.width/2; cart.vx *= -1; }
            if (cart.y + cart.height/2 > engine.height/2) { cart.y = engine.height/2 - cart.height/2; cart.vy *= -1; }
            if (cart.y - cart.height/2 < -engine.height/2) { cart.y = -engine.height/2 + cart.height/2; cart.vy *= -1; }
            
            // Friction
            cart.vx *= 0.99;
            cart.vy *= 0.99;
        }
    }, (ctx) => {
        // Draw Cart
        ctx.fillStyle = cart.color;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(cart.x - cart.width/2, cart.y - cart.height/2, cart.width, cart.height, 5);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw Momentum Vector
        let p_x = cart.mass * cart.vx;
        let p_y = cart.mass * cart.vy;
        let p_mag = Math.sqrt(p_x*p_x + p_y*p_y);
        
        if (p_mag > 0.1) {
            let scale = 0.5;
            engine.drawVector(cart.x, cart.y, p_x * scale, p_y * scale, '#e74c3c', `p = ${p_mag.toFixed(1)}`);
        }
        
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.fillText(`Mass: ${cart.mass} kg`, -engine.width/2 + 20, -engine.height/2 + 30);
        ctx.fillText(`Drag cart to give momentum!`, -engine.width/2 + 20, -engine.height/2 + 50);
    });
};

window.initImpulseSim = function() {
    const engine = new window.SimEngine('simImpulse');
    if (!engine.ctx) return;

    let rocket = { x: 0, y: 0, vx: 0, mass: 10, width: 60, height: 30 };
    let force = 0;
    let time = 0;
    let graphData = [];
    let isThrusting = false;
    
    engine.canvas.addEventListener('pointerdown', (e) => {
        isThrusting = true;
    });
    window.addEventListener('pointerup', () => {
        isThrusting = false;
    });

    engine.start((dt) => {
        time += dt;
        force = isThrusting ? 500 : 0;
        
        let a = force / rocket.mass;
        rocket.vx += a * dt;
        
        // Friction
        rocket.vx *= 0.98;
        rocket.x += rocket.vx * dt;
        
        // Wrap around
        if (rocket.x > engine.width/2 + rocket.width) rocket.x = -engine.width/2 - rocket.width;
        
        if (time * 60 % 5 < 1) { // sample graph data
            graphData.push({t: time, f: force});
            if (graphData.length > 100) graphData.shift();
        }
        
    }, (ctx) => {
        // Draw Rocket
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(rocket.x - rocket.width/2, rocket.y - rocket.height/2, rocket.width, rocket.height);
        
        if (isThrusting) {
            ctx.fillStyle = '#e67e22';
            ctx.beginPath();
            ctx.moveTo(rocket.x - rocket.width/2, rocket.y - 10);
            ctx.lineTo(rocket.x - rocket.width/2 - 40 - Math.random()*20, rocket.y);
            ctx.lineTo(rocket.x - rocket.width/2, rocket.y + 10);
            ctx.fill();
        }
        
        // UI
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.fillText(`Click & Hold to apply Thrust (Impulse)`, -engine.width/2 + 20, -engine.height/2 + 30);
        ctx.fillText(`Velocity: ${rocket.vx.toFixed(1)} m/s`, -engine.width/2 + 20, -engine.height/2 + 50);
        
        // Draw F-t graph overlay
        let gx = engine.width/2 - 220;
        let gy = -engine.height/2 + 20;
        let gw = 200;
        let gh = 100;
        
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(gx, gy, gw, gh);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(gx, gy, gw, gh);
        
        ctx.beginPath();
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        for (let i=0; i<graphData.length; i++) {
            let px = gx + (i / 100) * gw;
            let py = gy + gh - (graphData[i].f / 600) * gh;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.fillStyle = '#333';
        ctx.fillText('F-t Graph', gx + 10, gy + 20);
    });
};

window.initCollisionSim = function() {
    const engine = new window.SimEngine('simCollision');
    if (!engine.ctx) return;

    let isElastic = true;
    let c1 = { x: -150, vx: 100, mass: 2, width: 40, height: 40, color: '#e74c3c' };
    let c2 = { x: 150, vx: -50, mass: 2, width: 40, height: 40, color: '#3498db' };
    
    // UI Button for toggle
    let btn = {x: 0, y: -engine.height/2 + 40, w: 120, h: 30};
    
    engine.canvas.addEventListener('pointerdown', (e) => {
        const pos = engine.getPointerPos(e);
        if (Math.abs(pos.x - btn.x) < btn.w/2 && Math.abs(pos.y - btn.y) < btn.h/2) {
            isElastic = !isElastic;
            // Reset
            c1.x = -150; c1.vx = 100;
            c2.x = 150; c2.vx = -50;
        }
    });

    engine.start((dt) => {
        c1.x += c1.vx * dt;
        c2.x += c2.vx * dt;
        
        // Collision check
        if (c1.x + c1.width/2 > c2.x - c2.width/2 && c1.x < c2.x) {
            if (isElastic) {
                // 1D Elastic Collision
                let v1 = ((c1.mass - c2.mass)*c1.vx + 2*c2.mass*c2.vx) / (c1.mass + c2.mass);
                let v2 = ((c2.mass - c1.mass)*c2.vx + 2*c1.mass*c1.vx) / (c1.mass + c2.mass);
                c1.vx = v1;
                c2.vx = v2;
            } else {
                // Perfectly Inelastic Collision
                let vf = (c1.mass*c1.vx + c2.mass*c2.vx) / (c1.mass + c2.mass);
                c1.vx = vf;
                c2.vx = vf;
            }
            // Separate to avoid sticking
            let overlap = (c1.x + c1.width/2) - (c2.x - c2.width/2);
            c1.x -= overlap/2 + 1;
            c2.x += overlap/2 + 1;
        }
        
        // Wrap
        if (c1.x > engine.width/2 + c1.width) c1.x = -engine.width/2 - c1.width;
        if (c1.x < -engine.width/2 - c1.width) c1.x = engine.width/2 + c1.width;
        if (c2.x > engine.width/2 + c2.width) c2.x = -engine.width/2 - c2.width;
        if (c2.x < -engine.width/2 - c2.width) c2.x = engine.width/2 + c2.width;
        
    }, (ctx) => {
        // Draw Button
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(btn.x - btn.w/2, btn.y - btn.h/2, btn.w, btn.h);
        ctx.fillStyle = '#ecf0f1';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(isElastic ? 'Elastic' : 'Inelastic', btn.x, btn.y + 5);
        ctx.textAlign = 'left';
        
        // Draw Carts
        ctx.fillStyle = c1.color;
        ctx.fillRect(c1.x - c1.width/2, -c1.height/2, c1.width, c1.height);
        ctx.fillStyle = c2.color;
        ctx.fillRect(c2.x - c2.width/2, -c2.height/2, c2.width, c2.height);
        
        // Draw Momentum vectors
        engine.drawVector(c1.x, -c1.height/2 - 10, c1.vx * 0.5, 0, c1.color, `p1 = ${(c1.mass*c1.vx).toFixed(0)}`);
        engine.drawVector(c2.x, -c2.height/2 - 10, c2.vx * 0.5, 0, c2.color, `p2 = ${(c2.mass*c2.vx).toFixed(0)}`);
        
        let totalP = c1.mass*c1.vx + c2.mass*c2.vx;
        ctx.fillStyle = '#333';
        ctx.fillText(`Total Momentum: ${totalP.toFixed(0)} kg m/s`, -engine.width/2 + 20, -engine.height/2 + 30);
    });
};
