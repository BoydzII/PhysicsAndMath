/* ============================================================================
   ตัวช่วยเฉพาะวิชา — subjects/math/4-helpers.js
   ตัววาดรูปประกอบโจทย์ (fig*) คลังคำที่แม่แบบใช้สุ่ม และชื่อขั้นของวิธีทำ 7 ขั้น (STEP_TITLES)
   เอนจินสุ่มโจทย์อยู่ใน core/30-engine.js ใช้ร่วมกันทุกวิชา
   ========================================================================== */
/* คำและสิ่งของสำหรับแต่งโจทย์ปัญหา — เปลี่ยนทุกครั้งที่สุ่ม โจทย์จึงไม่ซ้ำซาก */
const GOODS  = ['สมุด', 'ปากกา', 'ดินสอ', 'ไม้บรรทัด', 'ยางลบ', 'แฟ้ม'];
const FRUITS = ['ส้ม', 'มะม่วง', 'กล้วย', 'เงาะ', 'ลำไย', 'ฝรั่ง'];
const SHOPS  = ['ร้านสหกรณ์โรงเรียน', 'ร้านเครื่องเขียน', 'ตลาดนัด', 'ร้านค้าชุมชน'];
const PLACES = ['ห้องสมุด', 'สนามกีฬา', 'โรงอาหาร', 'หอประชุม', 'อาคารเรียน'];
const SUBJ   = ['คณิตศาสตร์', 'วิทยาศาสตร์', 'ภาษาไทย', 'ภาษาอังกฤษ', 'สังคมศึกษา'];
/* --- 3.3ข รูปประกอบโจทย์คณิตศาสตร์ -----------------------------------------
   ทุกฟังก์ชันคืน SVG ที่ยืดตามความกว้างของกล่อง จึงอ่านออกทั้งบนไอแพดและบนกระดาษ A4
   สีทั้งหมดอ้างตัวแปรธีม รูปจึงเปลี่ยนตามโหมดสว่าง-มืดเอง
   ⚠ ชื่อคลาสในรูปขึ้นต้นด้วย f ทุกตัว (fbar fbox ffil fgrd fpt) เพื่อไม่ให้ชนกับ
     คลาสของหน้าเว็บ — เบราว์เซอร์ถือว่า width/height ของ SVG เป็นสมบัติ CSS ด้วย
     ถ้าชื่อชนกัน เช่น .bar ของแถบสถิติ ความสูงของแท่งกราฟจะถูกทับจนเพี้ยนทั้งรูป
   -------------------------------------------------------------------------- */

/** เส้นจำนวน  o:{ from, to, labelStep, dots:[{v,label}], arcs:[{a,b,label}] } */
function figNumberLine(o) {
  const from = o.from, to = o.to, span = to - from;
  if (!(span > 0)) return '';
  const W = 380, H = 96, pad = 26, y = 62;
  const x = v => pad + (W - 2 * pad) * (v - from) / span;
  const stepLbl = o.labelStep || 1;
  let s = '<line class="ln" x1="' + n1(pad - 10) + '" y1="' + y + '" x2="' + n1(W - pad + 10) + '" y2="' + y + '"/>';
  s += svgArrow(x(to), y, W - pad + 13, y, 'ln2');
  s += svgArrow(x(from), y, pad - 13, y, 'ln2');
  for (let v = Math.ceil(from); v <= to; v++) {
    const big = ((v - Math.ceil(from)) % stepLbl === 0) || v === 0;
    s += '<line class="' + (big ? 'ln' : 'ln2') + '" x1="' + n1(x(v)) + '" y1="' + (y - (big ? 7 : 4)) +
      '" x2="' + n1(x(v)) + '" y2="' + (y + (big ? 7 : 4)) + '"/>';
    if (big) s += svgTxt(x(v), y + 25, String(v), 'middle', true);
  }
  // ส่วนโค้งแสดงการนับไปข้างหน้า-ถอยหลัง ใช้กับโจทย์บวกลบจำนวนเต็ม
  (o.arcs || []).forEach(a => {
    const x1 = x(a.a), x2 = x(a.b), r = Math.abs(x2 - x1) / 2;
    if (r < 1) return;
    s += '<path class="frc" d="M' + n1(x1) + ' ' + (y - 4) + ' A ' + n1(r) + ' ' + n1(Math.min(r, 24)) +
      ' 0 0 ' + (x2 > x1 ? 1 : 0) + ' ' + n1(x2) + ' ' + (y - 4) + '"/>';
    if (a.label) s += svgTxt((x1 + x2) / 2, y - 32, a.label, 'middle');
  });
  (o.dots || []).forEach(d => {
    s += '<circle class="fpt" cx="' + n1(x(d.v)) + '" cy="' + y + '" r="5.4"/>';
    if (d.label) s += svgTxt(x(d.v), y - 14, d.label, 'middle');
  });
  return svgWrap(W, H, s);
}
/** ความกว้างโดยประมาณของข้อความในรูป ใช้กันไม่ให้ป้ายยาว ๆ ล้นออกนอกกรอบ
    สระบน-ล่างและวรรณยุกต์ไทยไม่กินความกว้าง จึงไม่นับ */
function txtW(t) {
  const s = String(t == null ? '' : t).replace(/<[^>]+>/g, '');
  let w = 0;
  for (const ch of s) {
    if (/[ัิ-ฺ็-๎]/.test(ch)) continue;
    w += /[฀-๿]/.test(ch) ? 9 : /[ .,]/.test(ch) ? 4 : 8;
  }
  return w;
}
/** แถบเศษส่วน  o:{ rows:[{ n:จำนวนส่วน, k:ส่วนที่แรเงา, label }] } */
function figFracBar(o) {
  const rows = (o.rows || []).filter(r => r && r.n > 0);
  if (!rows.length) return '';
  const rowH = 48, H = 14 + rows.length * rowH;
  const x0 = 14, bw = 244, bh = 32;
  const labels = rows.map(r => (r.label == null ? (r.k + '/' + r.n) : String(r.label)));
  // กรอบกว้างพอสำหรับป้ายที่ยาวที่สุดเสมอ ป้ายจึงไม่ถูกตัดหาย
  const W = Math.max(360, Math.round(x0 + bw + 12 + Math.max.apply(null, labels.map(txtW)) + 8));
  let s = '';
  rows.forEach((r, i) => {
    const y = 12 + i * rowH, cw = bw / r.n;
    for (let k = 0; k < r.n; k++) {
      if (k < r.k) s += '<rect class="ffil" x="' + n1(x0 + k * cw) + '" y="' + y +
        '" width="' + n1(cw) + '" height="' + bh + '"/>';
      s += '<rect class="fbox" x="' + n1(x0 + k * cw) + '" y="' + y +
        '" width="' + n1(cw) + '" height="' + bh + '"/>';
    }
    s += svgTxt(x0 + bw + 12, y + bh / 2 + 5, labels[i], 'start');
  });
  return svgWrap(W, H, s);
}
/** มุมหนึ่งมุมพร้อมเครื่องหมายกำกับ  o:{ deg, label }
    มุมฉากใช้<b>สัญลักษณ์มุมฉาก</b>ตามธรรมเนียมคณิตศาสตร์ ไม่ใช่ส่วนโค้ง
    มุมอื่นวางตัวเลขไว้<b>ในส่วนโค้ง</b> ยกเว้นมุมแคบมากที่ตัวเลขใส่ไม่ลง จึงวางไว้ถัดออกไป */
