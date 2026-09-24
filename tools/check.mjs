// ตรวจไวยากรณ์ของทุกไฟล์แอพก่อนขึ้นเว็บ
//
//   node tools/check.mjs
//
// ทำไมต้องมี — แอพทุกตัวเป็น HTML ไฟล์เดียวที่มีสคริปต์ก้อนใหญ่อยู่ข้างใน
// ถ้าพิมพ์ผิดแม้แต่วงเล็บเดียว เบราว์เซอร์จะไม่รันทั้งก้อน แล้วนักเรียนจะเจอ "หน้าขาว"
// ซึ่งกว่าจะรู้ตัวก็ต่อเมื่อมีคนทัก สคริปต์นี้จับได้ตั้งแต่ก่อน push
//
// ตรวจสองอย่าง
//   1) แยกสคริปต์ในไฟล์ออกมาแล้วให้เอนจินคอมไพล์ดู (ไม่ได้สั่งรัน)
//   2) ไฟล์ฉบับขึ้นเว็บต้องมีเนื้อโปรแกรมเท่ากับฉบับของครูเป๊ะ ๆ ต่างได้แค่บล็อก BUILTIN

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkAll as assembledMismatch } from './assemble.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FILES = [
  'index.html',
  'PhysicsAutoSheet/physics.html',   'PhysicsAutoSheet/index.html',
  'MathAutoSheet/math.html',         'MathAutoSheet/index.html',
  'PhysicsFoundation/foundation.html', 'PhysicsFoundation/index.html',
  'ChemistryAutoSheet/chem.html',    'ChemistryAutoSheet/index.html',
  'ScienceAutoSheet/science.html',   'ScienceAutoSheet/index.html',
  'BiologyAutoSheet/bio.html',       'BiologyAutoSheet/index.html',
  'PhysicalScienceAutoSheet/physci.html', 'PhysicalScienceAutoSheet/index.html',
  'IJSOAutoSheet/ijso.html',         'IJSOApp/index.html',
  'EquilibriumLab/equilibrium.html', 'EquilibriumLab/index.html',
  // ห้องวาดรูปโจทย์เป็นเครื่องมือของครู มีไฟล์เดียว ไม่มีฉบับนักเรียน จึงไม่มีคู่ใน PAIRS
  'FigureLab/figure.html',
  // ส่งงานออนไลน์ ไฟล์เดียวใช้ทั้งครูและนักเรียน ไม่มีคู่ใน PAIRS
  'WorkDesk/index.html'
];

// คู่ที่ต้องเหมือนกันทุกตัวอักษร ยกเว้นบล็อก BUILTIN
const PAIRS = [
  ['PhysicsAutoSheet/physics.html',   'PhysicsAutoSheet/index.html'],
  ['MathAutoSheet/math.html',         'MathAutoSheet/index.html'],
  ['PhysicsFoundation/foundation.html', 'PhysicsFoundation/index.html'],
  ['ChemistryAutoSheet/chem.html',    'ChemistryAutoSheet/index.html'],
  ['ScienceAutoSheet/science.html',   'ScienceAutoSheet/index.html'],
  ['BiologyAutoSheet/bio.html',       'BiologyAutoSheet/index.html'],
  ['PhysicalScienceAutoSheet/physci.html', 'PhysicalScienceAutoSheet/index.html'],
  ['IJSOAutoSheet/ijso.html',         'IJSOApp/index.html'],
  ['EquilibriumLab/equilibrium.html', 'EquilibriumLab/index.html']
];

/* ไฟล์ .html ทุกไฟล์ในโฟลเดอร์แอปต้องเป็นแอปของโฟลเดอร์นั้นจริง (ดูจาก <title> และคีย์ localStorage)
   เคยพลาดมาแล้วสองครั้ง: หน้าแอปฟิสิกส์ 2 ถูกคัดลอกหน้าวิทย์กายภาพทับทั้งไฟล์
   และ IJSOAutoSheet/index.html เป็นสำเนาวิทย์กายภาพที่ใช้คีย์ physciquiz.v1 ค้างอยู่
   ถ้าเปิดไฟล์นั้นจะอ่าน-เขียนข้อมูลของวิทย์กายภาพ ทั้งสองกรณีไม่มีอะไรฟ้องเลย */
