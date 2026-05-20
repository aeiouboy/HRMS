// walkthrough-offboard.jsx
// Offboard module Design Walkthrough.
// 4 frames following the resignation → final pay arc:
//   01 อนุมัติลาออก   — Manager approval (request + reason + replacement + decision)
//   02 Clearance      — 4-category checklist (equipment · access · tax · interview)
//   03 Final pay      — termination payroll + leave encashment + PF + tax true-up
//   04 ปิด record      — exit summary + reference letter + farewell post
//
// Each mockup is an inline-style replica of the corresponding panel in
// mod-offboard.jsx — kept inline so this storyboard is robust against
// changes in the live mockup file.

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · อนุมัติลาออก — Manager approval
// ═══════════════════════════════════════════════════════════════════
function OffboardWalk1() {
  const mockup = (
    <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1.4fr 1fr' }}>
      {/* LEFT column · employee header + reason + decision */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Employee header card with timeline metrics */}
        <div style={{ ...walkStyles.card(false), padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'linear-gradient(135deg, #243447, #5A6A7E)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: WALK.fontDisplay, fontSize: 17, fontWeight: 700,
            }}>BK</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: WALK.fontDisplay, fontSize: 16, fontWeight: 600,
                color: WALK.ink, letterSpacing: '-0.01em',
              }}>
                เบน คิม <span style={{ color: WALK.inkMuted, fontWeight: 400 }}>· Ben Kim</span>
              </div>
              <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 2 }}>
                พนักงานคลังสินค้า · Central World · ทำงานมา 2 ปี 4 เดือน
              </div>
            </div>
          </div>

          {/* Timeline metric strip (4-up) */}
          <div style={{
            marginTop: 12, padding: 10,
            background: WALK.creamSoft, borderRadius: 10,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          }}>
            {[
              { l: 'ส่งคำขอ',    v: '15 เม.ย.', s: '2 วันก่อน', accent: false },
              { l: 'วันสุดท้าย', v: '15 พ.ค.',  s: 'อีก 30 วัน', accent: true  },
              { l: 'แจ้งล่วงหน้า', v: '30 วัน',  s: '✓ ตามนโยบาย', accent: false },
              { l: 'วันลาเหลือ', v: '6 วัน',   s: 'ต้องเคลียร์', accent: false },
            ].map((m, i) => (
              <div key={i} style={{
                padding: '0 8px', borderRight: i < 3 ? `1px solid ${WALK.hairlineSoft}` : 'none',
                lineHeight: 1.25,
              }}>
                <div style={{ ...walkStyles.eyebrow, fontSize: 9 }}>{m.l}</div>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 600,
                  marginTop: 3, color: m.accent ? WALK.accent : WALK.ink,
                  letterSpacing: '-0.01em',
                }}>{m.v}</div>
                <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 2 }}>{m.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reason quote card */}
        <div style={{ ...walkStyles.card(false), padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 14, margin: 0 }}>เหตุผลที่ลาออก</h3>
            <WalkTag bg={WALK.creamSoft} color={WALK.inkSoft}>พัฒนาตนเอง / โอกาสใหม่</WalkTag>
          </div>
          <div style={{
            padding: '10px 12px', background: WALK.creamSoft, borderRadius: 8,
            borderLeft: `3px solid ${WALK.accent}`,
            fontSize: 12, color: WALK.inkSoft, lineHeight: 1.5, fontStyle: 'italic',
          }}>
            "ได้รับโอกาสไปทำงานต่างประเทศ ขอบคุณบริษัทมากครับ"
          </div>
        </div>

        {/* Decision two-card */}
        <div style={{ ...walkStyles.card(false), padding: '14px 18px' }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 14, margin: '0 0 10px' }}>การตัดสินใจของคุณ</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { t: 'ขอคุยก่อน', s: 'นัด 1-on-1 ภายใน 2 วัน',     c: WALK.warning, active: false, ic: '💬' },
              { t: 'อนุมัติ',     s: 'ส่งต่อ HR เริ่ม offboarding', c: WALK.accent,  active: true,  ic: '✓'  },
            ].map(d => (
              <div key={d.t} style={{
                padding: '12px 12px',
                background: d.active ? WALK.accentSoft : WALK.surface,
                border: `1.5px solid ${d.active ? d.c : WALK.hairline}`,
                borderRadius: 10,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: d.active ? d.c : WALK.creamSoft,
                  color: d.active ? '#fff' : d.c,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700,
                }}>{d.ic}</div>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 600,
                  color: WALK.ink, marginTop: 8,
                }}>{d.t}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2, lineHeight: 1.4 }}>{d.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT column · process timeline + replacement plan */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ ...walkStyles.card(true), padding: '14px 18px' }}>
          <div style={walkStyles.eyebrow}>กระบวนการ Offboarding</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 14, margin: '4px 0 12px' }}>4 ขั้นตอน</h3>
          {[
            { n: 1, t: 'พนักงานส่งคำขอ',           s: '15 เม.ย.',         st: 'done' },
            { n: 2, t: 'หัวหน้าอนุมัติ',           s: 'คุณอยู่ขั้นนี้',     st: 'current' },
            { n: 3, t: 'HR Admin จัดการ',          s: 'Clearance + pay', st: 'pending' },
            { n: 4, t: 'วันสุดท้าย + Exit',         s: '15 พ.ค.',         st: 'pending' },
          ].map((s, i, arr) => {
            const bg = s.st === 'done' ? WALK.success : s.st === 'current' ? WALK.accent : WALK.surface;
            const fg = (s.st === 'done' || s.st === 'current') ? '#fff' : WALK.inkMuted;
            return (
              <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 10, position: 'relative' }}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    background: bg, color: fg,
                    border: (s.st === 'done' || s.st === 'current') ? 0 : `1px solid ${WALK.hairline}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: WALK.fontDisplay, fontSize: 10, fontWeight: 700,
                    zIndex: 1,
                  }}>{s.st === 'done' ? '✓' : s.n}</div>
                  {i < arr.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 22, bottom: -8, width: 2,
                      background: WALK.hairline, left: '50%', transform: 'translateX(-50%)',
                    }}/>
                  )}
                </div>
                <div style={{ paddingBottom: 12 }}>
                  <div style={{
                    fontSize: 11.5, fontWeight: 600,
                    color: s.st === 'current' ? WALK.ink : (s.st === 'done' ? WALK.inkSoft : WALK.inkMuted),
                  }}>{s.t}</div>
                  <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 1 }}>{s.s}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Replacement plan */}
        <div style={{ ...walkStyles.card(false), padding: '14px 18px' }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 13, margin: '0 0 10px' }}>แผนทดแทน</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={{ ...walkStyles.btnGhost, justifyContent: 'flex-start', fontSize: 11.5 }}>
              + เปิด Job Requisition
            </button>
            <button style={{ ...walkStyles.btnGhost, justifyContent: 'flex-start', fontSize: 11.5 }}>
              ↗ ขอโอนย้ายภายใน
            </button>
          </div>
          <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 10, lineHeight: 1.5 }}>
            แนะนำเปิดรับสมัครภายใน 7 วัน · สรรหา ~ 4 สัปดาห์
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="อนุมัติลาออก · ข้อมูลครบใน 1 หน้า"
      narrative="Resignation ไม่ใช่แค่ approve/reject — Manager ต้องรู้บริบท (tenure · เหตุผล · timeline) + เริ่มคิดแผนทดแทนทันที จัด layout เป็น 2 column ให้ตัดสินใจและวางแผนพร้อมกัน"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 14,  y: WALK.BODY_TOP + 12,  w: 510, h: 70 },
        { num: 2, x: WALK.MOCKUP_X + 14,  y: WALK.BODY_TOP + 156, w: 510, h: 86 },
        { num: 3, x: WALK.MOCKUP_X + 280, y: WALK.BODY_TOP + 282, w: 244, h: 100 },
        { num: 4, x: WALK.MOCKUP_X + 540, y: WALK.BODY_TOP + 12,  w: 326, h: 230 },
      ]}
      annotations={[
        { num: 1, title: 'Employee header + tenure',
          body: 'ชื่อไทย/อังกฤษ + role + branch + tenure 2 ปี 4 เดือน — บอก Manager ทันทีว่า "คนที่ลาออกคือใคร อยู่กับเรามานานแค่ไหน" ก่อนตัดสินใจ' },
        { num: 2, title: 'Reason quote · ไม่ใช่ dropdown',
          body: 'ใช้ italic blockquote + teal accent bar แทนแสดงเป็น tag เฉยๆ — ข้อความจริงของพนักงานสำคัญต่อ tone การตอบกลับ + การส่งต่อ HR' },
        { num: 3, title: 'Approve เป็น default visual',
          body: 'Card "อนุมัติ" pre-selected ด้วย teal solid; "ขอคุยก่อน" เป็น escape hatch (warning) — สื่อว่าระบบคาด approve เป็น primary path' },
        { num: 4, title: 'Sticky process timeline',
          body: 'แสดง 4 ขั้นตอน offboarding ตั้งแต่ frame นี้ — Manager เห็น handoff ไป HR ชัด ไม่รู้สึกว่า "ลาออก = หายไป"; ใช้ creamSoft แยกจาก action area' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · Clearance — 4-category checklist
// ═══════════════════════════════════════════════════════════════════
function OffboardWalk2() {
  // KPI strip data + first two categories of clearance items
  const groups = [
    {
      cat: 'คืนของบริษัท',
      items: [
        { l: 'Laptop · Dell Latitude 5430', st: 'done',    who: 'IT' },
        { l: 'บัตรพนักงาน + บัตรจอดรถ',     st: 'done',    who: 'Security' },
        { l: 'เครื่องแบบ 3 ชุด + รองเท้า',  st: 'pending', who: 'Store Ops' },
      ],
    },
    {
      cat: 'เคลียร์ระบบ + บัญชี',
      items: [
        { l: 'ลบสิทธิ์ HRMS · Email · Slack', st: 'scheduled', who: 'IT' },
        { l: 'ส่งต่อ task ใน workdesk',       st: 'todo',      who: 'Manager' },
      ],
    },
  ];
  const ST = {
    done:      { l: 'เสร็จ',      bg: WALK.successSoft, fg: WALK.success, ic: '✓' },
    pending:   { l: 'กำลังทำ',    bg: WALK.warningSoft, fg: '#92660C',    ic: '◐' },
    scheduled: { l: 'ตั้งเวลา',   bg: WALK.accentSoft,  fg: WALK.accent,  ic: '⏱' },
    todo:      { l: 'ยังไม่ทำ',   bg: WALK.creamSoft,   fg: WALK.inkMuted, ic: '○' },
  };

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* KPI strip · 4-up */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr repeat(3, 1fr)', gap: 10 }}>
        <div style={{ ...walkStyles.card(false), padding: '12px 16px' }}>
          <div style={walkStyles.eyebrow}>ความคืบหน้ารวม</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginTop: 4 }}>
            <span style={{
              fontFamily: WALK.fontDisplay, fontSize: 24, fontWeight: 600,
              letterSpacing: '-0.02em', color: WALK.ink,
            }}>23%</span>
            <span style={{ fontSize: 11, color: WALK.inkMuted, marginBottom: 3 }}>3 / 13 งาน</span>
          </div>
          <div style={{ height: 6, background: WALK.cream, borderRadius: 99, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ width: '23%', height: '100%', background: WALK.accent }}/>
          </div>
        </div>
        {[
          { l: 'งานคงค้าง',   v: '9',        s: 'ต้องเคลียร์ก่อนวันสุดท้าย', c: WALK.warning },
          { l: 'เงินสุดท้าย', v: '฿42,840',  s: 'incl. ค่าชดเชยลา 6 วัน',   c: WALK.ink },
          { l: 'วันที่เหลือ', v: '5',        s: 'วันทำการ',                  c: WALK.danger },
        ].map(k => (
          <div key={k.l} style={{ ...walkStyles.card(false), padding: '12px 16px' }}>
            <div style={walkStyles.eyebrow}>{k.l}</div>
            <div style={{
              fontFamily: WALK.fontDisplay, fontSize: 22, fontWeight: 600,
              letterSpacing: '-0.02em', color: k.c, marginTop: 4, lineHeight: 1,
            }}>{k.v}</div>
            <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 4 }}>{k.s}</div>
          </div>
        ))}
      </div>

      {/* Tab strip */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${WALK.hairline}` }}>
        {[
          { l: 'Clearance Checklist', badge: '3/13', on: true },
          { l: 'Final Pay',           badge: '฿42,840', on: false },
          { l: 'เอกสาร',              badge: '2',  on: false },
          { l: 'Exit Interview',      badge: 'ส่งแล้ว', on: false },
        ].map(t => (
          <div key={t.l} style={{
            padding: '8px 14px',
            borderBottom: `2px solid ${t.on ? WALK.accent : 'transparent'}`,
            marginBottom: -1,
            fontSize: 12, fontWeight: t.on ? 600 : 500,
            color: t.on ? WALK.ink : WALK.inkMuted,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {t.l}
            <span style={{
              padding: '1px 7px', borderRadius: 99,
              background: t.on ? WALK.accentSoft : WALK.cream,
              color: t.on ? WALK.ink : WALK.inkMuted,
              fontSize: 9.5, fontWeight: 600,
            }}>{t.badge}</span>
          </div>
        ))}
      </div>

      {/* Checklist groups */}
      {groups.map(g => {
        const cdone = g.items.filter(i => i.st === 'done').length;
        return (
          <div key={g.cat} style={{ ...walkStyles.card(false), padding: 0 }}>
            <div style={{
              padding: '10px 16px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <h3 style={{ ...walkStyles.h3Display, fontSize: 13, margin: 0 }}>{g.cat}</h3>
              <span style={{ fontSize: 11, color: WALK.inkMuted, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {cdone}/{g.items.length} เสร็จ
              </span>
            </div>
            {g.items.map((it, i) => {
              const s = ST[it.st];
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '28px 1fr 110px 90px',
                  gap: 10, alignItems: 'center',
                  padding: '9px 16px',
                  borderTop: i === 0 ? 0 : `1px solid ${WALK.hairlineSoft}`,
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 99,
                    background: s.bg, color: s.fg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                  }}>{s.ic}</span>
                  <div style={{
                    fontSize: 12, fontWeight: 600, color: WALK.ink,
                    textDecoration: it.st === 'done' ? 'line-through' : 'none',
                    textDecorationColor: WALK.inkFaint,
                  }}>{it.l}</div>
                  <span style={{
                    fontSize: 10.5, padding: '2px 8px', borderRadius: 99,
                    background: WALK.creamSoft, color: WALK.inkSoft,
                    width: 'fit-content', fontWeight: 600,
                  }}>{it.who}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: s.fg,
                    padding: '3px 8px', borderRadius: 99, background: s.bg,
                    width: 'fit-content', display: 'inline-flex', alignItems: 'center', gap: 3,
                  }}>{s.ic} {s.l}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="HR Admin · คุณนัฐญา"
      title="Clearance · เปลี่ยน checklist เป็น workflow"
      narrative="Offboarding มี 13 งานกระจาย 4 ทีม (IT · Security · Payroll · HR) — แสดง progress รวม + KPI urgency แล้วแยกตามหมวด พร้อม owner ทุกแถวเพื่อ accountability ชัด"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 8,   w: 230, h: 78 },
        { num: 2, x: WALK.MOCKUP_X + 470, y: WALK.BODY_TOP + 8,   w: 400, h: 78 },
        { num: 3, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 100, w: 240, h: 36 },
        { num: 4, x: WALK.MOCKUP_X + 560, y: WALK.BODY_TOP + 160, w: 220, h: 180 },
      ]}
      annotations={[
        { num: 1, title: 'Progress bar · ไม่ใช่ %',
          body: 'แสดงทั้ง 23% ตัวใหญ่ + bar + "3/13 งาน" — เลือกได้ว่าจะ scan visual หรืออ่านตัวเลข; HR Admin ต้อง report Manager ทุกวันต้องเห็นตัวเลขจริง' },
        { num: 2, title: 'KPI urgency · danger สำหรับ time',
          body: 'งานคงค้าง 9 = warning amber, วันที่เหลือ 5 = danger red — สีบอกระดับความเร่งด่วน ไม่ใช่แค่ตกแต่ง; เงินสุดท้าย ฿42,840 neutral เพราะเป็นข้อมูล' },
        { num: 3, title: 'Tab + count badge',
          body: 'ทุก tab ใส่ badge content (3/13 · ฿42,840 · 2 · ส่งแล้ว) — เห็นภาพรวมโดยไม่ต้องคลิกเข้าไป; lower friction สำหรับ HR Admin ที่ต้อง switch บ่อย' },
        { num: 4, title: 'Owner chip ทุกแถว',
          body: 'แต่ละ task ติด owner (IT · Security · Store Ops · Manager) เป็น cream chip — clearance ไม่ใช่ HR คนเดียวทำ; ต้องเห็นว่าใครต้องดันแต่ละชิ้น' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · Final pay — termination payroll
// ═══════════════════════════════════════════════════════════════════
function OffboardWalk3() {
  const rows = [
    { l: 'เงินเดือนงวด 1–15 พ.ค.',                       v:  12500, k: 'earn'   },
    { l: 'ค่าชดเชยวันลาคงเหลือ × 6 วัน',                  v:   5000, k: 'earn'   },
    { l: 'โบนัส pro-rated (Q2)',                          v:   8500, k: 'earn'   },
    { l: 'กองทุนสำรองเลี้ยงชีพ (พนักงาน + บริษัท)',         v:  18840, k: 'earn'   },
    { l: 'หัก ภงด.91',                                    v:  -1200, k: 'deduct' },
    { l: 'หัก ประกันสังคม',                                v:   -750, k: 'deduct' },
  ];
  const total = rows.reduce((s, r) => s + r.v, 0);

  const mockup = (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
      {/* LEFT · payroll breakdown */}
      <div style={{ ...walkStyles.card(false), padding: 0 }}>
        <div style={{ padding: '12px 18px', borderBottom: `1px solid ${WALK.hairlineSoft}` }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 14, margin: 0 }}>รายการเงินสุดท้าย · 15 พ.ค. 2568</h3>
          <p style={{ fontSize: 11, color: WALK.inkMuted, margin: '3px 0 0' }}>
            โอนเข้าบัญชีพนักงานในรอบจ่าย 25 พ.ค.
          </p>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr 110px',
            padding: '10px 18px',
            borderTop: i === 0 ? 0 : `1px solid ${WALK.hairlineSoft}`,
            alignItems: 'center',
          }}>
            <div style={{ fontSize: 12, color: WALK.inkSoft }}>{r.l}</div>
            <div style={{
              textAlign: 'right',
              fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              color: r.v < 0 ? WALK.danger : WALK.ink,
            }}>
              {r.v < 0 ? '-' : ''}฿{Math.abs(r.v).toLocaleString()}
            </div>
          </div>
        ))}
        {/* Total row in accent soft */}
        <div style={{
          padding: '12px 18px',
          background: WALK.accentSoft,
          borderTop: `1px solid ${WALK.hairline}`,
          display: 'grid', gridTemplateColumns: '1fr 140px',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: WALK.ink }}>รวมโอน</div>
          <div style={{
            textAlign: 'right',
            fontFamily: WALK.fontDisplay, fontSize: 20, fontWeight: 700,
            letterSpacing: '-0.015em', color: WALK.ink, fontVariantNumeric: 'tabular-nums',
          }}>
            ฿{total.toLocaleString()}
          </div>
        </div>
      </div>

      {/* RIGHT · destination account + docs + send button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ ...walkStyles.card(false), padding: '14px 18px' }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 13, margin: 0 }}>บัญชีปลายทาง</h3>
          <div style={{
            padding: 12, background: WALK.creamSoft, borderRadius: 8, marginTop: 8,
          }}>
            <div style={{ ...walkStyles.eyebrow, fontSize: 9 }}>ธนาคารกสิกรไทย</div>
            <div style={{
              fontFamily: WALK.fontDisplay, fontSize: 15, fontWeight: 600,
              marginTop: 4, letterSpacing: '-0.01em',
            }}>xxx-x-xx218-7</div>
            <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 2 }}>เบน คิม (KIM, BEN)</div>
          </div>
        </div>

        <div style={{ ...walkStyles.card(false), padding: '14px 18px' }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 13, margin: '0 0 8px' }}>เอกสารที่ต้องยื่น</h3>
          {[
            { l: 'ภงด.91',           s: 'ยื่นแทนนายจ้าง · ภายใน 31 มี.ค.' },
            { l: 'สปส.6-09 (แจ้งออก)', s: 'ส่ง สปส. · ภายใน 7 วัน' },
            { l: 'โอน กสล. ออก',       s: 'ส่งบริษัทจัดการ' },
          ].map(d => (
            <div key={d.l} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '5px 0' }}>
              <span style={{
                width: 12, height: 12, borderRadius: 99,
                background: WALK.inkFaint, opacity: 0.3,
                marginTop: 4, flexShrink: 0,
              }}/>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: WALK.ink }}>{d.l}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 1 }}>{d.s}</div>
              </div>
            </div>
          ))}
        </div>

        <button style={{ ...walkStyles.btnPrimary, justifyContent: 'center', padding: '10px 14px' }}>
          ↑ ส่งให้ Payroll ดำเนินการ
        </button>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="HR Admin · คุณนัฐญา"
      title="Final pay · ทุกบาทมีที่มา"
      narrative="Final pay ของคนลาออกซับซ้อนกว่าเงินเดือนปกติ — มีค่าชดเชยลา + PF + tax true-up + หักประกันสังคม จัดเป็น line-item ledger ให้ตรวจสอบและ defend ต่อพนักงานได้"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 10,  y: WALK.BODY_TOP + 64,  w: 500, h: 156 },
        { num: 2, x: WALK.MOCKUP_X + 380, y: WALK.BODY_TOP + 158, w: 130, h: 62 },
        { num: 3, x: WALK.MOCKUP_X + 10,  y: WALK.BODY_TOP + 220, w: 500, h: 56 },
        { num: 4, x: WALK.MOCKUP_X + 530, y: WALK.BODY_TOP + 120, w: 340, h: 150 },
      ]}
      annotations={[
        { num: 1, title: 'Earn lines แยกตามแหล่งที่มา',
          body: 'แยก 4 รายการบวก (เงินเดือน · ค่าชดเชยลา · โบนัส · PF) แทนรวมเป็น "gross" — HR ต้องตอบพนักงานได้ทันทีว่า ฿18,840 มาจากอะไร' },
        { num: 2, title: 'Deduction · ใช้ red minus',
          body: 'ภงด.91 + ประกันสังคม แสดงเป็น "-฿1,200" สี danger — ขั้ว visual ตรงกับขั้ว math; ไม่ใช้ column แยก เพื่อให้ลำดับ chronological' },
        { num: 3, title: 'Total ใน accent strip',
          body: 'แถวรวม ฿42,840 อยู่ใน teal-soft background ตัดจาก rows ข้างบน — เป็น "หมุดสำคัญ" ที่ scan เห็นทันที; pattern เดียวกับ payslip ปกติ' },
        { num: 4, title: 'Right rail = หลังจ่ายแล้วทำอะไรต่อ',
          body: 'บัญชีปลายทาง + 3 เอกสาร (ภงด.91 · สปส.6-09 · กสล.) + ปุ่มส่ง Payroll — ผูก action chain ให้ HR Admin ไม่หลุดขั้นตอนกฎหมาย' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ปิด record — exit summary + reference + farewell
// ═══════════════════════════════════════════════════════════════════
function OffboardWalk4() {
  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Hero summary banner */}
      <div style={{ ...walkStyles.cardDark, padding: '16px 20px', minHeight: 110 }}>
        <div style={{
          position: 'absolute', width: 110, height: 130, right: -20, bottom: -30,
          background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
          opacity: 0.5,
        }}/>
        <div style={{ ...walkStyles.eyebrow, color: WALK.accent, position: 'relative' }}>
          วันสุดท้าย · 15 พ.ค. 2568 · ปิดเคสแล้ว ✓
        </div>
        <h3 style={{
          ...walkStyles.h3Display, color: WALK.creamSoft, position: 'relative',
          fontSize: 18, marginTop: 4,
        }}>เบน คิม · จาก Central World</h3>
        <div style={{ display: 'flex', gap: 16, marginTop: 10, position: 'relative' }}>
          {[
            { l: 'Clearance', v: '13/13' },
            { l: 'Final pay', v: '฿42,840 โอนแล้ว' },
            { l: 'Exit Interview', v: 'ตอบครบ 6/6' },
          ].map(m => (
            <div key={m.l}>
              <div style={{ fontSize: 10, color: WALK.inkFaint, letterSpacing: '.06em', textTransform: 'uppercase' }}>{m.l}</div>
              <div style={{
                fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 600,
                color: WALK.creamSoft, marginTop: 2,
              }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns · letters + farewell post */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Letters card */}
        <div style={{ ...walkStyles.card(false), padding: '14px 18px' }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 13, margin: '0 0 10px' }}>เอกสาร · จดหมาย</h3>
          {[
            { t: 'หนังสือรับรองการทำงาน (TH)', st: 'sent', date: 'ส่งแล้ว 15 พ.ค.' },
            { t: 'Certificate of Employment (EN)', st: 'sent', date: 'ส่งแล้ว 15 พ.ค.' },
            { t: 'หนังสือรับรองเงินเดือนสุดท้าย', st: 'sent', date: 'ส่งแล้ว 15 พ.ค.' },
            { t: 'จดหมายขอบคุณจากผู้บริหาร', st: 'sent', date: 'ส่งแล้ว 14 พ.ค.' },
          ].map((L, i) => (
            <div key={L.t} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderTop: i === 0 ? 0 : `1px solid ${WALK.hairlineSoft}`,
            }}>
              <div style={{
                width: 28, height: 36, borderRadius: 5,
                background: WALK.creamSoft, border: `1px solid ${WALK.hairline}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: WALK.inkMuted,
              }}>📄</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: WALK.ink, lineHeight: 1.3 }}>{L.t}</div>
                <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 2 }}>{L.date}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, color: WALK.success,
                padding: '2px 8px', borderRadius: 99, background: WALK.successSoft,
              }}>✓ ส่ง</span>
            </div>
          ))}
        </div>

        {/* Farewell post / feed item */}
        <div style={{ ...walkStyles.card(true), padding: '14px 18px' }}>
          <div style={walkStyles.eyebrow}>โพสต์อำลา · Team feed</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 13, margin: '4px 0 10px' }}>ขอบคุณเบน 🙏</h3>

          <article style={{
            padding: 12, background: WALK.surface, borderRadius: 10,
            border: `1px solid ${WALK.hairlineSoft}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <WalkAvatar initials="JM" color={WALK.sage} size={26}/>
              <div style={{ fontSize: 11.5 }}>
                <b>จอร์แดน เหมย</b>
                <span style={{ color: WALK.inkMuted }}> · ฝ่ายบุคคล · วันนี้</span>
              </div>
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 12, lineHeight: 1.5, color: WALK.inkSoft }}>
              วันนี้เป็นวันสุดท้ายของเบนกับเรา · 2 ปี 4 เดือนที่ Central World ขอให้ทุกคนช่วยส่งกำลังใจให้เบนในก้าวต่อไป 🌟
            </p>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {['❤️ 84', '🙏 47', '🌟 31'].map(r => (
                <span key={r} style={{
                  background: WALK.creamSoft, color: WALK.inkSoft,
                  padding: '2px 8px', borderRadius: 99, fontSize: 10.5,
                  border: `1px solid ${WALK.hairlineSoft}`,
                }}>{r}</span>
              ))}
            </div>
          </article>

          {/* Boomerang / alumni hint */}
          <div style={{
            marginTop: 12, padding: '8px 12px',
            background: WALK.surface, border: `1px dashed ${WALK.accent}`,
            borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>↺</span>
            <div style={{ fontSize: 11, color: WALK.inkSoft, lineHeight: 1.4 }}>
              ย้ายเข้า <b>Alumni network</b> · กลับมาเป็น boomerang hire ได้ในอนาคต
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HR Admin · คุณนัฐญา"
      title="ปิด record · จบแบบไม่ตัดขาด"
      narrative="วันสุดท้ายไม่ใช่จุดจบ — HR Admin ต้องการ summary ว่าทุกอย่างปิดครบ + ระบบช่วย humanise การจากไป (จดหมาย · post อำลา · alumni track) เพื่อรักษา relationship สำหรับ boomerang hire"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 8,   w: 862, h: 130 },
        { num: 2, x: WALK.MOCKUP_X + 220, y: WALK.BODY_TOP + 76,  w: 480, h: 50 },
        { num: 3, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 150, w: 425, h: 200 },
        { num: 4, x: WALK.MOCKUP_X + 447, y: WALK.BODY_TOP + 280, w: 423, h: 64 },
      ]}
      annotations={[
        { num: 1, title: 'Dark hero = ปิดเคสสำเร็จ',
          body: 'Banner ink dark + teal accent = สถานะ "complete" — เปลี่ยน mood จาก operational (frames 2-3) เป็น ceremonial; ยืนยันให้ HR Admin รู้ว่าจบ' },
        { num: 2, title: 'Summary 3 metric แทน 13-line audit',
          body: 'Clearance 13/13 · Final pay โอน · Interview ตอบครบ — สรุปผลของ 3 frames ก่อนหน้าใน 1 บรรทัด; lower cognitive load หลังเสร็จงาน' },
        { num: 3, title: 'จดหมาย 4 ฉบับ · all green',
          body: 'เอกสารทั้ง 4 ฉบับ status "ส่งแล้ว" success green — visual proof ว่า HR ปฏิบัติตามกฎหมาย + ส่งเอกสารส่วนตัวให้พนักงานครบแล้ว' },
        { num: 4, title: 'Alumni network · dashed hint',
          body: 'Dashed teal border สื่อ "ทางเลือก" (ไม่ใช่ required) — รักษาสะพานสำหรับ boomerang hire ตามหลัก Humi warm; แยก visual จาก farewell post' },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { OffboardWalk1, OffboardWalk2, OffboardWalk3, OffboardWalk4 });
