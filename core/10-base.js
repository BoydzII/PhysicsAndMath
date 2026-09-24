window.__LSKEY = LS_KEY;   // ให้ตัวดักหน้าขาวรู้ว่าต้องล้างข้อมูลของวิชาไหน
/* ชื่อวิชาที่แนบไปกับทุกคำสั่งที่ยิงขึ้นชีต
   ชีตเดียวเก็บได้หลายวิชา ฝั่งชีตใช้ค่านี้แยกใบงานและผลของแต่ละวิชาออกจากกัน */
/* สคริปต์ในชีตที่แอปรุ่นนี้ต้องการ — ใช้เตือนตอนทดสอบการเชื่อมต่อ
   ขยับเลขนี้ทุกครั้งที่เพิ่มคำสั่งใหม่ในไฟล์ appsscript-Code.gs */
const GS_VERSION = 17;
const THEORY_LEVEL = 'ทฤษฎี';
const ALL_TOPIC_IDS = TOPICS.map(t => t.id);

/* ค้นเรื่องจาก id ให้เร็ว และรู้ลำดับบทเพื่อใช้เรียงข้อในใบงาน
   หมายเหตุ: id ของเรื่องเดิม (1,2,3) ห้ามเปลี่ยน เพราะชุดโจทย์เก่าอ้างถึงอยู่
   ลำดับที่นักเรียนเห็นจึงคุมด้วยฟิลด์ ch แทน ไม่ใช่ค่า id */
const TOPIC_BY_ID = {};
TOPICS.forEach(t => { TOPIC_BY_ID[t.id] = t; });
function topicOf(id) { return TOPIC_BY_ID[id] || null; }
/** ลำดับบทสำหรับการเรียง — เรื่องพิเศษ (แนวข้อสอบ) ไปอยู่ท้ายสุดเสมอ
    วิชาที่แบ่งบทตามระดับชั้น (มี grade) เรียง ม.1 → ม.3 ก่อน แล้วค่อยเรียงตามบท */
function chOf(id) { const t = topicOf(id); return t ? (t.exam ? 9999 : (t.grade || 0) * 100 + t.ch) : 9998; }

/* เลขประจำตัวนักเรียน = ชื่อผู้ใช้ตอนลงชื่อเข้าใช้
   บังคับให้เป็นตัวเลขล้วนไม่เกิน 5 หลัก เพื่อให้พิมพ์บนไอแพดง่ายและไม่สับสน */
const SID_MAX = 5;
function normSid(v) { return String(v == null ? '' : v).trim().replace(/[^\d]/g, '').slice(0, SID_MAX); }
function validSid(v) { return new RegExp('^\\d{1,' + SID_MAX + '}$').test(String(v == null ? '' : v).trim()); }

/* ประเภทของชุดโจทย์
   practice = แบบฝึกหัด เปิดเฉลยได้ ตรวจทีละข้อทันที
   test     = แบบทดสอบ ไม่มีเฉลย บันทึกคำตอบแล้วค่อยรู้ผลตอนส่ง
              และตัวเลขในโจทย์ต่างจากแบบฝึกหัดด้วย seedShift */
const QUIZ_KINDS = {
  practice: { name: 'แบบฝึกหัด', short: 'ฝึก',   cls: 'l1' },
  test:     { name: 'แบบทดสอบ',  short: 'ทดสอบ', cls: 'l3' }
};
function quizKind(q) { return q && q.kind === 'test' ? 'test' : 'practice'; }
function isTest(q) { return quizKind(q) === 'test'; }
/** เฉลยเปิดดูได้เมื่อเป็นแบบฝึกหัด หรือผู้ใช้เป็นผู้ดูแล (ผู้ดูแลเห็นทุกอย่างเสมอ) */
function canSeeSolution(q) { return !isTest(q) || canManage(); }

function defaultDB() {
  return {
    v: 1,
    mode: 'solo',
    profile: { name: '', room: '', no: '', sid: '' },
    classes: [],
    students: [],
    settings: {
      g: 9.8,                 // ค่า g ในโจทย์ฟิสิกส์ (วิชาที่ไม่มีโจทย์ใช้ g ไม่อ่านค่านี้)
      tolPct: 1,
      easyG10: true,          // ระดับง่ายบังคับใช้ g = 10 ให้คิดเลขในใจได้
      piMode: '3.14',         // ค่า π ที่ใช้ในโจทย์วงกลม ทรงกระบอก กรวย ทรงกลม — '3.14' หรือ '22/7'
      header: { school: 'โรงเรียนปากช่อง จังหวัดนครราชสีมา', teacher: '', term: '' },
      logo: '',               // โลโก้โรงเรียนเป็น data URI (ผู้ใช้อัปโหลดเอง)
      about: {
        dev: 'นายรังสรรค์ กรีกูล',
        dept: SUBJECT_INFO.dept,
        school: 'โรงเรียนปากช่อง จังหวัดนครราชสีมา'
      },
      showCredit: true,       // แสดงชื่อผู้พัฒนาท้ายเอกสารที่พิมพ์
      workLines: {},          // จำนวนบรรทัดของแต่ละช่องในกรอบเขียนวิธีทำ
      passPct: 60,
      autoDraft: true,        // ส่งความคืบหน้าขึ้นชีตอัตโนมัติระหว่างทำ
      /* คุมสอบ — มีผลเฉพาะชุดที่เป็น "แบบทดสอบ" เท่านั้น · 0 ทุกตัว = ปิดทั้งระบบ
         ค่าพวกนี้เป็นแค่ค่าตั้งต้นของกล่องสร้างแบบทดสอบ กติกาจริงติดไปกับตัวชุดโจทย์ */
      examMin: 0,             // เวลาทำแบบทดสอบ (นาที) 0 = ไม่จำกัดเวลา
      examMaxOut: 0,          // ออกจากแอปได้กี่ครั้งก่อนถูกส่งอัตโนมัติ
      examMaxOutSec: 0,       // ออกจากแอปได้รวมกี่วินาทีก่อนถูกส่งอัตโนมัติ
      devLockHr: 2            // เครื่องที่เข้าใช้แล้ว ห้ามเข้าในชื่อคนอื่นกี่ชั่วโมง (0 = ปิด)
    },
    quizzes: [],
    attempts: [],
    // การเชื่อมต่อ Google Sheet — ถ้า url ว่าง แอพทำงานแบบออฟไลน์ล้วนเหมือนเดิมทุกอย่าง
    cloud: { url: '', lastSync: 0 },
    auth: { role: '', token: '', profile: null, exp: 0 },
    outbox: [],              // ผลที่ส่งขึ้นชีตไม่สำเร็จ รอส่งใหม่
    deviceId: '',
    // สถิติการเข้าใช้งานของเครื่องนี้
    usage: { first: 0, last: 0, sessions: 0, days: {}, quizzes: 0, items: 0 },
    cur: { quizId: null, attemptId: null, classId: null, studentId: null, i: 0, statRoom: '', printRoom: '', pg: 'all' }
  };
}
let DB = defaultDB();
let storageOK = true;

function loadDB() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const o = JSON.parse(raw);
      DB = Object.assign(defaultDB(), o);
      DB.settings = Object.assign(defaultDB().settings, o.settings || {});
      const d = defaultDB().settings;
      DB.settings.header = Object.assign({}, d.header, (o.settings || {}).header || {});
      DB.settings.about  = Object.assign({}, d.about,  (o.settings || {}).about  || {});
      DB.usage = Object.assign(defaultDB().usage, o.usage || {});
      if (!DB.usage.days || typeof DB.usage.days !== 'object') DB.usage.days = {};
      DB.profile = Object.assign(defaultDB().profile, o.profile || {});
      DB.cloud = Object.assign(defaultDB().cloud, o.cloud || {});
      DB.auth = Object.assign(defaultDB().auth, o.auth || {});
      DB.outbox = Array.isArray(o.outbox) ? o.outbox : [];
      DB.cur = Object.assign(defaultDB().cur, o.cur || {});
    }
  } catch (e) { console.warn('อ่านข้อมูลเดิมไม่ได้', e); }
  /* ข้อมูลที่บันทึกไว้ก่อนมีระบบคุมสอบจะไม่มีคีย์พวกนี้ ต้องเติมให้ก่อนใช้งาน
     ไม่งั้นค่าจะเป็น undefined แล้วช่องกรอกในกล่องสร้างแบบทดสอบจะว่างเปล่า */
  if (DB.settings.examMin == null) DB.settings.examMin = 0;
  // ข้อมูลที่บันทึกไว้ก่อนมีระบบเรียนรู้ไปพร้อมกันจะไม่มีคีย์นี้
  if (!DB.focus || typeof DB.focus !== 'object') DB.focus = { cur: null, log: [] };
  if (!Array.isArray(DB.focus.log)) DB.focus.log = [];
  if (DB.settings.examMaxOut == null) DB.settings.examMaxOut = 0;
  if (DB.settings.examMaxOutSec == null) DB.settings.examMaxOutSec = 0;
  if (DB.settings.devLockHr == null) DB.settings.devLockHr = 2;
  try {
    localStorage.setItem(LS_KEY + '.probe', '1');
    localStorage.removeItem(LS_KEY + '.probe');
  } catch (e) { storageOK = false; }
}

let saveTimer = null;
function save(immediate) {
  const doIt = () => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(DB));
      const el = $('#saveState');
      if (el) { el.textContent = 'บันทึกแล้ว'; el.className = 'savestate on'; }
    } catch (e) {
      storageOK = false;
      const el = $('#saveState');
      if (el) { el.textContent = 'บันทึกไม่ได้'; el.className = 'savestate'; }
      renderStorageWarn();
    }
  };
  if (immediate) { clearTimeout(saveTimer); doIt(); return; }
  const el = $('#saveState');
  if (el) { el.textContent = 'กำลังบันทึก…'; el.className = 'savestate'; }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(doIt, 350);
}

/** แถบเตือนว่ากำลังดูแบบนักเรียนอยู่ — ต้องเห็นชัดตลอดเวลา
    ไม่งั้นครูลืมว่าอยู่ในโหมดทดลอง แล้วงงว่าทำไมเครื่องมือของครูหายไปหมด */
function renderPreviewBar() {
  const el = $('#previewBar');
  if (!el) return;
  /* โหมดทดลองมีสองแบบ ต้องแยกให้ออกจากกันด้วยสีและข้อความ
     แบบดูเฉย ๆ ไม่แตะชีตเลย · แบบนักเรียนตัวอย่างส่งผลขึ้นชีตจริง
     ถ้าเขียนเหมือนกันครูจะเผลอส่งผลทดสอบปนกับผลจริงโดยไม่รู้ตัว */
  const asSmp = previewSample();
  el.innerHTML = !previewOn() ? '' :
    '<div class="notice ' + (asSmp ? 'bad' : 'warn') +
    '" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
    '<b>' + (asSmp ? '🧪 กำลังทดสอบในชื่อนักเรียนตัวอย่าง' : '👀 กำลังดูแบบนักเรียน') + '</b>' +
    '<span>ชั้น <b>' + esc(PREVIEW.cls || '(ไม่ระบุชั้น)') + '</b></span>' +
    (asSmp ? '<span>ชื่อ <b>' + esc(PREVIEW.smpName || PREVIEW.smpSid) + '</b></span>' : '') +
    '<span class="hint grow">' + (asSmp
      ? 'ส่งงานแล้ว<b>ผลขึ้นชีตจริง</b>ในชื่อนักเรียนตัวอย่าง ใช้ตรวจได้ทั้งวงจร ' +
        'แล้วกดลบผลทดสอบทิ้งได้เมื่อเสร็จ'
      : 'เห็นเหมือนที่นักเรียนห้องนี้เห็นจริง · ทำข้อสอบได้ตามปกติแต่<b>จะไม่ส่งคะแนนขึ้นชีต</b>') +
    '</span>' +
    (asSmp ? '<button class="sm" id="btnSampleClear">🗑️ ลบผลทดสอบ</button>' : '') +
    '<button class="sm primary" id="btnPreviewOff">ออกจากโหมดทดลอง</button></div>';
  const bc = $('#btnSampleClear');
  if (bc) bc.addEventListener('click', sampleClearBox);
  const b = $('#btnPreviewOff');
  if (b) b.addEventListener('click', function () {
    PREVIEW = null;
    MYA = { list: null, loading: false, err: '' };
    renderPreviewBar();
    renderGate();
    render();
    toast('กลับมาเป็นผู้ดูแลแล้ว', 'ok');
  });
}

