let currentTopic = 'work';
let currentLevel = 'beginner';
let drawingEngine = null;

document.addEventListener('DOMContentLoaded', () => {
  // Init Drawing
  drawingEngine = new DrawingEngine('drawingCanvas');
  drawingEngine.topic = currentTopic;
  
  // Try to load saved inputs
  loadInputs();
  // Load saved drawings
  drawingEngine.loadData();

  // Setup UI Listeners
  setupListeners();

  // Initial Render
  renderApp();
});

function setupListeners() {
  // Topic selection
  document.getElementById('topicSelector').addEventListener('change', (e) => {
    saveInputs(); // save old topic inputs
    if (drawingEngine) drawingEngine.saveData(); // save old topic drawings
    
    currentTopic = e.target.value;
    
    renderApp();
    
    // The renderApp calls loadInputs(), but we need drawingEngine to load new topic
    if (drawingEngine) {
      drawingEngine.topic = currentTopic;
      drawingEngine.clear(false); // clear without saving to current topic yet
      drawingEngine.loadData();
    }
  });

  // Level selection
  const levelRadios = document.querySelectorAll('input[name="level"]');
  levelRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentLevel = e.target.value;
      renderApp();
    });
  });

  
  // Toolbar Dragging Logic
  const toolbar = document.getElementById('drawingToolbar');
  const dragHandle = toolbar.querySelector('.drag-handle');
  
  let isDraggingToolbar = false;
  let startX, startY, initialLeft, initialTop;

  function onDragStart(e) {
    if (e.target.closest('.tool-btn') || e.target.closest('.color-swatch')) return;
    isDraggingToolbar = true;
    toolbar.style.transition = 'none'; // Disable transition during drag
    
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    
    const rect = toolbar.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;
    
    // Clear transform to use raw left/top
    toolbar.style.transform = 'none';
    toolbar.style.left = initialLeft + 'px';
    toolbar.style.top = initialTop + 'px';
    toolbar.style.bottom = 'auto';
    toolbar.style.right = 'auto';
    
    e.preventDefault();
  }

  function onDragMove(e) {
    if (!isDraggingToolbar) return;
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    let dx = clientX - startX;
    let dy = clientY - startY;
    
    let newLeft = initialLeft + dx;
    let newTop = initialTop + dy;
    
    toolbar.style.left = newLeft + 'px';
    toolbar.style.top = newTop + 'px';
  }

  function onDragEnd(e) {
    if (!isDraggingToolbar) return;
    isDraggingToolbar = false;
    toolbar.style.transition = 'flex-direction 0.2s ease, border-radius 0.2s ease, left 0.3s ease, top 0.3s ease, transform 0.3s ease';
    
    const rect = toolbar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    // Snap Logic
    if (centerX < screenW * 0.2) {
      // Snap to Left
      toolbar.classList.add('vertical');
      toolbar.style.left = '24px';
      toolbar.style.top = '50%';
      toolbar.style.transform = 'translateY(-50%)';
    } else if (centerX > screenW * 0.8) {
      // Snap to Right
      toolbar.classList.add('vertical');
      toolbar.style.left = (screenW - rect.width - 24) + 'px';
      toolbar.style.top = '50%';
      toolbar.style.transform = 'translateY(-50%)';
    } else {
      // Snap to Bottom Center
      toolbar.classList.remove('vertical');
      toolbar.style.left = '50%';
      toolbar.style.top = (screenH - rect.height - 24) + 'px';
      toolbar.style.transform = 'translateX(-50%)';
    }
  }

  dragHandle.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
  
  dragHandle.addEventListener('touchstart', onDragStart, {passive: false});
  window.addEventListener('touchmove', onDragMove, {passive: false});
  window.addEventListener('touchend', onDragEnd);


  // Drawing Tools
  document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
      const t = e.currentTarget;
      t.classList.add('active');
      drawingEngine.setTool(t.dataset.tool);
    });
  });

  // Colors
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      const s = e.currentTarget;
      s.classList.add('active');
      drawingEngine.setColor(s.dataset.color);
      
      document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
      document.querySelector('.tool-btn[data-tool="pen"]').classList.add('active');
    });
  });

  // Clear Canvas
  document.getElementById('btnClearDraw').addEventListener('click', () => {
    if(confirm('ต้องการล้างหน้ากระดาษจดโน้ตทั้งหมดหรือไม่?')) {
      drawingEngine.clear();
      document.querySelectorAll('.answer-input').forEach(inp => inp.value = '');
      saveInputs();
    }
  });

  // Save inputs when typing
  document.getElementById('notebookContainer').addEventListener('input', (e) => {
    if (e.target.classList.contains('answer-input')) {
      saveInputs();
    }
  });

  
  document.getElementById('btnTogglePanel')?.addEventListener('click', (e) => {
    const leftPanel = document.querySelector('.content-panel');
    const rightPanel = document.querySelector('.notebook-panel');
    leftPanel.classList.toggle('collapsed');
    rightPanel.classList.toggle('expanded');
    
    const btn = e.currentTarget;
    if (leftPanel.classList.contains('collapsed')) {
        btn.innerHTML = '<i class="ph ph-arrows-in-line-horizontal" style="font-size:16px;"></i> แสดงเนื้อหา';
    } else {
        btn.innerHTML = '<i class="ph ph-arrows-out-line-horizontal" style="font-size:16px;"></i> ซ่อนเนื้อหา';
    }
    // Resize canvas after transition
    setTimeout(() => { if(drawingEngine) drawingEngine.resize(); }, 350);
  });

  // Modal actions
  document.getElementById('btnSubmit').addEventListener('click', () => {
    document.getElementById('submitModal').style.display = 'flex';
  });
  
  document.getElementById('btnCancelSubmit').addEventListener('click', () => {
    document.getElementById('submitModal').style.display = 'none';
  });

  document.getElementById('btnConfirmSubmit').addEventListener('click', () => {
    document.getElementById('submitModal').style.display = 'none';
    alert('บันทึกหน้าจอ และส่งคะแนนเข้า Google Sheets สำเร็จ! (ระบบจำลองการส่งงาน)');
    window.print();
  });

  // Expand space delegated
  document.getElementById('notebookContainer').addEventListener('click', (e) => {
    if (e.target.classList.contains('expand-btn')) {
      const block = e.target.closest('.problem-block');
      const spacer = block.querySelector('.spacer-div');
      const curH = parseInt(spacer.style.height || 0);
      spacer.style.height = (curH + 160) + 'px';
      drawingEngine.resize();
    }
  });
}

