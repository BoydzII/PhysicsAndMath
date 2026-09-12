# ฟังก์ชันวาดกราฟิกมาตรฐานใน Canvas (Canvas Drawing Helpers)

## 1. การวาดลูกศรเวกเตอร์ (Vector Arrow)
```javascript
function drawArrow(ctx, fromX, fromY, toX, toY, color = '#ef4444', headLen = 10, label = '') {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.5;
  
  // แกนลูกศร
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  
  // หัวลูกศร
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
  
  // ข้อความกำกับเวกเตอร์
  if (label) {
    ctx.font = 'bold 13px Sarabun, sans-serif';
    ctx.fillText(label, toX + 6, toY - 4);
  }
  ctx.restore();
}
```

## 2. การวาดกราฟแท่งพลังงาน (Energy Bar Graph)
```javascript
function drawEnergyBar(ctx, x, y, width, maxHeight, value, maxVal, color, label) {
  ctx.save();
  const height = Math.min(maxHeight, (value / maxVal) * maxHeight);
  
  // กรอบหลัง
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(x, y - maxHeight, width, maxHeight);
  ctx.strokeStyle = '#d1d5db';
  ctx.strokeRect(x, y - maxHeight, width, maxHeight);
  
  // แท่งพลังงาน
  ctx.fillStyle = color;
  ctx.fillRect(x, y - height, width, height);
  
  // ป้ายกำกับ
  ctx.fillStyle = '#374151';
  ctx.font = '12px Sarabun, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, x + width / 2, y + 16);
  ctx.fillText(`${Math.round(value)}J`, x + width / 2, y - height - 6);
  ctx.restore();
}
```