/** ผู้ดูแลเลือกชั้นแล้วดูหน้าจอแบบนักเรียนห้องนั้น */
async function previewAsStudent() {
  let cls = [];
  try {
    const r = await api('ping', {}, { noToken: true });
    cls = Object.keys(r.classes || {}).map(function (n) { return { name: n, n: r.classes[n] }; });
  } catch (e) {}
  /* เรียงตามระดับชั้นแล้วห้อง ไม่ใช่เรียงตามตัวอักษร
     ไม่งั้น ม.0 กับ ชุมนุม จะขึ้นมาก่อน ม.1 เสมอ */
  const ord = function (n) {
    const m = String(n).match(/(\d+)\s*\/\s*(\d+)/);
    return m ? Number(m[1]) * 1000 + Number(m[2]) : 999999;
  };
  cls.sort(function (a, b) { return ord(a.name) - ord(b.name) || (a.name < b.name ? -1 : 1); });
  if (!cls.length) { toast('ยังอ่านรายชื่อห้องจากชีตไม่ได้ — ตรวจการเชื่อมต่อก่อน', 'bad'); return; }
  // ถามชีตว่านักเรียนตัวอย่างคือใคร ชีตรุ่นเก่ายังไม่รู้จักคำสั่งนี้ ให้เงียบไว้
  let smp = null;
  try { smp = await api('sampleInfo', {}); } catch (e) { smp = null; }
  const hasSmp = !!(smp && smp.sid);
  openModal({
    title: 'ทดลองดูแบบนักเรียน',
    bodyHTML:
      '<div class="hint" style="margin-bottom:11px">เลือกห้องที่จะจำลอง แล้วหน้าจอจะเปลี่ยนเป็น' +
      'แบบที่นักเรียนห้องนั้นเห็นจริง ใช้ตรวจว่า<b>ใบงานที่แจกไปขึ้นหรือยัง</b>ได้ทันที ' +
      'โดยไม่ต้องยืมเลขประจำตัวนักเรียนมาล็อกอิน</div>' +
      '<label class="hint" for="pvCls">ห้อง</label><br>' +
      '<select id="pvCls" style="max-width:100%">' +
      cls.map(function (c) {
        return '<option value="' + esc(c.name) + '">' + esc(c.name) + ' (' + c.n + ' คน)</option>';
      }).join('') + '</select>' +
      /* สองโหมดนี้ต่างกันมากพอที่จะต้องเลือกเอง ไม่ควรเดาให้
         ดูเฉย ๆ = ปลอดภัย ไม่แตะชีต · ทดสอบจริง = ผลขึ้นชีต ต้องลบทีหลัง */
      '<div style="margin-top:15px;display:flex;flex-direction:column;gap:9px">' +
      '<label style="display:flex;gap:9px;align-items:flex-start">' +
      '<input type="radio" name="pvMode" value="look" checked style="margin-top:5px">' +
      '<span><b>ดูเฉย ๆ</b><br><span class="hint">ทำข้อสอบได้ แต่คะแนน' +
      '<b>ไม่ถูกส่งขึ้นชีต</b> ไม่ปนกับผลจริงของนักเรียน</span></span></label>' +
      '<label style="display:flex;gap:9px;align-items:flex-start' +
      (hasSmp ? '' : ';opacity:.5') + '">' +
      '<input type="radio" name="pvMode" value="sample"' + (hasSmp ? '' : ' disabled') +
      ' style="margin-top:5px">' +
      '<span><b>ทดสอบจริงในชื่อนักเรียนตัวอย่าง</b><br><span class="hint">' +
      (hasSmp
        ? 'ส่งงานแล้ว<b>ผลขึ้นชีตจริง</b>ในชื่อ <b>' + esc(smp.name || smp.sid) + '</b> (' +
          esc(smp.cls) + ') ตรวจได้ทั้งวงจรตั้งแต่ทำ ส่ง จนถึงดึงผล ' +
          'แล้วกดลบผลทดสอบทิ้งได้' +
          (smp.works ? '<br><b>ตอนนี้มีผลทดสอบค้างอยู่ ' + smp.works + ' ฉบับ</b>' : '')
        : esc((smp && smp.hint) || 'ชีตยังไม่รองรับ — ต้องอัปเดตสคริปต์ชีตก่อน')) +
      '</span></span></label></div>',
    buttons: [
      { label: 'ยกเลิก' },
      { label: 'เริ่มโหมดทดลอง', cls: 'primary', act: function (close, root) {
          const mode = (root.querySelector('input[name=pvMode]:checked') || {}).value || 'look';
          PREVIEW = { cls: $('#pvCls', root).value || '', sample: mode === 'sample' };
          if (PREVIEW.sample && hasSmp) { PREVIEW.smpSid = smp.sid; PREVIEW.smpName = smp.name; }
          MYA = { list: null, loading: false, err: '' };
          close();
          renderPreviewBar();
          renderGate();
          setTab('make');
          render();
          loadMyAssignments(true);
        } }
    ]
  });
}

/** ลบผลทดสอบของนักเรียนตัวอย่างทั้งหมด — ถามยืนยันก่อนเพราะย้อนกลับไม่ได้ */
async function sampleClearBox() {
  let info = null;
  try { info = await api('sampleInfo', {}); } catch (e) {
    toast('อ่านข้อมูลนักเรียนตัวอย่างไม่ได้ — ' + ((e && e.message) || ''), 'bad'); return;
  }
  if (!info || !info.sid) { toast(info && info.hint ? info.hint : 'ยังไม่มีนักเรียนตัวอย่าง', 'bad'); return; }
  if (!info.works) { toast('ยังไม่มีผลทดสอบให้ลบ', 'ok'); return; }
  const ok = await confirmBox('ลบผลทดสอบ',
    'ลบผลทั้งหมด <b>' + info.works + ' ฉบับ</b> ของ <b>' + esc(info.name || info.sid) + '</b> (' +
    esc(info.cls) + ')<br><span class="hint">ลบเฉพาะแถวของนักเรียนตัวอย่างเท่านั้น ' +
    'ผลของนักเรียนจริงไม่ถูกแตะ · ย้อนกลับไม่ได้</span>', 'ลบผลทดสอบ');
  if (!ok) return;
  try {
    const r = await api('sampleClear', {});
    toast('ลบผลทดสอบแล้ว ' + r.removed + ' ฉบับ', 'ok');
    renderPreviewBar();
    render();
  } catch (e) { toast('ลบไม่สำเร็จ — ' + ((e && e.message) || ''), 'bad'); }
}

function renderStorageWarn() {
  $('#storageWarn').innerHTML = storageOK ? '' :
    '<div class="notice bad">เบราว์เซอร์นี้ไม่อนุญาตให้บันทึกข้อมูลอัตโนมัติ ' +
    '(localStorage ถูกปิด หรือเปิดในโหมดไม่ระบุตัวตน) — ผลการทำแบบฝึกหัดจะหายเมื่อปิดหน้านี้ ' +
    'ให้กด <b>สำรอง</b> เก็บไฟล์ไว้ก่อนปิด</div>';
}

/* --- ตัวช่วยเข้าถึงข้อมูล ------------------------------------------------ */
function curQuiz()   { return DB.quizzes.find(q => q.id === DB.cur.quizId) || null; }
function curAttempt(){ return DB.attempts.find(a => a.id === DB.cur.attemptId) || null; }
function studentById(id) { return DB.students.find(s => s.id === id) || null; }
function classById(id)   { return DB.classes.find(c => c.id === id) || null; }
function studentsOf(classId) {
  return DB.students.filter(s => s.classId === classId).sort((a, b) => (a.no || 0) - (b.no || 0));
}
/** ชื่อผู้ทำของ attempt — รองรับทั้งสองโหมด */
function attemptWho(a) {
  if (a.studentId) { const s = studentById(a.studentId); return s ? s.name : '(ลบแล้ว)'; }
  return a.soloName || DB.profile.name || 'ผู้เรียน';
}
/** ระเบียนนักเรียนของผลการทำนี้ — คืน null ถ้าเป็นโหมดเดี่ยวหรือหาไม่เจอ */
function studentOf(a) { return a && a.studentId ? studentById(a.studentId) : null; }
/** แปลงชื่อห้องให้เป็นรูปแบบมาตรฐาน ม.X/Y และแก้กรณี Google Sheets แปลงเป็นวันที่ */
function normCls(v) {
  if (v == null) return '';
  if (Object.prototype.toString.call(v) === '[object Date]' || (v instanceof Date)) {
    if (!isNaN(v.getTime())) {
      var bkk = new Date(v.getTime() + 7 * 3600 * 1000);
      return 'ม.' + bkk.getUTCDate() + '/' + (bkk.getUTCMonth() + 1);
    }
  }
  var s = String(v).trim();
  if (!s) return '';
  if (/^\d{4}-\d{2}-\d{2}T[\d:.]+Z?$/i.test(s)) {
    var d = new Date(s);
    if (!isNaN(d.getTime())) {
      var bkk = new Date(d.getTime() + 7 * 3600 * 1000);
      return 'ม.' + bkk.getUTCDate() + '/' + (bkk.getUTCMonth() + 1);
    }
  }
  var m = s.match(/^(?:ม\.?|ห้อง)\s*(\d+\/\d+)$/i);
  if (m) return 'ม.' + m[1];
  if (/^\d+\/\d+$/.test(s)) return 'ม.' + s;
  return s;
}

/** แปลงชื่อห้องให้เป็นรูปแบบมาตรฐานเพื่อเปรียบเทียบ เช่น 'ม.4/1' -> '4/1' */
function normRoom(r) {
  return String(normCls(r) || '').replace(/\s+/g, '').replace(/^ห้อง/, '').replace(/^ม\./, '');
}
/** หาชื่อห้องของผลการทำแบบทดสอบ (attempt) */
function attemptRoom(a) {
  if (!a) return '';
  const s = studentOf(a);
  if (s) {
    const c = classById(s.classId);
    if (c && c.name) return c.name;
    if (s.cls) return s.cls;
  }
  if (a.room) return String(a.room).trim();
  const wi = whoInfo(a);
  if (wi && wi.cls) return String(wi.cls).trim();
  return '';
}
/** ข้อมูลประจำตัวสำหรับหัวเอกสาร: {name, no, sid, cls} */
function whoInfo(a) {
  const s = studentOf(a);
  if (s) {
    const c = classById(s.classId);
    return { name: s.name, no: s.no ? String(s.no) : '', sid: String(s.sid || ''), cls: c ? c.name : '' };
  }
  // ไม่มีระเบียนนักเรียน (โหมดเดี่ยว หรือผลที่รวมมาแล้วจับคู่ไม่ได้) ใช้ค่าที่ติดมากับผล
  return {
    name: attemptWho(a),
    no: String((a && a.no) || ''),
    sid: String((a && a.sid) || ''),
    cls: String((a && a.room) || DB.profile.room || '')
  };
}
function quizOf(a) { return DB.quizzes.find(q => q.id === a.quizId) || null; }