const IDENT = {
  PhysicsAutoSheet:         { title: 'คลังโจทย์ฟิสิกส์ ม.4',        key: 'physicsquiz.v1' },
  MathAutoSheet:            { title: 'คลังโจทย์คณิตศาสตร์',        key: 'mathquiz.v1' },
  PhysicsFoundation:        { title: 'ปรับพื้นฐานฟิสิกส์',           key: 'physfoundquiz.v1' },
  ChemistryAutoSheet:       { title: 'คลังโจทย์เคมี',              key: 'chemquiz.v1' },
  ScienceAutoSheet:         { title: 'คลังโจทย์วิทยาศาสตร์ ม.1',     key: 'sciquiz.v1' },
  BiologyAutoSheet:         { title: 'คลังโจทย์ชีววิทยา',          key: 'bioquiz.v1' },
  PhysicalScienceAutoSheet: { title: 'คลังโจทย์วิทยาศาสตร์กายภาพ',  key: 'physciquiz.v1' },
  IJSOAutoSheet:            { title: 'คลังโจทย์IJSO',              key: 'ijsoquiz.v1' },
  IJSOApp:                  { title: 'คลังโจทย์IJSO',              key: 'ijsoquiz.v1' },
  EquilibriumLab:           { title: 'ห้องเรียนสมดุลกล' },
  Physics2App:              { title: 'ฟิสิกส์ 2' },
  FigureLab:                { title: 'ห้องวาดรูปโจทย์' },
  WorkDesk:                 { title: 'ส่งงานออนไลน์' }
};

const RE_BUILTIN = /\/\* @@BUILTIN@@ \*\/[\s\S]*?\/\* @@BUILTIN-END@@ \*\//;
let fail = 0;

