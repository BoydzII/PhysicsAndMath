/* ============================================================================
   0) UTIL — ตัวช่วยทั่วไป (ยกมาจาก gradebook.html)
   ========================================================================== */
const $  = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
function clamp(n, lo, hi) { return n < lo ? lo : n > hi ? hi : n; }

/** จัดรูปตัวเลขให้อ่านง่าย ตัดศูนย์ท้ายทศนิยม ใส่จุลภาคคั่นหลักพัน */
function fmt(n, dp) {
  if (n == null || !isFinite(n)) return '—';
  const d = dp == null ? 2 : dp;
  let s = Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : n.toFixed(d).replace(/0+$/, '').replace(/\.$/, '');
  const neg = s[0] === '-'; if (neg) s = s.slice(1);
  const [i, f] = s.split('.');
  s = i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? '.' + f : '');
  return (neg ? '-' : '') + s;
}
/** เหมือน fmt แต่ไม่ใส่จุลภาค — ใช้ในสมการเพื่อไม่ให้สับสนกับเครื่องหมายคั่น */
function fmtq(n, dp) {
  if (n == null || !isFinite(n)) return '—';
  const d = dp == null ? 2 : dp;
  if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
  return n.toFixed(d).replace(/0+$/, '').replace(/\.$/, '');
}
function round2(n) { return Math.round(n * 100) / 100; }
/** ใช้กับค่าคำตอบในแม่แบบโจทย์: ปัดเศษให้ก็ต่อเมื่อค่านั้น "สวย" อยู่แล้ว
    ถ้าไม่สวยจะคืนค่าดิบไว้ เพื่อให้ตัวคัดกรองปฏิเสธแล้วสุ่มพารามิเตอร์ใหม่
    (ถ้าปัดทิ้งไปเลย ค่าอย่าง 245.8333 จะกลายเป็น 245.83 แล้วผ่านการตรวจไปเงียบ ๆ) */
function r2(n) { return dpOf(n, 4) <= 2 ? Math.round(n * 100) / 100 : n; }
/** จำนวนตำแหน่งทศนิยมที่จำเป็นจริง ๆ (ใช้คุมให้โจทย์ออกเลขสวย) */
function dpOf(n, max) {
  const m = max == null ? 6 : max;
  for (let d = 0; d <= m; d++) if (Math.abs(n - Number(n.toFixed(d))) < 1e-9) return d;
  return m + 1;
}
const THDATE = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'];
const THMON = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
function thDate(ts) {
  const d = new Date(ts);
  return d.getDate() + ' ' + THMON[d.getMonth()] + ' ' + (d.getFullYear() + 543);
}
function thDateTime(ts) {
  const d = new Date(ts);
  return thDate(ts) + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}
function mmss(sec) {
  const s = Math.max(0, Math.round(sec));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

function toast(msg, kind) {
  const t = document.createElement('div');
  t.className = 'toast' + (kind ? ' ' + kind : '');
  t.textContent = msg;
  $('#toast').appendChild(t);
  setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; }, 2400);
  setTimeout(() => t.remove(), 2800);
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function pickFile(accept) {
  return new Promise(res => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = accept || '';
    inp.style.display = 'none';
    document.body.appendChild(inp);
    inp.addEventListener('change', () => { const f = inp.files[0] || null; inp.remove(); res(f); });
    inp.click();
  });
}

/** เลือกได้หลายไฟล์พร้อมกัน — ใช้ตอนครูรวมไฟล์ผลจากนักเรียนทั้งห้อง */
function pickFiles(accept) {
  return new Promise(res => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = accept || ''; inp.multiple = true;
    inp.style.display = 'none';
    document.body.appendChild(inp);
    inp.addEventListener('change', () => {
      const fs = Array.prototype.slice.call(inp.files); inp.remove(); res(fs);
    });
    inp.click();
  });
}

