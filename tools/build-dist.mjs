// สร้างไฟล์ฉบับขึ้นเว็บของทุกวิชาจากไฟล์ต้นฉบับของครู
//
//   PhysicsAutoSheet/physics.html  ->  PhysicsAutoSheet/index.html
//   MathAutoSheet/math.html        ->  MathAutoSheet/index.html
//   ChemistryAutoSheet/chem.html   ->  ChemistryAutoSheet/index.html
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
  }
];

const RE = /\/\* @@BUILTIN@@ \*\/[\s\S]*?\/\* @@BUILTIN-END@@ \*\//;

let fail = 0;
for (const t of TARGETS) {
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
