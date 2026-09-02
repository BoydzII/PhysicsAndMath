// สร้างไฟล์ฉบับขึ้นเว็บของทุกวิชาจากไฟล์ต้นฉบับของครู
//
//   PhysicsAutoSheet/physics.html  ->  PhysicsAutoSheet/index.html
//   MathAutoSheet/math.html        ->  MathAutoSheet/index.html
//   ChemistryAutoSheet/chem.html   ->  ChemistryAutoSheet/index.html
//   ScienceAutoSheet/science.html  ->  ScienceAutoSheet/index.html
//   PhysicalScienceAutoSheet/physci.html -> PhysicalScienceAutoSheet/index.html
//
// เพิ่มวิชาใหม่: เติมหนึ่งบล็อกในอาเรย์ TARGETS ข้างล่าง
//
// ต่างกันแค่บล็อก BUILTIN บรรทัดเดียว เนื้อโปรแกรมเหมือนกันทุกตัวอักษร
// จึงไม่มีทางที่สองไฟล์จะหลุดจากกัน ถ้าสร้างด้วยสคริปต์นี้ทุกครั้ง
//
// ใช้:  node tools/build-dist.mjs
//
// หมายเหตุ: ในแอพมีปุ่ม "สร้างไฟล์สำหรับแจกนักเรียน" ที่แท็บตั้งค่าอยู่แล้ว
// ปุ่มนั้นจะฝังตราโรงเรียนและหัวกระดาษที่ตั้งไว้ลงไปด้วย เหมาะกับตอนแจกไฟล์เดี่ยว ๆ
// ส่วนสคริปต์นี้เหมาะกับตอนอัปขึ้นเว็บ เพราะทำซ้ำได้เหมือนเดิมทุกครั้ง

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ที่อยู่เว็บแอปของ Google Apps Script — ต้องตรงกับที่ตั้งไว้ใน index.html หน้าพอร์ทัล
const APPS_URL = 'https://script.google.com/macros/s/AKfycbzNfunJ0VIQlC-_CvUWA4VuFlQ1IGUyrzEjTQLTGV0Mqi-k_KnDWnspzcA9yOXQ2vwE/exec';

// ที่อยู่เว็บแอปของ "ห้องเรียนสมดุลกล" ซึ่งใช้ชีตคนละใบกับสี่วิชาข้างบน
// เอามาจาก Apps Script ของชีตสมดุลกล → ทำให้ใช้งานได้ → เว็บแอป (ลงท้าย /exec)
// ถ้าปล่อยว่าง สคริปต์จะไม่ยอมสร้างไฟล์ให้ เพราะไฟล์ที่แจกนักเรียนจะส่งคะแนนขึ้นชีตไม่ได้
const EQ_APPS_URL = 'https://script.google.com/macros/s/AKfycbwiwNszVH4qwYNNr5o35r4JVWPbY66mM5XoQF-orwe-PmwvCM5wR9Gpw65nmQfPwT_W/exec';

