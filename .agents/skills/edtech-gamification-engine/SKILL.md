---
name: edtech-gamification-engine
description: >-
  Gamification mechanics, adaptive difficulty progression, spaced repetition (Mistake Clinic),
  XP/Streak/Combo/Badge systems, and engaging quiz modes for educational apps.
---

# EdTech Gamification & Learning Game Skill (ระบบเกมเพื่อการเรียนรู้)

Use this skill when adding game mechanics, progression systems, or engagement features to educational apps.

## 1. Core Progression Loop (วงจรพัฒนาแบบก้าวกระโดด)
1. **Multi-Tier Mastery Ladder (เช่น 5 ระดับ A1 → C2):**
   - แสดงความคืบหน้าและเกณฑ์ปลดล็อกชัดเจน (เช่น แม่นยำ ≥ 80% อย่างน้อย 5 ข้อในระดับปัจจุบัน → แนะนำข้ามไประดับถัดไป)
2. **XP & Rank System:**
   - ให้ XP ตามความยากของโจทย์ (เช่น `level * 10 XP`) และโบนัส Streak/Combo
   - แปลง XP เป็นยศ/ระดับผู้เรียน (เช่น Rookie → Challenger → Scholar → Master → Grandmaster)
3. **Combo & Streak Mechanics:**
   - ตอบถูกต่อเนื่องเพิ่มตัวคูณ Combo (x1.5, x2) และบันทึก `bestStreak`
   - ตอบผิดไม่ลงโทษรุนแรง แต่ส่งข้อนั้นเข้า **Mistake Clinic (คลังทบทวนจุดอ่อน)** ทันที

## 2. Game Modes to Build
- **Leapfrog Challenge (ไต่ระดับอัตโนมัติ):** สุ่มโจทย์ที่ระดับความยากขยับขึ้นตามความแม่นยำของผู้เล่น
- **Time Attack / Speed Blitz:** จับเวลา 60–120 วินาที ตอบให้ได้มากที่สุดเพื่อทำลายสถิติ
- **Boss Battle (ด่านบอสประจำบท):** รวมโจทย์ระดับยาก (Lv.4–5) 5–10 ข้อ ต้องผ่านเกณฑ์ 80% จึงจะได้รับเหรียญตราประจำหมวด
- **Mistake Clinic (คลังกู้ชีพ):** ฝึกเฉพาะข้อที่เคยพลาด จนกว่าจะตอบถูกติดต่อกันเพื่อปลดออกจากรายการจุดอ่อน

## 3. Immediate Pedagogical Feedback
- ทุกข้อหลังตอบต้องแสดง: **สถานะถูก/ผิด + คำอธิบายกระชับ + Pro Tip / สูตรจำเร็ว**
- มีระบบ **คำใบ้ (Hint)** ก่อนตอบ เพื่อให้ผู้เรียนคิดต่อได้แทนการเดาสุ่ม
