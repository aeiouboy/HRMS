// walkthrough-home.jsx
// Home module Design Walkthrough (Manager persona).
// 4 frames following the first-touch arc:
//   01 แรกเข้า       — Greeting hero + Today's attendance pulse
//   02 รับข้อมูล     — Organisational Updates tiles
//   03 ลงมือทำ      — Leave approvals + Pending documents
//   04 เชื่อมสัมพันธ์ — Announcements feed + Birthday card
//
// Each mockup is an inline-style replica of the corresponding Row in
// prod-home.jsx (kept inline so this overview is robust against
// changes in the live mockup file).

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · แรกเข้า — Greeting + Today's pulse
// ═══════════════════════════════════════════════════════════════════
function HomeWalk1() {
  const mockup = (
    <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1.35fr 1fr' }}>
      {/* Hero greeting card */}
      <div style={{ ...walkStyles.card(false), paddingRight: 90, minHeight: 240 }}>
        <div style={{
          position: 'absolute', width: 130, height: 150, right: -30, top: -30,
          background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
          opacity: 0.7,
        }}/>
        <div style={{
          position: 'absolute', width: 80, height: 100, right: 50, bottom: -20,
          background: `radial-gradient(circle, ${WALK.coral} 0%, transparent 70%)`,
          opacity: 0.6,
        }}/>
        <div style={{
          position: 'absolute', width: 40, height: 50, right: 105, top: 70,
          background: `radial-gradient(circle, ${WALK.butter} 0%, transparent 70%)`,
          opacity: 0.85,
        }}/>

        <div style={walkStyles.eyebrow}>วันอังคาร · 21 เมษายน 2568</div>
        <h1 style={{
          margin: '10px 0 0',
          fontFamily: WALK.fontDisplay,
          fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em',
          color: WALK.ink, maxWidth: 360,
        }}>
          สวัสดีตอนเช้า คุณจงรักษ์
          <span style={{ display: 'block', color: WALK.inkSoft, fontSize: 17, fontWeight: 400, marginTop: 4 }}>
            มีคำขอ 2 รายการรอคุณวันนี้
          </span>
        </h1>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
          <button style={walkStyles.btnPrimary}>✓ ตรวจคำขอลา</button>
          <button style={walkStyles.btnGhost}>📢 ดูประกาศ</button>
        </div>
      </div>

      {/* Today's pulse card */}
      <div style={{ ...walkStyles.card(false), minHeight: 240 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div>
            <div style={walkStyles.eyebrow}>วันนี้</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 18 }}>การมาทำงาน · 247 คน</h3>
          </div>
          <span style={{ marginLeft: 'auto' }}>
            <WalkTag bg={WALK.accent}>● สด</WalkTag>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 18, marginTop: 16, alignItems: 'center' }}>
          <div style={{
            width: 92, height: 92, borderRadius: '50%',
            background: `conic-gradient(${WALK.accent} 0% 78%, ${WALK.hairlineSoft} 78% 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              width: 70, height: 70, borderRadius: '50%', background: WALK.surface,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: WALK.fontDisplay,
                fontSize: 22, fontWeight: 700, color: WALK.ink, lineHeight: 1,
              }}>193</div>
              <div style={{
                fontSize: 9, letterSpacing: '.1em', color: WALK.inkMuted,
                textTransform: 'uppercase', marginTop: 3,
              }}>ทำงาน</div>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { l: 'เข้างาน', v: 193, c: WALK.accent },
              { l: 'ลางาน',   v:  32, c: WALK.warning },
              { l: 'นอกกะ',   v:  22, c: WALK.hairline },
            ].map(r => (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: r.c }}/>
                  <span style={{ fontSize: 12.5, color: WALK.inkSoft }}>{r.l}</span>
                </div>
                <b style={{ fontSize: 13.5, fontVariantNumeric: 'tabular-nums' }}>{r.v}</b>
              </div>
            ))}
          </div>
        </div>

        <div style={walkStyles.divider}/>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['TS','RP','JC','MK','AP'].map((s, idx) => (
            <span key={s} style={{ marginLeft: idx === 0 ? 0 : -6 }}>
              <WalkAvatar initials={s} size={28}
                          color={[WALK.accent, WALK.sage, WALK.butter, WALK.ink, WALK.accent][idx]}
                          border={WALK.surface}/>
            </span>
          ))}
          <span style={{ fontSize: 12.5, color: WALK.inkMuted, marginLeft: 10 }}>+188 คนทำงานอยู่</span>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="แรกเข้า · ทักทายแล้ว surface งานเร่งด่วน"
      narrative="เปิด Humi ตอนเช้า Home ต้องตอบ 2 คำถามภายใน 3 วินาที — 'ฉันคือใคร วันนี้คือวันอะไร' และ 'มีอะไรต้องทำ' Hero ทักทายแบบ time-aware + summary คำขอ; Today card ให้ pulse องค์กรในรูป ring + breakdown"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 12,  y: WALK.BODY_TOP + 8,   w: 365, h: 110 },
        { num: 2, x: WALK.MOCKUP_X + 12,  y: WALK.BODY_TOP + 132, w: 280, h: 50  },
        { num: 3, x: WALK.MOCKUP_X + 528, y: WALK.BODY_TOP + 50,  w: 340, h: 130 },
        { num: 4, x: WALK.MOCKUP_X + 528, y: WALK.BODY_TOP + 198, w: 340, h: 48  },
      ]}
      annotations={[
        { num: 1, title: 'Greeting แบบ time-aware',
          body: 'สวัสดี + ชื่อจริง + วันที่ภาษาไทย (พ.ศ.) ในทันทีที่เปิด — ลด cognitive load ก่อนเริ่มงาน และยืนยัน identity ว่า login ถูก persona' },
        { num: 2, title: 'Primary + Secondary action',
          body: 'Teal solid = action ที่ต้องทำตอนนี้ (ตรวจคำขอลา 2 รายการ) · Ghost = exploration (ดูประกาศ) — แยกชัดด้วย hierarchy ของสีและ weight' },
        { num: 3, title: 'Pulse ring 78% + breakdown',
          body: 'ring chart conic-gradient อ่านได้แว้บเดียว (193/247 ทำงาน) แทน table; breakdown ให้ context (ลา 32, นอกกะ 22) ใช้ warm token แทน red/green' },
        { num: 4, title: 'Avatar stack = humanise number',
          body: '+188 คนทำงานอยู่ ไม่ใช่แค่ตัวเลข — เห็นคน 5 หน้ามาก่อน ช่วยสร้างความรู้สึก team awareness ตามหลัก Humi warm-Thai-first' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · รับข้อมูล — Organisational Updates
// ═══════════════════════════════════════════════════════════════════
function HomeWalk2() {
  const BRAND_PALETTES = [
    [WALK.accent,  '#D6EEEC'],
    [WALK.coral,   WALK.coralSoft],
    [WALK.butter,  WALK.butterSoft],
    [WALK.sage,    WALK.sageSoft],
    [WALK.ink,     '#5F7689'],
  ];
  const tiles = [
    { l: 'People Portal',           badge: null },
    { l: 'CNEXT | LINE',            badge: 'ใหม่' },
    { l: 'AI Academy',              badge: null },
    { l: 'User Manual',             badge: null },
    { l: 'สมัครกองทุนสำรอง',         badge: null },
    { l: 'Download documents',      badge: null },
    { l: 'Mobile (TAM)',            badge: null },
    { l: 'Tax Deduction',           badge: null },
  ].map((t, i) => ({ ...t, palette: BRAND_PALETTES[i % BRAND_PALETTES.length] }));

  const mockup = (
    <div style={{ ...walkStyles.card(true), padding: '20px 22px' }}>
      <div style={{
        position: 'absolute', width: 100, height: 130, right: -30, top: -40,
        background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
        opacity: 0.4,
      }}/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, position: 'relative' }}>
        <div>
          <div style={walkStyles.eyebrow}>ลิงก์องค์กร · Central Retail</div>
          <h3 style={walkStyles.h3Display}>Organisational Updates</h3>
        </div>
        <div style={{ flex: 1 }}/>
        {[
          { l: 'All (12)',         on: true  },
          { l: 'News (3)',         on: false },
          { l: 'Quick link (9)',   on: false },
        ].map(t => (
          <span key={t.l} style={{
            padding: '5px 12px', borderRadius: 999,
            fontSize: 11.5, fontWeight: 600,
            background: t.on ? WALK.accent : 'transparent',
            color: t.on ? '#fff' : WALK.inkSoft,
            border: `1px solid ${t.on ? WALK.accent : WALK.hairline}`,
          }}>{t.l}</span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {tiles.map(t => {
          const [c1, c2] = t.palette;
          return (
            <div key={t.l} style={{
              display: 'flex', alignItems: 'stretch',
              background: WALK.surface, borderRadius: 12,
              border: `1px solid ${WALK.hairline}`,
              overflow: 'hidden', minHeight: 78,
            }}>
              <div style={{
                width: 60, background: c2, position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRight: `1px solid ${c1}22`,
              }}>
                <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c1 }}/>
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect x="5" y="7" width="22" height="18" rx="2" stroke={c1} strokeWidth="2"/>
                  <rect x="5" y="7" width="22" height="3" fill={c1}/>
                </svg>
                {t.badge && (
                  <span style={{
                    position: 'absolute', top: 4, left: 4,
                    background: WALK.accent, color: '#fff',
                    padding: '1px 6px', borderRadius: 3,
                    fontSize: 8.5, fontWeight: 700, letterSpacing: '.06em',
                  }}>{t.badge}</span>
                )}
              </div>
              <div style={{ flex: 1, padding: '10px 12px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: WALK.ink, lineHeight: 1.3 }}>{t.l}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="รับข้อมูล · ลิงก์องค์กรในที่เดียว"
      narrative="ก่อนเริ่มงาน Manager มักต้องเช็คข่าวสาร/ลิงก์จากสำนักงานใหญ่ — เอา shortcut ของ Central Retail intranet มารวมไว้ที่ Home แทนการบังคับเปิดหน้าใหม่"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 14,  y: WALK.BODY_TOP + 14, w: 230, h: 50  },
        { num: 2, x: WALK.MOCKUP_X + 530, y: WALK.BODY_TOP + 20, w: 320, h: 36, radius: 18 },
        { num: 3, x: WALK.MOCKUP_X + 230, y: WALK.BODY_TOP + 88, w: 200, h: 84  },
        { num: 4, x: WALK.MOCKUP_X + 230, y: WALK.BODY_TOP + 92, w: 38,  h: 18, radius: 6 },
      ]}
      annotations={[
        { num: 1, title: 'Section eyebrow + title',
          body: 'Eyebrow uppercase "ลิงก์องค์กร · Central Retail" บอก scope; title display font แยก typography hierarchy จาก body — pattern เดียวกับทุก section ใน Home' },
        { num: 2, title: 'Filter pills แทน tab',
          body: 'Pill รวม count ในป้าย (All 12 / News 3 / Quick link 9) ให้รู้ปริมาณก่อนคลิก · active = solid teal, inactive = ghost — ลดการเข้าหน้าใหม่' },
        { num: 3, title: 'Tile = thumbnail + label',
          body: 'แต่ละ tile cycle 5 duotone (teal · coral · butter · sage · ink) เพื่อ visual distinction — accent stripe ซ้ายเป็น brand color, thumbnail tinted bg, label เป็น tap target' },
        { num: 4, title: '"ใหม่" badge สำหรับ surface ใหม่',
          body: 'Badge teal บน corner เน้นเนื้อหาใหม่ (CNEXT | LINE, Tax Deduction) — ใช้ teal เดียวกับ primary CTA เพื่อ consistency ระหว่าง content และ action' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ลงมือทำ — Approvals + Pending docs
// ═══════════════════════════════════════════════════════════════════
function HomeWalk3() {
  const approvals = [
    { i: 'MK', c: WALK.accent, n: 'มาร์คัส เคลลี่',  t: 'ลาพักร้อน 5 วัน', w: '28 เม.ย. – 2 พ.ค.', d: 'ยื่นเมื่อวาน' },
    { i: 'PS', c: WALK.butter, n: 'พริยะ ชาห์',      t: 'ลาป่วย 1 วัน',    w: 'พรุ่งนี้',         d: '1 ชม.ก่อน' },
  ];
  const docs = [
    { t: 'แบบฟอร์ม PND91 ปี 2567', s: 'ภาษีเงินได้ประจำปี · กรอกรายได้', near: true },
    { t: 'เอกสารยืนยันที่อยู่',     s: 'ตรงตามทะเบียนบ้าน · รูปถ่าย',  near: false },
    { t: 'กองทุนสำรองเลี้ยงชีพ',    s: 'เลือกสัดส่วนเงินสมทบ',         near: false },
  ];

  const mockup = (
    <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1.35fr 1fr' }}>
      <div style={{ ...walkStyles.card(false), minHeight: 280 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={walkStyles.eyebrow}>รออนุมัติ</div>
            <h3 style={walkStyles.h3Display}>คำขอลางาน</h3>
          </div>
          <span style={{ marginLeft: 'auto' }}><WalkTag bg={WALK.coral}>2 รายการ</WalkTag></span>
        </div>
        {approvals.map(a => (
          <div key={a.n} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0',
            borderTop: `1px solid ${WALK.hairlineSoft}`,
          }}>
            <WalkAvatar initials={a.i} color={a.c} size={36}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: WALK.ink }}>
                {a.n} <span style={{ color: WALK.inkMuted, fontWeight: 400 }}>· {a.t}</span>
              </div>
              <div style={{ fontSize: 12, color: WALK.inkMuted, marginTop: 2 }}>{a.w} · {a.d}</div>
            </div>
            <button style={{ ...walkStyles.btnGhost, padding: '5px 10px', fontSize: 12 }}>✕ ปฏิเสธ</button>
            <button style={{ ...walkStyles.btnPrimary, padding: '5px 10px', fontSize: 12 }}>✓ อนุมัติ</button>
          </div>
        ))}
      </div>

      <div style={{ ...walkStyles.card(true), minHeight: 280 }}>
        <div style={walkStyles.eyebrow}>เอกสารค้าง</div>
        <h3 style={{ ...walkStyles.h3Display, marginBottom: 12 }}>ต้องทำให้เสร็จ</h3>
        {docs.map(d => (
          <div key={d.t} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 0',
            borderTop: `1px solid ${WALK.hairlineSoft}`,
          }}>
            <div style={{
              width: 30, height: 38, borderRadius: 5,
              background: WALK.surface,
              border: `1px solid ${WALK.hairline}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: WALK.inkMuted, fontSize: 12,
            }}>📄</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: WALK.ink }}>{d.t}</div>
              <div style={{ fontSize: 11.5, color: WALK.inkMuted, marginTop: 1 }}>{d.s}</div>
            </div>
            {d.near && <WalkTag bg={WALK.butterSoft} color={WALK.ink}>ใกล้ครบกำหนด</WalkTag>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="ลงมือทำ · งานเร่งด่วนใน 1 คลิก"
      narrative="Manager เห็นงานที่ต้องทำ (อนุมัติลา + เอกสารค้าง) จาก Home โดยตรง — approve/reject inline ไม่ต้องเข้าหน้า approval แยก; เอกสารส่วนตัวปักธง 'ใกล้ครบกำหนด' เพื่อ urgency cue"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 14,  y: WALK.BODY_TOP + 70, w: 490, h: 64 },
        { num: 2, x: WALK.MOCKUP_X + 365, y: WALK.BODY_TOP + 84, w: 140, h: 36, radius: 10 },
        { num: 3, x: WALK.MOCKUP_X + 530, y: WALK.BODY_TOP + 4,  w: 340, h: 70 },
        { num: 4, x: WALK.MOCKUP_X + 770, y: WALK.BODY_TOP + 92, w: 96,  h: 22, radius: 11 },
      ]}
      annotations={[
        { num: 1, title: 'Inline approval row',
          body: 'แต่ละแถวมี: avatar · ชื่อ + ประเภทลา · ระยะเวลา · timestamp · ปุ่ม approve/reject — ทุกข้อมูลที่ต้องตัดสินใจอยู่ในแถวเดียว ไม่ต้องเข้า detail page' },
        { num: 2, title: 'Reject ใช้ ghost ไม่ใช่ red solid',
          body: 'ปุ่ม "ปฏิเสธ" ใช้ ghost (text only) ลด aggressive tone; approve เด่นกว่าด้วย teal solid เพราะเป็น expected path' },
        { num: 3, title: 'Cream card variant',
          body: 'เอกสารค้างใช้ creamSoft background แยกจาก approvals (white surface) — สื่อว่าเป็นงานส่วนตัวคนเดียว ไม่ใช่ workflow ที่ต้องตัดสินใจให้คนอื่น' },
        { num: 4, title: 'Butter tag = ใกล้ครบกำหนด',
          body: 'ใช้ butter (warm yellow) แทน red urgency — สื่อ "ระวัง" แต่ไม่ alarming; PND91 ภาษีประจำปีเป็น recurring deadline ที่เตือนแต่ไม่ panic' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · เชื่อมสัมพันธ์ — Announcements + Birthday
// ═══════════════════════════════════════════════════════════════════
function HomeWalk4() {
  const posts = [
    {
      who: 'จอร์แดน เหมย · ฝ่ายบุคคล', i: 'JM', c: WALK.sage, w: 'เมื่อวาน', pin: true,
      t: 'นโยบายลาคลอดใหม่ · เริ่มใช้ 1 พ.ค.',
      b: 'ขยายสิทธิลาคลอดเป็น 16 สัปดาห์โดยรับค่าจ้างเต็ม · เซสชันถามตอบพฤหัสบดี 15:00',
      r: ['❤️ 42', '🎉 21'],
    },
    {
      who: 'ฝ่ายปฏิบัติการ', i: 'OP', c: WALK.accent, w: '2 วันก่อน',
      t: 'ตรวจนับสินค้าฤดูใบไม้ผลิ · เสาร์ 25 เม.ย.',
      b: 'ปิดก่อนกำหนด 30 นาที · ค่าแรงตามอัตรากะ + อาหาร',
      r: ['👍 14', '🙌 6'],
    },
  ];

  const mockup = (
    <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1.35fr 1fr' }}>
      <div style={{ ...walkStyles.card(false), padding: '20px 22px', minHeight: 380 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={walkStyles.eyebrow}>ประกาศ</div>
            <h3 style={walkStyles.h3Display}>สำคัญสำหรับคุณ</h3>
          </div>
          <div style={{ flex: 1 }}/>
          <a style={{ color: WALK.accent, fontSize: 12.5, fontWeight: 600 }}>เปิดฟีด →</a>
        </div>
        {posts.map((p, idx) => (
          <article key={p.t} style={{
            padding: '14px 14px',
            margin: idx === 0 ? '0 0 12px' : '0',
            background: p.pin ? WALK.creamSoft : WALK.surface,
            border: `1px solid ${p.pin ? WALK.butterSoft : WALK.hairlineSoft}`,
            borderRadius: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <WalkAvatar initials={p.i} color={p.c} size={28}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5 }}>
                  <b>{p.who}</b>
                  <span style={{ color: WALK.inkMuted }}> · {p.w}</span>
                </div>
              </div>
              {p.pin && <WalkTag bg={WALK.ink}>📌 ปักหมุด</WalkTag>}
            </div>
            <h4 style={{
              margin: '8px 0 0',
              fontFamily: WALK.fontDisplay,
              fontSize: 16, fontWeight: 600, color: WALK.ink, letterSpacing: '-0.005em',
            }}>{p.t}</h4>
            <p style={{ margin: '6px 0 0', fontSize: 12.5, lineHeight: 1.55, color: WALK.inkSoft }}>{p.b}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              {p.r.map(x => (
                <span key={x} style={{
                  background: WALK.creamSoft, color: WALK.inkSoft,
                  padding: '3px 9px', borderRadius: 999, fontSize: 11.5,
                  border: `1px solid ${WALK.hairlineSoft}`,
                }}>{x}</span>
              ))}
              <div style={{ flex: 1 }}/>
              <button style={{ ...walkStyles.btnGhost, padding: '4px 10px', fontSize: 11.5 }}>ตอบกลับ</button>
            </div>
          </article>
        ))}
      </div>

      <div style={{ ...walkStyles.cardDark, minHeight: 200 }}>
        <div style={{
          position: 'absolute', width: 110, height: 130, right: -20, bottom: -30,
          background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
          opacity: 0.55,
        }}/>
        <div style={{ ...walkStyles.eyebrow, color: WALK.accent, position: 'relative' }}>🎉 สัปดาห์นี้</div>
        <h3 style={{
          ...walkStyles.h3Display,
          color: WALK.creamSoft, position: 'relative',
        }}>วันเกิด 2 คน · ครบรอบ 1 คน</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 14, position: 'relative' }}>
          {['TS','RP','JC'].map((s, idx) => (
            <span key={s} style={{ marginLeft: idx === 0 ? 0 : -6 }}>
              <WalkAvatar initials={s} size={32}
                          color={[WALK.accent, WALK.coral, WALK.sage][idx]}
                          border={WALK.ink}/>
            </span>
          ))}
          <div style={{ flex: 1 }}/>
          <button style={walkStyles.btnPrimary}>ส่งคำอวยพร</button>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="เชื่อมสัมพันธ์ · Humi ไม่ใช่แค่ admin tool"
      narrative="Announcement feed + Birthday widget ทำให้ Home รู้สึก 'อบอุ่น' ตามหลักการ Humi (warm · Thai-first · human) แยกจาก SAP SuccessFactors เดิมที่เป็น admin tool ล้วน — culture surface ก่อน workflow"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 14,  y: WALK.BODY_TOP + 56,  w: 490, h: 156 },
        { num: 2, x: WALK.MOCKUP_X + 28,  y: WALK.BODY_TOP + 170, w: 170, h: 30, radius: 15 },
        { num: 3, x: WALK.MOCKUP_X + 530, y: WALK.BODY_TOP,       w: 340, h: 200 },
        { num: 4, x: WALK.MOCKUP_X + 752, y: WALK.BODY_TOP + 152, w: 116, h: 36, radius: 10 },
      ]}
      annotations={[
        { num: 1, title: 'Pinned post · butter halo',
          body: 'โพสต์ปักหมุด (นโยบายลาคลอด) ใช้ creamSoft bg + butter border ให้เด่นจาก feed ปกติ; tag "📌 ปักหมุด" ink dark เพื่อ contrast สูง — scan เจอใน 1 วินาที' },
        { num: 2, title: 'Emoji reactions = ไม่ทางการ',
          body: '❤️ 42 · 🎉 21 แทน "Like" button — สื่อ tone เพื่อนร่วมงาน ไม่ใช่ corporate; reaction count แสดงให้รู้สึก community engagement' },
        { num: 3, title: 'Dark ink variant card',
          body: 'Birthday widget ใช้ ink background (#0E1B2C) ตัดกับทุก card อื่นในหน้า — เปลี่ยน mood จาก "งาน" เป็น "ฉลอง"; teal accent กลับมาเป็น text color บน dark surface' },
        { num: 4, title: '"ส่งคำอวยพร" CTA บน dark',
          body: 'Primary button teal เหมือนเดิม — invariant ของ design system: primary action สีเดียวกันไม่ว่า surface เป็น light/dark/cream; user คาดเดา interaction ได้ตลอด' },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { HomeWalk1, HomeWalk2, HomeWalk3, HomeWalk4 });
