/* ============================================================================
   ตัวช่วยเฉพาะวิชา — subjects/science/4-helpers.js
   ตัววาดรูปประกอบโจทย์ (fig*) คลังคำที่แม่แบบใช้สุ่ม และชื่อขั้นของวิธีทำ 7 ขั้น (STEP_TITLES)
   เอนจินสุ่มโจทย์อยู่ใน core/30-engine.js ใช้ร่วมกันทุกวิชา
   ========================================================================== */
/* คำและสิ่งของสำหรับแต่งโจทย์ปัญหา — เปลี่ยนทุกครั้งที่สุ่ม โจทย์จึงไม่ซ้ำซาก */
const GOODS  = ['สมุด', 'ปากกา', 'ดินสอ', 'ไม้บรรทัด', 'ยางลบ', 'แฟ้ม'];
const FRUITS = ['ส้ม', 'มะม่วง', 'กล้วย', 'เงาะ', 'ลำไย', 'ฝรั่ง'];
const SHOPS  = ['ร้านสหกรณ์โรงเรียน', 'ร้านเครื่องเขียน', 'ตลาดนัด', 'ร้านค้าชุมชน'];
const PLACES = ['ห้องสมุด', 'สนามกีฬา', 'โรงอาหาร', 'หอประชุม', 'อาคารเรียน'];
const SUBJ   = ['คณิตศาสตร์', 'วิทยาศาสตร์', 'ภาษาไทย', 'ภาษาอังกฤษ', 'สังคมศึกษา'];
/* --- 3.3ข รูปประกอบโจทย์วิทยาศาสตร์ -----------------------------------------
   ทุกฟังก์ชันคืน SVG ที่ยืดตามความกว้างของกล่อง จึงอ่านออกทั้งบนไอแพดและบนกระดาษ A4
   สีทั้งหมดอ้างตัวแปรธีม รูปจึงเปลี่ยนตามโหมดสว่าง-มืดเอง
   ⚠ ชื่อคลาสในรูปขึ้นต้นด้วย f ทุกตัว (fbar fbox ffil fgrd fpt) เพื่อไม่ให้ชนกับ
     คลาสของหน้าเว็บ — เบราว์เซอร์ถือว่า width/height ของ SVG เป็นสมบัติ CSS ด้วย
     ถ้าชื่อชนกัน เช่น .bar ของแถบสถิติ ความสูงของแท่งกราฟจะถูกทับจนเพี้ยนทั้งรูป
   ⚠ กรอบทุกรูปตั้งให้เตี้ยไว้ก่อน เพราะใบงานหนึ่งหน้าต้องใส่โจทย์ได้ 3-5 ข้อ
     รูปสูงเกินไปจะดันข้อถัดไปตกหน้า
   -------------------------------------------------------------------------- */

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
/** กราฟเส้น/จุดอเนกประสงค์ — ใช้ได้ทั้งกราฟ v–t, กราฟการให้ความร้อน,
    กราฟอัตราการเกิดปฏิกิริยา และกราฟอัตราการสังเคราะห์ด้วยแสง
    o:{ xlab, ylab, xmax, ymax, xmin, ymin, xstep, ystep, pts:[[x,y],…],
        pts2:[…] เส้นที่สอง, marks:[{x,y,label}] , area:true แรเงาใต้กราฟ } */
