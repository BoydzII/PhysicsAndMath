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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FILES = [
  'index.html',
  'PhysicsAutoSheet/physics.html',   'PhysicsAutoSheet/index.html',
  'MathAutoSheet/math.html',         'MathAutoSheet/index.html',
  'ChemistryAutoSheet/chem.html',    'ChemistryAutoSheet/index.html',
  'ScienceAutoSheet/science.html',   'ScienceAutoSheet/index.html',
  'EquilibriumLab/equilibrium.html', 'EquilibriumLab/index.html'
];

// คู่ที่ต้องเหมือนกันทุกตัวอักษร ยกเว้นบล็อก BUILTIN
const PAIRS = [
  ['PhysicsAutoSheet/physics.html',   'PhysicsAutoSheet/index.html'],
  ['MathAutoSheet/math.html',         'MathAutoSheet/index.html'],
  ['ChemistryAutoSheet/chem.html',    'ChemistryAutoSheet/index.html'],
  ['ScienceAutoSheet/science.html',   'ScienceAutoSheet/index.html'],
  ['EquilibriumLab/equilibrium.html', 'EquilibriumLab/index.html']
];

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

console.log(fail ? '\nไม่ผ่าน ' + fail + ' รายการ — ยังไม่ควรขึ้นเว็บ' : '\nผ่านทั้งหมด พร้อมขึ้นเว็บ');
process.exit(fail ? 1 : 0);
