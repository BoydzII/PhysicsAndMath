/* ============================================================================
   ตัวช่วยเฉพาะวิชา — subjects/physci/4-helpers.js
   ตัววาดรูปประกอบโจทย์ (fig*) คลังคำที่แม่แบบใช้สุ่ม และชื่อขั้นของวิธีทำ 7 ขั้น (STEP_TITLES)
   เอนจินสุ่มโจทย์อยู่ใน core/30-engine.js ใช้ร่วมกันทุกวิชา
   ========================================================================== */
const CARS   = ['รถยนต์', 'รถจักรยานยนต์', 'รถบรรทุก', 'รถไฟ', 'รถจักรยาน'];
const BALLS  = ['ลูกบอล', 'ก้อนหิน', 'ลูกเหล็ก', 'ผลมะม่วง', 'เหรียญ'];
const BOXES  = ['กล่อง', 'ลังไม้', 'กระสอบข้าว', 'ตู้เย็น', 'โต๊ะ'];
/** พื้นเอียงพร้อมวัตถุ  opt:{deg, mass, forces:[{name}], down} */
function figIncline(o) {
  const deg = o.deg, rad = deg * Math.PI / 180;
  const W = 360, H = 232, x0 = 34, y0 = 192;
  // ย่อความยาวฐานลงถ้ามุมชันจนสามเหลี่ยมสูงเกินกรอบ
  const base = Math.min(286, 150 / Math.tan(rad));
  const x1 = x0 + base, ytop = y0 - base * Math.tan(rad);
  let s = '<polygon class="bdy" style="fill:none" points="' + n1(x0) + ',' + n1(y0) + ' ' + n1(x1) + ',' + n1(y0) + ' ' + n1(x1) + ',' + n1(ytop) + '"/>';
  s += svgHatch(x0, y0, x1, y0, 16, 7);
  // วัตถุวางกลางพื้นเอียง
  // วางวัตถุค่อนไปทางปลายบนของพื้นเอียง เพื่อให้ห่างจากป้ายมุมที่อยู่ใกล้จุดยอด
  const t = 0.62, cx = x0 + (x1 - x0) * t, cy = y0 - (y0 - ytop) * t;
  const bw = 34, bh = 22;
  const ux = Math.cos(-rad), uy = Math.sin(-rad);      // ทิศขึ้นตามพื้นเอียง
  const nx = Math.sin(-rad), ny = -Math.cos(-rad);     // ทิศตั้งฉากพื้นเอียง
  const pts = [
    [cx - ux * bw / 2, cy - uy * bw / 2], [cx + ux * bw / 2, cy + uy * bw / 2],
    [cx + ux * bw / 2 + nx * bh, cy + uy * bw / 2 + ny * bh], [cx - ux * bw / 2 + nx * bh, cy - uy * bw / 2 + ny * bh]
  ].map(p => n1(p[0]) + ',' + n1(p[1])).join(' ');
  s += '<polygon class="bdy" points="' + pts + '"/>';
  const mx = cx + nx * bh / 2, my = cy + ny * bh / 2;
  if (o.mass) s += svgTxt(mx - 2, my + 4, o.mass, 'middle');
  // มุม
  s += '<path class="dash" d="M ' + n1(x0 + 46) + ' ' + n1(y0) + ' A 46 46 0 0 0 ' +
    n1(x0 + 46 * Math.cos(rad)) + ' ' + n1(y0 - 46 * Math.sin(rad)) + '"/>';
  // วางป้ายมุมบน "เส้นแบ่งครึ่งมุม" ที่รัศมีไกลกว่าส่วนโค้ง
  // เดิมตรึงไว้ที่ (x0+56, y0-11) พอมุมชัน ๆ วัตถุจะเลื่อนมาใกล้ ทำให้ป้าย mg ทับกัน
  // รัศมีของป้ายมุมยืดหดตามความยาวฐาน มุมชันฐานสั้น ป้ายก็ต้องขยับเข้าใกล้จุดยอดตาม
  const ar = Math.max(38, Math.min(70, base * 0.42));
  s += svgTxt(x0 + ar * Math.cos(rad / 2), y0 - ar * Math.sin(rad / 2) + 5, deg + '°');
  // เริ่มลูกศรห่างจากจุดกึ่งกลางเล็กน้อย เพื่อไม่ให้ทับป้ายชื่อมวล
  // ป้าย mg วางข้างลูกศร ไม่ใช่ใต้ปลายลูกศร เพราะใต้ปลายลูกศรคือที่ของป้ายมุม
  if (o.down) s += svgArrow(mx, my + 12, mx, my + 48, 'frc', o.down, -20, 4);
  if (o.up)   s += svgArrow(mx + ux * 13, my + uy * 13, mx + ux * 52, my + uy * 52, 'frc', o.up, 8, -8);
  if (o.fric) s += svgArrow(mx - ux * 13, my - uy * 13, mx - ux * 48, my - uy * 48, 'frc', o.fric, -8, 15);
  return svgWrap(W, H, s);
}
/** คานสมดุล  opt:{len, supports:[{x,label}], loads:[{x,label,up}], marks:[{x,label}] } x เป็นสัดส่วน 0..1 */
function figBeam(o) {
  const W = 400, H = 150, x0 = 40, x1 = 360, y = 78;
  const px = f => x0 + (x1 - x0) * f;
  let s = '<rect class="bdy" x="' + n1(x0) + '" y="' + n1(y - 7) + '" width="' + n1(x1 - x0) + '" height="14" rx="2"/>';
  (o.supports || []).forEach(sp => {
    const x = px(sp.x);
    if (sp.type === 'pivot') {
      s += '<polygon class="bdy" points="' + n1(x) + ',' + n1(y + 7) + ' ' + n1(x - 13) + ',' + n1(y + 30) + ' ' + n1(x + 13) + ',' + n1(y + 30) + '"/>';
      s += svgHatch(x - 20, y + 30, x + 20, y + 30, 6, 6);
    } else {
      s += '<line class="ln" x1="' + n1(x) + '" y1="' + n1(y + 7) + '" x2="' + n1(x) + '" y2="' + n1(y + 30) + '"/>';
      s += svgHatch(x - 14, y + 30, x + 14, y + 30, 5, 6);
    }
    if (sp.label) s += svgTxt(x, y + 46, sp.label, 'middle');
  });
  (o.loads || []).forEach(ld => {
    const x = px(ld.x);
    if (ld.up) s += svgArrow(x, y - 7, x, y - 48, 'frc', ld.label, 0, -6);
    else s += svgArrow(x, y + 7, x, y + 48, 'frc', ld.label, 0, 15);
  });
  (o.marks || []).forEach(mk => {
    const a = px(mk.x0), b = px(mk.x1);
    s += '<line class="dash" x1="' + n1(a) + '" y1="' + n1(y - 30) + '" x2="' + n1(a) + '" y2="' + n1(y - 44) + '"/>';
    s += '<line class="dash" x1="' + n1(b) + '" y1="' + n1(y - 30) + '" x2="' + n1(b) + '" y2="' + n1(y - 44) + '"/>';
    s += '<line class="ln2" x1="' + n1(a) + '" y1="' + n1(y - 38) + '" x2="' + n1(b) + '" y2="' + n1(y - 38) + '"/>';
    s += svgTxt((a + b) / 2, y - 43, mk.label, 'middle');
  });
  return svgWrap(W, H, s);
}
/** เครื่องแอตวูด (รอกเดี่ยว มวลสองก้อนห้อย) */
function figPulley(o) {
  const W = 300, H = 210; const cx = 150, cy = 42, r = 22;
  let s = svgHatch(cx - 40, 14, cx + 40, 14, 8, 7);
  s += '<line class="ln" x1="' + cx + '" y1="14" x2="' + cx + '" y2="' + (cy - r) + '"/>';
  s += '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>';
  s += '<circle class="hat" cx="' + cx + '" cy="' + cy + '" r="2.5"/>';
  const lx = cx - r, rx = cx + r;
  const ly = 118, ry = 158;
  s += '<line class="ln" x1="' + lx + '" y1="' + cy + '" x2="' + lx + '" y2="' + ly + '"/>';
  s += '<line class="ln" x1="' + rx + '" y1="' + cy + '" x2="' + rx + '" y2="' + ry + '"/>';
  s += '<rect class="bdy" x="' + (lx - 22) + '" y="' + ly + '" width="44" height="30" rx="3"/>';
  s += svgTxt(lx, ly + 20, o.m1 || '', 'middle');
  s += '<rect class="bdy" x="' + (rx - 22) + '" y="' + ry + '" width="44" height="30" rx="3"/>';
  s += svgTxt(rx, ry + 20, o.m2 || '', 'middle');
  return svgWrap(W, H, s);
}
/** มวลบนโต๊ะผูกเชือกข้ามรอกกับมวลที่ห้อย */
function figTablePulley(o) {
  const W = 360, H = 200; const ty = 80, tx0 = 30, tx1 = 250;
  let s = '<line class="ln" x1="' + tx0 + '" y1="' + ty + '" x2="' + tx1 + '" y2="' + ty + '"/>';
  s += svgHatch(tx0, ty, tx1 - 10, ty, 14, 7);
  s += '<rect class="bdy" x="90" y="' + (ty - 32) + '" width="52" height="32" rx="3"/>';
  s += svgTxt(116, ty - 12, o.m1 || '', 'middle');
  s += '<line class="ln" x1="142" y1="' + (ty - 16) + '" x2="' + (tx1 + 4) + '" y2="' + (ty - 16) + '"/>';
  s += '<circle class="bdy" cx="' + (tx1 + 4) + '" cy="' + (ty - 4) + '" r="12"/>';
  s += '<circle class="hat" cx="' + (tx1 + 4) + '" cy="' + (ty - 4) + '" r="2"/>';
  s += '<line class="ln" x1="' + (tx1 + 16) + '" y1="' + (ty - 4) + '" x2="' + (tx1 + 16) + '" y2="140"/>';
  s += '<rect class="bdy" x="' + (tx1 - 6) + '" y="140" width="44" height="30" rx="3"/>';
  s += svgTxt(tx1 + 16, 160, o.m2 || '', 'middle');
  if (o.fric) s += svgArrow(90, ty - 16, 46, ty - 16, 'frc', o.fric, 0, -8);
  return svgWrap(W, H, s);
}
/** บันไดพิงกำแพง */
function figLadder(o) {
  const deg = o.deg, rad = deg * Math.PI / 180;
  const W = 300, H = 220, bx = 60, by = 185, L = 160;
  const tx = bx + L * Math.cos(rad), ty = by - L * Math.sin(rad);
  let s = '<line class="ln" x1="30" y1="' + by + '" x2="270" y2="' + by + '"/>' + svgHatch(30, by, 265, by, 16, 7);
  s += '<line class="ln" x1="' + n1(tx) + '" y1="30" x2="' + n1(tx) + '" y2="' + by + '"/>';
  s += svgHatch(tx, by - 4, tx, 34, 10, -7);
  s += '<line class="ln" style="stroke-width:3" x1="' + n1(bx) + '" y1="' + n1(by) + '" x2="' + n1(tx) + '" y2="' + n1(ty) + '"/>';
  s += '<path class="dash" d="M ' + n1(bx + 34) + ' ' + n1(by) + ' A 34 34 0 0 0 ' +
    n1(bx + 34 * Math.cos(rad)) + ' ' + n1(by - 34 * Math.sin(rad)) + '"/>';
  // วางป้ายมุมกลางช่องมุมพอดี จะได้ไม่ชนกับป้ายน้ำหนักที่กึ่งกลางบันได
  s += svgTxt(bx + 30 * Math.cos(rad / 2), by - 30 * Math.sin(rad / 2) + 4, deg + '°');
  // ป้ายน้ำหนักไปอยู่ขวาของลูกศร เพราะฝั่งซ้ายเป็นที่ของป้ายมุมเมื่อบันไดชัน
  if (o.w) s += svgArrow((bx + tx) / 2, (by + ty) / 2, (bx + tx) / 2, (by + ty) / 2 + 44, 'frc', o.w, 40, -2);
  return svgWrap(W, H, s);
}
/** กราฟความเร็ว-เวลา  pts:[[t,v],...] */
function figVT(o) {
  // เผื่อขอบให้ชื่อแกนโดยเฉพาะ เดิมชื่อแกน t ไปชนตัวเลขขีดสุดท้าย และชื่อแกน v ล้นออกนอกกรอบ
  const W = 420, H = 258, ox = 58, oy = 190, w = 310, h = 148;
  const tmax = o.tmax, vmax = o.vmax, vmin = o.vmin || 0;
  const sx = t => ox + w * (t / tmax);
  const sy = v => oy - h * ((v - vmin) / (vmax - vmin));
  let s = '';
  for (let i = 0; i <= o.tstep; i++) {
    const t = tmax * i / o.tstep;
    s += '<line class="dash" x1="' + n1(sx(t)) + '" y1="' + n1(sy(vmin)) + '" x2="' + n1(sx(t)) + '" y2="' + n1(sy(vmax)) + '"/>';
    s += svgTxt(sx(t), oy + 19, fmtq(t), 'middle', true);
  }
  for (let i = 0; i <= o.vstep; i++) {
    const v = vmin + (vmax - vmin) * i / o.vstep;
    s += '<line class="dash" x1="' + n1(ox) + '" y1="' + n1(sy(v)) + '" x2="' + n1(ox + w) + '" y2="' + n1(sy(v)) + '"/>';
    s += svgTxt(ox - 9, sy(v) + 5, fmtq(v), 'end', true);
  }
  s += svgArrow(ox, oy, ox, sy(vmax) - 14, 'ln', '', 0, 0);
  s += svgArrow(ox, sy(0), ox + w + 18, sy(0), 'ln', '', 0, 0);
  // ชื่อแกน t วางไว้ใต้แถวตัวเลขอีกชั้น จึงไม่มีทางทับตัวเลขขีดสุดท้าย
  s += svgTxt(ox + w / 2, oy + 42, 't (s)', 'middle', true);
  // ชื่อแกน v วางเหนือหัวลูกศรแกนตั้ง ชิดซ้ายพอให้อยู่ในกรอบเสมอ
  s += svgTxt(ox - 12, 20, 'v (m/s)', 'start', true);
  s += '<polyline class="frc" points="' + o.pts.map(p => n1(sx(p[0])) + ',' + n1(sy(p[1]))).join(' ') + '"/>';
  o.pts.forEach(p => { s += '<circle class="arh" cx="' + n1(sx(p[0])) + '" cy="' + n1(sy(p[1])) + '" r="3"/>'; });
  return svgWrap(W, H, s);
}
/** แรงหลายแรงกระทำที่จุดเดียว  forces:[{deg,label,len}] มุมวัดทวนเข็มจากแกน +x */
/** แรงหลายแรงที่จุดเดียว — ใส่ f.lx / f.ly เพื่อขยับป้ายเองได้
    (จำเป็นเมื่อมีแรงทิศเดียวกันหลายแรง ป้ายจะไปกองทับกันที่เดิม) */
