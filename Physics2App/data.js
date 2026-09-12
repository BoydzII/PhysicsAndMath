const physicsData = {
  topics: {
    work: {
      id: "work",
      title: "5.1 งาน",
      theory: `
        <h2>5.1 งาน (Work)</h2>
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
        <p class="hint-box" style="margin-top:12px"><b>💡 Tips:</b> คลิกค้างแล้วลากในภาพจำลองด้านบนเพื่อดูแรงและการแตกแรง</p>
      `,
      problems: [
        {
          id: "w1",
          text: "กล่องมวล 5 kg ถูกลากด้วยแรง 20 N ทำมุม $37^\\circ$ กับแนวระดับ ให้เคลื่อนที่ไปบนพื้นราบได้ระยะทาง 4 m จงหางานที่เกิดขึ้น (กำหนด $\\cos 37^\\circ = 0.8$)",
          hints: "แตกแรง 20 N ให้อยู่ในแนวขนานกับการกระจัด (แนวราบ) จะได้ $F \\cos 37^\\circ$",
          guide: `
            <div class="step">1. จากสมการของงาน: $W = F s \cos \theta$</div>
            <div class="calc-steps">
              <div>2. $W$</div><div>$=$</div><div>$20 \times 4 \times \cos 37^\circ$</div>
              <div></div><div>$=$</div><div>$20 \times 4 \times 0.8$</div>
              <div></div><div>$=$</div><div>$80 \times 0.8$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="64">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 20$ N, $s = 4$ m, $\\theta = 37^\\circ$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w2",
          text: "ชายคนหนึ่งแบกของมวล 10 kg เดินไปข้างหน้าในแนวระดับเป็นระยะทาง 5 m จากนั้นเดินขึ้นบันไดสูง 3 m งานที่ชายคนนี้ทำทั้งหมดมีค่าเท่าใด ($g = 10$ m/s²)",
          hints: "งานในการเดินแนวราบเป็นศูนย์ เพราะแรงแบกชี้ขึ้นตั้งฉากกับการกระจัด",
          guide: `
            <div class="step">1. งานตอนเดินพื้นราบ แรงตั้งฉากกับการกระจัด ($\theta = 90^\circ$): $W_1 = 0\text{ J}$</div>
            <div class="calc-steps">
              <div>2. $F$</div><div>$=$</div><div>$mg$</div>
              <div></div><div>$=$</div><div>$10 \times 10$</div>
              <div></div><div>$=$</div><div>$100\text{ N}$</div>
              <div>3. $W_2$</div><div>$=$</div><div>$Fs$</div>
              <div></div><div>$=$</div><div>$100 \times 3$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="300">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 10$ kg, $s_1 = 5$ m (แนวราบ), $s_2 = 3$ m (แนวดิ่ง)</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W_{รวม} =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W_{รวม} =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w3",
          text: "วัตถุมวล 2 kg ตกจากที่สูง 5 m ลงสู่พื้นดิน จงหางานที่ทำโดยแรงโน้มถ่วง ($g = 10$ m/s²)",
          hints: "แรงโน้มถ่วงมีทิศลง และวัตถุตกลงมาทิศเดียวกัน ดังนั้นมุม $\\theta = 0^\\circ$",
          guide: `
            <div class="calc-steps">
              <div>1. $F$</div><div>$=$</div><div>$mg$</div>
              <div></div><div>$=$</div><div>$2 \times 10$</div>
              <div></div><div>$=$</div><div>$20\text{ N}$</div>
              <div>2. $W$</div><div>$=$</div><div>$Fs$</div>
              <div></div><div>$=$</div><div>$20 \times 5$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="100">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 2$ kg, $s = 5$ m, ทิศเดียวกับแรง</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w4",
          text: "ออกแรงผลักรถยนต์ 500 N ให้เคลื่อนที่ไปบนถนนราบได้ระยะทาง 10 m งานที่ทำเป็นเท่าใด",
          hints: "ทิศแรงผลักและการเคลื่อนที่ไปทางเดียวกัน $\\theta = 0^\\circ$",
          guide: `
            <div class="calc-steps">
              <div>1. $W$</div><div>$=$</div><div>$Fs$</div>
              <div></div><div>$=$</div><div>$500 \times 10$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="5000">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 500$ N, $s = 10$ m, $\\theta = 0^\\circ$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w5",
          text: "ชายคนหนึ่งหิ้วกระเป๋าหนัก 40 N เดินไปข้างหน้าบนพื้นราบระยะทาง 10 m งานที่ชายคนนี้ทำมีค่าเท่าใด",
          hints: "แรงที่หิ้วกระเป๋ามีทิศขึ้นบน แต่ทิศการเคลื่อนที่ไปข้างหน้า มุม $90^\\circ$",
          guide: `
            <div class="step">1. แรงหิ้วชี้ขึ้นตั้งฉากกับทิศการกระจัดในแนวราบ ($\theta = 90^\circ$)</div>
            <div class="calc-steps">
              <div>2. $W$</div><div>$=$</div><div>$Fs \cos 90^\circ$</div>
              <div></div><div>$=$</div><div>$40 \times 10 \times 0$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="0">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 40$ N (แนวดิ่ง), $s = 10$ m (แนวราบ)</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w6",
          text: "เด็กคนหนึ่งลากของเล่นด้วยแรง 50 N ทำมุม $60^\\circ$ กับแนวราบ ไปได้ไกล 8 m จงหางาน ($\\cos 60^\\circ = 0.5$)",
          hints: "แตกแรง 50 N เข้าสู่แนวราบ ($F \\cos 60^\\circ$) แล้วคูณระยะทาง",
          guide: `
            <div class="calc-steps">
              <div>1. $W$</div><div>$=$</div><div>$Fs \cos 60^\circ$</div>
              <div></div><div>$=$</div><div>$50 \times 8 \times 0.5$</div>
              <div></div><div>$=$</div><div>$400 \times 0.5$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="200">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 50$ N, $s = 8$ m, $\\theta = 60^\\circ$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w7",
          text: "วัตถุมวล 4 kg ไถลลงมาตามพื้นเอียงจากจุดที่มีความสูง 3 m จงหางานของแรงโน้มถ่วง ($g = 10$ m/s²)",
          hints: "งานของแรงโน้มถ่วงคิดจาก $mgh$ ได้โดยตรง",
          guide: `
            <div class="calc-steps">
              <div>1. $F$</div><div>$=$</div><div>$mg$</div>
              <div></div><div>$=$</div><div>$4 \\times 10$</div>
              <div></div><div>$=$</div><div>$40\\text{ N}$</div>
            </div>
            <div class="step">2. การกระจัดแนวดิ่ง $h = 3\\text{ m}$</div>
            <div class="calc-steps">
              <div>3. $W$</div><div>$=$</div><div>$mgh$</div>
              <div></div><div>$=$</div><div>$40 \\times 3$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="120">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 4$ kg, $h = 3$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w8",
          text: "ชายคนหนึ่งออกแรงผลักตู้ด้วยแรง 100 N แต่ตู้ไม่ขยับเลย เป็นเวลา 10 วินาที งานที่ทำเป็นเท่าใด",
          hints: "งานเกิดจากการกระจัด ถ้าระยะทางเป็นศูนย์ งานจะเป็นศูนย์เสมอ",
          guide: `
            <div class="step">1. ตู้ไม่ขยับ การกระจัด $s = 0\text{ m}$</div>
            <div class="calc-steps">
              <div>2. $W$</div><div>$=$</div><div>$Fs$</div>
              <div></div><div>$=$</div><div>$100 \times 0$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="0">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 100$ N, $s = 0$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w9",
          text: "เครื่องยนต์ของรถเครนยกของมวล 500 kg ขึ้นในแนวดิ่งด้วยความเร็วคงที่เป็นระยะทาง 10 m งานที่เครื่องยนต์ทำเป็นเท่าใด ($g = 10$ m/s²)",
          hints: "ดึงขึ้นด้วยความเร็วคงที่ แปลว่า $F = mg$",
          guide: `
            <div class="calc-steps">
              <div>1. $F$</div><div>$=$</div><div>$mg$</div>
              <div></div><div>$=$</div><div>$500 \\times 10$</div>
              <div></div><div>$=$</div><div>$5{,}000\\text{ N}$</div>
            </div>
            <div class="calc-steps">
              <div>2. $W$</div><div>$=$</div><div>$Fs$</div>
              <div></div><div>$=$</div><div>$5{,}000 \\times 10$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="50000">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 500$ kg, $s = 10$ m, $F = mg$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w10",
          text: "ลากของเล่นด้วยแรง 30 N ทำมุม $45^\\circ$ กับแนวราบ ไปได้ไกล 10 m จงหางาน ($\\cos 45^\\circ = 0.707$)",
          hints: "แตกแรงเข้าสู่แนวราบ ($F \\cos 45^\\circ$)",
          guide: `
            <div class="calc-steps">
              <div>1. $W$</div><div>$=$</div><div>$Fs \cos 45^\circ$</div>
              <div></div><div>$=$</div><div>$30 \times 10 \times 0.707$</div>
              <div></div><div>$=$</div><div>$300 \times 0.707$</div>
              <div></div><div>$\approx$</div><div><input type="text" class="answer-input" placeholder="212.1">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 30$ N, $s = 10$ m, $\\theta = 45^\\circ$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        }
      ]
    },
    power: {
      id: "power",
      title: "5.2 กำลัง",
      theory: `
        <h2>5.2 กำลัง (Power)</h2>
        <p><b>กำลัง ($P$)</b> คือ อัตราการทำงาน หรืองานที่ทำได้ในหนึ่งหน่วยเวลา</p>
        <div class="formula-box">
          $$ P = \\frac{W}{t} $$
        </div>
        <p>เนื่องจาก $W = Fs$ เราสามารถเขียนสมการใหม่ได้เป็น:</p>
        <div class="formula-box">
          $$ P = \\frac{Fs}{t} = Fv $$
        </div>
        <p>เมื่อวัตถุเคลื่อนที่ด้วยความเร็วคงที่ ($v$)</p>
        <ul>
          <li><b>W</b> = งานที่ทำได้ (Joule, J)</li>
          <li><b>t</b> = เวลาที่ใช้ (second, s)</li>
          <li><b>P</b> = กำลัง (Watt, W หรือ J/s)</li>
        </ul>
        <br>
        <canvas id="simPower" class="sim-canvas" style="position:relative; z-index:10; cursor:pointer;"></canvas>
        <p class="hint-box" style="margin-top:12px"><b>💡 Tips:</b> ลากตุ้มน้ำหนักขึ้น-ลงด้วยนิ้วหรือเมาส์ เพื่อดูค่ากำลังที่เปลี่ยนไปตามความเร็ว</p>
      `,
      problems: [
        {
          id: "p1",
          text: "เครื่องปั๊มน้ำเครื่องหนึ่งทำงาน 3,000 J ในเวลา 10 วินาที เครื่องปั๊มน้ำนี้มีกำลังเท่าใด",
          hints: "ใช้สมการ $P = W/t$ แทนค่าโดยตรง",
          guide: `
            <div class="calc-steps">
              <div>1. $P$</div><div>$=$</div><div>$\frac{W}{t}$</div>
              <div></div><div>$=$</div><div>$\frac{3000}{10}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="300">&nbsp;W</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $W = 3000$ J, $t = 10$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        },
        {
          id: "p2",
          text: "ชายคนหนึ่งออกแรง 150 N ผลักรถให้เคลื่อนที่ไปได้ระยะทาง 20 m ในเวลา 5 วินาที ชายคนนี้ใช้กำลังเท่าใด",
          hints: "หางาน $W$ ก่อน จากนั้นนำมาหารด้วยเวลา $t$",
          guide: `
            <div class="calc-steps">
              <div>1. $W$</div><div>$=$</div><div>$Fs$</div>
              <div></div><div>$=$</div><div>$150 \\times 20$</div>
              <div></div><div>$=$</div><div>$3{,}000\\text{ J}$</div>
              <div>2. $P$</div><div>$=$</div><div>$\\frac{W}{t}$</div>
              <div></div><div>$=$</div><div>$\\frac{3{,}000}{5}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="600">&nbsp;W</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 150$ N, $s = 20$ m, $t = 5$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        },
        {
          id: "p3",
          text: "มอเตอร์เครื่องหนึ่งดึงลิฟต์มวล 1,000 kg ขึ้นไปสูง 15 m ในเวลา 10 วินาที ด้วยความเร็วคงที่ มอเตอร์นี้มีกำลังเท่าใด ($g = 10$ m/s²)",
          hints: "ลิฟต์ขึ้นความเร็วคงที่ $F = mg$ จากนั้นใช้ $P = Fs/t$",
          guide: `
            <div class="calc-steps">
              <div>1. $F$</div><div>$=$</div><div>$mg$</div>
              <div></div><div>$=$</div><div>$1{,}000 \\times 10$</div>
              <div></div><div>$=$</div><div>$10{,}000\\text{ N}$</div>
              <div>2. $W$</div><div>$=$</div><div>$10{,}000 \\times 15$</div>
              <div></div><div>$=$</div><div>$150{,}000\\text{ J}$</div>
              <div>3. $P$</div><div>$=$</div><div>$\\frac{150{,}000}{10}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="15000">&nbsp;W</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 1000$ kg, $s = 15$ m, $t = 10$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        },
        {
          id: "p4",
          text: "รถยนต์คันหนึ่งมีกำลัง 50,000 W กำลังแล่นด้วยความเร็วคงที่ 20 m/s แรงขับเคลื่อนของเครื่องยนต์มีค่าเท่าใด",
          hints: "ใช้สมการ $P = Fv$ ย้ายข้างหา $F$",
          guide: `
            <div class="step">1. จากความสัมพันธ์ $P = Fv \rightarrow F = \frac{P}{v}$</div>
            <div class="calc-steps">
              <div>2. $F$</div><div>$=$</div><div>$\frac{50000}{20}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="2500">&nbsp;N</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $P = 50000$ W, $v = 20$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $F =$ <input type="text" class="answer-input" style="width:120px"> N</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $F =$ <input type="text" class="answer-input" style="width:120px"> N</div>`
        },
        {
          id: "p5",
          text: "ปั้นจั่นเครื่องหนึ่งยกของหนัก 2,000 N ขึ้นสูง 5 m ในเวลา 4 s ถ้านำไปยกของหนัก 4,000 N ขึ้นสูงเท่าเดิม ปั้นจั่นนี้จะใช้เวลาเท่าใด (สมมติใช้กำลังเต็มที่เท่าเดิม)",
          hints: "หากำลังจากกรณีแรกก่อน แล้วนำกำลังนั้นไปคิดหาเวลาในกรณีที่สอง",
          guide: `
            <div class="calc-steps">
              <div>1. $P$</div><div>$=$</div><div>$\frac{W_1}{t_1}$</div>
              <div></div><div>$=$</div><div>$\frac{2000 \times 5}{4}$</div>
              <div></div><div>$=$</div><div>$2{,}500\text{ W}$</div>
              <div>2. $t_2$</div><div>$=$</div><div>$\frac{W_2}{P}$</div>
              <div></div><div>$=$</div><div>$\frac{4000 \times 5}{2500}$</div>
              <div></div><div>$=$</div><div>$\frac{20000}{2500}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="8">&nbsp;s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> ครั้งที่ 1: $F_1=2000, s=5, t_1=4$, ครั้งที่ 2: $F_2=4000, s=5$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $t_2 =$ <input type="text" class="answer-input" style="width:120px"> s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $t_2 =$ <input type="text" class="answer-input" style="width:120px"> s</div>`
        },
        {
          id: "p6",
          text: "หลอดไฟดวงหนึ่งมีกำลัง 100 W ถ้าเปิดทิ้งไว้ 2 ชั่วโมง จะใช้พลังงานไฟฟ้าไปกี่จูล",
          hints: "งาน $W = P \\times t$ แต่ต้องเปลี่ยนเวลาเป็นวินาทีก่อน",
          guide: `
            <div class="step">1. แปลงเวลาเป็นวินาที: $t = 2 \times 3600 = 7{,}200\text{ s}$</div>
            <div class="calc-steps">
              <div>2. $W$</div><div>$=$</div><div>$Pt$</div>
              <div></div><div>$=$</div><div>$100 \times 7{,}200$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="720000">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $P = 100$ W, $t = 2$ ชั่วโมง</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "p7",
          text: "เด็กคนหนึ่งวิ่งขึ้นบันไดสูง 4 m ภายในเวลา 5 วินาที ถ้าเด็กคนนี้มีน้ำหนัก 400 N กำลังที่ใช้เป็นเท่าใด",
          hints: "แรงพยุงตัว = น้ำหนักตัว ($F = 400$ N)",
          guide: `
            <div class="calc-steps">
              <div>1. $W$</div><div>$=$</div><div>$Fh$</div>
              <div></div><div>$=$</div><div>$400 \times 4$</div>
              <div></div><div>$=$</div><div>$1{,}600\text{ J}$</div>
              <div>2. $P$</div><div>$=$</div><div>$\frac{W}{t}$</div>
              <div></div><div>$=$</div><div>$\frac{1{,}600}{5}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="320">&nbsp;W</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 400$ N, $s = 4$ m, $t = 5$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        },
        {
          id: "p8",
          text: "รถม้าถูกดึงด้วยม้า 2 ตัว แต่ละตัวออกแรง 500 N วิ่งไปข้างหน้าด้วยความเร็วคงที่ 10 m/s ม้าทั้งสองตัวใช้กำลังรวมกันกี่ kW",
          hints: "แรงรวม $F = 500 \\times 2 = 1000$ N แล้วใช้ $P = Fv$ อย่าลืมแปลง kW",
          guide: `
            <div class="calc-steps">
              <div>1. $F_{รวม}$</div><div>$=$</div><div>$500 + 500$</div>
              <div></div><div>$=$</div><div>$1{,}000\text{ N}$</div>
              <div>2. $P$</div><div>$=$</div><div>$Fv$</div>
              <div></div><div>$=$</div><div>$1{,}000 \times 10$</div>
              <div></div><div>$=$</div><div>$10{,}000\text{ W}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="10">&nbsp;kW</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F_{รวม} = 1000$ N, $v = 10$ m/s (ถาม kW)</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> kW</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> kW</div>`
        },
        {
          id: "p9",
          text: "เครื่องยนต์ 10 kW สามารถยกของมวล 500 kg ขึ้นไปได้สูงเท่าใดในเวลา 20 วินาที ($g = 10$ m/s²)",
          hints: "แปลง 10 kW = 10,000 W แล้วใช้ $P = \\frac{mgh}{t}$ หา h",
          guide: `
            <div class="step">1. แรงยก $F = mg = 500 \times 10 = 5{,}000\text{ N}$</div>
            <div class="calc-steps">
              <div>2. $h$</div><div>$=$</div><div>$\frac{Pt}{F}$</div>
              <div></div><div>$=$</div><div>$\frac{10000 \times 20}{5000}$</div>
              <div></div><div>$=$</div><div>$\frac{200000}{5000}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="40">&nbsp;m</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $P = 10000$ W, $m = 500$ kg, $t = 20$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $h =$ <input type="text" class="answer-input" style="width:120px"> m</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $h =$ <input type="text" class="answer-input" style="width:120px"> m</div>`
        },
        {
          id: "p10",
          text: "น้ำตกแห่งหนึ่งมีน้ำไหลตกลงมาด้วยอัตรา 2,000 kg/s จากความสูง 50 m ถ้านำพลังงานน้ำมาผลิตไฟฟ้าได้ 80% จะมีกำลังการผลิตเท่าใด ($g = 10$ m/s²)",
          hints: "กำลังทั้งหมด $P = (\\frac{m}{t})gh$ จากนั้นคิดเพียง 80%",
          guide: `
            <div class="calc-steps">
              <div>1. $P_{รวม}$</div><div>$=$</div><div>$\left(\frac{m}{t}\right)gh$</div>
              <div></div><div>$=$</div><div>$2000 \times 10 \times 50$</div>
              <div></div><div>$=$</div><div>$1{,}000{,}000\text{ W}$</div>
              <div>2. $P_{ผลิต}$</div><div>$=$</div><div>$1{,}000{,}000 \times 80\%$</div>
              <div></div><div>$=$</div><div>$1{,}000{,}000 \times 0.8$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="800000">&nbsp;W</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> อัตราการไหล $= 2000$ kg/s, $h = 50$ m, ประสิทธิภาพ 80%</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        }
      ]
    },
    kinetic: {
      id: "kinetic",
      title: "5.3 พลังงานจลน์",
      theory: `
        <h2>5.3 พลังงานจลน์ (Kinetic Energy)</h2>
        <p><b>พลังงานจลน์ ($KE$)</b> คือ พลังงานที่วัตถุมีอยู่เนื่องจากการเคลื่อนที่:</p>
        <div class="formula-box">
          $$ KE = \\frac{1}{2}mv^2 $$
        </div>
        <p><b>ทฤษฎีบทงาน-พลังงานจลน์:</b> งานลัพธ์ที่ทำต่อวัตถุจะเท่ากับการเปลี่ยนแปลงพลังงานจลน์ของวัตถุ</p>
        <div class="formula-box">
          $$ W_{net} = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2 $$
        </div>
        <p>หน่วย: จูล (J)</p>
        <br>
        <canvas id="simKinetic" class="sim-canvas" style="position:relative; z-index:10; cursor:pointer;"></canvas>
        <p class="hint-box" style="margin-top:12px"><b>💡 Tips:</b> ลากรถเพื่อเปลี่ยนความเร็ว ดูพลังงานจลน์เปลี่ยนตาม</p>
      `,
      problems: [
        {
          id: "ke1",
          text: "วัตถุมวล 2 kg กำลังเคลื่อนที่ด้วยความเร็ว 3 m/s วัตถุนี้มีพลังงานจลน์เท่าใด",
          hints: "ใช้สมการ $KE = \\frac{1}{2}mv^2$ แทนค่าโดยตรง",
          guide: `
            <div class="calc-steps">
              <div>1. $KE$</div><div>$=$</div><div>$\frac{1}{2}mv^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 2 \times 3^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 2 \times 9$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="9">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 2$ kg, $v = 3$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "ke2",
          text: "รถยนต์มวล 1,000 kg กำลังแล่นด้วยความเร็ว 20 m/s รถคันนี้มีพลังงานจลน์เท่าใด",
          hints: "แทนค่าในสูตรพลังงานจลน์",
          guide: `
            <div class="calc-steps">
              <div>1. $KE$</div><div>$=$</div><div>$\frac{1}{2}mv^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 1000 \times 20^2$</div>
              <div></div><div>$=$</div><div>$500 \times 400$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="200000">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 1000$ kg, $v = 20$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "ke3",
          text: "ลูกบอลมวล 0.5 kg เคลื่อนที่ด้วยความเร็ว 10 m/s พลังงานจลน์ของลูกบอลมีค่าเท่าใด",
          hints: "ระวังการคิดเลขยกกำลังของ 10",
          guide: `
            <div class="calc-steps">
              <div>1. $KE$</div><div>$=$</div><div>$\frac{1}{2}mv^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 0.5 \times 10^2$</div>
              <div></div><div>$=$</div><div>$0.25 \times 100$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="25">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 0.5$ kg, $v = 10$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "ke4",
          text: "วัตถุมวล 4 kg มีพลังงานจลน์ 50 J วัตถุนี้เคลื่อนที่ด้วยความเร็วเท่าใด",
          hints: "ย้ายข้างสมการ $v = \\sqrt{\\frac{2KE}{m}}$",
          guide: `
            <div class="step">1. $50 = \\frac{1}{2} \\times 4 \\times v^2$</div>
            <div class="calc-steps">
              <div>2. $v^2$</div><div>$=$</div><div>$\\frac{50 \\times 2}{4}$</div>
              <div></div><div>$=$</div><div>$25$</div>
              <div>3. $v$</div><div>$=$</div><div>$\\sqrt{25}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="5">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $KE = 50$ J, $m = 4$ kg</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        },
        {
          id: "ke5",
          text: "รถยนต์มวล 800 kg แล่นด้วยความเร็ว 10 m/s ถ้าเบรกจนหยุดสนิท งานที่ทำโดยแรงเบรกมีค่าเท่าใด",
          hints: "ใช้ทฤษฎีบทงาน-พลังงานจลน์ $W = \\Delta KE = KE_f - KE_i$",
          guide: `
            <div class="calc-steps">
              <div>1. $KE_i$</div><div>$=$</div><div>$\frac{1}{2}mv^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 800 \times 10^2$</div>
              <div></div><div>$=$</div><div>$40{,}000\text{ J}$</div>
              <div>2. $W$</div><div>$=$</div><div>$\Delta KE = 0 - KE_i$</div>
              <div></div><div>$=$</div><div>$0 - 40{,}000$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="-40000">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 800$ kg, $v_i = 10$ m/s, $v_f = 0$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "ke6",
          text: "ลูกปืนมวล 10 กรัม เคลื่อนที่ด้วยความเร็ว 400 m/s พลังงานจลน์ของลูกปืนเป็นเท่าใด",
          hints: "เปลี่ยนมวลเป็นกิโลกรัมก่อน $10$ g $= 0.01$ kg",
          guide: `
            <div class="step">1. แปลงหน่วยมวล: $m = 10\text{ g} \rightarrow 0.01\text{ kg}$</div>
            <div class="calc-steps">
              <div>2. $KE$</div><div>$=$</div><div>$\frac{1}{2}mv^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 0.01 \times 400^2$</div>
              <div></div><div>$=$</div><div>$0.005 \times 160{,}000$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="800">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 0.01$ kg, $v = 400$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "ke7",
          text: "วัตถุมวล 5 kg มีความเร็วเพิ่มขึ้นจาก 2 m/s เป็น 6 m/s จงหางานลัพธ์ที่กระทำต่อวัตถุ",
          hints: "$W_{net} = \\Delta KE = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2$",
          guide: `
            <div class="calc-steps">
              <div>1. $KE_i$</div><div>$=$</div><div>$\frac{1}{2}(5)(2^2) = 10\text{ J}$</div>
              <div>2. $KE_f$</div><div>$=$</div><div>$\frac{1}{2}(5)(6^2) = 90\text{ J}$</div>
              <div>3. $W$</div><div>$=$</div><div>$\Delta KE = KE_f - KE_i$</div>
              <div></div><div>$=$</div><div>$90 - 10$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="80">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 5$ kg, $v_i = 2$ m/s, $v_f = 6$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "ke8",
          text: "วัตถุ A มวล 2 kg เคลื่อนที่ด้วยความเร็ว 4 m/s และวัตถุ B มวล 4 kg เคลื่อนที่ด้วยความเร็ว 2 m/s วัตถุใดมีพลังงานจลน์มากกว่ากัน",
          hints: "คิดพลังงานจลน์ของแต่ละก้อน",
          guide: `
            <div class="calc-steps">
              <div>1. $KE_A$</div><div>$=$</div><div>$\frac{1}{2}(2)(4^2) = 16\text{ J}$</div>
              <div>2. $KE_B$</div><div>$=$</div><div>$\frac{1}{2}(4)(2^2) = 8\text{ J}$</div>
              <div>3. $\Delta KE$</div><div>$=$</div><div>$KE_A - KE_B$</div>
              <div></div><div>$=$</div><div>$16 - 8$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="8">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> A: 2kg, 4m/s | B: 4kg, 2m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: พลังงานจลน์ A มากกว่า B <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: พลังงานจลน์ A มากกว่า B <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "ke9",
          text: "ออกแรง 50 N ดันวัตถุมวล 10 kg ที่หยุดนิ่งให้เคลื่อนที่ไปได้ระยะทาง 4 m วัตถุจะมีความเร็วเท่าใด",
          hints: "ใช้ $W = \\Delta KE$ โดย $W = Fs$ และ $KE_i = 0$",
          guide: `
            <div class="calc-steps">
              <div>1. $W$</div><div>$=$</div><div>$Fs$</div>
              <div></div><div>$=$</div><div>$50 \times 4$</div>
              <div></div><div>$=$</div><div>$200\text{ J}$</div>
              <div>2. $v$</div><div>$=$</div><div>$\sqrt{\frac{2W}{m}}$</div>
              <div></div><div>$=$</div><div>$\sqrt{\frac{2 \times 200}{10}}$</div>
              <div></div><div>$=$</div><div>$\sqrt{40}$</div>
              <div></div><div>$\approx$</div><div><input type="text" class="answer-input" placeholder="6.32">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 50$ N, $m = 10$ kg, $s = 4$ m, $v_i = 0$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        },
        {
          id: "ke10",
          text: "นักวิ่งมวล 60 kg วิ่งด้วยความเร็ว 8 m/s พลังงานจลน์ของเขาเป็นเท่าใด",
          hints: "แทนค่าสูตร $KE = \\frac{1}{2}mv^2$ โดยตรง",
          guide: `
            <div class="calc-steps">
              <div>1. $KE$</div><div>$=$</div><div>$\frac{1}{2}mv^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 60 \times 8^2$</div>
              <div></div><div>$=$</div><div>$30 \times 64$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="1920">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 60$ kg, $v = 8$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $KE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        }
      ]
    },
    potential: {
      id: "potential",
      title: "5.4 พลังงานศักย์",
      theory: `
        <h2>5.4 พลังงานศักย์ (Potential Energy)</h2>
        <p><b>พลังงานศักย์โน้มถ่วง ($PE_g$):</b> พลังงานสะสมเมื่อวัตถุอยู่สูงจากจุดอ้างอิง</p>
        <div class="formula-box">
          $$ PE = mgh $$
        </div>
        <p><b>พลังงานศักย์ยืดหยุ่น ($PE_s$):</b> พลังงานสะสมในสปริงที่ยืดหรือหดจากตำแหน่งสมดุล</p>
        <div class="formula-box">
          $$ PE = \\frac{1}{2}kx^2 $$
        </div>
        <p>เมื่อ $k$ คือค่านิจสปริง และ $x$ คือระยะยืด/หด การกำหนด <b>จุดอ้างอิง (reference point)</b> มีความสำคัญมาก</p>
        <br>
        <canvas id="simPotential" class="sim-canvas" style="position:relative; z-index:10; cursor:pointer;"></canvas>
        <p class="hint-box" style="margin-top:12px"><b>💡 Tips:</b> ลากวัตถุเปลี่ยนความสูง หรือกดสปริง เพื่อดูพลังงานศักย์เปลี่ยนตาม</p>
      `,
      problems: [
        {
          id: "pe1",
          text: "วัตถุมวล 5 kg อยู่สูงจากพื้นดิน 10 m จะมีพลังงานศักย์โน้มถ่วงเท่าใดเทียบกับพื้นดิน ($g = 10$ m/s²)",
          hints: "ใช้สูตร $PE = mgh$ แทนค่าโดยตรง",
          guide: `
            <div class="calc-steps">
              <div>1. $PE$</div><div>$=$</div><div>$mgh$</div>
              <div></div><div>$=$</div><div>$5 \times 10 \times 10$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="500">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 5$ kg, $h = 10$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe2",
          text: "ลูกบอลมวล 0.2 kg วางอยู่บนโต๊ะที่สูง 1.5 m จากพื้น พลังงานศักย์ของลูกบอลเทียบกับพื้นเป็นเท่าใด ($g = 10$ m/s²)",
          hints: "แทนค่าความสูงเทียบกับพื้น",
          guide: `
            <div class="calc-steps">
              <div>1. $PE$</div><div>$=$</div><div>$mgh$</div>
              <div></div><div>$=$</div><div>$0.2 \times 10 \times 1.5$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="3">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 0.2$ kg, $h = 1.5$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe3",
          text: "สปริงมีค่านิจ 200 N/m ถูกดึงให้ยืดออก 0.1 m จะมีพลังงานศักย์ยืดหยุ่นเท่าใด",
          hints: "ใช้สูตร $PE = \\frac{1}{2}kx^2$",
          guide: `
            <div class="calc-steps">
              <div>1. $PE$</div><div>$=$</div><div>$\frac{1}{2}kx^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 200 \times (0.1)^2$</div>
              <div></div><div>$=$</div><div>$100 \times 0.01$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="1">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $k = 200$ N/m, $x = 0.1$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe4",
          text: "วัตถุมวล 2 kg ตกจากที่สูง 5 m ลงมาถึงพื้นดิน พลังงานศักย์โน้มถ่วงเปลี่ยนแปลงไปเท่าใด ($g = 10$ m/s²)",
          hints: "ความสูงลดลง พลังงานศักย์ต้องติดลบ $\\Delta PE = mgh_f - mgh_i$",
          guide: `
            <div class="calc-steps">
              <div>1. $PE_i$</div><div>$=$</div><div>$mgh = 2 \times 10 \times 5 = 100\text{ J}$</div>
              <div>2. $PE_f$</div><div>$=$</div><div>$0\text{ J}$</div>
              <div>3. $\Delta PE$</div><div>$=$</div><div>$PE_f - PE_i$</div>
              <div></div><div>$=$</div><div>$0 - 100$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="-100">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 2$ kg, $h_i = 5$ m, $h_f = 0$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $\\Delta PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $\\Delta PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe5",
          text: "เด็กมวล 40 kg ปีนต้นไม้ขึ้นไปสูง 3 m พลังงานศักย์ของเด็กคนนี้เพิ่มขึ้นเท่าใด ($g = 10$ m/s²)",
          hints: "ใช้ $\\Delta PE = mg\\Delta h$",
          guide: `
            <div class="calc-steps">
              <div>1. $\Delta PE$</div><div>$=$</div><div>$mg\Delta h$</div>
              <div></div><div>$=$</div><div>$40 \times 10 \times 3$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="1200">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 40$ kg, $\\Delta h = 3$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $\\Delta PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $\\Delta PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe6",
          text: "กดสปริงที่มีค่านิจ 500 N/m ให้หดตัวลง 0.2 m พลังงานศักย์ในสปริงมีค่าเท่าใด",
          hints: "พลังงานศักย์ยืดหยุ่นคิดเหมือนการดึงยืด",
          guide: `
            <div class="calc-steps">
              <div>1. $PE$</div><div>$=$</div><div>$\frac{1}{2}kx^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 500 \times (0.2)^2$</div>
              <div></div><div>$=$</div><div>$250 \times 0.04$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="10">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $k = 500$ N/m, $x = 0.2$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe7",
          text: "วัตถุมวล 3 kg วางอยู่บนหลังคาตึกสูง 10 m โดยหลังคาตึกมีแท่นสูง 2 m วัตถุวางบนแท่นนี้ จงหาพลังงานศักย์ของวัตถุเทียบกับพื้นดิน ($g = 10$ m/s²)",
          hints: "ความสูงรวม = $10 + 2 = 12$ m",
          guide: `
            <div class="step">1. ความสูงจากพื้นดิน: $h = 10 + 2 \rightarrow h = 12\text{ m}$</div>
            <div class="calc-steps">
              <div>2. $PE$</div><div>$=$</div><div>$mgh$</div>
              <div></div><div>$=$</div><div>$3 \times 10 \times 12$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="360">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 3$ kg, $h = 12$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe8",
          text: "ลูกตุ้มมวล 0.5 kg แกว่งขึ้นไปได้สูงสุด 0.8 m จากจุดต่ำสุด พลังงานศักย์เพิ่มขึ้นสูงสุดเท่าใด ($g = 10$ m/s²)",
          hints: "จุดต่ำสุดเป็นจุดอ้างอิง $\\Delta h = 0.8$ m",
          guide: `
            <div class="calc-steps">
              <div>1. $\Delta PE$</div><div>$=$</div><div>$mg\Delta h$</div>
              <div></div><div>$=$</div><div>$0.5 \times 10 \times 0.8$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="4">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 0.5$ kg, $\\Delta h = 0.8$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $\\Delta PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $\\Delta PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe9",
          text: "สปริงเส้นหนึ่งเมื่อออกแรงดึงให้ยืด 0.3 m จะมีพลังงานศักย์เท่าใด ถ้าค่านิจสปริงคือ 100 N/m",
          hints: "แทนค่าสูตรพลังงานศักย์ยืดหยุ่น",
          guide: `
            <div class="calc-steps">
              <div>1. $PE$</div><div>$=$</div><div>$\frac{1}{2}kx^2$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2} \times 100 \times (0.3)^2$</div>
              <div></div><div>$=$</div><div>$50 \times 0.09$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="4.5">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $k = 100$ N/m, $x = 0.3$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "pe10",
          text: "ถังเก็บน้ำบรรจุน้ำมวล 500 kg อยู่สูงจากพื้น 20 m พลังงานศักย์ของน้ำในถังนี้เป็นเท่าใด ($g = 10$ m/s²)",
          hints: "แทนค่าสูตร $PE = mgh$",
          guide: `
            <div class="calc-steps">
              <div>1. $PE$</div><div>$=$</div><div>$mgh$</div>
              <div></div><div>$=$</div><div>$500 \times 10 \times 20$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="100000">&nbsp;J</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 500$ kg, $h = 20$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $PE =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        }
      ]
    },
    conservation: {
      id: "conservation",
      title: "5.5 การอนุรักษ์พลังงานกล",
      theory: `
        <h2>5.5 กฎการอนุรักษ์พลังงานกล (Conservation of Mechanical Energy)</h2>
        <p>หากไม่มีแรงภายนอก (เช่น แรงเสียดทาน หรือแรงลาก) มากระทำต่อระบบ พลังงานกลรวมของระบบจะคงที่เสมอ</p>
        <div class="formula-box">
          $$ KE_1 + PE_1 = KE_2 + PE_2 $$
        </div>
        <p>หรือสามารถเขียนกระจายได้เป็น:</p>
        <div class="formula-box">
          $$ \\frac{1}{2}mv_1^2 + mgh_1 = \\frac{1}{2}mv_2^2 + mgh_2 $$
        </div>
        <br>
        <canvas id="simConservation" class="sim-canvas" style="position:relative; z-index:10; cursor:grab;"></canvas>
        <p class="hint-box" style="margin-top:12px"><b>💡 Tips:</b> ลากลูกตุ้มแล้วปล่อย ดูพลังงานจลน์และพลังงานศักย์แลกกัน</p>
      `,
      problems: [
        {
          id: "ce1",
          text: "ปล่อยวัตถุให้ตกจากที่สูง 5 m เมื่อกระทบพื้นวัตถุจะมีความเร็วเท่าใด ($g = 10$ m/s²)",
          hints: "พลังงานศักย์ตอนเริ่ม = พลังงานจลน์ตอนกระทบพื้น",
          guide: `
            <div class="step">1. $mgh = \\frac{1}{2}mv^2$ (มวลตัดกัน)</div>
            <div class="calc-steps">
              <div>2. $v$</div><div>$=$</div><div>$\\sqrt{2gh}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{2 \\times 10 \\times 5}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{100}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="10">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $h = 5$ m, $v_1 = 0$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v_2 =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v_2 =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        },
        {
          id: "ce2",
          text: "โยนวัตถุขึ้นในแนวดิ่งด้วยความเร็ว 20 m/s วัตถุจะขึ้นไปได้สูงสุดเท่าใด ($g = 10$ m/s²)",
          hints: "พลังงานจลน์ตอนเริ่ม = พลังงานศักย์ที่จุดสูงสุด",
          guide: `
            <div class="step">1. $\\frac{1}{2}mv^2 = mgh$</div>
            <div class="calc-steps">
              <div>2. $h$</div><div>$=$</div><div>$\\frac{v^2}{2g}$</div>
              <div></div><div>$=$</div><div>$\\frac{20^2}{2 \\times 10}$</div>
              <div></div><div>$=$</div><div>$\\frac{400}{20}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="20">&nbsp;m</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $v_1 = 20$ m/s, ที่จุดสูงสุด $v_2 = 0$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $h_{max} =$ <input type="text" class="answer-input" style="width:120px"> m</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $h_{max} =$ <input type="text" class="answer-input" style="width:120px"> m</div>`
        },
        {
          id: "ce3",
          text: "วัตถุมวล 2 kg ไถลลงมาจากเนินสูง 10 m โดยไม่มีแรงเสียดทาน ความเร็วที่เชิงเนินเป็นเท่าใด ($g = 10$ m/s²)",
          hints: "ความเร็วเชิงเนินขึ้นกับความสูงเริ่มต้นเท่านั้น",
          guide: `
            <div class="calc-steps">
              <div>1. $v$</div><div>$=$</div><div>$\\sqrt{2gh}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{2 \\times 10 \\times 10}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{200}$</div>
              <div></div><div>$\\approx$</div><div><input type="text" class="answer-input" placeholder="14.14">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $h = 10$ m, ไถลจากหยุดนิ่ง</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        },
        {
          id: "ce4",
          text: "ลูกตุ้มยาว 1 m ถูกดึงให้เบนไปจนมีความสูง 0.5 m แล้วปล่อย ความเร็วที่จุดต่ำสุดเป็นเท่าใด ($g = 10$ m/s²)",
          hints: "ความยาวเชือกไม่เกี่ยว คิดแค่ความสูงที่เปลี่ยนไป",
          guide: `
            <div class="step">1. $mgh = \\frac{1}{2}mv^2$</div>
            <div class="calc-steps">
              <div>2. $v$</div><div>$=$</div><div>$\\sqrt{2gh}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{2 \\times 10 \\times 0.5}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{10}$</div>
              <div></div><div>$\\approx$</div><div><input type="text" class="answer-input" placeholder="3.16">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $h = 0.5$ m, ปล่อยจากหยุดนิ่ง</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        },
        {
          id: "ce5",
          text: "รถไฟเหาะปล่อยจากจุดหยุดนิ่งที่ความสูง 30 m ความเร็วของรถไฟเหาะที่จุดต่ำสุดเป็นเท่าใด ($g = 10$ m/s²)",
          hints: "ใช้ $v = \\sqrt{2gh}$ ได้เลย",
          guide: `
            <div class="calc-steps">
              <div>1. $v$</div><div>$=$</div><div>$\\sqrt{2gh}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{2 \\times 10 \\times 30}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{600}$</div>
              <div></div><div>$\\approx$</div><div><input type="text" class="answer-input" placeholder="24.5">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $h = 30$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        },
        {
          id: "ce6",
          text: "ให้วัตถุไถลขึ้นพื้นเอียงลื่นด้วยความเร็วต้น 6 m/s วัตถุจะขึ้นไปได้สูงสุดเท่าใดในแนวดิ่ง ($g = 10$ m/s²)",
          hints: "พลังงานจลน์เปลี่ยนเป็นพลังงานศักย์",
          guide: `
            <div class="step">1. $\\frac{1}{2}mv^2 = mgh$</div>
            <div class="calc-steps">
              <div>2. $h$</div><div>$=$</div><div>$\\frac{v^2}{2g}$</div>
              <div></div><div>$=$</div><div>$\\frac{6^2}{2 \\times 10}$</div>
              <div></div><div>$=$</div><div>$\\frac{36}{20}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="1.8">&nbsp;m</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $v = 6$ m/s, ที่จุดสูงสุด $v=0$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $h =$ <input type="text" class="answer-input" style="width:120px"> m</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $h =$ <input type="text" class="answer-input" style="width:120px"> m</div>`
        },
        {
          id: "ce7",
          text: "อัดสปริงแนวดิ่ง (k=200 N/m) เป็นระยะ 0.1 m แล้ววางวัตถุ 0.1 kg ไว้ข้างบน เมื่อปล่อยสปริง วัตถุจะพุ่งขึ้นสูงสุดกี่เมตรจากจุดที่ปล่อย ($g = 10$ m/s²)",
          hints: "พลังงานศักย์สปริง = พลังงานศักย์โน้มถ่วง $\\frac{1}{2}kx^2 = mgh$",
          guide: `
            <div class="step">1. กฎการอนุรักษ์พลังงาน: $\frac{1}{2}kx^2 = mgh$</div>
            <div class="calc-steps">
              <div>2. $h$</div><div>$=$</div><div>$\frac{\frac{1}{2}kx^2}{mg}$</div>
              <div></div><div>$=$</div><div>$\frac{\frac{1}{2}(200)(0.1)^2}{(0.1)(10)}$</div>
              <div></div><div>$=$</div><div>$\frac{100 \times 0.01}{1}$</div>
              <div></div><div>$=$</div><div>$\frac{1}{1}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="1">&nbsp;m</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $k = 200$ N/m, $x = 0.1$ m, $m = 0.1$ kg</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $h =$ <input type="text" class="answer-input" style="width:120px"> m</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $h =$ <input type="text" class="answer-input" style="width:120px"> m</div>`
        },
        {
          id: "ce8",
          text: "น้ำตกสูง 45 m ถ้าน้ำตกลงมาโดยไม่มีแรงเสียดทาน ความเร็วของน้ำที่กระทบผิวน้ำด้านล่างเป็นเท่าใด ($g = 10$ m/s²)",
          hints: "$v = \\sqrt{2gh}$",
          guide: `
            <div class="calc-steps">
              <div>1. $v$</div><div>$=$</div><div>$\\sqrt{2gh}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{2 \\times 10 \\times 45}$</div>
              <div></div><div>$=$</div><div>$\\sqrt{900}$</div>
              <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="30">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $h = 45$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        },
        {
          id: "ce9",
          text: "โยนลูกบอล 0.5 kg ขึ้นด้วยความเร็ว 10 m/s จากพื้นดิน ที่ความสูง 3 m ลูกบอลมีความเร็วเท่าใด ($g = 10$ m/s²)",
          hints: "พลังงานรวมเริ่มต้น = พลังงานรวมที่ความสูง 3 m",
          guide: `
            <div class="step">1. กฎการอนุรักษ์พลังงานกล: $\frac{1}{2}mv_1^2 = \frac{1}{2}mv_2^2 + mgh$ (มวล $m$ ตัดกัน)</div>
            <div class="calc-steps">
              <div>2. $\frac{1}{2}v_2^2$</div><div>$=$</div><div>$\frac{1}{2}v_1^2 - gh$</div>
              <div></div><div>$=$</div><div>$\frac{1}{2}(10^2) - 10(3)$</div>
              <div></div><div>$=$</div><div>$50 - 30$</div>
              <div></div><div>$=$</div><div>$20$</div>
              <div>3. $v_2$</div><div>$=$</div><div>$\sqrt{40}$</div>
              <div></div><div>$\approx$</div><div><input type="text" class="answer-input" placeholder="6.32">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $v_1 = 10$ m/s, $h_1 = 0$, $h_2 = 3$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v_2 =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v_2 =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        },
        {
          id: "ce10",
          text: "กดสปริงแนวราบ (k=500 N/m) เข้าไป 0.2 m โดยมีก้อนมวล 1 kg อยู่ด้านหน้า เมื่อปล่อยสปริง ก้อนมวลจะหลุดออกไปด้วยความเร็วเท่าใด",
          hints: "พลังงานศักย์ยืดหยุ่นเปลี่ยนเป็นพลังงานจลน์",
          guide: `
            <div class="step">1. $\frac{1}{2}kx^2 = \frac{1}{2}mv^2$</div>
            <div class="calc-steps">
              <div>2. $v^2$</div><div>$=$</div><div>$\frac{kx^2}{m}$</div>
              <div></div><div>$=$</div><div>$\frac{500 \times (0.2)^2}{1}$</div>
              <div></div><div>$=$</div><div>$500 \times 0.04$</div>
              <div></div><div>$=$</div><div>$20$</div>
              <div>3. $v$</div><div>$=$</div><div>$\sqrt{20}$</div>
              <div></div><div>$\approx$</div><div><input type="text" class="answer-input" placeholder="4.47">&nbsp;m/s</div>
            </div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $k = 500$ N/m, $x = 0.2$ m, $m = 1$ kg</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $v =$ <input type="text" class="answer-input" style="width:120px"> m/s</div>`
        }
      ]
    }
  }
};