/* ============================================================================
   1.4) โลโก้โรงเรียน · ไอคอนหน้าจอโฮม · สถิติการเข้าใช้งาน
   ========================================================================== */

/** อ่านไฟล์รูปแล้วย่อลงให้พอดี เพื่อไม่ให้พื้นที่เก็บข้อมูลของเบราว์เซอร์เต็ม */
function shrinkImage(file, maxSide) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const m = maxSide || 320;
      const sc = Math.min(1, m / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * sc));
      const h = Math.max(1, Math.round(img.height * sc));
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      cv.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      // เก็บเป็น PNG เพื่อรักษาพื้นหลังโปร่งใสของตราโรงเรียน
      res({ url: cv.toDataURL('image/png'), w: img.width, h: img.height });
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('เปิดไฟล์รูปนี้ไม่ได้')); };
    img.src = url;
  });
}

async function pickLogo() {
  const f = await pickFile('image/png,image/jpeg,image/webp,image/*');
  if (!f) return;
  if (f.size > 8 * 1024 * 1024) { toast('ไฟล์ใหญ่เกินไป (เกิน 8 MB)', 'bad'); return; }
  try {
    const r = await shrinkImage(f, 320);
    DB.settings.logo = r.url;
    save(true);
    applyAppIcon();
    renderSetting(); renderBrand();
    toast('ใส่โลโก้เรียบร้อย (ย่อจาก ' + r.w + '×' + r.h + ' พิกเซล)', 'ok');
  } catch (e) { toast(e.message || 'ใส่โลโก้ไม่สำเร็จ', 'bad'); }
}

/** สร้างไอคอนสี่เหลี่ยมจัตุรัสสำหรับหน้าจอโฮม — ไอคอนโปร่งใสจะดูแปลกบนไอแพด จึงใส่พื้นหลังให้ */
function buildAppIcon(size) {
  const S = size || 180;
  const cv = document.createElement('canvas');
  cv.width = S; cv.height = S;
  const g = cv.getContext('2d');

  const grad = g.createLinearGradient(0, 0, S, S);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(1, '#eef2fb');
  g.fillStyle = grad;
  g.fillRect(0, 0, S, S);

  return new Promise(res => {
    const done = () => {
      // แถบชื่อวิชาด้านล่าง ให้ดูออกว่าเป็นแอพอะไรตั้งแต่ยังไม่เปิด
      const bh = Math.round(S * 0.24);
      g.fillStyle = '#2563eb';
      g.fillRect(0, S - bh, S, bh);
      g.fillStyle = '#fff';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = '600 ' + Math.round(bh * 0.52) + 'px "Noto Sans Thai","Sarabun",system-ui,sans-serif';
      g.fillText(SUBJECT_INFO.short, S / 2, S - bh / 2 + 1);
      res(cv.toDataURL('image/png'));
    };
    if (DB.settings.logo) {
      const img = new Image();
      img.onload = () => {
        const area = S * 0.72;
        const sc = Math.min(area / img.width, area / img.height);
        const w = img.width * sc, h = img.height * sc;
        g.drawImage(img, (S - w) / 2, (S * 0.74 - h) / 2 + S * 0.02, w, h);
        done();
      };
      img.onerror = done;
      img.src = DB.settings.logo;
    } else {
      // ไม่มีโลโก้ ใช้สัญลักษณ์แทน
      g.fillStyle = '#2563eb';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = '700 ' + Math.round(S * 0.42) + 'px "Noto Sans Thai","Sarabun",system-ui,sans-serif';
      g.fillText('ฟ', S / 2, S * 0.37);
      g.strokeStyle = '#94a3b8'; g.lineWidth = Math.max(2, S * 0.014);
      g.beginPath(); g.arc(S / 2, S * 0.37, S * 0.29, -0.5, Math.PI + 0.9); g.stroke();
      done();
    }
  });
}

async function applyAppIcon() {
  try {
    const png = await buildAppIcon(180);
    const a = $('#linkAppIcon'), b = $('#linkFavicon');
    if (a) a.href = png;
    if (b) b.href = png;
  } catch (e) { /* ไอคอนไม่ขึ้นไม่ใช่เรื่องคอขาดบาดตาย ปล่อยผ่านได้ */ }
}

/** โลโก้ + ชื่อระบบบนแถบบนสุด */
function renderBrand() {
  const el = $('#brandBox');
  if (!el) return;
  el.innerHTML = (DB.settings.logo
    ? '<img src="' + DB.settings.logo + '" alt="ตราโรงเรียน" class="brandlogo">'
    : '<span class="dot"></span>') + SUBJECT_INFO.title;
}