function renderApp() {
  const data = physicsData.topics[currentTopic];
  if (!data) return;

  // 1. Render Left Panel (Theory)
  const theoryContainer = document.getElementById('theoryContainer');
  theoryContainer.innerHTML = data.theory;

  // 2. Render Right Panel (Problems)
  const notebookContainer = document.getElementById('notebookContainer');
  let html = '';
  
  data.problems.forEach((prob, idx) => {
    html += `<div class="problem-block" data-id="${prob.id}">`;
    html += `<div class="problem-text">ข้อ ${idx + 1}. ${prob.text}</div>`;
    
    if (currentLevel === 'beginner') {
      if (prob.hints) {
        html += `<div class="hint-box"><b>ไกด์นำทาง:</b> ${prob.hints}</div>`;
      }
      html += `<div class="solution-guide">${prob.guide}</div>`;
    } else if (currentLevel === 'intermediate') {
      html += `<div class="solution-guide">${prob.intermediateHtml || ''}</div>`;
      html += `<div class="spacer-div" style="height:256px;"></div>`;
      html += `<button class="sm expand-btn" style="position:relative; z-index:10; margin-top:16px; padding:4px 8px; border-radius:4px; border:1px solid #ccc; cursor:pointer; background:#fff;">+ เพิ่มพื้นที่ทด</button>`;
    } else {
      html += `<div class="solution-guide">${prob.advancedHtml || ''}</div>`;
      html += `<div class="spacer-div" style="height:256px;"></div>`;
      html += `<button class="sm expand-btn" style="position:relative; z-index:10; margin-top:16px; padding:4px 8px; border-radius:4px; border:1px solid #ccc; cursor:pointer; background:#fff;">+ เพิ่มพื้นที่ทด</button>`;
    }
    
    html += `</div>`;
  });

  notebookContainer.innerHTML = html;

  // 3. Render Math using KaTeX
  renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ],
    throwOnError: false
  });

  // 4. Initialize Simulation if available
  if (currentTopic === 'work') {
    initWorkSimulation();
  } else if (currentTopic === 'power') {
    initPowerSimulation();
  } else if (currentTopic === 'kinetic') {
    initKineticSimulation();
  } else if (currentTopic === 'potential') {
    initPotentialSimulation();
  } else if (currentTopic === 'conservation') {
    initConservationSimulation();
  } else if (currentTopic === 'momentum') {
    initMomentumSim();
  } else if (currentTopic === 'impulse') {
    initImpulseSim();
  } else if (currentTopic === 'collision') {
    initCollisionSim();
  } else if (currentTopic === 'projectile') {
    initProjectileSim();
  } else if (currentTopic === 'circular') {
    initCircularSim();
  } else if (currentTopic === 'shm') {
    initSHMSim();
  }

  // Restore inputs after re-render
  restoreInputs();
  // Ensure canvas resizes to fit new content height
  setTimeout(() => { if (drawingEngine) drawingEngine.resize(); }, 100);
}

function initWorkSimulation() {
  const canvas = document.getElementById('simWork');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  
  let boxX = canvas.width / 2 - 20; // start in middle
  let isDragging = false;
  let pointerX = 0;
  let pointerY = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Ground
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    
    // Draw Box
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(boxX, canvas.height - 70, 40, 40);
    
    if (isDragging) {
      let startX = boxX + 20;
      let startY = canvas.height - 50; // center of box
      
      let dx = pointerX - startX;
      let dy = pointerY - startY;
      
      // Limit pull up only (no pulling underground)
      if (dy > 0) dy = 0;
      
      let dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist > 10) {
        let endX = startX + dx;
        let endY = startY + dy;
        
        // Draw Force Vector F (diagonal)
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Arrow head F
        let angle = Math.atan2(dy, dx);
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - 12 * Math.cos(angle - Math.PI/6), endY - 12 * Math.sin(angle - Math.PI/6));
        ctx.lineTo(endX - 12 * Math.cos(angle + Math.PI/6), endY - 12 * Math.sin(angle + Math.PI/6));
        ctx.fillStyle = '#2563eb';
        ctx.fill();

        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('F', endX + 10, endY - 10);

        // Draw Fx
        if (Math.abs(dx) > 10) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, startY);
            ctx.strokeStyle = '#ef4444'; // Red for X
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Arrow head Fx
            let signX = dx > 0 ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(endX, startY);
            ctx.lineTo(endX - signX*10, startY - 5);
            ctx.lineTo(endX - signX*10, startY + 5);
            ctx.fillStyle = '#ef4444';
            ctx.fill();
            ctx.fillText('Fx', endX + signX*15, startY + 5);
            
            // Move box slightly towards mouse (Spring effect)
            boxX += dx * 0.005; // Added strong friction to slow down dragging
        }

        // Draw Fy
        if (Math.abs(dy) > 10) {
            ctx.beginPath();
            ctx.moveTo(endX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = '#10b981'; // Green for Y
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Arrow head Fy
            let signY = dy > 0 ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - 5, endY - signY*10);
            ctx.lineTo(endX + 5, endY - signY*10);
            ctx.fillStyle = '#10b981';
            ctx.fill();
            ctx.fillText('Fy', endX - 25, endY - signY*15);
        }
      }
    }
    
    // Bounds check for box
    if (boxX < 0) boxX = 0;
    if (boxX > canvas.width - 40) boxX = canvas.width - 40;
    
    requestAnimationFrame(draw);
  }
  
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    let cx, cy;
    if (e.touches) {
        cx = e.touches[0].clientX;
        cy = e.touches[0].clientY;
    } else {
        cx = e.clientX;
        cy = e.clientY;
    }
    return { x: cx - rect.left, y: cy - rect.top };
  }

  function handleDown(e) {
    isDragging = true;
    canvas.style.cursor = 'grabbing';
    let pos = getPos(e);
    pointerX = pos.x;
    pointerY = pos.y;
    e.preventDefault();
  }

  function handleMove(e) {
    if (!isDragging) return;
    let pos = getPos(e);
    pointerX = pos.x;
    pointerY = pos.y;
    e.preventDefault();
  }

  function handleUp() {
    isDragging = false;
    canvas.style.cursor = 'grab';
  }

  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleUp);

  canvas.addEventListener('touchstart', handleDown, { passive: false });
  canvas.addEventListener('touchmove', handleMove, { passive: false });
  window.addEventListener('touchend', handleUp);

  draw();
}


