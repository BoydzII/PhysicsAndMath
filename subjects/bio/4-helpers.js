/* ============================================================================
   ตัวช่วยเฉพาะวิชา — subjects/bio/4-helpers.js
   ตัววาดรูปประกอบโจทย์ (fig*) คลังคำที่แม่แบบใช้สุ่ม และชื่อขั้นของวิธีทำ 7 ขั้น (STEP_TITLES)
   เอนจินสุ่มโจทย์อยู่ใน core/30-engine.js ใช้ร่วมกันทุกวิชา
   ========================================================================== */
/* คำและสิ่งของสำหรับแต่งโจทย์ปัญหา — เปลี่ยนทุกครั้งที่สุ่ม โจทย์จึงไม่ซ้ำซาก */
const GOODS  = ['สมุด', 'ปากกา', 'ดินสอ', 'ไม้บรรทัด', 'ยางลบ', 'แฟ้ม'];
const FRUITS = ['ส้ม', 'มะม่วง', 'กล้วย', 'เงาะ', 'ลำไย', 'ฝรั่ง'];
const SHOPS  = ['ร้านสหกรณ์โรงเรียน', 'ร้านเครื่องเขียน', 'ตลาดนัด', 'ร้านค้าชุมชน'];
const PLACES = ['ห้องสมุด', 'สนามกีฬา', 'โรงอาหาร', 'หอประชุม', 'อาคารเรียน'];
const SUBJ   = ['เคมี', 'ชีววิทยา', 'ฟิสิกส์', 'คณิตศาสตร์', 'วิทยาศาสตร์'];
/* --- 3.3ข รูปประกอบโจทย์ชีววิทยา ------------------------------------------------
   ทุกฟังก์ชันคืนสตริง SVG ที่ยืดตามความกว้างของกล่องที่ใส่ลงไป
   ใช้สีจากตัวแปรธีม จึงอ่านออกทั้งโหมดสว่างและโหมดมืด

   *** ข้อควรระวังที่เคยทำให้รูปเพี้ยนมาแล้ว ***
   ชื่อคลาสใน SVG ต้องขึ้นต้นด้วย f หรือใช้ชื่อที่มีอยู่แล้ว (ln ln2 frc dash bdy
   fpt fgrd fbar ffil arh arh2 mut) ห้ามตั้งชื่ออย่าง .bar .box .fill เพราะเบราว์เซอร์
   ถือว่า width/height ของ SVG เป็นสมบัติ CSS ด้วย ถ้าไปชนกับคลาสของหน้าเว็บ
   รูปจะถูกบีบจนผิดรูปโดยไม่มี error ให้เห็น
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
/** แผนภูมิแท่ง  o:{ labels:[], values:[], step, unit } */
function figBar(o) {
  const vals = o.values || [], n = vals.length;
  if (!n) return '';
  const W = 360, H = 224, padR = 12, padT = 30, padB = 38;
  const maxV = Math.max.apply(null, vals);
  const step = o.step || Math.max(1, Math.ceil(maxV / 5));
  const top = Math.max(step, Math.ceil(maxV / step) * step);
  // ขอบซ้ายต้องกว้างพอสำหรับตัวเลขบนสเกลและชื่อหน่วย ไม่งั้นข้อความจะล้นออกนอกกรอบ
  // โจทย์เคมีเดิมใช้ค่าหลักหมื่น (kJ/mol) ขอบคงที่ 42 จึงไม่พอ
  const padL = Math.max(42, txtW(String(top)) + 12, txtW(o.unit || '') + 10);
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
  if (o.unit) s += svgTxt(padL - 6, padT - 14, esc(o.unit), 'end', true);
  return svgWrap(W, H, s);
}
/** อุปกรณ์วัดปริมาตรพร้อมสเกล ใช้กับเรื่องเลขนัยสำคัญและการอ่านค่า
    o:{ cap:ความจุ, minor:ค่าต่อขีดเล็ก, read:ระดับของเหลว, unit, name } */