function figAngle(o) {
  const deg = o.deg, rad = deg * Math.PI / 180;
  const W = 320, H = 190, L = 132;
  const cx = deg > 95 ? 158 : 62, cy = 152;
  const lbl = o.label == null ? deg + '°' : o.label;
  let s = '<line class="ln" x1="' + cx + '" y1="' + cy + '" x2="' + (cx + L) + '" y2="' + cy + '"/>';
  s += '<line class="ln" x1="' + cx + '" y1="' + cy + '" x2="' + n1(cx + L * Math.cos(rad)) +
    '" y2="' + n1(cy - L * Math.sin(rad)) + '"/>';
  if (Math.abs(deg - 90) < 0.001) {
    const q = 26;
    s += '<polyline class="frc" points="' + (cx + q) + ',' + cy + ' ' + (cx + q) + ',' + (cy - q) +
      ' ' + cx + ',' + (cy - q) + '"/>';
    s += svgTxt(cx + q + 16, cy - q - 12, lbl, 'start');
  } else {
    // ยิ่งมุมแคบ ยิ่งต้องกางส่วนโค้งออก ตัวเลขจึงมีที่พอจะอยู่ข้างในได้
    const r = deg < 45 ? 74 : deg < 60 ? 64 : deg < 120 ? 46 : 40;
    const half = rad / 2;
    // ระยะที่ทำให้ความกว้างของช่องพอใส่ตัวเลขได้จริง
    const fit = 14 / Math.max(Math.sin(half), 0.08);
    const inside = fit <= r * 0.78;
    const lr = inside ? r * 0.62 : r + 20;
    s += '<path class="frc" d="M' + n1(cx + r) + ' ' + cy + ' A ' + r + ' ' + r + ' 0 0 0 ' +
      n1(cx + r * Math.cos(rad)) + ' ' + n1(cy - r * Math.sin(rad)) + '"/>';
    s += svgTxt(cx + lr * Math.cos(half), cy - lr * Math.sin(half) + 5, lbl, 'middle');
  }
  s += '<circle class="fpt" cx="' + cx + '" cy="' + cy + '" r="3.4"/>';
  return svgWrap(W, H, s);
}
/** สี่เหลี่ยมผืนผ้า  o:{ w, h, unit } */
function figRect(o) {
  const W = 340, H = 200, x0 = 92, y0 = 30;
  const sc = Math.min(184 / Math.max(o.w, 1), 116 / Math.max(o.h, 1));
  const w = Math.max(70, o.w * sc), h = Math.max(44, o.h * sc);
  const u = o.unit ? ' ' + o.unit : '';
  // ส่ง wLbl / hLbl มาแทนได้ เมื่อโจทย์ต้องการให้ด้านนั้นเป็นค่าที่ยังไม่รู้ เช่น '?'
  const LW = o.wLbl != null ? o.wLbl : fmt(o.w) + u, LH = o.hLbl != null ? o.hLbl : fmt(o.h) + u;
  let s = '<rect class="bdy" x="' + x0 + '" y="' + y0 + '" width="' + n1(w) + '" height="' + n1(h) + '"/>';
  s += svgTxt(x0 + w / 2, y0 + h + 26, LW, 'middle');
  s += svgTxt(x0 - 10, y0 + h / 2 + 5, LH, 'end');
  return svgWrap(W, H, s);
}
/** สามเหลี่ยมพร้อมเส้นสูงประและสัญลักษณ์มุมฉาก  o:{ b, h, unit, apex(0-1) } */
function figTri(o) {
  const W = 340, H = 200, x0 = 62, ybase = 156;
  const sc = Math.min(180 / Math.max(o.b, 1), 112 / Math.max(o.h, 1));
  const b = Math.max(86, o.b * sc), h = Math.max(50, o.h * sc);
  const ap = o.apex == null ? 0.38 : o.apex;
  const ax = x0 + b * ap, ay = ybase - h;
  const u = o.unit ? ' ' + o.unit : '';
  let s = '<polygon class="bdy" points="' + x0 + ',' + ybase + ' ' + n1(x0 + b) + ',' + ybase +
    ' ' + n1(ax) + ',' + n1(ay) + '"/>';
  s += '<line class="dash" x1="' + n1(ax) + '" y1="' + n1(ay) + '" x2="' + n1(ax) + '" y2="' + ybase + '"/>';
  s += '<polyline class="ln2" points="' + n1(ax) + ',' + (ybase - 11) + ' ' + n1(ax + 11) + ',' + (ybase - 11) +
    ' ' + n1(ax + 11) + ',' + ybase + '"/>';
  s += svgTxt(x0 + b / 2, ybase + 26, 'ฐาน ' + (o.bLbl != null ? o.bLbl : fmt(o.b) + u), 'middle');
  // ป้ายความสูงวางไว้ทางขวาของเส้นประ ค่อนไปทางฐาน ซึ่งเป็นช่วงที่รูปกว้างที่สุด
  // (วางทางซ้ายหรือวางกลางความสูงจะไปทับด้านเอียงของสามเหลี่ยม)
  s += svgTxt(ax + 10, ybase - h * 0.28, 'สูง ' + (o.hLbl != null ? o.hLbl : fmt(o.h) + u), 'start');
  return svgWrap(W, H, s);
}
/** สี่เหลี่ยมคางหมู  o:{ a:ด้านบน, b:ด้านล่าง, h, unit } */
function figTrap(o) {
  const W = 340, H = 200, x0 = 74, ybase = 156;
  const sc = Math.min(190 / Math.max(o.a, o.b, 1), 108 / Math.max(o.h, 1));
  const a = Math.max(50, o.a * sc), b = Math.max(90, o.b * sc), h = Math.max(48, o.h * sc);
  const ax = x0 + (b - a) / 2, ay = ybase - h;
  const u = o.unit ? ' ' + o.unit : '';
  let s = '<polygon class="bdy" points="' + n1(ax) + ',' + n1(ay) + ' ' + n1(ax + a) + ',' + n1(ay) +
    ' ' + n1(x0 + b) + ',' + ybase + ' ' + x0 + ',' + ybase + '"/>';
  s += '<line class="dash" x1="' + n1(ax + a / 2) + '" y1="' + n1(ay) + '" x2="' + n1(ax + a / 2) + '" y2="' + ybase + '"/>';
  s += '<polyline class="ln2" points="' + n1(ax + a / 2) + ',' + (ybase - 10) + ' ' + n1(ax + a / 2 + 10) + ',' +
    (ybase - 10) + ' ' + n1(ax + a / 2 + 10) + ',' + ybase + '"/>';
  s += svgTxt(ax + a / 2, ay - 10, o.aLbl != null ? o.aLbl : fmt(o.a) + u, 'middle');
  s += svgTxt(x0 + b / 2, ybase + 26, o.bLbl != null ? o.bLbl : fmt(o.b) + u, 'middle');
  s += svgTxt(ax + a / 2 + 16, ay + h / 2 + 5, 'สูง ' + (o.hLbl != null ? o.hLbl : fmt(o.h) + u), 'start');
  return svgWrap(W, H, s);
}
/** สี่เหลี่ยมด้านขนาน  o:{ b, h, unit } */
function figPara(o) {
  const W = 340, H = 200, x0 = 56, ybase = 156, sk = 34;
  const sc = Math.min(174 / Math.max(o.b, 1), 106 / Math.max(o.h, 1));
  const b = Math.max(90, o.b * sc), h = Math.max(48, o.h * sc);
  const ytop = ybase - h;
  const u = o.unit ? ' ' + o.unit : '';
  let s = '<polygon class="bdy" points="' + n1(x0 + sk) + ',' + n1(ytop) + ' ' + n1(x0 + sk + b) + ',' + n1(ytop) +
    ' ' + n1(x0 + b) + ',' + ybase + ' ' + x0 + ',' + ybase + '"/>';
  s += '<line class="dash" x1="' + n1(x0 + sk) + '" y1="' + n1(ytop) + '" x2="' + n1(x0 + sk) + '" y2="' + ybase + '"/>';
  s += '<polyline class="ln2" points="' + n1(x0 + sk) + ',' + (ybase - 10) + ' ' + n1(x0 + sk + 10) + ',' + (ybase - 10) +
    ' ' + n1(x0 + sk + 10) + ',' + ybase + '"/>';
  s += svgTxt(x0 + b / 2 + 6, ybase + 26, 'ฐาน ' + (o.bLbl != null ? o.bLbl : fmt(o.b) + u), 'middle');
  s += svgTxt(x0 + sk + 16, ytop + h / 2 + 5, 'สูง ' + (o.hLbl != null ? o.hLbl : fmt(o.h) + u), 'start');
  return svgWrap(W, H, s);
}
/** วงกลมพร้อมรัศมีหรือเส้นผ่านศูนย์กลาง  o:{ r, unit, dia } */
function figCircleFig(o) {
  const W = 300, H = 220, cx = 150, cy = 110, R = 78;
  const u = o.unit ? ' ' + o.unit : '';
  let s = '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>';
  if (o.dia) {
    s += '<line class="frc" x1="' + (cx - R) + '" y1="' + cy + '" x2="' + (cx + R) + '" y2="' + cy + '"/>';
    s += svgTxt(cx, cy - 12, 'd = ' + fmt(o.r * 2) + u, 'middle');
  } else {
    s += '<line class="frc" x1="' + cx + '" y1="' + cy + '" x2="' + (cx + R) + '" y2="' + cy + '"/>';
    s += svgTxt(cx + R / 2, cy - 12, 'r = ' + fmt(o.r) + u, 'middle');
  }
  s += '<circle class="fpt" cx="' + cx + '" cy="' + cy + '" r="3.4"/>';
  return svgWrap(W, H, s);
}
/** ทรงสี่เหลี่ยมมุมฉาก (ภาพเฉียง)  o:{ w, l, h, unit } */
function figBox3D(o) {
  // เว้นขอบซ้ายไว้กว้าง เพราะป้าย "สูง …" วางชิดซ้ายของกล่องและกินที่พอสมควร
  const W = 380, H = 220;
  const sc = Math.min(146 / Math.max(o.w, 1), 92 / Math.max(o.h, 1), 58 / Math.max(o.l, 1));
  const a = Math.max(84, o.w * sc), b = Math.max(52, o.h * sc), d = Math.max(30, o.l * sc);
  const dx = d * 0.72, dy = -d * 0.56;
  const x0 = 96, y0 = 74 - dy;
  const u = o.unit ? ' ' + o.unit : '';
  const P = (x, y) => n1(x) + ',' + n1(y);
  let s = '<polygon class="bdy" points="' + P(x0, y0) + ' ' + P(x0 + dx, y0 + dy) + ' ' +
    P(x0 + a + dx, y0 + dy) + ' ' + P(x0 + a, y0) + '"/>';                       // หน้าบน
  s += '<polygon class="bdy" points="' + P(x0 + a, y0) + ' ' + P(x0 + a + dx, y0 + dy) + ' ' +
    P(x0 + a + dx, y0 + b + dy) + ' ' + P(x0 + a, y0 + b) + '"/>';               // หน้าข้าง
  s += '<rect class="bdy" x="' + n1(x0) + '" y="' + n1(y0) + '" width="' + n1(a) + '" height="' + n1(b) + '"/>';
  s += svgTxt(x0 + a / 2, y0 + b + 24, 'กว้าง ' + (o.wLbl != null ? o.wLbl : fmt(o.w) + u), 'middle');
  s += svgTxt(x0 - 9, y0 + b / 2 + 5, 'สูง ' + (o.hLbl != null ? o.hLbl : fmt(o.h) + u), 'end');
  s += svgTxt(x0 + a + dx / 2 + 16, y0 + b + dy / 2 + 4, 'ลึก ' + (o.lLbl != null ? o.lLbl : fmt(o.l) + u), 'start');
  return svgWrap(W, H, s);
}
/** ระนาบพิกัดฉาก  o:{ xmin,xmax,ymin,ymax, points:[{x,y,label}], line:{m,c} } */
function figCoord(o) {
  const xa = o.xmin == null ? -5 : o.xmin, xb = o.xmax == null ? 5 : o.xmax;
  const ya = o.ymin == null ? -5 : o.ymin, yb = o.ymax == null ? 5 : o.ymax;
  const W = 320, H = 300, pad = 30;
  const X = v => pad + (W - 2 * pad) * (v - xa) / (xb - xa);
  const Y = v => H - pad - (H - 2 * pad) * (v - ya) / (yb - ya);
  let s = '';
  for (let v = Math.ceil(xa); v <= xb; v++)
    s += '<line class="fgrd" x1="' + n1(X(v)) + '" y1="' + pad + '" x2="' + n1(X(v)) + '" y2="' + (H - pad) + '"/>';
  for (let v = Math.ceil(ya); v <= yb; v++)
    s += '<line class="fgrd" x1="' + pad + '" y1="' + n1(Y(v)) + '" x2="' + (W - pad) + '" y2="' + n1(Y(v)) + '"/>';
  s += '<line class="ln" x1="' + pad + '" y1="' + n1(Y(0)) + '" x2="' + (W - pad) + '" y2="' + n1(Y(0)) + '"/>';
  s += '<line class="ln" x1="' + n1(X(0)) + '" y1="' + pad + '" x2="' + n1(X(0)) + '" y2="' + (H - pad) + '"/>';
  for (let v = Math.ceil(xa); v <= xb; v++) if (v) s += svgTxt(X(v), Y(0) + 17, String(v), 'middle', true);
  for (let v = Math.ceil(ya); v <= yb; v++) if (v) s += svgTxt(X(0) - 7, Y(v) + 5, String(v), 'end', true);
  s += svgTxt(W - pad + 9, Y(0) + 5, 'x', 'middle', true);
  // ชื่อแกน y วางไว้ทาง<b>ขวา</b>ของแกน เพราะฝั่งซ้ายเป็นที่ของตัวเลขบนสเกล
  s += svgTxt(X(0) + 10, pad - 8, 'y', 'middle', true);
  if (o.line) {
    // เก็บเฉพาะช่วงที่กราฟยังอยู่ในกรอบ แล้ววาดเป็นเส้นต่อเนื่อง
    const pts = [];
    const N = 120;
    for (let i = 0; i <= N; i++) {
      const xv = xa + (xb - xa) * i / N, yv = o.line.m * xv + o.line.c;
      if (yv >= ya && yv <= yb) pts.push(n1(X(xv)) + ',' + n1(Y(yv)));
    }
    if (pts.length) s += '<polyline class="frc" points="' + pts.join(' ') + '"/>';
  }
  (o.points || []).forEach(p => {
    s += '<circle class="fpt" cx="' + n1(X(p.x)) + '" cy="' + n1(Y(p.y)) + '" r="5"/>';
    if (p.label) {
      // จุดที่อยู่ค่อนไปทางขวา ให้ป้ายชื่อพลิกไปอยู่ทางซ้าย จะได้ไม่ล้นออกนอกกรอบ
      const near = X(p.x) > W * 0.62;
      // จุดที่เกาะอยู่บนแกนต้องเลี่ยงแถวตัวเลขของแกนนั้น
      //   อยู่บนแกน x → ยกป้ายขึ้น · อยู่บนแกน y → ถีบป้ายออกด้านข้างให้ไกลขึ้น
      const onX = Math.abs(p.y) < 1.5, onY = Math.abs(p.x) < 1.5;
      const dx = (near ? -1 : 1) * (onY ? 16 : 9);
      // จุดที่อยู่ใกล้จุดกำเนิดมีตัวเลขของทั้งสองแกนล้อมอยู่ ต้องยกป้ายให้พ้นแถวตัวเลขแกน x ไปเลย
      const lift = (onX || onY) ? 28 : 9;
      s += svgTxt(X(p.x) + dx, Y(p.y) - lift, p.label, near ? 'end' : 'start');
    }
  });
  return svgWrap(W, H, s);
}
/** แผนภูมิแท่ง  o:{ labels:[], values:[], step, unit } */
function figBar(o) {
  const vals = o.values || [], n = vals.length;
  if (!n) return '';
  const W = 360, H = 224, padL = 42, padR = 12, padT = 30, padB = 38;
  const maxV = Math.max.apply(null, vals);
  const step = o.step || Math.max(1, Math.ceil(maxV / 5));
  const top = Math.max(step, Math.ceil(maxV / step) * step);
  const Y = v => H - padB - (H - padB - padT) * v / top;
  const bw = (W - padL - padR) / n;
  let s = '';
  for (let v = 0; v <= top; v += step) {
    s += '<line class="fgrd" x1="' + padL + '" y1="' + n1(Y(v)) + '" x2="' + (W - padR) + '" y2="' + n1(Y(v)) + '"/>';
    s += svgTxt(padL - 6, Y(v) + 5, String(v), 'end', true);
  }
  vals.forEach((v, i) => {
    const x = padL + i * bw + bw * 0.2, w = bw * 0.6;
    s += '<rect class="fbar" x="' + n1(x) + '" y="' + n1(Y(v)) + '" width="' + n1(w) +
      '" height="' + n1(H - padB - Y(v)) + '"/>';
    s += svgTxt(x + w / 2, H - padB + 18, esc(String((o.labels || [])[i] == null ? i + 1 : o.labels[i])), 'middle', true);
  });
  s += '<line class="ln" x1="' + padL + '" y1="' + (H - padB) + '" x2="' + (W - padR) + '" y2="' + (H - padB) + '"/>';
  s += '<line class="ln" x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (H - padB) + '"/>';
  // ชื่อหน่วยวางไว้เหนือแกน ไม่ให้ทับตัวเลขบนสุดของสเกล
  if (o.unit) s += svgTxt(padL - 6, padT - 14, esc(o.unit), 'end', true);
  return svgWrap(W, H, s);
}
/* --- 3.3ค รูปประกอบของ ม.2 ------------------------------------------------ */