/* --- สถิติการเข้าใช้งาน --------------------------------------------------- */
function dayKey(ts) {
  const d = new Date(ts == null ? Date.now() : ts);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
/** นับการเปิดใช้งานหนึ่งครั้ง เรียกตอนโหลดแอพ */
function markSession() {
  const u = DB.usage;
  const now = Date.now();
  if (!u.first) u.first = now;
  u.last = now;
  u.sessions = (u.sessions || 0) + 1;
  const k = dayKey(now);
  u.days[k] = (u.days[k] || 0) + 1;
  // เก็บย้อนหลัง 400 วันพอ ไม่ให้ข้อมูลบวมไปเรื่อย ๆ
  const keys = Object.keys(u.days).sort();
  while (keys.length > 400) delete u.days[keys.shift()];
  save();
}
function usageStats() {
  const u = DB.usage, done = DB.attempts.filter(a => a.finishedAt);
  const sec = done.reduce((s, a) => s + a.answers.reduce((t, x) => t + (x.sec || 0), 0), 0);
  const items = done.reduce((s, a) => s + a.answers.length, 0);
  const correct = done.reduce((s, a) => s + a.answers.reduce((t, x) => t + (x.score || 0), 0), 0);
  return {
    first: u.first, last: u.last, sessions: u.sessions || 0,
    activeDays: Object.keys(u.days || {}).length,
    quizzes: done.length, items: items, correct: correct,
    pct: items ? correct / items * 100 : 0,
    sec: sec, days: u.days || {}
  };
}
/** กราฟแท่งจำนวนครั้งที่เปิดใช้ ย้อนหลัง N วัน */
function usageChart(days, n) {
  const N = n || 30;
  const arr = [];
  for (let i = N - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    arr.push({ k: dayKey(d.getTime()), d: d, v: days[dayKey(d.getTime())] || 0 });
  }
  const mx = Math.max(1, Math.max.apply(null, arr.map(x => x.v)));
  const W = 460, H = 150, ox = 30, oy = 112, w = W - ox - 12, h = 88;
  const bw = w / N;
  /* เส้นตารางแนวนอนสองเส้นพอ (ยอดกับครึ่งทาง) แล้วเส้นฐานหนึ่งเส้น
     ของเดิมมีเส้นแกนตั้งด้วย ซึ่งไม่ได้ช่วยอ่านค่าอะไรเลยในกราฟแท่ง */
  let s = '';
  [mx, mx / 2].forEach(function (v) {
    const gy = oy - h * v / mx;
    s += '<line class="cgrid" x1="' + ox + '" y1="' + n1(gy) + '" x2="' + (ox + w) + '" y2="' + n1(gy) + '"/>';
  });
  s += '<line class="caxis" x1="' + ox + '" y1="' + oy + '" x2="' + (ox + w) + '" y2="' + oy + '"/>';
  arr.forEach((x, i) => {
    if (!x.v) return;
    const bh = Math.max(2, h * x.v / mx);
    // เว้นช่อง 2px ระหว่างแท่งด้วยการหักความกว้าง ไม่ใช่ตีเส้นขอบ
    s += '<g><title>' + esc(thDate(x.d.getTime())) + ' — ' + x.v + ' ครั้ง</title>' +
      cBar(ox + i * bw + 1, oy - bh, Math.max(2, bw - 2), bh, 2.5) + '</g>';
  });
  s += svgTxt(ox - 6, oy - h + 4, String(mx), 'end', false, 'cnum');
  s += svgTxt(ox - 6, oy + 4, '0', 'end', false, 'cnum');
  s += svgTxt(ox, oy + 17, thDate(arr[0].d.getTime()), 'start', false, 'clab');
  s += svgTxt(ox + w, oy + 17, 'วันนี้', 'end', false, 'clab');
  s += svgTxt(ox + w / 2, oy + 34, 'จำนวนครั้งที่เปิดใช้งานย้อนหลัง ' + N + ' วัน', 'middle', false, 'clab');
  return svgWrap(W, H, s);
}

/* ============================================================================
   1.5) เชื่อมต่อ Google Sheet ผ่าน Apps Script
   ส่งเป็น text/plain เพื่อให้เบราว์เซอร์ไม่ต้องถาม preflight ก่อน
   (สำคัญมาก เพราะแอพเปิดจากไฟล์ในเครื่อง ซึ่งไม่มี origin)
   ========================================================================== */
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // ตัด I O 0 1 ออกกันอ่านสับสน
function makeCode(n) {
  let s = '';
  const a = new Uint32Array(n || 6);
  (crypto && crypto.getRandomValues) ? crypto.getRandomValues(a) : a.forEach((_, i) => a[i] = Math.random() * 1e9);
  for (let i = 0; i < a.length; i++) s += CODE_ALPHABET[a[i] % CODE_ALPHABET.length];
  return s;
}
/* ── ล็อกเครื่องหลังเข้าใช้ กันการทำข้อสอบให้กัน ────────────────────────
   เก็บแยกคีย์จากข้อมูลแอป เพื่อไม่ให้การกู้คืนไฟล์สำรองหรือล้างข้อมูลแอป
   กลายเป็นปุ่มปลดล็อกที่หาเจอง่าย
   กันได้แค่การหยิบเครื่องมาทำต่อแบบตรงไปตรงมา — ล้างข้อมูลเว็บไซต์ในเครื่อง
   แล้วล็อกหลุด ต้องบอกครูตามนี้ ห้ามให้ครูเข้าใจว่าเป็นด่านที่กันได้จริง  */
const DEVLOCK_KEY = LS_KEY + '.devlock';
function devLockRead() {
  try { return JSON.parse(localStorage.getItem(DEVLOCK_KEY) || 'null'); } catch (e) { return null; }
}
function devLockWrite(v) {
  try {
    if (v) localStorage.setItem(DEVLOCK_KEY, JSON.stringify(v));
    else localStorage.removeItem(DEVLOCK_KEY);
  } catch (e) {}
}
function devLockMs() { return Math.max(0, Math.round(Number(DB.settings.devLockHr) || 0)) * 3600000; }
/** เหลืออีกกี่วินาทีที่เครื่องนี้ยังผูกกับคนเดิม — 0 = เข้าได้ · ส่ง sid ว่างมา = ถามเฉย ๆ */
function devLockLeft(sid) {
  const ms = devLockMs(); if (!ms) return 0;
  const L = devLockRead(); if (!L || !L.sid) return 0;
  if (sid && String(L.sid) === String(sid)) return 0;    // คนเดิมเข้าได้เสมอ
  return Math.max(0, Math.round((L.at + ms - Date.now()) / 1000));
}
/** เวลาที่เหลือแบบคนอ่านรู้เรื่อง — mmss() ให้ "120:00" ซึ่งอ่านผิดเป็น 120 นาทีได้ง่าย */
function devLockText(sec) {
  const m = Math.ceil(Math.max(0, sec) / 60);
  if (m < 60) return m + ' นาที';
  const h = Math.floor(m / 60), r = m % 60;
  return h + ' ชั่วโมง' + (r ? ' ' + r + ' นาที' : '');
}
/** ผูกเครื่องกับคนที่เพิ่งเข้าใช้ — เรียกทุกครั้งที่เข้าสำเร็จ ให้เวลานับใหม่ */
function devLockSet(sid, name) {
  if (!devLockMs()) return;
  devLockWrite({ sid: String(sid || ''), name: String(name || ''), at: Date.now() });
}

/** กล่องให้ครูปลดล็อกเครื่อง — ตรวจรหัสผู้ดูแลกับชีตจริง
    ต้องมีทางนี้เสมอ ไอแพดที่ใช้ร่วมกันหลายคาบจะติดล็อกแน่นอน */
function devLockUnlockBox() {
  openModal({
    title: 'ครูปลดล็อกเครื่องนี้',
    bodyHTML:
      '<div class="hint" style="margin-bottom:11px">เครื่องนี้เพิ่งใช้เข้าสอบในชื่อ <b>' +
      esc((devLockRead() || {}).name || '—') + '</b> จึงยังเข้าใช้ในชื่อคนอื่นไม่ได้<br>' +
      'ถ้าเป็นเครื่องที่ใช้ร่วมกัน ให้ครูใส่รหัสผู้ดูแลเพื่อปลดล็อก</div>' +
      '<label class="hint" for="dlPass">รหัสผู้ดูแล</label>' +
      '<input type="password" id="dlPass" style="width:100%;font-size:16px" autocomplete="current-password">' +
      '<div id="dlMsg" style="margin-top:10px"></div>',
    buttons: [
      { label: 'ยกเลิก' },
      { label: 'ปลดล็อก', cls: 'primary', act: async (close, root) => {
          const msg = $('#dlMsg', root);
          msg.innerHTML = '<div class="hint">กำลังตรวจรหัส…</div>';
          try {
            // ตรวจกับชีตจริง ไม่ใช่รหัสที่ฝังไว้ในหน้าเว็บซึ่งใครก็เปิดดูได้
            await api('adminLogin', { user: '', pass: $('#dlPass', root).value || '' }, { noToken: true });
            devLockWrite(null);
            // renderGate() ไม่วาดซ้ำถ้าโหมดเดิม กล่องเตือนเก่าจะค้างอยู่ ต้องล้างธงก่อน
            GATE.shown = '';
            close(); renderGate();
            toast('ปลดล็อกเครื่องนี้แล้ว', 'ok');
          } catch (e) {
            msg.innerHTML = '<div class="notice bad">' + esc(e.message) + '</div>';
          }
        } }
    ],
    onMount: root => { const p = $('#dlPass', root); if (p) p.focus(); }
  });
}

function deviceId() {
  if (!DB.deviceId) { DB.deviceId = uid(); save(); }
  return DB.deviceId;
}
function cloudOn() { return !!(DB.cloud && DB.cloud.url); }
function authValid() { return !!(DB.auth && DB.auth.token && DB.auth.exp > Date.now()); }
function isAdmin()   { return authValid() && DB.auth.role === 'admin'; }
/* วิชาที่ชีตใบนี้เก็บอยู่ ใช้แสดงเป็นตัวเลือกตอนตั้งสิทธิ์ครูผู้สอนเท่านั้น
   ตัวบังคับจริงคือ SUBJECTS ในไฟล์ appsscript-Code.gs
   เพิ่มวิชาใหม่ต้องเติมทั้งสองที่ ถ้าเติมแต่ฝั่งชีต วิชานั้นจะไม่ขึ้นให้ติ๊ก */
const SHEET_SUBJECTS = [
  { id: 'physics', name: 'ฟิสิกส์' },
  { id: 'physci', name: 'วิทยาศาสตร์กายภาพ' },
  { id: 'ijso', name: 'IJSO สอวน. ม.ต้น' },
  { id: 'math', name: 'คณิตศาสตร์' }
];
function subjectName(id) {
  const s = SHEET_SUBJECTS.find(x => x.id === id);
  return s ? s.name : id;
}
/** ชื่อวิชาที่ครูคนนี้สอน — ว่าง = ทุกวิชา */
function mySubjects() {
  const p = DB.auth && DB.auth.profile;
  return (p && p.subjects && p.subjects.length) ? p.subjects : null;
}
/* ── ครูผู้สอน (แอดมินรอง) ───────────────────────────────────────────────
   ขอบเขตชั้นเรียนที่เห็นตรงนี้ใช้สำหรับ "ปรับหน้าจอ" เท่านั้น
   ตัวบังคับจริงอยู่ฝั่งชีต ซึ่งอ่านขอบเขตจากโทเคนที่เซ็นไว้ แก้จากเบราว์เซอร์ไม่ได้ */
function isSubAdmin() { return isAdmin() && !!(DB.auth.profile && DB.auth.profile.sub); }
function isMainAdmin() { return isAdmin() && !isSubAdmin(); }
/** ชั้นที่ครูคนนี้ดูแล — null = ผู้ดูแลหลัก ดูแลทุกชั้น */
function myClasses() {
  const p = DB.auth && DB.auth.profile;
  return (p && p.classes && p.classes.length) ? p.classes : null;
}
/* ── โหมดทดลองเป็นนักเรียน (สำหรับผู้ดูแล) ──────────────────────────────
   ครูต้องรู้ให้ได้ว่า "แจกไปแล้วนักเรียนเห็นไหม" ก่อนถึงคาบสอน
   ของเดิมต้องยืมเลขประจำตัวนักเรียนมาล็อกอินจริง ซึ่งลำบาก และยังไปติดล็อกเครื่อง
   สองชั่วโมงของระบบกันทำข้อสอบให้กันอีก กว่าจะกลับมาเป็นครูได้
   โหมดนี้พลิกหน้าจอให้เป็นแบบนักเรียนโดยไม่แตะการลงชื่อเข้าใช้เลย
   รายการใบงานดึงด้วยสิทธิ์ครู (assignList) แล้วกรองด้วยกติกาเดียวกับฝั่งชีต
   เก็บไว้ในหน่วยความจำอย่างเดียว ปิดหน้าแล้วหาย และห้ามส่งคำตอบขึ้นชีตเด็ดขาด */
let PREVIEW = null;
function previewOn() { return !!PREVIEW; }
/* กำลังทดสอบในชื่อนักเรียนตัวอย่างอยู่หรือไม่ — ต่างจากการดูเฉย ๆ ที่ไม่แตะชีต
   ต้องมีเลขประจำตัวของนักเรียนตัวอย่างจริงถึงจะนับ ไม่ใช่แค่ติ๊กช่องไว้ */
function previewSample() { return !!(PREVIEW && PREVIEW.sample && PREVIEW.smpSid); }
function isStudent() {
  return previewOn() || (authValid() && DB.auth.role === 'student');
}
/** ออฟไลน์ล้วน = ยังไม่ได้เชื่อมชีต ให้ใช้งานได้ทุกอย่างเหมือนเดิม */
function offlineMode() { return !cloudOn(); }
/** ไฟล์ที่แจกนักเรียนถูกฝังธงนี้ไว้ ทำให้ไม่มีทางเข้าถึงส่วนของผู้ดูแลได้เลย
    ตรวจที่นี่ที่เดียวก็คุมได้ทั้งระบบ เพราะทุกแท็บและทุกปุ่มของผู้ดูแลถามผ่านฟังก์ชันนี้ */
function studentOnlyBuild() { return !!BUILTIN.studentOnly; }
/** ไฟล์ที่วางบนเว็บ — ห้ามตัดการเชื่อมต่อชีต แต่ยัง "ลงชื่อเข้าใช้เป็นผู้ดูแล" ได้
    แยกจาก studentOnly เพราะเดิมสองเรื่องนี้ถูกมัดรวมกัน ทำให้ครูเข้าหน้าผู้ดูแลจากเว็บไม่ได้เลย */
function lockCloudBuild() { return !!BUILTIN.lockCloud; }
function canManage() {
  // อยู่ในโหมดทดลอง ต้องไม่เห็นเครื่องมือของครูเลย ไม่งั้นดูไม่ออกว่านักเรียนเห็นอะไรจริง
  return !previewOn() && !studentOnlyBuild() && (offlineMode() || isAdmin());
}

class ApiError extends Error {
  constructor(msg, isAuth) { super(msg); this.isAuth = !!isAuth; }
}

async function api(action, params, opt) {
  const o = opt || {};
  if (!cloudOn()) throw new ApiError('ยังไม่ได้เชื่อมต่อ Google Sheet');
  const body = Object.assign({ action: action, subject: SUBJECT }, params || {});
  if (!o.noToken && DB.auth.token) body.token = DB.auth.token;

  const ctl = new AbortController();
  // งานที่แตะข้อมูลทั้งก้อนใช้เวลานานกว่าปกติ จึงให้เวลามากขึ้น
  const SLOW = { rosterSave: 90000, rosterList: 60000, rosterReset: 60000, rosterRemove: 60000,
                 resultsList: 90000, assignList: 60000, myAssignments: 45000 };
  const timer = setTimeout(() => ctl.abort(), o.timeout || SLOW[action] || 30000);
  let res;
  try {
    // ปกติยิงไปชีตของวิชานี้ ส่วน opt.url ใช้ตอนต้องสั่งงานชีตใบอื่น
    // (เช่นตั้งรหัสให้ตรงกันทุกใบ) ซึ่งต้องใช้โทเคนของใบนั้นมาด้วย
    res = await fetch(o.url || DB.cloud.url, {
      method: 'POST',
      // ต้องเป็น text/plain เท่านั้น ถ้าใช้ application/json เบราว์เซอร์จะยิง preflight
      // ซึ่ง Apps Script ตอบไม่ได้ แล้วจะเจอ CORS error ทันที
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      redirect: 'follow',
      signal: ctl.signal
    });
  } catch (e) {
    throw new ApiError(e.name === 'AbortError'
      ? 'เชื่อมต่อนานเกินไป — ตรวจสัญญาณอินเทอร์เน็ตแล้วลองใหม่'
      : 'ต่ออินเทอร์เน็ตไม่ได้ หรือ URL ไม่ถูกต้อง');
  } finally { clearTimeout(timer); }

  const text = await res.text();
  let j;
  try { j = JSON.parse(text); }
  catch (e) {
    throw new ApiError('ชีตตอบกลับมาไม่ถูกรูปแบบ — ตรวจว่าเผยแพร่เว็บแอปแบบ ' +
      '"ดำเนินการในชื่อ: ฉัน" และ "ผู้ที่มีสิทธิ์เข้าถึง: ทุกคน" แล้วหรือยัง');
  }
  if (!j.ok) {
    if (j.auth) { clearAuth(); renderGate(); }
    throw new ApiError(j.error || 'ชีตแจ้งข้อผิดพลาด', j.auth);
  }
  return j.data;
}

/** รับช่วงการลงชื่อเข้าใช้จากหน้าพอร์ทัล (index.html หน้าแรกของเว็บ)
    พอร์ทัลกับแอพวางอยู่โดเมนเดียวกัน จึงอ่าน localStorage ก้อนเดียวกันได้
    นักเรียนลงชื่อที่พอร์ทัลครั้งเดียว เข้ามาที่นี่แล้วไม่ต้องลงชื่อซ้ำอีก

    แอปที่ผูกชีตของวิชาไว้ (BUILTIN.url) กับแอปที่ไม่ได้ผูก ทำงานต่างกันสองจุด
    · ไม่ได้มาจากพอร์ทัล: แอปที่ผูกชีตไม่ทำอะไร หน้าเข้าใช้เดิมทำงานตามปกติ
      แอปที่ไม่ได้ผูกชีต ตัดการเชื่อมต่อทิ้งให้กลับเป็นออฟไลน์ล้วน หน้าเข้าใช้จะได้ไม่โผล่มาขวาง
      นักเรียนที่แค่กด "เข้าเลย" จากหน้าแรกโดยไม่ลงชื่อ (ยกเว้นคนที่ลงชื่อในแอปนี้เองไว้และยังไม่หมดอายุ)
    · ที่อยู่ชีต: แอปที่ผูกชีตรับเฉพาะโทเคนของชีตตัวเอง และไม่เขียนทับที่อยู่ที่ตั้งไว้แล้ว
      แอปที่ไม่ได้ผูกชีต ใช้ชีตเดียวกับพอร์ทัลเสมอ */
function adoptPortalSession() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem('pcportal.v1') || 'null'); } catch (e) { s = null; }
  const live = s && s.v === 1 && s.token && s.exp && s.exp > Date.now();
  if (!live) {
    if (!BUILTIN.url && DB.cloud.url && !authValid()) { DB.cloud.url = ''; clearAuth(); save(true); }
    return;
  }
  /* แต่ละวิชามีชีตของตัวเอง ส่วนพอร์ทัลลงชื่อเข้าใช้กับชีตใบเดียว
     โทเคนที่ออกจากชีตอีกใบใช้กับชีตนี้ไม่ได้ เพราะคนละกุญแจกัน
     รับมาก็จะเด้งออกตอนเรียกคำสั่งแรก แล้วขึ้นข้อความที่ไม่บอกสาเหตุ
     ถ้าไม่ใช่ชีตเดียวกัน ให้ข้ามไปเฉย ๆ หน้าเข้าใช้ของแอปจะทำงานตามปกติ */
  /* พอร์ทัลรุ่นใหม่ลงชื่อกับชีตทุกใบ แล้วเก็บโทเคนแยกตามชีตไว้ใน s.tokens
     แอปนี้ต้องหยิบใบที่ตรงกับชีตของตัวเองเท่านั้น ใบอื่นใช้ที่นี่ไม่ได้
     ถ้าเป็นพอร์ทัลรุ่นเก่าที่มีโทเคนใบเดียว ก็ยังใช้ของเดิมได้เหมือนเคย */
  let pTok = s.token, pUrl = s.url;
  if (BUILTIN.url && s.tokens && s.tokens[BUILTIN.url]) {
    pTok = s.tokens[BUILTIN.url];
    pUrl = BUILTIN.url;
  }
  if (BUILTIN.url && pUrl && pUrl !== BUILTIN.url) return;
  // ไฟล์ที่แจกนักเรียนไม่รับสิทธิ์ผู้ดูแลจากพอร์ทัล กันการเข้าถึงส่วนของครูโดยไม่ตั้งใจ
  if (studentOnlyBuild() && s.role === 'admin') return;
  let touched = false;
  if (BUILTIN.url) { if (pUrl && !DB.cloud.url) { DB.cloud.url = pUrl; touched = true; } }
  else if (pUrl && DB.cloud.url !== pUrl) { DB.cloud.url = pUrl; touched = true; }
  // ในเครื่องยังลงชื่อค้างอยู่และยังไม่หมดอายุ ให้ของเดิมมาก่อน
  if (!authValid()) {
    DB.auth = { role: s.role, token: pTok, profile: s.profile || null, exp: s.exp };
    touched = true;
    const p = s.profile || {};
    if (s.role === 'student' && p.sid) {
      DB.mode = 'solo';
      DB.profile = { name: p.name || '', room: normCls(p.cls || ''),
                     no: String(p.no || ''), sid: String(p.sid || '') };
    }
  }
  if (touched) save(true);
}

