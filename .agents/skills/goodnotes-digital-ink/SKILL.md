---
name: goodnotes-digital-ink
description: >-
  Standard guide for implementing and maintaining GoodNotes-style digital ink, lined notebook paper,
  Retina High-DPI rendering, 120 FPS Bézier streaming, Apple Pencil pressure handling, palm rejection,
  and sheet-only pinch-to-zoom in Physics2App.
---

# สกิลการเขียนสมุดดิจิทัลแบบ GoodNotes (GoodNotes Digital Ink Skill)

เอกสารนี้กำหนดแนวทางปฏิบัติและสถาปัตยกรรมของสมุดทดดิจิทัลระดับมืออาชีพ (Professional Digital Ink & Notebook Paper) บน HTML5 Canvas ในโปรเจกต์ `Physics2App` (`draw.js`, `style.css`, `app.js`)

---

## 1. ปัญหาคลาสสิกของ Digital Ink และโซลูชันระดับมืออาชีพ

### ก) ปัญหาลายเส้นจาง ผิดปกติ (Faint/Pale Lines)
- **สาเหตุ:** หน้าจอความละเอียดสูง (Retina / iPad Pro / 4K) มี `devicePixelRatio` = 2 หรือ 3 หากสร้าง Canvas ขนาด CSS (เช่น 800x1122) โดยไม่คูณ DPR เส้น 1px จะถูกเกลี่ย (interpolate) ข้าม 2x2 พิกเซลจริง ทำให้เส้นดูจาง เบลอ และสีซีดผิดปกติ
- **โซลูชัน (High-DPI Backing Store):**
  ```javascript
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  this.canvas.width = Math.round(w * dpr);
  this.canvas.height = Math.round(h * dpr);
  this.canvas.style.width = w + 'px';
  this.canvas.style.height = h + 'px';
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  this.ctx.scale(dpr, dpr);
  ```
- **สูตรความเข้มของหมึก (Pigmented Ink Formula):**
  - หลีกเลี่ยงการลด `lineWidth` ต่ำกว่า 1px เมื่อมีแรงกดน้อย
  - ใช้สูตร: `lineWidth = baseLineWidth * (0.8 + pressure * 0.7)` ให้เส้นหมึกมีความอิ่มตัว ดำสนิท และคมชัดตลอดเส้น

### ข) ปัญหาเขียนไม่ค่อยติด / สะดุดบางจังหวะ (Dropped Strokes & Lag)
- **สาเหตุ:**
  1. การเรียก `putImageData` หรือวาดซ้ำ Path ยาวๆ ซิงโครนัสในทุก `pointermove` (ใช้เวลา 20–50ms ต่อเฟรม) ทำให้ Browser ดรอป Event ของ Apple Pencil หรือเมาส์ความเร็วสูงไปกว่า 80%
  2. การไม่วาดจุดเริ่มต้นเมื่อแตะหน้าจอ (Single-tap dot) ทำให้การเขียนจุดทศนิยม, จุดบนตัวอักษร $i, j$ หรือการเคาะจุดไม่ปรากฏบนหน้าจอ
- **โซลูชัน (Incremental Midpoint Bézier Streaming & Instant Tap Dots):**
  1. เมื่อเกิด `pointerdown` วาดวงกลมเล็กทันที:
     ```javascript
     this.ctx.beginPath();
     this.ctx.arc(pos.x, pos.y, Math.max(1, this.ctx.lineWidth / 2), 0, Math.PI * 2);
     this.ctx.fill();
     ```
  2. เมื่อเกิด `pointermove` ใช้อัลกอริทึม Midpoint Quadratic Bézier วาดเฉพาะส่วนที่เพิ่มเข้ามาใหม่ทันที (ใช้เวลาเพียง 0.01ms รันลื่นไหล 120 FPS):
     ```javascript
     const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
     this.ctx.beginPath();
     this.ctx.moveTo(this.prevMid.x, this.prevMid.y);
     this.ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
     this.ctx.stroke();
     this.prevMid = mid;
     ```
  3. ระบบ Undo/Redo ใช้ Offscreen Canvas Snapshot แทน ImageData ก้อนใหญ่ ช่วยให้การสลับประวัติลื่นไหลระดับ GPU-accelerated

