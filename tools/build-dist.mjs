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
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ตราวันเวลาที่สร้างไฟล์ ประทับลงทุกไฟล์ที่ขึ้นเว็บในรอบเดียวกัน
   ครูจะได้ตรวจได้เองว่าเครื่องนั้นโหลดไฟล์ใหม่มาหรือยัง โดยไม่ต้องพึ่งลิงก์พิเศษ
   เดิมเลขรุ่นแอปเขียนตายไว้ในโค้ด แก้ไปกี่รอบก็ยังเป็นเลขเดิม ดูไม่ออกว่าใหม่หรือเก่า
   บล็อกนี้ถูกตัดออกก่อนเทียบไฟล์ใน check.mjs อยู่แล้ว จึงไม่กระทบการตรวจความตรงกัน */
const BUILD_STAMP = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' }).slice(0, 16);

/* เลขรุ่นของแอป — v8.<จำนวนคอมมิตทั้งหมด>
   เดิมเขียน 'v8.0' ตายไว้ในไฟล์ทั้งแปดไฟล์ แก้ไปกี่รอบก็ยังเป็น v8.0
   ครูจึงดูไม่ออกว่าเครื่องไหนโหลดของใหม่แล้ว และต้องมาไล่แก้เลขแปดที่เวลาอยากขยับรุ่น
   ใช้จำนวนคอมมิตเพราะมันเดินขึ้นเองทุกครั้งที่มีการแก้จริง ไม่มีทางลืมขยับ
   และย้อนดูได้ว่าเลขนั้นตรงกับโค้ดชุดไหน (git log จะเห็นลำดับตรงกัน)
   เลขนี้คือจำนวนคอมมิตตอนสร้างไฟล์ คอมมิตที่บรรจุไฟล์นี้เองจึงเป็นลำดับถัดไปหนึ่งขั้น */
let APP_VER = 'v8';
try {
  APP_VER = 'v8.' + execFileSync('git', ['rev-list', '--count', 'HEAD'],
    { cwd: ROOT, encoding: 'utf8' }).trim();
} catch (e) {
  console.error('! อ่านจำนวนคอมมิตจาก git ไม่ได้ — ใช้เลข ' + APP_VER + ' ไปก่อน');
}

/* ที่อยู่เว็บแอปของ Google Apps Script — วิชาละหนึ่งชีต จึงต้องแยกที่อยู่กันคนละอัน
   เคยรวมเป็นตัวเดียวชื่อ APPS_URL แล้วมีคนแก้ให้ชี้ไปชีตวิทย์กายภาพ
   แอปฟิสิกส์จึงไปอ่านชีตผิดใบเงียบ ๆ ครูมอบหมายงานแล้วนักเรียนไม่เห็นอยู่หลายวัน
   ทั้งที่คะแนนฟิสิกส์สามพันกว่ารายการยังอยู่ครบในชีตของมันเอง
   เอามาจาก Apps Script ของชีตวิชานั้น → จัดการการทำให้ใช้งานได้ → URL เว็บแอป (ลงท้าย /exec) */
