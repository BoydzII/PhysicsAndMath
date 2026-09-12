// data_ch7_challenge.js
Object.assign(physicsData.topics, {
  ch7_challenge: {
    id: "ch7_challenge",
    title: "🏆 แบบฝึกหัดท้าทาย บทที่ 7",
    theory: `<h3>แบบฝึกหัดท้าทายท้ายบท</h3><p>รวบรวมโจทย์ตั้งแต่ระดับพื้นฐานจนถึงระดับประยุกต์...</p>`,
    problems: [
      {
        id: `ch7_c1`,
        text: `โจทย์โปรเจกไทล์ข้อ 1 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 10 m/s จงหาระยะตกสูงสุด <br><svg width='200' height='100'><rect x='10' y='80' width='20' height='20' fill='gray'/><circle cx='30' cy='80' r='5' fill='black'/><path d='M 30 80 Q 100 20 180 80' stroke='blue' fill='transparent' stroke-dasharray='5,5'/></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$S_x = \\frac{(10)^2 \\sin(90)}{10} = 100$ m</div>`,
        intermediateHtml: `$u = 10$ m/s <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c2`,
        text: `โจทย์โปรเจกไทล์ข้อ 2 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 20 m/s จงหาระยะตกสูงสุด <br><svg width='200' height='100'><rect x='10' y='80' width='20' height='20' fill='gray'/><circle cx='30' cy='80' r='5' fill='black'/><path d='M 30 80 Q 100 20 180 80' stroke='blue' fill='transparent' stroke-dasharray='5,5'/></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$S_x = \\frac{(20)^2 \\sin(90)}{10} = 400$ m</div>`,
        intermediateHtml: `$u = 20$ m/s <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c3`,
        text: `โจทย์โปรเจกไทล์ข้อ 3 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 30 m/s จงหาระยะตกสูงสุด <br><svg width='200' height='100'><rect x='10' y='80' width='20' height='20' fill='gray'/><circle cx='30' cy='80' r='5' fill='black'/><path d='M 30 80 Q 100 20 180 80' stroke='blue' fill='transparent' stroke-dasharray='5,5'/></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$S_x = \\frac{(30)^2 \\sin(90)}{10} = 900$ m</div>`,
        intermediateHtml: `$u = 30$ m/s <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c4`,
        text: `โจทย์โปรเจกไทล์ข้อ 4 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 40 m/s จงหาระยะตกสูงสุด <br><svg width='200' height='100'><rect x='10' y='80' width='20' height='20' fill='gray'/><circle cx='30' cy='80' r='5' fill='black'/><path d='M 30 80 Q 100 20 180 80' stroke='blue' fill='transparent' stroke-dasharray='5,5'/></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$S_x = \\frac{(40)^2 \\sin(90)}{10} = 1600$ m</div>`,
        intermediateHtml: `$u = 40$ m/s <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c5`,
        text: `โจทย์โปรเจกไทล์ข้อ 5 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 50 m/s จงหาระยะตกสูงสุด <br><svg width='200' height='100'><rect x='10' y='80' width='20' height='20' fill='gray'/><circle cx='30' cy='80' r='5' fill='black'/><path d='M 30 80 Q 100 20 180 80' stroke='blue' fill='transparent' stroke-dasharray='5,5'/></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$S_x = \\frac{(50)^2 \\sin(90)}{10} = 2500$ m</div>`,
        intermediateHtml: `$u = 50$ m/s <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c6`,
        text: `โจทย์วงกลมข้อ 1 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 1 m ด้วยความเร็ว 2 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$a_c = \\frac{(2)^2}{1} = 4$ m/s$^2$</div>`,
        intermediateHtml: `$v = 2, r = 1$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c7`,
        text: `โจทย์วงกลมข้อ 2 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 2 m ด้วยความเร็ว 4 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$a_c = \\frac{(4)^2}{2} = 8$ m/s$^2$</div>`,
        intermediateHtml: `$v = 4, r = 2$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c8`,
        text: `โจทย์วงกลมข้อ 3 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 3 m ด้วยความเร็ว 6 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$a_c = \\frac{(6)^2}{3} = 12$ m/s$^2$</div>`,
        intermediateHtml: `$v = 6, r = 3$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c9`,
        text: `โจทย์วงกลมข้อ 4 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 4 m ด้วยความเร็ว 8 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$a_c = \\frac{(8)^2}{4} = 16$ m/s$^2$</div>`,
        intermediateHtml: `$v = 8, r = 4$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c10`,
        text: `โจทย์วงกลมข้อ 5 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 5 m ด้วยความเร็ว 10 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$a_c = \\frac{(10)^2}{5} = 20$ m/s$^2$</div>`,
        intermediateHtml: `$v = 10, r = 5$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c11`,
        text: `โจทย์ SHM ข้อ 1 สปริงมีค่าคงที่ k = 100 N/m ติดมวล m = 1 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$T = 2\\pi\\sqrt{\\frac{1}{100}} = 0.2\\pi$ s</div>`,
        intermediateHtml: `$k = 100, m = 1$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c12`,
        text: `โจทย์ SHM ข้อ 2 สปริงมีค่าคงที่ k = 200 N/m ติดมวล m = 2 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$T = 2\\pi\\sqrt{\\frac{2}{200}} = 0.2\\pi$ s</div>`,
        intermediateHtml: `$k = 200, m = 2$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c13`,
        text: `โจทย์ SHM ข้อ 3 สปริงมีค่าคงที่ k = 300 N/m ติดมวล m = 3 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$T = 2\\pi\\sqrt{\\frac{3}{300}} = 0.2\\pi$ s</div>`,
        intermediateHtml: `$k = 300, m = 3$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c14`,
        text: `โจทย์ SHM ข้อ 4 สปริงมีค่าคงที่ k = 400 N/m ติดมวล m = 4 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$T = 2\\pi\\sqrt{\\frac{4}{400}} = 0.2\\pi$ s</div>`,
        intermediateHtml: `$k = 400, m = 4$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c15`,
        text: `โจทย์ SHM ข้อ 5 สปริงมีค่าคงที่ k = 500 N/m ติดมวล m = 5 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$T = 2\\pi\\sqrt{\\frac{5}{500}} = 0.2\\pi$ s</div>`,
        intermediateHtml: `$k = 500, m = 5$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c16`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 20 m ด้วยความเร็วในแนวราบ 5 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$t = \\sqrt{\\frac{2h}{g}} = 2$ s, $S_x = ut = 10$ m</div>`,
        intermediateHtml: `$h = 20, u_x = 5$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c17`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 40 m ด้วยความเร็วในแนวราบ 10 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$t = \\sqrt{\\frac{2h}{g}} = 2.82$ s, $S_x = ut = 28.2$ m</div>`,
        intermediateHtml: `$h = 40, u_x = 10$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c18`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 60 m ด้วยความเร็วในแนวราบ 15 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$t = \\sqrt{\\frac{2h}{g}} = 3.46$ s, $S_x = ut = 51.9$ m</div>`,
        intermediateHtml: `$h = 60, u_x = 15$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c19`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 80 m ด้วยความเร็วในแนวราบ 20 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$t = \\sqrt{\\frac{2h}{g}} = 4$ s, $S_x = ut = 80$ m</div>`,
        intermediateHtml: `$h = 80, u_x = 20$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c20`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 100 m ด้วยความเร็วในแนวราบ 25 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$t = \\sqrt{\\frac{2h}{g}} = 4.48$ s, $S_x = ut = 112.00000000000001$ m</div>`,
        intermediateHtml: `$h = 100, u_x = 25$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c21`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 1 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width='150' height='150'><line x1='75' y1='10' x2='100' y2='100' stroke='black'/><circle cx='100' cy='100' r='10' fill='red'/><path d='M 75 10 L 75 120' stroke='gray' stroke-dasharray='3,3'/></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$T = \\frac{mg}{\\cos 30^\\circ} = \\frac{10}{\\frac{\\sqrt{3}}{2}}$ N</div>`,
        intermediateHtml: `$m = 1, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c22`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 2 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width='150' height='150'><line x1='75' y1='10' x2='100' y2='100' stroke='black'/><circle cx='100' cy='100' r='10' fill='red'/><path d='M 75 10 L 75 120' stroke='gray' stroke-dasharray='3,3'/></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$T = \\frac{mg}{\\cos 30^\\circ} = \\frac{20}{\\frac{\\sqrt{3}}{2}}$ N</div>`,
        intermediateHtml: `$m = 2, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c23`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 3 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width='150' height='150'><line x1='75' y1='10' x2='100' y2='100' stroke='black'/><circle cx='100' cy='100' r='10' fill='red'/><path d='M 75 10 L 75 120' stroke='gray' stroke-dasharray='3,3'/></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$T = \\frac{mg}{\\cos 30^\\circ} = \\frac{30}{\\frac{\\sqrt{3}}{2}}$ N</div>`,
        intermediateHtml: `$m = 3, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c24`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 4 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width='150' height='150'><line x1='75' y1='10' x2='100' y2='100' stroke='black'/><circle cx='100' cy='100' r='10' fill='red'/><path d='M 75 10 L 75 120' stroke='gray' stroke-dasharray='3,3'/></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$T = \\frac{mg}{\\cos 30^\\circ} = \\frac{40}{\\frac{\\sqrt{3}}{2}}$ N</div>`,
        intermediateHtml: `$m = 4, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c25`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 5 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width='150' height='150'><line x1='75' y1='10' x2='100' y2='100' stroke='black'/><circle cx='100' cy='100' r='10' fill='red'/><path d='M 75 10 L 75 120' stroke='gray' stroke-dasharray='3,3'/></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$T = \\frac{mg}{\\cos 30^\\circ} = \\frac{50}{\\frac{\\sqrt{3}}{2}}$ N</div>`,
        intermediateHtml: `$m = 5, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c26`,
        text: `รถไฟเหาะ (Roller coaster) มวล 100 kg ตีลังกาวงกลมรัศมี 5 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width='200' height='200'><circle cx='100' cy='100' r='80' stroke='black' fill='transparent' stroke-width='3'/><rect x='85' y='10' width='30' height='20' fill='blue'/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$v = \\sqrt{gR} = \\sqrt{10 \\times 5}$ m/s</div>`,
        intermediateHtml: `$R = 5$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c27`,
        text: `รถไฟเหาะ (Roller coaster) มวล 200 kg ตีลังกาวงกลมรัศมี 10 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width='200' height='200'><circle cx='100' cy='100' r='80' stroke='black' fill='transparent' stroke-width='3'/><rect x='85' y='10' width='30' height='20' fill='blue'/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$v = \\sqrt{gR} = \\sqrt{10 \\times 10}$ m/s</div>`,
        intermediateHtml: `$R = 10$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c28`,
        text: `รถไฟเหาะ (Roller coaster) มวล 300 kg ตีลังกาวงกลมรัศมี 15 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width='200' height='200'><circle cx='100' cy='100' r='80' stroke='black' fill='transparent' stroke-width='3'/><rect x='85' y='10' width='30' height='20' fill='blue'/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$v = \\sqrt{gR} = \\sqrt{10 \\times 15}$ m/s</div>`,
        intermediateHtml: `$R = 15$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c29`,
        text: `รถไฟเหาะ (Roller coaster) มวล 400 kg ตีลังกาวงกลมรัศมี 20 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width='200' height='200'><circle cx='100' cy='100' r='80' stroke='black' fill='transparent' stroke-width='3'/><rect x='85' y='10' width='30' height='20' fill='blue'/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$v = \\sqrt{gR} = \\sqrt{10 \\times 20}$ m/s</div>`,
        intermediateHtml: `$R = 20$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c30`,
        text: `รถไฟเหาะ (Roller coaster) มวล 500 kg ตีลังกาวงกลมรัศมี 25 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width='200' height='200'><circle cx='100' cy='100' r='80' stroke='black' fill='transparent' stroke-width='3'/><rect x='85' y='10' width='30' height='20' fill='blue'/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$v = \\sqrt{gR} = \\sqrt{10 \\times 25}$ m/s</div>`,
        intermediateHtml: `$R = 25$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c31`,
        text: `โจทย์ประยุกต์ข้อ 1: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 1 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c32`,
        text: `โจทย์ประยุกต์ข้อ 2: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 2 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c33`,
        text: `โจทย์ประยุกต์ข้อ 3: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 3 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c34`,
        text: `โจทย์ประยุกต์ข้อ 4: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 4 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c35`,
        text: `โจทย์ประยุกต์ข้อ 5: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 5 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c36`,
        text: `โจทย์ประยุกต์ข้อ 6: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 6 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c37`,
        text: `โจทย์ประยุกต์ข้อ 7: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 7 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c38`,
        text: `โจทย์ประยุกต์ข้อ 8: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 8 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c39`,
        text: `โจทย์ประยุกต์ข้อ 9: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 9 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c40`,
        text: `โจทย์ประยุกต์ข้อ 10: วัตถุถูกยิงจากรถที่กำลังเคลื่อนที่ด้วยความเร็ว 10 m/s เป็นโปรเจกไทล์และตกลงบนพื้นเอียงมุม 30 องศา จงหาระยะทางบนพื้นเอียง`,
        hints: `ใช้สมการการเคลื่อนที่สัมพัทธ์และโปรเจกไทล์บนพื้นเอียง`,
        guide: `<div class='step'>แก้สมการแกน $x, y$ ตามแนวพื้นเอียง</div>`,
        intermediateHtml: `$u_{rel}, \\theta$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      }
    ]
  }
});
