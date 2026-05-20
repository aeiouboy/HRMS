// prod-shell.jsx — Sidebar + topbar with persona awareness
// Each persona gets a distinct identity (accent stripe, avatar, name, ribbon)
// so the user always knows which role they're viewing the screen as.

const PERSONA_PROFILES = {
  employee: {
    initials: "KS",  name: "คุณกฤษณ์ ส.",     role: "พนักงานขาย · Central World",
    labelTh: "พนักงาน",     labelEn: "EMPLOYEE",
    accent: "#1FA8A0", soft: "rgba(31,168,160,0.18)",  avatarGrad: "linear-gradient(135deg, #1FA8A0, #9BB5A0)",
    homeNav: "home",
  },
  manager: {
    initials: "SC",  name: "คุณสมชาย ช.",    role: "Store Manager · Central World",
    labelTh: "หัวหน้างาน",    labelEn: "MANAGER",
    accent: "#7DA084", soft: "rgba(125,160,132,0.22)", avatarGrad: "linear-gradient(135deg, #7DA084, #9BB5A0)",
    homeNav: "home",
  },
  admin: {
    initials: "JR",  name: "คุณจงรักษ์ พ.",  role: "HR Admin · CEN",
    labelTh: "ฝ่ายบุคคล",     labelEn: "HR ADMIN",
    accent: "#E08864", soft: "rgba(224,136,100,0.20)", avatarGrad: "linear-gradient(135deg, #E08864, #E8C46B)",
    homeNav: "admin",
  },
  hris: {
    initials: "PW",  name: "คุณพรวลัย ก.",   role: "HRIS Manager · CRG",
    labelTh: "HRIS",          labelEn: "HRIS",
    accent: "#D4A53A", soft: "rgba(212,165,58,0.20)",  avatarGrad: "linear-gradient(135deg, #D4A53A, #E8C46B)",
    homeNav: "integrations",
  },
  spd: {
    initials: "NT",  name: "คุณนภสร ท.",    role: "SPD Officer · Document Control",
    labelTh: "SPD",           labelEn: "SPD",
    accent: "#5F7689", soft: "rgba(95,118,137,0.22)",  avatarGrad: "linear-gradient(135deg, #5F7689, #8D9BAA)",
    homeNav: "admin",
  },
};

function ProdShell({ page, persona = "admin", children }) {
  const I = window.PI;
  const P = PERSONA_PROFILES[persona] || PERSONA_PROFILES.admin;

  // Visible nav per persona (admin-only items are filtered out for emp/mgr/spd)
  const NAV_FULL = [
    { group: "พื้นที่ทำงาน", items: [
      { id: "home", label: "หน้าหลัก", icon: "home", show: ["employee","manager","admin","hris","spd"] },
      { id: "profile", label: "โปรไฟล์ของฉัน", icon: "user", show: ["employee","manager","admin","hris","spd"] },
      { id: "timeoff", label: "ลางาน", icon: "calendar", badge: "2", show: ["employee","manager","admin"] },
      { id: "benefits", label: "เงินเดือน · สวัสดิการ", icon: "heart", show: ["employee","manager","admin"] },
      { id: "requests", label: "คำร้องและแบบฟอร์ม", icon: "fileText", show: ["employee","manager","admin","spd"] },
    ]},
    { group: "บุคลากร", items: [
      { id: "team", label: "ทีมของฉัน", icon: "users", show: ["manager"] },
      { id: "goals", label: "เป้าหมาย · ผลงาน", icon: "barChart", show: ["employee","manager","admin"] },
      { id: "learning", label: "การเรียนรู้", icon: "book", show: ["employee","manager","admin"] },
      { id: "org", label: "ผังองค์กร", icon: "globe", show: ["employee","manager","admin","hris","spd"] },
    ]},
    { group: "บริษัท", items: [
      { id: "announce", label: "ประกาศ", icon: "mega", show: ["employee","manager","admin","hris","spd"] },
      { id: "admin", label: "ศูนย์รวม Admin", icon: "shield", show: ["admin","hris","spd"] },
      { id: "integrations", label: "จัดการระบบ", icon: "plug", show: ["admin","hris"] },
    ]},
  ];

  const NAV = NAV_FULL
    .map(g => ({ ...g, items: g.items.filter(it => it.show.includes(persona)) }))
    .filter(g => g.items.length > 0)
    .map(g => ({ ...g, items: g.items.map(it => ({
      ...it,
      active:
        (page === "home"  && it.id === "home") ||
        (page === "hire"  && it.id === "admin") ||
        (page === "admin" && it.id === "admin") ||
        (page === "team"  && it.id === "team"),
    })) }));

  return (
    <div className="humi-app">
      <aside className="humi-sidebar" style={{ fontFamily: "CPN", position: "relative" }}>
        {/* Persona accent stripe — top of sidebar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: P.accent,
        }}/>

        <div className="humi-brand" style={{ padding: "4px 10px 18px" }}>
          <img
            src="humi-logo-final-2.png"
            alt="Humi"
            style={{ height: 78, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        {NAV.map((group) =>
          <React.Fragment key={group.group}>
            <div className="humi-nav-label">{group.group}</div>
            {group.items.map((item) => {
              const Glyph = I[item.icon];
              return (
                <div key={item.id} className={"humi-nav-item" + (item.active ? " active" : "")}
                     style={item.active ? { background: P.soft, color: "#fff" } : null}>
                  <span className="humi-nav-icon"><Glyph size={16} /></span>
                  {item.label}
                  {item.badge && <span className="humi-pill">{item.badge}</span>}
                </div>
              );
            })}
          </React.Fragment>
        )}

        <div className="humi-user">
          <div className="humi-avatar" style={{ background: P.avatarGrad, color: "#fff" }}>{P.initials}</div>
          <div style={{ minWidth: 0, overflow: "hidden" }}>
            <div className="humi-user-name" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{P.name}</div>
            <div className="humi-user-role">{P.role}</div>
          </div>
        </div>
      </aside>

      <main className="humi-main">
        <div className="humi-topbar">
          <div className="humi-search">
            <I.search size={15} />
            <span style={{ flex: 1 }}>ค้นหา…</span>
            <kbd>⌘K</kbd>
          </div>
          <div className="humi-spacer" />
          <button className="humi-icon-btn" aria-label="แจ้งเตือน"><I.bell size={18} /></button>
          <button className="humi-icon-btn" aria-label="ตั้งค่า"><I.cog size={18} /></button>
        </div>

        {/* Persona ribbon — bold, distinct identity for every screen */}
        <div style={{
          margin: "0 -32px 18px", padding: "8px 32px",
          background: P.soft,
          borderBottom: `1px solid ${P.accent}33`,
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
          fontSize: 12, color: "var(--color-ink-soft)",
          letterSpacing: ".02em",
        }}>
          <span style={{
            padding: "3px 10px", borderRadius: 999,
            background: P.accent, color: "#fff",
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase",
          }}>{P.labelEn}</span>
          <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>{P.name}</span>
          <span style={{ color: "var(--color-ink-faint)" }}>·</span>
          <span>{P.role}</span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--color-ink-faint)", fontWeight: 500 }}>
            กำลังดูจากฐานะ {P.labelTh}
          </span>
        </div>

        {children}
      </main>
    </div>
  );
}

window.ProdShell = ProdShell;
window.PERSONA_PROFILES = PERSONA_PROFILES;
