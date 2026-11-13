---
name: edtech-database-sync
description: >-
  Database design, localStorage schema versioning, Google Apps Script / Sheets cloud sync,
  and backup/restore patterns for student progress and teacher analytics in คลังโจทย์ออนไลน์.
---

# EdTech Database & Cloud Sync Skill (ฐานข้อมูลและระบบซิงค์)

Use this skill when designing data models, storing learner statistics, syncing scores to Google Sheets / Apps Script, or building backup/restore features.

## 1. Local Storage Schema Standards
- **Unique `LS_KEY`:** ใช้ชื่อเฉพาะของแต่ละแอป เช่น `englishquiz.v1`, `physicsquiz.v1` (ห้ามซ้ำข้ามวิชาเด็ดขาด)
- **Defensive Loading:** ใช้ `try/catch` + `Object.assign(defaultDB(), parsed)` เสมอ เพื่อป้องกันหน้าขาวเมื่อข้อมูลเก่าขาดฟิลด์ใหม่
- **Core Learner Schema:**
  - `xp`, `streak`, `bestStreak`, `totalTimeSec`
  - `byQuestion`: `{ [questionId]: { attempts, correct, lastWrong, lastAt, userAnswer } }`
  - `mistakes`: `string[]` (รายการรหัสข้อที่ยังต้องทบทวน)
  - `sessions`: ประวัติการสอบ/ฝึกฝนล่าสุด (จำกัดขนาดหรือหมุนเวียนเพื่อไม่ให้เกินโควตา `localStorage` 5MB)

## 2. Cloud Sync Rules (Google Apps Script / Sheets)
- **CORS-Safe POST:** การยิง `fetch` ไปยัง Apps Script Web App (`/exec`) ต้องใช้ `headers: { 'Content-Type': 'text/plain;charset=utf-8' }` เสมอ ห้ามใช้ `application/json` เพราะจะติด CORS preflight
- **Subject Isolation:** หากใช้ชีตศูนย์กลาง (`PSCI_APPS_URL`) ต้องส่งฟิลด์ `subject: '<key>'` กำกับทุกครั้งเพื่อไม่ให้คะแนนปนกับวิชาอื่น
- **Offline Queue & Retry:** หากส่งคะแนนขณะเน็ตหลุด ให้เก็บคิวไว้ใน `localStorage` แล้วซิงค์อัตโนมัติเมื่อออนไลน์

## 3. Data Safety & Portability
- มีปุ่ม **Export JSON** และ **Import JSON** สำหรับสำรอง/ย้ายเครื่องเสมอ
- ห้าม commit ไฟล์ข้อมูลนักเรียนจริง (`สำรอง*.json`, `*.csv`, `*.xlsx`) ขึ้น GitHub