function figLabGlass(o) {
  const W = 260, H = 300;
  const cap = o.cap, minor = o.minor, read = o.read;
  const x0 = 92, wBody = 76, yTop = 46, yBot = 250;
  const Y = v => yBot - (yBot - yTop) * v / cap;
  let s = '';
  // ตัวกระบอกตวง — วาดเป็นสี่เหลี่ยมเปิดด้านบน มีฐานกว้างกันล้ม
  s += '<line class="ln" x1="' + x0 + '" y1="' + yTop + '" x2="' + x0 + '" y2="' + yBot + '"/>';
  s += '<line class="ln" x1="' + (x0 + wBody) + '" y1="' + yTop + '" x2="' + (x0 + wBody) + '" y2="' + yBot + '"/>';
  s += '<line class="ln" x1="' + x0 + '" y1="' + yBot + '" x2="' + (x0 + wBody) + '" y2="' + yBot + '"/>';
  s += '<line class="ln" x1="' + (x0 - 14) + '" y1="' + (yBot + 16) + '" x2="' + (x0 + wBody + 14) +
    '" y2="' + (yBot + 16) + '"/>';
  s += '<line class="ln2" x1="' + (x0 + 8) + '" y1="' + yBot + '" x2="' + (x0 - 14) + '" y2="' + (yBot + 16) + '"/>';
  s += '<line class="ln2" x1="' + (x0 + wBody - 8) + '" y1="' + yBot + '" x2="' + (x0 + wBody + 14) +
    '" y2="' + (yBot + 16) + '"/>';
  // ของเหลวในกระบอก
  s += '<rect class="ffil" x="' + (x0 + 1) + '" y="' + n1(Y(read)) + '" width="' + (wBody - 2) +
    '" height="' + n1(yBot - Y(read)) + '"/>';
  // ผิวของเหลวโค้งเว้า — จุดที่ต้องอ่านค่าคือ "ก้นโค้ง"
  s += '<path class="frc" d="M' + (x0 + 1) + ' ' + n1(Y(read) - 5) + ' Q ' + (x0 + wBody / 2) + ' ' +
    n1(Y(read) + 7) + ' ' + (x0 + wBody - 1) + ' ' + n1(Y(read) - 5) + '"/>';
  // ขีดสเกล — ขีดใหญ่ทุก 5 ขีดเล็ก พร้อมตัวเลขกำกับ
  const nTick = Math.round(cap / minor);
  for (let i = 0; i <= nTick; i++) {
    const v = i * minor, big = i % 5 === 0;
    s += '<line class="' + (big ? 'ln' : 'ln2') + '" x1="' + x0 + '" y1="' + n1(Y(v)) +
      '" x2="' + (x0 + (big ? 18 : 10)) + '" y2="' + n1(Y(v)) + '"/>';
    if (big) s += svgTxt(x0 - 7, Y(v) + 5, fmt(v), 'end', true);
  }
  s += svgTxt(x0 + wBody / 2, 26, esc(o.name || 'กระบอกตวง'), 'middle');
  s += svgTxt(x0 + wBody + 20, Y(read) + 5, 'อ่านตรงนี้', 'start');
  s += svgTxt(x0 + wBody / 2, yBot + 38, 'ขีดเล็กละ ' + fmt(minor) + ' ' + esc(o.unit || 'mL'), 'middle', true);
  return svgWrap(W, H, s);
}
/** แบบจำลองอะตอมแบบวงโคจร  o:{ sym, p, n, shells:[2,8,1] } */
function figAtomShell(o) {
  const sh = o.shells || [];
  const W = 340, H = 300, cx = 150, cy = 150;
  const rMax = 118, rNuc = 26;
  let s = '';
  // วงอิเล็กตรอนวาดจากวงนอกเข้ามา จะได้ไม่ทับนิวเคลียส
  sh.forEach(function (cnt, i) {
    const r = rNuc + 16 + (rMax - rNuc - 16) * (i + 1) / sh.length;
    s += '<circle class="dash" cx="' + cx + '" cy="' + cy + '" r="' + n1(r) + '" fill="none"/>';
    for (let k = 0; k < cnt; k++) {
      const th = -Math.PI / 2 + 2 * Math.PI * k / cnt;
      s += '<circle class="fpt" cx="' + n1(cx + r * Math.cos(th)) + '" cy="' + n1(cy + r * Math.sin(th)) + '" r="4.6"/>';
    }
    // จำนวนอิเล็กตรอนของวงนั้น เขียนไว้ทางขวาของวง ไม่ทับตัวอิเล็กตรอนที่วางเริ่มจากด้านบน
    s += svgTxt(cx + r + 8, cy + 5, String(cnt), 'start');
  });
  s += '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="' + rNuc + '"/>';
  s += svgTxt(cx, cy + 6, esc(o.sym || ''), 'middle');
  // จำนวนอนุภาคในนิวเคลียสเขียนไว้ใต้รูป ไม่ยัดลงในวงกลมซึ่งแคบเกินไปจนตัวอักษรทับกัน
  const nuc = [];
  if (o.p != null) nuc.push('โปรตอน ' + o.p);
  if (o.n != null) nuc.push('นิวตรอน ' + o.n);
  if (nuc.length) s += svgTxt(cx, H - 12, nuc.join(' · '), 'middle', true);
  s += svgTxt(W - 10, 24, 'การจัดเรียงอิเล็กตรอน', 'end', true);
  s += svgTxt(W - 10, 42, sh.join(' , '), 'end');
  return svgWrap(W, H, s);
}
/** ตารางธาตุย่อ 20 ธาตุแรก  o:{ mark:['Na','Cl'], trend:'ขนาดอะตอมเพิ่ม' , arrow:'right'|'down' } */
const PT20 = [
  ['H', 1, 1], ['He', 18, 1],
  ['Li', 1, 2], ['Be', 2, 2], ['B', 13, 2], ['C', 14, 2], ['N', 15, 2], ['O', 16, 2], ['F', 17, 2], ['Ne', 18, 2],
  ['Na', 1, 3], ['Mg', 2, 3], ['Al', 13, 3], ['Si', 14, 3], ['P', 15, 3], ['S', 16, 3], ['Cl', 17, 3], ['Ar', 18, 3],
  ['K', 1, 4], ['Ca', 2, 4]
];
function figPeriodicMini(o) {
  const cw = 21, chh = 22, x0 = 16, y0 = 46;
  // ลูกศรแนวตั้งต้องมีที่ว่างทางขวาสำหรับป้าย ไม่งั้นตัวหนังสือจะพาดทับตารางธาตุ
  const down = o.arrow === 'down' && o.trend;
  const W = x0 * 2 + cw * 18 + (down ? txtW(o.trend) + 44 : 0), H = y0 + chh * 4 + 34;
  const mark = o.mark || [];
  let s = '';
  // หัวหมู่และหมายเลขคาบ ช่วยให้อ่านตำแหน่งธาตุได้โดยไม่ต้องนับช่อง
  [1, 2, 13, 14, 15, 16, 17, 18].forEach(function (g) {
    s += svgTxt(x0 + (g - 1) * cw + cw / 2, y0 - 6, String(g), 'middle', true);
  });
  for (let p = 1; p <= 4; p++) s += svgTxt(x0 - 6, y0 + (p - 1) * chh + chh / 2 + 4, String(p), 'end', true);
  PT20.forEach(function (e) {
    const x = x0 + (e[1] - 1) * cw, y = y0 + (e[2] - 1) * chh;
    const on = mark.indexOf(e[0]) >= 0;
    s += '<rect class="' + (on ? 'ffil' : 'bdy') + '" x="' + x + '" y="' + y + '" width="' + (cw - 2) +
      '" height="' + (chh - 2) + '"/>';
    if (on) s += '<rect class="frc" fill="none" x="' + x + '" y="' + y + '" width="' + (cw - 2) +
      '" height="' + (chh - 2) + '"/>';
    s += svgTxt(x + (cw - 2) / 2, y + chh / 2 + 4, e[0], 'middle');
  });
  s += svgTxt(x0 + cw * 9, 20, 'ตารางธาตุ 20 ธาตุแรก', 'middle', true);
  // ลูกศรบอกทิศของแนวโน้มที่โจทย์พูดถึง
  if (o.trend) {
    const yA = y0 + chh * 4 + 20;
    if (down) {
      const xa = x0 + cw * 18 + 18;
      s += svgArrow(xa, y0 - 2, xa, y0 + chh * 4 - 4, 'frc');
      s += svgTxt(xa + 10, y0 + chh * 2, esc(o.trend), 'start');
    } else {
      s += svgArrow(x0 + 4, yA, x0 + cw * 18 - 8, yA, 'frc');
      s += svgTxt(x0 + cw * 9, yA - 8, esc(o.trend), 'middle');
    }
  }
  return svgWrap(W, H, s);
}
/** โครงสร้างลิวอิสอย่างง่าย — อะตอมกลางหนึ่งตัว ล้อมด้วยอะตอมรอบ ๆ ไม่เกิน 4 ตัว
    o:{ center, lone:จำนวนคู่โดดเดี่ยวของอะตอมกลาง,
        around:[{ sym, order:1|2|3, lone }] , dirs:['up','down','left','right'] } */
