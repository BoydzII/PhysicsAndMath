# การจัดหน้าสำหรับพิมพ์และส่งออก PDF (@media print)

```css
@media print {
  /* ซ่อนแถบเครื่องมือและปุ่มที่ไม่เกี่ยวข้อง */
  #drawingToolbar,
  .level-controls,
  .header-actions,
  .expand-btn,
  .modal-overlay {
    display: none !important;
  }
  
  /* แสดงผลกระดาษเต็มหน้า A4 พร้อมเส้นบรรทัดและลายมือ */
  body, .app-layout, .notebook-panel, .notebook-wrapper {
    width: 100% !important;
    height: auto !important;
    overflow: visible !important;
    background: white !important;
  }
  
  .problem-block {
    page-break-inside: avoid;
    margin-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 16px;
  }
  
  #drawingCanvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    pointer-events: none;
  }
}
```
