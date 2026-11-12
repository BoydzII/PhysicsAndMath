/* ============================================================================
   English Mastery Bank — คลังโจทย์ภาษาอังกฤษ 5 ระดับ (ปรนัย & อัตนัย)
   ============================================================================ */
window.ENGLISH_META = {
  levels: [
    { id: 1, code: 'Lv.1', cefr: 'A1–A2', name: 'Foundation', th: 'ระดับ 1 · พื้นฐานแน่น', color: '#059669', desc: 'ไวยากรณ์พื้นฐาน คำศัพท์ชีวิตประจำวัน และบทสนทนาเบื้องต้น' },
    { id: 2, code: 'Lv.2', cefr: 'B1',    name: 'Intermediate', th: 'ระดับ 2 · ระดับกลาง', color: '#0284c7', desc: 'Tenses หลัก Passive เบื้องต้น Phrasal Verbs และการอ่านจับใจความ' },
    { id: 3, code: 'Lv.3', cefr: 'B2',    name: 'Upper-Intermediate', th: 'ระดับ 3 · ระดับสูง', color: '#7c3aed', desc: 'Conditionals, Relative Clauses, สำนวน และการอ่านเชิงอนุมาน' },
    { id: 4, code: 'Lv.4', cefr: 'C1',    name: 'TGAT / A-Level', th: 'ระดับ 4 · เตรียมสอบเข้ามหาลัย', color: '#d97706', desc: 'Error ID, Cloze Test, โครงสร้างซับซ้อน และ Academic Reading' },
    { id: 5, code: 'Lv.5', cefr: 'C1–C2', name: 'Competitive / Olympiad', th: 'ระดับ 5 · สอบแข่งขันระดับสูง', color: '#e11d48', desc: 'Inversion, Subjunctive, ศัพท์ระดับสูง IELTS/SAT และ Critical Reading' }
  ],
  categories: [
    { id: 'grammar', icon: '📐', name: 'Grammar & Structure', th: 'ไวยากรณ์' },
    { id: 'vocab',   icon: '📚', name: 'Vocabulary & Idioms', th: 'คำศัพท์และสำนวน' },
    { id: 'conv',    icon: '💬', name: 'Conversation', th: 'บทสนทนา' },
    { id: 'reading', icon: '📖', name: 'Reading Comprehension', th: 'การอ่านจับใจความ' },
    { id: 'error',   icon: '🔍', name: 'Error Identification', th: 'หาจุดผิดพลาด' },
    { id: 'writing', icon: '✍️', name: 'Writing & Transformation', th: 'แต่ง/แปลงประโยค (อัตนัย)' }
  ]
};

