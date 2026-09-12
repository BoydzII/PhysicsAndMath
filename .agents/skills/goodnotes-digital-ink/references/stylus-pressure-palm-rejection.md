# การจัดการแรงกดปากกาและการตัดสัญญาณฝ่ามือ (Stylus & Palm Rejection)

## 1. สถาปัตยกรรม Pointer Events
HTML5 Pointer Events API รวม Mouse, Pen, Touch เข้าด้วยกัน:
```javascript
canvas.addEventListener('pointerdown', (e) => {
  // ป้องกันการวาดด้วยนิ้วมือ (Palm Rejection / Two-Finger Gestures)
  if (e.pointerType === 'touch') return;
  
  isDrawing = true;
  canvas.setPointerCapture(e.pointerId);
});
```

## 2. การตอบสนองต่อแรงกด (Pressure Sensitivity)
- บน iPad Apple Pencil และเมาส์ปากกา Wacom:
  - `e.pressure` มีค่าระหว่าง `0.0` (ไม่กด) ถึง `1.0` (กดสูงสุด)
  - ความหนาเส้นที่เหมาะสม:
    ```javascript
    const dynamicWidth = baseLineWidth * (e.pressure ? e.pressure * 1.8 : 1.0);
    ctx.lineWidth = Math.max(1, dynamicWidth);
    ```
