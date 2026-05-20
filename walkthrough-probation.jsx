// walkthrough-probation.jsx
// Probation module Design Walkthrough (Manager + HR Admin personas).
// 4 frames following the manager's evaluation arc:
//   01 คัดกรอง       — Inbox triage: 4-tier urgency filter + bulk-select
//   02 เร่งด่วน       — Urgency cue: red countdown banner + tier colour coding
//   03 ประเมิน        — Detail assessment: snapshot + outcome + rating + notes
//   04 ปลายทาง       — Conditional outcome: Extend/Pass/No-pass branching fields
//
// Mockups are inline-style replicas of prod-probation.jsx (kept inline so
// this overview is robust against changes in the live mockup file).

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · คัดกรอง — Inbox triage (4-tier filter + bulk select)
// ═══════════════════════════════════════════════════════════════════
function ProbationWalk1() {
  const tiers = [
    { l: 'ทั้งหมด',       v: 4, sub: 'ในความดูแล',          tone: WALK.inkMuted, active: false },
    { l: 'เร่งด่วน',       v: 1, sub: '≤ 14 วัน',             tone: WALK.danger,   active: true  },
    { l: 'ใกล้ครบ',        v: 1, sub: '15–29 วัน',            tone: '#92400E',     active: false },
    { l: 'ทดลองปกติ',     v: 2, sub: '≥ 30 วัน',             tone: '#2F5840',     active: false },
  ];
  const rows = [
    { i: 'PT', c: WALK.accent, n: 'ปริยา ตันธีรพล',  pos: 'ผู้ช่วยร้าน · ทองหล่อ',     d: 10, tag: 'urgent' },
    { i: 'NS', c: WALK.butter, n: 'นพดล สุขสวัสดิ์',  pos: 'บาริสต้า · เอกมัย',         d: 17, tag: 'warn'   },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Tier summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {tiers.map(t => (
          <div key={t.l} style={{
            background: t.active ? WALK.creamSoft : WALK.surface,
            border: `1px solid ${t.active ? WALK.ink : WALK.hairline}`,
            borderRadius: 12, padding: '12px 14px',
          }}>
            <div style={{ ...walkStyles.eyebrow, color: t.tone }}>{t.l}</div>
            <div style={{
              fontFamily: WALK.fontDisplay,
              fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em',
              color: WALK.ink, marginTop: 2, lineHeight: 1,
            }}>{t.v}</div>
            <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 3 }}>{t.sub}</div>
          </div>
        ))}
      </div>

      {/* Bulk action bar */}
      <div style={{
        background: WALK.ink, color: '#E7E3D8',
        borderRadius: 12, padding: '11px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 16, height: 16, borderRadius: 4,
          background: WALK.accent, color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700,
        }}>✓</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>2 รายการถูกเลือก</span>
        <div style={{ flex: 1 }}/>
        <button style={{
          background: 'transparent', color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8,
          padding: '5px 11px', fontSize: 12, fontWeight: 600, fontFamily: WALK.font,
        }}>เปิดประเมินรวม</button>
        <button style={{ ...walkStyles.btnPrimary, padding: '5px 11px', fontSize: 12 }}>
          ✓ อนุมัติทั้งหมด (Pass)
        </button>
      </div>

      {/* List */}
      <div style={{ ...walkStyles.card(false), padding: 0 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '32px 2.2fr 1.4fr 1fr 110px',
          padding: '10px 16px',
          background: WALK.creamSoft,
          borderBottom: `1px solid ${WALK.hairline}`,
          fontSize: 10.5, color: WALK.inkMuted,
          textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600,
        }}>
          <span>☑</span>
          <div>พนักงาน</div>
          <div>ตำแหน่ง · สาขา</div>
          <div>ครบกำหนด</div>
          <div></div>
        </div>
        {rows.map(r => (
          <div key={r.n} style={{
            display: 'grid',
            gridTemplateColumns: '32px 2.2fr 1.4fr 1fr 110px',
            padding: '12px 16px',
            borderBottom: `1px solid ${WALK.hairlineSoft}`,
            alignItems: 'center', gap: 6,
          }}>
            <span style={{
              width: 16, height: 16, borderRadius: 4,
              background: WALK.accent, color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
            }}>✓</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <WalkAvatar initials={r.i} color={r.c} size={32}/>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{r.n}</div>
            </div>
            <div style={{ fontSize: 12, color: WALK.inkSoft }}>{r.pos}</div>
            <div style={{
              fontSize: 13, fontWeight: 600,
              color: r.tag === 'urgent' ? WALK.danger : '#92400E',
            }}>{r.d} วัน</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {r.tag === 'urgent' && (
                <span style={{
                  background: WALK.dangerSoft, color: WALK.danger,
                  border: `1px solid #FECACA`,
                  padding: '2px 8px', borderRadius: 999,
                  fontSize: 10, fontWeight: 600,
                }}>เร่งด่วน</span>
              )}
              {r.tag === 'warn' && (
                <span style={{
                  background: WALK.butterSoft, color: '#92400E',
                  padding: '2px 8px', borderRadius: 999,
                  fontSize: 10, fontWeight: 600,
                }}>ใกล้ครบ</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="คัดกรอง · 4-tier urgency เพื่อแยกเคสด่วนทันที"
      narrative="Manager ดูแลเคสทดลองงานหลายคนพร้อมกัน — Inbox ต้องบอกได้ทันทีว่า 'ใครรอด่วน' โดยไม่ต้องไล่อ่านทุกแถว ใช้ tier filter 4 ระดับ + count badge + bulk-select เพื่อ batch อนุมัติเคสปกติได้ในคลิกเดียว"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP - 4,  w: 864, h: 78  },
        { num: 2, x: WALK.MOCKUP_X + 230, y: WALK.BODY_TOP - 4,  w: 210, h: 78, color: WALK.danger },
        { num: 3, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 86, w: 864, h: 44, color: WALK.ink },
        { num: 4, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 142, w: 864, h: 156 },
      ]}
      annotations={[
        { num: 1, title: '4-tier filter พร้อม count',
          body: 'ทั้งหมด · เร่งด่วน · ใกล้ครบ · ทดลองปกติ — แต่ละ tier ตอบ "เหลือกี่วัน" ในตัวเลขใหญ่ + sub-label วันคงเหลือ scan ได้ใน 1 วินาทีก่อนเลือก filter' },
        { num: 2, title: 'Active tier = ink border + cream bg',
          body: 'ใช้ ink dark border (ไม่ใช่ accent fill) เพื่อ neutral ไม่กลบสี tier เอง · creamSoft bg แยก state จาก inactive surface white — pattern ใช้ซ้ำทุก filter tab',
          color: WALK.danger },
        { num: 3, title: 'Bulk bar สีดำลอยเหนือ list',
          body: 'ปรากฏเมื่อ checkbox ถูกเลือก ≥1 รายการ — ink solid + white text เพื่อ contrast สูง · "อนุมัติทั้งหมด (Pass)" เป็น primary action สำหรับเคสที่ผ่านชัวร์ ไม่ต้องเปิดทีละเคส',
          color: WALK.ink },
        { num: 4, title: 'Tag เร่งด่วน vs ใกล้ครบ',
          body: 'แถวเดียวบอกครบ: avatar · ชื่อ · ตำแหน่ง · วันคงเหลือ · tag · เร่งด่วน = danger soft (red), ใกล้ครบ = butter soft (yellow) — ตา manager จับ urgency ทันทีโดยไม่ต้องอ่านตัวเลข' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · เร่งด่วน — Countdown banner + tier colour coding
// ═══════════════════════════════════════════════════════════════════
function ProbationWalk2() {
  const tierLegend = [
    { l: 'เร่งด่วน',  d: '≤ 14 วัน',     bg: WALK.dangerSoft, fg: WALK.danger,  border: '#FECACA' },
    { l: 'ใกล้ครบ',  d: '15–29 วัน',    bg: WALK.butterSoft, fg: '#92400E',     border: '#FCD34D' },
    { l: 'ทดลองปกติ', d: '≥ 30 วัน',     bg: WALK.sageSoft,   fg: '#2F5840',     border: '#A8C5AD' },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Title row */}
      <div>
        <div style={walkStyles.eyebrow}>การดำเนินการ · PRB-2456</div>
        <h1 style={{
          fontFamily: WALK.fontDisplay,
          fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em',
          margin: '4px 0 0', color: WALK.ink,
        }}>ประเมินทดลองงาน · ปริยา ตันธีรพล</h1>
      </div>

      {/* Red countdown banner */}
      <div style={{
        background: WALK.dangerSoft,
        border: `1.5px solid #EF4444`,
        borderRadius: 12,
        padding: '14px 18px',
        color: WALK.danger,
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: WALK.danger, fontSize: 17, fontWeight: 700, flexShrink: 0,
        }}>!</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>ใกล้ครบกำหนด — เหลือ 10 วัน</div>
          <div style={{ fontSize: 12, marginTop: 2, color: '#9F1D1D' }}>
            กรุณาบันทึกการประเมินก่อนวันที่ 24 พ.ค. 2569 · หลังจากนั้นระบบจะ auto-pass อัตโนมัติ
          </div>
        </div>
        <span style={{
          background: WALK.danger, color: '#fff',
          padding: '6px 12px', borderRadius: 8,
          fontSize: 12, fontWeight: 600,
        }}>10 วัน</span>
      </div>

      {/* Tier legend — visual proof of three-step colour ramp */}
      <div style={{ ...walkStyles.card(true) }}>
        <div style={walkStyles.eyebrow}>ระดับเร่งด่วน · colour ramp</div>
        <h3 style={{ ...walkStyles.h3Display, fontSize: 17, marginBottom: 14 }}>
          วันคงเหลือ → สี ไม่ใช้ red/yellow/green ทั่วไป
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {tierLegend.map(t => (
            <div key={t.l} style={{
              background: t.bg, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: t.fg, color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700,
              }}>{t.l === 'เร่งด่วน' ? '!' : t.l === 'ใกล้ครบ' ? '◐' : '✓'}</div>
              <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: t.fg }}>{t.l}</div>
              <div style={{ fontSize: 11.5, color: WALK.inkSoft, marginTop: 3 }}>{t.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini list demonstrating colour code in row context */}
      <div style={{ ...walkStyles.card(false), padding: '12px 16px' }}>
        <div style={{ ...walkStyles.eyebrow, marginBottom: 8 }}>ตัวอย่างในแถวคิว</div>
        {[
          { n: 'ปริยา ต.',    d: '10 วัน', col: WALK.danger,  i: 'PT', c: WALK.accent },
          { n: 'นพดล ส.',    d: '17 วัน', col: '#92400E',     i: 'NS', c: WALK.butter },
          { n: 'กชกร พ.',   d: '41 วัน', col: '#2F5840',     i: 'KP', c: WALK.coral  },
        ].map(r => (
          <div key={r.n} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 0',
          }}>
            <WalkAvatar initials={r.i} color={r.c} size={26}/>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{r.n}</span>
            <div style={{ flex: 1 }}/>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: r.col }}>{r.d}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="เร่งด่วน · countdown banner + tier colour code"
      narrative="ทดลองงานมี hard deadline ที่ถ้าพลาดจะ auto-pass — Manager ต้องเห็น urgency ก่อนเปิดเคส; banner สีแดงด้านบนตอบ 'เหลือกี่วัน' + 'ถ้าไม่ทำจะเกิดอะไร' ในกล่องเดียว ส่วน tier colour ramp ใช้สม่ำเสมอทุกหน้า"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 64,  w: 864, h: 84,  color: WALK.danger },
        { num: 2, x: WALK.MOCKUP_X + 730, y: WALK.BODY_TOP + 86,  w: 130, h: 38,  color: WALK.danger, radius: 10 },
        { num: 3, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 158, w: 864, h: 162 },
        { num: 4, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 330, w: 864, h: 132 },
      ]}
      annotations={[
        { num: 1, title: 'Banner = danger soft + ink border',
          body: 'แทนที่จะเอา red solid (น่ากลัวเกิน) ใช้ #FEE2E2 bg + #EF4444 border + #B91C1C text — สื่อ "ต้องทำ" แต่ไม่ alarming; ไอคอน "!" ใน white circle เพื่อ contrast',
          color: WALK.danger },
        { num: 2, title: 'Countdown pill ขวาสุด',
          body: 'ตัวเลข "10 วัน" ในกล่อง red solid วางขวาสุด — eye stops here last (Z-pattern) ก่อนเริ่มอ่าน body; redundant กับ title แต่จงใจ เพื่อให้ scan แว้บก็เห็น',
          color: WALK.danger },
        { num: 3, title: '3 ระดับ ไม่ใช่ red/yellow/green',
          body: 'เร่งด่วน = danger red, ใกล้ครบ = butter (warm yellow ไม่ใช่ #FFD700), ทดลองปกติ = sage (เขียวเทาอบอุ่น) — หลีกเลี่ยง traffic-light cliché ที่ผู้พิการสี่สา (deuteranopia) แยกยาก' },
        { num: 4, title: 'Colour code ใช้ซ้ำใน row',
          body: 'ตัวเลข "10/17/41 วัน" ในคิวใช้สีเดียวกับ tier badge — ไม่ต้องอ่าน label ก็รู้ว่าเคสไหนอยู่ tier ไหน · consistency = predictability' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ประเมิน — Detail assessment (snapshot + outcome + rating)
// ═══════════════════════════════════════════════════════════════════
function ProbationWalk3() {
  const outcomes = [
    { v: 'pass',    l: 'ผ่านทดลองงาน', s: 'บรรจุเป็น Permanent',     ic: '✓', c: WALK.accent,  sel: true  },
    { v: 'extend',  l: 'ขยายเวลา',      s: 'ทดลองต่อ 30–60 วัน',       ic: '⟳', c: WALK.warning, sel: false },
    { v: 'no_pass', l: 'ไม่ผ่าน',        s: 'สิ้นสภาพหลังบันทึก',         ic: '✕', c: WALK.danger,  sel: false },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Employee snapshot — cream card */}
      <div style={{ ...walkStyles.card(true), padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <WalkAvatar initials="PT" color={WALK.accent} size={50}/>
          <div style={{ flex: 1 }}>
            <div style={walkStyles.eyebrow}>EMP-02458</div>
            <div style={{
              fontFamily: WALK.fontDisplay,
              fontSize: 18, fontWeight: 600, letterSpacing: '-0.015em',
              color: WALK.ink, marginTop: 2,
            }}>ปริยา ตันธีรพล</div>
            <div style={{ fontSize: 12.5, color: WALK.inkMuted }}>Priya Tanthiraphon</div>
          </div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
          marginTop: 14, paddingTop: 12, borderTop: `1px solid ${WALK.hairlineSoft}`,
        }}>
          {[
            ['ตำแหน่ง', 'ผู้ช่วยร้าน · ทองหล่อ'],
            ['วันเริ่มงาน', '15 ม.ค. 2569'],
            ['อายุงาน', '3 เดือน 29 วัน'],
            ['หัวหน้าโดยตรง', 'คุณจงรักษ์'],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={walkStyles.eyebrow}>{k}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 3, color: WALK.ink }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome selector — 3 cards */}
      <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
        <div style={walkStyles.eyebrow}>ขั้นที่ 1 จาก 3</div>
        <h3 style={{ ...walkStyles.h3Display, fontSize: 16, margin: '4px 0 12px' }}>
          ผลการประเมิน <span style={{ color: WALK.accent }}>*</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {outcomes.map(o => (
            <div key={o.v} style={{
              border: `1.5px solid ${o.sel ? o.c : WALK.hairline}`,
              background: o.sel ? WALK.creamSoft : WALK.surface,
              borderRadius: 12, padding: '12px 14px',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: o.sel ? o.c : WALK.creamSoft,
                  color: o.sel ? '#fff' : o.c,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700,
                }}>{o.ic}</div>
                <span style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: `1.5px solid ${o.sel ? o.c : WALK.hairline}`,
                  background: o.sel ? o.c : 'transparent',
                  display: 'inline-block',
                  boxShadow: o.sel ? `inset 0 0 0 3px #fff` : 'none',
                }}/>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{o.l}</div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted, lineHeight: 1.4 }}>{o.s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating + notes */}
      <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
        <div style={walkStyles.eyebrow}>ขั้นที่ 2 จาก 3</div>
        <h3 style={{ ...walkStyles.h3Display, fontSize: 16, margin: '4px 0 12px' }}>
          ผลการประเมินเชิงคุณภาพ
        </h3>

        {/* Rating stars */}
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontSize: 11.5, color: WALK.inkSoft, fontWeight: 600,
            marginBottom: 4,
          }}>คะแนนรวม <span style={{ color: WALK.danger }}>*</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {[1,2,3,4,5].map(n => (
              <span key={n} style={{
                fontSize: 24, lineHeight: 1,
                color: n <= 4 ? WALK.warning : WALK.hairline,
              }}>★</span>
            ))}
            <span style={{ fontSize: 12, color: WALK.inkMuted, marginLeft: 8 }}>4/5 — เกินมาตรฐาน</span>
          </div>
        </div>

        {/* Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { l: 'จุดเด่น',         v: 'ทำงานเร็ว ใส่ใจลูกค้า · ขายเข้าทีมได้ดี' },
            { l: 'จุดที่ต้องพัฒนา',  v: 'การจัดการสต็อกหลังร้าน · ต้องอบรม POS เพิ่ม' },
          ].map(f => (
            <div key={f.l}>
              <div style={{ fontSize: 11.5, color: WALK.inkSoft, fontWeight: 600, marginBottom: 3 }}>
                {f.l} <span style={{ color: WALK.danger }}>*</span>
              </div>
              <div style={{
                background: WALK.creamSoft,
                border: `1px solid ${WALK.hairline}`,
                borderRadius: 8, padding: '7px 10px',
                fontSize: 12, color: WALK.inkSoft, lineHeight: 1.5,
              }}>{f.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="ประเมิน · snapshot → outcome → quality"
      narrative="หน้าเดียวจบ 3 ขั้น: ดูว่าใคร (snapshot) → ตัดสินอะไร (outcome) → อธิบายทำไม (rating + notes) ลำดับนี้ mirror ขั้นตอนความคิดของหัวหน้างาน ไม่บังคับให้ทำตามขั้นแบบ wizard"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP - 4,   w: 864, h: 130 },
        { num: 2, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 140, w: 864, h: 140 },
        { num: 3, x: WALK.MOCKUP_X + 22,  y: WALK.BODY_TOP + 196, w: 280, h: 76, color: WALK.accent },
        { num: 4, x: WALK.MOCKUP_X + 22,  y: WALK.BODY_TOP + 332, w: 380, h: 60, color: WALK.warning },
      ]}
      annotations={[
        { num: 1, title: 'Snapshot บน cream — context first',
          body: 'ก่อนตัดสินใจ Manager ต้องเห็น "ใคร" — avatar + ชื่อ + 4 facts (ตำแหน่ง · วันเริ่มงาน · อายุงาน · หัวหน้า) cream variant สื่อว่าเป็น context ไม่ใช่ input ที่ต้องแก้' },
        { num: 2, title: 'Outcome 3 ตัวเลือก = radio card',
          body: 'ไม่ใช่ dropdown (ซ่อนทางเลือก) ไม่ใช่ button (สื่อ "ทำเลย") — radio card บังคับเลือก 1 ใน 3 พร้อม sub-line อธิบาย consequence ก่อน commit' },
        { num: 3, title: 'Selected = ink border + cream bg',
          body: 'การ์ดที่เลือกใช้ outcome color เป็น border (teal/warning/danger) + creamSoft bg — sub-radio dot ก็เปลี่ยนสีตาม; ไม่ fill ทั้งใบเพราะจะกลบ icon และ label',
          color: WALK.accent },
        { num: 4, title: 'Star rating + qualitative note',
          body: 'Star ★ ให้ 1-5 (4 = "เกินมาตรฐาน" inline label) + 2 textareas บังคับ (จุดเด่น/จุดพัฒนา) — quantitative + qualitative คู่กันเพื่อ HR review ได้ trail ครบ',
          color: WALK.warning },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ปลายทาง — Conditional outcome (Extend / Pass / No-pass)
// ═══════════════════════════════════════════════════════════════════
function ProbationWalk4() {
  const branches = [
    {
      head: 'Extend',
      headTh: 'ขยายเวลา',
      color: WALK.warning,
      bg: '#FFFBEB',
      border: '#FCD34D',
      icon: '⟳',
      desc: 'ต้องระบุเส้นตายใหม่ + ระยะ',
      fields: [
        { l: 'ขยายถึงวันที่',  v: '25 มิ.ย. 2569', hint: 'ต้องไม่เกิน +119 วัน', type: 'date' },
        { l: 'ระยะเวลา',      v: '45 วัน',         hint: 'เลือกจาก 30/45/60',  type: 'select' },
      ],
    },
    {
      head: 'Pass',
      headTh: 'ผ่านทดลองงาน',
      color: WALK.accent,
      bg: '#F0FBFA',
      border: WALK.accent,
      icon: '✓',
      desc: 'ต้องระบุวันบรรจุ + Allowance ส่ง Payroll',
      fields: [
        { l: 'วันที่บรรจุ (effective)', v: '15 พ.ค. 2569', hint: 'ส่ง EC + Payroll', type: 'date' },
        { l: 'Allowance (ถ้ามี)',     v: '2,500 บาท',     hint: 'auto → Payroll',  type: 'number' },
      ],
    },
    {
      head: 'No-pass',
      headTh: 'ไม่ผ่าน',
      color: WALK.danger,
      bg: '#FEF2F2',
      border: '#FECACA',
      icon: '✕',
      desc: 'ต้องระบุเหตุผล + วันที่สิ้นสภาพ',
      fields: [
        { l: 'เหตุผลการสิ้นสภาพ', v: 'ขาดทักษะ POS · เกิน 3 ครั้ง', hint: 'ส่งให้กฎหมายตรวจ', type: 'select' },
        { l: 'วันสิ้นสภาพ',       v: '31 พ.ค. 2569',                hint: '+1 รอบ Payroll',   type: 'date' },
      ],
    },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <div style={walkStyles.eyebrow}>ขั้นที่ 1 จาก 3 · สาขาตามผลการประเมิน</div>
        <h3 style={{ ...walkStyles.h3Display, fontSize: 17, margin: '3px 0 0' }}>
          Conditional fields · ฟอร์มเปลี่ยนตาม outcome
        </h3>
      </div>

      {branches.map(b => (
        <div key={b.head} style={{
          background: b.bg, border: `1.5px solid ${b.border}`,
          borderRadius: 12, padding: '12px 14px',
          display: 'flex', gap: 14, alignItems: 'stretch',
        }}>
          {/* Branch tag */}
          <div style={{
            width: 110, flexShrink: 0,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: b.color, color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700,
            }}>{b.icon}</div>
            <div style={{
              fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase',
              color: b.color, fontWeight: 700, marginTop: 4,
            }}>{b.head}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: WALK.ink }}>{b.headTh}</div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, lineHeight: 1.45 }}>{b.desc}</div>
          </div>

          {/* Fields */}
          <div style={{
            flex: 1,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            alignItems: 'flex-start',
          }}>
            {b.fields.map(f => (
              <div key={f.l}>
                <div style={{
                  fontSize: 10.5, color: WALK.inkSoft, fontWeight: 600,
                  marginBottom: 3,
                }}>
                  {f.l} <span style={{ color: b.color }}>*</span>
                </div>
                <div style={{
                  background: WALK.surface,
                  border: `1px solid ${WALK.hairline}`,
                  borderRadius: 8, padding: '7px 10px',
                  fontSize: 12.5, fontWeight: 600, color: WALK.ink,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span>{f.v}</span>
                  <span style={{ color: WALK.inkFaint, fontSize: 11 }}>
                    {f.type === 'date' ? '📅' : f.type === 'select' ? '▾' : '#'}
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 3 }}>{f.hint}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer CTA preview */}
      <div style={{
        marginTop: 4,
        background: WALK.surface,
        border: `1px solid ${WALK.hairline}`,
        borderRadius: 10,
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 11.5, color: WALK.inkMuted }}>
          บันทึกร่างอัตโนมัติ · 14:32 · กรอก 9 จาก 12 ช่อง
        </span>
        <div style={{ flex: 1 }}/>
        <button style={{ ...walkStyles.btnGhost, padding: '5px 11px', fontSize: 12 }}>ยกเลิก</button>
        <button style={{ ...walkStyles.btnPrimary, padding: '5px 11px', fontSize: 12 }}>
          ✓ อนุมัติและส่งให้ HR Admin
        </button>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HR Admin · จอร์แดน เหมย"
      title="ปลายทาง · ฟอร์มแตกตาม outcome"
      narrative="3 outcome → 3 ชุดข้อมูลที่ต่างกันโดยสิ้นเชิง (ไม่ใช่ปุ่ม submit เดียวกัน): Extend ต้องการเส้นตายใหม่, Pass ต้องการวันบรรจุ + allowance ส่ง Payroll, No-pass ต้องการเหตุผลกฎหมาย · ระบบสาขาฟอร์มแทนที่จะแสดงทุก field พร้อมกัน"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 50,  w: 864, h: 124, color: WALK.warning },
        { num: 2, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 184, w: 864, h: 124, color: WALK.accent },
        { num: 3, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 318, w: 864, h: 124, color: WALK.danger },
        { num: 4, x: WALK.MOCKUP_X + 530, y: WALK.BODY_TOP + 458, w: 340, h: 42,  radius: 10 },
      ]}
      annotations={[
        { num: 1, title: 'Extend = date picker + ระยะ',
          body: 'ขยายเวลาต้องระบุเส้นตายใหม่ (date) + ระยะ (30/45/60 select); butter tinted bg + warning border สื่อ "ใส่ใจ ไม่ใช่ฉลอง" — กฎ "ไม่เกิน 119 วัน" เป็น hint ใต้ field',
          color: WALK.warning },
        { num: 2, title: 'Pass = วันบรรจุ + Allowance',
          body: 'ผ่านทดลองงานต้องส่งข้อมูลให้ Payroll ทันที — วันบรรจุ effective + Allowance number; teal bg fade สื่อความสำเร็จ; hint "auto → Payroll" บอก downstream effect',
          color: WALK.accent },
        { num: 3, title: 'No-pass = เหตุผล + วันสิ้นสภาพ',
          body: 'ฟอร์ม sensitive ที่สุด — เหตุผลเป็น select ไม่ใช่ free text เพื่อให้กฎหมายตรวจง่าย; วันสิ้นสภาพต้อง +1 รอบ Payroll ตามกฎหมายแรงงาน (hint บอกไว้)',
          color: WALK.danger },
        { num: 4, title: 'Submit ไป HR Admin ไม่ใช่ Payroll',
          body: 'CTA "อนุมัติและส่งให้ HR Admin" — manager ไม่ commit Payroll โดยตรง · approval chain 3 ขั้น (Manager → HR Admin → Payroll) ปกป้องไม่ให้ผิดพลาดส่งเงินผิดคน' },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { ProbationWalk1, ProbationWalk2, ProbationWalk3, ProbationWalk4 });
