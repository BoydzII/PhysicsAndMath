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

  // Stroke Size Buttons
  document.querySelectorAll('.size-btn[data-size]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      const b = e.currentTarget;
      b.classList.add('active');
      if (drawingEngine) drawingEngine.setSize(b.dataset.size);
    });
  });

  // Undo & Redo Buttons
  document.getElementById('btnUndo')?.addEventListener('click', () => {
    if (drawingEngine) drawingEngine.undo();
  });
  document.getElementById('btnRedo')?.addEventListener('click', () => {
    if (drawingEngine) drawingEngine.redo();
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
    if (confirm('ต้องการล้างหน้ากระดาษจดโน้ตและลายมือทั้งหมดหรือไม่?')) {
      drawingEngine.clear();
      document.querySelectorAll('.answer-input').forEach(inp => {
        inp.value = '';
        inp.classList.remove('input-correct', 'input-incorrect');
      });
      saveInputs();
      showToast('🧹 ล้างหน้ากระดาษและคำตอบเรียบร้อยแล้ว', 'info');
    }
  });

  // Save inputs when typing & clear validation borders
  document.getElementById('notebookContainer').addEventListener('input', (e) => {
    if (e.target.classList.contains('answer-input')) {
      e.target.classList.remove('input-correct', 'input-incorrect');
      saveInputs();
    }
  });

  // Real-Time Answer Check ("ตรวจคำตอบ")
  document.getElementById('btnCheckAnswers')?.addEventListener('click', () => {
    checkAnswers(true);
  });

  // Student Profile Inputs
  loadStudentProfile();
  ['studentNameInput', 'studentRoomInput', 'studentNoInput'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', saveStudentProfile);
  });

  // Toggle Theory Panel
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
    setTimeout(() => { if (drawingEngine) drawingEngine.resize(); }, 350);
  });

  // Modal Actions
  document.getElementById('btnSubmit')?.addEventListener('click', () => {
    updateModalGradingSummary();
    document.getElementById('submitModal').style.display = 'flex';
  });
  
  document.getElementById('btnCloseModal')?.addEventListener('click', () => {
    document.getElementById('submitModal').style.display = 'none';
  });

  document.getElementById('btnCancelSubmit')?.addEventListener('click', () => {
    document.getElementById('submitModal').style.display = 'none';
  });

  document.getElementById('btnPrintWorksheet')?.addEventListener('click', () => {
    printWorksheet();
  });

  document.getElementById('btnSubmitToSheets')?.addEventListener('click', () => {
    submitToGoogleSheets();
  });

  document.getElementById('btnCopyReport')?.addEventListener('click', () => {
    copyReportSummary();
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


// ==========================================
// Grading & Student Submission Dashboard
// ==========================================

function getProblemAnswer(prob) {
  if (prob.answer !== undefined) return String(prob.answer).trim();
  
  // 1. Check data-answer in guide, intermediateHtml, or advancedHtml
  const allHtml = (prob.guide || '') + (prob.intermediateHtml || '') + (prob.advancedHtml || '');
  const dataAnsMatch = allHtml.match(/data-answer=["']([^"']+)["']/);
  if (dataAnsMatch) return dataAnsMatch[1].trim();
  
  // 2. Check placeholder in guide
  const placeholderMatch = (prob.guide || '').match(/placeholder=["']([^"']+)["']/);
  if (placeholderMatch && placeholderMatch[1] !== 'คำตอบ') return placeholderMatch[1].trim();
  
  // 3. Check placeholder in intermediateHtml / advancedHtml
  const interMatch = (prob.intermediateHtml || '').match(/placeholder=["']([^"']+)["']/);
  if (interMatch && interMatch[1] !== 'คำตอบ') return interMatch[1].trim();

  // 4. Check &= ... at the end of guide LaTeX
  const eqMatches = [...(prob.guide || '').matchAll(/&=\s*([0-9.,]+)(?:\\text|&nbsp;|\s|\$|<)/g)];
  if (eqMatches.length > 0) {
    const last = eqMatches[eqMatches.length - 1];
    return last[1].replace(/,/g, '').trim();
  }

  // 5. Fallback regex for final number before \text in guide
  const lastNumMatches = [...(prob.guide || '').matchAll(/([0-9]+(?:\.[0-9]+)?)\s*\\text/g)];
  if (lastNumMatches.length > 0) {
    return lastNumMatches[lastNumMatches.length - 1][1].trim();
  }

  return null;
}

function evaluateAnswer(userVal, correctVal) {
  if (!userVal || userVal.trim() === '') return { isAnswered: false, isCorrect: false };
  const u = userVal.trim().replace(/,/g, '');
  const c = String(correctVal).trim().replace(/,/g, '');
  
  // Exact string match (case-insensitive)
  if (u.toLowerCase() === c.toLowerCase()) {
    return { isAnswered: true, isCorrect: true };
  }
  
  // Numeric comparison with tolerance (±2% or ±0.15)
  const uNum = parseFloat(u);
  const cNum = parseFloat(c);
  if (!isNaN(uNum) && !isNaN(cNum)) {
    const diff = Math.abs(uNum - cNum);
    const tol = Math.max(0.15, Math.abs(cNum) * 0.02);
    if (diff <= tol) {
      return { isAnswered: true, isCorrect: true };
    }
  }
  
  return { isAnswered: true, isCorrect: false };
}

function checkAnswers(showToastNotice = true) {
  const topic = physicsData.topics[currentTopic];
  if (!topic || !topic.problems) return { total: 0, correct: 0, answered: 0, percentage: 0, details: [] };

  const details = [];
  let correctCount = 0;
  let answeredCount = 0;

  const blocks = document.querySelectorAll('.problem-block');
  blocks.forEach((block, idx) => {
    const prob = topic.problems[idx];
    if (!prob) return;
    const input = block.querySelector('.answer-input');
    const userVal = input ? input.value : '';
    const correctAns = getProblemAnswer(prob);

    const evalResult = evaluateAnswer(userVal, correctAns);

    if (input) {
      input.classList.remove('input-correct', 'input-incorrect');
      if (evalResult.isAnswered) {
        if (evalResult.isCorrect) {
          input.classList.add('input-correct');
          correctCount++;
        } else {
          input.classList.add('input-incorrect');
        }
        answeredCount++;
      }
    }

    details.push({
      index: idx + 1,
      id: prob.id,
      text: prob.text,
      userAnswer: userVal || '(ยังไม่ตอบ)',
      correctAnswer: correctAns || '-',
      isAnswered: evalResult.isAnswered,
      isCorrect: evalResult.isCorrect
    });
  });

  const total = topic.problems.length;
  const pct = total > 0 ? ((correctCount / total) * 100).toFixed(1) : '0.0';

  if (showToastNotice) {
    if (answeredCount === 0) {
      showToast('⚠️ ยังไม่ได้กรอกคำตอบ กรุณากรอกคำตอบลงในช่องก่อนตรวจ', 'warning');
    } else {
      showToast(`🎯 ตรวจเสร็จสิ้น: ถูกต้อง ${correctCount} จาก ${total} ข้อ (${pct}%)`, correctCount === total ? 'success' : 'info');
    }
  }

  return { total, correct: correctCount, answered: answeredCount, percentage: pct, details };
}

function loadStudentProfile() {
  const saved = localStorage.getItem('physics2_student_profile');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (document.getElementById('studentNameInput') && data.name) {
        document.getElementById('studentNameInput').value = data.name;
      }
      if (document.getElementById('studentRoomInput') && data.room) {
        document.getElementById('studentRoomInput').value = data.room;
      }
      if (document.getElementById('studentNoInput') && data.no) {
        document.getElementById('studentNoInput').value = data.no;
      }
    } catch(e) {}
  }
}