function initPowerSimulation() {
  const canvas = document.getElementById('simPower');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const W = canvas.width;
  const H = canvas.height;

  // Crane simulation: drag weight up/down, see Power change in real-time
  const ropeX = W * 0.5;        // center of pulley
  const pulleyY = 30;
  const weightSize = 40;
  let weightY = H - 80;         // current Y of weight (top-left corner)
  let isDragging = false;
  let lastY = 0;
  let lastTime = 0;
  let speed = 0;                // pixels per second
  let prevWeightY = weightY;

  const mass = 100;   // kg
  const g = 10;
  const mg = mass * g; // N

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#e0f2fe');
    grad.addColorStop(1, '#f0f9ff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = '#a3be8c';
    ctx.fillRect(0, H - 30, W, 30);
    ctx.fillStyle = '#8faa7b';
    ctx.fillRect(0, H - 30, W, 2);

    // Crane tower
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(ropeX - 8, pulleyY, 16, H - 30 - pulleyY);
    // Crane arm
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(ropeX - 60, pulleyY - 5, 120, 10);

    // Pulley circle
    ctx.beginPath();
    ctx.arc(ropeX, pulleyY, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#374151';
    ctx.fill();
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rope
    ctx.beginPath();
    ctx.moveTo(ropeX, pulleyY + 12);
    ctx.lineTo(ropeX, weightY);
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Weight box
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(ropeX - weightSize/2, weightY, weightSize, weightSize);
    // Weight label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(mass + ' kg', ropeX, weightY + weightSize/2 + 4);

    // Height indicator
    const heightM = ((H - 80 - weightY) / (H - 80 - pulleyY - 30) * 15).toFixed(1);
    ctx.fillStyle = '#374151';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('h = ' + heightM + ' m', 10, H - 40);

    // Speed & Power display
    const speedMS = Math.abs(speed / (H - 80 - pulleyY - 30) * 15).toFixed(1);
    const powerVal = (mg * parseFloat(speedMS)).toFixed(0);

    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#2563eb';
    ctx.textAlign = 'right';
    ctx.fillText('v = ' + speedMS + ' m/s', W - 10, 60);
    ctx.fillStyle = '#dc2626';
    ctx.fillText('P = Fv = ' + powerVal + ' W', W - 10, 80);
    ctx.fillStyle = '#374151';
    ctx.fillText('F = mg = ' + mg + ' N', W - 10, 100);

    // Direction arrow on weight
    if (Math.abs(speed) > 5) {
      const dir = speed < 0 ? -1 : 1; // negative = going up
      ctx.beginPath();
      ctx.moveTo(ropeX + weightSize/2 + 10, weightY + weightSize/2);
      ctx.lineTo(ropeX + weightSize/2 + 10, weightY + weightSize/2 + dir * 20);
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 3;
      ctx.stroke();
      // arrowhead
      ctx.beginPath();
      ctx.moveTo(ropeX + weightSize/2 + 10, weightY + weightSize/2 + dir * 20);
      ctx.lineTo(ropeX + weightSize/2 + 5, weightY + weightSize/2 + dir * 12);
      ctx.lineTo(ropeX + weightSize/2 + 15, weightY + weightSize/2 + dir * 12);
      ctx.fillStyle = '#2563eb';
      ctx.fill();
    }

    ctx.textAlign = 'start'; // reset

    requestAnimationFrame(draw);
  }

  // Speed calculation
  setInterval(() => {
    speed = (weightY - prevWeightY) / 0.05; // 50ms interval
    prevWeightY = weightY;
  }, 50);

  function getY(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) return e.touches[0].clientY - rect.top;
    return e.clientY - rect.top;
  }

  function handleDown(e) {
    const y = getY(e);
    if (y >= weightY && y <= weightY + weightSize) {
      isDragging = true;
      lastY = y;
      canvas.style.cursor = 'grabbing';
      e.preventDefault();
    }
  }

  function handleMove(e) {
    if (!isDragging) return;
    const y = getY(e);
    weightY += (y - lastY);
    lastY = y;
    // Clamp
    if (weightY < pulleyY + 30) weightY = pulleyY + 30;
    if (weightY > H - 80) weightY = H - 80;
    e.preventDefault();
  }

  function handleUp() {
    isDragging = false;
    canvas.style.cursor = 'pointer';
  }

  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleUp);
  canvas.addEventListener('touchstart', handleDown, { passive: false });
  canvas.addEventListener('touchmove', handleMove, { passive: false });
  window.addEventListener('touchend', handleUp);

  draw();
}

function initKineticSimulation() {
  const canvas = document.getElementById('simKinetic');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let carX = canvas.width / 2;
  const carWidth = 60;
  const carHeight = 30;
  const m = 2;
  let isDragging = false;
  let lastX = carX;
  let v = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ground
    ctx.fillStyle = '#a3be8c';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

    // Car
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(carX - carWidth/2, canvas.height - 40 - carHeight, carWidth, carHeight);

    // Speed display
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`v = ${Math.abs(v).toFixed(1)} m/s`, 10, 20);
    ctx.fillText(`m = ${m} kg`, 10, 40);

    // KE Bar Graph
    const ke = 0.5 * m * v * v;
    ctx.fillText(`KE = ½mv² = ${ke.toFixed(1)} J`, 10, 60);
    
    const maxBarHeight = canvas.height - 100;
    const barHeight = Math.min(ke, maxBarHeight);
    
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(canvas.width - 60, canvas.height - 40 - barHeight, 40, barHeight);
    
    // Axis / Labels
    ctx.fillStyle = '#374151';
    ctx.fillText('KE', canvas.width - 50, canvas.height - 20);
    
    ctx.beginPath();
    ctx.moveTo(canvas.width - 70, canvas.height - 40);
    ctx.lineTo(canvas.width - 10, canvas.height - 40);
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  setInterval(() => {
    v = (carX - lastX) / 0.05; // 50ms interval
    lastX = carX;
  }, 50);

  function getX(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) return e.touches[0].clientX - rect.left;
    return e.clientX - rect.left;
  }

  function handleDown(e) {
    const x = getX(e);
    if (Math.abs(x - carX) < 60) {
      isDragging = true;
      e.preventDefault();
    }
  }

  function handleMove(e) {
    if (!isDragging) return;
    carX = getX(e);
    if (carX < carWidth/2) carX = carWidth/2;
    if (carX > canvas.width - carWidth/2) carX = canvas.width - carWidth/2;
    e.preventDefault();
  }

  function handleUp() {
    isDragging = false;
  }

  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleUp);
  canvas.addEventListener('touchstart', handleDown, { passive: false });
  canvas.addEventListener('touchmove', handleMove, { passive: false });
  window.addEventListener('touchend', handleUp);

  draw();
}