function figForcesPoint(o) {
  const W = 320, H = 250, cx = 160, cy = 125;
  let s = '';
  (o.forces || []).forEach(f => {
    const r = (f.len || 62), a = -f.deg * Math.PI / 180;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    s += svgArrow(cx, cy, x, y, 'frc', f.label,
      (f.lx == null ? Math.cos(a) * 18 : f.lx),
      (f.ly == null ? Math.sin(a) * 18 + 5 : f.ly));
  });
  if (o.body === 'box') s += '<rect class="bdy" x="' + (cx - 15) + '" y="' + (cy - 15) + '" width="30" height="30" rx="3"/>';
  else s += '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="7"/>';
  return svgWrap(W, H, s);
}
/** วัตถุหลายก้อนต่อกันด้วยเชือกบนพื้นราบ  masses:['m₁','m₂'] */
function figChain(o) {
  const ms = o.masses, W = 400, H = 150, y = 90, bw = 50, bh = 34, gap = 34;
  const total = ms.length * bw + (ms.length - 1) * gap;
  let x = (W - total) / 2 - 14, s = '';
  s += '<line class="ln" x1="12" y1="' + (y + bh) + '" x2="388" y2="' + (y + bh) + '"/>' + svgHatch(14, y + bh, 386, y + bh, 22, 7);
  ms.forEach((m, i) => {
    s += '<rect class="bdy" x="' + n1(x) + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="3"/>';
    s += svgTxt(x + bw / 2, y + bh / 2 + 5, m, 'middle');
    if (i < ms.length - 1) {
      s += '<line class="ln" x1="' + n1(x + bw) + '" y1="' + (y + bh / 2) + '" x2="' + n1(x + bw + gap) + '" y2="' + (y + bh / 2) + '"/>';
      if (o.tlabels && o.tlabels[i]) s += svgTxt(x + bw + gap / 2, y + bh / 2 - 7, o.tlabels[i], 'middle');
    }
    x += bw + gap;
  });
  if (o.F) s += svgArrow(x - gap, y + bh / 2, x - gap + 48, y + bh / 2, 'frc', o.F, 8, -7);
  // แรงผลักจากทางซ้าย ต้องชี้เข้าหาก้อนแรก ไม่ใช่ชี้ออก
  if (o.Fleft) s += svgArrow((W - total) / 2 - 62, y + bh / 2, (W - total) / 2 - 16, y + bh / 2, 'frc', o.Fleft, -30, -9);
  return svgWrap(W, H, s);
}
/** วัตถุแขวนด้วยเชือกสองเส้นทำมุมกับเพดาน */
function figTwoRope(o) {
  const W = 340, H = 200, cx = 170, cy = 130, cyl = 26;
  const a1 = o.deg1 * Math.PI / 180, a2 = o.deg2 * Math.PI / 180;
  const L = 108;
  const x1 = cx - L * Math.cos(a1), y1 = cy - L * Math.sin(a1);
  const x2 = cx + L * Math.cos(a2), y2 = cy - L * Math.sin(a2);
  let s = '<line class="ln" x1="20" y1="' + n1(Math.min(y1, y2)) + '" x2="320" y2="' + n1(Math.min(y1, y2)) + '"/>';
  s += svgHatch(24, Math.min(y1, y2), 316, Math.min(y1, y2), 20, -7);
  s += '<line class="ln" x1="' + n1(x1) + '" y1="' + n1(y1) + '" x2="' + cx + '" y2="' + cy + '"/>';
  s += '<line class="ln" x1="' + n1(x2) + '" y1="' + n1(y2) + '" x2="' + cx + '" y2="' + cy + '"/>';
  s += svgTxt((x1 + cx) / 2 - 14, (y1 + cy) / 2, o.t1 || 'T₁', 'end');
  s += svgTxt((x2 + cx) / 2 + 14, (y2 + cy) / 2, o.t2 || 'T₂', 'start');
  s += svgTxt(cx - 30, cy - 4, o.deg1 + '°', 'middle', true);
  s += svgTxt(cx + 30, cy - 4, o.deg2 + '°', 'middle', true);
  s += '<line class="ln" x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy + cyl) + '"/>';
  s += '<rect class="bdy" x="' + (cx - 26) + '" y="' + (cy + cyl) + '" width="52" height="30" rx="3"/>';
  s += svgTxt(cx, cy + cyl + 20, o.w || '', 'middle');
  return svgWrap(W, H, s);
}
/** การเคลื่อนที่แบบวงกลม  opt:{r,v,fc,center,vert}
    vert = true จะวาดแนวดิ่งพร้อมทำเครื่องหมายจุดสูงสุด/ต่ำสุด */