/** สามเหลี่ยมมุมฉาก สำหรับทฤษฎีบทพีทาโกรัส
    o:{ a:ด้านนอน, b:ด้านตั้ง, unit, aLbl, bLbl, cLbl }  ใส่ '?' ในด้านที่ต้องหาได้ */
function figRightTri(o) {
  const W = 350, H = 220, ybase = 168;
  const sc = Math.min(180 / Math.max(o.a, 1), 118 / Math.max(o.b, 1));
  const a = Math.max(90, o.a * sc), b = Math.max(64, o.b * sc);
  const x0 = 70, ytop = ybase - b;
  const u = o.unit ? ' ' + o.unit : '';
  const L = (v, ov) => (ov != null ? ov : fmt(v) + u);
  let s = '<polygon class="bdy" points="' + x0 + ',' + ybase + ' ' + n1(x0 + a) + ',' + ybase +
    ' ' + x0 + ',' + n1(ytop) + '"/>';
  // สัญลักษณ์มุมฉากที่มุมซ้ายล่าง — จุดสำคัญที่บอกว่าด้านไหนคือด้านตรงข้ามมุมฉาก
  s += '<polyline class="ln2" points="' + (x0 + 13) + ',' + ybase + ' ' + (x0 + 13) + ',' + (ybase - 13) +
    ' ' + x0 + ',' + (ybase - 13) + '"/>';
  s += svgTxt(x0 + a / 2, ybase + 26, L(o.a, o.aLbl), 'middle');
  s += svgTxt(x0 - 10, ytop + b / 2 + 5, L(o.b, o.bLbl), 'end');
  // ด้านตรงข้ามมุมฉากวางป้ายไว้กลางด้าน เยื้องออกนอกรูปเล็กน้อย
  s += svgTxt(x0 + a / 2 + 20, ytop + b / 2 - 6, L(o.c, o.cLbl), 'start');
  return svgWrap(W, H, s);
}
/** เส้นขนานสองเส้นถูกตัดด้วยเส้นตัด  o:{ deg, labels:{1..8: 'ข้อความ'} }
    ตำแหน่งมุม 1-4 = จุดตัดบน (ซ้ายบน · ขวาบน · ซ้ายล่าง · ขวาล่าง)
                5-8 = จุดตัดล่าง เรียงแบบเดียวกัน */
