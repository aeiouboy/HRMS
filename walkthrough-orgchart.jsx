// walkthrough-orgchart.jsx
// OrgChart module Design Walkthrough (Employee → Manager arc).
// 4 frames following an exploration journey:
//   01 ตัวเองอยู่ตรงไหน   — Tree view: chain of command + peers + reports
//   02 รู้จักคนใกล้ตัว     — Person panel: stats + contact + reporting line
//   03 หาคนข้ามหน่วย       — Search & list view: filter by name/role/branch
//   04 เข้าใจโครงสร้าง      — Cross-org: span of control + depth metrics
//
// Frames 1-2 ใช้ persona Employee (มาริสา) สำรวจตำแหน่งตัวเอง
// Frames 3-4 เปลี่ยนเป็น Manager / HR Admin วิเคราะห์ข้ามหน่วย
//
// Mockups เป็น inline-style replica ของ OrgChartView ใน mod-orgchart.jsx
// (เก็บ inline เพื่อกัน drift กับ live component)

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ── Small helper: org tree node card (mirror of OrgNode) ───────────
function WalkOrgNode({ initials, name, role, color, size = 'md', highlight, dim }) {
  const sizes = {
    sm: { w: 124, pad: 8,  av: 26, name: 11.5, role: 10 },
    md: { w: 160, pad: 12, av: 32, name: 12.5, role: 10.5 },
    lg: { w: 200, pad: 14, av: 48, name: 14,   role: 11 },
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
      textAlign: 'center',
      opacity: dim ? 0.55 : 1,
      flexShrink: 0,
      display: 'inline-block',
    }}>
      <div style={{ margin: '0 auto 6px', display: 'flex', justifyContent: 'center' }}>
        <WalkAvatar initials={initials} color={color} size={s.av} border={WALK.surface}/>
      </div>
      <div style={{ fontWeight: 600, fontSize: s.name, letterSpacing: '-0.005em', lineHeight: 1.25, color: WALK.ink }}>{name}</div>
      <div style={{ fontSize: s.role, color: WALK.inkMuted, marginTop: 2, lineHeight: 1.3 }}>{role}</div>
    </div>
  );
}

