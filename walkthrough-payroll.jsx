// walkthrough-payroll.jsx
// Payroll module Design Walkthrough — Option C: 5 persona sub-sections.
//
// RETROFIT PATTERN (static page + rotating spotlight per sub-section):
//   empPageMockup()     — Employee payslip (gross / deductions / net + YTD)
//   managerPageMockup() — Manager team review (base/OT/bonus table + deadline)
//   adminPageMockup()   — Admin run payroll (pipeline + variance + bank batch)
//   hrisPageMockup()    — HRIS tax formula config (earnings registry + bracket)
//   spdPageMockup()     — SPD reconcile (dispute claim + TM vs Payroll diff)
//
// Sub-sections:
//   Employee  (1 frame) · PayrollWalkEmp1
//   Manager   (1 frame) · PayrollWalkManager1
//   Admin     (2 frames)· PayrollWalkAdmin1, PayrollWalkAdmin2
//   HRIS      (1 frame) · PayrollWalkHris1
//   SPD       (1 frame) · PayrollWalkSpd1

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

const SPOTX = WALK.MOCKUP_X - 4;
const SPOTW = WALK.MOCKUP_W + 8;

// ══════════════════════════════════════════════════════════════════════
// PERSONA A — Employee payslip page mockup
// ══════════════════════════════════════════════════════════════════════
function empPageMockup() {
  const earnings = [
    ['เงินเดือนพื้นฐาน', 24000],
    ['ค่าครองชีพ',        2000],
    ['OT 6 ชม. × 1.5',   1080],
    ['โบนัสตามผลงาน Q1', 3500],
  ];
  const deductions = [
    ['ภาษีเงินได้ ภงด.1',     1842, 'หัก ณ ที่จ่าย'],
    ['ประกันสังคม',            750,  '5% สูงสุด'],
    ['กองทุนสำรองเลี้ยงชีพ',  1200, '4% (บริษัทสมทบ 4%)'],
  ];
  const ytd = [
    ['รายได้รวม',  124320, WALK.accent],
    ['ภาษีหักไป',    7368, WALK.warning],
    ['ประกันสังคม',  3000, WALK.inkSoft],
    ['สะสม PVD',     4800, WALK.sage],
  ];

  return (
    <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1.4fr 1fr' }}>
      {/* ── Payslip · paper-style receipt with dark header ──────── */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden', minHeight: 540 }}>
        {/* Dark header — period + net pay headline */}
        <div style={{
          padding: '18px 20px', background: WALK.ink, color: WALK.creamSoft,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', width: 90, height: 110, right: -20, top: -30,
            background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
            opacity: 0.4,
          }}/>
          <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
            <div>
              <div style={{
                fontSize: 10.5, color: WALK.accent, letterSpacing: '.14em',
                textTransform: 'uppercase', fontWeight: 600,
              }}>สลิปเงินเดือน · งวด 04/2568</div>
              <h3 style={{
                fontFamily: WALK.fontDisplay, fontSize: 19, marginTop: 5,
                fontWeight: 600, color: WALK.creamSoft,
              }}>1 – 30 เมษายน 2568</h3>
              <div style={{ fontSize: 11.5, color: 'rgba(231,227,216,0.7)', marginTop: 3 }}>
                มาริสา สงวนศักดิ์ · E-58231 · Cashier
              </div>
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 10, color: 'rgba(231,227,216,0.6)',
                letterSpacing: '.08em', textTransform: 'uppercase',
              }}>เงินสุทธิ</div>
              <div style={{
                fontFamily: WALK.fontDisplay, fontSize: 28, fontWeight: 700,
                color: WALK.creamSoft, marginTop: 3,
              }}>฿{(24418).toLocaleString()}</div>
              <div style={{ fontSize: 10.5, color: WALK.accent, marginTop: 2 }}>
                โอน 25 เม.ย. · กรุงเทพฯ ••3401
              </div>
            </div>
          </div>
        </div>

        {/* Receipt body */}
        <div style={{ padding: '16px 20px' }}>
          <h4 style={{
            fontFamily: WALK.fontDisplay, fontSize: 13, marginBottom: 8,
            fontWeight: 600, color: WALK.accent,
          }}>รายได้</h4>
          {earnings.map(([l, v]) => (
            <div key={l} style={{
              display: 'flex', alignItems: 'center',
              padding: '7px 0', borderBottom: `1px solid ${WALK.hairlineSoft}`,
            }}>
              <div style={{ fontSize: 12.5 }}>{l}</div>
              <div style={{ flex: 1 }}/>
              <div style={{
                fontFamily: WALK.fontDisplay, fontWeight: 700, fontSize: 13.5,
                fontVariantNumeric: 'tabular-nums',
              }}>฿{v.toLocaleString()}</div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', marginTop: 2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: WALK.accent }}>รวมรายได้</span>
            <div style={{ flex: 1 }}/>
            <span style={{
              fontFamily: WALK.fontDisplay, fontWeight: 700, fontSize: 16,
              color: WALK.accent, fontVariantNumeric: 'tabular-nums',
            }}>฿{(31080).toLocaleString()}</span>
          </div>

          <div style={walkStyles.divider}/>

          <h4 style={{
            fontFamily: WALK.fontDisplay, fontSize: 13, marginBottom: 8,
            fontWeight: 600, color: WALK.warning,
          }}>รายการหัก</h4>
          {deductions.map(([l, v, s]) => (
            <div key={l} style={{
              display: 'flex', alignItems: 'center',
              padding: '7px 0', borderBottom: `1px solid ${WALK.hairlineSoft}`,
            }}>
              <div>
                <div style={{ fontSize: 12.5 }}>{l}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 1 }}>{s}</div>
              </div>
              <div style={{ flex: 1 }}/>
              <div style={{
                fontFamily: WALK.fontDisplay, fontWeight: 700, fontSize: 13.5,
                color: WALK.inkSoft, fontVariantNumeric: 'tabular-nums',
              }}>–฿{v.toLocaleString()}</div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', marginTop: 2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: WALK.warning }}>รวมรายการหัก</span>
            <div style={{ flex: 1 }}/>
            <span style={{
              fontFamily: WALK.fontDisplay, fontWeight: 700, fontSize: 16,
              color: WALK.warning, fontVariantNumeric: 'tabular-nums',
            }}>–฿{(6662).toLocaleString()}</span>
          </div>

          {/* Net pay accent box */}
          <div style={{
            marginTop: 14, padding: 12, background: WALK.accentSoft, borderRadius: 12,
            display: 'flex', alignItems: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>เงินสุทธิที่ได้รับ</div>
            <div style={{ flex: 1 }}/>
            <div style={{
              fontFamily: WALK.fontDisplay, fontSize: 22, fontWeight: 700,
              color: WALK.accent, fontVariantNumeric: 'tabular-nums',
            }}>฿{(24418).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* ── Side: YTD strip + previous payslips ─────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={walkStyles.card(false)}>
          <div style={walkStyles.eyebrow}>สะสมตั้งแต่ต้นปี (YTD)</div>
          <h4 style={{
            fontFamily: WALK.fontDisplay, fontSize: 16, marginTop: 4, fontWeight: 600,
          }}>4 งวด · ม.ค. – เม.ย.</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            {ytd.map(([l, v, c]) => (
              <div key={l} style={{ padding: 10, background: WALK.creamSoft, borderRadius: 10 }}>
                <div style={{ ...walkStyles.eyebrow, fontSize: 9.5 }}>{l}</div>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 17, fontWeight: 700,
                  marginTop: 3, color: c, fontVariantNumeric: 'tabular-nums',
                }}>฿{(v / 1000).toFixed(1)}K</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}` }}>
            <h4 style={{
              fontFamily: WALK.fontDisplay, fontSize: 13.5, fontWeight: 600,
              margin: 0, color: WALK.ink,
            }}>งวดก่อนหน้า</h4>
          </div>
          {[
            ['เม.ย. 68', '24,418', '25 เม.ย. 68', true],
            ['มี.ค. 68', '22,840', '25 มี.ค. 68', false],
            ['ก.พ. 68', '23,120', '25 ก.พ. 68', false],
          ].map(([m, v, d, cur], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px',
              borderBottom: `1px solid ${WALK.hairlineSoft}`,
              background: cur ? WALK.accentSoft : 'transparent',
            }}>
              <div style={{
                width: 28, height: 34, borderRadius: 5,
                background: WALK.warningSoft, color: WALK.warning,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
              }}>📄</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>สลิป {m}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>{d}</div>
              </div>
              <div style={{
                fontFamily: WALK.fontDisplay, fontWeight: 700, fontSize: 13,
                fontVariantNumeric: 'tabular-nums',
              }}>฿{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Y-offsets for employee page (frame-space)
const EMP = {
  header:     { y: WALK.BODY_TOP,       h: 104 },
  earnings:   { y: WALK.BODY_TOP + 118, h: 182 },
  deductions: { y: WALK.BODY_TOP + 314, h: 148 },
  netBox:     { y: WALK.BODY_TOP + 474, h: 56  },
  ytd:        { y: WALK.BODY_TOP,       h: 230 },
};

const EMP_FRAME_H = 680;
const EMP_COMMON = {
  totalSteps: 1,
  persona: 'Employee · มาริสา',
  frameHeight: EMP_FRAME_H,
};

// ══════════════════════════════════════════════════════════════════════
// PERSONA B — Manager team review page mockup
// ══════════════════════════════════════════════════════════════════════
function managerPageMockup() {
  const team = [
    { n: 'ธีรพัฒน์ มงคล',    i: 'ธพ', c: WALK.sage,   b: 32000, ot: 6720, bn: 5000, tag: 'top' },
    { n: 'มาริสา สงวนศักดิ์', i: 'มร', c: WALK.accent, b: 24000, ot: 1080, bn: 3500, tag: null  },
    { n: 'นิภาพร แสนสุข',    i: 'นภ', c: WALK.coral,  b: 24000, ot: 1620, bn: 3500, tag: null  },
    { n: 'อัมพร โพธิ์ทอง',   i: 'อพ', c: WALK.accent, b: 18000, ot: 2160, bn: 2500, tag: 'top' },
    { n: 'ปรีชา วรพงษ์',     i: 'ปว', c: WALK.ink,    b: 14000, ot:    0, bn:    0, tag: 'new' },
  ];
  const bonusProposals = [
    { n: 'ธีรพัฒน์ ม.', i: 'ธพ', c: WALK.sage,   r: 'ยอดขายเกินเป้า 18%',      v: 5000 },
    { n: 'อัมพร พ.',    i: 'อพ', c: WALK.accent, r: 'ลูกค้าให้ 5 ดาว 14 ครั้ง', v: 2500 },
    { n: 'นิภาพร ส.',   i: 'นภ', c: WALK.coral,  r: 'ช่วยทีมข้ามสาขา 6 ครั้ง',  v: 3500 },
  ];

  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1.5fr 1fr' }}>
      {/* ── Team payroll table ───────────────────────────────────── */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '14px 16px',
          borderBottom: `1px solid ${WALK.hairlineSoft}`,
          display: 'flex', alignItems: 'center',
        }}>
          <div>
            <div style={walkStyles.eyebrow}>งวด พ.ค. 2568</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 16 }}>รายชื่อทีม · CTW Floor 1</h3>
          </div>
          <div style={{ flex: 1 }}/>
          <span style={{ display: 'flex', gap: 4 }}>
            {['เดือนนี้', 'ไตรมาส', 'YTD'].map((t, i) => (
              <span key={t} style={{
                padding: '4px 10px', borderRadius: 999,
                fontSize: 10.5, fontWeight: 600,
                background: i === 0 ? WALK.accent : 'transparent',
                color: i === 0 ? '#fff' : WALK.inkSoft,
                border: `1px solid ${i === 0 ? WALK.accent : WALK.hairline}`,
              }}>{t}</span>
            ))}
          </span>
        </div>

        {/* Column header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '32px 1.6fr .9fr .9fr .9fr 1fr 60px',
          padding: '10px 16px', background: WALK.creamSoft,
          borderBottom: `1px solid ${WALK.hairlineSoft}`,
          fontSize: 10, fontWeight: 700, color: WALK.inkMuted,
          letterSpacing: '.06em', textTransform: 'uppercase',
        }}>
          <div/><div>พนักงาน</div>
          <div style={{ textAlign: 'right' }}>ฐาน</div>
          <div style={{ textAlign: 'right' }}>OT</div>
          <div style={{ textAlign: 'right' }}>โบนัส</div>
          <div style={{ textAlign: 'right' }}>รวม</div>
          <div/>
        </div>

        {team.map((m, i) => {
          const tot = m.b + m.ot + m.bn;
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '32px 1.6fr .9fr .9fr .9fr 1fr 60px',
              padding: '10px 16px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
              alignItems: 'center', gap: 4,
            }}>
              <WalkAvatar initials={m.i} color={m.c} size={26}/>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{m.n}</div>
              <div style={{
                textAlign: 'right', fontSize: 12, fontVariantNumeric: 'tabular-nums',
              }}>฿{m.b.toLocaleString()}</div>
              <div style={{
                textAlign: 'right', fontSize: 12,
                color: m.ot > 0 ? WALK.warning : WALK.inkFaint,
                fontVariantNumeric: 'tabular-nums',
              }}>{m.ot > 0 ? '฿' + m.ot.toLocaleString() : '—'}</div>
              <div style={{
                textAlign: 'right', fontSize: 12,
                color: m.bn > 0 ? WALK.accent : WALK.inkFaint,
                fontVariantNumeric: 'tabular-nums',
              }}>{m.bn > 0 ? '฿' + m.bn.toLocaleString() : '—'}</div>
              <div style={{
                textAlign: 'right', fontFamily: WALK.fontDisplay,
                fontWeight: 700, fontSize: 13.5, fontVariantNumeric: 'tabular-nums',
              }}>฿{tot.toLocaleString()}</div>
              <div style={{ textAlign: 'right' }}>
                {m.tag === 'top' && <WalkTag bg={WALK.accent}>★ Top</WalkTag>}
                {m.tag === 'new' && <WalkTag bg={WALK.butterSoft} color={WALK.ink}>ทดลอง</WalkTag>}
              </div>
            </div>
          );
        })}

        {/* Footer totals */}
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '12px 16px', background: WALK.creamSoft,
        }}>
          <span style={{ fontSize: 12.5, color: WALK.inkMuted }}>
            รวม 14 คน · งบคงเหลือ <b style={{ color: WALK.warning }}>฿68,000</b>
          </span>
          <div style={{ flex: 1 }}/>
          <span style={{
            fontFamily: WALK.fontDisplay, fontSize: 17, fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}>฿{(772000).toLocaleString()}</span>
        </div>
      </div>

      {/* ── Bonus proposal queue + deadline countdown ───────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={walkStyles.card(false)}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={walkStyles.eyebrow}>ข้อเสนอโบนัสรอบ Q2</div>
              <h4 style={{
                fontFamily: WALK.fontDisplay, fontSize: 15, fontWeight: 600, marginTop: 4,
              }}>ใช้งบ ฿62K / ฿80K</h4>
            </div>
            <div style={{ flex: 1 }}/>
            <WalkTag bg={WALK.creamSoft} color={WALK.ink}>3 คน</WalkTag>
          </div>
          {bonusProposals.map((b) => (
            <div key={b.n} style={{
              padding: '10px 0',
              borderTop: `1px solid ${WALK.hairlineSoft}`,
              display: 'grid', gridTemplateColumns: '32px 1fr auto',
              gap: 10, alignItems: 'center',
            }}>
              <WalkAvatar initials={b.i} color={b.c} size={32}/>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{b.n}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 1 }}>{b.r}</div>
              </div>
              <div style={{
                fontFamily: WALK.fontDisplay, fontWeight: 700, color: WALK.accent,
                fontVariantNumeric: 'tabular-nums',
              }}>฿{b.v.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Countdown dark card */}
        <div style={{ ...walkStyles.cardDark, overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', width: 80, height: 110, right: -20, top: -30,
            background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
            opacity: 0.4,
          }}/>
          <div style={{ ...walkStyles.eyebrow, color: WALK.accent, position: 'relative' }}>ปิดงวดในอีก</div>
          <h3 style={{
            fontFamily: WALK.fontDisplay, fontSize: 24, fontWeight: 700,
            color: WALK.creamSoft, marginTop: 6, position: 'relative',
          }}>3 วัน 14 ชม.</h3>
          <div style={{
            fontSize: 11.5, color: 'rgba(231,227,216,0.7)', marginTop: 4, position: 'relative',
          }}>ส่งข้อเสนอก่อน 25 พ.ค. 12:00</div>
        </div>
      </div>
    </div>
  );
}

// Y-offsets for manager page (frame-space)
const MGR = {
  table:        { y: WALK.BODY_TOP,       h: 380 },
  tableHeader:  { y: WALK.BODY_TOP,       h: 74  },
  otCol:        { y: WALK.BODY_TOP + 74,  h: 306 },  // OT column approx
  bonusQueue:   { y: WALK.BODY_TOP,       h: 230 },
  countdown:    { y: WALK.BODY_TOP + 244, h: 116 },
  tagCol:       { y: WALK.BODY_TOP + 74,  h: 306 },  // tag column right edge
};

const MGR_FRAME_H = 640;
const MGR_COMMON = {
  totalSteps: 1,
  persona: 'Manager · คุณจงรักษ์',
  frameHeight: MGR_FRAME_H,
};

// ══════════════════════════════════════════════════════════════════════
// PERSONA C — Admin run payroll page mockup
// Contains: pipeline strip + variance table + BU summary + bank batch card
// ══════════════════════════════════════════════════════════════════════
function adminPageMockup() {
  const pipeline = [
    { n: 'รวบรวมเวลา',     done: true },
    { n: 'คำนวณเงิน',       done: true },
    { n: 'ตรวจ Variance',  done: true, warn: true },
    { n: 'อนุมัติสุดท้าย', active: true },
    { n: 'ส่งธนาคาร',     future: true },
    { n: 'ออกสลิป',       future: true },
  ];
  const variances = [
    { sev: 'hi',  n: 'นิภาพร แสนสุข',    delta: '+฿8,420', pct: '+38%', r: 'โบนัส Q1 + OT 22 ชม.' },
    { sev: 'hi',  n: 'วันชัย วชิรา',     delta: '–฿4,200', pct: '–18%', r: 'ขาดงาน 3 วัน · ไม่มีใบลา' },
    { sev: 'mid', n: 'พีรพล ตั้งศิริ',    delta: '+฿6,200', pct: '+28%', r: 'OT 28 ชม. · ตรวจสาเหตุ' },
    { sev: 'mid', n: 'สมศักดิ์ ไทยใจดี', delta: '+฿2,800', pct: '+12%', r: 'ปรับเงินเดือนกลางเดือน' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── Pipeline strip ──────────────────────────────────────── */}
      <div style={walkStyles.card(false)}>
        <div style={{ ...walkStyles.eyebrow, marginBottom: 12 }}>
          ขั้นตอนของรอบจ่าย · พ.ค. 2568 · 2,847 คน · ฿58.4M
        </div>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {pipeline.map((s, i) => (
            <div key={i} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', position: 'relative',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: s.done ? (s.warn ? WALK.warning : WALK.accent)
                           : s.active ? WALK.surface
                           : WALK.creamSoft,
                border: s.active ? `2px solid ${WALK.accent}`
                        : s.future ? `1px solid ${WALK.hairline}`
                        : '0',
                color: s.done ? '#fff'
                       : s.active ? WALK.accent
                       : WALK.inkFaint,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 700,
                zIndex: 1,
              }}>
                {s.done ? (s.warn ? '!' : '✓') : i + 1}
              </div>
              <div style={{
                fontSize: 11.5, fontWeight: 600, marginTop: 7,
                color: s.active ? WALK.accent : s.future ? WALK.inkFaint : WALK.ink,
                textAlign: 'center',
              }}>{s.n}</div>
              {i < 5 && (
                <div style={{
                  position: 'absolute', top: 18, left: '50%', width: '100%', height: 2,
                  background: i < 2 ? WALK.accent : WALK.hairline,
                }}/>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Variance + BU summary row ──────────────────────────── */}
      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1.4fr 1fr' }}>
        {/* Variance alerts table */}
        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '14px 16px',
            borderBottom: `1px solid ${WALK.hairlineSoft}`,
            display: 'flex', alignItems: 'center',
          }}>
            <div>
              <h3 style={{ ...walkStyles.h3Display, fontSize: 15 }}>เคส Variance · ต้องตัดสินใจ</h3>
              <div style={{ fontSize: 11.5, color: WALK.inkMuted, marginTop: 2 }}>
                เปรียบเทียบงวดก่อน · เกิน ±15%
              </div>
            </div>
            <div style={{ flex: 1 }}/>
            <WalkTag bg={WALK.coral}>12 เคส</WalkTag>
          </div>
          {variances.map((v, i) => (
            <div key={i} style={{
              padding: '11px 16px',
              borderBottom: `1px solid ${WALK.hairlineSoft}`,
              display: 'grid', gridTemplateColumns: '30px 1.4fr 1fr 1.6fr',
              gap: 10, alignItems: 'center',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: v.sev === 'hi' ? WALK.dangerSoft : v.sev === 'mid' ? WALK.warningSoft : WALK.creamSoft,
                color: v.sev === 'hi' ? WALK.danger : v.sev === 'mid' ? WALK.warning : WALK.inkSoft,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
              }}>!</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{v.n}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkFaint }}>Chidlom</div>
              </div>
              <div>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 13.5, fontWeight: 700,
                  color: v.delta.startsWith('+') ? WALK.accent : WALK.warning,
                  fontVariantNumeric: 'tabular-nums',
                }}>{v.delta}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted }}>{v.pct} vs เม.ย.</div>
              </div>
              <div style={{ fontSize: 11.5, color: WALK.inkSoft }}>{v.r}</div>
            </div>
          ))}
        </div>

        {/* BU summary */}
        <div style={walkStyles.card(false)}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 15 }}>สรุปตามหน่วยธุรกิจ</h3>
          <div style={{ fontSize: 11.5, color: WALK.inkMuted, marginTop: 2, marginBottom: 12 }}>
            รอบ พ.ค. 2568 · ฿58.4M รวม
          </div>
          {[
            ['Central Pattana',      18.4, 1.0,  WALK.accent],
            ['Central Restaurants',  12.8, 0.70, WALK.sage],
            ['Central Department',    9.6, 0.52, WALK.butter],
            ['Tops Supermarket',      7.8, 0.42, WALK.indigo],
          ].map(([n, m, p, c]) => (
            <div key={n} style={{
              padding: '8px 0', borderBottom: `1px solid ${WALK.hairlineSoft}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ width: 5, height: 18, borderRadius: 3, background: c }}/>
                <div style={{ fontSize: 12.5, fontWeight: 500, marginLeft: 6 }}>{n}</div>
                <div style={{ flex: 1 }}/>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                }}>฿{m}M</div>
              </div>
              <div style={{ height: 3, background: WALK.hairlineSoft, borderRadius: 99, marginLeft: 11 }}>
                <div style={{ width: (p * 100) + '%', height: '100%', background: c, borderRadius: 99 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bank batch file · ink card ──────────────────────────── */}
      <div style={{
        ...walkStyles.cardDark, padding: '16px 20px', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', width: 90, height: 120, right: -30, top: -40,
          background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
          opacity: 0.3,
        }}/>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 10.5, color: WALK.accent, letterSpacing: '.14em',
              textTransform: 'uppercase', fontWeight: 600,
            }}>ไฟล์ที่จะส่งธนาคาร</div>
            <h3 style={{
              fontFamily: WALK.fontDisplay, fontSize: 18, marginTop: 5,
              fontWeight: 600, color: WALK.creamSoft,
            }}>PAYROLL-202505.txt · 2,847 transactions</h3>
            <div style={{ fontSize: 11.5, color: 'rgba(231,227,216,0.7)', marginTop: 5 }}>
              กรุงเทพฯ 1,842 · กสิกร 612 · ไทยพาณิชย์ 393 · รวม ฿{(58418200).toLocaleString()} · โอน 25 พ.ค. 06:00
            </div>
          </div>
          <button style={{ ...walkStyles.btnPrimary, marginLeft: 12 }}>เผยแพร่ · ส่งไฟล์</button>
        </div>
      </div>
    </div>
  );
}

// Y-offsets for admin page (frame-space)
const ADMIN = {
  pipeline:    { y: WALK.BODY_TOP,       h: 102 },
  variance:    { y: WALK.BODY_TOP + 130, h: 230 },
  buSummary:   { y: WALK.BODY_TOP + 130, h: 230 },
  bankBatch:   { y: WALK.BODY_TOP + 376, h: 108 },
};

const ADMIN_FRAME_H = 560;
const ADMIN_COMMON = {
  totalSteps: 2,
  persona: 'HR Admin · ฝ่ายเงินเดือน',
  frameHeight: ADMIN_FRAME_H,
};

// ══════════════════════════════════════════════════════════════════════
// PERSONA D — HRIS tax formula config page mockup
// ══════════════════════════════════════════════════════════════════════
function hrisPageMockup() {
  const earningsConfig = [
    { c: 'BASE',    n: 'เงินเดือนพื้นฐาน',  f: 'BASE_SALARY',                tax: true, st: ''     },
    { c: 'OT15',    n: 'OT × 1.5',          f: 'OT_HRS × (BASE/240) × 1.5',  tax: true, st: ''     },
    { c: 'BONUS_Q', n: 'โบนัสรายไตรมาส',    f: 'PERF × BASE × 0.05',          tax: true, st: 'edit' },
    { c: 'DIL',     n: 'เบี้ยขยันสาขา',     f: 'TABLE_LOOKUP(BRANCH_TIER)',  tax: true, st: 'new'  },
  ];
  const brackets = [
    ['0–150K',  'ยกเว้น', '#E5E5E5',                 WALK.inkSoft],
    ['150–300K','5%',     'rgba(31,168,160,0.18)',   WALK.inkSoft],
    ['300–500K','10%',    'rgba(31,168,160,0.32)',   WALK.inkSoft],
    ['500–750K','15%',    'rgba(31,168,160,0.46)',   WALK.inkSoft],
    ['750K–1M', '20%',    'rgba(31,168,160,0.60)',   WALK.ink],
    ['1–2M',    '25%',    'rgba(31,168,160,0.74)',   '#fff'],
    ['2–5M',    '30%',    'rgba(31,168,160,0.88)',   '#fff'],
    ['5M+',     '35%',    WALK.accent,               '#fff'],
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Earnings config table */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}` }}>
          <div style={walkStyles.eyebrow}>/ คอมโพเนนต์ / รายได้</div>
          <h4 style={{
            margin: '4px 0 0', fontFamily: WALK.fontDisplay,
            fontSize: 14.5, fontWeight: 600,
          }}>Earnings · รายการรายได้ (4/12)</h4>
        </div>

        {/* Column header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '80px 1.2fr 1.5fr 48px',
          padding: '8px 14px', background: WALK.creamSoft,
          borderBottom: `1px solid ${WALK.hairlineSoft}`,
          fontSize: 9.5, fontWeight: 700, color: WALK.inkMuted,
          letterSpacing: '.06em', textTransform: 'uppercase',
        }}>
          <div>Code</div><div>ชื่อ</div><div>สูตร</div><div/>
        </div>

        {earningsConfig.map(r => (
          <div key={r.c} style={{
            display: 'grid', gridTemplateColumns: '80px 1.2fr 1.5fr 48px',
            padding: '10px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
            alignItems: 'center', gap: 6,
          }}>
            <div style={{
              fontFamily: 'ui-monospace, monospace', fontSize: 11,
              fontWeight: 600, color: WALK.accent,
            }}>{r.c}</div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{r.n}</div>
            <div style={{
              fontFamily: 'ui-monospace, monospace', fontSize: 10,
              color: WALK.inkSoft, background: WALK.creamSoft,
              padding: '3px 6px', borderRadius: 4,
              justifySelf: 'start', maxWidth: '100%',
              overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
            }}>{r.f}</div>
            <div style={{ textAlign: 'right' }}>
              {r.st === 'edit' && <WalkTag bg={WALK.butterSoft} color={WALK.ink}>แก้</WalkTag>}
              {r.st === 'new'  && <WalkTag bg={WALK.accent}>ใหม่</WalkTag>}
            </div>
          </div>
        ))}
      </div>

      {/* Tax bracket card */}
      <div style={walkStyles.card(false)}>
        <div style={walkStyles.eyebrow}>/ สูตรภาษี</div>
        <h4 style={{
          margin: '4px 0 10px', fontFamily: WALK.fontDisplay,
          fontSize: 14, fontWeight: 600,
        }}>ภงด.1 หัก ณ ที่จ่าย · ปี 2568 (0–35%)</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3 }}>
          {brackets.map(([r, p, bg, tc], i) => (
            <div key={i} style={{
              padding: '8px 4px', background: bg, borderRadius: 5, textAlign: 'center',
            }}>
              <div style={{ fontSize: 8.5, color: tc, fontWeight: 500 }}>{r}</div>
              <div style={{
                fontFamily: WALK.fontDisplay, fontWeight: 700, fontSize: 12.5,
                marginTop: 1, color: tc,
              }}>{p}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Y-offsets for HRIS page (frame-space)
const HRIS = {
  formulaTable: { y: WALK.BODY_TOP,       h: 228 },
  bracket:      { y: WALK.BODY_TOP + 244, h: 148 },
  newTag:       { y: WALK.BODY_TOP + 156, h: 34  },   // DIL row
};

const HRIS_FRAME_H = 530;
const HRIS_COMMON = {
  totalSteps: 1,
  persona: 'HRIS · Back-office',
  frameHeight: HRIS_FRAME_H,
};

// ══════════════════════════════════════════════════════════════════════
// PERSONA E — SPD reconcile page mockup
// ══════════════════════════════════════════════════════════════════════
function spdPageMockup() {
  const recon = [
    ['8 เม.ย.',  'OT 1 ชม.',                   '1', '1',  0],
    ['15 เม.ย.', 'OT 1 ชม.',                   '1', '1',  0],
    ['27 เม.ย.', 'OT 2 ชม. · อนุมัติย้อนหลัง', '2', '0', -2],
    ['29 เม.ย.', 'OT 2 ชม.',                   '2', '2',  0],
  ];

  return (
    <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
      {/* Claim header */}
      <div style={{
        padding: '12px 14px', background: WALK.creamSoft,
        borderBottom: `1px solid ${WALK.hairlineSoft}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div>
            <div style={walkStyles.eyebrow}>เคส PR-DSP-3201</div>
            <h4 style={{
              margin: '4px 0 0', fontFamily: WALK.fontDisplay,
              fontSize: 14.5, fontWeight: 600,
            }}>OT 2 ชม. หายไป · นิภาพร แสนสุข</h4>
          </div>
          <div style={{ flex: 1 }}/>
          <WalkTag bg={WALK.coral}>SLA 1 วัน</WalkTag>
        </div>
      </div>

      <div style={{ padding: '14px' }}>
        {/* Employee claim quote */}
        <div style={{
          padding: 11, background: WALK.warningSoft, borderRadius: 10,
          borderLeft: `4px solid ${WALK.warning}`, marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <WalkAvatar initials="นภ" color={WALK.ink} size={22}/>
            <span style={{ fontSize: 11.5, fontWeight: 600 }}>คำร้องจากพนักงาน</span>
            <span style={{ fontSize: 10.5, color: WALK.inkMuted }}>· 24 พ.ค.</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.55 }}>
            สลิป เม.ย. OT มี <b>4 ชม.</b> แต่ฉันทำ <b>6 ชม.</b> · มี 2 ชม. ตอน 27 เม.ย. ที่ยังไม่เห็นในสลิป
          </div>
        </div>

        {/* Reconciliation table */}
        <h4 style={{
          margin: '0 0 8px', fontFamily: WALK.fontDisplay,
          fontSize: 12.5, fontWeight: 600,
        }}>กระทบยอด OT · เม.ย. 2568</h4>
        <div style={{ border: `1px solid ${WALK.hairlineSoft}`, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '70px 1fr 50px 60px 70px',
            padding: '7px 10px', background: WALK.creamSoft,
            borderBottom: `1px solid ${WALK.hairlineSoft}`,
            fontSize: 9, fontWeight: 700, color: WALK.inkMuted,
            letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            <div>วันที่</div><div>เหตุการณ์</div>
            <div style={{ textAlign: 'right' }}>TM</div>
            <div style={{ textAlign: 'right' }}>Payroll</div>
            <div style={{ textAlign: 'right' }}>ส่วนต่าง</div>
          </div>
          {recon.map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '70px 1fr 50px 60px 70px',
              padding: '8px 10px', alignItems: 'center', fontSize: 11.5,
              borderBottom: i < recon.length - 1 ? `1px solid ${WALK.hairlineSoft}` : '0',
              background: r[4] !== 0 ? WALK.warningSoft : 'transparent',
            }}>
              <div style={{ fontWeight: 600 }}>{r[0]}</div>
              <div style={{ color: WALK.inkSoft, fontSize: 11 }}>{r[1]}</div>
              <div style={{ textAlign: 'right', fontFamily: 'ui-monospace, monospace' }}>{r[2]} ชม.</div>
              <div style={{ textAlign: 'right', fontFamily: 'ui-monospace, monospace' }}>{r[3]} ชม.</div>
              <div style={{
                textAlign: 'right', fontFamily: WALK.fontDisplay, fontWeight: 700,
                color: r[4] !== 0 ? WALK.warning : WALK.inkFaint,
              }}>{r[4]} ชม.</div>
            </div>
          ))}
        </div>

        {/* Resolution radio */}
        <h4 style={{
          margin: '14px 0 8px', fontFamily: WALK.fontDisplay,
          fontSize: 12.5, fontWeight: 600,
        }}>การแก้ไข</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{
            padding: 11, border: `2px solid ${WALK.accent}`, borderRadius: 9,
            background: WALK.accentSoft,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{
                width: 12, height: 12, borderRadius: '50%',
                border: `3px solid ${WALK.accent}`, background: '#fff',
                boxShadow: `inset 0 0 0 2px ${WALK.accent}`,
              }}/>
              <b style={{ fontSize: 11.5 }}>ปรับเพิ่มในงวด พ.ค.</b>
            </div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginLeft: 18 }}>
              + ฿{(450).toLocaleString()} (OT × 1.5 × 2 ชม.)
            </div>
          </div>
          <div style={{
            padding: 11, border: `1px solid ${WALK.hairline}`, borderRadius: 9,
            background: WALK.surface,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{
                width: 12, height: 12, borderRadius: '50%',
                border: `1px solid ${WALK.hairline}`, background: '#fff',
              }}/>
              <b style={{ fontSize: 11.5 }}>ออกสลิปเสริมงวด เม.ย.</b>
            </div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginLeft: 18 }}>
              ต้องอนุมัติ Admin · 3–5 วัน
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Y-offsets for SPD page (frame-space)
const SPD = {
  claimHeader: { y: WALK.BODY_TOP,       h: 70  },
  quote:       { y: WALK.BODY_TOP + 84,  h: 90  },
  reconTable:  { y: WALK.BODY_TOP + 188, h: 162 },
  diffRow:     { y: WALK.BODY_TOP + 286, h: 38  },  // 27 เม.ย. row
  resolution:  { y: WALK.BODY_TOP + 370, h: 100 },
};

