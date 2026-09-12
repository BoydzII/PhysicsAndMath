---
name: goodnotes-digital-ink
description: >-
  Standard guide for implementing and maintaining GoodNotes-style digital ink, lined notebook paper,
  Apple Pencil pressure handling, palm rejection, pinch-to-zoom, and smooth drawing canvas in Physics2App.
---

# สกิลการเขียนสมุดดิจิทัลแบบ GoodNotes (GoodNotes Digital Ink Skill)

เอกสารนี้กำหนดแนวทางปฏิบัติและสถาปัตยกรรมของสมุดทดดิจิทัล (Digital Lined Notebook Paper) บน HTML5 Canvas ในโปรเจกต์ `Physics2App` (`draw.js`, `style.css`, `app.js`)

---

## 1. หัวใจสำคัญของระบบ GoodNotes-Style Notebook

1. **สมุดทดมีเส้นบรรทัด (Lined Paper Grid):**
   - เส้นบรรทัดต้องมีระยะห่างบรรทัด (`line-height`) สอดคล้องกับฟอนต์และช่องไฟของโจทย์ (เช่น 32px)
   - ใช้ CSS background repeating linear gradient ที่สวยงาม คมชัด ไม่เบลอ
2. **การปฏิเสธฝ่ามือ (Palm Rejection):**
   - แยกแยะระหว่างปลายปากกา Stylus / Apple Pencil กับนิ้วมือ
   - `if (e.pointerType === 'touch') return;` เมื่อวาด เพื่อให้นักเรียนวางข้อมือเขียนบน iPad ได้โดยไม่เกิดเส้นเลอะ
3. **หัวปากกาเน้นข้อความแบบคูณสี (Multiply Highlighter):**
   - ใช้ `globalCompositeOperation = 'multiply'` เพื่อให้สีไฮไลต์กลมกลืนกับข้อความด้านล่างเสมือนปากกาเน้นข้อความจริง
4. **การวาดเส้นต่อเนื่องไร้รอยต่อ (Continuous Stroke Path):**
   - วาด stroke ทั้งหมดเป็น path เดียว (`beginPath() -> moveTo -> lineTo -> stroke()`) เพื่อป้องกันรอยวงกลมซ้อนทับเมื่อใช้ความโปร่งใส (`globalAlpha`)
5. **ระบบซูมขยายหน้ากระดาษ (Pinch-to-Zoom on Paper):**
   - รองรับ `gesturestart`, `gesturechange`, `gestureend` บน Safari iPad
   - ปรับพิกัด pointer ตามระดับซูม: `(clientX - rect.left) / currentZoom`

---

## 2. เครื่องมือและสถาปัตยกรรม `DrawingEngine`

- **ไฟล์หลัก:** [Physics2App/draw.js](file:///d:/ปพ69/คะแนนเก็บ/Physics2App/draw.js)
- **เครื่องมือหลัก:**
  - ปากกา (Pen): ปรับความหนาตามแรงกด (`e.pressure`)
  - ยางลบ (Eraser): ใช้ `destination-out` ลบเฉพาะลายมือ
  - ไฮไลต์ (Highlighter): ใช้ `multiply` สีสดใสโปร่งแสง
- **การบันทึกข้อมูล (Persistence):**
  - จัดเก็บลายมือแยกตามบทเรียน (`physics2_drawings_work`, `physics2_drawings_power`, ฯลฯ) ผ่าน `localStorage`
  - คืนค่าอัตโนมัติเมื่อสลับบทเรียน

---

## 3. เอกสารอ้างอิง

- [การจัดการแรงกดปากกาและการตัดสัญญาณฝ่ามือ (Stylus & Palm Rejection)](./references/stylus-pressure-palm-rejection.md)
- [กระดาษมีเส้นและการซูมขยาย (Lined Paper & Zoom Architecture)](./references/lined-paper-and-pinch-zoom.md)
