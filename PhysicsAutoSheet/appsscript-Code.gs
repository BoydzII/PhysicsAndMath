/**
 * คลังโจทย์ฟิสิกส์ ม.4 + คณิตศาสตร์ ม.ต้น — ตัวเชื่อม Google Sheet
 * ================================================================
 * รุ่นนี้รองรับ "สองวิชาในชีตเดียว" โดยเพิ่มคอลัมน์ วิชา ต่อท้ายของเดิม
 * แถวเก่าที่ไม่มีค่าในคอลัมน์นี้จะถูกนับเป็น "ฟิสิกส์" อัตโนมัติ
 * ข้อมูลเดิมจึงไม่ต้องแก้อะไรเลยแม้แต่แถวเดียว
 *
 * ⚠ ไฟล์นี้เป็น "ต้นฉบับอ้างอิง" ที่เก็บไว้ในรีโพเท่านั้น
 *   ตัวที่ทำงานจริงอยู่ใน Apps Script ของชีตในบัญชี Google ของครู
 *   แก้ที่นี่แล้ว "ต้องเอาไปวางทับใน Apps Script แล้ว Deploy ใหม่" ถึงจะมีผล
 *   ระบบไม่มีทางอัปโหลดให้เองได้
 *
 * วิธีอัปเดตจากรุ่นเดิม
 *   1) เปิดชีต → ไฟล์ → ทำสำเนา  (สำรองไว้ก่อนเสมอ)
 *   2) ส่วนขยาย → Apps Script → ลบโค้ดเดิมทิ้ง แล้ววางไฟล์นี้ลงไปทั้งหมด
 *   3) ทำให้ใช้งานได้ → การทำให้ใช้งานได้ใหม่ → ประเภท: เว็บแอป
 *        ดำเนินการในชื่อ: ฉัน       ผู้ที่มีสิทธิ์เข้าถึง: ทุกคน
 *      ⚠ เลือก "การทำให้ใช้งานได้ที่มีอยู่" แล้วกดแก้ไข → รุ่นใหม่
 *        เพื่อให้ URL เดิมใช้ได้ต่อ ไม่ต้องไปแก้ที่แอพ
 *   4) กลับมาที่แอพ → แท็บตั้งค่า → ปุ่ม "ซ่อมโครงสร้างชีต" หนึ่งครั้ง
 *      เพื่อเติมหัวตารางของคอลัมน์ใหม่ (ข้อมูลเดิมไม่หาย)
 *
 * ── รุ่น 6 เพิ่มอะไร (ระบบคุมสอบ) ────────────────────────────────────────
 *   แผ่น submissions เพิ่มสามคอลัมน์ท้ายตาราง รับค่าที่แอพส่งขึ้นมาใหม่
 *     out     ออกจากแอประหว่างทำข้อสอบกี่ครั้ง
 *     outSec  รวมกี่วินาทีที่อยู่นอกแอป
 *     autoBy  ระบบส่งข้อสอบให้เพราะอะไร (ว่าง = นักเรียนกดส่งเอง)
 *   แถวเก่าจะเว้นว่างสามช่องนี้ ซึ่งถูกต้องแล้ว เพราะตอนนั้นยังไม่มีการคุมสอบ
 *   อย่าเติม 0 ย้อนหลัง จะกลายเป็นบอกว่า "ตรวจแล้วไม่มีใครออก" ทั้งที่ยังไม่ได้ตรวจ
 *
 *   ข้อมูลนี้จับได้เฉพาะการสลับแอปหรือล็อกจอ "บนเครื่องเดียวกัน" เท่านั้น
 *   เปิดอีกเครื่องหรือแคปหน้าจอ ระบบไม่รู้ — ใช้เป็นหลักฐานประกอบ ไม่ใช่คำตัดสิน
 *
 * ข้อควรทราบด้านความปลอดภัย
 *   URL ของเว็บแอปเป็นสาธารณะเสมอ ใครมี URL ก็ยิงเข้ามาได้
 *   ด่านเดียวที่กันคือการตรวจรหัสผ่านในไฟล์นี้ จึงเหมาะกับงานใบงาน/แบบฝึกหัด
 *   ไม่ควรเก็บข้อมูลที่เป็นความลับจริงจังไว้ในชีตนี้
 *   รหัสผ่านทั้งหมดเก็บเป็นค่าแฮช (SHA-256 + salt) ไม่ได้เก็บเป็นตัวอักษรจริง
 */

/* ====== ค่าตั้งต้น ====================================================== */

// รหัสผ่านผู้ดูแล
// ⚠ ไฟล์ในรีโพนี้เป็นรีโพสาธารณะ จึงใส่ค่าจริงลงไปไม่ได้
//   ให้แก้เป็นรหัสจริงเฉพาะตอนวางลงใน Apps Script ของครูเท่านั้น
//   และอย่าคัดลอกรหัสจริงกลับมาใส่ในไฟล์นี้อีก
//   ถ้าเข้าไม่ได้เมื่อไร ให้เรียกฟังก์ชัน resetAdminPassword จากหน้า Apps Script
//   แล้วรหัสจะกลับมาเป็นค่าที่ตั้งไว้ในบรรทัดล่างนี้ทันที
var DEFAULT_ADMIN_PASS = 'ใส่รหัสผู้ดูแลของครูตรงนี้';
// รหัสผ่านตั้งต้นของนักเรียน — เข้าใช้ครั้งแรกแล้วระบบจะบังคับให้ตั้งใหม่
var DEFAULT_STUDENT_PASS = '1111';
var TOKEN_HOURS = 12;          // อายุการเข้าใช้ต่อครั้ง
var MAX_LOGIN_FAIL = 8;        // ผิดเกินนี้ พักการเข้าใช้ชั่วคราว
var LOCK_MINUTES = 10;

/* ── วิชา ────────────────────────────────────────────────────────────────
   ชีตเดียวเก็บได้หลายวิชา โดยแยกด้วยคอลัมน์ subject
   แถวเก่าที่ยังไม่มีค่าในคอลัมน์นี้ = ฟิสิกส์ (ค่าเริ่มต้น)
   เพิ่มวิชาใหม่ในอนาคต แค่เติมชื่อลงในรายการนี้                          */
var SUBJECTS = ['physics', 'math'];
var DEFAULT_SUBJECT = 'physics';
function normSubject_(v) {
  var s = String(v == null ? '' : v).trim().toLowerCase();
  return SUBJECTS.indexOf(s) >= 0 ? s : DEFAULT_SUBJECT;
}
/** วิชาที่คำขอนี้พูดถึง — แอพทุกตัวแนบ subject มากับทุกคำสั่ง */
function reqSubject_(req) { return normSubject_(req && req.subject); }

/* ลำดับคอลัมน์ในชีต — อ่าน/เขียนโดยยึด "ตำแหน่ง" ไม่ใช่ชื่อหัวตาราง
   จึงไม่พังแม้หัวตารางจะถูกแก้เป็นภาษาไทย
   แผ่น students เรียงเป็น เลขที่ · เลขประจำตัว · ชื่อ ตามที่ใช้งานจริง

   ⚠ คอลัมน์ใหม่ต้อง "ต่อท้าย" เท่านั้น ห้ามแทรกกลาง
     เพราะแถวเก่าอ่านตามตำแหน่ง ถ้าแทรกกลางข้อมูลเดิมจะเลื่อนผิดหมด */