function figXY(o) {
  const W = 400, H = 236, ox = 56, oy = 178, w = 306, h = 142;
  const x0 = o.xmin || 0, x1 = o.xmax, y0 = o.ymin || 0, y1 = o.ymax;
  if (!(x1 > x0) || !(y1 > y0)) return '';
  const sx = v => ox + w * (v - x0) / (x1 - x0);
  const sy = v => oy - h * (v - y0) / (y1 - y0);
  let s = '';
  const nx = o.xstep || 5, ny = o.ystep || 4;
  for (let i = 0; i <= nx; i++) {
    const v = x0 + (x1 - x0) * i / nx;
    s += '<line class="fgrd" x1="' + n1(sx(v)) + '" y1="' + n1(sy(y0)) + '" x2="' + n1(sx(v)) +
      '" y2="' + n1(sy(y1)) + '"/>';
    s += svgTxt(sx(v), oy + 18, fmtq(v), 'middle', true);
  }
  for (let i = 0; i <= ny; i++) {
    const v = y0 + (y1 - y0) * i / ny;
    s += '<line class="fgrd" x1="' + ox + '" y1="' + n1(sy(v)) + '" x2="' + (ox + w) +
      '" y2="' + n1(sy(v)) + '"/>';
    s += svgTxt(ox - 8, sy(v) + 5, fmtq(v), 'end', true);
  }
  // พื้นที่ใต้กราฟ ใช้กับโจทย์ "หาระยะทางจากกราฟ v–t"
  if (o.area && o.pts && o.pts.length > 1) {
    s += '<polygon class="ffil" points="' + n1(sx(o.pts[0][0])) + ',' + n1(sy(y0)) + ' ' +
      o.pts.map(p => n1(sx(p[0])) + ',' + n1(sy(p[1]))).join(' ') + ' ' +
      n1(sx(o.pts[o.pts.length - 1][0])) + ',' + n1(sy(y0)) + '"/>';
  }
  s += svgArrow(ox, oy, ox, sy(y1) - 12, 'ln');
  s += svgArrow(ox, oy, ox + w + 14, oy, 'ln');
  if (o.pts2) s += '<polyline class="ln2" points="' +
    o.pts2.map(p => n1(sx(p[0])) + ',' + n1(sy(p[1]))).join(' ') + '"/>';
  if (o.pts) {
    s += '<polyline class="frc" points="' + o.pts.map(p => n1(sx(p[0])) + ',' + n1(sy(p[1]))).join(' ') + '"/>';
    if (o.dots !== false) o.pts.forEach(p => {
      s += '<circle class="fpt" cx="' + n1(sx(p[0])) + '" cy="' + n1(sy(p[1])) + '" r="3.4"/>';
    });
  }
  (o.marks || []).forEach(m => {
    s += '<circle class="fpt" cx="' + n1(sx(m.x)) + '" cy="' + n1(sy(m.y)) + '" r="4.4"/>';
    if (m.label) s += svgTxt(sx(m.x), sy(m.y) - 11, m.label, 'middle');
  });
  // ชื่อแกนวางไว้คนละบรรทัดกับตัวเลข จึงไม่มีทางทับกัน
  s += svgTxt(ox + w / 2, oy + 38, o.xlab || '', 'middle', true);
  s += svgTxt(ox - 44, 18, o.ylab || '', 'start', true);
  return svgWrap(W, H, s);
}
/** แผนภูมิแท่ง  o:{ items:[{label, v}], ylab, ymax } */
function figBarChart(o) {
  const items = (o.items || []).filter(Boolean);
  if (!items.length) return '';
  const W = 380, H = 210, ox = 50, oy = 158, w = 306, h = 124;
  const ymax = o.ymax || Math.max.apply(null, items.map(x => x.v)) * 1.2 || 1;
  const bw = Math.min(46, w / items.length * 0.62);
  const gap = w / items.length;
  let s = '';
  for (let i = 0; i <= 4; i++) {
    const y = oy - h * i / 4;
    s += '<line class="fgrd" x1="' + ox + '" y1="' + n1(y) + '" x2="' + (ox + w) + '" y2="' + n1(y) + '"/>';
    s += svgTxt(ox - 8, y + 5, fmtq(ymax * i / 4), 'end', true);
  }
  items.forEach((it, i) => {
    const cx = ox + gap * (i + 0.5), bh = h * Math.max(0, it.v) / ymax;
    s += '<rect class="fbar" x="' + n1(cx - bw / 2) + '" y="' + n1(oy - bh) +
      '" width="' + n1(bw) + '" height="' + n1(bh) + '"/>';
    s += svgTxt(cx, oy - bh - 6, fmtq(it.v), 'middle');
    s += svgTxt(cx, oy + 18, it.label, 'middle', true);
  });
  s += '<line class="ln" x1="' + ox + '" y1="' + oy + '" x2="' + (ox + w) + '" y2="' + oy + '"/>';
  s += '<line class="ln" x1="' + ox + '" y1="' + oy + '" x2="' + ox + '" y2="' + (oy - h) + '"/>';
  if (o.ylab) s += svgTxt(ox - 40, 16, o.ylab, 'start', true);
  return svgWrap(W, H, s);
}
/** บีกเกอร์ / กระบอกตวง พร้อมของเหลวและวัตถุจม
    o:{ label, liquid:'น้ำ', fill:0-1, solid:{label} จมอยู่ก้น, marks:[{f,label}] } */