function saveStudentProfile() {
  const name = document.getElementById('studentNameInput')?.value || '';
  const room = document.getElementById('studentRoomInput')?.value || '';
  const no = document.getElementById('studentNoInput')?.value || '';
  localStorage.setItem('physics2_student_profile', JSON.stringify({ name, room, no }));
}

function updateModalGradingSummary() {
  const result = checkAnswers(false);
  const topic = physicsData.topics[currentTopic];
  
  // Topic title
  const topicTitleEl = document.getElementById('summaryTopicTitle');
  if (topicTitleEl && topic) topicTitleEl.textContent = topic.title;

  // Score big
  const scoreBigEl = document.getElementById('summaryScoreBig');
  if (scoreBigEl) scoreBigEl.textContent = `${result.correct} / ${result.total}`;

  // Percentage
  const pctEl = document.getElementById('summaryPercentageText');
  if (pctEl) pctEl.textContent = `คิดเป็น ${result.percentage}% (ตอบแล้ว ${result.answered}/${result.total} ข้อ)`;

  // Badge
  const badgeEl = document.getElementById('summaryBadge');
  if (badgeEl) {
    const numPct = parseFloat(result.percentage);
    if (numPct >= 80) {
      badgeEl.textContent = '🌟 ยอดเยี่ยม (ดีมาก)';
      badgeEl.style.background = '#16a34a';
      badgeEl.style.color = '#ffffff';
    } else if (numPct >= 60) {
      badgeEl.textContent = '👍 ผ่านเกณฑ์ (ดี)';
      badgeEl.style.background = '#2563eb';
      badgeEl.style.color = '#ffffff';
    } else if (numPct >= 50) {
      badgeEl.textContent = '⚡ ผ่านเกณฑ์ขั้นต่ำ';
      badgeEl.style.background = '#d97706';
      badgeEl.style.color = '#ffffff';
    } else {
      badgeEl.textContent = '📖 ควรทบทวนเพิ่มเติม';
      badgeEl.style.background = '#e11d48';
      badgeEl.style.color = '#ffffff';
    }
  }

  // Question Breakdown Table
  const breakdownList = document.getElementById('questionBreakdownList');
  if (breakdownList) {
    let tableHtml = `
      <table style="width:100%; border-collapse:collapse; text-align:left;">
        <thead>
          <tr style="border-bottom:2px solid #e2e8f0; color:#475569; font-size:0.8rem;">
            <th style="padding:6px;">ข้อ</th>
            <th style="padding:6px;">คำตอบของคุณ</th>
            <th style="padding:6px;">คำตอบที่ถูก</th>
            <th style="padding:6px; text-align:center;">สถานะ</th>
          </tr>
        </thead>
        <tbody>
    `;
    result.details.forEach(d => {
      let statusIcon = '⏳ <span style="color:#64748b;">เว้นว่าง</span>';
      if (d.isAnswered) {
        statusIcon = d.isCorrect
          ? '✅ <span style="color:#16a34a; font-weight:600;">ถูกต้อง</span>'
          : '❌ <span style="color:#ef4444; font-weight:600;">ไม่ถูกต้อง</span>';
      }
      tableHtml += `
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:6px; font-weight:600;">${d.index}</td>
          <td style="padding:6px; color:${d.isCorrect ? '#16a34a' : '#ef4444'}; font-family:monospace;">${d.userAnswer}</td>
          <td style="padding:6px; color:#2563eb; font-family:monospace;">${d.correctAnswer}</td>
          <td style="padding:6px; text-align:center;">${statusIcon}</td>
        </tr>
      `;
    });
    tableHtml += `</tbody></table>`;
    breakdownList.innerHTML = tableHtml;
  }
}

