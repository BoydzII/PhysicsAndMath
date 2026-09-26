/* ============================================================================
   p1data.js — แปลงเนื้อหาฟิสิกส์ 1 (content_ch*.js) เป็นข้อมูลที่แอปและสไลด์ใช้
   ============================================================================
   แหล่งเดียวของเนื้อหา: content_ch1.js … content_ch4.js  (window.P1 = [บท, บท, …])
   ไฟล์นี้สร้าง
     physicsData.topics[key]   = { id, title, theory, problems:[{ id, text, hints, guide, intermediateHtml, advancedHtml, answer, say }] }
     definitionsHTML(key)      นิยามใต้หัวเรื่องในแผงทฤษฎี (แอป) และสไลด์นิยาม
     mainEquationHTML(p, key)  กล่อง "สมการหลัก" ก่อนวิธีทำ
     P1_TOPIC_ORDER            ลำดับหัวข้อ ใช้เติมตัวเลือกหัวข้อในแอป

   ── รูปแบบบท ────────────────────────────────────────────────────────────────
   { no, color, title, cover:[บรรทัด1, บรรทัด2], en, book, road, story, sum:[[key, ชื่อ, tex]], sections:[หัวข้อ…] }

   ── รูปแบบหัวข้อ (section) ─────────────────────────────────────────────────
   key num title en color · hook road lead · defs:[{ t, e, s?, th }]
   core:{ lbl, eq, steps:[{ t, eq? }] } · eqs:[{ nm, s, eq }] · tips:[…] (จำให้ขึ้นใจ)
   life:[{ ic, h, p }] · think:{ q, a } · main:{ nm, tex } (สมการหลักของโจทย์)
   sim? simTitle simText simTry (แบบจำลองในสไลด์ — โค้ดอยู่ใน slides.html)
   lessons?:[บทเรียนย่อย…] ก่อนสมการตั้งต้น — { kick, h, lead?, hero?:{ lbl, eq }, steps?, table?:{ cols, rows, split?, quiz? }, rules?:[{ t, ex:[[tex, จำนวน]] }], note? }
            หรือ { prob:id } = ตัวอย่างโจทย์คั่นในสไลด์ (ในแอปอยู่ในรายการโจทย์ตามปกติ)
   probs:[id, id, id] (โจทย์ 3 ข้อแรกบนสไลด์) · problems:[โจทย์…]

   ── รูปแบบโจทย์ ────────────────────────────────────────────────────────────
   { id, text, given:[…], hint, steps:[แถว…], ans:{ sym, val, unit, op? }, say?, main?:{ nm, tex } (แทนสมการหลักของหัวข้อ),
     fig? (รูปประกอบเส้นทางเคลื่อนไหวบนสไลด์ — รูปแบบอยู่ที่ figGeom ใน SlideDeck/deck.js) }
   แถวของวิธีทำ
     [ตัวแปร, นิพจน์]             → ตัวแปร = นิพจน์            (ตัวแปร '' = บรรทัดต่อจากชุดเดิม)
     [ตัวแปร, ตัวดำเนินการ, นิพจน์] → เช่น ['v', '\\approx', '3.16']
     { t: 'ข้อความ' }             → บรรทัดคำอธิบาย
   ไม่ต้องเขียนบรรทัดคำตอบ — ต่อท้ายให้เองจาก ans (ช่องกรอกคำตอบในแอป · กรอบคำตอบในสไลด์)
   ans.sym ใช้เมื่อบรรทัดคำตอบไม่อยู่ในชุดสมการใด (เช่น หลังบรรทัดคำอธิบาย)
   say (ไม่บังคับ) ประโยคสรุปคำตอบ ใช้แทนการประกอบอัตโนมัติ
   ========================================================================== */