function figBeaker(o) {
  const W = 250, H = 190, x0 = 68, y0 = 26, bw = 112, bh = 132;
  const f = clamp(o.fill == null ? 0.62 : o.fill, 0.05, 0.96);
  const ly = y0 + bh * (1 - f);
  let s = '<rect class="ffil" x="' + x0 + '" y="' + n1(ly) + '" width="' + bw +
    '" height="' + n1(y0 + bh - ly) + '"/>';
  s += '<polyline class="ln" points="' + x0 + ',' + y0 + ' ' + x0 + ',' + (y0 + bh) + ' ' +
    (x0 + bw) + ',' + (y0 + bh) + ' ' + (x0 + bw) + ',' + y0 + '"/>';
  s += '<line class="ln2" x1="' + x0 + '" y1="' + n1(ly) + '" x2="' + (x0 + bw) + '" y2="' + n1(ly) + '"/>';
  // ขีดสเกลข้างกระบอก
  (o.marks || []).forEach(m => {
    const y = y0 + bh * (1 - clamp(m.f, 0, 1));
    s += '<line class="ln2" x1="' + (x0 + bw) + '" y1="' + n1(y) + '" x2="' + (x0 + bw + 9) + '" y2="' + n1(y) + '"/>';
    s += svgTxt(x0 + bw + 13, y + 5, m.label, 'start', true);
  });
  if (o.solid) {
    const sw = 44, sh = 30;
    s += '<rect class="bdy" x="' + n1(x0 + (bw - sw) / 2) + '" y="' + n1(y0 + bh - sh - 6) +
      '" width="' + sw + '" height="' + sh + '" rx="3"/>';
    if (o.solid.label) s += svgTxt(x0 + bw / 2, y0 + bh - sh / 2 - 1, o.solid.label, 'middle');
  }
  if (o.liquid) s += svgTxt(x0 - 8, ly + 5, o.liquid, 'end', true);
  if (o.label) s += svgTxt(x0 + bw / 2, y0 + bh + 24, o.label, 'middle');
  return svgWrap(W, H, s);
}
/** วัตถุลอยน้ำ แสดงส่วนที่จมกับส่วนที่โผล่  o:{ sink:0-1 สัดส่วนที่จม, label } */
function figFloat(o) {
  const W = 300, H = 170, x0 = 22, xw = 256, wy = 76;
  const k = clamp(o.sink == null ? 0.6 : o.sink, 0.05, 1);
  const bw = 88, bh = 62, bx = x0 + (xw - bw) / 2;
  const by = wy - bh * (1 - k);
  let s = '<rect class="ffil" x="' + x0 + '" y="' + wy + '" width="' + xw + '" height="66"/>';
  s += '<rect class="bdy" x="' + n1(bx) + '" y="' + n1(by) + '" width="' + bw + '" height="' + bh + '" rx="3"/>';
  s += '<line class="ln" x1="' + x0 + '" y1="' + wy + '" x2="' + (x0 + xw) + '" y2="' + wy + '"/>';
  s += '<rect class="fbox" x="' + x0 + '" y="' + wy + '" width="' + xw + '" height="66"/>';
  s += svgTxt(x0 + 8, wy + 20, 'น้ำ', 'start', true);
  if (o.label) s += svgTxt(bx + bw / 2, by + bh / 2 + 5, o.label, 'middle');
  s += svgTxt(x0 + xw - 6, wy - 8, 'ผิวน้ำ', 'end', true);
  return svgWrap(W, H, s);
}
/** เซลล์พืชหรือเซลล์สัตว์พร้อมป้ายชี้ส่วนประกอบ
    o:{ kind:'plant'|'animal', labels:[{part, text}] } — part: wall nucleus chloro vacuole membrane */
function figCell(o) {
  const plant = o.kind !== 'animal';
  const W = 340, H = 190, cx = 130, cy = 92;
  let s = '';
  if (plant) {
    s += '<rect class="bdy" x="34" y="26" width="192" height="132" rx="6"/>';
    s += '<rect class="fbox" x="42" y="34" width="176" height="116" rx="14"/>';
    s += '<ellipse class="ffil" cx="150" cy="106" rx="52" ry="34"/>';
    s += '<circle class="ffil" cx="80" cy="60" r="11"/><circle class="ffil" cx="106" cy="46" r="11"/>';
  } else {
    s += '<ellipse class="bdy" cx="' + cx + '" cy="' + cy + '" rx="96" ry="66"/>';
  }
  s += '<circle class="fbar" cx="' + (plant ? 84 : cx - 18) + '" cy="' + (plant ? 104 : cy) + '" r="24"/>';
  s += '<circle class="fpt" cx="' + (plant ? 84 : cx - 18) + '" cy="' + (plant ? 104 : cy) + '" r="7"/>';
  // ป้ายชี้เรียงลงมาทางขวา ไม่ทับตัวเซลล์
  (o.labels || []).forEach((l, i) => {
    const y = 42 + i * 26;
    s += '<line class="ln2" x1="' + (plant ? 226 : 224) + '" y1="' + (60 + i * 22) + '" x2="242" y2="' + y + '"/>';
    s += svgTxt(246, y + 4, l, 'start', true);
  });
  return svgWrap(W, H, s);
}
/** แผนภาพการสังเคราะห์ด้วยแสง — ลูกศรเข้า-ออกจากใบ
    o:{ inp:['CO₂','น้ำ'], out:['O₂','น้ำตาล'], light:'แสง' } */
