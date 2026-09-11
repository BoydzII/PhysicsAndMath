let currentTopic = 'work';
let currentLevel = 'beginner';
let drawingEngine = null;

document.addEventListener('DOMContentLoaded', () => {
  // Init Drawing
  drawingEngine = new DrawingEngine('drawingCanvas');
  
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
    currentTopic = e.target.value;
    renderApp();
  });

  // Level selection
  const levelRadios = document.querySelectorAll('input[name="level"]');
  levelRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentLevel = e.target.value;
      renderApp();
    });
  });

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
      spacer.style.height = (curH + 150) + 'px';
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
      html += `<div class="spacer-div" style="height:250px;"></div>`;
      html += `<button class="sm expand-btn" style="position:relative; z-index:10; margin-top:16px; padding:4px 8px; border-radius:4px; border:1px solid #ccc; cursor:pointer; background:#fff;">+ เพิ่มพื้นที่ทด</button>`;
    } else {
      html += `<div class="solution-guide">${prob.advancedHtml || ''}</div>`;
      html += `<div class="spacer-div" style="height:250px;"></div>`;
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

function saveInputs() {
  const inputs = document.querySelectorAll('.answer-input');
  const values = Array.from(inputs).map(inp => inp.value);
  localStorage.setItem('physics2_inputs_' + currentLevel, JSON.stringify(values));
}

function loadInputs() {
  // Input loading is handled after render
}

function restoreInputs() {
  const saved = localStorage.getItem('physics2_inputs_' + currentLevel);
  if (saved) {
    const values = JSON.parse(saved);
    const inputs = document.querySelectorAll('.answer-input');
    inputs.forEach((inp, i) => {
      if (values[i] !== undefined) inp.value = values[i];
    });
  }
}
