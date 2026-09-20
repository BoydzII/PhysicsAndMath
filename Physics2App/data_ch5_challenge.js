// data_ch5_challenge.js

const getSvgIncline = (h) => `<br><svg width="250" height="135" viewBox="0 0 250 135"><line x1="10" y1="110" x2="240" y2="110" stroke="#334155" stroke-width="2"/><polygon points="30,110 200,110 200,11.9" fill="#eef2f7" stroke="#334155" stroke-width="2"/><line x1="132" y1="51" x2="132" y2="110" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="132,51 128,60 136,60" fill="#2563eb"/><polygon points="132,110 128,101 136,101" fill="#2563eb"/><text x="139" y="86" font-size="13" fill="#1d4ed8">h = ${h} m</text><g transform="translate(132,51) rotate(-30)"><rect x="-17" y="-26" width="34" height="26" rx="3" fill="#bae6fd" stroke="#0f172a" stroke-width="1.5"/><text x="0" y="-8" font-size="13" text-anchor="middle">m</text></g><line x1="115" y1="62" x2="86" y2="79" stroke="#dc2626" stroke-width="2"/><polygon points="84,80 94,78 90,72" fill="#dc2626"/><path d="M 62 110 A 32 32 0 0 0 58 94" fill="none" stroke="#7c3aed" stroke-width="1.5"/><text x="66" y="105" font-size="12" fill="#6d28d9">30\u00B0</text></svg>`;
const getSvgFreeFall = () => `<br><svg width="150" height="150" viewBox="0 0 150 150"><line x1="40" y1="28" x2="105" y2="28" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/><circle cx="55" cy="28" r="14" fill="#f08080" stroke="#000"/><text x="55" y="33" font-size="12" text-anchor="middle">m</text><line x1="55" y1="46" x2="55" y2="106" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="55,118 49,104 61,104" fill="#dc2626"/><line x1="95" y1="28" x2="95" y2="125" stroke="#2563eb" stroke-width="1.5"/><polygon points="95,28 91,38 99,38" fill="#2563eb"/><polygon points="95,125 91,115 99,115" fill="#2563eb"/><text x="103" y="80" font-size="13" fill="#1d4ed8">h</text><line x1="15" y1="125" x2="135" y2="125" stroke="#334155" stroke-width="2"/></svg>`;
const getSvgSpring = () => `<br><svg width="200" height="80" viewBox="0 0 200 80"><line x1="20" y1="40" x2="180" y2="40" stroke="#999" stroke-width="2"/><path d="M 20 40 Q 30 20 40 40 T 60 40 T 80 40 T 100 40" fill="none" stroke="#333" stroke-width="2"/><rect x="100" y="25" width="30" height="30" fill="#90ee90" stroke="#000"/><line x1="20" y1="10" x2="20" y2="70" stroke="#000" stroke-width="4"/></svg>`;
const getSvgBlock = () => `<br><svg width="200" height="80" viewBox="0 0 200 80"><line x1="10" y1="60" x2="190" y2="60" stroke="#333" stroke-width="2"/><rect x="50" y="30" width="40" height="30" fill="#ffd700" stroke="#000"/><line x1="90" y1="45" x2="140" y2="45" stroke="#f00" stroke-width="2" marker-end="url(#arrow)"/><defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f00"/></marker></defs></svg>`;