function figLeafGas(o) {
  const W = 340, H = 186, cx = 170, cy = 96;
  let s = '<path class="bdy" d="M' + (cx - 66) + ' ' + cy + ' C ' + (cx - 46) + ' ' + (cy - 52) + ', ' +
    (cx + 46) + ' ' + (cy - 52) + ', ' + (cx + 66) + ' ' + cy + ' C ' + (cx + 46) + ' ' + (cy + 52) + ', ' +
    (cx - 46) + ' ' + (cy + 52) + ', ' + (cx - 66) + ' ' + cy + ' Z"/>';
  s += '<line class="ln2" x1="' + (cx - 60) + '" y1="' + cy + '" x2="' + (cx + 60) + '" y2="' + cy + '"/>';
  (o.inp || []).forEach((t, i) => {
    const y = cy - 22 + i * 44;
    s += svgArrow(24, y, cx - 62, y, 'frc');
    s += svgTxt(22, y - 7, t, 'start');
  });
  (o.out || []).forEach((t, i) => {
    const y = cy - 22 + i * 44;
    s += svgArrow(cx + 62, y, W - 24, y, 'frc');
    s += svgTxt(W - 22, y - 7, t, 'end');
  });
  if (o.light) {
    for (let i = 0; i < 3; i++) s += svgArrow(cx - 40 + i * 40, 16, cx - 30 + i * 40, cy - 40, 'ln2');
    s += svgTxt(cx, 12, o.light, 'middle', true);
  }
  return svgWrap(W, H, s);
}
/** เทอร์โมมิเตอร์หนึ่งหรือสองอัน  o:{ items:[{t, label}], tmin, tmax } */
function figThermo(o) {
  const items = (o.items || []).filter(Boolean);
  if (!items.length) return '';
  const tmin = o.tmin == null ? 0 : o.tmin, tmax = o.tmax == null ? 100 : o.tmax;
  const W = Math.max(200, items.length * 108), H = 200, top = 22, bot = 150;
  let s = '';
  items.forEach((it, i) => {
    const x = W / items.length * (i + 0.5);
    const f = clamp((it.t - tmin) / (tmax - tmin || 1), 0, 1);
    const y = bot - (bot - top) * f;
    s += '<rect class="fbox" x="' + n1(x - 9) + '" y="' + top + '" width="18" height="' + (bot - top) + '" rx="9"/>';
    s += '<rect class="fbar" x="' + n1(x - 6) + '" y="' + n1(y) + '" width="12" height="' + n1(bot - y) + '"/>';
    s += '<circle class="fbar" cx="' + n1(x) + '" cy="' + (bot + 12) + '" r="13"/>';
    s += svgTxt(x + 16, y + 5, fmtq(it.t) + ' °C', 'start');
    if (it.label) s += svgTxt(x, bot + 44, it.label, 'middle', true);
  });
  return svgWrap(W, H, s);
}
/** แท่งโลหะนำความร้อน — ปลายหนึ่งร้อน ลูกศรบอกทิศการถ่ายโอน
    o:{ hot:'ปลายร้อน 90 °C', cold:'ปลายเย็น 30 °C', mid:'ทองแดง' } */
function figHeatFlow(o) {
  const W = 360, H = 132, x0 = 46, xw = 268, y = 52, bh = 30;
  let s = '<rect class="bdy" x="' + x0 + '" y="' + y + '" width="' + xw + '" height="' + bh + '" rx="3"/>';
  for (let i = 0; i < 4; i++) {
    const a = x0 + 30 + i * 62;
    s += svgArrow(a, y + bh / 2, a + 44, y + bh / 2, 'frc');
  }
  if (o.mid) s += svgTxt(x0 + xw / 2, y - 12, o.mid, 'middle');
  if (o.hot) s += svgTxt(x0 - 6, y + bh / 2 + 5, o.hot, 'end', true);
  if (o.cold) s += svgTxt(x0 + xw + 6, y + bh / 2 + 5, o.cold, 'start', true);
  s += svgTxt(W / 2, y + bh + 30, 'ความร้อนไหลจากที่ร้อนกว่าไปที่เย็นกว่าเสมอ', 'middle', true);
  return svgWrap(W, H, s);
}
/** ชั้นซ้อนกันในแนวตั้ง — ใช้ได้ทั้งชั้นบรรยากาศ ชั้นหิน และชั้นดิน
    o:{ layers:[{name, note}] เรียงจากบนลงล่าง, title } */