function figParallelLines(o) {
  const W = 360, H = 230, deg = o.deg == null ? 60 : o.deg;
  const rad = deg * Math.PI / 180;
  const yA = 70, yB = 165, x0 = 30, x1 = W - 30;
  // เส้นตัดพาดผ่านจุดกึ่งกลางของทั้งสองเส้น เอียงตามมุมที่กำหนด
  // ทิศ "ขึ้น" ของเส้นตัดต้องทำมุม deg กับแกนนอนที่ชี้ไปทางขวา
  // จุดตัดบนจึงต้องอยู่ขวากว่าจุดตัดล่างเมื่อ deg เป็นมุมแหลม — เครื่องหมายกลับด้านจากที่คิดง่าย ๆ
  const dx = (yA - yB) / Math.tan(rad);
  const cxA = W / 2 - dx / 2, cxB = W / 2 + dx / 2;
  const ext = 46;
  const ux = Math.cos(rad), uy = -Math.sin(rad);
  let s = '<line class="ln" x1="' + x0 + '" y1="' + yA + '" x2="' + x1 + '" y2="' + yA + '"/>';
  s += '<line class="ln" x1="' + x0 + '" y1="' + yB + '" x2="' + x1 + '" y2="' + yB + '"/>';
  s += '<line class="frc" x1="' + n1(cxA + ux * ext) + '" y1="' + n1(yA + uy * ext) +
    '" x2="' + n1(cxB - ux * ext) + '" y2="' + n1(yB - uy * ext) + '"/>';
  // ลูกศรบอกว่าสองเส้นนี้ขนานกัน
  [yA, yB].forEach(function (y) {
    s += '<polyline class="ln2" points="' + (x1 - 26) + ',' + (y - 6) + ' ' + (x1 - 18) + ',' + y +
      ' ' + (x1 - 26) + ',' + (y + 6) + '"/>';
  });
  // วางป้ายมุมตามแนว "เส้นแบ่งครึ่งมุม" ของมุมนั้นจริง ๆ ไม่ใช่เยื้องซ้าย-ขวาลอย ๆ
  // ไม่งั้นพอเส้นตัดเอียงมาก ป้ายจะไปอยู่คนละมุมกับที่ตั้งใจ หรือทับเส้นตัดพอดี
  //
  // เลขช่องของป้าย (labels) — จำไว้ให้แม่น ไม่งั้นรูปจะขัดกับสิ่งที่โจทย์อ้าง
  //   จุดตัดบน   1 บนซ้าย(180-deg)  2 บนขวา(deg)  3 ล่างซ้าย(deg)  4 ล่างขวา(180-deg)
  //   จุดตัดล่าง 5 บนซ้าย(180-deg)  6 บนขวา(deg)  7 ล่างซ้าย(deg)  8 ล่างขวา(180-deg)
  // ช่อง 3 4 5 6 คือมุมภายใน (อยู่ระหว่างเส้นขนาน) ที่เหลือเป็นมุมภายนอก
  //   มุมแย้งภายใน = 3 คู่ 6  หรือ  4 คู่ 5           (เท่ากัน)
  //   มุมภายในข้างเดียวกัน = 3 คู่ 5  หรือ  4 คู่ 6   (รวมกันได้ 180°)
  //   มุมภายนอกและภายในตรงข้าม = 1 คู่ 5 · 2 คู่ 6 · 3 คู่ 7 · 4 คู่ 8 (เท่ากัน)
  // ส่ง deg เป็นขนาดมุมจริงได้เลยทั้งมุมแหลมและมุมป้าน ไม่ต้องแปลงเป็น 180-deg เอง
  const half = rad / 2;
  const bisect = [half + Math.PI / 2, half, half + Math.PI, half + 3 * Math.PI / 2];
  Object.keys(o.labels || {}).forEach(function (k) {
    const n = Number(k);
    if (!(n >= 1 && n <= 8)) return;
    const cx = n <= 4 ? cxA : cxB, cy = n <= 4 ? yA : yB;
    const th = bisect[(n - 1) % 4];
    // ระยะถอยของป้ายคิดจากความกว้างของ "ช่องมุม" นั้นจริง ๆ ไม่ใช่ระยะคงที่
    //   มุมแคบ  → ต้องถอยไกลกว่าป้ายจึงจะพ้นเส้นทั้งสองข้าง
    //   มุมป้าน → ช่องกว้างอยู่แล้ว วางชิดจุดยอดได้ ถ้าถอยไกลจะดูลอยไม่รู้ว่าเป็นมุมไหน
    // วิธีคิด: ป้ายต้องห่างจากเส้นขอบมุมทั้งสองด้านอย่างน้อย 4 หน่วย
    //          ระยะตั้งฉากจากจุดกึ่งกลางป้ายถึงขอบ = off × sin(ครึ่งหนึ่งของมุม)
    const A = (n % 4 === 2 || n % 4 === 3) ? rad : Math.PI - rad;   // ขนาดของช่องมุมนี้
    const hw = txtW(o.labels[k]) / 2, hh = 8;
    const reach = ang => Math.abs(hw * Math.cos(ang)) + Math.abs(hh * Math.sin(ang));
    const need = Math.max(reach(th - A / 2 + Math.PI / 2), reach(th + A / 2 - Math.PI / 2)) + 4;
    const off = Math.max(20, need / Math.sin(A / 2));
    s += svgTxt(cx + off * Math.cos(th), cy - off * Math.sin(th) + 5, o.labels[k], 'middle');
  });
  return svgWrap(W, H, s);
}
/** ทรงกระบอก  o:{ r, h, unit } */
function figCylinder(o) {
  const W = 320, H = 230;
  const sc = Math.min(70 / Math.max(o.r, 1), 110 / Math.max(o.h, 1));
  const rx = Math.max(48, o.r * sc), ry = rx * 0.3, hh = Math.max(70, o.h * sc);
  // เว้นที่เหนือฝาบนไว้ให้ป้ายรัศมี ไม่งั้นตัวหนังสือจะทับเส้นขอบวงรี
  const cx = 150, yTop = 56, yBot = yTop + hh;
  const u = o.unit ? ' ' + o.unit : '';
  // ผิวข้างวาดเป็นสี่เหลี่ยม แล้วปิดหัวท้ายด้วยวงรี ให้ดูเป็นทรงกระบอก
  let s = '<rect class="bdy" x="' + n1(cx - rx) + '" y="' + yTop + '" width="' + n1(rx * 2) +
    '" height="' + n1(hh) + '" stroke="none"/>';
  s += '<line class="ln" x1="' + n1(cx - rx) + '" y1="' + yTop + '" x2="' + n1(cx - rx) + '" y2="' + n1(yBot) + '"/>';
  s += '<line class="ln" x1="' + n1(cx + rx) + '" y1="' + yTop + '" x2="' + n1(cx + rx) + '" y2="' + n1(yBot) + '"/>';
  // ขอบล่าง: เส้นประครึ่งหลัง เส้นทึบครึ่งหน้า
  s += '<path class="dash" d="M' + n1(cx - rx) + ' ' + n1(yBot) + ' A ' + n1(rx) + ' ' + n1(ry) +
    ' 0 0 1 ' + n1(cx + rx) + ' ' + n1(yBot) + '"/>';
  s += '<path class="ln" d="M' + n1(cx - rx) + ' ' + n1(yBot) + ' A ' + n1(rx) + ' ' + n1(ry) +
    ' 0 0 0 ' + n1(cx + rx) + ' ' + n1(yBot) + '"/>';
  s += '<ellipse class="bdy" cx="' + cx + '" cy="' + yTop + '" rx="' + n1(rx) + '" ry="' + n1(ry) + '"/>';
  // รัศมีที่หน้าตัดบน และความสูงที่ด้านขวา
  s += '<line class="frc" x1="' + cx + '" y1="' + yTop + '" x2="' + n1(cx + rx) + '" y2="' + yTop + '"/>';
  s += svgTxt(cx + rx / 2, yTop - ry - 12, 'r = ' + fmt(o.r) + u, 'middle');
  s += svgTxt(cx + rx + 14, yTop + hh / 2 + 5, 'h = ' + fmt(o.h) + u, 'start');
  return svgWrap(W, H, s);
}
/** ปริซึมสามเหลี่ยม (ภาพเฉียง)  o:{ b:ฐาน, h:สูงของหน้าตัด, len:ความยาวปริซึม, unit } */
function figPrismTri(o) {
  const W = 360, H = 220;
  const sc = Math.min(140 / Math.max(o.b, 1), 100 / Math.max(o.h, 1), 62 / Math.max(o.len, 1));
  const b = Math.max(86, o.b * sc), hh = Math.max(64, o.h * sc), d = Math.max(34, o.len * sc);
  const dx = d * 0.72, dy = -d * 0.55;
  const x0 = 62, ybase = 172;
  const u = o.unit ? ' ' + o.unit : '';
  const P = (x, y) => n1(x) + ',' + n1(y);
  const A = [x0, ybase], B = [x0 + b, ybase], C = [x0 + b / 2, ybase - hh];
  const A2 = [A[0] + dx, A[1] + dy], B2 = [B[0] + dx, B[1] + dy], C2 = [C[0] + dx, C[1] + dy];
  let s = '<polygon class="bdy" points="' + P(A2[0], A2[1]) + ' ' + P(B2[0], B2[1]) + ' ' + P(C2[0], C2[1]) + '"/>';
  s += '<polygon class="bdy" points="' + P(B[0], B[1]) + ' ' + P(B2[0], B2[1]) + ' ' + P(C2[0], C2[1]) + ' ' + P(C[0], C[1]) + '"/>';
  s += '<polygon class="bdy" points="' + P(A[0], A[1]) + ' ' + P(B[0], B[1]) + ' ' + P(C[0], C[1]) + '"/>';
  s += '<line class="dash" x1="' + n1(C[0]) + '" y1="' + n1(C[1]) + '" x2="' + n1(C[0]) + '" y2="' + ybase + '"/>';
  s += svgTxt(x0 + b / 2, ybase + 24, 'ฐาน ' + fmt(o.b) + u, 'middle');
  // ป้ายสูงอยู่ในรูป ป้ายยาวออกไปนอกรูปทางขวา ไม่งั้นสองป้ายชนกันเมื่อปริซึมสั้น
  s += svgTxt(C[0] + 9, ybase - hh * 0.45, 'สูง ' + fmt(o.h) + u, 'start');
  s += svgTxt(B[0] + dx + 12, B[1] + dy + 4, 'ยาว ' + fmt(o.len) + u, 'start');
  return svgWrap(W, H, s);
}
/** รูปหลายเหลี่ยมบนระนาบพิกัด ใช้กับการแปลงทางเรขาคณิต
    o:{ before:[[x,y]..], after:[[x,y]..], xmin.., labelA, labelB } */