function initPotentialSimulation() {
  const canvas = document.getElementById('simPotential');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // Left Side (Gravitational)
  let ballY = canvas.height - 50;
  const ballRadius = 20;
  const m = 2;
  const g = 10;
  let isDraggingBall = false;

  // Right Side (Elastic)
  let springX = canvas.width - 40;
  const k = 200;
  let isDraggingSpring = false;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const midX = canvas.width / 2;

    // Divider
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, canvas.height);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();

    // ---------------- Left: Gravitational ----------------
    // Ground
    ctx.fillStyle = '#a3be8c';
    ctx.fillRect(0, canvas.height - 30, midX, 30);

    // Ball
    ctx.beginPath();
    ctx.arc(midX / 2, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.fill();

    const maxH = canvas.height - 30 - ballRadius;
    let h_ratio = (canvas.height - 30 - ballY) / maxH;
    if (h_ratio < 0) h_ratio = 0;
    const h = (h_ratio * 10).toFixed(1); 
    const peG = m * g * h;

    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.fillText(`h = ${h} m`, 10, 20);
    ctx.fillText(`PE = mgh = ${peG.toFixed(1)} J`, 10, 40);

    const barGHeight = Math.min(peG, canvas.height - 100);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(midX - 50, canvas.height - 30 - barGHeight, 30, barGHeight);
    ctx.fillStyle = '#374151';
    ctx.fillText('PE', midX - 45, canvas.height - 10);

    // ---------------- Right: Elastic ----------------
    // Wall
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(canvas.width - 20, 0, 20, canvas.height);
    
    // Spring
    ctx.beginPath();
    ctx.moveTo(canvas.width - 20, canvas.height / 2);
    ctx.lineTo(springX, canvas.height / 2);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 5;
    ctx.stroke();
    // Block on spring
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(springX - 20, canvas.height / 2 - 20, 20, 40);

    const naturalX = canvas.width - 120;
    const x = ((springX - naturalX) / 100).toFixed(2);
    const peE = 0.5 * k * x * x;

    ctx.fillStyle = '#374151';
    ctx.fillText(`x = ${Math.abs(x).toFixed(2)} m`, midX + 10, 20);
    ctx.fillText(`PE = ½kx² = ${peE.toFixed(1)} J`, midX + 10, 40);

    const barEHeight = Math.min(peE, canvas.height - 100);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(canvas.width - 70, canvas.height - 30 - barEHeight, 30, barEHeight);
    ctx.fillStyle = '#374151';
    ctx.fillText('PE', canvas.width - 65, canvas.height - 10);

    requestAnimationFrame(draw);
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleDown(e) {
    const pos = getPos(e);
    const midX = canvas.width / 2;
    if (pos.x < midX) {
      if (Math.abs(pos.y - ballY) < 40) isDraggingBall = true;
    } else {
      if (Math.abs(pos.x - springX) < 40 && Math.abs(pos.y - canvas.height/2) < 40) isDraggingSpring = true;
    }
    e.preventDefault();
  }

  function handleMove(e) {
    const pos = getPos(e);
    if (isDraggingBall) {
      ballY = pos.y;
      if (ballY < ballRadius) ballY = ballRadius;
      if (ballY > canvas.height - 30 - ballRadius) ballY = canvas.height - 30 - ballRadius;
    }
    if (isDraggingSpring) {
      springX = pos.x;
      if (springX < canvas.width / 2 + 20) springX = canvas.width / 2 + 20;
      if (springX > canvas.width - 20) springX = canvas.width - 20;
    }
    if (isDraggingBall || isDraggingSpring) e.preventDefault();
  }

  function handleUp() {
    isDraggingBall = false;
    isDraggingSpring = false;
  }

  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleUp);
  canvas.addEventListener('touchstart', handleDown, { passive: false });
  canvas.addEventListener('touchmove', handleMove, { passive: false });
  window.addEventListener('touchend', handleUp);

  draw();
}

