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


// --- Custom Pinch Zoom for Paper Only ---
window.currentZoom = 1;
let initialZoom = 1;

document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
    initialZoom = currentZoom;
});

document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
    const wrapper = document.querySelector('.notebook-wrapper');
    if (!wrapper) return;
    
    let newZoom = initialZoom * e.scale;
    newZoom = Math.max(1, Math.min(newZoom, 5)); // min 1x, max 5x
    window.currentZoom = newZoom;
    
    // Use CSS zoom (works well in Safari for scaling while updating layout size)
    wrapper.style.zoom = currentZoom;
});

document.addEventListener('gestureend', function(e) {
    e.preventDefault();
});

// Prevent multi-touch scrolling which might trigger native zoom in some cases
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });
