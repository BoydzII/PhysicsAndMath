// main_equations.js - "สมการหลัก" แบบเวกเตอร์ (ลูกศรครึ่งซีก) แสดงก่อนขั้นตอนคำนวณของโจทย์แต่ละข้อ
// หมวดของโจทย์ท้าทายจัดจาก hints/เนื้อโจทย์ (สคริปต์สร้าง: scratchpad/genmain.js)
(function() {
var EQ = {
  work: { name: "งาน", tex: "W = \\overrightharpoon{F}\\cdot\\overrightharpoon{s} = Fs\\cos\\theta" },
  power: { name: "กำลัง", tex: "P = \\dfrac{W}{t} = \\overrightharpoon{F}\\cdot\\overrightharpoon{v}" },
  kinetic: { name: "งาน–พลังงานจลน์", tex: "W_{net} = \\overrightharpoon{F}_{net}\\cdot\\overrightharpoon{s} = \\Delta E_k = \\tfrac12 mv^2 - \\tfrac12 mu^2" },
  potential: { name: "พลังงานศักย์", tex: "\\Delta E_p = -m\\overrightharpoon{g}\\cdot\\Delta\\overrightharpoon{s} = mgh \\qquad E_p = \\tfrac12 kx^2" },
  conservation: { name: "อนุรักษ์พลังงานกล", tex: "E_{k1} + E_{p1} + \\overrightharpoon{F}_{nc}\\cdot\\overrightharpoon{s} = E_{k2} + E_{p2}" },
  momentum: { name: "โมเมนตัม", tex: "\\overrightharpoon{p} = m\\overrightharpoon{v} \\qquad \\Delta\\overrightharpoon{p} = m\\overrightharpoon{v} - m\\overrightharpoon{u}" },
  impulse: { name: "การดล", tex: "\\overrightharpoon{I} = \\overrightharpoon{F}\\,\\Delta t = \\Delta\\overrightharpoon{p} = m\\overrightharpoon{v} - m\\overrightharpoon{u}" },
  collision: { name: "อนุรักษ์โมเมนตัม", tex: "m_1\\overrightharpoon{u}_1 + m_2\\overrightharpoon{u}_2 = m_1\\overrightharpoon{v}_1 + m_2\\overrightharpoon{v}_2" },
  projectile: { name: "โพรเจกไทล์", tex: "\\overrightharpoon{v} = \\overrightharpoon{u} + \\overrightharpoon{g}t \\qquad \\overrightharpoon{s} = \\overrightharpoon{u}t + \\tfrac12\\overrightharpoon{g}t^2" },
  circular: { name: "การเคลื่อนที่แบบวงกลม", tex: "\\overrightharpoon{F}_c = m\\overrightharpoon{a}_c \\qquad a_c = \\dfrac{v^2}{r} = \\omega^2 r" },
  shm: { name: "ฮาร์มอนิกอย่างง่าย", tex: "\\overrightharpoon{F} = -k\\overrightharpoon{x} \\qquad \\overrightharpoon{a} = -\\omega^2\\overrightharpoon{x}" },
};
var BY_ID = {"ch5_c1":"work","ch5_c2":"work","ch5_c3":"work","ch5_c4":"work","ch5_c5":"work","ch5_c6":"power","ch5_c7":"power","ch5_c8":"power","ch5_c9":"power","ch5_c10":"power","ch5_c11":"kinetic","ch5_c12":"kinetic","ch5_c13":"kinetic","ch5_c14":"kinetic","ch5_c15":"kinetic","ch5_c16":"conservation","ch5_c17":"conservation","ch5_c18":"conservation","ch5_c19":"conservation","ch5_c20":"conservation","ch5_c21":"potential","ch5_c22":"potential","ch5_c23":"potential","ch5_c24":"potential","ch5_c25":"potential","ch5_c26":"work","ch5_c27":"work","ch5_c28":"work","ch5_c29":"work","ch5_c30":"work","ch5_c31":"conservation","ch5_c32":"conservation","ch5_c33":"conservation","ch5_c34":"conservation","ch5_c35":"conservation","ch5_c36":"work","ch5_c37":"work","ch5_c38":"work","ch5_c39":"work","ch5_c40":"work","ch6_c1":"momentum","ch6_c2":"momentum","ch6_c3":"momentum","ch6_c4":"momentum","ch6_c5":"impulse","ch6_c6":"impulse","ch6_c7":"impulse","ch6_c8":"momentum","ch6_c9":"impulse","ch6_c10":"impulse","ch6_c11":"collision","ch6_c12":"impulse","ch6_c13":"collision","ch6_c14":"collision","ch6_c15":"collision","ch6_c16":"collision","ch6_c17":"collision","ch6_c18":"momentum","ch6_c19":"collision","ch6_c20":"collision","ch6_c21":"collision","ch6_c22":"collision","ch6_c23":"collision","ch6_c24":"collision","ch6_c25":"impulse","ch6_c26":"collision","ch6_c27":"impulse","ch6_c28":"collision","ch6_c29":"collision","ch6_c30":"collision","ch6_c31":"momentum","ch6_c32":"collision","ch6_c33":"collision","ch6_c34":"impulse","ch6_c35":"collision","ch6_c36":"collision","ch6_c37":"collision","ch6_c38":"impulse","ch6_c39":"collision","ch6_c40":"momentum","ch7_c1":"projectile","ch7_c2":"projectile","ch7_c3":"projectile","ch7_c4":"projectile","ch7_c5":"projectile","ch7_c6":"circular","ch7_c7":"circular","ch7_c8":"circular","ch7_c9":"circular","ch7_c10":"circular","ch7_c11":"shm","ch7_c12":"shm","ch7_c13":"shm","ch7_c14":"shm","ch7_c15":"shm","ch7_c16":"projectile","ch7_c17":"projectile","ch7_c18":"projectile","ch7_c19":"projectile","ch7_c20":"projectile","ch7_c21":"circular","ch7_c22":"circular","ch7_c23":"circular","ch7_c24":"circular","ch7_c25":"circular","ch7_c26":"circular","ch7_c27":"circular","ch7_c28":"circular","ch7_c29":"circular","ch7_c30":"circular","ch7_c31":"projectile","ch7_c32":"projectile","ch7_c33":"projectile","ch7_c34":"projectile","ch7_c35":"projectile","ch7_c36":"projectile","ch7_c37":"projectile","ch7_c38":"projectile","ch7_c39":"projectile","ch7_c40":"projectile"};

// prob = โจทย์หนึ่งข้อ, topic = หัวข้อที่กำลังเปิดอยู่
window.mainEquationHTML = function(prob, topic) {
  var eq = EQ[BY_ID[prob && prob.id] || topic];
  if (!eq) return '';
  return '<div class="main-eq"><span class="me-tag">สมการหลัก · ' + eq.name + '</span>' +
         '<div class="me-body">$$' + eq.tex + '$$</div></div>';
};
})();