function figLayers(o) {
  const ls = (o.layers || []).filter(Boolean);
  if (!ls.length) return '';
  const rowH = 30, W = 380, H = 18 + ls.length * rowH + 12, x0 = 16, bw = 176;
  let s = '';
  ls.forEach((l, i) => {
    const y = 14 + i * rowH;
    s += '<rect class="' + (i % 2 ? 'ffil' : 'fbox') + '" x="' + x0 + '" y="' + y +
      '" width="' + bw + '" height="' + rowH + '"/>';
    s += '<rect class="fbox" x="' + x0 + '" y="' + y + '" width="' + bw + '" height="' + rowH + '"/>';
    s += svgTxt(x0 + bw / 2, y + rowH / 2 + 5, l.name, 'middle');
    if (l.note) s += svgTxt(x0 + bw + 12, y + rowH / 2 + 5, l.note, 'start', true);
  });
  if (o.title) s += svgTxt(x0, 10, o.title, 'start', true);
  return svgWrap(W, H, s);
}
/** ชุดกลั่นอย่างง่าย / ชุดกรอง  o:{ kind:'distill'|'filter'|'chroma', label } */
function figSepar(o) {
  const W = 360, H = 200;
  let s = '';
  if (o.kind === 'chroma') {
    // โครมาโทกราฟีกระดาษ พร้อมระยะที่ตัวทำละลายและสารเคลื่อนที่ได้
    const x = 150, top = 20, base = 168;
    s += '<rect class="fbox" x="' + (x - 34) + '" y="' + top + '" width="68" height="' + (base - top) + '"/>';
    const sf = clamp(o.solvent == null ? 0.8 : o.solvent, 0.1, 0.98);
    const pf = clamp(o.spot == null ? 0.45 : o.spot, 0.05, 0.95);
    const ys = base - (base - top - 12) * sf, yp = base - (base - top - 12) * pf;
    s += '<line class="dash" x1="' + (x - 46) + '" y1="' + n1(ys) + '" x2="' + (x + 90) + '" y2="' + n1(ys) + '"/>';
    s += svgTxt(x + 94, ys + 5, o.solventLbl || 'แนวตัวทำละลาย', 'start', true);
    s += '<ellipse class="fbar" cx="' + x + '" cy="' + n1(yp) + '" rx="15" ry="9"/>';
    s += svgTxt(x + 94, yp + 5, o.spotLbl || 'สารที่แยกได้', 'start', true);
    s += '<line class="ln" x1="' + (x - 46) + '" y1="' + (base - 10) + '" x2="' + (x + 90) + '" y2="' + (base - 10) + '"/>';
    s += svgTxt(x + 94, base - 5, 'เส้นเริ่มต้น', 'start', true);
  } else if (o.kind === 'filter') {
    s += '<polyline class="ln" points="120,26 180,26 150,92"/>';
    s += '<polygon class="ffil" points="126,32 174,32 150,84"/>';
    s += svgArrow(150, 92, 150, 122, 'frc');
    s += '<polyline class="ln" points="118,124 118,176 182,176 182,124"/>';
    s += '<rect class="ffil" x="118" y="146" width="64" height="30"/>';
    s += svgTxt(190, 40, o.top || 'ของผสม', 'start', true);
    s += svgTxt(190, 168, o.bottom || 'ของเหลวที่ผ่านกระดาษกรอง', 'start', true);
  } else {
    // ชุดกลั่นอย่างง่าย: ขวากลั่น → ท่อควบแน่น → ขวารับ
    s += '<rect class="fbox" x="34" y="86" width="76" height="76" rx="8"/>';
    s += '<rect class="ffil" x="36" y="122" width="72" height="38"/>';
    s += '<line class="ln" x1="72" y1="86" x2="72" y2="52"/>';
    s += '<line class="ln" x1="72" y1="52" x2="212" y2="82"/>';
    s += '<rect class="fbox" x="126" y="46" width="104" height="34" rx="6" transform="rotate(12 126 46)"/>';
    s += svgArrow(214, 84, 246, 104, 'frc');
    s += '<rect class="fbox" x="240" y="106" width="66" height="60" rx="6"/>';
    s += '<rect class="ffil" x="242" y="142" width="62" height="24"/>';
    s += svgTxt(72, 178, o.left || 'ของผสม + ให้ความร้อน', 'middle', true);
    s += svgTxt(274, 182, o.right || 'สารที่กลั่นได้', 'middle', true);
  }
  if (o.label) s += svgTxt(W / 2, 14, o.label, 'middle', true);
  return svgWrap(W, H, s);
}
/** วงจรไฟฟ้าอย่างง่าย — อนุกรมหรือขนาน
    o:{ kind:'series'|'parallel', emf:'12 V', rs:['R₁ = 4 Ω','R₂ = 6 Ω'], meter:'A' } */