function figCircle(o) {
  const W = 300, H = 240, cx = 150, cy = 120, rr = 74;
  let s = '<circle class="dash" cx="' + cx + '" cy="' + cy + '" r="' + rr + '" style="fill:none"/>';
  s += '<circle class="hat" cx="' + cx + '" cy="' + cy + '" r="3"/>';
  // วัตถุวางที่ตำแหน่ง 45° บนวงกลม (หรือจุดสูงสุดเมื่อเป็นวงกลมแนวดิ่ง)
  const a = o.vert ? -Math.PI / 2 : -Math.PI / 4;
  const px = cx + rr * Math.cos(a), py = cy + rr * Math.sin(a);
  s += '<line class="ln2" x1="' + cx + '" y1="' + cy + '" x2="' + n1(px) + '" y2="' + n1(py) + '"/>';
  s += svgTxt((cx + px) / 2 + 6, (cy + py) / 2 - 5, o.r || 'r', 'start', true);
  s += '<circle class="bdy" cx="' + n1(px) + '" cy="' + n1(py) + '" r="11"/>';
  if (o.m) s += svgTxt(px, py + 4, o.m, 'middle');
  // ความเร็วเป็นเส้นสัมผัส ตั้งฉากกับรัศมีเสมอ
  if (o.v) {
    const tx = -Math.sin(a), ty = Math.cos(a);
    s += svgArrow(px, py, px + tx * 52, py + ty * 52, 'frc', o.v, tx * 14, ty * 14 + 4);
  }
  // แรงสู่ศูนย์กลางชี้เข้าหาจุดศูนย์กลางเสมอ
  if (o.fc) {
    const ux = (cx - px) / rr, uy = (cy - py) / rr;
    s += svgArrow(px, py, px + ux * 46, py + uy * 46, 'frc', o.fc, ux * 16, uy * 16 + 4);
  }
  if (o.vert) {
    s += svgTxt(cx, cy - rr - 16, 'จุดสูงสุด', 'middle', true);
    s += svgTxt(cx, cy + rr + 22, 'จุดต่ำสุด', 'middle', true);
    s += '<line class="ln" x1="' + (cx - 60) + '" y1="' + (cy + rr + 30) + '" x2="' + (cx + 60) + '" y2="' + (cy + rr + 30) + '"/>';
  }
  return svgWrap(W, H, s);
}
/** เส้นทางโพรเจกไทล์  opt:{mode:'h'|'a', h, u, deg, xlab, hlab, rlab} */
function figProj(o) {
  const W = 440, H = 262;
  let s = '';
  if (o.mode === 'a') {
    // ยิงทำมุมจากพื้น — วาดพาราโบลาเต็มรูป
    const x0 = 52, x1 = 388, y0 = 196, top = 52;
    let pts = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40, x = x0 + (x1 - x0) * t;
      const y = y0 - 4 * (y0 - top) * t * (1 - t);
      pts.push(n1(x) + ',' + n1(y));
    }
    s += '<line class="ln" x1="24" y1="' + y0 + '" x2="420" y2="' + y0 + '"/>' + svgHatch(28, y0, 416, y0, 22, 7);
    s += '<polyline class="dash" style="stroke:var(--brand)" points="' + pts.join(' ') + '"/>';
    const d = (o.deg || 45) * Math.PI / 180;
    s += svgArrow(x0, y0, x0 + 62 * Math.cos(d), y0 - 62 * Math.sin(d), 'frc', o.u || 'u', 10, -8);
    s += '<path class="dash" d="M ' + (x0 + 34) + ' ' + y0 + ' A 34 34 0 0 0 ' +
      n1(x0 + 34 * Math.cos(d)) + ' ' + n1(y0 - 34 * Math.sin(d)) + '"/>';
    s += svgTxt(x0 + 44, y0 - 9, (o.deg || 45) + '°');
    s += '<line class="dash" x1="220" y1="' + top + '" x2="220" y2="' + y0 + '"/>';
    s += svgTxt(228, (top + y0) / 2, o.hlab || 'H', 'start', true);
    s += svgArrow(x0, y0 + 24, x1, y0 + 24, 'ln2', '', 0, 0);
    s += svgTxt((x0 + x1) / 2, y0 + 46, o.rlab || 'R', 'middle', true);
  } else {
    // ยิงในแนวราบจากที่สูง — วาดครึ่งพาราโบลา
    const x0 = 108, y0 = 44, x1 = 396, y1 = 192;
    let pts = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      pts.push(n1(x0 + (x1 - x0) * t) + ',' + n1(y0 + (y1 - y0) * t * t));
    }
    s += '<line class="ln" x1="' + x0 + '" y1="' + (y0 - 12) + '" x2="' + x0 + '" y2="' + y1 + '"/>';
    s += '<line class="ln" x1="24" y1="' + y1 + '" x2="428" y2="' + y1 + '"/>' + svgHatch(28, y1, 424, y1, 22, 7);
    s += svgHatch(x0, y1 - 4, x0, y0 - 8, 8, -7);
    s += '<polyline class="dash" style="stroke:var(--brand)" points="' + pts.join(' ') + '"/>';
    s += svgArrow(x0, y0, x0 + 62, y0, 'frc', o.u || 'u', 6, -9);
    s += '<line class="dash" x1="' + (x0 - 30) + '" y1="' + y0 + '" x2="' + (x0 - 30) + '" y2="' + y1 + '"/>';
    s += svgTxt(x0 - 38, (y0 + y1) / 2, o.hlab || 'h', 'end', true);
    s += svgArrow(x0, y1 + 22, x1, y1 + 22, 'ln2', '', 0, 0);
    s += svgTxt((x0 + x1) / 2, y1 + 44, o.xlab || 'x', 'middle', true);
  }
  return svgWrap(W, H, s);
}
/* --- 3.6 วาดวิธีทำ 7 ขั้น ------------------------------------------------- */
const STEP_TITLES = ['วิเคราะห์โจทย์', 'เขียนโจทย์กำหนด', 'วิเคราะห์สมการที่ใช้',
                     'แก้สมการ', 'แทนค่าลงในสมการ', 'คำนวณ', 'สรุปคำตอบ'];

