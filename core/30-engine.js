/* ============================================================================
   3) ENGINE — เครื่องยนต์สุ่มโจทย์
   ========================================================================== */

/* --- 3.1 ตัวสุ่มที่ควบคุมได้ (seed เดิม → โจทย์เดิมเป๊ะ) ------------------ */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function rng(seed) {
  const f = mulberry32(seed >>> 0);
  const R = {
    f: f,
    int: (a, b) => a + Math.floor(f() * (b - a + 1)),
    /** สุ่มจำนวนเต็มที่หารด้วย step ลงตัว */
    step: (a, b, st) => a + st * Math.floor(f() * (Math.floor((b - a) / st) + 1)),
    pick: arr => arr[Math.floor(f() * arr.length)],
    /** สุ่มหยิบ n ตัวไม่ซ้ำ */
    some: (arr, n) => R.shuffle(arr.slice()).slice(0, n),
    shuffle: arr => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(f() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
      return a;
    },
    sign: () => (f() < 0.5 ? -1 : 1)
  };
  return R;
}
/* ชื่อและวัตถุสำหรับแต่งโจทย์ให้ไม่ซ้ำซาก */
const NAMES  = ['สมชาย', 'มานี', 'ปิติ', 'ชูใจ', 'วีระ', 'อารีย์', 'ธนา', 'กมล', 'สุดา', 'ไพศาล'];
/* --- 3.2 การจัดรูปสมการ ---------------------------------------------------
   เขียนสมการเป็นข้อความธรรมดา แล้วให้ M() จัดรูปให้:
     ตัวแปรภาษาอังกฤษ → ตัวเอียง   ตัวเลข/ภาษาไทย/หน่วยใน `...` → ตัวตรง
     _1 หรือ _{max} → ตัวห้อย       ^2 หรือ ^{-2} → ตัวยก
   -------------------------------------------------------------------------- */
function M(s) {
  const str = String(s);
  /* วิชาที่ตั้ง SUBJECT_INFO.katex (ตอนนี้คือ IJSO ซึ่งโหลด KaTeX ไว้) เขียนสมการแบบ LaTeX ได้
     ข้อความที่มี \\ หรือ _{ ^{ และไม่มีภาษาไทย ส่งให้ KaTeX เรนเดอร์แทน mInner */
  if (SUBJECT_INFO.katex && (str.includes('\\') || str.includes('_{') || str.includes('^{')) && !/[\u0E00-\u0E7F]/.test(str)) {
    return '<span class="eq">$' + str + '$</span>';
  }
  return '<span class="eq">' + mInner(str) + '</span>';
}
/** แปลงข้อความสมการหนึ่งชิ้น (ยังไม่ห่อ .eq) — เรียกซ้อนตัวเองได้ จึงใส่เศษส่วนในรากได้
    เขียนได้ว่า  frac(3,4)  ·  sqrt(2)  ·  sqrt3(27) รากที่สาม  ·  pi  ·  vec(F) เวกเตอร์
    วิธีทำงาน: แปลงเศษส่วน/รากบนข้อความ "ดิบ" ก่อน แล้วพักผลลัพธ์ HTML ไว้ในกล่อง
    โดยทิ้งโทเคนตัวอักษรพิเศษไว้แทน จากนั้นค่อย esc() และจัดรูปตัวห้อย-ตัวยกตามเดิม
    แล้วเอา HTML ในกล่องแทนกลับตอนท้าย — HTML ที่สร้างไว้จึงไม่ถูก esc() ทำลาย */
