# คู่มือมาตรฐานสัญลักษณ์เวกเตอร์และเวกเตอร์หนึ่งหน่วย (Vector & Unit Vector Standards)

เอกสารนี้กำหนดมาตรฐานการเขียนสัญลักษณ์เวกเตอร์ในวิชาฟิสิกส์และคณิตศาสตร์ตามมาตรฐาน ISO 80000-2 และ KaTeX

---

## 1. การแทนสัญลักษณ์เวกเตอร์ (Vector Representations)

| รูปแบบ | สัญลักษณ์ KaTeX | คำอธิบายและการใช้งาน |
| :--- | :--- | :--- |
| **เวกเตอร์ทั่วไป (Arrow Notation)** | `\vec{A}`, `\vec{v}`, `\vec{F}`, `\vec{p}` | มาตรฐานหลักสำหรับการเรียนการสอนมัธยมศึกษา มีลูกศรชี้ขวาเหนือนามตัวแปร |
| **เวกเตอร์ตัวหนา (Bold Notation)** | `\mathbf{A}`, `\mathbf{v}`, `\mathbf{F}` | นิยมใช้ในตำรามหาวิทยาลัยและเอกสารวิจัย |
| **ขนาดของเวกเตอร์ (Magnitude)** | `|\vec{A}|` หรือ `A` (ตัวเอียงไม่มีลูกศร) | แสดงขนาดหรือปริมาณสเกลาร์ของเวกเตอร์ |
| **เวกเตอร์หนึ่งหน่วย (Unit Vectors)** | `\hat{i}, \hat{j}, \hat{k}` หรือ `\hat{\imath}, \hat{\jmath}, \hat{k}` | เวกเตอร์ขนาด 1 หน่วยในแนวแกน $x, y, z$ ตามลำดับ สวมหมวก (`\hat{}`) |
| **เวกเตอร์หนึ่งหน่วยในทิศทางใดๆ** | `\hat{u} = \frac{\vec{u}}{|\vec{u}|}` | นิยามของยูนิตเวกเตอร์ |

---

## 2. การเขียนเวกเตอร์ในระบบพิกัดฉาก 2 มิติ และ 3 มิติ (Component Form)

### รูปแบบเวกเตอร์หนึ่งหน่วย (Unit Vector Form)
$$\vec{A} = A_x\hat{i} + A_y\hat{j} + A_z\hat{k}$$
- ในระนาบ 2 มิติ (แกน $x-y$):
  $$\vec{F} = F_x\hat{i} + F_y\hat{j} = (F\cos\theta)\hat{i} + (F\sin\theta)\hat{j}$$
  - ขนาดของแรง:
    $$|\vec{F}| = \sqrt{F_x^2 + F_y^2}$$
  - ทิศทางของแรง:
    $$\theta = \arctan\left(\frac{F_y}{F_x}\right)$$

### รูปแบบคู่อันดับ / เมทริกซ์คอลัมน์ (Ordered Pair / Matrix Form)
$$\vec{v} = \begin{pmatrix} v_x \\ v_y \\ v_z \end{pmatrix} \quad\text{หรือ}\quad \vec{v} = \langle v_x, v_y, v_z \rangle$$

---

## 3. การดำเนินการทางเวกเตอร์ (Vector Operations)

### 1. ผลคูณเชิงสเกลาร์ / ดอตโพรดักต์ (Scalar / Dot Product)
- ใช้เครื่องหมาย `\cdot` เท่านั้น (ห้ามใช้ `*` หรือ `\times`):
  $$\vec{A} \cdot \vec{B} = |\vec{A}||\vec{B}|\cos\theta = A_x B_x + A_y B_y + A_z B_z$$
- งานในทางฟิสิกส์:
  $$W = \vec{F} \cdot \vec{s} = F s \cos \theta$$
- สมบัติของยูนิตเวกเตอร์ในการดอต:
  $$\hat{i} \cdot \hat{i} = \hat{j} \cdot \hat{j} = \hat{k} \cdot \hat{k} = 1$$
  $$\hat{i} \cdot \hat{j} = \hat{j} \cdot \hat{k} = \hat{k} \cdot \hat{i} = 0$$

### 2. ผลคูณเชิงเวกเตอร์ / ครอสโพรดักต์ (Vector / Cross Product)
- ใช้เครื่องหมาย `\times` เท่านั้น:
  $$\vec{C} = \vec{A} \times \vec{B}$$
  $$|\vec{A} \times \vec{B}| = |\vec{A}||\vec{B}|\sin\theta$$
- การคำนวณผ่านดีเทอร์มิแนนต์:
  $$\vec{A} \times \vec{B} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ A_x & A_y & A_z \\ B_x & B_y & B_z \end{vmatrix} = (A_y B_z - A_z B_y)\hat{i} - (A_x B_z - A_z B_x)\hat{j} + (A_x B_y - A_y B_x)\hat{k}$$
- ทอร์กและโมเมนตัมเชิงมุมในทางฟิสิกส์:
  $$\vec{\tau} = \vec{r} \times \vec{F}$$
  $$\vec{L} = \vec{r} \times \vec{p}$$
- สมบัติวงเวียนของยูนิตเวกเตอร์:
  $$\hat{i} \times \hat{j} = \hat{k}, \quad \hat{j} \times \hat{k} = \hat{i}, \quad \hat{k} \times \hat{i} = \hat{j}$$

---

## 4. ตัวอย่างการแสดงวิธีทำเวกเตอร์ด้วย `.calc-steps`

```html
<div class="step">1. เวกเตอร์ตำแหน่ง: $\vec{r} = 3\hat{i} + 4\hat{j}\text{ m}$ และแรง $\vec{F} = 5\hat{i} - 2\hat{j}\text{ N}$</div>
<div class="calc-steps">
  <div>2. $W$</div><div>$=$</div><div>$\vec{F} \cdot \vec{r}$</div>
  <div></div><div>$=$</div><div>(5)(3) + (-2)(4)</div>
  <div></div><div>$=$</div><div>15 - 8</div>
  <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="7">&nbsp;J</div>
</div>
```
