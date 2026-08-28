/**
 * ห้องเรียนสมดุลกล — ฝั่ง Google Sheet
 * โรงเรียนปากช่อง จังหวัดนครราชสีมา
 *
 * ใช้คู่กับไฟล์ EquilibriumLab/equilibrium.html
 *
 * ── วิธีติดตั้ง (ทำครั้งเดียว) ────────────────────────────────────────────
 *   1. สร้าง Google Sheet ใหม่ ตั้งชื่ออะไรก็ได้
 *   2. เมนู  ส่วนขยาย → Apps Script
 *   3. ลบโค้ดเดิมทั้งหมด แล้ววางไฟล์นี้ลงไป กดบันทึก
 *   4. กด  ทำให้ใช้งานได้ → การทำให้ใช้งานได้ใหม่ → ประเภท: เว็บแอป
 *        ดำเนินการในชื่อ      : ฉัน
 *        ผู้ที่มีสิทธิ์เข้าถึง : ทุกคน            ← สำคัญมาก ถ้าไม่ตั้ง แอปจะเชื่อมไม่ได้
 *   5. กดอนุญาตสิทธิ์ในครั้งแรก แล้วคัดลอกที่อยู่ที่ลงท้ายด้วย /exec
 *   6. เอาที่อยู่นั้นไปวางในแอป → หน้าครู → แท็บ "เชื่อม Google Sheet"
 *
 * แผ่นงาน Roster และ Results จะถูกสร้างให้เองในการเรียกครั้งแรก
 *
 * ── ข้อจำกัดที่ต้องรู้ ────────────────────────────────────────────────────
 *   เว็บแอปนี้เปิดให้ "ทุกคน" เรียกได้ (จำเป็น เพราะนักเรียนไม่ได้ล็อกอินกูเกิล)
 *   รหัสเข้าเรียนจึงเป็น "กุญแจสะดวก" ไม่ใช่ระบบยืนยันตัวตนระดับความปลอดภัยสูง
 *   เหมาะกับการเก็บคะแนนในชั้นเรียน ไม่ควรใช้เก็บข้อมูลอ่อนไหว
 */

var SHEET_ROSTER  = 'Roster';
var SHEET_RESULTS = 'Results';

var ROSTER_HEAD = ['subject', 'code', 'sid', 'name', 'room', 'no', 'updatedAt'];
var RESULT_HEAD = ['at', 'subject', 'code', 'sid', 'name', 'room', 'no', 'mode',
                   'n', 'score', 'max', 'pct', 'sec', 'units', 'xp', 'level', 'device', 'ver'];

