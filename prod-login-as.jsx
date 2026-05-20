// prod-login-as.jsx — Login-as-Person (impersonation) UI for HR (Humi)
// Hi-fi static mockup. Renders as a POPOVER anchored to the gear icon (top-right
// of topbar). Behind the popover: dimmed admin-home placeholder so the spatial
// trigger story reads: "Click ⚙️ → this opens."
//
// Jira-style: one search → one click → done. No tier selector, no confirm step,
// no banner, no audit page.

const LA_PEOPLE = [
  { id: "30048829", name_th: "ภานุพงศ์ ศรีวิชัย", name_en: "Phanupong S.",    pos: "Cashier",             dept: "Store Operations · Central World",      status: "active",   last_login: "08:42 วันนี้",     avatar: "ภศ", avatarColor: "humi-avatar--teal"   },
  { id: "30051142", name_th: "ปวริศา จันทร์ดี",    name_en: "Pavarisa C.",     pos: "Visual Merchandiser", dept: "Marketing · Central Ladprao",           status: "active",   last_login: "08:01 วันนี้",     avatar: "ปจ", avatarColor: "humi-avatar--sage"   },
  { id: "30049770", name_th: "ธนวัฒน์ ภูเขียว",    name_en: "Thanawat P.",     pos: "Store Manager",       dept: "Store Operations · CentralWorld",       status: "active",   last_login: "เมื่อวาน 19:30",   avatar: "ธภ", avatarColor: "humi-avatar--butter" },
  { id: "30050981", name_th: "อรณิชา เทียนทอง",   name_en: "Ornnicha T.",     pos: "HR Officer",          dept: "Human Resources · CEN HQ",              status: "active",   last_login: "07:55 วันนี้",     avatar: "อท", avatarColor: "humi-avatar--teal"   },
  { id: "30052213", name_th: "ณัฐพล สว่างใจ",      name_en: "Nattapol S.",     pos: "Cashier",             dept: "Store Operations · Robinson Sukhumvit", status: "on_leave", last_login: "ลาป่วย 3 วัน",     avatar: "ณส", avatarColor: "humi-avatar--ink"    },
  { id: "30052998", name_th: "พิมพ์ชนก รุ่งเรือง", name_en: "Pimchanok R.",    pos: "Beauty Advisor",      dept: "Store Operations · Central Embassy",    status: "active",   last_login: "เมื่อวาน 21:12",   avatar: "พร", avatarColor: "humi-avatar--sage"   },
  { id: "30053401", name_th: "ชัชวาล แสนเดช",     name_en: "Chatchawan S.",   pos: "Stock Associate",     dept: "Store Operations · Central Pinklao",    status: "active",   last_login: "07:30 วันนี้",     avatar: "ชส", avatarColor: "humi-avatar--butter" },
  { id: "30053882", name_th: "วราภรณ์ สุขใจ",     name_en: "Waraporn S.",     pos: "Cashier",             dept: "Store Operations · Central Bangna",     status: "active",   last_login: "เมื่อวาน 22:04",   avatar: "วส", avatarColor: "humi-avatar--teal"   },
];

const LA_RECENT_IDS = ["30048829", "30049770", "30050981"];

