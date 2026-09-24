/* ============================================================================
   8) ชุดทดสอบตัวเอง — เปิดด้วย <ไฟล์ครู>.html?selftest=1
   วนสร้างทุกแม่แบบหลาย seed แล้วตรวจว่าโจทย์และเฉลยไม่มีอะไรพัง
   ========================================================================== */
function runSelfTest(seeds) {
  const N = seeds || 200, fails = [];
  // ใช้ขอบเขตคำ ไม่งั้นสูตรเคมีอย่าง NaNO3 หรือ NaCl จะถูกฟ้องว่าเป็น NaN
  const bad = s => typeof s === 'string' && /\bundefined\b|\bNaN\b|\bInfinity\b|\{[a-zA-Z_]\w*\}/.test(s);
  TPL.forEach(tpl => {
    for (let s = 1; s <= N; s++) {
      const p = buildProblem(tpl.id, s * 104729, { g: DB.settings.g, easyG10: DB.settings.easyG10, piMode: DB.settings.piMode });
      if (!p) { fails.push(tpl.id + ' seed=' + s + ': สร้างโจทย์ไม่ได้'); continue; }
      p.finds.forEach((f, k) => {
        const kd = f.kind || 'num';
        if (typeof f.value !== 'number' || !isFinite(f.value)) fails.push(tpl.id + ' seed=' + s + ': คำตอบ[' + k + '] ไม่ใช่ตัวเลข');
        else if (kd === 'frac' && (!f.den || f.den > 24 || reduceFrac(f.num, f.den)[1] !== f.den))
          fails.push(tpl.id + ' seed=' + s + ': คำตอบ[' + k + '] เป็นเศษส่วนที่ยังไม่อย่างต่ำ หรือตัวส่วนเกิน 24 (' + f.num + '/' + f.den + ')');
        else if (kd === 'int' && Math.abs(f.value - Math.round(f.value)) > 1e-9)
          fails.push(tpl.id + ' seed=' + s + ': คำตอบ[' + k + '] ควรเป็นจำนวนเต็ม (' + f.value + ')');
        else if (kd === 'sci' && (!(Math.abs(f.man) >= 1 && Math.abs(f.man) < 10) || dpOf(f.man, 4) > 2 || f.exp !== Math.round(f.exp)))
          fails.push(tpl.id + ' seed=' + s + ': คำตอบ[' + k + '] สัญกรณ์วิทยาศาสตร์ไม่อยู่ในรูป a × 10^n (' + f.man + ', ' + f.exp + ')');
        else if (kd === 'num' && dpOf(f.value, 4) > 2) fails.push(tpl.id + ' seed=' + s + ': คำตอบ[' + k + '] ทศนิยมเกิน 2 (' + f.value + ')');
        else if (f.positive && f.value <= 0) fails.push(tpl.id + ' seed=' + s + ': คำตอบ[' + k + '] ควรเป็นบวก (' + f.value + ')');
      });
      p.given.forEach((g, k) => {
        if (typeof g.v === 'number' && (!isFinite(g.v) || dpOf(g.v, 4) > 2))
          fails.push(tpl.id + ' seed=' + s + ': ค่าที่กำหนดให้[' + k + '] ไม่สวย (' + g.v + ')');
      });
      if (bad(p.stem)) fails.push(tpl.id + ' seed=' + s + ': ข้อความโจทย์ผิดปกติ');
      const b = stepBodies(p);
      if (b.length !== (p.theory ? 3 : 7)) fails.push(tpl.id + ' seed=' + s + ': จำนวนขั้นอธิบายไม่ถูกต้อง');
      b.forEach((x, k) => {
        if (!x || !String(x).trim()) fails.push(tpl.id + ' seed=' + s + ': ขั้นที่ ' + (k + 1) + ' ว่าง');
        if (bad(x)) fails.push(tpl.id + ' seed=' + s + ': ขั้นที่ ' + (k + 1) + ' มีข้อความผิดปกติ');
      });
      if (tpl.level === 'ง่าย' || p.theory) {
        if (!p.choices || p.choices.length !== 4) fails.push(tpl.id + ' seed=' + s + ': ตัวเลือกไม่ครบ 4');
        else {
          if (p.choices.filter(c => c.correct).length !== 1) fails.push(tpl.id + ' seed=' + s + ': ตัวเลือกที่ถูกไม่ใช่ 1 ตัว');
          // ตัวเลือกที่เป็นเศษส่วนมี text มาด้วย ต้องเทียบด้วยข้อความ
          // ถ้าเทียบด้วยทศนิยม 2 ตำแหน่ง เศษส่วนคนละตัวอย่าง 2/13 กับ 3/20 จะถูกนับว่าซ้ำกัน
          const v = p.theory ? p.choices.map(c => c.text)
                            : p.choices.map(c => (c.text != null ? c.text : c.value.toFixed(2)));
          if (new Set(v).size !== 4) fails.push(tpl.id + ' seed=' + s + ': ตัวเลือกซ้ำกัน');
        }
        if (p.theory && (!p.idea || !p.why)) fails.push(tpl.id + ' seed=' + s + ': ขาดคำอธิบายแนวคิดหรือข้อสรุป');
      }
    }
  });
  // ตรวจว่าทุกบทมีแม่แบบครบทุกระดับ — สำคัญมากตอนเพิ่มบทใหม่ จะได้รู้ว่ายังขาดตรงไหน
  TOPICS.forEach(t => LEVELS.forEach(l => {
    const n = TPL.filter(x => x.topic === t.id && x.level === l).length;
    if (!n) fails.push('เรื่อง "' + t.name + '" ยังไม่มีแม่แบบระดับ' + l + ' เลย');
    else if (n < 3) fails.push('เรื่อง "' + t.name + '" ระดับ' + l + ' มีแค่ ' + n +
      ' แม่แบบ (ควรมีอย่างน้อย 3 เพื่อไม่ให้โจทย์ซ้ำเร็วเกินไป)');
  }));
  const orphan = TPL.filter(x => ALL_TOPIC_IDS.indexOf(x.topic) < 0);
  orphan.forEach(x => fails.push('แม่แบบ ' + x.id + ' อ้างเรื่อง id=' + x.topic + ' ที่ไม่มีในสารบัญ TOPICS'));

  const uniq = Array.from(new Set(fails));
  const counts = {};
  TOPICS.forEach(t => LEVELS.forEach(l => {
    counts[t.id + '|' + l] = TPL.filter(x => x.topic === t.id && x.level === l).length;
  }));
  document.body.classList.remove('docpreview');
  $('#printarea').innerHTML = '';
  $('#pane-make').innerHTML =
    '<div class="card"><h3>ผลการทดสอบคลังโจทย์</h3>' +
    '<div class="statgrid"><div class="stat"><div class="v">' + TPL.length + '</div><div class="k">แม่แบบทั้งหมด</div></div>' +
    '<div class="stat"><div class="v">' + (TPL.length * N).toLocaleString() + '</div><div class="k">โจทย์ที่สร้างทดสอบ</div></div>' +
    '<div class="stat"><div class="v" style="color:' + (uniq.length ? 'var(--bad)' : 'var(--ok)') + '">' +
      uniq.length + '</div><div class="k">ข้อผิดพลาด</div></div></div>' +
    '<div class="tablewrap" style="margin-top:12px"><table><thead><tr><th>เรื่อง</th>' +
    LEVELS.map(l => '<th class="num">' + l + '</th>').join('') + '<th class="num">รวม</th></tr></thead><tbody>' +
    TOPICS.map(t => '<tr><td>' + esc(t.name) + '</td>' +
      LEVELS.map(l => '<td class="num">' + counts[t.id + '|' + l] + '</td>').join('') +
      '<td class="num"><b>' + LEVELS.reduce((s, l) => s + counts[t.id + '|' + l], 0) + '</b></td></tr>').join('') +
    '</tbody></table></div>' +
    (uniq.length
      ? '<div class="notice bad" style="margin-top:12px"><b>พบข้อผิดพลาด</b><br>' +
        uniq.slice(0, 50).map(esc).join('<br>') + (uniq.length > 50 ? '<br>… อีก ' + (uniq.length - 50) + ' รายการ' : '') + '</div>'
      : '<div class="notice info" style="margin-top:12px">ผ่านทั้งหมด — ทุกแม่แบบสร้างโจทย์ได้ ' +
        'คำตอบอยู่ในรูปที่กำหนดไว้ (จำนวนเต็ม ทศนิยมไม่เกิน 2 ตำแหน่ง เศษส่วนอย่างต่ำ หรือ a × 10ⁿ) ' +
        'วิธีทำครบ 7 ขั้น และตัวเลือกปรนัยถูกต้อง</div>') +
    '<div class="row" style="margin-top:12px"><button class="primary" id="stBack">กลับสู่หน้าปกติ</button></div></div>';
  $('#stBack').addEventListener('click', () => { location.href = location.pathname; });
  return uniq;
}

