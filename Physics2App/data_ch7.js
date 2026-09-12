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
            <p>1. หาความเร็วต้นในแนวดิ่ง: $u_y = u \\sin \\theta$</p>
            <p>$u_y = 20 \\sin 30^\\circ = 10 \\text{ m/s}$</p>
          </div>
          <div class="step">
            <p>2. หาเวลาทั้งหมด: $t = \\frac{2u_y}{g}$</p>
            <p>$t = \\frac{2(10)}{10} = 2 \\text{ s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u = 20 \\text{ m/s}$, $\\theta = 30^\\circ$, $g = 10 \\text{ m/s}^2$</p>
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
            <p>1. หาระยะไกลสุดจากสูตร $S_x = \\frac{u^2 \\sin 2\\theta}{g}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่า: $S_x = \\frac{50^2 \\sin(2 \\times 45^\\circ)}{10}$</p>
            <p>$S_x = \\frac{2500 \\times 1}{10} = 250 \\text{ m}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u = 50 \\text{ m/s}$, $\\theta = 45^\\circ$, $g = 10 \\text{ m/s}^2$</p>
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
            <p>1. หาความเร็วต้นในแนวดิ่ง: $u_y = u \\sin 60^\\circ$</p>
            <p>$u_y = 30 \\times \\frac{\\sqrt{3}}{2} = 15\\sqrt{3} \\text{ m/s}$</p>
          </div>
          <div class="step">
            <p>2. ที่จุดสูงสุด $v_y = 0$, หา $S_y$ จาก $v_y^2 = u_y^2 - 2gS_y$</p>
            <p>$0 = (15\\sqrt{3})^2 - 2(10)S_y$</p>
            <p>$20S_y = 225 \\times 3 = 675 \\Rightarrow S_y = 33.75 \\text{ m}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u_y = 15\\sqrt{3} \\text{ m/s}$, $g = 10 \\text{ m/s}^2$</p>
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
            <p>1. หาเวลาในการตกจากสมการแนวดิ่ง ($u_y = 0$):</p>
            <p>$20 = \\frac{1}{2}(10)t^2 \\Rightarrow t^2 = 4 \\Rightarrow t = 2 \\text{ s}$</p>
          </div>
          <div class="step">
            <p>2. หาระยะห่างในแนวระดับ:</p>
            <p>$S_x = u_x t = 10 \\times 2 = 20 \\text{ m}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u_x = 10 \\text{ m/s}$, $u_y = 0 \\text{ m/s}$, $S_y = 20 \\text{ m}$</p>
          <p>ระยะห่าง $S_x = $ <input type="text" class="answer-input" placeholder="20"> $\\text{m}$</p>
        `,
        advancedHtml: `
          <p>ระยะห่าง $S_x = $ <input type="text" class="answer-input" placeholder="20"> $\\text{m}$</p>
        `
      },
      {
        id: "proj_5",
        text: "เครื่องบินบินในระดับราบด้วยความเร็ว $100 \\text{ m/s}$ ที่ความสูง $500 \\text{ m}$ ปล่อยถุงเสบียงลงมา ถุงจะตกไกลจากจุดปล่อยในแนวระดับเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["ถุงเสบียงมีความเร็วต้นในแนวระดับเท่ากับเครื่องบิน", "$u_y = 0$"],
        guide: `
          <div class="step">
            <p>1. หาเวลาที่ใช้ในการตก: $S_y = \\frac{1}{2}gt^2$</p>
            <p>$500 = 5t^2 \\Rightarrow t^2 = 100 \\Rightarrow t = 10 \\text{ s}$</p>
          </div>
          <div class="step">
            <p>2. หาระยะในแนวระดับ: $S_x = u_x t$</p>
            <p>$S_x = 100 \\times 10 = 1000 \\text{ m}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u_x = 100 \\text{ m/s}$, $S_y = 500 \\text{ m}$, $g = 10 \\text{ m/s}^2$</p>
          <p>ระยะทาง $S_x = $ <input type="text" class="answer-input" placeholder="1000"> $\\text{m}$</p>
        `,
        advancedHtml: `
          <p>ระยะทาง $S_x = $ <input type="text" class="answer-input" placeholder="1000"> $\\text{m}$</p>
        `
      },
      {
        id: "proj_6",
        text: "ขว้างลูกบอลขึ้นไปด้วยความเร็ว $40 \\text{ m/s}$ ทำมุม $30^\\circ$ กับแนวระดับ จงหาความเร็วของลูกบอลที่จุดสูงสุด",
        hints: ["ที่จุดสูงสุด ความเร็วในแนวดิ่งเป็นศูนย์ ($v_y = 0$)", "ความเร็วในแนวระดับคงที่ตลอดการเคลื่อนที่ ($v_x = u_x$)"],
        guide: `
          <div class="step">
            <p>1. ที่จุดสูงสุด $v_y = 0$ ดังนั้นความเร็วรวมจะเท่ากับ $v_x$</p>
          </div>
          <div class="step">
            <p>2. คำนวณ $v_x = u \\cos \\theta$</p>
            <p>$v_x = 40 \\cos 30^\\circ = 40(\\frac{\\sqrt{3}}{2}) = 20\\sqrt{3} \\approx 34.64 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u = 40 \\text{ m/s}$, $\\theta = 30^\\circ$</p>
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="34.64"> $\\text{m/s}$ (ตอบทศนิยม 2 ตำแหน่ง หรือ $20\\sqrt{3}$)</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="34.64"> $\\text{m/s}$</p>
        `
      },
      {
        id: "proj_7",
        text: "เตะลูกบอลด้วยความเร็ว $25 \\text{ m/s}$ ทำมุม $53^\\circ$ กับพื้นสนาม เมื่อเวลาผ่านไป $1 \\text{ s}$ ลูกบอลอยู่สูงจากพื้นเท่าใด ($\\sin 53^\\circ = 0.8$, $g = 10 \\text{ m/s}^2$)",
        hints: ["พิจารณาการเคลื่อนที่ในแนวดิ่ง หา $u_y$", "ใช้สมการ $S_y = u_y t - \\frac{1}{2}gt^2$"],
        guide: `
          <div class="step">
            <p>1. หา $u_y = u \\sin 53^\\circ = 25(0.8) = 20 \\text{ m/s}$</p>
          </div>
          <div class="step">
            <p>2. หาระยะแนวดิ่งที่เวลา $t = 1 \\text{ s}$:</p>
            <p>$S_y = u_y t - \\frac{1}{2}gt^2 = 20(1) - \\frac{1}{2}(10)(1)^2$</p>
            <p>$S_y = 20 - 5 = 15 \\text{ m}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$u_y = 20 \\text{ m/s}$, $t = 1 \\text{ s}$, $g = 10 \\text{ m/s}^2$</p>
          <p>ความสูง $S_y = $ <input type="text" class="answer-input" placeholder="15"> $\\text{m}$</p>
        `,
        advancedHtml: `
          <p>ความสูง $S_y = $ <input type="text" class="answer-input" placeholder="15"> $\\text{m}$</p>
        `
      },
      {
        id: "proj_8",
        text: "โยนวัตถุทำมุม $45^\\circ$ ปรากฏว่าวัตถุตกไกล $40 \\text{ m}$ ความเร็วต้นในการโยนมีค่าเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["ใช้สมการระยะตกไกลสุด $S_x = \\frac{u^2 \\sin 2\\theta}{g}$"],
        guide: `
          <div class="step">
            <p>1. จัดรูปสมการหา $u^2$:</p>
            <p>$u^2 = \\frac{S_x \\cdot g}{\\sin 2\\theta}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่า:</p>
            <p>$u^2 = \\frac{40 \\times 10}{\\sin 90^\\circ} = \\frac{400}{1} = 400$</p>
            <p>$u = 20 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$S_x = 40 \\text{ m}$, $\\theta = 45^\\circ$, $g = 10 \\text{ m/s}^2$</p>
          <p>ความเร็ว $u = $ <input type="text" class="answer-input" placeholder="20"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $u = $ <input type="text" class="answer-input" placeholder="20"> $\\text{m/s}$</p>
        `
      },
      {
        id: "proj_9",
        text: "ลูกปืนถูกยิงออกไปทำมุม $30^\\circ$ กับแนวระดับ หากลูกปืนขึ้นไปได้สูงสุด $45 \\text{ m}$ เวลาทั้งหมดที่ลูกปืนอยู่ในอากาศคือเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["หาระยะเวลาที่ใช้ไปถึงจุดสูงสุดจาก $S_y = \\frac{1}{2}gt^2$ หรือเทียบ $u_y$", "เวลาทั้งหมดคือ $2 \\times$ เวลาขาขึ้น"],
        guide: `
          <div class="step">
            <p>1. หาเวลาขาขึ้น จาก $S_y$ สูงสุด คิดกลับเหมือนปล่อยตกอิสระ $S = \\frac{1}{2}gt_{up}^2$</p>
            <p>$45 = 5t_{up}^2 \\Rightarrow t_{up}^2 = 9 \\Rightarrow t_{up} = 3 \\text{ s}$</p>
          </div>
          <div class="step">
            <p>2. เวลาทั้งหมด $t = 2 \\times t_{up}$</p>
            <p>$t = 2 \\times 3 = 6 \\text{ s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$S_{ymax} = 45 \\text{ m}$, $g = 10 \\text{ m/s}^2$</p>
          <p>เวลา $t = $ <input type="text" class="answer-input" placeholder="6"> $\\text{s}$</p>
        `,
        advancedHtml: `
          <p>เวลา $t = $ <input type="text" class="answer-input" placeholder="6"> $\\text{s}$</p>
        `
      },
      {
        id: "proj_10",
        text: "วัตถุเคลื่อนที่แบบโพรเจกไทล์ มีความเร็วต้น $20 \\text{ m/s}$ ทำมุม $53^\\circ$ กับแนวระดับ จงหาอัตราเร็วของวัตถุเมื่อเวลาผ่านไป $2 \\text{ s}$ ($\\sin 53^\\circ = 0.8, \\cos 53^\\circ = 0.6$)",
        hints: ["หา $v_x$ และ $v_y$ ที่ $t=2$", "อัตราเร็ว $v = \\sqrt{v_x^2 + v_y^2}$"],
        guide: `
          <div class="step">
            <p>1. หา $v_x$ และ $u_y$:</p>
            <p>$v_x = 20(0.6) = 12 \\text{ m/s}$ (คงที่)</p>
            <p>$u_y = 20(0.8) = 16 \\text{ m/s}$</p>
          </div>
          <div class="step">
            <p>2. หา $v_y$ ที่ $t=2$:</p>
            <p>$v_y = u_y - gt = 16 - (10)(2) = -4 \\text{ m/s}$ (ทิศลง)</p>
          </div>
          <div class="step">
            <p>3. หาอัตราเร็ว $v$:</p>
            <p>$v = \\sqrt{12^2 + (-4)^2} = \\sqrt{144 + 16} = \\sqrt{160} = 4\\sqrt{10} \\approx 12.65 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$v_x = 12 \\text{ m/s}$, $v_y = -4 \\text{ m/s}$</p>
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="12.65"> $\\text{m/s}$ (ตอบทศนิยม 2 ตำแหน่ง)</p>
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
          <li>รถเลี้ยวโค้งบนถนนราบ: $\\mu_s N = m \\frac{v^2}{r} \\Rightarrow v_{max} = \\sqrt{\\mu_s r g}$</li>
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
            <p>1. แทนค่าในสูตร $F_c = \\frac{mv^2}{r}$</p>
            <p>$T = \\frac{(2)(4^2)}{0.5} = \\frac{32}{0.5} = 64 \\text{ N}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 2 \\text{ kg}$, $v = 4 \\text{ m/s}$, $r = 0.5 \\text{ m}$</p>
          <p>แรงดึง $T = $ <input type="text" class="answer-input" placeholder="64"> $\\text{N}$</p>
        `,
        advancedHtml: `
          <p>แรงดึง $T = $ <input type="text" class="answer-input" placeholder="64"> $\\text{N}$</p>
        `
      },
      {
        id: "circ_2",
        text: "รถยนต์เลี้ยวโค้งบนถนนราบที่มีรัศมีความโค้ง $40 \\text{ m}$ สัมประสิทธิ์ความเสียดทานสถิตระหว่างยางกับถนนคือ $0.4$ จงหาความเร็วสูงสุดที่รถสามารถเลี้ยวโค้งได้โดยไม่ไถล ($g = 10 \\text{ m/s}^2$)",
        hints: ["$v_{max} = \\sqrt{\\mu_s r g}$"],
        guide: `
          <div class="step">
            <p>1. แรงเสียดทานสถิตสูงสุดทำหน้าที่เป็นแรงสู่ศูนย์กลาง:</p>
            <p>$\\mu_s mg = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{\\mu_s rg}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่า:</p>
            <p>$v = \\sqrt{(0.4)(40)(10)} = \\sqrt{160} = 4\\sqrt{10} \\approx 12.65 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 40 \\text{ m}$, $\\mu_s = 0.4$, $g = 10 \\text{ m/s}^2$</p>
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="12.65"> $\\text{m/s}$ (ตอบทศนิยม 2 ตำแหน่ง หรือ $4\\sqrt{10}$)</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="12.65"> $\\text{m/s}$</p>
        `
      },
      {
        id: "circ_3",
        text: "วัตถุเคลื่อนที่เป็นวงกลมรัศมี $2 \\text{ m}$ ด้วยความถี่ $5 \\text{ Hz}$ จงหาความเร่งสู่ศูนย์กลาง",
        hints: ["หา $\\omega = 2\\pi f$", "$a_c = \\omega^2 r$"],
        guide: `
          <div class="step">
            <p>1. หาอัตราเร็วเชิงมุม $\\omega = 2\\pi(5) = 10\\pi \\text{ rad/s}$</p>
          </div>
          <div class="step">
            <p>2. หาความเร่งสู่ศูนย์กลาง $a_c = \\omega^2 r$</p>
            <p>$a_c = (10\\pi)^2(2) = 200\\pi^2 \\approx 1973.92 \\text{ m/s}^2$ (ใช้ $\\pi^2 \\approx 9.87$)</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 2 \\text{ m}$, $f = 5 \\text{ Hz}$</p>
          <p>ความเร่ง $a_c = $ <input type="text" class="answer-input" placeholder="1973.92"> $\\text{m/s}^2$ (อนุโลมตอบ $200\\pi^2$ ในรูป 200pi^2)</p>
        `,
        advancedHtml: `
          <p>ความเร่ง $a_c = $ <input type="text" class="answer-input" placeholder="1973.92"> $\\text{m/s}^2$</p>
        `
      },
      {
        id: "circ_4",
        text: "มอเตอร์ไซค์ไต่ถังทรงกระบอกรัศมี $5 \\text{ m}$ สัมประสิทธิ์ความเสียดทานระหว่างยางกับผนังถังคือ $0.5$ จงหาความเร็วขั้นต่ำที่จะไม่ตกลงมา ($g = 10 \\text{ m/s}^2$)",
        hints: ["แรงเสียดทานต้องรับน้ำหนักมอเตอร์ไซค์ $f_s = mg$", "$f_s = \\mu N$ และ $N = F_c = \\frac{mv^2}{r}$"],
        guide: `
          <div class="step">
            <p>1. ตั้งสมการ: $\\mu \\frac{mv^2}{r} = mg$</p>
            <p>$v = \\sqrt{\\frac{rg}{\\mu}}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่า:</p>
            <p>$v = \\sqrt{\\frac{(5)(10)}{0.5}} = \\sqrt{100} = 10 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 5 \\text{ m}$, $\\mu = 0.5$, $g = 10 \\text{ m/s}^2$</p>
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="10"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="10"> $\\text{m/s}$</p>
        `
      },
      {
        id: "circ_5",
        text: "แกว่งวัตถุมวล $1 \\text{ kg}$ ในแนวดิ่งด้วยเชือกยาว $1 \\text{ m}$ เมื่อถึงจุดต่ำสุดมีความเร็ว $5 \\text{ m/s}$ แรงดึงเส้นเชือกที่จุดต่ำสุดเป็นเท่าใด ($g = 10 \\text{ m/s}^2$)",
        hints: ["ที่จุดต่ำสุด $T - mg = F_c$"],
        guide: `
          <div class="step">
            <p>1. สมการแรงที่จุดต่ำสุด: $T - mg = \\frac{mv^2}{r}$</p>
            <p>$T = mg + \\frac{mv^2}{r}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่า:</p>
            <p>$T = (1)(10) + \\frac{(1)(5^2)}{1} = 10 + 25 = 35 \\text{ N}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 1 \\text{ kg}$, $v = 5 \\text{ m/s}$, $r = 1 \\text{ m}$</p>
          <p>แรงดึง $T = $ <input type="text" class="answer-input" placeholder="35"> $\\text{N}$</p>
        `,
        advancedHtml: `
          <p>แรงดึง $T = $ <input type="text" class="answer-input" placeholder="35"> $\\text{N}$</p>
        `
      },
      {
        id: "circ_6",
        text: "ถนนโค้งเอียงมุม $45^\\circ$ กับแนวระดับ รัศมีความโค้ง $100 \\text{ m}$ หากไม่มีความเสียดทาน รถจะต้องขับด้วยความเร็วเท่าใดจึงจะเลี้ยวโค้งได้อย่างปลอดภัย ($g = 10 \\text{ m/s}^2$)",
        hints: ["ใช้สมการเลี้ยวโค้งบนถนนเอียง $\\tan \\theta = \\frac{v^2}{rg}$"],
        guide: `
          <div class="step">
            <p>1. จัดรูปหา $v$:</p>
            <p>$v = \\sqrt{rg \\tan \\theta}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่า:</p>
            <p>$v = \\sqrt{(100)(10) \\tan 45^\\circ} = \\sqrt{1000(1)} = 10\\sqrt{10} \\approx 31.62 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 100 \\text{ m}$, $\\theta = 45^\\circ$, $g = 10 \\text{ m/s}^2$</p>
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="31.62"> $\\text{m/s}$ (ตอบทศนิยม 2 ตำแหน่ง)</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="31.62"> $\\text{m/s}$</p>
        `
      },
      {
        id: "circ_7",
        text: "ดาวเทียมโคจรรอบโลกที่ระยะห่างจากจุดศูนย์กลางโลก $R$ ด้วยอัตราเร็ว $v$ หากดาวเทียมย้ายไปโคจรที่ระยะ $4R$ อัตราเร็วในการโคจรจะเป็นเท่าใด",
        hints: ["แรงดึงดูดระหว่างมวลเป็นแรงสู่ศูนย์กลาง $\\frac{GMm}{r^2} = \\frac{mv^2}{r}$", "$v \\propto \\frac{1}{\\sqrt{r}}$"],
        guide: `
          <div class="step">
            <p>1. ความสัมพันธ์ระหว่าง $v$ และ $r$ คือ $v = \\sqrt{\\frac{GM}{r}}$</p>
          </div>
          <div class="step">
            <p>2. เมื่อรัศมีเพิ่มเป็น 4 เท่า: $v' = \\sqrt{\\frac{GM}{4r}} = \\frac{1}{2}\\sqrt{\\frac{GM}{r}} = 0.5v$</p>
          </div>
        `,
        intermediateHtml: `
          <p>รัศมีใหม่ $r' = 4R$</p>
          <p>อัตราเร็วใหม่ $v' = $ <input type="text" class="answer-input" placeholder="0.5"> เท่าของ $v$</p>
        `,
        advancedHtml: `
          <p>อัตราเร็วใหม่ $v' = $ <input type="text" class="answer-input" placeholder="0.5"> เท่าของ $v$</p>
        `
      },
      {
        id: "circ_8",
        text: "ลูกตุ้มกรวยทำด้วยเชือกยาว $1 \\text{ m}$ ปลายแขวนมวล $0.5 \\text{ kg}$ แกว่งให้ทำมุม $60^\\circ$ กับแนวดิ่ง จงหาแรงตึงในเส้นเชือก ($g = 10 \\text{ m/s}^2$)",
        hints: ["พิจารณาแรงในแนวดิ่ง $T \\cos \\theta = mg$"],
        guide: `
          <div class="step">
            <p>1. สมดุลในแนวดิ่ง: $T \\cos 60^\\circ = mg$</p>
          </div>
          <div class="step">
            <p>2. หา $T$:</p>
            <p>$T = \\frac{mg}{\\cos 60^\\circ} = \\frac{0.5 \\times 10}{0.5} = 10 \\text{ N}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 0.5 \\text{ kg}$, $\\theta = 60^\\circ$, $g = 10 \\text{ m/s}^2$</p>
          <p>แรงตึงเชือก $T = $ <input type="text" class="answer-input" placeholder="10"> $\\text{N}$</p>
        `,
        advancedHtml: `
          <p>แรงตึงเชือก $T = $ <input type="text" class="answer-input" placeholder="10"> $\\text{N}$</p>
        `
      },
      {
        id: "circ_9",
        text: "เครื่องเล่นหมุนในสวนสนุกมีรัศมี $4 \\text{ m}$ หมุนด้วยอัตราเร็วคงที่ 15 รอบต่อนาที จงหาความเร็วเชิงเส้นของผู้เล่นที่อยู่ขอบนอก",
        hints: ["แปลงรอบต่อนาที (rpm) เป็น rad/s: $\\omega = \\frac{2\\pi \\times 15}{60}$", "$v = \\omega r$"],
        guide: `
          <div class="step">
            <p>1. หา $\\omega$:</p>
            <p>$\\omega = 15 \\text{ rpm} = \\frac{15 \\times 2\\pi}{60} = 0.5\\pi \\text{ rad/s}$</p>
          </div>
          <div class="step">
            <p>2. หา $v$:</p>
            <p>$v = \\omega r = 0.5\\pi \\times 4 = 2\\pi \\approx 6.28 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$r = 4 \\text{ m}$, ความถี่ $= 15 \\text{ rpm}$</p>
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="6.28"> $\\text{m/s}$ (ตอบทศนิยม 2 ตำแหน่ง หรือ $2\\pi$)</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="6.28"> $\\text{m/s}$</p>
        `
      },
      {
        id: "circ_10",
        text: "ลูกปัดไถลไปตามรางวงกลมในระนาบดิ่งรัศมี $R$ หากต้องการให้ลูกปัดไถลผ่านจุดสูงสุดได้พอดี ลูกปัดต้องมีความเร็วที่จุดสูงสุดเท่าใด",
        hints: ["ที่จุดสูงสุดผ่านได้พอดี แปลว่าแรงปฏิกิริยาตั้งฉาก $N = 0$", "$mg = \\frac{mv^2}{R}$"],
        guide: `
          <div class="step">
            <p>1. ตั้งสมการที่จุดสูงสุด: $N + mg = \\frac{mv^2}{R}$</p>
          </div>
          <div class="step">
            <p>2. เมื่อพอดีผ่านได้ $N = 0$:</p>
            <p>$mg = \\frac{mv^2}{R} \\Rightarrow v = \\sqrt{Rg}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>รัศมี $R$, แรงโน้มถ่วง $g$</p>
          <p>ความเร็ว $v = \\sqrt{\\text{?}}$ <input type="text" class="answer-input" placeholder="Rg"> (พิมพ์ Rg)</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $v = \\sqrt{\\text{?}}$ <input type="text" class="answer-input" placeholder="Rg"> (พิมพ์ Rg)</p>
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
          <li><strong>สมการการเคลื่อนที่ (เมื่อเริ่มต้นที่สมดุล):</strong> $x(t) = A \\sin(\\omega t)$</li>
          <li><strong>ความเร็ว:</strong> $v = \\omega \\sqrt{A^2 - x^2}$, $v_{max} = \\omega A$ (ที่สมดุล $x=0$)</li>
          <li><strong>ความเร่ง:</strong> $a = -\\omega^2 x$, $a_{max} = \\omega^2 A$ (ที่จุดปลาย $x = \\pm A$)</li>
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
            <p>1. แทนค่าในสูตร:</p>
            <p>$T = 2\\pi \\sqrt{\\frac{0.5}{50}} = 2\\pi \\sqrt{0.01}$</p>
          </div>
          <div class="step">
            <p>2. คำนวณ:</p>
            <p>$T = 2\\pi (0.1) = 0.2\\pi \\approx 0.628 \\text{ s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 0.5 \\text{ kg}$, $k = 50 \\text{ N/m}$</p>
          <p>คาบ $T = $ <input type="text" class="answer-input" placeholder="0.628"> $\\text{s}$ (ตอบทศนิยม 3 ตำแหน่ง หรือ $0.2\\pi$)</p>
        `,
        advancedHtml: `
          <p>คาบ $T = $ <input type="text" class="answer-input" placeholder="0.628"> $\\text{s}$</p>
        `
      },
      {
        id: "shm_2",
        text: "ลูกตุ้มนาฬิกายาว $2.5 \\text{ m}$ แกว่งบนโลก ($g = 10 \\text{ m/s}^2$) จะมีคาบการแกว่งเป็นเท่าใด",
        hints: ["$T = 2\\pi \\sqrt{\\frac{L}{g}}$"],
        guide: `
          <div class="step">
            <p>1. แทนค่าในสูตร:</p>
            <p>$T = 2\\pi \\sqrt{\\frac{2.5}{10}} = 2\\pi \\sqrt{0.25}$</p>
          </div>
          <div class="step">
            <p>2. คำนวณ:</p>
            <p>$T = 2\\pi (0.5) = \\pi \\approx 3.14 \\text{ s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$L = 2.5 \\text{ m}$, $g = 10 \\text{ m/s}^2$</p>
          <p>คาบ $T = $ <input type="text" class="answer-input" placeholder="3.14"> $\\text{s}$ (หรือ $\\pi$)</p>
        `,
        advancedHtml: `
          <p>คาบ $T = $ <input type="text" class="answer-input" placeholder="3.14"> $\\text{s}$</p>
        `
      },
      {
        id: "shm_3",
        text: "วัตถุสั่นแบบ SHM มีแอมพลิจูด $10 \\text{ cm}$ และความถี่ $2 \\text{ Hz}$ จงหาอัตราเร็วสูงสุดของวัตถุนี้",
        hints: ["$v_{max} = \\omega A$", "$\\omega = 2\\pi f$"],
        guide: `
          <div class="step">
            <p>1. หา $\\omega$:</p>
            <p>$\\omega = 2\\pi(2) = 4\\pi \\text{ rad/s}$</p>
          </div>
          <div class="step">
            <p>2. หา $v_{max}$ (แปลง $A$ เป็นเมตร):</p>
            <p>$v_{max} = (4\\pi)(0.1) = 0.4\\pi \\approx 1.26 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$A = 0.1 \\text{ m}$, $f = 2 \\text{ Hz}$</p>
          <p>ความเร็ว $v_{max} = $ <input type="text" class="answer-input" placeholder="1.26"> $\\text{m/s}$ (ตอบทศนิยม 2 ตำแหน่ง หรือ $0.4\\pi$)</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $v_{max} = $ <input type="text" class="answer-input" placeholder="1.26"> $\\text{m/s}$</p>
        `
      },
      {
        id: "shm_4",
        text: "วัตถุสั่นแบบ SHM มีแอมพลิจูด $5 \\text{ cm}$ และอัตราเร็วเชิงมุม $10 \\text{ rad/s}$ จงหาขนาดความเร่งสูงสุด",
        hints: ["$a_{max} = \\omega^2 A$"],
        guide: `
          <div class="step">
            <p>1. แปลง $A$ เป็นเมตร: $A = 0.05 \\text{ m}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่าหาความเร่งสูงสุด:</p>
            <p>$a_{max} = (10)^2(0.05) = 100 \\times 0.05 = 5 \\text{ m/s}^2$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$A = 0.05 \\text{ m}$, $\\omega = 10 \\text{ rad/s}$</p>
          <p>ความเร่ง $a_{max} = $ <input type="text" class="answer-input" placeholder="5"> $\\text{m/s}^2$</p>
        `,
        advancedHtml: `
          <p>ความเร่ง $a_{max} = $ <input type="text" class="answer-input" placeholder="5"> $\\text{m/s}^2$</p>
        `
      },
      {
        id: "shm_5",
        text: "ระบบมวล-สปริง มีมวล $2 \\text{ kg}$ แกว่งด้วยคาบ $4 \\text{ s}$ ค่านิจสปริงมีค่าเท่าใด",
        hints: ["จัดรูป $T = 2\\pi \\sqrt{\\frac{m}{k}}$ หา $k$"],
        guide: `
          <div class="step">
            <p>1. ยกกำลังสองทั้งสองข้าง:</p>
            <p>$T^2 = 4\\pi^2 \\frac{m}{k} \\Rightarrow k = \\frac{4\\pi^2 m}{T^2}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่า (ให้ $\\pi^2 \\approx 10$):</p>
            <p>$k = \\frac{4(10)(2)}{4^2} = \\frac{80}{16} = 5 \\text{ N/m}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$m = 2 \\text{ kg}$, $T = 4 \\text{ s}$, ให้ $\\pi^2 \\approx 10$</p>
          <p>ค่านิจสปริง $k = $ <input type="text" class="answer-input" placeholder="5"> $\\text{N/m}$</p>
        `,
        advancedHtml: `
          <p>ค่านิจสปริง $k = $ <input type="text" class="answer-input" placeholder="5"> $\\text{N/m}$</p>
        `
      },
      {
        id: "shm_6",
        text: "วัตถุเคลื่อนที่แบบ SHM ด้วยสมการ $x = 0.5 \\sin(2\\pi t)$ เมตร จงหาอัตราเร็วของวัตถุที่เวลา $t = 0.25 \\text{ s}$",
        hints: ["สมการความเร็ว $v = \\frac{dx}{dt} = A\\omega \\cos(\\omega t)$"],
        guide: `
          <div class="step">
            <p>1. หา $v(t)$ จากสมการ $x(t)$:</p>
            <p>$v = (0.5)(2\\pi) \\cos(2\\pi t) = \\pi \\cos(2\\pi t)$</p>
          </div>
          <div class="step">
            <p>2. แทน $t = 0.25$:</p>
            <p>$v = \\pi \\cos(2\\pi(0.25)) = \\pi \\cos(\\frac{\\pi}{2}) = \\pi(0) = 0 \\text{ m/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$v(t) = \\pi \\cos(2\\pi t)$, $t = 0.25 \\text{ s}$</p>
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="0"> $\\text{m/s}$</p>
        `,
        advancedHtml: `
          <p>ความเร็ว $v = $ <input type="text" class="answer-input" placeholder="0"> $\\text{m/s}$</p>
        `
      },
      {
        id: "shm_7",
        text: "สปริงมีค่านิจ $200 \\text{ N/m}$ แขวนมวล $M$ ทำให้สปริงยืดออก $10 \\text{ cm}$ ถ้านำไปแกว่งเป็น SHM จะมีอัตราเร็วเชิงมุมเท่าใด",
        hints: ["หา $M$ จากสมดุล $Mg = kx$ ก่อน แล้วใช้ $\\omega = \\sqrt{\\frac{k}{m}}$", "หรือ $\\omega = \\sqrt{\\frac{g}{x}}$ โดยตรง (จาก $k/M = g/x$)"],
        guide: `
          <div class="step">
            <p>1. ใช้ความสัมพันธ์ $\\frac{k}{m} = \\frac{g}{x}$:</p>
            <p>$\\omega = \\sqrt{\\frac{g}{x}}$</p>
          </div>
          <div class="step">
            <p>2. แทนค่า ($x = 0.1 \\text{ m}$):</p>
            <p>$\\omega = \\sqrt{\\frac{10}{0.1}} = \\sqrt{100} = 10 \\text{ rad/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$x = 0.1 \\text{ m}$, $g = 10 \\text{ m/s}^2$</p>
          <p>อัตราเร็วเชิงมุม $\\omega = $ <input type="text" class="answer-input" placeholder="10"> $\\text{rad/s}$</p>
        `,
        advancedHtml: `
          <p>อัตราเร็วเชิงมุม $\\omega = $ <input type="text" class="answer-input" placeholder="10"> $\\text{rad/s}$</p>
        `
      },
      {
        id: "shm_8",
        text: "อนุภาคหนึ่งสั่นแบบ SHM มีแอมพลิจูด $13 \\text{ cm}$ และคาบ $2 \\text{ s}$ จงหาอัตราเร็วเมื่ออนุภาคอยู่ห่างจากจุดสมดุล $5 \\text{ cm}$",
        hints: ["ใช้สูตร $v = \\omega \\sqrt{A^2 - x^2}$", "$\\omega = \\frac{2\\pi}{T}$"],
        guide: `
          <div class="step">
            <p>1. หา $\\omega = \\frac{2\\pi}{2} = \\pi \\text{ rad/s}$</p>
          </div>
          <div class="step">
            <p>2. ใช้สูตร $v = \\omega \\sqrt{A^2 - x^2}$:</p>
            <p>$v = \\pi \\sqrt{13^2 - 5^2} = \\pi \\sqrt{169 - 25} = \\pi \\sqrt{144} = 12\\pi \\approx 37.7 \\text{ cm/s}$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$A = 13 \\text{ cm}$, $x = 5 \\text{ cm}$, $\\omega = \\pi \\text{ rad/s}$</p>
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="37.7"> $\\text{cm/s}$ (ตอบทศนิยม 1 ตำแหน่ง หรือ $12\\pi$)</p>
        `,
        advancedHtml: `
          <p>อัตราเร็ว $v = $ <input type="text" class="answer-input" placeholder="37.7"> $\\text{cm/s}$</p>
        `
      },
      {
        id: "shm_9",
        text: "ลูกตุ้มนาฬิกาแกว่งบนโลกด้วยคาบ $T$ ถ้านำไปแกว่งบนดวงจันทร์ซึ่งมีค่า $g$ เป็น $\\frac{1}{6}$ ของโลก คาบการแกว่งจะเป็นเท่าใด",
        hints: ["$T \\propto \\frac{1}{\\sqrt{g}}$"],
        guide: `
          <div class="step">
            <p>1. คาบแปรผกผันกับรากที่สองของ $g$: $\\frac{T_{moon}}{T_{earth}} = \\sqrt{\\frac{g_{earth}}{g_{moon}}}$</p>
          </div>
          <div class="step">
            <p>2. แทน $g_{moon} = \\frac{g_{earth}}{6}$:</p>
            <p>$\\frac{T_{moon}}{T} = \\sqrt{6} \\Rightarrow T_{moon} = \\sqrt{6} T$</p>
          </div>
        `,
        intermediateHtml: `
          <p>$g_{moon} = \\frac{1}{6} g_{earth}$</p>
          <p>คาบใหม่ $= $ <input type="text" class="answer-input" placeholder="\\sqrt{6}"> $T$ (พิมพ์ \\sqrt{6} หรือ sqrt(6))</p>
        `,
        advancedHtml: `
          <p>คาบใหม่ $= $ <input type="text" class="answer-input" placeholder="\\sqrt{6}"> $T$ (พิมพ์ \\sqrt{6} หรือ sqrt(6))</p>
        `
      },
      {
        id: "shm_10",
        text: "กราฟความเร่งของการเคลื่อนที่แบบ SHM สัมพันธ์กับการกระจัดอย่างไร",
        hints: ["พิจารณาสมการ $a = -\\omega^2 x$"],
        guide: `
          <div class="step">
            <p>1. จากสมการ $a = -\\omega^2 x$ พบว่าเป็นสมการเส้นตรง ($y = mx$) ที่มีความชันเป็นลบ</p>
          </div>
          <div class="step">
            <p>2. ดังนั้น กราฟเป็นเส้นตรงผ่านจุดกำเนิด และมีความชันติดลบ</p>
          </div>
        `,
        intermediateHtml: `
          <p>สมการ $a = -\\omega^2 x$</p>
          <p>กราฟเป็นเส้น <input type="text" class="answer-input" placeholder="ตรง"> ความชันเป็น <input type="text" class="answer-input" placeholder="ลบ"></p>
        `,
        advancedHtml: `
          <p>กราฟเป็นเส้น <input type="text" class="answer-input" placeholder="ตรง"> ความชันเป็น <input type="text" class="answer-input" placeholder="ลบ"></p>
        `
      }
    ]
  }
});