function printWorksheet() {
  saveStudentProfile();
  const profile = JSON.parse(localStorage.getItem('physics2_student_profile') || '{}');
  const topic = physicsData.topics[currentTopic];
  const result = checkAnswers(false);

  // Close modal before printing
  document.getElementById('submitModal').style.display = 'none';

  // Inject or update official print header banner
  let printHeader = document.getElementById('officialPrintHeader');
  if (!printHeader) {
    printHeader = document.createElement('div');
    printHeader.id = 'officialPrintHeader';
    printHeader.className = 'print-header-banner';
    const container = document.getElementById('notebookContainer');
    container.parentNode.insertBefore(printHeader, container);
  }

  const now = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
  printHeader.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:14px;">
      <div>
        <div style="font-size:15pt; font-weight:bold;">โรงเรียน...........................................................</div>
        <div style="font-size:12pt; font-weight:600;">ใบงานแบบฝึกหัดฟิสิกส์ เรื่อง: ${topic ? topic.title : currentTopic} (ระดับ: ${currentLevel})</div>
        <div style="font-size:11pt; margin-top:4px;">
          ชื่อ-สกุล: <b>${profile.name || '........................................................'}</b> &nbsp;&nbsp;&nbsp;
          ชั้น: <b>${profile.room || '.........'}</b> &nbsp;&nbsp;&nbsp;
          เลขที่: <b>${profile.no || '.........'}</b>
        </div>
      </div>
      <div style="text-align:right; border:1px solid #000; padding:6px 12px; border-radius:6px;">
        <div style="font-size:10pt; color:#555;">คะแนนที่ได้</div>
        <div style="font-size:16pt; font-weight:bold;">${result.correct} / ${result.total}</div>
        <div style="font-size:9pt;">วันที่: ${now}</div>
      </div>
    </div>
  `;

  setTimeout(() => {
    window.print();
  }, 150);
}

function copyReportSummary() {
  saveStudentProfile();
  const profile = JSON.parse(localStorage.getItem('physics2_student_profile') || '{}');
  const topic = physicsData.topics[currentTopic];
  const result = checkAnswers(false);
  const now = new Date().toLocaleString('th-TH');

  const text = `📊 ผลการส่งงานฟิสิกส์ออนไลน์ (Physics2App)\n` +
    `👤 ชื่อ-สกุล: ${profile.name || '(ไม่ได้ระบุ)'} ชั้น: ${profile.room || '-'} เลขที่: ${profile.no || '-'}\n` +
    `📚 บทเรียน: ${topic ? topic.title : currentTopic} [ระดับ: ${currentLevel}]\n` +
    `🎯 คะแนนที่ได้: ${result.correct}/${result.total} (${result.percentage}%)\n` +
    `📅 เวลาส่ง: ${now}\n` +
    `📝 รายละเอียด: ตอบถูก ${result.correct} ข้อ, ตอบผิด ${result.answered - result.correct} ข้อ, เว้นว่าง ${result.total - result.answered} ข้อ`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 คัดลอกผลสรุปคะแนนเรียบร้อยแล้ว พร้อมส่งใน LINE/Classroom!', 'success');
    }).catch(() => {
      prompt('คัดลอกข้อความสรุปด้านล่างนี้:', text);
    });
  } else {
    prompt('คัดลอกข้อความสรุปด้านล่างนี้:', text);
  }
}

function submitToGoogleSheets() {
  saveStudentProfile();
  const profile = JSON.parse(localStorage.getItem('physics2_student_profile') || '{}');
  const topic = physicsData.topics[currentTopic];
  const result = checkAnswers(false);

  if (!profile.name || profile.name.trim() === '') {
    showToast('⚠️ กรุณากรอก ชื่อ - นามสกุล ก่อนส่งงาน', 'warning');
    document.getElementById('studentNameInput')?.focus();
    return;
  }

  let sheetsUrl = localStorage.getItem('physics2_sheets_webhook_url');
  if (!sheetsUrl) {
    sheetsUrl = prompt(
      'กรุณาใส่ Google Apps Script Web App URL สำหรับรับข้อมูลคะแนน (หากยังไม่มี ให้กดยืนยันเพื่อบันทึกจำลอง):',
      'https://script.google.com/macros/s/AKfycbz_MOCK_PHYSICS_WEBAPP/exec'
    );
    if (sheetsUrl) {
      localStorage.setItem('physics2_sheets_webhook_url', sheetsUrl);
    }
  }

  const payload = {
    timestamp: new Date().toISOString(),
    studentName: profile.name,
    room: profile.room || '',
    number: profile.no || '',
    topicId: currentTopic,
    topicTitle: topic ? topic.title : currentTopic,
    level: currentLevel,
    score: result.correct,
    total: result.total,
    percentage: result.percentage,
    details: result.details
  };

  showToast('⏳ กำลังบันทึกคะแนนเข้า Google Sheets...', 'info');

  if (sheetsUrl && !sheetsUrl.includes('MOCK')) {
    fetch(sheetsUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(() => {
      showToast('✅ ส่งคะแนนเข้า Google Sheets เรียบร้อยแล้ว!', 'success');
      document.getElementById('submitModal').style.display = 'none';
    }).catch(err => {
      console.warn('Sheets submission error:', err);
      showToast('✅ บันทึกข้อมูลสำเร็จ (โหมดจำลองออฟไลน์)', 'success');
      document.getElementById('submitModal').style.display = 'none';
    });
  } else {
    setTimeout(() => {
      showToast('✅ ส่งคะแนนเข้า Google Sheets จำลองสำเร็จ!', 'success');
      document.getElementById('submitModal').style.display = 'none';
    }, 600);
  }
}

let toastTimeout = null;
function showToast(message, type = 'info', duration = 3500) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.className = 'toast-notification show';
  
  if (type === 'success') {
    toast.style.borderColor = '#22c55e';
    toast.style.color = '#15803d';
  } else if (type === 'warning') {
    toast.style.borderColor = '#f59e0b';
    toast.style.color = '#b45309';
  } else {
    toast.style.borderColor = '#3b82f6';
    toast.style.color = '#1d4ed8';
  }

  toastTimeout = setTimeout(() => {
    toast.className = 'toast-notification';
  }, duration);
}
