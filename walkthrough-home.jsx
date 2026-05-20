// walkthrough-home.jsx
// Home module Design Walkthrough (Manager persona).
//
// RETROFIT PATTERN (static page + rotating spotlight):
//   homePageMockup() renders the entire Home page (4 stacked rows that
//   mirror prod-home.jsx) and is reused as the same background across
//   all 4 frames. Each frame keeps that context fixed and only moves
//   the spotlight (dim mask + dashed outline) to a different row,
//   pairing it with rationale annotations that answer "ทำไมเราดีไซน์
//   แบบนี้" — not "what it is".
//
// Frames (first-touch arc — same as before, new visualisation):
//   01 แรกเข้า       — Greeting hero + Today's attendance pulse
//   02 รับข้อมูล     — Organisational Updates tiles
//   03 ลงมือทำ      — Leave approvals + Pending documents
//   04 เชื่อมสัมพันธ์ — Announcements feed + Birthday card

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ── Row 1 · Hero greeting + Today's pulse ─────────────────────────────
function Row1HeroToday() {
  return (
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
}

// ── Row 2 · Organisational Updates ────────────────────────────────────
function Row2OrgUpdates() {
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

  return (
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
}

// ── Row 3 · Approvals + Pending docs ──────────────────────────────────
function Row3Approvals() {
  const approvals = [
    { i: 'MK', c: WALK.accent, n: 'มาร์คัส เคลลี่',  t: 'ลาพักร้อน 5 วัน', w: '28 เม.ย. – 2 พ.ค.', d: 'ยื่นเมื่อวาน' },
    { i: 'PS', c: WALK.butter, n: 'พริยะ ชาห์',      t: 'ลาป่วย 1 วัน',    w: 'พรุ่งนี้',         d: '1 ชม.ก่อน' },
  ];
  const docs = [
    { t: 'แบบฟอร์ม PND91 ปี 2567', s: 'ภาษีเงินได้ประจำปี · กรอกรายได้', near: true },
    { t: 'เอกสารยืนยันที่อยู่',     s: 'ตรงตามทะเบียนบ้าน · รูปถ่าย',  near: false },
    { t: 'กองทุนสำรองเลี้ยงชีพ',    s: 'เลือกสัดส่วนเงินสมทบ',         near: false },
  ];

  return (
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
}

// ── Row 4 · Announcements + Birthday ──────────────────────────────────
function Row4Community() {
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

  return (
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
}

// ── Shared full-page mockup ───────────────────────────────────────────
// Stacks all 4 rows like the real prod-home.jsx. The spotlight pattern
// dims everything except the focused row, so viewers always see the
// spatial relationship between sections — answering "where does Approvals
// sit relative to Greeting?" without needing 4 different mockups.
function homePageMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Row1HeroToday/>
      <Row2OrgUpdates/>
      <Row3Approvals/>
      <Row4Community/>
    </div>
  );
}

// ── Row Y-offsets within the mockup column (frame-space) ──────────────
// Mockup starts at y = WALK.BODY_TOP. Each row consumes its minHeight +
// the 18px gap. Numbers measured against the rendered layout; tweak if
// minHeights change. (Comment-out tip: ใช้ Playwright วัดเมื่อ visual
// drift เกิด — ดู PR #3 callout drift fix.)
const ROWS = {
  row1: { y: WALK.BODY_TOP - 4,    h: 250 },  // Hero + Today
  row2: { y: WALK.BODY_TOP + 264,  h: 310 },  // Org updates
  row3: { y: WALK.BODY_TOP + 590,  h: 296 },  // Approvals + docs
  row4: { y: WALK.BODY_TOP + 902,  h: 396 },  // Announcements + Birthday
};
const SPOTX = WALK.MOCKUP_X - 4;     // shared left edge
const SPOTW = WALK.MOCKUP_W + 8;     // bleed slightly past mockup edges

// Frame height accommodates 4 stacked rows + padding.
const HOME_FRAME_H = 1380;

const COMMON = {
  totalSteps: 4,
  persona: 'Manager · คุณจงรักษ์',
  frameHeight: HOME_FRAME_H,
};

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · แรกเข้า — Greeting hero + Today's pulse
// ═══════════════════════════════════════════════════════════════════
function HomeWalk1() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={1}
      title="แรกเข้า · ทักทายแล้ว surface งานเร่งด่วน"
      narrative="เปิด Humi ตอนเช้า Home ต้องตอบ 2 คำถามภายใน 3 วินาที — 'ฉันคือใคร วันนี้คือวันอะไร' และ 'มีอะไรต้องทำ'. Hero ทักทาย time-aware + summary; Today ring + breakdown ให้ pulse ขององค์กรในแว้บเดียว"
      mockup={homePageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: ROWS.row1.y, w: SPOTW, h: ROWS.row1.h, color: WALK.accent },
      ]}
      annotations={[
        { num: 1, title: 'Greeting + Today vs ตาราง full attendance',
          body: 'ทำไมไม่ใส่ตารางลงเวลาแบบ SAP? เพราะ Manager ที่เปิด Home ตอนเช้า ต้องการ "พอใจ scan ได้ใน 3 วิ" ก่อน decide. Ring 78% + 193/247 ตอบคำถามนี้แทน table; CTA "ตรวจคำขอลา" surface งานเร่งด่วนทันที. Hierarchy ของ greeting + pulse คือ "เพื่อจะรู้ว่ามีอะไรต้องทำ ต้องรู้ก่อนว่าวันนี้องค์กรเป็นยังไง"',
          color: WALK.accent },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · รับข้อมูล — Organisational Updates
// ═══════════════════════════════════════════════════════════════════
function HomeWalk2() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={2}
      title="รับข้อมูล · ลิงก์องค์กรในที่เดียว"
      narrative="ก่อนเริ่มงาน Manager มักต้องเช็คข่าวสาร/ลิงก์จากสำนักงานใหญ่ — เอา shortcut ของ Central Retail intranet มาวางที่ Home แทนการบังคับเปิดหน้าใหม่"
      mockup={homePageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: ROWS.row2.y, w: SPOTW, h: ROWS.row2.h, color: WALK.indigo },
      ]}
      annotations={[
        { num: 1, title: 'Tiles 4-col grid + filter pills (All/News/Quick)',
          body: 'ทำไมไม่เป็น dropdown menu? เพราะ "ลิงก์องค์กร" คือ destination ที่ open frequency สูง — ถ้าซ่อนใน dropdown จะ buried คลิก 2 ครั้ง. เป็น tile grid โชว์ทั้งหมด + filter pill มี count (All 12 / News 3 / Quick link 9) ให้รู้ปริมาณก่อนคลิก. แต่ละ tile cycle 5 brand duotone (teal · coral · butter · sage · ink) เพื่อ visual distinction; "ใหม่" badge teal เน้น content ใหม่',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ลงมือทำ — Approvals + Pending docs
// ═══════════════════════════════════════════════════════════════════
function HomeWalk3() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={3}
      title="ลงมือทำ · งานเร่งด่วนใน 1 คลิก"
      narrative="Manager เห็นงานที่ต้องทำ (อนุมัติลา + เอกสารค้าง) จาก Home โดยตรง — approve/reject inline ไม่ต้องเข้าหน้า approval แยก; เอกสารส่วนตัวปักธง 'ใกล้ครบกำหนด' เป็น urgency cue"
      mockup={homePageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: ROWS.row3.y, w: SPOTW, h: ROWS.row3.h, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Inline approve · ghost reject · butter "ใกล้ครบกำหนด"',
          body: 'ทำไม approve/reject อยู่ในแถวแทนที่จะลึก 1 click? เพราะการที่ Manager ต้อง "เข้าหน้า detail" ทุกครั้งทำให้ยอม batch approve โดยไม่ดู context — เสี่ยง err. ใส่ทุกข้อมูลจำเป็นในแถวเดียว (avatar · ชื่อ · ประเภท · ระยะ · timestamp · ปุ่ม). "ปฏิเสธ" ใช้ ghost button ไม่ใช่ red solid ลด aggressive tone; "ใกล้ครบกำหนด" ใช้ butter (warm) แทน red — เตือนแต่ไม่ panic เพราะ PND91 เป็น recurring deadline',
          color: WALK.coral },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · เชื่อมสัมพันธ์ — Announcements + Birthday
// ═══════════════════════════════════════════════════════════════════
function HomeWalk4() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={4}
      title="เชื่อมสัมพันธ์ · Humi ไม่ใช่แค่ admin tool"
      narrative="Announcement feed + Birthday widget ทำให้ Home รู้สึก 'อบอุ่น' ตามหลัก Humi (warm · Thai-first · human) แยกจาก SAP SuccessFactors เดิมที่เป็น admin tool ล้วน — culture surface ก่อน workflow"
      mockup={homePageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: ROWS.row4.y, w: SPOTW, h: ROWS.row4.h, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'Pinned post · emoji reactions · dark Birthday card',
          body: 'ทำไม Home ของ HR ต้องมี emoji + Birthday? เพราะ Humi positioning คือ "warm · Thai-first" — ตัด tone "ระบบ admin" ที่ทำให้พนักงานรู้สึกห่าง. Pinned post ใช้ creamSoft + butter border เด่นจาก feed; ❤️ 42 · 🎉 21 แทน Like button = ภาษาเพื่อนร่วมงาน. Birthday card ใช้ ink dark background ตัดกับทุก card บนหน้านี้ — เปลี่ยน mood จาก "งาน" เป็น "ฉลอง" โดย primary button teal คงเดิมเพื่อ invariant ของ design system',
          color: WALK.butter },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { HomeWalk1, HomeWalk2, HomeWalk3, HomeWalk4 });