var SHEETS = {
  students:    ['no', 'sid', 'name', 'cls', 'passHash', 'salt', 'mustChange', 'active', 'lastLogin'],
  assignments: ['code', 'title', 'cls', 'spec', 'baseSeed', 'perStudent', 'g', 'easyG10',
                'openAt', 'closeAt', 'active', 'createdAt', 'subject', 'piMode'],
  submissions: ['ts', 'code', 'sid', 'status', 'score', 'max', 'pct', 'sec', 'revealed',
                'answers', 'device', 'subject', 'out', 'outSec', 'autoBy']
};
/* หัวตารางภาษาไทยที่คนอ่านเข้าใจ — เขียนไว้ที่แถว 1 ของแต่ละแผ่น */
var HEADERS = {
  students:    ['เลขที่', 'เลขประจำตัว', 'ชื่อ-นามสกุล', 'ชั้น',
                'รหัสผ่าน (เข้ารหัสแล้ว)', 'salt', 'ต้องเปลี่ยนรหัส', 'เปิดใช้งาน', 'เข้าใช้ล่าสุด'],
  assignments: ['รหัสใบงาน', 'ชื่อใบงาน', 'ชั้น', 'สเปกโจทย์', 'เลขสุ่มฐาน', 'เลขต่างรายคน',
                'ค่า g', 'ระดับง่ายใช้ g=10', 'เปิดเมื่อ', 'ปิดรับเมื่อ', 'เปิดใช้งาน', 'สร้างเมื่อ',
                'วิชา', 'ค่า π'],
  submissions: ['เวลาที่ส่ง', 'รหัสใบงาน', 'เลขประจำตัว', 'สถานะ', 'คะแนน', 'คะแนนเต็ม',
                'ร้อยละ', 'เวลาที่ใช้ (วินาที)', 'เปิดเฉลย', 'คำตอบรายข้อ', 'อุปกรณ์', 'วิชา',
                'ออกจากแอป (ครั้ง)', 'เวลานอกแอป (วินาที)', 'ระบบส่งให้เพราะ']
};
/* ตำแหน่งคอลัมน์ที่ใช้บ่อย (นับจาก 1) */
var C_NO = 1, C_SID = 2, C_NAME = 3, C_CLS = 4, C_HASH = 5, C_SALT = 6,
    C_MUST = 7, C_ACTIVE = 8, C_LOGIN = 9;
/* คอลัมน์ "วิชา" ของแผ่นส่งคำตอบ (ตัวที่ 12) — ใช้ตอนอ่านแบบแคบ
   คอลัมน์คุมสอบที่เพิ่มมาใหม่อยู่ท้ายกว่านี้ ค่านี้จึงไม่ต้องแก้ */
var C_SUB_SUBJECT = 12;

/* ====== ตัวช่วยพื้นฐาน ================================================== */

function props_() { return PropertiesService.getScriptProperties(); }

/* ── ตัวจำค่าไว้ใช้ซ้ำภายในการทำงานครั้งเดียว ─────────────────────────────
   ทุกครั้งที่เรียกบริการของ Google (อ่าน property, เปิดชีต, ขอ UUID) จะเสียเวลา
   ไป-กลับกับเซิร์ฟเวอร์รอบหนึ่ง ถ้าเรียกซ้ำคนละครั้งต่อนักเรียนหนึ่งคน
   ห้องละ 40 คนจะกลายเป็นร้อยกว่ารอบ จนหมดเวลาไปก่อน จึงต้องจำค่าไว้ใช้ซ้ำ
   ตัวแปรพวกนี้มีอายุแค่ภายในการทำงานครั้งเดียว ไม่ค้างข้ามรอบ            */
var _secret = null, _book = null, _sheets = {};

function secret_() {
  if (_secret) return _secret;
  var p = props_(), s = p.getProperty('SECRET');
  if (!s) { s = Utilities.getUuid() + Utilities.getUuid(); p.setProperty('SECRET', s); }
  _secret = s;
  return s;
}

function book_() {
  if (_book) return _book;
  var id = props_().getProperty('SHEET_ID');
  _book = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  return _book;
}

function sheet_(name) {
  if (_sheets[name]) return _sheets[name];
  var ss = book_(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, HEADERS[name].length).setValues([HEADERS[name]]);
    sh.getRange(1, 1, 1, HEADERS[name].length).setFontWeight('bold');
    sh.setFrozenRows(1);
    // คอลัมน์เลขประจำตัวต้องเป็นข้อความ ไม่งั้นเลขศูนย์นำหน้าอย่าง 00123 จะหายไป
    if (name === 'students') sh.getRange('B:B').setNumberFormat('@');
    if (name === 'submissions') sh.getRange('C:C').setNumberFormat('@');
  }
  _sheets[name] = sh;
  return sh;
}

/** แถวนี้เป็นหัวตารางหรือเป็นข้อมูล — ดูจากคำที่ใช้เป็นหัวตารางทั้งแบบอังกฤษเดิมและไทยใหม่ */
function looksLikeHeader_(row) {
  var j = (row || []).slice(0, 5).map(function (v) { return String(v == null ? '' : v).trim(); }).join('|');
  if (!j.replace(/\|/g, '')) return false;
  var low = j.toLowerCase();
  if (/(^|\|)(sid|name|no|cls|code|ts|title)(\||$)/.test(low)) return true;
  return j.indexOf('เลขประจำตัว') >= 0 || j.indexOf('เลขที่') >= 0 ||
         j.indexOf('ชื่อ-นามสกุล') >= 0 || j.indexOf('รหัสใบงาน') >= 0 || j.indexOf('เวลาที่ส่ง') >= 0;
}

/** อ่านทั้งแผ่นเป็นอาเรย์ของออบเจ็กต์ โดยยึด "ตำแหน่งคอลัมน์" ไม่ใช่ข้อความหัวตาราง
    (อ่านครั้งเดียวต่อแผ่นต่อการทำงานหนึ่งรอบ) */
var _cacheAll = {};
function readAll_(name) {
  if (_cacheAll[name]) return _cacheAll[name];
  var sh = sheet_(name), last = sh.getLastRow(), keys = SHEETS[name], wide = keys.length;
  if (last < 2) { _cacheAll[name] = []; return []; }
  // เผื่อแผ่นเดิมยังมีคอลัมน์น้อยกว่าที่ต้องการ (เพิ่งอัปเดตโค้ดแต่ยังไม่ได้กดซ่อมโครงสร้าง)
  // ถ้าไม่กันไว้ getRange จะขว้างข้อผิดพลาดจนแอพเชื่อมต่อไม่ได้เลย
  if (sh.getMaxColumns() < wide) sh.insertColumnsAfter(sh.getMaxColumns(), wide - sh.getMaxColumns());
  var vals = sh.getRange(2, 1, last - 1, wide).getValues();
  var out = [];
  for (var r = 0; r < vals.length; r++) {
    var o = { _row: r + 2 }, blank = true;
    for (var c = 0; c < wide; c++) {
      o[keys[c]] = vals[r][c];
      if (String(vals[r][c]).length) blank = false;
    }
    if (!blank) out.push(o);
  }
  _cacheAll[name] = out;
  return out;
}
function dropCache_(name) { delete _cacheAll[name]; }

/* ── อ่านเฉพาะคอลัมน์ที่ต้องใช้ ────────────────────────────────────────────
   readAll_ อ่านทั้งแผ่นทุกคอลัมน์ ซึ่งเปลืองเวลามากเมื่อข้อมูลเยอะ
   งานส่วนใหญ่ต้องการแค่ 1-3 คอลัมน์ จึงมีตัวอ่านแบบแคบไว้ใช้แทน       */
