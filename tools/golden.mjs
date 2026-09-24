// ภาพถ่ายพฤติกรรมของแอปคลังโจทย์ทุกวิชา — ใช้เทียบก่อน/หลังแก้เอนจิน
//
//   node tools/golden.mjs --save            ถ่ายภาพเก็บไว้ใน .golden/ (ไม่ขึ้น git)
//   node tools/golden.mjs --diff            ถ่ายใหม่แล้วเทียบกับที่เก็บไว้ บอกว่ารายการไหนเปลี่ยน
//   node tools/golden.mjs --show <วิชา> <คีย์>   พิมพ์เนื้อเต็มของรายการนั้นจากไฟล์ปัจจุบัน
//   เติมชื่อวิชาต่อท้ายเพื่อทำเฉพาะวิชานั้น เช่น  --diff physics math
//
// ทำไมต้องมี — กำลังรวมโค้ดของแปดวิชาให้เหลือแกนเดียว ทุกขั้นต้องพิสูจน์ได้ว่า
// โจทย์ ตัวเลข ตัวลวง วิธีทำ การตรวจคำตอบ ค่าตั้ง และเอกสารที่พิมพ์ ยังเหมือนเดิมทุกข้อ
// selftest บอกได้แค่ว่า "ยังถูกต้อง" แต่ไม่รู้ว่า "เปลี่ยนไปจากเดิม" หรือเปล่า
//
// เก็บเป็นลายนิ้วมือ (sha1) ต่อรายการ ไฟล์จึงเล็ก ถ้ารายการไหนเปลี่ยน ใช้ --show ดูเนื้อปัจจุบัน
// แล้ว checkout คอมมิตเดิมมารัน --show คีย์เดียวกันเพื่อเทียบ

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { loadApp } from './appctx.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '.golden');

export const SUBJECTS = {
  physics:    'PhysicsAutoSheet/physics.html',
  physci:     'PhysicalScienceAutoSheet/physci.html',
  ijso:       'IJSOAutoSheet/ijso.html',
  chem:       'ChemistryAutoSheet/chem.html',
  math:       'MathAutoSheet/math.html',
  science:    'ScienceAutoSheet/science.html',
  bio:        'BiologyAutoSheet/bio.html',
  foundation: 'PhysicsFoundation/foundation.html'
};

const SEEDS = 10;
// ค่าตั้งที่ส่งให้ buildProblem — ส่งทั้ง g และ piMode ทุกวิชา วิชาที่ไม่ใช้ค่าไหนก็ไม่อ่านค่านั้น
// หลังรวมเอนจินแล้วตัวเดียวจะอ่านทั้งสองค่า ผลต้องยังเหมือนเดิม
const CFGS = [
  { g: 9.8, piMode: '3.14' },
  { g: 10, piMode: '22/7' },
  { g: 9.8, easyG10: true, piMode: '3.14' }
];
// คำตอบที่นักเรียนพิมพ์จริง (ชุดเดียวกับที่ทดสอบใน PR #16)
const RAW_INPUTS = ['12.5', '3,5', '1,000', '12,345.6', '1/2', '-3/4', '2 1/2', '−5', '๒๕', '3x10^5',
  '3×10⁵', '2.4x10⁻³', '3.2e-4', '5 m/s', '20 นิวตัน', '.5', '1 000', '+7', 'abc', '', '9.8 m/s²'];

/* ---------- ทำให้ผลซ้ำได้ทุกครั้ง: ตรึงเวลาและตัวสุ่มของระบบ ---------- */
const FIXED = Date.UTC(2026, 8, 1, 3, 0, 0);
function pinWorld() {
  const RealDate = globalThis.__RealDate || Date;
  globalThis.__RealDate = RealDate;
  class FixedDate extends RealDate {
    constructor(...a) { if (a.length) super(...a); else super(FIXED); }
    static now() { return FIXED; }
  }
  globalThis.Date = FixedDate;
  let s = 20260901;
  Math.random = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x80000000; };
}

function stable(v) {
  const seen = new WeakSet();
  return JSON.stringify(v, function (k, x) {
    if (typeof x === 'function') return '[fn]';
    if (x && typeof x === 'object') {
      if (seen.has(x)) return '[cycle]';
      seen.add(x);
      if (!Array.isArray(x)) {
        const o = {};
        Object.keys(x).sort().forEach(kk => { o[kk] = x[kk]; });
        return o;
      }
    }
    return x;
  });
}
const sha = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 16);