const SPD_FRAME_H = 560;
const SPD_COMMON = {
  totalSteps: 1,
  persona: 'SPD · Back-office',
  frameHeight: SPD_FRAME_H,
};

// ═══════════════════════════════════════════════════════════════════
// Sub-section EMPLOYEE — Frame 1
// Spotlight: dark header (net pay) + earnings/deductions + YTD
// ═══════════════════════════════════════════════════════════════════
function PayrollWalkEmp1() {
  return (
    <WalkFrame
      {...EMP_COMMON}
      stepIdx={1}
      title="สลิปเงินเดือน · ตอบ 2 คำถามใน 5 วินาที"
      narrative="พนักงานเปิดสลิปต้องตอบ 'ได้เท่าไหร่' และ 'ทำไมถึงไม่เท่ากับเดือนก่อน' Net pay เด่นใน header สีเข้ม, รายได้/หักแยกสีชัด, YTD strip ตอบคำถามภาษีปลายปีโดยไม่ต้องขอ HR"
      mockup={empPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX,                          y: EMP.header.y,     w: 556, h: EMP.header.h,    color: WALK.ink    },
        { num: 2, x: SPOTX,                          y: EMP.earnings.y,   w: 556, h: EMP.earnings.h,   color: WALK.accent },
        { num: 3, x: SPOTX,                          y: EMP.deductions.y, w: 556, h: EMP.deductions.h, color: WALK.warning },
        { num: 4, x: WALK.MOCKUP_X + 574,            y: EMP.ytd.y,        w: 298, h: EMP.ytd.h,        color: WALK.sage   },
      ]}
      annotations={[
        { num: 1, title: 'Net pay เด่นใน dark header',
          body: '฿24,418 ใหญ่ที่สุดในหน้า + period + bank tail (••3401) — ตอบ "ได้เท่าไหร่ เข้าบัญชีไหน" ใน 1 วินาที ก่อนอ่าน breakdown; ink bg ตัดกับ cream surface แจ้งเตือนสายตาโดยไม่ต้อง banner',
          color: WALK.ink },
        { num: 2, title: 'รายได้ · teal = บวกเข้า',
          body: 'ทุก earning แยกบรรทัด (ฐาน/ค่าครองชีพ/OT/โบนัส) + subtotal teal — พนักงานเข้าใจที่มาของตัวเลขโดยไม่ต้องโทรหา HR; แทน "รวมรายได้" ตัวเดียวที่ไม่มี breakdown',
          color: WALK.accent },
        { num: 3, title: 'รายการหัก · warning = หักออก',
          body: 'ภงด.1 / ประกันสังคม / PVD แยกบรรทัด + sub-label สั้น ("5% สูงสุด · บริษัทสมทบ 4%") — อธิบาย formula inline แทน FAQ; –฿ prefix ชัดเจนไม่ต้องตีความว่าหักหรือบวก',
          color: WALK.warning },
        { num: 4, title: 'YTD strip · self-service ภาษี',
          body: 'รายได้/ภาษี/SS/PVD สะสมตั้งแต่ต้นปีในรูป K format — พนักงานเช็คตัวเลขยื่น ภงด.91 เองได้ทุกเดือน แทนการขอจาก HR ปลายปี; 4-cell grid scannable ใน 1 วินาที',
          color: WALK.sage },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section MANAGER — Frame 1
// Spotlight: team table columns + bonus queue + deadline card
// ═══════════════════════════════════════════════════════════════════
function PayrollWalkManager1() {
  return (
    <WalkFrame
      {...MGR_COMMON}
      stepIdx={1}
      title="ทีม · เห็น variance + เสนอโบนัสก่อนงวดปิด"
      narrative="Manager ไม่ต้องรู้สูตร — แค่ต้องเห็นว่าใครได้เท่าไหร่ และเสนอโบนัสได้ก่อน Admin ปิดงวด ตารางแยกคอลัมน์ ฐาน/OT/โบนัส ให้จับ outlier ใน 1 แถว; deadline card dark บังคับ urgency"
      mockup={managerPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX,                          y: MGR.table.y,      w: 554, h: MGR.table.h,      color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 570,            y: MGR.bonusQueue.y, w: 302, h: MGR.bonusQueue.h,  color: WALK.butter },
        { num: 3, x: WALK.MOCKUP_X + 570,            y: MGR.countdown.y,  w: 302, h: MGR.countdown.h,   color: WALK.ink    },
      ]}
      annotations={[
        { num: 1, title: 'ฐาน · OT · โบนัส แยกคอลัมน์',
          body: 'แทนการแสดงแค่ "รวม" — Manager เห็น breakdown ทันที (OT warning, โบนัส accent) จับ outlier ก่อนเข้า detail; "★ Top" / "ทดลอง" tag ช่วยตัดสินใจตาม context ไม่ใช่ตัวเลขล้วน "—" แทน 0 ลด noise',
          color: WALK.accent },
        { num: 2, title: 'Bonus proposal · justification บังคับ',
          body: 'แต่ละข้อเสนอมีเหตุผล (ยอดขายเกินเป้า 18% · ลูกค้า 5 ดาว 14 ครั้ง) — Manager เขียนตั้งแต่ stage propose ทำให้ Admin/Director อนุมัติได้เร็ว; แทนการส่ง chat แล้วรอถามเหตุผลทีหลัง',
          color: WALK.butter },
        { num: 3, title: 'Dark countdown · visual interrupt',
          body: 'ink card ตัดกับ cream surface อื่น = สัญญาณ "ต้องทำตอนนี้"; "3 วัน 14 ชม." display font — Manager เห็นแล้วรู้ว่าต้องส่งวันนี้ ไม่ใช่พรุ่งนี้; แทน due-date label เล็กที่ถูกมองข้าม',
          color: WALK.ink },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section ADMIN — Frame 1
// Spotlight: pipeline strip + variance severity
// ═══════════════════════════════════════════════════════════════════
function PayrollWalkAdmin1() {
  return (
    <WalkFrame
      {...ADMIN_COMMON}
      stepIdx={1}
      title="Run Payroll · pipeline 6 ขั้น + variance ±15%"
      narrative="Admin จ่ายเงิน 2,847 คนเดือนละครั้ง — pipeline แสดง stage ที่ยังค้าง, variance ±15% เป็น hard rule บังคับให้ตรวจก่อนปุ่ม 'ส่งธนาคาร' กด; ยอดผิดต้องสะดุดตา ไม่ใช่ซ่อนในตาราง"
      mockup={adminPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX,               y: ADMIN.pipeline.y,  w: SPOTW, h: ADMIN.pipeline.h,  color: WALK.accent  },
        { num: 2, x: SPOTX,               y: ADMIN.variance.y,  w: 516,   h: ADMIN.variance.h,   color: WALK.danger  },
        { num: 3, x: WALK.MOCKUP_X + 530, y: ADMIN.buSummary.y, w: 346,   h: ADMIN.buSummary.h,  color: WALK.indigo  },
      ]}
      annotations={[
        { num: 1, title: 'Pipeline 6 ขั้น · stage indicator',
          body: 'Done ใช้ teal ✓ / warn ใช้ butter ! / active ring teal / future hairline grey — Admin เห็น "ติดตรงไหน" (ตอนนี้รออนุมัติ Director) โดยไม่ต้องเปิด audit log; แทน status text ที่ต้องอ่านทีละคอลัมน์',
          color: WALK.accent },
        { num: 2, title: 'Variance ±15% · severity tier สีแดง/butter',
          body: 'แดง (hi) +38%/–18% = hard outlier ต้องตรวจ; butter (mid) +12–28% = ตรวจดู; ทุกแถวมี reason auto-generated (โบนัส Q1 · ขาดงาน 3 วัน) — Admin ไม่ต้องเดา root cause ก่อนตัดสินใจ approve/reject',
          color: WALK.danger },
        { num: 3, title: 'BU summary · "ของใหญ่ที่ไหน" ก่อน approve รวม',
          body: 'Central Pattana 18.4M (32%) ก้อนใหญ่สุด — stack bar color-coded ให้ Admin scan ภาพรวม per BU ก่อนกด approve ทั้งก้อน; แทนตัวเลขรวมเดียวที่ไม่บอกว่า weight กระจุกตัวที่ไหน',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section ADMIN — Frame 2
// Spotlight: bank batch ink card (distinct rationale — final publish)
// ═══════════════════════════════════════════════════════════════════
function PayrollWalkAdmin2() {
  return (
    <WalkFrame
      {...ADMIN_COMMON}
      stepIdx={2}
      title="Bank batch · ตรวจ checksum ก่อนกด 'เผยแพร่'"
      narrative="หลัง variance ผ่าน — Admin ต้องยืนยัน file ที่จะส่งธนาคารจริง ชื่อไฟล์/count/breakdown ตามธนาคาร/วันโอน ปรากฏใน ink card ก่อนปุ่ม 'เผยแพร่ · ส่งไฟล์' ทำให้ตรวจ checksum ได้ใน 5 วินาที"
      mockup={adminPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX,               y: ADMIN.bankBatch.y, w: SPOTW, h: ADMIN.bankBatch.h, color: WALK.ink    },
        { num: 2, x: SPOTX,               y: ADMIN.variance.y,  w: 516,   h: ADMIN.variance.h,  color: WALK.accent },
      ]}
      annotations={[
        { num: 1, title: 'Bank batch card · file ชัด + breakdown ตามธนาคาร',
          body: 'PAYROLL-202505.txt · 2,847 transactions + กรุงเทพฯ 1,842 / กสิกร 612 / ไทยพาณิชย์ 393 — Admin ตรวจ count ว่าครบทุกคนก่อนกด; ink bg = action ที่ไม่ย้อนกลับ ต้องมั่นใจก่อนกด ต่างจาก draft step อื่น',
          color: WALK.ink },
        { num: 2, title: 'Variance resolved ก่อนถึง bank batch',
          body: 'pipeline บังคับให้ผ่านขั้น "อนุมัติสุดท้าย" ก่อน bank batch active — Admin ไม่สามารถส่งไฟล์โดยมี variance ค้างอยู่; กันข้อผิดพลาด "กด publish ก่อน review" ที่เกิดจาก UI ที่ไม่ lock ขั้นตอน',
          color: WALK.accent },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section HRIS — Frame 1
// Spotlight: formula registry + tax bracket gradient
// ═══════════════════════════════════════════════════════════════════
function PayrollWalkHris1() {
  return (
    <WalkFrame
      {...HRIS_COMMON}
      stepIdx={1}
      title="Formula registry · สูตรที่ Admin ใช้ — HRIS เป็นคนดูแล"
      narrative="HRIS ไม่ได้จ่ายเงิน แต่รักษาสูตร — earnings registry + bracket ภงด.1 ที่ถูก reference ทุกงวด formula พร้อม code/expression อ่านได้เอง tag 'แก้/ใหม่' บอก draft ก่อนเผยแพร่จริง"
      mockup={hrisPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: HRIS.formulaTable.y, w: SPOTW, h: HRIS.formulaTable.h, color: WALK.accent },
        { num: 2, x: SPOTX, y: HRIS.bracket.y,      w: SPOTW, h: HRIS.bracket.h,      color: WALK.indigo },
      ]}
      annotations={[
        { num: 1, title: 'Formula registry · code + expression อ่านได้เอง',
          body: 'ทุก earning มี code (BASE/OT15/BONUS_Q) + formula text (OT_HRS × BASE/240 × 1.5) — Admin/Manager อ่านได้เองไม่ต้อง ping HRIS; tag "แก้" (butter) / "ใหม่" (teal) surface draft ก่อนเผยแพร่ แทน change log ที่ต้องเปิด version history',
          color: WALK.accent },
        { num: 2, title: 'Tax bracket · opacity gradient = severity visual',
          body: '8 ช่วง ภงด.1 (ยกเว้น → 35%) ไล่ teal opacity 0→100% — เห็น progressive tax แบบ visual scan โดยไม่ต้องอ่านตัวเลขทุกช่อง; bracket สูง = teal เข้ม = "หักหนัก" สื่อ semantic สีตรงกับ accent system ทั่ว Humi',
          color: WALK.indigo },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sub-section SPD — Frame 1
// Spotlight: employee quote + TM vs Payroll diff row + resolution
// ═══════════════════════════════════════════════════════════════════
function PayrollWalkSpd1() {
  return (
    <WalkFrame
      {...SPD_COMMON}
      stepIdx={1}
      title="Dispute · กระทบยอด TM กับ Payroll หา root cause"
      narrative="หลังจ่ายเงินยังเหลืองาน — SPD รับ dispute จากพนักงาน กระทบยอด Time Management กับ Payroll เพื่อหาแถวที่ต่าง แล้วเลือก resolution ที่เร็วที่สุด (ปรับงวดถัดไป) โดยมี SLA 1 วัน"
      mockup={spdPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: SPD.quote.y,      w: SPOTW, h: SPD.quote.h,      color: WALK.warning },
        { num: 2, x: SPOTX, y: SPD.reconTable.y, w: SPOTW, h: SPD.reconTable.h,  color: WALK.accent  },
        { num: 3, x: SPOTX, y: SPD.diffRow.y,    w: SPOTW, h: SPD.diffRow.h,     color: WALK.coral   },
        { num: 4, x: SPOTX, y: SPD.resolution.y, w: SPOTW, h: SPD.resolution.h,  color: WALK.indigo  },
      ]}
      annotations={[
        { num: 1, title: 'Employee quote = ground truth ก่อน number',
          body: 'คำร้อง "OT 4 ชม. แต่ทำ 6 ชม." ยกมาตรงๆ ใน warning halo — SPD เริ่มจาก claim ก่อน ไม่ใช่จากตัวเลขในระบบ; warm-Thai tone ลด adversarial feel; ink avatar + ชื่อบอกว่าเป็นคำพูดคน ไม่ใช่ error log',
          color: WALK.warning },
        { num: 2, title: 'TM vs Payroll side-by-side',
          body: '4 แถว OT เรียงตามวันที่ — คอลัมน์ TM / Payroll / ส่วนต่าง เปรียบเทียบ source of truth สองระบบในที่เดียว; SPD ไม่ต้องเปิด 2 tab เพื่อ cross-check ด้วยตนเอง',
          color: WALK.accent },
        { num: 3, title: 'Diff row highlight · warning bg = root cause',
          body: '27 เม.ย. –2 ชม. ใช้ warning bg ทันทีที่ส่วนต่าง ≠ 0 — SPD เห็น root cause ก่อนอ่านครบทุกแถว; "อนุมัติย้อนหลัง" ใน event label อธิบาย lag ทำให้ไม่ต้องเปิด audit log แยก',
          color: WALK.coral },
        { num: 4, title: 'Resolution radio · default = เร็วที่สุด',
          body: '"ปรับเพิ่มในงวด พ.ค." selected by default (accent border) เพราะเร็วสุดสำหรับ SLA 1 วัน; "ออกสลิปเสริม เม.ย." ยังอยู่ให้เลือกแต่ระบุว่า "ต้องอนุมัติ Admin 3–5 วัน" — ไม่ซ่อน option แต่ guide สู่ path ที่ดีกว่า',
          color: WALK.indigo },
      ]}
    />
  );
}

// ── Expose all 6 components to window ─────────────────────────────
Object.assign(window, {
  PayrollWalkEmp1,
  PayrollWalkManager1,
  PayrollWalkAdmin1,
  PayrollWalkAdmin2,
  PayrollWalkHris1,
  PayrollWalkSpd1,
});