function cols_(name, firstCol, nCols) {
  var sh = sheet_(name), last = sh.getLastRow();
  if (last < 2) return [];
  if (sh.getMaxColumns() < firstCol + nCols - 1) return [];
  return sh.getRange(2, firstCol, last - 1, nCols).getValues();
}
/** คอลัมน์เลขประจำตัวอย่างเดียว — ใช้ค้นหาแถวโดยไม่ต้องอ่านทั้งแผ่น */
var _sidCol = null;
function sidColumn_() {
  if (_sidCol) return _sidCol;
  var c = cols_('students', C_SID, 1);
  _sidCol = c.map(function (r) { return r[0]; });
  return _sidCol;
}
/** หาแถวของนักเรียนจากเลขประจำตัว คืนเลขแถวจริงในชีต (ไม่เจอคืน -1) */
function findStudentRow_(sid) {
  var key = sidKey_(sid), list = sidColumn_();
  for (var i = 0; i < list.length; i++) if (sidKey_(list[i]) === key) return i + 2;
  return -1;
}
/** อ่านข้อมูลนักเรียนหนึ่งแถว */
function readStudentRow_(row) {
  var v = sheet_('students').getRange(row, 1, 1, SHEETS.students.length).getValues()[0];
  var o = { _row: row };
  SHEETS.students.forEach(function (k, i) { o[k] = v[i]; });
  return o;
}

/** อ่านแผ่นส่งคำตอบแบบแคบ — เอาแค่ รหัสใบงาน · เลขประจำตัว · สถานะ · วิชา
    เลี่ยงการดึงคอลัมน์คำตอบรายข้อซึ่งเป็น JSON ยาวมาโดยไม่จำเป็น */
function submissionKeys_() {
  var head = cols_('submissions', 2, 3);                 // B,C,D
  if (!head.length) return [];
  var subj = cols_('submissions', C_SUB_SUBJECT, 1);     // L
  return head.map(function (r, i) {
    return { code: String(r[0]).toUpperCase(), sid: r[1], status: String(r[2]),
             subject: normSubject_(subj[i] ? subj[i][0] : '') };
  });
}

function appendRow_(name, obj) {
  var sh = sheet_(name);
  var head = SHEETS[name];
  sh.appendRow(head.map(function (k) { return obj[k] == null ? '' : obj[k]; }));
  dropCache_(name);
}

function writeRow_(name, rowIndex, obj) {
  var sh = sheet_(name), head = SHEETS[name];
  sh.getRange(rowIndex, 1, 1, head.length)
    .setValues([head.map(function (k) { return obj[k] == null ? '' : obj[k]; })]);
  dropCache_(name);
}

function sha256_(s) {
  return Utilities.base64Encode(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s), Utilities.Charset.UTF_8));
}
function hashPass_(pass, salt) { return sha256_(salt + '|' + pass + '|' + secret_()); }
function newSalt_() { return Utilities.getUuid().replace(/-/g, '').slice(0, 16); }
/** salt หลายอันจากการขอ UUID ครั้งเดียว — ใช้ตอนเพิ่มรายชื่อทีละหลายคน
    salt ต้องการแค่ความไม่ซ้ำ ส่วนความปลอดภัยมาจาก SECRET ที่เก็บแยกไว้ */
function saltSeries_(n) {
  var base = Utilities.getUuid().replace(/-/g, '').slice(0, 10);
  var out = [];
  for (var i = 0; i < n; i++) out.push(base + i.toString(36) + Math.floor(Math.random() * 1e9).toString(36));
  return out;
}

/* ── เลขประจำตัวนักเรียน: ตัวเลขล้วน ยาวไม่เกิน 5 หลัก ─────────────────── */
var SID_MAX_LEN = 5;
function normSid_(v) {
  var s = String(v == null ? '' : v).trim();
  return s.replace(/\.0+$/, '');           // กันกรณีชีตแปลงเป็นตัวเลขแล้วติด .0 มา
}
function validSid_(s) { return new RegExp('^\\d{1,' + SID_MAX_LEN + '}$').test(s); }
/** กุญแจสำหรับเทียบ — ตัดศูนย์นำหน้าออก เพื่อให้ 00123 กับ 123 เจอกัน
    จำเป็นเพราะข้อมูลเก่าที่เคยถูกชีตแปลงเป็นตัวเลขจะเสียศูนย์นำหน้าไปแล้ว */
function sidKey_(v) { return normSid_(v).replace(/^0+/, '') || '0'; }

function makeToken_(payload) {
  payload.exp = Date.now() + TOKEN_HOURS * 3600 * 1000;
  var body = Utilities.base64EncodeWebSafe(JSON.stringify(payload));
  var sig = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(body, secret_()));
  return body + '.' + sig;
}
function readToken_(tok) {
  var parts = String(tok || '').split('.');
  if (parts.length !== 2) return null;
  var sig = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(parts[0], secret_()));
  if (sig !== parts[1]) return null;
  var p;
  try { p = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0])).getDataAsString()); }
  catch (e) { return null; }
  if (!p.exp || p.exp < Date.now()) return null;
  return p;
}

function needAdmin_(req) {
  var t = readToken_(req.token);
  if (!t || t.role !== 'admin') throw new Error('AUTH: ต้องเข้าใช้ในฐานะผู้ดูแลก่อน');
  return t;
}
function needStudent_(req) {
  var t = readToken_(req.token);
  if (!t || t.role !== 'student') throw new Error('AUTH: ต้องเข้าใช้ก่อน');
  return t;
}

/* ====== ตรวจและซ่อมโครงสร้างชีต ========================================
   ปัญหาที่เจอจริง: แผ่น students ไม่มีแถวหัวตาราง แถวแรกเป็นข้อมูลนักเรียนเลย
   ระบบเลยอ่านแถวนั้นเป็นชื่อคอลัมน์ ทำให้ทุกช่องกลายเป็นค่าว่าง
   หาเลขประจำตัวไม่เจอ เข้าระบบไม่ได้ และอัพซ้ำไม่รู้จบ
   ตัวซ่อมนี้เติมหัวตารางให้ และสลับคอลัมน์เป็น เลขที่ · เลขประจำตัว · ชื่อ
   รุ่นนี้ยังเติมหัวตารางของคอลัมน์ "วิชา" และคอลัมน์คุมสอบที่เพิ่มเข้ามาใหม่ให้ด้วย
   ======================================================================== */

/** เดาว่าแผ่น students วางคอลัมน์แบบเก่า (เลขประจำตัว·ชื่อ·เลขที่) หรือแบบใหม่ (เลขที่·เลขประจำตัว·ชื่อ)
    ตัวชี้ขาดคือ "ชื่อคนอยู่คอลัมน์ไหน" เพราะชื่อเป็นตัวหนังสือ แยกจากตัวเลขได้ชัด */
function detectStudentLayout_(rows) {
  var oldN = 0, newN = 0;
  var isText = function (v) { return /[^\d\s.\-]/.test(String(v == null ? '' : v)); };
  rows.slice(0, 30).forEach(function (r) {
    if (isText(r[1]) && !isText(r[2])) oldN++;        // ชื่ออยู่คอลัมน์ B = แบบเก่า
    else if (isText(r[2]) && !isText(r[1])) newN++;   // ชื่ออยู่คอลัมน์ C = แบบใหม่
  });
  return newN >= oldN && (newN + oldN) > 0 ? 'new' : (oldN ? 'old' : 'new');
}

/** หัวตารางครบทุกคอลัมน์แล้วหรือยัง — ใช้ตรวจว่าคอลัมน์ที่เพิ่มใหม่ถูกเติมหรือยัง */
function headerComplete_(sh, name) {
  var want = HEADERS[name], last = sh.getLastColumn();
  if (last < want.length) return false;
  var got = sh.getRange(1, 1, 1, want.length).getValues()[0];
  for (var i = 0; i < want.length; i++) {
    if (String(got[i] || '').trim() !== want[i]) return false;
  }
  return true;
}

