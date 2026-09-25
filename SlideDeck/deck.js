/* ============================================================================
   SlideDeck — เอนจินสไลด์สอนร่วมของสำรับฟิสิกส์ (ฟิสิกส์ 1 · ฟิสิกส์ 2)
   ============================================================================
   หน้าสไลด์ของแต่ละแอปโหลด ../SlideDeck/deck.css กับ ../SlideDeck/deck.js
   แล้วเรียก SlideDeck.start({...}) พร้อมเนื้อหาของตัวเอง:
     name     'ฟิสิกส์ 2'              ชื่อวิชา (ปก หน้าล็อก ชื่อแท็บ)
     en       'Physics II'             หัวหน้าเลือกบท
     book     'ม.4 เล่ม 2'             บรรทัดใต้ชื่อวิชาบนปก (บทไหนมาจากเล่มอื่น ใส่ book ในบทนั้นเอง)
     bookAll  (ไม่บังคับ)             บรรทัดบนหน้าเลือกบท ถ้าบทมาจากหลายเล่ม
     app      'index.html'             ลิงก์ "เปิดแอป…" บนหน้าล็อก
     themeKey 'p2slides.theme'         คีย์จำโหมดมืด/สว่าง
     chapters { 5: {no, color, title, cover:[บรรทัด1,บรรทัด2], sections:[…], sum:[…], story}, … }
     sims     { ชื่อ: { html, init(el), enter?(el), leave?(el) } }
     topics   (ไม่บังคับ) แหล่งโจทย์ — ถ้าไม่ใส่ใช้ physicsData.topics ของแอป
   ตัวช่วยสำหรับเขียนแบบจำลอง: SlideDeck.R (String.raw) · arrowDefs(id) · fmt(v, d)

   แก้เอนจินที่นี่ที่เดียว ทุกสำรับได้พร้อมกัน — ห้ามคัดลอกไปวางในหน้าสไลด์ของแอป
   ========================================================================== */
