---
name: student-assignment-submission
description: >-
  Standard workflow and protocol for student assignment submission to teachers in Physics2App.
  Covers PDF export with digital ink, automated grading, Google Apps Script / Google Sheets
  integration, offline backup, and student verification.
---

# สกิลการส่งงานของนักเรียนให้ครู (Student Assignment Submission Skill)

เอกสารนี้กำหนดมาตรฐานการส่งงาน บันทึกคะแนน และออกรายงานผลการทำแบบฝึกหัดของนักเรียนไปยังครูผู้สอน

---

## 1. ช่องทางการส่งงาน 2 รูปแบบ (Dual Submission Modalities)

### รูปแบบที่ 1: การส่งเป็นเอกสารสมบูรณ์พร้อมลายมือ (Visual PDF / Digital Sheet)
- **วัตถุประสงค์:** ครูสามารถตรวจดูวิธีทำ ลายมือ Apple Pencil ที่นักเรียนทดจริงในกระดาษ
- **วิธีการปฏิบัติ:**
  1. รวมเลเยอร์ HTML (ข้อความโจทย์ + ช่องกรอกคำตอบ) เข้ากับ Canvas (ลายมือทด)
  2. จัดแต่งหน้าผ่าน CSS `@media print` ให้พอดีกับหน้ากระดาษ A4
  3. สั่งพิมพ์ด้วย `window.print()` หรือแปลงเป็น PDF อัตโนมัติ เพื่อให้นักเรียนนำไปส่งใน Google Classroom หรือ LINE

### รูปแบบที่ 2: การตรวจและส่งคะแนนเข้า Google Sheets อัตโนมัติ (Auto-Grading & Cloud Sync)
- **วัตถุประสงค์:** บันทึกคะแนนเก็บเข้าสมุดคะแนน ปพ.5 / ปพ.69 ของครูแบบ Real-time
- **กระบวนการทำงาน:**
  1. ดึงค่าจาก `<input class="answer-input">` ทุกช่อง
  2. ตรวจเทียบกับคำตอบที่ถูกต้องใน `data*.js` (มีค่า tolerance สำหรับทศนิยม)
  3. รวมคะแนนและส่ง Payload ไปยัง Google Apps Script Webhook

---

## 2. โครงสร้าง Payload ส่งคะแนนเข้า Google Apps Script

```json
{
  "studentId": "12345",
  "studentName": "สมชาย ใจดี",
  "room": "ม.5/1",
  "topic": "work",
  "topicTitle": "5.1 งาน",
  "level": "beginner",
  "score": 10,
  "total": 10,
  "answers": [
    {"problemId": "w1", "userAnswer": "64", "isCorrect": true},
    {"problemId": "w2", "userAnswer": "300", "isCorrect": true}
  ],
  "submittedAt": "2026-09-12T20:00:00.000Z"
}
```

---

## 3. เอกสารอ้างอิง

- [การจัดหน้าสำหรับพิมพ์และส่งออก PDF (PDF Print Export Workflow)](./references/pdf-print-export-workflow.md)
- [การเชื่อมต่อ Google Sheets & Google Apps Script (Cloud Gradebook)](./references/google-sheets-grading-integration.md)
