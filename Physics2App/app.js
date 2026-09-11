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
      html += `<div class="spacer-div" style="height:0px;"></div>`;
      html += `<button class="sm expand-btn" style="position:relative; z-index:10; margin-top:16px; padding:4px 8px; border-radius:4px; border:1px solid #ccc; cursor:pointer; background:#fff;">+ เพิ่มพื้นที่ทด</button>`;
    } else {
      html += `<div class="solution-guide">${prob.advancedHtml || ''}</div>`;
      html += `<div class="spacer-div" style="height:0px;"></div>`;
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
  
  let boxX = 20;
  let isDragging = false;
  let startX = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Ground
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    
    // Draw Box
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(boxX, canvas.height - 70, 40, 40);
    
    if (isDragging) {
      // Draw Force Vector F (diagonal)
      ctx.beginPath();
      ctx.moveTo(boxX + 20, canvas.height - 50);
      ctx.lineTo(boxX + 70, canvas.height - 80);
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Arrow head F
      ctx.beginPath();
      ctx.moveTo(boxX + 70, canvas.height - 80);
      ctx.lineTo(boxX + 60, canvas.height - 80);
      ctx.lineTo(boxX + 65, canvas.height - 70);
      ctx.fillStyle = '#2563eb';
      ctx.fill();

      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('F', boxX + 75, canvas.height - 85);

      // Draw Fx
      ctx.beginPath();
      ctx.moveTo(boxX + 20, canvas.height - 50);
      ctx.lineTo(boxX + 70, canvas.height - 50);
      ctx.strokeStyle = '#ef4444'; // Red for X
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.beginPath();
      ctx.moveTo(boxX + 70, canvas.height - 50);
      ctx.lineTo(boxX + 62, canvas.height - 54);
      ctx.lineTo(boxX + 62, canvas.height - 46);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.fillText('Fx', boxX + 75, canvas.height - 45);

      // Draw Fy
      ctx.beginPath();
      ctx.moveTo(boxX + 20, canvas.height - 50);
      ctx.lineTo(boxX + 20, canvas.height - 80);
      ctx.strokeStyle = '#10b981'; // Green for Y
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(boxX + 20, canvas.height - 80);
      ctx.lineTo(boxX + 16, canvas.height - 72);
      ctx.lineTo(boxX + 24, canvas.height - 72);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.fillText('Fy', boxX + 10, canvas.height - 90);
    }
  }
  
  function getX(e) {
    if (e.touches) return e.touches[0].clientX;
    return e.clientX;
  }

  function handleDown(e) {
    const rect = canvas.getBoundingClientRect();
    const x = getX(e) - rect.left;
    if (x >= boxX && x <= boxX + 40) {
      isDragging = true;
      startX = x - boxX;
      canvas.style.cursor = 'grabbing';
      e.preventDefault();
      draw();
    }
  }

  function handleMove(e) {
    if (!isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const x = getX(e) - rect.left;
    boxX = x - startX;
    
    // Limits
    if (boxX < 0) boxX = 0;
    if (boxX > canvas.width - 40) boxX = canvas.width - 40;
    
    draw();
    e.preventDefault();
  }

  function handleUp() {
    isDragging = false;
    canvas.style.cursor = 'grab';
    draw();
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