function figTransform(o) {
  const xa = o.xmin == null ? -6 : o.xmin, xb = o.xmax == null ? 6 : o.xmax;
  const ya = o.ymin == null ? -6 : o.ymin, yb = o.ymax == null ? 6 : o.ymax;
  const W = 330, H = 320, pad = 30;
  const X = v => pad + (W - 2 * pad) * (v - xa) / (xb - xa);
  const Y = v => H - pad - (H - 2 * pad) * (v - ya) / (yb - ya);
  let s = '';
  for (let v = Math.ceil(xa); v <= xb; v++)
    s += '<line class="fgrd" x1="' + n1(X(v)) + '" y1="' + pad + '" x2="' + n1(X(v)) + '" y2="' + (H - pad) + '"/>';
  for (let v = Math.ceil(ya); v <= yb; v++)
    s += '<line class="fgrd" x1="' + pad + '" y1="' + n1(Y(v)) + '" x2="' + (W - pad) + '" y2="' + n1(Y(v)) + '"/>';
  s += '<line class="ln" x1="' + pad + '" y1="' + n1(Y(0)) + '" x2="' + (W - pad) + '" y2="' + n1(Y(0)) + '"/>';
  s += '<line class="ln" x1="' + n1(X(0)) + '" y1="' + pad + '" x2="' + n1(X(0)) + '" y2="' + (H - pad) + '"/>';
  for (let v = Math.ceil(xa); v <= xb; v++) if (v) s += svgTxt(X(v), Y(0) + 16, String(v), 'middle', true);
  for (let v = Math.ceil(ya); v <= yb; v++) if (v) s += svgTxt(X(0) - 7, Y(v) + 5, String(v), 'end', true);
  const poly = (pts, cls) => '<polygon class="' + cls + '" points="' +
    pts.map(p => n1(X(p[0])) + ',' + n1(Y(p[1]))).join(' ') + '"/>';
  // ป้ายชื่อรูปวางที่ "จุดกึ่งกลางของรูป" ไม่ใช่ที่จุดยอด
  // เพราะจุดยอดมักอยู่ติดแกน ซึ่งเป็นแถวตัวเลขของสเกล ป้ายจะไปทับตัวเลขเสมอ
  const midOf = pts => [pts.reduce((a, p) => a + p[0], 0) / pts.length,
                        pts.reduce((a, p) => a + p[1], 0) / pts.length];
  if (o.before) {
    s += poly(o.before, 'bdy');
    const c = midOf(o.before);
    s += svgTxt(X(c[0]), Y(c[1]) + 5, o.labelA || 'รูปเดิม', 'middle');
  }
  if (o.after) {
    s += '<polygon class="ffil" points="' + o.after.map(p => n1(X(p[0])) + ',' + n1(Y(p[1]))).join(' ') + '"/>';
    s += '<polygon class="dash" fill="none" points="' + o.after.map(p => n1(X(p[0])) + ',' + n1(Y(p[1]))).join(' ') + '"/>';
    const c = midOf(o.after);
    s += svgTxt(X(c[0]), Y(c[1]) + 5, o.labelB || 'รูปใหม่', 'middle');
  }
  return svgWrap(W, H, s);
}
/* ---------- รูปประกอบชุด ม.3 ---------- */

/** เส้นจำนวนแสดงเซตคำตอบของอสมการ
    o:{ from, to, at, dir:'gt'|'ge'|'lt'|'le' }
    วงกลมทึบ = รวมจุดนั้น (≤ ≥) · วงกลมโปร่ง = ไม่รวม (< >) */
function figIneq(o) {
  const from = o.from, to = o.to, span = to - from;
  if (!(span > 0)) return '';
  const W = 380, H = 100, pad = 30, y = 60;
  const X = v => pad + (W - 2 * pad) * (v - from) / span;
  const up = o.dir === 'gt' || o.dir === 'ge';
  const closed = o.dir === 'ge' || o.dir === 'le';
  let s = '<line class="ln" x1="' + n1(pad - 12) + '" y1="' + y + '" x2="' + n1(W - pad + 12) + '" y2="' + y + '"/>';
  s += svgArrow(X(to), y, W - pad + 15, y, 'ln2');
  s += svgArrow(X(from), y, pad - 15, y, 'ln2');
  for (let v = Math.ceil(from); v <= to; v++) {
    s += '<line class="ln" x1="' + n1(X(v)) + '" y1="' + (y - 6) + '" x2="' + n1(X(v)) + '" y2="' + (y + 6) + '"/>';
    s += svgTxt(X(v), y + 25, String(v), 'middle', true);
  }
  // แถบคำตอบวาดหนาและอยู่เหนือเส้นจำนวนเล็กน้อย จะได้ไม่กลืนกับเส้นหลัก
  const xa = o.at == null ? 0 : o.at;
  const ex = up ? W - pad + 12 : pad - 12;
  s += '<line class="frc" style="stroke-width:4" x1="' + n1(X(xa)) + '" y1="' + (y - 9) +
    '" x2="' + n1(ex) + '" y2="' + (y - 9) + '"/>';
  s += svgArrow(X(xa), y - 9, ex + (up ? 6 : -6), y - 9, 'frc');
  s += '<circle cx="' + n1(X(xa)) + '" cy="' + (y - 9) + '" r="5.6" ' +
    (closed ? 'class="fpt"' : 'fill="var(--panel)" stroke="var(--brand)" stroke-width="2.2"') + '/>';
  s += svgTxt(X(xa), y - 26, String(xa), 'middle');
  return svgWrap(W, H, s);
}
/** กราฟพาราโบลา y = ax² + bx + c บนระนาบพิกัด
    o:{ a, b, c, xmin, xmax, ymin, ymax, roots:[], vertex:true } */