function LoginAs_Picker() {
  const I = window.PI;
  const recent = LA_RECENT_IDS.map(id => LA_PEOPLE.find(p => p.id === id)).filter(Boolean);

  return (
    // z-index: 20 raises this block above the sticky topbar (which is z-index:10)
    // so that absolute-positioned annotations with negative top can render OVER
    // the topbar/gear area instead of being hidden behind it.
    <div style={{ position: "relative", minHeight: 760, zIndex: 20 }}>

      {/* ── Dimmed admin-home placeholder behind popover ───────────────── */}
      <div style={{ opacity: 0.55, padding: "6px 0", display:"flex", flexDirection:"column", gap: 16, pointerEvents: "none" }}>
        <div>
          <div className="humi-eyebrow">ศูนย์รวม Admin</div>
          <h1 className="humi-hero-title" style={{ fontSize: 30 }}>
            หน้าหลัก <span className="humi-hero-title-soft">HR Admin · CEN</span>
          </h1>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 14 }}>
          {[
            { label:"คำร้องรอตรวจ",    val:"14" },
            { label:"พนักงานใหม่สัปดาห์นี้", val:"6" },
            { label:"จะหมดทดลองงาน",   val:"3" },
          ].map(t => (
            <div key={t.label} className="humi-card" style={{ padding: 16 }}>
              <div className="humi-eyebrow" style={{ marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 30, fontFamily:"var(--font-display)", fontWeight: 700, color:"var(--color-ink)" }}>{t.val}</div>
            </div>
          ))}
        </div>
        <div className="humi-card" style={{ height: 220 }}/>
        <div className="humi-card" style={{ height: 180 }}/>
      </div>

      {/* ── Dim backdrop over main area only (sidebar stays clean) ─────── */}
      <div style={{
        position:"absolute", inset: 0,
        background:"rgba(14,27,44,0.32)",
        zIndex: 5,
      }}/>

      {/* ── Annotation: glowing ring overlaid on the ⚙️ gear button in topbar ──
           Math: topbar(76) + topbar-margin(24) + ribbon(~40) + ribbon-margin(18)
                 = 158px from children-top to main-top
           Gear center vertically = 18(topbar-pad) + 20(button half) = 38 from main-top
                                 = 38 - 158 = -120 from children-top
           Ring (56x56) centered on gear → ring top = -120 - 28 = -148

           Gear right edge aligns with children right edge (both 32px from main-right).
           Gear center horizontally = 20px inward from children-right
           Ring centered → ring right edge = 8px PAST children-right → right: -8         */}
      <div style={{
        position:"absolute",
        top: -148, right: -8,
        width: 56, height: 56,
        border:"2px solid var(--color-accent)",
        borderRadius: 14,
        background:"rgba(31,168,160,0.12)",
        boxShadow:"0 0 0 6px rgba(31,168,160,0.22)",
        zIndex: 25,
        pointerEvents:"none",
      }}/>

      {/* ── Annotation: vertical dashed line from ring-bottom down to popover top
           Ring bottom at y=-92 (ring top -148 + height 56)
           Popover top at y=4 → connector length ≈ 96
           Horizontally at right:22 (aligned with popover's caret which sits at right:22 inside popover at right:4) */}
      <div style={{
        position:"absolute",
        top: -92, right: 22,
        width: 0, height: 96,
        borderLeft:"2px dashed var(--color-accent)",
        zIndex: 25,
        pointerEvents:"none",
      }}/>

      {/* ── Annotation label: pill hanging off the dashed line midway ── */}
      <div style={{
        position:"absolute",
        top: -56, right: 36,
        background:"var(--color-accent)",
        color:"#fff",
        padding:"3px 10px",
        borderRadius: 999,
        fontSize: 10.5, fontWeight: 700,
        letterSpacing:".06em", textTransform:"uppercase",
        boxShadow:"0 4px 12px rgba(31,168,160,0.35)",
        zIndex: 26,
        pointerEvents:"none",
        whiteSpace:"nowrap",
      }}>
        เปิดจาก ⚙️
      </div>

      {/* ── Popover anchored to gear icon (top-right of topbar) ────────── */}
      <div style={{
        position:"absolute",
        top: 4,
        right: 4,
        width: 440,
        background:"var(--color-surface)",
        border:"1px solid var(--color-hairline)",
        borderRadius:"var(--radius-lg)",
        boxShadow:"0 24px 60px rgba(14,27,44,0.22), 0 2px 0 rgba(14,27,44,0.04)",
        zIndex: 20,
        overflow:"hidden",
      }}>
        {/* Caret pointing up to gear */}
        <div style={{
          position:"absolute",
          top: -7,
          right: 22,
          width: 12, height: 12,
          background:"var(--color-surface)",
          borderTop:"1px solid var(--color-hairline)",
          borderLeft:"1px solid var(--color-hairline)",
          transform:"rotate(45deg)",
        }}/>

        {/* Header */}
        <div style={{
          padding:"14px 16px",
          borderBottom:"1px solid var(--color-hairline-soft)",
          display:"flex", alignItems:"center", gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background:"var(--color-accent-soft)", color:"var(--color-accent)",
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            flexShrink: 0,
          }}><I.shield size={15}/></div>
          <div style={{ minWidth: 0 }}>
            <div className="humi-eyebrow" style={{ fontSize: 10, marginBottom: 1 }}>Admin tools</div>
            <div style={{ fontSize: 15, fontWeight: 700, color:"var(--color-ink)" }}>เข้าใช้งานในนามพนักงาน</div>
          </div>
          <div className="humi-spacer"/>
          <button className="humi-icon-btn" style={{ width: 30, height: 30 }} aria-label="ปิด"><I.x size={13}/></button>
        </div>

        {/* Acting-as identity strip — shows who's doing the impersonating */}
        <div style={{
          padding:"8px 14px",
          background:"var(--color-canvas-soft)",
          borderBottom:"1px solid var(--color-hairline-soft)",
          display:"flex", alignItems:"center", gap: 10,
        }}>
          <div className="humi-avatar" style={{
            width: 26, height: 26, fontSize: 11,
            background:"linear-gradient(135deg, #E08864, #E8C46B)",
            color:"#fff",
          }}>จร</div>
          <div style={{ fontSize: 12, color:"var(--color-ink-muted)", lineHeight: 1.35 }}>
            ทำในฐานะ <strong style={{ color:"var(--color-ink)" }}>คุณจงรักษ์ พ.</strong>
            <span style={{ margin:"0 6px", color:"var(--color-ink-faint)" }}>·</span>
            <span style={{
              padding:"1px 7px", borderRadius: 999,
              background:"rgba(224,136,100,0.18)",
              color:"#9A3412", fontWeight: 700,
              fontSize: 10, letterSpacing:".06em", textTransform:"uppercase",
            }}>HR Admin</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: "10px 12px", borderBottom:"1px solid var(--color-hairline-soft)" }}>
          <div style={{
            display:"flex", alignItems:"center", gap: 8,
            padding:"9px 12px",
            background:"var(--color-canvas-soft)",
            border:"1px solid var(--color-hairline-soft)",
            borderRadius:"var(--radius-md)",
          }}>
            <I.search size={14} style={{ color:"var(--color-ink-muted)" }}/>
            <input
              placeholder="ค้นด้วยชื่อ, รหัส หรืออีเมล"
              defaultValue=""
              style={{ flex: 1, border: 0, outline:"none", background:"transparent", fontFamily:"inherit", fontSize: 13.5, color:"var(--color-ink)" }}
            />
            <kbd style={{
              fontFamily:"var(--font-sans)", fontSize: 11,
              padding:"1px 6px",
              background:"var(--color-surface)",
              border:"1px solid var(--color-hairline)",
              borderRadius: 5,
              color:"var(--color-ink-muted)",
            }}>⌘K</kbd>
          </div>
        </div>

        {/* Recent strip */}
        {recent.length > 0 && (
          <div style={{ padding:"10px 14px 8px", borderBottom:"1px solid var(--color-hairline-soft)" }}>
            <div className="humi-eyebrow" style={{ fontSize: 10, marginBottom: 8 }}>ใช้งานล่าสุด</div>
            <div style={{ display:"flex", gap: 6, flexWrap:"wrap" }}>
              {recent.map(p => (
                <button key={p.id} style={{
                  display:"inline-flex", alignItems:"center", gap: 6,
                  padding:"3px 10px 3px 3px",
                  background:"var(--color-canvas-soft)",
                  border:"1px solid var(--color-hairline-soft)",
                  borderRadius: 999,
                  cursor:"pointer", fontFamily:"inherit",
                  fontSize: 12, color:"var(--color-ink-soft)",
                }}>
                  <span className={"humi-avatar " + p.avatarColor} style={{ width: 20, height: 20, fontSize: 10 }}>{p.avatar}</span>
                  {p.name_th.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result list */}
        <div style={{ maxHeight: 360, overflowY:"auto" }}>
          {LA_PEOPLE.map((p, i) => {
            const inactive = p.status !== "active";
            return (
              <div key={p.id} style={{
                display:"grid",
                gridTemplateColumns:"32px 1fr 78px",
                gap: 10, padding:"10px 14px",
                borderBottom: i === LA_PEOPLE.length - 1 ? 0 : "1px solid var(--color-hairline-soft)",
                alignItems:"center",
                cursor: inactive ? "not-allowed" : "pointer",
                background: i === 0 ? "var(--color-accent-soft)" : "transparent",
                opacity: inactive ? 0.55 : 1,
              }}>
                <div className={"humi-avatar " + p.avatarColor} style={{ width: 30, height: 30, fontSize: 12 }}>{p.avatar}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color:"var(--color-ink)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {p.name_th}
                    {inactive && <span className="humi-tag humi-tag--coral" style={{ marginLeft: 6, fontSize: 9.5, padding:"1px 7px" }}>On leave</span>}
                  </div>
                  <div style={{ fontSize: 11, color:"var(--color-ink-muted)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {p.pos} · {p.id} · เข้าระบบ {p.last_login}
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                  <button className="humi-button" style={{
                    padding:"4px 10px", minHeight: 28, fontSize: 11.5,
                    background: i === 0 ? "var(--color-accent)" : "var(--color-surface)",
                    color: i === 0 ? "#fff" : "var(--color-accent)",
                    border: i === 0 ? "1px solid var(--color-accent)" : "1px solid var(--color-accent)55",
                  }} disabled={inactive}>
                    Login as
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding:"8px 14px",
          borderTop:"1px solid var(--color-hairline-soft)",
          background:"var(--color-canvas-soft)",
          fontSize: 11, color:"var(--color-ink-muted)",
          display:"flex", alignItems:"center", gap: 6,
        }}>
          <I.lock size={11}/>
          การเข้าใช้งานในนามคนอื่นถูกบันทึกตามนโยบาย PDPA
        </div>
      </div>
    </div>
  );
}

window.LoginAs_Picker = LoginAs_Picker;
