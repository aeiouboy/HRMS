(() => {
// walkthrough-employee.jsx
// Employee module Design Walkthrough — Option C: 3 persona sub-sections.
//
// RETROFIT PATTERN (static page + rotating spotlight per sub-section):
//   selfPageMockup()    — Employee self-service profile page
//   managerPageMockup() — Manager team view page
//   adminPageMockup()   — Admin registry + detail hub page
//
// Sub-sections:
//   Self     (2 frames) · EmployeeWalkSelf1, EmployeeWalkSelf2
//   Manager  (2 frames) · EmployeeWalkManager1, EmployeeWalkManager2
//   Admin    (2 frames) · EmployeeWalkAdmin1, EmployeeWalkAdmin2

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

const SPOTX = WALK.MOCKUP_X - 4;
const SPOTW = WALK.MOCKUP_W + 8;

// ══════════════════════════════════════════════════════════════════════
// PERSONA A — Self-service page mockup
// Mirrors Frame 1 of the original employee walkthrough.
// Contains: hero profile card, tab strip, two-column body (info + tasks/docs).
// ══════════════════════════════════════════════════════════════════════
function selfPageMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Hero profile card */}
      <div style={{ ...walkStyles.card(false), minHeight: 130, paddingRight: 110 }}>
        <div style={{
          position: 'absolute', width: 130, height: 150, right: -40, top: -40,
          background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
          opacity: 0.5,
        }}/>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', position: 'relative' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: `linear-gradient(135deg, ${WALK.accent}, ${WALK.sage})`,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: WALK.fontDisplay, fontSize: 26, fontWeight: 700, flexShrink: 0,
          }}>MS</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={walkStyles.eyebrow}>Employee ID · E-58231</div>
            <h2 style={{
              margin: '4px 0 0',
              fontFamily: WALK.fontDisplay,
              fontSize: 21, fontWeight: 600, color: WALK.ink, letterSpacing: '-0.01em',
            }}>
              มาริสา สงวนศักดิ์
              <span style={{ color: WALK.inkMuted, fontWeight: 400, fontSize: 15, marginLeft: 8 }}>
                · Cashier · Central World
              </span>
            </h2>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <WalkTag bg={WALK.accent}>พนักงานประจำ</WalkTag>
              <WalkTag bg={WALK.creamSoft} color={WALK.inkSoft}>ผ่านทดลองงาน</WalkTag>
              <WalkTag bg={WALK.butterSoft} color={WALK.ink}>รออัปเดต PND91</WalkTag>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={walkStyles.eyebrow}>อายุงาน</div>
            <div style={{ fontFamily: WALK.fontDisplay, fontSize: 26, fontWeight: 700, color: WALK.accent }}>2 ปี 7 ด.</div>
          </div>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{
        display: 'flex', gap: 4, padding: 4,
        background: WALK.surface, borderRadius: 10,
        border: `1px solid ${WALK.hairline}`,
      }}>
        {[
          { l: 'ข้อมูลส่วนตัว', on: true },
          { l: 'ข้อมูลงาน' },
          { l: 'เอกสาร · 14' },
          { l: 'สิทธิประโยชน์' },
          { l: 'ฉุกเฉิน' },
          { l: 'ผังองค์กร' },
        ].map(t => (
          <span key={t.l} style={{
            padding: '7px 12px', borderRadius: 7,
            fontSize: 11.5, fontWeight: 600,
            background: t.on ? WALK.accent : 'transparent',
            color: t.on ? '#fff' : WALK.inkSoft,
          }}>{t.l}</span>
        ))}
      </div>

      {/* Two-column body */}
      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1.35fr 1fr' }}>
        {/* Personal info */}
        <div style={{ ...walkStyles.card(false), padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 16, margin: 0 }}>ข้อมูลส่วนตัว</h3>
            <span style={{ flex: 1 }}/>
            <WalkTag bg={WALK.creamSoft} color={WALK.inkSoft}>🛡 เข้ารหัส</WalkTag>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 12, columnGap: 18 }}>
            {[
              ['วันเกิด',      '14 มี.ค. 2538 · 30 ปี'],
              ['เลขบัตร ปชช.', '1-1014-•••••-3-9'],
              ['สัญชาติ',     'ไทย'],
              ['สมรส',        'โสด'],
              ['เบอร์โทร',    '+66 89-•••-4521'],
              ['อีเมล',       'marisa.s@central.co.th'],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>{l}</div>
                <div style={{ fontSize: 12.5, marginTop: 3, fontWeight: 500, color: WALK.ink }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: tasks + docs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...walkStyles.card(true), padding: '14px 16px' }}>
            <div style={walkStyles.eyebrow}>ต้องอัปเดต</div>
            <h3 style={{ margin: '4px 0 10px', fontFamily: WALK.fontDisplay, fontSize: 15, fontWeight: 600 }}>2 รายการรอคุณ</h3>
            {[
              { t: 'PND91 ปี 2567 · ยืนยันรายได้', s: 'ครบกำหนด 30 เม.ย.', u: true },
              { t: 'ที่อยู่ปัจจุบันยังตรงกับบัตร?', s: 'ทบทวนทุก 6 เดือน', u: false },
            ].map(d => (
              <div key={d.t} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0', borderTop: `1px solid ${WALK.hairlineSoft}`,
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 7,
                  background: WALK.surface, border: `1px solid ${WALK.hairline}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, color: d.u ? WALK.warning : WALK.inkMuted,
                }}>{d.u ? '⚠' : '📄'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: WALK.ink }}>{d.t}</div>
                  <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 1 }}>{d.s}</div>
                </div>
                <span style={{ color: WALK.inkMuted, fontSize: 12 }}>›</span>
              </div>
            ))}
          </div>

          <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 14, margin: 0 }}>เอกสาร · ล่าสุด</h3>
            <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 2 }}>14 ฉบับในแฟ้ม · เก็บ 5 ปี</div>
            <div style={{ marginTop: 8 }}>
              {[
                ['สัญญาจ้างงาน 2566.pdf', '12 ก.ย. 66'],
                ['ใบรับรองเงินเดือน.pdf', '05 มี.ค. 68'],
              ].map(([n, d]) => (
                <div key={n} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 0', borderTop: `1px solid ${WALK.hairlineSoft}`,
                }}>
                  <div style={{
                    width: 22, height: 26, borderRadius: 4,
                    background: WALK.warningSoft, color: WALK.warning,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
                  }}>📄</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: WALK.ink }}>{n}</div>
                    <div style={{ fontSize: 10, color: WALK.inkMuted }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Y-offsets for self page (frame-space)
const SELF = {
  hero:   { y: WALK.BODY_TOP,       h: 168 },
  tabs:   { y: WALK.BODY_TOP + 182, h: 50  },
  info:   { y: WALK.BODY_TOP + 246, h: 220 },
  tasks:  { y: WALK.BODY_TOP + 246, h: 460 },  // right column (info + right)
  right:  { y: WALK.BODY_TOP + 246, h: 460 },
};

const SELF_FRAME_H = 780;
const SELF_COMMON = {
  totalSteps: 2,
  persona: 'Employee · มาริสา',
  frameHeight: SELF_FRAME_H,
};

// ══════════════════════════════════════════════════════════════════════
// PERSONA B — Manager team view page mockup
// Mirrors Frame 2 of the original employee walkthrough.
// Contains: page head, 4 stat cards, team table.
// ══════════════════════════════════════════════════════════════════════
function managerPageMockup() {
  const team = [
    { i: 'มา', c: WALK.accent, n: 'มาริสา สงวนศักดิ์', id: 'E-58231', r: 'Cashier',        s: 'ทำงาน', y: '2 ปี 7 ด.', rev: 'กลางปี',   rate: '4.2' },
    { i: 'ธี', c: WALK.sage,   n: 'ธีรพัฒน์ มงคล',     id: 'E-49102', r: 'Senior Cashier', s: 'ทำงาน', y: '4 ปี 1 ด.', rev: 'ปลายปี',  rate: '4.5' },
    { i: 'กั', c: WALK.butter, n: 'กัลยา ภูวดล',       id: 'E-61480', r: 'Sales Asst.',    s: 'ลาป่วย', y: '1 ปี 3 ด.', rev: 'กลางปี',  rate: '3.8' },
    { i: 'ปร', c: WALK.ink,    n: 'ปรีชา วรพงษ์',      id: 'E-72915', r: 'Floor Staff',    s: 'ทำงาน', y: '7 ด.',      rev: 'ทดลองงาน', rate: '—'  },
    { i: 'นิ', c: WALK.coral,  n: 'นิภาพร แสนสุข',     id: 'E-58102', r: 'Cashier',        s: 'ทำงาน', y: '3 ปี 4 ด.', rev: 'กลางปี',  rate: '4.0' },
  ];

  const StatBox = ({ l, v, sub, color = WALK.ink }) => (
    <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
      <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>{l}</div>
      <div style={{ fontFamily: WALK.fontDisplay, fontSize: 22, fontWeight: 700, color, lineHeight: 1.1, marginTop: 4 }}>{v}</div>
      <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2 }}>{sub}</div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Page head */}
      <div>
        <div style={walkStyles.eyebrow}>Employee Center · มุมผู้จัดการ</div>
        <h2 style={{
          margin: '4px 0 2px',
          fontFamily: WALK.fontDisplay,
          fontSize: 22, fontWeight: 600, color: WALK.ink, letterSpacing: '-0.01em',
        }}>ทีมของฉัน · CTW Floor 1</h2>
        <div style={{ fontSize: 12.5, color: WALK.inkMuted }}>
          14 คนในทีม · 12 อยู่ทำงานวันนี้ · 1 ลาป่วย · 1 ลาพักร้อน
        </div>
      </div>

      {/* 4 stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <StatBox l="หัวคนในทีม"     v="14"  sub="+2 จากเดือนก่อน"/>
        <StatBox l="อยู่ทำงานวันนี้"   v="12"  sub="86% ของทีม" color={WALK.accent}/>
        <StatBox l="คะแนนเฉลี่ย"   v="4.1" sub="รอบกลางปี · 13 คน"/>
        <StatBox l="รออนุมัติ"      v="3"   sub="ลา 2 · OT 1" color={WALK.warning}/>
      </div>

      {/* Team table */}
      <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 15, margin: 0 }}>รายชื่อทีม</h3>
          <span style={{ flex: 1 }}/>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 10px',
            background: WALK.creamSoft, border: `1px solid ${WALK.hairline}`,
            borderRadius: 8, fontSize: 11, color: WALK.inkMuted,
          }}>🔍 ค้นหาในทีม…</div>
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '32px 2fr 1.4fr 1fr 0.9fr 0.9fr 60px',
          padding: '8px 10px', borderRadius: 6,
          background: WALK.creamSoft,
          fontSize: 9.5, fontWeight: 700, color: WALK.inkMuted,
          letterSpacing: '.06em', textTransform: 'uppercase',
        }}>
          <div/><div>ชื่อ · รหัส</div><div>ตำแหน่ง</div>
          <div>สถานะวันนี้</div><div>อายุงาน</div><div>รอบประเมิน</div>
          <div style={{ textAlign: 'right' }}>คะแนน</div>
        </div>

        {/* Team rows */}
        {team.map(t => (
          <div key={t.id} style={{
            display: 'grid',
            gridTemplateColumns: '32px 2fr 1.4fr 1fr 0.9fr 0.9fr 60px',
            padding: '10px 10px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
            alignItems: 'center',
          }}>
            <WalkAvatar initials={t.i} color={t.c} size={28} border={WALK.surface}/>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink }}>{t.n}</div>
              <div style={{ fontSize: 10, color: WALK.inkFaint, letterSpacing: '.04em' }}>{t.id}</div>
            </div>
            <div style={{ fontSize: 11.5, color: WALK.inkSoft }}>{t.r}</div>
            <div>
              <WalkTag
                bg={t.s === 'ทำงาน' ? WALK.accent : t.s === 'OT' ? WALK.butter : WALK.coral}
                color="#fff">
                {t.s === 'ทำงาน' && <span style={{ width: 5, height: 5, borderRadius: 99, background: '#fff' }}/>}
                {t.s}
              </WalkTag>
            </div>
            <div style={{ fontSize: 11.5, color: WALK.inkSoft }}>{t.y}</div>
            <div style={{ fontSize: 11.5, color: WALK.inkSoft }}>{t.rev}</div>
            <div style={{
              textAlign: 'right',
              fontFamily: WALK.fontDisplay, fontWeight: 700,
              fontSize: 14, color: t.rate === '—' ? WALK.inkFaint : WALK.ink,
              fontVariantNumeric: 'tabular-nums',
            }}>{t.rate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Y-offsets for manager page (frame-space)
const MGR = {
  head:   { y: WALK.BODY_TOP,       h: 72  },
  stats:  { y: WALK.BODY_TOP + 86,  h: 86  },
  table:  { y: WALK.BODY_TOP + 184, h: 380 },
  status: { y: WALK.BODY_TOP + 358, h: 42  },   // status pill column approx
  score:  { y: WALK.BODY_TOP + 184, h: 380 },   // rightmost column
};

const MGR_FRAME_H = 640;
const MGR_COMMON = {
  totalSteps: 2,
  persona: 'Manager · อาทิตย์ ช.',
  frameHeight: MGR_FRAME_H,
};

// ══════════════════════════════════════════════════════════════════════
// PERSONA C — Admin page mockup
// Combines registry (Frame 3) and detail hub (Frame 4) stacked vertically.
// ══════════════════════════════════════════════════════════════════════
function adminPageMockup() {
  const rows = [
    { i: 'มา', c: WALK.accent, n: 'มาริสา สงวนศักดิ์', id: 'E-58231', r: 'Cashier · CTW',      m: 'อาทิตย์ ช.', d: '12 ก.ย. 66', s: 'ใช้งาน',   sc: WALK.accent },
    { i: 'ปร', c: WALK.butter, n: 'ปรีชา วรพงษ์',      id: 'E-72915', r: 'Floor Staff · CTW',  m: 'อาทิตย์ ช.', d: '22 ต.ค. 67', s: 'ทดลองงาน', sc: WALK.butter },
    { i: 'ธี', c: WALK.sage,   n: 'ธีรพัฒน์ มงคล',     id: 'E-49102', r: 'Senior · CTW',       m: 'อาทิตย์ ช.', d: '05 มี.ค. 64', s: 'ใช้งาน',   sc: WALK.accent },
    { i: 'กั', c: WALK.coral,  n: 'กัลยา ภูวดล',       id: 'E-61480', r: 'Sales Asst. · CTW',  m: 'อาทิตย์ ช.', d: '18 ม.ค. 67', s: 'ใช้งาน',   sc: WALK.accent },
  ];

  const events = [
    { c: WALK.indigo, l: 'ประเมินทดลองงาน', d: '15 ก.ย. 2567', n: 'ผ่านทดลองงาน · 4.2/5.0' },
    { c: WALK.butter, l: 'โอนย้าย',          d: '1 มิ.ย. 2567',  n: 'Central Ladprao → Central World' },
    { c: WALK.accent, l: 'เริ่มงาน',          d: '15 มี.ค. 2567', n: null },
  ];

  const actions = [
    { ic: '📋', l: 'ประเมินทดลองงาน', locked: true },
    { ic: '✏',  l: 'แก้ไขข้อมูล' },
    { ic: '→',  l: 'โอนย้าย' },
    { ic: '⊘',  l: 'สิ้นสุดสภาพ' },
    { ic: '📄', l: 'ต่อสัญญา', locked: true },
    { ic: '↗',  l: 'เลื่อนตำแหน่ง' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── Registry section ───────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div>
          <div style={walkStyles.eyebrow}>Employee Center · มุม HR Admin</div>
          <h2 style={{
            margin: '4px 0 2px',
            fontFamily: WALK.fontDisplay,
            fontSize: 22, fontWeight: 600, color: WALK.ink, letterSpacing: '-0.01em',
          }}>ทะเบียนพนักงาน</h2>
          <div style={{ fontSize: 12.5, color: WALK.inkMuted }}>
            2,847 คนทั่วประเทศ · ใช้งานอยู่ 2,791 · พ้นสภาพปีนี้ 56
          </div>
        </div>
        <span style={{ flex: 1 }}/>
        <button style={walkStyles.btnPrimary}>+ เพิ่มพนักงานใหม่</button>
      </div>

      {/* Filter rail + table */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 14 }}>
        {/* Filter rail */}
        <aside style={{ ...walkStyles.card(false), padding: '14px 14px', alignSelf: 'start' }}>
          <h4 style={{ margin: 0, marginBottom: 10, fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 600 }}>กรอง</h4>
          {[
            { l: 'สถานะ',        opts: [['ใช้งาน', '2,791', true], ['พ้นสภาพ', '56'], ['ทดลองงาน', '138']] },
            { l: 'ประเภทพนักงาน', opts: [['ประจำ', '2,104', true], ['รายวัน/PT', '612'], ['Outsource', '75']] },
            { l: 'สาขา',         opts: [['CTW', '312'], ['Chidlom', '287'], ['+ 28 แห่ง', '']] },
          ].map(g => (
            <div key={g.l} style={{ marginBottom: 12 }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, marginBottom: 6 }}>{g.l}</div>
              {g.opts.map(([n, count, on]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', fontSize: 11.5 }}>
                  <span style={{
                    width: 12, height: 12, borderRadius: 3,
                    background: on ? WALK.accent : WALK.surface,
                    border: `1px solid ${on ? WALK.accent : WALK.hairline}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 9, fontWeight: 700,
                  }}>{on && '✓'}</span>
                  <span style={{ flex: 1, color: WALK.inkSoft }}>{n}</span>
                  {count && <span style={{ fontSize: 10, color: WALK.inkFaint, fontWeight: 600 }}>{count}</span>}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Active filters + table */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <WalkTag bg={WALK.ink}>ใช้งาน ✕</WalkTag>
            <WalkTag bg={WALK.ink}>ประจำ ✕</WalkTag>
            <span style={{ fontSize: 11.5, color: WALK.inkMuted }}>2,104 คน</span>
            <span style={{ flex: 1 }}/>
            <div style={{ display: 'flex', gap: 2, padding: 3, background: WALK.surface, border: `1px solid ${WALK.hairline}`, borderRadius: 8 }}>
              {['ตาราง', 'การ์ด', 'ผังองค์กร'].map((v, i) => (
                <span key={v} style={{
                  padding: '4px 10px', borderRadius: 5, fontSize: 10.5, fontWeight: 600,
                  background: i === 0 ? WALK.accent : 'transparent',
                  color: i === 0 ? '#fff' : WALK.inkSoft,
                }}>{v}</span>
              ))}
            </div>
          </div>

          <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px 32px 2fr 1.6fr 1fr 1fr 1fr',
              padding: '10px 14px', background: WALK.creamSoft,
              borderBottom: `1px solid ${WALK.hairlineSoft}`,
              fontSize: 9.5, fontWeight: 700, color: WALK.inkMuted,
              letterSpacing: '.06em', textTransform: 'uppercase', alignItems: 'center',
            }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, border: `1px solid ${WALK.hairline}`, background: WALK.surface }}/>
              <div/><div>ชื่อ · รหัส</div><div>ตำแหน่ง · สาขา</div>
              <div>ผู้จัดการ</div><div>เริ่มงาน</div><div>สถานะ</div>
            </div>
            {rows.map(r => (
              <div key={r.id} style={{
                display: 'grid',
                gridTemplateColumns: '24px 32px 2fr 1.6fr 1fr 1fr 1fr',
                padding: '10px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
                alignItems: 'center',
              }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, border: `1px solid ${WALK.hairline}`, background: WALK.surface }}/>
                <WalkAvatar initials={r.i} color={r.c} size={24} border={WALK.surface}/>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: WALK.ink }}>{r.n}</div>
                  <div style={{ fontSize: 9.5, color: WALK.inkFaint, letterSpacing: '.04em' }}>{r.id}</div>
                </div>
                <div style={{ fontSize: 11, color: WALK.inkSoft }}>{r.r}</div>
                <div style={{ fontSize: 11, color: WALK.inkSoft }}>{r.m}</div>
                <div style={{ fontSize: 11, color: WALK.inkSoft }}>{r.d}</div>
                <div><WalkTag bg={r.sc} color="#fff">{r.s}</WalkTag></div>
              </div>
            ))}
            <div style={{
              display: 'flex', alignItems: 'center',
              padding: '10px 14px', background: WALK.creamSoft,
              fontSize: 11.5, color: WALK.inkMuted,
            }}>
              แสดง 1–4 จาก 2,104
              <span style={{ flex: 1 }}/>
              <span style={{ display: 'flex', gap: 4 }}>
                {['‹','›'].map(ch => (
                  <span key={ch} style={{
                    width: 26, height: 26, borderRadius: 6,
                    background: WALK.surface, border: `1px solid ${WALK.hairline}`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                  }}>{ch}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail hub section ─────────────────────────────── */}
      <div style={{ ...walkStyles.divider }}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 14 }}>
        {/* Left: identity + workflow + timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <WalkAvatar initials="ภศ" color={WALK.accent} size={42} border={WALK.surface}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>30048829 · EJ-30048829-01</div>
                <h2 style={{ margin: '3px 0 0', fontFamily: WALK.fontDisplay, fontSize: 18, fontWeight: 600, color: WALK.ink }}>ภานุพงศ์ ศรีวิชัย</h2>
                <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 1 }}>Cashier · CTW</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <WalkTag bg={WALK.accent}>ทำงานอยู่</WalkTag>
                  <WalkTag bg={WALK.sage}>Permanent</WalkTag>
                </div>
              </div>
            </div>
          </div>

          {/* In-flight workflow */}
          <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
            <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, marginBottom: 6 }}>คำขอที่เกี่ยวข้อง</div>
            <div style={{
              display: 'flex', gap: 10, alignItems: 'center',
              padding: '10px 12px', borderRadius: 8, background: WALK.creamSoft,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ ...walkStyles.eyebrow, fontSize: 9, marginBottom: 2 }}>BRD #103</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: WALK.ink }}>Cashier → Senior Cashier</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>มีผล: 1 ก.ค. 2569</div>
              </div>
              <WalkTag bg={WALK.butter} color="#fff">รอ Manager รีวิว</WalkTag>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
            <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, marginBottom: 6 }}>Timeline · 3 รายการ</div>
            {events.map((e, idx) => (
              <div key={idx} style={{
                display: 'flex', gap: 10,
                padding: '8px 0', borderBottom: idx < events.length - 1 ? `1px solid ${WALK.hairlineSoft}` : 'none',
              }}>
                <span style={{ width: 9, height: 9, borderRadius: 99, background: e.c, marginTop: 4, flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: WALK.ink }}>{e.l}</span>
                    <span style={{ fontSize: 10.5, color: WALK.inkMuted }}>มีผล: {e.d}</span>
                  </div>
                  {e.n && <div style={{ marginTop: 2, fontSize: 11, color: WALK.inkSoft, fontStyle: 'italic' }}>{e.n}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 6 action cards */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, marginBottom: 6 }}>การดำเนินการ · 9 lifecycle actions</div>
          <div style={{
            padding: '8px 10px', marginBottom: 10,
            background: WALK.creamSoft, border: `1px solid ${WALK.hairline}`,
            borderRadius: 8, fontSize: 10.5, color: WALK.inkSoft, lineHeight: 1.4,
          }}>
            action card lock อัตโนมัติตามสถานะพนักงาน
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {actions.map(a => (
              <div key={a.l} style={{
                padding: 10, borderRadius: 10,
                border: `1px solid ${WALK.hairline}`,
                background: a.locked ? WALK.creamSoft : WALK.surface,
                opacity: a.locked ? 0.7 : 1,
                display: 'flex', flexDirection: 'column', gap: 6,
                minHeight: 84,
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 7,
                  background: a.locked ? WALK.hairlineSoft : WALK.accentSoft,
                  color: a.locked ? WALK.inkFaint : WALK.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13,
                }}>{a.ic}</div>
                <div style={{
                  fontSize: 11, fontWeight: 600,
                  color: a.locked ? WALK.inkMuted : WALK.ink, lineHeight: 1.25,
                }}>
                  {a.l}
                  {a.locked && <span style={{ color: WALK.inkFaint, fontSize: 9, marginLeft: 4 }}>🔒</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Y-offsets for admin page (frame-space)
const ADMIN = {
  head:       { y: WALK.BODY_TOP,       h: 72  },
  filterRail: { y: WALK.BODY_TOP + 86,  h: 290 },  // rail left column
  filterChip: { y: WALK.BODY_TOP + 86,  h: 32  },  // active chip strip
  table:      { y: WALK.BODY_TOP + 128, h: 250 },  // registry table
  viewSwitch: { y: WALK.BODY_TOP + 86,  h: 32  },
  detail:     { y: WALK.BODY_TOP + 412, h: 340 },  // detail hub section
  timeline:   { y: WALK.BODY_TOP + 460, h: 176 },  // timeline card approx
  actions:    { y: WALK.BODY_TOP + 412, h: 340 },  // action grid
};

const ADMIN_FRAME_H = 820;
const ADMIN_COMMON = {
  totalSteps: 2,
  persona: 'HR Admin · จิรา ป.',
  frameHeight: ADMIN_FRAME_H,
};


// ═══════════════════════════════════════════════════════════════════
// Sub-section SELF — Frame 1
// Spotlight: hero identity card
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalkSelf1() {
  return (
    <WalkFrame
      {...SELF_COMMON}
      stepIdx={1}
      title="Hero identity · ตอบ 'ฉันคือใครในระบบ' ทันที"
      narrative="พนักงาน 80% เปิดมาที่นี่เพื่อตอบ 3 คำถาม — 'ฉันเป็นใครในระบบ', 'สถานะฉันคืออะไร', 'อายุงานฉันเท่าไหร่' Hero card ตอบทั้ง 3 ในแถวเดียวโดยไม่ต้อง scroll"
      mockup={selfPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: SELF.hero.y, w: SPOTW, h: SELF.hero.h, color: WALK.accent },
        { num: 2, x: SPOTX, y: SELF.tabs.y, w: SPOTW, h: SELF.tabs.h, color: WALK.indigo },
      ]}
      annotations={[
        { num: 1, title: 'Hero = identity + status ครบในแถวเดียว',
          body: 'Avatar gradient + ชื่อ TH/EN + ตำแหน่ง + tag stack (ประเภท/ทดลองงาน/รออัปเดต) + อายุงาน teal big number — ไม่ต้องให้พนักงาน navigate เพิ่มเพื่อรู้ว่าตัวเองอยู่ที่ไหนในระบบ; แทน landing page ว่าง ๆ ที่บังคับ find ก่อน' },
        { num: 2, title: 'SegTab 6 ส่วน · ข้อมูลส่วนตัว default',
          body: 'เอกสาร · 14 มี count badge บน tab — พนักงานรู้ปริมาณก่อนคลิก; default ที่ "ข้อมูลส่วนตัว" เพราะเป็น tab ที่เปิดบ่อยสุด (เปลี่ยนที่อยู่ / เช็คเลขบัตร) ไม่ใช่เอกสาร',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section SELF — Frame 2
// Spotlight: cream task card (urgent to-do) + personal info + docs
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalkSelf2() {
  return (
    <WalkFrame
      {...SELF_COMMON}
      stepIdx={2}
      title="Task card + ข้อมูล · urgency ที่ไม่ตกใจ"
      narrative="ต้องทำ 2 รายการ (PND91 urgent + ที่อยู่) ปรากฏในบอดีทันทีโดยไม่ต้อง navigate; ข้อมูลส่วนตัวถัดออกไปใช้ PDPA mask + lock badge — เพียงพอสำหรับใช้งานแต่ปิดความเสี่ยง"
      mockup={selfPageMockup()}
      dim
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 466, y: SELF.hero.y + SELF.hero.h + 64, w: WALK.MOCKUP_W - 470, h: 210, color: WALK.coral },
        { num: 2, x: SPOTX,               y: SELF.hero.y + SELF.hero.h + 64, w: 462,                  h: 220, color: WALK.indigo },
        { num: 3, x: WALK.MOCKUP_X + 466, y: SELF.hero.y + SELF.hero.h + 280, w: WALK.MOCKUP_W - 470, h: 130, color: WALK.sage },
      ]}
      annotations={[
        { num: 1, title: 'Cream task card = urgency ไม่ aggressive',
          body: 'creamSoft bg แยกจาก white content card สื่อ "งานส่วนตัว"; warning icon เฉพาะ urgent item (PND91 ครบ 30 เม.ย.) ไม่ใช้ red banner เต็มหน้า — warm tone ตามหลัก Humi',
          color: WALK.coral },
        { num: 2, title: 'ข้อมูลส่วนตัว · mask + 🛡 badge',
          body: 'เลขบัตร ปชช. mask 1-1014-•••••-3-9 + "🛡 เข้ารหัส" badge บอก PDPA ชัด — แสดงข้อมูลพอใช้งานแต่ปิดความเสี่ยง; 2-column grid scannable โดยไม่ต้อง scroll',
          color: WALK.indigo },
        { num: 3, title: 'เอกสารล่าสุด · quick access',
          body: 'สัญญาจ้าง + ใบรับรองเงินเดือน ปรากฏ inline โดยไม่ต้องเข้า tab "เอกสาร" — ตอบคำถาม "ฉันจะพิมพ์ใบรับรองได้ยังไง" ซึ่งพนักงานถาม HR บ่อยสุด',
          color: WALK.sage },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section MANAGER — Frame 1
// Spotlight: 4 stat cards (team pulse)
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalkManager1() {
  return (
    <WalkFrame
      {...MGR_COMMON}
      stepIdx={1}
      title="Team pulse · 4 ตัวเลขบอกสุขภาพทีมในแว้บเดียว"
      narrative="Manager เปิดมาตอนเช้าเพื่อ orient — 'ใครมา/ใครหาย วันนี้' + 'มีอะไรค้างรออนุมัติ' 4 stat card ตอบทั้ง pulse + performance + workload pending ก่อนลง detail ตาราง"
      mockup={managerPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: MGR.stats.y, w: SPOTW, h: MGR.stats.h, color: WALK.accent },
        { num: 2, x: SPOTX, y: MGR.head.y,  w: SPOTW, h: MGR.head.h,  color: WALK.indigo },
      ]}
      annotations={[
        { num: 1, title: '4 stat cards · semantic color ไม่ใช้แค่ตัวเลข',
          body: 'หัวคน 14 (neutral) / อยู่ 12 (teal = ดี) / คะแนน 4.1 (neutral) / รออนุมัติ 3 (warning = ต้องทำ) — สีบอก action ทันที Manager ไม่ต้องตีความว่า 3 หมายความว่าอะไร; sub-text ให้ trend/breakdown สั้น ๆ',
          color: WALK.accent },
        { num: 2, title: 'Page head · subtitle live status',
          body: '"14 คนในทีม · 12 อยู่ทำงานวันนี้ · 1 ลาป่วย · 1 ลาพักร้อน" ใน subtitle แทน alert banner — Manager เห็น context ระดับ macro ก่อน drill ลงตาราง; ไม่ต้องคลิก Attendance module แยก',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section MANAGER — Frame 2
// Spotlight: status pills + score column in team table
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalkManager2() {
  return (
    <WalkFrame
      {...MGR_COMMON}
      stepIdx={2}
      title="Team table · drill ลง individual ใน 1 row"
      narrative="ตารางทีมเป็น primary workspace ของ Manager — status pill + อายุงาน + รอบประเมิน + คะแนนอยู่ใน row เดียวกัน ทำให้ตัดสินใจ 1-on-1 ได้โดยไม่ต้อง click-through หลาย page"
      mockup={managerPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX,                         y: MGR.table.y, w: SPOTW, h: MGR.table.h,   color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 320,            y: MGR.table.y + 50, w: 120, h: MGR.table.h - 50, color: WALK.coral },
        { num: 3, x: WALK.MOCKUP_X + WALK.MOCKUP_W - 80, y: MGR.table.y, w: 80,  h: MGR.table.h,      color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'ทุก column สื่อ decision ไม่ใช่แค่ข้อมูล',
          body: 'ชื่อ + รหัส / ตำแหน่ง / สถานะ / อายุงาน / รอบประเมิน / คะแนน — เรียงตาม mental model ของ Manager ที่มักถามว่า "คนนี้เป็นใคร เป็นยังไงวันนี้ ทำงานนานแค่ไหน ประเมินเมื่อไหร่ คะแนนเท่าไหร่"' },
        { num: 2, title: 'Status pill tri-color · tri-semantic',
          body: 'teal "ทำงาน" + dot pulse / coral "ลาป่วย" / butter "OT" — สีตรงกับ color system ทั่ว Humi ทำให้ Manager scan ด้วยตา 5 วินาทีรู้ครบทีมโดยไม่ต้องอ่านทุก label',
          color: WALK.coral },
        { num: 3, title: 'คะแนน · display font + tabular + "—" สำหรับ probation',
          body: 'right-aligned display font tabular-nums เพื่อ scan แนวตั้ง; "—" แทน 0.0 สำหรับคนทดลองงาน — แสดง "ยังไม่มีข้อมูล" แทน "คะแนนเป็นศูนย์" ลดความเข้าใจผิด',
          color: WALK.butter },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section ADMIN — Frame 1
// Spotlight: filter rail + active filter chips + registry table
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalkAdmin1() {
  return (
    <WalkFrame
      {...ADMIN_COMMON}
      stepIdx={1}
      title="Admin registry · filter 2,847 คนให้เหลือชุดที่ใช้ได้"
      narrative="HR Admin ดูแล 2,847 คน — UI ต้องเล่นกับ scale: filter rail ซ้ายกรองหลายมิติ (สถานะ/ประเภท/สาขา) พร้อม count ทุกตัวเลือก, active chip บนตารางสะท้อน state ปัจจุบัน, view switcher ให้เปลี่ยน mental model โดยไม่เสีย filter"
      mockup={adminPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX,                          y: ADMIN.filterRail.y, w: 208, h: ADMIN.filterRail.h, color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 214,             y: ADMIN.filterRail.y, w: 220, h: 32,                color: WALK.ink },
        { num: 3, x: WALK.MOCKUP_X + 214,             y: ADMIN.filterRail.y, w: WALK.MOCKUP_W - 218, h: ADMIN.filterRail.h, color: WALK.butter },
        { num: 4, x: WALK.MOCKUP_X + WALK.MOCKUP_W - 190, y: ADMIN.filterRail.y, w: 186, h: 32, color: WALK.indigo },
      ]}
      annotations={[
        { num: 1, title: 'Filter rail · count ทุกตัวเลือก',
          body: 'ใช้งาน 2,791 / พ้นสภาพ 56 / ทดลองงาน 138 — count ติดทุก checkbox ทำให้ admin estimate ผลลัพธ์ก่อนกด เลี่ยง "เลือกแล้วได้ 0 row" ซึ่งทำให้ไม่กล้าทดลอง filter' },
        { num: 2, title: 'Active filter chips · removable inline',
          body: 'Ink dark pill "ใช้งาน ✕ · ประจำ ✕" visible เสมอเหนือตาราง; ✕ inline ให้ถอด filter ทีละตัวโดยไม่ต้อง scroll กลับ rail — ป้องกัน "ลืมว่า filter อยู่"',
          color: WALK.ink },
        { num: 3, title: 'Registry table · bulk select + paginate',
          body: 'Checkbox column ซ้ายสุดรองรับ bulk action (export/แจ้งเตือน); footer "1–4 จาก 2,104" บอก scope ที่ filter ลด population — admin รู้ว่า filter มีผลจริงก่อน scroll ถึงแถวสุดท้าย',
          color: WALK.butter },
        { num: 4, title: 'View switcher · ตาราง/การ์ด/ผัง',
          body: '2,000+ row เหมาะ table; แต่บางครั้ง HR browse แบบ visual (การ์ด) หรือ hierarchy (ผัง) — switcher เปลี่ยน view โดย filter context คงเดิม เหมือน "lens" ไม่ใช่ "page" ใหม่',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section ADMIN — Frame 2
// Spotlight: detail hub (workflow snapshot + timeline + action grid)
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalkAdmin2() {
  return (
    <WalkFrame
      {...ADMIN_COMMON}
      stepIdx={2}
      title="Detail hub · timeline + 9 lifecycle actions"
      narrative="Click ทะลุจาก registry มาที่ Detail hub — identity บนสุด, workflow ที่กำลังเดิน (BRD #103), timeline เหตุการณ์อดีต, 9 action card สำหรับ next move ทุก action lock อัตโนมัติเมื่อเงื่อนไขไม่ตรง"
      mockup={adminPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX,              y: ADMIN.detail.y,    w: WALK.MOCKUP_W / 2 + 14, h: 104, color: WALK.butter },
        { num: 2, x: SPOTX,              y: ADMIN.detail.y + 118, w: WALK.MOCKUP_W / 2 + 14, h: 200, color: WALK.accent },
        { num: 3, x: WALK.MOCKUP_X + WALK.MOCKUP_W / 2 + 18, y: ADMIN.detail.y, w: WALK.MOCKUP_W / 2 - 20, h: ADMIN.detail.h, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Workflow snapshot · in-flight ก่อนกด action',
          body: 'BRD #103 Cashier → Senior Cashier ที่กำลัง "รอ Manager รีวิว" ปรากฏเหนือ timeline — admin เห็นว่ามี workflow ที่ยังไม่ปิดก่อนคิดแก้ข้อมูลอื่น ป้องกัน conflict ข้าม workflow',
          color: WALK.butter },
        { num: 2, title: 'Timeline · color-coded audit trail',
          body: 'dot สี (teal=hire, butter=transfer, indigo=probation) + วันที่มีผล + บันทึก — สี event type ตรงกับ semantic สีทั่ว Humi ทำให้ admin scan ลำดับเหตุการณ์แบบ visual scan',
          color: WALK.accent },
        { num: 3, title: 'Action grid 3×3 · locked = reason ไม่ใช่หาย',
          body: 'ทุก action อยู่ใน grid ขนาดเท่ากัน; locked card grey out + 🔒 ไม่หายไป — โปร่งใสว่า action นั้นมีอยู่แต่เงื่อนไขไม่ตรง ลด support ticket "ปุ่มโอนย้ายหายไปไหน"',
          color: WALK.coral },
      ]}
    />
  );
}

// ── Expose all 6 components to window ─────────────────────────────
Object.assign(window, {
  EmployeeWalkSelf1,
  EmployeeWalkSelf2,
  EmployeeWalkManager1,
  EmployeeWalkManager2,
  EmployeeWalkAdmin1,
  EmployeeWalkAdmin2,
});

})();
