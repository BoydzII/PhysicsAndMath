const physicsData = {
  topics: {
    work: {
      id: "work",
      title: "งานและพลังงาน",
      theory: `
        <h2>1. งาน (Work)</h2>
        <p>ในทางฟิสิกส์ <b>งาน ($W$)</b> เกิดขึ้นเมื่อมีแรง ($F$) กระทำต่อวัตถุ และทำให้วัตถุเคลื่อนที่ไปตามแนวการกระจัด ($s$) โดยมีสมการดังนี้:</p>
        <div class="formula-box">
          $$ W = F s \\cos \\theta $$
        </div>
        <p>เมื่อ $\\theta$ คือมุมระหว่างเวกเตอร์ของแรงและการกระจัด</p>
        <ul>
          <li>ถ้า $\\theta = 0^\\circ$ แรงและการกระจัดทิศเดียวกัน $W = Fs$</li>
          <li>ถ้า $\\theta = 90^\\circ$ แรงตั้งฉากกับการกระจัด $W = 0$</li>
          <li>ถ้า $\\theta = 180^\\circ$ แรงทิศตรงข้ามการกระจัด $W = -Fs$</li>
        </ul>
        <br>
        <canvas id="simWork" class="sim-canvas" style="position:relative; z-index:10; cursor:grab;"></canvas>
        <p class="hint-box" style="margin-top:12px"><b>💡 Tips:</b> คลิกลากกล่องในภาพจำลองด้านบนเพื่อดูการเกิดแรง (ลากขึ้น ดึงซ้าย ดึงขวา)</p>
      `,
      problems: [
        {
          id: "w1",
          text: "กล่องมวล 5 kg ถูกลากด้วยแรง 20 N ทำมุม $37^\\circ$ กับแนวระดับ ให้เคลื่อนที่ไปบนพื้นราบได้ระยะทาง 4 m จงหางานที่เกิดขึ้น (กำหนด $\\cos 37^\\circ = 0.8$)",
          hints: "แตกแรง 20 N ให้อยู่ในแนวขนานกับการกระจัด (แนวราบ) จะได้ $F \\cos 37^\\circ$",
          guide: `
            <div class="step">
              1. จากสมการของงาน: <br>
              $$ W = F s \\cos \\theta $$
            </div>
            <div class="step">
              2. แทนค่าที่โจทย์กำหนดให้: <br>
              $F = $ <input type="text" class="answer-input" placeholder="20"> N<br>
              $s = $ <input type="text" class="answer-input" placeholder="4"> m<br>
              $\\cos 37^\\circ = $ <input type="text" class="answer-input" placeholder="0.8">
            </div>
            <div class="step">
              3. คำนวณหาค่า W: <br>
              $W = 20 \\times 4 \\times 0.8 = $ <input type="text" class="answer-input" placeholder="64"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $F = 20 \\text{ N}, s = 4 \\text{ m}, \\theta = 37^\\circ$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w2",
          text: "ชายคนหนึ่งแบกของมวล 10 kg เดินไปข้างหน้าในแนวระดับเป็นระยะทาง 5 m จากนั้นเดินขึ้นบันไดสูง 3 m งานที่ชายคนนี้ทำทั้งหมดมีค่าเท่าใด (กำหนด $g = 10 \\text{ m/s}^2$)",
          hints: "งานในการเดินแนวราบเป็นศูนย์ เพราะแรงแบกชี้ขึ้นตั้งฉากกับการกระจัด คิดเฉพาะตอนเดินขึ้นบันได",
          guide: `
            <div class="step">
              1. งานตอนเดินพื้นราบ: แรงแบก (ขึ้น) ตั้งฉากกับการกระจัด (ราบ) <br>
              $\\theta = 90^\\circ \\rightarrow W_1 = 0$ J
            </div>
            <div class="step">
              2. งานตอนเดินขึ้นบันได: แรงแบก (ขึ้น) ทิศเดียวกับการกระจัด (ขึ้น) <br>
              $F = mg = 10 \\times 10 = 100$ N<br>
              $s = $ <input type="text" class="answer-input" placeholder="3"> m
            </div>
            <div class="step">
              3. คำนวณหาค่า W รวม: <br>
              $W = 100 \\times 3 = $ <input type="text" class="answer-input" placeholder="300"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $m = 10 \\text{ kg}, s_1 = 5 \\text{ m (แนวราบ)}, s_2 = 3 \\text{ m (แนวดิ่ง)}$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W_{รวม} = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W_{รวม} = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w3",
          text: "วัตถุมวล 2 kg ตกจากที่สูง 5 m ลงสู่พื้นดิน จงหางานที่ทำโดยแรงโน้มถ่วง (กำหนด $g = 10 \\text{ m/s}^2$)",
          hints: "แรงโน้มถ่วงมีทิศลง และวัตถุตกลงมาทิศเดียวกัน ดังนั้นมุม $\\theta = 0^\\circ$",
          guide: `
            <div class="step">
              1. แรงโน้มถ่วง $F = mg = 2 \\times 10 = 20$ N
            </div>
            <div class="step">
              2. การกระจัด $s = 5$ m ทิศเดียวกับแรง (ลง)
            </div>
            <div class="step">
              3. คำนวณ $W = F s = 20 \\times 5 = $ <input type="text" class="answer-input" placeholder="100"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $m = 2 \\text{ kg}, s = 5 \\text{ m}, \\text{ทิศทางเดียวกับแรง}$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w4",
          text: "ออกแรงผลักรถยนต์ 500 N ให้เคลื่อนที่ไปบนถนนราบได้ระยะทาง 10 m งานที่ทำเป็นเท่าใด",
          hints: "ทิศของแรงผลักและการเคลื่อนที่ไปทางเดียวกัน มุม $\\theta = 0^\\circ$ ($W = Fs$)",
          guide: `
            <div class="step">
              1. $W = Fs$
            </div>
            <div class="step">
              2. $W = 500 \\times 10 = $ <input type="text" class="answer-input" placeholder="5000"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $F = 500 \\text{ N}, s = 10 \\text{ m}, \\theta = 0^\\circ$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w5",
          text: "ชายคนหนึ่งหิ้วกระเป๋าหนัก 40 N เดินไปข้างหน้าบนพื้นราบระยะทาง 10 m งานที่ชายคนนี้ทำมีค่าเท่าใด",
          hints: "แรงที่หิ้วกระเป๋ามีทิศขึ้นบน แต่ทิศการเคลื่อนที่ไปข้างหน้า มุมระหว่างแรงและการกระจัดคือ $90^\\circ$",
          guide: `
            <div class="step">
              1. แรงหิ้ว (ทิศขึ้น) ตั้งฉากกับการกระจัด (พื้นราบ)
            </div>
            <div class="step">
              2. $\\theta = 90^\\circ$ ดังนั้น $\\cos 90^\\circ = 0$
            </div>
            <div class="step">
              3. $W = $ <input type="text" class="answer-input" placeholder="0"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $F = 40 \\text{ N (แนวดิ่ง)}, s = 10 \\text{ m (แนวราบ)}$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w6",
          text: "เด็กคนหนึ่งลากของเล่นด้วยแรง 50 N ทำมุม $60^\\circ$ กับแนวราบ ไปได้ไกล 8 m จงหางาน (กำหนด $\\cos 60^\\circ = 0.5$)",
          hints: "แตกแรง 50 N เข้าสู่แนวราบ ($F \\cos 60^\\circ$) แล้วนำมาคูณระยะทาง",
          guide: `
            <div class="step">
              1. $W = F s \\cos \\theta$
            </div>
            <div class="step">
              2. $W = 50 \\times 8 \\times 0.5 = $ <input type="text" class="answer-input" placeholder="200"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $F = 50 \\text{ N}, s = 8 \\text{ m}, \\theta = 60^\\circ$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w7",
          text: "วัตถุมวล 4 kg ไถลลงมาตามพื้นเอียงจากจุดที่มีความสูง 3 m จงหางานของแรงโน้มถ่วง (กำหนด $g = 10 \\text{ m/s}^2$)",
          hints: "งานของแรงโน้มถ่วงสามารถคิดได้จากน้ำหนัก (mg) คูณกับการกระจัดในแนวดิ่ง (ความสูง h) โดยตรง",
          guide: `
            <div class="step">
              1. แรงโน้มถ่วงทิศลงแนวดิ่ง $F = mg = 4 \\times 10 = 40$ N
            </div>
            <div class="step">
              2. การกระจัดแนวดิ่ง $h = 3$ m
            </div>
            <div class="step">
              3. $W = mgh = 40 \\times 3 = $ <input type="text" class="answer-input" placeholder="120"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $m = 4 \\text{ kg}, h = 3 \\text{ m (แนวดิ่ง)}$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w8",
          text: "ชายคนหนึ่งออกแรงผลักตู้ด้วยแรง 100 N แต่ตู้ไม่ขยับเลย เป็นเวลา 10 วินาที งานที่ทำเป็นเท่าใด",
          hints: "งานเกิดจากการกระจัด ถ้าระยะทางเป็นศูนย์ งานจะเป็นศูนย์เสมอแม้จะเหนื่อยก็ตาม",
          guide: `
            <div class="step">
              1. แรง $F = 100$ N
            </div>
            <div class="step">
              2. ตู้ไม่ขยับ การกระจัด $s = 0$ m
            </div>
            <div class="step">
              3. $W = Fs = 100 \\times 0 = $ <input type="text" class="answer-input" placeholder="0"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $F = 100 \\text{ N}, s = 0 \\text{ m}$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w9",
          text: "เครื่องยนต์ของรถเครนยกของมวล 500 kg ขึ้นในแนวดิ่งด้วยความเร็วคงที่เป็นระยะทาง 10 m งานที่เครื่องยนต์ทำเป็นเท่าใด ($g = 10 \\text{ m/s}^2$)",
          hints: "ดึงขึ้นด้วยความเร็วคงที่ แปลว่าแรงดึงเท่ากับน้ำหนักของวัตถุ ($F = mg$)",
          guide: `
            <div class="step">
              1. $F = mg = 500 \\times 10 = 5000$ N
            </div>
            <div class="step">
              2. $s = 10$ m ทิศเดียวกับแรงดึง
            </div>
            <div class="step">
              3. $W = Fs = 5000 \\times 10 = $ <input type="text" class="answer-input" placeholder="50000"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $m = 500 \\text{ kg}, s = 10 \\text{ m}, F = mg$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        },
        {
          id: "w10",
          text: "ลากของเล่นด้วยแรง 30 N ทำมุม $45^\\circ$ กับแนวราบ ไปได้ไกล 10 m จงหางาน (กำหนด $\\cos 45^\\circ = 0.707$)",
          hints: "แตงแรงเข้าสู่แนวราบ ($F \\cos 45^\\circ$)",
          guide: `
            <div class="step">
              1. $W = F s \\cos \\theta$
            </div>
            <div class="step">
              2. $W = 30 \\times 10 \\times 0.707 = $ <input type="text" class="answer-input" placeholder="212.1"> J
            </div>
          `,
          intermediateHtml: `
            <div class="step" style="color:var(--text-light); font-size:0.95rem;">
              <b>โจทย์กำหนด:</b> $F = 30 \\text{ N}, s = 10 \\text{ m}, \\theta = 45^\\circ$
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        }
      ]
    }
  }
};
