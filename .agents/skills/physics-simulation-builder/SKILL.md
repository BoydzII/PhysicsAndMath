---
name: physics-simulation-builder
description: >-
  Standard guide for developing pedagogical HTML5 Canvas simulations for physics education
  (Work, Energy, Momentum, Collisions, Projectile, Circular, SHM). Covers touch/mouse interaction,
  canvas coordinate transformations, physics numerical integration, and SimEngine patterns.
---

# สกิลการพัฒนาแบบจำลองเชิงฟิสิกส์ (Physics Simulation Builder Skill)

เอกสารนี้กำหนดมาตรฐานการสร้างและการดูแลระบบจำลองฟิสิกส์แบบ Interactive บน HTML5 Canvas (`Physics2App/simulations/` และ `app.js`)

---

## 1. ปรัชญาการออกแบบจำลองเชิงการสอน (Pedagogical Philosophy)

1. **เน้นความชัดเจนเชิงมโนทัศน์ มากกว่าความสมจริงเกินความจำเป็น:**
   - วัตถุประสงค์คือให้นักเรียน "ลากหรือปรับค่าแล้วเห็นความสัมพันธ์ทางฟิสิกส์ชัดเจน"
   - ต้องเน้นแสดง: เวกเตอร์แรง ($F, f$), เวกเตอร์ความเร็ว ($v$), เส้นวิถี (trajectory), และกราฟแท่งพลังงาน (Bar Charts)
2. **Dual-Input Responsive:**
   - ใช้งานได้อย่างเป็นธรรมชาติทั้งการสัมผัสบน iPad (Touch) และการคลิกลากด้วยเมาส์ (Mouse/Desktop)
   - ใช้ `getBoundingClientRect()` ในการคำนวณตำแหน่งพิกัดเสมอ

---

## 2. สถาปัตยกรรมระบบจำลอง (Simulation Architecture)

### วงรอบการทำงานมาตรฐาน (Standard Lifecycle)
1. **Initialize Canvas:** กำหนดความกว้างและความสูงตาม clientWidth/clientHeight
2. **Setup Event Listeners:**
   - Mouse: `mousedown`, `mousemove`, `mouseup`
   - Touch: `touchstart`, `touchmove`, `touchend` (ต้องมี `{ passive: false }` และ `e.preventDefault()`)
3. **State Management:** เก็บค่าตัวแปรฟิสิกส์ (มวล $m$, ความเร็ว $v$, ตำแหน่ง $x, y$, มุม $	heta$, เวลา $t$)
4. **Physics Update:** คำนวณการเปลี่ยนแปลงค่าตามเวลา $\Delta t$ (Euler หรือ Semi-implicit Euler)
5. **Render Loop:** ล้าง Canvas (`clearRect`) $ightarrow$ วาดพื้นหลัง/สเกล $ightarrow$ วาดวัตถุ $ightarrow$ วาดเวกเตอร์ $ightarrow$ วาดแผงค่าพลังงาน $ightarrow$ เรียก `requestAnimationFrame`

---

## 3. เอกสารอ้างอิงและเครื่องมือเฉพาะทาง

- [แบบจำลองคณิตศาสตร์ฟิสิกส์ในซิมมูเลชั่น (Physics Models & Formulas)](./references/simulation-physics-models.md)
- [ฟังก์ชันวาดกราฟิกฟิสิกส์ (Canvas Drawing Helpers)](./references/canvas-drawing-helpers.md)
- [ตัวอย่างโค้ดแบบจำลองสมบูรณ์ (Sample Simulation Template)](./examples/sample-simulation.js)