const PHYS_APPS_URL = 'https://script.google.com/macros/s/AKfycbzuuRbnE_oB7a9vx7zZizyPVEKao31ERDTU82DvydMuRTDqVoQvgns9EsjTIzpbBjuM/exec';
const PSCI_APPS_URL = 'https://script.google.com/macros/s/AKfycbxVa8BYYQeIhBDmg85w2UBwsIqt6a2YudehUfCbyMny9T-5TTh1UfFxsJjTk9HLNuFc/exec';

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
    builtin: { url: PHYS_APPS_URL, studentOnly: false, lockCloud: true, logo: '', header: null, about: null }
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
    // ต่อชีตใบเดียวกับฟิสิกส์ (ชีตใบนี้เก็บได้หลายวิชา แยกด้วยคอลัมน์ subject)
    // ตั้งเหมือนฟิสิกส์ทุกอย่าง — ครูยังลงชื่อเป็นผู้ดูแลจากเว็บได้ แต่ห้ามตัดการเชื่อมต่อ
    // เพราะถ้านักเรียนเผลอกด ผลที่ทำรอบนั้นจะไม่ถูกส่งขึ้นชีต
    builtin: { url: PSCI_APPS_URL, studentOnly: false, lockCloud: true, logo: '', header: null, about: null }
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
  /* ที่อยู่ชีตในไฟล์ต้นฉบับต้องเป็นชีตใบเดียวกับที่ฉบับขึ้นเว็บของวิชานั้นใช้
     เคยพลาดมาแล้ว: ไฟล์ฉบับครูของฟิสิกส์ฝังที่อยู่ชีตวิทยาศาสตร์กายภาพไว้
     ไฟล์ฉบับครูไม่ได้ล็อกการเชื่อมต่อ จึงเติมที่อยู่ให้เฉพาะเครื่องที่ยังไม่มีค่าเก็บไว้
     เครื่องที่ตั้งค่าไว้แล้วไม่โดน — เครื่องที่ครูใช้ทุกวันจึงปกติดี
     แต่เครื่องใหม่หรือเครื่องที่ล้างข้อมูลจะไปคุยกับชีตผิดใบเงียบ ๆ
     ที่นี่เป็นที่เดียวที่รู้ว่าวิชาไหนควรใช้ชีตใบไหน จึงตรวจตรงนี้ */
  const cur = src.match(/const BUILTIN = (\{[\s\S]*?\});/);
  let curUrl = '';
  try { curUrl = cur ? (JSON.parse(cur[1]).url || '') : ''; } catch (e) { curUrl = ''; }
  if (curUrl && curUrl !== (t.builtin.url || '')) {
    console.error('✗ ' + t.src + ' : ที่อยู่ชีตในไฟล์ต้นฉบับไม่ตรงกับชีตของวิชานี้\n' +
      '   ในไฟล์  : ' + curUrl + '\n' +
      '   ควรเป็น : ' + (t.builtin.url || '(ว่าง — วิชานี้ไม่ต่อชีต)') + '\n' +
      '   แก้บล็อก BUILTIN ในไฟล์ต้นฉบับให้ตรงก่อน แล้วสั่งใหม่');
    fail++; continue;
  }

  const eol = src.indexOf('\r\n') >= 0 ? '\r\n' : '\n';
  const builtin = Object.assign({}, t.builtin, { build: BUILD_STAMP, ver: APP_VER });
  const block = ['/* @@BUILTIN@@ */', 'const BUILTIN = ' + JSON.stringify(builtin) + ';',
                 '/* @@BUILTIN-END@@ */'].join(eol);
  fs.writeFileSync(outPath, src.replace(RE, block));

  /* ประทับเลขรุ่นลงไฟล์ต้นฉบับด้วย — ไฟล์ฉบับครู (physics.html ฯลฯ) ถูกเปิดใช้จากเว็บจริง
     ไม่ใช่แค่ไฟล์ตั้งต้นสำหรับสร้างของอื่น ถ้าไม่ประทับ ครูจะเห็นเลขรุ่นเป็น "รุ่นพัฒนา" ตลอด
     ค่าอื่นในบล็อกของไฟล์ต้นฉบับคงไว้ตามเดิมทุกตัว แก้แต่ ver กับ build
     (บล็อกนี้ถูกตัดออกก่อนเทียบไฟล์ใน check.mjs จึงไม่กระทบการตรวจความตรงกัน) */
  let curObj = null;
  try { curObj = cur ? JSON.parse(cur[1]) : null; } catch (e) { curObj = null; }
  if (curObj) {
    const srcBlock = ['/* @@BUILTIN@@ */',
      'const BUILTIN = ' + JSON.stringify(
        Object.assign({}, curObj, { build: BUILD_STAMP, ver: APP_VER })) + ';',
      '/* @@BUILTIN-END@@ */'].join(eol);
    const srcNew = src.replace(RE, srcBlock);
    if (srcNew !== src) fs.writeFileSync(srcPath, srcNew);
  }
  console.log('✓ ' + t.out + '  (' + BUILD_STAMP + ' · studentOnly=' + t.builtin.studentOnly +
    ' · lockCloud=' + t.builtin.lockCloud + ' · ' + (t.builtin.url ? 'ต่อชีต' : 'ออฟไลน์') + ')');
}
/* หน้าปก (index.html ที่รากเว็บ) เป็นไฟล์ที่เสิร์ฟตรง ไม่มีฉบับสร้างใหม่
   และไม่มีบล็อก BUILTIN เพราะไม่ได้เก็บค่าต่อชีตเป็นของตัวเอง
   จึงใช้เครื่องหมายของตัวเองสำหรับประทับเลขรุ่นอย่างเดียว */
const COVER = path.join(ROOT, 'index.html');
const COVER_RE = /\/\* @@VER@@ \*\/[\s\S]*?\/\* @@VER-END@@ \*\//;
try {
  const cv = fs.readFileSync(COVER, 'utf8');
  if (!COVER_RE.test(cv)) {
    console.error('✗ index.html : ไม่พบบล็อก @@VER@@ — ห้ามลบบรรทัดเครื่องหมายนั้น');
    fail++;
  } else {
    const eol = cv.indexOf('\r\n') >= 0 ? '\r\n' : '\n';
    const blk = ['/* @@VER@@ */',
      'const APP_VER = ' + JSON.stringify(APP_VER) + ', BUILD_AT = ' + JSON.stringify(BUILD_STAMP) + ';',
      '/* @@VER-END@@ */'].join(eol);
    const out = cv.replace(COVER_RE, blk);
    if (out !== cv) fs.writeFileSync(COVER, out);
    console.log('✓ index.html  (หน้าปก · ' + APP_VER + ' · ' + BUILD_STAMP + ')');
  }
} catch (e) {
  console.error('✗ index.html : อ่านไฟล์ไม่ได้ — ' + e.message);
  fail++;
}

console.log(fail ? '\nไม่ผ่าน ' + fail + ' รายการ' : '\nเสร็จ · เลขรุ่น ' + APP_VER);
process.exit(fail ? 1 : 0);