function figLewis(o) {
  const W = 320, H = 260, cx = 160, cy = 130, R = 62;
  const dirMap = { right: [1, 0], left: [-1, 0], up: [0, -1], down: [0, 1] };
  const around = o.around || [];
  const dirs = o.dirs || ['right', 'left', 'up', 'down'];
  let s = '';
  around.forEach(function (a, i) {
    const d = dirMap[dirs[i % dirs.length]] || [1, 0];
    const bx = cx + d[0] * R, by = cy + d[1] * R;
    // พันธะเดี่ยว-คู่-สาม วาดเป็นเส้นขนาน 1-3 เส้น เยื้องกันตามแนวตั้งฉาก
    const px = -d[1], py = d[0];
    const k = a.order || 1;
    for (let j = 0; j < k; j++) {
      const off = (j - (k - 1) / 2) * 6;
      s += '<line class="ln" x1="' + n1(cx + d[0] * 20 + px * off) + '" y1="' + n1(cy + d[1] * 20 + py * off) +
        '" x2="' + n1(bx - d[0] * 18 + px * off) + '" y2="' + n1(by - d[1] * 18 + py * off) + '"/>';
    }
    s += svgTxt(bx, by + 6, esc(a.sym), 'middle');
    // คู่โดดเดี่ยวของอะตอมรอบ วางออกไปด้านนอกของอะตอมนั้น
    for (let j = 0; j < (a.lone || 0); j++) {
      const ang = Math.atan2(d[1], d[0]) + (j - ((a.lone || 1) - 1) / 2) * 0.7;
      const ex = bx + 20 * Math.cos(ang), ey = by + 20 * Math.sin(ang);
      s += '<circle class="fpt" cx="' + n1(ex - 3) + '" cy="' + n1(ey) + '" r="2.6"/>';
      s += '<circle class="fpt" cx="' + n1(ex + 3) + '" cy="' + n1(ey) + '" r="2.6"/>';
    }
  });
  s += svgTxt(cx, cy + 6, esc(o.center || ''), 'middle');
  for (let j = 0; j < (o.lone || 0); j++) {
    const ang = -Math.PI / 2 + (j - ((o.lone || 1) - 1) / 2) * 0.8;
    const ex = cx + 26 * Math.cos(ang), ey = cy + 26 * Math.sin(ang);
    s += '<circle class="fpt" cx="' + n1(ex - 3) + '" cy="' + n1(ey) + '" r="2.6"/>';
    s += '<circle class="fpt" cx="' + n1(ex + 3) + '" cy="' + n1(ey) + '" r="2.6"/>';
  }
  if (o.caption) s += svgTxt(W / 2, H - 14, esc(o.caption), 'middle', true);
  return svgWrap(W, H, s);
}
/** รูปร่างโมเลกุลตามทฤษฎี VSEPR
    o:{ shape:'linear'|'bent'|'trigonal'|'pyramid'|'tetra', center, outer, deg, caption } */
