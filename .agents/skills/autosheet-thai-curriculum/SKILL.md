---
name: autosheet-thai-curriculum
description: >-
  Guidelines and procedures for Thai Basic Education Curriculum (สพฐ.) grade tracking,
  indicator mapping (ตัวชี้วัด ปพ.5 / ปพ.69), and AutoSheet tools across science and math.
---

# Thai Curriculum AutoSheet Skill (ปพ.5 / ปพ.69)

Use this skill when dealing with AutoSheets (`PhysicalScienceAutoSheet`, `PhysicsAutoSheet`, `BiologyAutoSheet`, `ChemistryAutoSheet`, `MathAutoSheet`) or data processing in `tools/`.

## 1. Structure of Thai Educational Records
- **ปพ.5 (สมุดบันทึกผลการเรียนประจำรายวิชา):**
  - คะแนนระหว่างเรียน (คะแนนเก็บแต่ละหน่วย + สอบกลางภาค)
  - คะแนนปลายภาค
  - การประเมินคุณลักษณะอันพึงประสงค์ (8 ข้อ)
  - การประเมินการอ่าน คิดวิเคราะห์ และเขียน
- **ตัวชี้วัด สพฐ. (Indicators):**
  - มาตรฐาน ว 2.2, ว 2.3 (วิทยาศาสตร์กายภาพ / ฟิสิกส์)
  - มาตรฐาน ว 1.1, ว 1.2, ว 1.3 (ชีววิทยา)
  - มาตรฐาน ว 2.1 (เคมี)
  - มาตรฐาน ค 1.1, ค 1.2, ค 2.1 (คณิตศาสตร์)

## 2. Workflow Guidelines
1. Preserve student ID numbers, names, and indicator weights.
2. UTF-8 encoding is mandatory when writing JSON or parsing Excel data.
3. Keep formula calculation logic accurate according to Ministry of Education weighting rules.
