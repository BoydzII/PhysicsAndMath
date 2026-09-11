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
            <div class="step">1. จากสมการของงาน: $$ W = F s \\cos \\theta $$</div>
            <div class="step">2. แทนค่า: $F =$ <input type="text" class="answer-input" placeholder="20"> N, $s =$ <input type="text" class="answer-input" placeholder="4"> m, $\\cos 37^\\circ =$ <input type="text" class="answer-input" placeholder="0.8"></div>
            <div class="step">3. $W = 20 \\times 4 \\times 0.8 =$ <input type="text" class="answer-input" placeholder="64"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 20$ N, $s = 4$ m, $\\theta = 37^\\circ$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w2",
          text: "ชายคนหนึ่งแบกของมวล 10 kg เดินไปข้างหน้าในแนวระดับเป็นระยะทาง 5 m จากนั้นเดินขึ้นบันไดสูง 3 m งานที่ชายคนนี้ทำทั้งหมดมีค่าเท่าใด ($g = 10$ m/s²)",
          hints: "งานในการเดินแนวราบเป็นศูนย์ เพราะแรงแบกชี้ขึ้นตั้งฉากกับการกระจัด",
          guide: `
            <div class="step">1. งานตอนเดินพื้นราบ: $\\theta = 90^\\circ \\rightarrow W_1 = 0$ J</div>
            <div class="step">2. งานตอนเดินขึ้นบันได: $F = mg = 10 \\times 10 = 100$ N, $s =$ <input type="text" class="answer-input" placeholder="3"> m</div>
            <div class="step">3. $W = 100 \\times 3 =$ <input type="text" class="answer-input" placeholder="300"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 10$ kg, $s_1 = 5$ m (แนวราบ), $s_2 = 3$ m (แนวดิ่ง)</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W_{รวม} =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W_{รวม} =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w3",
          text: "วัตถุมวล 2 kg ตกจากที่สูง 5 m ลงสู่พื้นดิน จงหางานที่ทำโดยแรงโน้มถ่วง ($g = 10$ m/s²)",
          hints: "แรงโน้มถ่วงมีทิศลง และวัตถุตกลงมาทิศเดียวกัน ดังนั้นมุม $\\theta = 0^\\circ$",
          guide: `
            <div class="step">1. $F = mg = 2 \\times 10 = 20$ N</div>
            <div class="step">2. $s = 5$ m ทิศเดียวกับแรง</div>
            <div class="step">3. $W = Fs = 20 \\times 5 =$ <input type="text" class="answer-input" placeholder="100"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 2$ kg, $s = 5$ m, ทิศเดียวกับแรง</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w4",
          text: "ออกแรงผลักรถยนต์ 500 N ให้เคลื่อนที่ไปบนถนนราบได้ระยะทาง 10 m งานที่ทำเป็นเท่าใด",
          hints: "ทิศแรงผลักและการเคลื่อนที่ไปทางเดียวกัน $\\theta = 0^\\circ$",
          guide: `<div class="step">1. $W = Fs = 500 \\times 10 =$ <input type="text" class="answer-input" placeholder="5000"> J</div>`,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 500$ N, $s = 10$ m, $\\theta = 0^\\circ$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w5",
          text: "ชายคนหนึ่งหิ้วกระเป๋าหนัก 40 N เดินไปข้างหน้าบนพื้นราบระยะทาง 10 m งานที่ชายคนนี้ทำมีค่าเท่าใด",
          hints: "แรงที่หิ้วกระเป๋ามีทิศขึ้นบน แต่ทิศการเคลื่อนที่ไปข้างหน้า มุม $90^\\circ$",
          guide: `
            <div class="step">1. แรงหิ้ว (ขึ้น) ตั้งฉากกับการกระจัด (ราบ) $\\theta = 90^\\circ$</div>
            <div class="step">2. $\\cos 90^\\circ = 0$</div>
            <div class="step">3. $W =$ <input type="text" class="answer-input" placeholder="0"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 40$ N (แนวดิ่ง), $s = 10$ m (แนวราบ)</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w6",
          text: "เด็กคนหนึ่งลากของเล่นด้วยแรง 50 N ทำมุม $60^\\circ$ กับแนวราบ ไปได้ไกล 8 m จงหางาน ($\\cos 60^\\circ = 0.5$)",
          hints: "แตกแรง 50 N เข้าสู่แนวราบ ($F \\cos 60^\\circ$) แล้วคูณระยะทาง",
          guide: `
            <div class="step">1. $W = Fs\\cos\\theta$</div>
            <div class="step">2. $W = 50 \\times 8 \\times 0.5 =$ <input type="text" class="answer-input" placeholder="200"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 50$ N, $s = 8$ m, $\\theta = 60^\\circ$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w7",
          text: "วัตถุมวล 4 kg ไถลลงมาตามพื้นเอียงจากจุดที่มีความสูง 3 m จงหางานของแรงโน้มถ่วง ($g = 10$ m/s²)",
          hints: "งานของแรงโน้มถ่วงคิดจาก $mgh$ ได้โดยตรง",
          guide: `
            <div class="step">1. $F = mg = 4 \\times 10 = 40$ N</div>
            <div class="step">2. การกระจัดแนวดิ่ง $h = 3$ m</div>
            <div class="step">3. $W = mgh = 40 \\times 3 =$ <input type="text" class="answer-input" placeholder="120"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 4$ kg, $h = 3$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w8",
          text: "ชายคนหนึ่งออกแรงผลักตู้ด้วยแรง 100 N แต่ตู้ไม่ขยับเลย เป็นเวลา 10 วินาที งานที่ทำเป็นเท่าใด",
          hints: "งานเกิดจากการกระจัด ถ้าระยะทางเป็นศูนย์ งานจะเป็นศูนย์เสมอ",
          guide: `
            <div class="step">1. $F = 100$ N แต่ $s = 0$ m</div>
            <div class="step">2. $W = Fs = 100 \\times 0 =$ <input type="text" class="answer-input" placeholder="0"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 100$ N, $s = 0$ m</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w9",
          text: "เครื่องยนต์ของรถเครนยกของมวล 500 kg ขึ้นในแนวดิ่งด้วยความเร็วคงที่เป็นระยะทาง 10 m งานที่เครื่องยนต์ทำเป็นเท่าใด ($g = 10$ m/s²)",
          hints: "ดึงขึ้นด้วยความเร็วคงที่ แปลว่า $F = mg$",
          guide: `
            <div class="step">1. $F = mg = 500 \\times 10 = 5000$ N</div>
            <div class="step">2. $W = Fs = 5000 \\times 10 =$ <input type="text" class="answer-input" placeholder="50000"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 500$ kg, $s = 10$ m, $F = mg$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "w10",
          text: "ลากของเล่นด้วยแรง 30 N ทำมุม $45^\\circ$ กับแนวราบ ไปได้ไกล 10 m จงหางาน ($\\cos 45^\\circ = 0.707$)",
          hints: "แตกแรงเข้าสู่แนวราบ ($F \\cos 45^\\circ$)",
          guide: `
            <div class="step">1. $W = Fs\\cos\\theta$</div>
            <div class="step">2. $W = 30 \\times 10 \\times 0.707 =$ <input type="text" class="answer-input" placeholder="212.1"> J</div>
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
            <div class="step">1. $P = \\frac{W}{t}$</div>
            <div class="step">2. $W = 3000$ J, $t = 10$ s</div>
            <div class="step">3. $P = \\frac{3000}{10} =$ <input type="text" class="answer-input" placeholder="300"> W</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $W = 3000$ J, $t = 10$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        },
        {
          id: "p2",
          text: "ชายคนหนึ่งออกแรง 150 N ผลักรถให้เคลื่อนที่ไปได้ระยะทาง 20 m ในเวลา 5 วินาที ชายคนนี้ใช้กำลังเท่าใด",
          hints: "หางาน $W$ ก่อน จากนั้นนำมาหารด้วยเวลา $t$",
          guide: `
            <div class="step">1. $W = Fs = 150 \\times 20 = 3000$ J</div>
            <div class="step">2. $P = \\frac{3000}{5} =$ <input type="text" class="answer-input" placeholder="600"> W</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 150$ N, $s = 20$ m, $t = 5$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        },
        {
          id: "p3",
          text: "มอเตอร์เครื่องหนึ่งดึงลิฟต์มวล 1,000 kg ขึ้นไปสูง 15 m ในเวลา 10 วินาที ด้วยความเร็วคงที่ มอเตอร์นี้มีกำลังเท่าใด ($g = 10$ m/s²)",
          hints: "ลิฟต์ขึ้นความเร็วคงที่ $F = mg$ จากนั้นใช้ $P = Fs/t$",
          guide: `
            <div class="step">1. $F = mg = 1000 \\times 10 = 10000$ N</div>
            <div class="step">2. $W = 10000 \\times 15 = 150000$ J</div>
            <div class="step">3. $P = \\frac{150000}{10} =$ <input type="text" class="answer-input" placeholder="15000"> W</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $m = 1000$ kg, $s = 15$ m, $t = 10$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        },
        {
          id: "p4",
          text: "รถยนต์คันหนึ่งมีกำลัง 50,000 W กำลังแล่นด้วยความเร็วคงที่ 20 m/s แรงขับเคลื่อนของเครื่องยนต์มีค่าเท่าใด",
          hints: "ใช้สมการ $P = Fv$ ย้ายข้างหา $F$",
          guide: `
            <div class="step">1. $P = Fv \\rightarrow F = \\frac{P}{v}$</div>
            <div class="step">2. $F = \\frac{50000}{20} =$ <input type="text" class="answer-input" placeholder="2500"> N</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $P = 50000$ W, $v = 20$ m/s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $F =$ <input type="text" class="answer-input" style="width:120px"> N</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $F =$ <input type="text" class="answer-input" style="width:120px"> N</div>`
        },
        {
          id: "p5",
          text: "ปั้นจั่นเครื่องหนึ่งยกของหนัก 2,000 N ขึ้นสูง 5 m ในเวลา 4 s ถ้านำไปยกของหนัก 4,000 N ขึ้นสูงเท่าเดิม ปั้นจั่นนี้จะใช้เวลาเท่าใด (สมมติใช้กำลังเต็มที่เท่าเดิม)",
          hints: "หากำลังจากกรณีแรกก่อน แล้วนำกำลังนั้นไปคิดหาเวลาในกรณีที่สอง",
          guide: `
            <div class="step">1. $P = \\frac{2000 \\times 5}{4} = 2500$ W</div>
            <div class="step">2. $2500 = \\frac{4000 \\times 5}{t_2}$</div>
            <div class="step">3. $t_2 = \\frac{20000}{2500} =$ <input type="text" class="answer-input" placeholder="8"> s</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> ครั้งที่ 1: $F_1=2000, s=5, t_1=4$, ครั้งที่ 2: $F_2=4000, s=5$</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $t_2 =$ <input type="text" class="answer-input" style="width:120px"> s</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $t_2 =$ <input type="text" class="answer-input" style="width:120px"> s</div>`
        },
        {
          id: "p6",
          text: "หลอดไฟดวงหนึ่งมีกำลัง 100 W ถ้าเปิดทิ้งไว้ 2 ชั่วโมง จะใช้พลังงานไฟฟ้าไปกี่จูล",
          hints: "งาน $W = P \\times t$ แต่ต้องเปลี่ยนเวลาเป็นวินาทีก่อน",
          guide: `
            <div class="step">1. $t = 2 \\times 3600 = 7200$ s</div>
            <div class="step">2. $W = Pt = 100 \\times 7200 =$ <input type="text" class="answer-input" placeholder="720000"> J</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $P = 100$ W, $t = 2$ ชั่วโมง</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $W =$ <input type="text" class="answer-input" style="width:120px"> J</div>`
        },
        {
          id: "p7",
          text: "เด็กคนหนึ่งวิ่งขึ้นบันไดสูง 4 m ภายในเวลา 5 วินาที ถ้าเด็กคนนี้มีน้ำหนัก 400 N กำลังที่ใช้เป็นเท่าใด",
          hints: "แรงพยุงตัว = น้ำหนักตัว ($F = 400$ N)",
          guide: `
            <div class="step">1. $W = Fh = 400 \\times 4 = 1600$ J</div>
            <div class="step">2. $P = \\frac{1600}{5} =$ <input type="text" class="answer-input" placeholder="320"> W</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F = 400$ N, $s = 4$ m, $t = 5$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        },
        {
          id: "p8",
          text: "รถม้าถูกดึงด้วยม้า 2 ตัว แต่ละตัวออกแรง 500 N วิ่งไปข้างหน้าด้วยความเร็วคงที่ 10 m/s ม้าทั้งสองตัวใช้กำลังรวมกันกี่ kW",
          hints: "แรงรวม $F = 500 \\times 2 = 1000$ N แล้วใช้ $P = Fv$ อย่าลืมแปลง kW",
          guide: `
            <div class="step">1. $F = 500 + 500 = 1000$ N</div>
            <div class="step">2. $P = Fv = 1000 \\times 10 = 10000$ W</div>
            <div class="step">3. แปลง: $10000 / 1000 =$ <input type="text" class="answer-input" placeholder="10"> kW</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $F_{รวม} = 1000$ N, $v = 10$ m/s (ถาม kW)</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> kW</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> kW</div>`
        },
        {
          id: "p9",
          text: "เครื่องยนต์ 10 kW สามารถยกของมวล 500 kg ขึ้นไปได้สูงเท่าใดในเวลา 20 วินาที ($g = 10$ m/s²)",
          hints: "แปลง 10 kW = 10,000 W แล้วใช้ $P = \\frac{mgh}{t}$ หา h",
          guide: `
            <div class="step">1. $P = 10000$ W, $mg = 500 \\times 10 = 5000$ N</div>
            <div class="step">2. $10000 = \\frac{5000h}{20} \\rightarrow h = \\frac{10000 \\times 20}{5000}$</div>
            <div class="step">3. $h =$ <input type="text" class="answer-input" placeholder="40"> m</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> $P = 10000$ W, $m = 500$ kg, $t = 20$ s</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $h =$ <input type="text" class="answer-input" style="width:120px"> m</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $h =$ <input type="text" class="answer-input" style="width:120px"> m</div>`
        },
        {
          id: "p10",
          text: "น้ำตกแห่งหนึ่งมีน้ำไหลตกลงมาด้วยอัตรา 2,000 kg/s จากความสูง 50 m ถ้านำพลังงานน้ำมาผลิตไฟฟ้าได้ 80% จะมีกำลังการผลิตเท่าใด ($g = 10$ m/s²)",
          hints: "กำลังทั้งหมด $P = (\\frac{m}{t})gh$ จากนั้นคิดเพียง 80%",
          guide: `
            <div class="step">1. $P = 2000 \\times 10 \\times 50 = 1{,}000{,}000$ W</div>
            <div class="step">2. ผลิตได้ 80%: $P = 1000000 \\times 0.8 = 800{,}000$ W</div>
            <div class="step">3. $=$ <input type="text" class="answer-input" placeholder="800000"> W หรือ 800 kW</div>
          `,
          intermediateHtml: `<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> อัตราการไหล $= 2000$ kg/s, $h = 50$ m, ประสิทธิภาพ 80%</div><div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`,
          advancedHtml: `<div style="margin-top:20px;font-weight:bold;">ตอบ: $P =$ <input type="text" class="answer-input" style="width:120px"> W</div>`
        }
      ]
    }
  }
};