/** ตรวจว่าแผ่นไหนต้องซ่อมบ้าง (ไม่แก้อะไร แค่รายงาน) */
function inspectSheets_() {
  var out = {};
  Object.keys(SHEETS).forEach(function (n) {
    var sh = sheet_(n), last = sh.getLastRow(), wide = SHEETS[n].length;
    if (last < 1) { out[n] = { rows: 0, hasHeader: false, needFix: true, layout: 'new' }; return; }
    var first = sh.getRange(1, 1, 1, Math.min(wide, sh.getMaxColumns())).getValues()[0];
    var hasHeader = looksLikeHeader_(first);
    var full = headerComplete_(sh, n);
    var info = { rows: Math.max(0, last - (hasHeader ? 1 : 0)), hasHeader: hasHeader,
                 headerComplete: full, layout: 'new', needFix: !hasHeader || !full };
    if (n === 'students' && last > 0) {
      var body = sh.getRange(hasHeader ? 2 : 1, 1, Math.max(1, last - (hasHeader ? 1 : 0)), wide).getValues();
      info.layout = detectStudentLayout_(body);
      if (info.layout === 'old') info.needFix = true;
    }
    out[n] = info;
  });
  return out;
}

/** ซ่อมจริง — เติมหัวตาราง และสลับคอลัมน์ให้เป็น เลขที่ · เลขประจำตัว · ชื่อ
    ข้อมูลเดิมไม่หาย รหัสผ่านที่นักเรียนตั้งไว้ยังใช้ได้เหมือนเดิม
    คอลัมน์ "วิชา" ที่ยังว่างจะถูกเติมเป็น physics ให้ ตามข้อมูลเดิมที่มีแต่ฟิสิกส์
    ส่วนคอลัมน์คุมสอบของแถวเก่าจะปล่อยว่างไว้ตามเดิม ไม่เติม 0 ให้
    เพราะการสอบครั้งนั้นไม่ได้ถูกคุม การใส่ 0 จะกลายเป็นบอกว่าตรวจแล้วไม่มีใครออก */
function repairSheets_() {
  var lock = LockService.getScriptLock();
  lock.waitLock(60000);
  var report = {};
  try {
    Object.keys(SHEETS).forEach(function (n) {
      var sh = sheet_(n), keys = SHEETS[n], wide = keys.length;
      var last = sh.getLastRow();
      var r = { rows: 0, addedHeader: false, reordered: false, filledSubject: 0 };

      if (last < 1) {
        sh.getRange(1, 1, 1, wide).setValues([HEADERS[n]]).setFontWeight('bold');
        sh.setFrozenRows(1);
        r.addedHeader = true; report[n] = r; return;
      }

      // เผื่อแผ่นเดิมมีคอลัมน์น้อยกว่าที่ต้องการ (รุ่นก่อนยังไม่มีคอลัมน์ที่เพิ่มใหม่)
      if (sh.getMaxColumns() < wide) sh.insertColumnsAfter(sh.getMaxColumns(), wide - sh.getMaxColumns());

      var all = sh.getRange(1, 1, last, wide).getValues();
      var hasHeader = looksLikeHeader_(all[0]);
      var body = hasHeader ? all.slice(1) : all;
      body = body.filter(function (row) {
        return row.some(function (v) { return String(v == null ? '' : v).trim().length; });
      });

      if (n === 'students') {
        var layout = detectStudentLayout_(body);
        if (layout === 'old') {
          // เก่า [sid, name, no, cls, ...] → ใหม่ [no, sid, name, cls, ...]
          body = body.map(function (row) {
            var o = row.slice();
            o[0] = row[2]; o[1] = row[0]; o[2] = row[1];
            return o;
          });
          r.reordered = true;
        }
        // เลขประจำตัวเก็บเป็นข้อความเสมอ กันศูนย์นำหน้าหาย
        body.forEach(function (row) { row[C_SID - 1] = normSid_(row[C_SID - 1]); });
      }

      // แถวเก่าที่ยังไม่มีวิชา = ฟิสิกส์ (ตอนนั้นยังมีวิชาเดียว)
      var si = keys.indexOf('subject');
      if (si >= 0) {
        body.forEach(function (row) {
          if (!String(row[si] == null ? '' : row[si]).trim()) { row[si] = DEFAULT_SUBJECT; r.filledSubject++; }
        });
      }

      sh.clear();
      sh.getRange(1, 1, 1, wide).setValues([HEADERS[n]]).setFontWeight('bold');
      if (body.length) {
        if (n === 'students') sh.getRange(2, C_SID, body.length, 1).setNumberFormat('@');
        if (n === 'submissions') sh.getRange(2, 3, body.length, 1).setNumberFormat('@');
        sh.getRange(2, 1, body.length, wide).setValues(body);
      }
      sh.setFrozenRows(1);
      r.rows = body.length;
      r.addedHeader = !hasHeader;
      report[n] = r;
    });
    _sheets = {}; _cacheAll = {}; _sidCol = null;
    return report;
  } finally { lock.releaseLock(); }
}

/** เรียกจากหน้า Apps Script ได้โดยตรง เผื่อแอพเชื่อมต่อไม่ได้ */
function repairSheets() {
  var r = repairSheets_();
  var msg = Object.keys(r).map(function (n) {
    return n + ': ' + r[n].rows + ' แถว' +
      (r[n].addedHeader ? ' · เติมหัวตารางให้แล้ว' : '') +
      (r[n].reordered ? ' · สลับคอลัมน์เป็น เลขที่/เลขประจำตัว/ชื่อ แล้ว' : '') +
      (r[n].filledSubject ? ' · เติมวิชาให้แถวเก่า ' + r[n].filledSubject + ' แถว' : '');
  }).join('\n');
  SpreadsheetApp.getUi().alert('ซ่อมโครงสร้างชีตเรียบร้อย\n\n' + msg);
}

function apiSheetInspect_(req) { needAdmin_(req); return inspectSheets_(); }
function apiSheetRepair_(req)  { needAdmin_(req); return repairSheets_(); }

/* ====== ติดตั้งครั้งแรก ================================================= */

/** เขียนรหัสผู้ดูแลใหม่ทับของเดิมเสมอ พร้อมล้างการล็อกจากการกรอกผิดหลายครั้ง */
function forceAdminPassword_(pass) {
  var salt = newSalt_();
  var p = props_();
  p.setProperty('ADMIN_SALT', salt);
  p.setProperty('ADMIN_HASH', hashPass_(pass, salt));
  try { CacheService.getScriptCache().remove('fail_admin'); } catch (e) {}
  return true;
}

function setupFirstTime() {
  var p = props_();
  // ผูกกับสมุดงานที่เปิดสคริปต์นี้อยู่
  if (!p.getProperty('SHEET_ID')) p.setProperty('SHEET_ID', SpreadsheetApp.getActiveSpreadsheet().getId());
  secret_();
  Object.keys(SHEETS).forEach(function (n) { sheet_(n); });
  // ตั้งรหัสผู้ดูแลทับทุกครั้ง เพื่อให้เรียกฟังก์ชันนี้แล้วเข้าระบบได้แน่นอน
  forceAdminPassword_(DEFAULT_ADMIN_PASS);
  SpreadsheetApp.getUi().alert(
    'ติดตั้งเรียบร้อย\n\n' +
    'สร้างแผ่นงาน students / assignments / submissions ให้แล้ว\n\n' +
    'รหัสผ่านผู้ดูแลคือ\n\n        ' + DEFAULT_ADMIN_PASS + '\n\n' +
    '(ตั้งทับของเดิมให้แล้ว เข้าใช้ได้ทันที)\n\n' +
    'ขั้นต่อไป: ทำให้ใช้งานได้ → ประเภท เว็บแอป → ดำเนินการในชื่อ ฉัน → ผู้ที่มีสิทธิ์เข้าถึง ทุกคน');
}

/** ใช้เมื่อเข้าระบบผู้ดูแลไม่ได้ — เรียกฟังก์ชันนี้จากหน้า Apps Script โดยตรง
    ตั้งรหัสกลับเป็นค่าที่กำหนดไว้ใน DEFAULT_ADMIN_PASS ทันที */
