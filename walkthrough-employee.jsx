// walkthrough-employee.jsx
// Employee module Design Walkthrough — 4 frames across 3 personas:
//   01 Self-service · พนักงานดูข้อมูลตัวเอง (Employee profile + docs + ต้องทำ)
//   02 Manager team view · รายชื่อทีม 14 คน + คะแนนประเมิน + สถานะวันนี้
//   03 Admin registry  · 2,847 คน + filter rail (สถานะ/ประเภท/สาขา) + table
//   04 Detail hub      · timeline + 9 action cards (status-gated)
//
// Each mockup is an inline-style replica of the corresponding section in
// mod-employee.jsx / prod-employee-detail.jsx (kept inline so this overview
// is robust against changes in the live mockup files).

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · Self-service — Employee profile + docs + ต้องทำ
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalk1() {
  const mockup = (
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
            <div style={{
              fontFamily: WALK.fontDisplay,
              fontSize: 26, fontWeight: 700, color: WALK.accent,
            }}>2 ปี 7 ด.</div>
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

      {/* Two-column body: personal info + tasks/docs */}
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
              ['วันเกิด',     '14 มี.ค. 2538 · 30 ปี'],
              ['เลขบัตร ปชช.', '1-1014-•••••-3-9'],
              ['สัญชาติ',    'ไทย'],
              ['สมรส',       'โสด'],
              ['เบอร์โทร',   '+66 89-•••-4521'],
              ['อีเมล',      'marisa.s@central.co.th'],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>{l}</div>
                <div style={{ fontSize: 12.5, marginTop: 3, fontWeight: 500, color: WALK.ink }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: must-do + docs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...walkStyles.card(true), padding: '14px 16px' }}>
            <div style={walkStyles.eyebrow}>ต้องอัปเดต</div>
            <h3 style={{
              margin: '4px 0 10px',
              fontFamily: WALK.fontDisplay, fontSize: 15, fontWeight: 600,
            }}>2 รายการรอคุณ</h3>
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
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10,
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

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Employee · มาริสา"
      title="Self-service · พนักงานดูข้อมูลตัวเอง"
      narrative="พนักงาน 80% เปิดมาที่นี่เพื่อตอบ 3 คำถาม — 'ฉันเป็นใครในระบบ', 'มีอะไรค้างต้องทำ', 'เอกสารฉันอยู่ไหน' Hero ตอบทันที, cream task card ดึง 'ต้องทำ' ขึ้นบน, เอกสารอยู่ขวาเป็น quick access"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X - 4,   y: WALK.BODY_TOP - 4,   w: 888, h: 180 },
        { num: 2, x: WALK.MOCKUP_X - 4,   y: WALK.BODY_TOP + 182, w: 888, h: 50,  radius: 10 },
        { num: 3, x: WALK.MOCKUP_X + 507, y: WALK.BODY_TOP + 238, w: 377, h: 201, color: WALK.coral },
        { num: 4, x: WALK.MOCKUP_X - 4,   y: WALK.BODY_TOP + 238, w: 505, h: 391, color: WALK.indigo },
      ]}
      annotations={[
        { num: 1, title: 'Hero = identity + status ครบจบ',
          body: 'Avatar gradient + ชื่อ TH/EN + ตำแหน่ง + tag stack (ประเภท/ทดลองงาน/รออัปเดต) + อายุงาน teal big number — ตอบ "ฉันคือใครในระบบ" ในแถวเดียว ไม่ต้อง scroll' },
        { num: 2, title: 'SegTabs 6 ส่วน · ข้อมูลส่วนตัว default',
          body: 'แบ่งโปรไฟล์เป็น 6 section (ส่วนตัว/งาน/เอกสาร 14/สิทธิ/ฉุกเฉิน/ผัง) — count บน tab "เอกสาร · 14" ให้รู้ปริมาณก่อนคลิก; default ที่ส่วนตัวเพราะคนเปิดบ่อยสุด',
          color: WALK.accent },
        { num: 3, title: 'Cream task card = urgency แต่ไม่ตกใจ',
          body: 'ใช้ creamSoft bg แยกจาก content cards (white) สื่อ "งานส่วนตัวต้องทำ"; warning icon เฉพาะ urgent item (PND91 ครบ 30 เม.ย.) — warm tone ตามหลัก Humi',
          color: WALK.coral },
        { num: 4, title: 'ข้อมูลส่วนตัว · masked + lock badge',
          body: 'เลขบัตร ปชช. mask 1-1014-•••••-3-9 + tag "🛡 เข้ารหัส" บอก PDPA — แสดงข้อมูลพอใช้งานแต่ปิดความเสี่ยง ทุกฟิลด์ scannable แบบ 2-column grid',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · Manager team view — รายชื่อทีม 14 คน
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalk2() {
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
      <div style={{
        fontFamily: WALK.fontDisplay,
        fontSize: 22, fontWeight: 700, color, lineHeight: 1.1, marginTop: 4,
      }}>{v}</div>
      <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2 }}>{sub}</div>
    </div>
  );

  const mockup = (
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
          <div/>
          <div>ชื่อ · รหัส</div>
          <div>ตำแหน่ง</div>
          <div>สถานะวันนี้</div>
          <div>อายุงาน</div>
          <div>รอบประเมิน</div>
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

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="Manager · อาทิตย์ ช."
      title="Manager team view · ทีม 14 คน + pulse + performance"
      narrative="Manager เปิดมาที่นี่ตอนเช้าเพื่อ orient ว่า 'ใครมา/ใครหาย วันนี้' และเดือนละครั้งเพื่อดู performance — 4 stat cards ให้ pulse, ตารางให้ drill ลง individual; status + คะแนนอยู่ row เดียวเพื่อตัดสินใจ 1-on-1"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X - 4,   y: WALK.BODY_TOP + 88,  w: 888, h: 96  },
        { num: 2, x: WALK.MOCKUP_X + 458, y: WALK.BODY_TOP + 399, w: 126, h: 31, radius: 13, color: WALK.coral },
        { num: 3, x: WALK.MOCKUP_X + 682, y: WALK.BODY_TOP + 454, w: 115, h: 26, radius: 10 },
        { num: 4, x: WALK.MOCKUP_X + 789, y: WALK.BODY_TOP + 255, w:  68, h: 277, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: '4 stat cards · pulse ที่ scan ได้',
          body: 'หัวคน 14 / อยู่ 12 (teal=ดี) / คะแนน 4.1 / รออนุมัติ 3 (warning=ต้องทำ) — สี accent บอก semantics ทันที, sub-text ให้ context (เทียบ trend หรือ breakdown)' },
        { num: 2, title: 'Status pill · tri-color semantic',
          body: 'teal "ทำงาน" + dot, coral "ลาป่วย", butter "OT" — สี state cycle เดียวกันทั่ว Humi ทำให้ manager กวาดสายตา 5 วินาทีรู้ครบทีม',
          color: WALK.coral },
        { num: 3, title: 'รอบประเมิน · พร้อม "ทดลองงาน"',
          body: 'แสดงรอบประเมิน (กลางปี/ปลายปี/ทดลองงาน) ในตารางเลย — manager เห็นปุยเปรียบ probation case (ปรีชา 7 ด.) แยกจาก senior เพื่อ plan 1-on-1' },
        { num: 4, title: 'คะแนน · right-align tabular',
          body: 'คะแนน 4.2 / 4.5 / — display font, right-aligned, tabular-nums เพื่อ scan ตัวเลขแนวตั้ง; "—" สำหรับคนทดลองงาน (ยังไม่ประเมิน) แทน 0.0',
          color: WALK.butter },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · Admin registry — 2,847 คน + filter + table
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalk3() {
  const rows = [
    { i: 'มา', c: WALK.accent, n: 'มาริสา สงวนศักดิ์', id: 'E-58231', r: 'Cashier · CTW',      m: 'อาทิตย์ ช.', d: '12 ก.ย. 66', s: 'ใช้งาน',   sc: WALK.accent },
    { i: 'ปร', c: WALK.butter, n: 'ปรีชา วรพงษ์',      id: 'E-72915', r: 'Floor Staff · CTW',  m: 'อาทิตย์ ช.', d: '22 ต.ค. 67', s: 'ทดลองงาน', sc: WALK.butter },
    { i: 'ธี', c: WALK.sage,   n: 'ธีรพัฒน์ มงคล',     id: 'E-49102', r: 'Senior · CTW',       m: 'อาทิตย์ ช.', d: '05 มี.ค. 64', s: 'ใช้งาน',   sc: WALK.accent },
    { i: 'กั', c: WALK.coral,  n: 'กัลยา ภูวดล',       id: 'E-61480', r: 'Sales Asst. · CTW',  m: 'อาทิตย์ ช.', d: '18 ม.ค. 67', s: 'ใช้งาน',   sc: WALK.accent },
    { i: 'นิ', c: WALK.ink,    n: 'นิภาพร แสนสุข',     id: 'E-58102', r: 'Cashier · Chidlom',  m: 'วรพล จ.',    d: '02 พ.ย. 64', s: 'ใช้งาน',   sc: WALK.accent },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Page head */}
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
      <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: 14 }}>
        {/* Filter rail */}
        <aside style={{ ...walkStyles.card(false), padding: '14px 14px', alignSelf: 'start' }}>
          <h4 style={{
            margin: 0, marginBottom: 10,
            fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 600,
          }}>กรอง</h4>
          {[
            { l: 'สถานะ',        opts: [['ใช้งาน', '2,791', true], ['พ้นสภาพ', '56'], ['ทดลองงาน', '138']] },
            { l: 'ประเภทพนักงาน', opts: [['ประจำ', '2,104', true], ['รายวัน/PT', '612'], ['Outsource', '75']] },
            { l: 'สาขา',         opts: [['CTW', '312'], ['Chidlom', '287'], ['+ 28 แห่ง', '']] },
          ].map(g => (
            <div key={g.l} style={{ marginBottom: 12 }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, marginBottom: 6 }}>{g.l}</div>
              {g.opts.map(([n, count, on]) => (
                <div key={n} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 0', fontSize: 11.5,
                }}>
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

        {/* Right column: active filters + table */}
        <div>
          {/* Active filter chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <WalkTag bg={WALK.ink}>ใช้งาน ✕</WalkTag>
            <WalkTag bg={WALK.ink}>ประจำ ✕</WalkTag>
            <span style={{ fontSize: 11.5, color: WALK.inkMuted }}>2,104 คน</span>
            <span style={{ flex: 1 }}/>
            <div style={{
              display: 'flex', gap: 2, padding: 3,
              background: WALK.surface, border: `1px solid ${WALK.hairline}`,
              borderRadius: 8,
            }}>
              {['ตาราง', 'การ์ด', 'ผังองค์กร'].map((v, i) => (
                <span key={v} style={{
                  padding: '4px 10px', borderRadius: 5, fontSize: 10.5, fontWeight: 600,
                  background: i === 0 ? WALK.accent : 'transparent',
                  color: i === 0 ? '#fff' : WALK.inkSoft,
                }}>{v}</span>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px 32px 2fr 1.6fr 1fr 1fr 1fr',
              padding: '10px 14px', background: WALK.creamSoft,
              borderBottom: `1px solid ${WALK.hairlineSoft}`,
              fontSize: 9.5, fontWeight: 700, color: WALK.inkMuted,
              letterSpacing: '.06em', textTransform: 'uppercase', alignItems: 'center',
            }}>
              <span style={{
                width: 12, height: 12, borderRadius: 3,
                border: `1px solid ${WALK.hairline}`, background: WALK.surface,
              }}/>
              <div/>
              <div>ชื่อ · รหัส</div>
              <div>ตำแหน่ง · สาขา</div>
              <div>ผู้จัดการ</div>
              <div>เริ่มงาน</div>
              <div>สถานะ</div>
            </div>
            {rows.map(r => (
              <div key={r.id} style={{
                display: 'grid',
                gridTemplateColumns: '24px 32px 2fr 1.6fr 1fr 1fr 1fr',
                padding: '10px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
                alignItems: 'center',
              }}>
                <span style={{
                  width: 12, height: 12, borderRadius: 3,
                  border: `1px solid ${WALK.hairline}`, background: WALK.surface,
                }}/>
                <WalkAvatar initials={r.i} color={r.c} size={26} border={WALK.surface}/>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: WALK.ink }}>{r.n}</div>
                  <div style={{ fontSize: 9.5, color: WALK.inkFaint, letterSpacing: '.04em' }}>{r.id}</div>
                </div>
                <div style={{ fontSize: 11, color: WALK.inkSoft }}>{r.r}</div>
                <div style={{ fontSize: 11, color: WALK.inkSoft }}>{r.m}</div>
                <div style={{ fontSize: 11, color: WALK.inkSoft }}>{r.d}</div>
                <div>
                  <WalkTag bg={r.sc} color="#fff">{r.s}</WalkTag>
                </div>
              </div>
            ))}
            <div style={{
              display: 'flex', alignItems: 'center',
              padding: '10px 14px', background: WALK.creamSoft,
              fontSize: 11.5, color: WALK.inkMuted,
            }}>
              แสดง 1–7 จาก 2,104
              <span style={{ flex: 1 }}/>
              <span style={{ display: 'flex', gap: 4 }}>
                <span style={{ width: 26, height: 26, borderRadius: 6, background: WALK.surface, border: `1px solid ${WALK.hairline}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>‹</span>
                <span style={{ width: 26, height: 26, borderRadius: 6, background: WALK.surface, border: `1px solid ${WALK.hairline}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>›</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="HR Admin · จิรา ป."
      title="Admin registry · 2,847 คน · filter to find"
      narrative="HR Admin ดูแล 2,847 คน — UI ต้องเล่นกับ scale: filter rail ซ้ายให้กรองหลายมิติ (สถานะ/ประเภท/สาขา) พร้อม count ทุกตัวเลือก, active filter chip บนตารางสะท้อน state, view switcher ตาราง/การ์ด/ผัง"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X - 4,   y: WALK.BODY_TOP + 88,  w: 218, h: 390 },
        { num: 2, x: WALK.MOCKUP_X + 220, y: WALK.BODY_TOP + 93,  w: 211, h: 31, radius: 8, color: WALK.ink },
        { num: 3, x: WALK.MOCKUP_X + 708, y: WALK.BODY_TOP + 88,  w: 176, h: 41, radius: 8, color: WALK.indigo },
        { num: 4, x: WALK.MOCKUP_X + 220, y: WALK.BODY_TOP + 131, w: 664, h: 349, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'Filter rail · count per option',
          body: 'ใช้งาน 2,791 / พ้นสภาพ 56 / ทดลองงาน 138 — count ติดทุก checkbox ทำให้ admin estimate ผลลัพธ์ก่อนกด เลี่ยง "เลือกแล้วได้ 0 row"' },
        { num: 2, title: 'Active filter chips · removable',
          body: 'Ink dark pill "ใช้งาน ✕ · ประจำ ✕" ทำให้ active filter visible เสมอ; ✕ inline ให้ถอด filter ทีละตัวโดยไม่ต้อง scroll กลับไป rail',
          color: WALK.ink },
        { num: 3, title: 'View switcher · ตาราง/การ์ด/ผัง',
          body: 'ข้อมูล 2,000+ row เหมาะกับ table; แต่บางครั้งต้อง browse แบบ visual (การ์ด) หรือ hierarchy (ผังองค์กร) — switcher ทำให้เปลี่ยน view โดย filter context คงเดิม',
          color: WALK.indigo },
        { num: 4, title: 'Bulk select + paginate footer',
          body: 'Checkbox column ซ้ายสุด + header checkbox สำหรับ bulk action (export/edit/แจ้งเตือน); footer "แสดง 1–7 จาก 2,104" บอก scope ปัจจุบันที่ filter ลด population ไว้',
          color: WALK.butter },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · Detail hub — timeline + 9 action cards
// ═══════════════════════════════════════════════════════════════════
function EmployeeWalk4() {
  const events = [
    { c: WALK.indigo, l: 'ประเมินทดลองงาน', d: '15 ก.ย. 2567', n: 'ผ่านทดลองงาน · 4.2/5.0 (ผู้จัดการสาขา)' },
    { c: WALK.butter, l: 'โอนย้าย',          d: '1 มิ.ย. 2567',  n: 'ย้ายจาก Central Ladprao → Central World' },
    { c: WALK.accent, l: 'เริ่มงาน',          d: '15 มี.ค. 2567', n: null },
  ];

  const actions = [
    { ic: '📋', l: 'ประเมินทดลองงาน', locked: true,  reason: 'ประเมินผ่านแล้ว 15 ก.ย. 2567' },
    { ic: '✏',  l: 'แก้ไขข้อมูลส่วนตัว' },
    { ic: '→',  l: 'โอนย้าย' },
    { ic: '⊘',  l: 'สิ้นสุดสภาพ' },
    { ic: '📄', l: 'ต่อสัญญา',         locked: true,  reason: 'ใช้กับสัญญาจ้าง (PARTIME)' },
    { ic: '↻',  l: 'จ้างซ้ำ',           locked: true,  reason: 'ใช้เมื่อสิ้นสุดสภาพแล้ว' },
    { ic: '⇄',  l: 'เปลี่ยนประเภทจ้าง' },
    { ic: '↗',  l: 'เลื่อนตำแหน่ง / ปรับเงินเดือน' },
    { ic: '★',  l: 'มอบหมายปฏิบัติการ' },
  ];

  const mockup = (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 14 }}>
      {/* Left column: header + timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Detail head */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <WalkAvatar initials="ภศ" color={WALK.accent} size={44} border={WALK.surface}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>30048829 · EJ-30048829-01</div>
              <h2 style={{
                margin: '3px 0 0',
                fontFamily: WALK.fontDisplay, fontSize: 18, fontWeight: 600, color: WALK.ink,
              }}>ภานุพงศ์ ศรีวิชัย</h2>
              <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 1 }}>Phanupong Sriwichai · Cashier · CTW</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <WalkTag bg={WALK.accent}>ทำงานอยู่</WalkTag>
                <WalkTag bg={WALK.sage}>Permanent</WalkTag>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow snapshot */}
        <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
          <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, marginBottom: 8 }}>คำขอที่เกี่ยวข้อง</div>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            padding: '10px 12px', borderRadius: 8, background: WALK.creamSoft,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9, marginBottom: 2 }}>BRD #103</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: WALK.ink }}>Cashier → Senior Cashier</div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>มีผล: 1 ก.ค. 2569</div>
            </div>
            <WalkTag bg={WALK.butter} color="#fff">รอ Manager รีวิว</WalkTag>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>ประวัติการเปลี่ยนแปลง</div>
              <h3 style={{ ...walkStyles.h3Display, fontSize: 15, margin: '3px 0 0' }}>Timeline</h3>
            </div>
            <span style={{ flex: 1 }}/>
            <WalkTag bg={WALK.creamSoft} color={WALK.inkSoft}>3 รายการ</WalkTag>
          </div>
          {events.map((e, idx) => (
            <div key={idx} style={{
              display: 'flex', gap: 10,
              padding: '10px 0', borderBottom: idx < events.length - 1 ? `1px solid ${WALK.hairlineSoft}` : 'none',
            }}>
              <span style={{
                width: 9, height: 9, borderRadius: 99, background: e.c,
                marginTop: 5, flexShrink: 0,
              }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink }}>{e.l}</span>
                  <span style={{ fontSize: 10.5, color: WALK.inkMuted }}>มีผล: {e.d}</span>
                </div>
                {e.n && (
                  <div style={{
                    marginTop: 3, fontSize: 11, color: WALK.inkSoft, fontStyle: 'italic', lineHeight: 1.4,
                  }}>{e.n}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column: 9 action cards */}
      <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
        <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, marginBottom: 8 }}>การดำเนินการ</div>
        <div style={{
          padding: '8px 10px', marginBottom: 12,
          background: WALK.creamSoft, border: `1px solid ${WALK.hairline}`,
          borderRadius: 8,
          fontSize: 10.5, color: WALK.inkSoft, lineHeight: 1.4,
        }}>
          9 core lifecycle surfaces · action card lock อัตโนมัติตามสถานะพนักงาน
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {actions.map(a => (
            <div key={a.l} style={{
              padding: 10, borderRadius: 10,
              border: `1px solid ${WALK.hairline}`,
              background: a.locked ? WALK.creamSoft : WALK.surface,
              opacity: a.locked ? 0.7 : 1,
              display: 'flex', flexDirection: 'column', gap: 6,
              minHeight: 88,
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 7,
                background: a.locked ? WALK.hairlineSoft : WALK.accentSoft,
                color: a.locked ? WALK.inkFaint : WALK.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600,
              }}>{a.ic}</div>
              <div style={{
                display: 'flex', gap: 4, alignItems: 'center',
                fontSize: 11, fontWeight: 600,
                color: a.locked ? WALK.inkMuted : WALK.ink,
                lineHeight: 1.25,
              }}>
                {a.l}
                {a.locked && <span style={{ color: WALK.inkFaint, fontSize: 9 }}>🔒</span>}
              </div>
              {a.locked && a.reason && (
                <div style={{ fontSize: 9.5, color: WALK.inkMuted, lineHeight: 1.35 }}>
                  {a.reason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HR Admin · จิรา ป."
      title="Detail hub · timeline + 9 lifecycle actions"
      narrative="Click ทะลุจาก registry มาที่ Detail hub — แสดง identity ด้านบน, workflow ที่กำลังเดิน, timeline เหตุการณ์อดีต, และ 9 action card สำหรับ next move (โอน/เลื่อน/เลิกจ้าง) ทุก action lock อัตโนมัติเมื่อเงื่อนไขไม่ตรง"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X - 4,   y: WALK.BODY_TOP + 128, w: 420, h: 120, color: WALK.butter },
        { num: 2, x: WALK.MOCKUP_X - 4,   y: WALK.BODY_TOP + 254, w: 420, h: 243 },
        { num: 3, x: WALK.MOCKUP_X + 439, y: WALK.BODY_TOP + 34,  w: 428, h: 41,  color: WALK.indigo },
        { num: 4, x: WALK.MOCKUP_X + 439, y: WALK.BODY_TOP + 79,  w: 428, h: 354, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Workflow snapshot · in-flight',
          body: 'แสดงคำขอเลื่อนตำแหน่ง (BRD #103) ที่กำลังรอ manager review — admin เห็นทันทีว่ามี workflow ที่ยังไม่ปิด ก่อนคิดจะแก้ข้อมูลอื่นที่อาจขัดกัน',
          color: WALK.butter },
        { num: 2, title: 'Timeline · color-coded events',
          body: 'แต่ละ event มี dot สี (teal=hire, butter=transfer, indigo=probation) + วันที่มีผล + บันทึก — สร้าง audit trail ที่อ่านง่าย ใช้สีเดียวกับ event type ทั่ว Humi' },
        { num: 3, title: 'Header explainer · 9 lifecycle',
          body: 'ข้อความนำ "9 core lifecycle surfaces · lock อัตโนมัติตามสถานะ" set expectation ว่าทำไมบาง card ใช้งานไม่ได้ — ลด support ticket "ทำไมกดไม่ได้"',
          color: WALK.indigo },
        { num: 4, title: 'Action card grid 3×3 · locked = reason',
          body: 'ทุก action เป็น card ขนาดเท่ากัน (โอน/เลื่อน/เลิกจ้าง...); locked card grey out + 🔒 + reason ("ใช้กับ PARTIME เท่านั้น") แทนหายไป — โปร่งใสว่าทำไมยังไม่ได้ใช้',
          color: WALK.coral },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { EmployeeWalk1, EmployeeWalk2, EmployeeWalk3, EmployeeWalk4 });
