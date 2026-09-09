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
 * ── รุ่น 13 เพิ่มอะไร (คลังข้ออัตนัยอยู่บนชีต) ───────────────────────────
 *   เดิมคลังข้ออัตนัยเก็บใน localStorage ของเบราว์เซอร์ล้วน ๆ ครูสร้างข้อบนคอมพิวเตอร์
 *   แล้วเปิดไอแพดจึงเจอคลังเปล่าคนละใบ รุ่นนี้เพิ่มแผ่น esbank ให้ชีตเป็นตัวกลาง
 *   เครื่องยังเก็บสำเนาไว้ใช้ตอนไม่มีเน็ตได้เหมือนเดิม แล้วค่อยซิงก์กันทีหลัง
 *
 *   หนึ่งข้ออาจกินหลายแถว เพราะช่องหนึ่งช่องเก็บได้ราวห้าหมื่นตัวอักษร
 *   ข้อที่แทรกรูปไว้จึงถูกหั่นเป็นท่อน ๆ แล้วประกอบกลับตอนอ่าน
 *   ข้อที่ลบแล้วเหลือไว้หนึ่งแถวเป็น "หลุมศพ" อย่าลบแถวนั้นทิ้งเอง
 *   ไม่งั้นเครื่องที่ยังมีข้อนั้นอยู่จะส่งกลับขึ้นมาใหม่ทุกครั้งที่ซิงก์
 *
 * ── รุ่น 12 เพิ่มอะไร (แต้มสะสม เลเวล และอันดับ) ─────────────────────────
 *   แผ่น students เพิ่มเก้าคอลัมน์ท้ายตาราง เก็บนามแฝง หน้าตา ของแต่งตัว
 *   และแต้มจากการเข้าใช้กับการฝึกเอง ส่วนแต้มจากงานที่ครูสั่งคิดสดจากแผ่นส่งคำตอบ
 *   จึงไม่มีทางได้ซ้ำ และย้อนหลังได้ถูกต้องเสมอแม้แก้คะแนนทีหลัง
 *
 * ── รุ่น 8 เพิ่มอะไร (จำกัดครูผู้สอนตามวิชาด้วย) ──────────────────────────
 *   เดิมสิทธิ์ผูกกับชั้นอย่างเดียว ครูที่ได้ ม.5/1 จึงเห็น ม.5/1 ของทุกวิชาในชีตใบนี้
 *   รุ่นนี้แผ่น teachers เพิ่มคอลัมน์ท้ายตาราง "วิชาที่สอน"
 *     เว้นว่าง  = ทุกวิชา (เหมือนเดิม บัญชีเก่าจึงไม่เสียสิทธิ์)
 *     ใส่ชื่อไว้ = เห็นเฉพาะวิชานั้น ทั้งใบงานและผลการทำ
 *   ขอบเขตวิชาฝังอยู่ในโทเคนเหมือนขอบเขตชั้น แก้จากเบราว์เซอร์ไม่ได้
 *
 * ── รุ่น 7 เพิ่มอะไร (ครูผู้สอน) ─────────────────────────────────────────
 *   เพิ่มแผ่น teachers สำหรับครูท่านอื่นที่ช่วยคุมสอบวิชาเดียวกันแต่คนละชั้น
 *   ผู้ดูแลหลักกำหนดว่าครูแต่ละคนดูแลชั้นไหนได้บ้าง
 *   ครูผู้สอนเข้าระบบด้วย "ชื่อผู้ใช้ + รหัสผ่าน" แล้วจะเห็นและแก้ได้เฉพาะชั้นของตัวเอง
 *
 *   การกรองทำที่ฝั่งชีตทุกคำสั่ง ไม่ใช่ที่ฝั่งแอป เพราะฝั่งแอปแก้ได้จากเบราว์เซอร์
 *   สิ่งที่ครูผู้สอนทำได้ — มอบหมายใบงาน/ข้อสอบ · ดึงผล · แก้รายชื่อนักเรียน
 *   เฉพาะชั้นที่ได้รับมอบหมายเท่านั้น
 *   สิ่งที่ทำไม่ได้ — ซ่อมโครงสร้างชีต · ลบรายชื่อซ้ำทั้งแผ่น · จัดการครูผู้สอนด้วยกันเอง
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
var DEFAULT_ADMIN_PASS = '0850160338';
// รหัสผ่านตั้งต้นของนักเรียน — เข้าใช้ครั้งแรกแล้วระบบจะบังคับให้ตั้งใหม่
var DEFAULT_STUDENT_PASS = '1111';
// รหัสตั้งต้นของครูผู้สอน ใช้เมื่อผู้ดูแลหลักเพิ่มบัญชีโดยไม่ได้ตั้งรหัสให้
// เข้าครั้งแรกแล้วระบบจะบังคับให้เปลี่ยนทันที
var DEFAULT_TEACHER_PASS = '123456';
var TOKEN_HOURS = 12;          // อายุการเข้าใช้ต่อครั้ง
var MAX_LOGIN_FAIL = 8;        // ผิดเกินนี้ พักการเข้าใช้ชั่วคราว
var LOCK_MINUTES = 10;

/* ── วิชา ────────────────────────────────────────────────────────────────
   ชีตเดียวเก็บได้หลายวิชา โดยแยกด้วยคอลัมน์ subject
   แถวเก่าที่ยังไม่มีค่าในคอลัมน์นี้ = ฟิสิกส์ (ค่าเริ่มต้น)
   เพิ่มวิชาใหม่ในอนาคต แค่เติมชื่อลงในรายการนี้
   ⚠ ต้องเติมก่อนเปิดใช้เสมอ ถ้าลืม normSubject_ จะตกกลับไปเป็นวิชาเริ่มต้น
     แล้วข้อมูลของวิชาใหม่จะถูกบันทึกปนกับฟิสิกส์โดยไม่มีอะไรฟ้อง           */
var SUBJECTS = ['physics', 'math', 'physci'];
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
  students:    ['no', 'sid', 'name', 'cls', 'passHash', 'salt', 'mustChange', 'active', 'lastLogin',
                'alias', 'avatar', 'gear', 'showName', 'xpLogin', 'xpPrac', 'xpDay', 'xpDays', 'xpPracDay'],
  assignments: ['code', 'title', 'cls', 'spec', 'baseSeed', 'perStudent', 'g', 'easyG10',
                'openAt', 'closeAt', 'active', 'createdAt', 'subject', 'piMode'],
  submissions: ['ts', 'code', 'sid', 'status', 'score', 'max', 'pct', 'sec', 'revealed',
                'answers', 'device', 'subject', 'out', 'outSec', 'autoBy'],
  teachers:    ['user', 'name', 'passHash', 'salt', 'classes', 'mustChange', 'active',
                'lastLogin', 'createdAt', 'subjects'],
  /* คลังข้ออัตนัยของครู — หนึ่งข้ออาจกินหลายแถว ดูคำอธิบายที่หัวข้อ "คลังข้ออัตนัย" ด้านล่าง
     คอลัมน์เนื้อข้อมูลต้องอยู่ท้ายสุดเสมอ จะได้อ่านสารบัญโดยไม่ต้องลากเนื้อข้อมูลมาด้วย */
  esbank:      ['id', 'subject', 'topic', 'tags', 'at', 'up', 'use', 'used', 'del',
                'bytes', 'part', 'parts', 'data']
};
/* หัวตารางภาษาไทยที่คนอ่านเข้าใจ — เขียนไว้ที่แถว 1 ของแต่ละแผ่น */
var HEADERS = {
  students:    ['เลขที่', 'เลขประจำตัว', 'ชื่อ-นามสกุล', 'ชั้น',
                'รหัสผ่าน (เข้ารหัสแล้ว)', 'salt', 'ต้องเปลี่ยนรหัส', 'เปิดใช้งาน', 'เข้าใช้ล่าสุด',
                'นามแฝง', 'หน้าตา', 'ของแต่งตัว', 'เปิดเผยชื่อ',
                'แต้มเข้าใช้', 'แต้มฝึกเอง', 'วันที่ได้แต้มเข้าใช้', 'เข้าต่อเนื่อง (วัน)',
                'วันที่ได้แต้มฝึกเอง'],
  assignments: ['รหัสใบงาน', 'ชื่อใบงาน', 'ชั้น', 'สเปกโจทย์', 'เลขสุ่มฐาน', 'เลขต่างรายคน',
                'ค่า g', 'ระดับง่ายใช้ g=10', 'เปิดเมื่อ', 'ปิดรับเมื่อ', 'เปิดใช้งาน', 'สร้างเมื่อ',
                'วิชา', 'ค่า π'],
  submissions: ['เวลาที่ส่ง', 'รหัสใบงาน', 'เลขประจำตัว', 'สถานะ', 'คะแนน', 'คะแนนเต็ม',
                'ร้อยละ', 'เวลาที่ใช้ (วินาที)', 'เปิดเฉลย', 'คำตอบรายข้อ', 'อุปกรณ์', 'วิชา',
                'ออกจากแอป (ครั้ง)', 'เวลานอกแอป (วินาที)', 'ระบบส่งให้เพราะ'],
  teachers:    ['ชื่อผู้ใช้', 'ชื่อ-นามสกุล', 'รหัสผ่าน (เข้ารหัสแล้ว)', 'salt', 'ชั้นที่ดูแล',
                'ต้องเปลี่ยนรหัส', 'เปิดใช้งาน', 'เข้าใช้ล่าสุด', 'สร้างเมื่อ', 'วิชาที่สอน'],
  esbank:      ['รหัสข้อ', 'วิชา', 'บทที่', 'คำค้น', 'สร้างเมื่อ', 'แก้ล่าสุด',
                'ถูกใช้ (ครั้ง)', 'ใช้ล่าสุด', 'ลบแล้ว', 'ขนาด (ตัวอักษร)',
                'ท่อนที่', 'ทั้งหมดกี่ท่อน', 'เนื้อข้อสอบ']
};
/* คอลัมน์ของแผ่นคลังข้ออัตนัย (นับจาก 1) */
var C_EB_ID = 1, C_EB_SUBJ = 2, C_EB_TOPIC = 3, C_EB_TAGS = 4, C_EB_AT = 5,
    C_EB_UP = 6, C_EB_USE = 7, C_EB_USED = 8, C_EB_DEL = 9, C_EB_BYTES = 10,
    C_EB_PART = 11, C_EB_PARTS = 12, C_EB_DATA = 13;

