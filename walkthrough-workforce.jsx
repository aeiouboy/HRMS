// walkthrough-workforce.jsx
// Workforce module Design Walkthrough (Manager + HR Admin personas).
//
// RETROFIT PATTERN (static page + rotating spotlight):
//   rosterPageMockup()   — shared background for frames 1 + 2
//                          (KPI strip + roster grid + auto-fill toolbar + conflict panel)
//   swapAssetPageMockup() — shared background for frames 3 + 4
//                           (Swap queue + detail column stacked above Asset KPI + table)
//
// Frames:
//   01 มองภาพรวม   — spotlight KPI strip + roster grid
//   02 ปิดช่องว่าง  — spotlight auto-fill toolbar + suggestion/conflict cells
//   03 สลับกะ      — spotlight swap queue + impact check + action bar
//   04 ส่งมอบของ   — spotlight asset KPI + tab bar + assignment table

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ── Shared shift palette ────────────────────────────────────────────
const WF_SHIFT = {
  M: { bg: '#D6EEEC', fg: '#0A6E68', t: '08:00' },
  A: { bg: '#FEF3C7', fg: '#92660C', t: '14:00' },
  N: { bg: '#E1E4FB', fg: '#3F4AAB', t: '22:00' },
  O: { bg: WALK.cream,        fg: WALK.inkFaint, t: 'Off' },
  L: { bg: '#FFE4E1', fg: '#9A3412', t: 'Leave' },
};

