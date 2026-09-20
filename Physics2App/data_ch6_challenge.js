// data_ch6_challenge.js
Object.assign(physicsData.topics, {
  ch6_challenge: {
    id: "ch6_challenge",
    title: "🏆 แบบฝึกหัดท้าทาย บทที่ 6",
    theory: `<h3>แบบฝึกหัดท้าทายท้ายบท</h3><p>รวบรวมโจทย์ตั้งแต่ระดับพื้นฐานจนถึงระดับประยุกต์ เรื่อง โมเมนตัม การดล และการชน ทั้ง 1 มิติ และ 2 มิติ</p>`,
    problems: [
      // Easy: 1-15 (Basic Momentum, Impulse)
      {
        id: "ch6_c1",
        text: `วัตถุมวล 2 kg เคลื่อนที่ไปทางขวาด้วยความเร็ว 5 m/s จงหาขนาดของโมเมนตัม`,
        hints: `ใช้สูตร $p = mv$`,
        guide: `<div class="step">$$\\begin{aligned}
    p &= 2 \\times 5\\\\
    &= 10\\text{ kg}\\cdot\\text{m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `p = <input type="text" class="answer-input" placeholder="10">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="10">`
      },
      {
        id: "ch6_c2",
        text: `รถยนต์มวล 1200 kg เคลื่อนที่ด้วยความเร็ว 20 m/s โมเมนตัมมีค่าเท่าใด`,
        hints: `แทนค่าใน $p = mv$`,
        guide: `<div class="step">$$\\begin{aligned}
    p &= 1200 \\times 20\\\\
    &= 24000\\text{ kg}\\cdot\\text{m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `p = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c3",
        text: `ลูกบอลมวล 0.5 kg มีโมเมนตัม 15  kg·m/s ลูกบอลมีความเร็วเท่าใด`,
        hints: `$v = \\frac{p}{m}$`,
        guide: `<div class="step">$$\\begin{aligned}
    v &= \\frac{15}{0.5}\\\\
    &= 30\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c4",
        text: `วัตถุหนึ่งมีความเร็ว 10 m/s และโมเมนตัม 50  kg·m/s จงหามวลของวัตถุ`,
        hints: `$m = \\frac{p}{v}$`,
        guide: `<div class="step">$$\\begin{aligned}
    m &= \\frac{50}{10}\\\\
    &= 5\\text{ kg}
  \\end{aligned}$$</div>`,
        intermediateHtml: `m = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c5",
        text: `แรง 50 N กระทำต่อวัตถุเป็นเวลา 2 วินาที จงหาการดล`,
        hints: `$I = F \\times \\Delta t$`,
        guide: `<div class="step">$$\\begin{aligned}
    I &= 50 \\times 2\\\\
    &= 100\\text{ N}\\cdot\\text{s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `I = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c6",
        text: `การดล 120  N·s กระทำต่อวัตถุในเวลา 3 s จงหาแรงเฉลี่ย`,
        hints: `$F = \\frac{I}{\\Delta t}$`,
        guide: `<div class="step">$$\\begin{aligned}
    F &= \\frac{120}{3}\\\\
    &= 40\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `F = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c7",
        text: `ลูกเทนนิสมวล 0.1 kg ถูกตีด้วยความเร็วเปลี่ยนจาก 0 เป็น 40 m/s จงหาการดล`,
        hints: `$I = \\Delta p = m(v - u)$`,
        guide: `<div class="step">$$\\begin{aligned}
    I &= 0.1(40 - 0)\\\\
    &= 4\\text{ N}\\cdot\\text{s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `I = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c8",
        text: `วัตถุมวล 2 kg ลดความเร็วจาก 10 m/s เหลือ 2 m/s จงหาขนาดของการเปลี่ยนโมเมนตัม`,
        hints: `$\\Delta p = m(v - u)$`,
        guide: `<div class="step">$$\\begin{aligned}
    \\Delta p &= 2(2 - 10)\\\\
    &= -16\\text{ kg}\\cdot\\text{m/s}\\\\
    &= 16 \\text{ kg}\\cdot\\text{m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `|\\Delta p| = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c9",
        text: `ถุงทรายมวล 5 kg ตกกระทบพื้นด้วยความเร็ว 8 m/s และหยุดนิ่งใน 0.2 s จงหาขนาดแรงกระแทกเฉลี่ย`,
        hints: `$F = \\frac{m(v - u)}{t}$`,
        guide: `<div class="step">$$\\begin{aligned}
    F &= \\frac{5(0 - 8)}{0.2}\\\\
    &= 200\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `F = <input type="text" class="answer-input" placeholder="200">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="200">`
      },
      {
        id: "ch6_c10",
        text: `กล่องมวล 3 kg ถูกผลักด้วยแรง 15 N เป็นเวลา 4 s ความเร็วจะเปลี่ยนไปเท่าใด`,
        hints: `$F\\Delta t = m\\Delta v$`,
        guide: `<div class="step">$$\\begin{aligned}
    \\Delta v &= \\frac{15 \\times 4}{3}\\\\
    &= 20\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `\\Delta v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c11",
        text: `รถยนต์ A (1000 kg) ความเร็ว 15 m/s ชนรถยนต์ B (1000 kg) ที่อยู่นิ่ง แล้วชนติดกันไป ความเร็วหลังชนเป็นเท่าใด <br><svg width="240" height="95" viewBox="0 0 240 95"><line x1="5" y1="70" x2="235" y2="70" stroke="#334155" stroke-width="2"/><rect x="18" y="44" width="46" height="22" rx="3" fill="#dc2626" stroke="#0f172a" stroke-width="1.2"/><circle cx="29.5" cy="68" r="4" fill="#1e293b"/><circle cx="52.5" cy="68" r="4" fill="#1e293b"/><text x="41.0" y="59.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">A</text><line x1="70.0" y1="32.0" x2="116.0" y2="32.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="116.0,32.0 107.7,35.5 107.7,28.5" fill="#dc2626"/><text x="93" y="26" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">15 m/s</text><rect x="150" y="44" width="46" height="22" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><circle cx="161.5" cy="68" r="4" fill="#1e293b"/><circle cx="184.5" cy="68" r="4" fill="#1e293b"/><text x="173.0" y="59.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">B</text><text x="173" y="32" font-size="12" fill="#2563eb" text-anchor="middle" font-weight="bold">นิ่ง</text><text x="120" y="88" font-size="11" fill="#64748b" text-anchor="middle">ชนแล้วติดกันไป</text></svg>`,
        hints: `กฎอนุรักษ์โมเมนตัม`,
        guide: `<div class="step">$$\\begin{aligned}
    1000(15) &= (1000+1000)v \\\\
    v &= 7.5\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input" placeholder="7.5">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="7.5">`
      },
      {
        id: "ch6_c12",
        text: `กราฟ F-t เป็นรูปสามเหลี่ยมฐาน 4 s สูง 10 N จงหาการดล`,
        hints: `พื้นที่ใต้กราฟ F-t`,
        guide: `<div class="step">$$\\begin{aligned}
    I &= \\frac{1}{2} \\times 4 \\times 10\\\\
    &= 20\\text{ N}\\cdot\\text{s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `I = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c13",
        text: `กระสุนปืน 0.05 kg ยิงออกจากปืน 5 kg ด้วยความเร็ว 400 m/s จงหาขนาดความเร็วถอยหลังของปืน`,
        hints: `$m_1v_1 + m_2v_2 = 0$`,
        guide: `<div class="step">$$\\begin{aligned}
    v_2 &= \\frac{0.05 \\times 400}{5}\\\\
    &= 4\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `|v| = <input type="text" class="answer-input" placeholder="4">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="4">`
      },
      {
        id: "ch6_c14",
        text: `นก 0.2 kg บินด้วยความเร็ว 10 m/s ชนกระจกและกระดอนกลับด้วยความเร็ว 4 m/s จงหาขนาดการเปลี่ยนแปลงโมเมนตัม`,
        hints: `ทิศตรงข้ามให้เป็นลบ`,
        guide: `<div class="step">$$\\begin{aligned}
    |\\Delta p| &= 0.2(4 - (-10))\\\\
    &= 2.8\\text{ N}\\cdot\\text{s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `|\\Delta p| = <input type="text" class="answer-input" placeholder="2.8">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="2.8">`
      },
      {
        id: "ch6_c15",
        text: `รถเข็น 10 kg ความเร็ว 2 m/s มีคนมวล 40 kg กระโดดขึ้นรถเข็น ความเร็วใหม่คือ?`,
        hints: `$m_1u_1 = (m_1+m_2)v$`,
        guide: `<div class="step">$$\\begin{aligned}
    10(2) &= (10+40)v \\\\\
    v &= 0.4\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      
      // Medium: 16-30 (1D/2D Collisions, Explosions, Multi-step)
      {
        id: "ch6_c16",
        text: `รถ A (1000 kg) 20 m/s ชนรถ B (1500 kg) 10 m/s ทิศเดียวกัน หลังชนติดกันไป ความเร็วเป็นเท่าใด <br><svg width="240" height="95" viewBox="0 0 240 95"><line x1="5" y1="70" x2="235" y2="70" stroke="#334155" stroke-width="2"/><rect x="14" y="44" width="44" height="22" rx="3" fill="#dc2626" stroke="#0f172a" stroke-width="1.2"/><circle cx="25.0" cy="68" r="4" fill="#1e293b"/><circle cx="47.0" cy="68" r="4" fill="#1e293b"/><text x="36.0" y="59.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">A</text><line x1="62.0" y1="32.0" x2="116.0" y2="32.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="116.0,32.0 107.7,35.5 107.7,28.5" fill="#dc2626"/><text x="89" y="26" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">20 m/s</text><rect x="150" y="44" width="50" height="22" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><circle cx="162.5" cy="68" r="4" fill="#1e293b"/><circle cx="187.5" cy="68" r="4" fill="#1e293b"/><text x="175.0" y="59.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">B</text><line x1="204.0" y1="32.0" x2="232.0" y2="32.0" stroke="#2563eb" stroke-width="2.2"/><polygon points="232.0,32.0 223.7,35.5 223.7,28.5" fill="#2563eb"/><text x="214" y="26" font-size="12" fill="#2563eb" text-anchor="middle" font-weight="bold">10 m/s</text><text x="120" y="88" font-size="11" fill="#64748b" text-anchor="middle">วิ่งทิศเดียวกัน ชนแล้วติดกันไป</text></svg>`,
        hints: `ชนแบบไม่ยืดหยุ่นสมบูรณ์ (ติดกัน)`,
        guide: `<div class="step">$$\\begin{aligned}
    1000(20) + 1500(10) &= 2500v \\\\\
    v &= 14\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c17",
        text: `รถ A (500 kg) 15 m/s ชนรถ B (500 kg) -5 m/s ชนแล้ว A หยุดนิ่ง ความเร็ว B? <br><svg width="240" height="95" viewBox="0 0 240 95"><line x1="5" y1="70" x2="235" y2="70" stroke="#334155" stroke-width="2"/><rect x="14" y="44" width="44" height="22" rx="3" fill="#dc2626" stroke="#0f172a" stroke-width="1.2"/><circle cx="25.0" cy="68" r="4" fill="#1e293b"/><circle cx="47.0" cy="68" r="4" fill="#1e293b"/><text x="36.0" y="59.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">A</text><line x1="62.0" y1="32.0" x2="110.0" y2="32.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="110.0,32.0 101.7,35.5 101.7,28.5" fill="#dc2626"/><text x="86" y="26" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">15 m/s</text><rect x="178" y="44" width="44" height="22" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><circle cx="189.0" cy="68" r="4" fill="#1e293b"/><circle cx="211.0" cy="68" r="4" fill="#1e293b"/><text x="200.0" y="59.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">B</text><line x1="174.0" y1="32.0" x2="126.0" y2="32.0" stroke="#2563eb" stroke-width="2.2"/><polygon points="126.0,32.0 134.3,28.5 134.3,35.5" fill="#2563eb"/><text x="150" y="26" font-size="12" fill="#2563eb" text-anchor="middle" font-weight="bold">5 m/s</text><text x="120" y="88" font-size="11" fill="#64748b" text-anchor="middle">วิ่งสวนกัน</text></svg>`,
        hints: `อนุรักษ์โมเมนตัม`,
        guide: `<div class="step">$$\\begin{aligned}
    500(15) + 500(-5) &= 500(0) + 500(v_B) \\\\\
    v_B &= 10\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v_B = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c18",
        text: `วัตถุระเบิดออกเป็นสองส่วน ส่วนแรก 2 kg ไปทางซ้าย 10 m/s ส่วนที่สอง 4 kg ไปทางขวาเท่าใด <br><svg width="240" height="95" viewBox="0 0 240 95"><circle cx="120" cy="48" r="13" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/><text x="120" y="22" font-size="11" fill="#64748b" text-anchor="middle">ระเบิดออกจากจุดหยุดนิ่ง</text><line x1="104.0" y1="48.0" x2="40.0" y2="48.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="40.0,48.0 48.3,44.5 48.3,51.5" fill="#dc2626"/><circle cx="30" cy="48" r="11" fill="#ef4444" stroke="#0f172a" stroke-width="1.2"/><text x="30" y="52" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">2</text><text x="70" y="40" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">10 m/s</text><text x="30" y="76" font-size="11" fill="#1e293b" text-anchor="middle">2 kg</text><line x1="136.0" y1="48.0" x2="196.0" y2="48.0" stroke="#2563eb" stroke-width="2.2"/><polygon points="196.0,48.0 187.7,51.5 187.7,44.5" fill="#2563eb"/><circle cx="210" cy="48" r="13" fill="#3b82f6" stroke="#0f172a" stroke-width="1.2"/><text x="210" y="52" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">4</text><text x="166" y="40" font-size="12" fill="#2563eb" text-anchor="middle" font-weight="bold">v = ?</text><text x="210" y="78" font-size="11" fill="#1e293b" text-anchor="middle">4 kg</text></svg>`,
        hints: `โมเมนตัมเริ่มต้นเป็น 0`,
        guide: `<div class="step">$$\\begin{aligned}
    0 &= 2(-10) + 4v \\\\\
    v &= 5\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c19",
        text: `ลูกสนุ้ก A ชน B ที่อยู่นิ่งแบบยืดหยุ่นสมบูรณ์ มวลเท่ากัน หลังชนความเร็วของลูก A มีค่าเท่าใด (m/s) <br><svg width="230" height="90" viewBox="0 0 230 90"><rect x="5" y="20" width="220" height="50" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/><circle cx="48" cy="46" r="13" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/><text x="48" y="50" font-size="11" fill="#0f172a" text-anchor="middle" font-weight="bold">A</text><line x1="66.0" y1="46.0" x2="118.0" y2="46.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="118.0,46.0 109.7,49.5 109.7,42.5" fill="#dc2626"/><text x="92" y="38" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">u</text><circle cx="150" cy="46" r="13" fill="#ef4444" stroke="#0f172a" stroke-width="1.2"/><text x="150" y="50" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">B</text><text x="150" y="80" font-size="11" fill="#64748b" text-anchor="middle">B หยุดนิ่ง</text></svg>`,
        hints: `มวลเท่า ชนยืดหยุ่น แลกเปลี่ยนความเร็ว`,
        guide: `<div class="step">$$\\begin{aligned}
    v_A &= 0\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v_A = <input type="text" class="answer-input" placeholder="0">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="0">`
      },
      {
        id: "ch6_c20",
        text: `วัตถุ 3 kg วิ่ง 4 m/s ชน 2 kg อยู่นิ่ง แบบยืดหยุ่นสมบูรณ์ หาความเร็ว 2 kg หลังชน`,
        hints: `$u_1 + v_1 = u_2 + v_2$`,
        guide: `<div class="step">$$\\begin{aligned}
    v_2 &= \\frac{2m_1}{m_1+m_2}u_1\\\\
    &= \\frac{2(3)}{5}4\\\\
    &= 4.8\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c21",
        text: `รถบรรทุก 5000 kg 10 m/s ชนรถเก๋ง 1000 kg วิ่งสวนมา 20 m/s ติดกันไป หา v หลังชน <br><svg width="240" height="95" viewBox="0 0 240 95"><line x1="5" y1="70" x2="235" y2="70" stroke="#334155" stroke-width="2"/><rect x="12" y="40" width="58" height="26" rx="3" fill="#15803d" stroke="#0f172a" stroke-width="1.2"/><circle cx="26.5" cy="68" r="4" fill="#1e293b"/><circle cx="55.5" cy="68" r="4" fill="#1e293b"/><text x="41.0" y="57.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">บรรทุก</text><line x1="74.0" y1="30.0" x2="112.0" y2="30.0" stroke="#15803d" stroke-width="2.2"/><polygon points="112.0,30.0 103.7,33.5 103.7,26.5" fill="#15803d"/><text x="93" y="24" font-size="12" fill="#15803d" text-anchor="middle" font-weight="bold">10 m/s</text><rect x="176" y="46" width="44" height="20" rx="3" fill="#7c3aed" stroke="#0f172a" stroke-width="1.2"/><circle cx="187.0" cy="68" r="4" fill="#1e293b"/><circle cx="209.0" cy="68" r="4" fill="#1e293b"/><text x="198.0" y="60.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">เก๋ง</text><line x1="172.0" y1="30.0" x2="124.0" y2="30.0" stroke="#7c3aed" stroke-width="2.2"/><polygon points="124.0,30.0 132.3,26.5 132.3,33.5" fill="#7c3aed"/><text x="148" y="24" font-size="12" fill="#7c3aed" text-anchor="middle" font-weight="bold">20 m/s</text><text x="120" y="88" font-size="11" fill="#64748b" text-anchor="middle">ชนแล้วติดกันไป</text></svg>`,
        hints: `ทิศสวนทางกัน v ต้องติดลบ`,
        guide: `<div class="step">$$\\begin{aligned}
    5000(10) + 1000(-20) &= 6000v \\\\\
    v &= 5\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c22",
        text: `วัตถุระเบิดเป็น 3 ชิ้น ชิ้นแรก 1 kg ไปเหนือ 3 m/s ชิ้นสอง 1 kg ไปตะวันออก 4 m/s ชิ้นสาม 1 kg จะมีความเร็วเท่าใด <br><svg width="190" height="170" viewBox="0 0 190 170"><line x1="95" y1="20" x2="95" y2="150" stroke="#e2e8f0" stroke-width="1"/><line x1="25" y1="85" x2="175" y2="85" stroke="#e2e8f0" stroke-width="1"/><text x="99" y="18" font-size="11" fill="#64748b" text-anchor="start">N</text><text x="172" y="99" font-size="11" fill="#64748b" text-anchor="start">E</text><circle cx="95" cy="85" r="10" fill="#94a3b8" stroke="#0f172a" stroke-width="1.2"/><line x1="95.0" y1="73.0" x2="95.0" y2="30.0" stroke="#2563eb" stroke-width="2.2"/><polygon points="95.0,30.0 98.5,38.3 91.5,38.3" fill="#2563eb"/><text x="100" y="44" font-size="11" fill="#2563eb" text-anchor="start" font-weight="bold">1 kg, 3 m/s</text><line x1="107.0" y1="85.0" x2="155.0" y2="85.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="155.0,85.0 146.7,88.5 146.7,81.5" fill="#dc2626"/><text x="131" y="78" font-size="11" fill="#dc2626" text-anchor="middle" font-weight="bold">1 kg, 4 m/s</text><line x1="87.0" y1="93.0" x2="45.0" y2="128.0" stroke="#7c3aed" stroke-width="2.2"/><polygon points="45.0,128.0 49.1,120.0 53.6,125.4" fill="#7c3aed"/><text x="60" y="148" font-size="11" fill="#6d28d9" text-anchor="middle" font-weight="bold">ชิ้นที่ 3 = ?</text></svg>`,
        hints: `รวมแบบเวกเตอร์ $p_x$ และ $p_y$`,
        guide: `<div class="step">$$\\begin{aligned}
    p_3 &= \\sqrt{3^2 + 4^2}\\\\
    &= 5\\text{ kg}\\cdot\\text{m/s}\\\\
    &= 5\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c23",
        text: `ลูกบิลเลียด 2 ลูก ชนกัน 2 มิติ ลูกแรกเบี่ยงมุม 30 องศา ลูกที่สองเบี่ยง 60 องศา (ชนยืดหยุ่น) มุมรวมระหว่างความเร็วหลังชนมีค่ากี่องศา <br><svg width="230" height="155" viewBox="0 0 230 155"><line x1="88" y1="70" x2="215" y2="70" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 3"/><line x1="18.0" y1="70.0" x2="74.0" y2="70.0" stroke="#64748b" stroke-width="2.2"/><polygon points="74.0,70.0 65.7,73.5 65.7,66.5" fill="#64748b"/><text x="46" y="62" font-size="11" fill="#64748b" text-anchor="middle">ก่อนชน</text><circle cx="88" cy="70" r="13" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/><text x="88" y="74" font-size="11" fill="#0f172a" text-anchor="middle" font-weight="bold">1</text><line x1="100.0" y1="70.0" x2="160.6" y2="35.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="160.6,35.0 155.2,42.2 151.7,36.1" fill="#dc2626"/><text x="176" y="26" font-size="11" fill="#dc2626" text-anchor="middle" font-weight="bold">ลูกที่ 1</text><text x="150" y="44" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">30°</text><line x1="94.0" y1="82.0" x2="125.0" y2="135.7" stroke="#2563eb" stroke-width="2.2"/><polygon points="125.0,135.7 117.8,130.3 123.9,126.8" fill="#2563eb"/><text x="150" y="140" font-size="11" fill="#2563eb" text-anchor="middle" font-weight="bold">ลูกที่ 2</text><text x="104" y="116" font-size="12" fill="#2563eb" text-anchor="middle" font-weight="bold">60°</text><path d="M 134 70 A 46 46 0 0 0 128 46" fill="none" stroke="#dc2626" stroke-width="1.2"/><path d="M 126 70 A 38 38 0 0 1 113 101" fill="none" stroke="#2563eb" stroke-width="1.2"/></svg>`,
        hints: `การชนยืดหยุ่นมวลเท่ากัน 2 มิติ`,
        guide: `<div class="step">$$\\begin{aligned}
    \\theta &= 30^\\circ + 60^\\circ\\\\
    &= 90^\\circ
  \\end{aligned}$$</div>`,
        intermediateHtml: `\\theta = <input type="text" class="answer-input" placeholder="90">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="90">`
      },
      {
        id: "ch6_c24",
        text: `ลูกปืน 10 g ยิงทะลุแผ่นไม้ 2 kg ที่ห้อยอยู่ ความเร็วลูกปืนลดจาก 300 เป็น 100 m/s ไม้จะมีความเร็วเท่าใด`,
        hints: `อนุรักษ์โมเมนตัมแนวนอน`,
        guide: `<div class="step">$$\\begin{aligned}
    0.01(300) &= 0.01(100) + 2v \\\\\
    v &= 1\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c25",
        text: `รถ 2000 kg ชนกำแพงด้วยความเร็ว 15 m/s และเด้งกลับด้วยความเร็ว 5 m/s ใน 0.1 s จงหาขนาดแรงเฉลี่ย <br><svg width="230" height="105" viewBox="0 0 230 105"><line x1="5" y1="78" x2="235" y2="78" stroke="#334155" stroke-width="2"/><rect x="186" y="14" width="14" height="64" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/><line x1="186" y1="16" x2="200" y2="26" stroke="#64748b" stroke-width="1"/><line x1="186" y1="26" x2="200" y2="36" stroke="#64748b" stroke-width="1"/><line x1="186" y1="36" x2="200" y2="46" stroke="#64748b" stroke-width="1"/><line x1="186" y1="46" x2="200" y2="56" stroke="#64748b" stroke-width="1"/><line x1="186" y1="56" x2="200" y2="66" stroke="#64748b" stroke-width="1"/><line x1="186" y1="66" x2="200" y2="76" stroke="#64748b" stroke-width="1"/><rect x="60" y="52" width="48" height="24" rx="3" fill="#dc2626" stroke="#0f172a" stroke-width="1.2"/><circle cx="72.0" cy="78" r="4" fill="#1e293b"/><circle cx="96.0" cy="78" r="4" fill="#1e293b"/><text x="84.0" y="68.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">รถ</text><line x1="112.0" y1="34.0" x2="176.0" y2="34.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="176.0,34.0 167.7,37.5 167.7,30.5" fill="#dc2626"/><text x="144" y="28" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">u = 15 m/s</text><line x1="112.0" y1="96.0" x2="52.0" y2="96.0" stroke="#2563eb" stroke-width="2.2"/><polygon points="52.0,96.0 60.3,92.5 60.3,99.5" fill="#2563eb"/><text x="84" y="92" font-size="11" fill="#2563eb" text-anchor="middle" font-weight="bold">v = 5 m/s (เด้งกลับ)</text></svg>`,
        hints: `$F = \\frac{m(v-u)}{t}$`,
        guide: `<div class="step">$$\\begin{aligned}
    |F| &= \\frac{2000(5 - (-15))}{0.1}\\\\
    &= 400000\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `|F| = <input type="text" class="answer-input" placeholder="400000">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="400000">`
      },
      {
        id: "ch6_c26",
        text: `นักบินอวกาศ 80 kg ขว้างประแจ 2 kg ด้วยความเร็ว 10 m/s นักบินจะถอยหลังด้วยอัตราเร็วเท่าใด`,
        hints: `โมเมนตัมรวม = 0`,
        guide: `<div class="step">$$\\begin{aligned}
    |v| &= \\frac{2(10)}{80}\\\\
    &= 0.25\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `|v| = <input type="text" class="answer-input" placeholder="0.25">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="0.25">`
      },
      {
        id: "ch6_c27",
        text: `ลูกบอล 200 g ตกจากสูง 5 m กระดอนขึ้นสูง 3.2 m จงหาการดล ($g=10$)`,
        hints: `$v = \\sqrt{2gh}$, ขาลงบวก ขาขึ้นลบ`,
        guide: `<div class="step">$$\\begin{aligned}
    u &= 10, v=-8 \\\\\
    I &= 0.2(-8 - 10) = -3.6\\text{ N}\\cdot\\text{s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `|I| = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c28",
        text: `ปืนใหญ่ 1000 kg ยิงลูกปืน 10 kg ด้วยความเร็ว 200 m/s ถ้าระยะถอย 1 m หาแรงเสียดทาน`,
        hints: `หา $v$ ปืน แล้วใช้ พลังงาน $\\frac{1}{2}mv^2 = f s$`,
        guide: `<div class="step">$$\\begin{aligned}
    v_p &= 2\\text{ m/s} \\\\\
    \\frac{1}{2}(1000)(2^2) &= f(1) \\\\\
    f &= 2000\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `f = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c29",
        text: `กล่อง 4 kg 5 m/s ชนกล่อง 6 kg ที่อยู่นิ่ง หลังชนกล่อง 4 kg สะท้อนกลับ 1 m/s กล่อง 6 kg เร็วเท่าใด <br><svg width="230" height="95" viewBox="0 0 230 95"><line x1="5" y1="70" x2="225" y2="70" stroke="#334155" stroke-width="2"/><rect x="24" y="42" width="34" height="28" rx="2" fill="#facc15" stroke="#0f172a" stroke-width="1.2"/><text x="41" y="60" font-size="11" fill="#1e293b" text-anchor="middle" font-weight="bold">4 kg</text><line x1="62.0" y1="32.0" x2="112.0" y2="32.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="112.0,32.0 103.7,35.5 103.7,28.5" fill="#dc2626"/><text x="87" y="26" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">5 m/s</text><rect x="150" y="38" width="40" height="32" rx="2" fill="#b45309" stroke="#0f172a" stroke-width="1.2"/><text x="170" y="58" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">6 kg</text><text x="170" y="30" font-size="12" fill="#2563eb" text-anchor="middle" font-weight="bold">นิ่ง</text></svg>`,
        hints: `$m_1u_1 = m_1v_1 + m_2v_2$`,
        guide: `<div class="step">$$\\begin{aligned}
    4(5) &= 4(-1) + 6v \\\\\
    20 &= -4 + 6v \\\\\
    v &= 4\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c30",
        text: `จรวดมวล 1000 kg พ่นแก๊สมวล 50 kg ด้วยความเร็ว 200 m/s สัมพัทธ์จรวด จงหาความเร็วจรวดที่เพิ่มขึ้น`,
        hints: `$M\\Delta V = m v$`,
        guide: `<div class="step">$$\\begin{aligned}
    \\Delta V &= \\frac{50 \\times 200}{1000}\\\\
    &= 10\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `\\Delta V = <input type="text" class="answer-input" placeholder="10">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="10">`
      },

      // Hard: 31-40 (Applied, Mixed Concepts)
      {
        id: "ch6_c31",
        text: `ลูกปืน 20 g ยิงฝังในเป้า 1.98 kg ที่ห้อยแขวน เป้าแกว่งขึ้นสูง 5 cm หาความเร็วลูกปืน <br><svg width="240" height="180" viewBox="0 0 240 180"><line x1="40" y1="16" x2="200" y2="16" stroke="#334155" stroke-width="3"/><line x1="130" y1="16" x2="130" y2="104" stroke="#334155" stroke-width="1.5"/><rect x="116" y="104" width="28" height="30" rx="2" fill="#b45309" stroke="#0f172a" stroke-width="1.2"/><text x="130" y="152" font-size="11" fill="#1e293b" text-anchor="middle">เป้า 1.98 kg</text><line x1="18.0" y1="119.0" x2="108.0" y2="119.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="108.0,119.0 99.7,122.5 99.7,115.5" fill="#dc2626"/><text x="60" y="112" font-size="11" fill="#dc2626" text-anchor="middle" font-weight="bold">ลูกปืน 20 g</text><line x1="130" y1="16" x2="78" y2="86" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/><rect x="64" y="84" width="26" height="28" rx="2" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/><line x1="88" y1="112" x2="196" y2="112" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/><line x1="146" y1="134" x2="196" y2="134" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/><line x1="188" y1="112" x2="188" y2="134" stroke="#2563eb" stroke-width="1.5"/><polygon points="188,112 184,120 192,120" fill="#2563eb"/><polygon points="188,134 184,126 192,126" fill="#2563eb"/><text x="196" y="127" font-size="11" fill="#1d4ed8" text-anchor="start" font-weight="bold">h = 5 cm</text></svg>`,
        hints: `ใช้พลังงานหา $V$ ก่อน แล้วใช้โมเมนตัมหา $u$`,
        guide: `<div class="step">$$\\begin{aligned}
    V &= \\sqrt{2(10)(0.05)} = 1\\text{ m/s}, 0.02u = 2(1) \\\\\
    u &= 100\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `u = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c32",
        text: `รถ A 1000 kg ไปตะวันออก 15 m/s ชนรถ B 2000 kg ไปเหนือ 10 m/s ติดกันไป หา v หลังชน <br><svg width="200" height="180" viewBox="0 0 200 180"><text x="120" y="16" font-size="11" fill="#64748b" text-anchor="start">N</text><line x1="112" y1="20" x2="112" y2="165" stroke="#e2e8f0" stroke-width="1"/><line x1="20" y1="70" x2="185" y2="70" stroke="#e2e8f0" stroke-width="1"/><text x="182" y="84" font-size="11" fill="#64748b" text-anchor="start">E</text><rect x="22" y="60" width="42" height="20" rx="3" fill="#dc2626" stroke="#0f172a" stroke-width="1.2"/><circle cx="32.5" cy="82" r="4" fill="#1e293b"/><circle cx="53.5" cy="82" r="4" fill="#1e293b"/><text x="43.0" y="74.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">A</text><line x1="68.0" y1="70.0" x2="100.0" y2="70.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="100.0,70.0 91.7,73.5 91.7,66.5" fill="#dc2626"/><text x="84" y="56" font-size="11" fill="#dc2626" text-anchor="middle" font-weight="bold">15 m/s</text><g transform="translate(112,140) rotate(-90)"><rect x="-21" y="-10" width="42" height="20" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><circle cx="-10.5" cy="12" r="4" fill="#1e293b"/><circle cx="10.5" cy="12" r="4" fill="#1e293b"/><text x="0.0" y="4.0" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">B</text></g><line x1="112.0" y1="118.0" x2="112.0" y2="86.0" stroke="#2563eb" stroke-width="2.2"/><polygon points="112.0,86.0 115.5,94.3 108.5,94.3" fill="#2563eb"/><text x="128" y="104" font-size="11" fill="#2563eb" text-anchor="middle" font-weight="bold">10 m/s</text><text x="100" y="174" font-size="11" fill="#64748b" text-anchor="middle">ชนที่จุดตัดแล้วติดกันไป</text></svg>`,
        hints: `รวม $p$ แบบเวกเตอร์ $p = \\sqrt{p_x^2 + p_y^2}$`,
        guide: `<div class="step">$$\\begin{aligned}
    p_x &= 15000, p_y = 20000 \\\\\
    p_{tot} &= 25000 \\\\\
    v &= \\frac{25000}{3000} = 8.33\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c33",
        text: `สปริงอัดระหว่างมวล 2 kg และ 3 kg เมื่อปล่อย มวล 2 kg มีพลังงานจลน์ 18 J มวล 3 kg มีพลังงานจลน์เท่าใด`,
        hints: `$p$ เท่ากัน $E_k = \\frac{p^2}{2m}$`,
        guide: `<div class="step">$$\\begin{aligned}
    p^2 &= 2(2)(18) = 72\\\\
    E_{k2} &= \\frac{72}{2(3)}\\\\
    &= 12\\text{ J}
  \\end{aligned}$$</div>`,
        intermediateHtml: `E_k = <input type="text" class="answer-input" placeholder="12">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="12">`
      },
      {
        id: "ch6_c34",
        text: `หยดน้ำฝน 0.05 g ตกกระทบหลังคาด้วยความเร็ว 10 m/s และไม่สะท้อน 1000 หยด/วินาที แรงบนหลังคาคือ?`,
        hints: `$F = \\frac{nm\\Delta v}{t}$`,
        guide: `<div class="step">$$\\begin{aligned}
    F &= 1000 \\times (0.05 \\times 10^{-3}) \\times 10\\\\
    &= 0.5\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `F = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c35",
        text: `วัตถุ M อยู่นิ่ง ถูกก้อน m วิ่งชนยืดหยุ่น ก้อน m สะท้อนกลับด้วยอัตราเร็วครึ่งหนึ่งของเดิม จงหาอัตราส่วน M/m`,
        hints: `$v_1 = \\frac{m-M}{m+M}u_1 = -0.5 u_1$`,
        guide: `<div class="step">$$\\begin{aligned}
    \\frac{m-M}{m+M} &= -0.5 \\\\\
    M &= 3m \\\\\
    M/m &= 3
  \\end{aligned}$$</div>`,
        intermediateHtml: `M/m = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c36",
        text: `มวล m ลื่นไถลจากเนินสูง 18 m ชนติดกับมวล 2m ที่ฐานเนิน ความสูงที่แกว่งขึ้นไปได้คือเท่าใด (m)`,
        hints: `ความเร็วหลังชน $V = \\frac{u}{3}$`,
        guide: `<div class="step">$$\\begin{aligned}
    H &= \\frac{h}{9}\\\\
    &= \\frac{18}{9}\\\\
    &= 2\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `H = <input type="text" class="answer-input" placeholder="2">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="2">`
      },
      {
        id: "ch6_c37",
        text: `แผ่นไม้ 10 kg ลอยน้ำ คน 50 kg เดินบนไม้ด้วยความเร็ว 1.2 m/s สัมพัทธ์ไม้ ไม้จะถอยหลังด้วยความเร็วเท่าใดสัมพัทธ์น้ำ`,
        hints: `$0 = m_1v_1 + m_2v_2$ เมื่อ $v_1$ คือความเร็วคนต่อน้ำ`,
        guide: `<div class="step">$$\\begin{aligned}
    0 &= 50(1.2 - v) - 10v \\\\\
    60 &= 60v \\\\\
    v &= 1\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c38",
        text: `การดลของแรงกระทำต่อมวล 2 kg เป็น $I = 4t^2$ ในช่วง 0 ถึง 3 s หา $\\Delta v$`,
        hints: `$I = m\\Delta v$`,
        guide: `<div class="step">$$\\begin{aligned}
    ที่ t &= 3, I = 36\\text{ N}\\cdot\\text{s} \\\\\
    \\Delta v &= 36/2 = 18\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `\\Delta v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c39",
        text: `ระเบิดมวล 5 kg กำลังตกด้วยความเร็ว 12 m/s แตกเป็น 2 ส่วน ส่วน 2 kg หยุดนิ่ง ส่วน 3 kg จะมีความเร็วเท่าใด`,
        hints: `$5mv = 2m(0) + 3mv'$`,
        guide: `<div class="step">$$\\begin{aligned}
    5(12) &= 2(0) + 3v\\\\
    v &= 20\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `v' = <input type="text" class="answer-input" placeholder="20">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="20">`
      },
      {
        id: "ch6_c40",
        text: `ลูกบอลมวล 0.5 kg วิ่งชนกำแพงทำมุม $60^\\circ$ กับเส้นตั้งฉาก สะท้อนกลับมุมเดิม อัตราเร็ว 10 m/s จงหาขนาดการดล (กำหนด $\\cos 60^\\circ = 0.5$) <br><svg width="220" height="185" viewBox="0 0 220 185"><rect x="150" y="12" width="14" height="162" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/><line x1="150" y1="14" x2="164" y2="24" stroke="#64748b" stroke-width="1"/><line x1="150" y1="26" x2="164" y2="36" stroke="#64748b" stroke-width="1"/><line x1="150" y1="38" x2="164" y2="48" stroke="#64748b" stroke-width="1"/><line x1="150" y1="50" x2="164" y2="60" stroke="#64748b" stroke-width="1"/><line x1="150" y1="62" x2="164" y2="72" stroke="#64748b" stroke-width="1"/><line x1="150" y1="74" x2="164" y2="84" stroke="#64748b" stroke-width="1"/><line x1="150" y1="86" x2="164" y2="96" stroke="#64748b" stroke-width="1"/><line x1="150" y1="98" x2="164" y2="108" stroke="#64748b" stroke-width="1"/><line x1="150" y1="110" x2="164" y2="120" stroke="#64748b" stroke-width="1"/><line x1="150" y1="122" x2="164" y2="132" stroke="#64748b" stroke-width="1"/><line x1="150" y1="134" x2="164" y2="144" stroke="#64748b" stroke-width="1"/><line x1="150" y1="146" x2="164" y2="156" stroke="#64748b" stroke-width="1"/><line x1="150" y1="158" x2="164" y2="168" stroke="#64748b" stroke-width="1"/><line x1="58" y1="88" x2="150" y2="88" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5 4"/><text x="58" y="82" font-size="10" fill="#64748b" text-anchor="start">แนวตั้งฉาก</text><line x1="111.0" y1="20.5" x2="144.0" y2="84.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="144.0,84.0 137.1,78.3 143.3,75.0" fill="#dc2626"/><text x="105.0" y="22.450018504813784" font-size="11" fill="#dc2626" text-anchor="end" font-weight="bold">u = 10 m/s</text><line x1="144.0" y1="92.0" x2="111.0" y2="155.5" stroke="#2563eb" stroke-width="2.2"/><polygon points="111.0,155.5 111.7,146.6 117.9,149.8" fill="#2563eb"/><text x="105.0" y="157.54998149518622" font-size="11" fill="#2563eb" text-anchor="end" font-weight="bold">v = 10 m/s</text><path d="M 106 88 A 44 44 0 0 0 128 50" fill="none" stroke="#dc2626" stroke-width="1.2"/><text x="100" y="66" font-size="11" fill="#dc2626" text-anchor="middle" font-weight="bold">60°</text><path d="M 106 88 A 44 44 0 0 1 128 126" fill="none" stroke="#2563eb" stroke-width="1.2"/><text x="100" y="118" font-size="11" fill="#2563eb" text-anchor="middle" font-weight="bold">60°</text><circle cx="124.0" cy="47.0" r="9" fill="#f97316" stroke="#0f172a" stroke-width="1.2"/></svg>`,
        hints: `โมเมนตัมเปลี่ยนเฉพาะแนวตั้งฉากกำแพง`,
        guide: `<div class="step">$$\\begin{aligned}
    \\Delta p &= 2mv \\cos 60^\\circ\\\\
    &= 2(0.5)(10)(0.5)\\\\
    &= 5\\text{ N}\\cdot\\text{s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `|\\Delta p| = <input type="text" class="answer-input" placeholder="5">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="5">`
      }
    ]
  }
});