const VSEPR_DIR = {
  linear:   [180, 0],
  bent:     [155, 25],
  trigonal: [210, 330, 90],
  pyramid:  [200, 340, 90],
  tetra:    [200, 340, 75, 105]
};
function figShape(o) {
  const W = 320, H = 250, cx = 160, cy = 132, R = 66;
  const angs = VSEPR_DIR[o.shape] || VSEPR_DIR.linear;
  let s = '';
  angs.forEach(function (a) {
    const th = a * Math.PI / 180;
    const bx = cx + R * Math.cos(th), by = cy - R * Math.sin(th);
    s += '<line class="ln" x1="' + n1(cx + 18 * Math.cos(th)) + '" y1="' + n1(cy - 18 * Math.sin(th)) +
      '" x2="' + n1(bx - 16 * Math.cos(th)) + '" y2="' + n1(by + 16 * Math.sin(th)) + '"/>';
    s += '<circle class="bdy" cx="' + n1(bx) + '" cy="' + n1(by) + '" r="16"/>';
    s += svgTxt(bx, by + 5, esc(o.outer || ''), 'middle');
  });
  // คู่โดดเดี่ยวบนอะตอมกลาง วาดเป็นก้อนเมฆด้านบน ทำให้เห็นว่าทำไมมุมถึงหุบ
  if (o.lone) {
    for (let j = 0; j < o.lone; j++) {
      const ex = cx + (j - (o.lone - 1) / 2) * 14, ey = cy - 34;
      s += '<circle class="fpt" cx="' + n1(ex - 4) + '" cy="' + ey + '" r="3"/>';
      s += '<circle class="fpt" cx="' + n1(ex + 4) + '" cy="' + ey + '" r="3"/>';
    }
  }
  s += '<circle class="bdy" cx="' + cx + '" cy="' + cy + '" r="20"/>';
  s += svgTxt(cx, cy + 6, esc(o.center || ''), 'middle');
  if (o.deg != null) {
    // ส่วนโค้งของมุมพันธะ วาดระหว่างสองแขนแรก
    const a1 = angs[0] * Math.PI / 180, a2 = angs[1] * Math.PI / 180;
    const r = 34;
    s += '<path class="frc" fill="none" d="M' + n1(cx + r * Math.cos(a1)) + ' ' + n1(cy - r * Math.sin(a1)) +
      ' A ' + r + ' ' + r + ' 0 0 1 ' + n1(cx + r * Math.cos(a2)) + ' ' + n1(cy - r * Math.sin(a2)) + '"/>';
    const mid = (a1 + a2) / 2;
    s += svgTxt(cx + (r + 16) * Math.cos(mid), cy - (r + 16) * Math.sin(mid) + 5, fmt(o.deg) + '°', 'middle');
  }
  if (o.caption) s += svgTxt(W / 2, H - 14, esc(o.caption), 'middle', true);
  return svgWrap(W, H, s);
}
/** การถ่ายโอนอิเล็กตรอนของพันธะไอออนิก
    o:{ a:{sym, shells}, b:{sym, shells}, moved, ionA, ionB } */
