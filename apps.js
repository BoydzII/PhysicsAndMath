/* ============================================================================
   ตัวสลับแอปในเครือคลังโจทย์ — ไฟล์เดียวที่ทุกแอปโหลดร่วมกัน
   ============================================================================
   แต่ละแอปใส่บรรทัดเดียวก่อน </body>
     <script src="../apps.js" defer></script>
   แล้วจะมีแถบเล็ก ๆ ติดขอบซ้ายของจอ กดแล้วเปิดรายการแอปทั้งหมดให้ไปต่อได้ทันที

   ทำไมเป็นไฟล์แยก ไม่ฝังในแต่ละแอป
     แอปมีสิบตัว ถ้าก๊อปโค้ดไปวางทุกไฟล์ วันที่เพิ่มแอปใหม่ต้องไล่แก้สิบที่ และจะมีที่ตกเสมอ
     ไฟล์ที่ครูสร้างแจกนักเรียน (ไฟล์เดี่ยว) หาไฟล์นี้ไม่เจอก็ไม่เป็นไร แถบแค่ไม่ขึ้น แอปทำงานปกติ

   หน้าตาอยู่ใน Shadow DOM — สไตล์ของแต่ละแอป (เช่น button{…} ทั้งหน้า) ไม่ไหลเข้ามา
   และสไตล์ของตัวสลับก็ไม่ไหลออกไปกวนแอป

   ครูเห็นไฟล์ฉบับครู (มีเฉลย) นักเรียนและคนที่ยังไม่ลงชื่อเห็นฉบับนักเรียน
   ดูบทบาทจากการลงชื่อของหน้าพอร์ทัล (localStorage pcportal.v1) แบบเดียวกับที่แอปวิชาทำ

   ⚠ รายการ APPS ต้องตรงกับ SUBJECTS ในหน้าพอร์ทัล (index.html)
     tools/check.mjs ฟ้องถ้าโฟลเดอร์ของสองที่ไม่ตรงกัน
   ไม่อยากให้แถบขึ้นในแอปไหน ให้ตั้ง window.PC_NO_SWITCHER = true ก่อนโหลดไฟล์นี้
   ========================================================================== */