function mInner(raw, box) {
  const top = !box;
  box = box || [];
  const stash = html => '\u0001' + String.fromCharCode(0xE000 + (box.push(html) - 1)) + '\u0002';
  // อนุญาตแท็กเน้นข้อความไม่กี่ตัว โดยซ่อนไว้ก่อน esc() แล้วคืนกลับตอนท้าย
  // ทำให้เขียน M('เส้นขนาน ⇒ <b>มุมแย้งเท่ากัน</b>') ได้ โดยแท็กไม่หลุดออกมาเป็นตัวหนังสือ
  /* แท็กที่ยอมให้ผ่าน — ปิดตายเท่านี้ ไม่รับแอตทริบิวต์ใด ๆ
     u ขีดเส้นใต้ · red blue green orange สีตัวอักษร · hl เน้นพื้น
     ครูกดจากปุ่มในหน้าสร้างโจทย์ ไม่ต้องพิมพ์เอง */
  let t = String(raw).replace(/<\/?(?:b|i|em|strong|br|u|red|blue|green|orange|hl)\s*\/?>/gi, m => stash(m))
                     .replace(/\bpi\b/g, 'π');
  // แปลงรากและเศษส่วนสลับกันไปเรื่อย ๆ จนไม่มีอะไรเปลี่ยน
  // ทั้งสองแบบรับเฉพาะเนื้อในที่ไม่มีวงเล็บซ้อน การวนแบบนี้จึงแปลงชั้นในสุดก่อนเสมอ
  // ทำให้เขียนซ้อนกันได้ เช่น frac(-b ± sqrt(b^2 - 4ac),2a)
  for (let k = 0; k < 26; k++) {
    const before = t;
    // รากที่ n เช่น sqrt3(27) และรากที่สอง sqrt(2)
    t = t.replace(/sqrt(\d*)\(([^()]*)\)/g, (m, n, a) =>
      stash('<span class="sqrt">' + (n ? '<span class="si">' + n + '</span>' : '') +
            '<span class="sg">√</span><span class="sr">' + mInner(a, box) + '</span></span>'));
    // เศษส่วน frac(เศษ,ส่วน)
    t = t.replace(/frac\(([^(),]*),([^(),]*)\)/g, (m, a, b) =>
      stash('<span class="frac"><span class="fn">' + mInner(a, box) + '</span>' +
            '<span class="fd">' + mInner(b, box) + '</span></span>'));
    /* สัญลักษณ์นิวเคลียร์ nuc(เลขมวล,เลขอะตอม,ธาตุ) เช่น nuc(235,92,U)
       เลขมวลอยู่บน เลขอะตอมอยู่ล่าง ทั้งคู่ชิดขวาและอยู่หน้าสัญลักษณ์ธาตุ ตามหลักสากล
       ตัวยกกับตัวห้อยปกติอยู่หลังตัวอักษร จึงเขียนแบบนี้ไม่ได้ ต้องเป็นโครงซ้อนเหมือนเศษส่วน */
    t = t.replace(/nuc\(([^(),]*),([^(),]*),([^(),]*)\)/g, (m, a, z, el) =>
      stash('<span class="nuc"><span class="nnum"><span class="na">' + esc(a.trim()) +
            '</span><span class="nz">' + esc(z.trim()) + '</span></span>' +
            '<span class="nel">' + mInner(el, box) + '</span></span>'));
    /* เวกเตอร์ vec(F) — ลูกศรเหนือตัวแปร ยาวตามเนื้อใน จึงเขียน vec(AB) หรือ vec(F_net) ได้
       ไม่บังคับให้มีช่องว่างหน้า vec ครูเลือก a ใน "ma" แล้วกดปุ่มจะได้ "mvec(a)" ซึ่งต้องใช้ได้ */
    t = t.replace(/vec\(([^()]*)\)/g, (m, a) => stash(mVec(mInner(a, box))));
    /* regex ข้างบนรับเฉพาะเนื้อในที่ไม่มีวงเล็บ พอหมดทางแล้วให้ตัวอ่านแบบนับวงเล็บ
       ลองต่ออีกชั้น จึงเขียน frac((m_1 - m_2) g, m_1 + m_2) ได้จริง */
    if (t === before) {
      const deep = mDeep(t, box, stash);
      if (deep === t) break;
      t = deep;
    }
  }
  let h = esc(t);
  h = h.replace(/\^\{([^}]*)\}/g, (m, a) => '<sup>' + a + '</sup>')
       .replace(/\^(-?[\w°]+)/g, (m, a) => '<sup>' + a + '</sup>');
  /* ตัวห้อยยาวกว่าหนึ่งตัวอักษรก็ได้ เช่น v_x  F_net  a_max
     ของเดิมรับตัวเดียว F_net จึงกลายเป็น F ห้อย n แล้วตามด้วย et ลอย ๆ
     แต่คณิต วิทย์ ชีวะ และปรับพื้นฐาน เขียน H_2O  R_1R_2 โดยหมายถึงห้อยตัวเดียว
     วิชาพวกนั้นตั้ง SUBJECT_INFO.longSub = false (ห้อยยาวต้องเขียน _{...} เอง) */
  h = h.replace(/_\{([^}]*)\}/g, (m, a) => '<sub>' + a + '</sub>')
       .replace(SUBJECT_INFO.longSub === false ? /_(-?\w)/g : /_(-?\w+)/g, (m, a) => '<sub>' + a + '</sub>');
  h = h.replace(/`([^`]*)`/g, (m, a) => '<span class="u">' + a + '</span>');
  // ข้อความไทยเป็นตัวตรง — รวมคำย่อที่มีจุดคั่นอย่าง ห.ร.ม. และ ค.ร.น. ไว้เป็นก้อนเดียว
  h = h.replace(/([฀-๿]+(?:\.[฀-๿]+)*\.?)/g, '<span class="u">$1</span>');
  // ชื่อฟังก์ชันตรีโกณมิติเขียนด้วยตัวตรงตามหลักสากล ไม่ใช่ตัวเอียงแบบตัวแปร
  h = h.replace(/\b(sin|cos|tan|log|ln)\b/g, '<span class="u">$1</span>');
  // ให้องศาติดไปกับตัวเลข ไม่งั้นจะมีช่องว่างแปลก ๆ คั่น
  h = h.replace(/(\d[\d,]*\.?\d*°?)/g, '<span class="u">$1</span>');
  // เครื่องหมายดำเนินการเขียนตัวตรง — ฟอนต์คณิตตัวเอียงทำให้ + และ = เอียงจนดูเหมือนถูกขีดทับ
  // แยกส่วนที่เป็นแท็กออกก่อน ไม่งั้นจะไปโดน = ใน class="u" ที่ใส่ไว้ข้างบน
  h = h.split(/(<[^>]*>)/).map(function (seg, i) {
    return i % 2 ? seg : seg.replace(/(^|\s)([+\-−×÷=≠≤≥±≈⇒])(?=\s|$)/g,
      '$1<span class="u">$2</span>');
  }).join('');
  // ชั้นในคืน HTML ที่ยังมีโทเคนอยู่ ให้ชั้นนอกสุดเป็นคนแทนกลับทีเดียว
  if (!top) return h;
  for (let k = 0; k < 20 && h.indexOf('\u0001') >= 0; k++)
    h = h.replace(/\u0001([\uE000-\uF8FF])\u0002/g, (m, c) => box[c.charCodeAt(0) - 0xE000]);
  return h;
}
/** ตัวสำรองอ่าน frac / sqrt / nuc ที่มีวงเล็บซ้อนอยู่ข้างใน
    ตัวจับด้วย regex ข้างบนรับเฉพาะเนื้อในที่ไม่มีวงเล็บ สมการอย่าง
    frac((m_1 - m_2) g, m_1 + m_2) จึงหลุดออกมาเป็นคำว่า frac ให้อ่าน
    ที่ผ่านมาจึงต้องเลี่ยงไปเขียนด้วยเครื่องหมาย / ทั้งที่ควรเป็นเศษส่วนจริง
    ตัวนี้หาวงเล็บปิดที่คู่กันจริงด้วยการนับความลึก แล้วตัดช่องที่จุลภาคชั้นนอกสุด
    ถ้าจำนวนช่องไม่ตรงกับที่คำสั่งนั้นรับ ก็ปล่อยไว้เป็นข้อความเหมือนเดิม ไม่เดาแทน
    แปลงทีละคำสั่ง แล้วให้ผู้เรียกวนซ้ำ ส่วนชั้นในลึกลงไปเรียกผ่าน mInner อยู่แล้ว */
function mDeep(t, box, stash) {
  const re = /(frac|sqrt\d*|nuc|vec)\(/g;
  let m;
  while ((m = re.exec(t))) {
    const open = m.index + m[0].length - 1;
    let depth = 0, close = -1, start = open + 1;
    const args = [];
    for (let i = open; i < t.length; i++) {
      const ch = t.charAt(i);
      if (ch === '(') depth++;
      else if (ch === ')') {
        depth--;
        if (!depth) { close = i; args.push(t.slice(start, i)); break; }
      } else if (ch === ',' && depth === 1) { args.push(t.slice(start, i)); start = i + 1; }
    }
    if (close < 0) continue;                       // วงเล็บไม่ครบ ไม่ใช่คำสั่ง
    const name = m[1];
    let html = null;
    if (name === 'frac' && args.length === 2)
      html = '<span class="frac"><span class="fn">' + mInner(args[0], box) + '</span>' +
             '<span class="fd">' + mInner(args[1], box) + '</span></span>';
    else if (name.indexOf('sqrt') === 0 && args.length === 1)
      html = '<span class="sqrt">' + (name.slice(4) ? '<span class="si">' + name.slice(4) + '</span>' : '') +
             '<span class="sg">√</span><span class="sr">' + mInner(args[0], box) + '</span></span>';
    else if (name === 'nuc' && args.length === 3)
      html = '<span class="nuc"><span class="nnum"><span class="na">' + esc(args[0].trim()) +
             '</span><span class="nz">' + esc(args[1].trim()) + '</span></span>' +
             '<span class="nel">' + mInner(args[2], box) + '</span></span>';
    else if (name === 'vec' && args.length === 1)
      html = mVec(mInner(args[0], box));
    if (html == null) continue;                    // จำนวนช่องไม่ตรง ปล่อยเป็นข้อความ
    return t.slice(0, m.index) + stash(html) + t.slice(close + 1);
  }
  return t;
}
/** ครอบเนื้อในด้วยลูกศรเวกเตอร์ — ตัวลูกศรวาดด้วย CSS ดูที่ .vec */
function mVec(inner) { return '<span class="vec">' + inner + '</span>'; }
/** บรรทัดสมการแบบบล็อก */
function EQ() {
  return Array.from(arguments).filter(Boolean).map(s => '<div class="eqblk">' + M(s) + '</div>').join('');
}
/** แทนค่าลงในแม่แบบสมการ: S('v = {u} + ({a})({t})', {u:0,a:9.8,t:2.5}) */
function S(tmpl, vals, dp) {
  return String(tmpl).replace(/\{(\w+)\}/g, (m, k) => {
    if (!(k in vals)) return m;
    const v = vals[k];
    return typeof v === 'number' ? fmtq(v, dp == null ? 3 : dp) : String(v);
  });
}
/** แทนค่าแล้วคืนเป็นบรรทัดสมการเลย */
function SEQ(tmpl, vals, dp) { return EQ(S(tmpl, vals, dp)); }
/* --- 3.3 ตัวช่วยวาดรูป SVG ------------------------------------------------ */
function n1(x) { return (Math.round(x * 10) / 10).toString(); }
/** ครอบ SVG ให้ยืดตามความกว้างที่มี แต่ไม่โตเกินจนดูเทอะทะ
    เดิมตรึงไว้ที่ความกว้างพิกเซลของ viewBox ทำให้รูปเล็กเกินไปบนจอกว้าง */
/** แท่งกราฟที่มุมบนกลม ก้นแท่งชิดเส้นฐาน
    rect กับ rx จะกลมทั้งสี่มุม ก้นแท่งจึงลอยไม่ติดเส้นฐาน ต้องวาดเป็น path
    ปลายด้านที่เป็นข้อมูลกลม ปลายที่เป็นฐานตรง คือกติกาของแท่งที่อ่านง่าย */
function cBar(x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r == null ? 4 : r, w / 2, h));
  return '<path class="cbar" d="M' + n1(x) + ' ' + n1(y + h) +
    'V' + n1(y + rr) + 'q0 ' + n1(-rr) + ' ' + n1(rr) + ' ' + n1(-rr) +
    'h' + n1(w - rr * 2) + 'q' + n1(rr) + ' 0 ' + n1(rr) + ' ' + n1(rr) +
    'V' + n1(y + h) + 'Z"/>';
}
function svgWrap(w, h, inner) {
  // ขยายรูปบนหน้าจอขึ้นอีก 30% จากเดิม (1.55 → 2.0 และเพดาน 640 → 830 พิกเซล)
  // ครูแจ้งว่ารูปเดิมเล็กเกินไปจนดูรายละเอียดยาก
  const maxw = Math.min(Math.round(w * 2.0), 830);
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-width:' + maxw + 'px" ' +
    'preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img">' + inner + '</svg>';
}
/** ลูกศรแรง จาก (x1,y1) ไป (x2,y2) พร้อมป้ายกำกับ */
function svgArrow(x1, y1, x2, y2, cls, lbl, lox, loy) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 10, W = 4.6;
  const bx = x2 - Math.cos(a) * L, by = y2 - Math.sin(a) * L;
  const px = -Math.sin(a), py = Math.cos(a);
  const c = cls || 'frc', ah = (c === 'frc') ? 'arh' : 'arh2';
  let s = '<line class="' + c + '" x1="' + n1(x1) + '" y1="' + n1(y1) + '" x2="' + n1(bx) + '" y2="' + n1(by) + '"/>' +
    '<polygon class="' + ah + '" points="' + n1(x2) + ',' + n1(y2) + ' ' +
    n1(bx + px * W) + ',' + n1(by + py * W) + ' ' + n1(bx - px * W) + ',' + n1(by - py * W) + '"/>';
  if (lbl) s += '<text x="' + n1(x2 + (lox || 0)) + '" y="' + n1(y2 + (loy || 0)) + '" text-anchor="middle">' + lbl + '</text>';
  return s;
}
function svgTxt(x, y, t, anchor, mut, cls) {
  // เปิดช่องรับชื่อคลาสเพิ่ม เพื่อให้กราฟใช้ตัวหนังสือของตัวเองได้
  // ของเดิมส่งมาห้าอาร์กิวเมนต์เหมือนเดิมทุกจุด จึงไม่กระทบรูปโจทย์
  const c = [mut ? 'mut' : '', cls || ''].filter(Boolean).join(' ');
  return '<text x="' + n1(x) + '" y="' + n1(y) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') +
    (c ? ' class="' + c + '"' : '') + '>' + t + '</text>';
}
/** พื้นแบบขีดเฉียง (hatch) ใต้เส้นตรงจาก (x1,y1) ถึง (x2,y2) */
function svgHatch(x1, y1, x2, y2, n, len) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const L = len || 7; let s = '';
  const N = n || 12;
  for (let i = 0; i <= N; i++) {
    const t = i / N, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
    s += '<line class="ln2" x1="' + n1(x) + '" y1="' + n1(y) + '" x2="' + n1(x - Math.cos(a - 0.9) * L) +
      '" y2="' + n1(y - Math.sin(a - 0.9) * L) + '"/>';
  }
  return s;
}
/* --- 3.4 สร้างโจทย์จากแม่แบบ ---------------------------------------------
   ตรวจว่าตัวเลขที่สุ่มออกมา "สวย" พอจะให้นักเรียนคิดได้ ถ้าไม่สวยจะสุ่มใหม่
   -------------------------------------------------------------------------- */
const TPL = [];                 // คลังแม่แบบ เติมในส่วนถัดไป
const TPL_BY_ID = {};
function niceProblem(p) {
  if (!p || !p.finds || !p.finds.length) return false;
  for (const f of p.finds) {
    if (typeof f.value !== 'number' || !isFinite(f.value)) return false;
    // คำตอบติดรูทไม่มีทางเป็นทศนิยมสองตำแหน่ง ต้องข้ามด่านนี้ ไม่งั้นถูกตีตกทุกเมล็ด
    if (f.sur) continue;
    if (Math.abs(f.value) > 1e6 && f.kind !== 'sci') return false;
    const kind = f.kind || 'num';
    // เศษส่วน: ตัวส่วนต้องไม่ใหญ่จนนักเรียนอ่านและพิมพ์ไม่ไหว และต้องย่ออย่างต่ำมาแล้ว
    if (kind === 'frac') {
      if (!f.den || f.den < 1 || f.den > 24) return false;
      if (typeof f.num !== 'number' || !isFinite(f.num)) return false;
      const rd = reduceFrac(f.num, f.den);
      if (rd[0] !== f.num || rd[1] !== f.den) return false;
      continue;
    }
    if (kind === 'int') { if (Math.abs(f.value - Math.round(f.value)) > 1e-9) return false; continue; }
    if (kind === 'exact') continue;
    if (kind === 'sci') {
      if (!isFinite(f.man) || !isFinite(f.exp) || Math.abs(f.man) < 1 || Math.abs(f.man) >= 10) return false;
      if (dpOf(f.man, 4) > 2) return false;
      continue;
    }
    if (f.value !== 0 && Math.abs(f.value) < 0.01) return false;
    if (dpOf(f.value, 4) > 2) return false;
  }
  return true;
}
/* ── คำตอบติดรูท ───────────────────────────────────────────────────────
   แม่แบบเขียนไว้ว่า  finds: [{ ..., value: 28.2842, sur: [20, 2, 1] }]
   หมายถึงคำตอบคือ 20√2 ⁄ 1 · ช่อง value ยังต้องมีไว้ให้ที่อื่นใช้คำนวณต่อ
   นักเรียนกรอกสามช่อง แล้วตรวจจากรูปอย่างง่าย ไม่ใช่จากค่าทศนิยม        */
function surdGcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
/** ย่อ a√b ⁄ c ให้เป็นรูปอย่างง่าย แล้วคืนเป็นข้อความไว้เทียบกันตรง ๆ
    ตั้งใจให้ 10√8 กับ 20√2 ผ่านทั้งคู่ เพราะเป็นจำนวนเดียวกัน แค่ยังไม่ลดรูป
    สิ่งที่ตั้งใจกันคือการตอบเป็นทศนิยม ซึ่งไม่ใช่การตอบติดรูท
    ถ้าครูอยากบังคับให้ลดรูปด้วย ให้เทียบ a กับ b ตรง ๆ แทนการเทียบรูปย่อ */
function surdCanon(a, b, c) {
  a = Math.round(Number(a)); b = Math.round(Number(b)); c = Math.round(Number(c) || 1);
  if (!isFinite(a) || !isFinite(b) || !isFinite(c) || b < 1 || !c) return null;
  if (c < 0) { a = -a; c = -c; }
  for (let d = 2; d * d <= b; d++) { while (b % (d * d) === 0) { b = b / (d * d); a = a * d; } }
  const g = surdGcd(a, c);
  return (a / g) + '√' + b + '/' + (c / g);
}
/** อ่านค่าที่นักเรียนกรอกจากสามช่อง เก็บรวมไว้เป็นข้อความ "a|b|c" ในช่องเดิม */
function parseSurd(raw) {
  const p = String(raw == null ? '' : raw).split('|');
  const a = p[0] === '' || p[0] == null ? NaN : Number(p[0]);
  const b = p[1] === '' || p[1] == null ? NaN : Number(p[1]);
  const c = p[2] === '' || p[2] == null ? 1 : Number(p[2]);
  if (![a, b, c].every(x => isFinite(x) && Math.abs(x - Math.round(x)) < 1e-9)) return null;
  if (b < 1 || !c) return null;
  return { a: a, b: b, c: c };
}
function surdOK(raw, sur) {
  const u = parseSurd(raw);
  if (!u) return false;
  const x = surdCanon(u.a, u.b, u.c), y = surdCanon(sur[0], sur[1], sur[2] == null ? 1 : sur[2]);
  return !!x && x === y;
}
/** เขียนคำตอบติดรูทเป็นสูตรให้ M() เรนเดอร์ */
function surdExpr(sur) {
  const a = Math.round(sur[0]), b = Math.round(sur[1]), c = Math.round(sur[2] == null ? 1 : sur[2]);
  const top = (b === 1) ? String(a) : (a === 1 ? 'sqrt(' + b + ')' :
              (a === -1 ? '-sqrt(' + b + ')' : a + ' sqrt(' + b + ')'));
  return c === 1 ? top : 'frac(' + top + ',' + c + ')';
}
/** ข้อความคำตอบของช่องหนึ่ง — ติดรูทก็แสดงเป็นรูท ไม่ใช่ทศนิยมยาว ๆ */
function ansExpr(f) { return f.sur ? surdExpr(f.sur) : fmtq(f.value); }
/** สร้างโจทย์หนึ่งข้อจาก tplId + seed — ผลลัพธ์เหมือนเดิมทุกครั้งที่เรียกด้วยค่าเดิม */
function buildProblem(tplId, seed, cfg) {
  const tpl = TPL_BY_ID[tplId];
  if (!tpl) return null;
  const c = cfg || {};
  // ฟิสิกส์ใช้ g (ระดับง่ายบังคับ g = 10 ถ้าตั้งไว้) · คณิตใช้ π — ส่งให้แม่แบบทั้งคู่ แม่แบบอ่านเฉพาะค่าที่ใช้
  const g = (tpl.level === 'ง่าย' && c.easyG10) ? 10 : (c.g != null ? c.g : 9.8);
  const piMode = c.piMode || '3.14';
  const pi = piVal(piMode);
  let last = null;
  // แม่แบบที่เงื่อนไขเลขสวยรัดกุมมาก (เช่น ต้องได้รากที่สองลงตัว) อาจต้องสุ่มหลายรอบ
  // ลูปนี้ออกทันทีที่เจอชุดตัวเลขที่ใช้ได้ จำนวนรอบสูงสุดจึงไม่มีผลกับความเร็วในกรณีปกติ
  for (let k = 0; k < 400; k++) {
    const R = rng((seed >>> 0) + k * 7919);
    let p = null;
    try { p = tpl.gen(R, { g: g, pi: pi, piMode: piMode }); } catch (e) { continue; }
    if (!p) continue;
    last = p;
    // โจทย์ทฤษฎีไม่มีคำตอบเป็นตัวเลข จึงข้ามการคัดกรองเลขสวยไปได้เลย
    if (tpl.level === THEORY_LEVEL || niceProblem(p)) { return finishProblem(p, tpl, seed, g, piMode); }
  }
  // สุ่มจนครบแล้วยังไม่ได้เลขสวย — ยอมรับรอบสุดท้ายแล้วปัดเป็นทศนิยม 2 ตำแหน่ง
  if (last) { last.rough = true; return finishProblem(last, tpl, seed, g, piMode); }
  return null;
}
function finishProblem(p, tpl, seed, g, piMode) {
  p.tplId = tpl.id; p.seed = seed; p.topic = tpl.topic; p.level = tpl.level;
  p.sub = tpl.sub; p.skills = tpl.skills || []; p.g = g; p.piMode = piMode;
  if (tpl.level === THEORY_LEVEL) {
    // โจทย์ทฤษฎี: ตัวเลือกเป็นข้อความ แม่แบบสร้างมาให้ครบแล้ว ไม่มีตารางกำหนดให้/สิ่งที่ต้องหา
    p.theory = true; p.given = p.given || []; p.finds = p.finds || [];
    return p;
  }
  // ปัดเศษเฉพาะคำตอบชนิดทศนิยม — เศษส่วนและคำตอบที่ต้องตรงเป๊ะห้ามแตะ
  p.finds.forEach(f => {
    if (!f.kind || f.kind === 'num') f.value = round2(f.value);
    if (f.kind === 'sci') f.value = f.man * Math.pow(10, f.exp);
  });
  // ระดับง่ายตอบแบบปรนัย — สร้างตัวเลือกจากตัวลวงที่แม่แบบให้มา
  if (tpl.level === 'ง่าย' && p.finds.length === 1) {
    p.choices = makeChoices(p, rng(((seed >>> 0) ^ 0x5bf03635) >>> 0));
  }
  return p;
}
/** สร้างตัวเลือก 4 ตัว: คำตอบถูก + ตัวลวงจากความเข้าใจผิด (เติมด้วยตัวลวงทั่วไปถ้าไม่พอ) */
function makeChoices(p, R) {
  if ((p.finds[0].kind || 'num') === 'frac') return makeFracChoices(p, R);
  if (p.finds[0].kind === 'sci') return makeSciChoices(p, R);
  const ans = round2(p.finds[0].value);
  const pool = [];
  const push = v => {
    if (typeof v !== 'number' || !isFinite(v)) return;
    const r = round2(v);
    if (Math.abs(r - ans) < 0.005) return;                 // ซ้ำกับคำตอบถูก
    if (r < 0 && ans > 0 && p.finds[0].positive) return;   // ค่าที่เป็นไปไม่ได้ในบริบทของโจทย์
    if (pool.some(x => Math.abs(x - r) < 0.005)) return;   // ซ้ำกันเอง
    if (dpOf(r, 4) > 2) return;
    pool.push(r);
  };
  (p.distract || []).forEach(push);
  // แม่แบบที่คำตอบมีค่าได้จำกัด (เช่น จตุภาคที่ 1-4) ตั้ง exactDistract ไว้
  // จะได้ไม่มีตัวลวงอัตโนมัติที่เป็นไปไม่ได้โผล่มา เช่น "จตุภาคที่ 8"
  /* SUBJECT_INFO.legacyChoices: วิทย์กายภาพเคยใช้เอนจินที่ไม่รู้จัก exactDistract
     ชุดโจทย์ที่มอบหมายไปแล้วสร้างตัวเลือกใหม่จาก tplId + seed ทุกครั้งที่เปิด และคำตอบที่เลือกเก็บเป็นลำดับตัวเลือก
     ถ้าเปลี่ยนวิธีสร้างตัวเลือก ผลที่ส่งไปแล้วจะชี้ไปผิดตัว จึงคงแบบเดิมไว้ให้วิชานั้น */
  if (!p.exactDistract || SUBJECT_INFO.legacyChoices) {
    const gen = [ans * 2, ans / 2, ans + Math.max(1, Math.round(Math.abs(ans) * 0.2)),
                 ans - Math.max(1, Math.round(Math.abs(ans) * 0.2)), ans * 1.5, ans / 4, ans * 10];
    for (const v of gen) { if (pool.length >= 6) break; push(v); }
  }
  const picked = R.shuffle(pool).slice(0, 3);
  const all = R.shuffle(picked.concat([ans]));
  return all.map(v => ({ value: v, correct: Math.abs(v - ans) < 0.005 }));
}
/* --- 3.5 การตรวจคำตอบ ----------------------------------------------------- */
/** อ่านตัวเลขจากสิ่งที่นักเรียนพิมพ์ รองรับ 1,200 / +5 / 2.5x10^3 / 2.5e3 */
/* ทำความสะอาดคำตอบก่อนอ่านเป็นตัวเลข — นักเรียนพิมพ์มาหลายแบบ ไม่ควรเสียคะแนนเพราะรูปแบบการพิมพ์
   · เลขไทย ๐–๙ → 0–9 · เครื่องหมายลบแบบยูนิโค้ด (− – —) → - · ×10⁵ → ×10^5
   · จุลภาคคั่นหลักพัน (1,000 · 12,345.6) ตัดทิ้ง ส่วนจุลภาคแบบอื่น เช่น 3,5 กำกวม (3.5 หรือ 35?)
     จึงปล่อยไว้ให้อ่านไม่ผ่าน แล้วให้ ansIssue() บอกนักเรียนว่าให้ใช้จุดทศนิยม
     (เดิมตัดจุลภาคทิ้งหมด 3,5 จึงกลายเป็น 35 โดยไม่มีใครรู้)
   · หน่วยที่พิมพ์ต่อท้ายตัวเลข (5 m/s · 20 นิวตัน) ตัดทิ้ง เพราะหน่วยของช่องกำหนดไว้ข้างช่องแล้ว */
function ansClean(raw) {
  if (raw == null) return '';
  var SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  var s = String(raw).trim()
    .replace(/[\u0E50-\u0E59]/g, function (c) { return String(c.charCodeAt(0) - 0x0E50); })
    .replace(/[\u2212\u2012\u2013\u2014\uFE63\uFF0D]/g, '-')
    .replace(/10\s*([⁻⁺]?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, function (m, sg, d) {
      return '10^' + (sg === '⁻' ? '-' : '') + d.replace(/./g, function (c) { return SUP.indexOf(c); });
    })
    .replace(/(\d),(?=\d{3}(?!\d))/g, '$1');
  var m = s.match(/^([-+]?(?:\d[\d,]*\.?\d*|\.\d+)(?:\s*(?:[eE]|[×xX*]\s*10\s*\^?)\s*[-+]?\d+)?)\s*(.*)$/);
  if (m && m[2] && /^[A-Za-zµμΩ°℃%\u0E01-\u0E4F]/.test(m[2])) s = m[1];
  return s;
}
/** เหตุที่อ่านคำตอบเป็นตัวเลขไม่ได้ — ใช้บอกนักเรียนแทนการนับเป็นช่องว่าง */
function ansIssue(raw) {
  var s = ansClean(raw);
  if (!s) return '';
  if (/,/.test(s)) return 'ใช้จุด (.) เป็นจุดทศนิยม เช่น 3.5 ไม่ใช่ 3,5';
  return 'อ่านเป็นตัวเลขไม่ได้ — พิมพ์ตัวเลขอย่างเดียว เช่น 12.5 · -3 · 3/4 · 2.4x10^-3';
}
/** เอาเฉพาะค่าตัวเลข — ใช้ตรวจว่านักเรียนกรอกช่องนี้แล้วหรือยัง */
function parseNum(raw) { const a = parseAns(raw); return a ? a.v : null; }
/** ของเดิม เก็บไว้ให้โค้ดส่วนที่เทียบตัวเลขล้วนยังเรียกได้ */
function checkNum(user, target, tolPct) { return checkAns(user, { value: target, kind: 'num' }, tolPct); }
/** ตารางสิ่งที่โจทย์กำหนดให้ + สิ่งที่ต้องหา (สร้างอัตโนมัติจากข้อมูลโจทย์) */
function givenTable(p) {
  let h = '<table class="given"><tbody>';
  p.given.forEach(gv => {
    h += '<tr><td class="s">' + M(gv.s) + '</td><td class="e">=</td>' +
      '<td class="v">' + (typeof gv.v === 'number' ? fmt(gv.v) : gv.v) + '</td>' +
      '<td class="d">' + (gv.unit ? esc(gv.unit) : '') + (gv.d ? ' &nbsp;(' + esc(gv.d) + ')' : '') + '</td></tr>';
  });
  p.finds.forEach(f => {
    h += '<tr><td class="s">' + M(f.s) + '</td><td class="e">=</td>' +
      '<td class="v" style="color:var(--muted)">?</td>' +
      '<td class="d">' + (f.unit ? esc(f.unit) : '') + (f.d ? ' &nbsp;(' + esc(f.d) + ')' : '') + '</td></tr>';
  });
  return h + '</tbody></table>';
}
function stepBodies(p) {
  if (p.theory) return [p.idea, choiceWhyHTML(p), p.why];
  const s = p.sol;
  const eqHtml = (s.eqs || []).map(e =>
    '<div>' + EQ(e.eq) + (e.why ? '<div class="why">' + e.why + '</div>' : '') + '</div>').join('');
  const lines = a => (Array.isArray(a) ? a : [a]).filter(Boolean).join('');
  return [
    s.analyze,
    givenTable(p),
    eqHtml,
    lines(s.solve),
    lines(s.subst),
    lines(s.calc),
    s.conclude
  ];
}
/** กล่องอธิบายของโจทย์ทฤษฎี — แนวคิดหลัก + เหตุผลรายตัวเลือก + ข้อสรุปที่ต้องจำ */
function theorySolutionHTML(p, open) {
  const rows = [
    { n: 1, t: 'แนวคิดที่ใช้ตอบ', b: p.idea },
    { n: 2, t: 'ทำไมข้อนี้ถูก และข้ออื่นผิดตรงไหน', b: choiceWhyHTML(p) },
    { n: 3, t: 'สิ่งที่ต้องจำไปใช้ต่อ', b: p.why }
  ];
  let h = '<div class="sol">';
  rows.forEach(r => {
    h += '<div class="solstep' + (open ? '' : ' closed') + '" data-step="' + (r.n - 1) + '">' +
      '<div class="h"><span class="n">' + r.n + '</span>' + r.t +
      (open ? '' : '<span class="cv">แตะเพื่อดู</span>') + '</div>' +
      '<div class="b">' + (r.b || '<span class="hint">—</span>') + '</div></div>';
  });
  return h + '</div>';
}
/** ไล่อธิบายทีละตัวเลือกว่าถูกหรือผิดเพราะอะไร */
function choiceWhyHTML(p) {
  return '<div class="whylist">' + (p.choices || []).map((c, k) =>
    '<div class="whyrow ' + (c.correct ? 'ok' : 'no') + '">' +
    '<span class="wk">' + 'กขคง'[k] + '.</span>' +
    '<span class="wt">' + c.text + '</span>' +
    '<span class="wm">' + (c.correct ? '✓ ถูก' : '✗ ผิด') + '</span>' +
    (c.why ? '<div class="wd">' + c.why + '</div>' : '') + '</div>').join('') + '</div>';
}
/** โหมด open=true จะกางทุกขั้น (ใช้ตอนพิมพ์) */
function solutionHTML(p, open) {
  if (p.theory) return theorySolutionHTML(p, open);
  const b = stepBodies(p);
  const L = workLines(1);
  let h = '<div class="sol">';
  
  h += '<div class="row noprint" style="justify-content:flex-end; margin-bottom: 8px;">' +
       '<button class="sm" type="button" onclick="this.closest(\'.sol\').classList.toggle(\'hide-steps\'); ' +
       'this.innerHTML = this.closest(\'.sol\').classList.contains(\'hide-steps\') ? \'👁️ แสดงวิธีทำทั้งหมด\' : \'👁️ ซ่อนข้อความ (เว้นบรรทัดไว้เขียน)\'">' +
       '👁️ ซ่อนข้อความ (เว้นบรรทัดไว้เขียน)</button></div>';

  for (let i = 0; i < 7; i++) {
    const blockId = WORK_BLOCKS[i] ? WORK_BLOCKS[i].id : null;
    const count = L[blockId] || 0;
    const linesHTML = count > 0 ? '<div class="sol-lines" style="display:none; padding: 6px 0;">' + 
                      new Array(count + 1).join('<div class="wl"></div>') + 
                      '</div>' : '<div class="sol-lines" style="display:none"><div class="hint" style="margin-top:8px">— ไม่มีบรรทัดในช่องนี้ —</div></div>';

    h += '<div class="solstep' + (open ? '' : ' closed') + '" data-step="' + i + '">' +
      '<div class="h"><span class="n">' + (i + 1) + '</span>' + STEP_TITLES[i] +
      (open ? '' : '<span class="cv">แตะเพื่อดู</span>') + '</div>' +
      '<div class="b"><div class="sol-text">' + (b[i] || '<span class="hint">—</span>') + '</div>' +
      linesHTML + '</div></div>';
  }
  return h + '</div>';
}
/** ผูกให้แตะหัวข้อแล้วพับ/กางได้ */
function bindSolutionToggle(root) {
  $$('.solstep>.h', root).forEach(h => {
    h.addEventListener('click', () => {
      const st = h.parentElement;
      st.classList.toggle('closed');
      const cv = $('.cv', h);
      if (cv) cv.textContent = st.classList.contains('closed') ? 'แตะเพื่อดู' : 'แตะเพื่อซ่อน';
    });
  });
}
/* --- 3.7 วาดตัวโจทย์ ------------------------------------------------------ */
function topicName(id) { const t = topicOf(id); return t ? t.name : ''; }
function problemHead(p, no) {
  const t = topicOf(p.topic);
  return '<div class="qhead">' +
    (no ? '<span class="qno">ข้อ ' + no + '</span>' : '') +
    '<span class="tag ' + LEVEL_CLS[p.level] + '">' + p.level + '</span>' +
    (t ? '<span class="tag t">' + (t.exam ? '🎓 ' : '') + chLabel(t) + ' ' + esc(t.name) + '</span>' : '') +
    '<span class="tag t">' + esc(p.sub) + '</span>' +
    '</div>';
}
function problemBody(p) {
  return '<div class="stem">' + p.stem + '</div>' + (p.figure ? '<div class="fig">' + p.figure + '</div>' : '');
}
/** ตัวเลือกปรนัยที่คำตอบเป็นเศษส่วน — ตัวลวงมาจาก p.distractFrac ซึ่งเป็นคู่ [เศษ, ส่วน]
    เทียบกันด้วยรูปอย่างต่ำ ตัวเลือกจึงไม่มีทางเป็นค่าเดียวกัน เช่น 3/4 กับ 6/8 */
function makeFracChoices(p, R) {
  const f0 = p.finds[0];
  const an = f0.num, ad = f0.den;
  const key = (n, d) => { const r = reduceFrac(n, d); return r[0] + '/' + r[1]; };
  const seen = {};
  seen[key(an, ad)] = 1;
  const pool = [];
  const push = pr => {
    if (!pr || !pr[1] || !isFinite(pr[0]) || !isFinite(pr[1])) return;
    const r = reduceFrac(pr[0], pr[1]);
    if (Math.abs(r[1]) > 40 || seen[key(r[0], r[1])]) return;
    seen[key(r[0], r[1])] = 1;
    pool.push(r);
  };
  (p.distractFrac || []).forEach(push);
  // ตัวลวงสำรอง ใช้ต่อเมื่อของที่แม่แบบตั้งใจใส่มายังไม่พอ 6 ตัว
  // (เรียงตามความพลาดที่พบบ่อย: บวกผิดที่ · กลับเศษกับส่วน · ลืมย่อ)
  for (const pr of [[an + 1, ad], [an, ad + 1], [ad, an], [an * 2, ad], [an, ad * 2], [an - 1, ad]]) {
    if (pool.length >= 6) break;
    if (pr[0] === 0) continue;                       // 0 เป็นตัวลวงที่ตัดทิ้งได้ง่ายเกินไป
    push(pr);
  }
  const picked = R.shuffle(pool).slice(0, 3);
  const all = R.shuffle(picked.concat([[an, ad]]));
  return all.map(pr => ({
    value: pr[0] / pr[1], text: fracTxt(pr[0], pr[1]),
    correct: pr[0] === an && pr[1] === ad
  }));
}
/* --- 3.5 การตรวจคำตอบ -----------------------------------------------------
   คณิตต่างจากฟิสิกส์ตรงที่คำตอบไม่ได้เป็นทศนิยมเสมอไป แม่แบบจึงระบุชนิดคำตอบไว้ที่
   finds[].kind ได้ 4 แบบ
     'num'   (ค่าเริ่มต้น) ทศนิยมทั่วไป ยอมคลาดเคลื่อนตาม tolPct
     'int'   จำนวนเต็ม ต้องตรงเป๊ะ
     'frac'  เศษส่วน ต้องส่ง num/den มาคู่กัน · ถ้า lowest:true ต้องตอบเป็นเศษส่วนอย่างต่ำ
     'exact' ต้องตรงเป๊ะ ไม่ยอมคลาดเคลื่อน
   -------------------------------------------------------------------------- */
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
/** ย่อเศษส่วนให้อยู่ในรูปอย่างต่ำ ตัวส่วนเป็นบวกเสมอ คืน [เศษ, ส่วน] */
function reduceFrac(n, d) {
  if (!d) return [n, d];
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return [n / g, d / g];
}
/** เขียนเศษส่วนเป็นข้อความสำหรับส่งให้ M() โดย<b>ย่ออย่างต่ำ</b>ก่อน
    ใช้กับคำตอบและตัวเลือก ซึ่งต้องอยู่ในรูปอย่างต่ำเสมอ */
function fracTxt(n, d) { const r = reduceFrac(n, d); return fracRaw(r[0], r[1]); }
/** เขียนเศษส่วน <b>ตามที่ให้มา</b> ไม่ย่อ — ใช้กับตัวเลขในโจทย์ เพราะบางข้อ
    ตั้งใจให้เห็นรูปที่ยังไม่ย่อ เช่น เทียบ 3/6 กับ 3/12 ที่ตัวเศษเท่ากัน */
function fracRaw(n, d) {
  if (d < 0) { n = -n; d = -d; }
  if (d === 1) return String(n);
  return (n < 0 ? '-' : '') + 'frac(' + Math.abs(n) + ',' + d + ')';
}
/** คำแนะนำเหนือช่องกรอกคำตอบ — เปลี่ยนตามชนิดคำตอบที่แม่แบบกำหนด
    เพราะโจทย์เศษส่วน โจทย์จำนวนเต็ม และโจทย์ทศนิยม มีกติกาการตอบคนละแบบ */
function ansHintHTML(p) {
  const kinds = p.finds.map(f => f.kind || 'num');
  let tip;
  if (kinds.indexOf('frac') >= 0)
    tip = 'พิมพ์เศษส่วนได้เลย เช่น <b>3/4</b> หรือจำนวนคละ <b>1 1/2</b>' +
      (p.finds.some(f => f.lowest) ? ' · ข้อนี้ต้องตอบเป็น<b>เศษส่วนอย่างต่ำ</b>' : '');
  else if (kinds.indexOf('sci') >= 0)
    tip = 'ตอบในรูป <b>a × 10ⁿ</b> พิมพ์ได้เลย เช่น <b>3.2x10^-5</b> หรือ <b>3.2e-5</b> · ยอมคลาดเคลื่อนได้ ±' + fmt(Math.max(1, DB.settings.tolPct)) + '%';
  else if (kinds.every(k => k === 'int' || k === 'exact'))
    tip = 'ตอบให้ตรงเป๊ะ ไม่มีการปัดเศษ · ใส่เครื่องหมายลบด้วยถ้าคำตอบเป็นจำนวนลบ';
  else
    tip = 'ไม่ต้องพิมพ์หน่วย · ยอมคลาดเคลื่อนได้ ±' + fmt(DB.settings.tolPct) + '%';
  // คำตอบทศนิยมล้วน (รวมข้อติดรูทของฟิสิกส์) ใช้หัวข้อเดิม "กรอกคำตอบเป็นตัวเลข"
  const head = kinds.every(k => k === 'num') ? 'กรอกคำตอบเป็นตัวเลข' : 'กรอกคำตอบ';
  return '<div style="margin-bottom:9px"><b>' + head + '</b> <span class="hint">(' + tip + ')</span></div>';
}
/** ข้อความคำตอบสำหรับแสดงผล — เศษส่วนแสดงเป็นเศษส่วน ไม่ใช่ทศนิยมยาว ๆ */
function ansTxt(f) {
  if (f.sur) return surdExpr(f.sur);          // คำตอบติดรูท (ฟิสิกส์)
  if (f.kind === 'sci') return sciTxt(f.man, f.exp);
  return (f.kind === 'frac' && f.den) ? fracTxt(f.num, f.den) : fmtq(f.value);
}
function parseAns(raw) {
  if (raw == null) return null;
  let s = ansClean(raw).replace(/^\+/, '');
  if (s === '') return null;
  // จำนวนคละ เช่น 1 1/2 หรือ -2 3/4
  let m = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (m) {
    const w = Number(m[1]), n = Number(m[2]), d = Number(m[3]);
    if (!d) return null;
    const sign = m[1].charAt(0) === '-' ? -1 : 1;
    const num = Math.abs(w) * d + n;
    return { v: sign * num / d, n: sign * num, d: d };
  }
  // เศษส่วนล้วน เช่น 3/4 หรือ -2/5
  m = s.replace(/\s+/g, '').match(/^(-?\d+)\/(-?\d+)$/);
  if (m) {
    const n = Number(m[1]), d = Number(m[2]);
    if (!d) return null;
    return { v: n / d, n: n, d: d };
  }
  s = s.replace(/\s+/g, '').replace(/[×xX*]10\^?/, 'e').replace(/E/, 'e').replace(/−/g, '-');
  if (!/^-?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/.test(s)) return null;
  const v = Number(s);
  return isFinite(v) ? { v: v, n: null, d: null } : null;
}
/** เทียบคำตอบตามชนิดที่แม่แบบกำหนดไว้ใน find */
function checkAns(raw, f, tolPct) {
  const a = parseAns(raw);
  if (!a) return false;
  const kind = (f && f.kind) || 'num';
  const target = f.value;
  if (kind === 'frac') {
    if (Math.abs(a.v - target) > 1e-9) return false;
    if (!f.lowest) return true;
    // โจทย์สั่ง "ตอบเป็นเศษส่วนอย่างต่ำ" — พิมพ์ทศนิยมมาถือว่ายังไม่ตรงรูปที่โจทย์ขอ
    if (a.d == null) return Math.abs(target - Math.round(target)) < 1e-9;
    const r = reduceFrac(a.n, a.d);
    return r[0] === a.n && r[1] === a.d;
  }
  if (kind === 'int' || kind === 'exact') return Math.abs(a.v - target) < 1e-9;
  if (kind === 'sci') {
    const pc = Math.max(1, tolPct == null ? DB.settings.tolPct : tolPct) / 100;
    return Math.abs(a.v - target) <= Math.abs(target) * pc + 1e-300;
  }
  const pct = (tolPct == null ? DB.settings.tolPct : tolPct) / 100;
  const tol = Math.max(Math.abs(target) * pct, 0.005);
  return Math.abs(a.v - target) <= tol + 1e-9;
}
/** ตัวเลือกปรนัยที่คำตอบเป็นสัญกรณ์วิทยาศาสตร์ — ตัวลวงมาจาก p.distractSci เป็นคู่ [ตัวหน้า, เลขชี้กำลัง]
    ตัวลวงที่ดีคือเลขชี้กำลังผิด (ลืมกลับเครื่องหมาย บวกแทนลบ) เพราะนั่นคือจุดที่นักเรียนพลาดจริง */
function makeSciChoices(p, R) {
  const f0 = p.finds[0];
  const key = (m, e) => { const o = sciNorm(m * Math.pow(10, e)); return o.m + 'e' + o.e; };
  const seen = {};
  seen[key(f0.man, f0.exp)] = 1;
  const pool = [];
  const push = pr => {
    if (!pr || !isFinite(pr[0]) || !isFinite(pr[1]) || !pr[0]) return;
    const o = sciNorm(pr[0] * Math.pow(10, pr[1]));
    if (dpOf(o.m, 4) > 2 || seen[key(o.m, o.e)]) return;
    if (o.m < 0 && f0.man > 0 && f0.positive) return;
    seen[key(o.m, o.e)] = 1;
    pool.push([o.m, o.e]);
  };
  (p.distractSci || []).forEach(push);
  for (const pr of [[f0.man, f0.exp + 1], [f0.man, f0.exp - 1], [f0.man, -f0.exp], [f0.man * 2, f0.exp], [f0.man, f0.exp + 2]]) {
    if (pool.length >= 6) break;
    push(pr);
  }
  const picked = R.shuffle(pool).slice(0, 3);
  const all = R.shuffle(picked.concat([[f0.man, f0.exp]]));
  return all.map(pr => ({ value: pr[0] * Math.pow(10, pr[1]), text: sciTxt(pr[0], pr[1]),
                          correct: pr[0] === f0.man && pr[1] === f0.exp }));
}
/** แยกค่าเป็น ตัวหน้า × 10^เลขชี้กำลัง โดย 1 ≤ |ตัวหน้า| < 10 และตัวหน้าปัดเป็นเลขนัยสำคัญ 3 ตัว */
function sciNorm(v) {
  if (!v || !isFinite(v)) return { m: 0, e: 0 };
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = Number((v / Math.pow(10, e)).toPrecision(3));
  if (Math.abs(m) >= 10) { m = Number((m / 10).toPrecision(3)); e += 1; }
  return { m: m, e: e };
}
/** ข้อความ a × 10^n สำหรับส่งให้ M() */
function sciTxt(m, e) { return fmtq(m) + ' × 10^{' + e + '}'; }

