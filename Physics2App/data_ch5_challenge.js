// data_ch5_challenge.js


const getSvgIncline = () => `<br><svg width="200" height="100" viewBox="0 0 200 100"><polygon points="20,90 180,90 180,40" fill="#eee" stroke="#333"/><rect x="80" y="58" width="30" height="30" fill="#add8e6" stroke="#000" transform="rotate(17.5 80 58)"/><text x="90" y="50" font-size="12">m</text></svg>`;
const getSvgPendulum = () => `<br><svg width="100" height="150" viewBox="0 0 100 150"><line x1="50" y1="10" x2="50" y2="100" stroke="#333" stroke-width="2"/><circle cx="50" cy="100" r="15" fill="#f08080" stroke="#000"/><line x1="20" y1="10" x2="80" y2="10" stroke="#000" stroke-width="4"/></svg>`;
const getSvgSpring = () => `<br><svg width="200" height="80" viewBox="0 0 200 80"><line x1="20" y1="40" x2="180" y2="40" stroke="#999" stroke-width="2"/><path d="M 20 40 Q 30 20 40 40 T 60 40 T 80 40 T 100 40" fill="none" stroke="#333" stroke-width="2"/><rect x="100" y="25" width="30" height="30" fill="#90ee90" stroke="#000"/><line x1="20" y1="10" x2="20" y2="70" stroke="#000" stroke-width="4"/></svg>`;
const getSvgBlock = () => `<br><svg width="200" height="80" viewBox="0 0 200 80"><line x1="10" y1="60" x2="190" y2="60" stroke="#333" stroke-width="2"/><rect x="50" y="30" width="40" height="30" fill="#ffd700" stroke="#000"/><line x1="90" y1="45" x2="140" y2="45" stroke="#f00" stroke-width="2" marker-end="url(#arrow)"/><defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f00"/></marker></defs></svg>`;