function WalkConnector({ h = 16 }) {
  return <div style={{ width: 2, height: h, background: WALK.hairline, margin: '0 auto' }}/>;
}

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · ตัวเองอยู่ตรงไหน — Tree view: chain + peers + reports
// ═══════════════════════════════════════════════════════════════════
function OrgChartWalk1() {
  const mockup = (
    <div style={{ ...walkStyles.card(false), minHeight: 600, padding: '20px 22px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={walkStyles.eyebrow}>สายบังคับบัญชา</div>
          <h3 style={walkStyles.h3Display}>ผังองค์กร</h3>
        </div>
        <div style={{ flex: 1 }}/>
        {/* Seg tabs */}
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

      {/* Search bar (collapsed, no dropdown in frame 1) */}
      <div style={{
        position: 'relative', marginBottom: 18,
        background: WALK.creamSoft,
        border: `1px solid ${WALK.hairline}`,
        borderRadius: 10,
        padding: '9px 12px 9px 34px',
        fontSize: 12.5, color: WALK.inkMuted,
      }}>
        <span style={{ position: 'absolute', left: 12, top: 9, color: WALK.inkMuted }}>🔍</span>
        ค้นหาชื่อหรือตำแหน่ง…
      </div>

      {/* Tree */}
      <div style={{ textAlign: 'center', paddingBottom: 8 }}>
        {/* Chain: Grace → Jordan → Dana → Ava */}
        <WalkOrgNode initials="GH" name="เกรซ หวง" role="CHRO" color={WALK.ink} size="sm"/>
        <WalkConnector/>
        <WalkOrgNode initials="JM" name="จอร์แดน เหมย" role="People Ops Director" color={WALK.sage} size="sm"/>
        <WalkConnector/>
        <WalkOrgNode initials="DL" name="ดานา หลิว" role="ผจก.เขต กทม.กลาง" color={WALK.coral} size="sm"/>
        <WalkConnector/>
        <WalkOrgNode initials="จท" name="จงรักษ์ ทานากะ" role="ผจก.สาขา II" color={WALK.coral} size="sm"/>
        <WalkConnector/>

        {/* Selected — Arthit (large) */}
        <WalkOrgNode initials="AC" name="อาทิตย์ ชื่นบาน" role="หัวหน้ากะ · Store L1" color={WALK.sage} size="lg" highlight/>

        <WalkConnector h={12}/>
        <div style={{
          fontSize: 9.5, color: WALK.inkFaint, textTransform: 'uppercase',
          letterSpacing: '.12em', marginBottom: 8, fontWeight: 600,
        }}>ลูกทีม · 6 คน</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <WalkOrgNode initials="MS" name="มาริสา" role="Cashier · L1"        color={WALK.accent} size="sm"/>
          <WalkOrgNode initials="TM" name="ธีรพัฒน์" role="Sr. Cashier · L2"   color={WALK.sage}   size="sm"/>
          <WalkOrgNode initials="KP" name="กัลยา"    role="Sales · L1"        color={WALK.butter} size="sm"/>
          <WalkOrgNode initials="PV" name="ปรีชา"    role="Floor · L1"         color={WALK.ink}    size="sm"/>
          <WalkOrgNode initials="NP" name="นิภาพร"   role="Cashier · L1"      color={WALK.coral}  size="sm"/>
          <WalkOrgNode initials="AP" name="อัมพร"    role="Sales · L1"         color={WALK.accent} size="sm"/>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Employee · มาริสา (สำรวจหัวหน้า)"
      title="ตัวเองอยู่ตรงไหน · สายบังคับบัญชาแนวตั้ง"
      narrative="พนักงานใหม่เปิดผังองค์กรเพื่อตอบคำถาม 'ฉันรายงานต่อใคร และใครรายงานต่อฉัน' — Humi เลือก vertical chain แทน traditional pyramid เพราะ scan ลงล่างได้บนมือถือ; node ตัวเองโตและเรืองแสง teal เพื่อ anchor สายตา"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 290, y: WALK.BODY_TOP + 132, w: 200, h: 220, color: WALK.inkMuted },
        { num: 2, x: WALK.MOCKUP_X + 270, y: WALK.BODY_TOP + 360, w: 240, h: 96 },
        { num: 3, x: WALK.MOCKUP_X + 50,  y: WALK.BODY_TOP + 490, w: 780, h: 88, color: WALK.sage },
        { num: 4, x: WALK.MOCKUP_X + 612, y: WALK.BODY_TOP + 14,  w: 130, h: 36, radius: 18, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Manager chain แนวตั้ง · 4 ชั้น',
          body: 'CHRO → Director → ผจก.เขต → ผจก.สาขา → หัวหน้ากะ — เรียงจากบนลงล่างใน column เดียว ทำให้ scroll นิ้วโป้งบนมือถือเข้าใจ hierarchy ได้ทันทีโดยไม่ต้อง pan ซ้าย-ขวา' },
        { num: 2, title: 'Selected node ใหญ่ + teal glow',
          body: 'Node ที่ focus ใช้ size "lg" + accentSoft bg + teal shadow — anchor สายตาก่อน scan ขึ้น (หัวหน้า) หรือลง (ลูกทีม); ขนาดต่างกันบอก scale ว่า "เราอยู่ตรงนี้"', color: WALK.accent },
        { num: 3, title: 'ลูกทีมเรียงแนวนอนเท่ากัน',
          body: 'Direct reports 6 คนใช้ size "sm" เท่ากันหมด — สื่อว่า peers อยู่ระดับเดียวกัน ไม่จัดอันดับ; กดที่ใครก็ได้เพื่อเปลี่ยน focus → reroot tree รอบคนใหม่', color: WALK.sage },
        { num: 4, title: 'Seg toggle ผัง ↔ รายการ',
          body: 'Pill toggle ขวาบน — ผัง = visual exploration, รายการ = scannable directory; เก็บ search bar เดียวกันทั้งสอง view เพื่อ context ไม่หาย', color: WALK.coral },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · รู้จักคนใกล้ตัว — Person panel: stats + contact + chain
// ═══════════════════════════════════════════════════════════════════
function OrgChartWalk2() {
  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Profile header card */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden', minHeight: 220 }}>
        {/* Dark gradient banner */}
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
        <div style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{
              width: 62, height: 62, borderRadius: 14,
              background: WALK.accent, color: '#fff',
              fontSize: 20, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${WALK.surface}`,
              flexShrink: 0,
            }}>MS</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{
                margin: 0,
                fontFamily: WALK.fontDisplay,
                fontSize: 21, fontWeight: 600, letterSpacing: '-0.01em', color: WALK.ink,
              }}>มาริสา สงวนศักดิ์</h2>
              <div style={{ fontSize: 12.5, color: WALK.inkMuted, marginTop: 3, lineHeight: 1.5 }}>
                Cashier · L1 · Central CTW ชั้น 1 · รายงานต่อ <b style={{ color: WALK.inkSoft }}>อาทิตย์ ชื่นบาน</b>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button style={{ ...walkStyles.btnGhost, padding: '6px 11px', fontSize: 11.5 }}>✉ ส่งข้อความ</button>
            <button style={{ ...walkStyles.btnGhost, padding: '6px 11px', fontSize: 11.5 }}>📄 ดูโปรไฟล์เต็ม</button>
          </div>
        </div>

        {/* Quick stats strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${WALK.hairlineSoft}`,
        }}>
          {[
            { l: 'อายุงาน', v: '2 ปี 7 ด.' },
            { l: 'เกรด',    v: 'G2' },
            { l: 'ลูกทีม',  v: '— คน' },
            { l: 'ที่ตั้ง',  v: 'กรุงเทพฯ' },
          ].map((s, i) => (
            <div key={s.l} style={{
              padding: '11px 14px',
              borderLeft: i === 0 ? 0 : `1px solid ${WALK.hairlineSoft}`,
            }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>{s.l}</div>
              <div style={{
                fontFamily: WALK.fontDisplay,
                fontSize: 15, fontWeight: 700,
                marginTop: 3, letterSpacing: '-0.01em', color: WALK.ink,
              }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact + Employment */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={walkStyles.card(false)}>
          <div style={walkStyles.eyebrow}>ช่องทางติดต่อ</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 10, fontSize: 12.5 }}>
            <div style={{ color: WALK.inkSoft }}>✉ marisa.s@central.co.th</div>
            <div style={{ color: WALK.inkSoft }}>📞 +66 89-•••-4521</div>
            <div style={{ color: WALK.inkMuted, fontSize: 11.5 }}>🌐 ICT · ขณะนี้ 14:23</div>
          </div>
        </div>
        <div style={walkStyles.card(false)}>
          <div style={walkStyles.eyebrow}>การจ้างงาน</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10, fontSize: 12.5 }}>
            {[
              ['ประเภท', 'พนักงานประจำ · รายเดือน'],
              ['เริ่มงาน', '12 ก.ย. 2566'],
              ['ผลตอบแทน', '฿18,500 / เดือน'],
              ['Cost center', 'RTL-CTW-0412'],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: WALK.inkMuted, width: 78, fontSize: 11.5 }}>{l}</span>
                <span style={{ color: WALK.inkSoft, fontWeight: 500, flex: 1 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills card (preview) */}
      <div style={walkStyles.card(false)}>
        <div style={walkStyles.eyebrow}>ทักษะ</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {['จัดการเงินสด','POS','บริการลูกค้า','ตรวจนับสินค้า'].map(s => (
            <span key={s} style={{
              background: WALK.creamSoft, color: WALK.inkSoft,
              padding: '4px 10px', borderRadius: 999,
              fontSize: 11.5, fontWeight: 500,
              border: `1px solid ${WALK.hairlineSoft}`,
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="Employee · มาริสา (ดูตัวเอง)"
      title="รู้จักคนใกล้ตัว · stats + contact + reporting line"
      narrative="คลิก node แล้ว panel ขวาเปลี่ยนทันที — banner + 4 quick stats + contact + employment + skills เรียงตามลำดับ 'ใคร → อะไร → ติดต่อยังไง'; reporting line ฝังไว้ใน subtitle เพื่อเชื่อมกลับ tree ฝั่งซ้าย"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 12,  y: WALK.BODY_TOP + 10,  w: 856, h: 110 },
        { num: 2, x: WALK.MOCKUP_X + 12,  y: WALK.BODY_TOP + 158, w: 856, h: 70, color: WALK.butter },
        { num: 3, x: WALK.MOCKUP_X + 12,  y: WALK.BODY_TOP + 244, w: 421, h: 122, color: WALK.sage },
        { num: 4, x: WALK.MOCKUP_X + 442, y: WALK.BODY_TOP + 244, w: 426, h: 122, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Hero banner ink + reporting line',
          body: 'Banner gradient ink ตัดกับ panel cream — บอก "นี่คือคนคนนี้" ใน subtitle ฝัง "รายงานต่อ อาทิตย์" ที่กดเปลี่ยน focus กลับไปดูหัวหน้าได้ทันที (one tap traversal)' },
        { num: 2, title: '4 quick stats grid — scannable',
          body: 'อายุงาน · เกรด · ลูกทีม · ที่ตั้ง รวมใน 4 columns ติดกัน — display font + tabular numerals; แต่ละ stat ตอบ 1 คำถามที่ HR/Manager ถามบ่อยที่สุดเวลาเจอชื่อใหม่', color: WALK.butter },
        { num: 3, title: 'ช่องทางติดต่อ · 3 medium',
          body: 'อีเมล · เบอร์ · timezone ขณะนี้ — มาก่อน employment เพราะ employee persona มาดูเพื่อนเพื่อ "ติดต่อ" ไม่ใช่ "วิเคราะห์"; เบอร์ mask ตามสิทธิ์', color: WALK.sage },
        { num: 4, title: 'การจ้างงาน · privileged data',
          body: 'ค่าจ้าง + cost center โผล่เฉพาะตัวเองหรือ HR Admin — table 2-col (label · value) อ่านง่ายกว่า card grid; ตำแหน่ง right side สื่อว่า "ข้อมูลภายใน" แยกจาก contact public', color: WALK.coral },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · หาคนข้ามหน่วย — Search & list view
// ═══════════════════════════════════════════════════════════════════
function OrgChartWalk3() {
  const results = [
    { i: 'จท', n: 'จงรักษ์ ทานากะ',   r: 'ผู้จัดการสาขา II',           c: WALK.coral },
    { i: 'JO', n: 'เจส โอคอน',         r: 'ผู้จัดการสาขา',              c: WALK.accent },
    { i: 'AK', n: 'อาเมียร์ คาลิล',    r: 'ผู้จัดการสาขา',              c: WALK.butter },
  ];
  const listRows = [
    { i: 'GH', n: 'เกรซ หวง',         r: 'CHRO',                        d: 'สำนักงานใหญ่',     reports: 2, c: WALK.ink,    sel: false },
    { i: 'JM', n: 'จอร์แดน เหมย',     r: 'People Ops Director',         d: 'สำนักงานใหญ่',     reports: 2, c: WALK.sage,   sel: false },
    { i: 'DL', n: 'ดานา หลิว',        r: 'ผู้จัดการเขต กรุงเทพฯ กลาง',  d: 'เขตทองหล่อ-สีลม',  reports: 4, c: WALK.coral,  sel: true  },
    { i: 'จท', n: 'จงรักษ์ ทานากะ',   r: 'ผู้จัดการสาขา II',           d: 'Central CTW',      reports: 1, c: WALK.coral,  sel: false },
    { i: 'JO', n: 'เจส โอคอน',         r: 'ผู้จัดการสาขา',              d: 'Central Silom',    reports: 0, c: WALK.accent, sel: false },
    { i: 'AC', n: 'อาทิตย์ ชื่นบาน',   r: 'หัวหน้ากะ · L1',             d: 'Central CTW',      reports: 6, c: WALK.sage,   sel: false },
  ];

  const mockup = (
    <div style={{ ...walkStyles.card(false), minHeight: 600, padding: '20px 22px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={walkStyles.eyebrow}>ค้นหาบุคคล</div>
          <h3 style={walkStyles.h3Display}>รายการพนักงาน</h3>
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
              background: i === 1 ? WALK.surface : 'transparent',
              color: i === 1 ? WALK.ink : WALK.inkMuted,
              boxShadow: i === 1 ? '0 1px 2px rgba(14,27,44,.06)' : 'none',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Active search field */}
      <div style={{
        position: 'relative', marginBottom: 6,
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

      {/* Search dropdown */}
      <div style={{
        background: WALK.surface,
        border: `1px solid ${WALK.hairline}`,
        borderRadius: 12,
        boxShadow: '0 6px 18px rgba(14,27,44,.08)',
        padding: 6, marginBottom: 18,
      }}>
        {results.map(r => (
          <div key={r.n} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 10px', borderRadius: 8,
            background: 'transparent',
          }}>
            <WalkAvatar initials={r.i} color={r.c} size={26}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink }}>{r.n}</div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>{r.r}</div>
            </div>
          </div>
        ))}
      </div>

      {/* List view rows */}
      <div style={{
        background: WALK.creamSoft,
        border: `1px solid ${WALK.hairlineSoft}`,
        borderRadius: 12,
        padding: 4,
        maxHeight: 320, overflow: 'hidden',
      }}>
        {listRows.map(row => (
          <div key={row.n} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 8,
            background: row.sel ? WALK.accentSoft : 'transparent',
            marginBottom: 2,
          }}>
            <WalkAvatar initials={row.i} color={row.c} size={28}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink }}>{row.n}</div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>{row.r} · {row.d}</div>
            </div>
            {row.reports > 0 && (
              <span style={{
                fontSize: 9.5, color: WALK.inkFaint, fontWeight: 600,
                letterSpacing: '.06em', textTransform: 'uppercase',
              }}>{row.reports} ลูกทีม</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="HR Admin · พิมพ์หาคนข้ามหน่วย"
      title="หาคนข้ามหน่วย · search + list directory"
      narrative="HR Admin ไม่ได้รู้จักทุกคน — search ตรงกลางตอบ name/role/branch พร้อมกัน; dropdown แสดง 6 อันดับแรกแบบ inline เพื่อเข้าโปรไฟล์ใน 1 คลิก ส่วน list view ให้ scroll ทั้ง directory ตอนยังไม่รู้ว่าจะค้นคำว่าอะไร"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 22,  y: WALK.BODY_TOP + 76,  w: 836, h: 44, color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 22,  y: WALK.BODY_TOP + 132, w: 836, h: 140 },
        { num: 3, x: WALK.MOCKUP_X + 22,  y: WALK.BODY_TOP + 290, w: 836, h: 290, color: WALK.sage },
        { num: 4, x: WALK.MOCKUP_X + 612, y: WALK.BODY_TOP + 14,  w: 130, h: 36, radius: 18, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Search · 3 field ในกล่องเดียว',
          body: 'พิมพ์ครั้งเดียวค้นได้ทั้งชื่อ ตำแหน่ง และสาขา — ไม่บังคับ user เลือก filter ก่อน; teal ring เมื่อ focus = active state อ่านง่ายไม่ต้องดู cursor', color: WALK.accent },
        { num: 2, title: 'Dropdown 6 อันดับ + avatar',
          body: 'Result แสดง avatar + ชื่อ + ตำแหน่ง ครบ 3 บรรทัด — ใช้ size 26 เพื่อ scan แนวตั้งเร็ว; click → setSelected + clear query เพื่อรีโฟกัส tree' },
        { num: 3, title: 'List view · full directory',
          body: 'เมื่อยังไม่พิมพ์ คน HR scroll ดูทั้งหมดได้ — row แสดง role · branch · จำนวนลูกทีม เป็น metadata 3 ชั้น; row ที่เลือกใช้ accentSoft bg สอดคล้องกับ tree highlight', color: WALK.sage },
        { num: 4, title: 'Toggle ไป "รายการ" แล้ว',
          body: 'Seg pill เลื่อนมาฝั่ง "รายการ" — บอก context ปัจจุบัน; tree ฝั่งซ้าย hide เพราะ list ครอบทั้ง column เพื่อใช้พื้นที่อ่าน 30+ คนได้ครบ', color: WALK.coral },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · เข้าใจโครงสร้าง — Cross-org span of control + depth
// ═══════════════════════════════════════════════════════════════════
function OrgChartWalk4() {
  const spans = [
    { n: 'อาทิตย์ ชื่นบาน',   r: 'หัวหน้ากะ · CTW',          n_reports: 6,  c: WALK.sage,   bar: 100, flag: 'wide' },
    { n: 'ดานา หลิว',         r: 'ผจก.เขต กทม.กลาง',         n_reports: 4,  c: WALK.coral,  bar: 67,  flag: null },
    { n: 'จอร์แดน เหมย',      r: 'People Ops Director',       n_reports: 2,  c: WALK.sage,   bar: 33,  flag: null },
    { n: 'เกรซ หวง',           r: 'CHRO',                      n_reports: 2,  c: WALK.ink,    bar: 33,  flag: null },
    { n: 'ซิโมน ฟอง',         r: 'ผจก.เขต กทม.ตะวันตก',      n_reports: 0,  c: WALK.accent, bar: 0,   flag: 'gap' },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ ...walkStyles.card(true), padding: '16px 20px' }}>
        <div style={walkStyles.eyebrow}>วิเคราะห์โครงสร้าง · Central Retail</div>
        <h3 style={{ ...walkStyles.h3Display, marginTop: 4 }}>Span of control · depth & coverage</h3>
      </div>

      {/* Top metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { l: 'ความลึกสูงสุด', v: '5 ชั้น', s: 'CHRO → Cashier',     c: WALK.ink },
          { l: 'Span เฉลี่ย',    v: '2.8',    s: 'ลูกทีม/หัวหน้า',     c: WALK.accent },
          { l: 'หัวหน้าทั้งหมด',  v: '6 คน',   s: 'มี report ≥ 1',     c: WALK.sage },
          { l: 'แจ้งเตือน',      v: '2 จุด',  s: 'ตรวจสอบช่วงควบคุม',  c: WALK.coral },
        ].map((m, i) => (
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

      {/* Span comparison bars */}
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

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HR Admin · วิเคราะห์โครงสร้าง"
      title="เข้าใจโครงสร้าง · span of control + depth"
      narrative="ข้อมูลใน ORG_PEOPLE ไม่ใช่แค่ tree วาดเล่น — aggregate ได้เป็น depth/span metrics ที่ HR ใช้ตัดสินใจ org redesign; flag teal/coral/butter เน้นจุดที่ span สูงเกินไป (คน burnout) หรือ direct ว่างเปล่า (role redundant)"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 12,  y: WALK.BODY_TOP + 78,  w: 200, h: 96, color: WALK.ink },
        { num: 2, x: WALK.MOCKUP_X + 656, y: WALK.BODY_TOP + 78,  w: 212, h: 96, color: WALK.coral },
        { num: 3, x: WALK.MOCKUP_X + 12,  y: WALK.BODY_TOP + 264, w: 856, h: 64, color: WALK.coral },
        { num: 4, x: WALK.MOCKUP_X + 12,  y: WALK.BODY_TOP + 488, w: 856, h: 50, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'Depth = ความสูงของ org',
          body: '5 ชั้น CHRO → Cashier บอก hierarchy ความซับซ้อน — display font + tabular numerals; subtitle อธิบาย path เพื่อให้ตัวเลขมี meaning ไม่ลอย', color: WALK.ink },
        { num: 2, title: 'Alert tile · coral accent',
          body: 'Tile "แจ้งเตือน 2 จุด" ใช้ coral eyebrow ดึงสายตา — บอกว่ามี anomaly ที่ต้องดู (span สูง + role ว่าง); pattern เดียวกับ alert card ใน Home', color: WALK.coral },
        { num: 3, title: 'Wide span = coral flag',
          body: 'อาทิตย์ span 6 คน เกิน threshold 5 → bar เป็น coral + tag "span สูง" — สื่อ "อาจ overload ต้องช่วยกระจาย"; threshold โชว์ที่ header เพื่อ transparency', color: WALK.coral },
        { num: 4, title: 'Empty span = butter warning',
          body: 'ซิโมนไม่มี direct report → bar 0 + tag butter "ไม่มีลูกทีม" — ใช้สี warm ไม่ใช่ red เพราะอาจเป็น role design ไม่ใช่ปัญหา; เตือนแต่ไม่ alarm', color: WALK.butter },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { OrgChartWalk1, OrgChartWalk2, OrgChartWalk3, OrgChartWalk4 });