/* ตำแหน่งคอลัมน์ที่ใช้บ่อย (นับจาก 1) */
var C_NO = 1, C_SID = 2, C_NAME = 3, C_CLS = 4, C_HASH = 5, C_SALT = 6,
    C_MUST = 7, C_ACTIVE = 8, C_LOGIN = 9;
/* คอลัมน์ของระบบเลเวล ต่อท้ายจากของเดิม แถวเก่าที่ยังว่างถือเป็นศูนย์ทั้งหมด */
var C_ALIAS = 10, C_AVATAR = 11, C_GEAR = 12, C_SHOW = 13,
    C_XPLOGIN = 14, C_XPPRAC = 15, C_XPDAY = 16, C_XPDAYS = 17, C_XPPRACDAY = 18;
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
    // คอลัมน์เลขประจำตัวและชั้นต้องเป็นข้อความ ไม่งั้นศูนย์นำหน้าหาย และชั้นจะไม่ถูกแปลงเป็นวันที่
    if (name === 'students') {
      sh.getRange('B:B').setNumberFormat('@');
      sh.getRange('D:D').setNumberFormat('@');
    }
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
         j.indexOf('ชื่อ-นามสกุล') >= 0 || j.indexOf('รหัสใบงาน') >= 0 ||
         j.indexOf('เวลาที่ส่ง') >= 0 || j.indexOf('รหัสข้อ') >= 0;
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
      var v = vals[r][c];
      if (name === 'students' && keys[c] === 'cls') v = normCls_(v);
      else if (name === 'students' && keys[c] === 'sid') v = normSid_(v);
      else if (name === 'assignments' && keys[c] === 'cls') v = normCls_(v);
      o[keys[c]] = v;
      if (String(v).length) blank = false;
    }
    if (!blank) out.push(o);
  }
  _cacheAll[name] = out;
  return out;
}
function dropCache_(name) {
  delete _cacheAll[name];
  // แต้มจากงานคิดจากแผ่นส่งคำตอบล้วน ๆ พอมีการส่งเพิ่มก็ต้องคิดใหม่
  if (name === 'submissions') _xpWork = null;
}

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
  // อ่านถึงคอลัมน์ร้อยละด้วย เพราะระบบแต้มคิดโบนัสจากคะแนนที่ทำได้
  var head = cols_('submissions', 2, 6);                 // B..G รหัส เลขประจำตัว สถานะ คะแนน เต็ม ร้อยละ
  if (!head.length) return [];
  var subj = cols_('submissions', C_SUB_SUBJECT, 1);     // L
  return head.map(function (r, i) {
    return { code: String(r[0]).toUpperCase(), sid: r[1], status: String(r[2]),
             pct: Number(r[5]) || 0,
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

/* ── ครูผู้สอนและขอบเขตชั้นเรียน ────────────────────────────────────────
   ขอบเขตเก็บอยู่ใน "โทเคน" ที่เซ็นด้วย SECRET จึงแก้จากฝั่งเบราว์เซอร์ไม่ได้
   คำสั่งไหนที่คืนหรือแก้ข้อมูลนักเรียน ต้องกรองด้วย inScope_ ทุกครั้ง       */

/* Google Sheet อ่าน "5/4" เป็นวันที่ ตัวเลขสองตัวจึงกลายเป็นวันกับเดือน
   จะเรียงกลับเป็นชั้นได้ถูกต้องหรือไม่ ขึ้นกับภาษาของชีต
     ภาษาไทย (วัน/เดือน)  "5/4" -> วันที่ 5 เดือน 4  ต้องอ่านกลับเป็น วัน/เดือน
     ภาษาอังกฤษอเมริกา    "5/4" -> เดือน 5 วันที่ 4  ต้องอ่านกลับเป็น เดือน/วัน
   เดาเองไม่ได้ จึงถามภาษาของชีตตรง ๆ ถามครั้งเดียวแล้วจำไว้ เพราะเรียกทีละแถวจะช้ามาก */
var _mFirst = null;
function monthFirstSheet_() {
  if (_mFirst === null) {
    var loc = '';
    try { loc = String(book_().getSpreadsheetLocale() || ''); } catch (e) { loc = ''; }
    // เขียนเดือนก่อนวันมีอยู่ไม่กี่ที่ ที่เหลือทั้งโลกเขียนวันก่อนเดือน
    _mFirst = /^(en_US|en_PH|en_CA|fil_PH)$/i.test(loc);
  }
  return _mFirst;
}
/** เรียงตัวเลขจากวันที่กลับเป็นชั้น โดยยึดว่าเลขหน้าต้องเป็นระดับชั้น ม.1-ม.6 */
function clsFromDate_(dt) {
  var d = Number(Utilities.formatDate(dt, 'Asia/Bangkok', 'd'));
  var m = Number(Utilities.formatDate(dt, 'Asia/Bangkok', 'M'));
  var dm = d + '/' + m, md = m + '/' + d;
  var dmOK = d >= 1 && d <= 6, mdOK = m >= 1 && m <= 6;
  // ถ้ามีทางเดียวที่เป็นชั้นได้จริง ให้ใช้ทางนั้น ไม่ต้องสนภาษาของชีต
  if (dmOK && !mdOK) return 'ม.' + dm;
  if (mdOK && !dmOK) return 'ม.' + md;
  // สองทางเป็นไปได้ทั้งคู่ เช่น 5/4 กับ 4/5 ตัดสินด้วยภาษาของชีต
  return 'ม.' + (monthFirstSheet_() ? md : dm);
}

/** แปลงชื่อชั้นให้เป็นมาตรฐาน ม.X/Y และแก้กรณีชีตแปลงเป็นวันที่ เช่น 5/1 -> ม.5/1 */
function normCls_(v) {
  if (v == null) return '';
  if (Object.prototype.toString.call(v) === '[object Date]' || (v instanceof Date)) {
    if (!isNaN(v.getTime())) return clsFromDate_(v);
  }
  var s = String(v).trim();
  if (!s) return '';
  if (/^\d{4}-\d{2}-\d{2}T/i.test(s)) {
    var dt = new Date(s);
    if (!isNaN(dt.getTime())) return clsFromDate_(dt);
  }
  var m = s.match(/^(?:ม\.?|ห้อง)\s*(\d+\/\d+)$/i);
  if (m) return 'ม.' + m[1];
  if (/^\d+\/\d+$/.test(s)) return 'ม.' + s;
  return s;
}

function normUser_(v) { return String(v == null ? '' : v).trim().toLowerCase(); }
/** ชื่อชั้นใช้เทียบแบบตรงตัวหลังตัดช่องว่างหัวท้าย และแปลงเป็นมาตรฐาน ม.X/Y */
function clsKey_(v) { return normCls_(v); }
/** แปลงข้อความ "ม.4/1, ม.4/2" เป็นอาเรย์ */
function parseClasses_(v) {
  return String(v == null ? '' : v).split(',').map(normCls_).filter(function (x) { return !!x; });
}
function findTeacher_(user) {
  var u = normUser_(user), list = readAll_('teachers');
  for (var i = 0; i < list.length; i++) {
    if (normUser_(list[i].user) === u) return list[i];
  }
  return null;
}
/** ขอบเขตของโทเคนนี้ — null = ผู้ดูแลหลัก เห็นทุกชั้น · อาเรย์ = ครูผู้สอน เห็นเฉพาะชั้นในนั้น */
function scopeOf_(t) { return (t && t.sub) ? (t.cls || []) : null; }
function inScope_(sc, cls) { return !sc || sc.indexOf(clsKey_(cls)) >= 0; }

/** แปลงข้อความ "physics, physci" เป็นอาเรย์ของวิชาที่รู้จัก
    ชื่อวิชาที่ไม่รู้จักถูกทิ้ง ไม่ใช่ตกกลับเป็นวิชาเริ่มต้นแบบ normSubject_
    เพราะตรงนี้เป็นเรื่องสิทธิ์ การเดาผิดหมายถึงเปิดวิชาที่ไม่ควรเปิด */
function parseSubjects_(v) {
  return String(v == null ? '' : v).split(',')
    .map(function (x) { return String(x).trim().toLowerCase(); })
    .filter(function (x) { return SUBJECTS.indexOf(x) >= 0; });
}
/** วิชาที่ครูคนนี้สอน — null = ทุกวิชา (ผู้ดูแลหลัก หรือครูที่ยังไม่ได้จำกัดวิชา)
    เว้นว่าง = ทุกวิชา จงใจให้เป็นแบบนี้ บัญชีที่สร้างก่อนมีคอลัมน์นี้จะได้ไม่เสียสิทธิ์ */
function subjScopeOf_(t) {
  var s = (t && t.sub) ? (t.sbj || []) : [];
  return s.length ? s : null;
}
/** เรียกในทุกคำสั่งที่ผูกกับวิชา — ปฏิเสธถ้าครูคนนี้ไม่ได้สอนวิชานั้น */
function needSubject_(t, subject) {
  var ss = subjScopeOf_(t);
  if (ss && ss.indexOf(subject) < 0) {
    throw new Error('AUTH: วิชานี้ไม่ได้อยู่ในความดูแลของคุณ');
  }
  return subject;
}
/** คำสั่งที่กระทบทั้งแผ่น ต้องเป็นผู้ดูแลหลักเท่านั้น */
function needMain_(req) {
  var t = needAdmin_(req);
  if (t.sub) throw new Error('AUTH: คำสั่งนี้ใช้ได้เฉพาะผู้ดูแลหลัก');
  return t;
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
        // เลขประจำตัวและชั้นเก็บเป็นข้อความเสมอ กันศูนย์นำหน้าหายและกัน Google Sheet แปลงชั้นเป็นวันที่
        body.forEach(function (row) {
          row[C_SID - 1] = normSid_(row[C_SID - 1]);
          row[C_CLS - 1] = normCls_(row[C_CLS - 1]);
        });
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
        if (n === 'students') {
          sh.getRange(2, C_SID, body.length, 1).setNumberFormat('@');
          sh.getRange(2, C_CLS, body.length, 1).setNumberFormat('@');
        }
        if (n === 'submissions') sh.getRange(2, 3, body.length, 1).setNumberFormat('@');
        sh.getRange(2, 1, body.length, wide).setValues(body);
      }
      sh.setFrozenRows(1);
      r.rows = body.length;
      r.addedHeader = !hasHeader;
      report[n] = r;
    });
    _sheets = {}; _cacheAll = {}; _sidCol = null; _xpWork = null;
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

/* ตรวจและซ่อมโครงสร้างชีตกระทบทุกแผ่นทุกชั้น จึงสงวนไว้ให้ผู้ดูแลหลักเท่านั้น */
function apiSheetInspect_(req) { needMain_(req); return inspectSheets_(); }
function apiSheetRepair_(req)  { needMain_(req); return repairSheets_(); }

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
  return json_({ ok: true, service: 'quiz-bank', version: 13, subjects: SUBJECTS,
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
    case 'teacherList':   return apiTeacherList_(req);
    case 'teacherSave':   return apiTeacherSave_(req);
    case 'teacherRemove': return apiTeacherRemove_(req);
    case 'teacherReset':  return apiTeacherReset_(req);
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
    case 'xpMe':          return apiXpMe_(req);
    case 'xpBoard':       return apiXpBoard_(req);
    case 'esBankList':    return apiEsBankList_(req);
    case 'esBankGet':     return apiEsBankGet_(req);
    case 'esBankSave':    return apiEsBankSave_(req);
    case 'esBankDel':     return apiEsBankDel_(req);
    case 'xpPractice':    return apiXpPractice_(req);
    case 'xpSkin':        return apiXpSkin_(req);
    case 'lockList':      return apiLockList_(req);
    case 'unlock':        return apiUnlock_(req);
    case 'examPing':      return apiExamPing_(req);
    case 'examMonitor':   return apiExamMonitor_(req);
    default: throw new Error('ไม่รู้จักคำสั่ง: ' + action);
  }
}

/* ====== เข้าใช้งาน ====================================================== */

function apiPing_(req) {
  var t0 = Date.now();
  // บอกบทบาทกลับไปให้แอปปรับหน้าจอ (โทเคนอาจไม่มีก็ได้ ตอนยังไม่ได้เข้าระบบ)
  var who = readToken_(req.token);
  var role = (who && who.role === 'admin') ? (who.sub ? 'sub' : 'main') : '';
  var myCls = (who && who.sub) ? (who.cls || []) : null;
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
      !headerComplete_(sheet_('submissions'), 'submissions') ||
      !headerComplete_(sheet_('teachers'), 'teachers')) needRepair = true;

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

  /* รายชื่อห้องที่ระบบ "อ่านได้จริง" จากชีต พร้อมจำนวนคน
     ถ้าห้องที่เห็นตรงนี้ไม่ตรงกับที่ครูตั้งใจ แปลว่าช่องชั้นถูกแปลงเป็นวันที่
     ใส่ไว้ให้หาสาเหตุได้จบในครั้งเดียว ไม่ต้องไล่ถามทีละจุด */
  var clsCount = {};
  readAll_('students').forEach(function (st) {
    var c = normCls_(st.cls) || '(ไม่ระบุ)';
    clsCount[c] = (clsCount[c] || 0) + 1;
  });
  var locale = '';
  try { locale = String(book_().getSpreadsheetLocale() || ''); } catch (e) {}

  return {
    version: 13, role: role, myClasses: myCls,
    locale: locale, monthFirst: monthFirstSheet_(), classes: clsCount,
    teachers: Math.max(0, sheet_('teachers').getLastRow() - 1),
    needRepair: needRepair, layout: layout, subjects: SUBJECTS,
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

/** ครูผู้สอนเข้าระบบด้วยชื่อผู้ใช้ + รหัสผ่าน */
function teacherLogin_(user, pass) {
  var cache = CacheService.getScriptCache(), key = 'fail_t_' + user;
  var fails = Number(cache.get(key) || 0);
  if (fails >= MAX_LOGIN_FAIL) {
    throw new Error('กรอกรหัสผิดหลายครั้งเกินไป กรุณารออีก ' + LOCK_MINUTES + ' นาทีแล้วลองใหม่');
  }
  var t = findTeacher_(user);
  if (!t) {
    cache.put(key, String(fails + 1), LOCK_MINUTES * 60);
    throw new Error('ไม่พบชื่อผู้ใช้ ' + user + ' — ให้ผู้ดูแลหลักเพิ่มบัญชีให้ก่อน');
  }
  if (String(t.active) === 'false' || String(t.active) === '0') {
    throw new Error('บัญชีนี้ถูกระงับการใช้งาน');
  }
  var salt = String(t.salt || ''), hash = String(t.passHash || ''), needFix = false;
  if (!hash) {
    salt = newSalt_(); hash = hashPass_(DEFAULT_TEACHER_PASS, salt); needFix = true;
  } else if (hash === pass) {
    // ผู้ดูแลกรอกรหัสผ่านแบบข้อความธรรมดาลงในชีตโดยตรง ให้ยอมรับแล้วแปลงเป็นแฮชทันที
    salt = newSalt_(); hash = hashPass_(pass, salt); needFix = true;
  }
  if (hashPass_(pass, salt) !== hash) {
    cache.put(key, String(fails + 1), LOCK_MINUTES * 60);
    throw new Error('รหัสผ่านไม่ถูกต้อง (ผิดได้อีก ' + (MAX_LOGIN_FAIL - fails - 1) + ' ครั้ง)');
  }
  cache.remove(key);
  var cls = parseClasses_(t.classes);
  if (!cls.length) throw new Error('บัญชีนี้ยังไม่ได้กำหนดชั้นที่ดูแล — แจ้งผู้ดูแลหลักให้กำหนดก่อน');
  var sbj = parseSubjects_(t.subjects);
  var sh = sheet_('teachers'), keys = SHEETS.teachers;
  if (needFix) {
    sh.getRange(t._row, keys.indexOf('passHash') + 1, 1, 2).setValues([[hash, salt]]);
  }
  sh.getRange(t._row, keys.indexOf('lastLogin') + 1).setValue(new Date());
  dropCache_('teachers');
  return {
    token: makeToken_({ role: 'admin', sub: normUser_(t.user), cls: cls, sbj: sbj }),
    role: 'sub', user: normUser_(t.user), name: String(t.name || ''), classes: cls,
    subjects: sbj,
    mustChange: String(t.mustChange) !== 'false' && String(t.mustChange) !== '0'
  };
}

function apiAdminLogin_(req) {
  // ส่งชื่อผู้ใช้มาด้วย = เข้าในฐานะครูผู้สอน · ไม่ส่ง = ผู้ดูแลหลักแบบเดิม
  var user = normUser_(req.user);
  if (user) return teacherLogin_(user, String(req.pass || ''));
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
  return { token: makeToken_({ role: 'admin' }), role: 'main', classes: null,
           isDefault: hashPass_(DEFAULT_ADMIN_PASS, salt) === hash };
}

function apiAdminPass_(req) {
  var t = needAdmin_(req);
  var np = String(req.newPass || '');
  // ครูผู้สอนเปลี่ยนรหัสของตัวเอง ไม่ใช่ของผู้ดูแลหลัก
  if (t.sub) {
    if (np.length < 6) throw new Error('รหัสผ่านต้องยาวอย่างน้อย 6 ตัว');
    if (np === DEFAULT_TEACHER_PASS) throw new Error('ห้ามใช้รหัสตั้งต้น กรุณาตั้งรหัสใหม่');
    var me = findTeacher_(t.sub);
    if (!me) throw new Error('ไม่พบบัญชีนี้');
    var st = newSalt_();
    me.salt = st; me.passHash = hashPass_(np, st); me.mustChange = false;
    writeRow_('teachers', me._row, me);
    return { ok: true };
  }
  if (np.length < 8) throw new Error('รหัสผู้ดูแลต้องยาวอย่างน้อย 8 ตัว');
  var salt = newSalt_();
  props_().setProperty('ADMIN_SALT', salt);
  props_().setProperty('ADMIN_HASH', hashPass_(np, salt));
  return { ok: true };
}

/* ====== จัดการครูผู้สอน (ผู้ดูแลหลักเท่านั้น) ==========================
   ครูผู้สอนหนึ่งคนผูกกับรายชื่อชั้นที่ดูแล และรายชื่อวิชาที่สอน
   ทั้งสองอย่างเก็บเป็นข้อความคั่นด้วยจุลภาค
   ชื่อชั้นต้องตรงกับที่เขียนในคอลัมน์ "ชั้น" ของแผ่น students เป๊ะ ๆ
   ช่องวิชาเว้นว่าง = สอนทุกวิชาในชีตใบนี้ (พฤติกรรมเดิมก่อนมีคอลัมน์นี้)
   ======================================================================== */

function apiTeacherList_(req) {
  needMain_(req);
  return readAll_('teachers').map(function (t) {
    return { user: normUser_(t.user), name: String(t.name || ''),
             classes: parseClasses_(t.classes),
             subjects: parseSubjects_(t.subjects),
             active: String(t.active) !== 'false' && String(t.active) !== '0',
             mustChange: String(t.mustChange) !== 'false' && String(t.mustChange) !== '0',
             lastLogin: t.lastLogin ? String(t.lastLogin) : '' };
  });
}

/** เพิ่มหรือแก้ครูผู้สอนหนึ่งคน — ส่ง pass มาด้วยก็ตั้งรหัสให้ ไม่ส่งก็คงรหัสเดิม */
function apiTeacherSave_(req) {
  needMain_(req);
  var o = req.teacher || {};
  var user = normUser_(o.user);
  if (!/^[a-z0-9._-]{3,20}$/.test(user)) {
    throw new Error('ชื่อผู้ใช้ต้องเป็นอังกฤษตัวเล็ก ตัวเลข จุด ขีด ยาว 3-20 ตัว');
  }
  var name = String(o.name || '').trim();
  if (!name) throw new Error('ใส่ชื่อ-นามสกุลของครูด้วย');
  var cls = (o.classes || []).map(clsKey_).filter(function (x) { return !!x; });
  if (!cls.length) throw new Error('เลือกชั้นที่ครูคนนี้ดูแลอย่างน้อยหนึ่งชั้น');
  /* วิชา — ส่งมาเป็นอาเรย์ ถ้าไม่ส่งหรือส่งว่าง = ทุกวิชา
     ชื่อวิชาที่ไม่รู้จักต้องแจ้งกลับ ไม่ใช่เงียบ ๆ ทิ้งไป ไม่งั้นครูจะนึกว่าตั้งสำเร็จ */
  var sbj = (o.subjects || []).map(function (x) { return String(x).trim().toLowerCase(); })
                              .filter(function (x) { return !!x; });
  for (var si = 0; si < sbj.length; si++) {
    if (SUBJECTS.indexOf(sbj[si]) < 0) throw new Error('ไม่รู้จักวิชา ' + sbj[si]);
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var row = findTeacher_(user);
    var rec = {
      user: user, name: name, classes: cls.join(', '), subjects: sbj.join(', '),
      passHash: row ? row.passHash : '', salt: row ? row.salt : '',
      mustChange: row ? row.mustChange : true,
      active: o.active === false ? false : true,
      lastLogin: row ? row.lastLogin : '',
      createdAt: row ? row.createdAt : new Date()
    };
    var pass = String(o.pass || '');
    if (pass) {
      if (pass.length < 6) throw new Error('รหัสผ่านต้องยาวอย่างน้อย 6 ตัว');
      var st = newSalt_();
      rec.salt = st; rec.passHash = hashPass_(pass, st); rec.mustChange = true;
    }
    if (row) writeRow_('teachers', row._row, rec); else appendRow_('teachers', rec);
    return { user: user, updated: !!row, classes: cls, subjects: sbj };
  } finally { lock.releaseLock(); }
}

function apiTeacherRemove_(req) {
  needMain_(req);
  var user = normUser_(req.user);
  var row = findTeacher_(user);
  if (!row) return { removed: 0 };
  sheet_('teachers').deleteRow(row._row);
  dropCache_('teachers');
  return { removed: 1 };
}

/** ตั้งรหัสครูผู้สอนกลับเป็นค่าตั้งต้น ใช้เมื่อครูลืมรหัส */
function apiTeacherReset_(req) {
  needMain_(req);
  var row = findTeacher_(normUser_(req.user));
  if (!row) throw new Error('ไม่พบบัญชีนี้');
  var st = newSalt_();
  row.salt = st; row.passHash = hashPass_(DEFAULT_TEACHER_PASS, st); row.mustChange = true;
  writeRow_('teachers', row._row, row);
  return { ok: true, pass: DEFAULT_TEACHER_PASS };
}

/* ====== รายชื่อนักเรียน (ผู้ดูแลเท่านั้น) ===============================
   รายชื่อใช้ร่วมกันทุกวิชา — นักเรียนคนหนึ่งมีบัญชีเดียว ลงชื่อครั้งเดียว
   แล้วเข้าได้ทุกวิชาที่ครูเปิดให้                                        */

function apiRosterList_(req) {
  var sc = scopeOf_(needAdmin_(req));
  return readAll_('students').filter(function (s) {
    return inScope_(sc, s.cls);
  }).map(function (s) {
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
  var sc = scopeOf_(needAdmin_(req));
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
      // ครูผู้สอนเพิ่มได้เฉพาะนักเรียนในชั้นที่ตัวเองดูแล
      if (!inScope_(sc, r.cls)) {
        skipped.push({ sid: sid, name: name,
                       why: 'อยู่นอกชั้นที่คุณดูแล (' + (clsKey_(r.cls) || 'ไม่ระบุชั้น') + ')' });
        return;
      }
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
      /* แถวต้องยาวเท่าจำนวนคอลัมน์จริงเสมอ ไม่งั้นตอนเพิ่มคอลัมน์ใหม่ท้ายตาราง
         การเขียนลงชีตจะพังเพราะความกว้างไม่ตรงกัน */
      var nrow = [r.no == null ? '' : r.no, sid, name, normCls_(r.cls),
                  hashPass_(DEFAULT_STUDENT_PASS, salt), salt, true, true, ''];
      while (nrow.length < W) nrow.push('');
      newRows.push(nrow);
      idx[key] = -1;                             // กันซ้ำกันเองภายในก้อนเดียวกัน
      added++;
    });

    if (newRows.length) {
      var at = sh.getLastRow() + 1;
      // บังคับให้คอลัมน์เลขประจำตัวและชั้นเป็นข้อความก่อนเขียน ไม่งั้นศูนย์นำหน้าจะหาย และชั้นจะไม่กลายเป็นวันที่
      sh.getRange(at, C_SID, newRows.length, 1).setNumberFormat('@');
      sh.getRange(at, C_CLS, newRows.length, 1).setNumberFormat('@');
      sh.getRange(at, 1, newRows.length, W).setValues(newRows);
    }
    // อัปเดตของเดิมเฉพาะเมื่อสั่งมาเท่านั้น และเขียนแค่คอลัมน์ B-D
    if (upd.length) {
      upd.sort(function (a, b) { return a.row - b.row; });
      upd.forEach(function (u) {
        sh.getRange(u.row, C_CLS, 1, 1).setNumberFormat('@');
        sh.getRange(u.row, 1, 1, 4).setValues([[u.no, u.sid, u.name, normCls_(u.cls)]]);
      });
      updated = upd.length;
    }
    _sidCol = null; dropCache_('students');
    return { added: added, updated: updated, existed: existed, skipped: skipped, total: rows.length };
  } finally { lock.releaseLock(); }
}

/** ลบแถวที่เลขประจำตัวซ้ำกัน เก็บแถวแรกไว้ — ใช้ซ่อมชีตที่เคยอัพซ้ำไปแล้ว */
function apiRosterDedupe_(req) {
  needMain_(req);   // ลบซ้ำทั้งแผ่น กระทบทุกชั้น จึงสงวนไว้ให้ผู้ดูแลหลัก
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
  var sc = scopeOf_(needAdmin_(req));
  var ids = {}; (req.sids || []).forEach(function (s) { ids[sidKey_(s)] = 1; });
  var list = readAll_('students'), n = 0;
  list.forEach(function (s) {
    if (!ids[sidKey_(s.sid)]) return;
    if (!inScope_(sc, s.cls)) return;
    var salt = newSalt_();
    s.salt = salt; s.passHash = hashPass_(DEFAULT_STUDENT_PASS, salt); s.mustChange = true;
    writeRow_('students', s._row, s);
    n++;
  });
  return { reset: n, pass: DEFAULT_STUDENT_PASS };
}

function apiRosterRemove_(req) {
  var sc = scopeOf_(needAdmin_(req));
  var ids = {}; (req.sids || []).forEach(function (s) { ids[sidKey_(s)] = 1; });
  var sh = sheet_('students'), list = readAll_('students');
  var rows = list.filter(function (s) { return ids[sidKey_(s.sid)] && inScope_(sc, s.cls); })
                 .map(function (s) { return s._row; }).sort(function (a, b) { return b - a; });
  rows.forEach(function (r) { sh.deleteRow(r); });
  return { removed: rows.length };
}

/* ====== ใบงานที่มอบหมาย =================================================
   ใบงานแยกตามวิชา — แอพคณิตจะเห็นเฉพาะใบงานคณิต แอพฟิสิกส์เห็นเฉพาะฟิสิกส์
   แถวเก่าที่ยังไม่มีค่าในคอลัมน์วิชา ถือเป็นฟิสิกส์ทั้งหมด               */

function apiAssignSave_(req) {
  var me = needAdmin_(req), sc = scopeOf_(me);
  var a = req.assignment || {};
  var code = String(a.code || '').trim().toUpperCase();
  if (!code) throw new Error('ไม่มีรหัสใบงาน');
  // ครูผู้สอนต้องระบุชั้น และต้องเป็นชั้นที่ตัวเองดูแล
  // ใบงานที่ไม่ระบุชั้นจะเปิดให้นักเรียนทุกชั้น จึงเป็นสิทธิ์ของผู้ดูแลหลักเท่านั้น
  if (sc) {
    var ac = clsKey_(a.cls);
    if (!ac) throw new Error('ครูผู้สอนต้องระบุชั้นของใบงาน (มอบหมายให้ทุกชั้นไม่ได้)');
    if (!inScope_(sc, ac)) throw new Error('ชั้น ' + ac + ' ไม่ได้อยู่ในความดูแลของคุณ');
  }
  var subject = needSubject_(me, normSubject_(a.subject || req.subject));
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
  var me = needAdmin_(req);
  var subject = needSubject_(me, reqSubject_(req));
  // นับผู้ส่งต่อใบงาน โดยนับเฉพาะการส่งของวิชานี้
  var count = {};
  submissionKeys_().forEach(function (r) {
    if (r.status !== 'final' || r.subject !== subject) return;
    count[r.code] = count[r.code] || {};
    count[r.code][sidKey_(r.sid)] = 1;
  });
  var sc = scopeOf_(me);
  return readAll_('assignments').filter(function (a) {
    return normSubject_(a.subject) === subject && inScope_(sc, a.cls);
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
  var me = needAdmin_(req), sc = scopeOf_(me);
  var code = String(req.code || '').trim().toUpperCase();
  var subject = needSubject_(me, reqSubject_(req));
  var sh = sheet_('assignments'), list = readAll_('assignments');
  for (var i = 0; i < list.length; i++) {
    if (String(list[i].code).trim().toUpperCase() !== code) continue;
    // ห้ามลบข้ามวิชา กันครูเผลอลบใบงานของอีกวิชาจากหน้าจอที่กำลังเปิดอยู่
    if (normSubject_(list[i].subject) !== subject) {
      throw new Error('ใบงาน ' + code + ' เป็นของอีกวิชาหนึ่ง ลบจากหน้านี้ไม่ได้');
    }
    if (!inScope_(sc, list[i].cls)) {
      throw new Error('ใบงาน ' + code + ' เป็นของชั้นที่คุณไม่ได้ดูแล');
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
  var myCls = row > 0 ? normCls_(sheet_('students').getRange(row, C_CLS).getValue()) : '';
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
    /* ไม่ระบุชั้น = มอบหมายให้ทุกห้อง ต้องขึ้นที่เครื่องนักเรียนเสมอ
       เคยถูกเปลี่ยนเป็น "ต้องตรงชั้นเท่านั้น" ตอนทำเรื่องบังคับเลือกห้องสอบ
       ผลคือครูกดมอบหมายสำเร็จทุกครั้ง แต่ของไม่ขึ้นที่เครื่องนักเรียนและไม่มีข้อความบอกเหตุ
       การบังคับเลือกห้องเป็นเรื่องของ "ตอนมอบหมาย" (assignSave) ไม่ใช่ตอนนักเรียนอ่าน
       ชั้นที่ยังไม่ได้บันทึกในชีตก็ต้องเห็น ไม่งั้นนักเรียนที่ข้อมูลไม่ครบจะไม่เห็นอะไรเลย */
    var c = normCls_(a.cls);
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

/* ====== แต้มสะสมและเลเวลของนักเรียน ====================================
   แต้มต้องให้ฝั่งชีตเป็นคนคิดเท่านั้น ห้ามให้แอปส่งมาบอกว่าขอแต้มเท่าไร
   ไม่งั้นนักเรียนแก้ตัวเลขในเครื่องตัวเองแล้วขึ้นอันดับหนึ่งได้ทันที

   แต้มมาจากสามทาง
     เข้าใช้ครั้งแรกของวัน  ชีตจำวันที่ไว้ วันเดียวกันขอซ้ำไม่ได้ ต่อเนื่องกันมีโบนัส
     ฝึกเองครบห้าข้อในวัน   ชีตจำวันที่ไว้เหมือนกัน วันละครั้ง
     ส่งใบงานของครู         ไม่เก็บสถานะเลย คิดสดจากแผ่นส่งคำตอบทุกครั้ง
                            จึงไม่มีทางได้ซ้ำ และย้อนหลังได้ถูกต้องเสมอ      */
var XP_LOGIN = 10;
var XP_STREAK_MAX = 20;
var XP_PRACTICE = 20;
var XP_PRACTICE_MIN = 5;
var XP_ASSIGN = 100;
var LEVEL_MAX = 99;

/** แต้มสะสมที่ต้องมีเพื่ออยู่ที่เลเวลนั้น — เลเวล 99 ราวหมื่นสองพันแต้ม
    เท่ากับขยันสม่ำเสมอทั้งปีการศึกษา ทำแต่แบบฝึกหัดอย่างเดียวไปไม่ถึง */
function xpForLevel_(L) { return Math.round(1.2 * L * L + 8 * L); }
function levelOfXp_(xp) {
  var lv = 0;
  for (var i = 1; i <= LEVEL_MAX; i++) { if (xp >= xpForLevel_(i)) lv = i; else break; }
  return lv;
}
function todayStr_() { return Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd'); }
function dayDiff_(a, b) {
  var x = new Date(a + 'T00:00:00Z').getTime(), y = new Date(b + 'T00:00:00Z').getTime();
  if (isNaN(x) || isNaN(y)) return 999;
  return Math.round((y - x) / 86400000);
}

/** แต้มจากงานที่ครูสั่ง ของ "ทุกคน" ในรอบเดียว
    ไล่แผ่นส่งคำตอบครั้งเดียวแล้วแจกให้ทุกคนพร้อมกัน
    ถ้าไล่ทีละคนแบบเดิม พอทำอันดับทั้งโรงเรียนจะกลายเป็นไล่ข้อมูลเป็นล้านรอบ ชีตค้างแน่
    เก็บผลไว้ในหน่วยความจำของรอบทำงานนั้น เรียกซ้ำในคำสั่งเดียวกันจึงไม่คิดใหม่ */
var _xpWork = null;
function xpWorkAll_() {
  if (_xpWork) return _xpWork;
  var best = {};                       // เลขประจำตัว -> รหัสใบงาน -> ร้อยละที่ดีที่สุด
  submissionKeys_().forEach(function (r) {
    if (r.status !== 'final') return;
    var who = sidKey_(r.sid);
    if (!who) return;
    var k = String(r.code).toUpperCase();
    var pct = Math.max(0, Math.min(100, Number(r.pct) || 0));
    if (!best[who]) best[who] = {};
    if (best[who][k] == null || pct > best[who][k]) best[who][k] = pct;
  });
  var out = {};
  Object.keys(best).forEach(function (who) {
    var xp = 0, n = 0;
    Object.keys(best[who]).forEach(function (k) { xp += XP_ASSIGN + Math.round(best[who][k]); n++; });
    out[who] = { xp: xp, works: n };
  });
  _xpWork = out;
  return out;
}
function xpFromWork_(sid) {
  return xpWorkAll_()[sidKey_(sid)] || { xp: 0, works: 0 };
}

/** อ่านโปรไฟล์เกมของนักเรียนหนึ่งคน พร้อมให้แต้มเข้าใช้ประจำวันถ้ายังไม่ได้ */
function xpProfile_(row, giveDaily) {
  var sh = sheet_('students');
  var cells = sh.getRange(row, 1, 1, SHEETS.students.length).getValues()[0];
  var get = function (c) { return cells[c - 1]; };
  var today = todayStr_();
  var xpLogin = Number(get(C_XPLOGIN)) || 0;
  var xpPrac = Number(get(C_XPPRAC)) || 0;
  var lastDay = String(get(C_XPDAY) || '');
  var days = Number(get(C_XPDAYS)) || 0;
  var gained = 0;

  if (giveDaily && lastDay !== today) {
    // ต่อเนื่องจากเมื่อวานนับต่อ ขาดไปแล้วเริ่มนับหนึ่งใหม่
    days = (lastDay && dayDiff_(lastDay, today) === 1) ? days + 1 : 1;
    gained = XP_LOGIN + Math.min(XP_STREAK_MAX, Math.max(0, days - 1) * 2);
    xpLogin += gained;
    sh.getRange(row, C_XPLOGIN).setValue(xpLogin);
    sh.getRange(row, C_XPDAY).setValue(today);
    sh.getRange(row, C_XPDAYS).setValue(days);
    dropCache_('students');
  }

  var work = xpFromWork_(get(C_SID));
  var xp = xpLogin + xpPrac + work.xp;
  var lv = levelOfXp_(xp);
  return {
    xp: xp, level: lv, gained: gained, days: days, works: work.works,
    nextAt: lv >= LEVEL_MAX ? null : xpForLevel_(lv + 1),
    thisAt: xpForLevel_(lv),
    fromLogin: xpLogin, fromPractice: xpPrac, fromWork: work.xp,
    alias: String(get(C_ALIAS) || ''), avatar: String(get(C_AVATAR) || ''),
    gear: String(get(C_GEAR) || ''), showName: String(get(C_SHOW)) !== 'false',
    canAlias: lv >= 5, name: String(get(C_NAME) || ''), cls: normCls_(get(C_CLS))
  };
}

/** นักเรียนเปิดแอป — ให้แต้มประจำวันแล้วคืนโปรไฟล์ */
function apiXpMe_(req) {
  var t = needStudent_(req);
  var row = findStudentRow_(t.sid);
  if (row < 0) throw new Error('ไม่พบรายชื่อของคุณในชีต');
  return xpProfile_(row, true);
}

/** ฝึกเองครบตามจำนวนในหนึ่งวัน — ชีตเป็นคนตัดสินว่าวันนี้ได้ไปหรือยัง */
function apiXpPractice_(req) {
  var t = needStudent_(req);
  var row = findStudentRow_(t.sid);
  if (row < 0) throw new Error('ไม่พบรายชื่อของคุณในชีต');
  var n = Number(req.n) || 0;
  var sh = sheet_('students'), today = todayStr_();
  var lastP = String(sh.getRange(row, C_XPPRACDAY).getValue() || '');
  if (n >= XP_PRACTICE_MIN && lastP !== today) {
    var cur = Number(sh.getRange(row, C_XPPRAC).getValue()) || 0;
    sh.getRange(row, C_XPPRAC).setValue(cur + XP_PRACTICE);
    sh.getRange(row, C_XPPRACDAY).setValue(today);
    dropCache_('students');
  }
  return xpProfile_(row, false);
}

/** นักเรียนตั้งหน้าตา ของแต่งตัว และนามแฝงของตัวเอง */
function apiXpSkin_(req) {
  var t = needStudent_(req);
  var row = findStudentRow_(t.sid);
  if (row < 0) throw new Error('ไม่พบรายชื่อของคุณในชีต');
  var me = xpProfile_(row, false);
  var sh = sheet_('students');
  if (req.avatar != null) sh.getRange(row, C_AVATAR).setValue(String(req.avatar).slice(0, 20));
  if (req.gear != null) sh.getRange(row, C_GEAR).setValue(String(req.gear).slice(0, 60));
  if (req.showName != null) sh.getRange(row, C_SHOW).setValue(!!req.showName);
  if (req.alias != null) {
    // นามแฝงเปิดให้ตั้งตั้งแต่เลเวลห้าขึ้นไป กันการตั้งชื่อเล่นตั้งแต่วันแรก
    if (!me.canAlias) throw new Error('ตั้งนามแฝงได้เมื่อถึงเลเวล 5 ขึ้นไป');
    sh.getRange(row, C_ALIAS).setValue(String(req.alias).trim().slice(0, 24));
  }
  dropCache_('students');
  return xpProfile_(row, false);
}

/** ชื่อที่คนอื่นเห็นในอันดับ — นามแฝงมาก่อน ถ้าเลือกไม่เปิดเผยก็ไม่บอกชื่อจริง */
function xpShownName_(st) {
  var alias = String(st.alias || '').trim();
  if (alias) return alias;
  return String(st.showName) !== 'false' ? String(st.name || '') : 'ไม่เปิดเผยชื่อ';
}

/** อันดับเลเวล — ดูเฉพาะห้องตัวเอง หรือทั้งโรงเรียน
    คิดแต้มของทุกคนจากข้อมูลที่มีอยู่แล้ว ไม่ได้เก็บอันดับไว้ที่ไหน
    จึงไม่มีทางค้างเป็นอันดับเก่า และไม่ต้องมีงานคอยอัปเดตเบื้องหลัง

    ส่งกลับเฉพาะสิบอันดับแรก บวกแถวของคนที่ถามเองเสมอ แม้จะอยู่อันดับท้าย ๆ
    เพราะรายชื่อทั้งโรงเรียนสามร้อยกว่าคนไม่มีใครอ่านจนจบ และเปลืองเน็ตของนักเรียน */
function apiXpBoard_(req) {
  var t = readToken_(req.token);
  if (!t) throw new Error('AUTH: ต้องเข้าใช้ก่อน');
  var meSid = t.role === 'student' ? sidKey_(t.sid) : '';
  // ครูผู้สอนเห็นได้เฉพาะชั้นที่ตัวเองดูแล แม้จะขอดู "ทั้งโรงเรียน"
  // นักเรียนไม่ถูกจำกัด เพราะอันดับเป็นของทั้งโรงเรียนอยู่แล้วโดยตั้งใจ
  var sc = t.role === 'student' ? null : scopeOf_(t);
  var work = xpWorkAll_();
  var all = readAll_('students').filter(function (st) {
    return String(st.active) !== 'false' && normSid_(st.sid) && inScope_(sc, st.cls);
  }).map(function (st) {
    var w = work[sidKey_(st.sid)] || { xp: 0, works: 0 };
    var xp = (Number(st.xpLogin) || 0) + (Number(st.xpPrac) || 0) + w.xp;
    return { sid: sidKey_(st.sid), cls: normCls_(st.cls), xp: xp, level: levelOfXp_(xp),
             works: w.works, days: Number(st.xpDays) || 0,
             name: xpShownName_(st), avatar: String(st.avatar || ''), gear: String(st.gear || '') };
  });

  var myCls = '';
  if (meSid) {
    all.forEach(function (r) { if (r.sid === meSid) myCls = r.cls; });
  } else {
    myCls = normCls_(req.cls || '');
  }
  var scope = String(req.scope || 'class') === 'school' ? 'school' : 'class';
  var list = scope === 'school' ? all
    : all.filter(function (r) { return myCls && r.cls === myCls; });

  // เรียงจากแต้มมากไปน้อย เท่ากันให้คนที่ส่งงานมากกว่าอยู่ก่อน
  list.sort(function (a, b) { return (b.xp - a.xp) || (b.works - a.works); });

  var top = [], meRow = null;
  list.forEach(function (r, i) {
    var row = { rank: i + 1, name: r.name, cls: r.cls, level: r.level, xp: r.xp,
                works: r.works, days: r.days, avatar: r.avatar, gear: r.gear,
                me: !!(meSid && r.sid === meSid) };
    if (i < 10) top.push(row);
    if (row.me) meRow = row;
  });
  return { scope: scope, cls: myCls, total: list.length, top: top,
           me: meRow && meRow.rank > 10 ? meRow : null };
}

/* ====== คลังข้ออัตนัย ==================================================
   ปัญหาที่แก้: คลังเดิมอยู่ใน localStorage ของเบราว์เซอร์ล้วน ๆ ครูสร้างข้อบนคอมพิวเตอร์
   แล้วเปิดไอแพดจึงเจอคลังเปล่าคนละใบ ไม่ใช่ของหาย แต่คนละที่เก็บกันตั้งแต่แรก
   รุ่นนี้ให้ชีตเป็นตัวกลาง เครื่องยังเก็บสำเนาไว้ทำงานตอนไม่มีเน็ตได้เหมือนเดิม

   ทำไมหนึ่งข้อกินหลายแถว: ช่องหนึ่งช่องในชีตเก็บได้ราวห้าหมื่นตัวอักษร
   ข้อที่แทรกรูปไว้โตเกินนั้นได้ง่าย จึงหั่นเป็นท่อน แถวละท่อน ใช้ id เดียวกัน
   แล้วประกอบกลับตอนอ่านโดยเรียงตามเลขท่อน

   ทำไมลบแล้วยังเก็บแถวไว้: คลังอยู่หลายเครื่อง ถ้าลบแถวทิ้งเลย เครื่องอื่นที่ยังมี
   ข้อนั้นอยู่จะซิงก์กลับขึ้นมาใหม่ไม่รู้จบ จึงเหลือแถวเดียวไว้ทำเครื่องหมายว่าลบแล้ว
   พร้อมเวลาที่ลบ ฝั่งเครื่องจึงรู้ว่าควรลบตามหรือควรส่งของใหม่กว่าขึ้นไปแทน

   คลังนี้เป็นของครูทุกคนร่วมกัน ไม่ได้แบ่งตามชั้นเรียนเหมือนรายชื่อหรือใบงาน
   เพราะเป็นคลังข้อสอบของวิชา ไม่ใช่ข้อมูลของนักเรียนคนไหน                */

var EB_CHUNK = 45000;          // ตัวอักษรต่อหนึ่งท่อน (ช่องหนึ่งช่องรับได้ราวห้าหมื่น)
var EB_ITEM_MAX = 900000;      // ข้อเดียวใหญ่ได้ไม่เกินนี้ กันรูปความละเอียดสูงถล่มชีต
var EB_REPLY_MAX = 3000000;    // ตอบกลับครั้งละไม่เกินนี้ ที่เหลือให้ขอรอบต่อไป

/** สารบัญของคลัง — ไม่ลากเนื้อข้อสอบมาด้วย จึงเบาพอจะเรียกทุกครั้งที่เปิดแอป */
function apiEsBankList_(req) {
  needAdmin_(req);
  var subj = normSubject_(req.subject);
  var rows = cols_('esbank', 1, C_EB_DATA - 1);
  var out = [];
  rows.forEach(function (r) {
    var id = String(r[C_EB_ID - 1] == null ? '' : r[C_EB_ID - 1]).trim();
    if (!id) return;
    if (normSubject_(r[C_EB_SUBJ - 1]) !== subj) return;
    if (Number(r[C_EB_PART - 1] || 1) !== 1) return;   // เอาแถวแรกของแต่ละข้อพอ
    out.push({
      id: id,
      topic: String(r[C_EB_TOPIC - 1] == null ? '' : r[C_EB_TOPIC - 1]),
      tags: String(r[C_EB_TAGS - 1] == null ? '' : r[C_EB_TAGS - 1]),
      at: Number(r[C_EB_AT - 1]) || 0,
      up: Number(r[C_EB_UP - 1]) || 0,
      use: Number(r[C_EB_USE - 1]) || 0,
      used: Number(r[C_EB_USED - 1]) || 0,
      del: String(r[C_EB_DEL - 1]) === 'true' || Number(r[C_EB_DEL - 1]) === 1,
      bytes: Number(r[C_EB_BYTES - 1]) || 0
    });
  });
  return { subject: subj, items: out };
}

/** ดึงเนื้อข้อสอบตาม id ที่ขอมา — เกินเพดานขนาดเมื่อไรก็หยุด แล้วบอกว่ายังเหลือข้อไหน
    ฝั่งแอปค่อยขอรอบต่อไป ดีกว่าตอบก้อนใหญ่จนหลุดเพดานของ Apps Script แล้วพังทั้งครั้ง */
function apiEsBankGet_(req) {
  needAdmin_(req);
  var want = {};
  (req.ids || []).forEach(function (i) { want[String(i).trim()] = 1; });
  var rows = readAll_('esbank');
  var buf = {}, order = [];
  rows.forEach(function (r) {
    var id = String(r.id == null ? '' : r.id).trim();
    if (!id || !want[id]) return;
    if (!buf[id]) {
      buf[id] = { id: id, topic: String(r.topic == null ? '' : r.topic),
                  tags: String(r.tags == null ? '' : r.tags),
                  at: Number(r.at) || 0, up: Number(r.up) || 0,
                  use: Number(r.use) || 0, used: Number(r.used) || 0,
                  parts: [] };
      order.push(id);
    }
    buf[id].parts[Math.max(1, Number(r.part) || 1) - 1] = String(r.data == null ? '' : r.data);
  });
  var items = [], more = [], total = 0;
  order.forEach(function (id) {
    var b = buf[id];
    var data = b.parts.join('');
    if (items.length && total + data.length > EB_REPLY_MAX) { more.push(id); return; }
    total += data.length;
    items.push({ id: b.id, topic: b.topic, tags: b.tags, at: b.at, up: b.up,
                 use: b.use, used: b.used, data: data });
  });
  return { items: items, more: more };
}

/** ลบแถวทั้งหมดของข้อหนึ่ง แล้วเขียนแถวชุดใหม่ลงไปแทน
    ลบจากล่างขึ้นบนเสมอ ถ้าลบจากบนลงล่างเลขแถวที่จำไว้จะเลื่อนจนลบผิดแถว */
function ebReplace_(id, rows) {
  var sh = sheet_('esbank');
  var ids = cols_('esbank', C_EB_ID, 1);
  var hits = [];
  ids.forEach(function (r, i) {
    if (String(r[0] == null ? '' : r[0]).trim() === id) hits.push(i + 2);
  });
  for (var k = hits.length - 1; k >= 0; k--) sh.deleteRow(hits[k]);
  if (rows.length) {
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, SHEETS.esbank.length).setValues(rows);
  }
  dropCache_('esbank');
}

/** เก็บข้อหนึ่งขึ้นชีต — มีอยู่แล้วคือเขียนทับ ยังไม่มีคือเพิ่มใหม่ */
function apiEsBankSave_(req) {
  needAdmin_(req);
  var rec = req.rec || {};
  var id = String(rec.id == null ? '' : rec.id).trim();
  if (!id) throw new Error('ข้อนี้ไม่มีรหัสประจำข้อ');
  var data = String(rec.data == null ? '' : rec.data);
  if (!data) throw new Error('ข้อนี้ไม่มีเนื้อข้อสอบ');
  if (data.length > EB_ITEM_MAX) {
    throw new Error('ข้อนี้ใหญ่เกินกว่าจะเก็บขึ้นชีตได้ (' +
      Math.round(data.length / 1024) + ' KB จากเพดาน ' + Math.round(EB_ITEM_MAX / 1024) +
      ' KB) — มักเกิดจากรูปที่แทรกไว้ ลองใช้รูปที่เล็กลง');
  }
  var subj = normSubject_(req.subject);
  var now = Date.now();
  var up = Number(rec.up) || now;
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var parts = Math.ceil(data.length / EB_CHUNK);
    var rows = [];
    for (var i = 0; i < parts; i++) {
      rows.push([id, subj, rec.topic == null ? '' : rec.topic, rec.tags == null ? '' : rec.tags,
                 Number(rec.at) || now, up, Number(rec.use) || 0, Number(rec.used) || 0,
                 false, data.length, i + 1, parts, data.substr(i * EB_CHUNK, EB_CHUNK)]);
    }
    ebReplace_(id, rows);
    return { id: id, up: up, parts: parts, bytes: data.length };
  } finally { lock.releaseLock(); }
}

/** ลบข้อหนึ่ง — เหลือแถวเดียวไว้เป็นหลุมศพ เครื่องอื่นจะได้ลบตาม ไม่ใช่ส่งกลับขึ้นมาใหม่ */
function apiEsBankDel_(req) {
  needAdmin_(req);
  var id = String(req.id == null ? '' : req.id).trim();
  if (!id) throw new Error('ไม่ได้บอกว่าจะลบข้อไหน');
  var subj = normSubject_(req.subject);
  var now = Number(req.up) || Date.now();
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    ebReplace_(id, [[id, subj, '', '', 0, now, 0, 0, true, 0, 1, 0, '']]);
    return { id: id, up: now, deleted: true };
  } finally { lock.releaseLock(); }
}

/* ====== ปลดล็อกนักเรียนที่กรอกรหัสผิดหลายครั้ง =========================
   ระบบพักการเข้าใช้ไว้สิบนาทีเพื่อกันการเดารหัส ซึ่งจำเป็นเมื่อเปิดให้เข้าจากที่ไหนก็ได้
   แต่ในคาบสอนจริง นักเรียนที่จำรหัสตัวเองไม่ได้จะติดค้างจนหมดคาบ
   ครูจึงต้องปลดให้ได้เอง ไม่ใช่ยืนรอสิบนาทีทั้งห้อง
   การปลดคือการลบตัวนับที่เก็บไว้ ไม่ได้แตะรหัสผ่านและไม่ได้ลดความปลอดภัยของบัญชี
   ครูผู้สอนปลดได้เฉพาะนักเรียนในชั้นที่ตัวเองดูแล เหมือนคำสั่งอื่นทุกคำสั่ง      */

/** อ่านตัวนับการกรอกผิดของหลายคนพร้อมกัน อ่านทีละร้อยกันเกินขีดจำกัดของแคช */
function failCounts_(sids) {
  var cache = CacheService.getScriptCache(), out = {};
  for (var i = 0; i < sids.length; i += 100) {
    var part = sids.slice(i, i + 100);
    var keys = part.map(function (s) { return failKey_(sidKey_(s)); });
    var got = {};
    try { got = cache.getAll(keys) || {}; } catch (e) { got = {}; }
    for (var j = 0; j < part.length; j++) {
      var n = Number(got[keys[j]] || 0);
      if (n > 0) out[sidKey_(part[j])] = n;
    }
  }
  return out;
}

/** ใครกำลังถูกพักการเข้าใช้อยู่บ้าง รวมคนที่ผิดไปบ้างแล้วแต่ยังไม่ถูกพัก
    เพื่อให้ครูเห็นว่าใครกำลังจะติด และช่วยได้ก่อนที่จะติดจริง */
function apiLockList_(req) {
  var me = needAdmin_(req), sc = scopeOf_(me);
  var list = readAll_('students').filter(function (st) { return inScope_(sc, st.cls); });
  var fails = failCounts_(list.map(function (st) { return st.sid; }));
  var out = [];
  list.forEach(function (st) {
    var n = fails[sidKey_(st.sid)];
    if (!n) return;
    out.push({ sid: String(st.sid), name: st.name || '', no: st.no || '', cls: st.cls || '',
               fails: n, left: Math.max(0, MAX_LOGIN_FAIL - n), locked: n >= MAX_LOGIN_FAIL });
  });
  return out;
}

/** ปลดล็อกให้คนที่ระบุ ถ้าไม่ส่ง sids มา = ปลดทุกคนในชั้นที่ตัวเองดูแล */
function apiUnlock_(req) {
  var me = needAdmin_(req), sc = scopeOf_(me);
  var only = null;
  if (Array.isArray(req.sids) && req.sids.length) {
    only = {};
    req.sids.forEach(function (s) { only[sidKey_(s)] = 1; });
  }
  var target = [];
  readAll_('students').forEach(function (st) {
    if (!inScope_(sc, st.cls)) return;
    var k = sidKey_(st.sid);
    if (only && !only[k]) return;
    target.push(st.sid);
  });
  // นับเฉพาะคนที่ติดอยู่จริง ครูจะได้รู้ว่าปลดไปกี่คน ไม่ใช่จำนวนคนที่ไล่ดู
  var fails = failCounts_(target);
  var cache = CacheService.getScriptCache(), n = 0;
  target.forEach(function (sid) {
    var k = sidKey_(sid);
    if (!fails[k]) return;
    try { cache.remove(failKey_(k)); n++; } catch (e) {}
  });
  return { unlocked: n };
}

/* ====== คุมสอบตามเวลาจริง ==============================================
   นักเรียนส่งสถานะสั้น ๆ ทุกสิบห้าวินาที ครูอ่านรวมทีเดียวทั้งห้อง
   เก็บใน CacheService ไม่ใช่ในชีต เพราะเป็นข้อมูลชั่วคราวของคาบเดียว
   ถ้าเขียนลงชีต ห้องละสี่สิบคนคูณทุกสิบห้าวินาทีจะกินโควตาจนชีตช้าไปทั้งระบบ
   ผลจริงที่ต้องเก็บถาวรอยู่ในแผ่น submissions อยู่แล้ว ตรงนี้จึงหายได้ไม่เสียหาย */
var EXAM_PING_TTL = 21600;                      /* หกชั่วโมง = เพดานของ CacheService */

function examKey_(code, sid) {
  return 'exam:' + String(code).trim().toUpperCase() + ':' + sidKey_(sid);
}

/** นักเรียนรายงานว่าทำถึงข้อไหน และออกจากแอปไปกี่ครั้ง */
function apiExamPing_(req) {
  var t = needStudent_(req);
  var code = String(req.code || '').trim().toUpperCase();
  if (!code) return { ok: true };
  var v = { q: String(req.q) === 'done' ? 'done' : (Number(req.q) || 0),
            out: Number(req.out) || 0, sec: Number(req.sec) || 0, at: Date.now() };
  try {
    CacheService.getScriptCache().put(examKey_(code, t.sid), JSON.stringify(v), EXAM_PING_TTL);
  } catch (e) {}                                /* รายงานไม่ถึงไม่ควรทำให้การสอบสะดุด */
  return { ok: true };
}

/** ครูอ่านสถานะของนักเรียนที่ระบุมา — คืนเป็น { เลขประจำตัว: {q,out,sec,at} } */
function apiExamMonitor_(req) {
  var me = needAdmin_(req), sc = scopeOf_(me);
  needSubject_(me, reqSubject_(req));
  var code = String(req.code || '').trim().toUpperCase();
  var sids = Array.isArray(req.sids) ? req.sids.slice(0, 200) : [];
  if (!code || !sids.length) return {};
  // ครูผู้สอนดูได้เฉพาะชั้นที่ตัวเองดูแล จึงต้องรู้ชั้นของแต่ละเลขประจำตัวก่อน
  var cls = {};
  readAll_('students').forEach(function (st) { cls[sidKey_(st.sid)] = st.cls; });
  var keys = [], owner = {};
  sids.forEach(function (raw) {
    var k = sidKey_(raw);
    if (!inScope_(sc, cls[k])) return;
    var key = examKey_(code, raw);
    if (owner[key]) return;                     /* กันส่งเลขซ้ำมาแล้วอ่านซ้ำ */
    owner[key] = String(raw);
    keys.push(key);
  });
  if (!keys.length) return {};
  var got = {};
  try { got = CacheService.getScriptCache().getAll(keys) || {}; } catch (e) { got = {}; }
  var out = {};
  Object.keys(got).forEach(function (key) {
    try { out[owner[key]] = JSON.parse(got[key]); } catch (e) {}
  });
  return out;
}

/** ผู้ดูแลดึงผลของใบงานหนึ่ง (ไม่ระบุ code = ทุกใบงานของวิชานี้) */
function apiResultsList_(req) {
  var me = needAdmin_(req), sc = scopeOf_(me);
  var subject = needSubject_(me, reqSubject_(req));
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
  return Object.keys(best).filter(function (k) {
    // กรองด้วยชั้นของนักเรียนเจ้าของผล ไม่ใช่ชั้นของใบงาน
    // เพราะใบงานที่ไม่ระบุชั้นอาจมีนักเรียนหลายชั้นทำ
    return inScope_(sc, (names[sidKey_(best[k].sid)] || {}).cls);
  }).map(function (k) {
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