const generateProblems = () => {
  const problems = [];
  
  // 1-15: Easy (Basic formulas: W, P, Ek, Ep)
  for (let i = 1; i <= 5; i++) {
    problems.push({
      id: `ch5_c${i}`,
      text: `ออกแรง $F = ${10 * i}$ N ดึงวัตถุไปตามพื้นราบได้ระยะทาง $s = ${5 * i}$ m โดยแรงทำมุม $0^\\circ$ กับการกระจัด จงหางานที่เกิดขึ้น (J)${i===1?getSvgBlock():""}`,
      hints: `W = F s \\cos(0)`,
      guide: `<div class="step">W = F \\times s = ${10 * i} \\times ${5 * i} = ${50 * i * i} J</div>`,
      intermediateHtml: `W = <input type="text" class="answer-input" placeholder="...">`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="...">`
    });
  }
  for (let i = 6; i <= 10; i++) {
    problems.push({
      id: `ch5_c${i}`,
      text: `เครื่องจักรทำงานได้ $W = ${100 * i}$ J ในเวลา $t = ${2 * i}$ s จงหากำลังของเครื่องจักรนี้ (W)`,
      hints: `P = W/t`,
      guide: `<div class="step">P = ${100 * i} / ${2 * i} = 50 W</div>`,
      intermediateHtml: `P = <input type="text" class="answer-input" placeholder="...">`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="...">`
    });
  }
  for (let i = 11; i <= 15; i++) {
    problems.push({
      id: `ch5_c${i}`,
      text: `วัตถุมวล $m = ${i}$ kg เคลื่อนที่ด้วยความเร็ว $v = 4$ m/s จงหาพลังงานจลน์ของวัตถุนี้ (J)`,
      hints: `E_k = \\frac{1}{2} m v^2`,
      guide: `<div class="step">E_k = 0.5 \\times ${i} \\times 4^2 = ${8 * i} J</div>`,
      intermediateHtml: `E_k = <input type="text" class="answer-input" placeholder="...">`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="...">`
    });
  }

  // 16-30: Medium (Multi-step, FBD, Conservation, Work-Energy)
  for (let i = 16; i <= 20; i++) {
    const h = i - 10;
    problems.push({
      id: `ch5_c${i}`,
      text: `วัตถุมวล $2$ kg ถูกปล่อยจากความสูง $h = ${h}$ m ลงสู่พื้น จงหาความเร็วของวัตถุกระทบพื้น (m/s) ให้ $g = 10$ m/s$^2$ (ใช้หลักอนุรักษ์พลังงาน)${i===16?getSvgPendulum():""}`,
      hints: `mgh = \\frac{1}{2} m v^2`,
      guide: `<div class="step">v = \\sqrt{2gh} = \\sqrt{2(10)(${h})}</div>`,
      intermediateHtml: `v = <input type="text" class="answer-input" placeholder="...">`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="...">`
    });
  }
  for (let i = 21; i <= 25; i++) {
    problems.push({
      id: `ch5_c${i}`,
      text: `สปริงมีค่าคงตัว $k = 200$ N/m ถูกหดเข้าไป $x = 0.${i - 20}$ m จงหาพลังงานศักย์ยืดหยุ่นสะสมในสปริง (J)${getSvgSpring()}`,
      hints: `E_{ps} = \\frac{1}{2} k x^2`,
      guide: `<div class="step">E_{ps} = 0.5(200)(0.${i - 20})^2 = ${100 * Math.pow((i-20)/10, 2)} J</div>`,
      intermediateHtml: `E_{ps} = <input type="text" class="answer-input" placeholder="...">`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="...">`
    });
  }
  for (let i = 26; i <= 30; i++) {
    problems.push({
      id: `ch5_c${i}`,
      text: `ออกแรงผลักมวล $5$ kg ไปตามพื้นฝืด (สัมประสิทธิ์ความเสียดทาน $\\mu = 0.2$) เป็นระยะ $d = ${i - 20}$ m จงหางานของแรงเสียดทาน (J) ให้ $g = 10$ m/s$^2$`,
      hints: `W_f = - f d = - \\mu N d`,
      guide: `<div class="step">W_f = - (0.2)(5)(10)(${i - 20}) = ${-10 * (i - 20)} J</div>`,
      intermediateHtml: `W_f = <input type="text" class="answer-input" placeholder="...">`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="...">`
    });
  }

  // 31-40: Hard (Applied, mixed concepts, Inclines)
  for (let i = 31; i <= 35; i++) {
    problems.push({
      id: `ch5_c${i}`,
      text: `มวล $2$ kg ไถลลงมาตามพื้นเอียงลื่นทำมุม $30^\\circ$ กับแนวระดับ จากจุดที่สูงจากพื้น $h = ${i - 30}$ m จงหาพลังงานจลน์เมื่อถึงปลายพื้นเอียง (J)${getSvgIncline()}`,
      hints: `E_k = E_p = mgh`,
      guide: `<div class="step">E_k = (2)(10)(${i - 30}) = ${20 * (i - 30)} J</div>`,
      intermediateHtml: `E_k = <input type="text" class="answer-input" placeholder="...">`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="...">`
    });
  }
  for (let i = 36; i <= 40; i++) {
    problems.push({
      id: `ch5_c${i}`,
      text: `รถยนต์มวล $1000$ kg เร่งความเร็วจาก $v_1 = 10$ m/s เป็น $v_2 = ${10 + i - 35}$ m/s ในระยะทาง $50$ m จงหาแรงลัพธ์ที่กระทำต่อรถ (N) โดยใช้ทฤษฎีบทงาน-พลังงาน`,
      hints: `W = \\Delta E_k \\Rightarrow F s = \\frac{1}{2} m (v_2^2 - v_1^2)`,
      guide: `<div class="step">F(50) = 0.5(1000)(${10+i-35}^2 - 10^2) \\Rightarrow F = 10(${10+i-35}^2 - 100)</div>`,
      intermediateHtml: `F = <input type="text" class="answer-input" placeholder="...">`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="...">`
    });
  }

  return problems;
};

Object.assign(physicsData.topics, {
  ch5_challenge: {
    id: "ch5_challenge",
    title: "🏆 แบบฝึกหัดท้าทาย บทที่ 5",
    theory: `<h3>แบบฝึกหัดท้าทายท้ายบทที่ 5: งานและพลังงาน</h3><p>รวบรวมโจทย์ตั้งแต่ระดับพื้นฐานจนถึงระดับประยุกต์ เรื่อง งาน กำลัง พลังงาน และกฎการอนุรักษ์พลังงานกล</p>`,
    problems: generateProblems()
  }
});