function figIonic(o) {
  const W = 400, H = 230;
  const box = function (x, sym, shells, ion) {
    const cy = 108, rN = 18;
    let g = '';
    (shells || []).forEach(function (cnt, i) {
      const r = rN + 12 + i * 17;
      g += '<circle class="dash" cx="' + x + '" cy="' + cy + '" r="' + r + '" fill="none"/>';
      for (let k = 0; k < cnt; k++) {
        const th = -Math.PI / 2 + 2 * Math.PI * k / cnt;
        g += '<circle class="fpt" cx="' + n1(x + r * Math.cos(th)) + '" cy="' + n1(cy + r * Math.sin(th)) + '" r="3.4"/>';
      }
    });
    g += '<circle class="bdy" cx="' + x + '" cy="' + cy + '" r="' + rN + '"/>';
    g += svgTxt(x, cy + 6, esc(sym), 'middle');
    g += svgTxt(x, 34, esc(ion || sym), 'middle');
    return g;
  };
  let s = box(84, o.a.sym, o.a.shells, o.ionA) + box(316, o.b.sym, o.b.shells, o.ionB);
  s += svgArrow(146, 108, 254, 108, 'frc');
  s += svgTxt(200, 92, 'ให้ ' + fmt(o.moved) + ' e', 'middle');
  s += svgTxt(200, H - 16, esc(o.caption || 'โลหะให้อิเล็กตรอน อโลหะรับอิเล็กตรอน'), 'middle', true);
  return svgWrap(W, H, s);
}
/* --- 3.6 วาดวิธีทำ 7 ขั้น ------------------------------------------------- */
const STEP_TITLES = ['วิเคราะห์โจทย์', 'สิ่งที่โจทย์กำหนด', 'หลักการและสูตรที่ใช้',
                     'ตั้งสมการและจัดรูป', 'แทนค่า / ดำเนินการ', 'คำนวณ', 'สรุปคำตอบและตรวจสอบ'];