/** เอาค่าที่ฝังมากับไฟล์มาใช้ตอนเปิดแอพ — เติมเฉพาะช่องที่ยังว่าง ไม่ทับของที่ผู้ใช้ตั้งเอง */
function applyBuiltin() {
  let touched = false;
  // ไฟล์ที่แจกนักเรียนต้องไม่ยอมรับ session ของผู้ดูแลที่ค้างอยู่ในเครื่องเดิม
  // (เกิดได้เวลาครูเปิดทดสอบบนเครื่องตัวเองซึ่งใช้พื้นที่เก็บข้อมูลร่วมกัน)
  if (studentOnlyBuild() && DB.auth && DB.auth.role === 'admin') {
    DB.auth = { role: '', token: '', profile: null, exp: 0 };
    touched = true;
  }
  /* ที่อยู่ชีตที่ฝังมากับไฟล์ ถือเป็นของจริงเสมอสำหรับไฟล์ที่ล็อกการเชื่อมต่อไว้
     เดิมเติมให้เฉพาะเครื่องที่ยังไม่เคยเก็บค่าไว้ เครื่องที่เคยเปิดแอปแล้วจึงค้างอยู่กับ
     ที่อยู่เดิมตลอดไป แม้ครูจะย้ายไปใช้ deployment ใหม่แล้วก็ตาม
     นักเรียนแก้เองไม่ได้ด้วย เพราะช่องแก้ที่อยู่ชีตเปิดให้เฉพาะผู้ดูแล
     ผลคือทั้งห้องยิงไปที่สคริปต์รุ่นเก่าโดยไม่มีใครรู้ตัว
     ไฟล์ที่ไม่ได้ล็อก (ไฟล์ต้นฉบับที่ครูใช้ทดสอบ) ยังเคารพค่าที่ตั้งเองเหมือนเดิม */
  const lockedUrl = BUILTIN.url && lockCloudBuild();
  if (BUILTIN.url && (lockedUrl ? DB.cloud.url !== BUILTIN.url : !DB.cloud.url)) {
    DB.cloud.url = BUILTIN.url; touched = true;
  }
  if (BUILTIN.logo && !DB.settings.logo) { DB.settings.logo = BUILTIN.logo; touched = true; }
  if (BUILTIN.header) {
    Object.keys(BUILTIN.header).forEach(k => {
      if (BUILTIN.header[k] && !String(DB.settings.header[k] || '').trim()) {
        DB.settings.header[k] = BUILTIN.header[k]; touched = true;
      }
    });
  }
  if (BUILTIN.about) {
    Object.keys(BUILTIN.about).forEach(k => {
      if (BUILTIN.about[k] && !String(DB.settings.about[k] || '').trim()) {
        DB.settings.about[k] = BUILTIN.about[k]; touched = true;
      }
    });
  }
  if (touched) save(true);
}

/** ดึงซอร์สของหน้านี้ — เปิดผ่านเว็บใช้ fetch ได้ตรง ๆ ถ้าเปิดจากไฟล์ในเครื่องใช้ภาพถ่ายที่เก็บไว้ */
async function ownSource() {
  try {
    if (location.protocol === 'http:' || location.protocol === 'https:') {
      const r = await fetch(location.href, { cache: 'no-store' });
      const t = await r.text();
      if (t && t.indexOf('@@BUILTIN@@') >= 0) return t;
    }
  } catch (e) { /* ตกไปใช้ภาพถ่ายด้านล่าง */ }
  return PRISTINE_HTML;
}

/** สร้างไฟล์สำหรับแจกนักเรียน โดยเขียนบล็อก BUILTIN ทับด้วยค่าปัจจุบัน */
async function buildStudentFile() {
  const src = await ownSource();
  const a = DB.settings.about || {}, h = DB.settings.header || {};
  const cfg = {
    url: DB.cloud.url || '',
    // ไม่ล็อกเป็น studentOnly เพราะครูต้องเข้าหน้าผู้ดูแลจากลิงก์เว็บได้ด้วย
    // ความปลอดภัยมาจาก lockCloud (ตัดการเชื่อมต่อไม่ได้) + การที่นักเรียนไม่ใช่ผู้ดูแล
    // จึงได้ canManage() = false อยู่แล้วเมื่อเชื่อมชีตอยู่
    studentOnly: false,
    lockCloud: true,
    logo: DB.settings.logo || '',
    header: { school: h.school || '', teacher: h.teacher || '', term: h.term || '' },
    about: { dev: a.dev || '', dept: a.dept || '', school: a.school || '' }
  };
  // '<' ในข้อมูลอาจไปปิดแท็ก script กลางคัน จึงเขียนเป็นรหัสหนีแทน
  const json = JSON.stringify(cfg).replace(/</g, '\\u003c');
  const block = '/* @@BUILTIN@@ */\nconst BUILTIN = ' + json + ';\n/* @@BUILTIN-END@@ */';
  const re = /\/\* @@BUILTIN@@ \*\/[\s\S]*?\/\* @@BUILTIN-END@@ \*\//;
  if (!re.test(src)) throw new Error('หาบล็อกค่าที่ฝังไว้ในไฟล์ไม่เจอ — ไฟล์อาจถูกแก้ไขจนเครื่องหมายหาย');
  return src.replace(re, block);
}

function setAuth(role, token, profile) {
  DB.auth = { role: role, token: token, profile: profile || null,
              exp: Date.now() + 11.5 * 3600 * 1000 };   // เผื่อไว้ให้สั้นกว่าฝั่งชีตเล็กน้อย
  save(true);
}
function clearAuth() {
  DB.auth = { role: '', token: '', profile: null, exp: 0 };
  save(true);
}

/* --- 1.6 หน้าเข้าใช้งาน --------------------------------------------------- */
let GATE = { mode: 'student', busy: false, msg: '' };

function gateMsg(html, kind) {
  const el = $('#gateMsg');
  if (el) el.innerHTML = html ? '<div class="notice ' + (kind || 'bad') + '">' + html + '</div>' : '';
}