(function () {
  'use strict';
  if (window.PC_NO_SWITCHER || window.__pcSwitcher) return;
  if (window.top !== window.self) return;           /* ถูกฝังในกรอบของหน้าอื่น ไม่ต้องมีแถบซ้อน */
  window.__pcSwitcher = true;

  var APPS = [
    { key: 'work',        ic: 'work',        name: 'ส่งงานออนไลน์',      level: 'ทุกวิชา',
      dir: 'WorkDesk/', teacher: 'index.html', student: 'index.html' },
    { key: 'physics2',    ic: 'book',        name: 'ฟิสิกส์ 2 (Interactive Notebook)', level: 'ฟิสิกส์ ม.4-5',
      dir: 'Physics2App/', teacher: 'index.html', student: 'index.html' },
    { key: 'math',        ic: 'math',        name: 'คณิตศาสตร์',          level: 'ม.1–ม.3',
      dir: 'MathAutoSheet/', teacher: 'math.html', student: 'index.html' },
    { key: 'science',     ic: 'science',     name: 'วิทยาศาสตร์',         level: 'ม.1–ม.3',
      dir: 'ScienceAutoSheet/', teacher: 'science.html', student: 'index.html' },
    { key: 'physics',     ic: 'physics',     name: 'ฟิสิกส์',             level: 'ม.4',
      dir: 'PhysicsAutoSheet/', teacher: 'physics.html', student: 'index.html' },
    { key: 'chem',        ic: 'chem',        name: 'เคมี',                level: 'ม.4 เทอม 1',
      dir: 'ChemistryAutoSheet/', teacher: 'chem.html', student: 'index.html' },
    { key: 'bio',         ic: 'bio',         name: 'ชีววิทยา',            level: 'ม.4 เทอม 1',
      dir: 'BiologyAutoSheet/', teacher: 'bio.html', student: 'index.html' },
    { key: 'physci',      ic: 'physci',      name: 'วิทยาศาสตร์กายภาพ',   level: 'ม.5 · ฟิสิกส์',
      dir: 'PhysicalScienceAutoSheet/', teacher: 'physci.html', student: 'index.html' },
    { key: 'equilibrium', ic: 'equilibrium', name: 'ห้องเรียนสมดุลกล',    level: 'ฟิสิกส์ ม.4',
      dir: 'EquilibriumLab/', teacher: 'equilibrium.html', student: 'index.html' },
    { key: 'figure',      ic: 'figure',      name: 'ห้องวาดรูปโจทย์',     level: 'เครื่องมือของครู',
      dir: 'FigureLab/', teacher: 'figure.html', student: 'figure.html', teacherOnly: true }
  ];

  /* ไอคอนชุดเดียวกับหน้าพอร์ทัล */
  var ICONS = {
    math: '<path d="M4 20h16L4 4z"/><path d="M4.4 12.2A7.8 7.8 0 0 1 11.8 19.6"/>',
    science: '<path d="M6.8 3.4h10.4"/><path d="M8 3.4v15.2A2 2 0 0 0 10 20.6h4a2 2 0 0 0 2-2V3.4"/><path d="M8 11.6h8"/><path d="M8 7.6h2.6"/>',
    physics: '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9.6" ry="4.1"/><ellipse cx="12" cy="12" rx="9.6" ry="4.1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.6" ry="4.1" transform="rotate(120 12 12)"/>',
    chem: '<path d="M9.2 3h5.6"/><path d="M10.2 3v5.6L5.4 18.4A1.7 1.7 0 0 0 7 21h10a1.7 1.7 0 0 0 1.6-2.6L13.8 8.6V3"/><path d="M7.7 15h8.6"/>',
    bio: '<path d="M8.4 2.4c0 4 7.2 6 7.2 9.6s-7.2 5.6-7.2 9.6"/><path d="M15.6 2.4c0 4-7.2 6-7.2 9.6s7.2 5.6 7.2 9.6"/><path d="M9.6 6.4h4.8"/><path d="M8.5 12h7"/><path d="M9.6 17.6h4.8"/>',
    physci: '<path d="M2 8.4q2.5-4 5 0t5 0 5 0 5 0"/><path d="M2 15.6q2.5-4 5 0t5 0 5 0 5 0"/>',
    equilibrium: '<circle cx="12" cy="3.6" r="1.4"/><path d="M12 5v14"/><path d="M8.4 19h7.2"/><path d="M3.6 7.2h16.8"/><path d="M4.4 7.4 2.2 11.4"/><path d="M19.6 7.4l2.2 4"/><path d="M1.6 11.4a3.4 3.4 0 0 0 5.2 0"/><path d="M17.2 11.4a3.4 3.4 0 0 0 5.2 0"/>',
    figure: '<path d="M4.2 19.8l4.3-1.1 9.7-9.7a2.5 2.5 0 0 0-3.5-3.5L5 15.3z"/><path d="M14.1 6.2l3.5 3.5"/>',
    book: '<path d="M3.4 5.2c2.8-1.2 5.6-1.2 8.6.8 3-2 5.8-2 8.6-.8v13c-2.8-1.2-5.6-1.2-8.6.8-3-2-5.8-2-8.6-.8z"/><path d="M12 6v13"/>',
    work: '<path d="M4 13.5h4.2l1.6 2.6h4.4l1.6-2.6H20"/><path d="M5.6 5.5h12.8L20 13.5v5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-5z"/><path d="M12 3.5v7"/><path d="M9.4 8l2.6 2.6L14.6 8"/>',
    home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.8 9.2V20h12.4V9.2"/><path d="M10 20v-5.5h4V20"/>',
    grid: '<rect x="4" y="4" width="6.4" height="6.4" rx="1.4"/><rect x="13.6" y="4" width="6.4" height="6.4" rx="1.4"/><rect x="4" y="13.6" width="6.4" height="6.4" rx="1.4"/><rect x="13.6" y="13.6" width="6.4" height="6.4" rx="1.4"/>'
  };
  function icon(n, s) {
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[n] || ICONS.book) + '</svg>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  /* โฟลเดอร์รากของเครือ — นับจากที่อยู่ของไฟล์นี้เอง จึงใช้ได้ทั้งบนเว็บ localhost และเปิดจากเครื่อง */
  var me = document.currentScript && document.currentScript.src;
  var ROOT = me ? new URL('.', me).href : new URL('../', location.href).href;

  function isTeacher() {
    try {
      var s = JSON.parse(localStorage.getItem('pcportal.v1') || 'null');
      return !!(s && s.v === 1 && s.exp > Date.now() && s.role === 'admin');
    } catch (e) { return false; }
  }
  function currentKey() {
    var here = location.href.split(/[?#]/)[0];
    for (var i = 0; i < APPS.length; i++) if (here.indexOf(ROOT + APPS[i].dir) === 0) return APPS[i].key;
    return '';
  }

  var CSS =
    ':host{all:initial}' +
    '@media print{:host{display:none!important}}' +
    '*{box-sizing:border-box}' +
    '.w{--bg:#fff;--ink:#14181f;--mu:#6b7480;--ln:#e5e2db;--br:#1c4b8c;--bs:rgba(28,75,140,.09);' +
      'font-family:"Anuphan","Sarabun","Leelawadee UI","Segoe UI",Tahoma,sans-serif;font-size:15px;line-height:1.5;color:var(--ink)}' +
    '@media (prefers-color-scheme:dark){.w{--bg:#141a22;--ink:#e8ecf2;--mu:#98a2b0;--ln:#2a3340;--br:#8fb4e8;--bs:rgba(143,180,232,.14)}}' +
    /* แถบติดขอบซ้าย — เล็กพอไม่บังเนื้อหา แตะง่ายพอบนมือถือ */
    '.tab{position:fixed;left:0;top:38%;z-index:2147483000;width:22px;height:58px;padding:0;border:1px solid var(--ln);border-left:0;' +
      'border-radius:0 12px 12px 0;background:var(--bg);color:var(--br);cursor:pointer;display:flex;align-items:center;justify-content:center;' +
      'opacity:.72;transition:width .15s,opacity .15s;box-shadow:0 2px 10px rgba(0,0,0,.08);-webkit-tap-highlight-color:transparent;touch-action:manipulation}' +
    '.tab:hover,.tab:focus-visible{opacity:1;width:30px;outline:none}' +
    '.tab:focus-visible{box-shadow:0 0 0 3px var(--bs)}' +
    '.bd{position:fixed;inset:0;z-index:2147483001;background:rgba(10,14,20,.38);opacity:0;transition:opacity .18s;pointer-events:none}' +
    '.pn{position:fixed;left:0;top:0;bottom:0;z-index:2147483002;width:320px;max-width:86vw;background:var(--bg);border-right:1px solid var(--ln);' +
      'transform:translateX(-102%);transition:transform .2s ease;display:flex;flex-direction:column;' +
      'padding:calc(14px + env(safe-area-inset-top)) 0 calc(12px + env(safe-area-inset-bottom))}' +
    '.open .bd{opacity:1;pointer-events:auto}.open .pn{transform:none}' +
    '.hd{display:flex;align-items:center;gap:8px;padding:0 14px 10px 18px;border-bottom:1px solid var(--ln)}' +
    '.hd b{flex:1;font-size:16px}' +
    '.x{border:1px solid var(--ln);background:transparent;color:var(--ink);border-radius:8px;min-height:34px;padding:0 12px;font:inherit;font-size:13.5px;cursor:pointer}' +
    '.ls{flex:1;overflow-y:auto;padding:6px 8px;-webkit-overflow-scrolling:touch}' +
    'a{display:flex;align-items:center;gap:12px;padding:9px 10px;border-radius:10px;color:inherit;text-decoration:none;min-height:48px}' +
    'a:hover,a:focus-visible{background:var(--bs);outline:none}' +
    'a .i{flex:none;width:34px;height:34px;border:1px solid var(--ln);border-radius:9px;display:flex;align-items:center;justify-content:center;color:var(--br)}' +
    'a .t{flex:1;min-width:0}a .t small{display:block;color:var(--mu);font-size:12.5px}' +
    'a.cur{background:var(--bs);pointer-events:none}a.cur .i{border-color:var(--br)}' +
    'a .here{font-size:11.5px;color:var(--br);font-weight:700;white-space:nowrap}' +
    '.sep{height:1px;background:var(--ln);margin:6px 10px}' +
    '.ft{padding:8px 18px 0;color:var(--mu);font-size:12px}';

  function build() {
    var teacher = isTeacher(), cur = currentKey();
    var host = document.createElement('div');
    host.setAttribute('data-pc-switcher', '');
    var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;

    var items = APPS.filter(function (a) { return teacher || !a.teacherOnly; }).map(function (a) {
      var href = ROOT + a.dir + (teacher ? a.teacher : a.student);
      var on = a.key === cur;
      return '<a href="' + esc(href) + '"' + (on ? ' class="cur" aria-current="page"' : '') + '>' +
        '<span class="i">' + icon(a.ic, 20) + '</span>' +
        '<span class="t">' + esc(a.name) + '<small>' + esc(a.level) + '</small></span>' +
        (on ? '<span class="here">อยู่ที่นี่</span>' : '') + '</a>';
    }).join('');

    root.innerHTML = '<style>' + CSS + '</style><div class="w">' +
      '<button class="tab" type="button" aria-label="เปลี่ยนแอปในเครือคลังโจทย์" title="เปลี่ยนแอป" aria-expanded="false">' + icon('grid', 15) + '</button>' +
      '<div class="bd"></div>' +
      '<nav class="pn" aria-label="แอปในเครือคลังโจทย์" aria-hidden="true">' +
        '<div class="hd"><b>แอปในเครือคลังโจทย์</b><button class="x" type="button">ปิด</button></div>' +
        '<div class="ls">' +
          '<a href="' + esc(ROOT) + '"><span class="i">' + icon('home', 20) + '</span><span class="t">หน้าหลัก<small>ลงชื่อเข้าใช้ · เลือกวิชา</small></span></a>' +
          '<div class="sep"></div>' + items +
        '</div>' +
        '<div class="ft">' + (teacher ? 'เปิดฉบับครู' : 'ครูลงชื่อที่หน้าหลักเพื่อเปิดฉบับครู') + '</div>' +
      '</nav></div>';

    var w = root.querySelector('.w'), tab = root.querySelector('.tab'), pn = root.querySelector('.pn');
    function setOpen(v) {
      w.classList.toggle('open', v);
      tab.setAttribute('aria-expanded', v ? 'true' : 'false');
      pn.setAttribute('aria-hidden', v ? 'false' : 'true');
      if (v) { var f = root.querySelector('.x'); if (f) f.focus(); } else tab.focus();
    }
    /* หยุดไม่ให้การแตะไหลลงไปถึงแอปข้างใต้ (เช่น ผืนวาดหมึกที่ฟังการแตะทั้งหน้า) */
    ['pointerdown', 'touchstart', 'mousedown'].forEach(function (t) {
      host.addEventListener(t, function (e) { e.stopPropagation(); }, { passive: true });
    });
    tab.addEventListener('click', function () { setOpen(!w.classList.contains('open')); });
    root.querySelector('.bd').addEventListener('click', function () { setOpen(false); });
    root.querySelector('.x').addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && w.classList.contains('open')) setOpen(false);
    });
    document.body.appendChild(host);
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
