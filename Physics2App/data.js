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
        <p class="hint-box" style="margin-top:12px"><b>💡 Tips:</b> คลิกลากกล่องในภาพจำลองด้านบนเพื่อดูการเกิดแรง</p>
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
            <div style="margin-top: 60px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 100px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
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
            <div style="margin-top: 60px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W_{รวม} = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 100px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
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
            <div style="margin-top: 60px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `,
          advancedHtml: `
            <div style="margin-top: 100px; display: flex; align-items: center; gap: 12px; font-weight:bold;">
              ตอบ: $W = $ <input type="text" class="answer-input" style="width: 120px"> J
            </div>
          `
        }
      ]
    }
  }
};