/* ────────────────────────────────────────────────────────────── ทางเข้า ── */

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, data: { msg: 'EquilibriumLab endpoint พร้อมใช้งาน' } }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var out;
  try {
    var body = JSON.parse(e.postData.contents);
    out = { ok: true, data: route(body) };
  } catch (err) {
    out = { ok: false, error: String(err && err.message ? err.message : err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function route(b) {
  var subject = String(b.subject || 'equilibrium');
  switch (String(b.action || '')) {
    case 'ping':        return apiPing(subject);
    case 'codeLogin':   return apiCodeLogin(subject, b);
    case 'rosterSave':  return apiRosterSave(subject, b);
    case 'rosterList':  return apiRosterList(subject);
    case 'submit':      return apiSubmit(subject, b);
    case 'resultsList': return apiResultsList(subject);
    default: throw new Error('ไม่รู้จักคำสั่ง: ' + b.action);
  }
}

/* ─────────────────────────────────────────────────────── ตัวช่วยกับชีต ── */

function sheetOf(name, head) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  if (sh.getLastColumn() < head.length) {
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold');
  }
  return sh;
}

/** อ่านทั้งแผ่นออกมาเป็นอาเรย์ของอ็อบเจกต์ ตามหัวตารางแถวแรก */
function readAll(sh) {
  var last = sh.getLastRow();
  if (last < 2) return { head: headOf(sh), rows: [] };
  var head = headOf(sh);
  var vals = sh.getRange(2, 1, last - 1, head.length).getValues();
  var rows = vals.map(function (v, i) {
    var o = { _row: i + 2 };
    head.forEach(function (h, k) { o[h] = v[k]; });
    return o;
  });
  return { head: head, rows: rows };
}

function headOf(sh) {
  return sh.getRange(1, 1, 1, Math.max(1, sh.getLastColumn())).getValues()[0]
    .map(function (x) { return String(x); });
}

function normCode(s) {
  return String(s == null ? '' : s).toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/* ────────────────────────────────────────────────────────────── คำสั่ง ── */

function apiPing(subject) {
  var r = readAll(sheetOf(SHEET_ROSTER, ROSTER_HEAD));
  var s = readAll(sheetOf(SHEET_RESULTS, RESULT_HEAD));
  var mine = function (x) { return String(x.subject || '') === subject; };
  return {
    ok: true,
    roster: r.rows.filter(mine).length,
    results: s.rows.filter(mine).length,
    time: new Date().toISOString()
  };
}

/** ตรวจรหัสเข้าเรียน แล้วคืนข้อมูลนักเรียนกลับไปให้แอปเติมชื่ออัตโนมัติ */
function apiCodeLogin(subject, b) {
  var code = normCode(b.code);
  if (!code) throw new Error('ไม่ได้ส่งรหัสเข้าเรียนมา');
  var r = readAll(sheetOf(SHEET_ROSTER, ROSTER_HEAD));
  var hit = null;
  r.rows.forEach(function (x) {
    if (String(x.subject || '') === subject && normCode(x.code) === code) hit = x;
  });
  if (!hit) throw new Error('ไม่พบรหัสนี้ในรายชื่อของชีต');
  return {
    name: String(hit.name || ''), room: String(hit.room || ''),
    no: String(hit.no || ''), sid: String(hit.sid || ''),
    token: Utilities.base64EncodeWebSafe(subject + '|' + code + '|' + Date.now()),
    exp: Date.now() + 12 * 3600 * 1000
  };
}

/** ส่งรายชื่อขึ้นชีต — รหัสเดิมที่มีอยู่แล้วจะถูกอัปเดตทับ ไม่เกิดแถวซ้ำ */
function apiRosterSave(subject, b) {
  var rows = b.rows || [];
  if (!rows.length) return { added: 0, updated: 0 };
  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    var sh = sheetOf(SHEET_ROSTER, ROSTER_HEAD);
    var cur = readAll(sh);
    var index = {};
    cur.rows.forEach(function (x) {
      if (String(x.subject || '') === subject) index[normCode(x.code)] = x._row;
    });
    var now = new Date();
    var added = 0, updated = 0, appends = [];
    rows.forEach(function (r) {
      var code = normCode(r.code);
      if (!code) return;
      var line = [subject, code, String(r.sid || ''), String(r.name || ''),
                  String(r.room || ''), String(r.no || ''), now];
      if (index[code]) {
        sh.getRange(index[code], 1, 1, ROSTER_HEAD.length).setValues([line]);
        updated++;
      } else {
        appends.push(line);
        index[code] = -1;                     /* กันซ้ำภายในก้อนเดียวกัน */
        added++;
      }
    });
    if (appends.length) {
      sh.getRange(sh.getLastRow() + 1, 1, appends.length, ROSTER_HEAD.length).setValues(appends);
    }
    return { added: added, updated: updated };
  } finally {
    lock.releaseLock();
  }
}

function apiRosterList(subject) {
  var r = readAll(sheetOf(SHEET_ROSTER, ROSTER_HEAD));
  return {
    rows: r.rows.filter(function (x) { return String(x.subject || '') === subject; })
      .map(function (x) {
        return { code: String(x.code || ''), sid: String(x.sid || ''), name: String(x.name || ''),
                 room: String(x.room || ''), no: String(x.no || '') };
      })
  };
}

/** รับผลการทำแบบฝึกหัด/แบบทดสอบจากนักเรียนหนึ่งครั้ง */
function apiSubmit(subject, b) {
  var p = b.payload || {};
  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    var sh = sheetOf(SHEET_RESULTS, RESULT_HEAD);
    var line = [
      p.at || new Date().toISOString(), subject, normCode(p.code), String(p.sid || ''),
      String(p.name || ''), String(p.room || ''), String(p.no || ''), String(p.mode || ''),
      Number(p.n || 0), Number(p.score || 0), Number(p.max || 0), Number(p.pct || 0),
      Number(p.sec || 0), String(p.units || ''), Number(p.xp || 0), Number(p.level || 0),
      String(p.device || ''), String(p.ver || '')
    ];
    sh.getRange(sh.getLastRow() + 1, 1, 1, RESULT_HEAD.length).setValues([line]);
    return { saved: true };
  } finally {
    lock.releaseLock();
  }
}

function apiResultsList(subject) {
  var s = readAll(sheetOf(SHEET_RESULTS, RESULT_HEAD));
  var rows = s.rows.filter(function (x) { return String(x.subject || '') === subject; });
  /* ส่งกลับเฉพาะ 800 รายการล่าสุด กันคำตอบใหญ่เกินจนหมดเวลา */
  if (rows.length > 800) rows = rows.slice(rows.length - 800);
  return {
    rows: rows.map(function (x) {
      return {
        at: x.at instanceof Date ? x.at.toISOString() : String(x.at || ''),
        code: String(x.code || ''), sid: String(x.sid || ''), name: String(x.name || ''),
        room: String(x.room || ''), no: String(x.no || ''), mode: String(x.mode || ''),
        n: Number(x.n || 0), score: Number(x.score || 0), max: Number(x.max || 0),
        pct: Number(x.pct || 0), sec: Number(x.sec || 0), xp: Number(x.xp || 0)
      };
    })
  };
}