function initConservationSimulation() {
  const canvas = document.getElementById('simConservation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const L = 150; 
  const pivotX = canvas.width / 2;
  const pivotY = 20;
  const m = 2; 
  const g = 10;
  
  let theta = Math.PI / 4;
  let omega = 0;
  let isDragging = false;
  let lastTime = performance.now();

  function draw(time) {
    const dt = (time - lastTime) / 1000 || 0;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isDragging) {
      const alpha = - (g / 1.5) * Math.sin(theta);
      omega += alpha * dt;
      omega *= 0.999; // damping
      theta += omega * dt;
    }

    const bobX = pivotX + L * Math.sin(theta);
    const bobY = pivotY + L * Math.cos(theta);

    // Draw rope
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw bob
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.fill();

    // Energy calculation
    const h = 1.5 * (1 - Math.cos(theta));
    const pe = m * g * h;
    const v = Math.abs(omega * 1.5);
    const ke = 0.5 * m * v * v;
    const total = pe + ke;

    // Draw Energy Bars
    const barScale = 1.5; 
    const barW = 20;
    const startX = 20;
    const startY = canvas.height - 30;

    // KE Bar
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(startX, startY - ke * barScale, barW, ke * barScale);
    ctx.fillStyle = '#374151';
    ctx.font = '10px sans-serif';
    ctx.fillText('KE', startX, startY + 15);

    // PE Bar
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(startX + 30, startY - pe * barScale, barW, pe * barScale);
    ctx.fillText('PE', startX + 30, startY + 15);

    // Total Bar
    ctx.fillStyle = '#10b981';
    ctx.fillRect(startX + 60, startY - total * barScale, barW, total * barScale);
    ctx.fillText('Total', startX + 60, startY + 15);

    requestAnimationFrame(draw);
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleDown(e) {
    const pos = getPos(e);
    const bobX = pivotX + L * Math.sin(theta);
    const bobY = pivotY + L * Math.cos(theta);
    if (Math.hypot(pos.x - bobX, pos.y - bobY) < 30) {
      isDragging = true;
      omega = 0;
      e.preventDefault();
    }
  }

  function handleMove(e) {
    if (!isDragging) return;
    const pos = getPos(e);
    theta = Math.atan2(pos.x - pivotX, pos.y - pivotY);
    e.preventDefault();
  }

  function handleUp() {
    isDragging = false;
  }

  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleUp);
  canvas.addEventListener('touchstart', handleDown, { passive: false });
  canvas.addEventListener('touchmove', handleMove, { passive: false });
  window.addEventListener('touchend', handleUp);

  requestAnimationFrame(draw);
}

function initMomentumSim() {
  const canvas = document.getElementById('simMomentum');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let carX = 50;
  let v = 2;
  const mass = 1500;
  let isDragging = false;
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ground
    ctx.fillStyle = '#a3be8c';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

    // car
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(carX - 30, canvas.height - 60, 60, 30);

    // text
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText(`v = ${v.toFixed(1)} m/s`, 10, 20);
    ctx.fillText(`m = ${mass} kg`, 10, 40);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`p = mv = ${(mass * v).toFixed(0)} kg.m/s`, 10, 60);

    ctx.fillStyle = '#374151';
    ctx.fillText(`Drag car or click to change speed`, 10, 80);

    if (!isDragging) {
      carX += v;
      if (carX > canvas.width + 30) carX = -30;
    }

    requestAnimationFrame(draw);
  }

  function getX(e) {
    const rect = canvas.getBoundingClientRect();
    return e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
  }

  canvas.addEventListener('mousedown', (e) => {
    let x = getX(e);
    if (Math.abs(x - carX) < 40) isDragging = true;
    else v = v === 2 ? 5 : (v === 5 ? 0 : 2);
  });
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let oldX = carX;
      carX = getX(e);
      v = (carX - oldX) / 0.5; // fake speed from drag
    }
  });
  window.addEventListener('mouseup', () => isDragging = false);
  
  canvas.addEventListener('touchstart', (e) => {
    let x = getX(e);
    if (Math.abs(x - carX) < 40) { isDragging = true; e.preventDefault(); }
    else v = v === 2 ? 5 : (v === 5 ? 0 : 2);
  }, {passive: false});
  canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
      let oldX = carX;
      carX = getX(e);
      v = (carX - oldX) / 0.5;
      e.preventDefault();
    }
  }, {passive: false});
  window.addEventListener('touchend', () => isDragging = false);

  draw();
}