/** คัดลอกลงคลิปบอร์ด — Safari บนไอแพดบางรุ่นไม่มี navigator.clipboard จึงต้องมีทางสำรอง */
async function copyText(str) {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(str); return true; }
  } catch (e) { /* ตกไปใช้ทางสำรองด้านล่าง */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.select(); ta.setSelectionRange(0, str.length);
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch (e) { return false; }
}

/* Base64 ที่รองรับภาษาไทย — btoa รับได้แค่ไบต์ ต้องแปลงผ่าน UTF-8 ก่อน */
function b64enc(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin);
}
function b64dec(s) {
  const bin = atob(String(s).trim());
  const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/* --- โมดัล --------------------------------------------------------------- */
let modalStack = [];
function openModal(opts) {
  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  bg.innerHTML =
    '<div class="modal"' + (opts.wide ? ' style="max-width:1000px"' : '') + '>' +
      '<header>' + esc(opts.title) + '<button class="x" data-close>&times;</button></header>' +
      '<div class="body">' + (opts.bodyHTML || '') + '</div>' +
      '<footer></footer>' +
    '</div>';
  const foot = $('footer', bg);
  const close = () => { bg.remove(); modalStack = modalStack.filter(x => x !== bg); };
  /* กล่องที่มีงานค้างส่ง opts.guard มา — คืน true เมื่อยังมีของที่ยังไม่ได้บันทึก
     แล้วการปิดทุกทางจะถามยืนยันก่อน กันเผลอแตะนอกกรอบทีเดียวแล้วงานหายหมด
     กล่องธรรมดาที่ไม่ส่ง guard มา ยังปิดทันทีเหมือนเดิม ไม่ต้องมาถามให้รำคาญ */
  bg.__tryClose = async () => {
    if (opts.guard) {
      let dirty = false;
      try { dirty = !!opts.guard(bg); } catch (e) { dirty = false; }
      if (dirty) {
        const ok = await confirmBox('ปิดหน้าต่างนี้?',
          'ยังมีข้อมูลที่<b>ยังไม่ได้บันทึก</b> ถ้าปิดตอนนี้ข้อมูลที่กรอกไว้จะหายไป' +
          (opts.draftNote ? '<br><span class="hint">' + opts.draftNote + '</span>' : ''),
          'ปิดโดยไม่บันทึก');
        if (!ok) return;
      }
    }
    if (opts.onClose) { try { opts.onClose(); } catch (e) {} }
    close();
  };
  (opts.buttons || [{ label: 'ปิด' }]).forEach(b => {
    const btn = document.createElement('button');
    btn.textContent = b.label;
    if (b.cls) btn.className = b.cls;
    // ปุ่มที่ไม่มีงานของตัวเอง (เช่น ยกเลิก) ถือเป็นการปิด จึงต้องผ่านด่านถามยืนยันด้วย
    btn.addEventListener('click', () => { if (b.act) b.act(close, bg); else bg.__tryClose(); });
    foot.appendChild(btn);
  });
  bg.addEventListener('click', e => {
    if (e.target === bg || e.target.hasAttribute('data-close')) bg.__tryClose();
  });
  $('#modal-root').appendChild(bg);
  modalStack.push(bg);
  if (opts.onMount) opts.onMount(bg, close);
  return { root: bg, close };
}
function confirmBox(title, msg, okLabel) {
  return new Promise(res => {
    openModal({
      title: title,
      bodyHTML: '<div>' + msg + '</div>',
      buttons: [
        { label: 'ยกเลิก', act: c => { c(); res(false); } },
        { label: okLabel || 'ตกลง', cls: 'primary', act: c => { c(); res(true); } }
      ]
    });
  });
}
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || !modalStack.length) return;
  const top = modalStack[modalStack.length - 1];
  // ผ่านด่านเดียวกับการแตะนอกกรอบ ไม่งั้นกด Escape ทีเดียวงานก็หายอยู่ดี
  if (top.__tryClose) { top.__tryClose(); return; }
  top.remove(); modalStack.pop();
});

