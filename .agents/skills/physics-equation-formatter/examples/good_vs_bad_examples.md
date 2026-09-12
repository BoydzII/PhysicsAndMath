# ตัวอย่างเปรียบเทียบ Good vs. Bad Equation Formatting

## ตัวอย่างที่ 1: การคำนวณงาน (Work Calculation)

### ❌ แบบที่ผิด (Bad - Horizontal Chaining & No Aligned Steps)
```html
<div class="step">1. W = Fs = 500 * 10 = 5000 J</div>
```
*ปัญหา:*
- เครื่องหมายเท่ากับต่อกันเป็นสายยาว
- ใช้ `*` แทน `\times`
- ตัวแปรและหน่วยไม่ถูกฟอร์แมตด้วย KaTeX

### ✅ แบบที่ถูกต้อง (Good - Standard .calc-steps with Grid Alignment)
```html
<div class="step">1. จากสมการงาน: $W = Fs$</div>
<div class="calc-steps">
  <div>2. $W$</div><div>$=$</div><div>$500 \times 10$</div>
  <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="5000">&nbsp;J</div>
</div>
```

---

## ตัวอย่างที่ 2: กฎการอนุรักษ์พลังงานกล (Conservation of Energy)

### ❌ แบบที่ผิด (Bad - Stray Dollars & Squashed Equations)
```html
<div class="step">$$ \begin{aligned} mgh = 1/2 mv^2 \\ v = \sqrt{2gh} = 10$ m/s \end{aligned} $$</div>
```
*ปัญหา:*
- มีเครื่องหมาย `$` อยู่ข้างใน Display Math `$$...$$` ส่งผลให้ KaTeX พังทันที
- ใช้ `1/2` แทน `\frac{1}{2}`
- หน่วยไม่ได้ใช้ `\text{m/s}`

### ✅ แบบที่ถูกต้อง (Good - 5-Line Pedagogical Step Flow)
```html
<div class="step">1. จากกฎการอนุรักษ์พลังงานกล: $mgh = \frac{1}{2}mv^2$ (มวล $m$ ตัดกัน)</div>
<div class="calc-steps">
  <div>2. $v$</div><div>$=$</div><div>$\sqrt{2gh}$</div>
  <div></div><div>$=$</div><div>$\sqrt{2 \times 10 \times 5}$</div>
  <div></div><div>$=$</div><div>$\sqrt{100}$</div>
  <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="10">&nbsp;m/s</div>
</div>
```

---

## ตัวอย่างที่ 3: โมเมนตัมและการชน (Momentum with Units)

### ❌ แบบที่ผิด (Bad Unit Formatting)
```html
<div class="step">p = 10 	ext{ kg*m/s}</div>
<!-- หรือ -->
<div class="step">p = 10 	ext{kg\cdot m/s}</div>
```
*ปัญหา:*
- `*` ไม่ใช่เครื่องหมายคูณของหน่วย
- เอา `\cdot` เข้าไปไว้ใน `\text{}` ทำให้ KaTeX เรนเดอร์ล้มเหลว

### ✅ แบบที่ถูกต้อง (Good Unit Formatting)
```html
<div class="step">$$p = 10\text{ kg}\cdot\text{m/s}$$</div>
```