function initImpulseSim() {
  const canvas = document.getElementById('simImpulse');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let ballX = 50;
  let v = 5;
  const m = 0.5;
  let state = 'moving'; // moving, hit

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // wall
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(canvas.width - 40, 0, 40, canvas.height);
    
    // ground
    ctx.fillStyle = '#a3be8c';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

    // ball
    ctx.beginPath();
    ctx.arc(ballX, canvas.height - 50, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.fill();

    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Click to reset`, 10, 20);
    
    if (state === 'moving') {
        ballX += v;
        if (ballX >= canvas.width - 60) {
            v = -4; // bounce back with less speed
            state = 'hit';
        }
    } else if (state === 'hit') {
        ballX += v;
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`Impulse (I) = Δp = m(v - u)`, 10, 40);
        ctx.fillText(`= 0.5(-4 - 5) = -4.5 N.s`, 10, 60);
    }

    requestAnimationFrame(draw);
  }

  canvas.addEventListener('click', () => {
    ballX = 50;
    v = 5;
    state = 'moving';
  });

  draw();
}

function initCollisionSim() {
  const canvas = document.getElementById('simCollision');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let x1 = 50, v1 = 3, m1 = 2;
  let x2 = canvas.width - 100, v2 = -2, m2 = 3;
  let collided = false;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ground
    ctx.fillStyle = '#a3be8c';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

    // obj1
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath(); ctx.arc(x1, canvas.height - 50, 20, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillText('1', x1 - 4, canvas.height - 45);

    // obj2
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(x2, canvas.height - 60, 30, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillText('2', x2 - 4, canvas.height - 55);

    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Click to reset`, 10, 20);

    if (!collided) {
        x1 += v1;
        x2 += v2;
        if (x1 + 20 >= x2 - 30) {
            collided = true;
            let vFinal = (m1*v1 + m2*v2) / (m1+m2);
            v1 = vFinal;
            v2 = vFinal;
        }
    } else {
        x1 += v1;
        x2 += v2;
        ctx.fillText(`Inelastic Collision: v = ${v1.toFixed(2)} m/s`, 10, 40);
    }

    requestAnimationFrame(draw);
  }

  canvas.addEventListener('click', () => {
    x1 = 50; v1 = 3;
    x2 = canvas.width - 100; v2 = -2;
    collided = false;
  });

  draw();
}

function initProjectileSim() {
  const canvas = document.getElementById('simProjectile');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let x = 30, y = canvas.height - 30;
  let vx = 0, vy = 0;
  let isFlying = false;
  let angle = Math.PI / 4;
  const speed = 15;
  let traj = [];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ground
    ctx.fillStyle = '#a3be8c';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

    // cannon
    ctx.save();
    ctx.translate(30, canvas.height - 30);
    ctx.rotate(-angle);
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, -10, 40, 20);
    ctx.restore();

    // trajectory
    ctx.beginPath();
    for (let p of traj) {
      ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = '#9ca3af';
    ctx.stroke();

    // ball
    if (isFlying) {
      x += vx;
      vy += 0.5; // gravity
      y += vy;
      traj.push({x, y});
      if (y >= canvas.height - 30) {
        y = canvas.height - 30;
        isFlying = false;
      }
    }

    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.fill();

    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Click to launch! Drag up/down to change angle.`, 10, 20);

    requestAnimationFrame(draw);
  }

  let isDragging = false;
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return e.touches ? {x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top} : {x: e.clientX - rect.left, y: e.clientY - rect.top};
  }
  
  canvas.addEventListener('mousedown', (e) => {
    const pos = getPos(e);
    if (pos.x < 100 && pos.y > canvas.height - 100) isDragging = true;
    else if (!isFlying) {
      x = 30; y = canvas.height - 30;
      vx = Math.cos(angle) * speed; vy = -Math.sin(angle) * speed;
      isFlying = true; traj = [];
    }
  });
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const pos = getPos(e);
      let dy = (canvas.height - 30) - pos.y;
      let dx = pos.x - 30;
      angle = Math.atan2(dy, dx);
      if (angle < 0) angle = 0;
      if (angle > Math.PI/2) angle = Math.PI/2;
    }
  });
  window.addEventListener('mouseup', () => isDragging = false);

  canvas.addEventListener('touchstart', (e) => {
    const pos = getPos(e);
    if (pos.x < 100 && pos.y > canvas.height - 100) { isDragging = true; e.preventDefault(); }
    else if (!isFlying) {
      x = 30; y = canvas.height - 30;
      vx = Math.cos(angle) * speed; vy = -Math.sin(angle) * speed;
      isFlying = true; traj = [];
    }
  }, {passive: false});
  canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const pos = getPos(e);
      let dy = (canvas.height - 30) - pos.y;
      let dx = pos.x - 30;
      angle = Math.atan2(dy, dx);
      if (angle < 0) angle = 0;
      if (angle > Math.PI/2) angle = Math.PI/2;
      e.preventDefault();
    }
  }, {passive: false});
  window.addEventListener('touchend', () => isDragging = false);

  draw();
}

function initCircularSim() {
  const canvas = document.getElementById('simCircular');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let angle = 0;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  let r = 80;
  let isDragging = false;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!isDragging) angle += 0.05;

    let x = cx + r * Math.cos(angle);
    let y = cy + r * Math.sin(angle);

    // string
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#6b7280';
    ctx.stroke();

    // center
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#374151';
    ctx.fill();

    // mass
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();

    // vectors
    if (!isDragging) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 40 * Math.sin(angle), y + 40 * Math.cos(angle));
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 40 * Math.cos(angle), y - 40 * Math.sin(angle));
        ctx.strokeStyle = '#10b981';
        ctx.stroke();
    }

    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Red: Velocity (v), Green: Centripetal Force (Fc)`, 10, 20);
    ctx.fillText(`Drag mass to change radius`, 10, 40);

    requestAnimationFrame(draw);
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return e.touches ? {x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top} : {x: e.clientX - rect.left, y: e.clientY - rect.top};
  }

  canvas.addEventListener('mousedown', (e) => {
    let pos = getPos(e);
    let x = cx + r * Math.cos(angle);
    let y = cy + r * Math.sin(angle);
    if (Math.hypot(pos.x - x, pos.y - y) < 30) isDragging = true;
  });
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let pos = getPos(e);
      r = Math.hypot(pos.x - cx, pos.y - cy);
      angle = Math.atan2(pos.y - cy, pos.x - cx);
    }
  });
  window.addEventListener('mouseup', () => isDragging = false);
  
  canvas.addEventListener('touchstart', (e) => {
    let pos = getPos(e);
    let x = cx + r * Math.cos(angle);
    let y = cy + r * Math.sin(angle);
    if (Math.hypot(pos.x - x, pos.y - y) < 30) { isDragging = true; e.preventDefault(); }
  }, {passive: false});
  canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
      let pos = getPos(e);
      r = Math.hypot(pos.x - cx, pos.y - cy);
      angle = Math.atan2(pos.y - cy, pos.x - cx);
      e.preventDefault();
    }
  }, {passive: false});
  window.addEventListener('touchend', () => isDragging = false);

  draw();
}

