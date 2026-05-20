// walkthrough-probation.jsx
// Probation module Design Walkthrough (Manager + HR Admin personas).
//
// RETROFIT PATTERN (static page + rotating spotlight):
//   probationPageMockup() renders the entire ProbationApprove page in
//   one shot — tier filter strip + bulk action bar + inbox list +
//   urgency banner + employee snapshot + outcome selector + rating/notes
//   + conditional branch grid. The same page is reused as the static
//   background of every frame; the spotlight rotates between regions.
//
// Frames (the manager's evaluation arc):
//   01 คัดกรอง       — Inbox triage: 4-tier filter + bulk-select bar
//   02 เร่งด่วน       — Urgency cue: countdown banner + tier colour ramp
//   03 ประเมิน        — Detail assessment: snapshot → outcome → rating
//   04 ปลายทาง       — Conditional outcome: Extend/Pass/No-pass branches

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ── Row 1 · Tier filter cards ─────────────────────────────────────────
function RowTierFilter() {
  const tiers = [
    { l: 'ทั้งหมด',    v: 4, sub: 'ในความดูแล', tone: WALK.inkMuted, active: false },
    { l: 'เร่งด่วน',    v: 1, sub: '≤ 14 วัน',    tone: WALK.danger,   active: true  },
    { l: 'ใกล้ครบ',    v: 1, sub: '15–29 วัน',   tone: '#92400E',     active: false },
    { l: 'ทดลองปกติ', v: 2, sub: '≥ 30 วัน',     tone: '#2F5840',     active: false },
  ];
  return (
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
  );
}