function figParabola(o) {
  const xa = o.xmin == null ? -6 : o.xmin, xb = o.xmax == null ? 6 : o.xmax;
  const ya = o.ymin == null ? -8 : o.ymin, yb = o.ymax == null ? 10 : o.ymax;
  const W = 330, H = 320, pad = 30;
  const X = v => pad + (W - 2 * pad) * (v - xa) / (xb - xa);
  const Y = v => H - pad - (H - 2 * pad) * (v - ya) / (yb - ya);
  const a = o.a, b = o.b || 0, c = o.c || 0;
  let s = '';
  for (let v = Math.ceil(xa); v <= xb; v++)
    s += '<line class="fgrd" x1="' + n1(X(v)) + '" y1="' + pad + '" x2="' + n1(X(v)) + '" y2="' + (H - pad) + '"/>';
  for (let v = Math.ceil(ya); v <= yb; v++)
    s += '<line class="fgrd" x1="' + pad + '" y1="' + n1(Y(v)) + '" x2="' + (W - pad) + '" y2="' + n1(Y(v)) + '"/>';
  s += '<line class="ln" x1="' + pad + '" y1="' + n1(Y(0)) + '" x2="' + (W - pad) + '" y2="' + n1(Y(0)) + '"/>';
  s += '<line class="ln" x1="' + n1(X(0)) + '" y1="' + pad + '" x2="' + n1(X(0)) + '" y2="' + (H - pad) + '"/>';
  for (let v = Math.ceil(xa); v <= xb; v++) if (v) s += svgTxt(X(v), Y(0) + 16, String(v), 'middle', true);
  for (let v = Math.ceil(ya); v <= yb; v++) if (v && v % 2 === 0) s += svgTxt(X(0) - 7, Y(v) + 5, String(v), 'end', true);
  s += svgTxt(W - pad + 9, Y(0) + 5, 'x', 'middle', true);
  // ชื่อแกน y วางไว้ทาง<b>ขวา</b>ของแกน เพราะฝั่งซ้ายเป็นที่ของตัวเลขบนสเกล
  s += svgTxt(X(0) + 10, pad - 8, 'y', 'middle', true);
  // เก็บเฉพาะช่วงที่เส้นโค้งยังอยู่ในกรอบ ถ้าโผล่ออกไปแล้วกลับเข้ามาให้ขาดเป็นท่อน
  const segs = []; let cur = [];
  const N = 240;
  for (let i = 0; i <= N; i++) {
    const xv = xa + (xb - xa) * i / N, yv = a * xv * xv + b * xv + c;
    if (yv >= ya && yv <= yb) cur.push(n1(X(xv)) + ',' + n1(Y(yv)));
    else if (cur.length) { segs.push(cur); cur = []; }
  }
  if (cur.length) segs.push(cur);
  segs.forEach(p => { if (p.length > 1) s += '<polyline class="frc" points="' + p.join(' ') + '"/>'; });
  (o.roots || []).forEach(r => {
    s += '<circle class="fpt" cx="' + n1(X(r)) + '" cy="' + n1(Y(0)) + '" r="5"/>';
    // พาราโบลาคว่ำ ป้ายรากต้องลงไปใต้ตัวเลขบนแกน x ไม่งั้นทับกัน
    // พาราโบลาคว่ำ ป้ายรากลงไปอยู่ใต้แกน จึงต้องเลี่ยงแถวตัวเลขของแกน y ด้วยการถีบออกด้านข้าง
    s += svgTxt(X(r) + (a > 0 ? 0 : (r < 0 ? -8 : 8)), Y(0) + (a > 0 ? -13 : 40),
      '(' + fmt(r) + ' , 0)', a > 0 ? 'middle' : (r < 0 ? 'end' : 'start'));
  });
  if (o.vertex) {
    const vx = -b / (2 * a), vy = a * vx * vx + b * vx + c;
    if (vx >= xa && vx <= xb && vy >= ya && vy <= yb) {
      s += '<line class="dash" x1="' + n1(X(vx)) + '" y1="' + n1(Y(vy)) + '" x2="' + n1(X(vx)) + '" y2="' + n1(Y(0)) + '"/>';
      s += '<circle class="fpt" cx="' + n1(X(vx)) + '" cy="' + n1(Y(vy)) + '" r="5"/>';
      s += svgTxt(X(vx) + 10, Y(vy) + (a > 0 ? 18 : -10), 'จุดยอด (' + fmt(vx) + ' , ' + fmt(vy) + ')', 'start');
    }
  }
  return svgWrap(W, H, s);
}
/** กราฟเส้นตรงสองเส้นและจุดตัด ใช้กับระบบสมการเชิงเส้นสองตัวแปร
    o:{ lines:[{m,c,label}], sol:{x,y}, xmin.. } */
function figTwoLines(o) {
  const xa = o.xmin == null ? -6 : o.xmin, xb = o.xmax == null ? 6 : o.xmax;
  const ya = o.ymin == null ? -6 : o.ymin, yb = o.ymax == null ? 8 : o.ymax;
  const W = 330, H = 300, pad = 30;
  const X = v => pad + (W - 2 * pad) * (v - xa) / (xb - xa);
  const Y = v => H - pad - (H - 2 * pad) * (v - ya) / (yb - ya);
  let s = '';
  for (let v = Math.ceil(xa); v <= xb; v++)
    s += '<line class="fgrd" x1="' + n1(X(v)) + '" y1="' + pad + '" x2="' + n1(X(v)) + '" y2="' + (H - pad) + '"/>';
  for (let v = Math.ceil(ya); v <= yb; v++)
    s += '<line class="fgrd" x1="' + pad + '" y1="' + n1(Y(v)) + '" x2="' + (W - pad) + '" y2="' + n1(Y(v)) + '"/>';
  s += '<line class="ln" x1="' + pad + '" y1="' + n1(Y(0)) + '" x2="' + (W - pad) + '" y2="' + n1(Y(0)) + '"/>';
  s += '<line class="ln" x1="' + n1(X(0)) + '" y1="' + pad + '" x2="' + n1(X(0)) + '" y2="' + (H - pad) + '"/>';
  for (let v = Math.ceil(xa); v <= xb; v++) if (v) s += svgTxt(X(v), Y(0) + 16, String(v), 'middle', true);
  for (let v = Math.ceil(ya); v <= yb; v++) if (v && v % 2 === 0) s += svgTxt(X(0) - 7, Y(v) + 5, String(v), 'end', true);
  (o.lines || []).forEach(function (ln, i) {
    const pts = [];
    for (let k = 0; k <= 160; k++) {
      const xv = xa + (xb - xa) * k / 160, yv = ln.m * xv + ln.c;
      if (yv >= ya && yv <= yb) pts.push(n1(X(xv)) + ',' + n1(Y(yv)));
    }
    if (!pts.length) return;
    // เส้นที่สองวาดเป็นเส้นประ จะได้แยกออกจากกันแม้พิมพ์ขาว-ดำ
    s += '<polyline class="' + (i ? 'dash' : 'frc') + '" style="stroke-width:2" points="' + pts.join(' ') + '"/>';
    if (ln.label) {
      // ป้ายของสองเส้นวางคนละช่วง จะได้ไม่ไปกองกันแถวจุดตัด
      const frac = i ? 0.24 : 0.8;
      const p = pts[Math.min(pts.length - 1, Math.round((pts.length - 1) * frac))].split(',');
      s += svgTxt(Number(p[0]) - 8, Number(p[1]) - 10, ln.label, 'end');
    }
  });
  if (o.sol) {
    s += '<circle class="fpt" cx="' + n1(X(o.sol.x)) + '" cy="' + n1(Y(o.sol.y)) + '" r="5.4"/>';
    s += svgTxt(X(o.sol.x) + 9, Y(o.sol.y) - 9, '(' + fmt(o.sol.x) + ' , ' + fmt(o.sol.y) + ')', 'start');
  }
  return svgWrap(W, H, s);
}
/** สามเหลี่ยมคล้ายสองรูปวางเทียบกัน  o:{ a, b, k, unit, lblA:{}, lblB:{} }
    รูปที่สองคือรูปแรกคูณ k ทุกด้าน */
function figSimilar(o) {
  const W = 420, H = 210, ybase = 158;
  const k = o.k, a = o.a, b = o.b;
  // อัตราส่วนของสองรูปต้องเป็น k เป๊ะ ๆ จึงใช้สเกลเดียวกันทั้งคู่ ห้ามมีขั้นต่ำรายรูป
  // ไม่งั้นรูปเล็กจะถูกดันให้ใหญ่ขึ้น แล้ว "รูปคล้าย" จะดูไม่คล้ายตามอัตราส่วนที่โจทย์บอก
  const K = Math.max(k, 1), sm = Math.min(k, 1);
  let sc = Math.min(126 / Math.max(a * K, 1), 96 / Math.max(b * K, 1));
  sc = Math.max(sc, 30 / Math.max(Math.min(a, b) * sm, 1));   // กันรูปเล็กจนดูไม่ออก
  const P = (x, y) => n1(x) + ',' + n1(y);
  const u = o.unit ? ' ' + o.unit : '';
  let s = '';
  [[0, 1, o.lblA || {}, 'รูป ก'], [1, k, o.lblB || {}, 'รูป ข']].forEach(function (t) {
    const idx = t[0], m = t[1], lbl = t[2], name = t[3];
    const aa = a * m * sc, bb = b * m * sc;
    const x0 = idx ? 236 : 62;   // เว้นซ้ายไว้ให้ป้ายด้านตั้งที่วางชิดขวาของตัวเลข
    const A = [x0, ybase], B = [x0 + aa, ybase], C = [x0, ybase - bb];
    s += '<polygon class="bdy" points="' + P(A[0], A[1]) + ' ' + P(B[0], B[1]) + ' ' + P(C[0], C[1]) + '"/>';
    s += '<polyline class="ln2" points="' + P(x0 + 11, ybase) + ' ' + P(x0 + 11, ybase - 11) + ' ' + P(x0, ybase - 11) + '"/>';
    s += svgTxt(x0 + aa / 2, ybase + 22, lbl.a != null ? lbl.a : fmt(a * m) + u, 'middle');
    s += svgTxt(x0 - 8, ybase - bb / 2 + 5, lbl.b != null ? lbl.b : fmt(b * m) + u, 'end');
    s += svgTxt(x0 + aa / 2, ybase + 42, name, 'middle', true);
  });
  return svgWrap(W, H, s);
}
/** วงกลมพร้อมมุมในวงกลม  o:{ mode:'inscribed'|'central'|'tangent', deg, r, unit }
    inscribed = มุมในครึ่งวงกลมและมุมที่จุดศูนย์กลางรองรับส่วนโค้งเดียวกัน */
