// walkthrough-benefit.jsx
// Benefit module Design Walkthrough — 4 frames covering the claim lifecycle:
//   01 ของฉัน         — Employee wallet shelf (hospital/dental/glasses/maternity) + claim CTA
//   02 อนุมัติ         — Manager queue + final approval workflow with OCR + auto-rule readout
//   03 ตั้งแพ็กเกจ     — HRIS catalog: 5 plans + eligibility · workflow chart per benefit
//   04 ปฏิบัติการ      — Admin Plans (membership) + Rules (auto-approve thresholds)
//
// Each mockup is an inline-style replica of the corresponding section in
// mod-benefit-1/2/3/admin.jsx — kept inline so the storyboard is robust
// against live mockup edits.

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · ของฉัน — Employee wallet + claim CTA
// ═══════════════════════════════════════════════════════════════════
function BenefitWalk1() {
  const wallets = [
    { l: 'ค่ารักษาพยาบาล', used: 8400, total: 30000, c: WALK.accent, ic: '🏥' },
    { l: 'ทันตกรรม',       used: 2000, total: 4000,  c: WALK.sage,    ic: '🦷' },
    { l: 'แว่นตา',         used: 0,    total: 3500,  c: WALK.indigo,  ic: '👓' },
    { l: 'คลอดบุตร',       used: 0,    total: 15000, c: WALK.butter,  ic: '👶' },
  ];

  const quickClaim = [
    { ic: '🏥', l: 'ค่ารักษา' },
    { ic: '🦷', l: 'ทันตกรรม' },
    { ic: '👓', l: 'แว่นตา' },
    { ic: '👶', l: 'คลอดบุตร' },
    { ic: '💊', l: 'ค่ายา' },
    { ic: '➕', l: 'อื่นๆ' },
  ];

  const mockup = (
    <div>
      {/* Wallet shelf — 4 cards in a row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        {wallets.map(b => {
          const pct = (b.used / b.total) * 100;
          return (
            <div key={b.l} style={{ ...walkStyles.card(false), padding: '14px 14px' }}>
              <div style={walkStyles.row}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: WALK.creamSoft, color: b.c,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>{b.ic}</div>
                <span style={{ flex: 1 }}/>
                <span style={{ fontSize: 10.5, color: WALK.inkMuted, fontWeight: 600 }}>
                  {Math.round(pct)}%
                </span>
              </div>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, marginTop: 8 }}>{b.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
                <span style={{
                  fontFamily: WALK.fontDisplay,
                  fontSize: 19, fontWeight: 700, color: WALK.ink,
                  fontVariantNumeric: 'tabular-nums',
                }}>฿{b.used.toLocaleString()}</span>
                <span style={{ fontSize: 10.5, color: WALK.inkMuted }}>
                  / ฿{b.total.toLocaleString()}
                </span>
              </div>
              <div style={{
                height: 5, background: WALK.hairlineSoft,
                borderRadius: 99, marginTop: 10, overflow: 'hidden',
              }}>
                <div style={{
                  width: pct + '%', height: '100%',
                  background: b.c, borderRadius: 99,
                }}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two columns — active claim with stepper + quick-claim grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        {/* Active claim card */}
        <div style={{ ...walkStyles.card(false), padding: 16 }}>
          <div style={walkStyles.row}>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 16, margin: 0 }}>คำเบิกของฉัน</h3>
            <span style={{ flex: 1 }}/>
            <WalkTag bg={WALK.coral}>2 รายการ</WalkTag>
          </div>

          <div style={{
            marginTop: 14, padding: '12px 14px',
            background: WALK.creamSoft,
            borderRadius: 12,
            border: `1px solid ${WALK.hairlineSoft}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <span style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 10, color: WALK.inkMuted, fontWeight: 600,
                }}>CLM-09921</span>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 600,
                  marginTop: 2, color: WALK.ink,
                }}>ค่ารักษา · รพ.บำรุงราษฎร์</div>
                <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 2 }}>
                  ยื่นเมื่อ 2 ชม.ก่อน
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 18, fontWeight: 700,
                  color: WALK.ink, fontVariantNumeric: 'tabular-nums',
                }}>฿1,840</div>
                <span style={{ marginTop: 4, display: 'inline-block' }}>
                  <WalkTag bg={WALK.butterSoft} color={WALK.ink}>SPD ตรวจใบเสร็จ</WalkTag>
                </span>
              </div>
            </div>

            {/* 5-step stepper */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 14 }}>
              {['ยื่น', 'ตรวจ', 'ผจก.', 'Admin', 'จ่าย'].map((s, i) => {
                const step = 2;
                const done = i < step;
                const active = i === step;
                return (
                  <React.Fragment key={s}>
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 3,
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: done ? WALK.accent : WALK.surface,
                        border: active ? `2px solid ${WALK.warning}` : `1px solid ${WALK.hairline}`,
                        color: done ? '#fff' : WALK.inkMuted,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700,
                      }}>{done ? '✓' : i + 1}</div>
                      <span style={{
                        fontSize: 10,
                        color: active ? WALK.warning : done ? WALK.inkSoft : WALK.inkMuted,
                        fontWeight: 500,
                      }}>{s}</span>
                    </div>
                    {i < 4 && (
                      <div style={{
                        flex: 1, height: 1,
                        background: i < step - 1 ? WALK.accent : WALK.hairline,
                        marginTop: -14,
                      }}/>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Knowledge tip */}
          <div style={{
            marginTop: 12, padding: '11px 14px',
            background: WALK.surface,
            borderRadius: 10,
            border: `1px dashed ${WALK.hairline}`,
            fontSize: 12, lineHeight: 1.5, color: WALK.inkSoft,
          }}>
            <b style={{ color: WALK.ink }}>รู้หรือไม่</b> · ใบเสร็จต้องไม่เก่ากว่า <b>90 วัน</b> และมีลายเซ็นแพทย์
          </div>
        </div>

        {/* Quick-claim grid */}
        <div style={{ ...walkStyles.card(true), padding: 16 }}>
          <div style={walkStyles.eyebrow}>เริ่มเบิกใหม่</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 16, marginTop: 4 }}>เลือกประเภท</h3>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
            marginTop: 12,
          }}>
            {quickClaim.map(q => (
              <button key={q.l} style={{
                padding: 10,
                border: `1px solid ${WALK.hairline}`,
                borderRadius: 10,
                background: WALK.surface,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: WALK.accentSoft, color: WALK.accent,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                }}>{q.ic}</div>
                <span style={{ fontSize: 11, fontWeight: 600, color: WALK.ink }}>{q.l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Employee · มาริสา"
      title="ของฉัน · วงเงินใน 1 หน้า เบิกใน 2 คลิก"
      narrative="พนักงานต้องตอบ 3 คำถามทันที — 'ฉันมีเงินสวัสดิการเท่าไหร่' 'ใช้ไปแล้วเท่าไหร่' และ 'เคสที่ยื่นไปถึงไหน' — Wallet shelf ตอบ 2 ข้อแรกในแถวเดียว; stepper ตอบข้อ 3 โดยไม่ต้องเปิด detail"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 4,   w: 868, h: 142 },
        { num: 2, x: WALK.MOCKUP_X + 8,   y: WALK.BODY_TOP + 102, w: 200, h: 34, radius: 8 },
        { num: 3, x: WALK.MOCKUP_X + 16,  y: WALK.BODY_TOP + 252, w: 488, h: 110, radius: 12 },
        { num: 4, x: WALK.MOCKUP_X + 528, y: WALK.BODY_TOP + 160, w: 340, h: 200, radius: 14 },
      ]}
      annotations={[
        { num: 1, title: 'Wallet shelf · 4 ก้อนเงินคู่กัน',
          body: 'แต่ละสวัสดิการเป็น "กระเป๋า" แยก — icon + ชื่อ + ยอดใช้/วงเงิน + progress bar สีประจำหมวด ทำให้ใช้/เหลือเห็นแว้บเดียว ไม่ต้องอ่านตาราง' },
        { num: 2, title: 'Progress bar = budget instinct',
          body: 'แถบแนวนอนสีหมวดเดียวกับ icon — ทันตกรรมใช้ไป 50% เห็นทันทีว่าเหลือพอเบิกอีกครั้ง; ใช้สีหมวด (teal/sage/indigo/butter) แทน red/green เพื่อไม่ส่ง alarm ผิดที่' },
        { num: 3, title: 'Stepper บอกตำแหน่งของเคส',
          body: '5-step (ยื่น · ตรวจ · ผจก. · Admin · จ่าย) วงกลม active มีขอบ butter — พนักงานรู้ทันทีว่ารออะไรอยู่ ไม่ต้องเปิด detail หรือถาม HR' },
        { num: 4, title: 'Quick-claim grid · 2 คลิกเสร็จ',
          body: '6 ปุ่มประเภทยอดฮิตเรียงในการ์ด cream เดียว แทน wizard ยาว — กดประเภท แล้วเข้าฟอร์มสั้น (อัปโหลดใบเสร็จ + ยอด) ตามหลัก "เบิกของง่ายต้องง่าย"' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · อนุมัติ — Manager queue + auto-rule + bulk approve
// ═══════════════════════════════════════════════════════════════════
function BenefitWalk2() {
  const queue = [
    { n: 'มาริสา สงวนศักดิ์', t: 'ค่ารักษา · บำรุงราษฎร์',  a: 1840, auto: true,  cov: '100% ในวงเงิน', ic: '🏥', c: WALK.accent },
    { n: 'ธีรพัฒน์ มงคล',     t: 'ทันตกรรม · ฟันใส',        a: 1200, auto: true,  cov: '100% ในวงเงิน', ic: '🦷', c: WALK.sage   },
    { n: 'กัลยา ภูวดล',        t: 'ค่ายา · เภสัชกรรม',        a:  480, auto: true,  cov: '100% ในวงเงิน', ic: '💊', c: WALK.accent },
    { n: 'นิภาพร แสนสุข',     t: 'ค่ารักษา · พญาไท 2',      a: 4200, auto: false, cov: 'เกินวงเงิน 1,200', ic: '🏥', c: WALK.coral  },
    { n: 'อัมพร โพธิ์ทอง',    t: 'แว่นตา · โปรเกรสซีฟ',     a:  740, auto: false, cov: 'ใบเสร็จไม่ชัด',    ic: '👓', c: WALK.coral  },
  ];

  const mockup = (
    <div>
      {/* Stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
        {[
          { l: 'รอคุณ',         v: '5',     s: '2 ต้องดู',          c: WALK.warning },
          { l: 'ยอดรอ',         v: '฿8,460', s: '5 รายการ',         c: WALK.ink     },
          { l: 'อนุมัติแล้ว',    v: '37',    s: '฿58,420',          c: WALK.accent  },
          { l: 'SLA เฉลี่ย',     v: '1.2 วัน', s: 'เป้า ≤ 2 วัน',     c: WALK.sage    },
        ].map(s => (
          <div key={s.l} style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
            <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>{s.l}</div>
            <div style={{
              fontFamily: WALK.fontDisplay, fontSize: 18, fontWeight: 700,
              color: s.c, marginTop: 4, fontVariantNumeric: 'tabular-nums',
            }}>{s.v}</div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2 }}>{s.s}</div>
          </div>
        ))}
      </div>

      {/* Approval queue table */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        {/* Header w/ bulk action */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px',
          borderBottom: `1px solid ${WALK.hairlineSoft}`,
        }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 15, margin: 0 }}>รออนุมัติ</h3>
          <span style={{ flex: 1 }}/>
          {[
            { l: 'ทั้งหมด · 5', on: true },
            { l: 'ในวงเงิน · 3', on: false },
            { l: 'ต้องดู · 2',  on: false },
          ].map(t => (
            <span key={t.l} style={{
              padding: '4px 10px', borderRadius: 999,
              fontSize: 10.5, fontWeight: 600,
              background: t.on ? WALK.accent : 'transparent',
              color: t.on ? '#fff' : WALK.inkSoft,
              border: `1px solid ${t.on ? WALK.accent : WALK.hairline}`,
            }}>{t.l}</span>
          ))}
          <button style={{ ...walkStyles.btnPrimary, padding: '6px 12px', fontSize: 11.5 }}>
            ✓ อนุมัติในวงเงิน (3)
          </button>
        </div>

        {queue.map((q, i) => (
          <div key={q.n} style={{
            display: 'grid',
            gridTemplateColumns: '20px 32px 1.4fr 1.5fr 0.8fr 1.1fr 100px',
            gap: 10, alignItems: 'center',
            padding: '11px 16px',
            borderBottom: i < queue.length - 1 ? `1px solid ${WALK.hairlineSoft}` : 0,
            background: q.auto ? WALK.creamSoft : WALK.surface,
          }}>
            <input type="checkbox" defaultChecked={q.auto} readOnly
                   style={{ accentColor: WALK.accent }}/>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: WALK.creamSoft, color: q.c,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13,
            }}>{q.ic}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink }}>{q.n}</div>
              <div style={{ fontSize: 10.5, color: WALK.inkFaint }}>E-58231 · 2 ชม.</div>
            </div>
            <div style={{ fontSize: 12, color: WALK.inkSoft }}>{q.t}</div>
            <div style={{
              textAlign: 'right',
              fontFamily: WALK.fontDisplay, fontSize: 15, fontWeight: 700,
              color: WALK.ink, fontVariantNumeric: 'tabular-nums',
            }}>฿{q.a.toLocaleString()}</div>
            <div>
              {q.auto
                ? <WalkTag bg={WALK.accentSoft} color={WALK.accent}>✓ {q.cov}</WalkTag>
                : <WalkTag bg={WALK.coralSoft} color={WALK.coral}>⚠ {q.cov}</WalkTag>}
            </div>
            <button style={{
              ...walkStyles.btnPrimary, padding: '5px 10px', fontSize: 11,
              opacity: q.auto ? 1 : 0.5,
            }}>✓ อนุมัติ</button>
          </div>
        ))}

        {/* Auto-rule readout footer */}
        <div style={{
          padding: '12px 16px',
          background: WALK.ink, color: WALK.creamSoft,
          fontSize: 11.5, lineHeight: 1.55,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{
            background: WALK.accent, color: '#fff',
            padding: '2px 8px', borderRadius: 4,
            fontSize: 10, fontWeight: 700, letterSpacing: '.04em',
          }}>AUTO-APPROVE</span>
          <span>เคสที่ <b>ยอด ≤ ฿2,000</b> · <b>วงเงินคงเหลือ ≥ 50%</b> · <b>ใบเสร็จ ≤ 30 วัน</b> — ตีเช็คไว้ให้แล้ว 3/5 เคส</span>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="Manager + HR Admin"
      title="อนุมัติ · กฎอัตโนมัติคัดเคสง่ายออก ผจก.โฟกัส exception"
      narrative="ผจก. ของ Central Retail อนุมัติเดือนละหลายร้อยเคส — ส่วนใหญ่เป็นยอดเล็ก ในเครือข่าย ใบเสร็จใหม่ ระบบควรเลือกให้ pre-checked แล้ว ผจก. แค่กด Bulk approve; เคส exception (เกินวงเงิน · ใบเสร็จไม่ชัด) ค่อย review ทีละราย"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 4,   w: 868, h: 70 },
        { num: 2, x: WALK.MOCKUP_X + 478, y: WALK.BODY_TOP + 88,  w: 198, h: 38, radius: 8, color: WALK.accent },
        { num: 3, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 134, w: 868, h: 230, color: WALK.butter },
        { num: 4, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 386, w: 868, h: 50,  radius: 8, color: WALK.ink },
      ]}
      annotations={[
        { num: 1, title: 'Stat strip · ความสำคัญทันที',
          body: 'ก่อนเห็น queue ผจก. รู้สเกล: 5 รอ · ฿8,460 · 37 อนุมัติแล้ว · SLA 1.2 วัน — ตัวเลข accent ใช้ warning/teal/sage แทน red ทั้งหมด เพราะ "งานเข้า" ≠ "ผิดพลาด"' },
        { num: 2, title: 'Bulk approve · 3 เคสในคลิกเดียว',
          body: '"อนุมัติในวงเงิน (3)" ที่ header เปลี่ยน workflow จาก 5 คลิกเป็น 1 — เคสที่ตรงกฎอัตโนมัติถูก pre-checked + แถวพื้น cream เพื่อ visual grouping' },
        { num: 3, title: 'Queue · auto vs manual แยกด้วยสี',
          body: 'แถวเขียว = ในวงเงิน (teal accent tag) · แถวขาว = ต้องดู (coral warn tag) — ผจก. กวาดตาแยกได้ใน 1 วินาที; ปุ่ม approve ของแถว manual ทำ opacity 0.5 บอกว่าต้องคลิก "ดู" ก่อน' },
        { num: 4, title: 'Rule readout · explain the magic',
          body: 'Footer ดำ บอก rule ที่กำลังทำงาน (≤฿2K · ≥50% · ≤30 วัน) — สำคัญสำหรับ trust: ผจก. ต้องรู้ว่าระบบ "คิดอย่างไร" ไม่ใช่ black box; ลิงก์ไป Rules engine ของ Admin' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ตั้งแพ็กเกจ — HRIS catalog + eligibility + flow
// ═══════════════════════════════════════════════════════════════════
function BenefitWalk3() {
  const plans = [
    { n: 'Standard',  t: '2,104 คน', active: true,  c: WALK.accent },
    { n: 'Premium',   t: '312 คน',   active: false, c: WALK.butter },
    { n: 'Part-Time', t: '612 คน',   active: false, c: WALK.sage   },
    { n: 'Outsource', t: '75 คน',    active: false, c: WALK.ink    },
    { n: 'Probation', t: '138 คน',   active: false, c: WALK.coral  },
  ];

  const benefits = [
    { ic: '🏥', n: 'ค่ารักษาพยาบาล', y: 30000, t: 'ไม่จำกัด',  flow: 'ผจก. → SPD → Admin' },
    { ic: '🦷', n: 'ทันตกรรม',        y: 4000,  t: '฿2,000',    flow: 'ผจก. → SPD' },
    { ic: '👓', n: 'แว่นตา',          y: 3500,  t: '฿3,500',    flow: 'ผจก. → SPD' },
    { ic: '👶', n: 'คลอดบุตร',        y: 15000, t: 'เหมา',      flow: 'SPD → Admin' },
    { ic: '💊', n: 'ค่ายา',           y: 6000,  t: '฿1,000',    flow: 'อัตโนมัติ' },
  ];

  const mockup = (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14 }}>
      {/* Plan list */}
      <aside style={{ ...walkStyles.card(false), padding: 10 }}>
        <div style={{ ...walkStyles.eyebrow, fontSize: 9.5, padding: '4px 6px' }}>
          แพ็กเกจ · 5 ชุด
        </div>
        {plans.map(p => (
          <div key={p.n} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 8px', borderRadius: 7,
            background: p.active ? WALK.accentSoft : 'transparent',
            marginTop: 4,
          }}>
            <div style={{
              width: 4, height: 22, borderRadius: 2,
              background: p.active ? WALK.accent : 'transparent',
            }}/>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 11.5, fontWeight: 600,
                color: p.active ? WALK.ink : WALK.inkSoft,
              }}>{p.n}</div>
              <div style={{ fontSize: 10, color: WALK.inkMuted }}>{p.t}</div>
            </div>
          </div>
        ))}
      </aside>

      <div>
        {/* Plan header */}
        <div style={{ ...walkStyles.card(false), padding: '12px 14px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>แก้ไขแพ็กเกจ</div>
              <h3 style={{ ...walkStyles.h3Display, fontSize: 17 }}>
                Standard · พนักงานประจำ
              </h3>
              <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 2 }}>
                บังคับใช้ 1 ม.ค. 2568 · 2,104 คนใช้แพ็กเกจ
              </div>
            </div>
            <span style={{ flex: 1 }}/>
            <WalkTag bg={WALK.butterSoft} color={WALK.ink}>3 รายการรอเผยแพร่</WalkTag>
          </div>
        </div>

        {/* Benefits table */}
        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '32px 1.4fr 0.7fr 0.7fr 1.2fr',
            gap: 8, padding: '10px 14px',
            background: WALK.creamSoft,
            borderBottom: `1px solid ${WALK.hairlineSoft}`,
            fontSize: 10, fontWeight: 700,
            color: WALK.inkMuted, letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            <div/>
            <div>สวัสดิการ</div>
            <div style={{ textAlign: 'right' }}>วงเงิน/ปี</div>
            <div style={{ textAlign: 'right' }}>ต่อครั้ง</div>
            <div>ผังอนุมัติ</div>
          </div>
          {benefits.map((b, i) => (
            <div key={b.n} style={{
              display: 'grid', gridTemplateColumns: '32px 1.4fr 0.7fr 0.7fr 1.2fr',
              gap: 8, padding: '10px 14px',
              borderBottom: i < benefits.length - 1 ? `1px solid ${WALK.hairlineSoft}` : 0,
              alignItems: 'center',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 7,
                background: WALK.accentSoft, color: WALK.accent,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13,
              }}>{b.ic}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink }}>{b.n}</div>
              <div style={{
                textAlign: 'right',
                fontFamily: WALK.fontDisplay, fontSize: 13.5, fontWeight: 700,
                color: WALK.ink, fontVariantNumeric: 'tabular-nums',
              }}>฿{b.y.toLocaleString()}</div>
              <div style={{ textAlign: 'right', fontSize: 11.5, color: WALK.inkSoft }}>{b.t}</div>
              <div style={{
                fontSize: 10.5, color: WALK.inkSoft,
                fontFamily: 'ui-monospace, monospace',
              }}>{b.flow}</div>
            </div>
          ))}
        </div>

        {/* Detail / auto-approve panel */}
        <div style={{ ...walkStyles.card(true), padding: '12px 14px' }}>
          <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>
            รายละเอียด · ค่ารักษาพยาบาล
          </div>
          <h4 style={{
            margin: '4px 0 10px',
            fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 600, color: WALK.ink,
          }}>เงื่อนไขและกฎอัตโนมัติ</h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9, marginBottom: 4 }}>ผู้มีสิทธิ</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <WalkTag bg={WALK.accentSoft} color={WALK.accent}>ตนเอง</WalkTag>
                <WalkTag bg={WALK.accentSoft} color={WALK.accent}>คู่สมรส</WalkTag>
                <WalkTag bg={WALK.accentSoft} color={WALK.accent}>บุตร ≤ 20</WalkTag>
                <WalkTag bg={WALK.creamSoft} color={WALK.inkMuted}>+ บิดามารดา</WalkTag>
              </div>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9, marginTop: 10, marginBottom: 4 }}>
                เครือข่าย
              </div>
              <div style={{ fontSize: 11.5, color: WALK.inkSoft }}>
                คู่สัญญา <b>132 แห่ง</b> · นอกเครือข่ายเบิก 80%
              </div>
            </div>
            <div style={{
              background: WALK.surface, borderRadius: 10,
              padding: '10px 12px',
              border: `1px solid ${WALK.hairlineSoft}`,
            }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9, marginBottom: 6 }}>
                ✓ อนุมัติอัตโนมัติเมื่อ
              </div>
              <div style={{ fontSize: 11.5, lineHeight: 1.6, color: WALK.inkSoft }}>
                • ยอด ≤ <b>฿2,000</b><br/>
                • คงเหลือ ≥ <b>50%</b><br/>
                • ใบเสร็จ ≤ <b>30 วัน</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="HRIS · ณัฐวุฒิ"
      title="ตั้งแพ็กเกจ · catalog 5 ชุดเป็น master ขององค์กร"
      narrative="HRIS เป็นเจ้าของ catalog: 5 แพ็กเกจครอบคลุม 3,241 คนตามสถานะการจ้าง (ประจำ/Premium/PT/Outsource/Probation) — แต่ละแพ็กเกจกำหนดวงเงิน · เงื่อนไข · ผังอนุมัติ; HR Admin operate บน catalog นี้ ไม่สร้างแผนเอง"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 4,   w: 184, h: 312, radius: 14 },
        { num: 2, x: WALK.MOCKUP_X + 198, y: WALK.BODY_TOP + 4,   w: 670, h: 70 },
        { num: 3, x: WALK.MOCKUP_X + 198, y: WALK.BODY_TOP + 84,  w: 670, h: 150 },
        { num: 4, x: WALK.MOCKUP_X + 198, y: WALK.BODY_TOP + 244, w: 670, h: 156, color: WALK.accent },
      ]}
      annotations={[
        { num: 1, title: '5 plans · single source of truth',
          body: 'Standard / Premium / PT / Outsource / Probation ครอบคลุมทุกประเภทพนักงาน — รายการนี้คือ "master" ที่ Admin · ผจก. · Employee ใช้ร่วมกัน ห้ามแอบสร้างแผนนอกระบบ' },
        { num: 2, title: 'Header · scope + change state',
          body: 'ระบุพนักงานที่ได้รับผลกระทบ (2,104 คน) + วันเริ่มใช้ + tag butter "3 รายการรอเผยแพร่" — เปลี่ยน catalog = เปลี่ยนเงื่อนไขจริงของหลายพันคน ต้องเห็น impact ก่อน save' },
        { num: 3, title: 'Benefits table · workflow ในแถวเดียว',
          body: 'แต่ละแถวบอก วงเงิน/ปี · ต่อครั้ง · ผังอนุมัติ (ผจก.→SPD→Admin) — ผังอนุมัติเป็นข้อความ monospace สั้น เพื่อ scan; ไม่ต้องเปิด flow diagram แยก' },
        { num: 4, title: 'Auto-approve rules · contract ระบบ',
          body: 'เกณฑ์ ≤฿2K · ≥50% · ≤30 วัน เป็น "สัญญา" ระหว่าง HRIS กับ engine — เคสที่เข้า 3 เงื่อนไขนี้ผ่านอัตโนมัติ; ตัวเลขชัดเจน ปรับได้ แต่ทุก stakeholder ต้องอ่านเลขเดียวกัน' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ปฏิบัติการ — Admin Plans + Rules engine
// ═══════════════════════════════════════════════════════════════════
function BenefitWalk4() {
  const planMini = [
    { n: 'Standard',  m: 2104, e: 2160, pct: 64, c: WALK.accent  },
    { n: 'Premium',   m: 312,  e: 320,  pct: 54, c: WALK.butter  },
    { n: 'Part-Time', m: 612,  e: 712,  pct: 53, c: WALK.sage    },
    { n: 'Probation', m: 138,  e: 138,  pct:  7, c: WALK.coral   },
  ];

  const rules = [
    { id: 'R-501', if: 'ค่ารักษา · ในเครือข่าย AND ยอด ≤ ฿2,000', then: 'อนุมัติอัตโนมัติ', auto: true,  lock: false },
    { id: 'R-502', if: 'ทันตกรรม · ยอด ≤ ฿1,500',                  then: 'อนุมัติอัตโนมัติ', auto: true,  lock: false },
    { id: 'R-503', if: 'ใบเสร็จ > 60 วัน OR OCR ไม่ชัด',           then: 'ส่ง SPD ตรวจมือเสมอ', auto: false, lock: true  },
  ];

  const pendingAssign = [
    { n: 'ปรีชา วรพงษ์',    evt: 'ผ่านทดลองงาน',     from: 'Probation', to: 'Standard',  c: WALK.ink },
    { n: 'กัลยา ภูวดล',     evt: 'เลื่อนระดับ G5',     from: 'Standard',  to: 'Premium',   c: WALK.butter },
    { n: 'วรรณา ศรีสุข',    evt: 'FT → PT',           from: 'Standard',  to: 'Part-Time', c: WALK.coral },
  ];

  const mockup = (
    <div>
      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 0,
        borderBottom: `1px solid ${WALK.hairline}`,
        marginBottom: 12,
      }}>
        {[
          { l: 'ภาพรวม · คิวอนุมัติ', on: false },
          { l: 'แผนสวัสดิการ',        on: true,  count: 5  },
          { l: 'เกณฑ์สิทธิ',          on: true,  count: 14, secondary: true },
        ].map(t => (
          <div key={t.l} style={{
            padding: '8px 14px',
            borderBottom: `2px solid ${t.on ? WALK.accent : 'transparent'}`,
            fontSize: 12.5, fontWeight: t.on ? 700 : 500,
            color: t.on ? WALK.ink : WALK.inkMuted,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {t.l}
            {t.count != null && (
              <span style={{
                fontSize: 10, padding: '1px 6px', borderRadius: 99,
                background: t.on ? WALK.accentSoft : WALK.creamSoft,
                color: t.on ? WALK.accent : WALK.inkMuted,
                fontWeight: 700,
              }}>{t.count}</span>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* LEFT — Plan membership cards */}
        <div>
          <div style={{ ...walkStyles.eyebrow, fontSize: 10, marginBottom: 8 }}>
            แผน · สมาชิก · งบประมาณ
          </div>
          {planMini.map(p => (
            <div key={p.n} style={{
              ...walkStyles.card(false),
              padding: '11px 14px', marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 6, height: 28, borderRadius: 3, background: p.c,
                }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: WALK.ink }}>{p.n}</div>
                  <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>
                    {p.m.toLocaleString()} / {p.e.toLocaleString()} คน
                  </div>
                </div>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 700,
                  color: WALK.ink, fontVariantNumeric: 'tabular-nums',
                }}>{p.pct}%</div>
              </div>
              <div style={{
                height: 4, background: WALK.hairlineSoft,
                borderRadius: 99, marginTop: 8, overflow: 'hidden',
              }}>
                <div style={{
                  width: p.pct + '%', height: '100%', background: p.c,
                }}/>
              </div>
            </div>
          ))}

          {/* Pending assignment */}
          <div style={{ ...walkStyles.card(true), padding: '12px 14px', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h4 style={{
                margin: 0, fontFamily: WALK.fontDisplay,
                fontSize: 13, fontWeight: 600, color: WALK.ink,
              }}>รอจัดสิทธิเข้าแผน</h4>
              <span style={{ flex: 1 }}/>
              <WalkTag bg={WALK.coral}>56 คน</WalkTag>
            </div>
            {pendingAssign.map((r, i) => (
              <div key={r.n} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 0',
                borderTop: i === 0 ? `1px solid ${WALK.hairlineSoft}` : `1px solid ${WALK.hairlineSoft}`,
                marginTop: i === 0 ? 8 : 0,
              }}>
                <WalkAvatar initials={r.n.slice(0, 2)} color={r.c} size={26}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: WALK.ink }}>{r.n}</div>
                  <div style={{ fontSize: 10, color: WALK.inkMuted }}>{r.evt}</div>
                </div>
                <div style={{
                  fontSize: 10.5, color: WALK.inkSoft,
                  fontFamily: 'ui-monospace, monospace',
                }}>
                  <span style={{ color: WALK.inkFaint }}>{r.from}</span>
                  <span style={{ margin: '0 4px', color: WALK.inkFaint }}>→</span>
                  <b>{r.to}</b>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Rules engine */}
        <div>
          <div style={{ ...walkStyles.eyebrow, fontSize: 10, marginBottom: 8 }}>
            เกณฑ์อนุมัติอัตโนมัติ · ปรับได้
          </div>

          {rules.map(r => (
            <div key={r.id} style={{
              ...walkStyles.card(false),
              padding: '12px 14px', marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 10.5, fontWeight: 700, color: WALK.accent,
                }}>{r.id}</span>
                <span style={{ flex: 1 }}/>
                {r.auto && <WalkTag bg={WALK.accentSoft} color={WALK.accent}>อัตโนมัติ</WalkTag>}
                {r.lock && (
                  <span style={{
                    fontSize: 10, color: WALK.inkFaint, fontWeight: 600,
                  }}>🔒 HRIS</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    ...walkStyles.eyebrow, fontSize: 9,
                    color: WALK.indigo, marginBottom: 2,
                  }}>IF · ถ้า</div>
                  <div style={{ fontSize: 11.5, fontWeight: 500, color: WALK.ink, lineHeight: 1.3 }}>
                    {r.if}
                  </div>
                </div>
                <div style={{ color: WALK.inkFaint, fontSize: 16, alignSelf: 'center' }}>→</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    ...walkStyles.eyebrow, fontSize: 9,
                    color: WALK.accent, marginBottom: 2,
                  }}>THEN · จึง</div>
                  <div style={{ fontSize: 11.5, fontWeight: 500, color: WALK.ink, lineHeight: 1.3 }}>
                    {r.then}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Simulator card */}
          <div style={{ ...walkStyles.cardDark, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: WALK.accent, fontSize: 13 }}>⚑</span>
              <h4 style={{
                margin: 0, fontFamily: WALK.fontDisplay,
                fontSize: 13, fontWeight: 600, color: WALK.creamSoft,
              }}>Simulator · ทดลองก่อนเผยแพร่</h4>
            </div>
            <div style={{
              fontSize: 11, lineHeight: 1.55, color: WALK.inkFaint, marginTop: 6,
            }}>
              "ถ้าปรับ R-501 เป็น ฿3,000 · เคสจะ auto 58% (+16%) · ลด workload SPD ~120 เคส/เดือน"
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HR Admin · จิรา"
      title="ปฏิบัติการ · จัดสิทธิคน + ปรับเกณฑ์อัตโนมัติ"
      narrative="Admin ไม่ตั้ง catalog เอง (HRIS ทำ) — Admin operate 2 ฝั่ง: (ก) จัดคนเข้าแผนเมื่อสถานะเปลี่ยน (ผ่านโปร · เลื่อนระดับ · เปลี่ยน FT/PT) (ข) ปรับเกณฑ์ auto-approve ภายใน band ที่ HRIS อนุญาต — ทุกการแก้ดู impact ก่อนเผยแพร่"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 4,   w: 420, h: 32, radius: 6 },
        { num: 2, x: WALK.MOCKUP_X + 4,   y: WALK.BODY_TOP + 48,  w: 430, h: 240 },
        { num: 3, x: WALK.MOCKUP_X + 446, y: WALK.BODY_TOP + 48,  w: 426, h: 252, color: WALK.indigo },
        { num: 4, x: WALK.MOCKUP_X + 446, y: WALK.BODY_TOP + 312, w: 426, h: 80,  color: WALK.ink },
      ]}
      annotations={[
        { num: 1, title: '3 แท็บ · overview / plans / rules',
          body: 'Admin มี 3 mode ในหน้าเดียว — แท็บที่ active แสดง count ใน pill teal (5 plans · 14 rules) ให้รู้ scale งานก่อน switch view; ภาพรวมเป็น default landing' },
        { num: 2, title: 'Plans · membership + budget burn',
          body: 'การ์ดสรุป plan: สมาชิก/ที่ผ่านเกณฑ์ + งบใช้ไป — bar สี plan ให้กวาดตาเห็น Probation 7% (เพิ่งเริ่ม) vs Standard 64% (กลางปี); pending assignment queue ด้านล่างเตือนงานที่ต้องอนุมัติ' },
        { num: 3, title: 'Rules · IF / THEN เหมือนภาษาคน',
          body: 'แต่ละกฎเขียนเป็น IF (indigo) → THEN (teal) อ่านเหมือนประโยคไทย ไม่ใช่ SQL — กฎจาก HRIS ติด 🔒 HRIS แก้ไม่ได้; กฎที่ Admin ตั้งเองมีปุ่ม edit + tag "อัตโนมัติ"' },
        { num: 4, title: 'Simulator · ดู impact ก่อนเผยแพร่',
          body: 'Card ดำ จำลองผลของการปรับเกณฑ์ ("+16% เคส auto · ลด SPD 120 เคส") — ป้องกันการเปลี่ยนกฎโดยไม่รู้ downstream effect; เปลี่ยน Admin จาก "คนตั้งกฎ" เป็น "คนวิเคราะห์ผล"' },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { BenefitWalk1, BenefitWalk2, BenefitWalk3, BenefitWalk4 });
