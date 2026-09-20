// data_ch7_challenge.js
Object.assign(physicsData.topics, {
  ch7_challenge: {
    id: "ch7_challenge",
    title: "🏆 แบบฝึกหัดท้าทาย บทที่ 7",
    theory: `<h3>แบบฝึกหัดท้าทายท้ายบท</h3><p>รวบรวมโจทย์ตั้งแต่ระดับพื้นฐานจนถึงระดับประยุกต์...</p>`,
    problems: [
      {
        id: `ch7_c1`,
        text: `โจทย์โปรเจกไทล์ข้อ 1 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 10 m/s จงหาระยะตกสูงสุด <br><svg width="240" height="150" viewBox="0 0 240 150"><line x1="8" y1="112.0" x2="234" y2="112.0" stroke="#334155" stroke-width="2"/><path d="M 34.0 112.0 Q 122.0 24.0 210.0 112.0" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="6 4"/><g transform="translate(34.0,112.0) rotate(-45)"><rect x="-4" y="-7" width="40" height="14" rx="4" fill="#334155"/></g><circle cx="34.0" cy="112.0" r="9" fill="#475569"/><line x1="40.0" y1="106.0" x2="86.0" y2="60.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="86.0,60.0 82.6,68.3 77.7,63.4" fill="#dc2626"/><text x="96.0" y="60.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">u</text><path d="M 64.0 112.0 A 30 30 0 0 0 55.0 91.0" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="68.0" y="102.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">45°</text><line x1="34.0" y1="130.0" x2="210.0" y2="130.0" stroke="#16a34a" stroke-width="1.5"/><polygon points="34.0,130.0 42.0,126.0 42.0,134.0" fill="#16a34a"/><polygon points="210.0,130.0 202.0,126.0 202.0,134.0" fill="#16a34a"/><text x="122.0" y="146.0" font-size="11" fill="#15803d" text-anchor="middle" font-weight="bold">ระยะตก R</text></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    S_x &= \\frac{(10)^2 \\sin(90)}{10}\\\\
    &= 100\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$u = 10 m/s$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c2`,
        text: `โจทย์โปรเจกไทล์ข้อ 2 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 20 m/s จงหาระยะตกสูงสุด <br><svg width="240" height="150" viewBox="0 0 240 150"><line x1="8" y1="112.0" x2="234" y2="112.0" stroke="#334155" stroke-width="2"/><path d="M 34.0 112.0 Q 122.0 24.0 210.0 112.0" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="6 4"/><g transform="translate(34.0,112.0) rotate(-45)"><rect x="-4" y="-7" width="40" height="14" rx="4" fill="#334155"/></g><circle cx="34.0" cy="112.0" r="9" fill="#475569"/><line x1="40.0" y1="106.0" x2="86.0" y2="60.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="86.0,60.0 82.6,68.3 77.7,63.4" fill="#dc2626"/><text x="96.0" y="60.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">u</text><path d="M 64.0 112.0 A 30 30 0 0 0 55.0 91.0" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="68.0" y="102.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">45°</text><line x1="34.0" y1="130.0" x2="210.0" y2="130.0" stroke="#16a34a" stroke-width="1.5"/><polygon points="34.0,130.0 42.0,126.0 42.0,134.0" fill="#16a34a"/><polygon points="210.0,130.0 202.0,126.0 202.0,134.0" fill="#16a34a"/><text x="122.0" y="146.0" font-size="11" fill="#15803d" text-anchor="middle" font-weight="bold">ระยะตก R</text></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    S_x &= \\frac{(20)^2 \\sin(90)}{10}\\\\
    &= 400\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$u = 20 m/s$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c3`,
        text: `โจทย์โปรเจกไทล์ข้อ 3 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 30 m/s จงหาระยะตกสูงสุด <br><svg width="240" height="150" viewBox="0 0 240 150"><line x1="8" y1="112.0" x2="234" y2="112.0" stroke="#334155" stroke-width="2"/><path d="M 34.0 112.0 Q 122.0 24.0 210.0 112.0" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="6 4"/><g transform="translate(34.0,112.0) rotate(-45)"><rect x="-4" y="-7" width="40" height="14" rx="4" fill="#334155"/></g><circle cx="34.0" cy="112.0" r="9" fill="#475569"/><line x1="40.0" y1="106.0" x2="86.0" y2="60.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="86.0,60.0 82.6,68.3 77.7,63.4" fill="#dc2626"/><text x="96.0" y="60.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">u</text><path d="M 64.0 112.0 A 30 30 0 0 0 55.0 91.0" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="68.0" y="102.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">45°</text><line x1="34.0" y1="130.0" x2="210.0" y2="130.0" stroke="#16a34a" stroke-width="1.5"/><polygon points="34.0,130.0 42.0,126.0 42.0,134.0" fill="#16a34a"/><polygon points="210.0,130.0 202.0,126.0 202.0,134.0" fill="#16a34a"/><text x="122.0" y="146.0" font-size="11" fill="#15803d" text-anchor="middle" font-weight="bold">ระยะตก R</text></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    S_x &= \\frac{(30)^2 \\sin(90)}{10}\\\\
    &= 900\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$u = 30 m/s$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c4`,
        text: `โจทย์โปรเจกไทล์ข้อ 4 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 40 m/s จงหาระยะตกสูงสุด <br><svg width="240" height="150" viewBox="0 0 240 150"><line x1="8" y1="112.0" x2="234" y2="112.0" stroke="#334155" stroke-width="2"/><path d="M 34.0 112.0 Q 122.0 24.0 210.0 112.0" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="6 4"/><g transform="translate(34.0,112.0) rotate(-45)"><rect x="-4" y="-7" width="40" height="14" rx="4" fill="#334155"/></g><circle cx="34.0" cy="112.0" r="9" fill="#475569"/><line x1="40.0" y1="106.0" x2="86.0" y2="60.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="86.0,60.0 82.6,68.3 77.7,63.4" fill="#dc2626"/><text x="96.0" y="60.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">u</text><path d="M 64.0 112.0 A 30 30 0 0 0 55.0 91.0" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="68.0" y="102.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">45°</text><line x1="34.0" y1="130.0" x2="210.0" y2="130.0" stroke="#16a34a" stroke-width="1.5"/><polygon points="34.0,130.0 42.0,126.0 42.0,134.0" fill="#16a34a"/><polygon points="210.0,130.0 202.0,126.0 202.0,134.0" fill="#16a34a"/><text x="122.0" y="146.0" font-size="11" fill="#15803d" text-anchor="middle" font-weight="bold">ระยะตก R</text></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    S_x &= \\frac{(40)^2 \\sin(90)}{10}\\\\
    &= 1600\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$u = 40 m/s$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c5`,
        text: `โจทย์โปรเจกไทล์ข้อ 5 ยิงปืนใหญ่ทำมุม 45 องศา ด้วยความเร็วต้น 50 m/s จงหาระยะตกสูงสุด <br><svg width="240" height="150" viewBox="0 0 240 150"><line x1="8" y1="112.0" x2="234" y2="112.0" stroke="#334155" stroke-width="2"/><path d="M 34.0 112.0 Q 122.0 24.0 210.0 112.0" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="6 4"/><g transform="translate(34.0,112.0) rotate(-45)"><rect x="-4" y="-7" width="40" height="14" rx="4" fill="#334155"/></g><circle cx="34.0" cy="112.0" r="9" fill="#475569"/><line x1="40.0" y1="106.0" x2="86.0" y2="60.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="86.0,60.0 82.6,68.3 77.7,63.4" fill="#dc2626"/><text x="96.0" y="60.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">u</text><path d="M 64.0 112.0 A 30 30 0 0 0 55.0 91.0" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="68.0" y="102.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">45°</text><line x1="34.0" y1="130.0" x2="210.0" y2="130.0" stroke="#16a34a" stroke-width="1.5"/><polygon points="34.0,130.0 42.0,126.0 42.0,134.0" fill="#16a34a"/><polygon points="210.0,130.0 202.0,126.0 202.0,134.0" fill="#16a34a"/><text x="122.0" y="146.0" font-size="11" fill="#15803d" text-anchor="middle" font-weight="bold">ระยะตก R</text></svg>`,
        hints: `ใช้สูตร $S_x = \\frac{u^2 \\sin(2\\theta)}{g}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    S_x &= \\frac{(50)^2 \\sin(90)}{10}\\\\
    &= 2500\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$u = 50 m/s$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c6`,
        text: `โจทย์วงกลมข้อ 1 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 1 m ด้วยความเร็ว 2 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    a_c &= \\frac{(2)^2}{1}\\\\
    &= 4\\text{ m/s}^2
  \\end{aligned}$$</div>`,
        intermediateHtml: `$v = 2, r = 1$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c7`,
        text: `โจทย์วงกลมข้อ 2 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 2 m ด้วยความเร็ว 4 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    a_c &= \\frac{(4)^2}{2}\\\\
    &= 8\\text{ m/s}^2
  \\end{aligned}$$</div>`,
        intermediateHtml: `$v = 4, r = 2$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c8`,
        text: `โจทย์วงกลมข้อ 3 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 3 m ด้วยความเร็ว 6 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    a_c &= \\frac{(6)^2}{3}\\\\
    &= 12\\text{ m/s}^2
  \\end{aligned}$$</div>`,
        intermediateHtml: `$v = 6, r = 3$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c9`,
        text: `โจทย์วงกลมข้อ 4 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 4 m ด้วยความเร็ว 8 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    a_c &= \\frac{(8)^2}{4}\\\\
    &= 16\\text{ m/s}^2
  \\end{aligned}$$</div>`,
        intermediateHtml: `$v = 8, r = 4$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c10`,
        text: `โจทย์วงกลมข้อ 5 วัตถุเคลื่อนที่เป็นวงกลมรัศมี 5 m ด้วยความเร็ว 10 m/s จงหาความเร่งสู่ศูนย์กลาง`,
        hints: `ใช้สูตร $a_c = \\frac{v^2}{r}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    a_c &= \\frac{(10)^2}{5}\\\\
    &= 20\\text{ m/s}^2
  \\end{aligned}$$</div>`,
        intermediateHtml: `$v = 10, r = 5$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c11`,
        text: `โจทย์ SHM ข้อ 1 สปริงมีค่าคงที่ k = 100 N/m ติดมวล m = 1 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= 2\\pi\\sqrt{\\frac{1}{100}}\\\\
    &= 0.2\\pi\\text{ s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$k = 100, m = 1$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c12`,
        text: `โจทย์ SHM ข้อ 2 สปริงมีค่าคงที่ k = 200 N/m ติดมวล m = 2 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= 2\\pi\\sqrt{\\frac{2}{200}}\\\\
    &= 0.2\\pi\\text{ s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$k = 200, m = 2$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c13`,
        text: `โจทย์ SHM ข้อ 3 สปริงมีค่าคงที่ k = 300 N/m ติดมวล m = 3 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= 2\\pi\\sqrt{\\frac{3}{300}}\\\\
    &= 0.2\\pi\\text{ s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$k = 300, m = 3$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c14`,
        text: `โจทย์ SHM ข้อ 4 สปริงมีค่าคงที่ k = 400 N/m ติดมวล m = 4 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= 2\\pi\\sqrt{\\frac{4}{400}}\\\\
    &= 0.2\\pi\\text{ s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$k = 400, m = 4$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c15`,
        text: `โจทย์ SHM ข้อ 5 สปริงมีค่าคงที่ k = 500 N/m ติดมวล m = 5 kg จงหาคาบการสั่น`,
        hints: `ใช้สูตร $T = 2\\pi\\sqrt{\\frac{m}{k}}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= 2\\pi\\sqrt{\\frac{5}{500}}\\\\
    &= 0.2\\pi\\text{ s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$k = 500, m = 5$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c16`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 20 m ด้วยความเร็วในแนวราบ 5 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$$\\begin{aligned}
    t &= \\sqrt{\\frac{2h}{g}}\\\\
    &= 2\\text{ s}, S_x\\\\
    &= ut\\\\
    &= 10\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$h = 20, u_x = 5$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c17`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 40 m ด้วยความเร็วในแนวราบ 10 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$$\\begin{aligned}
    t &= \\sqrt{\\frac{2h}{g}}\\\\
    &= 2.82\\text{ s}, S_x\\\\
    &= ut\\\\
    &= 28.2\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$h = 40, u_x = 10$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c18`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 60 m ด้วยความเร็วในแนวราบ 15 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$$\\begin{aligned}
    t &= \\sqrt{\\frac{2h}{g}}\\\\
    &= 3.46\\text{ s}, S_x\\\\
    &= ut\\\\
    &= 51.9\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$h = 60, u_x = 15$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c19`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 80 m ด้วยความเร็วในแนวราบ 20 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$$\\begin{aligned}
    t &= \\sqrt{\\frac{2h}{g}}\\\\
    &= 4\\text{ s}, S_x\\\\
    &= ut\\\\
    &= 80\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$h = 80, u_x = 20$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c20`,
        text: `ขว้างลูกบอลจากหน้าผาสูง 100 m ด้วยความเร็วในแนวราบ 25 m/s จะตกห่างจากหน้าผาเท่าใด`,
        hints: `หา $t$ จากแนวดิ่ง แล้วไปหา $S_x$ ในแนวราบ`,
        guide: `<div class='step'>$$\\begin{aligned}
    t &= \\sqrt{\\frac{2h}{g}}\\\\
    &= 4.48\\text{ s}, S_x\\\\
    &= ut\\\\
    &= 112.00000000000001\\text{ m}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$h = 100, u_x = 25$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c21`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 1 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width="210" height="175" viewBox="0 0 210 175"><line x1="40" y1="16.0" x2="170" y2="16.0" stroke="#334155" stroke-width="3"/><line x1="100.0" y1="22.0" x2="100.0" y2="131.1384387633061" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="100.0" y1="22.0" x2="148.0" y2="105.1" stroke="#0f172a" stroke-width="1.8"/><path d="M 100.0 56.0 A 34 34 0 0 0 117.0 51.4" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="106.0" y="66.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">30°</text><ellipse cx="100.0" cy="105.1" rx="48.0" ry="11" fill="none" stroke="#2563eb" stroke-width="1.4" stroke-dasharray="5 4"/><circle cx="148.0" cy="105.13843876330611" r="11" fill="#ef4444" stroke="#0f172a" stroke-width="1.2"/><text x="148.0" y="109.13843876330611" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">m</text><line x1="100.0" y1="131.1" x2="148.0" y2="131.1" stroke="#2563eb" stroke-width="1.4"/><polygon points="100.0,131.1 108.0,127.1 108.0,135.1" fill="#2563eb"/><polygon points="148.0,131.1 140.0,127.1 140.0,135.1" fill="#2563eb"/><text x="124.0" y="149.1384387633061" font-size="11" fill="#1d4ed8" text-anchor="middle" font-weight="bold">รัศมี r</text></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= \\frac{mg}{\\cos 30^\\circ}\\\\
    &= \\frac{10}{\\frac{\\sqrt{3}}{2}}\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$m = 1, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c22`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 2 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width="210" height="175" viewBox="0 0 210 175"><line x1="40" y1="16.0" x2="170" y2="16.0" stroke="#334155" stroke-width="3"/><line x1="100.0" y1="22.0" x2="100.0" y2="131.1384387633061" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="100.0" y1="22.0" x2="148.0" y2="105.1" stroke="#0f172a" stroke-width="1.8"/><path d="M 100.0 56.0 A 34 34 0 0 0 117.0 51.4" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="106.0" y="66.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">30°</text><ellipse cx="100.0" cy="105.1" rx="48.0" ry="11" fill="none" stroke="#2563eb" stroke-width="1.4" stroke-dasharray="5 4"/><circle cx="148.0" cy="105.13843876330611" r="11" fill="#ef4444" stroke="#0f172a" stroke-width="1.2"/><text x="148.0" y="109.13843876330611" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">m</text><line x1="100.0" y1="131.1" x2="148.0" y2="131.1" stroke="#2563eb" stroke-width="1.4"/><polygon points="100.0,131.1 108.0,127.1 108.0,135.1" fill="#2563eb"/><polygon points="148.0,131.1 140.0,127.1 140.0,135.1" fill="#2563eb"/><text x="124.0" y="149.1384387633061" font-size="11" fill="#1d4ed8" text-anchor="middle" font-weight="bold">รัศมี r</text></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= \\frac{mg}{\\cos 30^\\circ}\\\\
    &= \\frac{20}{\\frac{\\sqrt{3}}{2}}\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$m = 2, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c23`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 3 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width="210" height="175" viewBox="0 0 210 175"><line x1="40" y1="16.0" x2="170" y2="16.0" stroke="#334155" stroke-width="3"/><line x1="100.0" y1="22.0" x2="100.0" y2="131.1384387633061" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="100.0" y1="22.0" x2="148.0" y2="105.1" stroke="#0f172a" stroke-width="1.8"/><path d="M 100.0 56.0 A 34 34 0 0 0 117.0 51.4" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="106.0" y="66.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">30°</text><ellipse cx="100.0" cy="105.1" rx="48.0" ry="11" fill="none" stroke="#2563eb" stroke-width="1.4" stroke-dasharray="5 4"/><circle cx="148.0" cy="105.13843876330611" r="11" fill="#ef4444" stroke="#0f172a" stroke-width="1.2"/><text x="148.0" y="109.13843876330611" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">m</text><line x1="100.0" y1="131.1" x2="148.0" y2="131.1" stroke="#2563eb" stroke-width="1.4"/><polygon points="100.0,131.1 108.0,127.1 108.0,135.1" fill="#2563eb"/><polygon points="148.0,131.1 140.0,127.1 140.0,135.1" fill="#2563eb"/><text x="124.0" y="149.1384387633061" font-size="11" fill="#1d4ed8" text-anchor="middle" font-weight="bold">รัศมี r</text></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= \\frac{mg}{\\cos 30^\\circ}\\\\
    &= \\frac{30}{\\frac{\\sqrt{3}}{2}}\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$m = 3, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c24`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 4 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width="210" height="175" viewBox="0 0 210 175"><line x1="40" y1="16.0" x2="170" y2="16.0" stroke="#334155" stroke-width="3"/><line x1="100.0" y1="22.0" x2="100.0" y2="131.1384387633061" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="100.0" y1="22.0" x2="148.0" y2="105.1" stroke="#0f172a" stroke-width="1.8"/><path d="M 100.0 56.0 A 34 34 0 0 0 117.0 51.4" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="106.0" y="66.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">30°</text><ellipse cx="100.0" cy="105.1" rx="48.0" ry="11" fill="none" stroke="#2563eb" stroke-width="1.4" stroke-dasharray="5 4"/><circle cx="148.0" cy="105.13843876330611" r="11" fill="#ef4444" stroke="#0f172a" stroke-width="1.2"/><text x="148.0" y="109.13843876330611" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">m</text><line x1="100.0" y1="131.1" x2="148.0" y2="131.1" stroke="#2563eb" stroke-width="1.4"/><polygon points="100.0,131.1 108.0,127.1 108.0,135.1" fill="#2563eb"/><polygon points="148.0,131.1 140.0,127.1 140.0,135.1" fill="#2563eb"/><text x="124.0" y="149.1384387633061" font-size="11" fill="#1d4ed8" text-anchor="middle" font-weight="bold">รัศมี r</text></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= \\frac{mg}{\\cos 30^\\circ}\\\\
    &= \\frac{40}{\\frac{\\sqrt{3}}{2}}\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$m = 4, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c25`,
        text: `ลูกตุ้มกรวย (Conical pendulum) มวล 5 kg แกว่งเป็นวงกลมรัศมี 0.5 m เชือกทำมุม 30 องศากับแนวดิ่ง จงหาความตึงเชือก <br><svg width="210" height="175" viewBox="0 0 210 175"><line x1="40" y1="16.0" x2="170" y2="16.0" stroke="#334155" stroke-width="3"/><line x1="100.0" y1="22.0" x2="100.0" y2="131.1384387633061" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="100.0" y1="22.0" x2="148.0" y2="105.1" stroke="#0f172a" stroke-width="1.8"/><path d="M 100.0 56.0 A 34 34 0 0 0 117.0 51.4" fill="none" stroke="#7c3aed" stroke-width="1.2"/><text x="106.0" y="66.0" font-size="11" fill="#6d28d9" text-anchor="start" font-weight="bold">30°</text><ellipse cx="100.0" cy="105.1" rx="48.0" ry="11" fill="none" stroke="#2563eb" stroke-width="1.4" stroke-dasharray="5 4"/><circle cx="148.0" cy="105.13843876330611" r="11" fill="#ef4444" stroke="#0f172a" stroke-width="1.2"/><text x="148.0" y="109.13843876330611" font-size="11" fill="#fff" text-anchor="middle" font-weight="bold">m</text><line x1="100.0" y1="131.1" x2="148.0" y2="131.1" stroke="#2563eb" stroke-width="1.4"/><polygon points="100.0,131.1 108.0,127.1 108.0,135.1" fill="#2563eb"/><polygon points="148.0,131.1 140.0,127.1 140.0,135.1" fill="#2563eb"/><text x="124.0" y="149.1384387633061" font-size="11" fill="#1d4ed8" text-anchor="middle" font-weight="bold">รัศมี r</text></svg>`,
        hints: `พิจารณาแรง $T\\cos\\theta = mg$`,
        guide: `<div class='step'>$$\\begin{aligned}
    T &= \\frac{mg}{\\cos 30^\\circ}\\\\
    &= \\frac{50}{\\frac{\\sqrt{3}}{2}}\\text{ N}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$m = 5, \\theta = 30^\\circ$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c26`,
        text: `รถไฟเหาะ (Roller coaster) มวล 100 kg ตีลังกาวงกลมรัศมี 5 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width="220" height="210" viewBox="0 0 220 210"><line x1="8" y1="196" x2="212" y2="196" stroke="#334155" stroke-width="2"/><circle cx="100.0" cy="112.0" r="68.0" fill="none" stroke="#475569" stroke-width="3"/><line x1="100.0" y1="112.0" x2="100.0" y2="44.0" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/><text x="106.0" y="78.0" font-size="12" fill="#64748b" text-anchor="start" font-weight="bold">r</text><circle cx="100.0" cy="112.0" r="3" fill="#475569"/><rect x="83.0" y="35.0" width="34" height="18" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><line x1="120.0" y1="44.0" x2="162.0" y2="44.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="162.0,44.0 153.7,47.5 153.7,40.5" fill="#dc2626"/><text x="142.0" y="36.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">v</text><line x1="100.0" y1="56.0" x2="100.0" y2="92.0" stroke="#15803d" stroke-width="2.2"/><polygon points="100.0,92.0 96.5,83.7 103.5,83.7" fill="#15803d"/><text x="108.0" y="80.0" font-size="12" fill="#15803d" text-anchor="start" font-weight="bold">mg</text><text x="100.0" y="190" font-size="11" fill="#64748b" text-anchor="middle">จุดสูงสุดของวงกลม</text><path d="M 32.0 112.0 L 12.0 196 M 168.0 112.0 L 188.0 196" stroke="#475569" stroke-width="3" fill="none"/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    v &= \\sqrt{gR}\\\\
    &= \\sqrt{10 \\times 5}\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$R = 5$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c27`,
        text: `รถไฟเหาะ (Roller coaster) มวล 200 kg ตีลังกาวงกลมรัศมี 10 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width="220" height="210" viewBox="0 0 220 210"><line x1="8" y1="196" x2="212" y2="196" stroke="#334155" stroke-width="2"/><circle cx="100.0" cy="112.0" r="68.0" fill="none" stroke="#475569" stroke-width="3"/><line x1="100.0" y1="112.0" x2="100.0" y2="44.0" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/><text x="106.0" y="78.0" font-size="12" fill="#64748b" text-anchor="start" font-weight="bold">r</text><circle cx="100.0" cy="112.0" r="3" fill="#475569"/><rect x="83.0" y="35.0" width="34" height="18" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><line x1="120.0" y1="44.0" x2="162.0" y2="44.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="162.0,44.0 153.7,47.5 153.7,40.5" fill="#dc2626"/><text x="142.0" y="36.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">v</text><line x1="100.0" y1="56.0" x2="100.0" y2="92.0" stroke="#15803d" stroke-width="2.2"/><polygon points="100.0,92.0 96.5,83.7 103.5,83.7" fill="#15803d"/><text x="108.0" y="80.0" font-size="12" fill="#15803d" text-anchor="start" font-weight="bold">mg</text><text x="100.0" y="190" font-size="11" fill="#64748b" text-anchor="middle">จุดสูงสุดของวงกลม</text><path d="M 32.0 112.0 L 12.0 196 M 168.0 112.0 L 188.0 196" stroke="#475569" stroke-width="3" fill="none"/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    v &= \\sqrt{gR}\\\\
    &= \\sqrt{10 \\times 10}\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$R = 10$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c28`,
        text: `รถไฟเหาะ (Roller coaster) มวล 300 kg ตีลังกาวงกลมรัศมี 15 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width="220" height="210" viewBox="0 0 220 210"><line x1="8" y1="196" x2="212" y2="196" stroke="#334155" stroke-width="2"/><circle cx="100.0" cy="112.0" r="68.0" fill="none" stroke="#475569" stroke-width="3"/><line x1="100.0" y1="112.0" x2="100.0" y2="44.0" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/><text x="106.0" y="78.0" font-size="12" fill="#64748b" text-anchor="start" font-weight="bold">r</text><circle cx="100.0" cy="112.0" r="3" fill="#475569"/><rect x="83.0" y="35.0" width="34" height="18" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><line x1="120.0" y1="44.0" x2="162.0" y2="44.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="162.0,44.0 153.7,47.5 153.7,40.5" fill="#dc2626"/><text x="142.0" y="36.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">v</text><line x1="100.0" y1="56.0" x2="100.0" y2="92.0" stroke="#15803d" stroke-width="2.2"/><polygon points="100.0,92.0 96.5,83.7 103.5,83.7" fill="#15803d"/><text x="108.0" y="80.0" font-size="12" fill="#15803d" text-anchor="start" font-weight="bold">mg</text><text x="100.0" y="190" font-size="11" fill="#64748b" text-anchor="middle">จุดสูงสุดของวงกลม</text><path d="M 32.0 112.0 L 12.0 196 M 168.0 112.0 L 188.0 196" stroke="#475569" stroke-width="3" fill="none"/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    v &= \\sqrt{gR}\\\\
    &= \\sqrt{10 \\times 15}\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$R = 15$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c29`,
        text: `รถไฟเหาะ (Roller coaster) มวล 400 kg ตีลังกาวงกลมรัศมี 20 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width="220" height="210" viewBox="0 0 220 210"><line x1="8" y1="196" x2="212" y2="196" stroke="#334155" stroke-width="2"/><circle cx="100.0" cy="112.0" r="68.0" fill="none" stroke="#475569" stroke-width="3"/><line x1="100.0" y1="112.0" x2="100.0" y2="44.0" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/><text x="106.0" y="78.0" font-size="12" fill="#64748b" text-anchor="start" font-weight="bold">r</text><circle cx="100.0" cy="112.0" r="3" fill="#475569"/><rect x="83.0" y="35.0" width="34" height="18" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><line x1="120.0" y1="44.0" x2="162.0" y2="44.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="162.0,44.0 153.7,47.5 153.7,40.5" fill="#dc2626"/><text x="142.0" y="36.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">v</text><line x1="100.0" y1="56.0" x2="100.0" y2="92.0" stroke="#15803d" stroke-width="2.2"/><polygon points="100.0,92.0 96.5,83.7 103.5,83.7" fill="#15803d"/><text x="108.0" y="80.0" font-size="12" fill="#15803d" text-anchor="start" font-weight="bold">mg</text><text x="100.0" y="190" font-size="11" fill="#64748b" text-anchor="middle">จุดสูงสุดของวงกลม</text><path d="M 32.0 112.0 L 12.0 196 M 168.0 112.0 L 188.0 196" stroke="#475569" stroke-width="3" fill="none"/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    v &= \\sqrt{gR}\\\\
    &= \\sqrt{10 \\times 20}\\text{ m/s}
  \\end{aligned}$$</div>`,
        intermediateHtml: `$R = 20$ <input type='text' class='answer-input' placeholder='...'>`,
        advancedHtml: `<input type='text' class='answer-input' placeholder='...'>`
      },
      {
        id: `ch7_c30`,
        text: `รถไฟเหาะ (Roller coaster) มวล 500 kg ตีลังกาวงกลมรัศมี 25 m ความเร็วต่ำสุดที่จุดสูงสุดคือเท่าใด <br><svg width="220" height="210" viewBox="0 0 220 210"><line x1="8" y1="196" x2="212" y2="196" stroke="#334155" stroke-width="2"/><circle cx="100.0" cy="112.0" r="68.0" fill="none" stroke="#475569" stroke-width="3"/><line x1="100.0" y1="112.0" x2="100.0" y2="44.0" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/><text x="106.0" y="78.0" font-size="12" fill="#64748b" text-anchor="start" font-weight="bold">r</text><circle cx="100.0" cy="112.0" r="3" fill="#475569"/><rect x="83.0" y="35.0" width="34" height="18" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="1.2"/><line x1="120.0" y1="44.0" x2="162.0" y2="44.0" stroke="#dc2626" stroke-width="2.2"/><polygon points="162.0,44.0 153.7,47.5 153.7,40.5" fill="#dc2626"/><text x="142.0" y="36.0" font-size="13" fill="#dc2626" text-anchor="middle" font-weight="bold">v</text><line x1="100.0" y1="56.0" x2="100.0" y2="92.0" stroke="#15803d" stroke-width="2.2"/><polygon points="100.0,92.0 96.5,83.7 103.5,83.7" fill="#15803d"/><text x="108.0" y="80.0" font-size="12" fill="#15803d" text-anchor="start" font-weight="bold">mg</text><text x="100.0" y="190" font-size="11" fill="#64748b" text-anchor="middle">จุดสูงสุดของวงกลม</text><path d="M 32.0 112.0 L 12.0 196 M 168.0 112.0 L 188.0 196" stroke="#475569" stroke-width="3" fill="none"/></svg>`,
        hints: `ที่จุดสูงสุด $mg = m\\frac{v^2}{R}$`,
        guide: `<div class='step'>$$\\begin{aligned}
    v &= \\sqrt{gR}\\\\
    &= \\sqrt{10 \\times 25}\\text{ m/s}
  \\end{aligned}$$</div>`,
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
