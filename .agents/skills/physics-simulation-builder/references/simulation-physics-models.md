# แบบจำลองทางคณิตศาสตร์ในซิมมูเลชั่นฟิสิกส์ (Physics Simulation Models)

## 1. การเคลื่อนที่ของลูกตุ้มนาฬิกา (Simple Pendulum)
- สมการเชิงอนุพันธ์:
  $$\frac{\mathrm{d}^2\theta}{\mathrm{d}t^2} = -\frac{g}{L}\sin\theta - b\frac{\mathrm{d}\theta}{\mathrm{d}t}$$
- การอินทิเกรตเชิงตัวเลข (Semi-implicit Euler):
  ```javascript
  omega += (- (g / L) * Math.sin(theta) - damping * omega) * dt;
  theta += omega * dt;
  ```
- พลังงานกล:
  - ความสูง: $h = L(1 - \cos\theta)$
  - พลังงานศักย์: $PE = mgh$
  - พลังงานจลน์: $KE = \frac{1}{2}m(L\omega)^2$
  - พลังงานรวม: $E_{\text{total}} = KE + PE$ (ต้องคงที่ในระบบอุดมคติ)

## 2. มวลติดสปริง (Mass on Spring / SHM)
- กฎของฮุค: $F = -kx$
- ความเร่ง: $a = -\frac{k}{m}x$
- อัปเดตพิกัด:
  ```javascript
  const a = - (k / m) * x - damping * v;
  v += a * dt;
  x += v * dt;
  ```
- พลังงาน:
  - พลังงานศักย์ยืดหยุ่น: $PE = \frac{1}{2}kx^2$
  - พลังงานจลน์: $KE = \frac{1}{2}mv^2$

## 3. การชนในหนึ่งมิติ (1D Collision)
- การชนแบบยืดหยุ่นสมบูรณ์ (Elastic Collision):
  $$v_1' = \frac{m_1 - m_2}{m_1 + m_2}u_1 + \frac{2m_2}{m_1 + m_2}u_2$$
  $$v_2' = \frac{2m_1}{m_1 + m_2}u_1 + \frac{m_2 - m_1}{m_1 + m_2}u_2$$
- การชนแบบไม่ยืดหยุ่นสมบูรณ์ (Inelastic - ติดไปด้วยกัน):
  $$v' = \frac{m_1 u_1 + m_2 u_2}{m_1 + m_2}$$
