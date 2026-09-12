// data_ch7.js
Object.assign(physicsData.topics, {
  projectile: {
    id: "projectile",
    title: "7.1 โพรเจกไทล์",
    theory: `
      <h3>การเคลื่อนที่แบบโพรเจกไทล์ (Projectile Motion)</h3>
      <p>การเคลื่อนที่ใน 2 มิติ โดยมีความเร่งคงตัวในแนวดิ่ง ($g$) และไม่มีความเร่งในแนวระดับ</p>
      <ul>
          <li><strong>แนวระดับ (แกน $x$):</strong> ความเร็วคงตัว $v_x = u_x = u \\cos \\theta$, การกระจัด $S_x = u_x t$</li>
          <li><strong>แนวดิ่ง (แกน $y$):</strong> ความเร่ง $a_y = -g$ (ถ้าให้ทิศขึ้นเป็นบวก)</li>
          <li>สมการแนวดิ่ง: $v_y = u_y - gt$, $S_y = u_y t - \\frac{1}{2}gt^2$, $v_y^2 = u_y^2 - 2gS_y$</li>
          <li>เวลาที่ใช้ไปถึงจุดสูงสุด: $t = \\frac{u \\sin \\theta}{g}$</li>
          <li>เวลาที่ลอยในอากาศ (ตกกลับมาที่ระดับเดิม): $t = \\frac{2u \\sin \\theta}{g}$</li>
          <li>ระยะทางไกลสุดในแนวระดับ: $S_x = \\frac{u^2 \\sin 2\\theta}{g}$</li>
      </ul>
      <canvas id="simProjectile" class="sim-canvas" style="position:relative; z-index:10; cursor:crosshair;"></canvas>
      <p class="sim-tip" style="text-align:center; color:#6b7280; font-size:13px; margin-top:4px;">🎯 คลิกที่จอเพื่อยิงกระสุน (คลิกสูง = มุมมาก)</p>
    `,
    problems: [
      {
        id: "proj_1",
        text: "ขว้างลูกบอลด้วยความเร็วต้น $20 \\text{ m/s}$ ทำมุม $30^\\circ$ กับแนวระดับ จงหาเวลาที่ลูกบอลอยู่ในอากาศจนตกถึงพื้น ($g = 10 \\text{ m/s}^2$)",
        hints: ["เวลาอยู่ในอากาศ $t = \\frac{2u \\sin \\theta}{g}$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาความเร็วต้นในแนวดิ่ง ($u_y$)</p>
            <p>$$\\begin{aligned}
              u_y &= u \\sin \\theta \\\\
              &= 20 \\sin 30^\\circ \\\\
              &= 10\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> หาเวลาที่ลูกบอลอยู่ในอากาศทั้งหมด ($t$)</p>
            <p>$$\\begin{aligned}
              t &= \\frac{2u_y}{g} \\\\
              &= \\frac{2(10)}{10} \\\\
              &= 2\\text{ s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u = 20\\text{ m/s}$, $\\theta = 30^\\circ$, $g = 10\\text{ m/s}^2$</p>
          <p>เวลา $t = $ <input type="text" class="answer-input" placeholder="2"> $\\text{s}$</p>
        `,
        advancedHtml: `
          <p>เวลา $t = $ <input type="text" class="answer-input" placeholder="2"> $\\text{s}$</p>
        `
      },
      {
        id: "proj_2",
        text: "ยิงปืนใหญ่ด้วยความเร็วต้น $50 \\text{ m/s}$ ทำมุม $45^\\circ$ กับแนวระดับ จงหาระยะตกไกลสุดในแนวระดับ ($g = 10 \\text{ m/s}^2$)",
        hints: ["ใช้สูตรลัด $S_x = \\frac{u^2 \\sin 2\\theta}{g}$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> ใช้สูตรระยะตกไกลสุดในแนวระดับ</p>
            <p>$$S_x = \\frac{u^2 \\sin 2\\theta}{g}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> แทนค่าและคำนวณ</p>
            <p>$$\\begin{aligned}
              S_x &= \\frac{50^2 \\sin(2 \\times 45^\\circ)}{10} \\\\
              &= \\frac{2{,}500 \\sin 90^\\circ}{10} \\\\
              &= \\frac{2{,}500(1)}{10} \\\\
              &= 250\\text{ m}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u = 50\\text{ m/s}$, $\\theta = 45^\\circ$, $g = 10\\text{ m/s}^2$</p>
          <p>ระยะ $S_x = $ <input type="text" class="answer-input" placeholder="250"> $\\text{m}$</p>
        `,
        advancedHtml: `
          <p>ระยะ $S_x = $ <input type="text" class="answer-input" placeholder="250"> $\\text{m}$</p>
        `
      },
      {
        id: "proj_3",
        text: "ขว้างวัตถุด้วยความเร็ว $30 \\text{ m/s}$ ทำมุม $60^\\circ$ กับแนวระดับ จุดสูงสุดของการเคลื่อนที่อยู่สูงจากพื้นเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["จุดสูงสุดความเร็วในแนวดิ่ง $v_y = 0$", "หาระยะสูงสุดจาก $S_y = \\frac{u_y^2}{2g}$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาความเร็วต้นแนวดิ่ง ($u_y$)</p>
            <p>$$\\begin{aligned}
              u_y &= u \\sin 60^\\circ \\\\
              &= 30 \\left(\\frac{\\sqrt{3}}{2}\\right) \\\\
              &= 15\\sqrt{3}\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> ที่จุดสูงสุด $v_y = 0$ หาระยะแนวดิ่ง $S_y$</p>
            <p>$$\\begin{aligned}
              v_y^2 &= u_y^2 - 2gS_y \\\\
              0 &= (15\\sqrt{3})^2 - 2(10)S_y \\\\
              20S_y &= 675 \\\\
              S_y &= \\frac{675}{20} \\\\
              S_y &= 33.75\\text{ m}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u_y = 15\\sqrt{3}\\text{ m/s}$, $g = 10\\text{ m/s}^2$</p>
          <p>ความสูง $S_y = $ <input type="text" class="answer-input" placeholder="33.75"> $\\text{m}$</p>
        `,
        advancedHtml: `
          <p>ความสูง $S_y = $ <input type="text" class="answer-input" placeholder="33.75"> $\\text{m}$</p>
        `
      },
      {
        id: "proj_4",
        text: "ปาหินในแนวระดับด้วยความเร็ว $10 \\text{ m/s}$ จากหน้าผาสูง $20 \\text{ m}$ หินจะตกห่างจากหน้าผาเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["เวลาในการตกหาจากแนวดิ่ง $S_y = \\frac{1}{2}gt^2$ เพราะ $u_y = 0$", "ระยะทางแนวระดับ $S_x = u_x t$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาเวลาตกจากแนวดิ่ง ($u_y = 0$)</p>
            <p>$$\\begin{aligned}
              S_y &= \\frac{1}{2}gt^2 \\\\
              20 &= \\frac{1}{2}(10)t^2 \\\\
              5t^2 &= 20 \\\\
              t^2 &= 4 \\\\
              t &= 2\\text{ s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> หาระยะในแนวระดับ ($S_x$)</p>
            <p>$$\\begin{aligned}
              S_x &= u_x t \\\\
              &= (10)(2) \\\\
              &= 20\\text{ m}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u_x = 10\\text{ m/s}$, $h = 20\\text{ m}$</p>
          <p>ระยะตก $S_x = $ <input type="text" class="answer-input" placeholder="20"> $\\text{m}$</p>
        `,
        advancedHtml: `
          <p>ระยะตก $S_x = $ <input type="text" class="answer-input" placeholder="20"> $\\text{m}$</p>
        `
      },
      {
        id: "proj_5",
        text: "เครื่องบินบินในแนวระดับด้วยความเร็ว $100 \\text{ m/s}$ สูงจากพื้นดิน $500 \\text{ m}$ ปล่อยสัมภาระลงมา สัมภาระจะตกห่างจากจุดปล่อยในแนวระดับเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["หาเวลาจากแนวดิ่ง $S_y = \\frac{1}{2}gt^2$", "หา $S_x = u_x t$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาเวลาตก ($t$)</p>
            <p>$$\\begin{aligned}
              S_y &= \\frac{1}{2}gt^2 \\\\
              500 &= \\frac{1}{2}(10)t^2 \\\\
              5t^2 &= 500 \\\\
              t^2 &= 100 \\\\
              t &= 10\\text{ s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> หาระยะห่างในแนวระดับ ($S_x$)</p>
            <p>$$\\begin{aligned}
              S_x &= u_x t \\\\
              &= (100)(10) \\\\
              &= 1{,}000\\text{ m}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u_x = 100\\text{ m/s}$, $S_y = 500\\text{ m}$</p>
          <p>ระยะตก $S_x = $ <input type="text" class="answer-input" placeholder="1000"> $\\text{m}$</p>
        `,
        advancedHtml: `
          <p>ระยะตก $S_x = $ <input type="text" class="answer-input" placeholder="1000"> $\\text{m}$</p>
        `
      },
      {
        id: "proj_6",
        text: "ยิงจรวดขวดน้ำด้วยมุม $30^\\circ$ ความเร็วต้น $40 \\text{ m/s}$ จงหาอัตราเร็วของจรวดที่จุดสูงสุด",
        hints: ["ที่จุดสูงสุด $v_y = 0$ ดังนั้น $v = v_x = u \\cos \\theta$"],
        guide: `
          <div class="step">
            <p>ที่จุดสูงสุด ความเร็วในแนวดิ่งเป็นศูนย์ ($v_y = 0$) ความเร็วของจรวดจึงเท่ากับความเร็วแนวระดับ ($v_x$):</p>
            <p>$$\\begin{aligned}
              v &= v_x \\\\
              &= u \\cos \\theta \\\\
              &= 40 \\cos 30^\\circ \\\\
              &= 40 \\left(\\frac{\\sqrt{3}}{2}\\right) \\\\
              &= 20\\sqrt{3} \\\\
              &\\approx 34.64\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u = 40\\text{ m/s}$, $\\theta = 30^\\circ$</p>
          <p>อัตราเร็วที่จุดสูงสุด $v = $ <input type="text" class="answer-input" placeholder="34.64"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>อัตราเร็วที่จุดสูงสุด $v = $ <input type="text" class="answer-input" placeholder="34.64"> $\\text{m/s}$</p>
        `
      },
      {
        id: "proj_7",
        text: "ขว้างลูกเทนนิสด้วยความเร็ว $25 \\text{ m/s}$ มุม $53^\\circ$ กับแนวระดับ เมื่อเวลาผ่านไป $1 \\text{ s}$ ลูกเทนนิสจะอยู่สูงจากระดับที่ขว้างเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["หา $u_y = u \\sin 53^\\circ$", "ใช้สูตร $S_y = u_y t - \\frac{1}{2}gt^2$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาความเร็วต้นในแนวดิ่ง ($u_y$)</p>
            <p>$$\\begin{aligned}
              u_y &= u \\sin 53^\\circ \\\\
              &= 25(0.8) \\\\
              &= 20\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> หาระยะความสูงที่เวลา $t = 1\\text{ s}$</p>
            <p>$$\\begin{aligned}
              S_y &= u_y t - \\frac{1}{2}gt^2 \\\\
              &= 20(1) - \\frac{1}{2}(10)(1)^2 \\\\
              &= 20 - 5 \\\\
              &= 15\\text{ m}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u_y = 20\\text{ m/s}$, $t = 1\\text{ s}$</p>
          <p>ความสูง $S_y = $ <input type="text" class="answer-input" placeholder="15"> $\\text{m}$</p>
        `,
        advancedHtml: `
          <p>ความสูง $S_y = $ <input type="text" class="answer-input" placeholder="15"> $\\text{m}$</p>
        `
      },
      {
        id: "proj_8",
        text: "นักกระโดดไกลกระโดดทำมุม $45^\\circ$ ได้ระยะทางไกลสุด $40 \\text{ m}$ จงหาความเร็วต้นในการกระโดด ($g = 10 \\text{ m/s}^2$)",
        hints: ["ใช้สูตร $S_x = \\frac{u^2 \\sin 2\\theta}{g}$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> ตั้งสมการหาระยะไกลสุด</p>
            <p>$$S_x = \\frac{u^2 \\sin 2\\theta}{g}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> แทนค่าและแก้สมการหา $u$</p>
            <p>$$\\begin{aligned}
              40 &= \\frac{u^2 \\sin(90^\\circ)}{10} \\\\
              40 &= \\frac{u^2 (1)}{10} \\\\
              u^2 &= 400 \\\\
              u &= 20\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$S_x = 40\\text{ m}$, $\\theta = 45^\\circ$, $g = 10\\text{ m/s}^2$</p>
          <p>ความเร็วต้น $u = $ <input type="text" class="answer-input" placeholder="20"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็วต้น $u = $ <input type="text" class="answer-input" placeholder="20"> $\\text{m/s}$</p>
        `
      },
      {
        id: "proj_9",
        text: "ขว้างลูกบอลขึ้นไปทำมุมค่าหนึ่ง พบว่าลูกบอลขึ้นไปได้สูงสุด $45 \\text{ m}$ จงหาเวลาทั้งหมดที่ลูกบอลลอยอยู่ในอากาศ ($g = 10 \\text{ m/s}^2$)",
        hints: ["หาเวลาขาขึ้น $t_{\\text{up}}$ จาก $S_y = \\frac{1}{2}gt^2$", "เวลาทั้งหมด $t = 2 t_{\\text{up}}$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาเวลาขาขึ้น ($t_{\\text{up}}$) จากจุดสูงสุด</p>
            <p>$$\\begin{aligned}
              S_y &= \\frac{1}{2}g t_{\\text{up}}^2 \\\\
              45 &= \\frac{1}{2}(10) t_{\\text{up}}^2 \\\\
              5 t_{\\text{up}}^2 &= 45 \\\\
              t_{\\text{up}}^2 &= 9 \\\\
              t_{\\text{up}} &= 3\\text{ s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> เวลาทั้งหมดที่ลอยในอากาศ</p>
            <p>$$\\begin{aligned}
              t &= 2 t_{\\text{up}} \\\\
              &= 2(3) \\\\
              &= 6\\text{ s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$h_{\\max} = 45\\text{ m}$, $g = 10\\text{ m/s}^2$</p>
          <p>เวลาลอยในอากาศ $t = $ <input type="text" class="answer-input" placeholder="6"> $\\text{s}$</p>
        `,
        advancedHtml: `
          <p>เวลาลอยในอากาศ $t = $ <input type="text" class="answer-input" placeholder="6"> $\\text{s}$</p>
        `
      },
      {
        id: "proj_10",
        text: "ขว้างวัตถุด้วยความเร็ว $20 \\text{ m/s}$ ทำมุม $53^\\circ$ กับแนวระดับ จงหาขนาดของความเร็วที่เวลา $t = 2 \\text{ s}$ ($g = 10 \\text{ m/s}^2$)",
        hints: ["หา $v_x = u \\cos 53^\\circ$", "หา $v_y = u_y - gt$", "รวมความเร็ว $v = \\sqrt{v_x^2 + v_y^2}$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาองค์ประกอบความเร็วเริ่มต้น</p>
            <p>$$\\begin{aligned}
              v_x &= u \\cos 53^\\circ = 20(0.6) = 12\\text{ m/s} \\\\
              u_y &= u \\sin 53^\\circ = 20(0.8) = 16\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> หาความเร็วแนวดิ่งที่เวลา $t = 2\\text{ s}$</p>
            <p>$$\\begin{aligned}
              v_y &= u_y - gt \\\\
              &= 16 - 10(2) \\\\
              &= -4\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 3:</strong> หาขนาดของความเร็วรวม ($v$)</p>
            <p>$$\\begin{aligned}
              v &= \\sqrt{v_x^2 + v_y^2} \\\\
              &= \\sqrt{12^2 + (-4)^2} \\\\
              &= \\sqrt{144 + 16} \\\\
              &= \\sqrt{160} \\\\
              &\\approx 12.65\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$v_x = 12\\text{ m/s}$, $v_y = -4\\text{ m/s}$</p>
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="12.65"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="12.65"> $\\text{m/s}$</p>
        `
      }
    ]
  },
  circular: {
    id: "circular",
    title: "7.2 แบบวงกลม",
    theory: `
      <h3>การเคลื่อนที่แบบวงกลม (Circular Motion)</h3>
      <p>วัตถุที่เคลื่อนที่เป็นวงกลมหรือส่วนของวงกลม จะมีแรงเข้าสู่ศูนย์กลางเสมอ ($F_c$)</p>
      <ul>
          <li><strong>ความเร็วเชิงเส้นและเชิงมุม:</strong> $v = \\omega r$, $\\omega = \\frac{\\Delta \\theta}{\\Delta t} = 2\\pi f = \\frac{2\\pi}{T}$</li>
          <li><strong>ความเร่งเข้าสู่ศูนย์กลาง:</strong> $a_c = \\frac{v^2}{r} = \\omega^2 r$</li>
          <li><strong>แรงสู่ศูนย์กลาง:</strong> $F_c = m a_c = m \\frac{v^2}{r} = m \\omega^2 r$</li>
          <li>รถเลี้ยวโค้งบนถนนราบ: $\\mu_s N = m \\frac{v^2}{r} \\Rightarrow v_{\\max} = \\sqrt{\\mu_s r g}$</li>
          <li>รถเลี้ยวโค้งบนถนนเอียงมุม $\\theta$: $\\tan \\theta = \\frac{v^2}{rg}$</li>
      </ul>
      <canvas id="simCircular" class="sim-canvas" style="position:relative; z-index:10; cursor:pointer;"></canvas>
      <p class="sim-tip" style="text-align:center; color:#6b7280; font-size:13px; margin-top:4px;">🔄 สังเกตเวกเตอร์ความเร็ว (v) และแรงสู่ศูนย์กลาง (Fc)</p>
    `,
    problems: [
      {
        id: "circ_1",
        text: "วัตถุมวล $2 \\text{ kg}$ ผูกติดกับเชือกยาว $0.5 \\text{ m}$ แกว่งเป็นวงกลมในแนวระดับด้วยความเร็วคงที่ $4 \\text{ m/s}$ จงหาแรงดึงในเส้นเชือก",
        hints: ["แรงดึงเส้นเชือกคือแรงสู่ศูนย์กลาง $T = F_c = \\frac{mv^2}{r}$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> ใช้สูตรแรงสู่ศูนย์กลาง</p>
            <p>$$\\begin{aligned}
              T &= \\frac{mv^2}{r} \\\\
              &= \\frac{(2)(4^2)}{0.5} \\\\
              &= \\frac{32}{0.5} \\\\
              &= 64\\text{ N}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 2\\text{ kg}$, $v = 4\\text{ m/s}$, $r = 0.5\\text{ m}$</p>
          <p>แรงดึงเชือก $T = $ <input type="text" class="answer-input" placeholder="64"> $\\text{N}$</p>
        `,
        advancedHtml: `
          <p>แรงดึงเชือก $T = $ <input type="text" class="answer-input" placeholder="64"> $\\text{N}$</p>
        `
      },
      {
        id: "circ_2",
        text: "รถยนต์มวล $1{,}000 \\text{ kg}$ วิ่งเลี้ยวโค้งบนถนนราบรัศมี $40 \\text{ m}$ ถ้าสัมประสิทธิ์ความเสียดทานระหว่างยางกับถนนคือ $0.4$ รถจะเลี้ยวโค้งได้ด้วยความเร็วสูงสุดเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["ใช้สูตร $v_{\\max} = \\sqrt{\\mu_s r g}$"],
        guide: `
          <div class="step">
            <p>แรงเสียดทานสถิตทำหน้าที่เป็นแรงสู่ศูนย์กลาง:</p>
            <p>$$\\begin{aligned}
              v_{\\max} &= \\sqrt{\\mu_s r g} \\\\
              &= \\sqrt{(0.4)(40)(10)} \\\\
              &= \\sqrt{160} \\\\
              &= 4\\sqrt{10} \\\\
              &\\approx 12.65\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$\\mu_s = 0.4$, $r = 40\\text{ m}$, $g = 10\\text{ m/s}^2$</p>
          <p>ความเร็วสูงสุด $v = $ <input type="text" class="answer-input" placeholder="12.65"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็วสูงสุด $v = $ <input type="text" class="answer-input" placeholder="12.65"> $\\text{m/s}$</p>
        `
      },
      {
        id: "circ_3",
        text: "วัตถุเคลื่อนที่รอบวงกลมรัศมี $2 \\text{ m}$ ด้วยความถี่ $5 \\text{ Hz}$ จงหาความเร่งสู่ศูนย์กลาง (กำหนดให้ $\\pi^2 \\approx 9.87$)",
        hints: ["หา $\\omega = 2\\pi f$", "หา $a_c = \\omega^2 r$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาความเร็วเชิงมุม ($\\omega$)</p>
            <p>$$\\begin{aligned}
              \\omega &= 2\\pi f \\\\
              &= 2\\pi(5) \\\\
              &= 10\\pi\\text{ rad/s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> หาความเร่งสู่ศูนย์กลาง ($a_c$)</p>
            <p>$$\\begin{aligned}
              a_c &= \\omega^2 r \\\\
              &= (10\\pi)^2(2) \\\\
              &= 200\\pi^2 \\\\
              &= 200(9.87) \\\\
              &\\approx 1{,}974\\text{ m/s}^2
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 2\\text{ m}$, $f = 5\\text{ Hz}$</p>
          <p>ความเร่งสู่ศูนย์กลาง $a_c = $ <input type="text" class="answer-input" placeholder="1974"> $\\text{m/s}^2$</p>
        `,
        advancedHtml: `
          <p>ความเร่งสู่ศูนย์กลาง $a_c = $ <input type="text" class="answer-input" placeholder="1974"> $\\text{m/s}^2$</p>
        `
      },
      {
        id: "circ_4",
        text: "เครื่องเล่นหมุนเป็นวงกลมในแนวดิ่ง รัศมี $5 \\text{ m}$ มวลชนในกระเช้าจะต้องมีความเร็วอย่างน้อยเท่าใด จึงจะไม่ตกที่จุดสูงสุด ($g = 10 \\text{ m/s}^2$)",
        hints: ["ที่จุดสูงสุด $N = 0 \\Rightarrow mg = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{rg}$"],
        guide: `
          <div class="step">
            <p>ที่จุดสูงสุด เพื่อไม่ให้ตก ($N \\ge 0$):</p>
            <p>$$\\begin{aligned}
              v_{\\min} &= \\sqrt{rg} \\\\
              &= \\sqrt{(5)(10)} \\\\
              &= \\sqrt{50} \\\\
              &\\approx 7.07\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 5\\text{ m}$, $g = 10\\text{ m/s}^2$</p>
          <p>ความเร็วอย่างน้อย $v = $ <input type="text" class="answer-input" placeholder="7.07"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็วอย่างน้อย $v = $ <input type="text" class="answer-input" placeholder="7.07"> $\\text{m/s}$</p>
        `
      },
      {
        id: "circ_5",
        text: "วัตถุมวล $1 \\text{ kg}$ ผูกติดเชือกยาว $1 \\text{ m}$ แกว่งเป็นวงกลมในแนวดิ่ง ที่จุดต่ำสุดมีความเร็ว $5 \\text{ m/s}$ แรงตึงเชือกที่จุดต่ำสุดเป็นเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["ตั้งสมการ $T - mg = \\frac{mv^2}{r}$"],
        guide: `
          <div class="step">
            <p>สมการแรงที่จุดต่ำสุดของการแกว่งแนวดิ่ง:</p>
            <p>$$\\begin{aligned}
              T - mg &= \\frac{mv^2}{r} \\\\
              T &= mg + \\frac{mv^2}{r} \\\\
              &= (1)(10) + \\frac{(1)(5^2)}{1} \\\\
              &= 10 + 25 \\\\
              &= 35\\text{ N}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 1\\text{ kg}$, $r = 1\\text{ m}$, $v = 5\\text{ m/s}$</p>
          <p>แรงตึงเชือก $T = $ <input type="text" class="answer-input" placeholder="35"> $\\text{N}$</p>
        `,
        advancedHtml: `
          <p>แรงตึงเชือก $T = $ <input type="text" class="answer-input" placeholder="35"> $\\text{N}$</p>
        `
      },
      {
        id: "circ_6",
        text: "ถนนยกระดับโค้งรัศมี $100 \\text{ m}$ ทำมุมเอียงกับแนวระดับ $45^\\circ$ รถควรวิ่งด้วยความเร็วเท่าใดจึงจะไม่ต้องพึ่งพาแรงเสียดทาน ($g = 10 \\text{ m/s}^2$)",
        hints: ["ใช้สูตร $\\tan \\theta = \\frac{v^2}{rg}$"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              \\tan \\theta &= \\frac{v^2}{rg} \\\\
              v &= \\sqrt{rg \\tan \\theta} \\\\
              &= \\sqrt{(100)(10) \\tan 45^\\circ} \\\\
              &= \\sqrt{1{,}000(1)} \\\\
              &= 10\\sqrt{10} \\\\
              &\\approx 31.62\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 100\\text{ m}$, $\\theta = 45^\\circ$, $g = 10\\text{ m/s}^2$</p>
          <p>ความเร็วที่เหมาะสม $v = $ <input type="text" class="answer-input" placeholder="31.62"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็วที่เหมาะสม $v = $ <input type="text" class="answer-input" placeholder="31.62"> $\\text{m/s}$</p>
        `
      },
      {
        id: "circ_7",
        text: "ดาวเทียมโคจรรอบโลกที่ระดับรัศมี $r$ ด้วยความเร็ว $v$ หากย้ายวงโคจรไปที่รัศมี $4r$ ความเร็วโคจรใหม่จะเป็นกี่เท่าของเดิม",
        hints: ["$v \\propto \\frac{1}{\\sqrt{r}}$"],
        guide: `
          <div class="step">
            <p>จากความเร็วโคจรดาวเทียม $v = \\sqrt{\\frac{GM}{r}}$:</p>
            <p>$$\\begin{aligned}
              v' &= \\sqrt{\\frac{GM}{4r}} \\\\
              &= \\frac{1}{2}\\sqrt{\\frac{GM}{r}} \\\\
              &= 0.5v
            \\end{aligned}$$</p>
            <p>ดังนั้น ความเร็วโคจรใหม่จะเป็น $0.5$ เท่าของเดิม</p>
          </div>
        `,
        intermediateHtml: `
          <p>ความเร็วใหม่ $v' = $ <input type="text" class="answer-input" placeholder="0.5"> เท่าของเดิม</p>
        `,
        advancedHtml: `
          <p>ความเร็วใหม่ $v' = $ <input type="text" class="answer-input" placeholder="0.5"> เท่าของเดิม</p>
        `
      },
      {
        id: "circ_8",
        text: "ลูกตุ้มมวล $0.5 \\text{ kg}$ แกว่งเป็นรูปกรวยทำมุม $60^\\circ$ กับแนวดิ่ง แรงตึงเชือกมีค่าเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["พิจารณาแนวดิ่ง: $T \\cos \\theta = mg$"],
        guide: `
          <div class="step">
            <p>พิจารณาสมดุลแรงในแนวดิ่ง:</p>
            <p>$$\\begin{aligned}
              T \\cos 60^\\circ &= mg \\\\
              T &= \\frac{mg}{\\cos 60^\\circ} \\\\
              &= \\frac{(0.5)(10)}{0.5} \\\\
              &= 10\\text{ N}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 0.5\\text{ kg}$, $\\theta = 60^\\circ$</p>
          <p>แรงตึงเชือก $T = $ <input type="text" class="answer-input" placeholder="10"> $\\text{N}$</p>
        `,
        advancedHtml: `
          <p>แรงตึงเชือก $T = $ <input type="text" class="answer-input" placeholder="10"> $\\text{N}$</p>
        `
      },
      {
        id: "circ_9",
        text: "ม้าหมุนมีรัศมี $4 \\text{ m}$ หมุนด้วยอัตรา $15 \\text{ รอบต่อนาที (rpm)}$ จงหาอัตราเร็วเชิงเส้นของเด็กที่นั่งขอบม้าหมุน",
        hints: ["แปลงความถี่เป็น rad/s: $\\omega = \\frac{15 \\times 2\\pi}{60}$", "หา $v = \\omega r$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาความเร็วเชิงมุม ($\\omega$)</p>
            <p>$$\\begin{aligned}
              \\omega &= \\frac{15 \\times 2\\pi}{60} \\\\
              &= 0.5\\pi\\text{ rad/s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> หาอัตราเร็วเชิงเส้น ($v$)</p>
            <p>$$\\begin{aligned}
              v &= \\omega r \\\\
              &= (0.5\\pi)(4) \\\\
              &= 2\\pi \\\\
              &\\approx 6.28\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 4\\text{ m}$, อัตราหมุน $15\\text{ rpm}$</p>
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="6.28"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="6.28"> $\\text{m/s}$</p>
        `
      },
      {
        id: "circ_10",
        text: "รถไฟเหาะตีลังการัศมี $R = 10 \\text{ m}$ ความเร็วต่ำสุดที่จุดสูงสุดเพื่อไม่ให้ตกรางเป็นเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["$v = \\sqrt{Rg}$"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              v_{\\min} &= \\sqrt{Rg} \\\\
              &= \\sqrt{(10)(10)} \\\\
              &= 10\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$R = 10\\text{ m}$, $g = 10\\text{ m/s}^2$</p>
          <p>ความเร็วต่ำสุด $v = $ <input type="text" class="answer-input" placeholder="10"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็วต่ำสุด $v = $ <input type="text" class="answer-input" placeholder="10"> $\\text{m/s}$</p>
        `
      }
    ]
  },
  shm: {
    id: "shm",
    title: "7.3 ฮาร์มอนิกอย่างง่าย",
    theory: `
      <h3>การเคลื่อนที่แบบฮาร์มอนิกอย่างง่าย (SHM)</h3>
      <p>การเคลื่อนที่กลับไปกลับมาซ้ำรอยเดิม โดยมีความเร่งแปรผันตรงกับการกระจัด และมีทิศตรงข้ามกับการกระจัดเสมอ ($a = -\\omega^2 x$)</p>
      <ul>
          <li><strong>สมการการเคลื่อนที่:</strong> $x(t) = A \\sin(\\omega t)$</li>
          <li><strong>ความเร็ว:</strong> $v = \\omega \\sqrt{A^2 - x^2}$, $v_{\\max} = \\omega A$ (ที่สมดุล $x=0$)</li>
          <li><strong>ความเร่ง:</strong> $a = -\\omega^2 x$, $a_{\\max} = \\omega^2 A$ (ที่จุดปลาย $x = \\pm A$)</li>
          <li><strong>ระบบมวล-สปริง:</strong> $T = 2\\pi \\sqrt{\\frac{m}{k}}$, $\\omega = \\sqrt{\\frac{k}{m}}$</li>
          <li><strong>ลูกตุ้มอย่างง่าย (Simple Pendulum):</strong> $T = 2\\pi \\sqrt{\\frac{L}{g}}$, $\\omega = \\sqrt{\\frac{g}{L}}$</li>
      </ul>
      <canvas id="simSHM" class="sim-canvas" style="position:relative; z-index:10; cursor:pointer;"></canvas>
      <p class="sim-tip" style="text-align:center; color:#6b7280; font-size:13px; margin-top:4px;">〰️ สังเกตมวลสั่นและกราฟการกระจัดเทียบเวลา</p>
    `,
    problems: [
      {
        id: "shm_1",
        text: "มวล $0.5 \\text{ kg}$ ติดปลายสปริงที่มีค่านิจ $50 \\text{ N/m}$ จงหาคาบของการสั่น",
        hints: ["$T = 2\\pi \\sqrt{\\frac{m}{k}}$"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              T &= 2\\pi \\sqrt{\\frac{m}{k}} \\\\
              &= 2\\pi \\sqrt{\\frac{0.5}{50}} \\\\
              &= 2\\pi \\sqrt{0.01} \\\\
              &= 2\\pi(0.1) \\\\
              &= 0.2\\pi \\\\
              &\\approx 0.628\\text{ s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 0.5\\text{ kg}$, $k = 50\\text{ N/m}$</p>
          <p>คาบของการสั่น $T = $ <input type="text" class="answer-input" placeholder="0.63"> $\\text{s}$</p>
        `,
        advancedHtml: `
          <p>คาบของการสั่น $T = $ <input type="text" class="answer-input" placeholder="0.63"> $\\text{s}$</p>
        `
      },
      {
        id: "shm_2",
        text: "ลูกตุ้มนาฬิกายาว $2.5 \\text{ m}$ มีคาบการแกว่งเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["$T = 2\\pi \\sqrt{\\frac{L}{g}}$"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              T &= 2\\pi \\sqrt{\\frac{L}{g}} \\\\
              &= 2\\pi \\sqrt{\\frac{2.5}{10}} \\\\
              &= 2\\pi \\sqrt{0.25} \\\\
              &= 2\\pi(0.5) \\\\
              &= \\pi \\\\
              &\\approx 3.14\\text{ s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$L = 2.5\\text{ m}$, $g = 10\\text{ m/s}^2$</p>
          <p>คาบการแกว่ง $T = $ <input type="text" class="answer-input" placeholder="3.14"> $\\text{s}$</p>
        `,
        advancedHtml: `
          <p>คาบการแกว่ง $T = $ <input type="text" class="answer-input" placeholder="3.14"> $\\text{s}$</p>
        `
      },
      {
        id: "shm_3",
        text: "อนุภาคหนึ่งเคลื่อนที่แบบ SHM ด้วยความถี่ $2 \\text{ Hz}$ แอมพลิจูด $10 \\text{ cm}$ จงหาอัตราเร็วสูงสุดของการเคลื่อนที่",
        hints: ["$v_{\\max} = \\omega A$", "$\\omega = 2\\pi f$"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              v_{\\max} &= \\omega A \\\\
              &= (2\\pi f) A \\\\
              &= (2\\pi \\times 2)(0.1) \\\\
              &= 0.4\\pi \\\\
              &\\approx 1.26\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$f = 2\\text{ Hz}$, $A = 0.1\\text{ m}$</p>
          <p>อัตราเร็วสูงสุด $v_{\\max} = $ <input type="text" class="answer-input" placeholder="1.26"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>อัตราเร็วสูงสุด $v_{\\max} = $ <input type="text" class="answer-input" placeholder="1.26"> $\\text{m/s}$</p>
        `
      },
      {
        id: "shm_4",
        text: "วัตถุสั่นด้วยความถี่เชิงมุม $10 \\text{ rad/s}$ มีแอมพลิจูด $5 \\text{ cm}$ ความเร่งสูงสุดเป็นเท่าใด",
        hints: ["$a_{\\max} = \\omega^2 A$"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              a_{\\max} &= \\omega^2 A \\\\
              &= (10)^2(0.05) \\\\
              &= 100 \\times 0.05 \\\\
              &= 5\\text{ m/s}^2
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$\\omega = 10\\text{ rad/s}$, $A = 0.05\\text{ m}$</p>
          <p>ความเร่งสูงสุด $a_{\\max} = $ <input type="text" class="answer-input" placeholder="5"> $\\text{m/s}^2$</p>
        `,
        advancedHtml: `
          <p>ความเร่งสูงสุด $a_{\\max} = $ <input type="text" class="answer-input" placeholder="5"> $\\text{m/s}^2$</p>
        `
      },
      {
        id: "shm_5",
        text: "มวล $2 \\text{ kg}$ สั่นบนสปริงด้วยคาบ $4 \\text{ s}$ จงหาค่านิจของสปริง (กำหนดให้ $\\pi^2 \\approx 10$)",
        hints: ["$T^2 = 4\\pi^2 \\frac{m}{k} \\Rightarrow k = \\frac{4\\pi^2 m}{T^2}$"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              T &= 2\\pi \\sqrt{\\frac{m}{k}} \\\\
              T^2 &= \\frac{4\\pi^2 m}{k} \\\\
              k &= \\frac{4\\pi^2 m}{T^2} \\\\
              &= \\frac{4(10)(2)}{4^2} \\\\
              &= \\frac{80}{16} \\\\
              &= 5\\text{ N/m}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 2\\text{ kg}$, $T = 4\\text{ s}$</p>
          <p>ค่านิจสปริง $k = $ <input type="text" class="answer-input" placeholder="5"> $\\text{N/m}$</p>
        `,
        advancedHtml: `
          <p>ค่านิจสปริง $k = $ <input type="text" class="answer-input" placeholder="5"> $\\text{N/m}$</p>
        `
      },
      {
        id: "shm_6",
        text: "สมการการเคลื่อนที่คือ $x(t) = 0.5 \\sin(2\\pi t)$ เมตร อัตราเร็วที่เวลา $t = 0.25 \\text{ s}$ เป็นเท่าใด",
        hints: ["$v(t) = A\\omega \\cos(\\omega t)$"],
        guide: `
          <div class="step">
            <p>$$\\begin{aligned}
              v(t) &= A\\omega \\cos(\\omega t) \\\\
              &= (0.5)(2\\pi) \\cos(2\\pi t) \\\\
              &= \\pi \\cos(2\\pi t)
            \\end{aligned}$$</p>
            <p>แทนค่า $t = 0.25\\text{ s}$:</p>
            <p>$$\\begin{aligned}
              v(0.25) &= \\pi \\cos\\left(2\\pi \\times 0.25\\right) \\\\
              &= \\pi \\cos\\left(\\frac{\\pi}{2}\\right) \\\\
              &= \\pi(0) \\\\
              &= 0\\text{ m/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$x(t) = 0.5 \\sin(2\\pi t)$</p>
          <p>อัตราเร็วที่ $t=0.25\\text{ s}$: $v = $ <input type="text" class="answer-input" placeholder="0"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>อัตราเร็วที่ $t=0.25\\text{ s}$: $v = $ <input type="text" class="answer-input" placeholder="0"> $\\text{m/s}$</p>
        `
      },
      {
        id: "shm_7",
        text: "แขวนมวลกับสปริงเบาทำให้สปริงยืดออก $10 \\text{ cm}$ ในแนวดิ่ง เมื่อดึงมวลลงอีกเล็กน้อยแล้วปล่อย ความถี่เชิงมุมของการสั่นจะเป็นเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["$\\omega = \\sqrt{\\frac{g}{x_0}}$"],
        guide: `
          <div class="step">
            <p>จากเงื่อนไขสมดุล $mg = kx_0 \\Rightarrow \\frac{k}{m} = \\frac{g}{x_0}$:</p>
            <p>$$\\begin{aligned}
              \\omega &= \\sqrt{\\frac{g}{x_0}} \\\\
              &= \\sqrt{\\frac{10}{0.1}} \\\\
              &= \\sqrt{100} \\\\
              &= 10\\text{ rad/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$x_0 = 0.1\\text{ m}$, $g = 10\\text{ m/s}^2$</p>
          <p>ความถี่เชิงมุม $\\omega = $ <input type="text" class="answer-input" placeholder="10"> $\\text{rad/s}$</p>
        `,
        advancedHtml: `
          <p>ความถี่เชิงมุม $\\omega = $ <input type="text" class="answer-input" placeholder="10"> $\\text{rad/s}$</p>
        `
      },
      {
        id: "shm_8",
        text: "อนุภาคเคลื่อนที่แบบ SHM คาบ $2 \\text{ s}$ แอมพลิจูด $13 \\text{ cm}$ ขณะที่การกระจัดเป็น $5 \\text{ cm}$ อัตราเร็วของอนุภาคเป็นเท่าใด",
        hints: ["$\\omega = \\frac{2\\pi}{T}$", "$v = \\omega \\sqrt{A^2 - x^2}$"],
        guide: `
          <div class="step">
            <p><strong>ขั้นที่ 1:</strong> หาความถี่เชิงมุม ($\\omega$)</p>
            <p>$$\\begin{aligned}
              \\omega &= \\frac{2\\pi}{T} \\\\
              &= \\frac{2\\pi}{2} \\\\
              &= \\pi\\text{ rad/s}
            \\end{aligned}$$</p>
          </div>
          <div class="step">
            <p><strong>ขั้นที่ 2:</strong> หาอัตราเร็วที่การกระจัด $x = 5\\text{ cm}$</p>
            <p>$$\\begin{aligned}
              v &= \\omega \\sqrt{A^2 - x^2} \\\\
              &= \\pi \\sqrt{13^2 - 5^2} \\\\
              &= \\pi \\sqrt{169 - 25} \\\\
              &= \\pi \\sqrt{144} \\\\
              &= 12\\pi \\\\
              &\\approx 37.7\\text{ cm/s}
            \\end{aligned}$$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$T = 2\\text{ s}$, $A = 13\\text{ cm}$, $x = 5\\text{ cm}$</p>
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="37.7"> $\\text{cm/s}$</p>
        `,
        advancedHtml: `
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="37.7"> $\\text{cm/s}$</p>
        `
      },
      {
        id: "shm_9",
        text: "ลูกตุ้มนาฬิกามีคาบการแกว่ง $T$ บนโลก ถ้านำไปแกว่งบนดวงจันทร์ซึ่งมีความเร่งโน้มถ่วง $g_{\\text{moon}} = \\frac{1}{6}g_{\\text{earth}}$ คาบจะเป็นกี่เท่าของเดิม",
        hints: ["$T \\propto \\frac{1}{\\sqrt{g}}$"],
        guide: `
          <div class="step">
            <p>จากสูตร $T = 2\\pi \\sqrt{\\frac{L}{g}}$:</p>
            <p>$$\\begin{aligned}
              \\frac{T_{\\text{moon}}}{T_{\\text{earth}}} &= \\sqrt{\\frac{g_{\\text{earth}}}{g_{\\text{moon}}}} \\\\
              &= \\sqrt{\\frac{g_{\\text{earth}}}{\\frac{1}{6}g_{\\text{earth}}}} \\\\
              &= \\sqrt{6} \\\\
              &\\approx 2.45
            \\end{aligned}$$</p>
            <p>ดังนั้น คาบจะเพิ่มขึ้นเป็น $\\sqrt{6} \\approx 2.45$ เท่าของเดิม</p>
          </div>
        `,
        intermediateHtml: `
          <p>คาบบนดวงจันทร์เป็นกี่เท่าของเดิม: <input type="text" class="answer-input" placeholder="2.45"> เท่า</p>
        `,
        advancedHtml: `
          <p>คาบบนดวงจันทร์เป็นกี่เท่าของเดิม: <input type="text" class="answer-input" placeholder="2.45"> เท่า</p>
        `
      },
      {
        id: "shm_10",
        text: "กราฟระหว่างความเร่ง ($a$) กับการกระจัด ($x$) ของการเคลื่อนที่แบบฮาร์มอนิกอย่างง่ายมีลักษณะเป็นอย่างไร",
        hints: ["จากสมการ $a = -\\omega^2 x$ เทียบกับสมการเส้นตรง $y = mx$"],
        guide: `
          <div class="step">
            <p>จากนิยามของ SHM:</p>
            <p>$$a = -\\omega^2 x$$</p>
            <p>เมื่อเทียบกับสมการเส้นตรง $y = mx$:</p>
            <ul>
              <li>เป็นกราฟเส้นตรงผ่านจุดกำเนิด $(0, 0)$</li>
              <li>มีความชันเท่ากับ $-\\omega^2$ (ความชันเป็นลบ)</li>
            </ul>
          </div>
        `,
        intermediateHtml: `
          <p>กราฟเป็นเส้นตรงผ่านจุดกำเนิดและมีความชัน: <input type="text" class="answer-input" placeholder="เป็นลบ" data-answer="เป็นลบ"></p>
        `,
        advancedHtml: `
          <p>ลักษณะกราฟ: <input type="text" class="answer-input" placeholder="เป็นลบ" data-answer="เป็นลบ"></p>
        `
      }
    ]
  }
});
