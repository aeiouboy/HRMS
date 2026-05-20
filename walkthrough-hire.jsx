// walkthrough-hire.jsx
// Hire module Design Walkthrough (HR Admin persona · 3-step wizard).
//
// RETROFIT PATTERN (static page + rotating spotlight):
//   hirePageMockup() renders the entire wizard page in one shot —
//   checkpoint sidebar on the left + all 3 cluster sections (Who /
//   Job / Review) stacked vertically on the right. The same mockup
//   is reused across all 4 frames so audiences see spatial
//   relationships (sidebar ↔ clusters, cluster ↔ cluster) without
//   losing context between slides.
//
// Frames (the wizard arc):
//   01 แผนที่      — Checkpoint sidebar (3-cluster map + validity ticks)
//   02 ใครคือใคร   — Cluster 1 · Who (identity + ID + conditional fields)
//   03 ทำอะไรที่ไหน — Cluster 2 · Job (class + position + compensation)
//   04 ตรวจส่ง      — Cluster 3 · Review (EN name + HRBP + summary)

const { WALK, WalkFrame, WalkTag, walkStyles } = window;

// ── Helpers ───────────────────────────────────────────────────────────
function Field({ label, value, placeholder, required, optional, hint, warning, readOnly }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: 11.5, fontWeight: 600,
        color: WALK.inkSoft, marginBottom: 5,
      }}>
        {label}
        {required && <span style={{ color: WALK.accent, marginLeft: 3 }}>*</span>}
        {optional && <span style={{ color: WALK.inkFaint, fontSize: 10, marginLeft: 6, fontWeight: 400 }}>optional</span>}
      </label>
      <div style={{
        padding: '7px 10px', fontSize: 12.5,
        background: readOnly ? WALK.creamSoft : WALK.surface,
        color: value ? WALK.ink : WALK.inkFaint,
        border: `1px solid ${WALK.hairline}`,
        borderRadius: 6, minHeight: 18,
      }}>{value || placeholder || '—'}</div>
      {warning && <div style={{ marginTop: 3, fontSize: 10.5, color: WALK.warning }}>{warning}</div>}
      {hint && !warning && <div style={{ marginTop: 3, fontSize: 10.5, color: WALK.inkFaint }}>{hint}</div>}
    </div>
  );
}

function SectionCard({ icon, eyebrow, title, sub, status, children }) {
  return (
    <div style={{ ...walkStyles.card(false), padding: '16px 20px', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: WALK.accentSoft, color: WALK.accent,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, flexShrink: 0,
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={walkStyles.eyebrow}>{eyebrow}</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 16 }}>{title}</h3>
          {sub && <p style={{ margin: '3px 0 0', fontSize: 12, color: WALK.inkMuted }}>{sub}</p>}
        </div>
        {status === 'ok' && <span style={{ color: WALK.success, fontSize: 18, fontWeight: 700 }}>✓</span>}
        {status === 'warn' && <span style={{ color: WALK.warning, fontSize: 18, fontWeight: 700 }}>⚠</span>}
      </div>
      {children}
    </div>
  );
}

// ── Checkpoint sidebar (mirrors prod-hire.jsx CheckpointSidebar) ──────
function CheckpointSidebar() {
  const SidebarGroup = ({ n, label, active, sections }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 4px' }}>
        <span style={{
          width: 18, height: 18, borderRadius: '50%',
          fontSize: 10, fontWeight: 700,
          background: active ? WALK.accent : WALK.accentSoft,
          color: active ? '#fff' : WALK.accent,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>{n}</span>
        <span style={{
          fontSize: 11.5, fontWeight: 700,
          color: active ? WALK.accent : WALK.inkSoft,
        }}>{label}</span>
      </div>
      <div style={{
        marginLeft: 11, paddingLeft: 10,
        borderLeft: `1px solid ${WALK.hairline}`,
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        {sections.map(s => (
          <div key={s.l} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 8px', borderRadius: 7,
            color: WALK.inkSoft, fontSize: 11.5,
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: 2,
              border: `1.5px solid ${s.ok ? WALK.success : WALK.inkFaint}`,
              background: s.ok ? WALK.success : 'transparent',
              flexShrink: 0,
            }}/>
            <span style={{ flex: 1 }}>{s.l}</span>
            {s.ok && <span style={{ color: WALK.success, fontSize: 11, fontWeight: 700 }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      background: WALK.creamSoft,
      border: `1px solid ${WALK.hairline}`,
      borderRadius: 14,
      padding: '16px 14px',
      position: 'sticky', top: 0,
    }}>
      <div style={{
        fontSize: 9.5, fontWeight: 700, letterSpacing: '.18em',
        textTransform: 'uppercase', color: WALK.inkMuted,
        padding: '0 4px', marginBottom: 10,
      }}>หัวข้อย่อย</div>
      <SidebarGroup n={1} label="ข้อมูลบุคคล" active sections={[
        { l: 'ระบุตัวตน',         ok: true  },
        { l: 'ข้อมูลส่วนตัว',     ok: true  },
        { l: 'ข้อมูลติดต่อ',      ok: false },
        { l: 'ผู้ติดต่อฉุกเฉิน',   ok: false },
        { l: 'ข้อมูลทั่วไป',      ok: false },
      ]}/>
      <SidebarGroup n={2} label="ข้อมูลงาน" sections={[
        { l: 'ประเภทการจ้างงาน', ok: true  },
        { l: 'ตำแหน่งและสังกัด', ok: false },
        { l: 'ค่าตอบแทน',        ok: false },
      ]}/>
      <SidebarGroup n={3} label="ตรวจสอบและส่ง" sections={[
        { l: 'ชื่อ-นามสกุล (EN)', ok: true  },
        { l: 'Manager + HRBP',    ok: true  },
        { l: 'สรุปข้อมูล',         ok: false },
      ]}/>

      {/* Bottom progress strip */}
      <div style={{
        marginTop: 18, padding: '10px 12px',
        background: WALK.surface, borderRadius: 10,
        border: `1px solid ${WALK.hairline}`,
      }}>
        <div style={{ ...walkStyles.eyebrow, color: WALK.inkSoft, marginBottom: 6 }}>ความครบถ้วนรวม</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 6, background: WALK.cream, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: WALK.accent }}/>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: WALK.ink }}>5 / 10</span>
        </div>
      </div>
    </div>
  );
}

// ── Cluster 1 · Who (Identity + DOB + ID card + conditional) ──────────
function ClusterWho() {
  return (
    <SectionCard icon="🔐" eyebrow="Cluster 1 · ข้อมูลบุคคล"
                 title="ระบุตัวตน + บัตรประชาชน"
                 sub="DVT prev ID · ชื่อ EN+ไทย · วันเกิด · National ID"
                 status="ok">
      <div style={{ marginBottom: 12 }}>
        <Field label="รหัสพนักงานเดิม (DVT)" optional
               placeholder="กรอกหากเคยทำงานในเครือ (rehire / ฝึกงาน)"
               hint="ระบบจะดึงประวัติเดิมมาให้"/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <Field label="วันที่เริ่มงาน" required value="15 มิ.ย. 2569"
               warning="ล่วงหน้า — ต้อง SPD อนุมัติ"/>
        <Field label="บริษัท" required value="CEN — Central Retail"/>
        <Field label="เหตุผลการจ้าง" required value="NEW_HIRE"/>
        <Field label="คำนำหน้า (EN)" required value="Ms."/>
        <Field label="ชื่อ (EN)" required value="Suphansa"/>
        <Field label="นามสกุล (EN)" required value="Wattanakul"/>
        <Field label="วันเกิด" required value="14 มี.ค. 2538" hint="อายุ: 31 ปี"/>
        <Field label="คำนำหน้า (ไทย)" required value="นางสาว"/>
        <Field label="ชื่อ (ไทย)" required value="สุพรรษา"/>
      </div>

      <div style={{
        marginTop: 14, padding: '12px 14px',
        background: WALK.cream, borderRadius: 8,
        border: `1px solid ${WALK.hairlineSoft}`,
      }}>
        <div style={{ ...walkStyles.eyebrow, color: WALK.inkSoft, marginBottom: 8 }}>บัตรประชาชน · National ID</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 10 }}>
          <Field label="ประเภทบัตร" required value="NATIONAL_ID"/>
          <Field label="ประเทศที่ออกบัตร" required value="TH — ไทย"/>
          <Field label="เลขบัตรประชาชน" required placeholder="X-XXXX-XXXXX-XX-X"
                 hint="ตรวจ mod-11 อัตโนมัติ"/>
        </div>
      </div>

      <div style={{
        marginTop: 12, padding: '12px 14px',
        background: WALK.creamSoft,
        border: `1.5px dashed ${WALK.hairline}`,
        borderRadius: 8,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: WALK.surface, color: WALK.inkMuted,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0,
        }}>👥</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={walkStyles.eyebrow}>ข้อมูลตามกรณี</div>
          <div style={{ fontSize: 12, color: WALK.inkSoft, marginTop: 2 }}>
            Work Permit (ต่างชาติ) · Dependents (มีบุตร/คู่สมรส) — ซ่อนเป็น default
          </div>
        </div>
        <button style={{ ...walkStyles.btnGhost, padding: '5px 10px', fontSize: 11.5 }}>+ เพิ่ม</button>
      </div>
    </SectionCard>
  );
}

