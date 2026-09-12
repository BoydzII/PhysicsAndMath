// data_ch6.js
Object.assign(physicsData.topics, {
  momentum: {
    id: "momentum",
    title: "6.1 โมเมนตัม",
    canvas: "simMomentum",
    theory: `
      <h3>โมเมนตัม (Momentum)</h3>
      <p>โมเมนตัม คือ ปริมาณที่บอกถึงสภาพการเคลื่อนที่ของวัตถุ เป็นปริมาณเวกเตอร์ที่มีทิศทางเดียวกับความเร็วของวัตถุ</p>
      <p>สูตร: $$p = mv$$</p>
      <ul>
        <li>$p$ คือ โมเมนตัม หน่วยเป็น $\\text{kg}\\cdot\\text{m/s}$</li>
        <li>$m$ คือ มวลของวัตถุ หน่วยเป็น $\\text{kg}$</li>
        <li>$v$ คือ ความเร็วของวัตถุ หน่วยเป็น $\\text{m/s}$</li>
      </ul>
      <p>การเปลี่ยนแปลงโมเมนตัม: $$\Delta p = p_f - p_i = m(v - u)$$</p>
    `,
    problems: [
      {
        id: "ch6-1-1",
        text: "รถยนต์มวล 1,500 kg กำลังแล่นด้วยความเร็ว 20 m/s โมเมนตัมของรถยนต์คันนี้มีค่าเท่าใด",
        hints: ["ใช้สูตร p = mv", "แทนค่ามวล m และความเร็ว v"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> วิเคราะห์สิ่งที่โจทย์กำหนด</p>
            <ul>
              <li>มวล $m = 1{,}500\\text{ kg}$</li>
              <li>ความเร็ว $v = 20\\text{ m/s}$</li>
            </ul>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> ใช้สูตรโมเมนตัมและคำนวณ</p>
            <p>$$\\begin{aligned}
              p &= mv \\\\
              &= (1{,}500)(20) \\\\
              &= 30{,}000\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <div class="problem-data">
            <p>มวล $m = 1{,}500\\text{ kg}$, ความเร็ว $v = 20\\text{ m/s}$</p>
            <p>$p = mv =$ <input type="text" class="answer-input" placeholder="30000" data-answer="30000"> $\\text{kg}\\cdot\\text{m/s}$</p>
          </div>
        `,
        advancedHtml: `
          <div class="problem-data">
            <p>โมเมนตัมของรถยนต์ = <input type="text" class="answer-input" placeholder="คำตอบ" data-answer="30000"> $\\text{kg}\\cdot\\text{m/s}$</p>
          </div>
        `
      },
      {
        id: "ch6-1-2",
        text: "ลูกบอลมวล 0.5 kg ตกจากที่สูง กระทบพื้นด้วยความเร็ว 10 m/s โมเมนตัมของลูกบอลขณะกระทบพื้นเป็นเท่าใด",
        hints: ["ใช้สูตร p = mv"],
        guide: `
          <div class="step">
            <p>แทนค่าในสูตรโมเมนตัม:</p>
            <p>$$\\begin{aligned}
              p &= mv \\\\
              &= (0.5)(10) \\\\
              &= 5\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$p =$ <input type="text" class="answer-input" placeholder="5" data-answer="5"> $\\text{kg}\\cdot\\text{m/s}$</p>`,
        advancedHtml: `<p>คำตอบ: <input type="text" class="answer-input" placeholder="คำตอบ" data-answer="5"> $\\text{kg}\\cdot\\text{m/s}$</p>`
      },
      {
        id: "ch6-1-3",
        text: "วัตถุมวล 2 kg เคลื่อนที่ด้วยความเร็ว 5 m/s ไปทางขวา โมเมนตัมมีขนาดเท่าใด",
        hints: ["p = mv"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              p &= mv \\\\
              &= (2)(5) \\\\
              &= 10\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$p =$ <input type="text" class="answer-input" placeholder="10" data-answer="10"> $\\text{kg}\\cdot\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="10" data-answer="10"> $\\text{kg}\\cdot\\text{m/s}$</p>`
      },
      {
        id: "ch6-1-4",
        text: "สเก็ตบอร์ดพร้อมคนขี่มวลรวม 60 kg เคลื่อนที่ด้วยความเร็ว 3 m/s จงหาโมเมนตัม",
        hints: ["p = mv"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              p &= mv \\\\
              &= (60)(3) \\\\
              &= 180\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$p =$ <input type="text" class="answer-input" placeholder="180" data-answer="180"> $\\text{kg}\\cdot\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="180" data-answer="180"> $\\text{kg}\\cdot\\text{m/s}$</p>`
      },
      {
        id: "ch6-1-5",
        text: "ปืนยาวมวล 4 kg มีโมเมนตัม 20 kg·m/s ความเร็วของปืนเป็นเท่าใด",
        hints: ["v = p/m"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              v &= \\frac{p}{m} \\\\
              &= \\frac{20}{4} \\\\
              &= 5\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v =$ <input type="text" class="answer-input" placeholder="5" data-answer="5"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="5" data-answer="5"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-1-6",
        text: "รถไฟมวล 10,000 kg วิ่งด้วยความเร็ว 15 m/s โมเมนตัมมีค่าเท่าใด",
        hints: ["p = mv"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              p &= mv \\\\
              &= (10{,}000)(15) \\\\
              &= 150{,}000\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$p =$ <input type="text" class="answer-input" placeholder="150000" data-answer="150000"> $\\text{kg}\\cdot\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="150000" data-answer="150000"> $\\text{kg}\\cdot\\text{m/s}$</p>`
      },
      {
        id: "ch6-1-7",
        text: "รถมวล 2,000 kg มีความเร็วเริ่มต้น 10 m/s และเร่งจนมีความเร็ว 20 m/s จงหาการเปลี่ยนแปลงโมเมนตัม",
        hints: ["\Delta p = m(v - u)"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              \\Delta p &= m(v - u) \\\\
              &= 2{,}000(20 - 10) \\\\
              &= 2{,}000(10) \\\\
              &= 20{,}000\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$\\Delta p =$ <input type="text" class="answer-input" placeholder="20000" data-answer="20000"> $\\text{kg}\\cdot\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="20000" data-answer="20000"> $\\text{kg}\\cdot\\text{m/s}$</p>`
      },
      {
        id: "ch6-1-8",
        text: "ลูกเทนนิสมวล 0.06 kg ถูกตีด้วยความเร็ว 30 m/s โมเมนตัมเท่าใด",
        hints: ["p = mv"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              p &= mv \\\\
              &= (0.06)(30) \\\\
              &= 1.8\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$p =$ <input type="text" class="answer-input" placeholder="1.8" data-answer="1.8"> $\\text{kg}\\cdot\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="1.8" data-answer="1.8"> $\\text{kg}\\cdot\\text{m/s}$</p>`
      },
      {
        id: "ch6-1-9",
        text: "วัตถุหนึ่งมีมวล 5 kg มีโมเมนตัม 25 kg·m/s จงหาความเร็ว",
        hints: ["v = p/m"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              v &= \\frac{p}{m} \\\\
              &= \\frac{25}{5} \\\\
              &= 5\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v =$ <input type="text" class="answer-input" placeholder="5" data-answer="5"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="5" data-answer="5"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-1-10",
        text: "ลูกปืนมวล 0.01 kg เคลื่อนที่ด้วยความเร็ว 400 m/s โมเมนตัมเท่าใด",
        hints: ["p = mv"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              p &= mv \\\\
              &= (0.01)(400) \\\\
              &= 4\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$p =$ <input type="text" class="answer-input" placeholder="4" data-answer="4"> $\\text{kg}\\cdot\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="4" data-answer="4"> $\\text{kg}\\cdot\\text{m/s}$</p>`
      }
    ]
  },
  impulse: {
    id: "impulse",
    title: "6.2 แรงและการดล",
    canvas: "simImpulse",
    theory: `
      <h3>แรงและการดล (Impulse)</h3>
      <p>การดล ($I$) คือ การเปลี่ยนแปลงโมเมนตัมของวัตถุเมื่อมีแรงกระทำในช่วงเวลา $\\Delta t$</p>
      <p>สูตร: $$I = F \\Delta t = \\Delta p = m(v - u)$$</p>
      <ul>
        <li>$I$ คือ การดล หน่วยเป็น $\\text{N}\\cdot\\text{s}$ หรือ $\\text{kg}\\cdot\\text{m/s}$</li>
        <li>$F$ คือ แรงดลเฉลี่ย หน่วยเป็น $\\text{N}$</li>
        <li>$\\Delta t$ คือ ช่วงเวลาที่แรงกระทำ หน่วยเป็น $\\text{s}$</li>
      </ul>
      <p>พื้นที่ใต้กราฟระหว่างแรง ($F$) และเวลา ($t$) คือ ค่าของการดล ($I$)</p>
    `,
    problems: [
      {
        id: "ch6-2-1",
        text: "ลูกบอลมวล 0.5 kg เคลื่อนที่เข้าชนกำแพงด้วยความเร็ว 10 m/s และสะท้อนกลับด้วยความเร็ว 10 m/s การดลมีขนาดเท่าใด",
        hints: ["ทิศตรงข้าม กำหนด u = 10, v = -10", "I = \Delta p = m(v - u)"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> กำหนดทิศทางและสิ่งที่โจทย์กำหนด</p>
            <ul>
              <li>มวล $m = 0.5\\text{ kg}$</li>
              <li>ความเร็วต้น $u = +10\\text{ m/s}$ (ทิศเข้าหากำแพง)</li>
              <li>ความเร็วปลาย $v = -10\\text{ m/s}$ (ทิศสะท้อนกลับ)</li>
            </ul>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> คำนวณการดลจาก $I = m(v - u)$</p>
            <p>$$\\begin{aligned}
              I &= m(v - u) \\\\
              &= 0.5(-10 - 10) \\\\
              &= 0.5(-20) \\\\
              &= -10\\text{ N}\\cdot\\text{s}
            \\end{aligned}$$</p>
            <p>ขนาดของการดลคือ $10\\text{ N}\\cdot\\text{s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$I =$ <input type="text" class="answer-input" placeholder="10" data-answer="10"> $\\text{N}\\cdot\\text{s}$</p>
        `,
        advancedHtml: `
          <p>ขนาดการดล: <input type="text" class="answer-input" placeholder="คำตอบ" data-answer="10"> $\\text{N}\\cdot\\text{s}$</p>
        `
      },
      {
        id: "ch6-2-2",
        text: "นักเตะเตะลูกบอลด้วยแรง 200 N เป็นเวลา 0.1 s การดลที่ลูกบอลได้รับเป็นเท่าใด",
        hints: ["I = F \Delta t"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              I &= F\\Delta t \\\\
              &= (200)(0.1) \\\\
              &= 20\\text{ N}\\cdot\\text{s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$I =$ <input type="text" class="answer-input" placeholder="20" data-answer="20"> $\\text{N}\\cdot\\text{s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="20" data-answer="20"> $\\text{N}\\cdot\\text{s}$</p>`
      },
      {
        id: "ch6-2-3",
        text: "ไม้เทนนิสกระทบลูกด้วยแรงเฉลี่ย 500 N เกิดการดล 20 N·s เวลาที่กระทบเป็นเท่าใด",
        hints: ["\Delta t = I / F"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              \\Delta t &= \\frac{I}{F} \\\\
              &= \\frac{20}{500} \\\\
              &= 0.04\\text{ s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$\\Delta t =$ <input type="text" class="answer-input" placeholder="0.04" data-answer="0.04"> $\\text{s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="0.04" data-answer="0.04"> $\\text{s}$</p>`
      },
      {
        id: "ch6-2-4",
        text: "ลูกเบสบอลมวล 0.2 kg ถูกปามาด้วยความเร็ว 30 m/s ผู้ตีตีสวนกลับด้วยความเร็ว 40 m/s จงหาขนาดของการดล",
        hints: ["I = m(v - u) กำหนดให้ทิศสวนกลับเป็นบวก"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              I &= m(v - u) \\\\
              &= 0.2(40 - (-30)) \\\\
              &= 0.2(70) \\\\
              &= 14\\text{ N}\\cdot\\text{s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$I =$ <input type="text" class="answer-input" placeholder="14" data-answer="14"> $\\text{N}\\cdot\\text{s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="14" data-answer="14"> $\\text{N}\\cdot\\text{s}$</p>`
      },
      {
        id: "ch6-2-5",
        text: "จากข้อ 4 ถ้าไม้เบสบอลสัมผัสลูกนาน 0.02 s แรงเฉลี่ยที่กระทำต่อลูกเป็นเท่าใด",
        hints: ["F = I / \Delta t"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              F &= \\frac{I}{\\Delta t} \\\\
              &= \\frac{14}{0.02} \\\\
              &= 700\\text{ N}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$F =$ <input type="text" class="answer-input" placeholder="700" data-answer="700"> $\\text{N}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="700" data-answer="700"> $\\text{N}$</p>`
      },
      {
        id: "ch6-2-6",
        text: "รถมวล 1000 kg เบรกจากความเร็ว 20 m/s จนหยุดนิ่งในเวลา 5 s แรงเบรกเฉลี่ยมีขนาดเท่าใด",
        hints: ["หา \Delta p ก่อน แล้วใช้ F = \Delta p / \Delta t"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              F &= \\frac{m(v - u)}{\\Delta t} \\\\
              &= \\frac{1{,}000(0 - 20)}{5} \\\\
              &= \\frac{-20{,}000}{5} \\\\
              &= -4{,}000\\text{ N}
            \\end{aligned}$$</p>
            <p>ขนาดของแรงเบรกเฉลี่ยคือ $4{,}000\\text{ N}$</p>
          </div>
        `,
        intermediateHtml: `<p>ขนาดแรง $=$ <input type="text" class="answer-input" placeholder="4000" data-answer="4000"> $\\text{N}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="4000" data-answer="4000"> $\\text{N}$</p>`
      },
      {
        id: "ch6-2-7",
        text: "กราฟแรง-เวลาเป็นรูปสามเหลี่ยมฐาน 0.2 s สูง 100 N จงหาการดล",
        hints: ["การดล = พื้นที่ใต้กราฟ = (1/2) * ฐาน * สูง"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              I &= \\text{พื้นที่ใต้กราฟ} \\\\
              &= \\frac{1}{2} \\times \\text{ฐาน} \\times \\text{สูง} \\\\
              &= \\frac{1}{2}(0.2)(100) \\\\
              &= 10\\text{ N}\\cdot\\text{s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$I =$ <input type="text" class="answer-input" placeholder="10" data-answer="10"> $\\text{N}\\cdot\\text{s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="10" data-answer="10"> $\\text{N}\\cdot\\text{s}$</p>`
      },
      {
        id: "ch6-2-8",
        text: "วัตถุมวล 2 kg ถูกแรงกระทำให้ความเร็วเปลี่ยนจาก 4 m/s เป็น 10 m/s จงหาการดล",
        hints: ["I = m(v - u)"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              I &= m(v - u) \\\\
              &= 2(10 - 4) \\\\
              &= 2(6) \\\\
              &= 12\\text{ N}\\cdot\\text{s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$I =$ <input type="text" class="answer-input" placeholder="12" data-answer="12"> $\\text{N}\\cdot\\text{s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="12" data-answer="12"> $\\text{N}\\cdot\\text{s}$</p>`
      },
      {
        id: "ch6-2-9",
        text: "แรงดล 50 N กระทำต่อวัตถุเป็นเวลา 2 วินาที ทำให้โมเมนตัมเปลี่ยนไปเท่าใด",
        hints: ["\Delta p = F \Delta t"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              \\Delta p &= F\\Delta t \\\\
              &= (50)(2) \\\\
              &= 100\\text{ kg}\\cdot\\text{m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$\\Delta p =$ <input type="text" class="answer-input" placeholder="100" data-answer="100"> $\\text{kg}\\cdot\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="100" data-answer="100"> $\\text{kg}\\cdot\\text{m/s}$</p>`
      },
      {
        id: "ch6-2-10",
        text: "วัตถุตกจากที่สูงกระทบพื้นดินด้วยความเร็ว 15 m/s และจมลงในดินก่อนหยุดนิ่งในเวลา 0.1 s หามวลวัตถุถ้าแรงต้านดินเฉลี่ยคือ 300 N",
        hints: ["F \Delta t = m(v-u) -> -300(0.1) = m(0 - (-15)) หรือดูเฉพาะขนาด"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              m &= \\frac{F\\Delta t}{\\Delta v} \\\\
              &= \\frac{(300)(0.1)}{15} \\\\
              &= \\frac{30}{15} \\\\
              &= 2\\text{ kg}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$m =$ <input type="text" class="answer-input" placeholder="2" data-answer="2"> $\\text{kg}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="2" data-answer="2"> $\\text{kg}$</p>`
      }
    ]
  },
  collision: {
    id: "collision",
    title: "6.3 การชน",
    canvas: "simCollision",
    theory: `
      <h3>การชน (Collision)</h3>
      <p>กฎการอนุรักษ์โมเมนตัม: ผลรวมโมเมนตัมก่อนชน เท่ากับ ผลรวมโมเมนตัมหลังชนเสมอ (เมื่อไม่มีแรงภายนอกกระทำ)</p>
      <p>$$\\sum p_{\\text{ก่อน}} = \\sum p_{\\text{หลัง}}$$</p>
      <p>$$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$</p>
      <p><b>1. การชนแบบยืดหยุ่น:</b> พลังงานจลน์รวมอนุรักษ์ ($\sum E_{k,\\text{ก่อน}} = \sum E_{k,\\text{หลัง}}$) และใน 1 มิติ: $$u_1 + v_1 = u_2 + v_2$$</p>
      <p><b>2. การชนแบบไม่ยืดหยุ่น:</b> พลังงานจลน์ไม่คงที่ (สูญเสียพลังงาน) ถ้าชนแล้วติดกันไป: $$m_1 u_1 + m_2 u_2 = (m_1 + m_2)v$$</p>
    `,
    problems: [
      {
        id: "ch6-3-1",
        text: "มวล 2 kg เคลื่อนที่ด้วยความเร็ว 5 m/s เข้าชนมวล 3 kg ที่อยู่นิ่ง ภายหลังชนทั้งสองติดกันไป จงหาความเร็วหลังชน",
        hints: ["ชนติดกันไป ใช้ m1u1 + m2u2 = (m1+m2)v", "มวล 3 kg อยู่นิ่ง u2 = 0"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> วิเคราะห์โจทย์</p>
            <ul>
              <li>$m_1 = 2\\text{ kg}, u_1 = 5\\text{ m/s}$</li>
              <li>$m_2 = 3\\text{ kg}, u_2 = 0\\text{ m/s}$</li>
            </ul>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> ใช้กฎการอนุรักษ์โมเมนตัม (ชนแล้วติดกันไป)</p>
            <p>$$\\begin{aligned}
              m_1 u_1 + m_2 u_2 &= (m_1 + m_2)v \\\\
              (2)(5) + (3)(0) &= (2 + 3)v \\\\
              10 &= 5v \\\\
              v &= \\frac{10}{5} \\\\
              v &= 2\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$v =$ <input type="text" class="answer-input" placeholder="2" data-answer="2"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็วรวมหลังชน: <input type="text" class="answer-input" placeholder="2" data-answer="2"> $\\text{m/s}$</p>
        `
      },
      {
        id: "ch6-3-2",
        text: "รถทดลอง A มวล 1 kg วิ่งด้วยความเร็ว 4 m/s เข้าชนแบบยืดหยุ่นกับรถ B มวล 1 kg ที่อยู่นิ่ง ความเร็วของรถ A หลังชนเป็นเท่าใด",
        hints: ["มวลเท่ากัน ชนยืดหยุ่น จะแลกความเร็วกัน"],
        guide: `
          <div class="step">
            <p>สำหรับวัตถุมวลเท่ากัน ($m_1 = m_2$) เมื่อชนกันแบบยืดหยุ่นสมบูรณ์ใน 1 มิติ วัตถุจะแลกเปลี่ยนความเร็วกัน:</p>
            <p>$$\\begin{aligned}
              v_A &= u_B = 0\\text{ m/s} \\\\
              v_B &= u_A = 4\\text{ m/s}
            \\end{aligned}$$</p>
            <p>ดังนั้น รถ A จะหยุดนิ่ง ($v_A = 0\\text{ m/s}$)</p>
          </div>
        `,
        intermediateHtml: `<p>$v_A =$ <input type="text" class="answer-input" placeholder="0" data-answer="0"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="0" data-answer="0"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-3-3",
        text: "จากข้อ 2 ความเร็วของรถ B หลังชนเป็นเท่าใด",
        hints: ["มวลเท่ากัน ชนยืดหยุ่น จะแลกความเร็วกัน"],
        guide: `
          <div class="step">
            <p>จากการแลกเปลี่ยนความเร็ว:</p>
            <p>$$\\begin{aligned}
              v_B &= u_A \\\\
              &= 4\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v_B =$ <input type="text" class="answer-input" placeholder="4" data-answer="4"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="4" data-answer="4"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-3-4",
        text: "วัตถุ A มวล 4 kg ความเร็ว 6 m/s ชนวัตถุ B มวล 2 kg ความเร็ว 3 m/s ในทิศเดียวกัน หลังชนติดกันไป จงหาความเร็วรวม",
        hints: ["m1u1 + m2u2 = (m1+m2)v"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              m_1 u_1 + m_2 u_2 &= (m_1 + m_2)v \\\\
              (4)(6) + (2)(3) &= (4 + 2)v \\\\
              24 + 6 &= 6v \\\\
              30 &= 6v \\\\
              v &= 5\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v =$ <input type="text" class="answer-input" placeholder="5" data-answer="5"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="5" data-answer="5"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-3-5",
        text: "ลูกบิลเลียดมวลเท่ากัน ลูกหนึ่งเคลื่อนที่ 10 m/s ชนอีกลูกที่อยู่นิ่งแบบยืดหยุ่นสมบูรณ์ ลูกที่ถูกชนจะมีความเร็วเท่าใด",
        hints: ["แลกความเร็ว"],
        guide: `
          <div class="step">
            <p>เมื่อมวลเท่ากันชนยืดหยุ่น ลูกที่ถูกชนจะได้รับความเร็วทั้งหมดของลูกแรกไป:</p>
            <p>$$\\begin{aligned}
              v_2 &= u_1 \\\\
              &= 10\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v =$ <input type="text" class="answer-input" placeholder="10" data-answer="10"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="10" data-answer="10"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-3-6",
        text: "กระสุนมวล 0.05 kg วิ่งด้วยความเร็ว 400 m/s ทะลุเป้ามวล 2 kg ที่อยู่นิ่ง ทำให้เป้ามีความเร็ว 5 m/s ความเร็วกระสุนหลังทะลุคือเท่าใด",
        hints: ["m1u1 + 0 = m1v1 + m2v2"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              m_1 u_1 + m_2 u_2 &= m_1 v_1 + m_2 v_2 \\\\
              (0.05)(400) + (2)(0) &= (0.05)v_1 + (2)(5) \\\\
              20 &= 0.05v_1 + 10 \\\\
              0.05v_1 &= 10 \\\\
              v_1 &= \\frac{10}{0.05} \\\\
              v_1 &= 200\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v_1 =$ <input type="text" class="answer-input" placeholder="200" data-answer="200"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="200" data-answer="200"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-3-7",
        text: "คนมวล 50 kg ยืนอยู่บนเรือมวล 150 kg ที่อยู่นิ่งในน้ำ เมื่อคนเดินด้วยความเร็ว 2 m/s เทียบกับน้ำ เรือจะมีความเร็วเท่าใด",
        hints: ["0 = m1v1 + m2v2 -> v2 = - (m1/m2) v1", "หาขนาดความเร็ว"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              0 &= m_1 v_1 + m_2 v_2 \\\\
              0 &= (50)(2) + 150 v_2 \\\\
              150 v_2 &= -100 \\\\
              v_2 &= -\\frac{100}{150} \\\\
              v_2 &\\approx -0.67\\text{ m/s}
            \\end{aligned}$$</p>
            <p>ขนาดความเร็วของเรือคือ $0.67\\text{ m/s}$ (ทิศตรงข้ามกับคนเดิน)</p>
          </div>
        `,
        intermediateHtml: `<p>$v$ (ขนาด) $=$ <input type="text" class="answer-input" placeholder="0.67" data-answer="0.67"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="0.67" data-answer="0.67"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-3-8",
        text: "ดินน้ำมันมวล 1 kg ปาด้วยความเร็ว 10 m/s ชนกำแพงและติดกำแพง กำแพงและโลกมีมวลมาก ความเร็วหลังชนเป็นเท่าใด",
        hints: ["ติดกับมวลขนาดใหญ่มาก ความเร็วสุดท้ายเป็นศูนย์"],
        guide: `
          <div class="step">
            <p>เนื่องจากกำแพงยึดแน่นกับโลกซึ่งมีมวลมากเป็นอนันต์เมื่อเทียบกับดินน้ำมัน ($M \\rightarrow \\infty$):</p>
            <p>$$\\begin{aligned}
              v &= \\frac{m u}{m + M} \\\\
              &= 0\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v =$ <input type="text" class="answer-input" placeholder="0" data-answer="0"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="0" data-answer="0"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-3-9",
        text: "มวล 5 kg วิ่งมาด้วย 8 m/s ชนมวล 3 kg ที่สวนมาด้วย 4 m/s (ทิศตรงข้าม) ถ้าชนแล้วติดกัน ความเร็วหลังชนเท่าใด",
        hints: ["กำหนดทิศ 5kg เป็นบวก: 5(8) + 3(-4) = (5+3)v"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              m_1 u_1 + m_2 u_2 &= (m_1 + m_2)v \\\\
              (5)(8) + (3)(-4) &= (5 + 3)v \\\\
              40 - 12 &= 8v \\\\
              28 &= 8v \\\\
              v &= \\frac{28}{8} \\\\
              v &= 3.5\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v =$ <input type="text" class="answer-input" placeholder="3.5" data-answer="3.5"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="3.5" data-answer="3.5"> $\\text{m/s}$</p>`
      },
      {
        id: "ch6-3-10",
        text: "การชนแบบยืดหยุ่น มวล 2 kg (4 m/s) ชนมวล 2 kg (-4 m/s) ความเร็วของมวลก้อนแรกหลังชนเป็นเท่าใด",
        hints: ["มวลเท่ากันชนยืดหยุ่น แลกความเร็วกัน"],
        guide: `
          <div class="step">
            <p>มวลเท่ากันชนยืดหยุ่นสมบูรณ์ใน 1 มิติ จะแลกความเร็วซึ่งกันและกัน:</p>
            <p>$$\\begin{aligned}
              v_1 &= u_2 \\\\
              &= -4\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `<p>$v_1 =$ <input type="text" class="answer-input" placeholder="-4" data-answer="-4"> $\\text{m/s}$</p>`,
        advancedHtml: `<p><input type="text" class="answer-input" placeholder="-4" data-answer="-4"> $\\text{m/s}$</p>`
      }
    ]
  }
});
