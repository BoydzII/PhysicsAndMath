// ประกอบไฟล์แอปคลังโจทย์ของครู (physics.html ฯลฯ) จากแกนกลาง core/ และส่วนเฉพาะวิชา subjects/
//
//   node tools/assemble.mjs            ประกอบแล้วเขียนทับไฟล์ครูทุกวิชา
//   node tools/assemble.mjs --check    ตรวจอย่างเดียวว่าไฟล์ครูตรงกับผลประกอบ (ไม่เขียน)
//
// ทำไมต้องมี — แปดวิชาเคยเป็นไฟล์แยกที่ก๊อปเอนจินกันไปมา แก้ทีละไฟล์จนห่างกันเรื่อย ๆ
// ตอนนี้ของที่ใช้ร่วมกันอยู่ใน core/ ที่เดียว ของเฉพาะวิชาอยู่ใน subjects/<วิชา>/
// รายการชิ้นส่วนของแต่ละวิชาอยู่ใน subjects/manifest.json (ประกอบตามลำดับ ต่อกันตรง ๆ)
//
// **ไฟล์ครูกลายเป็นไฟล์ที่สร้างอัตโนมัติ ห้ามแก้ตรง** — แก้ที่ core/ หรือ subjects/ แล้วสั่ง build-dist
// บล็อก @@BUILTIN@@ ในไฟล์ครูถูก build-dist ประทับเลขรุ่นทีหลัง จึงไม่นำมาเทียบ

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = path.join(ROOT, 'subjects', 'manifest.json');
const RE_BUILTIN = /\/\* @@BUILTIN@@ \*\/[\s\S]*?\/\* @@BUILTIN-END@@ \*\//;

export function readManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

/** ประกอบวิชาเดียว คืนเนื้อไฟล์ (LF) */
export function assembleOne(entry) {
  return entry.parts.map(p => {
    const f = path.join(ROOT, p);
    if (!fs.existsSync(f)) throw new Error('ไม่พบชิ้นส่วน ' + p);
    return fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
  }).join('');
}

const norm = s => s.replace(/\r\n/g, '\n').replace(RE_BUILTIN, '@@');

/** คืนรายการวิชาที่ไฟล์ครูไม่ตรงกับผลประกอบ [{ key, out, line }] */
export function checkAll() {
  const bad = [];
  for (const [key, entry] of Object.entries(readManifest())) {
    const want = norm(assembleOne(entry));
    const file = path.join(ROOT, entry.out);
    const have = fs.existsSync(file) ? norm(fs.readFileSync(file, 'utf8')) : '';
    if (want !== have) {
      const a = want.split('\n'), b = have.split('\n');
      let i = 0; while (i < a.length && a[i] === b[i]) i++;
      bad.push({ key, out: entry.out, line: i + 1 });
    }
  }
  return bad;
}

export function writeAll() {
  const done = [];
  for (const [key, entry] of Object.entries(readManifest())) {
    const text = assembleOne(entry);
    const file = path.join(ROOT, entry.out);
    /* คงบล็อก BUILTIN ที่ build-dist ประทับไว้ในไฟล์ครูเดิม (เลขรุ่น วันสร้าง)
       ไม่งั้นทุกครั้งที่ประกอบใหม่ เลขรุ่นในไฟล์ครูจะถอยกลับไปเป็นค่าในชิ้นส่วน */
    let out = text;
    if (fs.existsSync(file)) {
      const cur = fs.readFileSync(file, 'utf8').match(RE_BUILTIN);
      if (cur && RE_BUILTIN.test(out)) out = out.replace(RE_BUILTIN, () => cur[0]);
    }
    fs.writeFileSync(file, out);
    done.push(key);
  }
  return done;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--check')) {
    const bad = checkAll();
    bad.forEach(b => console.error('✗ ' + b.out + ' : ไม่ตรงกับชิ้นส่วนใน core/ + subjects/' + b.key +
      '/ (ต่างตั้งแต่บรรทัด ' + b.line + ') — มีคนแก้ไฟล์ครูตรง ๆ หรือยังไม่ได้สั่ง build-dist'));
    if (!bad.length) console.log('✓ ไฟล์ครูทุกวิชาตรงกับผลประกอบ');
    process.exit(bad.length ? 1 : 0);
  }
  const done = writeAll();
  console.log('✓ ประกอบแล้ว ' + done.length + ' วิชา: ' + done.join(' '));
}