function resetAdminPassword() {
  forceAdminPassword_(DEFAULT_ADMIN_PASS);
  SpreadsheetApp.getUi().alert(
    'ตั้งรหัสผู้ดูแลเรียบร้อย\n\nรหัสผ่านคือ\n\n        ' + DEFAULT_ADMIN_PASS + '\n\n' +
    'ล้างการล็อกจากการกรอกผิดให้แล้ว เข้าใช้ได้ทันที\n' +
    '(ถ้ายังเข้าไม่ได้ ให้กด "ทำให้ใช้งานได้ใหม่" ก่อน)');
}

/* ====== ทางเข้าเว็บแอป ================================================== */

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  return json_({ ok: true, service: 'quiz-bank', version: 6, subjects: SUBJECTS,
                 note: 'ใช้งานผ่าน POST จากแอพเท่านั้น' });
}

function doPost(e) {
  var req;
  try { req = JSON.parse(e.postData.contents); }
  catch (err) { return json_({ ok: false, error: 'ส่งข้อมูลมาไม่ถูกรูปแบบ' }); }
  try {
    return json_({ ok: true, data: route_(req.action, req) });
  } catch (err) {
    var msg = String(err && err.message ? err.message : err);
    return json_({ ok: false, error: msg, auth: msg.indexOf('AUTH:') === 0 });
  }
}

function route_(action, req) {
  switch (action) {
    case 'ping':          return apiPing_(req);
    case 'login':         return apiLogin_(req);
    case 'changePass':    return apiChangePass_(req);
    case 'adminLogin':    return apiAdminLogin_(req);
    case 'adminPass':     return apiAdminPass_(req);
    case 'rosterList':    return apiRosterList_(req);
    case 'rosterCheck':   return apiRosterCheck_(req);
    case 'rosterSave':    return apiRosterSave_(req);
    case 'rosterDedupe':  return apiRosterDedupe_(req);
    case 'sheetInspect':  return apiSheetInspect_(req);
    case 'sheetRepair':   return apiSheetRepair_(req);
    case 'rosterReset':   return apiRosterReset_(req);
    case 'rosterRemove':  return apiRosterRemove_(req);
    case 'assignSave':    return apiAssignSave_(req);
    case 'assignList':    return apiAssignList_(req);
    case 'assignRemove':  return apiAssignRemove_(req);
    case 'assignGet':     return apiAssignGet_(req);
    case 'myAssignments': return apiMyAssignments_(req);
    case 'submit':        return apiSubmit_(req);
    case 'myResults':     return apiMyResults_(req);
    case 'resultsList':   return apiResultsList_(req);
    default: throw new Error('ไม่รู้จักคำสั่ง: ' + action);
  }
}

/* ====== เข้าใช้งาน ====================================================== */

function apiPing_(req) {
  var t0 = Date.now();
  // ตรวจก่อนว่าโครงสร้างชีตถูกต้องไหม ถ้าหัวตารางหายจะอ่านข้อมูลเพี้ยนทั้งหมด
  var shS = sheet_('students'), lastS = shS.getLastRow(), needRepair = false, layout = 'new';
  if (lastS >= 1) {
    var first = shS.getRange(1, 1, 1, SHEETS.students.length).getValues()[0];
    var hasHeader = looksLikeHeader_(first);
    if (!hasHeader) needRepair = true;
    var body = shS.getRange(hasHeader ? 2 : 1, 1,
      Math.max(1, lastS - (hasHeader ? 1 : 0)), SHEETS.students.length).getValues();
    layout = detectStudentLayout_(body);
    if (layout === 'old') needRepair = true;
  }
  // หัวตารางของคอลัมน์ที่เพิ่งเพิ่ม (วิชา · คุมสอบ) ยังไม่ถูกเติม ก็ถือว่าควรกดซ่อมหนึ่งครั้ง
  if (!headerComplete_(sheet_('assignments'), 'assignments') ||
      !headerComplete_(sheet_('submissions'), 'submissions')) needRepair = true;

  // อ่านแค่คอลัมน์เลขประจำตัว และนับจำนวนแถวของแผ่นอื่นโดยไม่ดึงข้อมูลมา
  var sids = sidColumn_();
  var bad = 0, blank = 0, seen = {}, dup = 0;
  sids.forEach(function (v) {
    var s = normSid_(v);
    if (!s) { blank++; return; }
    if (!validSid_(s)) bad++;
    var k = sidKey_(s);
    if (seen[k]) dup++; else seen[k] = 1;
  });
  // แยกจำนวนใบงานและการส่งตามวิชา ให้ครูเห็นภาพรวมของทั้งสองวิชาในครั้งเดียว
  var bySub = {};
  SUBJECTS.forEach(function (s) { bySub[s] = { assignments: 0, submissions: 0 }; });
  readAll_('assignments').forEach(function (a) { bySub[normSubject_(a.subject)].assignments++; });
  submissionKeys_().forEach(function (s) { bySub[s.subject].submissions++; });

  return {
    version: 6, needRepair: needRepair, layout: layout, subjects: SUBJECTS,
    students: sids.length, badSid: bad, blankSid: blank, dupSid: dup,
    assignments: Math.max(0, sheet_('assignments').getLastRow() - 1),
    submissions: Math.max(0, sheet_('submissions').getLastRow() - 1),
    bySubject: bySub,
    sidMaxLen: SID_MAX_LEN,
    sample: sids.slice(0, 5).map(function (v) { return normSid_(v); }),
    hasAdmin: !!props_().getProperty('ADMIN_HASH'),
    ms: Date.now() - t0                       // เวลาที่ฝั่งชีตใช้จริง ไม่รวมเวลาเดินทาง
  };
}

function failKey_(sid) { return 'fail_' + sid; }

function apiLogin_(req) {
  var sid = normSid_(req.sid);
  var pass = String(req.pass || '');
  if (!sid || !pass) throw new Error('กรอกเลขประจำตัวและรหัสผ่านให้ครบ');
  if (!validSid_(sid)) {
    throw new Error('เลขประจำตัวต้องเป็นตัวเลขล้วน ไม่เกิน ' + SID_MAX_LEN + ' หลัก');
  }

  var cache = CacheService.getScriptCache();
  var key = sidKey_(sid);
  var fails = Number(cache.get(failKey_(key)) || 0);
  if (fails >= MAX_LOGIN_FAIL) {
    throw new Error('กรอกรหัสผิดหลายครั้งเกินไป กรุณารออีก ' + LOCK_MINUTES + ' นาทีแล้วลองใหม่');
  }

  // อ่านคอลัมน์เลขประจำตัวคอลัมน์เดียวเพื่อหาแถว แล้วค่อยอ่านแถวนั้นแถวเดียว
  // เร็วกว่าการอ่านทั้งแผ่นมาก โดยเฉพาะเมื่อมีนักเรียนหลายร้อยคน
  var row = findStudentRow_(sid);
  if (row < 0) {
    cache.put(failKey_(key), String(fails + 1), LOCK_MINUTES * 60);
    throw new Error('ไม่พบเลขประจำตัว ' + sid + ' ในระบบ — ให้ครูกด "ส่งรายชื่อขึ้นชีต" ก่อน ' +
                    '(ตอนนี้ในชีตมี ' + sidColumn_().length + ' แถว)');
  }
  var me = readStudentRow_(row);
  if (String(me.active) === 'false' || String(me.active) === '0') throw new Error('บัญชีนี้ถูกระงับการใช้งาน');

  // แถวที่ผู้ดูแลเพิ่งเพิ่มเข้ามาอาจยังไม่มีแฮช ให้ถือว่าใช้รหัสตั้งต้น
  var salt = String(me.salt || ''), hash = String(me.passHash || ''), needFix = false;
  if (!hash) { salt = newSalt_(); hash = hashPass_(DEFAULT_STUDENT_PASS, salt); needFix = true; }

  if (hashPass_(pass, salt) !== hash) {
    cache.put(failKey_(key), String(fails + 1), LOCK_MINUTES * 60);
    throw new Error('รหัสผ่านไม่ถูกต้อง (ผิดได้อีก ' + (MAX_LOGIN_FAIL - fails - 1) + ' ครั้ง)');
  }
  cache.remove(failKey_(key));

  var mustChange = String(me.mustChange) !== 'false' && String(me.mustChange) !== '0';
  // เขียนเฉพาะช่องที่ต้องเปลี่ยนจริง ไม่เขียนทับทั้งแถว จะได้เข้าระบบเร็ว
  var sh = sheet_('students');
  if (needFix) sh.getRange(me._row, C_HASH, 1, 2).setValues([[hash, salt]]);
  sh.getRange(me._row, C_LOGIN).setValue(new Date());   // เข้าใช้ล่าสุด

  return {
    token: makeToken_({ role: 'student', sid: normSid_(me.sid) || sid }),
    profile: { sid: normSid_(me.sid) || sid, name: me.name, no: me.no, cls: me.cls },
    mustChange: mustChange
  };
}

