/* สำเนาจากสกิล autosheet (scripts/appctx.mjs) เก็บไว้ในรีโพ เพื่อให้ tools/golden.mjs รันได้โดยไม่พึ่งไฟล์นอกรีโพ
   แก้ที่นี่แล้วถ้าต้องการให้สกิลได้ด้วย ให้คัดลอกกลับไปเอง */
/* โหลดแอป HTML ไฟล์เดียวเข้ามารันใน Node โดยไม่ต้องเปิดเบราว์เซอร์
   ใช้ร่วมกันโดย selftest.mjs และ tpl.mjs

   วิธีทำงาน: ดึงเนื้อ <script> ทุกก้อนที่ไม่ได้อ้างไฟล์ภายนอกมาต่อกัน
   แล้วรันใน new Function พร้อม DOM ปลอมแบบ Proxy ที่รับได้ทุกคำสั่ง
   ท้ายโค้ดต่อ get() ที่ใช้ eval ตรง ๆ จึงหยิบตัวแปรภายในของแอปออกมาได้ทุกตัว
   เช่น app.get('TPL')  app.get('buildProblem')  app.get('runSelfTest')

   ข้อจำกัด: อะไรที่ต้องวัดขนาดจริงบนหน้าจอ (paginatePrint) เชื่อผลจากที่นี่ไม่ได้
   ต้องเปิดเบราว์เซอร์ดูเอง ส่วนการสุ่มโจทย์ ตรวจคำตอบ และวิธีทำ เป็นตรรกะล้วน ใช้ได้ */
import fs from 'fs';

export function extractScripts(html) {
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

function fakeEl() {
  const el = new Proxy(function () {}, {
    get(t, k) {
      if (k === Symbol.toPrimitive) return () => '';
      if (k === Symbol.toStringTag) return 'FakeEl';
      if (k === Symbol.iterator) return [][Symbol.iterator].bind([]);
      if (k === 'toString' || k === 'valueOf') return () => '';
      if (k === 'then') return undefined;                 // กัน await ไปหลงคิดว่าเป็น Promise
      if (k === 'nodeType') return 1;
      if (k === 'length') return 0;
      if (k === 'classList') return { add() {}, remove() {}, toggle() {}, contains() { return false; } };
      if (k === 'style') return {};
      if (k === 'dataset') return {};
      if (k === 'textContent' || k === 'innerHTML' || k === 'value') return '';
      return el;
    },
    set() { return true; },
    apply() { return el; }
  });
  return el;
}

function installDOM() {
  const el = fakeEl();
  // body ต้องเป็นของจริงพอที่จะอ่าน innerHTML กลับได้ เพราะแอปบางตัว
  // (ห้องเรียนสมดุลกล) รายงานผลตรวจด้วยการเขียนลง body แล้วคืนแค่จำนวน
  const body = { innerHTML: '', classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
                 style: {}, appendChild() {}, addEventListener() {}, querySelector: () => el, querySelectorAll: () => [] };
  const doc = {
    body, documentElement: el, head: el,
    querySelector: () => el, querySelectorAll: () => [],
    getElementById: () => el, createElement: () => el, createTextNode: () => el,
    addEventListener() {}, removeEventListener() {}, cookie: '', hidden: false, title: ''
  };
  const store = new Map();
  const def = (k, v) => Object.defineProperty(globalThis, k, { value: v, configurable: true, writable: true });
  globalThis.document = doc;
  globalThis.localStorage = {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k), clear: () => store.clear(), key: () => null, length: 0
  };
  globalThis.sessionStorage = globalThis.localStorage;
  def('location', { search: '?', pathname: '/app.html', href: 'file:///app.html', origin: 'null', hash: '', reload() {} });
  def('navigator', { userAgent: 'node', onLine: false, clipboard: null, language: 'th' });
  globalThis.window = globalThis;
  globalThis.self = globalThis;
  globalThis.addEventListener = () => {};
  globalThis.removeEventListener = () => {};
  globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, addListener() {} });
  globalThis.requestAnimationFrame = fn => setTimeout(fn, 0);
  globalThis.getComputedStyle = () => ({ getPropertyValue: () => '' });
  globalThis.fetch = () => Promise.reject(new Error('ไม่มีเน็ตในโหมดทดสอบ'));
  globalThis.innerWidth = 1280; globalThis.innerHeight = 800; globalThis.devicePixelRatio = 1;
  for (const k of ['scrollTo', 'scrollBy', 'print', 'focus', 'blur', 'close', 'confirm', 'prompt', 'open', 'alert'])
    globalThis[k] = () => {};
  return { body };
}

/** โหลดไฟล์แอปแล้วคืน { get, body, html } — get('ชื่อตัวแปร') หยิบของภายในแอปออกมา */
export function loadApp(file) {
  const html = fs.readFileSync(file, 'utf8');
  const code = extractScripts(html).join('\n;\n');
  if (!code.trim()) throw new Error('ไม่พบสคริปต์ในไฟล์ ' + file);
  const { body } = installDOM();
  const fn = new Function(code + '\n;return { get: function (n) { try { return eval(n); } catch (e) { return undefined; } } };');
  const scope = fn();
  return { get: n => scope.get(n), body, html };
}

/** ตัดแท็กออกให้เหลือข้อความล้วน ไว้พิมพ์ดูในเทอร์มินัล */
export function plain(s) {
  return String(s == null ? '' : s)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(div|tr|p|li)>/gi, '\n')
    .replace(/<td[^>]*>/gi, '  ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