/** ดึงเนื้อในของ <script> ทุกก้อนที่ไม่ได้อ้างไฟล์ภายนอก */
function scripts(html) {
  const out = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (/\bsrc\s*=/i.test(m[1])) continue;
    if (/type\s*=\s*["'](?!text\/javascript|module)/i.test(m[1])) continue;
    out.push(m[2]);
  }
  return out;
}

for (const rel of FILES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { console.log('–  ' + rel + '  (ยังไม่มีไฟล์ ข้ามไป)'); continue; }
  const html = fs.readFileSync(p, 'utf8');
  const parts = scripts(html);
  if (!parts.length) { console.error('✗  ' + rel + '  : ไม่พบสคริปต์ในไฟล์'); fail++; continue; }
  let bad = null;
  parts.forEach((code, i) => {
    if (bad) return;
    try { new Function(code); }
    catch (e) { bad = 'สคริปต์ก้อนที่ ' + (i + 1) + ' — ' + e.message; }
  });
  if (bad) { console.error('✗  ' + rel + '  : ' + bad); fail++; }
  else console.log('✓  ' + rel + '  (' + parts.length + ' สคริปต์ · ' +
    (html.length / 1024).toFixed(0) + ' KB)');
}

/* ไฟล์ครูต้องตรงกับผลประกอบจาก core/ + subjects/ (ยกเว้นบล็อก BUILTIN)
   ถ้าไม่ตรง แปลว่ามีคนแก้ไฟล์ครูตรง ๆ งานนั้นจะหายตอน build ครั้งถัดไป */
try {
  for (const b of assembledMismatch()) {
    console.error('✗  ' + b.out + '  : ไม่ตรงกับชิ้นส่วนใน core/ + subjects/' + b.key + '/ (ต่างตั้งแต่บรรทัด ' + b.line +
      ') — ห้ามแก้ไฟล์ครูตรง ให้แก้ที่ core/ หรือ subjects/ แล้วสั่ง node tools/build-dist.mjs');
    fail++;
  }
} catch (e) { console.error('✗  ประกอบไฟล์ครูไม่ได้ — ' + e.message); fail++; }

for (const [a, b] of PAIRS) {
  const pa = path.join(ROOT, a), pb = path.join(ROOT, b);
  if (!fs.existsSync(pa) || !fs.existsSync(pb)) continue;
  const sa = fs.readFileSync(pa, 'utf8').replace(RE_BUILTIN, '@@').replace(/\r\n/g, '\n');
  const sb = fs.readFileSync(pb, 'utf8').replace(RE_BUILTIN, '@@').replace(/\r\n/g, '\n');
  if (sa !== sb) {
    console.error('✗  ' + b + '  : เนื้อโปรแกรมไม่ตรงกับ ' + a +
      ' — สั่ง  node tools/build-dist.mjs  ก่อน');
    fail++;
  }
}

for (const [dir, want] of Object.entries(IDENT)) {
  const d = path.join(ROOT, dir);
  if (!fs.existsSync(d)) continue;
  for (const name of fs.readdirSync(d).filter(n => /\.html$/i.test(n))) {
    const rel = dir + '/' + name;
    const html = fs.readFileSync(path.join(d, name), 'utf8');
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
    const key = (html.match(/const LS_KEY = '([^']*)'/) || [])[1] || '';
    if (!title.includes(want.title)) {
      console.error('✗  ' + rel + '  : ไม่ใช่แอปของโฟลเดอร์นี้ — ชื่อหน้า "' + title + '" (ควรมีคำว่า "' + want.title + '")');
      fail++;
    } else if (want.key && key && key !== want.key) {
      console.error('✗  ' + rel + '  : ใช้คีย์เก็บข้อมูล ' + key + ' ของวิชาอื่น (ควรเป็น ' + want.key + ')');
      fail++;
    }
  }
}

/* แถบเปลี่ยนแอป (apps.js) — ไวยากรณ์ต้องผ่าน และรายการแอปต้องตรงกับ SUBJECTS ของหน้าพอร์ทัล
   เพิ่มแอปใหม่ที่พอร์ทัลแล้วลืมเติมใน apps.js แอปใหม่จะไม่โผล่ในแถบ โดยไม่มีอะไรฟ้อง
   และทุกแอปที่อยู่ในรายการต้องโหลด ../apps.js ด้วย ไม่งั้นแอปนั้นไม่มีทางไปแอปอื่น */
{
  const appsPath = path.join(ROOT, 'apps.js');
  if (!fs.existsSync(appsPath)) { console.error('✗  apps.js  : ไม่พบไฟล์'); fail++; }
  else {
    const src = fs.readFileSync(appsPath, 'utf8');
    let ok = true;
    try { new Function(src); } catch (e) { console.error('✗  apps.js  : ' + e.message); fail++; ok = false; }
    const dirsOf = (s, from, to) => {
      const a = s.indexOf(from), b = s.indexOf(to, a);
      /* ตัดคอมเมนต์ทิ้งก่อน — ในพอร์ทัลมีตัวอย่าง "เพิ่มวิชาใหม่" ที่เขียน dir ไว้ในคอมเมนต์ */
      return new Set([...s.slice(a, b).replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/dir:\s*'([^']+)'/g)].map(m => m[1]));
    };
    const portal = dirsOf(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'), 'const SUBJECTS', '\n];');
    const mine = dirsOf(src, 'var APPS', '\n  ];');
    const miss = [...portal].filter(d => !mine.has(d)), extra = [...mine].filter(d => !portal.has(d));
    if (miss.length || extra.length) {
      console.error('✗  apps.js  : รายการแอปไม่ตรงกับ SUBJECTS ในหน้าพอร์ทัล' +
        (miss.length ? ' · ขาด ' + miss.join(', ') : '') + (extra.length ? ' · เกิน ' + extra.join(', ') : ''));
      fail++; ok = false;
    }
    const noTag = [...mine].flatMap(d => {
      const m = src.match(new RegExp("dir: '" + d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "', teacher: '([^']+)', student: '([^']+)'"));
      return m ? [...new Set([d + m[1], d + m[2]])] : [];
    }).filter(f => fs.existsSync(path.join(ROOT, f)) && !fs.readFileSync(path.join(ROOT, f), 'utf8').includes('src="../apps.js"'));
    if (noTag.length) { console.error('✗  apps.js  : ไฟล์เหล่านี้ยังไม่โหลดแถบเปลี่ยนแอป — ' + noTag.join(', ')); fail++; ok = false; }
    if (ok) console.log('✓  apps.js  (แถบเปลี่ยนแอป · ' + mine.size + ' แอป ตรงกับหน้าพอร์ทัล)');
  }
}

console.log(fail ? '\nไม่ผ่าน ' + fail + ' รายการ — ยังไม่ควรขึ้นเว็บ' : '\nผ่านทั้งหมด พร้อมขึ้นเว็บ');
process.exit(fail ? 1 : 0);