function initSHMSim() {
  const canvas = document.getElementById('simSHM');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let t = 0;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  let A = 100;
  let isDragging = false;
  let x = cx + A;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!isDragging) {
        t += 0.05;
        x = cx + A * Math.cos(t);
    }

    // wall
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(0, cy - 30, 20, 60);

    // spring
    ctx.beginPath();
    ctx.moveTo(20, cy);
    let segments = 20;
    let dx = (x - 20) / segments;
    for (let i = 1; i < segments; i++) {
        ctx.lineTo(20 + i*dx, cy + (i%2===0 ? 15 : -15));
    }
    ctx.lineTo(x, cy);
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.stroke();

    // mass
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(x, cy - 20, 40, 40);

    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText(`x = A cos(ωt)`, 10, 20);
    ctx.fillText(`Displacement: ${(x - cx).toFixed(1)}`, 10, 40);
    ctx.fillText(`Drag mass to change amplitude`, 10, 60);

    requestAnimationFrame(draw);
  }

  function getX(e) {
    const rect = canvas.getBoundingClientRect();
    return e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
  }

  canvas.addEventListener('mousedown', (e) => {
    let px = getX(e);
    if (Math.abs(px - (x + 20)) < 40) isDragging = true;
  });
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      x = getX(e) - 20;
      A = Math.abs(x - cx);
      t = x >= cx ? 0 : Math.PI; // reset phase
    }
  });
  window.addEventListener('mouseup', () => isDragging = false);

  canvas.addEventListener('touchstart', (e) => {
    let px = getX(e);
    if (Math.abs(px - (x + 20)) < 40) { isDragging = true; e.preventDefault(); }
  }, {passive: false});
  canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
      x = getX(e) - 20;
      A = Math.abs(x - cx);
      t = x >= cx ? 0 : Math.PI; // reset phase
      e.preventDefault();
    }
  }, {passive: false});
  window.addEventListener('touchend', () => isDragging = false);

  draw();
}

function saveInputs() {
  const inputs = document.querySelectorAll('.answer-input');
  const values = Array.from(inputs).map(inp => inp.value);
  localStorage.setItem('physics2_inputs_' + currentTopic + '_' + currentLevel, JSON.stringify(values));
}

function loadInputs() {
  // Input loading is handled after render
}

function restoreInputs() {
  const saved = localStorage.getItem('physics2_inputs_' + currentTopic + '_' + currentLevel);
  if (saved) {
    const values = JSON.parse(saved);
    const inputs = document.querySelectorAll('.answer-input');
    inputs.forEach((inp, i) => {
      if (values[i] !== undefined) inp.value = values[i];
    });
  }
}