function apiChangePass_(req) {
  var t = needStudent_(req);
  var np = String(req.newPass || '');
  if (np.length < 4) throw new Error('รหัสผ่านใหม่ต้องยาวอย่างน้อย 4 ตัว');
  if (np === DEFAULT_STUDENT_PASS) throw new Error('ห้ามใช้รหัสตั้งต้น กรุณาตั้งรหัสใหม่ที่ไม่ใช่ ' + DEFAULT_STUDENT_PASS);
  var list = readAll_('students');
  for (var i = 0; i < list.length; i++) {
    if (sidKey_(list[i].sid) === sidKey_(t.sid)) {
      var salt = newSalt_();
      list[i].salt = salt;
      list[i].passHash = hashPass_(np, salt);
      list[i].mustChange = false;
      writeRow_('students', list[i]._row, list[i]);
      return { ok: true };
    }
  }
  throw new Error('ไม่พบบัญชีนี้');
}

function apiAdminLogin_(req) {
  var cache = CacheService.getScriptCache();
  var fails = Number(cache.get('fail_admin') || 0);
  if (fails >= MAX_LOGIN_FAIL) throw new Error('กรอกรหัสผิดหลายครั้งเกินไป กรุณารอสักครู่');
  var salt = props_().getProperty('ADMIN_SALT') || '';
  var hash = props_().getProperty('ADMIN_HASH') || '';
  if (!hash) {
    // ยังไม่เคยตั้งรหัส — ตั้งให้เลยตรงนี้ จะได้ไม่ติดล็อกตั้งแต่ก้าวแรก
    forceAdminPassword_(DEFAULT_ADMIN_PASS);
    salt = props_().getProperty('ADMIN_SALT');
    hash = props_().getProperty('ADMIN_HASH');
  }
  if (hashPass_(String(req.pass || ''), salt) !== hash) {
    cache.put('fail_admin', String(fails + 1), LOCK_MINUTES * 60);
    throw new Error('รหัสผู้ดูแลไม่ถูกต้อง — ถ้าจำไม่ได้ ให้เปิดหน้า Apps Script ' +
                    'แล้วเรียกฟังก์ชัน resetAdminPassword หนึ่งครั้ง');
  }
  cache.remove('fail_admin');
  return { token: makeToken_({ role: 'admin' }),
           isDefault: hashPass_(DEFAULT_ADMIN_PASS, salt) === hash };
}

function apiAdminPass_(req) {
  needAdmin_(req);
  var np = String(req.newPass || '');
  if (np.length < 8) throw new Error('รหัสผู้ดูแลต้องยาวอย่างน้อย 8 ตัว');
  var salt = newSalt_();
  props_().setProperty('ADMIN_SALT', salt);
  props_().setProperty('ADMIN_HASH', hashPass_(np, salt));
  return { ok: true };
}

/* ====== รายชื่อนักเรียน (ผู้ดูแลเท่านั้น) ===============================
   รายชื่อใช้ร่วมกันทุกวิชา — นักเรียนคนหนึ่งมีบัญชีเดียว ลงชื่อครั้งเดียว
   แล้วเข้าได้ทุกวิชาที่ครูเปิดให้                                        */

function apiRosterList_(req) {
  needAdmin_(req);
  return readAll_('students').map(function (s) {
    return { sid: String(s.sid), name: s.name, no: s.no, cls: s.cls,
             active: String(s.active) !== 'false' && String(s.active) !== '0',
             mustChange: String(s.mustChange) !== 'false' && String(s.mustChange) !== '0',
             lastLogin: s.lastLogin ? String(s.lastLogin) : '' };
  });
}

/** ตรวจก่อนอัพ — บอกว่าเลขไหนมีในชีตแล้ว เลขไหนยังไม่มี และในชีตมีเลขซ้ำกันเองไหม
    อ่านแค่คอลัมน์ A คอลัมน์เดียว จึงเร็วมากแม้รายชื่อจะเยอะ */
function apiRosterCheck_(req) {
  needAdmin_(req);
  var list = sidColumn_();
  var inSheet = {}, dupInSheet = [], blank = 0;
  list.forEach(function (v) {
    var s = normSid_(v);
    if (!s) { blank++; return; }
    var k = sidKey_(s);
    if (inSheet[k]) { if (dupInSheet.indexOf(s) < 0) dupInSheet.push(s); }
    else inSheet[k] = s;
  });
  var existing = [], missing = [], invalid = [];
  (req.sids || []).forEach(function (v) {
    var s = normSid_(v);
    if (!validSid_(s)) { invalid.push(s || '(ว่าง)'); return; }
    if (inSheet[sidKey_(s)]) existing.push(s); else missing.push(s);
  });
  return { total: list.length, blank: blank, dupInSheet: dupInSheet,
           existing: existing, missing: missing, invalid: invalid };
}

/** เพิ่มรายชื่อ — "เลขประจำตัวที่มีอยู่แล้วจะไม่อัพซ้ำ" ตามที่ต้องการ
    อ่านแค่คอลัมน์ A แล้วต่อท้ายครั้งเดียว จึงเร็วที่สุดเท่าที่ทำได้
    ถ้าต้องการอัปเดตชื่อ/เลขที่/ชั้นของคนเดิมด้วย ให้ส่ง updateExisting = true มา */