function figCircuit(o) {
  const rs = (o.rs || []).slice(0, 3);
  const W = 380, H = o.kind === 'parallel' ? 200 : 168;
  const L = 40, Rt = 250, T = 44, B = H - 42;
  let s = '';
  const resistor = (x, y, lbl, horiz) => {
    let t = '';
    if (horiz !== false) {
      t += '<rect class="bdy" x="' + n1(x - 24) + '" y="' + n1(y - 11) + '" width="48" height="22"/>';
      t += svgTxt(x, y - 18, lbl, 'middle');
    } else {
      t += '<rect class="bdy" x="' + n1(x - 11) + '" y="' + n1(y - 24) + '" width="22" height="48"/>';
      t += svgTxt(x + 16, y + 5, lbl, 'start');
    }
    return t;
  };
  // แบตเตอรี่วางไว้ด้านซ้ายเสมอ
  const bat = y => '<line class="ln" x1="' + (L - 11) + '" y1="' + n1(y - 13) + '" x2="' + (L + 11) + '" y2="' + n1(y - 13) + '"/>' +
    '<line class="ln" x1="' + (L - 6) + '" y1="' + n1(y + 1) + '" x2="' + (L + 6) + '" y2="' + n1(y + 1) + '"/>' +
    svgTxt(L - 16, y + 6, o.emf || '', 'end');
  if (o.kind === 'parallel') {
    const mid = (T + B) / 2;
    s += '<polyline class="ln" points="' + L + ',' + (mid - 13) + ' ' + L + ',' + T + ' ' + Rt + ',' + T + '"/>';
    s += '<polyline class="ln" points="' + L + ',' + (mid + 1) + ' ' + L + ',' + B + ' ' + Rt + ',' + B + '"/>';
    s += bat(mid);
    const xs = rs.map((r, i) => 130 + i * 74);
    xs.forEach((x, i) => {
      s += '<line class="ln" x1="' + x + '" y1="' + T + '" x2="' + x + '" y2="' + (mid - 24) + '"/>';
      s += '<line class="ln" x1="' + x + '" y1="' + (mid + 24) + '" x2="' + x + '" y2="' + B + '"/>';
      s += resistor(x, mid, rs[i], false);
    });
    s += '<line class="ln" x1="' + Rt + '" y1="' + T + '" x2="' + Rt + '" y2="' + B + '"/>';
  } else {
    s += '<polyline class="ln" points="' + L + ',' + (T + 13) + ' ' + L + ',' + T + ' ' + Rt + ',' + T +
      ' ' + Rt + ',' + B + ' ' + L + ',' + B + ' ' + L + ',' + (T + 27) + '"/>';
    s += bat(T + 26);
    rs.forEach((r, i) => { s += resistor(110 + i * 78, T, r); });
  }
  if (o.meter) {
    s += '<circle class="fbox" cx="' + (Rt) + '" cy="' + ((T + B) / 2) + '" r="15"/>';
    s += svgTxt(Rt, (T + B) / 2 + 5, o.meter, 'middle');
  }
  s += svgTxt(W - 4, H - 8, o.kind === 'parallel' ? 'ต่อแบบขนาน' : 'ต่อแบบอนุกรม', 'end', true);
  return svgWrap(W, H, s);
}
/** ตารางพันเนตต์ 2×2  o:{ top:['A','a'], left:['A','a'], cells:[[..]] , note } */
function figPunnett(o) {
  const top = o.top || ['A', 'a'], left = o.left || ['A', 'a'];
  const n = top.length, cw = 54, W = 60 + n * cw + 90, H = 46 + n * cw + 16, x0 = 56, y0 = 40;
  let s = '';
  top.forEach((t, i) => { s += svgTxt(x0 + cw * (i + 0.5), y0 - 10, t, 'middle'); });
  left.forEach((t, j) => { s += svgTxt(x0 - 12, y0 + cw * (j + 0.5) + 5, t, 'end'); });
  for (let j = 0; j < left.length; j++) {
    for (let i = 0; i < n; i++) {
      const x = x0 + i * cw, y = y0 + j * cw;
      s += '<rect class="fbox" x="' + x + '" y="' + y + '" width="' + cw + '" height="' + cw + '"/>';
      const v = (o.cells && o.cells[j]) ? o.cells[j][i] : (left[j] + top[i]);
      if (v) s += svgTxt(x + cw / 2, y + cw / 2 + 6, v, 'middle');
    }
  }
  if (o.note) s += svgTxt(x0 + n * cw + 12, y0 + 18, o.note, 'start', true);
  return svgWrap(W, H, s);
}
/** โซ่อาหาร — กล่องต่อกันด้วยลูกศร  o:{ items:['หญ้า','ตั๊กแตน',…], energies:[…] } */
function figFoodChain(o) {
  const items = (o.items || []).filter(Boolean);
  if (!items.length) return '';
  const bw = 78, gap = 26, H = o.energies ? 118 : 84, y = 34;
  const W = items.length * bw + (items.length - 1) * gap + 24;
  let s = '';
  items.forEach((t, i) => {
    const x = 12 + i * (bw + gap);
    s += '<rect class="bdy" x="' + x + '" y="' + y + '" width="' + bw + '" height="34" rx="5"/>';
    s += svgTxt(x + bw / 2, y + 22, t, 'middle');
    if (i) s += svgArrow(x - gap + 3, y + 17, x - 4, y + 17, 'frc');
    if (o.energies && o.energies[i] != null)
      s += svgTxt(x + bw / 2, y + 58, o.energies[i], 'middle', true);
  });
  s += svgTxt(W / 2, 18, o.title || 'ทิศของลูกศรคือทิศที่พลังงานถ่ายทอดไป', 'middle', true);
  return svgWrap(W, H, s);
}
/** พีระมิดพลังงาน  o:{ levels:[{name, v}] เรียงจากฐานขึ้นยอด } */
function figPyramidEco(o) {
  const ls = (o.levels || []).filter(Boolean);
  if (!ls.length) return '';
  const rowH = 32, W = 380, H = 16 + ls.length * rowH + 10;
  const cx = 130, base = 210;
  let s = '';
  ls.forEach((l, i) => {
    const k = i / ls.length, k2 = (i + 1) / ls.length;
    const w1 = base * (1 - k * 0.82), w2 = base * (1 - k2 * 0.82);
    const y2 = H - 8 - i * rowH, y1 = y2 - rowH;
    s += '<polygon class="' + (i % 2 ? 'ffil' : 'fbox') + '" points="' +
      n1(cx - w2 / 2) + ',' + n1(y1) + ' ' + n1(cx + w2 / 2) + ',' + n1(y1) + ' ' +
      n1(cx + w1 / 2) + ',' + n1(y2) + ' ' + n1(cx - w1 / 2) + ',' + n1(y2) + '"/>';
    s += '<polygon class="fbox" points="' +
      n1(cx - w2 / 2) + ',' + n1(y1) + ' ' + n1(cx + w2 / 2) + ',' + n1(y1) + ' ' +
      n1(cx + w1 / 2) + ',' + n1(y2) + ' ' + n1(cx - w1 / 2) + ',' + n1(y2) + '"/>';
    s += svgTxt(cx, (y1 + y2) / 2 + 5, l.name, 'middle');
    if (l.v != null) s += svgTxt(cx + base / 2 + 10, (y1 + y2) / 2 + 5, l.v, 'start', true);
  });
  return svgWrap(W, H, s);
}
/** ดวงอาทิตย์-โลก-ดวงจันทร์ หรือวงโคจร  o:{ moonDeg, label } */
function figOrbit(o) {
  const W = 340, H = 190, cx = 168, cy = 94, r = 66;
  const deg = o.moonDeg == null ? 90 : o.moonDeg, rad = deg * Math.PI / 180;
  let s = '<circle class="fgrd" cx="' + cx + '" cy="' + cy + '" r="' + r + '" style="stroke-dasharray:4 3"/>';
  // แสงจากดวงอาทิตย์มาจากทางซ้ายเสมอ
  for (let i = 0; i < 3; i++) s += svgArrow(10, cy - 34 + i * 34, 58, cy - 34 + i * 34, 'ln2');
  s += svgTxt(8, cy - 46, 'แสงจากดวงอาทิตย์', 'start', true);
  s += '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="20"/>';
  s += svgTxt(cx, cy + 5, 'โลก', 'middle');
  const mx = cx + r * Math.cos(rad), my = cy - r * Math.sin(rad);
  s += '<circle class="fbar" cx="' + n1(mx) + '" cy="' + n1(my) + '" r="11"/>';
  s += svgTxt(mx, my - 17, o.label || 'ดวงจันทร์', 'middle');
  return svgWrap(W, H, s);
}
/** คานและจุดหมุน — ใช้กับโมเมนต์และคานผ่อนแรง
    o:{ supports:[{x:0-1, type:'pivot'}], loads:[{x, label, up}], marks:[{x0,x1,label}] } */