const TARGETS = [
  {
    src: 'PhysicsAutoSheet/physics.html',
    out: 'PhysicsAutoSheet/index.html',
    // ครูยังลงชื่อเข้าใช้ในฐานะผู้ดูแลจากเว็บได้ แต่ห้ามตัดการเชื่อมต่อชีต
    // เพราะถ้านักเรียนเผลอกด ผลที่ทำรอบนั้นจะไม่ถูกส่งขึ้นชีต
    builtin: { url: APPS_URL, studentOnly: false, lockCloud: true, logo: '', header: null, about: null }
  },
  {
    src: 'MathAutoSheet/math.html',
    out: 'MathAutoSheet/index.html',
    // คณิตยังไม่ได้เชื่อมชีต จึงเป็นฉบับนักเรียนล้วน ไม่มีเฉลยและสถิติชั้นเรียน
    builtin: { url: '', studentOnly: true, lockCloud: false, logo: '', header: null, about: null }
  },
  {
    src: 'ChemistryAutoSheet/chem.html',
    out: 'ChemistryAutoSheet/index.html',
    // เคมียังไม่ได้เชื่อมชีต จึงเป็นฉบับนักเรียนล้วนเช่นเดียวกับคณิต
    builtin: { url: '', studentOnly: true, lockCloud: false, logo: '', header: null, about: null }
  },
  {
    src: 'ScienceAutoSheet/science.html',
    out: 'ScienceAutoSheet/index.html',
    // วิทยาศาสตร์ยังไม่ได้เชื่อมชีตเช่นกัน จึงเป็นฉบับนักเรียนล้วน
    builtin: { url: '', studentOnly: true, lockCloud: false, logo: '', header: null, about: null }
  },
  {
    src: 'BiologyAutoSheet/bio.html',
    out: 'BiologyAutoSheet/index.html',
    // ชีววิทยายังไม่ได้เชื่อมชีต จึงเป็นฉบับนักเรียนล้วนเช่นเดียวกับคณิต วิทย์ และเคมี
    builtin: { url: '', studentOnly: true, lockCloud: false, logo: '', header: null, about: null }
  },
  {
    src: 'PhysicalScienceAutoSheet/physci.html',
    out: 'PhysicalScienceAutoSheet/index.html',
    // วิทยาศาสตร์กายภาพยังไม่ได้เชื่อมชีต จึงเป็นฉบับนักเรียนล้วนเช่นเดียวกับคณิต วิทย์ เคมี และชีวะ
    builtin: { url: '', studentOnly: true, lockCloud: false, logo: '', header: null, about: null }
  },
  {
    src: 'EquilibriumLab/equilibrium.html',
    out: 'EquilibriumLab/index.html',
    // ห้องเรียนสมดุลกลใช้ชีตของตัวเองคนละใบกับสี่วิชาข้างบน (คนละ Apps Script)
    // ฉบับนักเรียนล็อกไม่ให้เข้าหน้าครู และห้ามตัดการเชื่อมต่อชีต ผลจะได้ส่งขึ้นชีตเสมอ
    needUrl: true,
    builtin: { url: EQ_APPS_URL, studentOnly: true, lockCloud: true,
               school: 'โรงเรียนปากช่อง', teacher: 'นายรังสรรค์ กรีกูล', term: '' }
  }
];

const RE = /\/\* @@BUILTIN@@ \*\/[\s\S]*?\/\* @@BUILTIN-END@@ \*\//;

let fail = 0;
for (const t of TARGETS) {
  // วิชาที่ต้องต่อชีต ถ้ายังไม่ได้ใส่ที่อยู่เว็บแอป อย่าสร้างไฟล์ให้เด็ดขาด
  // ไม่งั้นจะได้ไฟล์ที่เปิดใช้ได้ตามปกติแต่คะแนนไม่ขึ้นชีต ซึ่งกว่าจะรู้ตัวก็สอบไปแล้ว
  if (t.needUrl && !t.builtin.url) {
    console.error('✗ ' + t.out + ' : ยังไม่ได้ใส่ EQ_APPS_URL ที่หัวไฟล์ tools/build-dist.mjs\n' +
      '   เอาที่อยู่เว็บแอปของชีตสมดุลกลมาวาง (ลงท้ายด้วย /exec) แล้วสั่งใหม่');
    fail++; continue;
  }
  const srcPath = path.join(ROOT, t.src), outPath = path.join(ROOT, t.out);
  const src = fs.readFileSync(srcPath, 'utf8');
  if (!RE.test(src)) {
    console.error('✗ ' + t.src + ' : ไม่พบบล็อก @@BUILTIN@@ — ห้ามลบบรรทัดเครื่องหมายนั้น');
    fail++; continue;
  }
  const eol = src.indexOf('\r\n') >= 0 ? '\r\n' : '\n';
  const block = ['/* @@BUILTIN@@ */', 'const BUILTIN = ' + JSON.stringify(t.builtin) + ';',
                 '/* @@BUILTIN-END@@ */'].join(eol);
  fs.writeFileSync(outPath, src.replace(RE, block));
  console.log('✓ ' + t.out + '  (studentOnly=' + t.builtin.studentOnly +
    ' · lockCloud=' + t.builtin.lockCloud + ' · ' + (t.builtin.url ? 'ต่อชีต' : 'ออฟไลน์') + ')');
}
process.exit(fail ? 1 : 0);
