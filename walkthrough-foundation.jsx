(() => {
// walkthrough-foundation.jsx
// Foundation walkthrough — explains the Humi shell PRIMITIVES that every
// module reuses (sidebar, nav grouping, identity surfaces, persona
// ribbon, topbar) BEFORE the per-module walkthroughs.
//
// PATTERN (retrofit · static page + rotating spotlight):
//   • One shared shell mockup is rendered as the static background of
//     every frame — viewers always see the full chrome in context.
//   • Each frame moves the spotlight (dim mask + dashed outline) to a
//     different element and pairs it with rationale annotations.
//   • Annotation tone: "ทำไมเราดีไซน์แบบนี้" (not "what it is").
//
// Mounted as the first DCSection of walkthroughs.html so audiences
// learn the shell vocabulary before any module-specific screen.

const { WALK, WalkFrame, WalkAvatar, walkStyles } = window;

// ── Shared shell mockup (admin persona = coral accent) ────────────────
// Drawn at native pixel sizes that fit the 880-wide mockup column
// (40..920 in frame-space). Sidebar = 180px, main = 700px.
// Anatomy preserved between Foundation frames so audiences see *the
// same hierarchy* highlighted from different angles.
const NAV_GROUPS = [
  { label: 'พื้นที่ทำงาน', items: [
    { icon: '🏠', text: 'หน้าหลัก',                active: true },
    { icon: '👤', text: 'โปรไฟล์ของฉัน' },
    { icon: '📅', text: 'ลางาน',                   badge: '2' },
    { icon: '💰', text: 'เงินเดือน · สวัสดิการ' },
    { icon: '📄', text: 'คำร้องและแบบฟอร์ม' },
  ]},
  { label: 'บุคลากร', items: [
    { icon: '📊', text: 'เป้าหมาย · ผลงาน' },
    { icon: '📚', text: 'การเรียนรู้' },
    { icon: '🌐', text: 'ผังองค์กร' },
  ]},
  { label: 'บริษัท', items: [
    { icon: '📣', text: 'ประกาศ' },
    { icon: '🛡️', text: 'ศูนย์รวม Admin' },
    { icon: '🔌', text: 'จัดการระบบ' },
  ]},
];

function FoundationMockup() {
  return (
    <div style={{
      position: 'absolute',
      left: 0, top: 0,
      width: 880, height: 600,
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      background: WALK.cream,
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(14,27,44,0.04), 0 10px 30px rgba(14,27,44,0.08)',
      fontFamily: WALK.font,
    }}>
      {/* ─── Sidebar ─── */}
      <aside style={{
        background: WALK.ink,
        color: 'rgba(231,227,216,0.78)',
        padding: '14px 10px',
        display: 'flex', flexDirection: 'column', gap: 2,
        position: 'relative',
      }}>
        {/* persona accent stripe (coral for admin) */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height: 3, background: WALK.coral }}/>

        {/* HUMI brand */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '6px 8px 16px',
        }}>
          <span style={{
            fontFamily: WALK.fontDisplay, fontWeight: 700, fontSize: 22,
            letterSpacing: '-0.04em', color: WALK.creamSoft,
            display:'inline-flex', alignItems:'center', gap: 3,
          }}>
            HU
            <span style={{
              width: 11, height: 13, background: WALK.accent,
              borderRadius: '50% 50% 46% 46% / 60% 60% 40% 40%',
              position: 'relative',
            }}>
              <span style={{
                position:'absolute', width: 7, height: 7,
                background: WALK.accent, borderRadius: '50%',
                top: -5, left: '50%', transform: 'translateX(-50%)',
              }}/>
            </span>
            mi
          </span>
        </div>

        {/* Nav groups */}
        {NAV_GROUPS.map((group) => (
          <React.Fragment key={group.label}>
            <div style={{
              fontSize: 8.5,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'rgba(231,227,216,0.45)',
              padding: '10px 8px 4px',
              fontWeight: 600,
            }}>{group.label}</div>
            {group.items.map((item) => (
              <div key={item.text} style={{
                display:'flex', alignItems:'center', gap: 9,
                padding: '6px 8px',
                borderRadius: 7,
                fontSize: 11.5,
                color: item.active ? '#fff' : 'rgba(231,227,216,0.78)',
                background: item.active ? 'rgba(224,136,100,0.22)' : 'transparent',
                boxShadow: item.active ? `inset 3px 0 0 ${WALK.coral}` : 'none',
                fontWeight: 500,
              }}>
                <span style={{ fontSize: 11, opacity: 0.85 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.text}</span>
                {item.badge && (
                  <span style={{
                    background: WALK.coral, color: WALK.ink,
                    fontSize: 8.5, fontWeight: 700,
                    padding: '1px 5px', borderRadius: 999,
                  }}>{item.badge}</span>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}

        <div style={{ flex: 1 }}/>

        {/* User identity block at bottom-left */}
        <div style={{
          marginTop: 'auto',
          padding: '12px 8px 4px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <WalkAvatar initials="จร" size={28}
                      color="linear-gradient(135deg, #E08864, #E8C46B)"/>
          <div style={{ minWidth: 0, overflow:'hidden' }}>
            <div style={{ color: WALK.creamSoft, fontWeight: 600, fontSize: 11 }}>คุณจงรักษ์ พ.</div>
            <div style={{ color: 'rgba(231,227,216,0.55)', fontSize: 9.5 }}>HR Admin · CEN</div>
          </div>
        </div>
      </aside>

      {/* ─── Main column ─── */}
      <main style={{ background: WALK.cream, display:'flex', flexDirection:'column' }}>

        {/* Topbar */}
        <div style={{
          display:'flex', alignItems:'center', gap: 10,
          padding: '12px 20px',
          background: 'rgba(246,241,232,0.85)',
          borderBottom: `1px solid ${WALK.hairline}`,
          height: 56, boxSizing:'border-box',
        }}>
          <div style={{
            flex: 1, maxWidth: 280,
            display:'flex', alignItems:'center', gap: 8,
            padding: '7px 12px',
            background: WALK.surface,
            border: `1px solid ${WALK.hairlineSoft}`,
            borderRadius: 10,
            fontSize: 11.5, color: WALK.inkMuted,
          }}>
            🔍 <span style={{ flex: 1 }}>ค้นหา…</span>
            <span style={{
              fontSize: 9, padding: '1px 5px',
              background: WALK.cream, border: `1px solid ${WALK.hairline}`,
              borderRadius: 4, color: WALK.inkMuted,
            }}>⌘K</span>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: WALK.surface, border:`1px solid ${WALK.hairlineSoft}`,
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            fontSize: 13, color: WALK.inkSoft,
          }}>🔔</div>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: WALK.surface, border:`1px solid ${WALK.hairlineSoft}`,
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            fontSize: 13, color: WALK.inkSoft,
          }}>⚙️</div>
        </div>

        {/* Persona ribbon */}
        <div style={{
          padding: '6px 20px',
          background: 'rgba(224,136,100,0.18)',
          borderBottom: `1px solid rgba(224,136,100,0.28)`,
          display:'flex', alignItems:'center', gap: 8, flexWrap:'wrap',
          fontSize: 10, color: WALK.inkSoft,
        }}>
          <span style={{
            padding: '2px 7px', borderRadius: 999,
            background: WALK.coral, color: '#fff',
            fontSize: 8.5, fontWeight: 700,
            letterSpacing: '.1em', textTransform:'uppercase',
          }}>HR ADMIN</span>
          <span style={{ fontWeight: 600, color: WALK.ink, fontSize: 11 }}>คุณจงรักษ์ พ.</span>
          <span style={{ color: WALK.inkFaint }}>·</span>
          <span>HR Admin · CEN</span>
          <span style={{ marginLeft: 'auto', fontSize: 9.5, color: WALK.inkFaint, fontWeight: 500 }}>
            กำลังดูจากฐานะ ฝ่ายบุคคล
          </span>
        </div>

        {/* Main content placeholder — drawn at full opacity so the
            spotlight pattern's dim mask provides the contrast, not a
            pre-faded mockup. */}
        <div style={{ padding: 18, display:'flex', flexDirection:'column', gap: 12 }}>
          <div style={{ height: 32, width: '60%', background: WALK.surface, borderRadius: 6, border:`1px solid ${WALK.hairlineSoft}` }}/>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 10 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                height: 80, background: WALK.surface,
                border: `1px solid ${WALK.hairlineSoft}`,
                borderRadius: 12,
              }}/>
            ))}
          </div>
          <div style={{ height: 130, background: WALK.surface, border: `1px solid ${WALK.hairlineSoft}`, borderRadius: 14 }}/>
          <div style={{ height: 90, background: WALK.surface, border: `1px solid ${WALK.hairlineSoft}`, borderRadius: 14 }}/>
        </div>
      </main>
    </div>
  );
}

// ── Callout coords ─────────────────────────────────────────────────────
// Mockup is positioned at (MOCKUP_X=40, BODY_TOP=120). The inner grid:
//   sidebar = x:0..180 (=40..220 in frame-space)
//   main    = x:180..880 (=220..920)
//   topbar  = y:0..56   (=120..176)
//   ribbon  = y:56..86  (=176..206)
//   user    = y:540..600 (=660..720) approx (pushed by flex: 1)
const COORDS = {
  sidebar:     { x: WALK.MOCKUP_X - 4,    y: WALK.BODY_TOP - 4,   w: 188, h: 608 },
  navGroups:   { x: WALK.MOCKUP_X + 8,    y: WALK.BODY_TOP + 56,  w: 164, h: 380 },
  userBlock:   { x: WALK.MOCKUP_X + 8,    y: WALK.BODY_TOP + 538, w: 164, h: 62  },
  personaRib:  { x: WALK.MOCKUP_X + 180,  y: WALK.BODY_TOP + 56,  w: 700, h: 30  },
  topbar:      { x: WALK.MOCKUP_X + 180,  y: WALK.BODY_TOP,       w: 700, h: 56  },
};

// Common WalkFrame props for every Foundation frame (avoids drift
// across frames when the shell mockup or persona text changes).
const COMMON = {
  totalSteps: 5,
  persona: 'Foundation · ทุก persona',
  frameHeight: 760,
};

// ═════════════════════════════════════════════════════════════════════
// Frame 1 · Sidebar — ทำไม persistent vertical nav ฝั่งซ้าย
// ═════════════════════════════════════════════════════════════════════
function FoundationWalk1() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={1}
      title="Sidebar · ทำไมเป็น vertical nav ฝั่งซ้าย"
      narrative="ก่อนเจาะแต่ละ module ทำความเข้าใจ shell ที่ใช้ซ้ำทุกหน้า — เริ่มจากโครงนอกสุด: sidebar ซ้าย เป็นจุดที่สายตาผู้อ่านไทย/อังกฤษเริ่มเสมอ"
      mockup={<FoundationMockup/>}
      dim
      callouts={[
        { num: 1, ...COORDS.sidebar, color: WALK.accent },
      ]}
      annotations={[
        { num: 1, title: 'Sidebar · ซ้าย · persistent vertical nav',
          body: 'เลือก "ซ้าย" เพราะอ่านไทย/อังกฤษ LTR สายตาเริ่มที่มุมซ้ายบนเสมอ. เลือก "vertical" แทน top-tab เพราะ Humi มี 11+ destination — ใส่ใน top bar โดยไม่ตัดหรือซ่อนเป็นไปไม่ได้. สีเข้ม (#0E1B2C) ตัดกับ canvas cream เพื่อให้ chrome ไม่กลืน content area',
          color: WALK.accent },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════
// Frame 2 · Nav grouping — ทำไม 3 ก้อน เรียงตาม frequency
// ═════════════════════════════════════════════════════════════════════
function FoundationWalk2() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={2}
      title="Nav grouping · 3 ก้อน เรียงตาม frequency"
      narrative="ของใน sidebar ไม่ใช่เรียงตามตัวอักษร แต่เรียงตามจังหวะการใช้ — สิ่งที่ทำทุกวันอยู่บนสุด สิ่งที่ทำเป็นครั้งคราวอยู่ล่าง เพื่อให้ scan สั้นที่สุด"
      mockup={<FoundationMockup/>}
      dim
      callouts={[
        { num: 1, ...COORDS.navGroups, color: WALK.indigo },
      ]}
      annotations={[
        { num: 1, title: '3 nav groups · จัดตามจังหวะใช้งาน',
          body: '"พื้นที่ทำงาน" = ทำทุกวัน (home, profile, leave, payroll, requests) → บนสุด. "บุคลากร" = เปิดเป็นครั้งคราว (goals, learning, org). "บริษัท" = ระดับ admin/announce → ล่างเพราะเข้าน้อยกว่า. เรียงตาม frequency เพื่อลด scan time, ไม่ใช่ตามตัวอักษรเพราะ alphabet ไม่บอก behavior',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════
// Frame 3 · Identity ชั้นที่ 1 — sidebar bottom user block
// ═════════════════════════════════════════════════════════════════════
function FoundationWalk3() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={3}
      title="Identity ชั้นที่ 1 · sidebar bottom"
      narrative='Humi มี "ตอนนี้คือใคร" 2 surfaces เพื่อกัน login-as ผิดคน — ชั้นแรกอยู่มุมล่างซ้ายของ sidebar เกาะตลอดทุกหน้า'
      mockup={<FoundationMockup/>}
      dim
      callouts={[
        { num: 1, ...COORDS.userBlock, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'รูป + ชื่อ + role · มุมล่างซ้าย',
          body: 'ตำแหน่งคือ "พักสายตาสุดท้ายก่อนกด" — เปลี่ยน persona/role จะเห็นที่นี่ก่อนทำ action สำคัญ. ไม่ใส่บน topbar เพราะ topbar เป็นพื้นที่ utility (search/bell/gear) ที่เปลี่ยน context บ่อย — identity ต้องนิ่งกว่านั้น',
          color: WALK.coral },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════
// Frame 4 · Identity ชั้นที่ 2 — persona ribbon
// ═════════════════════════════════════════════════════════════════════
function FoundationWalk4() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={4}
      title="Identity ชั้นที่ 2 · persona ribbon"
      narrative="ribbon สีตาม persona ใต้ topbar — เปลี่ยนสีทันทีตอน login-as คนอื่น เพื่อ HR Admin จะไม่หลงคิดว่าตัวเองยังเป็น admin"
      mockup={<FoundationMockup/>}
      dim
      callouts={[
        { num: 1, ...COORDS.personaRib, color: WALK.coral, radius: 6 },
      ]}
      annotations={[
        { num: 1, title: 'แถบสีตาม persona · บอก "กำลังดูจากฐานะใคร"',
          body: 'admin = coral, manager = sage, hris = butter, spd = blue-gray, employee = teal. สอง surfaces ของ identity (sidebar block + ribbon นี้) ทำให้ "ตอนนี้คือใคร" หลุดสายตาไม่ได้ใน frame เดียวกัน. ใช้สีพื้นหลังอ่อน + label uppercase สั้น (HR ADMIN) ที่ทุกคน scan ได้ใน 0.3 วินาที',
          color: WALK.coral },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════
// Frame 5 · Topbar utility — search + notification + settings
// ═════════════════════════════════════════════════════════════════════
function FoundationWalk5() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={5}
      title="Topbar · utility cluster ขวาบน"
      narrative='Topbar เก็บแค่ "utility ที่ใช้บ่อยจากทุกหน้า" — search, notification, settings. ไม่มี nav, ไม่มี identity เพราะ 2 อย่างนั้นอยู่ใน sidebar+ribbon แล้ว'
      mockup={<FoundationMockup/>}
      dim
      callouts={[
        { num: 1, ...COORDS.topbar, color: WALK.butter, radius: 8 },
      ]}
      annotations={[
        { num: 1, title: 'Search ซ้าย · bell + gear ขวา',
          body: 'Search ใหญ่และอยู่ซ้ายเพราะเป็น primary action ของ topbar (⌘K shortcut). bell + gear เป็น icon-only ขวาสุดเพราะ secondary — เปิด popover เมื่อต้องการ. แยกพื้นที่ chrome (topbar = utility, ribbon = identity, sidebar = nav) ทำให้แต่ละแถบมีหน้าที่เดียว ไม่งงว่าจะคลิกตรงไหน',
          color: WALK.butter },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, {
  FoundationWalk1, FoundationWalk2, FoundationWalk3,
  FoundationWalk4, FoundationWalk5,
});

})();
