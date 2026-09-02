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

cd "$(git rev-parse --show-toplevel)"

# ต้องมีข้อความก็ต่อเมื่อยังมีไฟล์ที่ไม่ได้ commit
# ถ้า commit ไว้แล้วและแค่อยากส่งขึ้นเว็บ สั่งเปล่า ๆ ได้เลย
MSG="${1:-}"
if [ -n "$(git status --porcelain)" ] && [ -z "$MSG" ]; then
  echo "ยังมีไฟล์ที่ไม่ได้ commit ต้องใส่ข้อความอธิบายด้วย เช่น"
  echo '  bash tools/publish.sh "แก้ภาพบันไดในห้องทดลอง"'
  exit 1
fi

echo "── 1/3 สร้างไฟล์ฉบับนักเรียน ──────────────────────────────"
node tools/build-dist.mjs

echo
echo "── 2/3 ตรวจไฟล์ก่อนขึ้นเว็บ ───────────────────────────────"
node tools/check.mjs

echo
echo "── 3/3 ส่งขึ้นเว็บ ────────────────────────────────────────"

# มีไฟล์ที่ยังไม่ได้ commit ก็ commit ให้ก่อน
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "$MSG"
else
  echo "ไม่มีไฟล์ใหม่ที่ต้อง commit (คงเพราะ commit ไปแล้ว)"
fi

# ต้องเทียบกับ main บนเว็บเสมอ ไม่ใช่ดูแค่ว่ามีไฟล์ค้างไหม
# เพราะกรณีที่ commit ไปแล้วแต่ยังไม่ push ต้นไม้จะสะอาด แต่ยังมีของค้างส่งอยู่
git fetch -q origin main
AHEAD=$(git rev-list --count origin/main..HEAD)
if [ "$AHEAD" = "0" ]; then
  echo "เว็บตรงกับเครื่องอยู่แล้ว ไม่ต้อง push"
  exit 0
fi
echo "มี $AHEAD คอมมิตรอขึ้นเว็บ"
git log --oneline origin/main..HEAD | sed 's/^/   /'
git push origin HEAD:main

echo
echo "เรียบร้อย — เว็บจะอัปเดตใน 1-2 นาที"
echo "  https://boydzii.github.io/PhysicsAndMath/"
echo
echo "ถ้าเปิดแล้วยังเห็นของเดิม ให้กดรีเฟรชแบบล้างแคช (Ctrl+Shift+R)"
