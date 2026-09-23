// นิยามของแต่ละเรื่อง — แสดงก่อนสมการตั้งต้นในแผงทฤษฎี
// ภาษาไทย: เรียบเรียงตามแนวหนังสือเรียน สสวท. ฟิสิกส์ ม.4 เล่ม 2 (บทที่ 5–7)
// ภาษาอังกฤษ: เรียบเรียงตามแนวตำราฟิสิกส์ระดับมหาวิทยาลัยที่นิยมใช้ (ไม่ใช่ข้อความคัดลอกคำต่อคำ)
(function () {
  var CH = {
    5: 'บทที่ 5 งานและพลังงาน',
    6: 'บทที่ 6 โมเมนตัมและการชน',
    7: 'บทที่ 7 การเคลื่อนที่แนวโค้ง'
  };
  var TOPIC_CH = { work: 5, power: 5, kinetic: 5, potential: 5, conservation: 5,
                   momentum: 6, impulse: 6, collision: 6,
                   projectile: 7, circular: 7, shm: 7 };

  // t = ชื่อไทย, e = ชื่ออังกฤษ, s = สัญลักษณ์/หน่วย, th = นิยามไทย, en = นิยามอังกฤษ
  var D = {
    work: [
      { t: 'งาน', e: 'Work', s: '$W$ · หน่วย จูล (J)',
        th: 'งานของแรงที่กระทำต่อวัตถุ คือผลคูณระหว่าง<b>ขนาดของแรงในแนวการกระจัด</b>กับ<b>ขนาดของการกระจัด</b> งานเป็นปริมาณสเกลาร์ มีค่าเป็นบวก ลบ หรือศูนย์ได้ตามมุมระหว่างแรงกับการกระจัด',
        en: 'Work is the energy transferred to or from an object by a force acting on it while the object undergoes a displacement. Work done on the object is positive when energy is transferred to it and negative when energy is transferred from it.' },
      { t: 'จูล', e: 'Joule', s: '$1\\ \\text{J} = 1\\ \\text{N}\\cdot\\text{m}$',
        th: 'งาน 1 จูล คืองานที่เกิดจากแรงขนาด 1 นิวตัน ทำให้วัตถุเคลื่อนที่ได้การกระจัด 1 เมตรในแนวเดียวกับแรง',
        en: 'One joule is the work done by a force of one newton acting on an object that moves one metre in the direction of the force.' },
      { t: 'งานลัพธ์', e: 'Net work', s: '$W_{net}$',
        th: 'ผลรวมของงานจากทุกแรงที่กระทำต่อวัตถุ มีค่าเท่ากับงานของแรงลัพธ์',
        en: 'The net work is the sum of the work done by every force acting on an object; it equals the work done by the net force.' }
    ],
    power: [
      { t: 'กำลัง', e: 'Power', s: '$P$ · หน่วย วัตต์ (W)',
        th: '<b>งานที่ทำได้ในหนึ่งหน่วยเวลา</b> หรืออัตราการทำงาน เป็นปริมาณสเกลาร์',
        en: 'Power is the time rate at which work is done by a force, or equivalently the rate at which energy is transferred.' },
      { t: 'กำลังเฉลี่ย / กำลังขณะหนึ่ง', e: 'Average / Instantaneous power', s: '$P_{av} = W/t$ · $P = \\overrightharpoon F\\cdot\\overrightharpoon v$',
        th: 'กำลังเฉลี่ยคืองานทั้งหมดหารด้วยเวลาที่ใช้ ส่วนกำลังขณะหนึ่งคือกำลัง ณ เวลาใดเวลาหนึ่ง มีค่าเท่ากับผลคูณแบบดอทของแรงกับความเร็วในขณะนั้น',
        en: 'Average power is the work done divided by the time interval. Instantaneous power is the limit of average power as the interval approaches zero; for a force acting on a moving object it equals the dot product of force and velocity.' },
      { t: 'วัตต์', e: 'Watt', s: '$1\\ \\text{W} = 1\\ \\text{J/s}$',
        th: 'กำลัง 1 วัตต์ คือการทำงาน 1 จูลในเวลา 1 วินาที',
        en: 'One watt is a rate of energy transfer of one joule per second.' },
      { t: 'ประสิทธิภาพ', e: 'Efficiency', s: '$\\eta = \\dfrac{P_{out}}{P_{in}}\\times100\\%$',
        th: 'อัตราส่วนระหว่างงาน (หรือกำลัง) ที่ได้ออกมาเป็นประโยชน์ กับงาน (หรือกำลัง) ที่ใส่เข้าไป มีค่าไม่เกิน 100%',
        en: 'Efficiency is the ratio of useful work (or power) output to the total work (or power) input; it can never exceed 100%.' }
    ],
    kinetic: [
      { t: 'พลังงาน', e: 'Energy', s: 'หน่วย จูล (J)',
        th: 'ความสามารถในการทำงาน เป็นปริมาณสเกลาร์ เปลี่ยนได้หลายรูป เช่น พลังงานจลน์ พลังงานศักย์ พลังงานความร้อน',
        en: 'Energy is a scalar quantity associated with the state of a system. It can be transferred between objects and transformed from one form to another, but it is never created or destroyed.' },
      { t: 'พลังงานจลน์', e: 'Kinetic energy', s: '$E_k = \\tfrac12 mv^2$',
        th: 'พลังงานของวัตถุที่<b>กำลังเคลื่อนที่</b> ขึ้นกับมวลและอัตราเร็วของวัตถุ วัตถุที่หยุดนิ่งมีพลังงานจลน์เป็นศูนย์',
        en: 'Kinetic energy is the energy associated with an object\'s state of motion. For a particle of mass m moving with speed v it equals one-half m v squared.' },
      { t: 'ทฤษฎีบทงาน–พลังงาน', e: 'Work–kinetic energy theorem', s: '$W_{net} = \\Delta E_k$',
        th: '<b>งานของแรงลัพธ์</b>ที่กระทำต่อวัตถุ เท่ากับพลังงานจลน์ที่เปลี่ยนไปของวัตถุ',
        en: 'The net work done on a particle by all forces acting on it equals the change in the particle\'s kinetic energy.' }
    ],
    potential: [
      { t: 'พลังงานศักย์', e: 'Potential energy', s: '$E_p$',
        th: 'พลังงานที่สะสมอยู่ในวัตถุหรือระบบ เนื่องจาก<b>ตำแหน่ง</b>หรือ<b>สภาพ</b>ของวัตถุ',
        en: 'Potential energy is energy associated with the configuration of a system of objects that exert conservative forces on one another.' },
      { t: 'พลังงานศักย์โน้มถ่วง', e: 'Gravitational potential energy', s: '$E_p = mgh$',
        th: 'พลังงานที่สะสมในวัตถุเนื่องจากตำแหน่งความสูง $h$ ที่วัดจาก<b>ระดับอ้างอิง</b> ซึ่งเลือกได้ตามสะดวก (ที่ระดับอ้างอิง $E_p = 0$)',
        en: 'Gravitational potential energy is the energy of the object–Earth system that depends on the object\'s height; near Earth\'s surface it equals mgh measured from a chosen reference level.' },
      { t: 'พลังงานศักย์ยืดหยุ่น', e: 'Elastic potential energy', s: '$E_p = \\tfrac12 kx^2$',
        th: 'พลังงานที่สะสมในวัตถุที่ถูกทำให้เปลี่ยนรูปแบบยืดหยุ่น เช่น สปริงที่ถูกยืดออกหรืออัดเข้า',
        en: 'Elastic potential energy is the energy stored in an elastic object, such as a spring, when it is stretched or compressed from its relaxed length.' },
      { t: 'กฎของฮุก', e: 'Hooke\'s law', s: '$F = kx$ · $k$ หน่วย N/m',
        th: 'ภายในขีดจำกัดสภาพยืดหยุ่น ขนาดของแรงที่ใช้ดึงหรืออัดสปริง<b>แปรผันตรง</b>กับระยะที่สปริงยืดหรือหด โดย $k$ คือค่านิจของสปริง',
        en: 'Within the elastic limit, the force exerted by a spring is proportional to its displacement from the relaxed length and directed opposite to it: F = −kx.' }
    ],
    conservation: [
      { t: 'พลังงานกล', e: 'Mechanical energy', s: '$E = E_k + E_p$',
        th: 'ผลรวมของพลังงานจลน์และพลังงานศักย์ของวัตถุหรือระบบ',
        en: 'The mechanical energy of a system is the sum of its kinetic energy and potential energy.' },
      { t: 'แรงอนุรักษ์', e: 'Conservative force', s: 'เช่น $m\\overrightharpoon g$ แรงสปริง',
        th: 'แรงที่งานของแรง<b>ไม่ขึ้นกับเส้นทาง</b>การเคลื่อนที่ ขึ้นกับตำแหน่งเริ่มต้นและตำแหน่งสุดท้ายเท่านั้น และงานรอบเส้นทางปิดเป็นศูนย์',
        en: 'A force is conservative if the work it does on a particle moving between two points is independent of the path taken; equivalently, the work it does around any closed path is zero.' },
      { t: 'แรงไม่อนุรักษ์', e: 'Nonconservative force', s: 'เช่น แรงเสียดทาน',
        th: 'แรงที่งานของแรงขึ้นกับเส้นทาง เช่น แรงเสียดทาน แรงต้านอากาศ ทำให้พลังงานกลเปลี่ยนไปเป็นพลังงานรูปอื่น',
        en: 'A nonconservative force, such as kinetic friction, does work that depends on the path; it transforms mechanical energy into other forms such as thermal energy.' },
      { t: 'กฎการอนุรักษ์พลังงานกล', e: 'Conservation of mechanical energy', s: '$E_{k1}+E_{p1} = E_{k2}+E_{p2}$',
        th: 'เมื่อ<b>มีแต่แรงอนุรักษ์</b>ทำงาน พลังงานกลของวัตถุหรือระบบจะมีค่าคงตัว',
        en: 'In an isolated system where only conservative forces do work, the mechanical energy remains constant.' },
      { t: 'กฎการอนุรักษ์พลังงาน', e: 'Conservation of energy', s: '',
        th: 'พลังงานไม่สามารถสร้างขึ้นใหม่หรือสูญหายไปได้ แต่เปลี่ยนจากรูปหนึ่งไปเป็นอีกรูปหนึ่งได้ พลังงานรวมของระบบโดดเดี่ยวจึงคงตัว',
        en: 'The total energy of an isolated system cannot change; energy can only be transformed from one form to another.' }
    ],
    momentum: [
      { t: 'โมเมนตัม', e: 'Linear momentum', s: '$\\overrightharpoon p = m\\overrightharpoon v$ · หน่วย kg·m/s',
        th: 'ผลคูณระหว่างมวลกับความเร็วของวัตถุ เป็น<b>ปริมาณเวกเตอร์</b> มีทิศเดียวกับความเร็ว',
        en: 'The linear momentum of a particle is the product of its mass and its velocity. It is a vector with the same direction as the velocity.' },
      { t: 'กฎข้อที่สองของนิวตัน (รูปโมเมนตัม)', e: 'Newton\'s second law in momentum form', s: '$\\Sigma\\overrightharpoon F = \\dfrac{\\Delta\\overrightharpoon p}{\\Delta t}$',
        th: '<b>แรงลัพธ์</b>ที่กระทำต่อวัตถุ เท่ากับอัตราการเปลี่ยนโมเมนตัมของวัตถุ และมีทิศเดียวกับการเปลี่ยนโมเมนตัม',
        en: 'The net external force acting on a particle equals the time rate of change of its linear momentum.' },
      { t: 'ระบบ / แรงภายใน / แรงภายนอก', e: 'System · Internal and external forces', s: '',
        th: 'ระบบคือวัตถุหรือกลุ่มวัตถุที่เราสนใจ แรงที่วัตถุในระบบกระทำต่อกันเป็นแรงภายใน ส่วนแรงจากสิ่งอื่นนอกระบบเป็นแรงภายนอก',
        en: 'A system is the object or set of objects chosen for analysis. Internal forces act between objects within the system; external forces are exerted on the system by objects outside it.' }
    ],
    impulse: [
      { t: 'การดล', e: 'Impulse', s: '$\\overrightharpoon J = \\overrightharpoon F\\Delta t = \\Delta\\overrightharpoon p$ · หน่วย N·s',
        th: 'ผลคูณระหว่างแรงกับช่วงเวลาที่แรงกระทำ มีค่าเท่ากับ<b>โมเมนตัมที่เปลี่ยนไป</b> เป็นปริมาณเวกเตอร์ ทิศเดียวกับ $\\Delta\\overrightharpoon p$',
        en: 'The impulse of a force is the product of the force and the time interval over which it acts (more generally, the integral of force over time). It is a vector equal to the change in momentum it produces.' },
      { t: 'แรงดล', e: 'Impulsive force', s: '$\\overrightharpoon F_{av} = \\dfrac{\\Delta\\overrightharpoon p}{\\Delta t}$',
        th: 'แรงที่กระทำต่อวัตถุใน<b>ช่วงเวลาสั้น ๆ</b> เช่น แรงที่ไม้ตีลูกบอล ขนาดของแรงเปลี่ยนไปตามเวลา จึงนิยมคิดเป็นแรงดลเฉลี่ย',
        en: 'An impulsive force is a large force that acts for a very short time, as in a collision; its time-averaged value is usually used in calculations.' },
      { t: 'ทฤษฎีบทการดล–โมเมนตัม', e: 'Impulse–momentum theorem', s: '$\\overrightharpoon J = \\overrightharpoon p_2 - \\overrightharpoon p_1$',
        th: 'การดลของแรงลัพธ์ที่กระทำต่อวัตถุ เท่ากับโมเมนตัมที่เปลี่ยนไปของวัตถุ',
        en: 'The impulse of the net force acting on a particle during a time interval equals the change in the particle\'s momentum during that interval.' }
    ],
    collision: [
      { t: 'การชน', e: 'Collision', s: '',
        th: 'เหตุการณ์ที่วัตถุตั้งแต่สองก้อนขึ้นไปออกแรงกระทำต่อกันในช่วงเวลาสั้น ๆ แรงระหว่างกันเป็นแรงภายในของระบบ',
        en: 'A collision is an isolated event in which two or more bodies exert relatively strong forces on each other for a relatively short time.' },
      { t: 'กฎการอนุรักษ์โมเมนตัม', e: 'Conservation of linear momentum', s: '$\\Sigma\\overrightharpoon p_{\\text{ก่อน}} = \\Sigma\\overrightharpoon p_{\\text{หลัง}}$',
        th: 'ถ้า<b>แรงลัพธ์ภายนอก</b>ที่กระทำต่อระบบเป็นศูนย์ โมเมนตัมรวมของระบบจะมีค่าคงตัว',
        en: 'If no net external force acts on a system, the total linear momentum of the system remains constant.' },
      { t: 'การชนแบบยืดหยุ่น', e: 'Elastic collision', s: '$\\Sigma E_{k,\\text{ก่อน}} = \\Sigma E_{k,\\text{หลัง}}$',
        th: 'การชนที่<b>พลังงานจลน์รวม</b>ของระบบก่อนชนเท่ากับหลังชน (และโมเมนตัมรวมคงตัวด้วย)',
        en: 'An elastic collision is one in which the total kinetic energy of the system is the same after the collision as before it.' },
      { t: 'การชนแบบไม่ยืดหยุ่น', e: 'Inelastic collision', s: '',
        th: 'การชนที่พลังงานจลน์รวมหลังชนไม่เท่ากับก่อนชน (ส่วนหนึ่งเปลี่ยนเป็นพลังงานรูปอื่น) ถ้าวัตถุชนแล้ว<b>ติดกันไป</b> เรียกว่าการชนแบบไม่ยืดหยุ่นอย่างสมบูรณ์',
        en: 'In an inelastic collision the total kinetic energy is not conserved. When the colliding bodies stick together it is called a completely inelastic collision.' },
      { t: 'การดีดตัวแยกจากกัน', e: 'Explosion', s: '$0 = m_1\\overrightharpoon v_1 + m_2\\overrightharpoon v_2$',
        th: 'วัตถุที่เดิมอยู่นิ่งติดกันแยกออกจากกันด้วยแรงภายใน โมเมนตัมรวมคงตัว (เป็นศูนย์) แต่พลังงานจลน์รวมเพิ่มขึ้น',
        en: 'In an explosion, internal forces push the parts of a system apart; total momentum is conserved while kinetic energy increases at the expense of stored energy.' }
    ],
    projectile: [
      { t: 'การเคลื่อนที่แบบโพรเจกไทล์', e: 'Projectile motion', s: '$\\overrightharpoon a = \\overrightharpoon g$',
        th: 'การเคลื่อนที่ใน<b>แนวโค้งพาราโบลา</b>ใน 2 มิติ ภายใต้แรงโน้มถ่วงเพียงแรงเดียว (ไม่คิดแรงต้านอากาศ) แยกพิจารณาเป็นแนวระดับที่ความเร็วคงตัว และแนวดิ่งที่มีความเร่ง $g$',
        en: 'Projectile motion is the two-dimensional motion of an object launched into the air and moving under gravity alone, with a constant downward acceleration g and air resistance neglected.' },
      { t: 'ความเป็นอิสระของแนวการเคลื่อนที่', e: 'Independence of horizontal and vertical motion', s: '',
        th: 'การเคลื่อนที่ในแนวระดับและแนวดิ่ง<b>ไม่ขึ้นต่อกัน</b> สิ่งที่เชื่อมทั้งสองแนวคือ<b>เวลา</b>ซึ่งเท่ากัน',
        en: 'The horizontal and vertical motions of a projectile are independent of each other; they are linked only by the common time.' },
      { t: 'พิสัย', e: 'Horizontal range', s: '$R$',
        th: 'ระยะทางในแนวระดับที่โพรเจกไทล์เคลื่อนที่ได้ ตั้งแต่จุดเริ่มต้นจนกลับมาที่ระดับเดิม',
        en: 'The horizontal range is the horizontal distance a projectile travels before returning to its launch height.' }
    ],
    circular: [
      { t: 'การเคลื่อนที่แบบวงกลม', e: 'Uniform circular motion', s: '',
        th: 'การเคลื่อนที่ในแนววงกลมด้วยอัตราเร็วคงตัว แต่<b>ทิศของความเร็วเปลี่ยน</b>ตลอดเวลา โดยความเร็วมีทิศตามแนวสัมผัสวงกลม',
        en: 'Uniform circular motion is motion in a circle at constant speed. The velocity is always tangent to the path, so its direction changes continuously.' },
      { t: 'คาบ / ความถี่', e: 'Period / Frequency', s: '$T$ (s) · $f = 1/T$ (Hz)',
        th: 'คาบคือเวลาที่วัตถุใช้เคลื่อนที่ครบ 1 รอบ ความถี่คือจำนวนรอบที่เคลื่อนที่ได้ใน 1 หน่วยเวลา',
        en: 'The period is the time required for one complete revolution; the frequency is the number of revolutions per unit time.' },
      { t: 'อัตราเร็วเชิงมุม', e: 'Angular speed', s: '$\\omega = \\dfrac{2\\pi}{T}$ · rad/s',
        th: 'มุมที่รัศมีกวาดไปได้ในหนึ่งหน่วยเวลา มีหน่วยเรเดียนต่อวินาที',
        en: 'Angular speed is the rate at which the angular position changes, measured in radians per second.' },
      { t: 'ความเร่งสู่ศูนย์กลาง', e: 'Centripetal acceleration', s: '$a_c = \\dfrac{v^2}{r} = \\omega^2 r$',
        th: 'ความเร่งของวัตถุที่เคลื่อนที่แบบวงกลม มีทิศ<b>เข้าสู่ศูนย์กลาง</b>เสมอ เกิดจากการเปลี่ยนทิศของความเร็ว',
        en: 'Centripetal acceleration is the acceleration of an object in uniform circular motion; it points toward the centre of the circle and has magnitude v²/r.' },
      { t: 'แรงสู่ศูนย์กลาง', e: 'Centripetal force', s: '$\\Sigma F_c = \\dfrac{mv^2}{r}$',
        th: '<b>แรงลัพธ์</b>ที่มีทิศเข้าสู่ศูนย์กลาง ทำให้วัตถุเคลื่อนที่เป็นวงกลม ไม่ใช่แรงชนิดใหม่ แต่อาจเป็นแรงตึงเชือก แรงเสียดทาน แรงโน้มถ่วง หรือผลรวมของแรงเหล่านี้',
        en: 'Centripetal force is not a new kind of force; it is the name given to the net force directed toward the centre that keeps an object moving in a circle.' }
    ],
    shm: [
      { t: 'การเคลื่อนที่แบบฮาร์มอนิกอย่างง่าย', e: 'Simple harmonic motion (SHM)', s: '$\\overrightharpoon a = -\\omega^2\\overrightharpoon x$',
        th: 'การเคลื่อนที่กลับไปกลับมาซ้ำทางเดิมผ่านตำแหน่งสมดุล โดยความเร่ง (แรงดึงกลับ) มีขนาด<b>แปรผันตรงกับการกระจัด</b>จากตำแหน่งสมดุล และมีทิศ<b>ตรงข้าม</b>กับการกระจัดเสมอ',
        en: 'Simple harmonic motion is periodic motion in which the restoring force, and hence the acceleration, is proportional to the displacement from equilibrium and directed opposite to it.' },
      { t: 'ตำแหน่งสมดุล', e: 'Equilibrium position', s: '$x = 0$',
        th: 'ตำแหน่งที่แรงลัพธ์ที่กระทำต่อวัตถุเป็นศูนย์ วัตถุผ่านตำแหน่งนี้ด้วยอัตราเร็วสูงสุด',
        en: 'The equilibrium position is where the net force on the oscillating object is zero; the object passes through it with maximum speed.' },
      { t: 'แอมพลิจูด', e: 'Amplitude', s: '$A$',
        th: 'ขนาดของการกระจัดมากที่สุดของวัตถุ วัดจากตำแหน่งสมดุล',
        en: 'The amplitude is the magnitude of the maximum displacement of the object from equilibrium.' },
      { t: 'คาบ / ความถี่ / ความถี่เชิงมุม', e: 'Period · Frequency · Angular frequency', s: '$\\omega = 2\\pi f = \\dfrac{2\\pi}{T}$',
        th: 'คาบคือเวลาที่ใช้สั่นครบ 1 รอบ ความถี่คือจำนวนรอบต่อหนึ่งหน่วยเวลา ส่วนความถี่เชิงมุมคือ $2\\pi$ เท่าของความถี่',
        en: 'The period is the time for one complete oscillation, the frequency is the number of oscillations per unit time, and the angular frequency is 2π times the frequency.' }
    ]
  };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  window.definitionsHTML = function (topic) {
    var list = D[topic];
    if (!list) return '';
    var h = '<section class="defs"><div class="defs-head"><span class="defs-title">นิยาม</span>' +
            '<span class="defs-sub" lang="en">Definitions</span></div><dl>';
    list.forEach(function (d) {
      h += '<div class="def"><dt><span class="def-th">' + d.t + '</span>' +
           '<span class="def-en" lang="en">' + esc(d.e) + '</span>' +
           (d.s ? '<span class="def-sym">' + d.s + '</span>' : '') + '</dt>' +
           '<dd class="def-text">' + d.th + '</dd>' +
           '<dd class="def-text-en" lang="en">' + esc(d.en) + '</dd></div>';
    });
    h += '</dl><p class="defs-src"><b>อ้างอิง</b> นิยามภาษาไทยเรียบเรียงตามหนังสือเรียนรายวิชาเพิ่มเติมวิทยาศาสตร์และเทคโนโลยี ฟิสิกส์ ม.4 เล่ม 2 (สสวท.) ' +
         CH[TOPIC_CH[topic]] + ' · นิยามภาษาอังกฤษเรียบเรียงตามแนว <i lang="en">Halliday, Resnick &amp; Walker, Fundamentals of Physics</i>; ' +
         '<i lang="en">Serway &amp; Jewett, Physics for Scientists and Engineers</i>; <i lang="en">Young &amp; Freedman, University Physics</i></p></section>';
    return h;
  };
})();