function renderGate() {
  const el = $('#gate');
  const logout = $('#btnLogout');
  if (logout) logout.style.display = authValid() ? '' : 'none';

  if (!cloudOn() || authValid()) {
    el.style.display = 'none'; el.innerHTML = ''; GATE.shown = '';
    return;
  }
  // ไฟล์ที่แจกนักเรียนมีแต่หน้าเข้าใช้ของนักเรียนเท่านั้น
  if (studentOnlyBuild()) GATE.mode = 'student';
  // อย่าวาดซ้ำถ้าหน้าเดิมเปิดอยู่แล้ว ไม่งั้นข้อความที่ผู้ใช้กำลังพิมพ์จะหายไป
  if (GATE.shown === GATE.mode) { el.style.display = 'block'; return; }
  GATE.shown = GATE.mode;
  el.style.display = 'block';

  const stu = GATE.mode === 'student';
  const ab = DB.settings.about || {};
  el.innerHTML = '<div class="box">' +
    (DB.settings.logo ? '<img class="glogo" src="' + DB.settings.logo + '" alt="ตราโรงเรียน">' : '') +
    (!studentOnlyBuild() ?
      '<div class="gate-tabs">' +
      '<button type="button" class="gate-tab' + (stu ? ' active' : '') + '" id="tabGateStu">👨‍🎓 สำหรับนักเรียน</button>' +
      '<button type="button" class="gate-tab' + (!stu ? ' active' : '') + '" id="tabGateAdm">👩‍🏫 สำหรับครู / ผู้ดูแล</button>' +
      '</div>' : '') +
    '<h2>' + (stu ? 'ลงชื่อเข้าใช้ (นักเรียน)' : 'เข้าใช้สำหรับครูและผู้ดูแล') + '</h2>' +
    '<div class="lead">' + SUBJECT_INFO.title + '<br>' +
      (stu ? 'ใช้<b>เลขประจำตัวนักเรียน</b>เป็นชื่อผู้ใช้ ' +
             'ถ้ายังไม่เคยเปลี่ยนรหัส ให้ใช้รหัสตั้งต้นที่ครูแจ้ง (1111)'
           : '<b>ครูผู้สอน (แอดมินรอง):</b> กรอกชื่อผู้ใช้และรหัสผ่านที่คุณได้รับ<br>' +
             '<b>ผู้ดูแลหลัก:</b> เว้นว่างช่องชื่อผู้ใช้ แล้วใส่รหัสผ่านผู้ดูแล') + '</div>' +
    (stu
      ? '<label class="f" for="gSid">เลขประจำตัวนักเรียน <span class="hint">(ตัวเลขไม่เกิน ' +
          SID_MAX + ' หลัก)</span></label>' +
        '<input type="text" id="gSid" inputmode="numeric" pattern="[0-9]*" maxlength="' + SID_MAX +
          '" autocomplete="username" placeholder="เช่น 30201">' +
        '<div id="gSidHint" style="display:none;margin-top:6px;font-size:12.5px;color:var(--bad);line-height:1.5"></div>' +
        '<label class="f" for="gPass">รหัสผ่าน</label>' +
        '<input type="password" id="gPass" autocomplete="current-password">'
      : '<label class="f" for="gUser">ชื่อผู้ใช้ <span class="hint">(ครูผู้สอนกรอกที่นี่ · ผู้ดูแลหลักเว้นว่างได้)</span></label>' +
        '<input type="text" id="gUser" autocomplete="username" placeholder="เช่น kruaom (ผู้ดูแลหลักไม่ต้องกรอก)">' +
        '<label class="f" for="gPass">รหัสผ่าน</label>' +
        '<input type="password" id="gPass" autocomplete="current-password">' +
        '<div class="hint" style="margin-top:7px">เข้าไม่ได้? ' +
        'หากเป็นครูผู้สอนให้แจ้งผู้ดูแลหลักเพื่อรีเซ็ตรหัส · ผู้ดูแลหลักให้เปิดชีต → ส่วนขยาย → Apps Script → ' +
        'เลือกฟังก์ชัน <code>resetAdminPassword</code> → กดเรียกใช้</div>') +
    '<div class="actions"><button class="primary grow" id="gGo">' +
      (stu ? 'เข้าสู่ระบบนักเรียน' : 'เข้าสู่ระบบครู / ผู้ดูแล') + '</button></div>' +
    '<div class="msg" id="gateMsg"></div>' +
    /* บอกตั้งแต่ก่อนกรอกว่าเครื่องนี้ยังผูกกับใครอยู่ ดีกว่าให้กรอกจนเสร็จแล้วค่อยถูกปฏิเสธ */
    (stu && devLockLeft('') ? '<div class="notice warn" style="margin-top:9px">' +
      'เครื่องนี้เพิ่งใช้เข้าสอบในชื่อ <b>' + esc((devLockRead() || {}).name || '—') + '</b><br>' +
      'จะเข้าใช้ในชื่อคนอื่นได้อีกครั้งในอีก <b>' + devLockText(devLockLeft('')) + '</b> ' +
      '<a href="#" id="gUnlock">ครูปลดล็อกให้</a></div>' : '') +
    // ลิงก์ท้ายหน้าเข้าใช้ คุมแยกกันสองอัน
    //   gSwap    สลับไปหน้าผู้ดูแล — ซ่อนเฉพาะไฟล์ studentOnly (ต้องใส่รหัสอยู่ดี จึงไม่อันตราย)
    //   gOffline ตัดการเชื่อมต่อชีต — ซ่อนทั้งไฟล์ studentOnly และไฟล์ที่วางบนเว็บ
    //            เพราะถ้านักเรียนเผลอกด ผลที่ทำในรอบนั้นจะไม่ถูกส่งขึ้นชีต
    (function () {
      const links = [];
      if (!studentOnlyBuild()) {
        links.push('<a href="#" id="gSwap">' +
          (stu ? 'สลับไปหน้าเข้าใช้ของครู / ผู้ดูแล' : 'กลับไปหน้าเข้าใช้ของนักเรียน') + '</a>');
        if (!lockCloudBuild()) {
          links.push('<a href="#" id="gOffline">ใช้งานแบบออฟไลน์ (ตัดการเชื่อมต่อชีต)</a>');
        }
      }
      return links.length ? '<div class="alt">' + links.join(' &nbsp;·&nbsp; ') + '</div>' : '';
    })() +
    '<div class="credit">' + [ab.dev ? 'พัฒนาระบบโดย ' + esc(ab.dev) : '',
      esc(ab.dept || ''), esc(ab.school || '')].filter(Boolean).join('<br>') + '</div>' +
    '</div>';

  const un = $('#gUnlock');
  if (un) un.addEventListener('click', e => { e.preventDefault(); devLockUnlockBox(); });

  const tStu = $('#tabGateStu');
  if (tStu) tStu.addEventListener('click', () => { if (GATE.mode !== 'student') { GATE.mode = 'student'; renderGate(); } });
  const tAdm = $('#tabGateAdm');
  if (tAdm) tAdm.addEventListener('click', () => { if (GATE.mode !== 'admin') { GATE.mode = 'admin'; renderGate(); } });

  const sidEl = $('#gSid');
  if (sidEl) {
    const chkSid = () => {
      const v = sidEl.value || '';
      const hEl = $('#gSidHint');
      if (!hEl) return;
      if (/[a-zA-Z]/.test(v)) {
        hEl.style.display = 'block';
        hEl.innerHTML = 'ตรวจพบตัวอักษร — หากคุณเป็นครูผู้สอน <a href="#" id="gSidSwitch" style="font-weight:700;text-decoration:underline">กดที่นี่เพื่อสลับไปหน้าครู</a>';
        const swBtn = $('#gSidSwitch');
        if (swBtn) swBtn.onclick = (e) => {
          e.preventDefault();
          GATE.mode = 'admin';
          GATE.initUser = v.trim();
          renderGate();
        };
      } else {
        hEl.style.display = 'none'; hEl.innerHTML = '';
      }
    };
    sidEl.addEventListener('input', chkSid);
  }

  if (!stu && GATE.initUser) {
    const uEl = $('#gUser');
    if (uEl) { uEl.value = GATE.initUser; }
    GATE.initUser = '';
  }

  const go = async () => {
    if (GATE.busy) return;
    GATE.busy = true;
    const btn = $('#gGo'); btn.disabled = true; btn.textContent = 'กำลังตรวจสอบ…';
    gateMsg('');
    try {
      if (stu) {
        const rawSid = ($('#gSid').value || '').trim();
        if (/[a-zA-Z]/.test(rawSid)) {
          throw new ApiError('เลขประจำตัวนักเรียนต้องเป็นตัวเลขเท่านั้น — หากคุณเป็นครูผู้สอน กรุณาเลือกแท็บ "ครูผู้สอน / ผู้ดูแล" ด้านบน');
        }
        const sid = normSid(rawSid);
        const pass = $('#gPass').value || '';
        if (!sid) throw new ApiError('กรอกเลขประจำตัวเป็นตัวเลข ไม่เกิน ' + SID_MAX + ' หลัก');
        /* กันการทำข้อสอบให้กัน — เครื่องที่เพิ่งใช้สอบ ยังเข้าในชื่อคนอื่นไม่ได้
           ตรวจก่อนยิงไปที่ชีต จะได้ไม่เปลืองรอบและไม่ไปนับรหัสผิดให้เขา */
        const lockLeft = devLockLeft(sid);
        if (lockLeft) {
          throw new ApiError('เครื่องนี้เพิ่งใช้เข้าสอบในชื่อ ' +
            ((devLockRead() || {}).name || '—') + ' จึงยังเข้าใช้ในชื่ออื่นไม่ได้ ' +
            'เหลืออีก ' + devLockText(lockLeft) + ' — ถ้าเป็นเครื่องที่ใช้ร่วมกัน ให้ครูปลดล็อกให้');
        }
        const r = await hubAuth('login', { sid: sid, pass: pass });
        setAuth('student', r.token, r.profile);
        // ผูกโปรไฟล์ในเครื่องให้ตรงกับบัญชี เพื่อให้เอกสารและผลลัพธ์แสดงชื่อถูก
        DB.mode = 'solo';
        DB.profile = { name: r.profile.name || '', room: normCls(r.profile.cls || ''),
                       no: String(r.profile.no || ''), sid: String(r.profile.sid || '') };
        save(true);
        devLockSet(r.profile.sid || sid, r.profile.name || '');
        renderGate(); render();
        if (r.mustChange) forceChangePass();
        else toast('ยินดีต้อนรับ ' + (r.profile.name || ''), 'ok');
      } else {
        const uEl = $('#gUser');
        const userVal = ((uEl ? uEl.value : '') || '').trim();
        let r;
        try {
          r = await hubAuth('adminLogin', { user: userVal, pass: $('#gPass').value || '' });
        } catch (err) {
          if (userVal && (err.message || '').indexOf('รหัสผู้ดูแลไม่ถูกต้อง') >= 0) {
            throw new Error('เข้าใช้งานไม่สำเร็จ: รหัสผ่านไม่ถูกต้อง หรือ Google Apps Script บน Google Drive ยังเป็นเวอร์ชันเก่า (ยังไม่รองรับครูผู้สอน) — ให้ผู้ดูแลหลักนำ appsscript-Code.gs รุ่นล่าสุดไป Deploy เป็นเวอร์ชันใหม่ใน Apps Script');
          }
          throw err;
        }
        const isSub = r.role === 'sub';
        /* ครูที่ถูกจำกัดวิชาไว้ ต้องรู้ตั้งแต่ตอนนี้ว่าเข้าผิดวิชา
           ไม่งั้นจะเข้าได้แต่กดอะไรก็ถูกปฏิเสธทีละคำสั่งจนงง */
        const mySub = isSub ? (r.subjects || []) : [];
        if (mySub.length && mySub.indexOf(SUBJECT) < 0) {
          throw new Error('บัญชีนี้สอน' + mySub.map(subjectName).join(' และ ') +
            ' จึงเข้าใช้วิชานี้ไม่ได้ — เปิดแอปของวิชาที่สอนแทน');
        }
        setAuth('admin', r.token, {
          name: isSub ? (r.name || 'ครูผู้สอน') : 'ผู้ดูแล',
          sub: isSub ? (r.user || '') : '', classes: isSub ? (r.classes || []) : null,
          subjects: mySub
        });
        renderGate(); render();
        if (isSub && r.mustChange) forceChangePass();
        else toast(isSub ? ('เข้าใช้ในฐานะครูผู้สอน · ดูแล ' + (r.classes || []).join(', '))
                         : 'เข้าใช้ในฐานะผู้ดูแลแล้ว', 'ok');
      }
    } catch (e) {
      gateMsg(esc(e.message || String(e)));
    } finally {
      GATE.busy = false;
      const b = $('#gGo'); if (b) { b.disabled = false; b.textContent = stu ? 'เข้าสู่ระบบนักเรียน' : 'เข้าสู่ระบบครู / ผู้ดูแล'; }
    }
  };

  $('#gGo').addEventListener('click', go);
  el.querySelectorAll('input').forEach(i =>
    i.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); go(); } }));
  const sw = $('#gSwap');
  if (sw) sw.addEventListener('click', e => {
    e.preventDefault(); GATE.mode = stu ? 'admin' : 'student'; renderGate();
  });
  const off = $('#gOffline');
  if (off) off.addEventListener('click', async e => {
    e.preventDefault();
    if (!await confirmBox('ใช้งานแบบออฟไลน์',
      'จะ<b>ตัดการเชื่อมต่อ Google Sheet</b> แล้วกลับไปใช้งานในเครื่องอย่างเดียว<br>' +
      'ข้อมูลในเครื่องยังอยู่ครบ และเชื่อมต่อใหม่ได้ทีหลังที่แท็บตั้งค่า', 'ตัดการเชื่อมต่อ')) return;
    DB.cloud.url = ''; clearAuth(); renderGate(); render();
  });
  const first = $('#gSid') || $('#gPass');
  if (first) first.focus();
}