function WfKpi({ label, value, sub, color }) {
  return (
    <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
      <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>{label}</div>
      <div style={{
        fontFamily: WALK.fontDisplay,
        fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em',
        color: color || WALK.ink, marginTop: 4, lineHeight: 1,
      }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 4, lineHeight: 1.35 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function WfShiftCell({ code, ghost = false, dashed = false, suggest = false, conflict = false }) {
  if (!code && !ghost) return <span/>;
  if (ghost) {
    return (
      <div style={{
        width: '100%', height: 36, borderRadius: 6,
        background: 'transparent',
        border: `1px ${dashed ? 'dashed' : 'solid'} ${WALK.hairline}`,
        color: WALK.inkFaint, fontSize: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>＋</div>
    );
  }
  const s = WF_SHIFT[code] || WF_SHIFT.O;
  return (
    <div style={{
      width: '100%', height: 36, borderRadius: 6,
      background: s.bg, color: s.fg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      lineHeight: 1, position: 'relative',
      border: conflict ? `2px solid ${WALK.danger}`
            : suggest  ? `2px dashed ${WALK.accent}`
            :            '1px solid transparent',
    }}>
      <span style={{ fontFamily: WALK.fontDisplay, fontSize: 12, fontWeight: 700 }}>{code}</span>
      <span style={{ fontSize: 8, fontWeight: 600, opacity: 0.85, marginTop: 1 }}>{s.t}</span>
      {suggest && (
        <span style={{
          position: 'absolute', top: -6, right: -6,
          width: 14, height: 14, borderRadius: 99,
          background: WALK.accent, color: '#fff',
          fontSize: 9, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✦</span>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// Shared mockup A — Roster page (frames 1 + 2)
// Contains: KPI strip, auto-fill toolbar, roster grid, conflict panel.
// ══════════════════════════════════════════════════════════════════════
const DOW = ['จ.26', 'อ.27', 'พ.28', 'พฤ.29', 'ศ.30', 'ส.31', 'อา.1'];

const ROSTER_TEAM = [
  { n: 'อาทิตย์ ช.',  r: 'Store Manager', ini: 'AC', c: WALK.sage,   hrs: 45, d: ['M','M','M','M','M','O','O'] },
  { n: 'เบน คิม',     r: 'Senior Cashier', ini: 'BK', c: WALK.accent, hrs: 40, d: ['M','M','O',{s:'A',suggest:true},'A','A','O'] },
  { n: 'เจสซิก้า ศ.', r: 'Senior · Buddy', ini: 'JS', c: WALK.coral,  hrs: 36, d: ['M','M','M','O','M','O','O'] },
  { n: 'พริยะ ช.',    r: 'Cashier',        ini: 'PS', c: WALK.butter, hrs: 48, d: ['A','A','A','M','M','M','O'] },
  { n: 'ทารา ซ.',     r: 'Cashier',        ini: 'TS', c: WALK.accent, hrs: 36, d: ['A','A',{s:'',ghost:true},{s:'',ghost:true},'A','A','M'] },
  { n: 'มายา พ.',     r: 'Cashier',        ini: 'MP', c: WALK.sage,   hrs: 32, d: ['','',{s:'A',suggest:true},{s:'A',suggest:true},'M','A','A'] },
  { n: 'ภานุพงศ์',    r: 'Cashier (ใหม่)', ini: 'PN', c: WALK.coral,  hrs: 32, d: ['M','M','M',{s:'A',conflict:true},'M','O','O'] },
];

function RosterGrid() {
  return (
    <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '160px repeat(7, 1fr) 56px',
        background: WALK.creamSoft,
        borderBottom: `1px solid ${WALK.hairline}`,
        fontSize: 9.5, fontWeight: 700,
        color: WALK.inkMuted,
        textTransform: 'uppercase', letterSpacing: '.06em',
      }}>
        <div style={{ padding: '10px 14px' }}>พนักงาน</div>
        {DOW.map(d => (
          <div key={d} style={{ padding: '10px 4px', textAlign: 'center', borderLeft: `1px solid ${WALK.hairlineSoft}` }}>{d}</div>
        ))}
        <div style={{ padding: '10px 4px', textAlign: 'center', borderLeft: `1px solid ${WALK.hairlineSoft}` }}>ชม.</div>
      </div>

      {ROSTER_TEAM.map(t => (
        <div key={t.n} style={{
          display: 'grid',
          gridTemplateColumns: '160px repeat(7, 1fr) 56px',
          borderTop: `1px solid ${WALK.hairlineSoft}`,
          alignItems: 'stretch',
        }}>
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <WalkAvatar initials={t.ini} color={t.c} size={26}/>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: WALK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.n}</div>
              <div style={{ fontSize: 9.5, color: WALK.inkMuted }}>{t.r}</div>
            </div>
          </div>
          {t.d.map((s, di) => {
            const cell = typeof s === 'string'
              ? { code: s }
              : { code: s.s, suggest: s.suggest, ghost: s.ghost, conflict: s.conflict };
            return (
              <div key={di} style={{
                borderLeft: `1px solid ${WALK.hairlineSoft}`,
                padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <WfShiftCell {...cell}/>
              </div>
            );
          })}
          <div style={{
            borderLeft: `1px solid ${WALK.hairlineSoft}`,
            padding: '8px 4px', textAlign: 'center',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          }}>
            <span style={{ fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 700, color: WALK.ink, letterSpacing: '-0.015em' }}>{t.hrs}</span>
            <span style={{ fontSize: 8, color: WALK.inkMuted, marginTop: 1 }}>/40</span>
          </div>
        </div>
      ))}

      {/* Coverage footer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '160px repeat(7, 1fr) 56px',
        borderTop: `2px solid ${WALK.hairline}`,
        background: WALK.creamSoft,
      }}>
        <div style={{
          padding: '8px 14px', fontSize: 9.5, fontWeight: 700,
          color: WALK.inkMuted, textTransform: 'uppercase', letterSpacing: '.06em',
          display: 'flex', alignItems: 'center',
        }}>Coverage</div>
        {[
          { m: 4, a: 2 }, { m: 4, a: 2 },
          { m: 3, a: 1 }, { m: 2, a: 1 },
          { m: 4, a: 3 }, { m: 1, a: 2 },
          { m: 1, a: 0 },
        ].map((c, di) => (
          <div key={di} style={{
            borderLeft: `1px solid ${WALK.hairlineSoft}`,
            padding: '6px 4px', textAlign: 'center',
            fontSize: 9, color: WALK.inkSoft, lineHeight: 1.35,
          }}>
            <div style={{ color: c.m >= 4 ? WALK.success : WALK.warning }}>M {c.m}/4</div>
            <div style={{ color: c.a >= 3 ? WALK.success : WALK.warning }}>A {c.a}/3</div>
          </div>
        ))}
        <div style={{
          borderLeft: `1px solid ${WALK.hairlineSoft}`,
          padding: '8px 4px', textAlign: 'center',
          fontFamily: WALK.fontDisplay, fontSize: 12, fontWeight: 700,
        }}>280h</div>
      </div>
    </div>
  );
}

function rosterPageMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* KPI strip — 4 tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <WfKpi label="ชั่วโมงรวม" value="280h" sub="เป้า 280h · พอดี" color={WALK.accent}/>
        <WfKpi label="ค่าแรงประมาณ" value="฿58,400" sub="incl. OT ฿2,800"/>
        <WfKpi label="กะเช้า" value="100%" sub="4/4 ทุกวัน" color={WALK.success}/>
        <WfKpi label="กะบ่าย" value="71%" sub="ขาด 2 ช่อง พ-พฤ" color={WALK.warning}/>
      </div>

      {/* Auto-fill toolbar */}
      <div style={{
        ...walkStyles.card(false),
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button style={{ ...walkStyles.btnPrimary, fontSize: 12.5 }}>✦ Auto-fill (จากความต้องการ)</button>
        <button style={{ ...walkStyles.btnGhost, fontSize: 12.5 }}>↻ Copy from last week</button>
        <button style={{ ...walkStyles.btnGhost, fontSize: 12.5, color: WALK.warning, borderColor: WALK.warningSoft }}>⚠ ตรวจ conflicts · 3</button>
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 11, color: WALK.inkMuted }}>แนะนำ 4 ช่อง · ขาด 2 ช่อง · conflict 1 ช่อง</span>
      </div>

      {/* Roster grid */}
      <RosterGrid/>

      {/* Conflict panel */}
      <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
        <div style={{ ...walkStyles.eyebrow, fontSize: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          Conflicts + คำเตือน
          <WalkTag bg={WALK.warningSoft} color={WALK.warning}>3 ข้อ</WalkTag>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
          {[
            { st: 'warn',   l: 'กะบ่ายขาด 2 ช่อง (พ-พฤ)',             sub: 'เป้า 3 คน · ขณะนี้ 1 คน · peak hour' },
            { st: 'danger', l: 'ภานุพงศ์ (ใหม่) จัดทำกะบ่ายเดี่ยว',  sub: 'onboarding ต้องมี senior shadow ก่อน 30 วัน' },
            { st: 'info',   l: 'พริยะ ทำ OT 8h สัปดาห์นี้',            sub: 'ใกล้ limit 12h · ขออนุมัติล่วงหน้า' },
          ].map((c, i) => {
            const cfg = c.st === 'danger'
              ? { bg: WALK.dangerSoft, fg: WALK.danger }
              : c.st === 'warn'
              ? { bg: WALK.warningSoft, fg: WALK.warning }
              : { bg: WALK.indigoSoft, fg: WALK.indigo };
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: 10, background: cfg.bg, borderRadius: 8,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 99,
                  background: WALK.surface, color: cfg.fg,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 11, fontWeight: 700,
                }}>!</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: WALK.ink }}>{c.l}</div>
                  <div style={{ fontSize: 10.5, color: WALK.inkSoft, marginTop: 2 }}>{c.sub}</div>
                </div>
                <button style={{ ...walkStyles.btnGhost, padding: '3px 9px', fontSize: 10.5 }}>แก้</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Y-offsets within the roster mockup (frame-space, origin = frame top-left)
// Mockup column starts at y = WALK.BODY_TOP (= 120).
const ROSTER = {
  kpi:      { y: WALK.BODY_TOP,       h: 78  },  // 4-tile KPI strip
  toolbar:  { y: WALK.BODY_TOP + 92,  h: 52  },  // auto-fill toolbar
  grid:     { y: WALK.BODY_TOP + 158, h: 330 },  // roster grid incl. coverage footer
  conflict: { y: WALK.BODY_TOP + 500, h: 174 },  // conflict panel
};

const SPOTX = WALK.MOCKUP_X - 4;
const SPOTW = WALK.MOCKUP_W + 8;

// Frame height for roster page: bottom of conflict panel + 60 slack
const ROSTER_FRAME_H = 760;

const ROSTER_COMMON = {
  totalSteps: 4,
  persona: 'Manager · คุณจงรักษ์',
  frameHeight: ROSTER_FRAME_H,
};

// ══════════════════════════════════════════════════════════════════════
// Shared mockup B — Swap + Asset page (frames 3 + 4)
// Contains: Swap queue + detail column (top), Asset KPI + tabs + table (bottom).
// ══════════════════════════════════════════════════════════════════════

const SWAP_QUEUE = [
  { id: 'SW-1042', a: 'BK', ac: WALK.accent, b: 'MP', bc: WALK.sage,
    who: 'เบน ↔ มายา', d: 'พ. 28 พ.ค.', t: '2 ชม.ที่แล้ว', st: 'pending', active: true },
  { id: 'SW-1041', a: 'TS', ac: WALK.accent, b: 'PS', bc: WALK.butter,
    who: 'ทารา ↔ พริยะ', d: 'พฤ. 29 พ.ค.', t: '5 ชม.ที่แล้ว', st: 'pending' },
  { id: 'SW-1040', a: 'JS', ac: WALK.coral, b: 'BK', bc: WALK.accent,
    who: 'เจสซิก้า ↔ เบน', d: 'จ. 26 พ.ค.', t: 'เมื่อวาน', st: 'approved' },
];

const ASSET_ROWS = [
  { who: 'เบน คิม',           ini: 'BK', c: WALK.accent, items: 5, value: '฿42,800', overdue: 0, last: 'laptop 12 พ.ค.' },
  { who: 'พริยะ ชาห์',         ini: 'PS', c: WALK.butter, items: 4, value: '฿2,400',  overdue: 0, last: 'เครื่องแบบ 2 พ.ค.' },
  { who: 'ทารา ซัลลิแวน',     ini: 'TS', c: WALK.accent, items: 3, value: '฿1,800',  overdue: 1, last: 'รองเท้า 1 พ.ค.', note: 'ป้ายเก่า E-3120' },
  { who: 'เจสซิก้า ศรี',       ini: 'JS', c: WALK.coral,  items: 5, value: '฿45,200', overdue: 0, last: 'laptop 28 เม.ย.' },
];

function swapAssetPageMockup() {
  const ASSET_TABS = [
    { k: 'assignments', l: 'ของที่แจกออก', badge: '2,847', active: true },
    { k: 'catalog',     l: 'Catalog',       badge: '11' },
    { k: 'requests',    l: 'คำขอใหม่',     badge: '18', warn: true },
    { k: 'returns',     l: 'รอคืน',         badge: '42' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── Swap section ─────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ ...walkStyles.eyebrow }}>คำขอสลับกะ</div>
        <WalkTag bg={WALK.coralSoft} color={WALK.coral}>2 รออนุมัติ</WalkTag>
      </div>

      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '240px 1fr' }}>
        {/* Queue list */}
        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
          {SWAP_QUEUE.map(q => (
            <div key={q.id} style={{
              padding: '12px 14px',
              background: q.active ? WALK.accentSoft : WALK.surface,
              borderTop: `1px solid ${WALK.hairlineSoft}`,
              borderLeft: q.active ? `3px solid ${WALK.accent}` : `3px solid transparent`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: WALK.inkMuted }}>{q.id}</span>
                {q.st === 'pending'
                  ? <WalkTag bg={WALK.coralSoft} color={WALK.coral}>รออนุมัติ</WalkTag>
                  : <WalkTag bg={WALK.successSoft} color={WALK.success}>อนุมัติ</WalkTag>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <WalkAvatar initials={q.a} color={q.ac} size={20}/>
                <span style={{ color: WALK.inkFaint, fontSize: 11 }}>↔</span>
                <WalkAvatar initials={q.b} color={q.bc} size={20}/>
                <span style={{ fontSize: 11, color: WALK.inkSoft, marginLeft: 4 }}>{q.who}</span>
              </div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>{q.d} · {q.t}</div>
            </div>
          ))}
        </div>

        {/* Detail column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Swap diagram */}
          <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
            <div style={{ ...walkStyles.eyebrow, fontSize: 10 }}>SW-1042 · ขอสลับกะ พ. 28 พ.ค.</div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 40px 1fr',
              gap: 10, marginTop: 10, alignItems: 'center',
            }}>
              <div style={{
                padding: 10, background: WALK.creamSoft, borderRadius: 10,
                border: `1px solid ${WALK.hairlineSoft}`, textAlign: 'center',
              }}>
                <WalkAvatar initials="BK" color={WALK.accent} size={28}/>
                <div style={{ fontFamily: WALK.fontDisplay, fontSize: 12, fontWeight: 600, color: WALK.ink, marginTop: 4 }}>เบน คิม</div>
                <div style={{ ...walkStyles.eyebrow, fontSize: 8, marginTop: 4 }}>ขอย้ายไป</div>
                <div style={{ marginTop: 2, fontSize: 10.5, fontWeight: 600, color: WALK.ink }}>A · 14-23</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 99,
                  background: WALK.accentSoft, color: WALK.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700,
                }}>↻</div>
              </div>
              <div style={{
                padding: 10, background: WALK.creamSoft, borderRadius: 10,
                border: `1px solid ${WALK.hairlineSoft}`, textAlign: 'center',
              }}>
                <WalkAvatar initials="MP" color={WALK.sage} size={28}/>
                <div style={{ fontFamily: WALK.fontDisplay, fontSize: 12, fontWeight: 600, color: WALK.ink, marginTop: 4 }}>มายา พาเทล</div>
                <div style={{ ...walkStyles.eyebrow, fontSize: 8, marginTop: 4 }}>ขอรับแทน</div>
                <div style={{ marginTop: 2, fontSize: 10.5, fontWeight: 600, color: WALK.ink }}>M · 08-17</div>
              </div>
            </div>
            <div style={{
              marginTop: 8, padding: '7px 12px',
              background: WALK.creamSoft, borderRadius: 8,
              borderLeft: `3px solid ${WALK.accent}`,
              fontSize: 11, color: WALK.inkSoft, fontStyle: 'italic',
            }}>"นัดหมอตอนเช้า" — เบน คิม</div>
          </div>

          {/* Impact check */}
          <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
            <div style={{ ...walkStyles.eyebrow, fontSize: 10 }}>ตรวจอัตโนมัติ · 5 ข้อ</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8 }}>
              {[
                'กะเช้ายังครบ 4/4 หลังสลับ',
                'มายาตอบรับแล้ว 1 ชม.ก่อน',
                'พักระหว่างกะ > 9 ชม. ตามกฎหมาย',
                'OT ทั้งคู่ไม่เกิน limit (40h · 36h)',
                'ไม่กระทบ OT ที่ approved แล้ว',
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: 99,
                    background: WALK.successSoft, color: WALK.success,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 700, flexShrink: 0,
                  }}>✓</span>
                  <span style={{ fontSize: 11, color: WALK.ink }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action bar */}
          <div style={{
            padding: '10px 14px', background: WALK.surface,
            border: `1px solid ${WALK.hairline}`, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 20, height: 20, borderRadius: 99,
                background: WALK.successSoft, color: WALK.success,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>✓</span>
              <span style={{ fontSize: 11.5, color: WALK.inkSoft }}>ไม่มีผลกระทบ · พร้อมอนุมัติ</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...walkStyles.btnGhost, padding: '5px 11px', fontSize: 11 }}>✕ ปฏิเสธ</button>
              <button style={{ ...walkStyles.btnPrimary, padding: '5px 13px', fontSize: 11 }}>✓ อนุมัติสลับ</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Asset section ─────────────────────────────────────── */}
      <div style={{ ...walkStyles.divider }}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ ...walkStyles.eyebrow }}>Asset Management</div>
        <WalkTag bg={WALK.dangerSoft} color={WALK.danger}>3 sku เหลือน้อย</WalkTag>
      </div>

      {/* Asset KPI strip — 5 tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        <WfKpi label="ในสต็อก" value="3,420" sub="11 ประเภท"/>
        <WfKpi label="แจกไปแล้ว" value="2,847" sub="83% utilization"/>
        <WfKpi label="คำขอใหม่" value="18" sub="รอ approve" color={WALK.warning}/>
        <WfKpi label="เหลือน้อย" value="3 sku" sub="ต้องสั่งซื้อ" color={WALK.danger}/>
        <WfKpi label="รอคืน" value="42" sub="จากคนออก"/>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${WALK.hairline}` }}>
        {ASSET_TABS.map(t => (
          <div key={t.k} style={{
            padding: '8px 14px',
            borderBottom: `2px solid ${t.active ? WALK.accent : 'transparent'}`,
            marginBottom: -1,
            fontSize: 12, fontWeight: t.active ? 600 : 500,
            color: t.active ? WALK.ink : WALK.inkMuted,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {t.l}
            <span style={{
              padding: '1px 6px', borderRadius: 99,
              background: t.warn ? WALK.warningSoft : t.active ? WALK.accentSoft : WALK.creamSoft,
              color: t.warn ? WALK.warning : t.active ? WALK.ink : WALK.inkMuted,
              fontSize: 9.5, fontWeight: 700,
            }}>{t.badge}</span>
          </div>
        ))}
      </div>

      {/* Assignment table */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 80px 80px 100px 90px 1.4fr 70px',
          padding: '10px 16px',
          background: WALK.creamSoft,
          fontSize: 9.5, fontWeight: 700,
          color: WALK.inkMuted,
          textTransform: 'uppercase', letterSpacing: '.06em',
        }}>
          <div>พนักงาน</div><div>สาขา</div><div>จำนวน</div>
          <div>มูลค่า</div><div>ค้าง</div><div>ล่าสุด</div>
          <div style={{ textAlign: 'right' }}>Action</div>
        </div>
        {ASSET_ROWS.map(a => (
          <div key={a.who} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 80px 80px 100px 90px 1.4fr 70px',
            padding: '11px 16px',
            borderTop: `1px solid ${WALK.hairlineSoft}`,
            alignItems: 'center', fontSize: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <WalkAvatar initials={a.ini} color={a.c} size={24}/>
              <span style={{ fontWeight: 600, color: WALK.ink }}>{a.who}</span>
            </div>
            <div style={{ color: WALK.inkMuted, fontSize: 11 }}>CTW</div>
            <div style={{ fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 700 }}>{a.items}</div>
            <div style={{ fontFamily: WALK.fontDisplay, fontSize: 12.5, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{a.value}</div>
            <div>
              {a.overdue > 0
                ? <WalkTag bg={WALK.coralSoft} color={WALK.coral}>{a.overdue} ค้าง</WalkTag>
                : <span style={{ fontSize: 11, color: WALK.inkFaint }}>—</span>}
            </div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, lineHeight: 1.4 }}>
              {a.last}
              {a.note && <div style={{ color: WALK.danger, fontWeight: 600, marginTop: 1 }}>{a.note}</div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <button style={{ ...walkStyles.btnGhost, padding: '3px 10px', fontSize: 10.5 }}>เปิด</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Y-offsets within the swap+asset mockup (frame-space)
const SWAP = {
  swapLabel:  { y: WALK.BODY_TOP,       h: 26  },
  swapBody:   { y: WALK.BODY_TOP + 36,  h: 310 },  // queue + detail columns
  assetLabel: { y: WALK.BODY_TOP + 364, h: 26  },
  assetKpi:   { y: WALK.BODY_TOP + 400, h: 80  },
  assetTabs:  { y: WALK.BODY_TOP + 490, h: 38  },
  assetTable: { y: WALK.BODY_TOP + 538, h: 200 },
};

// Frame height: bottom of asset table + 60 slack
const SWAP_ASSET_FRAME_H = 800;

const SWAP_COMMON = {
  totalSteps: 4,
  persona: 'Manager · คุณจงรักษ์ + HR Admin · คุณนิภา',
  frameHeight: SWAP_ASSET_FRAME_H,
};

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · มองภาพรวม — spotlight KPI strip + roster grid
// ═══════════════════════════════════════════════════════════════════
function WorkforceWalk1() {
  return (
    <WalkFrame
      {...ROSTER_COMMON}
      stepIdx={1}
      title="มองภาพรวม · ดูทั้งสัปดาห์ในจอเดียว"
      narrative="เปิด Roster Manager ต้องเห็นทั้ง 'ใคร ทำเมื่อไหร่' (grid) และ 'พอไหม คุ้มไหม' (KPI) พร้อมกัน — KPI strip บนสุดสรุปสุขภาพกะใน 4 ตัวเลข; grid คน × วัน ให้ context ระดับบุคคล"
      mockup={rosterPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: ROSTER.kpi.y,    w: SPOTW, h: ROSTER.kpi.h,    color: WALK.accent },
        { num: 2, x: SPOTX, y: ROSTER.grid.y,   w: SPOTW, h: ROSTER.grid.h,   color: WALK.sage },
        { num: 3, x: WALK.MOCKUP_X + 660, y: ROSTER.kpi.y, w: 216, h: ROSTER.kpi.h, color: WALK.warning },
      ]}
      annotations={[
        { num: 1, title: 'KPI strip = สุขภาพกะใน 4 ตัวเลข',
          body: 'ชั่วโมงรวม · ค่าแรง · coverage M · coverage A — Manager สแกน 1 วินาทีรู้ว่าสัปดาห์นี้ "ใช้ได้" หรือ "ต้องแก้" ก่อนลง detail ใน grid ด้านล่าง' },
        { num: 2, title: 'Grid 7 วัน × 7 คน = mental model ตรง',
          body: 'แถว = คน (avatar + role) · คอลัมน์ = วัน · cell = shift code + เวลา; ตรงกับวิธีที่ Manager คิดจริง ไม่บังคับ scroll หรือสลับ axis แบบ list view; coverage footer ติดใต้ grid อ่านเป็น column sum ได้ทันที',
          color: WALK.sage },
        { num: 3, title: 'Warning token = surface ปัญหาแต่ไม่ panic',
          body: 'กะบ่าย 71% ใช้ warning (amber) สื่อ "ต้องแก้แต่ยังไม่วิกฤต"; ไม่ใช้ danger red เพื่อหลีก alarm fatigue ที่เกิดจากการเห็น red ทุกเช้า',
          color: WALK.warning },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · ปิดช่องว่าง — spotlight auto-fill toolbar + suggestions
// ═══════════════════════════════════════════════════════════════════
function WorkforceWalk2() {
  return (
    <WalkFrame
      {...ROSTER_COMMON}
      stepIdx={2}
      title="ปิดช่องว่าง · ให้ระบบเสนอก่อน Manager ตัดสิน"
      narrative="กะบ่ายขาด 2 ช่อง — แทนที่จะให้ Manager เดาเอง Auto-fill เสนอ shift (dashed teal border) พร้อมไฮไลต์ conflict สีต่างกัน · เป็น suggestion ไม่ใช่ auto-action; conflict panel สรุป 3 ระดับก่อน Manager กด"
      mockup={rosterPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: ROSTER.toolbar.y,  w: SPOTW,            h: ROSTER.toolbar.h,  color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 270, y: ROSTER.grid.y + 40, w: 200, h: 136,             color: WALK.accent },
        { num: 3, x: WALK.MOCKUP_X + 410, y: ROSTER.grid.y + 186, w: 60,  h: 46,            color: WALK.danger },
        { num: 4, x: SPOTX, y: ROSTER.conflict.y, w: SPOTW,            h: ROSTER.conflict.h, color: WALK.warning },
      ]}
      annotations={[
        { num: 1, title: 'Auto-fill = primary action ไม่ใช่ magic',
          body: 'CTA "Auto-fill" solid teal คือ primary — แต่ไม่ใช่ auto-commit; ปุ่ม "ตรวจ conflicts · 3" อยู่ขวาเป็น secondary เพราะ Manager ควรเห็น suggestion ก่อนตัดสินใจทุกครั้ง' },
        { num: 2, title: 'Suggestion cell · dashed teal + ✦ badge',
          body: 'Cell ที่ระบบเสนอใช้ dashed teal border + ✦ corner badge แยกจาก shift จริง (solid) — ภาษา visual บอก "รอ confirm" โดยไม่ต้องใช้ popup modal',
          color: WALK.accent },
        { num: 3, title: 'Conflict = solid red border บนเซลล์',
          body: 'ภานุพงศ์ (พนักงานใหม่) ถูกจัดกะบ่ายเดี่ยวขัด policy → cell ติด red border ไม่ลบ shift code เดิม — สื่อ disrupt โดยเก็บ context งานที่ Manager กำลังทำ',
          color: WALK.danger },
        { num: 4, title: 'Conflict panel 3 ระดับสี = คุณค่า action',
          body: 'amber = coverage gap (แก้ภายหลังได้) · red = policy violation (ห้ามเลย) · indigo = heads-up OT; ทุก row มีปุ่ม "แก้" ให้ jump เข้า cell ปัญหาโดยตรง',
          color: WALK.warning },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · สลับกะ — spotlight swap queue + impact check + action bar
// ═══════════════════════════════════════════════════════════════════
function WorkforceWalk3() {
  return (
    <WalkFrame
      {...SWAP_COMMON}
      stepIdx={3}
      title="สลับกะ · เครื่องตรวจก่อน Manager เซ็น"
      narrative="คำขอสลับกะมา 2–3 รายการต่อสัปดาห์ — ระบบ pre-check 5 ข้อ (coverage/OT/กฎหมาย/consent/impact) และสรุปเป็น 'พร้อมอนุมัติ' ทำให้ Manager กด confirm ได้ใน 1 คลิกโดยไม่ต้องคำนวณเอง"
      mockup={swapAssetPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX,                          y: SWAP.swapBody.y,     w: 248,           h: SWAP.swapBody.h, color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 254,             y: SWAP.swapBody.y,     w: SPOTW - 258,   h: 158 },
        { num: 3, x: WALK.MOCKUP_X + 254,             y: SWAP.swapBody.y + 170, w: SPOTW - 258, h: 100, color: WALK.success },
        { num: 4, x: WALK.MOCKUP_X + 254,             y: SWAP.swapBody.y + 278, w: SPOTW - 258, h: 52 },
      ]}
      annotations={[
        { num: 1, title: 'Queue + active strip = focus ชัด',
          body: 'รายการด้านซ้าย active row มีแถบ teal 3px + accentSoft bg — ระบุชัดว่ากำลังดู item ใด; status pill coral/success แยก pending/approved โดยไม่ต้อง scan ทีละแถว' },
        { num: 2, title: 'Swap diagram อ่านซ้าย → ขวา',
          body: '2 person card ขนาบไอคอน ↻ ตรงกลาง + label "ขอย้ายไป" / "ขอรับแทน" — direction ชัดโดยไม่ต้องอ่าน text; reason quote สื่อ human context ที่ Manager ควรรู้ก่อน approve' },
        { num: 3, title: 'Impact check 5 ข้อ = transparency ไม่ใช่ black box',
          body: 'แสดงทุก rule ที่ผ่าน แม้ทั้งหมด ✓ — Manager เห็นว่าระบบดูอะไรบ้างจึงไว้ใจ approve; ถ้าซ่อนเป็นแค่ "OK" จะเกิด approval anxiety',
          color: WALK.success },
        { num: 4, title: 'Action bar สรุป + decision ใน 1 แถว',
          body: '"ไม่มีผลกระทบ" recap ก่อนปุ่ม; ปฏิเสธ ghost / อนุมัติ teal solid — ทำ commit ใน 1 คลิกไม่ต้อง re-scan impact list' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ส่งมอบของ — spotlight asset KPI + tabs + assignment table
// ═══════════════════════════════════════════════════════════════════
function WorkforceWalk4() {
  return (
    <WalkFrame
      {...SWAP_COMMON}
      stepIdx={4}
      title="ส่งมอบของ · จาก stock ถึง 2,847 คน"
      narrative="Asset module ต้องตอบ 'พอไหม' (KPI สต็อก/แจก/ค้าง) ก่อน 'ใครถืออะไร' (assignment table) — ของค้างจากคนออกเป็นความเสี่ยงจริงที่ HR ต้องจัดการก่อนวันสุดท้าย จึงแยกเป็น tab เฉพาะ"
      mockup={swapAssetPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: SWAP.assetKpi.y,   w: SPOTW, h: SWAP.assetKpi.h,   color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 350, y: SWAP.assetKpi.y, w: 170, h: SWAP.assetKpi.h, color: WALK.danger },
        { num: 3, x: SPOTX, y: SWAP.assetTabs.y,  w: SPOTW, h: SWAP.assetTabs.h,  color: WALK.indigo },
        { num: 4, x: SPOTX, y: SWAP.assetTable.y, w: SPOTW, h: SWAP.assetTable.h, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: '5 KPI เรียงตาม life-cycle asset',
          body: 'ในสต็อก → แจกไปแล้ว → คำขอใหม่ → เหลือน้อย → รอคืน — เล่าวงจร asset จากซ้ายไปขวา; HR scan แล้วรู้ทันทีว่าวันนี้ต้อง action ตัวไหน' },
        { num: 2, title: 'Danger สำหรับ stock-out เท่านั้น',
          body: 'red token ใช้เฉพาะ "3 sku เหลือน้อย" เพราะ stock-out กระทบพนักงานใหม่ที่รอเครื่องแบบทันที; คำขอใหม่ 18 ใช้ warning (amber) เพราะรอ approve ได้',
          color: WALK.danger },
        { num: 3, title: 'Tab + badge count = backlog ก่อนเข้า tab',
          body: 'คำขอใหม่ 18 badge ใช้ warning bg เน้น pending workload — HR ไม่ต้องคลิก tab ก็รู้ว่า tab ไหนมีงานรออยู่ ไม่ต้องเปิดทุก tab เพื่อเช็ค',
          color: WALK.indigo },
        { num: 4, title: 'Coral tag = ค้างแต่แก้ได้ · danger note = ระบุชิ้น',
          body: '"1 ค้าง" coral pill สื่อ overdue แต่ recoverable (ต่างจาก red = blocking); column "ล่าสุด" + note ป้าย E-3120 ให้ HR หยิบไปทวงได้ตรง ไม่ต้องค้นระบบเพิ่ม',
          color: WALK.coral },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { WorkforceWalk1, WorkforceWalk2, WorkforceWalk3, WorkforceWalk4 });