window.ENGLISH_QUESTIONS = [
  // ==========================================================================
  // LEVEL 1: Foundation (A1-A2) — 25 Questions (MC + Fill + Rewrite)
  // ==========================================================================
  {
    id: 'L1-GR-01', level: 1, cat: 'grammar', type: 'mc',
    prompt: 'She ______ to school by bus every morning.',
    choices: ['go', 'goes', 'going', 'is go'],
    answer: 1,
    hint: 'สังเกตคำบอกเวลา "every morning" (กิจวัตรประจำวัน) และประธานเอกพจน์ "She"',
    explain: 'Present Simple Tense กับประธานเอกพจน์บุรุษที่ 3 (She/He/It) กริยาต้องเติม -s หรือ -es ดังนั้น go → goes',
    tip: 'He / She / It → กริยาเติม s/es เสมอใน Present Simple!'
  },
  {
    id: 'L1-GR-02', level: 1, cat: 'grammar', type: 'mc',
    prompt: 'There ______ two apples and a banana on the table.',
    choices: ['is', 'are', 'was', 'has'],
    answer: 1,
    hint: 'ดูคำนามที่ตามหลัง There ทันที ("two apples" เป็นพหูพจน์)',
    explain: 'โครงสร้าง There is / There are จะผันกริยาตามคำนามตัวแรกที่ตามมา "two apples" เป็นพหูพจน์ จึงใช้ are',
    tip: 'There + is/are ให้ดูคำนามตัวแรกเป็นหลัก (Proximity Rule)'
  },
  {
    id: 'L1-GR-03', level: 1, cat: 'grammar', type: 'mc',
    prompt: 'My father bought ______ umbrella because it was raining.',
    choices: ['a', 'an', 'the', 'no article'],
    answer: 1,
    hint: 'คำว่า umbrella ออกเสียงขึ้นต้นด้วยเสียงสระ (/ʌmˈbrelə/)',
    explain: 'ใช้ "an" หน้าคำนามนับได้เอกพจน์ที่ขึ้นต้นด้วยเสียงสระ (a, e, i, o, u) และยังไม่ได้เจาะจง',
    tip: 'ดูที่ "เสียง" ไม่ใช่แค่ตัวอักษร: an umbrella, an hour, แต่ a university (/juː/)'
  },
  {
    id: 'L1-GR-04', level: 1, cat: 'grammar', type: 'mc',
    prompt: 'Yesterday, we ______ a great movie at the cinema.',
    choices: ['watch', 'watched', 'watching', 'will watch'],
    answer: 1,
    hint: 'คำว่า "Yesterday" บอกเหตุการณ์ที่จบลงแล้วในอดีต',
    explain: 'Past Simple Tense ใช้กริยาช่อง 2 (V.2) เพื่อเล่าเหตุการณ์ที่เกิดขึ้นและจบลงแล้วในอดีต watch → watched',
    tip: 'yesterday, last night, ... ago → ใช้ Past Simple (V.2)'
  },
  {
    id: 'L1-GR-05', level: 1, cat: 'grammar', type: 'fill',
    prompt: 'เติมรูปกริยาให้ถูกต้อง (Present Continuous):<br>Look! The children ______ (play) in the garden right now.',
    answers: ['are playing'],
    hint: 'มีคำว่า "Look!" และ "right now" + ประธานพหูพจน์ "The children"',
    explain: 'Present Continuous (is/am/are + V.ing) ใช้กับเหตุการณ์ที่กำลังเกิดขึ้นในขณะที่พูด "children" เป็นพหูพจน์ จึงใช้ are playing',
    tip: 'child (เอกพจน์) → children (พหูพจน์) ไม่ต้องเติม s'
  },
  {
    id: 'L1-VB-01', level: 1, cat: 'vocab', type: 'mc',
    prompt: 'The opposite of "expensive" is ______.',
    choices: ['cheap', 'heavy', 'modern', 'large'],
    answer: 0,
    hint: 'expensive แปลว่า ราคาแพง',
    explain: 'expensive (แพง) ตรงข้ามกับ cheap (ราคาถูก) ส่วน heavy = หนัก, modern = ทันสมัย, large = ใหญ่',
    tip: 'จำคู่ตรงข้ามเป็นแพ็ก: expensive ↔ cheap, noisy ↔ quiet'
  },
  {
    id: 'L1-VB-02', level: 1, cat: 'vocab', type: 'mc',
    prompt: 'I need a ______ to cut this piece of paper.',
    choices: ['spoon', 'pillow', 'pair of scissors', 'blanket'],
    answer: 2,
    hint: 'อุปกรณ์ที่ใช้ตัดกระดาษ',
    explain: 'a pair of scissors = กรรไกร 1 อัน (คำว่า scissors เป็นรูปพหูพจน์เสมอ)',
    tip: 'ของที่มี 2 ขา/2 ชิ้นประกบกัน ใช้ a pair of ... เช่น scissors, glasses, trousers'
  },
  {
    id: 'L1-VB-03', level: 1, cat: 'vocab', type: 'mc',
    prompt: 'My sister works in a hospital and takes care of patients. She is a ______.',
    choices: ['chef', 'nurse', 'pilot', 'baker'],
    answer: 1,
    hint: 'ทำงานในโรงพยาบาลและดูแลผู้ป่วย (patients)',
    explain: 'nurse = พยาบาล, chef = พ่อครัว, pilot = นักบิน, baker = คนทำขนมปัง',
    tip: 'patient (n.) = ผู้ป่วย / patient (adj.) = อดทน'
  },
  {
    id: 'L1-VB-04', level: 1, cat: 'vocab', type: 'fill',
    prompt: 'เติมคำบุพบท (Preposition of Time) ที่ถูกต้อง:<br>Our English class starts ______ 9:00 a.m. ______ Mondays.',
    answers: ['at, on', 'at on'],
    hint: 'ใช้ ______ หน้าเวลาเป๊ะๆ และ ______ หน้าวันในสัปดาห์ (พิมพ์คำตอบคั่นด้วยจุลภาค เช่น at, on)',
    explain: 'ใช้ "at" กับเวลาที่ระบุชัดเจน (at 9:00 a.m.) และใช้ "on" กับวันในสัปดาห์หรือวันที่ (on Mondays)',
    tip: 'จำง่ายๆ: IN เดือน/ปี/ฤดู · ON วัน/วันที่ · AT เวลา/เทศกาล'
  },
  {
    id: 'L1-CV-01', level: 1, cat: 'conv', type: 'mc',
    prompt: 'A: "Excuse me, could you tell me the way to the library?"<br>B: "______"',
    choices: [
      'I like reading books very much.',
      'Sure. Go straight and turn left at the corner.',
      'Yes, I am a student here.',
      'No, thank you. I am full.'
    ],
    answer: 1,
    hint: 'A กำลังถามทางไปห้องสมุด',
    explain: 'เมื่อมีคนถามทาง ("could you tell me the way to...") การตอบรับที่สุภาพและตรงประเด็นคือบอกทิศทาง: "Sure. Go straight and turn left at the corner."',
    tip: 'สำนวนถามทางยอดฮิต: Could you tell me the way to...? / How can I get to...?'
  },
  {
    id: 'L1-CV-02', level: 1, cat: 'conv', type: 'mc',
    prompt: 'A: "Thank you so much for your help!"<br>B: "______"',
    choices: [
      'You are welcome.',
      'Nice to meet you.',
      'I am sorry to hear that.',
      'See you yesterday.'
    ],
    answer: 0,
    hint: 'คำตอบรับคำขอบคุณ',
    explain: 'เมื่อมีคนขอบคุณ ("Thank you...") ตอบกลับด้วย "You are welcome." / "My pleasure." / "No problem."',
    tip: 'ตอบรับคำขอบคุณได้หลายแบบ: You\'re welcome / Don\'t mention it / Anytime!'
  },
  {
    id: 'L1-CV-03', level: 1, cat: 'conv', type: 'mc',
    prompt: 'Waiter: "Are you ready to order?"<br>Customer: "______"',
    choices: [
      'Yes, I\'ll have the grilled chicken, please.',
      'The weather is very nice today.',
      'I went to the market this morning.',
      'Yes, here is my passport.'
    ],
    answer: 0,
    hint: 'พนักงานเสิร์ฟถามว่าพร้อมสั่งอาหารหรือยัง',
    explain: 'ในร้านอาหาร เมื่อพนักงานถาม "Are you ready to order?" ลูกค้าจะสั่งอาหารด้วย "I\'ll have..." หรือ "I\'d like..."',
    tip: 'สั่งอาหารแบบสุภาพ: I\'ll have... / Can I have..., please?'
  },
  {
    id: 'L1-RD-01', level: 1, cat: 'reading', type: 'mc',
    passage: 'Tom wakes up at 6:30 a.m. every weekday. He takes a shower, eats toast with eggs, and walks to the bus stop at 7:15 a.m. On Saturdays, however, he sleeps until 9:00 a.m. and plays football with his friends in the park.',
    prompt: 'What does Tom usually eat for breakfast on weekdays?',
    choices: ['Rice and soup', 'Toast with eggs', 'Noodles', 'Fruit salad'],
    answer: 1,
    hint: 'ดูประโยคที่ 2 ในเนื้อเรื่อง',
    explain: 'เนื้อเรื่องระบุชัดเจนว่า "He takes a shower, eats toast with eggs..." ดังนั้นคำตอบคือ Toast with eggs',
    tip: 'Reading พื้นฐานให้สแกนหาคำสำคัญ (keyword) เช่น breakfast / eat ในเนื้อเรื่อง'
  },
  {
    id: 'L1-RD-02', level: 1, cat: 'reading', type: 'mc',
    passage: 'Tom wakes up at 6:30 a.m. every weekday. He takes a shower, eats toast with eggs, and walks to the bus stop at 7:15 a.m. On Saturdays, however, he sleeps until 9:00 a.m. and plays football with his friends in the park.',
    prompt: 'Which statement is TRUE about Tom on Saturdays?',
    choices: [
      'He wakes up at 6:30 a.m.',
      'He goes to school by bus.',
      'He wakes up later than on weekdays.',
      'He plays basketball alone.'
    ],
    answer: 2,
    hint: 'เปรียบเทียบเวลาตื่นนอนวันธรรมดากับวันเสาร์',
    explain: 'วันธรรมดา Tom ตื่น 6:30 น. แต่วันเสาร์นอนถึง 9:00 น. (sleeps until 9:00 a.m.) แปลว่าเขาตื่นสายกว่าวันธรรมดา',
    tip: 'สังเกตคำเชื่อมความขัดแย้ง "however" (อย่างไรก็ตาม) มักซ่อนคำตอบสำคัญ'
  },
  {
    id: 'L1-ER-01', level: 1, cat: 'error', type: 'mc',
    prompt: 'เลือกส่วนที่ผิดไวยากรณ์:<br><u class="err">[A] He</u> <u class="err">[B] don\'t</u> <u class="err">[C] like</u> <u class="err">[D] spicy food</u>.',
    choices: ['[A] He', '[B] don\'t', '[C] like', '[D] spicy food'],
    answer: 1,
    hint: 'ดูประธาน "He" กับกริยาช่วยปฏิเสธ',
    explain: 'ประธานเอกพจน์ "He" ต้องใช้กริยาช่วยปฏิเสธ "doesn\'t" (does not) ไม่ใช่ don\'t',
    tip: 'He / She / It → doesn\'t + V.inf (ไม่เติม s ที่กริยาหลักอีก)'
  },
  {
    id: 'L1-ER-02', level: 1, cat: 'error', type: 'fill',
    prompt: 'แก้คำที่ขีดเส้นใต้ให้ถูกต้อง:<br>My brother is <u class="err">more tall</u> than me.',
    answers: ['taller'],
    hint: 'tall เป็นคำคุณศัพท์สั้น 1 พยางค์ ใช้ขั้นกว่าอย่างไร?',
    explain: 'คำคุณศัพท์ 1 พยางค์ (tall) เมื่อทำเป็นขั้นกว่า (Comparative) ให้เติม -er เป็น taller ไม่ใช้ more tall',
    tip: 'สั้นเติม -er (taller, faster) · ยาว 2-3+ พยางค์ใช้ more (more beautiful)'
  },
  {
    id: 'L1-WR-01', level: 1, cat: 'writing', type: 'rewrite',
    prompt: 'เปลี่ยนประโยคบอกเล่าต่อไปนี้เป็นประโยคปฏิเสธ (Negative):<br><b>"She speaks Japanese."</b>',
    answers: ["She doesn't speak Japanese.", "She does not speak Japanese.", "She doesn't speak Japanese", "She does not speak Japanese"],
    hint: 'ใช้ doesn\'t และตัด -s ออกจากกริยาหลัก',
    explain: 'ประโยค Present Simple ที่มีกริยาแท้ (speaks) และประธานเอกพจน์ (She) เมื่อทำเป็นปฏิเสธ ใช้ doesn\'t + V.inf → "She doesn\'t speak Japanese."',
    tip: 'พอมี does/doesn\'t แล้ว กริยาแท้ต้องกลับเป็นรูปเดิม (speak) เสมอ!'
  },
  {
    id: 'L1-WR-02', level: 1, cat: 'writing', type: 'rewrite',
    prompt: 'เรียงคำต่อไปนี้ให้เป็นประโยคคำถามที่ถูกต้อง:<br><b>you / do / where / live / ?</b>',
    answers: ['Where do you live?', 'Where do you live'],
    hint: 'ขึ้นต้นด้วย Wh-word → กริยาช่วย → ประธาน → กริยาแท้',
    explain: 'โครงสร้าง Wh-question ใน Present Simple: Wh-word + do/does + Subject + V.inf? → "Where do you live?"',
    tip: 'สูตรตั้งคำถาม: Q-A-S-M (Question word - Auxiliary - Subject - Main verb)'
  },
  {
    id: 'L1-GR-06', level: 1, cat: 'grammar', type: 'fill',
    prompt: 'เติมคำสรรพนามแสดงความเป็นเจ้าของ (Possessive Adjective):<br>We love ______ school because the teachers are very kind.',
    answers: ['our'],
    hint: 'ประธานคือ "We" (พวกเรา) → ของพวกเราคือ?',
    explain: 'We → our (ของเรา) ใช้ขยายคำนาม school',
    tip: 'I→my, you→your, we→our, they→their, he→his, she→her, it→its'
  },
  {
    id: 'L1-GR-07', level: 1, cat: 'grammar', type: 'mc',
    prompt: 'How ______ sugar do you want in your coffee?',
    choices: ['many', 'much', 'few', 'a lot'],
    answer: 1,
    hint: 'sugar (น้ำตาล) เป็นคำนามนับไม่ได้',
    explain: 'ใช้ How much กับคำนามนับไม่ได้ (uncountable nouns) เช่น sugar, water, money ส่วน How many ใช้กับนามนับได้พหูพจน์',
    tip: 'much = นับไม่ได้ · many = นับได้พหูพจน์'
  },

  // ==========================================================================
  // LEVEL 2: Intermediate (B1) — 25 Questions (MC + Fill + Rewrite)
  // ==========================================================================
  {
    id: 'L2-GR-01', level: 2, cat: 'grammar', type: 'mc',
    prompt: 'I ______ in Bangkok since 2018.',
    choices: ['live', 'lived', 'have lived', 'am living'],
    answer: 2,
    hint: 'สังเกตคำว่า "since 2018" (ต่อเนื่องตั้งแต่อดีตจนถึงปัจจุบัน)',
    explain: 'Present Perfect Tense (have/has + V.3) ใช้กับเหตุการณ์ที่เริ่มในอดีตและดำเนินต่อเนื่องมาจนถึงปัจจุบัน มักใช้คู่กับ since / for',
    tip: 'since + จุดเริ่มต้นเวลา · for + ระยะเวลา → ใช้ have/has + V.3'
  },
  {
    id: 'L2-GR-02', level: 2, cat: 'grammar', type: 'mc',
    prompt: 'While I ______ dinner, the phone rang.',
    choices: ['cooked', 'was cooking', 'cook', 'have cooked'],
    answer: 1,
    hint: 'เหตุการณ์หนึ่งกำลังดำเนินอยู่ในอดีต แล้วอีกเหตุการณ์ (the phone rang) เข้ามาแทรก',
    explain: 'Past Continuous (was/were + V.ing) ใช้กับเหตุการณ์ที่กำลังดำเนินอยู่ในอดีต (หลัง While) โดยมี Past Simple (V.2) เข้ามาแทรก',
    tip: 'While + Past Cont. (กำลังทำอยู่) , Past Simple (เข้ามาแทรก)'
  },
  {
    id: 'L2-GR-03', level: 2, cat: 'grammar', type: 'mc',
    prompt: 'English ______ in many countries around the world.',
    choices: ['speaks', 'is spoken', 'spoke', 'is speaking'],
    answer: 1,
    hint: 'ภาษาอังกฤษ "ถูกพูด" (Passive Voice)',
    explain: 'ประโยคนี้ประธาน (English) เป็นผู้ถูกกระทำ จึงต้องใช้ Passive Voice (be + V.3) ใน Present Simple → is spoken',
    tip: 'Passive Voice = V.to be (ผันตาม Tense) + V.3 เสมอ'
  },
  {
    id: 'L2-GR-04', level: 2, cat: 'grammar', type: 'mc',
    prompt: 'You ______ wear a helmet when riding a motorcycle; it\'s the law.',
    choices: ['must', 'might', 'could', 'needn\'t'],
    answer: 0,
    hint: 'เป็นกฎหมาย (it\'s the law) แสดงความจำเป็นอย่างยิ่ง',
    explain: 'must ใช้แสดงข้อบังคับ กฎหมาย หรือความจำเป็นอย่างยิ่ง ส่วน might/could = อาจจะ, needn\'t = ไม่จำเป็น',
    tip: 'must = ต้อง (ข้อบังคับ/กฎหมาย) · should = ควรจะ (คำแนะนำ)'
  },
  {
    id: 'L2-GR-05', level: 2, cat: 'grammar', type: 'fill',
    prompt: 'เติมคำในช่องว่างให้ถูกต้อง (Question Tag):<br>She can swim very fast, ______?',
    answers: ["can't she"],
    hint: 'ประโยคหน้าเป็นบอกเล่า (can) → Tag ด้านหลังต้องเป็นปฏิเสธ',
    explain: 'หลัก Question Tag: ประโยคหน้าเป็นบอกเล่า Tag ต้องเป็นปฏิเสธ ใช้กริยาช่วยตัวเดิม (can → can\'t) และสรรพนามแทนประธาน (she)',
    tip: 'หน้าบวก หลังลบ · หน้าลบ หลังบวก!'
  },
  {
    id: 'L2-VB-01', level: 2, cat: 'vocab', type: 'mc',
    prompt: 'Don\'t ______! Keep trying and you will succeed.',
    choices: ['give up', 'give in', 'look up', 'turn on'],
    answer: 0,
    hint: 'แปลว่า "อย่ายอมแพ้"',
    explain: 'give up = ยอมแพ้/เลิกทำ, give in = ยอมจำนน, look up = ค้นหาข้อมูล, turn on = เปิดเครื่อง',
    tip: 'Phrasal verb ยอดฮิต: give up (ยอมแพ้), put off (เลื่อนออกไป), run out of (หมด)'
  },
  {
    id: 'L2-VB-02', level: 2, cat: 'vocab', type: 'mc',
    prompt: 'The train was ______ for two hours because of the heavy storm.',
    choices: ['delayed', 'arrived', 'improved', 'invited'],
    answer: 0,
    hint: 'พายุหนักทำให้รถไฟล่าช้า',
    explain: 'delayed = ล่าช้า/เลื่อนออกไป, arrived = มาถึง, improved = พัฒนา, invited = เชิญ',
    tip: 'delay (v./n.) = ล่าช้า มักเจอคู่กับ flight / train / traffic'
  },
  {
    id: 'L2-VB-03', level: 2, cat: 'vocab', type: 'fill',
    prompt: 'เติม Phrasal Verb ที่แปลว่า "ดูแล" (take care of):<br>Could you ______ my cat while I am away on vacation?',
    answers: ['look after'],
    hint: 'look + ______ (2 คำ)',
    explain: 'look after = ดูแล (มีความหมายเหมือน take care of)',
    tip: 'ตระกูล look: look after (ดูแล), look for (มองหา), look forward to (ตั้งตารอ)'
  },
  {
    id: 'L2-CV-01', level: 2, cat: 'conv', type: 'mc',
    prompt: 'A: "Would you mind if I opened the window?"<br>B: "______, go right ahead."',
    choices: [
      'Yes, please',
      'Not at all',
      'I mind it',
      'No, I don\'t open'
    ],
    answer: 1,
    hint: 'ถ้าอนุญาต ("go right ahead" = เชิญเลย) ต้องตอบว่า "ไม่รังเกียจเลย"',
    explain: 'คำถาม "Would you mind if...?" (คุณจะรังเกียจไหมถ้า...) ถ้าอนุญาตต้องตอบปฏิเสธความรังเกียจ เช่น "Not at all." หรือ "No, not at all."',
    tip: 'Would you mind...? ถ้าโอเค ให้ตอบ "Not at all" / "Of course not" (อย่าตอบ Yes!)'
  },
  {
    id: 'L2-CV-02', level: 2, cat: 'conv', type: 'mc',
    prompt: 'A: "I failed my driving test again."<br>B: "______ Better luck next time!"',
    choices: [
      'Congratulations!',
      'I\'m sorry to hear that.',
      'That\'s awesome!',
      'How wonderful!'
    ],
    answer: 1,
    hint: 'A กำลังเสียใจที่สอบตก',
    explain: 'เมื่อเพื่อนเจอเรื่องน่าเสียใจ ใช้ "I\'m sorry to hear that." เพื่อแสดงความเห็นใจ ตามด้วยคำให้กำลังใจ',
    tip: 'แสดงความเสียใจ/เห็นใจ: I\'m sorry to hear that / What a pity!'
  },
  {
    id: 'L2-RD-01', level: 2, cat: 'reading', type: 'mc',
    passage: 'Cycling to work has become increasingly popular in many cities. Not only does it reduce traffic congestion and air pollution, but it also helps riders stay fit and save money on fuel. However, city planners still need to build more dedicated bike lanes to ensure cyclists\' safety.',
    prompt: 'What is the main idea of this passage?',
    choices: [
      'Bicycles are more expensive than cars.',
      'Cycling to work has many benefits, though safer bike lanes are needed.',
      'Air pollution is caused mainly by bicycles.',
      'People no longer drive cars in big cities.'
    ],
    answer: 1,
    hint: 'สรุปทั้งส่วนข้อดี (ลดรถติด/มลพิษ/ประหยัด) และส่วน "However..."',
    explain: 'ย่อหน้ากล่าวถึงประโยชน์ของการปั่นจักรยานไปทำงาน (ลดรถติด ลดมลพิษ สุขภาพดี ประหยัดเงิน) และปิดท้ายว่ายังต้องสร้างเลนจักรยานเพิ่มเพื่อความปลอดภัย',
    tip: 'Main Idea ที่ดีต้องครอบคลุมทั้งประโยคเปิดและประโยคที่ตามหลัง However'
  },
  {
    id: 'L2-RD-02', level: 2, cat: 'reading', type: 'mc',
    passage: 'Cycling to work has become increasingly popular in many cities. Not only does it reduce traffic congestion and air pollution, but it also helps riders stay fit and save money on fuel. However, city planners still need to build more dedicated bike lanes to ensure cyclists\' safety.',
    prompt: 'The word "congestion" is closest in meaning to ______.',
    choices: ['crowding / jam', 'speed', 'accident', 'freedom'],
    answer: 0,
    hint: 'traffic ______ = ปัญหารถติด',
    explain: 'traffic congestion หมายถึง การจราจรติดขัด (traffic jam / crowding)',
    tip: 'เดาศัพท์จากบริบท: คำว่า traffic + reduce มักคู่กับ congestion (ความแออัด/รถติด)'
  },
  {
    id: 'L2-ER-01', level: 2, cat: 'error', type: 'mc',
    prompt: 'เลือกส่วนที่ผิดไวยากรณ์:<br><u class="err">[A] Neither</u> John <u class="err">[B] nor</u> his friends <u class="err">[C] was</u> <u class="err">[D] at the party</u>.',
    choices: ['[A] Neither', '[B] nor', '[C] was', '[D] at the party'],
    answer: 2,
    hint: 'Neither A nor B กริยาผันตามประธานตัวที่ใกล้กริยาที่สุด (his friends)',
    explain: 'โครงสร้าง Neither...nor กริยาผันตามประธานตัวหลัง ("his friends" เป็นพหูพจน์) จึงต้องเปลี่ยน was → were',
    tip: 'Either A or B / Neither A nor B → กริยาผันตาม B (ตัวใกล้กริยา)'
  },
  {
    id: 'L2-WR-01', level: 2, cat: 'writing', type: 'rewrite',
    prompt: 'เปลี่ยนประโยค Active Voice ต่อไปนี้เป็น Passive Voice:<br><b>"Someone stole my bicycle yesterday."</b>',
    answers: ['My bicycle was stolen yesterday.', 'My bicycle was stolen yesterday'],
    hint: 'ขึ้นต้นด้วย "My bicycle" + was/were + V.3 (steal → stole → stolen)',
    explain: 'Past Simple Passive: Subject + was/were + V.3 → "My bicycle was stolen yesterday." (ละ by someone ได้)',
    tip: 'เปลี่ยน Active → Passive: เอากรรมขึ้นเป็นประธาน + ใส่ be (ตาม Tense เดิม) + V.3'
  },
  {
    id: 'L2-WR-02', level: 2, cat: 'writing', type: 'fill',
    prompt: 'ผันรูปคำในวงเล็บให้เหมาะสม (Word Formation):<br>Thank you for your ______ (kind). You really helped me a lot.',
    answers: ['kindness'],
    hint: 'หลัง "your" (Possessive Adj.) ต้องตามด้วยคำนาม (Noun)',
    explain: 'kind (adj.) → kindness (n. ความใจดี/ความกรุณา) เพราะอยู่หลัง your',
    tip: 'เติม -ness หลัง Adj. เพื่อสร้างคำนาม: kind→kindness, happy→happiness'
  },

  // ==========================================================================
  // LEVEL 3: Upper-Intermediate (B2) — 25 Questions (MC + Fill + Rewrite)
  // ==========================================================================
  {
    id: 'L3-GR-01', level: 3, cat: 'grammar', type: 'mc',
    prompt: 'If I ______ earlier, I wouldn\'t have missed the flight.',
    choices: ['leave', 'left', 'had left', 'would leave'],
    answer: 2,
    hint: 'Conditional Type 3 (สมมติในอดีตที่แก้ไขไม่ได้): ประโยคหลักใช้ wouldn\'t have + V.3',
    explain: 'If-Clause Type 3: If + S + had + V.3, S + would have + V.3 ใช้สมมติเหตุการณ์ตรงข้ามความจริงในอดีต',
    tip: 'Type 3: If had V.3, would have V.3 (เสียดายอดีต)'
  },
  {
    id: 'L3-GR-02', level: 3, cat: 'grammar', type: 'mc',
    prompt: 'The professor ______ lecture we attended yesterday won the Nobel Prize.',
    choices: ['who', 'whom', 'whose', 'which'],
    answer: 2,
    hint: 'ข้างหลังช่องว่างเป็นคำนาม "lecture" (การบรรยาย "ของ" ศาสตราจารย์)',
    explain: 'whose ใช้แสดงความเป็นเจ้าของใน Relative Clause ("the professor whose lecture..." = ศาสตราจารย์ผู้ซึ่งการบรรยายของท่าน)',
    tip: 'สูตรลัด Relative Pronoun: คน + whose + คำนาม (แปลว่า "ของใคร")'
  },
  {
    id: 'L3-GR-03', level: 3, cat: 'grammar', type: 'mc',
    prompt: 'I look forward to ______ from you soon.',
    choices: ['hear', 'hearing', 'heard', 'be heard'],
    answer: 1,
    hint: 'look forward to + V.ing (to ในที่นี้เป็น Preposition)',
    explain: 'สำนวน "look forward to" มีคำว่า to เป็นคำบุพบท (Preposition) จึงต้องตามด้วย Gerund (V.ing) หรือ Noun',
    tip: 'กลุ่ม to ที่ตามด้วย V.ing เสมอ: look forward to, be used to, object to, devote to'
  },
  {
    id: 'L3-GR-04', level: 3, cat: 'grammar', type: 'mc',
    prompt: 'She stopped ______ coffee because the doctor told her to drink more water.',
    choices: ['drink', 'to drink', 'drinking', 'drank'],
    answer: 2,
    hint: 'ความหมายคือ "เลิกดื่มกาแฟ" ไม่ใช่ "หยุดเดินเพื่อไปดื่มกาแฟ"',
    explain: 'stop + V.ing = เลิกทำสิ่งนั้นไปเลย (หยุดดื่มกาแฟ) ส่วน stop + to V.inf = หยุดทำอย่างอื่นเพื่อมาทำสิ่งนี้',
    tip: 'stop + V.ing (เลิกทำ) ≠ stop + to V. (แวะ/หยุดเพื่อทำ)'
  },
  {
    id: 'L3-GR-05', level: 3, cat: 'grammar', type: 'fill',
    prompt: 'เติมคำให้ถูกต้องในประโยคสมมติ (Wish Clause):<br>I wish I ______ (know) how to speak Spanish fluently right now.',
    answers: ['knew'],
    hint: 'ปรารถนาสิ่งที่เป็นไปไม่ได้ในปัจจุบัน (right now) ใช้ Past Simple หลัง wish',
    explain: 'I wish + S + V.2 ใช้แสดงความปรารถนาที่ตรงข้ามความจริงในปัจจุบัน know → knew',
    tip: 'Wish ปัจจุบันถอย 1 ก้าวเป็น V.2 · Wish อดีตถอย 1 ก้าวเป็น had + V.3'
  },
  {
    id: 'L3-VB-01', level: 3, cat: 'vocab', type: 'mc',
    prompt: 'Despite the tight deadline, the team managed to ______ the project successfully.',
    choices: ['pull off', 'put down', 'break into', 'call off'],
    answer: 0,
    hint: 'แปลว่า "ทำสิ่งยากๆ ให้สำเร็จลุล่วง"',
    explain: 'pull off = ทำสิ่งยากให้สำเร็จ, put down = วางลง/ดูถูก, break into = งัดแงะ, call off = ยกเลิก',
    tip: 'call off = cancel (ยกเลิก) · put off = postpone (เลื่อน) · pull off = succeed in doing sth difficult'
  },
  {
    id: 'L3-VB-02', level: 3, cat: 'vocab', type: 'mc',
    prompt: 'When Tom heard he got the scholarship, he was ______.',
    choices: ['under the weather', 'over the moon', 'once in a blue moon', 'on thin ice'],
    answer: 1,
    hint: 'สำนวนที่แปลว่า ดีใจสุดขีด',
    explain: 'over the moon = ดีใจมาก (extremely happy), under the weather = ไม่สบาย, once in a blue moon = นานๆ ที, on thin ice = อยู่ในสถานการณ์เสี่ยง',
    tip: 'จำสำนวนอารมณ์: over the moon (ดีใจสุดๆ), down in the dumps (หดหู่)'
  },
  {
    id: 'L3-VB-03', level: 3, cat: 'vocab', type: 'mc',
    prompt: 'The company has implemented strict measures to ______ data privacy.',
    choices: ['safeguard', 'neglect', 'jeopardize', 'abandon'],
    answer: 0,
    hint: 'มาตรการเข้มงวดเพื่อ "ปกป้อง/คุ้มครอง" ความเป็นส่วนตัวของข้อมูล',
    explain: 'safeguard = ปกป้อง/คุ้มครอง (protect), neglect = ละเลย, jeopardize = ทำให้เป็นอันตราย, abandon = ละทิ้ง',
    tip: 'safeguard (v./n.) = protect from harm or damage'
  },
  {
    id: 'L3-CV-01', level: 3, cat: 'conv', type: 'mc',
    prompt: 'Colleague A: "I\'m completely swamped with reports today."<br>Colleague B: "______"',
    choices: [
      'Would you like me to give you a hand with them?',
      'You should buy a new swimming suit.',
      'I don\'t think the reports are wet.',
      'Why don\'t you take a nap during the meeting?'
    ],
    answer: 0,
    hint: 'be swamped with = งานล้นมือ/ยุ่งมาก',
    explain: '"swamped with" แปลว่ามีงานท่วมหัว การตอบรับที่ดีคือเสนอตัวช่วย: "give you a hand" (ช่วยสักแรง)',
    tip: 'give someone a hand = help someone'
  },
  {
    id: 'L3-RD-01', level: 3, cat: 'reading', type: 'mc',
    passage: 'Sleep deprivation does more than just make you feel groggy the next day. Studies show that chronic lack of sleep impairs cognitive function, weakens the immune system, and increases the risk of cardiovascular disease. Even losing just two hours of sleep per night for a week can reduce reaction times to levels comparable to mild alcohol intoxication.',
    prompt: 'What can be inferred from the passage?',
    choices: [
      'Drinking alcohol helps people sleep better.',
      'Losing two hours of sleep for one night causes heart disease.',
      'Insufficient sleep can impair driving safety similarly to alcohol.',
      'Cognitive function is unaffected by sleep loss.'
    ],
    answer: 2,
    hint: 'ดูประโยคสุดท้าย: reaction times ลดลงเทียบเท่าคนเมาสุราอ่อนๆ',
    explain: 'การอดนอนทำให้เวลาตอบสนอง (reaction times) ช้าลงเทียบเท่ากับอาการมึนเมาอ่อนๆ จึงอนุมานได้ว่าส่งผลเสียต่อความปลอดภัยในการขับขี่คล้ายแอลกอฮอล์',
    tip: 'ข้อสอบ Inference (อนุมาน) ต้องเชื่อมโยงข้อมูลในบทความ ไม่ใช่เดาเกินขอบเขต'
  },
  {
    id: 'L3-ER-01', level: 3, cat: 'error', type: 'mc',
    prompt: 'เลือกส่วนที่ผิดไวยากรณ์:<br>The manager <u class="err">[A] suggested</u> <u class="err">[B] to postpone</u> the meeting <u class="err">[C] until</u> <u class="err">[D] next Monday</u>.',
    choices: ['[A] suggested', '[B] to postpone', '[C] until', '[D] next Monday'],
    answer: 1,
    hint: 'กริยา "suggest" ตามด้วย Gerund (V.ing) ไม่ใช่ to + V.inf',
    explain: 'suggest ไม่ใช้โครงสร้าง suggest to do แต่ใช้ suggest + V.ing (postponing) หรือ suggest (that) S + (should) + V.inf',
    tip: 'กริยาที่ตามด้วย V.ing เสมอ: suggest, avoid, enjoy, mind, admit, deny, finish'
  },
  {
    id: 'L3-WR-01', level: 3, cat: 'writing', type: 'rewrite',
    prompt: 'รวมประโยค 2 ประโยคนี้เข้าด้วยกันโดยใช้ Relative Pronoun (who/which):<br><b>"The book is on the desk. I borrowed it from the library."</b>',
    answers: [
      'The book which I borrowed from the library is on the desk.',
      'The book that I borrowed from the library is on the desk.',
      'The book I borrowed from the library is on the desk.'
    ],
    hint: 'ใช้ which หรือ that แทน "it" แล้ววางต่อหลัง "The book"',
    explain: 'นำส่วนขยาย "which I borrowed from the library" ไปวางหลังคำนามหลัก "The book" (ตัด it ออก) → "The book which I borrowed from the library is on the desk."',
    tip: 'เมื่อรวมประโยคด้วย Relative Pronoun ห้ามใส่สรรพนามซ้ำ (ตัด it ทิ้ง)'
  },
  {
    id: 'L3-WR-02', level: 3, cat: 'writing', type: 'fill',
    prompt: 'เปลี่ยนประโยคเป็น Reported Speech:<br>Direct: "I will call you tomorrow," Tom said to Lisa.<br>Reported: Tom told Lisa that he ______ call her the next day.',
    answers: ['would'],
    hint: 'Backshift Tense: will → ?',
    explain: 'ใน Reported Speech เมื่อกริยานำเป็นอดีต (told) คำว่า will ต้องผันถอยหลังเป็น would',
    tip: 'Backshift: will→would, can→could, V.1→V.2, V.2→had V.3'
  },

  // ==========================================================================
  // LEVEL 4: Advanced / TGAT & A-Level (C1) — 25 Questions (MC + Fill + Rewrite)
  // ==========================================================================
  {
    id: 'L4-GR-01', level: 4, cat: 'grammar', type: 'mc',
    prompt: '______ by the sudden noise, the birds flew away from the tree.',
    choices: ['Startling', 'Startled', 'Having startled', 'To startle'],
    answer: 1,
    hint: 'Participle Clause: ประธาน "the birds" เป็นผู้ "ถูกทำให้ตกใจ"',
    explain: 'Participle Clause ที่ประธานของประโยคหลัก (the birds) เป็นผู้ถูกกระทำ ให้ขึ้นต้นด้วย Past Participle (V.3) → "Startled by..." (= Because they were startled by...)',
    tip: 'V.ing ขึ้นหน้า = ประธานทำเอง (Active) · V.3 ขึ้นหน้า = ประธานถูกทำ (Passive)'
  },
  {
    id: 'L4-GR-02', level: 4, cat: 'grammar', type: 'mc',
    prompt: 'The number of students enrolling in online courses ______ steadily over the past decade.',
    choices: ['have increased', 'has increased', 'are increasing', 'were increasing'],
    answer: 1,
    hint: 'แยกความต่างระหว่าง "The number of..." กับ "A number of..."',
    explain: '"The number of + N.พหูพจน์" หมายถึง "จำนวนของ..." เป็นประธานเอกพจน์ จึงใช้กริยาเอกพจน์ "has increased" (สอดคล้องกับ over the past decade)',
    tip: 'The number of + V.เอกพจน์ · A number of (แปลว่า หลาย) + V.พหูพจน์'
  },
  {
    id: 'L4-GR-03', level: 4, cat: 'grammar', type: 'mc',
    prompt: 'No matter ______ hard he tried, he could not solve the puzzle.',
    choices: ['what', 'which', 'how', 'who'],
    answer: 2,
    hint: 'มีคำว่า "hard" (Adv.) ตามหลังช่องว่างทันที',
    explain: 'โครงสร้าง No matter how + Adj./Adv. + S + V = ไม่ว่า...มากแค่ไหนก็ตาม ("No matter how hard he tried...")',
    tip: 'No matter how + Adj./Adv. = However + Adj./Adv.'
  },
  {
    id: 'L4-VB-01', level: 4, cat: 'vocab', type: 'mc',
    prompt: 'The politician\'s ______ remarks during the debate alienated many undecided voters.',
    choices: ['conciliatory', 'inflammatory', 'diplomatic', 'benign'],
    answer: 1,
    hint: 'คำกริยา "alienated" (ทำให้แปลกแยก/ผลักไสผู้เลือกตั้ง) แสดงว่าคำพูดต้องยั่วยุหรือรุนแรง',
    explain: 'inflammatory = ยั่วยุ/ปลุกปั่นให้โกรธ, conciliatory = ประนีประนอม, diplomatic = มีวาทศิลป์ทางการทูต, benign = อ่อนโยน/ไม่เป็นพิษภัย',
    tip: 'ในข้อสอบ TGAT/A-Level ให้หา Context Clue จากคำกริยาผลลัพธ์ (เช่น alienated)'
  },
  {
    id: 'L4-VB-02', level: 4, cat: 'vocab', type: 'mc',
    prompt: 'Although the evidence seemed ______, the detective noticed a tiny inconsistency in the timeline.',
    choices: ['irrefutable', 'dubious', 'flawed', 'ambiguous'],
    answer: 0,
    hint: 'สังเกต "Although" (ขัดแย้งกับ "tiny inconsistency" = ความไม่สอดคล้องเล็กๆ)',
    explain: 'irrefutable = ที่โต้แย้งไม่ได้/แน่นหนา (ตรงข้ามกับมีข้อบกพร่อง), dubious = น่าสงสัย, flawed = มีตำหนิ, ambiguous = คลุมเครือ',
    tip: 'Although / Even though บอกความขัดแย้งเสมอ ถ้าข้างหลังลบ ข้างหน้าต้องบวก!'
  },
  {
    id: 'L4-CV-01', level: 4, cat: 'conv', type: 'mc',
    prompt: 'Manager: "Our sales figures are down 15% this quarter. Any thoughts?"<br>Analyst: "______ Maybe we should look at our pricing strategy."',
    choices: [
      'I couldn\'t agree less with the numbers.',
      'To be honest, I think our competitors have been undercutting us.',
      'That\'s none of my business.',
      'Let\'s call it a day and go home.'
    ],
    answer: 1,
    hint: 'การวิเคราะห์สาเหตุที่สอดคล้องกับ "look at our pricing strategy"',
    explain: 'การเสนอความเห็นอย่างมืออาชีพในที่ประชุม: "To be honest, I think our competitors have been undercutting us." (คู่แข่งตัดราคาเรา) จึงควรทบทวนกลยุทธ์ราคา',
    tip: 'undercut (v.) = ขายตัดราคาคู่แข่ง'
  },
  {
    id: 'L4-RD-01', level: 4, cat: 'reading', type: 'mc',
    passage: 'While artificial intelligence excels at pattern recognition and data processing, it lacks genuine human empathy and contextual moral judgment. Consequently, experts argue that AI should serve as a decision-support tool rather than an autonomous replacement for physicians or judges.',
    prompt: 'What is the author\'s primary attitude toward AI in high-stakes professions?',
    choices: [
      'Completely opposed to any use of AI',
      'Cautiously supportive of AI as an assistive tool',
      'Enthusiastic about replacing human judges with AI',
      'Indifferent to ethical concerns'
    ],
    answer: 1,
    hint: 'ดูคำว่า "decision-support tool rather than an autonomous replacement"',
    explain: 'ผู้เขียนเห็นด้วยกับการใช้ AI เป็น "เครื่องมือช่วยตัดสินใจ" (assistive/decision-support tool) แต่ไม่ควรนำมาแทนที่มนุษย์โดยสมบูรณ์ จึงเป็นทัศนคติแบบสนับสนุนอย่างระมัดระวัง (cautiously supportive)',
    tip: 'ข้อสอบ Tone/Attitude มักหลอกด้วยคำสุดโต่ง เช่น completely opposed หรือ enthusiastic'
  },
  {
    id: 'L4-ER-01', level: 4, cat: 'error', type: 'mc',
    prompt: 'เลือกส่วนที่ผิดไวยากรณ์ (A-Level Style):<br><u class="err">[A] Having finished</u> the report, <u class="err">[B] the printer</u> <u class="err">[C] was used</u> by Sarah <u class="err">[D] to make</u> three copies.',
    choices: ['[A] Having finished', '[B] the printer', '[C] was used', '[D] to make'],
    answer: 1,
    hint: 'Dangling Modifier! ใครเป็นคน "Having finished the report"?',
    explain: 'Dangling Participle: ส่วนขยาย "Having finished the report" ผู้ที่ทำรายงานเสร็จคือ Sarah ไม่ใช่ "the printer" ประธานหลังเครื่องหมายจุลภาคต้องเป็น Sarah (เช่น Sarah used the printer...)',
    tip: 'Dangling Modifier เป็นข้อสอบ Error ยอดฮิตของ A-Level: ประธานหลัง comma ต้องเป็นผู้กระทำส่วนหน้า!'
  },
  {
    id: 'L4-ER-02', level: 4, cat: 'error', type: 'fill',
    prompt: 'แก้คำที่ผิดในประโยคนี้ให้ถูกต้อง (พิมพ์เฉพาะคำที่แก้):<br>Scarcely <u class="err">I had</u> arrived at the station when the train departed.',
    answers: ['had I'],
    hint: 'ประโยคขึ้นต้นด้วยคำเชิงปฏิเสธ "Scarcely" ต้องกลับรูป (Inversion)',
    explain: 'เมื่อขึ้นต้นประโยคด้วย Scarcely / Hardly / Barely ต้องใช้ Inversion: Scarcely + had + S + V.3 ... when + S + V.2 → "had I"',
    tip: 'Hardly / Scarcely ... when · No sooner ... than (ต้อง Inversion ทั้งคู่!)'
  },
  {
    id: 'L4-WR-01', level: 4, cat: 'writing', type: 'rewrite',
    prompt: 'เขียนประโยคใหม่โดยใช้ "Despite" แทน "Although" (ความหมายคงเดิม):<br><b>"Although it rained heavily, they continued the match."</b>',
    answers: [
      'Despite the heavy rain, they continued the match.',
      'Despite raining heavily, they continued the match.',
      'Despite the fact that it rained heavily, they continued the match.'
    ],
    hint: 'Despite + Noun Phrase / V.ing (ห้ามตามด้วย S + V โดยตรง)',
    explain: 'Despite ตามด้วยนามวลี (the heavy rain) หรือ V.ing (raining heavily) หรือ the fact that + ประโยค → "Despite the heavy rain, they continued the match."',
    tip: 'Although + S + V · Despite / In spite of + Noun / V.ing'
  },

  // ==========================================================================
  // LEVEL 5: Competitive / Olympiad & IELTS-SAT (C1-C2) — 25 Questions
  // ==========================================================================
  {
    id: 'L5-GR-01', level: 5, cat: 'grammar', type: 'mc',
    prompt: 'Not only ______ the deadline, but she also exceeded every quality benchmark.',
    choices: ['she met', 'did she meet', 'she did meet', 'had she meet'],
    answer: 1,
    hint: 'Negative Adverbial "Not only" วางหน้าประโยค → Inversion',
    explain: 'เมื่อขึ้นต้นประโยคด้วย Not only ต้องสลับกริยาช่วยมาหน้าประธาน (Inversion): Not only + did + she + meet (V.inf)',
    tip: 'Not only / Never / Seldom / Rarely ขึ้นหน้าประโยค → ช่วย + ประธาน + แท้!'
  },
  {
    id: 'L5-GR-02', level: 5, cat: 'grammar', type: 'mc',
    prompt: 'The board insisted that the CFO ______ a full audit before the merger.',
    choices: ['conducts', 'conducted', 'conduct', 'would conduct'],
    answer: 2,
    hint: 'Subjunctive Mood หลังคำว่า "insisted that"',
    explain: 'Mandative Subjunctive: หลังกริยาแสดงคำสั่ง/ข้อเสนอแนะ (insist, demand, suggest, recommend, urge) + that + S + V.inf (ไม่ผัน ไม่เติม s/ed) → conduct',
    tip: 'Subjunctive: S + insist/suggest/demand + that + S + (should) + V.inf (bare infinitive)'
  },
  {
    id: 'L5-GR-03', level: 5, cat: 'grammar', type: 'mc',
    prompt: '______ had the CEO announced the restructuring than share prices surged by 8%.',
    choices: ['Hardly', 'Scarcely', 'No sooner', 'Barely'],
    answer: 2,
    hint: 'สังเกตคำเชื่อมด้านหลังคือ "than"',
    explain: 'คู่เชื่อมที่ถูกต้อง: No sooner ... than / Hardly ... when / Scarcely ... when ในประโยคนี้มี "than" จึงต้องใช้ No sooner',
    tip: 'No sooner ... THAN · Hardly / Scarcely ... WHEN'
  },
  {
    id: 'L5-GR-04', level: 5, cat: 'grammar', type: 'mc',
    prompt: 'Were the committee ______ the proposal today, implementation could begin next month.',
    choices: ['to approve', 'approve', 'approved', 'approving'],
    answer: 0,
    hint: 'Conditional Type 2 แบบ Inversion (ละ If)',
    explain: 'Inversion of Conditional Type 2: แทนที่จะเขียน "If the committee approved / were to approve...", สามารถละ If แล้วขึ้นต้นด้วย Were + S + to V.inf',
    tip: 'Inversion If-Clause: Type 1 (Should S V.inf) · Type 2 (Were S to V.inf) · Type 3 (Had S V.3)'
  },
  {
    id: 'L5-VB-01', level: 5, cat: 'vocab', type: 'mc',
    prompt: 'Far from being ______, the scientist\'s theory was grounded in decades of empirical observation.',
    choices: ['speculative', 'corroborated', 'rigorous', 'ubiquitous'],
    answer: 0,
    hint: '"Far from being X, it was grounded in empirical observation" → X ต้องแปลว่า คาดเดา/ไร้หลักฐาน',
    explain: 'speculative = ที่คาดเดาเอาเอง (ไม่มีหลักฐานยืนยัน), corroborated = ได้รับการยืนยัน, rigorous = เข้มงวด/รัดกุม, ubiquitous = มีอยู่ทั่วไป',
    tip: '"Far from being X, Y" แปลว่า "ไม่เป็น X เลย ตรงกันข้ามกลับเป็น Y"'
  },
  {
    id: 'L5-VB-02', level: 5, cat: 'vocab', type: 'mc',
    prompt: 'The novelist\'s prose is celebrated for its ______—conveying profound emotion in remarkably few words.',
    choices: ['verbosity', 'brevity', 'duplicity', 'complacency'],
    answer: 1,
    hint: 'คำอธิบายหลังขีด (em-dash) คือ "in remarkably few words"',
    explain: 'brevity = ความกระชับ/สั้นได้ใจความ (ตรงกับ "in remarkably few words"), verbosity = ความเยิ่นเย้อ, duplicity = ความหน้าไหว้หลังหลอก, complacency = ความชะล่าใจ',
    tip: 'ในข้อสอบ SAT/IELTS เครื่องหมาย em-dash (—) มักตามด้วยคำจำกัดความของคำตอบ!'
  },
  {
    id: 'L5-CV-01', level: 5, cat: 'conv', type: 'mc',
    prompt: 'Debater A: "Universal basic income will inevitably discourage people from working."<br>Debater B: "______ Pilot studies in Finland actually showed a slight increase in employment."',
    choices: [
      'That\'s a foregone conclusion.',
      'The empirical evidence suggests otherwise.',
      'I couldn\'t agree more with that premise.',
      'Let\'s sweep that under the rug.'
    ],
    answer: 1,
    hint: 'B กำลังโต้แย้งด้วยข้อมูลงานวิจัยในฟินแลนด์',
    explain: '"The empirical evidence suggests otherwise." (หลักฐานเชิงประจักษ์บ่งชี้ไปในทางตรงกันข้าม) เป็นการโต้แย้งเชิงวิชาการที่สุภาพและทรงพลัง',
    tip: 'otherwise (adv.) = ในทางตรงกันข้าม / เป็นอย่างอื่น'
  },
  {
    id: 'L5-RD-01', level: 5, cat: 'reading', type: 'mc',
    passage: 'Historians have long debated whether the Industrial Revolution was driven primarily by technological ingenuity or by institutional reforms that protected property rights. Recent cliometric analyses, however, point to a synergistic interplay: without secure patent laws, inventors lacked incentives to commercialize breakthroughs, yet without steam power and metallurgy, institutions alone could not have sparked sustained exponential growth.',
    prompt: 'Which of the following best captures the central argument of the passage?',
    choices: [
      'Patent laws were the sole catalyst of the Industrial Revolution.',
      'Technological innovation and institutional protection reinforced each other to drive growth.',
      'Cliometric analyses have discredited the role of steam power.',
      'Historians universally agree that institutions mattered more than technology.'
    ],
    answer: 1,
    hint: 'ดูคำว่า "synergistic interplay" (การทำงานประสานเสริมกัน)',
    explain: 'ผู้เขียนชี้ให้เห็นว่าทั้งนวัตกรรมเทคโนโลยี (steam power, metallurgy) และสถาบัน/กฎหมายทรัพย์สินทางปัญญา (patent laws) ต่างพึ่งพาและเสริมแรงกัน (synergistic interplay)',
    tip: 'synergistic = ที่เสริมฤทธิ์กัน (1+1 > 2) เป็นคำสำคัญใน Critical Reading'
  },
  {
    id: 'L5-ER-01', level: 5, cat: 'error', type: 'mc',
    prompt: 'เลือกส่วนที่ผิดไวยากรณ์ (Olympiad / SAT Style):<br><u class="err">[A] Had</u> the engineers <u class="err">[B] anticipated</u> the thermal expansion, the bridge <u class="err">[C] would not collapse</u> <u class="err">[D] during the heatwave</u>.',
    choices: ['[A] Had', '[B] anticipated', '[C] would not collapse', '[D] during the heatwave'],
    answer: 2,
    hint: 'ส่วนหน้าเป็น Conditional Type 3 (Had S V.3) พูดถึงเหตุการณ์ในอดีต (during the heatwave)',
    explain: 'เมื่อเหตุการณ์ในอดีต (Had the engineers anticipated...) ส่งผลในอดีต (during the heatwave) ส่วนผลลัพธ์ต้องใช้ would not have collapsed (would have + V.3) ไม่ใช่ would not collapse',
    tip: 'เช็ก Time Frame ของ If-Clause เสมอ: อดีตล้วนต้อง Type 3 (would have V.3)'
  },
  {
    id: 'L5-WR-01', level: 5, cat: 'writing', type: 'rewrite',
    prompt: 'แปลงประโยคต่อไปนี้ให้เป็นรูปแบบ <b>Negative Inversion</b> โดยขึ้นต้นด้วย <b>"Little"</b>:<br><b>"She did not realize that the decision would change her life forever."</b>',
    answers: [
      'Little did she realize that the decision would change her life forever.',
      'Little did she realize that the decision would change her life forever'
    ],
    hint: 'Little + did + S + V.inf ... (แปลว่า เธอแทบไม่รู้เลยว่า...)',
    explain: 'ใช้ Negative Inversion: Little + did + she + realize (V.inf) + that... เพื่อเน้นย้ำความคาดไม่ถึงในระดับ C1–C2',
    tip: 'Little did I know / Little did she realize เป็นสำนวน Inversion ระดับสูงที่ใช้ได้จริงใน Essay!'
  },
  {
    id: 'L5-WR-02', level: 5, cat: 'writing', type: 'fill',
    prompt: 'เติมคำในช่องว่างให้ถูกต้อง (Cleft Sentence เพื่อเน้นย้ำ):<br>It was only after reading the footnote ______ I understood the author\'s irony.',
    answers: ['that'],
    hint: 'โครงสร้าง Cleft Sentence: It is/was ... ______ ... (ห้ามใช้ when)',
    explain: 'Cleft Sentence ที่เน้นวลีบอกเวลา ("only after reading the footnote") ต้องเชื่อมด้วย "that" เสมอ (ไม่ใช่ when)',
    tip: 'It is/was + [ส่วนที่เน้น] + THAT + [ส่วนที่เหลือ] — ใช้ that เสมอ!'
  },
  {
    id: 'L5-VB-03', level: 5, cat: 'vocab', type: 'fill',
    prompt: 'ผันรูปคำในวงเล็บให้ถูกต้องตามบริบทวิชาการ:<br>The findings were ______ (ubiquity) cited across subsequent climate policy papers.',
    answers: ['ubiquitously'],
    hint: 'ขยายกริยา "cited" (ถูกอ้างอิง) → ต้องใช้ Adverb',
    explain: 'ubiquity (n.) → ubiquitous (adj.) → ubiquitously (adv. อย่างแพร่หลาย/ทุกหนทุกแห่ง)',
    tip: 'ก่อน V.3 (were ___ cited) มักเป็น Adverb ลงท้ายด้วย -ly'
  },

  // ==========================================================================
  // EXTRA BANK ACROSS ALL 5 LEVELS (เสริมความหลากหลายให้ครบทุกมิติ)
  // ==========================================================================
  {
    id: 'L1-GR-08', level: 1, cat: 'grammar', type: 'mc',
    prompt: 'My birthday is ______ October 15th.',
    choices: ['in', 'on', 'at', 'by'],
    answer: 1,
    hint: 'มีวันที่ (15th) ระบุชัดเจน',
    explain: 'แม้จะมีเดือน (October) แต่เมื่อมี "วันที่" กำกับด้วย ต้องใช้ "on" เสมอ (on October 15th)',
    tip: 'in October (ไม่มีวันที่) · on October 15th (มีวันที่)'
  },
  {
    id: 'L1-CV-04', level: 1, cat: 'conv', type: 'mc',
    prompt: 'A: "What does your father do?"<br>B: "______"',
    choices: [
      'He is watching TV now.',
      'He is an architect.',
      'He is very tall and kind.',
      'He likes playing golf.'
    ],
    answer: 1,
    hint: '"What does ... do?" เป็นคำถามเกี่ยวกับอาชีพ',
    explain: 'คำถาม "What do/does + S + do?" ใช้ถามอาชีพ จึงตอบด้วยอาชีพ "He is an architect."',
    tip: 'What does he do? (ถามอาชีพ) ≠ What is he doing? (ถามว่ากำลังทำอะไร)'
  },
  {
    id: 'L2-GR-06', level: 2, cat: 'grammar', type: 'mc',
    prompt: 'This is the ______ movie I have ever seen!',
    choices: ['exciting', 'more exciting', 'most exciting', 'most excited'],
    answer: 2,
    hint: 'มี "the" + "I have ever seen" (ขั้นสูงสุด) และขยายสิ่งของ (movie)',
    explain: 'Superlative (ขั้นสูงสุด) ของคำ 3 พยางค์ ใช้ "the most + Adj." และสิ่งที่น่าตื่นเต้นใช้ -ing (exciting) ไม่ใช่ -ed (excited)',
    tip: 'สิ่งของน่า... เติม -ing (exciting) · คนรู้สึก... เติม -ed (excited)'
  },
  {
    id: 'L2-ER-02', level: 2, cat: 'error', type: 'fill',
    prompt: 'แก้คำที่ผิดในประโยคให้ถูกต้อง (พิมพ์เฉพาะคำที่แก้):<br>She enjoys <u class="err">to listen</u> to classical music in the evening.',
    answers: ['listening'],
    hint: 'enjoy + V.ing',
    explain: 'กริยา enjoy ต้องตามด้วย Gerund (V.ing) เสมอ → listening',
    tip: 'enjoy + V.ing ห้ามใช้ to V.inf เด็ดขาด'
  },
  {
    id: 'L3-GR-06', level: 3, cat: 'grammar', type: 'mc',
    prompt: 'By the time we arrived at the theater, the movie ______.',
    choices: ['already started', 'has already started', 'had already started', 'was starting'],
    answer: 2,
    hint: '2 เหตุการณ์ในอดีต: หนังเริ่ม "ก่อน" ที่เราจะไปถึง',
    explain: 'เหตุการณ์ที่เกิดก่อนในอดีตใช้ Past Perfect (had + V.3) ส่วนเหตุการณ์ที่เกิดทีหลังใช้ Past Simple (arrived)',
    tip: 'By the time + V.2 , Past Perfect (had + V.3)'
  },
  {
    id: 'L3-CV-02', level: 3, cat: 'conv', type: 'mc',
    prompt: 'A: "Do you think we can finish this presentation by 5 p.m.?"<br>B: "______ If we split the slides, we might just make it."',
    choices: [
      'It\'s a piece of cake.',
      'It\'s going to be a close call.',
      'Over my dead body.',
      'You\'re barking up the wrong tree.'
    ],
    answer: 1,
    hint: '"we might just make it" = อาจจะทันแบบฉิวเฉียด',
    explain: 'a close call = ฉิวเฉียด/เกือบไม่รอด สอดคล้องกับ "might just make it" (อาจจะทันพอดี)',
    tip: 'a close call / a close shave = รอดหรือทันแบบหวุดหวิด'
  },
  {
    id: 'L4-GR-04', level: 4, cat: 'grammar', type: 'mc',
    prompt: 'The more you practice speaking, ______ you will become.',
    choices: ['the more confident', 'more confident', 'the most confident', 'confident'],
    answer: 0,
    hint: 'โครงสร้างคู่ขนาน "ยิ่ง... ยิ่ง..." (Double Comparative)',
    explain: 'Double Comparative: The + ขั้นกว่า ..., the + ขั้นกว่า ... → "The more..., the more confident..."',
    tip: 'The + comparative..., the + comparative... (ต้องมี "the" นำหน้าทั้งสองฝั่ง!)'
  },
  {
    id: 'L4-VB-03', level: 4, cat: 'vocab', type: 'fill',
    prompt: 'ผันรูปคำในวงเล็บให้ถูกต้อง:<br>Regular exercise has a ______ (benefit) effect on mental health.',
    answers: ['beneficial'],
    hint: 'ขยายคำนาม "effect" → ต้องใช้ Adjective',
    explain: 'benefit (n./v.) → beneficial (adj. ที่เป็นประโยชน์) ขยายคำนาม effect',
    tip: 'ลงท้าย -ial / -al / -ous / -ive มักเป็น Adjective'
  },
  {
    id: 'L5-RD-02', level: 5, cat: 'reading', type: 'mc',
    passage: 'While popular media often portrays "digital natives" as inherently tech-savvy, educational researchers caution against conflating familiarity with fluency. Knowing how to navigate social media apps does not automatically translate into the ability to evaluate source credibility or synthesize complex digital information.',
    prompt: 'What distinction does the author draw between "familiarity" and "fluency"?',
    choices: [
      'Familiarity refers to older generations, while fluency refers to teenagers.',
      'Casual use of apps does not equal critical digital literacy.',
      'Fluency is easier to acquire than familiarity.',
      'Digital natives possess both familiarity and fluency naturally.'
    ],
    answer: 1,
    hint: 'ดูประโยคที่ 2: การใช้แอปเป็น ไม่ได้แปลว่าประเมินความน่าเชื่อถือของแหล่งข้อมูลเป็น',
    explain: 'ผู้เขียนแยกความแตกต่างว่า ความคุ้นเคยในการใช้โซเชียลมีเดีย (familiarity) ไม่ใช่สิ่งเดียวกับความเชี่ยวชาญในการวิเคราะห์และประเมินข้อมูลดิจิทัลอย่างมีวิจารณญาณ (fluency)',
    tip: 'conflate A with B = เหมารวม A ว่าเป็น B (มักเจอในบทความวิพากษ์)'
  },
  {
    id: 'L5-WR-03', level: 5, cat: 'writing', type: 'rewrite',
    prompt: 'แปลงประโยค Conditional Type 3 ต่อไปนี้เป็นรูปแบบ <b>Inversion (ละ If)</b>:<br><b>"If they had checked the data, they would have noticed the error."</b>',
    answers: [
      'Had they checked the data, they would have noticed the error.',
      'Had they checked the data, they would have noticed the error'
    ],
    hint: 'ตัด If ออก แล้วนำ "Had" มาวางหน้าประธาน',
    explain: 'Inversion of Type 3: Had + S + V.3, S + would have + V.3 → "Had they checked the data, they would have noticed the error."',
    tip: 'Had + S + V.3 เป็นรูป Inversion ที่กระชับและได้คะแนนสูงในการเขียนระดับ C1–C2'
  }
];