// ── Cluster 2 · Job (Class + Assignment + Compensation) ───────────────
function ClusterJob() {
  return (
    <SectionCard icon="💼" eyebrow="Cluster 2 · ข้อมูลงาน"
                 title="Class → Position → Compensation"
                 sub="Employee Class กำหนด unlock fields · ตำแหน่งจะ link Manager อัตโนมัติ"
                 status="warn">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 12, marginBottom: 12 }}>
        <Field label="รหัสพนักงาน" value="สร้างหลัง Submit" readOnly/>
        <Field label="Employee Class" required value="D — Officer"
               hint="A=Exec · B=Sr Mgmt · C=Mgmt · D=Officer · E=Ops · F=Part · G=Contract · H=Intern"/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="ตำแหน่งงาน" required placeholder="ค้นหาตำแหน่ง…"
               hint="search-as-you-type จาก master list"/>
        <Field label="หน่วยธุรกิจ" required value="CEN — Central Retail"/>
        <Field label="สาขา/หน่วยงาน" required value="ทองหล่อ"/>
        <Field label="เขต HR" value="กรุงเทพฯ ตอนกลาง" readOnly
               hint="auto-derive จากสาขา"/>
      </div>

      <div style={{
        marginTop: 12, padding: '10px 12px',
        background: WALK.creamSoft, borderRadius: 8,
        fontSize: 11.5, color: WALK.inkSoft,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: WALK.accent }}>ℹ</span>
        ตำแหน่งที่เลือกจะ link ไป Direct Manager ใน Cluster 3 อัตโนมัติ
      </div>

      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <Field label="Pay Grade" required value="P3 — Officer Grade"/>
        <Field label="เงินเดือนพื้นฐาน (THB)" required placeholder="35,000"
               hint="เดือนละ · ก่อนหักภาษี"/>
        <Field label="งวดการจ่าย" value="รายเดือน · สิ้นเดือน" readOnly/>
      </div>

      <div style={{
        marginTop: 12, padding: '10px 12px',
        background: WALK.warningSoft,
        border: `1px solid ${WALK.warning}33`,
        borderRadius: 8,
        fontSize: 11.5, color: WALK.inkSoft,
        display: 'flex', alignItems: 'flex-start', gap: 8,
      }}>
        <span style={{ color: WALK.warning, fontWeight: 700 }}>⚠</span>
        <span>
          <b>Pay-grade band:</b> 28,000–42,000 — เงินเดือนต้องอยู่ในช่วงนี้
          หากเกินต้องให้ HRBP ระดับ Director อนุมัติ (BRD #142)
        </span>
      </div>
    </SectionCard>
  );
}