(function(){
const R = String.raw;
/* ตัวช่วยเขียนแบบจำลอง (SVG + JS ล้วน) */
const svgNS = 'http://www.w3.org/2000/svg';
const arrowDefs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke"/></marker></defs>`;
const fmt = (v, d = 0) => Number(v).toLocaleString('en-US', { minimumFractionDigits:d, maximumFractionDigits:d });


window.SlideDeck = { R, arrowDefs, fmt, svgNS, start };

function start(CFG){
const CHAPTERS = CFG.chapters, SIMS = CFG.sims || {};
const NUMS = Object.keys(CHAPTERS);
const THEME_KEY = CFG.themeKey || 'slides.theme';
document.body.insertAdjacentHTML('afterbegin', `<div id="viewport"><div id="stage"><div id="deck"></div><div id="wipe"><span class="n"></span><span class="t"></span></div></div></div>
<div id="hud">
  <button id="bCh" title="เปลี่ยนบท (กด ${NUMS.join(' · ')})"><i class="ph ph-books"></i><span id="bChT"></span></button>
  <button id="bPrev" title="ย้อนกลับ (←)"><i class="ph ph-caret-left"></i></button>
  <button id="bNext" title="ถัดไป (→ หรือ Space)"><i class="ph ph-caret-right"></i></button>
  <div id="bar"></div>
  <span id="count"></span>
  <button id="bOv" title="ภาพรวมสไลด์ (O)"><i class="ph ph-squares-four"></i></button>
  <button id="bTheme" title="โหมดมืด/สว่าง (D)"><i class="ph ph-circle-half"></i></button>
  <button id="bFull" title="เต็มจอ (F)"><i class="ph ph-corners-out"></i></button>
</div>
<div id="ov"></div>
<div id="chmenu" role="menu"></div>
<div id="pick" hidden></div>
<div id="blank"></div>
<div id="toast" role="status"></div>
<div id="lock" role="dialog" aria-labelledby="lockH"><div class="in">
  <div class="k"><i class="ph ph-lock-simple"></i> สไลด์สอน${CFG.name}</div>
  <h1 id="lockH">สำหรับครูเท่านั้น</h1>
  <p id="lockP">สไลด์ชุดนี้เป็นสื่อการสอนของครู กรุณาลงชื่อเข้าใช้ที่หน้าหลักในฐานะครูหรือแอดมิน แล้วเปิดจากการ์ด “สไลด์สอน${CFG.name}” หรือปุ่มสไลด์ในแอป${CFG.name}</p>
  <div class="row"><a class="pri" href="../index.html">ไปหน้าลงชื่อเข้าใช้</a><a href="${CFG.app || 'index.html'}">เปิดแอป${CFG.name}</a></div>
</div></div>`);

/* ════════════════════════════════════════════════════════════════
   เปิดได้เฉพาะครู/แอดมิน — อ่านการลงชื่อของหน้าพอร์ทัล (localStorage pcportal.v1)
   แบบเดียวกับ apps.js และแอปวิชา: role 'admin' = แอดมินหลักและแอดมินรอง (ครู)
   ตรวจครั้งเดียวตอนเปิด ไม่ไล่ครูออกกลางคาบเมื่อการลงชื่อหมดอายุ
   ════════════════════════════════════════════════════════════════ */
function portalSession(){ try { return JSON.parse(localStorage.getItem('pcportal.v1') || 'null'); } catch (e) { return null; } }
const SESS = portalSession();
const IS_TEACHER = !!(SESS && SESS.v === 1 && SESS.exp > Date.now() && SESS.role === 'admin');
if (!IS_TEACHER){
  document.getElementById('viewport').remove();
  document.getElementById('hud').remove();
  if (SESS && SESS.v === 1 && SESS.role === 'admin')
    document.getElementById('lockP').textContent = 'การลงชื่อเข้าใช้ของครูหมดอายุแล้ว กรุณาลงชื่อที่หน้าหลักอีกครั้ง แล้วกลับมาเปิดสไลด์';
  else if (SESS && SESS.v === 1 && SESS.exp > Date.now())
    document.getElementById('lockP').textContent = 'บัญชีที่ลงชื่อไว้ตอนนี้เป็นบัญชีนักเรียน สไลด์ชุดนี้เปิดได้เฉพาะครูและแอดมิน';
  document.getElementById('lock').classList.add('show');
  document.title = 'สไลด์สอน' + CFG.name + ' · สำหรับครู';
  // ลงชื่อเป็นครูในแท็บอื่นแล้ว หน้านี้เปิดเองได้ทันที
  addEventListener('storage', e => { if (e.key === 'pcportal.v1') location.reload(); });
  return;
}

const CH_ASK = location.search.match(/[?&]ch=(\d)/);
const chHref = n => '?ch=' + n;
if (!CH_ASK || !CHAPTERS[CH_ASK[1]]){
  document.getElementById('viewport').remove();
  document.getElementById('hud').remove();
  const pk = document.getElementById('pick');
  pk.hidden = false;
  pk.innerHTML = '<div class="k">' + CFG.name + ' · ' + (CFG.bookAll || CFG.book) + ' · สไลด์สอน</div><h1 lang="en">' + CFG.en + '</h1>' +
    Object.values(CHAPTERS).map(c => '<a class="ch" href="' + chHref(c.no) + '" style="--c:' + c.color + '">' +
      '<span class="n">' + c.no + '</span>' +
      '<span class="t">บทที่ ' + c.no + ' ' + c.title +
        '<span class="s">' + c.sections.map(S => S.num + ' ' + S.title).join(' · ') + '</span></span>' +
      '<span class="go">เปิดบทนี้ →</span></a>').join('');
  document.title = 'สไลด์สอน' + CFG.name + ' · เลือกบท';
  return;
}
const CH_NO = +CH_ASK[1];
const CHAPTER = CHAPTERS[CH_NO];
const SECTIONS = CHAPTER.sections;

/* ════════════════════════════════════════════════════════════════
   ตัวช่วย
   ════════════════════════════════════════════════════════════════ */
// data.js ประกาศ const physicsData (ไม่ผูกกับ window) จึงต้องเรียกชื่อตรง ๆ
const TOPICS = CFG.topics || ((typeof physicsData !== 'undefined' ? physicsData : window.physicsData) || {}).topics || {};
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
// % ในโหมดคณิตของ KaTeX คือคอมเมนต์ ทำให้ "80%" หายเงียบ ๆ
const fixTex = s => String(s).replace(/\$[^$]*\$/g, m => m.replace(/(^|[^\\])%/g, '$1\\%'));
const fmtNum = v => /^-?\d{5,}(\.\d+)?$/.test(v) ? Number(v).toLocaleString('en-US') : v;

function defsOf(key){
  if (!window.definitionsHTML) return [];
  const box = document.createElement('div');
  box.innerHTML = window.definitionsHTML(key);
  return [...box.querySelectorAll('.def')].map(d => ({
    t: d.querySelector('.def-th')?.innerHTML || '',
    s: d.querySelector('.def-sym')?.innerHTML || '',
    th: d.querySelector('.def-text')?.innerHTML || ''
  }));
}

function mainEq(prob, key){
  if (!window.mainEquationHTML) return null;
  const h = window.mainEquationHTML(prob, key);
  const tex = (h.match(/\$\$([\s\S]*?)\$\$/) || [])[1];
  const nm = ((h.match(/me-tag">([^<]*)</) || [])[1] || '').replace(/^สมการหลัก\s*·\s*/, '');
  return tex ? { tex, nm } : null;
}

function splitGiven(html){
  // แยก "m = 5 kg, s = 4 m" ที่จุลภาคนอกโหมดคณิต
  const out = []; let cur = '', inM = false;
  for (let i = 0; i < html.length; i++){
    const c = html[i];
    if (c === '$') inM = !inM;
    if (c === ',' && !inM && html[i+1] === ' '){ out.push(cur.trim()); cur = ''; i++; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
function ansOf(p){
  const m = (p.intermediateHtml || '').match(/data-answer="([^"]*)"|placeholder="([^"]*)"/);
  return m ? parseFloat(String(m[1] || m[2]).replace(/,/g, '')) : NaN;
}
function givenOf(p){
  const h = p.intermediateHtml || '';
  const m = h.match(/โจทย์กำหนด:<\/b>([\s\S]*?)<\/div>/);
  if (m) return splitGiven(m[1].trim());
  const box = document.createElement('div'); box.innerHTML = h;
  const first = [...box.querySelectorAll('p')].find(x => !x.querySelector('input') && x.textContent.trim());
  return first ? splitGiven(first.innerHTML.trim()) : [];
}

// แยกแถวของ aligned ที่ระดับบนสุด (ไม่ตัดใน {…})
function splitRows(tex){
  const out = []; let d = 0, cur = '';
  for (let i = 0; i < tex.length; i++){
    const c = tex[i];
    if (c === '{') d++; else if (c === '}') d--;
    if (d === 0 && c === '\\' && tex[i+1] === '\\'){ out.push(cur); cur = ''; i++; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out.map(x => x.trim()).filter(Boolean);
}
function mathRows(tex){
  const al = tex.match(/\\begin\{aligned\}([\s\S]*)\\end\{aligned\}/);
  if (!al) return [{ type:'text', html: '$\\displaystyle ' + tex.trim() + '$' }];
  return splitRows(al[1]).map(row => {
    const at = row.indexOf('&');
    const lhs = at < 0 ? '' : row.slice(0, at).trim();
    let rhs = at < 0 ? row : row.slice(at + 1).trim();
    const rel = rhs.match(/^(=|\\approx|\\ge|\\le|<|>|\\Rightarrow|\\rightarrow)\s*/);
    const op = rel ? rel[1] : '';
    if (rel) rhs = rhs.slice(rel[0].length);
    return { type:'calc', label: lhs ? '$\\displaystyle ' + lhs + '$' : '', op: op ? '$' + op + '$' : '', expr: '$\\displaystyle ' + rhs + '$' };
  });
}
function parseGuideSteps(box, ansVal){
  const rows = []; let n = 0;
  const steps = [...box.children];
  steps.forEach(st => {
    n++; let first = true;
    const add = r => { r.grp = String(n); if (first){ r.n = String(n); first = false; } rows.push(r); };
    const parts = st.classList.contains('step') ? [...st.children] : [st];
    parts.forEach(el => {
      if (el.tagName === 'UL' || el.tagName === 'OL'){ [...el.children].forEach(li => add({ type:'text', html: '<span class="li">' + li.innerHTML.trim() + '</span>' })); return; }
      const h = el.innerHTML.trim();
      // ใช้ textContent — innerHTML จะแปลง & ของ aligned เป็น &amp;
      const dm = !el.children.length && el.textContent.trim().match(/^\$\$([\s\S]*)\$\$$/);
      if (dm){ mathRows(dm[1]).forEach(add); return; }
      add({ type:'text', html: h.replace(/^<strong>ขั้นที่\s*\d+\s*:?<\/strong>\s*/, '') });
    });
  });
  // แถวคำตอบ = แถวล่างสุดที่ตัวเลขท้ายตรงกับคำตอบในแอป (บางข้อบรรทัดสุดท้ายไม่ใช่สิ่งที่โจทย์ถาม)
  const calcs = rows.filter(r => r.type === 'calc').reverse();
  const lastNum = tex => { const m = tex.replace(/\{,\}/g, '').match(/-?\d+(?:\.\d+)?/g); return m ? parseFloat(m[m.length - 1]) : NaN; };
  const hit = isFinite(ansVal) ? calcs.find(r => { const v = lastNum(r.expr); return isFinite(v) && Math.abs(Math.abs(v) - Math.abs(ansVal)) <= Math.max(0.011 * Math.abs(ansVal), 1e-9); }) : null;
  const ansRow = hit || calcs[0];
  if (ansRow){ ansRow.ans = true; ansRow.expr = '<span class="ans">' + ansRow.expr + '</span>'; }
  return rows;
}

function parseGuide(html, ansVal){
  const box = document.createElement('div'); box.innerHTML = fixTex(html);
  if (!box.querySelector('.calc-steps, input')) return parseGuideSteps(box, ansVal);
  const rows = [];
  for (const el of box.children){
    if (el.classList.contains('calc-steps')){
      const c = [...el.children];
      for (let i = 0; i + 2 < c.length; i += 3)
        rows.push({ type:'calc', label:c[i].innerHTML.trim(), op:c[i+1].innerHTML.trim(), expr:c[i+2].innerHTML.trim() });
    } else rows.push({ type:'text', html: el.innerHTML.trim() });
  }
  let n = 0;
  rows.forEach(r => {
    const k = r.type === 'calc' ? 'label' : 'html';
    const m = r[k].match(/^(\d+)\.\s*/);
    if (m){ r.n = m[1]; r[k] = r[k].slice(m[0].length); n = +m[1]; }
    else if (r.type === 'text' || r.label) r.n = String(++n);
    r.grp = r.n || String(n);
    const repl = s => s.replace(/<input[^>]*placeholder="([^"]*)"[^>]*>/, (_, v) => { r.ans = true; return '<span class="ans">' + fmtNum(v) + '</span>'; });
    if (r.type === 'calc') r.expr = repl(r.expr); else r.html = repl(r.html);
  });
  return rows;
}

/* ════════════════════════════════════════════════════════════════
   ตัวสร้างสไลด์แต่ละชนิด — คืน {html, sec, title, init?, enter?, leave?}
   ════════════════════════════════════════════════════════════════ */
const kick = (S, what) => `<div class="kicker"><b>${S.num} ${S.title}</b><span class="dot"></span><span>${what}</span></div>`;

/* ชื่อบทบนปกเป็นข้อความ SVG — ทำสองอย่างที่ CSS ทำพร้อมกันไม่ได้
   1) หนาขึ้น ~15%: IBM Plex Sans Thai หนาสุดแค่ 700 จึงเติมเส้นขอบ (stroke) สีเดียวกับเนื้ออักษร
      ขนาดราว 15% ของความหนาก้านตัวอักษร (700 ≈ 0.14em · 200 ≈ 0.045em)
   2) คลื่นสีประจำบทไหลผ่านตัวอักษร: ลายของเนื้อและขอบเป็น pattern พื้นสีหมึก + แถบคลื่นไซน์
      เลื่อนแนวนอนวนไปเรื่อย ๆ (เครื่องที่ตั้ง "ลดการเคลื่อนไหว" เห็นคลื่นนิ่ง) */
function waveTitle(C){
  const W = 1392, H = 400, FS = 150, L = 480;              // L = ความยาวคลื่น (กว้างของลายหนึ่งช่วง)
  const y1 = 175, y2 = 350, c1 = y1 - 0.36 * FS, c2 = y2 - 0.36 * FS;
  const band = (cy, amp, half) => {                        // พื้นที่ระหว่างเส้นไซน์สองเส้น ครบหนึ่งความยาวคลื่นพอดี
    let top = '', bot = '';
    for (let x = 0; x <= L; x += 12){
      const y = cy + amp * Math.sin(2 * Math.PI * x / L);
      top += (x ? ' L' : 'M') + x + ' ' + (y - half).toFixed(1);
      bot = ' L' + x + ' ' + (y + half).toFixed(1) + bot;
    }
    return top + bot + ' Z';
  };
  const id = 'wv' + C.no;
  const pat = `<pattern id="${id}" data-l="${L}" patternUnits="userSpaceOnUse" width="${L}" height="${H}">
      <rect width="${L}" height="${H}" style="fill:var(--ink)"/>
      <path d="${band(c1, 26, 30)}" fill="${C.color}"/>
      <path d="${band(c1 + 6, 20, 9)}" fill="#fff" opacity=".28"/>
      <path d="${band(c2, 22, 26)}" fill="${C.color}" opacity=".9"/>
    </pattern>`;
  const line = (t, y, w, sw) => `<text x="${W / 2}" y="${y}" text-anchor="middle" font-size="${FS}" font-weight="${w}"
      stroke="url(#${id})" stroke-width="${sw}" stroke-linejoin="round" style="font-family:var(--head);fill:url(#${id})">${t}</text>`;
  return `<svg class="wvsvg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><defs>${pat}</defs>${line(C.cover[0], y1, 700, 3.2)}${line(C.cover[1], y2, 200, 1)}</svg>`;
}
// คลื่นไหลด้วย rAF เฉพาะตอนปกอยู่บนจอ (ประหยัดเครื่อง · วัดผลได้) · 1 ความยาวคลื่นต่อ 7 วินาที
function waveStart(el){
  const pat = el.querySelector('.wvsvg pattern'); if (!pat || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const L = +pat.dataset.l, t0 = performance.now() - (el._wvT || 0);
  const step = now => { el._wvT = now - t0; pat.setAttribute('patternTransform', 'translate(' + (-(el._wvT / 7000 * L) % L).toFixed(1) + ' 0)'); el._wvRaf = requestAnimationFrame(step); };
  cancelAnimationFrame(el._wvRaf); el._wvRaf = requestAnimationFrame(step);
}
function waveStop(el){ cancelAnimationFrame(el._wvRaf); }
function cover(){
  return { cls:'s-cover', title:'ปก', enter: waveStart, leave: waveStop, html: `
    <div class="sub">${CFG.name} · ${CHAPTER.book || CFG.book} · บทที่ ${CHAPTER.no}</div>
    <h1 aria-label="${CHAPTER.cover.join('')}">${waveTitle(CHAPTER)}</h1>
    <div class="keys"><kbd>→</kbd> <kbd>Space</kbd> หรือคลิก ไปต่อ · <kbd>←</kbd> ย้อน<br>${NUMS.map(n => `<kbd>${n}</kbd>`).join('')} เปลี่ยนบท · <kbd>O</kbd> ภาพรวม · <kbd>E</kbd> แก้ข้อความ · <kbd>F</kbd> เต็มจอ · <kbd>D</kbd> มืด/สว่าง · <kbd>B</kbd> จอดำ</div>` };
}
function roadmap(){
  return { title:'เนื้อหาในบทนี้', html: `
    <div class="kicker"><b>บทที่ ${CHAPTER.no}</b><span class="dot"></span><span>เนื้อหาในบทนี้</span></div>
    <h2 class="chtitle" style="--c:${CHAPTER.color}"><span>${CHAPTER.title}</span></h2>
    <ol class="road${SECTIONS.length >= 6 ? " dense" : ""}">${SECTIONS.map(S => `<li class="f" style="--c:${S.color}"><span class="n">${S.num}</span><span class="t">${S.title}<small>${S.en}</small></span><span class="q">${S.road}</span></li>`).join('')}</ol>` };
}
function opener(S){
  return { cls:'s-open', title:S.title, html: `
    <div class="big">${S.num}</div>
    <h2>${S.title}<small>${S.en}</small></h2>
    <p class="hook f">${S.hook}</p>` };
}
function defsSlide(S){
  const d = (S.defs || defsOf(S.key)).slice(0, 3);
  return { title:'นิยาม', html: `${kick(S,'นิยาม')}
    <h2>${S.title} คืออะไร</h2>
    <dl class="defs">${d.map((x,i) => `<div class="def ${i ? 'f' : ''}"><dt>${x.t}${x.s ? `<span class="sym">${x.s}</span>` : ''}</dt><dd>${x.th}</dd></div>`).join('')}</dl>` };
}
function coreSlide(S){
  const c = S.core;
  return { title:'สมการตั้งต้น', html: `${kick(S,'กฎและสมการ')}
    <h2>ที่มาของสมการ</h2>
    <div class="core">
      <div class="hero"><div class="lbl">${c.lbl}</div>$$${c.eq}$$</div>
      <ol class="steps">${c.steps.map(s => `<li class="f"><p>${s.t}</p>${s.eq ? "$$" + s.eq + "$$" : ""}</li>`).join('')}</ol>
    </div>` };
}
function eqsSlide(S){
  return { title:'สมการที่ใช้บ่อย', html: `${kick(S,'สมการที่ใช้บ่อย')}
    <h2>สรุปสูตรในบทนี้</h2>
    <div class="eqgrid">${S.eqs.map(e => `<div class="eqrow f"><div class="nm">${e.nm}<small>${e.s}</small></div><div>$$${e.eq}$$</div></div>`).join('')}</div>` };
}
function lifeSlide(S){
  return { title:'ในชีวิตประจำวัน', html: `${kick(S,'ในชีวิตประจำวัน')}
    <h2>เจอ${S.title}ที่ไหนบ้าง</h2>
    <div class="life">${S.life.map(l => `<div class="row f"><div class="ic"><i class="ph ${l.ic}"></i></div><h3>${l.h}</h3><p>${l.p}</p></div>`).join('')}</div>` };
}
function thinkSlide(S){
  return { cls:'s-think', title:'ชวนคิด', html: `${kick(S,'ชวนคิด')}
    <p class="q">${S.think.q}</p>
    <div class="timer"><i class="ph ph-timer"></i> คิดก่อน 30 วินาที แล้วคลิกดูคำตอบ</div>
    <div class="a f"><div class="lbl">คำตอบ</div><p>${S.think.a}</p></div>` };
}
function simSlide(S){
  const sim = SIMS[S.sim];
  return { title: S.simTitle, html: `${kick(S,'ลองเล่น')}
    <h2>${S.simTitle}</h2>
    <div class="sim"><div class="side"><p>${S.simText}</p>
      <div class="try"><b>ลองหาคำตอบ</b><ul>${S.simTry.map(t => `<li>${t}</li>`).join('')}</ul></div></div>
      <div class="panel">${sim.html}</div></div>`,
    init: sim.init, enter: sim.enter, leave: sim.leave };
}

// สรุปคำตอบท้ายวิธีทำ: ใช้ p.say ถ้ามี ไม่งั้นประกอบจากแถวคำตอบ (ตัวแปรของชุดสมการนั้น = ค่า หน่วย)
function answerSummary(p, rows){
  if (p.say) return fixTex(p.say);
  const i = rows.findIndex(r => r.ans);
  if (i < 0 || rows[i].type !== 'calc') return '';
  const r = rows[i];
  let lbl = r.label;
  for (let j = i - 1; !lbl && j >= 0 && rows[j].grp === r.grp; j--) lbl = rows[j].label;
  const val = r.expr.replace(/<span class="ans">([\s\S]*?)<\/span>/, '$1').replace(/&nbsp;/g, ' ').trim();
  return lbl ? lbl + ' ' + (r.op || '$=$') + ' ' + val : val;
}
function probSlide(S, order, pid){
  const list = (TOPICS[S.key] || {}).problems || [];
  const obj = { title:'โจทย์ข้อ ' + order, cls:'s-prob', pid, S, order, list };
  obj.render = function(id){
    const p = list.find(x => x.id === id) || list[0];
    if (!p) return `${kick(S,'โจทย์')}<p>ไม่พบโจทย์ใน data.js</p>`;
    const idx = list.indexOf(p) + 1;
    const g = givenOf(p), me = mainEq(p, S.key), rows = parseGuide(p.guide || '', ansOf(p)), summ = answerSummary(p, rows);
    let prev = null;
    const sol = rows.map((r, i) => {
      const cont = !r.n && prev && prev.grp === r.grp;
      prev = r;
      const nb = `<div class="nb">${r.n ? `<span>${r.n}</span>` : ''}</div>`;
      const cls = `r step${cont && r.type === 'calc' && !r.label ? ' cont' : ''}${r.ans ? ' final' : ''}`;
      return r.type === 'calc'
        ? `<div class="${cls}" data-g="${r.grp}">${nb}<div>${r.label}</div><div class="op">${r.op}</div><div>${r.expr}</div></div>`
        : `<div class="${cls}" data-g="${r.grp}">${nb}<div class="txt">${r.html}</div></div>`;
    }).join('');
    return `
      <div class="ptop">${kick(S,'โจทย์ข้อ ' + order)}
        <div class="chips nointeract">เปลี่ยนข้อ ${list.map((x,i) => `<button data-pid="${x.id}" class="${x.id === p.id ? 'cur' : ''}" title="${esc(x.text.replace(/\$/g,'').slice(0,80))}">${i+1}</button>`).join('')}</div></div>
      <div class="pbody">
        <div class="pq">
          <div class="num">${String(idx).padStart(2,'0')}</div>
          <div class="txt">${fixTex(p.text)}</div>
          ${g.length ? `<div class="given f"><div class="lbl">โจทย์กำหนด</div><ul>${g.map(x => `<li>${fixTex(x)}</li>`).join('')}</ul></div>` : ''}
          ${p.hints ? `<button class="hintbtn nointeract"><i class="ph ph-lightbulb"></i> คำใบ้</button><div class="hintbox"><div class="lbl">คำใบ้</div>${fixTex([].concat(p.hints).join('<br>'))}</div>` : ''}
        </div>
        <div class="psol">
          ${me ? `<div class="meq f"><div class="lbl">สมการหลัก · ${me.nm}</div>$$${me.tex}$$</div>` : ''}
          <div class="sol">${sol}</div>
          ${summ ? `<div class="sumans f"><span class="lbl">สรุปคำตอบ</span><span class="v">${summ}</span></div>` : ''}
          <div class="pdone">คลิกต่อเพื่อไปสไลด์ถัดไป · หรือกดเลขด้านบนเพื่อลองข้ออื่น</div>
        </div>
      </div>`;
  };
  obj.html = obj.render(pid);
  obj.init = el => bindProb(el, obj);
  obj.enter = el => fitSol(el);
  return obj;
}
function bindProb(el, obj){
  el.querySelectorAll('.chips button').forEach(b => b.onclick = e => {
    e.stopPropagation();
    obj.pid = b.dataset.pid;
    el.innerHTML = obj.render(obj.pid);
    renderMath(el); bindProb(el, obj); applyEdits(cur);
    frag[cur] = 0; applyFrags(el, 0); fitSol(el);
    if (editing){ applyFrags(el, fragsOf(el).length); setEditable(cur, true); }
  });
  const ps = el.querySelector('.psol');
  if (ps) ps.onscroll = () => ps.classList.toggle('scrolled', ps.scrollTop > 4);
  const hb = el.querySelector('.hintbtn');
  if (hb) hb.onclick = e => { e.stopPropagation(); el.querySelector('.hintbox').classList.toggle('show'); };
}
function fitSol(el){
  const ps = el.querySelector('.psol'); if (!ps) return;
  let fs = 34; ps.style.setProperty('--sfs', fs + 'px');
  while (ps.scrollHeight > ps.clientHeight + 2 && fs > 26){ fs -= 1; ps.style.setProperty('--sfs', fs + 'px'); }
}

function summary(){
  const key = CHAPTER.sum.map(([k, nm, eq]) => { const S = SECTIONS.find(x => x.key === k); return [S.num, nm, eq, S.color]; });
  return { title:'สรุปบท', html: `
    <div class="kicker"><b>บทที่ ${CHAPTER.no}</b><span class="dot"></span><span>สรุป</span></div>
    <h2>สมการที่ต้องติดตัว</h2>
    <div class="sum">${key.map((k,i) => `<div class="it f" style="--c:${k[3]}"><span class="n">${k[0]}</span><div><div class="nm">${k[1]}</div>$$${k[2]}$$</div></div>`).join('')}
      <div class="it f" style="--c:var(--ink3)"><span class="n"><i class="ph ph-arrows-clockwise"></i></span><div><div class="nm">เส้นเรื่องเดียวกันทั้งบท</div><p style="font-size:24px;line-height:1.6">${CHAPTER.story}</p></div></div>
    </div>` };
}

/* ════════════════════════════════════════════════════════════════
   ประกอบสำรับ
   ════════════════════════════════════════════════════════════════ */
document.title = `สไลด์${CFG.name} · บทที่ ${CHAPTER.no}`;
const slides = [cover(), roadmap()];
SECTIONS.forEach(S => {
  // หัวข้อที่ไม่มีแบบจำลอง / นิยาม / ชีวิตจริง / ชวนคิด ข้ามสไลด์นั้นไป
  const has = { [defsSlide.name]: (S.defs || defsOf(S.key)).length, [simSlide.name]: S.sim && SIMS[S.sim], [lifeSlide.name]: S.life && S.life.length,
                [thinkSlide.name]: S.think, [eqsSlide.name]: S.eqs && S.eqs.length, [coreSlide.name]: S.core };
  [opener, defsSlide, coreSlide, simSlide, eqsSlide, lifeSlide, thinkSlide].filter(fn => fn.name in has ? !!has[fn.name] : true)
    .forEach(fn => slides.push(Object.assign(fn(S), { S })));
  (S.probs || []).forEach((pid, i) => slides.push(probSlide(S, i + 1, pid)));
});
slides.push(summary());

const deck = document.getElementById('deck'), stage = document.getElementById('stage');
slides.forEach((s, i) => {
  const el = document.createElement('section');
  el.className = 'slide ' + (s.cls || '');
  el.innerHTML = s.html;
  el.style.setProperty('--acc', s.S ? s.S.color : CHAPTER.color); // ปก สารบัญ สรุป ใช้สีประจำบท
  s.el = el; deck.appendChild(el);
});

function renderMath(root){
  if (!window.renderMathInElement) return;
  renderMathInElement(root, { delimiters: [{left:'$$', right:'$$', display:true}, {left:'$', right:'$', display:false}], throwOnError:false });
  fitX(root);
}
// สมการยาวเกินช่อง → ย่อเฉพาะสมการนั้นจนพอดี (ไม่ตัดขอบ)
function fitX(root){
  root.querySelectorAll('.katex-display').forEach(kd => {
    let box = kd.parentElement; const k = kd.firstElementChild;
    while (box && getComputedStyle(box).display === 'inline') box = box.parentElement; // auto-render ห่อด้วย span
    if (!box || !k) return;
    const cs = getComputedStyle(box), room = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    let z = 1; kd.style.fontSize = '';
    // วัดจากกล่องของตัวอักษรจริง (ลูกศรเวกเตอร์ของ KaTeX เป็น svg กว้าง 400em ที่ถูกตัดขอบ วัดตรง ๆ ไม่ได้)
    const need = () => {
      let L = Infinity, Rt = -Infinity;
      k.querySelectorAll('.katex-html .mord, .katex-html .mbin, .katex-html .mrel, .katex-html .mop, .katex-html .mopen, .katex-html .mclose, .katex-html .mpunct').forEach(e => {
        const r = e.getBoundingClientRect(); if (!r.width || r.width > 4000) return;
        L = Math.min(L, r.left); Rt = Math.max(Rt, r.right);
      });
      return Rt > L ? (Rt - L) / scaleNow() : 0;
    };
    while (need() > room + 1 && z > 0.55){ z -= 0.05; kd.style.fontSize = z + 'em'; }
  });
}

/* ════════════════════════════════════════════════════════════════
   การเลื่อนสไลด์ + การเผยทีละบรรทัด
   ════════════════════════════════════════════════════════════════ */
let cur = 0; const frag = slides.map(() => 0);
const SHOW_ALL = /[?&]all(&|$)/.test(location.search); // ?all = เผยทุกบรรทัดทันที (ไว้พิมพ์/ตรวจ)
const fragsOf = el => [...el.querySelectorAll('.f, .sol .r')];

function applyFrags(el, n){
  const fs = fragsOf(el);
  fs.forEach((f, i) => { f.classList.toggle('on', i < n); f.classList.remove('now', 'grpnow'); });
  const last = fs[n - 1];
  if (last){
    last.classList.add('now');
    if (last.dataset.g) fs.forEach((f, i) => { if (i < n && f.dataset.g === last.dataset.g) f.classList.add('grpnow'); });
  }
  const done = el.querySelector('.pdone'); if (done) done.classList.toggle('show', n >= fs.length && fs.length > 0);
  followLine(el, last, n);
}

// ใช้ scrollTop ของช่องวิธีทำเอง (scrollIntoView จะเลื่อนเวทีทั้งแผ่นไปด้วย)
function followLine(el, last, n){
  const ps = el.querySelector('.psol'); if (!ps) return;
  if (!n || !last){ ps.scrollTop = 0; return; }
  const cell = last.classList.contains('r') ? last.lastElementChild : last;
  const sc = stage.getBoundingClientRect().width / 1600 || 1;
  const pr = ps.getBoundingClientRect(), cr = cell.getBoundingClientRect();
  const below = (cr.bottom - pr.bottom) / sc + 28, above = (pr.top - cr.top) / sc + 28;
  if (below > 28) ps.scrollTo({ top: ps.scrollTop + below, behavior: 'smooth' });
  else if (above > 28) ps.scrollTo({ top: ps.scrollTop - above, behavior: 'smooth' });
}
const wipe = document.getElementById('wipe');
let pending = null; // การสลับสไลด์ที่รออยู่หลังม่าน
function show(i, dir, opts = {}){
  if (pending) pending();
  if (editing) setEditable(cur, false);
  i = Math.max(0, Math.min(slides.length - 1, i));
  const from = slides[cur], to = slides[i];
  if (i === cur && !opts.force) return;
  frag[i] = (opts.allFrags || SHOW_ALL) ? fragsOf(to.el).length : 0;
  applyFrags(to.el, frag[i]);
  const secChange = to.S && (!from.S || from.S.key !== to.S.key) && to.el.classList.contains('s-open');
  const swap = () => {
    if (from !== to){ from.leave && from.leave(from.el); from.el.classList.remove('active'); }
    to.el.classList.add('active');
    to.enter && to.enter(to.el);
    cur = i; updHud();
    if (editing){ frag[i] = fragsOf(to.el).length; applyFrags(to.el, frag[i]); setEditable(i, true); }
    try { history.replaceState(null, '', '#' + (i + 1)); } catch (e) {}
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || opts.instant){ swap(); return; }
  if (secChange && dir > 0){
    wipe.style.background = to.S.color;
    wipe.querySelector('.n').textContent = to.S.num; wipe.querySelector('.t').textContent = to.S.title;
    const a = wipe.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}], {duration:420, easing:'cubic-bezier(.7,0,.3,1)', fill:'forwards'});
    // สลับสไลด์ด้วยตัวจับเวลา ไม่รอ onfinish — แท็บเบื้องหลังหยุดแอนิเมชัน ถ้ารอจะค้างอยู่หลังม่าน
    // และถ้ากดต่อระหว่างม่านปิด next()/prev() จะเรียก pending ให้ข้ามไปทันที
    const done = () => {
      if (pending !== done) return; pending = null; clearTimeout(tm);
      swap(); a.cancel();
      wipe.animate([{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 0 100%)'}], {duration:520, delay:260, easing:'cubic-bezier(.7,0,.3,1)', fill:'both'});
      to.el.animate([{opacity:0, transform:'translateX(60px)'},{opacity:1, transform:'none'}], {duration:700, delay:420, easing:'cubic-bezier(.2,.8,.2,1)', fill:'backwards'});
    };
    pending = done; const tm = setTimeout(done, 430);
    return;
  }
  const dx = dir >= 0 ? 1 : -1;
  if (from !== to) from.el.animate([{opacity:1, transform:'none', filter:'none'},{opacity:0, transform:`translateX(${-70 * dx}px) scale(.98)`, filter:'blur(6px)'}], {duration:380, easing:'cubic-bezier(.4,0,.2,1)'});
  swap();
  to.el.animate([{opacity:0, transform:`translateX(${90 * dx}px)`, filter:'blur(8px)'},{opacity:1, transform:'none', filter:'none'}], {duration:560, easing:'cubic-bezier(.2,.8,.2,1)'});
}

function next(){
  if (pending){ pending(); return; }
  const s = slides[cur], n = fragsOf(s.el).length;
  if (frag[cur] < n){ frag[cur]++; applyFrags(s.el, frag[cur]); keepVisible(s.el); }
  else if (cur < slides.length - 1) show(cur + 1, 1);
}
function prev(){
  if (pending){ pending(); return; }
  const s = slides[cur];
  if (frag[cur] > 0){ frag[cur]--; applyFrags(s.el, frag[cur]); }
  else if (cur > 0) show(cur - 1, -1, { allFrags: true });
}
function keepVisible(el){ /* เนื้อหาถูกออกแบบให้พอดีเวที — ปรับขนาดวิธีทำอีกครั้งเผื่อสูตรยาว */ if (el.querySelector('.psol')) fitSol(el); }

/* ── ย่อขยายเวที ── */
const scaleNow = () => stage.getBoundingClientRect().width / 1600 || 1;
function fit(){
  const s = Math.min(vw() / 1600, vh() / 900);
  const W = vw(), H = vh();
  stage.style.transform = `translate(${(W - 1600 * s) / 2}px, ${(H - 900 * s) / 2}px) scale(${s})`;
}
// ขนาดที่เห็นจริง — Safari บน iPad ย่อ/ขยายแถบที่อยู่ ทำให้ innerHeight เปลี่ยนภายหลัง
const vw = () => document.documentElement.clientWidth || innerWidth;
const vh = () => document.documentElement.clientHeight || innerHeight;
addEventListener('resize', fit);
addEventListener('orientationchange', () => setTimeout(fit, 250));
if (window.visualViewport) visualViewport.addEventListener('resize', fit);
if (window.ResizeObserver) new ResizeObserver(() => fit()).observe(document.documentElement); // กันกรณีเบราว์เซอร์ไม่ยิง resize
['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, () => setTimeout(fit, 60)));

/* ── แถบควบคุม ── */
const hud = document.getElementById('hud'), bar = document.getElementById('bar');
const groups = [{ key:'_', color:'var(--ink3)', idx:[] }];
slides.forEach((s, i) => {
  const k = s.S ? s.S.key : (i < 2 ? '_' : '_end');
  let g = groups.find(x => x.key === k);
  if (!g){ g = { key:k, color: s.S ? s.S.color : 'var(--ink3)', idx:[] }; groups.push(g); }
  g.idx.push(i);
});
bar.innerHTML = groups.map(g => `<div class="seg" style="--n:${g.idx.length};--c:${g.color}" data-first="${g.idx[0]}" title="${g.key === '_' ? 'เริ่มบท' : g.key === '_end' ? 'สรุป' : SECTIONS.find(S => S.key === g.key).num + ' ' + SECTIONS.find(S => S.key === g.key).title}"><i></i></div>`).join('');
bar.querySelectorAll('.seg').forEach(s => s.onclick = () => show(+s.dataset.first, +s.dataset.first >= cur ? 1 : -1));
function updHud(){
  groups.forEach((g, gi) => {
    const a = g.idx[0], b = g.idx[g.idx.length - 1];
    const p = cur > b ? 100 : cur < a ? 0 : (cur - a + 1) / g.idx.length * 100;
    bar.children[gi].style.setProperty('--p', p + '%');
  });
  document.getElementById('count').textContent = `${cur + 1} / ${slides.length}`;
}
let idle; const wake = () => { hud.classList.remove('hide'); clearTimeout(idle); idle = setTimeout(() => hud.classList.add('hide'), 2600); };
addEventListener('mousemove', wake); addEventListener('touchstart', wake, { passive: true }); wake();
document.getElementById('bPrev').onclick = prev;
document.getElementById('bNext').onclick = next;
document.getElementById('bFull').onclick = toggleFull;
document.getElementById('bTheme').onclick = toggleTheme;
document.getElementById('bOv').onclick = toggleOv;
const chmenu = document.getElementById('chmenu');
document.getElementById('bChT').textContent = 'บทที่ ' + CH_NO;
chmenu.innerHTML = Object.values(CHAPTERS).map(c => '<a role="menuitem" href="' + chHref(c.no) + '" class="' + (c.no === CH_NO ? 'cur' : '') + '" style="--c:' + c.color + '"><b>' + c.no + '</b>' + c.title + '</a>').join('') +
  '<a role="menuitem" href="?"><b>·</b>หน้าเลือกบท</a>';
document.getElementById('bCh').onclick = e => { e.stopPropagation(); chmenu.classList.toggle('show'); };
addEventListener('click', e => { if (!e.target.closest('#chmenu, #bCh')) chmenu.classList.remove('show'); });
function goChapter(n){ if (CHAPTERS[n] && +n !== CH_NO) location.href = chHref(n); }

function toggleFull(){
  const d = document, el = d.documentElement;
  const on = d.fullscreenElement || d.webkitFullscreenElement;
  try {
    if (on) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    else if (el.requestFullscreen) el.requestFullscreen().catch(noFull);
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else noFull();
  } catch (e) { noFull(); }
}
function noFull(){
  const t = document.getElementById('toast');
  t.textContent = 'อุปกรณ์นี้ไม่รองรับโหมดเต็มจอจากหน้าเว็บ — ลองหมุนจอเป็นแนวนอน หรือซ่อนแถบของเบราว์เซอร์แทน';
  t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 4200);
}
function toggleTheme(){
  const r = document.documentElement, d = r.dataset.theme === 'dark';
  r.dataset.theme = d ? 'light' : 'dark';
  try { localStorage.setItem(THEME_KEY, r.dataset.theme); } catch (e) {}
}
try { const t = localStorage.getItem(THEME_KEY); if (t) document.documentElement.dataset.theme = t; } catch (e) {}

/* ── ภาพรวม ── */
const ov = document.getElementById('ov');
function toggleOv(){
  if (ov.classList.toggle('show')){
    ov.innerHTML = '<div class="ovch">บท ' + Object.values(CHAPTERS).map(c => '<a href="' + chHref(c.no) + '" class="' + (c.no === CH_NO ? 'cur' : '') + '">บทที่ ' + c.no + ' ' + c.title + '</a>').join('') + '</div>' + groups.map(g => {
      const S = SECTIONS.find(x => x.key === g.key);
      const head = S ? `${S.num} ${S.title}` : g.key === '_' ? 'เริ่มบท' : 'สรุป';
      return `<h3 style="--c:${g.color}">${head}</h3><div class="g">${g.idx.map(i => `<div class="card ${i === cur ? 'cur' : ''}" style="--c:${g.color}" data-i="${i}"><small>${i + 1}</small><span>${slides[i].title}</span></div>`).join('')}</div>`;
    }).join('');
    ov.querySelectorAll('.card').forEach(c => c.onclick = () => { ov.classList.remove('show'); show(+c.dataset.i, +c.dataset.i >= cur ? 1 : -1, { instant: true }); });
  }
}

/* ── แก้ข้อความบนสไลด์ (กด E) ─────────────────────────────────
   แก้ได้เฉพาะข้อความ (หัวเรื่อง คำอธิบาย ชีวิตจริง ชวนคิด โจทย์ คำใบ้) — สูตรคณิตเป็นก้อนเดียว ลบได้แต่แก้ข้างในไม่ได้
   บันทึกใน localStorage ของเครื่องนี้ คีย์ละข้อความ พร้อมลายนิ้วมือของข้อความเดิม
   ถ้าเนื้อหาต้นฉบับเปลี่ยนภายหลัง ข้อความที่แก้ไว้จะไม่ถูกนำไปทับผิดที่ */
const EDIT_KEY = (CFG.storeKey || THEME_KEY.replace(/\.theme$/, '')) + '.edits.v1';
const EDITABLE = 'h2, .hook, .def dt, .def dd, .steps li p, .eqrow .nm, .life h3, .life p, .s-think .q, .s-think .a p, ' +
                 '.road .t, .road .q, .sim .side > p, .sim .try li, .pq .txt, .hintbox, .given li, .sum .nm, .s-cover .sub';
let EDITS = {}; try { EDITS = JSON.parse(localStorage.getItem(EDIT_KEY) || '{}') || {}; } catch (e) {}
let editing = false, saveT = 0;
const saveEdits = () => { try { localStorage.setItem(EDIT_KEY, JSON.stringify(EDITS)); } catch (e) { toast('บันทึกข้อความที่แก้ไม่ได้ — พื้นที่เก็บในเบราว์เซอร์เต็มหรือถูกปิดไว้'); } };
const saveSoon = () => { clearTimeout(saveT); saveT = setTimeout(saveEdits, 300); };
const hashStr = t => { let x = 0; for (let i = 0; i < t.length; i++) x = (x * 31 + t.charCodeAt(i)) >>> 0; return x.toString(36); };
const origOf = new WeakMap();
const editKey = (i, k) => CH_NO + ':' + i + ':' + (slides[i].pid || '') + ':' + k;
const editables = el => [...el.querySelectorAll(EDITABLE)];
function applyEdits(i){
  editables(slides[i].el).forEach((x, k) => {
    if (!origOf.has(x)) origOf.set(x, x.innerHTML);
    const e = EDITS[editKey(i, k)];
    if (e && e.o === hashStr(origOf.get(x))) x.innerHTML = e.h;
  });
}
function setEditable(i, on){
  editables(slides[i].el).forEach((x, k) => {
    if (!on){ x.removeAttribute('contenteditable'); x.oninput = null; return; }
    if (!origOf.has(x)) origOf.set(x, x.innerHTML);
    x.contentEditable = 'true';
    x.querySelectorAll('.katex, .ans').forEach(m => m.contentEditable = 'false');
    x.oninput = () => { EDITS[editKey(i, k)] = { o: hashStr(origOf.get(x)), h: x.innerHTML }; saveSoon(); };
  });
}
document.body.insertAdjacentHTML('beforeend',
  '<div id="editbar" role="toolbar" aria-label="แก้ไขข้อความ"><i class="ph ph-pencil-simple"></i>' +
  '<span>คลิกข้อความเพื่อแก้ · บันทึกอัตโนมัติในเครื่องนี้ · สูตรคณิตลบได้ทั้งก้อน</span>' +
  '<button id="eReset" type="button">คืนค่าหน้านี้</button><button id="eDone" class="pri" type="button">เสร็จ (E)</button></div>');
document.getElementById('bOv').insertAdjacentHTML('beforebegin', '<button id="bEdit" title="แก้ไขข้อความบนสไลด์ (E)"><i class="ph ph-pencil-simple"></i></button>');
const editbar = document.getElementById('editbar');
function toggleEdit(force){
  editing = force === undefined ? !editing : force;
  document.body.classList.toggle('editing', editing);
  editbar.classList.toggle('show', editing);
  document.getElementById('bEdit').classList.toggle('on', editing);
  const el = slides[cur].el;
  if (editing){ frag[cur] = fragsOf(el).length; applyFrags(el, frag[cur]); setEditable(cur, true); }
  else { clearTimeout(saveT); saveEdits(); setEditable(cur, false); if (document.activeElement) document.activeElement.blur(); fitX(el); fitSol(el); }
}
document.getElementById('bEdit').onclick = e => { e.stopPropagation(); toggleEdit(); };
document.getElementById('eDone').onclick = () => toggleEdit(false);
document.getElementById('eReset').onclick = () => {
  const el = slides[cur].el;
  editables(el).forEach((x, k) => { delete EDITS[editKey(cur, k)]; if (origOf.has(x)) x.innerHTML = origOf.get(x); });
  saveEdits(); if (editing) setEditable(cur, true);
  toast('คืนข้อความเดิมของหน้านี้แล้ว');
};
// วางข้อความจากที่อื่น → เอาเฉพาะตัวอักษร ไม่เอาสีและฟอนต์ติดมา
document.addEventListener('paste', e => {
  if (!e.target.isContentEditable) return;
  e.preventDefault();
  document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
});
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── อินพุต ── */
const isCtl = t => t.closest && t.closest('button, input, select, a, .nointeract, label');
stage.addEventListener('click', e => { if (!editing && !isCtl(e.target)) next(); });
stage.addEventListener('contextmenu', e => { e.preventDefault(); prev(); });
addEventListener('keydown', e => {
  if (e.target.isContentEditable){ if (e.key === 'Escape') e.target.blur(); return; }   // กำลังพิมพ์แก้ข้อความ
  if (e.key === 'e' || e.key === 'E' || (editing && e.key === 'Escape')){ e.preventDefault(); toggleEdit(e.key === 'Escape' ? false : undefined); return; }
  if (e.target.matches && e.target.matches('input[type=range]') && /Arrow/.test(e.key)) return;
  if (ov.classList.contains('show') && e.key !== 'o' && e.key !== 'O' && e.key !== 'Escape') return;
  const k = e.key;
  if (['ArrowRight','ArrowDown',' ','PageDown','Enter'].includes(k)){ e.preventDefault(); next(); }
  else if (['ArrowLeft','ArrowUp','PageUp','Backspace'].includes(k)){ e.preventDefault(); prev(); }
  else if (k === 'Home') show(0, -1);
  else if (/^\d$/.test(k) && CHAPTERS[k]) goChapter(k);
  else if (k === 'Escape' && chmenu.classList.contains('show')) chmenu.classList.remove('show');
  else if (k === 'End') show(slides.length - 1, 1);
  else if (k === 'o' || k === 'O' || (k === 'Escape' && ov.classList.contains('show'))) toggleOv();
  else if (k === 'f' || k === 'F') toggleFull();
  else if (k === 'd' || k === 'D') toggleTheme();
  else if (k === 'b' || k === 'B' || k === '.') document.getElementById('blank').classList.toggle('show');
  else if (k === 'h' || k === 'H'){ const hb = slides[cur].el.querySelector('.hintbox'); if (hb) hb.classList.toggle('show'); }
});
document.getElementById('blank').onclick = e => e.currentTarget.classList.remove('show');
let tx = null;
stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive:true });
stage.addEventListener('touchend', e => {
  if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
  if (!editing && Math.abs(dx) > 60){ dx < 0 ? next() : prev(); }
});

/* ── เริ่ม ── */
function boot(){
  renderMath(deck);
  slides.forEach((s, i) => applyEdits(i));
  slides.forEach(s => s.init && s.init(s.el));
  fit();
  if (document.fonts) document.fonts.ready.then(() => fitX(deck));
  const h = parseInt(location.hash.slice(1), 10);
  cur = 0; slides[0].el.classList.add('active');
  show(h > 1 ? h - 1 : 0, 1, { force: true, instant: true });
  updHud();
}
// ไว้ตรวจสไลด์จากคอนโซล: slidesDeck.go(10) = ไปสไลด์ที่ 11 แบบเผยครบทุกบรรทัด
window.slidesDeck = { go: i => show(i, 1, { allFrags: true, instant: true, force: true }), get count(){ return slides.length; } };
if (document.readyState === 'complete') boot(); else addEventListener('load', boot);
}
})();