function figCircleAngle(o) {
  const W = 320, H = 260, cx = 160, cy = 132, R = 88;
  const deg = o.deg == null ? 70 : o.deg;
  const rad = d => d * Math.PI / 180;
  const P = d => [cx + R * Math.cos(rad(d)), cy - R * Math.sin(rad(d))];
  const pt = (p, lbl, dx, dy) => '<circle class="fpt" cx="' + n1(p[0]) + '" cy="' + n1(p[1]) + '" r="4.6"/>' +
    (lbl ? svgTxt(p[0] + (dx || 0), p[1] + (dy || 0), lbl, 'middle') : '');
  let s = '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>';
  // ชื่อจุดศูนย์กลางวางเยื้องขึ้นบน เพราะด้านล่างเป็นที่ของป้ายมุมที่จุดศูนย์กลาง
  s += '<circle class="fpt" cx="' + cx + '" cy="' + cy + '" r="3.4"/>' + svgTxt(cx - 14, cy - 10, 'O', 'middle');
  const L = (p, q, cls) => '<line class="' + (cls || 'frc') + '" x1="' + n1(p[0]) + '" y1="' + n1(p[1]) +
    '" x2="' + n1(q[0]) + '" y2="' + n1(q[1]) + '"/>';
  if (o.mode === 'tangent') {
    // เส้นสัมผัสตั้งฉากกับรัศมี ณ จุดสัมผัส — วาดจุดสัมผัสไว้ล่างสุดของวง
    const T = P(-90), E = [cx - 105, cy + R], F = [cx + 105, cy + R];
    s += L(E, F, 'ln');
    s += L([cx, cy], T);
    s += '<polyline class="ln2" points="' + n1(T[0] + 13) + ',' + n1(T[1]) + ' ' +
      n1(T[0] + 13) + ',' + n1(T[1] - 13) + ' ' + n1(T[0]) + ',' + n1(T[1] - 13) + '"/>';
    s += pt(T, 'ก', 0, 24);
    s += svgTxt(cx + 8, cy + R / 2, 'r' + (o.r != null ? ' = ' + fmt(o.r) + (o.unit ? ' ' + o.unit : '') : ''), 'start');
  } else {
    // ตำแหน่งของ ก ข ต้องทำให้มุมที่วาด "เท่ากับ deg จริง ๆ" ไม่ใช่แค่วางให้ดูสวย
    //   มุมที่จุดศูนย์กลาง  = ขนาดของส่วนโค้ง ก-ข  ⇒ วางห่างจากจุดล่างสุดข้างละ deg/2
    //   มุมในวงกลม        = ครึ่งหนึ่งของส่วนโค้ง ⇒ ส่วนโค้งต้องกาง 2·deg จึงวางข้างละ deg
    const halfArc = o.mode === 'central' ? deg / 2 : deg;
    const A = P(270 - halfArc), B = P(270 + halfArc);   // ปลายคอร์ดสองข้าง คร่อมจุดล่างสุด
    const Cc = P(90);                                    // จุดยอดมุมในวงกลมอยู่บนส่วนโค้งใหญ่
    s += L(A, B, 'dash');
    if (o.mode === 'central') { s += L([cx, cy], A); s += L([cx, cy], B); }
    else { s += L(Cc, A); s += L(Cc, B); s += L([cx, cy], A, 'dash'); s += L([cx, cy], B, 'dash'); }
    s += pt(A, 'ก', -15, 4) + pt(B, 'ข', 15, 4);
    if (o.mode !== 'central') s += pt(Cc, 'ค', 0, -12);
    // ป้ายมุมวางตามแนวเส้นแบ่งครึ่งมุม คือหันจากจุดยอดไปหากึ่งกลางคอร์ด
    const v = o.mode === 'central' ? [cx, cy] : Cc;
    const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const dx = mid[0] - v[0], dy = mid[1] - v[1], dl = Math.hypot(dx, dy) || 1;
    const gap = o.mode === 'central' ? 26 : 36;
    s += svgTxt(v[0] + dx / dl * gap, v[1] + dy / dl * gap + 5, o.label || (fmt(deg) + '°'), 'middle');
  }
  return svgWrap(W, H, s);
}
/** กรวย  o:{ r, h, unit } */
function figCone(o) {
  const W = 300, H = 240;
  const sc = Math.min(64 / Math.max(o.r, 1), 118 / Math.max(o.h, 1));
  const rx = Math.max(46, o.r * sc), ry = rx * 0.3, hh = Math.max(78, o.h * sc);
  const cx = 140, yBot = 190, yTop = yBot - hh;
  const u = o.unit ? ' ' + o.unit : '';
  let s = '<polygon class="bdy" points="' + n1(cx) + ',' + n1(yTop) + ' ' + n1(cx - rx) + ',' + n1(yBot) +
    ' ' + n1(cx + rx) + ',' + n1(yBot) + '"/>';
  s += '<path class="dash" d="M' + n1(cx - rx) + ' ' + n1(yBot) + ' A ' + n1(rx) + ' ' + n1(ry) +
    ' 0 0 1 ' + n1(cx + rx) + ' ' + n1(yBot) + '"/>';
  s += '<path class="ln" d="M' + n1(cx - rx) + ' ' + n1(yBot) + ' A ' + n1(rx) + ' ' + n1(ry) +
    ' 0 0 0 ' + n1(cx + rx) + ' ' + n1(yBot) + '"/>';
  s += '<line class="dash" x1="' + n1(cx) + '" y1="' + n1(yTop) + '" x2="' + n1(cx) + '" y2="' + n1(yBot) + '"/>';
  s += '<line class="frc" x1="' + n1(cx) + '" y1="' + n1(yBot) + '" x2="' + n1(cx + rx) + '" y2="' + n1(yBot) + '"/>';
  s += '<polyline class="ln2" points="' + n1(cx + 12) + ',' + n1(yBot) + ' ' + n1(cx + 12) + ',' +
    n1(yBot - 12) + ' ' + n1(cx) + ',' + n1(yBot - 12) + '"/>';
  // ป้ายทั้งสามวางนอกตัวกรวย ถ้าวางในรูปจะไปทับขอบเอียงซึ่งแคบลงเรื่อย ๆ ตามความสูง
  s += svgTxt(cx + rx / 2, yBot + ry + 24, 'r = ' + fmt(o.r) + u, 'middle');
  s += svgTxt(cx - rx - 12, yTop + hh / 2 + 5, 'h = ' + fmt(o.h) + u, 'end');
  if (o.slant != null) s += svgTxt(cx + rx / 2 + 22, yTop + hh / 2, 'l = ' + fmt(o.slant) + u, 'start');
  return svgWrap(W, H, s);
}
/** ทรงกลม  o:{ r, unit } */
function figSphere(o) {
  const W = 280, H = 220, cx = 140, cy = 112;
  const R = 82;
  const u = o.unit ? ' ' + o.unit : '';
  let s = '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>';
  // วงรีกลางลูกทำให้ดูเป็นทรงกลมไม่ใช่วงกลมแบน
  s += '<ellipse class="dash" cx="' + cx + '" cy="' + cy + '" rx="' + R + '" ry="' + n1(R * 0.3) + '"/>';
  s += '<line class="frc" x1="' + cx + '" y1="' + cy + '" x2="' + n1(cx + R) + '" y2="' + cy + '"/>';
  s += '<circle class="fpt" cx="' + cx + '" cy="' + cy + '" r="3.4"/>';
  s += svgTxt(cx + R / 2, cy - 30, 'r = ' + fmt(o.r) + u, 'middle');   // เหนือวงรีเส้นศูนย์สูตร
  return svgWrap(W, H, s);
}
/** พีระมิดฐานสี่เหลี่ยมจัตุรัส  o:{ b:ด้านฐาน, h:สูงตรง, slant:สูงเอียง, unit } */
function figPyramid(o) {
  const W = 360, H = 250;
  const sc = Math.min(70 / Math.max(o.b, 1), 108 / Math.max(o.h, 1));
  const b = Math.max(84, o.b * sc), hh = Math.max(74, o.h * sc);
  const cx = 178, yBase = 196, dx = b * 0.40, dy = b * 0.24;
  const u = o.unit ? ' ' + o.unit : '';
  // ฐานเป็นสี่เหลี่ยมด้านขนานแบบภาพเฉียง — ขอบหน้า A→B ขอบหลังเลื่อนไปขวาบน
  const A = [cx - b / 2 - dx / 2, yBase], B = [A[0] + b, yBase];
  const C = [B[0] + dx, yBase - dy], D = [A[0] + dx, yBase - dy];
  const F = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];      // จุดกึ่งกลางฐาน
  const T = [F[0], F[1] - hh];                            // ยอดพีระมิดอยู่เหนือกึ่งกลางฐานพอดี
  const P = p => n1(p[0]) + ',' + n1(p[1]);
  let s = '<polygon class="bdy" points="' + P(A) + ' ' + P(B) + ' ' + P(C) + ' ' + P(D) + '"/>';
  // หน้าที่มองเห็นสองหน้าวาดทึบ ขอบที่ถูกบังวาดเป็นเส้นประ
  s += '<polygon class="bdy" points="' + P(A) + ' ' + P(B) + ' ' + P(T) + '"/>';
  s += '<polygon class="bdy" points="' + P(B) + ' ' + P(C) + ' ' + P(T) + '"/>';
  s += '<line class="dash" x1="' + n1(D[0]) + '" y1="' + n1(D[1]) + '" x2="' + n1(T[0]) + '" y2="' + n1(T[1]) + '"/>';
  s += '<line class="dash" x1="' + n1(F[0]) + '" y1="' + n1(F[1]) + '" x2="' + n1(T[0]) + '" y2="' + n1(T[1]) + '"/>';
  s += svgTxt((A[0] + B[0]) / 2, yBase + 24, 'ฐาน ' + fmt(o.b) + u, 'middle');
  // ป้ายวางนอกตัวพีระมิดทั้งสองข้าง ถ้าวางในรูปจะทับหน้าเอียงซึ่งแคบลงตามความสูง
  s += svgTxt(A[0] - 8, (T[1] + F[1]) / 2, 'h = ' + fmt(o.h) + u, 'end');
  if (o.slant != null) s += svgTxt(C[0] + 8, (B[1] + T[1]) / 2 + 6, 'สูงเอียง ' + fmt(o.slant) + u, 'start');
  return svgWrap(W, H, s);
}
/** แผนภาพต้นไม้ความน่าจะเป็น  o:{ root, branches:[{ label, p, kids:[{label,p}] }] } */
function figTree(o) {
  const br = o.branches || [];
  if (!br.length) return '';
  const kids = (br[0].kids || []).length;
  const leaves = Math.max(1, br.length * Math.max(kids, 1));
  const W = 380, rowH = 54, H = 40 + leaves * rowH;
  const x0 = 34, x1 = 150, x2 = 272;
  const yOf = i => 30 + (i + 0.5) * ((H - 40) / leaves);
  const root = [x0, H / 2];
  let s = '<circle class="fpt" cx="' + x0 + '" cy="' + n1(H / 2) + '" r="4.6"/>';
  if (o.root) s += svgTxt(x0, H / 2 - 14, o.root, 'middle', true);
  br.forEach(function (b, i) {
    const kn = Math.max((b.kids || []).length, 1);
    const yB = (yOf(i * kn) + yOf(i * kn + kn - 1)) / 2;
    s += '<line class="frc" x1="' + x0 + '" y1="' + n1(root[1]) + '" x2="' + x1 + '" y2="' + n1(yB) + '"/>';
    s += svgTxt((x0 + x1) / 2, (root[1] + yB) / 2 - 7, b.p == null ? '' : String(b.p), 'middle', true);
    s += '<circle class="fpt" cx="' + x1 + '" cy="' + n1(yB) + '" r="4.6"/>';
    s += svgTxt(x1 + 6, yB - 9, b.label || '', 'start');
    (b.kids || []).forEach(function (kd, j) {
      const yK = yOf(i * kn + j);
      s += '<line class="frc" x1="' + x1 + '" y1="' + n1(yB) + '" x2="' + x2 + '" y2="' + n1(yK) + '"/>';
      s += svgTxt((x1 + x2) / 2 + 6, (yB + yK) / 2 - 7, kd.p == null ? '' : String(kd.p), 'middle', true);
      s += '<circle class="fpt" cx="' + x2 + '" cy="' + n1(yK) + '" r="4.6"/>';
      s += svgTxt(x2 + 9, yK + 5, kd.label || '', 'start');
    });
  });
  return svgWrap(W, H, s);
}
/** แผนภาพกล่อง  o:{ min, q1, med, q3, max, from, to, unit } */
function figBoxPlot(o) {
  const from = o.from == null ? o.min : o.from, to = o.to == null ? o.max : o.to;
  const span = to - from;
  if (!(span > 0)) return '';
  const W = 380, H = 150, pad = 34, yAx = 116, yMid = 60, hBox = 30;
  const X = v => pad + (W - 2 * pad) * (v - from) / span;
  let s = '<line class="ln" x1="' + n1(pad - 8) + '" y1="' + yAx + '" x2="' + n1(W - pad + 8) + '" y2="' + yAx + '"/>';
  const stepN = Math.max(1, Math.round(span / 8));
  for (let v = Math.ceil(from / stepN) * stepN; v <= to; v += stepN) {
    s += '<line class="ln2" x1="' + n1(X(v)) + '" y1="' + (yAx - 5) + '" x2="' + n1(X(v)) + '" y2="' + (yAx + 5) + '"/>';
    s += svgTxt(X(v), yAx + 22, String(v), 'middle', true);
  }
  // หนวดสองข้าง
  s += '<line class="ln" x1="' + n1(X(o.min)) + '" y1="' + yMid + '" x2="' + n1(X(o.q1)) + '" y2="' + yMid + '"/>';
  s += '<line class="ln" x1="' + n1(X(o.q3)) + '" y1="' + yMid + '" x2="' + n1(X(o.max)) + '" y2="' + yMid + '"/>';
  [o.min, o.max].forEach(function (v) {
    s += '<line class="ln" x1="' + n1(X(v)) + '" y1="' + (yMid - 11) + '" x2="' + n1(X(v)) + '" y2="' + (yMid + 11) + '"/>';
  });
  s += '<rect class="bdy" x="' + n1(X(o.q1)) + '" y="' + (yMid - hBox / 2) + '" width="' +
    n1(Math.max(2, X(o.q3) - X(o.q1))) + '" height="' + hBox + '"/>';
  s += '<line class="frc" x1="' + n1(X(o.med)) + '" y1="' + (yMid - hBox / 2) + '" x2="' + n1(X(o.med)) +
    '" y2="' + (yMid + hBox / 2) + '"/>';
  [['min', o.min], ['Q1', o.q1], ['Q2', o.med], ['Q3', o.q3], ['max', o.max]].forEach(function (t, i) {
    // สลับบน-ล่างกันไม่ให้ป้ายห้าอันชนกันเมื่อค่าใกล้กัน
    s += svgTxt(X(t[1]), i % 2 ? 30 : 18, String(t[1]), 'middle', true);
  });
  return svgWrap(W, H, s);
}
/** สามเหลี่ยมมุมฉากพร้อมมุม θ ใช้กับตรีโกณมิติ
    o:{ deg, opp, adj, hyp, unit }  ค่าใดเป็น null จะแสดงเป็นเครื่องหมายคำถาม */