function apiRosterSave_(req) {
  needAdmin_(req);
  var rows = req.rows || [];
  if (!rows.length) return { added: 0, updated: 0, existed: [], skipped: [] };
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sh = sheet_('students'), W = SHEETS.students.length;
    var sids = sidColumn_();                    // อ่านคอลัมน์เดียว
    var idx = {};
    for (var i = 0; i < sids.length; i++) {
      var s = normSid_(sids[i]);
      if (!s) continue;
      var k = sidKey_(s);
      if (idx[k] == null) idx[k] = i + 2;        // เก็บแถวแรกที่เจอ ถ้ามีซ้ำจะไม่ทับ
    }

    secret_();
    var salts = saltSeries_(rows.length);
    var added = 0, updated = 0, existed = [], skipped = [], newRows = [], upd = [];

    rows.forEach(function (r, n) {
      var sid = normSid_(r.sid);
      var name = String(r.name == null ? '' : r.name).trim();
      if (!name) { skipped.push({ sid: sid, why: 'ไม่มีชื่อ' }); return; }
      if (!validSid_(sid)) {
        skipped.push({ sid: sid || '(ว่าง)', name: name,
                       why: 'ต้องเป็นตัวเลขล้วน ไม่เกิน ' + SID_MAX_LEN + ' หลัก' });
        return;
      }
      var key = sidKey_(sid);
      if (idx[key] != null) {
        existed.push(sid);                       // มีอยู่แล้ว — ไม่อัพซ้ำ
        if (req.updateExisting) upd.push({ row: idx[key], name: name, sid: sid,
                                           no: r.no == null ? '' : r.no, cls: r.cls == null ? '' : r.cls });
        return;
      }
      var salt = salts[n];
      newRows.push([r.no == null ? '' : r.no, sid, name, r.cls == null ? '' : r.cls,
                    hashPass_(DEFAULT_STUDENT_PASS, salt), salt, true, true, '']);
      idx[key] = -1;                             // กันซ้ำกันเองภายในก้อนเดียวกัน
      added++;
    });

    if (newRows.length) {
      var at = sh.getLastRow() + 1;
      // บังคับให้คอลัมน์เลขประจำตัวเป็นข้อความก่อนเขียน ไม่งั้นศูนย์นำหน้าจะหาย
      sh.getRange(at, C_SID, newRows.length, 1).setNumberFormat('@');
      sh.getRange(at, 1, newRows.length, W).setValues(newRows);
    }
    // อัปเดตของเดิมเฉพาะเมื่อสั่งมาเท่านั้น และเขียนแค่คอลัมน์ B-D
    if (upd.length) {
      upd.sort(function (a, b) { return a.row - b.row; });
      upd.forEach(function (u) {
        sh.getRange(u.row, 1, 1, 4).setValues([[u.no, u.sid, u.name, u.cls]]);
      });
      updated = upd.length;
    }
    _sidCol = null; dropCache_('students');
    return { added: added, updated: updated, existed: existed, skipped: skipped, total: rows.length };
  } finally { lock.releaseLock(); }
}

/** ลบแถวที่เลขประจำตัวซ้ำกัน เก็บแถวแรกไว้ — ใช้ซ่อมชีตที่เคยอัพซ้ำไปแล้ว */
function apiRosterDedupe_(req) {
  needAdmin_(req);
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sh = sheet_('students');
    var sids = sidColumn_();
    var seen = {}, kill = [];
    for (var i = 0; i < sids.length; i++) {
      var s = normSid_(sids[i]);
      if (!s) { kill.push(i + 2); continue; }     // แถวที่ไม่มีเลขประจำตัวก็ใช้ไม่ได้อยู่ดี
      var k = sidKey_(s);
      if (seen[k]) kill.push(i + 2); else seen[k] = 1;
    }
    // ลบจากล่างขึ้นบน เลขแถวด้านบนจะได้ไม่เลื่อน
    for (var j = kill.length - 1; j >= 0; j--) sh.deleteRow(kill[j]);
    _sidCol = null; dropCache_('students');
    return { removed: kill.length, left: Object.keys(seen).length };
  } finally { lock.releaseLock(); }
}

function apiRosterReset_(req) {
  needAdmin_(req);
  var ids = {}; (req.sids || []).forEach(function (s) { ids[sidKey_(s)] = 1; });
  var list = readAll_('students'), n = 0;
  list.forEach(function (s) {
    if (!ids[sidKey_(s.sid)]) return;
    var salt = newSalt_();
    s.salt = salt; s.passHash = hashPass_(DEFAULT_STUDENT_PASS, salt); s.mustChange = true;
    writeRow_('students', s._row, s);
    n++;
  });
  return { reset: n, pass: DEFAULT_STUDENT_PASS };
}

function apiRosterRemove_(req) {
  needAdmin_(req);
  var ids = {}; (req.sids || []).forEach(function (s) { ids[sidKey_(s)] = 1; });
  var sh = sheet_('students'), list = readAll_('students');
  var rows = list.filter(function (s) { return ids[sidKey_(s.sid)]; })
                 .map(function (s) { return s._row; }).sort(function (a, b) { return b - a; });
  rows.forEach(function (r) { sh.deleteRow(r); });
  return { removed: rows.length };
}

/* ====== ใบงานที่มอบหมาย =================================================
   ใบงานแยกตามวิชา — แอพคณิตจะเห็นเฉพาะใบงานคณิต แอพฟิสิกส์เห็นเฉพาะฟิสิกส์
   แถวเก่าที่ยังไม่มีค่าในคอลัมน์วิชา ถือเป็นฟิสิกส์ทั้งหมด               */

function apiAssignSave_(req) {
  needAdmin_(req);
  var a = req.assignment || {};
  var code = String(a.code || '').trim().toUpperCase();
  if (!code) throw new Error('ไม่มีรหัสใบงาน');
  var subject = normSubject_(a.subject || req.subject);
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var list = readAll_('assignments');
    var row = null;
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].code).trim().toUpperCase() === code) { row = list[i]; break; }
    }
    // รหัสใบงานสุ่มมาจากตัวอักษร 32 ตัว 6 หลัก โอกาสชนข้ามวิชามีน้อยมาก
    // แต่ถ้าชนจริงต้องไม่เขียนทับใบงานของอีกวิชา ให้แจ้งเตือนแล้วให้สุ่มใหม่
    if (row && normSubject_(row.subject) !== subject) {
      throw new Error('รหัสใบงาน ' + code + ' ถูกใช้กับอีกวิชาหนึ่งแล้ว กรุณาสุ่มรหัสใหม่');
    }
    var rec = {
      code: code, title: a.title || '', cls: a.cls || '', spec: a.spec || '',
      baseSeed: a.baseSeed || 0, perStudent: !!a.perStudent, g: a.g || '',
      easyG10: !!a.easyG10, openAt: a.openAt || '', closeAt: a.closeAt || '',
      active: a.active === false ? false : true,
      createdAt: row ? row.createdAt : new Date(),
      subject: subject, piMode: a.piMode || ''
    };
    if (row) writeRow_('assignments', row._row, rec); else appendRow_('assignments', rec);
    return { code: code, updated: !!row, subject: subject };
  } finally { lock.releaseLock(); }
}

function apiAssignList_(req) {
  needAdmin_(req);
  var subject = reqSubject_(req);
  // นับผู้ส่งต่อใบงาน โดยนับเฉพาะการส่งของวิชานี้
  var count = {};
  submissionKeys_().forEach(function (r) {
    if (r.status !== 'final' || r.subject !== subject) return;
    count[r.code] = count[r.code] || {};
    count[r.code][sidKey_(r.sid)] = 1;
  });
  return readAll_('assignments').filter(function (a) {
    return normSubject_(a.subject) === subject;
  }).map(function (a) {
    var k = String(a.code).toUpperCase();
    return { code: k, title: a.title, cls: a.cls, spec: a.spec, baseSeed: a.baseSeed,
             perStudent: String(a.perStudent) === 'true', g: Number(a.g) || 9.8,
             easyG10: String(a.easyG10) === 'true', piMode: String(a.piMode || '3.14'),
             subject: normSubject_(a.subject),
             openAt: a.openAt ? String(a.openAt) : '', closeAt: a.closeAt ? String(a.closeAt) : '',
             active: String(a.active) !== 'false',
             done: count[k] ? Object.keys(count[k]).length : 0 };
  });
}

function apiAssignRemove_(req) {
  needAdmin_(req);
  var code = String(req.code || '').trim().toUpperCase();
  var subject = reqSubject_(req);
  var sh = sheet_('assignments'), list = readAll_('assignments');
  for (var i = 0; i < list.length; i++) {
    if (String(list[i].code).trim().toUpperCase() !== code) continue;
    // ห้ามลบข้ามวิชา กันครูเผลอลบใบงานของอีกวิชาจากหน้าจอที่กำลังเปิดอยู่
    if (normSubject_(list[i].subject) !== subject) {
      throw new Error('ใบงาน ' + code + ' เป็นของอีกวิชาหนึ่ง ลบจากหน้านี้ไม่ได้');
    }
    sh.deleteRow(list[i]._row);
    return { removed: 1 };
  }
  return { removed: 0 };
}

