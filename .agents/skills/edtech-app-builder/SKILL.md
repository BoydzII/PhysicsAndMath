---
name: edtech-app-builder
description: >-
  Architecture, registration, UI/UX standards, and pre-flight verification for building new
  apps inside the คลังโจทย์ออนไลน์ ecosystem (Portal, apps.js, .gitignore allowlist, tools/check.mjs).
---

# EdTech App Builder Skill (การสร้างแอปใหม่ในคลังโจทย์ออนไลน์)

Use this skill whenever creating a new subject app, interactive tool, or standalone module in `แอปคลังโจทย์ออนไลน์`.

## 1. Integration Checklist (ห้ามตกหล่นแม้แต่ข้อเดียว)
1. **สร้างโฟลเดอร์แอปใหม่** (เช่น `EnglishApp/`, `ThaiApp/`) พร้อม `index.html` และไฟล์ข้อมูลแยก (เช่น `questions.js` หรือ `data.js`)
2. **โหลดแถบสลับแอป:** ใส่ `<script src="../apps.js" defer></script>` ก่อน `</body>` เสมอ
3. **อ่านสิทธิ์ผู้ใช้งานจากพอร์ทัล:** อ่าน `localStorage.getItem('pcportal.v1')` เพื่อแยกบทบาท `admin` (ครู: เปิดเฉลย/พิมพ์ใบงาน/จัดการ) กับนักเรียน/บุคคลทั่วไป
4. **ลงทะเบียน 4 จุดสำคัญ:**
   - `index.html`: เพิ่มการ์ดใน `SUBJECTS` และไอคอน SVG ใน `ICONS`
   - `apps.js`: เพิ่มรายการใน `APPS` และไอคอนใน `ICONS` ให้ตรงกับ `index.html`
   - `tools/check.mjs`: เพิ่มไฟล์ใน `FILES` และ `IDENT` (`title` + `LS_KEY`)
   - `.gitignore`: **สำคัญมาก!** Repo นี้ใช้ `*` ปิดทุกไฟล์ ต้องเพิ่ม `!FolderName/` และไฟล์ย่อยใน `.gitignore` เสมอ ไม่งั้นไฟล์จะไม่ขึ้น GitHub
5. **ตรวจสอบก่อน Commit:** รัน `node -c <js-files>` และ `node tools/check.mjs` ต้องขึ้น `ผ่านทั้งหมด พร้อมขึ้นเว็บ`

## 2. UI/UX & Accessibility Standards
- **ฟอนต์:** `Anuphan` สำหรับหน้าจอ, `Sarabun` สำหรับ `@media print`
- **ธีม:** รองรับทั้ง Light Mode และ Dark Mode (`[data-theme="dark"]` + `prefers-color-scheme: dark`)
- **อุปกรณ์:** รองรับ iPad / มือถือ / Desktop (touch target ≥ 42px, ปุ่มชัดเจน, พิมพ์เป็น PDF สวยงาม)
- **Offline-first:** แอปต้องทำงานได้แม้ไม่มีอินเทอร์เน็ต (เก็บสถานะใน `localStorage` และไม่พึ่งพา CDN ที่จำเป็นต่อการทำงานหลัก)