### ค) การขยายเฉพาะหน้ากระดาษทำโจทย์ (Sheet-Only Zoom Architecture)
- **โจทย์ของผู้ใช้:** ต้องการให้การซูม ขยายเฉพาะแผ่นกระดาษทำโจทย์ (`.notebook-wrapper`: เนื้อหาโจทย์, สูตร KaTeX, ช่องกรอก, และลายมือขยายไปด้วยกัน) โดยที่ Topbar, แถบทฤษฎีซ้ายมือ และ Floating Toolbar อยู่คงที่
- **สถาปัตยกรรม:**
  1. ใช้ CSS Transform Scale บน `.notebook-wrapper` พร้อมปรับ Margin ป้องกันการถูกตัดขอบซ้าย (`leftClipped = false`):
     ```javascript
     function setPaperZoom(zoomLevel) {
       currentPaperZoom = Math.min(Math.max(Number(zoomLevel.toFixed(2)), 0.7), 2.5);
       const baseW = wrapper.offsetWidth;
       const scaledW = baseW * currentPaperZoom;
       const shiftX = Math.max(0, (scaledW - baseW) / 2);
       const shiftY = Math.max(0, (wrapper.offsetHeight * currentPaperZoom - wrapper.offsetHeight) / 2);

       wrapper.style.transformOrigin = 'top center';
       wrapper.style.transform = `scale(${currentPaperZoom})`;
       wrapper.style.marginLeft = shiftX > 0 ? `${shiftX}px` : 'auto';
       wrapper.style.marginRight = shiftX > 0 ? `${shiftX}px` : 'auto';
       wrapper.style.marginBottom = shiftY > 0 ? `${shiftY * 2}px` : '0px';
     }
     ```
  2. การแปลงพิกัด Pointer ไม่แปรผันตามระดับการซูม (Zoom-Invariant Coordinate Mapping):
     ```javascript
     getPointerPos(e) {
       const rect = this.canvas.getBoundingClientRect();
       const scaleX = (this.canvas.clientWidth || rect.width) / (rect.width || 1);
       const scaleY = (this.canvas.clientHeight || rect.height) / (rect.height || 1);
       return {
         x: (e.clientX - rect.left) * scaleX,
         y: (e.clientY - rect.top) * scaleY,
         pressure: e.pressure || 0.5
       };
     }
     ```
  3. Multi-Touch Isolation: เมื่อมี 2 นิ้วแตะหน้าจอ ระบบจะยกเลิกการวาดทันที และส่งสัญญาณให้ `.notebook-panel` ทำหน้าที่ Pinch-to-Zoom ได้อย่างราบรื่น

---

## 2. เช็คลิสต์ตรวจสอบคุณภาพการเขียน (Definition of Done)
- [ ] เส้นลายมือมีความคมชัดระดับ Retina (ไม่แตก ไม่เบลอ ไม่ซีดจาง)
- [ ] การเขียนเร็ว ตวัดมือ หรือแตะจุดทศนิยม ติดครบทุกจุด 100%
- [ ] เมื่อกดปุ่ม Zoom In/Out หรือใช้ 2 นิ้วถ่างซูม ลายมือและตัวหนังสือขยายพร้อมกัน และตำแหน่งปลายปากกายังคงตรงกับพิกัดจริงบนหน้าจอ 100%
- [ ] ระบบ Undo/Redo รองรับ 25 ขั้นตอน และไม่ทำให้เมมโมรี่รั่ว
- [ ] การล้างกระดาษและการสลับบทเรียน ทำงานถูกต้องไม่ขึ้นข้อผิดพลาด
