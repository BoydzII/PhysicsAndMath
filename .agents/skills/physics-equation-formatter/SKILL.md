---
name: physics-equation-formatter
description: >-
  Comprehensive standard and operational runbook for creating, formatting, and validating
  Physics and Mathematics equations following international typographical standards (ISO 80000-2,
  KaTeX, LaTeX) and pedagogical multi-line alignment (.calc-steps). Use whenever writing, editing,
  or refactoring physics and math equations, formulas, problem guides, or calculation steps.
---

# มาตรฐานการสร้างสมการทางฟิสิกส์และคณิตศาสตร์ (STEM Equation Standard)

เอกสารนี้กำหนดมาตรฐานสากลและแนวทางปฏิบัติระดับมืออาชีพในการเขียนสมการฟิสิกส์และคณิตศาสตร์ ทั้งในรูปแบบ **KaTeX / LaTeX** และระบบแสดงวิธีทำแบบ Interactive **(.calc-steps)** สำหรับโปรเจกต์ `Physics2App`, `MathAutoSheet`, และ AutoSheets อื่นๆ

---

## 1. กฎเหล็ก 5 ข้อของการจัดรูปสมการ (The 5 Golden Rules)

1. **ห้ามเขียนเครื่องหมายเท่ากับต่อกันในแนวนอนเด็ดขาด (Strict No Horizontal Chaining):**
   - ❌ **ห้าม:** `$W = Fs = 500 \times 10 = 5000\text{ J}$`
   - ✅ **ถูกต้อง:** ต้องขึ้นบรรทัดใหม่ทุกครั้งที่มีเครื่องหมาย $=$ หรือ $\approx$
2. **เครื่องหมายเท่ากับ ($=$) ต้องตรงกันในแนวดิ่งเสมอ (Strict Vertical Alignment):**
   - จัดตำแหน่งเครื่องหมายความสัมพันธ์ ($=, \approx, \le, \ge, \rightarrow$) ให้อยู่ในคอลัมน์กึ่งกลางตรงกันทุกบรรทัด
3. **โครงสร้างการแสดงวิธีทำ 4–5 บรรทัดตามหลักการสอน (Pedagogical 5-Line Flow):**
   - **บรรทัดที่ 1 (Principle / Law):** แสดงสูตรแม่บทหรือทฤษฎีบทหลัก (เช่น $W = Fs \cos \theta$ หรือ $\Sigma E_1 = \Sigma E_2$)
   - **บรรทัดที่ 2 (Substitution):** แทนค่าตัวแปรที่โจทย์กำหนดลงในสูตรอย่างชัดเจน
   - **บรรทัดที่ 3 (Reduction / Algebra):** ขั้นตอนการจัดรูปทางพีชคณิต หรือคิดเลขขั้นกลาง
   - **บรรทัดที่ 4 (Final Evaluation):** คิดคำนวณขั้นสุดท้าย
   - **บรรทัดที่ 5 (Final Answer):** คำตอบสุดท้าย พร้อมช่องกรอก `<input>` และหน่วยฟิสิกส์ที่ถูกต้อง
4. **การแยกตัวแปรและหน่วยตามมาตรฐานสากล (ISO 80000-2 Typography):**
   - **ตัวแปร (Variables):** ตัวเอียง (Italic) เช่น $m, v, t, F, a, x, y, \theta$
   - **หน่วย (Units):** ตัวตรงเสมอ (Upright Roman) โดยใช้ `\text{...}` และเว้นวรรคจากตัวเลข เช่น `10\text{ m/s}`, `500\text{ J}`
   - **ฟังก์ชันคณิตศาสตร์ (Operators):** ตัวตรงเสมอ เช่น `\sin`, `\cos`, `\tan`, `\ln`, `\log`, `\lim`, `\Delta`
5. **การป้องกันข้อผิดพลาดทางเทคนิค (Zero-Tolerance Technical Errors):**
   - **ห้ามใส่ `<input>` เข้าไปใน `$ ... $` หรือ `$$ ... $$`:** KaTeX จะตัด tag หรือเกิด parsing error
   - **ห้ามมี Stray `$` ใน Display Math:** ในบล็อก `$$\begin{aligned} ... \end{aligned}$$` ต้องไม่มี `$` อยู่ข้างใน
   - **Double-Escape ใน JS Template String:** ใช้ `\\frac`, `\\times`, `\\sqrt`, `\\cos`, `\\theta`, `\\Delta`

---

## 2. รูปแบบโครงสร้างโค้ดตามสภาพแวดล้อม

### A. รูปแบบสำหรับ Interactive Web App มีช่องกรอกคำตอบ (`.calc-steps`)
ใช้ CSS Grid 3 คอลัมน์ (`auto auto 1fr`):
```html
<div class="step">1. จากกฎการอนุรักษ์พลังงานกล: $mgh = \frac{1}{2}mv^2$ (มวลตัดกัน)</div>
<div class="calc-steps">
  <div>2. $v$</div><div>$=$</div><div>$\sqrt{2gh}$</div>
  <div></div><div>$=$</div><div>$\sqrt{2 \times 10 \times 5}$</div>
  <div></div><div>$=$</div><div>$\sqrt{100}$</div>
  <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="10">&nbsp;m/s</div>
</div>
```

### B. รูปแบบสำหรับ Display Math ล้วน (Pure KaTeX)
ใช้บล็อก `aligned` พร้อมตัวจัดตำแหน่ง `&=`:
```latex
$$\begin{aligned}
  v &= \sqrt{2gh} \\
  &= \sqrt{2 \times 10 \times 5} \\
  &= \sqrt{100} \\
  &= 10\text{ m/s}
\end{aligned}$$
```

---

## 3. เอกสารอ้างอิงและคู่มือเฉพาะทางในสกิลนี้

- [มาตรฐานตัวอักษรและสัญลักษณ์ทางคณิตศาสตร์และฟิสิกส์ (Typographical Reference)](./references/math-typographical-rules.md)
- [คลังสูตรและหน่วยทางฟิสิกส์ที่พบบ่อย (Physics Formulas & Units Cheat Sheet)](./references/physics-formulas-cheat-sheet.md)
- [ตัวอย่างเปรียบเทียบ Good vs. Bad Examples](./examples/good_vs_bad_examples.md)
- [สคริปต์ตรวจสอบสมการอัตโนมัติ (Python Validator Script)](./scripts/validate_equations.py)