function figTrig(o) {
  const W = 350, H = 220, ybase = 170, x0 = 66;
  const deg = o.deg == null ? 30 : o.deg;
  const adj = 190, opp = adj * Math.tan(deg * Math.PI / 180);
  const oh = Math.min(opp, 116), aw = oh < opp ? oh / Math.tan(deg * Math.PI / 180) : adj;
  const A = [x0, ybase], B = [x0 + aw, ybase], C = [x0 + aw, ybase - oh];
  const P = p => n1(p[0]) + ',' + n1(p[1]);
  const u = o.unit ? ' ' + o.unit : '';
  const L = v => v == null ? '?' : fmt(v) + u;
  let s = '<polygon class="bdy" points="' + P(A) + ' ' + P(B) + ' ' + P(C) + '"/>';
  s += '<polyline class="ln2" points="' + n1(B[0] - 13) + ',' + n1(B[1]) + ' ' + n1(B[0] - 13) + ',' +
    n1(B[1] - 13) + ' ' + n1(B[0]) + ',' + n1(B[1] - 13) + '"/>';
  // ส่วนโค้งของมุม θ ที่จุดยอดซ้าย พร้อมตัวเลของศาอยู่ในส่วนโค้ง
  const r = 30;
  s += '<path class="frc" d="M' + n1(x0 + r) + ' ' + ybase + ' A ' + r + ' ' + r + ' 0 0 0 ' +
    n1(x0 + r * Math.cos(deg * Math.PI / 180)) + ' ' + n1(ybase - r * Math.sin(deg * Math.PI / 180)) + '"/>';
  s += svgTxt(x0 + (r + 15) * Math.cos(deg * Math.PI / 360), ybase - (r + 15) * Math.sin(deg * Math.PI / 360) + 5,
    o.angLbl || (fmt(deg) + '°'), 'middle');
  s += svgTxt((A[0] + B[0]) / 2, ybase + 26, L(o.adj), 'middle');
  s += svgTxt(B[0] + 12, ybase - oh / 2 + 5, L(o.opp), 'start');
  s += svgTxt((A[0] + C[0]) / 2 - 12, ybase - oh / 2 - 8, L(o.hyp), 'end');
  return svgWrap(W, H, s);
}
/* --- 3.6 วาดวิธีทำ 7 ขั้น ------------------------------------------------- */
const STEP_TITLES = ['วิเคราะห์โจทย์', 'สิ่งที่โจทย์กำหนด', 'หลักการและสูตรที่ใช้',
                     'ตั้งสมการและจัดรูป', 'แทนค่า / ดำเนินการ', 'คำนวณ', 'สรุปคำตอบและตรวจสอบ'];