function figBeam(o) {
  const W = 400, H = 150, x0 = 40, x1 = 360, y = 78;
  const px = f => x0 + (x1 - x0) * f;
  let s = '<rect class="bdy" x="' + n1(x0) + '" y="' + n1(y - 7) + '" width="' + n1(x1 - x0) + '" height="14" rx="2"/>';
  (o.supports || []).forEach(sp => {
    const x = px(sp.x);
    s += '<polygon class="bdy" points="' + n1(x) + ',' + n1(y + 7) + ' ' + n1(x - 13) + ',' + n1(y + 30) +
      ' ' + n1(x + 13) + ',' + n1(y + 30) + '"/>';
    s += svgHatch(x - 20, y + 30, x + 20, y + 30, 6, 6);
    if (sp.label) s += svgTxt(x, y + 46, sp.label, 'middle', true);
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
/** แรงหลายแรงกระทำที่จุดเดียว  o:{ forces:[{deg, label, len}], body:'box' }
    มุมวัดทวนเข็มจากแกน +x */
function figForcesPoint(o) {
  const W = 320, H = 218, cx = 160, cy = 108;
  let s = '';
  (o.forces || []).forEach(f => {
    const r = (f.len || 58), a = -f.deg * Math.PI / 180;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    s += svgArrow(cx, cy, x, y, 'frc', f.label,
      (f.lx == null ? Math.cos(a) * 20 : f.lx),
      (f.ly == null ? Math.sin(a) * 20 + 5 : f.ly));
  });
  if (o.body === 'box') s += '<rect class="bdy" x="' + (cx - 16) + '" y="' + (cy - 16) + '" width="32" height="32" rx="3"/>';
  else s += '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="8"/>';
  if (o.ground) s += '<line class="ln" x1="18" y1="' + (cy + 34) + '" x2="302" y2="' + (cy + 34) + '"/>' +
    svgHatch(20, cy + 34, 300, cy + 34, 20, 7);
  return svgWrap(W, H, s);
}
/** กล่องถูกลากบนพื้นราบ พร้อมแรงและระยะทาง — ใช้กับโจทย์งานและกำลัง
    o:{ F:'F = 40 N', s:'ระยะ 5 m', label:'กล่อง' } */
function figWorkPull(o) {
  const W = 360, H = 148, y = 84, bw = 56, bh = 40, bx = 66;
  let s = '<line class="ln" x1="16" y1="' + (y + bh) + '" x2="344" y2="' + (y + bh) + '"/>';
  s += svgHatch(18, y + bh, 342, y + bh, 22, 7);
  s += '<rect class="bdy" x="' + bx + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="3"/>';
  if (o.label) s += svgTxt(bx + bw / 2, y + bh / 2 + 5, o.label, 'middle');
  s += svgArrow(bx + bw, y + bh / 2, bx + bw + 74, y + bh / 2, 'frc', o.F, 0, -12);
  if (o.s) {
    s += '<line class="dash" x1="' + bx + '" y1="' + (y + bh + 8) + '" x2="' + bx + '" y2="' + (y + bh + 30) + '"/>';
    s += '<line class="dash" x1="308" y1="' + (y + bh + 8) + '" x2="308" y2="' + (y + bh + 30) + '"/>';
    s += svgArrow(bx, y + bh + 24, 308, y + bh + 24, 'ln2');
    s += svgTxt((bx + 308) / 2, y + bh + 44, o.s, 'middle');
  }
  return svgWrap(W, H, s);
}
/** สเกลอย่างง่ายสำหรับโจทย์ pH  o:{ v, label } */
function figPH(o) {
  const W = 380, H = 108, x0 = 26, xw = 328, y = 46, bh = 26;
  let s = '';
  for (let i = 0; i < 14; i++) {
    const x = x0 + xw * i / 14;
    s += '<rect class="' + (i < 7 ? 'fbar' : i === 7 ? 'fbox' : 'ffil') + '" x="' + n1(x) + '" y="' + y +
      '" width="' + n1(xw / 14) + '" height="' + bh + '"/>';
    s += '<rect class="fbox" x="' + n1(x) + '" y="' + y + '" width="' + n1(xw / 14) + '" height="' + bh + '"/>';
    s += svgTxt(x + xw / 28, y + bh + 16, String(i), 'middle', true);
  }
  s += svgTxt(x0, y - 8, 'กรด', 'start', true);
  s += svgTxt(x0 + xw / 2, y - 8, 'กลาง', 'middle', true);
  s += svgTxt(x0 + xw, y - 8, 'เบส', 'end', true);
  if (o && o.v != null) {
    const x = x0 + xw * (Number(o.v) + 0.5) / 14;
    s += svgArrow(x, y - 24, x, y - 3, 'frc');
    s += svgTxt(x, y - 28, o.label || ('pH ' + fmtq(o.v)), 'middle');
  }
  return svgWrap(W, H, s);
}
/* --- 3.6 วาดวิธีทำ 7 ขั้น ------------------------------------------------- */
const STEP_TITLES = ['วิเคราะห์โจทย์', 'สิ่งที่โจทย์กำหนด', 'หลักการและสูตรที่ใช้',
                     'ตั้งสมการและจัดรูป', 'แทนค่า / ดำเนินการ', 'คำนวณ', 'สรุปคำตอบและตรวจสอบ'];