function findAssign_(code) {
  var c = String(code || '').trim().toUpperCase();
  var list = readAll_('assignments');
  for (var i = 0; i < list.length; i++) {
    if (String(list[i].code).trim().toUpperCase() === c) return list[i];
  }
  return null;
}

function assignPublic_(a, sid) {
  return {
    code: String(a.code).toUpperCase(), title: a.title, spec: a.spec,
    baseSeed: Number(a.baseSeed) || 0, perStudent: String(a.perStudent) === 'true',
    g: Number(a.g) || 9.8, easyG10: String(a.easyG10) === 'true',
    piMode: String(a.piMode || '3.14'), subject: normSubject_(a.subject),
    closeAt: a.closeAt ? String(a.closeAt) : ''
  };
}

function checkOpen_(a) {
  if (String(a.active) === 'false') throw new Error('ใบงานนี้ถูกปิดรับแล้ว');
  var now = new Date();
  if (a.openAt && new Date(a.openAt) > now) throw new Error('ใบงานนี้ยังไม่ถึงเวลาเปิด');
  if (a.closeAt && new Date(a.closeAt) < now) throw new Error('เลยกำหนดส่งของใบงานนี้แล้ว');
}

/** นักเรียนขอรับใบงานตามรหัส */
function apiAssignGet_(req) {
  var t = needStudent_(req);
  var a = findAssign_(req.code);
  if (!a) throw new Error('ไม่พบใบงานรหัสนี้ ตรวจตัวอักษรอีกครั้ง');
  // รหัสของอีกวิชาจะเปิดในแอพนี้ไม่ได้ เพราะโจทย์คนละคลังกัน
  if (normSubject_(a.subject) !== reqSubject_(req)) {
    throw new Error('รหัสนี้เป็นใบงานของอีกวิชาหนึ่ง กรุณาเปิดในแอพของวิชานั้น');
  }
  checkOpen_(a);
  return assignPublic_(a, t.sid);
}

/** ใบงานทั้งหมดที่เปิดอยู่ ตรงกับวิชานี้ และตรงกับชั้นของนักเรียนคนนี้ */
function apiMyAssignments_(req) {
  var t = needStudent_(req);
  var subject = reqSubject_(req);
  // ต้องการแค่ "ชั้น" ของตัวเอง จึงหาแถวแล้วอ่านช่องเดียว ไม่อ่านทั้งแผ่น
  var row = findStudentRow_(t.sid);
  var myCls = row > 0 ? String(sheet_('students').getRange(row, C_CLS).getValue() || '').trim() : '';
  // การส่งของตัวเองในวิชานี้ ใช้บอกว่าใบไหนทำไปแล้ว
  var mine = {};
  submissionKeys_().forEach(function (r) {
    if (r.subject !== subject) return;
    if (sidKey_(r.sid) !== sidKey_(t.sid)) return;
    if (!mine[r.code] || r.status === 'final') mine[r.code] = r.status;
  });
  var now = new Date();
  return readAll_('assignments').filter(function (a) {
    if (normSubject_(a.subject) !== subject) return false;
    if (String(a.active) === 'false') return false;
    if (a.closeAt && new Date(a.closeAt) < now) return false;
    if (a.openAt && new Date(a.openAt) > now) return false;
    var c = String(a.cls || '').trim();
    return !c || !myCls || c === myCls;
  }).map(function (a) {
    var o = assignPublic_(a, t.sid);
    o.myStatus = mine[String(a.code).toUpperCase()] || '';
    return o;
  });
}

/* ====== ส่งคำตอบ ======================================================== */

function apiSubmit_(req) {
  var t = needStudent_(req);
  var p = req.payload || {};
  var a = findAssign_(p.code);
  if (!a) throw new Error('ไม่พบใบงานรหัสนี้');
  var subject = normSubject_(p.subject || req.subject);
  if (normSubject_(a.subject) !== subject) {
    throw new Error('ใบงานนี้เป็นของอีกวิชาหนึ่ง ส่งผลจากแอพนี้ไม่ได้');
  }
  if (String(p.status) === 'final') checkOpen_(a);   // ฉบับร่างยังบันทึกได้แม้เลยกำหนด
  appendRow_('submissions', {
    ts: new Date(), code: String(p.code).toUpperCase(), sid: t.sid,
    status: p.status === 'final' ? 'final' : 'draft',
    score: p.score, max: p.max, pct: p.pct, sec: p.sec, revealed: p.revealed || 0,
    answers: JSON.stringify(p.answers || []), device: String(p.device || '').slice(0, 40),
    subject: subject,
    // ── ข้อมูลคุมสอบ (รุ่น 6) ──
    // แอพส่งมาให้เฉพาะชุดที่เป็นแบบทดสอบและมีการคุมสอบ ชุดอื่นจะได้ 0 กับข้อความว่าง
    out: Number(p.out) || 0,
    outSec: Number(p.outSec) || 0,
    autoBy: String(p.autoBy || '').slice(0, 60)
  });
  return { ok: true, at: new Date().toISOString() };
}

/** นักเรียนดูผลของตัวเองเท่านั้น (เฉพาะวิชาที่กำลังเปิดอยู่) */
function apiMyResults_(req) {
  var t = needStudent_(req);
  var subject = reqSubject_(req);
  var best = {};
  readAll_('submissions').forEach(function (s) {
    if (normSubject_(s.subject) !== subject) return;
    if (sidKey_(s.sid) !== sidKey_(t.sid)) return;
    if (String(s.status) !== 'final') return;
    var k = String(s.code).toUpperCase();
    if (!best[k] || new Date(s.ts) > new Date(best[k].ts)) best[k] = s;
  });
  return Object.keys(best).map(function (k) {
    var s = best[k];
    return { code: k, ts: String(s.ts), score: Number(s.score), max: Number(s.max),
             pct: Number(s.pct), sec: Number(s.sec) };
  });
}

/** ผู้ดูแลดึงผลของใบงานหนึ่ง (ไม่ระบุ code = ทุกใบงานของวิชานี้) */
function apiResultsList_(req) {
  needAdmin_(req);
  var subject = reqSubject_(req);
  var code = req.code ? String(req.code).trim().toUpperCase() : '';
  var rows = readAll_('submissions').filter(function (s) {
    return String(s.status) === 'final' && normSubject_(s.subject) === subject &&
           (!code || String(s.code).toUpperCase() === code);
  });
  // เอาครั้งล่าสุดของแต่ละคนต่อหนึ่งใบงาน
  var best = {};
  rows.forEach(function (s) {
    var k = String(s.code).toUpperCase() + '|' + sidKey_(s.sid);
    if (!best[k] || new Date(s.ts) > new Date(best[k].ts)) best[k] = s;
  });
  var names = {};
  readAll_('students').forEach(function (st) {
    names[sidKey_(st.sid)] = { name: st.name, no: st.no, cls: st.cls };
  });
  return Object.keys(best).map(function (k) {
    var s = best[k], who = names[sidKey_(s.sid)] || {};
    var ans = [];
    try { ans = JSON.parse(s.answers || '[]'); } catch (e) {}
    return { code: String(s.code).toUpperCase(), sid: String(s.sid), name: who.name || '',
             no: who.no || '', cls: who.cls || '', ts: String(s.ts),
             score: Number(s.score), max: Number(s.max), pct: Number(s.pct),
             sec: Number(s.sec), revealed: Number(s.revealed) || 0, answers: ans,
             device: String(s.device || ''),
             // ข้อมูลคุมสอบ — ส่งกลับไปด้วยเผื่อแอพจะเอาไปแสดงในอนาคต
             out: Number(s.out) || 0, outSec: Number(s.outSec) || 0,
             autoBy: String(s.autoBy || '') };
  });
}
