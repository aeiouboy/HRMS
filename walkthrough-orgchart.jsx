(() => {
// walkthrough-orgchart.jsx
// OrgChart module Design Walkthrough (Employee → Manager → HR arc).
//
// RETROFIT PATTERN (static page + rotating spotlight):
//   orgchartPageMockup() renders one shared OrgChart workspace —
//   header (eyebrow + seg toggle), search box (active state),
//   2-column body (tree on left · person panel on right), then a
//   span-of-control analytics card below. The same page is reused
//   as the static background of every frame; spotlight rotates
//   between regions.
//
// Frames:
//   01 ตัวเองอยู่ตรงไหน — Tree view: chain + peers + reports
//   02 รู้จักคนใกล้ตัว    — Person panel: hero + stats + contact + employment
//   03 หาคนข้ามหน่วย      — Search active + dropdown (Manager)
//   04 เข้าใจโครงสร้าง     — Span of control + depth metrics (HR Admin)

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ── Org tree node card ────────────────────────────────────────────────
function WalkOrgNode({ initials, name, role, color, size = 'md', highlight }) {
  const sizes = {
    sm: { w: 124, pad: 8,  av: 26, name: 11.5, role: 10 },
    md: { w: 160, pad: 12, av: 32, name: 12.5, role: 10.5 },
    lg: { w: 180, pad: 12, av: 40, name: 13,   role: 10.5 },
  };
  const s = sizes[size];
  return (
    <div style={{
      width: s.w, padding: s.pad,
      background: highlight ? WALK.accentSoft : WALK.surface,
      border: `1px solid ${highlight ? 'transparent' : WALK.hairline}`,
      borderRadius: 12,
      boxShadow: highlight
        ? `0 2px 0 rgba(14,27,44,.06), 0 12px 22px rgba(31,168,160,.20)`
        : '0 1px 2px rgba(14,27,44,.04)',
      textAlign: 'center', flexShrink: 0, display: 'inline-block',
    }}>
      <div style={{ margin: '0 auto 6px', display: 'flex', justifyContent: 'center' }}>
        <WalkAvatar initials={initials} color={color} size={s.av} border={WALK.surface}/>
      </div>
      <div style={{ fontWeight: 600, fontSize: s.name, letterSpacing: '-0.005em', lineHeight: 1.25, color: WALK.ink }}>{name}</div>
      <div style={{ fontSize: s.role, color: WALK.inkMuted, marginTop: 2, lineHeight: 1.3 }}>{role}</div>
    </div>
  );
}
function WalkConnector({ h = 14 }) {
  return <div style={{ width: 2, height: h, background: WALK.hairline, margin: '0 auto' }}/>;
}

// ── Workspace header (search + seg toggle) ────────────────────────────
function WorkspaceHeader() {
  const results = [
    { i: 'จท', n: 'จงรักษ์ ทานากะ',   r: 'ผู้จัดการสาขา II',  c: WALK.coral },
    { i: 'JO', n: 'เจส โอคอน',         r: 'ผู้จัดการสาขา',     c: WALK.accent },
    { i: 'AK', n: 'อาเมียร์ คาลิล',    r: 'ผู้จัดการสาขา',     c: WALK.butter },
  ];

  return (
    <div style={{ ...walkStyles.card(false), padding: '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={walkStyles.eyebrow}>ค้นหาบุคคล · ผังองค์กร</div>
          <h3 style={walkStyles.h3Display}>Central Retail · 247 คน</h3>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{
          display: 'inline-flex',
          background: WALK.creamSoft,
          border: `1px solid ${WALK.hairline}`,
          borderRadius: 999, padding: 3,
        }}>
          {['ผัง', 'รายการ'].map((t, i) => (
            <span key={t} style={{
              padding: '4px 14px', borderRadius: 999,
              fontSize: 11.5, fontWeight: 600,
              background: i === 0 ? WALK.surface : 'transparent',
              color: i === 0 ? WALK.ink : WALK.inkMuted,
              boxShadow: i === 0 ? '0 1px 2px rgba(14,27,44,.06)' : 'none',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Active search field with results dropdown */}
      <div style={{
        position: 'relative',
        background: WALK.surface,
        border: `1.5px solid ${WALK.accent}`,
        borderRadius: 10,
        padding: '9px 12px 9px 34px',
        fontSize: 13, color: WALK.ink,
        boxShadow: `0 0 0 4px ${WALK.accentSoft}`,
      }}>
        <span style={{ position: 'absolute', left: 12, top: 9, color: WALK.accent }}>🔍</span>
        ผู้จัดการสาขา
        <span style={{ display: 'inline-block', width: 1, height: 14, background: WALK.accent, marginLeft: 2, verticalAlign: 'middle' }}/>
      </div>
      <div style={{
        background: WALK.surface,
        border: `1px solid ${WALK.hairline}`,
        borderRadius: 12,
        boxShadow: '0 6px 18px rgba(14,27,44,.08)',
        padding: 6, marginTop: 6,
      }}>
        {results.map(r => (
          <div key={r.n} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 10px', borderRadius: 8,
          }}>
            <WalkAvatar initials={r.i} color={r.c} size={26}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink }}>{r.n}</div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>{r.r}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tree column ───────────────────────────────────────────────────────
function TreeColumn() {
  return (
    <div style={{ ...walkStyles.card(false), padding: '18px 16px' }}>
      <div style={{ ...walkStyles.eyebrow, marginBottom: 12 }}>สายบังคับบัญชา</div>
      <div style={{ textAlign: 'center', paddingBottom: 8 }}>
        <WalkOrgNode initials="GH" name="เกรซ หวง" role="CHRO" color={WALK.ink} size="sm"/>
        <WalkConnector/>
        <WalkOrgNode initials="JM" name="จอร์แดน เหมย" role="People Ops Director" color={WALK.sage} size="sm"/>
        <WalkConnector/>
        <WalkOrgNode initials="DL" name="ดานา หลิว" role="ผจก.เขต กทม.กลาง" color={WALK.coral} size="sm"/>
        <WalkConnector/>
        <WalkOrgNode initials="จท" name="จงรักษ์ ทานากะ" role="ผจก.สาขา II" color={WALK.coral} size="sm"/>
        <WalkConnector/>

        <WalkOrgNode initials="AC" name="อาทิตย์ ชื่นบาน" role="หัวหน้ากะ · Store L1" color={WALK.sage} size="lg" highlight/>

        <WalkConnector h={12}/>
        <div style={{
          fontSize: 9.5, color: WALK.inkFaint, textTransform: 'uppercase',
          letterSpacing: '.12em', marginBottom: 8, fontWeight: 600,
        }}>ลูกทีม · 6 คน</div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
          <WalkOrgNode initials="MS" name="มาริสา" role="Cashier · L1"      color={WALK.accent} size="sm"/>
          <WalkOrgNode initials="TM" name="ธีรพัฒน์" role="Sr. Cashier"      color={WALK.sage}   size="sm"/>
          <WalkOrgNode initials="KP" name="กัลยา"    role="Sales · L1"       color={WALK.butter} size="sm"/>
          <WalkOrgNode initials="PV" name="ปรีชา"    role="Floor · L1"        color={WALK.ink}    size="sm"/>
          <WalkOrgNode initials="NP" name="นิภาพร"   role="Cashier · L1"     color={WALK.coral}  size="sm"/>
          <WalkOrgNode initials="AP" name="อัมพร"    role="Sales · L1"        color={WALK.accent} size="sm"/>
        </div>
      </div>
    </div>
  );
}

// ── Person panel column ───────────────────────────────────────────────
function PersonPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          height: 60,
          background: `linear-gradient(110deg, ${WALK.ink} 0%, #1a2b42 100%)`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', width: 90, height: 110, right: 30, top: -20,
            background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
            opacity: 0.55,
          }}/>
          <div style={{
            position: 'absolute', width: 60, height: 70, right: 130, top: 20,
            background: `radial-gradient(circle, ${WALK.coral} 0%, transparent 70%)`,
            opacity: 0.45,
          }}/>
        </div>
        <div style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 52, height: 52, borderRadius: 14,
              background: WALK.accent, color: '#fff',
              fontSize: 17, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${WALK.surface}`, flexShrink: 0,
            }}>MS</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{
                margin: 0,
                fontFamily: WALK.fontDisplay,
                fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: WALK.ink,
              }}>มาริสา สงวนศักดิ์</h2>
              <div style={{ fontSize: 11.5, color: WALK.inkMuted, marginTop: 3, lineHeight: 1.5 }}>
                Cashier · L1 · Central CTW · รายงานต่อ <b style={{ color: WALK.inkSoft }}>อาทิตย์ ชื่นบาน</b>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button style={{ ...walkStyles.btnGhost, padding: '5px 10px', fontSize: 11 }}>✉ ข้อความ</button>
            <button style={{ ...walkStyles.btnGhost, padding: '5px 10px', fontSize: 11 }}>📄 โปรไฟล์เต็ม</button>
          </div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${WALK.hairlineSoft}`,
        }}>
          {[
            { l: 'อายุงาน', v: '2 ปี 7 ด.' },
            { l: 'เกรด',    v: 'G2' },
            { l: 'ลูกทีม',  v: '—' },
            { l: 'ที่ตั้ง',  v: 'กทม.' },
          ].map((s, i) => (
            <div key={s.l} style={{
              padding: '10px 12px',
              borderLeft: i === 0 ? 0 : `1px solid ${WALK.hairlineSoft}`,
            }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>{s.l}</div>
              <div style={{
                fontFamily: WALK.fontDisplay,
                fontSize: 14, fontWeight: 700,
                marginTop: 2, letterSpacing: '-0.01em', color: WALK.ink,
              }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={walkStyles.card(false)}>
        <div style={walkStyles.eyebrow}>ช่องทางติดต่อ</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, fontSize: 12 }}>
          <div style={{ color: WALK.inkSoft }}>✉ marisa.s@central.co.th</div>
          <div style={{ color: WALK.inkSoft }}>📞 +66 89-•••-4521</div>
          <div style={{ color: WALK.inkMuted, fontSize: 11 }}>🌐 ICT · ขณะนี้ 14:23</div>
        </div>
      </div>

      <div style={walkStyles.card(false)}>
        <div style={walkStyles.eyebrow}>การจ้างงาน</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8, fontSize: 12 }}>
          {[
            ['ประเภท', 'พนักงานประจำ · รายเดือน'],
            ['เริ่มงาน', '12 ก.ย. 2566'],
            ['ผลตอบแทน', '฿18,500 / เดือน'],
            ['Cost center', 'RTL-CTW-0412'],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: WALK.inkMuted, width: 70, fontSize: 11 }}>{l}</span>
              <span style={{ color: WALK.inkSoft, fontWeight: 500, flex: 1 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Span-of-control + depth analytics ─────────────────────────────────
function SpanAnalytics() {
  const spans = [
    { n: 'อาทิตย์ ชื่นบาน',   r: 'หัวหน้ากะ · CTW',          n_reports: 6,  c: WALK.sage,   bar: 100, flag: 'wide' },
    { n: 'ดานา หลิว',         r: 'ผจก.เขต กทม.กลาง',         n_reports: 4,  c: WALK.coral,  bar: 67,  flag: null },
    { n: 'จอร์แดน เหมย',      r: 'People Ops Director',       n_reports: 2,  c: WALK.sage,   bar: 33,  flag: null },
    { n: 'เกรซ หวง',           r: 'CHRO',                      n_reports: 2,  c: WALK.ink,    bar: 33,  flag: null },
    { n: 'ซิโมน ฟอง',         r: 'ผจก.เขต กทม.ตะวันตก',      n_reports: 0,  c: WALK.accent, bar: 0,   flag: 'gap' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { l: 'ความลึกสูงสุด', v: '5 ชั้น', s: 'CHRO → Cashier',     c: WALK.ink },
          { l: 'Span เฉลี่ย',    v: '2.8',    s: 'ลูกทีม/หัวหน้า',     c: WALK.accent },
          { l: 'หัวหน้าทั้งหมด',  v: '6 คน',   s: 'มี report ≥ 1',     c: WALK.sage },
          { l: 'แจ้งเตือน',      v: '2 จุด',  s: 'ตรวจสอบช่วงควบคุม',  c: WALK.coral },
        ].map(m => (
          <div key={m.l} style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
            <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, color: m.c }}>{m.l}</div>
            <div style={{
              fontFamily: WALK.fontDisplay,
              fontSize: 22, fontWeight: 700,
              marginTop: 4, letterSpacing: '-0.015em', color: WALK.ink,
              fontVariantNumeric: 'tabular-nums',
            }}>{m.v}</div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2 }}>{m.s}</div>
          </div>
        ))}
      </div>

      <div style={walkStyles.card(false)}>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={walkStyles.eyebrow}>เปรียบเทียบช่วงควบคุม</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 16 }}>หัวหน้า · จำนวนลูกทีมตรง</h3>
          </div>
          <div style={{ flex: 1 }}/>
          <WalkTag bg={WALK.creamSoft} color={WALK.inkSoft}>≥ 5 = ตรวจสอบ</WalkTag>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {spans.map(s => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <WalkAvatar initials={s.n.slice(0,2)} color={s.c} size={28}/>
              <div style={{ width: 160, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink, lineHeight: 1.2 }}>{s.n}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>{s.r}</div>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{
                  height: 14, background: WALK.creamSoft,
                  borderRadius: 7, overflow: 'hidden',
                  border: `1px solid ${WALK.hairlineSoft}`,
                }}>
                  <div style={{
                    width: `${s.bar}%`, height: '100%',
                    background: s.flag === 'wide' ? WALK.coral
                              : s.flag === 'gap'  ? WALK.butter
                              : WALK.accent,
                  }}/>
                </div>
              </div>
              <div style={{
                width: 60, textAlign: 'right',
                fontFamily: WALK.fontDisplay,
                fontSize: 14, fontWeight: 700, color: WALK.ink,
                fontVariantNumeric: 'tabular-nums',
              }}>{s.n_reports} คน</div>
              {s.flag === 'wide' && <WalkTag bg={WALK.coralSoft} color={WALK.ink}>span สูง</WalkTag>}
              {s.flag === 'gap'  && <WalkTag bg={WALK.butterSoft} color={WALK.ink}>ไม่มีลูกทีม</WalkTag>}
              {!s.flag && <span style={{ width: 64 }}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shared page mockup ────────────────────────────────────────────────
function orgchartPageMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <WorkspaceHeader/>
      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1fr 1fr' }}>
        <TreeColumn/>
        <PersonPanel/>
      </div>
      <SpanAnalytics/>
    </div>
  );
}

// ── Regions (frame-space) ─────────────────────────────────────────────
const SPOTX = WALK.MOCKUP_X - 4;
const SPOTW = WALK.MOCKUP_W + 8;
const REGIONS = {
  header:   { y: WALK.BODY_TOP - 4,    h: 226 },   // workspace header + search + dropdown
  tree:     { y: WALK.BODY_TOP + 236,  h: 560, x: SPOTX, w: 440 },
  panel:    { y: WALK.BODY_TOP + 236,  h: 560, x: WALK.MOCKUP_X + 440, w: 444 },
  analyt:   { y: WALK.BODY_TOP + 814,  h: 460 },   // KPI + span bars
};
const ORG_FRAME_H = 1420;
const COMMON = {
  totalSteps: 4,
  persona: 'All personas',
  frameHeight: ORG_FRAME_H,
};

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · ตัวเองอยู่ตรงไหน — Tree
// ═══════════════════════════════════════════════════════════════════
function OrgChartWalk1() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={1}
      persona="Employee · มาริสา"
      title="ตัวเองอยู่ตรงไหน · สายบังคับบัญชาแนวตั้ง"
      narrative="พนักงานเปิดผังเพื่อตอบ 'ฉันรายงานต่อใคร และใครรายงานต่อฉัน' — Humi เลือก vertical chain แทน traditional pyramid เพราะ scan ลงล่างบนมือถือง่าย; node ตัวเองโต + teal glow anchor สายตา"
      mockup={orgchartPageMockup()}
      dim
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 130, y: REGIONS.tree.y + 28, w: 200, h: 280, color: WALK.inkMuted },
        { num: 2, x: WALK.MOCKUP_X + 110, y: REGIONS.tree.y + 318, w: 240, h: 80, color: WALK.accent },
        { num: 3, x: WALK.MOCKUP_X + 16,  y: REGIONS.tree.y + 410, w: 420, h: 130, color: WALK.sage },
      ]}
      annotations={[
        { num: 1, title: 'Vertical chain 4 ชั้น · CHRO → หัวหน้ากะ',
          body: 'ทำไมแนวตั้งไม่ใช่ pyramid? เพราะ pyramid ใช้ horizontal space ทำให้ mobile pan ซ้ายขวา. vertical chain scan ลงล่างด้วยนิ้วโป้งได้เลย. เรียง CHRO → Director → ผจก.เขต → ผจก.สาขา → หัวหน้ากะ ใน column เดียว — sm size เท่ากันสำหรับชั้น context (ไม่ใช่จุดสนใจหลัก) เก็บ space ให้ focus node.',
          color: WALK.inkMuted },
        { num: 2, title: 'Selected node = lg + teal glow',
          body: 'ทำไม focus node ใช้ขนาดต่างจาก context? เพราะ pyramid ทำให้ทุก node เท่ากัน — มองไม่ออกว่า "เราอยู่ไหน". lg + accentSoft bg + teal shadow ทำให้สายตาหยุดที่ node นี้ก่อน scan ขึ้น (หัวหน้า) หรือลง (ลูกทีม). pattern เดียวกับ "you are here" บน map.',
          color: WALK.accent },
        { num: 3, title: 'ลูกทีม flex แนวนอน · เท่ากันทั้ง 6',
          body: 'ทำไม direct reports ทั้ง 6 ใช้ size เท่ากัน? เพราะ peers อยู่ระดับเดียวกันใน hierarchy — ถ้าให้ Sr. Cashier ใหญ่กว่า Cashier จะสื่อ "rank ภายในทีม" ที่ไม่ใช่หน้าที่ของ orgchart. flexWrap ให้ responsive ถ้าทีมโต. คลิกที่ไหนก็ได้ reroot tree รอบคนนั้น — "navigation by exploration".',
          color: WALK.sage },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · รู้จักคนใกล้ตัว — Person panel
// ═══════════════════════════════════════════════════════════════════
function OrgChartWalk2() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={2}
      persona="Employee · มาริสา"
      title="รู้จักคนใกล้ตัว · panel ขวาเปลี่ยนตามที่เลือก"
      narrative="คลิก node แล้ว panel ขวาเปลี่ยนทันที — banner + 4 quick stats + contact + employment เรียงตามลำดับ 'ใคร → อะไร → ติดต่อยังไง'. reporting line อยู่ใน subtitle เพื่อเชื่อมกลับ tree ฝั่งซ้าย"
      mockup={orgchartPageMockup()}
      dim
      callouts={[
        { num: 1, x: REGIONS.panel.x - 4, y: REGIONS.panel.y - 4,  w: REGIONS.panel.w + 8, h: 130, color: WALK.ink },
        { num: 2, x: REGIONS.panel.x - 4, y: REGIONS.panel.y + 130, w: REGIONS.panel.w + 8, h: 64,  color: WALK.butter },
        { num: 3, x: REGIONS.panel.x - 4, y: REGIONS.panel.y + 208, w: REGIONS.panel.w + 8, h: 92,  color: WALK.sage },
        { num: 4, x: REGIONS.panel.x - 4, y: REGIONS.panel.y + 312, w: REGIONS.panel.w + 8, h: 130, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Hero ink + reporting line ใน subtitle',
          body: 'ทำไม banner ink dark? เพราะตัดกับ panel ทั้งหมดที่เป็น white/cream — บอก "นี่คือคนคนนี้" หยุดสายตา. radial gradient teal/coral หลังพื้นเลียน prod-employee-detail. subtitle ฝัง "รายงานต่อ อาทิตย์" ที่ tappable — one-tap traversal กลับไป tree, ไม่ต้อง breadcrumb แยก.',
          color: WALK.ink },
        { num: 2, title: '4 stats grid · display font + tabular',
          body: 'ทำไม 4 stats ไม่อยู่ใน banner เลย? เพราะ banner stays visually peaceful (รูป + ชื่อ). แยก strip ใต้ banner ด้วย border light. แต่ละ stat ตอบคำถามที่ HR/Manager ถามบ่อยที่สุดเวลาเจอชื่อใหม่ (อายุงาน · เกรด · ลูกทีม · ที่ตั้ง). display font + fontVariantNumeric: tabular-nums ทำให้ตัวเลขเรียงตรงคอลัมน์.',
          color: WALK.butter },
        { num: 3, title: 'Contact · 3 medium · public-tier',
          body: 'ทำไม contact มาก่อน employment? เพราะ employee persona เปิดดูเพื่อ "ติดต่อ" — ไม่ใช่วิเคราะห์ payroll. อีเมล · เบอร์ (masked) · timezone — เบอร์ mask ตามสิทธิ์ (ไม่ใช่ HR ไม่เห็นเลขเต็ม). lower visual weight (cream card) เพราะข้อมูล operational, ไม่ใช่ sensitive.',
          color: WALK.sage },
        { num: 4, title: 'Employment · privileged data · 2-col label',
          body: 'ทำไม layout label-value 2 col ไม่ใช่ card grid? เพราะข้อมูลภายใน (ค่าจ้าง · cost center) อ่านเร็วที่สุดเมื่อ alignment ตรง. ใช้ table-like 2-col ไม่ใช่ card grid (waste space). visibility ตามสิทธิ์: ตัวเองเห็นเต็ม, HR Admin เห็นเต็ม, peers เห็นแค่ "ประเภท" + "เริ่มงาน".',
          color: WALK.coral },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · หาคนข้ามหน่วย — Search active
// ═══════════════════════════════════════════════════════════════════
function OrgChartWalk3() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={3}
      persona="HR Admin · หา manager"
      title="หาคนข้ามหน่วย · search ทำงานทุก field"
      narrative="HR Admin ไม่รู้จักทุกคน — search ตรงกลางตอบ name/role/branch พร้อมกัน; dropdown แสดงผลแบบ inline เพื่อเข้าโปรไฟล์ใน 1 คลิก, ไม่ต้องเลือก filter ก่อน"
      mockup={orgchartPageMockup()}
      dim
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 20, y: REGIONS.header.y + 84,  w: 832, h: 44, color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 20, y: REGIONS.header.y + 134, w: 832, h: 88, color: WALK.coral },
        { num: 3, x: WALK.MOCKUP_X + 700, y: REGIONS.header.y + 18, w: 132, h: 38, color: WALK.butter, radius: 18 },
      ]}
      annotations={[
        { num: 1, title: 'Single search · 3 field พร้อมกัน',
          body: 'ทำไมไม่ใช้ filter dropdown (ชื่อ/ตำแหน่ง/สาขา) แยก? เพราะ HR Admin มักไม่รู้ว่าจะค้น field ไหน — ถ้าเห็น "ผจก.สาขา ทองหล่อ" ก็พิมพ์ทั้งวลีเลย. single input ทำ fuzzy match กับ 3 field พร้อมกัน. teal ring + accentSoft glow เมื่อ focus = active state อ่านง่ายโดยไม่ต้องดู cursor.',
          color: WALK.accent },
        { num: 2, title: 'Dropdown · avatar + 2-line preview',
          body: 'ทำไม dropdown ใส่ avatar ไม่ใช่แค่ text? เพราะ HR Admin จำคนได้จากหน้า/สีมากกว่าชื่อ. avatar 26 + ชื่อ + ตำแหน่ง ใน 3 บรรทัด scan แนวตั้งเร็ว. click → setSelected + clear query = focus กลับ tree พร้อม person panel update. ใส่แค่ top 3 ไม่ใช่ทั้ง 25 — ลด choice overload, scroll ถ้าต้องการเพิ่ม.',
          color: WALK.coral },
        { num: 3, title: 'Seg toggle · context preservation',
          body: 'ทำไม pill toggle อยู่บน header ไม่ใช่ใน search bar? เพราะ "ผัง vs รายการ" เป็น view mode, ไม่ใช่ filter. pill บน header = global control ของ workspace. ใน mockup นี้ "ผัง" ยัง active เพราะ search ใน tree mode ไม่ rebuild layout — เปลี่ยน mode ค่อย hide tree, list ครอบเต็ม.',
          color: WALK.butter },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · เข้าใจโครงสร้าง — Span + depth
// ═══════════════════════════════════════════════════════════════════
function OrgChartWalk4() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={4}
      persona="HR Admin · วิเคราะห์โครงสร้าง"
      title="เข้าใจโครงสร้าง · span of control + depth"
      narrative="ข้อมูล ORG_PEOPLE ไม่ใช่แค่ tree วาดเล่น — aggregate ได้เป็น depth/span metrics ที่ HR ใช้ตัดสินใจ org redesign; flag teal/coral/butter เน้นจุดที่ span สูง (burnout) หรือ direct ว่าง (role redundant)"
      mockup={orgchartPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.analyt.y - 4,  w: 220, h: 90, color: WALK.ink },
        { num: 2, x: WALK.MOCKUP_X + 654, y: REGIONS.analyt.y - 4, w: 220, h: 90, color: WALK.coral },
        { num: 3, x: SPOTX, y: REGIONS.analyt.y + 156, w: SPOTW, h: 64, color: WALK.coral },
        { num: 4, x: SPOTX, y: REGIONS.analyt.y + 376, w: SPOTW, h: 52, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'Depth · ความสูงขององค์กร · path inline',
          body: 'ทำไม "5 ชั้น" ต้องมี subtitle "CHRO → Cashier"? เพราะตัวเลขเดี่ยวไม่มี meaning — 5 ดีหรือร้าย? subtitle path อธิบายว่าวัดอะไร. display font + tabular numerals — สังเกตว่าเลขใหญ่กว่า body text 60% เพื่อให้ scan ได้แม้ผ่านสายตา. ink tile = neutral ไม่ใช่ alarm, แค่ "ข้อมูล".',
          color: WALK.ink },
        { num: 2, title: 'Alert tile · coral eyebrow ดึงสายตา',
          body: 'ทำไม "แจ้งเตือน 2 จุด" ใช้ coral eyebrow แทน red bg? เพราะถ้า bg เต็ม red ทั้ง tile จะกลบรายละเอียดอื่น. eyebrow color เป็น signal ที่ scan ได้ใน 0.3 วินาที (ตำแหน่งแถวบน), value ยังอ่านง่าย. pattern เดียวกับ alert card ใน Home — consistency ข้าม module.',
          color: WALK.coral },
        { num: 3, title: 'Wide span = coral flag · threshold inline',
          body: 'ทำไม threshold "≥ 5 = ตรวจสอบ" โชว์ header? เพราะ transparency — HR ต้องเห็นเกณฑ์ที่ระบบใช้ flag (ไม่ใช่ black box). อาทิตย์ 6 คน → bar coral + tag "span สูง" สื่อ "อาจ overload, ควรช่วยกระจาย". coral ไม่ใช่ red เพราะนี่ไม่ใช่ error เป็น signal ที่ต้องคิด.',
          color: WALK.coral },
        { num: 4, title: 'Empty span = butter · ไม่ alarm',
          body: 'ทำไม "ไม่มีลูกทีม" ใช้ butter ไม่ใช่ red? เพราะอาจเป็น role design (เช่น individual contributor expert) ไม่ใช่ปัญหา. butter = "ให้ check, แต่ไม่ panic" — เหมาะกับ ambiguous signals. red สงวนไว้สำหรับ broken state (เช่น report ที่หัวหน้า terminated แล้ว).',
          color: WALK.butter },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { OrgChartWalk1, OrgChartWalk2, OrgChartWalk3, OrgChartWalk4 });

})();