/* ── รหัสเดียวทุกชีต (ชีตรุ่น 18) ──────────────────────────────────────────
   ชีตใบแรกใน BUILTIN.books (วิทยาศาสตร์กายภาพ) เป็นศูนย์กลาง ตรวจรหัสที่นั่นที่เดียว
   ได้ "บัตรผ่าน" อายุสิบนาที แล้วเอาไปแลกเป็นการเข้าใช้ของชีตวิชานี้ โดยชีตนี้ไม่ถามรหัสซ้ำ
   รหัสจึงเหลือชุดเดียว เปลี่ยนที่วิชาไหนก็มีผลทุกวิชา

   ถอยกลับไปตรวจรหัสกับชีตวิชานี้แบบเดิม เมื่อ
     - ชีตยังไม่ได้ตั้งกุญแจร่วม หรือยังเป็นรุ่นเก่า (ไม่รู้จักคำสั่ง)
     - คนนี้ไม่มีชื่อในชีตศูนย์กลาง (เช่นเรียนแค่วิชาเดียว)
     - ต่อชีตศูนย์กลางไม่ได้ชั่วคราว
   แต่ถ้าชีตศูนย์กลางบอกว่า "รหัสผิด" คือจบ ไม่เอารหัสเดียวกันไปลองกับชีตอื่นอีก

   ลงชื่อสำเร็จแล้วเก็บโทเคนของทุกชีตลงก้อนเดียวกับหน้าปก (pcportal.v1)
   เปิดวิชาอื่นต่อจึงไม่ต้องลงชื่อซ้ำ และการเปลี่ยนรหัสตามไปถึงชีตศูนย์กลางได้ */
function hubBooks() { return ((typeof BUILTIN !== 'undefined' && BUILTIN.books) || []).filter(b => b && b.url); }
function hubUrl() { const b = hubBooks(); return b.length ? b[0].url : ''; }
/** ข้อผิดพลาดที่แปลว่า "ทางศูนย์กลางใช้ไม่ได้ ให้กลับไปทางเดิม" */
function hubSoft(e) {
  return /^HUB:|ไม่รู้จักคำสั่ง|ไม่พบเลขประจำตัว|ไม่พบชื่อผู้ใช้|เชื่อมต่อ|อินเทอร์เน็ต|ไม่ถูกรูปแบบ/
    .test(String((e && e.message) || e || ''));
}
async function hubAuth(action, params) {
  const own = DB.cloud.url, hub = hubUrl();
  let h = null;
  if (hub) {
    try { h = await api(action, params, { url: hub, noToken: true }); }
    catch (e) {
      /* ศูนย์กลางที่เชื่อมแล้วบอกว่ารหัสผิด (ข้อความติดคำว่า "ชีตศูนย์กลาง") คือจบ ไม่ลองซ้ำกับชีตอื่น
         ถ้ายังไม่ได้เชื่อม รหัสของชีตวิชานี้อาจเป็นคนละชุด จึงยังต้องลองกับชีตวิชานี้ตามเดิม */
      if (hub === own || /ชีตศูนย์กลาง/.test(e.message || '')) throw e;
      h = null;
    }
  }
  let r = null;
  if (h && hub === own) r = h;
  else if (h && h.hub) {
    try {
      r = await api('hubLogin', { hub: h.hub }, { noToken: true });
      r.mustChange = !!h.mustChange;      // ต้องตั้งรหัสใหม่หรือไม่ ศูนย์กลางเป็นคนรู้
    } catch (e) {
      if (!hubSoft(e)) throw e;
      r = null;
    }
  }
  if (!r) r = await api(action, params, { noToken: true });
  hubRemember(action === 'login' ? 'student' : 'admin', r, h, own, hub);
  return r;
}
/** รวมโทเคนลงก้อนเดียวกับหน้าปก — ถ้าในเครื่องมีคนอื่นลงชื่อค้างอยู่ เริ่มก้อนใหม่ ไม่ปนกัน */
function hubPortalPut(role, prof, tokens) {
  try {
    let s = null;
    try { s = JSON.parse(localStorage.getItem('pcportal.v1') || 'null'); } catch (e) { s = null; }
    const sp = (s && s.profile) || {};
    const same = s && s.v === 1 && s.exp > Date.now() && s.role === role &&
      String(sp.sid || '') === String(prof.sid || '') && String(sp.sub || '') === String(prof.sub || '');
    const n = same ? s : { v: 1, role: role, profile: prof, tokens: {} };
    n.tokens = Object.assign({}, n.tokens || {}, tokens);
    const hub = hubUrl();
    // คีย์เดิม (url · token) ที่แอปรุ่นเก่าอ่าน — ชี้ไปที่ชีตศูนย์กลางถ้ามีโทเคนของใบนั้น
    n.url = hub && n.tokens[hub] ? hub : Object.keys(n.tokens)[0];
    n.token = n.tokens[n.url];
    n.profile = n.profile || prof;
    n.exp = Date.now() + 11.5 * 3600 * 1000;
    localStorage.setItem('pcportal.v1', JSON.stringify(n));
  } catch (e) {}
}
function hubRemember(role, r, h, own, hub) {
  const prof = role === 'student' ? Object.assign({}, r.profile || {}) : {
    name: r.role === 'sub' ? (r.name || 'ครูผู้สอน') : 'ผู้ดูแลหลัก',
    sub: r.role === 'sub' ? (r.user || '') : '', classes: r.classes || null, subjects: r.subjects || null
  };
  const tk = {};
  if (r && r.token && own) tk[own] = r.token;
  if (h && h.token && hub) tk[hub] = h.token;
  hubPortalPut(role, prof, tk);
  // แลกบัตรกับชีตสมาชิกที่เหลือไว้ล่วงหน้า เปิดวิชาอื่นต่อจะได้เข้าได้ทันที — ไม่รอ ไม่เตือนถ้าพลาด
  if (h && h.hub) {
    hubBooks().forEach(function (b) {
      if (b.url === own || b.url === hub) return;
      api('hubLogin', { hub: h.hub }, { url: b.url, noToken: true })
        .then(function (x) { if (x && x.token) { const o = {}; o[b.url] = x.token; hubPortalPut(role, prof, o); } })
        .catch(function () {});
    });
  }
}

/** บังคับตั้งรหัสใหม่ตอนเข้าใช้ครั้งแรก — ปิดหน้าต่างนี้ไม่ได้จนกว่าจะตั้งเสร็จ */
function forceChangePass(optional) {
  const m = openModal({
    title: optional ? 'เปลี่ยนรหัสผ่าน' : 'ตั้งรหัสผ่านใหม่ก่อนเริ่มใช้งาน',
    bodyHTML:
      (optional ? '' :
        '<div class="notice warn" style="margin-bottom:11px">รหัสตั้งต้นเหมือนกันทุกคน ' +
        'ถ้าไม่เปลี่ยน เพื่อนจะเข้าใช้ในชื่อของคุณได้ กรุณาตั้งรหัสใหม่ก่อน</div>') +
      '<label class="hint" for="cpA">รหัสผ่านใหม่ (อย่างน้อย ' + (isSubAdmin() ? 6 : 4) + ' ตัว)</label>' +
      '<input type="password" id="cpA" style="width:100%;font-size:16px">' +
      '<label class="hint" for="cpB" style="display:block;margin-top:9px">พิมพ์ซ้ำอีกครั้ง</label>' +
      '<input type="password" id="cpB" style="width:100%;font-size:16px">' +
      '<div id="cpMsg" style="margin-top:10px"></div>',
    buttons: (optional ? [{ label: 'ยกเลิก' }] : []).concat([
      { label: 'บันทึกรหัสใหม่', cls: 'primary', act: async (close, root) => {
          const a = $('#cpA', root).value || '', b = $('#cpB', root).value || '';
          const msg = $('#cpMsg', root);
          const least = isSubAdmin() ? 6 : 4;
          if (a.length < least) { msg.innerHTML = '<div class="notice bad">รหัสสั้นเกินไป</div>'; return; }
          if (a !== b) { msg.innerHTML = '<div class="notice bad">รหัสสองช่องไม่ตรงกัน</div>'; return; }
          try {
            // ครูผู้สอนเปลี่ยนรหัสของตัวเองผ่านคำสั่งของฝั่งผู้ดูแล ไม่ใช่ของนักเรียน
            const act = isSubAdmin() ? 'adminPass' : 'changePass';
            await api(act, { newPass: a });
            // ตั้งให้ตรงกันทุกชีตในคราวเดียว ไม่งั้นวิชาที่อยู่คนละชีตจะเข้าไม่ได้
            const syn = await passSyncOthers(act, a);
            close();
            toast('เปลี่ยนรหัสผ่านเรียบร้อย' +
              (syn.done ? ' · ตั้งให้ตรงกันอีก ' + syn.done + ' ชีต' : '') +
              (syn.fail ? ' · อีก ' + syn.fail + ' ชีตยังไม่สำเร็จ' : ''),
              syn.fail ? 'warn' : 'ok');
          } catch (e) {
            msg.innerHTML = '<div class="notice bad">' + esc(e.message) + '</div>';
          }
        } }
    ])
  });
  if (!optional) { const x = $('.x', m.root); if (x) x.remove(); }
}

/** ตั้งรหัสใหม่ให้ตรงกันทุกชีต
    ชีตแต่ละใบเก็บรหัสแยกกัน และก็อปแฮชข้ามใบไม่ได้เพราะกุญแจของแต่ละใบไม่เหมือนกัน
    จึงต้องสั่งเปลี่ยนทีละใบด้วยโทเคนของใบนั้น ซึ่งพอร์ทัลเก็บไว้ให้ตอนลงชื่อเข้าใช้
    ทำแบบ "เท่าที่ทำได้" — ใบไหนไม่มีชื่อนักเรียนคนนี้ถือว่าข้าม ไม่ใช่ล้มเหลว
    และไม่ว่าจะพลาดใบไหน ก็ไม่ขวางการเปลี่ยนรหัสของวิชานี้ที่สำเร็จไปแล้ว */
