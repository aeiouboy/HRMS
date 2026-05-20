// walkthrough-hire.jsx
// Hire module Design Walkthrough (HR Admin persona).
// 4 frames following the wizard arc:
//   01 แผนที่      — Checkpoint sidebar · 3-step nav + validity ticks + progress
//   02 ใครคือใคร   — ClusterWho · Identity + DOB + ID card (+ conditional sections)
//   03 ทำอะไรที่ไหน — ClusterJob · Employee class + assignment + compensation
//   04 ตรวจส่ง      — ClusterReview · EN-name confirm + HRBP/Manager + summary
//
// Hire is admin-only (HRBP / People Ops), so persona is constant across
// all 4 frames — unlike Home where Manager journeys vary by section.
// Each mockup is an inline-style replica of the corresponding cluster in
// prod-hire.jsx + prod-hire-clusters.jsx (kept inline so this overview
// is robust against changes in the live wizard).

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · แผนที่ — Checkpoint sidebar + progress
// ═══════════════════════════════════════════════════════════════════
function HireWalk1() {
  // Sidebar group: number bullet + group title + indented section list
  // Mirrors CheckpointSidebar in prod-hire.jsx (lines 104-177).
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
              border: `1.5px solid ${WALK.inkFaint}`, flexShrink: 0,
            }}/>
            <span style={{ flex: 1 }}>{s.l}</span>
            {s.ok && <span style={{ color: WALK.success, fontSize: 11, fontWeight: 700 }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );

  const mockup = (
    <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '260px 1fr' }}>
      {/* ── Sidebar rail ── */}
      <div style={{
        background: WALK.creamSoft,
        border: `1px solid ${WALK.hairline}`,
        borderRadius: 14,
        padding: '16px 14px',
        minHeight: 560,
      }}>
        <div style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '.18em',
          textTransform: 'uppercase', color: WALK.inkMuted,
          padding: '0 4px', marginBottom: 10,
        }}>หัวข้อย่อย</div>
        <SidebarGroup n={1} label="ข้อมูลบุคคล" active sections={[
          { l: 'ระบุตัวตน',         ok: true  },
          { l: 'ข้อมูลส่วนตัว',     ok: false },
          { l: 'ข้อมูลติดต่อ',      ok: false },
          { l: 'ผู้ติดต่อฉุกเฉิน',   ok: false },
          { l: 'ข้อมูลทั่วไป',      ok: false },
        ]}/>
        <SidebarGroup n={2} label="ข้อมูลงาน" sections={[
          { l: 'ประเภทการจ้างงาน', ok: false },
          { l: 'ตำแหน่งและสังกัด', ok: false },
          { l: 'ค่าตอบแทน',        ok: false },
        ]}/>
        <SidebarGroup n={3} label="ตรวจสอบและส่ง" sections={[
          { l: 'ชื่อ-นามสกุล (EN)', ok: false },
          { l: 'Manager + HRBP',    ok: false },
          { l: 'สรุปข้อมูล',         ok: false },
        ]}/>
      </div>

      {/* ── Content column: header + progress strip + step preview ── */}
      <div>
        <div style={{ ...walkStyles.card(false), padding: '18px 22px', marginBottom: 14 }}>
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
            <span>ขั้นตอนที่ 1 จาก 3 · ข้อมูลบุคคล</span>
            <span style={{ flex: 1 }}/>
            <WalkTag bg={WALK.creamSoft} color={WALK.inkSoft}>💾 บันทึกร่างอัตโนมัติ · 14:32</WalkTag>
          </div>
        </div>

        {/* Cluster progress strip */}
        <div style={{
          background: WALK.surface,
          border: `1px solid ${WALK.hairline}`,
          borderRadius: 10, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 14,
        }}>
          <span style={{ ...walkStyles.eyebrow, color: WALK.inkSoft }}>ความครบถ้วน · Cluster 1</span>
          <div style={{ flex: 1, height: 8, background: WALK.cream, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: '20%', height: '100%', background: WALK.accent }}/>
          </div>
          <span style={{
            fontSize: 13, fontWeight: 700, color: WALK.ink,
            fontVariantNumeric: 'tabular-nums',
          }}>1 / 5 หัวข้อ</span>
        </div>

        {/* Mini-preview of section cards */}
        <div style={{
          background: WALK.surface,
          border: `1px solid ${WALK.hairline}`,
          borderRadius: 14, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: WALK.accentSoft, color: WALK.accent,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0,
          }}>👤</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={walkStyles.eyebrow}>ระบุตัวตน</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: WALK.ink, marginTop: 2 }}>ข้อมูลระบุตัวตน</div>
          </div>
          <span style={{ color: WALK.success, fontSize: 16, fontWeight: 700 }}>✓</span>
        </div>
        {['ข้อมูลส่วนตัว', 'ข้อมูลติดต่อ', 'ผู้ติดต่อฉุกเฉิน'].map(t => (
          <div key={t} style={{
            background: WALK.surface,
            border: `1px solid ${WALK.hairlineSoft}`,
            borderRadius: 14, padding: '11px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 8, opacity: 0.85,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: WALK.cream, color: WALK.inkMuted,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, flexShrink: 0,
            }}>📋</div>
            <div style={{ flex: 1, fontSize: 13, color: WALK.inkSoft }}>{t}</div>
            <span style={{ fontSize: 11, color: WALK.inkFaint }}>ขยาย ▾</span>
          </div>
        ))}

        {/* Footer */}
        <div style={{
          marginTop: 14, padding: '12px 14px',
          background: WALK.creamSoft,
          border: `1px solid ${WALK.hairline}`,
          borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ flex: 1, fontSize: 12, color: WALK.inkMuted }}>
            กรอกข้อมูลที่จำเป็นให้ครบก่อนดำเนินการต่อ
          </span>
          <button style={walkStyles.btnPrimary}>ถัดไป →</button>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="HR Admin · นภสร (HRBP — CEN)"
      title="แผนที่ · 3-cluster ที่ admin มองเห็นทั้งหมดก่อนเริ่ม"
      narrative="Hire เป็น form ยาวที่สุดใน Humi (กว่า 40 ฟิลด์) — sidebar checkpoint ให้ admin เห็น 'แผนที่' ทั้ง 3 cluster ตั้งแต่วินาทีแรก คลิกข้ามได้ ไม่บังคับลำดับ และ ✓ บอก validity แบบ live"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 8,   w: 260, h: 380 },
        { num: 2, x: WALK.MOCKUP_X + 22,  y: WALK.BODY_TOP + 78,  w: 220, h: 28 },
        { num: 3, x: WALK.MOCKUP_X + 282, y: WALK.BODY_TOP + 110, w: 580, h: 50, radius: 8 },
        { num: 4, x: WALK.MOCKUP_X + 282, y: WALK.BODY_TOP + 176, w: 580, h: 68 },
      ]}
      annotations={[
        { num: 1, title: 'Checkpoint rail · 3-cluster overview',
          body: 'Sidebar แสดงทั้ง 3 cluster (บุคคล · งาน · ตรวจส่ง) ตั้งแต่วินาทีแรก แทน wizard แบบ stepper ที่ซ่อนขั้นถัดไป — admin มอง scope งานออกก่อนเริ่มกรอก ลด anxiety ของ form ยาว' },
        { num: 2, title: 'Validity ✓ บอก section ที่ครบ',
          body: 'แต่ละหัวข้อย่อยมี checkbox + ✓ เขียวเมื่อข้อมูลครบ — admin เลือกกรอกแบบไม่ต้องเรียงลำดับและรู้ทันทีว่าเหลืออะไร โดยไม่ต้อง scroll ทั้งหน้า' },
        { num: 3, title: 'Cluster progress strip · 1/5',
          body: 'แถบ progress ด้านบน content เน้นความครบถ้วนของ cluster ปัจจุบันเป็นตัวเลข (1/5 หัวข้อ) — ต่างจาก stepper ทั่วไปที่บอกแค่ขั้นที่กำลังทำ ทำให้ admin คาดเดาเวลาที่เหลือได้' },
        { num: 4, title: 'Collapsible section preview',
          body: 'แต่ละ section เป็น card ขยาย/ย่อได้ พร้อม eyebrow + icon + ✓ — section ที่ครบจะ collapse ให้เอง โฟกัส admin ไปที่ส่วนที่ยังขาด ลด visual noise' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · ใครคือใคร — ClusterWho · Identity + ID card
// ═══════════════════════════════════════════════════════════════════
function HireWalk2() {
  // Field primitive inline replica (mirrors F/S/ReadOnly in prod-hire.jsx)
  const Field = ({ label, value, placeholder, required, optional, hint, warning, readOnly }) => (
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

  const mockup = (
    <div>
      {/* ── Identity section card ── */}
      <div style={{ ...walkStyles.card(false), padding: '18px 20px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: WALK.accentSoft, color: WALK.accent,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, flexShrink: 0,
          }}>🔐</div>
          <div style={{ flex: 1 }}>
            <div style={walkStyles.eyebrow}>ระบุตัวตน</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 17 }}>ข้อมูลระบุตัวตน</h3>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: WALK.inkMuted }}>
              วันที่เริ่มงาน บริษัท ชื่อ วันเกิด บัตรประชาชน
            </p>
          </div>
          <span style={{ color: WALK.success, fontSize: 18, fontWeight: 700 }}>✓</span>
        </div>

        {/* DVT prev ID */}
        <div style={{ marginBottom: 12 }}>
          <Field label="รหัสพนักงานเดิม (DVT)" optional
                 placeholder="กรอกหากเคยทำงานในเครือ (rehire / ฝึกงาน)"
                 hint="ระบบจะดึงประวัติเดิมมาให้"/>
        </div>

        {/* Grid: hire date + company + name + DOB */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <Field label="วันที่เริ่มงาน" required value="15 มิ.ย. 2569"
                 warning="ล่วงหน้า — ต้อง SPD อนุมัติ"/>
          <Field label="บริษัท" required value="CEN — Central Retail"/>
          <Field label="เหตุผลการจ้าง" required value="NEW_HIRE"/>
          <Field label="คำนำหน้า (EN)" required value="Ms."/>
          <Field label="ชื่อ (EN)" required placeholder="First name"/>
          <Field label="นามสกุล (EN)" required placeholder="Last name"/>
          <Field label="วันเกิด" required value="14 มี.ค. 2538" hint="อายุ: 31 ปี"/>
          <Field label="คำนำหน้า (ไทย)" required value="นางสาว"/>
          <div style={{
            padding: '5px 12px',
            border: `1px solid ${WALK.accentSoft}`,
            background: 'rgba(214,238,236,0.4)',
            color: WALK.accent, borderRadius: 999,
            fontSize: 11.5, fontWeight: 500, alignSelf: 'end',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: 30, marginBottom: 2,
          }}>+ ประเทศที่เกิด</div>
        </div>

        {/* National ID block */}
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

        {/* Dropzone */}
        <div style={{
          marginTop: 12, padding: '14px 16px',
          background: WALK.creamSoft,
          border: `1.5px dashed ${WALK.hairline}`,
          borderRadius: 8, textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: WALK.inkSoft }}>
            ลากไฟล์มาวาง หรือ <span style={{ color: WALK.accent }}>เลือกไฟล์</span>
          </div>
          <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2 }}>
            สูงสุด 5 ไฟล์ · ไฟล์ละ 10 MB · PDF / JPG / PNG
          </div>
        </div>
      </div>

      {/* ── Conditional section placeholder ── */}
      <div style={{
        padding: '14px 16px', borderRadius: 12,
        border: `1.5px dashed ${WALK.hairline}`,
        background: WALK.creamSoft,
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
          <div style={{ fontSize: 13, fontWeight: 600, color: WALK.ink, marginTop: 2 }}>
            เปิดเฉพาะเมื่อมีข้อมูลเสริมที่เกี่ยวข้อง
          </div>
          <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 2 }}>
            Work Permit (ต่างชาติ) · Dependents (มีบุตร/คู่สมรส) — ซ่อนเป็น default
          </div>
        </div>
        <button style={{ ...walkStyles.btnGhost, padding: '5px 10px', fontSize: 11.5 }}>+ เพิ่ม</button>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="HR Admin · นภสร (HRBP — CEN)"
      title="ใครคือใคร · Identity ก่อน Bio ก่อน Contact"
      narrative="Cluster 1 ลำดับฟิลด์แบบ 'จากบัตรประชาชนเข้ามือ admin ก่อน' — DVT (rehire) ก่อนชื่อ, EN + ไทย คู่กัน, วันเกิด auto-คำนวณอายุ, sections เสริม (Work Permit / Dependents) ซ่อนจนกว่าจะมีเงื่อนไข"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 88,  w: 480, h: 62 },
        { num: 2, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 158, w: 840, h: 110 },
        { num: 3, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 282, w: 840, h: 78 },
        { num: 4, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 488, w: 870, h: 72 },
      ]}
      annotations={[
        { num: 1, title: 'DVT prev ID · rehire-first',
          body: 'ฟิลด์แรกของฟอร์มคือรหัสพนักงานเดิม (DVT) — Central Retail มี rehire/intern กลับมาบ่อย; ถ้ากรอกจะดึงประวัติเดิมทั้งหมด ลดการกรอกซ้ำ 80%' },
        { num: 2, title: 'EN + ไทย name คู่กัน',
          body: 'คำนำหน้า/ชื่อ EN และไทยอยู่ในกริดเดียวกัน — เพราะ payroll ส่ง bank ใช้ EN แต่ HR สื่อสารใช้ไทย; วันเกิดมี auto-calc "อายุ 31 ปี" ลด data-entry error' },
        { num: 3, title: 'National ID · cream sub-block',
          body: 'บล็อกบัตรประชาชนแยกพื้นหลังครีมเพื่อ scan แยกออกจาก demographics; เลขบัตรไทยตรวจ mod-11 อัตโนมัติ — สอดคล้องกับ ID card type + country pair' },
        { num: 4, title: 'Conditional section · hidden by default',
          body: 'Work Permit + Dependents ซ่อนจนกว่าจะตรงเงื่อนไข (ต่างชาติ / มีบุตร) — default Thai unmarried = ไม่เห็น 2 sections นี้ เพื่อให้ฟอร์มสั้นที่สุดตาม use case จริง' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ทำอะไรที่ไหน — ClusterJob
// ═══════════════════════════════════════════════════════════════════
function HireWalk3() {
  const Field = ({ label, value, placeholder, required, hint, readOnly }) => (
    <div>
      <label style={{
        display: 'block', fontSize: 11.5, fontWeight: 600,
        color: WALK.inkSoft, marginBottom: 5,
      }}>
        {label}{required && <span style={{ color: WALK.accent, marginLeft: 3 }}>*</span>}
      </label>
      <div style={{
        padding: '7px 10px', fontSize: 12.5,
        background: readOnly ? WALK.creamSoft : WALK.surface,
        color: value ? WALK.ink : WALK.inkFaint,
        border: `1px solid ${WALK.hairline}`,
        borderRadius: 6, minHeight: 18,
        fontFamily: readOnly ? 'ui-monospace, monospace' : WALK.font,
      }}>{value || placeholder || '—'}</div>
      {hint && <div style={{ marginTop: 3, fontSize: 10.5, color: WALK.inkFaint }}>{hint}</div>}
    </div>
  );

  const SectionCard = ({ icon, eyebrow, title, sub, children, expanded }) => (
    <div style={{ ...walkStyles.card(false), padding: '16px 20px', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: expanded ? 14 : 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: WALK.accentSoft, color: WALK.accent,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, flexShrink: 0,
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={walkStyles.eyebrow}>{eyebrow}</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 16 }}>{title}</h3>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: WALK.inkMuted }}>{sub}</p>
        </div>
        <span style={{ fontSize: 11, color: WALK.inkFaint }}>{expanded ? 'ย่อ ▾' : 'ขยาย ▸'}</span>
      </div>
      {expanded && children}
    </div>
  );

  const mockup = (
    <div>
      {/* ── Section 1: Employee Class ── */}
      <SectionCard icon="💼" eyebrow="ข้อมูลพนักงาน"
                   title="ประเภทการจ้างงาน" sub="Employee Class ตาม Appendix 3 (A-H)" expanded>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 12 }}>
          <Field label="รหัสพนักงาน" value="สร้างหลัง Submit" readOnly/>
          <Field label="Employee Class" required value="D — Officer"
                 hint="A=Exec · B=Sr Mgmt · C=Mgmt · D=Officer · E=Ops · F=Part · G=Contract · H=Intern"/>
        </div>
      </SectionCard>

      {/* ── Section 2: Assignment (BU / Dept / Position) ── */}
      <SectionCard icon="🏢" eyebrow="ตำแหน่งและสังกัด"
                   title="ตำแหน่งและสังกัด" sub="ตำแหน่งงาน หน่วยธุรกิจ สาขา/หน่วยงาน เขต HR" expanded>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="ตำแหน่งงาน" required placeholder="ค้นหาตำแหน่ง…"
                 hint="search-as-you-type จาก master list"/>
          <Field label="หน่วยธุรกิจ" required value="CEN — Central Retail"/>
          <Field label="สาขา/หน่วยงาน" required value="ทองหล่อ"/>
          <Field label="เขต HR" value="กรุงเทพฯ ตอนกลาง"
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
      </SectionCard>

      {/* ── Section 3: Compensation ── */}
      <SectionCard icon="💰" eyebrow="ค่าตอบแทน"
                   title="ค่าตอบแทน" sub="เงินเดือนพื้นฐานสำหรับ Payroll" expanded>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
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
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="HR Admin · นภสร (HRBP — CEN)"
      title="ทำอะไรที่ไหน · Class → Position → Pay"
      narrative="Cluster 2 ลำดับเหมือนตัดสินใจจริง — เลือกประเภทจ้างก่อน (A-H) เพื่อ unlock fields ที่เหลือ, ตำแหน่งจะ link Manager อัตโนมัติใน Cluster 3, เงินเดือนมี pay-grade band เตือนเกินช่วง"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 250, y: WALK.BODY_TOP + 50,  w: 600, h: 70 },
        { num: 2, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 195, w: 840, h: 110 },
        { num: 3, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 312, w: 840, h: 42, radius: 8 },
        { num: 4, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 478, w: 840, h: 58, radius: 8 },
      ]}
      annotations={[
        { num: 1, title: 'Employee Class · 8-option contract ladder',
          body: 'A=Executive → H=Intern เป็น contractual ladder ของ Central Retail; hint แสดง legend เต็มเพื่อให้ HRBP รุ่นใหม่ไม่ต้องเปิด policy doc คู่ขนาน — ลด context-switch' },
        { num: 2, title: 'BU/Dept/Position grid + auto-derive',
          body: 'ตำแหน่งงานเป็น search-as-you-type จาก master list (ไม่ให้พิมพ์อิสระ) · เขต HR derive จากสาขาอัตโนมัติ — ป้องกัน data inconsistency กับ ORG master' },
        { num: 3, title: 'Cross-cluster link reminder',
          body: 'Info banner ย้ำว่า "ตำแหน่งจะ link ไป Direct Manager ใน Cluster 3 อัตโนมัติ" — admin รู้ว่าฟิลด์นี้ส่งผลกระทบข้าม cluster ไม่ใช่แค่ฟอร์มอิสระ' },
        { num: 4, title: 'Pay-grade band warning',
          body: 'Salary มี band เตือนแบบ butter (28k–42k สำหรับ P3) — ไม่ block แต่บอก escalation path ชัด (Director approve) เมื่อเกิน; warm warning แทน red error' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ตรวจส่ง — ClusterReview · EN-name + HRBP + Summary
// ═══════════════════════════════════════════════════════════════════
function HireWalk4() {
  const Field = ({ label, value, placeholder, required, readOnly, hint }) => (
    <div>
      <label style={{
        display: 'block', fontSize: 11.5, fontWeight: 600,
        color: WALK.inkSoft, marginBottom: 5,
      }}>
        {label}{required && <span style={{ color: WALK.accent, marginLeft: 3 }}>*</span>}
      </label>
      <div style={{
        padding: '7px 10px', fontSize: 12.5,
        background: readOnly ? WALK.creamSoft : WALK.surface,
        color: value ? WALK.ink : WALK.inkFaint,
        border: `1px solid ${WALK.hairline}`,
        borderRadius: 6, minHeight: 18,
      }}>{value || placeholder || '—'}</div>
      {hint && <div style={{ marginTop: 3, fontSize: 10.5, color: WALK.inkFaint }}>{hint}</div>}
    </div>
  );

  const CheckpointHeader = ({ icon, title, sub }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: WALK.accentSoft, color: WALK.accent,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, marginTop: 2, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <h3 style={{ ...walkStyles.h3Display, fontSize: 15 }}>{title}</h3>
        {sub && <p style={{ margin: '3px 0 0', fontSize: 12, color: WALK.inkMuted }}>{sub}</p>}
      </div>
    </div>
  );

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

  const mockup = (
    <div>
      {/* ── Section 1: EN name confirm ── */}
      <div style={{ ...walkStyles.card(false), padding: '16px 20px', marginBottom: 12 }}>
        <CheckpointHeader icon="👤" title="ชื่อ-นามสกุลภาษาอังกฤษ"
                          sub="ยืนยันก่อนส่งอนุมัติ · ดึงจากข้อมูลระบุตัวตน"/>
        <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr 1fr 1fr', gap: 10 }}>
          <Field label="คำนำหน้า (EN)" value="Ms." readOnly/>
          <Field label="ชื่อ (EN)" value="Suphansa" readOnly/>
          <Field label="ชื่อกลาง (EN)" value="—" readOnly/>
          <Field label="นามสกุล (EN)" value="Wattanakul" readOnly/>
        </div>
      </div>

      {/* ── Section 2: Manager + HRBP ── */}
      <div style={{ ...walkStyles.card(false), padding: '16px 20px', marginBottom: 12 }}>
        <CheckpointHeader icon="👥" title="อนุมัติโดย Direct Manager + แจ้ง HRBP"
                          sub="Manager auto-derive จากตำแหน่ง · เลือก HRBP รับการแจ้งเตือน"/>
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
      </div>

      {/* ── Section 3: Summary snapshot ── */}
      <div style={{ ...walkStyles.card(true), padding: '16px 20px' }}>
        <CheckpointHeader icon="📋" title="สรุปข้อมูลก่อนส่ง"
                          sub="ตรวจความครบถ้วนของทุกหัวข้อ · 17 / 24 ครบ"/>
        <div style={{
          marginBottom: 8,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1, height: 6, background: WALK.cream, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: '71%', height: '100%', background: WALK.accent }}/>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, color: WALK.ink,
            fontVariantNumeric: 'tabular-nums',
          }}>71%</span>
        </div>
        <div>
          <SummaryRow label="วันที่เริ่มงาน"   value="15 มิ.ย. 2569" ok/>
          <SummaryRow label="บริษัท"          value="CEN — Central Retail" ok/>
          <SummaryRow label="ชื่อ-นามสกุล (EN)" value="Ms. Suphansa Wattanakul" ok/>
          <SummaryRow label="วันเกิด"          value="14 มี.ค. 2538 (อายุ 31)" ok/>
          <SummaryRow label="เลขบัตรประชาชน"   value="—" ok={false}/>
          <SummaryRow label="Employee Class"    value="D — Officer" ok/>
          <SummaryRow label="ตำแหน่ง"          value="—" ok={false}/>
          <SummaryRow label="เงินเดือน"        value="—" ok={false}/>
          <SummaryRow label="Direct Manager"   value="คุณวีระ ส." ok/>
          <SummaryRow label="HRBP"             value="คุณนภสร ว." ok/>
        </div>
        <div style={{
          marginTop: 12, padding: '10px 14px',
          background: WALK.surface,
          border: `1px solid ${WALK.hairline}`,
          borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ flex: 1, fontSize: 12, color: WALK.inkMuted }}>
            ยังเหลือ <b style={{ color: WALK.warning }}>3 หัวข้อ</b> ที่ต้องกรอกก่อนส่ง
          </span>
          <button style={{ ...walkStyles.btnGhost, padding: '5px 10px', fontSize: 11.5 }}>← ย้อนกลับ</button>
          <button style={walkStyles.btnPrimary}>✓ บันทึกและส่ง</button>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HR Admin · นภสร (HRBP — CEN)"
      title="ตรวจส่ง · 3 checkpoint ก่อนกด Submit"
      narrative="Cluster 3 ไม่ใช่ ‘ปุ่ม Submit’ ธรรมดา — มี 3 checkpoint บังคับ: ยืนยัน EN name (สะกดถูกก่อนเข้า payroll), เลือก HRBP เพื่อ chain แจ้งเตือน, และ snapshot ทุกฟิลด์พร้อม ✓/⚠ ให้ตรวจรอบสุดท้ายในมุมเดียว"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 64,  w: 840, h: 64 },
        { num: 2, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 188, w: 410, h: 78 },
        { num: 3, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 290, w: 840, h: 36, radius: 8 },
        { num: 4, x: WALK.MOCKUP_X + 18,  y: WALK.BODY_TOP + 340, w: 840, h: 250 },
      ]}
      annotations={[
        { num: 1, title: 'EN name confirm · read-only mirror',
          body: 'ชื่อ EN ทั้ง 4 ฟิลด์เป็น read-only mirror จาก Cluster 1 — admin ตรวจสะกดถูก/ตรงกับ passport ก่อนเข้า payroll/bank; ห้ามแก้ที่นี่บังคับให้กลับไปแก้ที่ source เพื่อ traceability' },
        { num: 2, title: 'Manager auto-derive · HRBP เลือก',
          body: 'Direct Manager มาจากตำแหน่งใน Cluster 2 (read-only) ส่วน HRBP เลือกได้ — แยกบทบาท approver กับ notifier ชัดเจน ลดความเสี่ยง approval chain ผิดคน' },
        { num: 3, title: 'Email notify checkbox · BRD-tagged',
          body: 'Checkbox แจ้ง email + tag "Chain 2 · BRD #109" แสดง requirement reference inline — auditor/HR Director ตรวจสอบได้ว่าฟิลด์ไหน map กับ BRD ข้อใด' },
        { num: 4, title: 'Summary snapshot · ✓/⚠ ทุกฟิลด์',
          body: 'Snapshot แสดงทั้ง 24 ฟิลด์พร้อม ✓ accent หรือ ⚠ warning + progress 71% — admin ตรวจรอบสุดท้ายในมุมเดียวก่อน Submit แทน scroll กลับทั้งฟอร์ม' },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { HireWalk1, HireWalk2, HireWalk3, HireWalk4 });
