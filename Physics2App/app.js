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
      
      // Auto switch back to pen visually
      document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
      document.querySelector('.tool-btn[data-tool="pen"]').classList.add('active');
    });
  });

  // Clear Canvas
  document.getElementById('btnClearDraw').addEventListener('click', () => {
    if(confirm('ต้องการล้างหน้ากระดาษจดโน้ตทั้งหมดหรือไม่?')) {
      drawingEngine.clear();
      // Also clear inputs
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
    } else {
      html += `<div class="solution-guide">${prob.advancedHtml}</div>`;
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
}

function initWorkSimulation() {
  const canvas = document.getElementById('simWork');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let boxX = 20;
  let time = 0;
  
  function draw() {
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Ground
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    
    // Draw Box
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(boxX, canvas.height - 70, 40, 40);
    
    // Draw Force Vector
    ctx.beginPath();
    ctx.moveTo(boxX + 20, canvas.height - 50);
    ctx.lineTo(boxX + 60, canvas.height - 80);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Arrow head
    ctx.beginPath();
    ctx.moveTo(boxX + 60, canvas.height - 80);
    ctx.lineTo(boxX + 50, canvas.height - 80);
    ctx.lineTo(boxX + 55, canvas.height - 70);
    ctx.fillStyle = '#2563eb';
    ctx.fill();

    ctx.fillStyle = '#2563eb';
    ctx.font = '14px sans-serif';
    ctx.fillText('F', boxX + 65, canvas.height - 85);

    // Animate
    boxX += 0.5;
    if (boxX > canvas.width - 50) {
      boxX = 20; // reset
    }
    
    requestAnimationFrame(draw);
  }
  
  // Set internal resolution
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
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