async function passSyncOthers(action, newPass) {
  let s = null;
  try { s = JSON.parse(localStorage.getItem('pcportal.v1') || 'null'); } catch (e) { s = null; }
  const out = { done: 0, skip: 0, fail: 0 };
  if (!s || !s.tokens || !s.exp || s.exp < Date.now()) return out;
  const mine = DB.cloud.url;
  const urls = Object.keys(s.tokens).filter(u => u && u !== mine && s.tokens[u]);
  for (let i = 0; i < urls.length; i++) {
    try {
      await api(action, { newPass: newPass, token: s.tokens[urls[i]] },
                { url: urls[i], noToken: true });
      out.done++;
    } catch (e) {
      if (/ไม่พบ/.test(e.message || '')) out.skip++; else out.fail++;
    }
  }
  return out;
}

async function doLogout() {
  if (!await confirmBox('ออกจากระบบ', 'ออกจากระบบตอนนี้?' +
    (DB.outbox.length ? '<br><b>ยังมีผลค้างส่ง ' + DB.outbox.length + ' รายการ</b> ควรส่งให้เสร็จก่อน' : ''),
    'ออกจากระบบ')) return;
  clearAuth();
  /* ลงชื่อครั้งเดียวใช้ได้ทุกวิชา ออกก็ต้องออกทุกวิชาด้วย
     ไม่งั้นเปิดแอปใหม่ ระบบจะหยิบการลงชื่อที่ค้างอยู่ในก้อนของหน้าปกกลับมาให้เอง */
  try { localStorage.removeItem('pcportal.v1'); } catch (e) {}
  renderGate(); render();
}

/* ============================================================================
   2) แท็บและการวาดหน้าจอ
   ========================================================================== */
let TAB = 'make';
/** แท็บที่แต่ละบทบาทเห็น — นักเรียนไม่ต้องเห็นการสร้างชุดโจทย์และสถิติทั้งห้อง */
const STUDENT_TABS = ['make', 'do', 'result', 'print', 'setting'];
function tabAllowed(t) { return canManage() ? true : STUDENT_TABS.indexOf(t) >= 0; }
function applyTabVisibility() {
  const stu = isStudent();
  $$('#tabs button').forEach(b => {
    const t = b.dataset.tab;
    b.style.display = tabAllowed(t) ? '' : 'none';
    if (t === 'make') b.textContent = stu ? '📋 ใบงานของฉัน' : '📝 สร้างชุดโจทย์';
    else if (t === 'do') b.textContent = '✍️ ทำแบบฝึกหัด';
    else if (t === 'result') b.textContent = stu ? '🎯 ผลของฉัน' : '📊 ผลและวิเคราะห์';
    else if (t === 'stats') b.textContent = '📈 สถิติชั้นเรียน';
    else if (t === 'print') b.textContent = '🖨️ พิมพ์ / PDF';
    else if (t === 'setting') b.textContent = '⚙️ ตั้งค่า';
  });
}
function setTab(t) {
  if (!tabAllowed(t)) t = 'make';
  TAB = t;
  $$('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === t));
  $$('section.tabpane').forEach(s => s.classList.toggle('active', s.id === 'pane-' + t));
  render();
  window.scrollTo(0, 0);
}
/* ── ย่อ/ขยายได้ทุกกล่อง ───────────────────────────────────────────────
   ของเดิมมีปุ่มย่อแค่กล่องเลือกเรื่อง กล่องอื่นย่อไม่ได้เลย
   ตัวนี้เดินหากล่องที่มีหัวเรื่องหลังวาดหน้าเสร็จ แล้วแปะปุ่มให้เอง
   จึงครอบทุกกล่องในทุกแท็บด้วยโค้ดชุดเดียว ไม่ต้องไปแก้ HTML ทีละที่
   และกล่องที่เพิ่มมาในอนาคตก็ได้ปุ่มไปด้วยโดยไม่ต้องทำอะไรเพิ่ม

   คีย์ที่ใช้จำสถานะมาจากข้อความหัวเรื่อง โดยตัดคำโปรยกับป้ายออกก่อน
   หัวเรื่องบางกล่องมีตัวเลขที่เปลี่ยนตามข้อมูล (เช่น "คลังข้อสอบ 12 ข้อ")
   ถ้าไม่ตัดออก สถานะย่อจะหลุดทุกครั้งที่จำนวนเปลี่ยน                    */
const FOLD_KEY = LS_KEY + '.folds';
function foldRead() {
  try { const o = JSON.parse(localStorage.getItem(FOLD_KEY) || '{}');
        return (o && typeof o === 'object') ? o : {}; } catch (e) { return {}; }
}
function foldWrite(o) { try { localStorage.setItem(FOLD_KEY, JSON.stringify(o)); } catch (e) {} }
function foldKeyOf(h3) {
  const c = h3.cloneNode(true);
  c.querySelectorAll('.sub,button,.tag,.pill,.chip').forEach(function (e) { e.remove(); });
  return c.textContent.replace(/[0-9๐-๙]+/g, '#').replace(/\s+/g, ' ').trim().slice(0, 44);
}
/** แปะปุ่มย่อให้ทุกกล่องที่ยังไม่มี แล้วคืนค่าสถานะที่จำไว้ */
function foldify(root) {
  const st = foldRead();
  (root || document).querySelectorAll('.card > h3').forEach(function (h3) {
    const card = h3.parentElement;
    /* กล่องที่มีปุ่มย่อของตัวเองอยู่แล้ว (กล่องเลือกเรื่อง) ปล่อยไว้
       เพราะหัวเรื่องของมันโชว์สรุปว่าเลือกอะไรไว้ ซึ่งดีกว่าปุ่มกลาง ๆ ของเรา */
    if (h3.querySelector('#btnTopicFold') || h3.querySelector('[data-fold]')) return;
    if (!h3.textContent.replace(/\s+/g, '')) return;      // หัวเรื่องว่าง ไม่ต้องมีปุ่ม
    const key = foldKeyOf(h3);
    if (!key) return;
    const on = !!st[key];
    card.classList.toggle('tfold', on);
    const b = document.createElement('button');
    b.className = 'sm foldbtn';
    b.setAttribute('data-fold', key);
    b.type = 'button';
    b.textContent = on ? '▾' : '▴';
    b.title = on ? 'ขยายกล่องนี้' : 'ย่อกล่องนี้';
    h3.appendChild(b);
  });
}
/* ดักที่กรอบนอกทีเดียว ปุ่มถูกสร้างใหม่ทุกครั้งที่วาดหน้า
   ถ้าผูกทีละปุ่มจะหลุดทันทีที่กล่องถูกวาดใหม่ */
document.addEventListener('click', function (e) {
  const b = e.target.closest && e.target.closest('[data-fold]');
  if (!b) return;
  e.preventDefault();
  const key = b.getAttribute('data-fold');
  const st = foldRead();
  const on = !st[key];
  if (on) st[key] = 1; else delete st[key];
  foldWrite(st);
  const card = b.closest('.card');
  if (card) card.classList.toggle('tfold', on);
  b.textContent = on ? '▾' : '▴';
  b.title = on ? 'ขยายกล่องนี้' : 'ย่อกล่องนี้';
});

function render() {
  renderStorageWarn();
  applyTabVisibility();
  renderGate();
  if (!tabAllowed(TAB)) { setTab('make'); return; }
  renderWho();
  // ตัวอย่างเอกสารจะโชว์เฉพาะตอนอยู่แท็บพิมพ์เท่านั้น
  document.body.classList.toggle('docpreview', TAB === 'print');
  if (TAB !== 'print') $('#printarea').innerHTML = '';
  if (TAB === 'make')    renderMake();
  if (TAB === 'do')      renderDo();
  if (TAB === 'result')  renderResult();
  if (TAB === 'stats')   renderStats();
  if (TAB === 'print')   renderPrint();
  if (TAB === 'setting') renderSetting();
  foldify();                 // แปะปุ่มย่อให้กล่องที่เพิ่งวาดเสร็จ
}

/* ── ตัวช่วยที่เดิมมีเฉพาะกลุ่มคณิต (ค่า π · ระดับชั้น · สลับธีม) ใช้ร่วมกันทุกวิชาแล้ว ── */
/* ค่า π ที่ใช้ในโจทย์วงกลม ทรงกระบอก กรวย ทรงกลม
   ครูเลือกได้ในแท็บตั้งค่า และชุดโจทย์แต่ละชุดจำค่าที่ใช้ตอนสร้างไว้
   จึงพิมพ์ใบเฉลยย้อนหลังได้ตรงกับใบงานเสมอ */
const PI_MODES = { '3.14': 3.14, '22/7': 22 / 7 };
function piVal(mode) { return PI_MODES[mode] || 3.14; }
/** ข้อความของ π สำหรับเขียนในเฉลย — '22/7' เขียนเป็นเศษส่วน ไม่ใช่ 3.14 */
function piTxt(mode) { return PI_MODES[mode] ? mode : '3.14'; }
/** ระดับชั้นของเรื่องหนึ่ง — หมวดพิเศษ (แนวข้อสอบ) นับเป็น 0 */
function gradeOf(t) { const o = typeof t === 'object' ? t : topicOf(t); return o ? (o.exam ? 0 : (o.grade || 0)) : 0; }
/** เฉพาะระดับชั้นที่มีเรื่องอยู่จริง — หน้าเลือกเรื่องจะไม่ขึ้นหัวข้อว่างเปล่า */
function gradesInUse() { return GRADES.filter(g => TOPICS.some(t => gradeOf(t) === g.id)); }
/* ============================================================
   UI Theme Style Controller (Vibrant EdTech & Minimal Focus Mode)
   ============================================================ */
function getThemeStyle() {
  try { return localStorage.getItem('ui_theme_style') || 'vibrant'; } catch(e) { return 'vibrant'; }
}
function applyThemeStyle(style) {
  if (style === 'minimal') {
    document.documentElement.setAttribute('data-theme-style', 'minimal');
  } else {
    document.documentElement.removeAttribute('data-theme-style');
  }
  try { localStorage.setItem('ui_theme_style', style); } catch(e) {}
  updateThemeSwitcherUI();
}
function toggleThemeStyle() {
  const cur = getThemeStyle();
  const next = cur === 'minimal' ? 'vibrant' : 'minimal';
  applyThemeStyle(next);
  toast(next === 'minimal' ? '🎯 เปิดโหมดโฟกัส (คลีนมินิมอล)' : '✨ เปิดโหมดสีสันสดใส (Modern EdTech)', 'ok');
}
function updateThemeSwitcherUI() {
  const btn = $('#btnThemeStyle');
  if (!btn) return;
  const cur = getThemeStyle();
  if (cur === 'minimal') {
    btn.innerHTML = '🎯 <span class="theme-label">มินิมอล</span>';
    btn.title = 'คลิกเพื่อสลับเป็นโหมดสีสันสดใส (Modern EdTech)';
    btn.classList.add('on');
  } else {
    btn.innerHTML = '✨ <span class="theme-label">สีสันสดใส</span>';
    btn.title = 'คลิกเพื่อสลับเป็นโหมดโฟกัสคลีนมินิมอล';
    btn.classList.remove('on');
  }
}