/** คืนรายการ [คีย์, เนื้อ] ทั้งหมดของวิชาหนึ่ง */
export function snapshot(file) {
  pinWorld();
  const app = loadApp(path.join(ROOT, file));
  const get = app.get;
  const out = [];
  const put = (k, v) => out.push([k, typeof v === 'string' ? v : stable(v)]);
  const tryPut = (k, f) => { try { put(k, f()); } catch (e) { put(k, 'ERROR ' + e.message); } };

  // สิทธิ์ครู — เอกสารบางฉบับพิมพ์ได้เฉพาะครู
  try { get('canManage = function () { return true; }'); } catch (e) { /* ไม่มีก็ข้าม */ }

  const TPL = get('TPL') || [];
  const build = get('buildProblem'), solHTML = get('solutionHTML');
  const checkAns = get('checkAns'), checkNum = get('checkNum'), parseNum = get('parseNum');
  const grade = (raw, f) => typeof checkAns === 'function' ? !!checkAns(raw, f) : !!checkNum(parseNum(raw), f.value);

  // 1) ทุกแม่แบบ × ค่าตั้ง × ชุดตัวเลข — โจทย์ เฉลย ตัวลวง วิธีทำ และผลตรวจคำตอบ
  // แม่แบบที่ id ซ้ำกัน: T() เก็บตัวหลังสุดลง TPL_BY_ID ตัวก่อนหน้าจึงไม่มีทางถูกสุ่มออกมา
  // ภาพถ่ายบันทึกตามพฤติกรรมจริง (สร้างจาก id) แต่ต่อท้ายคีย์ด้วย #ลำดับ ไม่ให้ทับกัน และรายงานไว้
  const seenId = {};
  TPL.forEach(t => {
    seenId[t.id] = (seenId[t.id] || 0) + 1;
    const tag = seenId[t.id] > 1 ? '#' + seenId[t.id] : '';
    if (tag) put('dup-id ' + t.id + tag, String(t.desc || ''));
    CFGS.forEach((cfg, ci) => {
      for (let s = 1; s <= SEEDS; s++) {
        const key = 'tpl ' + t.id + tag + ' c' + ci + ' s' + s;
        let p = null;
        try { p = build(t.id, s * 104729, cfg); } catch (e) { put(key, 'ERROR ' + e.message); continue; }
        if (!p) { put(key, 'null'); continue; }
        let sol = '';
        try { sol = solHTML ? solHTML(p, true) : ''; } catch (e) { sol = 'ERROR ' + e.message; }
        const grades = (p.finds || []).map(f => {
          if (f.sur || typeof f.value !== 'number') return null;
          const v = f.value;
          return [String(v), String(+(v * 1.004).toPrecision(6)), String(+(v * 1.03).toPrecision(6)), '0', String(-v)]
            .map(r => { try { return grade(r, f) ? 1 : 0; } catch (e) { return 'E'; } }).join('');
        });
        put(key, stable({ p, sol, grades }));
      }
    });
  });

  // 2) การอ่านคำตอบที่พิมพ์มาหลายแบบ
  tryPut('parse', () => RAW_INPUTS.map(r => { const v = parseNum(r); return v == null ? null : +(+v).toPrecision(12); }));

  // 3) ค่าตั้งเริ่มต้น และการโหลดข้อมูลเก่าที่ยังไม่มีคีย์ใหม่ ๆ
  tryPut('defaultDB', () => get('defaultDB')());
  tryPut('loadDB.old', () => {
    const LS = get('LS_KEY');
    localStorage.setItem(LS, JSON.stringify({ v: 1, quizzes: [], attempts: [], settings: { tolPct: 3, header: { school: 'โรงเรียนทดสอบ' } }, cur: { tab: 'do' } }));
    get('loadDB')();
    return get('DB');
  });

  // 4) ชุดโจทย์ตัวอย่าง ผลการทำ การวิเคราะห์ และเอกสารที่พิมพ์
  tryPut('fixture', () => {
    const DB = get('DB');
    get('loadDB')();
    const TOPICS = get('TOPICS'), LEVELS = get('LEVELS');
    const counts = {}; LEVELS.forEach(l => { counts[l] = 2; });
    const q = get('createQuiz')({ seed: 4242, title: 'ชุดทดสอบภาพถ่าย', topics: TOPICS.slice(0, 2).map(x => x.id), counts, kind: 'practice' });
    if (q.error) return 'createQuiz error ' + q.error;
    const D = get('DB');
    D.quizzes.push(q);
    const mk = (name, no, frac, day) => {
      const a = { id: 'at' + no, quizId: q.id, studentId: null, soloName: name, no: String(no), sid: '1000' + no, room: '4/1',
        startedAt: FIXED - day * 864e5 - 6e5, finishedAt: FIXED - day * 864e5,
        answers: q.items.map((it, i) => ({ raw: [], pick: null, checked: true, score: i < q.items.length * frac ? 1 : 0,
          tries: 1, revealed: false, sec: 30 + i, text: '', rub: null })) };
      D.attempts.push(a); return a;
    };
    const A = [mk('สมชาย ใจดี', 1, 1, 1), mk('สมหญิง รักเรียน', 2, 0.5, 2), mk('ปิติ มานะ', 3, 0.2, 3)];
    const docs = {};
    const opt = { quizId: q.id, attemptId: A[1].id, withSteps: true, onePer: false, density: 'normal', room: '', showDate: true };
    ['worksheet', 'answerkey', 'evidence', 'classreport'].forEach(k => {
      try { docs[k] = get('buildDoc')(k, opt); } catch (e) { docs[k] = 'ERROR ' + e.message; }
    });
    try { docs.classreportNoDate = get('buildDoc')('classreport', Object.assign({}, opt, { showDate: false })); } catch (e) { docs.classreportNoDate = 'ERROR ' + e.message; }
    const an = A.map(a => { const r = get('analyze')(a); delete r.quiz; return r; });
    return { quiz: q, analyze: an, docs };
  });

  return out;
}