// ── Cluster 3 · Review (EN name + HRBP + Summary) ─────────────────────
function ClusterReview() {
  const SummaryRow = ({ label, value, ok }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 0',
      borderTop: `1px solid ${WALK.hairlineSoft}`,
    }}>
      <span style={{
        width: 18, color: ok ? WALK.accent : WALK.warning,
        fontSize: 13, fontWeight: 700,
      }}>{ok ? '✓' : '⚠'}</span>
      <span style={{ fontSize: 12, color: WALK.inkSoft, width: 170 }}>{label}</span>
      <span style={{
        flex: 1, fontSize: 12.5,
        color: ok ? WALK.ink : WALK.inkMuted,
        fontWeight: ok ? 500 : 400,
      }}>{value}</span>
    </div>
  );

  return (
    <SectionCard icon="📋" eyebrow="Cluster 3 · ตรวจสอบและส่ง"
                 title="EN name + Manager/HRBP + Summary"
                 sub="3 checkpoint บังคับก่อน Submit">
      <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
        <Field label="คำนำหน้า (EN)" value="Ms." readOnly/>
        <Field label="ชื่อ (EN)" value="Suphansa" readOnly/>
        <Field label="นามสกุล (EN)" value="Wattanakul" readOnly/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Field label="Direct Manager (Approver)" required readOnly
               value="คุณวีระ ส. — Store Manager (ทองหล่อ)"
               hint="auto จากตำแหน่งใน Cluster 2"/>
        <Field label="HRBP ผู้รับผิดชอบ" required value="คุณนภสร ว. (HRBP — CEN)"/>
      </div>
      <div style={{
        marginTop: 10,
        padding: '8px 12px',
        background: WALK.creamSoft,
        borderRadius: 8,
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12, color: WALK.inkSoft,
      }}>
        <input type="checkbox" checked readOnly
               style={{ accentColor: WALK.accent, width: 14, height: 14 }}/>
        แจ้งเตือน HRBP ทางอีเมลเมื่อ Hire บันทึกสำเร็จ
        <span style={{ flex: 1 }}/>
        <span style={{ fontSize: 10.5, color: WALK.inkFaint }}>Chain 2 · BRD #109</span>
      </div>

      <div style={{
        marginTop: 14, padding: '12px 14px',
        background: WALK.creamSoft, borderRadius: 8,
      }}>
        <div style={{
          marginBottom: 8,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={walkStyles.eyebrow}>สรุปข้อมูลก่อนส่ง</span>
          <div style={{ flex: 1, height: 6, background: WALK.cream, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: '71%', height: '100%', background: WALK.accent }}/>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, color: WALK.ink,
            fontVariantNumeric: 'tabular-nums',
          }}>71% (17/24)</span>
        </div>
        <SummaryRow label="วันที่เริ่มงาน"   value="15 มิ.ย. 2569" ok/>
        <SummaryRow label="ชื่อ-นามสกุล (EN)" value="Ms. Suphansa Wattanakul" ok/>
        <SummaryRow label="เลขบัตรประชาชน"   value="—" ok={false}/>
        <SummaryRow label="Employee Class"    value="D — Officer" ok/>
        <SummaryRow label="ตำแหน่ง"          value="—" ok={false}/>
        <SummaryRow label="Direct Manager"   value="คุณวีระ ส." ok/>
      </div>
    </SectionCard>
  );
}

// ── Shared wizard page mockup ─────────────────────────────────────────
// Renders the entire ProdHire wizard in one frame: checkpoint sidebar
// pinned at the left + 3 cluster sections stacked vertically. This is
// the static background of every Hire frame; spotlight moves between
// sidebar / Cluster 1 / Cluster 2 / Cluster 3.
function hirePageMockup() {
  return (
    <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '260px 1fr', alignItems: 'start' }}>
      <CheckpointSidebar/>
      <div>
        {/* Page header */}
        <div style={{ ...walkStyles.card(false), padding: '16px 20px', marginBottom: 12 }}>
          <div style={walkStyles.eyebrow}>ขั้นตอนการจ้างงาน</div>
          <h1 style={{
            margin: '4px 0 0',
            fontFamily: WALK.fontDisplay,
            fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em',
          }}>เพิ่มพนักงานใหม่</h1>
          <div style={{
            marginTop: 4, fontSize: 12.5, color: WALK.inkMuted,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span>3 cluster · กรอกได้ไม่ต้องเรียงลำดับ</span>
            <span style={{ flex: 1 }}/>
            <WalkTag bg={WALK.creamSoft} color={WALK.inkSoft}>💾 บันทึกร่างอัตโนมัติ · 14:32</WalkTag>
          </div>
        </div>

        <ClusterWho/>
        <ClusterJob/>
        <ClusterReview/>

        {/* Wizard footer */}
        <div style={{
          marginTop: 8, padding: '12px 14px',
          background: WALK.creamSoft,
          border: `1px solid ${WALK.hairline}`,
          borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ flex: 1, fontSize: 12, color: WALK.inkMuted }}>
            ยังเหลือ <b style={{ color: WALK.warning }}>3 หัวข้อ</b> ที่ต้องกรอก
          </span>
          <button style={{ ...walkStyles.btnGhost, padding: '5px 10px', fontSize: 11.5 }}>← ย้อนกลับ</button>
          <button style={walkStyles.btnPrimary}>✓ บันทึกและส่ง</button>
        </div>
      </div>
    </div>
  );
}

