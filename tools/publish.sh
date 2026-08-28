#!/usr/bin/env bash
# อัปเดตเว็บจริงด้วยคำสั่งเดียว
#
#   bash tools/publish.sh "ข้อความอธิบายว่าแก้อะไร"
#
# ทำให้ตามลำดับ
#   1) สร้างไฟล์ฉบับนักเรียนของทุกวิชาใหม่จากไฟล์ต้นฉบับของครู
#   2) ตรวจไวยากรณ์ทุกไฟล์ ถ้าพังจะหยุดทันที ไม่ปล่อยหน้าขาวขึ้นเว็บ
#   3) commit แล้ว push ขึ้น main ซึ่ง GitHub Pages จะเผยแพร่ให้เองใน 1-2 นาที
#
# ถ้าขั้นไหนไม่ผ่าน สคริปต์จะหยุดและไม่ push อะไรทั้งนั้น

set -euo pipefail

MSG="${1:-}"
if [ -z "$MSG" ]; then
  echo "ต้องใส่ข้อความอธิบายด้วย เช่น"
  echo '  bash tools/publish.sh "แก้ภาพบันไดในห้องทดลอง"'
  exit 1
fi

cd "$(git rev-parse --show-toplevel)"

echo "── 1/3 สร้างไฟล์ฉบับนักเรียน ──────────────────────────────"
node tools/build-dist.mjs

echo
echo "── 2/3 ตรวจไฟล์ก่อนขึ้นเว็บ ───────────────────────────────"
node tools/check.mjs

echo
echo "── 3/3 ส่งขึ้นเว็บ ────────────────────────────────────────"
if [ -z "$(git status --porcelain)" ]; then
  echo "ไม่มีอะไรเปลี่ยน ไม่ต้อง push"
  exit 0
fi

git add -A
git commit -m "$MSG"
git push origin HEAD:main

echo
echo "เรียบร้อย — เว็บจะอัปเดตใน 1-2 นาที"
echo "  https://boydzii.github.io/PhysicsAndMath/"
echo
echo "ถ้าเปิดแล้วยังเห็นของเดิม ให้กดรีเฟรชแบบล้างแคช (Ctrl+Shift+R)"
