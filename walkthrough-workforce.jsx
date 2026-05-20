// walkthrough-workforce.jsx
// Workforce module Design Walkthrough (Manager + HR Admin personas).
// 4 frames following the weekly workforce planning arc:
//   01 มองภาพรวม   — Roster grid 7-day × 7-people + KPI strip
//   02 ปิดช่องว่าง  — Auto-fill suggestion + coverage conflict surface
//   03 สลับกะ      — Shift swap queue + impact pre-check
//   04 ส่งมอบของ   — Asset inventory + assign + return flow
//
// Each mockup is an inline-style replica of the corresponding section in
// mod-workforce.jsx (kept inline so this overview is robust against
// changes in the live mockup file).

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ── Shared shift palette (mirrors SHIFTS in mod-workforce.jsx) ─────
const WF_SHIFT = {
  M: { bg: '#D6EEEC', fg: '#0A6E68', t: '08:00' },
  A: { bg: '#FEF3C7', fg: '#92660C', t: '14:00' },
  N: { bg: '#E1E4FB', fg: '#3F4AAB', t: '22:00' },
  O: { bg: WALK.cream,        fg: WALK.inkFaint, t: 'Off' },
  L: { bg: '#FFE4E1', fg: '#9A3412', t: 'Leave' },
};

// Tiny KPI tile used in frames 1 + 4.
function WfKpi({ label, value, sub, color }) {
  return (
    <div style={{
      ...walkStyles.card(false),
      padding: '12px 14px',
    }}>
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

// Tiny shift cell used in roster grids (frames 1 + 2).
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
      <span style={{
        fontFamily: WALK.fontDisplay, fontSize: 12, fontWeight: 700,
      }}>{code}</span>
      <span style={{ fontSize: 8, fontWeight: 600, opacity: 0.85, marginTop: 1 }}>
        {s.t}
      </span>
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

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · มองภาพรวม — Roster grid + KPI strip
// ═══════════════════════════════════════════════════════════════════
function WorkforceWalk1() {
  const DOW = ['จ.26', 'อ.27', 'พ.28', 'พฤ.29', 'ศ.30', 'ส.31', 'อา.1'];
  const TEAM = [
    { n: 'อาทิตย์ ช.',     r: 'Store Manager', ini: 'AC', c: WALK.sage,   hrs: 45, d: ['M','M','M','M','M','O','O'] },
    { n: 'เบน คิม',         r: 'Senior Cashier', ini: 'BK', c: WALK.accent, hrs: 40, d: ['M','M','O','A','A','A','O'] },
    { n: 'เจสซิก้า ศ.',     r: 'Senior · Buddy', ini: 'JS', c: WALK.coral,  hrs: 36, d: ['M','M','M','O','M','O','O'] },
    { n: 'พริยะ ช.',        r: 'Cashier',        ini: 'PS', c: WALK.butter, hrs: 48, d: ['A','A','A','M','M','M','O'] },
    { n: 'ทารา ซ.',         r: 'Cashier',        ini: 'TS', c: WALK.accent, hrs: 36, d: ['A','A','O','O','A','A','M'] },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* KPI strip — 4 tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <WfKpi label="ชั่วโมงรวม" value="280h" sub="เป้า 280h · พอดี" color={WALK.accent}/>
        <WfKpi label="ค่าแรงประมาณ" value="฿58,400" sub="incl. OT ฿2,800"/>
        <WfKpi label="กะเช้า" value="100%" sub="4/4 ทุกวัน" color={WALK.success}/>
        <WfKpi label="กะบ่าย" value="71%" sub="ขาด 2 ช่อง พ-พฤ" color={WALK.warning}/>
      </div>

      {/* Roster grid */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        {/* Header row */}
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
            <div key={d} style={{
              padding: '10px 4px', textAlign: 'center',
              borderLeft: `1px solid ${WALK.hairlineSoft}`,
            }}>{d}</div>
          ))}
          <div style={{ padding: '10px 4px', textAlign: 'center', borderLeft: `1px solid ${WALK.hairlineSoft}` }}>ชม.</div>
        </div>

        {TEAM.map(t => (
          <div key={t.n} style={{
            display: 'grid',
            gridTemplateColumns: '160px repeat(7, 1fr) 56px',
            borderTop: `1px solid ${WALK.hairlineSoft}`,
            alignItems: 'stretch',
          }}>
            <div style={{
              padding: '8px 12px', display: 'flex',
              alignItems: 'center', gap: 8, minWidth: 0,
            }}>
              <WalkAvatar initials={t.ini} color={t.c} size={26}/>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 600, color: WALK.ink,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{t.n}</div>
                <div style={{ fontSize: 9.5, color: WALK.inkMuted }}>{t.r}</div>
              </div>
            </div>
            {t.d.map((s, di) => (
              <div key={di} style={{
                borderLeft: `1px solid ${WALK.hairlineSoft}`,
                padding: 4, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <WfShiftCell code={s}/>
              </div>
            ))}
            <div style={{
              borderLeft: `1px solid ${WALK.hairlineSoft}`,
              padding: '8px 4px', textAlign: 'center',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 700,
                color: WALK.ink, letterSpacing: '-0.015em',
              }}>{t.hrs}</span>
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
            color: WALK.inkMuted, textTransform: 'uppercase',
            letterSpacing: '.06em', display: 'flex', alignItems: 'center',
          }}>Coverage</div>
          {[
            { m: 4, a: 2, ok: false }, { m: 4, a: 2, ok: false },
            { m: 3, a: 1, ok: false }, { m: 2, a: 1, ok: false },
            { m: 4, a: 3, ok: true  }, { m: 1, a: 2, ok: false },
            { m: 1, a: 0, ok: false },
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
    </div>
  );

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="มองภาพรวม · ดูทั้งสัปดาห์ในจอเดียว"
      narrative="เปิด Roster Manager ต้องเห็นทั้ง 'ใคร ทำเมื่อไหร่' (grid) และ 'พอไหม คุ้มไหม' (KPI) พร้อมกัน — KPI strip บนสุดสรุปสุขภาพกะใน 4 ตัวเลข; grid คน × วัน ให้ context ระดับบุคคล"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 4,   w: 870, h: 64 },
        { num: 2, x: WALK.MOCKUP_X + 660, y: WALK.BODY_TOP + 4,   w: 214, h: 64, color: WALK.warning },
        { num: 3, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 84,  w: 870, h: 268 },
        { num: 4, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 352, w: 870, h: 46, color: WALK.sage },
      ]}
      annotations={[
        { num: 1, title: 'KPI strip = สุขภาพกะใน 4 ตัวเลข',
          body: 'ชั่วโมงรวม · ค่าแรง · coverage M · coverage A — Manager สแกน 1 วินาทีรู้ว่าสัปดาห์นี้ "ใช้ได้" หรือ "ต้องแก้" ก่อนลง detail ใน grid' },
        { num: 2, title: 'Warning token = surface ปัญหา',
          body: 'กะบ่าย 71% ใช้ warning (amber) — สื่อ "ต้องแก้แต่ยังไม่วิกฤต"; ไม่ใช้ danger red เพื่อไม่สร้าง alarm fatigue กับ Manager ที่ดูทุกเช้า' },
        { num: 3, title: 'Grid 7 วัน × 7 คน = mental model ตรง',
          body: 'แถว = คน (avatar + role) · คอลัมน์ = วัน · cell = shift code + เวลา; ตรงกับวิธีที่ Manager คิดจริง — ไม่บังคับให้สลับ axis แบบ list view' },
        { num: 4, title: 'Coverage footer ติด grid',
          body: 'แสดง M/A coverage ใต้แต่ละวัน sticky กับ grid — สื่อว่า "coverage = sum ของ column" ไม่ใช่ตัวเลขลอย ทำให้ debug ปัญหาได้ทันทีว่าวันไหนขาด' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · ปิดช่องว่าง — Auto-fill + conflict highlight
// ═══════════════════════════════════════════════════════════════════
function WorkforceWalk2() {
  const DOW = ['จ.26', 'อ.27', 'พ.28', 'พฤ.29', 'ศ.30', 'ส.31', 'อา.1'];
  // Mini roster — focuses on the conflict (พ-พฤ ขาดกะบ่าย) + suggestion fill
  const TEAM = [
    { ini: 'BK', c: WALK.accent, n: 'เบน คิม',     d: ['M','M','O',{s:'A',suggest:true},'A','A','O'] },
    { ini: 'PS', c: WALK.butter, n: 'พริยะ ช.',    d: ['A','A','A','M','M','M','O'] },
    { ini: 'TS', c: WALK.accent, n: 'ทารา ซ.',     d: ['A','A',{s:'',ghost:true},{s:'',ghost:true},'A','A','M'] },
    { ini: 'MP', c: WALK.sage,   n: 'มายา พ.',     d: ['','',{s:'A',suggest:true},{s:'A',suggest:true},'M','A','A'] },
    { ini: 'PS', c: WALK.coral,  n: 'ภานุพงศ์',     d: ['M','M','M',{s:'A',conflict:true},'M','O','O'] },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Toolbar with Auto-fill CTA */}
      <div style={{
        ...walkStyles.card(false),
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button style={{
          ...walkStyles.btnPrimary,
          background: WALK.accent, fontSize: 12.5,
        }}>✦ Auto-fill (จากความต้องการ)</button>
        <button style={{ ...walkStyles.btnGhost, fontSize: 12.5 }}>↻ Copy from last week</button>
        <button style={{ ...walkStyles.btnGhost, fontSize: 12.5, color: WALK.warning, borderColor: WALK.warningSoft }}>
          ⚠ ตรวจ conflicts · 3
        </button>
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 11, color: WALK.inkMuted }}>
          แนะนำ 4 ช่อง · ขาด 2 ช่อง · conflict 1 ช่อง
        </span>
      </div>

      {/* Mini roster with suggestions + conflicts */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '140px repeat(7, 1fr)',
          background: WALK.creamSoft,
          borderBottom: `1px solid ${WALK.hairline}`,
          fontSize: 9.5, fontWeight: 700,
          color: WALK.inkMuted,
          textTransform: 'uppercase', letterSpacing: '.06em',
        }}>
          <div style={{ padding: '10px 14px' }}>พนักงาน</div>
          {DOW.map(d => (
            <div key={d} style={{
              padding: '10px 4px', textAlign: 'center',
              borderLeft: `1px solid ${WALK.hairlineSoft}`,
            }}>{d}</div>
          ))}
        </div>
        {TEAM.map(t => (
          <div key={t.ini + t.n} style={{
            display: 'grid',
            gridTemplateColumns: '140px repeat(7, 1fr)',
            borderTop: `1px solid ${WALK.hairlineSoft}`,
          }}>
            <div style={{
              padding: '8px 12px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <WalkAvatar initials={t.ini} color={t.c} size={24}/>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: WALK.ink }}>{t.n}</span>
            </div>
            {t.d.map((s, di) => {
              const cell = typeof s === 'string'
                ? { code: s }
                : { code: s.s, suggest: s.suggest, ghost: s.ghost, conflict: s.conflict };
              return (
                <div key={di} style={{
                  borderLeft: `1px solid ${WALK.hairlineSoft}`,
                  padding: 4, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <WfShiftCell {...cell}/>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Conflict + suggestion panel */}
      <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
        <div style={{
          ...walkStyles.eyebrow, fontSize: 10,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          Conflicts + คำเตือน
          <WalkTag bg={WALK.warningSoft} color={WALK.warning}>3 ข้อ</WalkTag>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
          {[
            { st: 'warn', l: 'กะบ่ายขาด 2 ช่อง (พ-พฤ)', sub: 'เป้า 3 คน · ขณะนี้ 1 คน · peak hour' },
            { st: 'danger', l: 'ภานุพงศ์ (ใหม่) จัดทำกะบ่ายเดี่ยว', sub: 'onboarding ต้องมี senior shadow ก่อน 30 วัน' },
            { st: 'info', l: 'พริยะ ทำ OT 8h สัปดาห์นี้', sub: 'ใกล้ limit 12h · ขออนุมัติล่วงหน้า' },
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
                <button style={{
                  ...walkStyles.btnGhost, padding: '3px 9px', fontSize: 10.5,
                }}>แก้</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="ปิดช่องว่าง · ให้ระบบเสนอก่อน Manager ตัดสิน"
      narrative="กะบ่ายขาด 2 ช่อง — แทนที่จะให้ Manager เดาเอง Auto-fill เสนอ shift ที่ระบบคิดว่าเหมาะที่สุด (dashed teal border) พร้อมไฮไลต์ conflict สีต่างกัน · เป็น suggestion ไม่ใช่ auto-action"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 4,   w: 280, h: 50 },
        { num: 2, x: WALK.MOCKUP_X + 270, y: WALK.BODY_TOP + 110, w: 200, h: 132, color: WALK.accent },
        { num: 3, x: WALK.MOCKUP_X + 410, y: WALK.BODY_TOP + 200, w: 60,  h: 48,  color: WALK.danger },
        { num: 4, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 286, w: 870, h: 192, color: WALK.warning },
      ]}
      annotations={[
        { num: 1, title: 'Auto-fill = primary action',
          body: 'CTA "Auto-fill (จากความต้องการ)" ใช้ teal solid — เน้นว่านี่คือทางออกหลักของหน้านี้; copy/conflict-check เป็น ghost รอง รวบ action ทั้งหมดในแถวเดียวบนสุด' },
        { num: 2, title: 'Suggestion = dashed teal + sparkle',
          body: 'Cell ที่ระบบเสนอใช้ dashed teal border + ✦ corner badge — สื่อ "ยังไม่ commit, รอ Manager confirm"; แยกชัดจาก shift จริงที่ solid' },
        { num: 3, title: 'Conflict = solid danger border',
          body: 'ภานุพงศ์ (พนักงานใหม่) ถูกจัดกะบ่ายเดี่ยวขัด policy → cell ติด red border รอบนอก แต่ไม่ replace shift code; visual disrupt แต่ไม่ลบงานที่ Manager กำลังทำ' },
        { num: 4, title: 'Conflict panel 3 ระดับสี',
          body: 'amber = coverage gap (แก้ภายหลังได้) · red = policy violation (ห้าม) · indigo = info/นโยบาย OT (heads-up); ทุก row มีปุ่ม "แก้" jump เข้า cell ปัญหา' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · สลับกะ — Shift swap queue + impact pre-check
// ═══════════════════════════════════════════════════════════════════
function WorkforceWalk3() {
  const QUEUE = [
    { id: 'SW-1042', a: 'BK', ac: WALK.accent, b: 'MP', bc: WALK.sage,
      who: 'เบน ↔ มายา', d: 'พ. 28 พ.ค.', t: '2 ชม.ที่แล้ว', st: 'pending', active: true },
    { id: 'SW-1041', a: 'TS', ac: WALK.accent, b: 'PS', bc: WALK.butter,
      who: 'ทารา ↔ พริยะ', d: 'พฤ. 29 พ.ค.', t: '5 ชม.ที่แล้ว', st: 'pending' },
    { id: 'SW-1040', a: 'JS', ac: WALK.coral, b: 'BK', bc: WALK.accent,
      who: 'เจสซิก้า ↔ เบน', d: 'จ. 26 พ.ค.', t: 'เมื่อวาน', st: 'approved' },
  ];

  const mockup = (
    <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '260px 1fr' }}>
      {/* Queue list */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '10px 14px',
          borderBottom: `1px solid ${WALK.hairlineSoft}`,
          background: WALK.creamSoft,
        }}>
          <div style={{ ...walkStyles.eyebrow, fontSize: 10 }}>กล่องงาน</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 14, marginTop: 2 }}>3 คำขอสลับกะ</h3>
        </div>
        {QUEUE.map(q => (
          <div key={q.id} style={{
            padding: '12px 14px',
            background: q.active ? WALK.accentSoft : WALK.surface,
            borderTop: `1px solid ${WALK.hairlineSoft}`,
            borderLeft: q.active ? `3px solid ${WALK.accent}` : `3px solid transparent`,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 6,
            }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Swap diagram */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ ...walkStyles.eyebrow, fontSize: 10 }}>SW-1042</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 14, marginTop: 2 }}>
            ขอสลับกะ พ. 28 พ.ค.
          </h3>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 48px 1fr',
            gap: 10, marginTop: 12, alignItems: 'center',
          }}>
            {/* Person A */}
            <div style={{
              padding: 12, background: WALK.creamSoft,
              borderRadius: 10, border: `1px solid ${WALK.hairlineSoft}`,
              textAlign: 'center',
            }}>
              <WalkAvatar initials="BK" color={WALK.accent} size={32}/>
              <div style={{ fontFamily: WALK.fontDisplay, fontSize: 12.5, fontWeight: 600, color: WALK.ink, marginTop: 6 }}>เบน คิม</div>
              <div style={{ ...walkStyles.eyebrow, fontSize: 8, marginTop: 6 }}>ขอย้ายไป</div>
              <div style={{
                marginTop: 2, padding: '4px 10px',
                background: WALK.surface, borderRadius: 6,
                fontSize: 10.5, fontWeight: 600, color: WALK.ink,
                display: 'inline-block',
              }}>A · 14-23</div>
            </div>
            {/* Swap icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 99,
                background: WALK.accentSoft, color: WALK.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700,
              }}>↻</div>
            </div>
            {/* Person B */}
            <div style={{
              padding: 12, background: WALK.creamSoft,
              borderRadius: 10, border: `1px solid ${WALK.hairlineSoft}`,
              textAlign: 'center',
            }}>
              <WalkAvatar initials="MP" color={WALK.sage} size={32}/>
              <div style={{ fontFamily: WALK.fontDisplay, fontSize: 12.5, fontWeight: 600, color: WALK.ink, marginTop: 6 }}>มายา พาเทล</div>
              <div style={{ ...walkStyles.eyebrow, fontSize: 8, marginTop: 6 }}>ขอรับแทน</div>
              <div style={{
                marginTop: 2, padding: '4px 10px',
                background: WALK.surface, borderRadius: 6,
                fontSize: 10.5, fontWeight: 600, color: WALK.ink,
                display: 'inline-block',
              }}>M · 08-17</div>
            </div>
          </div>
          <div style={{
            marginTop: 10, padding: '8px 12px',
            background: WALK.creamSoft, borderRadius: 8,
            borderLeft: `3px solid ${WALK.accent}`,
            fontSize: 11.5, color: WALK.inkSoft,
            fontStyle: 'italic', lineHeight: 1.5,
          }}>"นัดหมอตอนเช้า" — เบน คิม</div>
        </div>

        {/* Impact check */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ ...walkStyles.eyebrow, fontSize: 10 }}>ตรวจอัตโนมัติ</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 13, marginTop: 2 }}>ผลกระทบ · 5 ข้อ</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
            {[
              { ok: true,  l: 'กะเช้ายังครบ 4/4 หลังสลับ' },
              { ok: true,  l: 'มายาตอบรับแล้ว 1 ชม.ก่อน' },
              { ok: true,  l: 'พักระหว่างกะ > 9 ชม. ตามกฎหมาย' },
              { ok: true,  l: 'OT ทั้งคู่ไม่เกิน limit (40h · 36h)' },
              { ok: true,  l: 'ไม่กระทบ OT ที่ approved แล้ว' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0',
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 99,
                  background: WALK.successSoft, color: WALK.success,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, flexShrink: 0,
                }}>✓</span>
                <span style={{ fontSize: 11.5, color: WALK.ink, fontWeight: 500 }}>{r.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action bar */}
        <div style={{
          padding: '12px 16px', background: WALK.surface,
          border: `1px solid ${WALK.hairline}`, borderRadius: 12,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 99,
              background: WALK.successSoft, color: WALK.success,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
            }}>✓</span>
            <span style={{ fontSize: 11.5, color: WALK.inkSoft }}>ไม่มีผลกระทบ · พร้อมอนุมัติ</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ ...walkStyles.btnGhost, padding: '6px 12px', fontSize: 11.5 }}>✕ ปฏิเสธ</button>
            <button style={{ ...walkStyles.btnPrimary, padding: '6px 14px', fontSize: 11.5 }}>✓ อนุมัติสลับ</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="สลับกะ · เครื่องตรวจก่อน Manager เซ็น"
      narrative="คำขอสลับกะมา 2-3 รายการต่อสัปดาห์ — Manager ไม่ต้องเช็คเองว่าสลับแล้วจะกระทบ coverage/OT/กฎหมายหรือไม่; ระบบ pre-check ครบ 5 ข้อแล้วสรุปเป็น 'พร้อมอนุมัติ' หรือ 'มีคำเตือน'"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 4,   w: 254, h: 320 },
        { num: 2, x: WALK.MOCKUP_X + 274, y: WALK.BODY_TOP + 4,   w: 600, h: 180 },
        { num: 3, x: WALK.MOCKUP_X + 274, y: WALK.BODY_TOP + 198, w: 600, h: 168, color: WALK.success },
        { num: 4, x: WALK.MOCKUP_X + 274, y: WALK.BODY_TOP + 380, w: 600, h: 50 },
      ]}
      annotations={[
        { num: 1, title: 'Queue + active = accent strip',
          body: 'รายการคำขอด้านซ้าย · active row มีแถบ teal 3px ซ้ายและพื้น accentSoft — ระบุชัดว่ากำลังดู item ไหน · status pill (รออนุมัติ/อนุมัติ) ใช้ coral/success token' },
        { num: 2, title: 'Swap diagram อ่านซ้าย→ขวา',
          body: '2 person card ขนาบไอคอน ↻ ตรงกลาง พร้อม label "ขอย้ายไป" / "ขอรับแทน" — สื่อ direction ของการสลับชัด; reason quote ใต้ diagram เป็น Manager-facing context' },
        { num: 3, title: 'Impact check 5 ข้อ = trust',
          body: 'แสดงทุก rule ที่ระบบเช็คแม้ทั้งหมด pass — Manager เห็นว่าระบบดูอะไรบ้างจึงไว้ใจ approve; ไม่ใช่ black box "OK" แต่ explicit "coverage · พัก · OT · approved OT"' },
        { num: 4, title: 'Action bar สรุป + decision',
          body: '"ไม่มีผลกระทบ · พร้อมอนุมัติ" recap ก่อนปุ่ม · ปฏิเสธ ghost / อนุมัติ teal solid — ทำ commit ใน 1 คลิก ไม่ต้อง re-scan impact list' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ส่งมอบของ — Asset inventory + assign + return
// ═══════════════════════════════════════════════════════════════════
function WorkforceWalk4() {
  const TABS = [
    { k: 'assignments', l: 'ของที่แจกออก', badge: '2,847', active: true },
    { k: 'catalog',     l: 'Catalog',       badge: '11' },
    { k: 'requests',    l: 'คำขอใหม่',     badge: '18',    warn: true },
    { k: 'returns',     l: 'รอคืน',         badge: '42' },
  ];
  const ASS = [
    { who: 'เบน คิม',           ini: 'BK', c: WALK.accent, items: 5, value: '฿42,800', overdue: 0, last: 'laptop 12 พ.ค.' },
    { who: 'พริยะ ชาห์',         ini: 'PS', c: WALK.butter, items: 4, value: '฿2,400',  overdue: 0, last: 'เครื่องแบบ 2 พ.ค.' },
    { who: 'ทารา ซัลลิแวน',     ini: 'TS', c: WALK.accent, items: 3, value: '฿1,800',  overdue: 1, last: 'รองเท้า 1 พ.ค.', note: 'ป้ายเก่า E-3120' },
    { who: 'เจสซิก้า ศรี',       ini: 'JS', c: WALK.coral,  items: 5, value: '฿45,200', overdue: 0, last: 'laptop 28 เม.ย.' },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* KPI strip — 5 tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        <WfKpi label="ในสต็อก" value="3,420" sub="11 ประเภท"/>
        <WfKpi label="แจกไปแล้ว" value="2,847" sub="83% utilization"/>
        <WfKpi label="คำขอใหม่" value="18" sub="รอ approve" color={WALK.warning}/>
        <WfKpi label="เหลือน้อย" value="3 sku" sub="ต้องสั่งซื้อ" color={WALK.danger}/>
        <WfKpi label="รอคืน" value="42" sub="จากคนออก"/>
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 4,
        borderBottom: `1px solid ${WALK.hairline}`,
      }}>
        {TABS.map(t => (
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
              background: t.warn ? WALK.warningSoft
                       : t.active ? WALK.accentSoft : WALK.creamSoft,
              color: t.warn ? WALK.warning
                   : t.active ? WALK.ink : WALK.inkMuted,
              fontSize: 9.5, fontWeight: 700,
            }}>{t.badge}</span>
          </div>
        ))}
      </div>

      {/* Assignments table */}
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
          <div>พนักงาน</div>
          <div>สาขา</div>
          <div>จำนวน</div>
          <div>มูลค่า</div>
          <div>ค้าง</div>
          <div>ล่าสุด</div>
          <div style={{ textAlign: 'right' }}>Action</div>
        </div>
        {ASS.map(a => (
          <div key={a.who} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 80px 80px 100px 90px 1.4fr 70px',
            padding: '12px 16px',
            borderTop: `1px solid ${WALK.hairlineSoft}`,
            alignItems: 'center', fontSize: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <WalkAvatar initials={a.ini} color={a.c} size={26}/>
              <span style={{ fontWeight: 600, color: WALK.ink }}>{a.who}</span>
            </div>
            <div style={{ color: WALK.inkMuted, fontSize: 11 }}>CTW</div>
            <div style={{ fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 700 }}>{a.items}</div>
            <div style={{
              fontFamily: WALK.fontDisplay, fontSize: 12.5,
              fontWeight: 600, fontVariantNumeric: 'tabular-nums',
            }}>{a.value}</div>
            <div>
              {a.overdue > 0
                ? <WalkTag bg={WALK.coralSoft} color={WALK.coral}>{a.overdue} ค้าง</WalkTag>
                : <span style={{ fontSize: 11, color: WALK.inkFaint }}>—</span>}
            </div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, lineHeight: 1.4 }}>
              {a.last}
              {a.note && (
                <div style={{ color: WALK.danger, fontWeight: 600, marginTop: 1 }}>
                  {a.note}
                </div>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <button style={{
                ...walkStyles.btnGhost, padding: '3px 10px', fontSize: 10.5,
              }}>เปิด</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HR Admin · คุณนิภา"
      title="ส่งมอบของ · จาก stock ถึง 2,847 คน"
      narrative="Asset module ต้องตอบ 'พอไหม' (KPI สต็อก/แจก/ค้าง) ก่อน 'ใครถืออะไร' (assignment table) — ของค้างจากคนออกเป็นความเสี่ยงจริงที่ HR ต้องจัดการก่อนวันสุดท้าย ดังนั้นแยกเป็น tab เฉพาะ"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 4,   w: 870, h: 70 },
        { num: 2, x: WALK.MOCKUP_X + 350, y: WALK.BODY_TOP + 4,   w: 168, h: 70, color: WALK.danger },
        { num: 3, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 86,  w: 870, h: 36 },
        { num: 4, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 134, w: 870, h: 240, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: '5 KPI เรียงตาม life-cycle',
          body: 'ในสต็อก → แจกไปแล้ว → คำขอใหม่ → เหลือน้อย → รอคืน — เล่าวงจร asset จากซ้ายไปขวา; HR scan แล้วรู้ทันทีว่าวันนี้ต้อง action ตัวไหน' },
        { num: 2, title: 'Danger สำหรับ "เหลือน้อย" เท่านั้น',
          body: 'ใช้ red token เฉพาะ "3 sku เหลือน้อย · ต้องสั่งซื้อ" — เพราะถ้า stock-out จะกระทบทันที (พนักงานใหม่ไม่ได้เครื่องแบบ); คำขอใหม่ใช้ warning เพราะรอได้' },
        { num: 3, title: 'Tab + count badge',
          body: 'แต่ละ tab มี badge แสดงจำนวน (2,847 · 11 · 18 · 42); คำขอใหม่ 18 ใช้ warning bg เน้น pending workload — HR ไม่ต้องเข้า tab ก็เห็น backlog' },
        { num: 4, title: 'Coral tag = ของค้างที่ต้องเตือน',
          body: 'แถวที่มี "1 ค้าง" + ป้าย E-3120 ใช้ coral (อ่อนกว่า red) — สื่อ "เกินกำหนดแต่แก้ไขได้"; column "ล่าสุด" ใช้ระบุของชิ้นที่ค้างให้ HR หยิบไปทวงตรง' },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { WorkforceWalk1, WorkforceWalk2, WorkforceWalk3, WorkforceWalk4 });