// ── Row 2 · Bulk-action bar + inbox list ──────────────────────────────
function RowInboxList() {
  const rows = [
    { i: 'PT', c: WALK.accent, n: 'ปริยา ตันธีรพล',  pos: 'ผู้ช่วยร้าน · ทองหล่อ', d: 10, tag: 'urgent' },
    { i: 'NS', c: WALK.butter, n: 'นพดล สุขสวัสดิ์',  pos: 'บาริสต้า · เอกมัย',     d: 17, tag: 'warn'   },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
}

// ── Row 3 · Urgency countdown banner ──────────────────────────────────
function RowUrgencyBanner() {
  return (
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
        <div style={{ fontSize: 14, fontWeight: 600 }}>ปริยา ตันธีรพล · ใกล้ครบกำหนด — เหลือ 10 วัน</div>
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
  );
}

// ── Row 4 · Employee snapshot ─────────────────────────────────────────
function RowSnapshot() {
  return (
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
  );
}

// ── Row 5 · Outcome selector + rating/notes ───────────────────────────
function RowAssessment() {
  const outcomes = [
    { v: 'pass',    l: 'ผ่านทดลองงาน', s: 'บรรจุเป็น Permanent',     ic: '✓', c: WALK.accent,  sel: true  },
    { v: 'extend',  l: 'ขยายเวลา',      s: 'ทดลองต่อ 30–60 วัน',       ic: '⟳', c: WALK.warning, sel: false },
    { v: 'no_pass', l: 'ไม่ผ่าน',        s: 'สิ้นสภาพหลังบันทึก',         ic: '✕', c: WALK.danger,  sel: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
}

// ── Row 6 · Conditional outcome branches (Extend/Pass/No-pass) ────────
function RowBranches() {
  const branches = [
    {
      head: 'Extend', headTh: 'ขยายเวลา',
      color: WALK.warning, bg: '#FFFBEB', border: '#FCD34D', icon: '⟳',
      desc: 'ต้องระบุเส้นตายใหม่ + ระยะ',
      fields: [
        { l: 'ขยายถึงวันที่', v: '25 มิ.ย. 2569', hint: 'ต้องไม่เกิน +119 วัน', type: 'date' },
        { l: 'ระยะเวลา',     v: '45 วัน',         hint: 'เลือกจาก 30/45/60',  type: 'select' },
      ],
    },
    {
      head: 'Pass', headTh: 'ผ่านทดลองงาน',
      color: WALK.accent, bg: '#F0FBFA', border: WALK.accent, icon: '✓',
      desc: 'ต้องระบุวันบรรจุ + Allowance ส่ง Payroll',
      fields: [
        { l: 'วันที่บรรจุ (effective)', v: '15 พ.ค. 2569', hint: 'ส่ง EC + Payroll', type: 'date' },
        { l: 'Allowance (ถ้ามี)',      v: '2,500 บาท',     hint: 'auto → Payroll',  type: 'number' },
      ],
    },
    {
      head: 'No-pass', headTh: 'ไม่ผ่าน',
      color: WALK.danger, bg: '#FEF2F2', border: '#FECACA', icon: '✕',
      desc: 'ต้องระบุเหตุผล + วันที่สิ้นสภาพ',
      fields: [
        { l: 'เหตุผลการสิ้นสภาพ', v: 'ขาดทักษะ POS · เกิน 3 ครั้ง', hint: 'ส่งให้กฎหมายตรวจ', type: 'select' },
        { l: 'วันสิ้นสภาพ',       v: '31 พ.ค. 2569',                hint: '+1 รอบ Payroll',   type: 'date' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <div style={walkStyles.eyebrow}>ขั้นที่ 3 จาก 3 · สาขาตามผลการประเมิน</div>
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
    </div>
  );
}

// ── Shared full-page mockup ───────────────────────────────────────────
// Stacks: tier filter → inbox list (+bulk bar) → urgency banner →
// snapshot → outcome/rating → conditional branches. Same background
// across every frame; spotlight rotates between regions.
function probationPageMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <RowTierFilter/>
      <RowInboxList/>
      <RowUrgencyBanner/>
      <RowSnapshot/>
      <RowAssessment/>
      <RowBranches/>
    </div>
  );
}

// ── Spotlight regions (frame-space) ───────────────────────────────────
// Measured against rendered layout. Mockup column = 40..920 (880 wide),
// starts at y = BODY_TOP. Each row consumes its height + 14px gap.
const SPOTX = WALK.MOCKUP_X - 4;
const SPOTW = WALK.MOCKUP_W + 8;
const REGIONS = {
  tiers:    { y: WALK.BODY_TOP - 4,    h: 90  },  // tier filter strip
  bulkBar:  { y: WALK.BODY_TOP + 100,  h: 48  },  // ink bulk-action bar
  list:     { y: WALK.BODY_TOP + 156,  h: 162 },  // inbox list
  banner:   { y: WALK.BODY_TOP + 332,  h: 80  },  // urgency banner
  snapshot: { y: WALK.BODY_TOP + 426,  h: 142 },  // employee snapshot
  outcome:  { y: WALK.BODY_TOP + 582,  h: 168 },  // outcome 3 cards
  rating:   { y: WALK.BODY_TOP + 762,  h: 198 },  // rating + notes
  branches: { y: WALK.BODY_TOP + 974,  h: 460 },  // 3 conditional branches
};

const PROBATION_FRAME_H = 1620;
const COMMON = {
  totalSteps: 4,
  persona: 'Manager · คุณจงรักษ์',
  frameHeight: PROBATION_FRAME_H,
};

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · คัดกรอง — Inbox triage
// ═══════════════════════════════════════════════════════════════════
function ProbationWalk1() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={1}
      title="คัดกรอง · 4-tier urgency แยกเคสด่วนทันที"
      narrative="Manager ดูแลเคสทดลองงานหลายคน — Inbox ต้องบอกได้ทันทีว่า 'ใครรอด่วน' โดยไม่ต้องไล่อ่านทุกแถว · ใช้ tier filter 4 ระดับ + bulk-select เพื่อ batch อนุมัติเคสปกติได้ในคลิกเดียว"
      mockup={probationPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.tiers.y,   w: SPOTW, h: REGIONS.tiers.h,   color: WALK.accent },
        { num: 2, x: SPOTX, y: REGIONS.bulkBar.y, w: SPOTW, h: REGIONS.bulkBar.h, color: WALK.ink },
        { num: 3, x: SPOTX, y: REGIONS.list.y,    w: SPOTW, h: REGIONS.list.h,    color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: '4-tier filter + count badge',
          body: 'ทำไมไม่ใช้ dropdown filter? เพราะ dropdown ซ่อนตัวเลข — manager ต้องเปิดดูถึงรู้ว่า "เร่งด่วน" มีกี่เคส. การ์ด 4 ใบเรียงตามความเร่งด่วน + ตัวเลขใหญ่ scan ได้ใน 1 วินาทีก่อนเลือก. Active tier ใช้ ink border + cream bg ไม่ใช่ accent fill — สี border neutral ไม่กลบสี tier badge เอง.',
          color: WALK.accent },
        { num: 2, title: 'Bulk-action bar สีดำลอยเหนือ list',
          body: 'ทำไม bulk action ไม่ติด toolbar คงที่? เพราะ default state มันรกพื้นที่ — bar นี้โผล่เมื่อเลือก ≥1 รายการเท่านั้น. ink solid + white text contrast สูงกว่า card ปกติ ให้สายตารู้ทันทีว่า "ตอนนี้ batch ได้". "อนุมัติทั้งหมด (Pass)" เป็น primary สำหรับเคสปกติที่ Manager มั่นใจ — ไม่ต้องเปิดทีละเคส.',
          color: WALK.ink },
        { num: 3, title: 'แถวเดียวบอกครบ · tag เร่งด่วน vs ใกล้ครบ',
          body: 'ทำไมไม่แยกตารางตาม tier? เพราะ manager คิดเป็น "พนักงาน" ไม่ใช่ "tier" — แสดงทุกเคสในตารางเดียว แล้ว tag สีบอก urgency. เร่งด่วน = danger soft (red), ใกล้ครบ = butter soft (yellow) — ตาจับ urgency ทันทีโดยไม่ต้องอ่านตัวเลขวัน. row layout: avatar · ชื่อ · ตำแหน่ง · วันคงเหลือ · tag — ครบใน scan แนวนอนเดียว.',
          color: WALK.coral },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · เร่งด่วน — Countdown banner + colour code
// ═══════════════════════════════════════════════════════════════════
function ProbationWalk2() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={2}
      title="เร่งด่วน · countdown banner + tier colour code"
      narrative="ทดลองงานมี hard deadline — ถ้าพลาดระบบ auto-pass อัตโนมัติ (กฎ HR + แรงงาน). Manager ต้องเห็น urgency ก่อนเปิด detail · banner สีแดงตอบ 'เหลือกี่วัน' + 'ถ้าไม่ทำจะเกิดอะไร' ในกล่องเดียว"
      mockup={probationPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.banner.y, w: SPOTW, h: REGIONS.banner.h, color: WALK.danger },
        { num: 2, x: WALK.MOCKUP_X + 750, y: REGIONS.banner.y + 22, w: 130, h: 38, color: WALK.danger, radius: 10 },
        { num: 3, x: SPOTX, y: REGIONS.list.y + 110, w: SPOTW, h: 50, color: WALK.warning },
      ]}
      annotations={[
        { num: 1, title: 'Banner = danger soft bg + ink border',
          body: 'ทำไมไม่ใช้ red solid (banner เต็มสีแดง)? เพราะ red solid อ่านเหมือน error/ล้มเหลว — กรณีนี้ไม่ใช่ error แต่เป็น deadline พึงระวัง. ใช้ #FEE2E2 bg อ่อน + #EF4444 border + #B91C1C text — สื่อ "ต้องทำ" แต่ไม่ alarming. ไอคอน "!" ใน white circle เพิ่ม contrast ในกรอบสีเดียวกัน. body ระบุ consequence ชัด ("ระบบจะ auto-pass") เพื่อให้ manager รู้ว่าทำไมเร่ง.',
          color: WALK.danger },
        { num: 2, title: 'Countdown pill ขวาสุด · Z-pattern stop',
          body: 'ทำไมต้อง redundant กับ title? เพราะ Z-pattern reading — สายตา manager หยุดที่มุมขวาสุดของ banner ก่อนเริ่มอ่าน body. pill "10 วัน" ใน red solid วางตรงนั้นเพื่อ scan 0.5 วินาทีก็เห็น. ตัวเลขซ้ำกับ "เหลือ 10 วัน" ใน title — จงใจให้เกินพอ scan ได้ทั้งจากซ้ายไปขวา หรือกระโดดมาขวาก่อน.',
          color: WALK.danger },
        { num: 3, title: 'Colour ramp ใช้ซ้ำใน row · ไม่ใช่ traffic light',
          body: 'ทำไมไม่ใช้ red/yellow/green ทั่วไป? เพราะคน deuteranopia (color-blind ~8% ชาย) แยก red/green ไม่ออก. ใช้ danger red + butter (warm yellow) + sage (เขียวเทาอบอุ่น) — แต่ละสีต่างกันด้วย hue + saturation ไม่ใช่แค่ shade. ตัวเลข "10/17 วัน" ในแถว list ใช้สีเดียวกับ tag — consistency = predictability, manager ไม่ต้องอ่าน label ก็รู้ว่าอยู่ tier ไหน.',
          color: WALK.warning },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ประเมิน — Snapshot → outcome → rating
// ═══════════════════════════════════════════════════════════════════
function ProbationWalk3() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={3}
      title="ประเมิน · snapshot → outcome → quality"
      narrative="หน้าเดียวจบ 3 ขั้น: ดูว่าใคร (snapshot) → ตัดสินอะไร (outcome) → อธิบายทำไม (rating + notes). ลำดับนี้ mirror ขั้นตอนความคิดของหัวหน้างาน · ไม่บังคับให้เดินตามขั้นแบบ wizard"
      mockup={probationPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.snapshot.y, w: SPOTW, h: REGIONS.snapshot.h, color: WALK.accent },
        { num: 2, x: SPOTX, y: REGIONS.outcome.y,  w: SPOTW, h: REGIONS.outcome.h,  color: WALK.coral },
        { num: 3, x: SPOTX, y: REGIONS.rating.y,   w: SPOTW, h: REGIONS.rating.h,   color: WALK.warning },
      ]}
      annotations={[
        { num: 1, title: 'Snapshot cream · context first ไม่ใช่ form',
          body: 'ทำไม snapshot อยู่บนสุดของ assessment? เพราะก่อนตัดสินใจ manager ต้องตอบ "ใคร" ในหัวก่อน. ใช้ cream variant (ไม่ใช่ white surface) สื่อ "เป็น context อ่านอย่างเดียว ไม่ต้องแก้". 4 facts (ตำแหน่ง · วันเริ่มงาน · อายุงาน · หัวหน้า) ครอบคลุมคำถามที่ manager ถามก่อนกดเสมอ — ไม่ต้องเปิด profile แยก.',
          color: WALK.accent },
        { num: 2, title: 'Outcome = radio card 3 ใบ · ไม่ใช่ dropdown',
          body: 'ทำไมไม่ใช้ dropdown หรือ button group? Dropdown ซ่อนทางเลือก (Manager ลืมว่า "ขยายเวลา" มี); button group สื่อ "กดแล้วทำเลย" ทำให้พลาดง่าย. radio card บังคับเลือก 1 ใน 3 พร้อม sub-line อธิบาย consequence ("บรรจุเป็น Permanent" / "ทดลองต่อ 30-60 วัน" / "สิ้นสภาพหลังบันทึก") — manager เห็นปลายทางก่อน commit. selected = outcome color border + creamSoft bg (ไม่ fill ทั้งใบเพราะกลบ icon).',
          color: WALK.coral },
        { num: 3, title: 'Star quant + 2 textarea qual · คู่กัน',
          body: 'ทำไมต้องมีทั้ง star และ textarea? เพราะ score เดี่ยวบอก "เท่าไหร่" แต่ไม่บอก "ทำไม" — HR review ต้องเห็น qualitative trail. star = 1-5 + inline label ("4/5 — เกินมาตรฐาน") ช่วย anchor meaning; textarea 2 ช่อง "จุดเด่น/จุดที่ต้องพัฒนา" บังคับ — ป้องกัน manager ใส่แค่ตัวเลขลอย ๆ. การแยก 2 ช่องดีกว่า single comment เพราะบังคับให้คิดทั้ง 2 ด้าน.',
          color: WALK.warning },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ปลายทาง — Conditional branches
// ═══════════════════════════════════════════════════════════════════
function ProbationWalk4() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={4}
      persona="HR Admin · จอร์แดน เหมย"
      title="ปลายทาง · ฟอร์มแตกตาม outcome"
      narrative="3 outcome → 3 ชุดข้อมูลที่ต่างกันโดยสิ้นเชิง · Extend ต้องการเส้นตายใหม่, Pass ต้องการวันบรรจุ + allowance, No-pass ต้องการเหตุผลกฎหมาย. ระบบสาขาฟอร์มแทนที่จะแสดงทุก field พร้อมกัน — ลด form length 60%"
      mockup={probationPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.branches.y + 50,  w: SPOTW, h: 130, color: WALK.warning },
        { num: 2, x: SPOTX, y: REGIONS.branches.y + 188, w: SPOTW, h: 130, color: WALK.accent },
        { num: 3, x: SPOTX, y: REGIONS.branches.y + 326, w: SPOTW, h: 130, color: WALK.danger },
      ]}
      annotations={[
        { num: 1, title: 'Extend = date + ระยะ · butter warm tone',
          body: 'ทำไมขยายเวลาใช้ warm warning ไม่ใช่ neutral? เพราะการขยายเวลามี cost (manager ต้องประเมินใหม่ + พนักงานรอ) — สี butter สื่อ "ใส่ใจ ไม่ใช่ปกติ". field "ขยายถึงวันที่" + "ระยะ" คู่กันเพราะกฎ HR กำหนด "ไม่เกิน 119 วัน" — hint ใต้ field บอก rule แทนซ่อนใน docs. select 30/45/60 แทน free input — ป้องกัน admin ใส่เลขผิด.',
          color: WALK.warning },
        { num: 2, title: 'Pass = วันบรรจุ + Allowance ส่ง Payroll',
          body: 'ทำไม Pass ต้องการ allowance? เพราะกฎหมายแรงงาน — ผ่านทดลองงานต้องเปิดสิทธิ + อาจเพิ่ม allowance ตาม policy. teal bg fade สื่อความสำเร็จ ไม่ alarming. hint "auto → Payroll" บอก downstream effect — admin รู้ทันทีว่า field นี้กระทบเงินเดือน, จะตรวจรอบให้แน่ใจก่อน submit.',
          color: WALK.accent },
        { num: 3, title: 'No-pass = เหตุผล select + วันสิ้นสภาพ',
          body: 'ทำไมเหตุผลเป็น select ไม่ใช่ free text? เพราะ termination ฟ้องกฎหมายได้ — free text ทำให้ทนายตีความได้กว้าง. select จาก master list ("ขาดทักษะ POS · เกิน 3 ครั้ง" เป็นต้น) ที่ HR + กฎหมายเห็นชอบล่วงหน้า. วันสิ้นสภาพ +1 รอบ Payroll ตามกฎหมายแรงงาน — hint บอกไว้ก่อนกรอก. red soft bg = sensitive ที่สุด แต่ไม่ red solid (ไม่ใช่ error เป็น choice).',
          color: WALK.danger },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { ProbationWalk1, ProbationWalk2, ProbationWalk3, ProbationWalk4 });
