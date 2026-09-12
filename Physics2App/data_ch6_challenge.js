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
        text: `วัตถุมวล 2 kg เคลื่อนที่ไปทางขวาด้วยความเร็ว 5\text{ m/s} จงหาขนาดของโมเมนตัม`,
        hints: `ใช้สูตร $p = mv$`,
        guide: `<div class="step">$$\begin{aligned}
    p &= 2 \\times 5\\\\
    &= 10$ \text{ kg}\cdot\text{m/s}
  \end{aligned}$$</div>`,
        intermediateHtml: `p = <input type="text" class="answer-input" placeholder="10">`,
        advancedHtml: `<input type="text" class="answer-input" placeholder="10">`
      },
      {
        id: "ch6_c2",
        text: `รถยนต์มวล 1200 kg เคลื่อนที่ด้วยความเร็ว 20\text{ m/s} โมเมนตัมมีค่าเท่าใด`,
        hints: `แทนค่าใน $p = mv$`,
        guide: `<div class="step">$$\begin{aligned}
    p &= 1200 \\times 20\\\\
    &= 24000$ \text{ kg}\cdot\text{m/s}
  \end{aligned}$$</div>`,
        intermediateHtml: `p = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c3",
        text: `ลูกบอลมวล 0.5 kg มีโมเมนตัม 15 \text{ kg}\cdot\text{m/s} ลูกบอลมีความเร็วเท่าใด`,
        hints: `$v = \\frac{p}{m}$`,
        guide: `<div class="step">$$\begin{aligned}
    v &= \\frac{15}{0.5}\\\\
    &= 30$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c4",
        text: `วัตถุหนึ่งมีความเร็ว 10\text{ m/s} และโมเมนตัม 50 \text{ kg}\cdot\text{m/s} จงหามวลของวัตถุ`,
        hints: `$m = \\frac{p}{v}$`,
        guide: `<div class="step">$$\begin{aligned}
    m &= \\frac{50}{10}\\\\
    &= 5$ kg
  \end{aligned}$$</div>`,
        intermediateHtml: `m = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c5",
        text: `แรง 50 N กระทำต่อวัตถุเป็นเวลา 2 วินาที จงหาการดล`,
        hints: `$I = F \\times \\Delta t$`,
        guide: `<div class="step">$$\begin{aligned}
    I &= 50 \\times 2\\\\
    &= 100$ \text{ N}\cdot\text{s}
  \end{aligned}$$</div>`,
        intermediateHtml: `I = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c6",
        text: `การดล 120 \text{ N}\cdot\text{s} กระทำต่อวัตถุในเวลา 3 s จงหาแรงเฉลี่ย`,
        hints: `$F = \\frac{I}{\\Delta t}$`,
        guide: `<div class="step">$$\begin{aligned}
    F &= \\frac{120}{3}\\\\
    &= 40$ N
  \end{aligned}$$</div>`,
        intermediateHtml: `F = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c7",
        text: `ลูกเทนนิสมวล 0.1 kg ถูกตีด้วยความเร็วเปลี่ยนจาก 0 เป็น 40\text{ m/s} จงหาการดล`,
        hints: `$I = \\Delta p = m(v - u)$`,
        guide: `<div class="step">$$\begin{aligned}
    I &= 0.1(40 - 0)\\\\
    &= 4$ \text{ N}\cdot\text{s}
  \end{aligned}$$</div>`,
        intermediateHtml: `I = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c8",
        text: `วัตถุมวล 2 kg ลดความเร็วจาก 10\text{ m/s} เหลือ 2\text{ m/s} จงหาขนาดของการเปลี่ยนโมเมนตัม`,
        hints: `$\\Delta p = m(v - u)$`,
        guide: `<div class="step">$$\begin{aligned}
    \\Delta p &= 2(2 - 10)\\\\
    &= -16$ ขนาด\\\\
    &= 16 \text{ kg}\cdot\text{m/s}
  \end{aligned}$$</div>`,
        intermediateHtml: `|\\Delta p| = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c9",
        text: `ถุงทรายมวล 5 kg ตกกระทบพื้นด้วยความเร็ว 8\text{ m/s} และหยุดนิ่งใน 0.2 s จงหาแรงกระแทกเฉลี่ย`,
        hints: `$F = \\frac{m(v - u)}{t}$`,
        guide: `<div class="step">$$\begin{aligned}
    F &= \\frac{5(0 - 8)}{0.2}\\\\
    &= -200$ N (ขนาด 200 N)
  \end{aligned}$$</div>`,
        intermediateHtml: `F = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c10",
        text: `กล่องมวล 3 kg ถูกผลักด้วยแรง 15 N เป็นเวลา 4 s ความเร็วจะเปลี่ยนไปเท่าใด`,
        hints: `$F\\Delta t = m\\Delta v$`,
        guide: `<div class="step">$$\begin{aligned}
    \\Delta v &= \\frac{15 \\times 4}{3}\\\\
    &= 20$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `\\Delta v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c11",
        text: `รถยนต์ A ชนรถยนต์ B ที่อยู่นิ่ง <br><svg width="200" height="60"><rect x="20" y="20" width="40" height="20" fill="red"/><rect x="120" y="20" width="40" height="20" fill="blue"/><line x1="65" y1="30" x2="110" y2="30" stroke="black"/></svg>`,
        hints: `กฎอนุรักษ์โมเมนตัม`,
        guide: `<div class="step">ผลรวมโมเมนตัมก่อน = หลัง</div>`,
        intermediateHtml: `p = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c12",
        text: `กราฟ F-t เป็นรูปสามเหลี่ยมฐาน 4 s สูง 10 N จงหาการดล`,
        hints: `พื้นที่ใต้กราฟ F-t`,
        guide: `<div class="step">$$\begin{aligned}
    I &= \\frac{1}{2} \\times 4 \\times 10\\\\
    &= 20$ \text{ N}\cdot\text{s}
  \end{aligned}$$</div>`,
        intermediateHtml: `I = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c13",
        text: `กระสุนปืน 0.05 kg ยิงออกจากปืน 5 kg ด้วยความเร็ว 400\text{ m/s} ความเร็วถอยหลังของปืนคือ?`,
        hints: `$m_1v_1 + m_2v_2 = 0$`,
        guide: `<div class="step">$$\begin{aligned}
    v_2 &= -\\frac{0.05 \\times 400}{5}\\\\
    &= -4$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c14",
        text: `นก 0.2 kg บินด้วยความเร็ว 10\text{ m/s} ชนกระจกและกระดอนกลับด้วยความเร็ว 4\text{ m/s} หา $\\Delta p$`,
        hints: `ทิศตรงข้ามให้เป็นลบ`,
        guide: `<div class="step">$$\begin{aligned}
    \\Delta p &= 0.2(-4 - 10)\\\\
    &= -2.8$ \text{ N}\cdot\text{s}
  \end{aligned}$$</div>`,
        intermediateHtml: `|\\Delta p| = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c15",
        text: `รถเข็น 10 kg ความเร็ว 2\text{ m/s} มีคนมวล 40 kg กระโดดขึ้นรถเข็น ความเร็วใหม่คือ?`,
        hints: `$m_1u_1 = (m_1+m_2)v$`,
        guide: `<div class="step">$$\begin{aligned}
    10(2) &= (10+40)v \\\\\
    v &= 0.4$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      
      // Medium: 16-30 (1D/2D Collisions, Explosions, Multi-step)
      {
        id: "ch6_c16",
        text: `รถ A (1000 kg) 20\text{ m/s} ชนรถ B (1500 kg) 10\text{ m/s} ทิศเดียวกัน หลังชนติดกันไป ความเร็วเป็นเท่าใด <br><svg width="200" height="60"><rect x="10" y="20" width="35" height="15" fill="red"/><rect x="80" y="20" width="35" height="15" fill="blue"/><line x1="50" y1="27" x2="70" y2="27" stroke="black"/></svg>`,
        hints: `ชนแบบไม่ยืดหยุ่นสมบูรณ์ (ติดกัน)`,
        guide: `<div class="step">$$\begin{aligned}
    1000(20) + 1500(10) &= 2500v \\\\\
    v &= 14$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c17",
        text: `รถ A (500 kg) 15\text{ m/s} ชนรถ B (500 kg) -5\text{ m/s} ชนแล้ว A หยุดนิ่ง ความเร็ว B? <br><svg width="200" height="60"><rect x="10" y="20" width="35" height="15" fill="red"/><rect x="120" y="20" width="35" height="15" fill="blue"/><line x1="50" y1="27" x2="110" y2="27" stroke="black"/></svg>`,
        hints: `อนุรักษ์โมเมนตัม`,
        guide: `<div class="step">$$\begin{aligned}
    500(15) + 500(-5) &= 500(0) + 500(v_B) \\\\\
    v_B &= 10$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v_B = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c18",
        text: `วัตถุระเบิดออกเป็นสองส่วน ส่วนแรก 2 kg ไปทางซ้าย 10\text{ m/s} ส่วนที่สอง 4 kg ไปทางขวาเท่าใด <br><svg width="150" height="60"><circle cx="75" cy="30" r="15" fill="orange"/><path d="M75 30 L50 30 M75 30 L100 30" stroke="red"/></svg>`,
        hints: `โมเมนตัมเริ่มต้นเป็น 0`,
        guide: `<div class="step">$$\begin{aligned}
    0 &= 2(-10) + 4v \\\\\
    v &= 5$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c19",
        text: `ลูกสนุ้ก A ชน B ที่อยู่นิ่งแบบยืดหยุ่นสมบูรณ์ มวลเท่ากัน หลังชน A จะเป็นอย่างไร <br><svg width="150" height="60"><circle cx="40" cy="30" r="10" fill="white" stroke="black"/><circle cx="100" cy="30" r="10" fill="red"/></svg>`,
        hints: `มวลเท่า ชนยืดหยุ่น แลกเปลี่ยนความเร็ว`,
        guide: `<div class="step">A หยุดนิ่ง (v=0), B เคลื่อนที่ด้วยความเร็ว A</div>`,
        intermediateHtml: `v_A = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c20",
        text: `วัตถุ 3 kg วิ่ง 4\text{ m/s} ชน 2 kg อยู่นิ่ง แบบยืดหยุ่นสมบูรณ์ หาความเร็ว 2 kg หลังชน`,
        hints: `$u_1 + v_1 = u_2 + v_2$`,
        guide: `<div class="step">$$\begin{aligned}
    v_2 &= \\frac{2m_1}{m_1+m_2}u_1\\\\
    &= \\frac{2(3)}{5}4\\\\
    &= 4.8$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c21",
        text: `รถบรรทุก 5000 kg 10\text{ m/s} ชนรถเก๋ง 1000 kg วิ่งสวนมา 20\text{ m/s} ติดกันไป หา v หลังชน <br><svg width="200" height="60"><rect x="10" y="20" width="50" height="20" fill="green"/><rect x="120" y="20" width="30" height="15" fill="purple"/></svg>`,
        hints: `ทิศสวนทางกัน v ต้องติดลบ`,
        guide: `<div class="step">$$\begin{aligned}
    5000(10) + 1000(-20) &= 6000v \\\\\
    v &= 5$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c22",
        text: `วัตถุระเบิดเป็น 3 ชิ้น ชิ้นแรก 1 kg ไปเหนือ 3\text{ m/s} ชิ้นสอง 1 kg ไปตะวันออก 4\text{ m/s} ชิ้นสาม 1 kg จะมีความเร็วเท่าใด <br><svg width="150" height="100"><circle cx="75" cy="50" r="10" fill="grey"/><line x1="75" y1="50" x2="75" y2="20" stroke="black"/><line x1="75" y1="50" x2="105" y2="50" stroke="black"/></svg>`,
        hints: `รวมแบบเวกเตอร์ $p_x$ และ $p_y$`,
        guide: `<div class="step">$$\begin{aligned}
    p_3 &= \\sqrt{3^2 + 4^2}\\\\
    &= 5$ ดังนั้น $v\\\\
    &= 5$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c23",
        text: `ลูกบิลเลียด 2 ลูก ชนกัน 2 มิติ ลูกแรกเบี่ยงมุม 30 องศา ลูกที่สองเบี่ยง 60 องศา (ชนยืดหยุ่น) มุมรวมคือ 90 องศาใช่หรือไม่ (ตอบ 1=ใช่ 0=ไม่ใช่) <br><svg width="150" height="80"><circle cx="40" cy="40" r="8" fill="white" stroke="black"/><circle cx="80" cy="40" r="8" fill="red"/><path d="M80 40 L120 20 M80 40 L120 60" stroke="black" stroke-dasharray="2,2"/></svg>`,
        hints: `การชนยืดหยุ่นมวลเท่ากัน 2 มิติ`,
        guide: `<div class="step">ใช่ มุมระหว่างความเร็วหลังชนคือ $90^\\circ$</div>`,
        intermediateHtml: `ตอบ = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c24",
        text: `ลูกปืน 10 g ยิงทะลุแผ่นไม้ 2 kg ที่ห้อยอยู่ ความเร็วลูกปืนลดจาก 300 เป็น 100\text{ m/s} ไม้จะมีความเร็วเท่าใด`,
        hints: `อนุรักษ์โมเมนตัมแนวนอน`,
        guide: `<div class="step">$$\begin{aligned}
    0.01(300) &= 0.01(100) + 2v \\\\\
    v &= 1$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c25",
        text: `รถ 2000 kg ชนกำแพงด้วยความเร็ว 15\text{ m/s} และเด้งกลับด้วยความเร็ว 5\text{ m/s} ใน 0.1 s แรงเฉลี่ยคือ? <br><svg width="150" height="60"><rect x="30" y="20" width="40" height="20" fill="red"/><rect x="100" y="10" width="10" height="40" fill="gray"/></svg>`,
        hints: `$F = \\frac{m(v-u)}{t}$`,
        guide: `<div class="step">$$\begin{aligned}
    F &= \\frac{2000(-5 - 15)}{0.1}\\\\
    &= -400000$ N
  \end{aligned}$$</div>`,
        intermediateHtml: `|F| = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c26",
        text: `นักบินอวกาศ 80 kg ขว้างประแจ 2 kg ด้วยความเร็ว 10\text{ m/s} นักบินจะถอยหลังด้วยความเร็วเท่าใด`,
        hints: `โมเมนตัมรวม = 0`,
        guide: `<div class="step">$$\begin{aligned}
    0 &= 80v + 2(10) \\\\\
    v &= -0.25$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `|v| = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c27",
        text: `ลูกบอล 200 g ตกจากสูง 5 m กระดอนขึ้นสูง 3.2 m จงหาการดล ($g=10$)`,
        hints: `$v = \\sqrt{2gh}$, ขาลงบวก ขาขึ้นลบ`,
        guide: `<div class="step">$$\begin{aligned}
    u &= 10, v=-8 \\\\\
    I &= 0.2(-8 - 10) = -3.6$ \text{ N}\cdot\text{s}
  \end{aligned}$$</div>`,
        intermediateHtml: `|I| = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c28",
        text: `ปืนใหญ่ 1000 kg ยิงลูกปืน 10 kg ด้วยความเร็ว 200\text{ m/s} ถ้าระยะถอย 1 m หาแรงเสียดทาน`,
        hints: `หา $v$ ปืน แล้วใช้ พลังงาน $\\frac{1}{2}mv^2 = f s$`,
        guide: `<div class="step">$$\begin{aligned}
    v_p &= 2$ m/s $\\\\\
    \\frac{1}{2}(1000)(2^2) &= f(1) \\\\\
    f &= 2000$ N
  \end{aligned}$$</div>`,
        intermediateHtml: `f = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c29",
        text: `กล่อง 4 kg 5\text{ m/s} ชนกล่อง 6 kg ที่อยู่นิ่ง หลังชนกล่อง 4 kg สะท้อนกลับ 1\text{ m/s} กล่อง 6 kg เร็วเท่าใด <br><svg width="200" height="60"><rect x="20" y="20" width="30" height="20" fill="yellow" stroke="black"/><rect x="100" y="20" width="30" height="20" fill="brown" stroke="black"/></svg>`,
        hints: `$m_1u_1 = m_1v_1 + m_2v_2$`,
        guide: `<div class="step">$$\begin{aligned}
    4(5) &= 4(-1) + 6v \\\\\
    20 &= -4 + 6v \\\\\
    v &= 4$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c30",
        text: `จรวดมวล M พ่นแก๊สมวล m ด้วยความเร็ว v สัมพัทธ์จรวด หาความเร็วจรวดที่เพิ่มขึ้น`,
        hints: `$M\\Delta V = m v$`,
        guide: `<div class="step">$\\Delta V = \\frac{m}{M}v$ (ตอบเป็นสูตร)</div>`,
        intermediateHtml: `\\Delta V = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },

      // Hard: 31-40 (Applied, Mixed Concepts)
      {
        id: "ch6_c31",
        text: `ลูกปืน 20 g ยิงฝังในเป้า 1.98 kg ที่ห้อยแขวน เป้าแกว่งขึ้นสูง 5 cm หาความเร็วลูกปืน <br><svg width="150" height="100"><line x1="75" y1="10" x2="75" y2="70" stroke="black"/><rect x="65" y="70" width="20" height="20" fill="brown"/></svg>`,
        hints: `ใช้พลังงานหา $V$ ก่อน แล้วใช้โมเมนตัมหา $u$`,
        guide: `<div class="step">$$\begin{aligned}
    V &= \\sqrt{2(10)(0.05)} = 1$ m/s, $0.02u = 2(1) \\\\\
    u &= 100$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `u = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c32",
        text: `รถ A 1000 kg ไปตะวันออก 15\text{ m/s} ชนรถ B 2000 kg ไปเหนือ 10\text{ m/s} ติดกันไป หา v หลังชน <br><svg width="150" height="150"><rect x="20" y="70" width="30" height="15" fill="red"/><rect x="70" y="110" width="15" height="30" fill="blue"/></svg>`,
        hints: `รวม $p$ แบบเวกเตอร์ $p = \\sqrt{p_x^2 + p_y^2}$`,
        guide: `<div class="step">$$\begin{aligned}
    p_x &= 15000, p_y = 20000 \\\\\
    p_{tot} &= 25000 \\\\\
    v &= \\frac{25000}{3000} = 8.33$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c33",
        text: `สปริงอัดระหว่างมวล 2 kg และ 3 kg เมื่อปล่อย มวล 2 kg มีพลังงานจลน์ 18 J มวล 3 kg มีพลังงานจลน์เท่าใด`,
        hints: `$p$ เท่ากัน $E_k = \\frac{p^2}{2m}$`,
        guide: `<div class="step">$$\begin{aligned}
    p^2 &= 2(2)(18) = 72 \\\\\
    E_{k2} &= \\frac{72}{2(3)} = 12$ J
  \end{aligned}$$</div>`,
        intermediateHtml: `E_k = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c34",
        text: `หยดน้ำฝน 0.05 g ตกกระทบหลังคาด้วยความเร็ว 10\text{ m/s} และไม่สะท้อน 1000 หยด/วินาที แรงบนหลังคาคือ?`,
        hints: `$F = \\frac{nm\\Delta v}{t}$`,
        guide: `<div class="step">$$\begin{aligned}
    F &= 1000 \\times (0.05 \\times 10^{-3}) \\times 10\\\\
    &= 0.5$ N
  \end{aligned}$$</div>`,
        intermediateHtml: `F = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c35",
        text: `วัตถุ M อยู่นิ่ง ถูกก้อน m วิ่งชนยืดหยุ่น ก้อน m สะท้อนกลับด้วยอัตราเร็วครึ่งหนึ่งของเดิม จงหาอัตราส่วน M/m`,
        hints: `$v_1 = \\frac{m-M}{m+M}u_1 = -0.5 u_1$`,
        guide: `<div class="step">$$\begin{aligned}
    \\frac{m-M}{m+M} &= -0.5 \\\\\
    M &= 3m \\\\\
    M/m &= 3
  \end{aligned}$$</div>`,
        intermediateHtml: `M/m = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c36",
        text: `มวล m ลื่นไถลจากเนินสูง h ชนติดกับมวล 2m ที่ฐานเนิน ความสูงที่แกว่งขึ้นไปได้คือเท่าใด`,
        hints: `ความเร็วหลังชน $V = \\frac{u}{3}$`,
        guide: `<div class="step">$$\begin{aligned}
    H &= \\frac{V^2}{2g}\\\\
    &= \\frac{(u/3)^2}{2g}\\\\
    &= \\frac{h}{9}
  \end{aligned}$$</div>`,
        intermediateHtml: `H = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c37",
        text: `แผ่นไม้ 10 kg ลอยน้ำ คน 50 kg เดินบนไม้ด้วยความเร็ว 1.2\text{ m/s} สัมพัทธ์ไม้ ไม้จะถอยหลังด้วยความเร็วเท่าใดสัมพัทธ์น้ำ`,
        hints: `$0 = m_1v_1 + m_2v_2$ เมื่อ $v_1$ คือความเร็วคนต่อน้ำ`,
        guide: `<div class="step">$$\begin{aligned}
    0 &= 50(1.2 - v) - 10v \\\\\
    60 &= 60v \\\\\
    v &= 1$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c38",
        text: `การดลของแรงกระทำต่อมวล 2 kg เป็น $I = 4t^2$ ในช่วง 0 ถึง 3 s หา $\\Delta v$`,
        hints: `$I = m\\Delta v$`,
        guide: `<div class="step">$$\begin{aligned}
    ที่ t &= 3, $I = 36$ \text{ N}\cdot\text{s} $\\\\\
    \\Delta v &= 36/2 = 18$ m/s
  \end{aligned}$$</div>`,
        intermediateHtml: `\\Delta v = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c39",
        text: `ระเบิดมวล 5m กำลังตกด้วยความเร็ว v แตกเป็น 2 ส่วน ส่วน 2m หยุดนิ่ง ส่วน 3m จะมีความเร็วเท่าใด`,
        hints: `$5mv = 2m(0) + 3mv'$`,
        guide: `<div class="step">$v' = \\frac{5}{3}v$</div>`,
        intermediateHtml: `v' = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      },
      {
        id: "ch6_c40",
        text: `ลูกบอลมวล m วิ่งชนกำแพงทำมุม $\\theta$ กับเส้นตั้งฉาก สะท้อนกลับมุมเดิม อัตราเร็วเท่าเดิม จงหาการดล <br><svg width="150" height="150"><rect x="100" y="20" width="10" height="100" fill="gray"/><line x1="30" y1="40" x2="90" y2="70" stroke="black"/><line x1="90" y1="70" x2="30" y2="100" stroke="black"/></svg>`,
        hints: `โมเมนตัมเปลี่ยนเฉพาะแนวตั้งฉากกำแพง`,
        guide: `<div class="step">$\\Delta p = 2mv \\cos\\theta$ (หรือ $\\sin$ ขึ้นกับมุมที่กำหนด)</div>`,
        intermediateHtml: `\\Delta p = <input type="text" class="answer-input">`,
        advancedHtml: `<input type="text" class="answer-input">`
      }
    ]
  }
});