var physicsData = { topics: {} };
var P1_TOPIC_ORDER = [];
(function () {
  var CH = window.P1 || [];
  CH.sort(function (a, b) { return a.no - b.no; });
  var SEC = {};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* ── วิธีทำ → HTML แบบเดียวกับแอปฟิสิกส์ 2 (ตาราง calc-steps 3 ช่อง) ── */
  function guideHTML(p) {
    var out = '', grid = [], n = 0, lastLabeled = false, lastLabel = '';
    function flush() { if (grid.length) { out += '<div class="calc-steps">' + grid.join('') + '</div>'; grid = []; } }
    var rows = (p.steps || []).slice();
    var a = p.ans || {};
    var input = '<input type="text" class="answer-input" placeholder="' + esc(a.val) + '">' + (a.unit ? '&nbsp;' + a.unit : '');
    rows.forEach(function (r) {
      if (!Array.isArray(r)) { flush(); n++; out += '<div class="step">' + n + '. ' + r.t + '</div>'; lastLabeled = false; return; }
      var lbl = r[0], op = r.length === 3 ? r[1] : '=', ex = r.length === 3 ? r[2] : r[1];
      if (lbl) { n++; lastLabeled = true; lastLabel = lbl; }
      grid.push('<div>' + (lbl ? n + '. $' + lbl + '$' : '') + '</div><div>$' + op + '$</div><div>$' + ex + '$</div>');
    });
    // บรรทัดคำตอบ: ต่อชุดสมการสุดท้ายเมื่อเป็นตัวแปรเดียวกับคำตอบ (หรือไม่ได้ระบุ ans.sym)
    // ไม่งั้นขึ้นชุดใหม่ด้วยตัวแปรของคำตอบ — แอปเติมชื่อตัวแปรของชุดที่บรรทัดสุดท้าย ถ้าต่อผิดชุดจะได้ "10s = 40 m"
    if (grid.length && lastLabeled && (!a.sym || a.sym === lastLabel)) grid.push('<div></div><div>$' + (a.op || '=') + '$</div><div>' + input + '</div>');
    else { n++; grid.push('<div>' + n + '. $' + (a.sym || '') + '$</div><div>$' + (a.op || '=') + '$</div><div>' + input + '</div>'); }
    flush();
    return out;
  }
  function answerLine(p) {
    var a = p.ans || {};
    return '<div style="margin-top:20px;font-weight:bold;">ตอบ: $' + (a.sym || '') + ' =$ <input type="text" class="answer-input" style="width:120px"> ' + (a.unit || '') + '</div>';
  }

  /* ── แผงทฤษฎีของแอป ── */
  function theoryHTML(S) {
    var h = '<h2><span class="t-num">' + S.num + '</span>' + S.title + ' (' + S.en + ')</h2>';
    if (S.lead) h += '<p class="lead">' + S.lead + '</p>';
    (S.lessons || []).forEach(function (L) {
      if (L.prob) return;
      h += '<section class="p1-lesson"><h3 class="eq-sec">' + L.h + '</h3>';
      if (L.lead) h += '<p>' + L.lead + '</p>';
      if (L.defs) h += '<section class="defs"><dl>' + L.defs.map(function (d) {
        return '<div class="def"><dt><span class="def-th">' + d.t + '</span>' + (d.e ? '<span class="def-en" lang="en">' + esc(d.e) + '</span>' : '') + (d.s ? '<span class="def-sym">' + d.s + '</span>' : '') + '</dt><dd class="def-text">' + d.th + '</dd></div>';
      }).join('') + '</dl></section>';
      if (L.hero) {
        h += '<section class="eq-core"><div class="eq-label">' + L.hero.lbl + '</div><div class="eq-block">$$' + L.hero.eq + '$$</div><ol class="derive"' + (L.start ? ' style="counter-reset:d ' + (L.start - 1) + '"' : '') + '>';
        (L.steps || []).forEach(function (st) { h += '<li><p>' + st.t + '</p>' + (st.eq ? '<div class="eq-block">$$' + st.eq + '$$</div>' : '') + '</li>'; });
        h += '</ol></section>';
      }
      if (L.table) h += '<div class="p1-tabwrap"><table class="p1-tab"><thead><tr>' + L.table.cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' +
        L.table.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      if (L.rules) h += '<ol class="p1-rules">' + L.rules.map(function (r) {
        return '<li><p>' + r.t + '</p><div class="p1-ex">' + r.ex.map(function (e) { return '<span>$' + e[0] + '$ <b>' + e[1] + '</b></span>'; }).join('') + '</div></li>';
      }).join('') + '</ol>';
      if (L.note) h += '<p class="p1-note">' + L.note + '</p>';
      h += '</section>';
    });
    if (S.core) {
      h += '<section class="eq-core"><div class="eq-label">' + S.core.lbl + '</div><div class="eq-block">$$' + S.core.eq + '$$</div><ol class="derive">';
      S.core.steps.forEach(function (st) { h += '<li><p>' + st.t + '</p>' + (st.eq ? '<div class="eq-block">$$' + st.eq + '$$</div>' : '') + '</li>'; });
      h += '</ol></section>';
    }
    if (S.eqs && S.eqs.length) {
      h += '<h3 class="eq-sec">สมการหลักที่ใช้บ่อย</h3><div class="eq-list">';
      S.eqs.forEach(function (e) { h += '<div class="eq-row"><div class="eq-name">' + e.nm + '</div><div class="eq-block">$$' + e.eq + '$$</div></div>'; });
      h += '</div>';
    }
    if (S.tips && S.tips.length) h += '<aside class="tips"><div class="tips-title">จำให้ขึ้นใจ</div><ul>' + S.tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></aside>';
    if (S.life && S.life.length) h += '<aside class="tips"><div class="tips-title">ในชีวิตประจำวัน</div><ul>' + S.life.map(function (l) { return '<li><b>' + l.h + '</b> — ' + l.p + '</li>'; }).join('') + '</ul></aside>';
    if (S.think) h += '<aside class="tips"><div class="tips-title">ชวนคิด</div><ul><li>' + S.think.q + '</li><li><details><summary>ดูคำตอบ</summary>' + S.think.a + '</details></li></ul></aside>';
    return h;
  }

  CH.forEach(function (C) {
    C.sections.forEach(function (S) {
      SEC[S.key] = S;
      P1_TOPIC_ORDER.push({ key: S.key, ch: C.no, chTitle: C.title, label: S.num + ' ' + S.title });
      physicsData.topics[S.key] = {
        id: S.key, title: S.num + ' ' + S.title, theory: theoryHTML(S),
        problems: (S.problems || []).map(function (p) {
          var given = (p.given || []).join(', ');
          return {
            id: p.id, text: p.text, hints: p.hint || '', answer: p.ans ? String(p.ans.val) : undefined, say: p.say, main: p.main, fig: p.fig,
            guide: guideHTML(p),
            intermediateHtml: (given ? '<div class="step" style="color:var(--text-light);font-size:0.95rem;"><b>โจทย์กำหนด:</b> ' + given + '</div>' : '') + answerLine(p),
            advancedHtml: answerLine(p)
          };
        })
      };
    });
  });

  window.definitionsHTML = function (key) {
    var S = SEC[key];
    if (!S || !S.defs || !S.defs.length) return '';
    var h = '<section class="defs"><div class="defs-head"><span class="defs-title">นิยาม</span><span class="defs-sub" lang="en">Definitions</span></div><dl>';
    S.defs.forEach(function (d) {
      h += '<div class="def"><dt><span class="def-th">' + d.t + '</span>' + (d.e ? '<span class="def-en" lang="en">' + esc(d.e) + '</span>' : '') +
           (d.s ? '<span class="def-sym">' + d.s + '</span>' : '') + '</dt><dd class="def-text">' + d.th + '</dd></div>';
    });
    return h + '</dl><p class="defs-src"><b>อ้างอิง</b> เรียบเรียงตามหนังสือเรียนรายวิชาเพิ่มเติมวิทยาศาสตร์และเทคโนโลยี ฟิสิกส์ ม.4 (สสวท.)</p></section>';
  };
  window.mainEquationHTML = function (prob, key) {
    var S = SEC[key];
    var m = (prob && prob.main) || (S && S.main);
    if (!m) return '';
    return '<div class="main-eq"><span class="me-tag">สมการหลัก · ' + m.nm + '</span><div class="me-body">$$' + m.tex + '$$</div></div>';
  };
  window.P1_SECTIONS = SEC;
})();