const generateProblems = () => {
  const problems = [];
  
  // 1-5: Work
  for (let i = 1; i <= 5; i++) {
    const F = 10 * i;
    const s = 5 * i;
    const ans = F * s;
    problems.push({
      id: `ch5_c${i}`,
      text: `ออกแรง $F = ${F}$ N ดึงวัตถุไปตามพื้นราบได้ระยะทาง $s = ${s}$ m โดยแรงทำมุม $0^\\circ$ กับการกระจัด จงหางานที่เกิดขึ้น (J)${i===1?getSvgBlock():""}`,
      hints: `ใช้สมการ $W = F s \\cos 0^\\circ$`,
      guide: `<div class="calc-steps">
        <div>1. $W$</div><div>$=$</div><div>$F s \\cos 0^\\circ$</div>
        <div></div><div>$=$</div><div>$${F} \\times ${s} \\times 1$</div>
        <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="${ans}">&nbsp;J</div>
      </div>`,
      intermediateHtml: `W = <input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`
    });
  }

  // 6-10: Power
  for (let i = 6; i <= 10; i++) {
    const W = 100 * i;
    const t = 2 * i;
    const ans = 50;
    problems.push({
      id: `ch5_c${i}`,
      text: `เครื่องจักรทำงานได้ $W = ${W}$ J ในเวลา $t = ${t}$ s จงหากำลังของเครื่องจักรนี้ (W)`,
      hints: `ใช้สมการ $P = \\frac{W}{t}$`,
      guide: `<div class="calc-steps">
        <div>1. $P$</div><div>$=$</div><div>$\\frac{W}{t}$</div>
        <div></div><div>$=$</div><div>$\\frac{${W}}{${t}}$</div>
        <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="${ans}">&nbsp;W</div>
      </div>`,
      intermediateHtml: `P = <input type="text" class="answer-input" placeholder="${ans}">&nbsp;W`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="${ans}">&nbsp;W`
    });
  }

  // 11-15: Kinetic Energy
  for (let i = 11; i <= 15; i++) {
    const m = i;
    const ans = 8 * i;
    problems.push({
      id: `ch5_c${i}`,
      text: `วัตถุมวล $m = ${m}$ kg เคลื่อนที่ด้วยความเร็ว $v = 4$ m/s จงหาพลังงานจลน์ของวัตถุนี้ (J)`,
      hints: `ใช้สมการ $E_k = \\frac{1}{2} m v^2$`,
      guide: `<div class="calc-steps">
        <div>1. $E_k$</div><div>$=$</div><div>$\\frac{1}{2}mv^2$</div>
        <div></div><div>$=$</div><div>$\\frac{1}{2} \\times ${m} \\times 4^2$</div>
        <div></div><div>$=$</div><div>$0.5 \\times ${m} \\times 16$</div>
        <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="${ans}">&nbsp;J</div>
      </div>`,
      intermediateHtml: `E_k = <input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`
    });
  }

  // 16-20: Medium (Conservation of Mechanical Energy)
  for (let i = 16; i <= 20; i++) {
    const h = i - 10;
    const ans = Math.sqrt(2 * 10 * h).toFixed(2);
    problems.push({
      id: `ch5_c${i}`,
      text: `วัตถุมวล $2$ kg ถูกปล่อยจากความสูง $h = ${h}$ m ลงสู่พื้น จงหาความเร็วของวัตถุกระทบพื้น (m/s) ให้ $g = 10$ m/s$^2$ (ใช้หลักอนุรักษ์พลังงาน)${i===16?getSvgFreeFall():""}`,
      hints: `พลังงานศักย์โน้มถ่วงเปลี่ยนเป็นพลังงานจลน์: $mgh = \\frac{1}{2}mv^2$`,
      guide: `<div class="calc-steps">
        <div>1. $v$</div><div>$=$</div><div>$\\sqrt{2gh}$</div>
        <div></div><div>$=$</div><div>$\\sqrt{2 \\times 10 \\times ${h}}$</div>
        <div></div><div>$=$</div><div>$\\sqrt{${20 * h}}$</div>
        <div></div><div>$\\approx$</div><div><input type="text" class="answer-input" placeholder="${ans}">&nbsp;m/s</div>
      </div>`,
      intermediateHtml: `v = <input type="text" class="answer-input" placeholder="${ans}">&nbsp;m/s`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="${ans}">&nbsp;m/s`
    });
  }

  // 21-25: Elastic Potential Energy
  for (let i = 21; i <= 25; i++) {
    const x = ((i - 20) / 10).toFixed(1);
    const ans = (100 * Math.pow((i - 20) / 10, 2)).toFixed(2);
    problems.push({
      id: `ch5_c${i}`,
      text: `สปริงมีค่าคงตัว $k = 200$ N/m ถูกหดเข้าไป $x = ${x}$ m จงหาพลังงานศักย์ยืดหยุ่นสะสมในสปริง (J)${getSvgSpring()}`,
      hints: `ใช้สมการ $E_{ps} = \\frac{1}{2} k x^2$`,
      guide: `<div class="calc-steps">
        <div>1. $E_{ps}$</div><div>$=$</div><div>$\\frac{1}{2}kx^2$</div>
        <div></div><div>$=$</div><div>$\\frac{1}{2}(200)(${x})^2$</div>
        <div></div><div>$=$</div><div>$100 \\times ${(Math.pow((i-20)/10, 2)).toFixed(2)}$</div>
        <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="${ans}">&nbsp;J</div>
      </div>`,
      intermediateHtml: `E_{ps} = <input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`
    });
  }

  // 26-30: Work against friction
  for (let i = 26; i <= 30; i++) {
    const d = i - 20;
    const ans = -10 * d;
    problems.push({
      id: `ch5_c${i}`,
      text: `ออกแรงผลักมวล $5$ kg ไปตามพื้นฝืด (สัมประสิทธิ์ความเสียดทาน $\\mu = 0.2$) เป็นระยะ $d = ${d}$ m จงหางานของแรงเสียดทาน (J) ให้ $g = 10$ m/s$^2$`,
      hints: `งานแรงเสียดทาน $W_f = -fd = -\\mu mg d$`,
      guide: `<div class="calc-steps">
        <div>1. $W_f$</div><div>$=$</div><div>$-\\mu mg d$</div>
        <div></div><div>$=$</div><div>$-(0.2)(5)(10)(${d})$</div>
        <div></div><div>$=$</div><div>$-10 \\times ${d}$</div>
        <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="${ans}">&nbsp;J</div>
      </div>`,
      intermediateHtml: `W_f = <input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`
    });
  }

  // 31-35: Incline Energy Conservation
  for (let i = 31; i <= 35; i++) {
    const h = i - 30;
    const ans = 20 * h;
    problems.push({
      id: `ch5_c${i}`,
      text: `มวล $2$ kg ไถลลงมาตามพื้นเอียงลื่นทำมุม $30^\\circ$ กับแนวระดับ จากจุดที่สูงจากพื้น $h = ${h}$ m จงหาพลังงานจลน์เมื่อถึงปลายพื้นเอียง (J)${getSvgIncline(h)}`,
      hints: `พลังงานจลน์ที่ปลายพื้นเอียงเท่ากับพลังงานศักย์ที่จุดเริ่มต้น: $E_k = mgh$`,
      guide: `<div class="calc-steps">
        <div>1. $E_k$</div><div>$=$</div><div>$mgh$</div>
        <div></div><div>$=$</div><div>$(2)(10)(${h})$</div>
        <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="${ans}">&nbsp;J</div>
      </div>`,
      intermediateHtml: `E_k = <input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="${ans}">&nbsp;J`
    });
  }

  // 36-40: Work-Energy Theorem
  for (let i = 36; i <= 40; i++) {
    const v2 = 10 + i - 35;
    const ans = 10 * (v2 * v2 - 100);
    problems.push({
      id: `ch5_c${i}`,
      text: `รถยนต์มวล $1000$ kg เร่งความเร็วจาก $v_1 = 10$ m/s เป็น $v_2 = ${v2}$ m/s ในระยะทาง $50$ m จงหาแรงลัพธ์ที่กระทำต่อรถ (N) โดยใช้ทฤษฎีบทงาน-พลังงาน`,
      hints: `ทฤษฎีบทงาน-พลังงาน: $Fs = \\frac{1}{2}m(v_2^2 - v_1^2)$`,
      guide: `<div class="calc-steps">
        <div>1. $F(50)$</div><div>$=$</div><div>$\\frac{1}{2}(1000)(${v2}^2 - 10^2)$</div>
        <div></div><div>$=$</div><div>$500 \\times (${v2 * v2} - 100)$</div>
        <div></div><div>$=$</div><div>$500 \\times ${v2 * v2 - 100}$</div>
        <div>2. $F$</div><div>$=$</div><div><input type="text" class="answer-input" placeholder="${ans}">&nbsp;N</div>
      </div>`,
      intermediateHtml: `F = <input type="text" class="answer-input" placeholder="${ans}">&nbsp;N`,
      advancedHtml: `<input type="text" class="answer-input" placeholder="${ans}">&nbsp;N`
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