// ── Spotlight regions (frame-space) ───────────────────────────────────
// Mockup column = (MOCKUP_X=40, BODY_TOP=120). Grid: sidebar 260px + 1fr.
// Sidebar pinned at left; clusters stacked top-down inside right column.
const X_RAIL_L = WALK.MOCKUP_X - 4;
const X_RAIL_R = WALK.MOCKUP_X + 268;
const X_CONTENT_L = WALK.MOCKUP_X + 270;
const X_CONTENT_R = WALK.MOCKUP_X + WALK.MOCKUP_W + 4;

const REGIONS = {
  sidebar:    { x: X_RAIL_L,    y: WALK.BODY_TOP - 4,   w: 272, h: 720 },
  cluster1:   { x: X_CONTENT_L, y: WALK.BODY_TOP + 90,  w: X_CONTENT_R - X_CONTENT_L, h: 480 },
  cluster2:   { x: X_CONTENT_L, y: WALK.BODY_TOP + 588, w: X_CONTENT_R - X_CONTENT_L, h: 430 },
  cluster3:   { x: X_CONTENT_L, y: WALK.BODY_TOP + 1034, w: X_CONTENT_R - X_CONTENT_L, h: 440 },
};

const HIRE_FRAME_H = 1620;
const COMMON = {
  totalSteps: 4,
  persona: 'HR Admin · นภสร (HRBP — CEN)',
  frameHeight: HIRE_FRAME_H,
};

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · แผนที่ — Checkpoint sidebar
// ═══════════════════════════════════════════════════════════════════
function HireWalk1() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={1}
      title="แผนที่ · 3-cluster ที่ admin เห็นทั้งหมดก่อนเริ่ม"
      narrative="Hire เป็น form ยาวที่สุดใน Humi (40+ ฟิลด์) — sidebar checkpoint โชว์ทั้ง 3 cluster + ทุก section ตั้งแต่วินาทีแรก กดข้ามได้ ไม่บังคับลำดับ ✓ บอก validity แบบ live"
      mockup={hirePageMockup()}
      dim
      callouts={[
        { num: 1, ...REGIONS.sidebar, color: WALK.accent },
      ]}
      annotations={[
        { num: 1, title: 'Checkpoint rail · 3-cluster overview แทน stepper',
          body: 'ทำไมไม่ใช่ stepper แบบ "ขั้น 1 → 2 → 3"? เพราะ stepper ซ่อนขั้นถัดไป — admin กรอกซ้ำได้ลำบาก, ไม่รู้ scope. Rail นี้แสดงทุกหัวข้อย่อย + ✓ live; admin เลือกกรอกแบบไม่ต้องเรียง คลิกข้ามได้, รู้ทันทีว่าเหลืออะไร. มี "ความครบถ้วนรวม 5/10" ด้านล่างให้ตัวเลขรวม',
          color: WALK.accent },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · ใครคือใคร — Cluster 1
// ═══════════════════════════════════════════════════════════════════
function HireWalk2() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={2}
      title="ใครคือใคร · Identity ก่อน Bio ก่อน Contact"
      narrative="Cluster 1 ลำดับฟิลด์แบบ 'จากบัตรประชาชนเข้ามือ admin ก่อน' — DVT (rehire) ก่อนชื่อ, EN+ไทย คู่กัน, conditional sections (Work Permit/Dependents) ซ่อนจนกว่าเข้าเงื่อนไข"
      mockup={hirePageMockup()}
      dim
      callouts={[
        { num: 1, ...REGIONS.cluster1, color: WALK.indigo },
      ]}
      annotations={[
        { num: 1, title: 'DVT-first · EN+ไทย คู่ · National ID cream block · Conditional dashed',
          body: 'ฟิลด์แรกของฟอร์มคือ DVT (รหัสพนักงานเดิม) เพราะ Central Retail มี rehire/intern กลับมา 30%; ถ้ามีจะดึงประวัติ ลดการกรอกซ้ำ 80%. EN+ไทย name อยู่ใน grid เดียวเพราะ payroll/bank ใช้ EN แต่ HR สื่อสารใช้ไทย. National ID อยู่ใน cream sub-block แยกพื้นหลัง — scan แยกออกจาก demographics; mod-11 validate. Work Permit + Dependents ซ่อน default — เปิดเฉพาะ FK condition ถูก (ลด form length)',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ทำอะไรที่ไหน — Cluster 2
// ═══════════════════════════════════════════════════════════════════
function HireWalk3() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={3}
      title="ทำอะไรที่ไหน · Class → Position → Pay"
      narrative="Cluster 2 เลือกประเภทจ้างก่อน (A-H ladder) เพื่อ unlock fields ที่เหลือ — ตำแหน่งงาน link Manager อัตโนมัติใน Cluster 3, เงินเดือนมี pay-grade band เตือนเกินช่วงแบบ warm warning"
      mockup={hirePageMockup()}
      dim
      callouts={[
        { num: 1, ...REGIONS.cluster2, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Class ladder · auto-derive · cross-cluster link · pay-grade band',
          body: 'ทำไมไม่ให้กรอกตำแหน่งอิสระ? เพราะ free text ทำให้ ORG master inconsistent. ใช้ search-as-you-type จาก master list + เขต HR auto-derive จากสาขา. Info banner ย้ำ "ตำแหน่งจะ link Manager ใน Cluster 3" — admin รู้ว่าฟิลด์นี้ส่งผลข้าม cluster. Salary มี band 28-42k แสดง escalation path (Director approve) เมื่อเกิน; warm warning butter แทน red ลด aggressive tone',
          color: WALK.coral },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ตรวจส่ง — Cluster 3
// ═══════════════════════════════════════════════════════════════════
function HireWalk4() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={4}
      title="ตรวจส่ง · 3 checkpoint ก่อน Submit"
      narrative="Cluster 3 ไม่ใช่ปุ่ม Submit ธรรมดา — ยืนยัน EN name (สะกดถูกก่อนเข้า payroll), เลือก HRBP เพื่อ chain แจ้งเตือน, snapshot ทุกฟิลด์พร้อม ✓/⚠ ตรวจรอบสุดท้ายในมุมเดียว"
      mockup={hirePageMockup()}
      dim
      callouts={[
        { num: 1, ...REGIONS.cluster3, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'EN read-only mirror · approver/notifier split · BRD tag · snapshot ✓/⚠',
          body: 'ชื่อ EN เป็น read-only mirror จาก Cluster 1 — ห้ามแก้ที่นี่บังคับให้กลับไปแก้ source เพื่อ traceability. Direct Manager auto จากตำแหน่ง (read-only); HRBP เลือกได้ — แยกบทบาท approver กับ notifier ชัด ลดความเสี่ยง chain ผิดคน. Checkbox notify tag "BRD #109" inline ให้ auditor traceable ว่าฟิลด์ map BRD ข้อใด. Summary snapshot แสดงทุก 24 ฟิลด์พร้อม ✓ accent หรือ ⚠ warning + progress 71% — ตรวจรอบสุดท้ายในมุมเดียวแทน scroll กลับทั้งฟอร์ม',
          color: WALK.butter },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { HireWalk1, HireWalk2, HireWalk3, HireWalk4 });