/* ---------- คำสั่ง ---------- */
const args = process.argv.slice(2);
const mode = args[0];
if (import.meta.url === 'file://' + process.argv[1].replace(/\\/g, '/') || mode) {
  if (!['--save', '--diff', '--show'].includes(mode)) {
    console.log('ใช้: node tools/golden.mjs --save | --diff | --show <วิชา> <คีย์>  [ชื่อวิชา ...]');
    process.exit(2);
  }
  if (mode === '--show') {
    const [subj, ...kp] = args.slice(1);
    const key = kp.join(' ');
    const hit = snapshot(SUBJECTS[subj]).find(([k]) => k === key);
    console.log(hit ? hit[1] : 'ไม่พบคีย์ ' + key);
    process.exit(0);
  }
  const pick = args.slice(1).filter(a => SUBJECTS[a]);
  const list = pick.length ? pick : Object.keys(SUBJECTS);
  if (mode === '--save') fs.mkdirSync(OUT, { recursive: true });
  let changed = 0;
  for (const subj of list) {
    const t0 = globalThis.__RealDate ? globalThis.__RealDate.now() : Date.now();
    const rows = snapshot(SUBJECTS[subj]).map(([k, v]) => k + '\t' + sha(v));
    const file = path.join(OUT, subj + '.txt');
    const secs = (((globalThis.__RealDate || Date).now() - t0) / 1000).toFixed(1);
    const dups = rows.filter(r => r.startsWith('dup-id ')).map(r => r.split('\t')[0].slice(7));
    if (dups.length) console.log('   ⚠ ' + subj + ' มีแม่แบบ id ซ้ำ (ตัวก่อนหน้าสุ่มไม่ออก): ' + dups.join(' · '));
    if (mode === '--save') {
      fs.writeFileSync(file, rows.join('\n') + '\n');
      console.log('✓ ' + subj.padEnd(11) + rows.length + ' รายการ  (' + secs + ' วิ)');
      continue;
    }
    if (!fs.existsSync(file)) { console.log('–  ' + subj + ' : ยังไม่มีภาพถ่าย สั่ง --save ก่อน'); continue; }
    const old = new Map(fs.readFileSync(file, 'utf8').trim().split('\n').map(l => l.split('\t')));
    const now = new Map(rows.map(l => l.split('\t')));
    const diff = [], gone = [], added = [];
    old.forEach((h, k) => { if (!now.has(k)) gone.push(k); else if (now.get(k) !== h) diff.push(k); });
    now.forEach((h, k) => { if (!old.has(k)) added.push(k); });
    const n = diff.length + gone.length + added.length;
    changed += n;
    if (!n) { console.log('✓ ' + subj.padEnd(11) + now.size + ' รายการ ไม่เปลี่ยน  (' + secs + ' วิ)'); continue; }
    console.log('✗ ' + subj.padEnd(11) + 'เปลี่ยน ' + diff.length + ' · หาย ' + gone.length + ' · เพิ่ม ' + added.length);
    diff.slice(0, 15).forEach(k => console.log('     ~ ' + k));
    gone.slice(0, 5).forEach(k => console.log('     - ' + k));
    added.slice(0, 5).forEach(k => console.log('     + ' + k));
    if (n > 25) console.log('     … อีก ' + (n - Math.min(diff.length, 15) - Math.min(gone.length, 5) - Math.min(added.length, 5)) + ' รายการ');
  }
  if (mode === '--diff') {
    console.log(changed ? '\nมีรายการเปลี่ยน ' + changed + ' รายการ — ตรวจว่าตั้งใจทุกรายการ' : '\nไม่มีอะไรเปลี่ยน');
    process.exit(changed ? 1 : 0);
  }
  // แอปตั้งตัวจับเวลาไว้ (บันทึกอัตโนมัติ นาฬิกา) Node จะค้างรอไม่จบ ต้องสั่งออกเอง
  process.exit(0);
}
