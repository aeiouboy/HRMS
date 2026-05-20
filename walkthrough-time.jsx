// walkthrough-time.jsx
// Time Management module Design Walkthrough — 5 personas across 4 frames.
// 4 frames follow the time-management lifecycle:
//   01 ลงเวลา      — Employee · clock-in card + 7-day timesheet + leave balance
//   02 ดูทีม       — Manager  · 7-day team Gantt + shift codes + approval inbox
//   03 ภาพรวม      — HR Admin · 2,847-EE KPI row + branch × hour heatmap + anomaly list
//   04 ตั้งค่า/แก้ไข — HRIS + SPD · shift catalog + OT/leave policy + amendment cross-check
//
// Each mockup is an inline-style replica of mod-time-1/2/3.jsx so this
// overview is robust against changes in the live mockup files.
//
// Time is always 24-hour (08:00, 18:00, 22:00); OT cost uses ฿ symbol.

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · ลงเวลา — Employee clock-in + timesheet + leave balance
// ═══════════════════════════════════════════════════════════════════
function TimeWalk1() {
  // 7-day timesheet rows (most recent first)
  const days = [
    { d: 'อ. 27',  k: '09:00–18:00',  in: '09:02',  brk: '12:00–13:00',  out: '—',     ot: '—',       tot: 'กำลังทำ', active: true },
    { d: 'จ. 26',  k: '09:00–18:00',  in: '08:58',  brk: '12:05–13:00',  out: '19:14', ot: '+1.2 ชม.', tot: '10.2 ชม.' },
    { d: 'อา 25',  k: 'OFF',          in: '—',      brk: '—',            out: '—',     ot: '—',       tot: 'วันหยุด',  off: true },
    { d: 'ส. 24',  k: '09:00–18:00',  in: '09:08',  brk: '12:00–12:55',  out: '18:02', ot: '—',       tot: '8.9 ชม.',  late: true },
    { d: 'ศ. 23',  k: '09:00–18:00',  in: '09:01',  brk: '12:00–13:00',  out: '18:00', ot: '—',       tot: '9.0 ชม.' },
    { d: 'พฤ 22',  k: 'ลาพักร้อน',    in: '—',      brk: '—',            out: '—',     ot: '—',       tot: 'ลา 1 วัน', leave: true },
  ];

  // Leave balance buckets
  const leaves = [
    { l: 'ลาพักร้อน',     used: 4,   total: 12, c: WALK.accent },
    { l: 'ลาป่วย',        used: 2,   total: 30, c: WALK.warning },
    { l: 'ลากิจ',         used: 1.5, total: 5,  c: WALK.indigo },
    { l: 'ลาพักผ่อนสะสม', used: 0,   total: 3,  c: WALK.sage },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── Top row: clock-in card + leave balance grid ─────────── */}
      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1.1fr 1fr' }}>
        {/* Clock-in card with big clock + GPS chip + action row */}
        <div style={{ ...walkStyles.card(false), padding: '16px 18px', minHeight: 230, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', width: 130, height: 160, right: -40, top: -50,
            background: `radial-gradient(circle, ${WALK.accent} 0%, transparent 70%)`,
            opacity: 0.35,
          }}/>
          <div style={{
            position: 'absolute', width: 60, height: 80, right: 90, bottom: -20,
            background: `radial-gradient(circle, ${WALK.butter} 0%, transparent 70%)`,
            opacity: 0.55,
          }}/>

          <div style={walkStyles.eyebrow}>วันอังคาร · 27 พ.ค. 2568</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <div style={{
              fontFamily: WALK.fontDisplay,
              fontSize: 46, fontWeight: 700, letterSpacing: '-0.03em',
              lineHeight: 1, fontVariantNumeric: 'tabular-nums',
            }}>14:32</div>
            <div style={{ fontSize: 14, color: WALK.inkMuted }}>:18</div>
          </div>

          {/* Status chips: in-status + GPS confirmation */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={{
              background: WALK.accentSoft, color: WALK.accent,
              padding: '4px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: WALK.accent }}/>
              เข้างานแล้ว · 09:02
            </span>
            <span style={{
              background: WALK.creamSoft, color: WALK.inkSoft,
              padding: '4px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 600,
              border: `1px solid ${WALK.hairline}`,
            }}>📍 CTW Floor 1 · GPS ตรงพิกัด</span>
          </div>

          {/* Primary action + QR + fingerprint */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button style={{ ...walkStyles.btnPrimary, flex: 1, padding: '10px 14px', fontSize: 13 }}>
              ⏏ ลงเวลาออกงาน
            </button>
            <button style={{ ...walkStyles.btnGhost, width: 38, padding: 0, justifyContent: 'center' }}>▦</button>
            <button style={{ ...walkStyles.btnGhost, width: 38, padding: 0, justifyContent: 'center' }}>☌</button>
          </div>

          {/* Today's time stamps */}
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              ['เข้างาน',   '09:02',       WALK.accent],
              ['พักเที่ยง',  '12:00–13:00', WALK.inkMuted],
              ['ออกตามกะ',  '18:00',       WALK.inkFaint],
            ].map(([l, v, c]) => (
              <div key={l} style={{
                padding: 8, background: 'rgba(255,255,255,0.7)',
                borderRadius: 8, border: `1px solid ${WALK.hairlineSoft}`,
              }}>
                <div style={{ ...walkStyles.eyebrow, fontSize: 9 }}>{l}</div>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 700,
                  marginTop: 2, color: c, fontVariantNumeric: 'tabular-nums',
                }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave balance grid */}
        <div style={{ ...walkStyles.card(false), padding: '16px 18px', minHeight: 230 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={walkStyles.eyebrow}>วันลาคงเหลือ · ปี 2568</div>
              <h3 style={{ ...walkStyles.h3Display, fontSize: 16 }}>วันหยุดของฉัน</h3>
            </div>
            <span style={{ marginLeft: 'auto' }}>
              <WalkTag bg={WALK.accent}>ใช้ได้ 12.5 วัน</WalkTag>
            </span>
          </div>

          {leaves.map(b => {
            const remain = b.total - b.used;
            const pct = b.used / b.total * 100;
            return (
              <div key={b.l} style={{ padding: '8px 0', borderTop: `1px solid ${WALK.hairlineSoft}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: WALK.creamSoft,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: b.c,
                  }}>●</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{b.l}</span>
                  <span style={{ flex: 1 }}/>
                  <span style={{
                    fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}>{remain}</span>
                  <span style={{ fontSize: 11, color: WALK.inkMuted }}>/ {b.total} วัน</span>
                </div>
                <div style={{ height: 4, background: WALK.hairlineSoft, borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: pct + '%', height: '100%', background: b.c, borderRadius: 99 }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom: 7-day timesheet table ───────────────────────── */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '12px 16px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
          display: 'flex', alignItems: 'center',
        }}>
          <div>
            <div style={walkStyles.eyebrow}>เวลาทำงานล่าสุด</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 15 }}>สัปดาห์นี้ · พ.ค. 2568</h3>
          </div>
          <span style={{ flex: 1 }}/>
          {['สัปดาห์', 'เดือน', 'ปี'].map((t, i) => (
            <span key={t} style={{
              padding: '4px 10px', borderRadius: 999,
              fontSize: 10.5, fontWeight: 600,
              background: i === 0 ? WALK.accent : 'transparent',
              color: i === 0 ? '#fff' : WALK.inkSoft,
              border: `1px solid ${i === 0 ? WALK.accent : WALK.hairline}`,
              marginLeft: 4,
            }}>{t}</span>
          ))}
        </div>

        {/* Column header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '70px 1fr 70px 100px 70px 70px 70px',
          padding: '8px 16px', background: WALK.creamSoft,
          borderBottom: `1px solid ${WALK.hairlineSoft}`,
          fontSize: 10, fontWeight: 700, color: WALK.inkMuted,
          letterSpacing: '.06em', textTransform: 'uppercase',
        }}>
          <div>วันที่</div>
          <div>กะ</div>
          <div>เข้า</div>
          <div>พัก</div>
          <div>ออก</div>
          <div>OT</div>
          <div style={{ textAlign: 'right' }}>รวม</div>
        </div>

        {/* Rows */}
        {days.map((d, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '70px 1fr 70px 100px 70px 70px 70px',
            padding: '10px 16px',
            borderBottom: i === days.length - 1 ? 'none' : `1px solid ${WALK.hairlineSoft}`,
            alignItems: 'center',
            background: d.active ? WALK.accentSoft : 'transparent',
            fontVariantNumeric: 'tabular-nums',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{d.d}</div>
            <div style={{ fontSize: 12, color: d.off ? WALK.inkFaint : WALK.inkSoft }}>{d.k}</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: d.late ? WALK.warning : WALK.ink }}>
              {d.in}{d.late && <span style={{ fontSize: 9, marginLeft: 3, color: WALK.warning }}>+8'</span>}
            </div>
            <div style={{ fontSize: 11, color: WALK.inkMuted }}>{d.brk}</div>
            <div style={{ fontSize: 12 }}>{d.out}</div>
            <div style={{ fontSize: 12, color: d.ot !== '—' ? WALK.accent : WALK.inkMuted, fontWeight: d.ot !== '—' ? 600 : 400 }}>{d.ot}</div>
            <div style={{
              textAlign: 'right', fontSize: 12, fontWeight: 600,
              color: d.leave ? WALK.indigo : d.off ? WALK.inkFaint : WALK.ink,
            }}>{d.tot}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Employee · คุณปรีชา"
      title="ลงเวลา · GPS ยืนยัน ลาเห็นยอด ปฏิทินอ่านรวด"
      narrative="พนักงานเปิด Time ตอนเช้าหลัก ๆ เพื่อตอบ 3 คำถาม: 'ลงเวลาแล้วหรือยัง / วันลาเหลือเท่าไร / สัปดาห์นี้ทำไปกี่ชม.' จัด layout ให้ครอบทั้ง 3 ใน scroll เดียว — clock-in ใหญ่ด้านบน, leave balance ขวา, timesheet 7 วันด้านล่าง"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 6,   w: 470, h: 110 },
        { num: 2, x: WALK.MOCKUP_X + 16,  y: WALK.BODY_TOP + 102, w: 200, h: 28, radius: 14 },
        { num: 3, x: WALK.MOCKUP_X + 488, y: WALK.BODY_TOP + 6,   w: 380, h: 230 },
        { num: 4, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 252, w: 862, h: 286 },
      ]}
      annotations={[
        { num: 1, title: 'นาฬิกาใหญ่ + GPS ยืนยันพิกัด',
          body: 'เวลาปัจจุบัน 14:32 ฟอนต์ display 46px อ่านได้แวบเดียว; chip เขียว "เข้างานแล้ว 09:02" + chip "CTW Floor 1 · GPS ตรงพิกัด" ลดข้อสงสัยว่าระบบบันทึกถูกหรือไม่' },
        { num: 2, title: 'Primary action + biometric fallback',
          body: 'ปุ่ม "ลงเวลาออกงาน" teal solid เป็น default path — biometric (QR/fingerprint) เป็น 38px chip ข้างๆ เพราะ sensor พลาดได้ (มือเปียก/แสงน้อย) ปุ่ม manual เป็น safety net ให้ไม่มีพนักงานติดที่ door เพราะอ่าน lay ไม่ติด' },
        { num: 3, title: 'Leave balance · 4 ประเภท · progress bar',
          body: 'พักร้อน/ป่วย/กิจ/สะสม แต่ละก้อนใช้สีคนละ token (teal/warning/indigo/sage) + แท่ง progress ใช้แทนตัวเลขล้วน ทำให้ scan ได้ว่า "เหลือเยอะหรือใกล้หมด" ใน 1 วินาที' },
        { num: 4, title: 'Timesheet 7 วัน · highlight วันนี้',
          body: 'แถววันนี้ background teal-soft + tag "กำลังทำ"; วันที่มาสายขึ้นสีส้ม +8 นาที, OT เป็น teal accent — ใช้สีบอก status แทน column "สถานะ" แยก ลด noise' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · ดูทีม — Manager 7-day Gantt + approval inbox
// ═══════════════════════════════════════════════════════════════════
function TimeWalk2() {
  // 7-day Gantt rows: M = morning shift teal, E = evening shift butter
  const team = [
    { n: 'มาริสา ส.',   r: 'Cashier',        c: WALK.accent,
      days: [{t:'M'}, {t:'M', act:true}, {t:'M'}, {t:'M'}, {t:'E'}, {t:'off'}, {t:'off'}] },
    { n: 'ธีรพัฒน์ ม.', r: 'Senior Cashier', c: WALK.sage,
      days: [{t:'E'}, {t:'E'}, {t:'E'}, {t:'off'}, {t:'M'}, {t:'M'}, {t:'off'}] },
    { n: 'กัลยา ภ.',    r: 'Sales Asst.',    c: WALK.butter,
      days: [{t:'M'}, {t:'sick'}, {t:'M'}, {t:'M'}, {t:'M'}, {t:'off'}, {t:'off'}] },
    { n: 'นิภาพร ส.',   r: 'Cashier',        c: WALK.coral,
      days: [{t:'M'}, {t:'M'}, {t:'vac', l:'พักร้อน'}, {t:'vac'}, {t:'vac'}, {t:'off'}, {t:'off'}] },
    { n: 'อัมพร พ.',    r: 'Sales Asst.',    c: WALK.accent,
      days: [{t:'E'}, {t:'E', ot:true}, {t:'E'}, {t:'E'}, {t:'off'}, {t:'M'}, {t:'M'}] },
  ];
  const headDays = [
    {d:26, w:'จ'}, {d:27, w:'อ', today:true}, {d:28, w:'พ'},
    {d:29, w:'พฤ'}, {d:30, w:'ศ'}, {d:31, w:'ส', we:true}, {d:1, w:'อา', we:true},
  ];
  const approvals = [
    { t: 'OT · พุธ 28 พ.ค.', n: 'อัมพร พ.',  d: '19:00–21:00 (2 ชม.)', r: 'จัดเรียงสต๊อกพิเศษ', c: WALK.butter },
    { t: 'ลาพักร้อน 3 วัน',  n: 'นิภาพร ส.', d: '28–30 พ.ค.',          r: 'ครอบครัวมาเที่ยว',   c: WALK.indigo },
    { t: 'ลาป่วย ย้อนหลัง',  n: 'กัลยา ภ.',  d: '27 พ.ค. (1 วัน)',     r: '+ ใบรับรองแพทย์',   c: WALK.warning },
  ];

  const mockup = (
    <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1.4fr 1fr' }}>
      {/* Team Gantt card */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '12px 16px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
          display: 'flex', alignItems: 'center',
        }}>
          <div>
            <div style={walkStyles.eyebrow}>ตารางทีม</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 15 }}>26 พ.ค. – 1 มิ.ย.</h3>
          </div>
          <span style={{ flex: 1 }}/>
          <span style={{
            background: WALK.accentSoft, color: WALK.accent,
            padding: '3px 9px', borderRadius: 999, fontSize: 10.5, fontWeight: 600,
          }}>12/14 ทำงาน</span>
        </div>

        {/* Date header strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: '130px repeat(7, 1fr)',
          borderBottom: `1px solid ${WALK.hairlineSoft}`, background: WALK.creamSoft,
        }}>
          <div style={{
            padding: '8px 12px', fontSize: 10, fontWeight: 700, color: WALK.inkMuted,
            letterSpacing: '.06em', textTransform: 'uppercase',
          }}>พนักงาน</div>
          {headDays.map(d => (
            <div key={d.d} style={{
              padding: '8px 4px', textAlign: 'center',
              borderLeft: `1px solid ${WALK.hairlineSoft}`,
              background: d.today ? WALK.accentSoft : d.we ? 'rgba(0,0,0,0.02)' : 'transparent',
            }}>
              <div style={{ fontSize: 9, color: WALK.inkMuted, letterSpacing: '.06em' }}>{d.w}</div>
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 1, fontVariantNumeric: 'tabular-nums' }}>{d.d}</div>
            </div>
          ))}
        </div>

        {/* Gantt rows */}
        {team.map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '130px repeat(7, 1fr)',
            borderBottom: i === team.length - 1 ? 'none' : `1px solid ${WALK.hairlineSoft}`,
            minHeight: 48,
          }}>
            <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <WalkAvatar initials={row.n.slice(0, 2)} color={row.c} size={26}/>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 600,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{row.n}</div>
                <div style={{ fontSize: 9.5, color: WALK.inkMuted }}>{row.r}</div>
              </div>
            </div>
            {row.days.map((d, j) => {
              const isToday = j === 1;
              return (
                <div key={j} style={{
                  padding: 5, borderLeft: `1px solid ${WALK.hairlineSoft}`,
                  background: isToday ? 'rgba(31,168,160,0.06)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {(d.t === 'M' || d.t === 'E') && (
                    <div style={{
                      width: '100%', padding: '6px 3px', borderRadius: 5,
                      background: d.t === 'M' ? WALK.accentSoft : WALK.butterSoft,
                      color:      d.t === 'M' ? WALK.accent     : '#6B4E14',
                      fontSize: 10, fontWeight: 600, textAlign: 'center',
                      border: d.act ? `1.5px solid ${WALK.accent}` : '0',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {d.t === 'M' ? 'M 09–18' : 'E 14–22'}
                      {d.ot && <div style={{ fontSize: 9, marginTop: 1, color: WALK.warning, fontWeight: 700 }}>+OT 2h</div>}
                    </div>
                  )}
                  {d.t === 'off'  && <span style={{ fontSize: 10, color: WALK.inkFaint, fontWeight: 600 }}>OFF</span>}
                  {d.t === 'sick' && <div style={{
                    width: '100%', padding: '6px 3px', borderRadius: 5,
                    background: WALK.warningSoft, color: '#6B4E14',
                    fontSize: 10, fontWeight: 600, textAlign: 'center',
                  }}>ป่วย</div>}
                  {d.t === 'vac' && <div style={{
                    width: '100%', padding: '6px 3px', borderRadius: 5,
                    background: WALK.indigoSoft, color: WALK.indigo,
                    fontSize: 10, fontWeight: 600, textAlign: 'center',
                  }}>{d.l || '•••'}</div>}
                </div>
              );
            })}
          </div>
        ))}

        {/* Shift code legend */}
        <div style={{
          padding: '10px 16px', background: WALK.creamSoft, display: 'flex', gap: 14, flexWrap: 'wrap',
          fontSize: 10.5, color: WALK.inkMuted, borderTop: `1px solid ${WALK.hairlineSoft}`,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: WALK.accentSoft }}/> กะเช้า M 09–18
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: WALK.butterSoft }}/> กะบ่าย E 14–22
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: WALK.warningSoft }}/> ป่วย
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: WALK.indigoSoft }}/> พักร้อน
          </span>
        </div>
      </div>

      {/* Approval inbox card */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '12px 16px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
          display: 'flex', alignItems: 'center',
        }}>
          <div>
            <div style={walkStyles.eyebrow}>รออนุมัติ</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 15 }}>3 คำขอ</h3>
          </div>
          <span style={{ flex: 1 }}/>
          <WalkTag bg={WALK.coral}>SLA 24 ชม.</WalkTag>
        </div>

        {approvals.map((req, i) => (
          <div key={i} style={{
            padding: '12px 14px',
            borderBottom: i === approvals.length - 1 ? 'none' : `1px solid ${WALK.hairlineSoft}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{
                width: 28, height: 28, borderRadius: 7,
                background: WALK.creamSoft, color: req.c,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
              }}>●</span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{req.t}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 1 }}>{req.n} · {req.d}</div>
              </div>
            </div>
            <div style={{
              fontSize: 11.5, color: WALK.inkSoft, marginLeft: 38, marginBottom: 8,
              fontStyle: 'italic',
            }}>"{req.r}"</div>
            <div style={{ display: 'flex', gap: 6, marginLeft: 38 }}>
              <button style={{ ...walkStyles.btnGhost, padding: '3px 10px', fontSize: 11 }}>ปฏิเสธ</button>
              <button style={{ ...walkStyles.btnPrimary, padding: '3px 10px', fontSize: 11 }}>อนุมัติ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="Manager · คุณอาทิตย์"
      title="ดูทีม · Gantt 7 วัน อนุมัติแบบ inline"
      narrative="Manager หน้าร้าน 14 คนต้องการเห็น 'กะของใครวันไหน' ในจอเดียว — Gantt 7 วัน × พนักงาน บล็อกสี M/E ทำให้ scan ปัญหากำลังพล (ป่วย/พักร้อน/OT) ได้แวบเดียว; inbox ขวาให้ approve โดยไม่ต้องเปลี่ยนหน้า"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 70,  w: 500, h: 230 },
        { num: 2, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 308, w: 500, h: 36 },
        { num: 3, x: WALK.MOCKUP_X + 524, y: WALK.BODY_TOP + 6,   w: 344, h: 60 },
        { num: 4, x: WALK.MOCKUP_X + 562, y: WALK.BODY_TOP + 226, w: 220, h: 36, radius: 8 },
      ]}
      annotations={[
        { num: 1, title: '7-day Gantt · บล็อกสี M/E',
          body: 'แถวพนักงาน × คอลัมน์วัน · บล็อก "M 09–18" teal-soft / "E 14–22" butter-soft / "ป่วย" warning / "พักร้อน" indigo — ใช้สี token เดียวกับ status แทน text-only ให้อ่านได้เป็น pattern' },
        { num: 2, title: 'Legend อยู่ติดตาราง',
          body: 'อธิบายรหัสกะที่ใช้ในตาราง (M/E + ป่วย + พักร้อน) วางใน footer bar cream — ไม่บังตาราง แต่ก็ไม่ต้องหา; ลด onboarding cost สำหรับผู้จัดการใหม่' },
        { num: 3, title: 'Header tag · 3 ประเภทคำขอ',
          body: 'Inbox จัดกลุ่ม OT/ลา/ลาย้อนหลัง โดย icon + บล็อกสี (butter/indigo/warning) สื่อ urgency ต่างกัน · SLA 24 ชม. coral tag เตือนว่าต้องตัดสินใจในวัน' },
        { num: 4, title: 'Approve/Reject inline',
          body: 'ปุ่ม approve teal + ปฏิเสธ ghost อยู่ในแถวเดียวกัน ไม่ต้องเข้า detail page — เหตุผลการขอแสดงเป็น quote italic เพื่อ humanise (ครอบครัวมาเที่ยว) ก่อนตัดสินใจ' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ภาพรวม — HR Admin 2,847-EE dashboard + heatmap
// ═══════════════════════════════════════════════════════════════════
function TimeWalk3() {
  // KPI cards · 5 metrics
  const kpis = [
    { l: 'ลงเวลาวันนี้', v: '2,418', s: '85% ของกำลังพล',     accent: WALK.accent },
    { l: 'ลา / ขาด',     v: '237',   s: 'ป่วย 142 · กิจ 95' },
    { l: 'มาสาย',        v: '58',    s: '2.0% · ลด 0.4 จาก เม.ย.', accent: WALK.warning },
    { l: 'OT เดือนนี้',   v: '14,820', s: '฿1.82M งบ' },
    { l: 'เคสต้องดู',     v: '62',    s: 'แก้เวลา 38 · ขาดเอกสาร 24', accent: WALK.coral },
  ];

  // Heatmap: branches × hours, values = % attendance, warm palette only
  const branches = [
    { n: 'CTW',      v: [10,98,99,99,90,99,99,99,99,99,94,82] },
    { n: 'Chidlom',  v: [ 8,95,98,99,88,98,99,99,99,98,90,72] },
    { n: 'Embassy',  v: [ 5,90,96,98,85,96,98,98,98,96,84,60] },
    { n: 'Lardprao', v: [12,92,97,98,86,97,98,98,98,97,87,68] },
    { n: 'Bangna',   v: [ 8,86,94,96,82,94,96,96,96,94,80,58] },
    { n: 'Pinklao',  v: [ 6,82,92,95,80,92,95,95,95,92,76,54] },
  ];
  const hours = [8,9,10,11,12,13,14,15,16,17,18,19];

  // Tint a cell based on % attendance — warm palette only (teal scale, not red/green)
  const heatColor = v => v < 30 ? WALK.hairlineSoft
                       : v < 60 ? 'rgba(31,168,160,0.18)'
                       : v < 80 ? 'rgba(31,168,160,0.42)'
                       : v < 95 ? 'rgba(31,168,160,0.72)'
                       :          WALK.accent;

  // Anomalies — sorted by urgency
  const anomalies = [
    { c: WALK.danger,  t: 'นาฬิกาเครื่อง CTW Floor 3 ไม่ส่งข้อมูล', s: '38 คนยังไม่บันทึก · ตั้งแต่ 09:00', a: 'แก้ไข' },
    { c: WALK.warning, t: 'Embassy · ขาดงาน 8 คน (ปกติ ~3)',       s: 'ตรวจกะหรือเหตุการณ์',              a: 'ดู' },
    { c: WALK.butter,  t: 'OT เกินงบ Bangna',                       s: '฿ ใช้ไป 108% ของงบรายเดือน',       a: 'รีวิว' },
    { c: WALK.warning, t: 'พนักงาน 12 คนไม่ลงออกงาน เมื่อวาน',     s: 'ระบบ Auto-out 22:00',              a: 'ตรวจ' },
    { c: WALK.danger,  t: '3 คน เข้างาน > 50 ชม./สัปดาห์',          s: 'ฝ่าฝืน กม.แรงงาน',                  a: 'แจ้ง' },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* KPI row · 5 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {kpis.map(k => (
          <div key={k.l} style={{
            background: WALK.surface,
            border: `1px solid ${WALK.hairline}`, borderRadius: 12,
            padding: '10px 12px', position: 'relative',
            borderLeft: k.accent ? `3px solid ${k.accent}` : `1px solid ${WALK.hairline}`,
          }}>
            <div style={{ ...walkStyles.eyebrow, fontSize: 9 }}>{k.l}</div>
            <div style={{
              fontFamily: WALK.fontDisplay, fontSize: 20, fontWeight: 700,
              marginTop: 4, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              color: k.accent || WALK.ink,
            }}>{k.v}</div>
            <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 4 }}>{k.s}</div>
          </div>
        ))}
      </div>

      {/* Heatmap + anomaly list */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
        {/* Heatmap */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={walkStyles.eyebrow}>การเข้างาน · วันนี้</div>
              <h3 style={{ ...walkStyles.h3Display, fontSize: 15 }}>สาขา × ชั่วโมง</h3>
            </div>
            <span style={{ flex: 1 }}/>
            {['การเข้างาน', 'มาสาย', 'OT'].map((t, i) => (
              <span key={t} style={{
                padding: '3px 8px', borderRadius: 999,
                fontSize: 10, fontWeight: 600,
                background: i === 0 ? WALK.accent : 'transparent',
                color: i === 0 ? '#fff' : WALK.inkSoft,
                border: `1px solid ${i === 0 ? WALK.accent : WALK.hairline}`,
                marginLeft: 3,
              }}>{t}</span>
            ))}
          </div>

          {/* Heatmap grid: branch row × hour col */}
          <div style={{ display: 'grid', gridTemplateColumns: '70px repeat(12, 1fr)', gap: 2 }}>
            <div/>
            {hours.map(h => (
              <div key={h} style={{
                textAlign: 'center', fontSize: 9, color: WALK.inkMuted,
                fontWeight: 600, fontVariantNumeric: 'tabular-nums',
              }}>{String(h).padStart(2, '0')}</div>
            ))}
            {branches.map(row => (
              <React.Fragment key={row.n}>
                <div style={{
                  fontSize: 11, color: WALK.inkSoft, padding: '4px 0',
                  fontWeight: 500, display: 'flex', alignItems: 'center',
                }}>{row.n}</div>
                {row.v.map((v, j) => (
                  <div key={j} style={{
                    height: 26, borderRadius: 3,
                    background: heatColor(v),
                    fontSize: 8.5,
                    color: v >= 80 ? '#fff' : WALK.inkSoft,
                    fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontVariantNumeric: 'tabular-nums',
                  }}>{v}</div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Legend · warm palette scale */}
          <div style={{
            display: 'flex', gap: 10, marginTop: 12, alignItems: 'center',
            fontSize: 10, color: WALK.inkMuted, flexWrap: 'wrap',
          }}>
            <span>การเข้างาน:</span>
            {[
              ['< 30%',  WALK.hairlineSoft],
              ['60%',    'rgba(31,168,160,0.42)'],
              ['80%',    'rgba(31,168,160,0.72)'],
              ['95%+',   WALK.accent],
            ].map(([l, c]) => (
              <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 12, height: 12, background: c, borderRadius: 3 }}/> {l}
              </span>
            ))}
          </div>
        </div>

        {/* Anomaly list */}
        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}` }}>
            <div style={walkStyles.eyebrow}>ความผิดปกติ · วันนี้</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 15 }}>5 รายการ · เรียงความเร่งด่วน</h3>
          </div>
          {anomalies.map((a, i) => (
            <div key={i} style={{
              padding: '10px 14px',
              borderBottom: i === anomalies.length - 1 ? 'none' : `1px solid ${WALK.hairlineSoft}`,
              display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 8, alignItems: 'center',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: a.c === WALK.danger ? WALK.dangerSoft
                          : a.c === WALK.butter ? WALK.butterSoft : WALK.warningSoft,
                color: a.c,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
              }}>!</div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.3 }}>{a.t}</div>
                <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 2 }}>{a.s}</div>
              </div>
              <button style={{
                ...walkStyles.btnGhost, padding: '3px 9px', fontSize: 10.5,
              }}>{a.a}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="HR Admin · คุณจอร์แดน"
      title="ภาพรวม · 2,847 EE × 38 สาขา ใน 3 ก้อน"
      narrative="HR Admin บริหาร 2,847 คน ใน 38 สาขา ไม่สามารถ scan รายคน — จัด 3 ก้อน: KPI row บนสุด (5 ตัวเลขสรุป), heatmap สาขา × ชั่วโมงให้เห็น pattern เชิงพื้นที่/เวลา, anomaly list ขวาเป็น actionable surfaces เรียงตามความเร่งด่วน"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 6,   w: 862, h: 78 },
        { num: 2, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 102, w: 514, h: 280 },
        { num: 3, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 338, w: 514, h: 36 },
        { num: 4, x: WALK.MOCKUP_X + 532, y: WALK.BODY_TOP + 102, w: 336, h: 320 },
      ]}
      annotations={[
        { num: 1, title: 'KPI row · 5 ตัวเลขเดียวจบ',
          body: 'ลงเวลา/ลา/มาสาย/OT/เคสค้าง — ใช้ border-left สี (teal/warning/coral) เป็น severity strip; ฿1.82M งบ OT สื่อต้นทุนตรงไปตรงมาแทนคำว่า "ค่าใช้จ่าย"' },
        { num: 2, title: 'Heatmap สาขา × ชั่วโมง · teal scale',
          body: 'ทั้งกริดใช้ teal scale 5 ระดับ (ไม่ใช้ red/yellow/green) ตาม Humi warm palette — เซลล์เข้มแปลว่า attendance สูง, อ่อนสุดคือเครื่องไม่ส่งข้อมูล สื่อปัญหาเทคนิคไม่ใช่ "พนักงานแย่"' },
        { num: 3, title: 'Legend แถบสีไล่ระดับ',
          body: '4 ระดับ < 30% / 60% / 80% / 95%+ พร้อมตัวอย่างสี — สอน user ให้ "อ่าน" heatmap ได้ในครั้งแรก ลดการเข้าใจผิดว่า cell อ่อน = ปัญหา (อาจเป็นเครื่องเสีย)' },
        { num: 4, title: 'Anomaly list · severity icon + CTA',
          body: 'เรียงตามความเร่งด่วน · danger (กม.แรงงาน) → warning → butter (งบ); ปุ่ม "แก้ไข/ดู/รีวิว/ตรวจ/แจ้ง" คำกริยาที่ระบุ action ชัดเจนแทน "View" ทั่วไป' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ตั้งค่า / แก้ไข — HRIS shift catalog + SPD amendment
// ═══════════════════════════════════════════════════════════════════
function TimeWalk4() {
  // 8-shift catalog (subset shown)
  const shifts = [
    { code: 'M-STD', n: 'กะเช้า · มาตรฐาน',     t: '09:00–18:00 · พัก 12:00–13:00', u: '1,824 คน' },
    { code: 'E-STD', n: 'กะบ่าย · มาตรฐาน',     t: '14:00–22:00 · พัก 18:00–18:30', u: '612 คน' },
    { code: 'N-STD', n: 'กะดึก',                t: '22:00–06:00 · พัก 02:00–03:00', u: '248 คน' },
    { code: 'M-HOL', n: 'กะวันหยุดนักขัตฤกษ์',  t: '10:00–19:00 · OT x1.5',          u: '—', st: 'new' },
  ];

  // OT policy rows
  const otRules = [
    ['OT วันทำงาน · หลังเลิกกะ', 'x 1.5'],
    ['OT วันหยุด · ในกะ',        'x 1.0'],
    ['OT วันหยุด · เกินกะ',      'x 3.0'],
    ['OT สูงสุดต่อสัปดาห์',      '36 ชม.'],
  ];

  // SPD amendment queue (snapshot · 3 cases)
  const queue = [
    { c: 'TX-44219', t: 'ลืมลงออกงาน',      n: 'ปรีชา ว.',    sla: '2 ชม.', urg: true,  active: true },
    { c: 'TX-44215', t: 'ขอจดเวลาย้อนหลัง', n: 'นภัสรา ธ.',   sla: '4 ชม.', urg: false },
    { c: 'TX-44210', t: 'แก้เวลาเข้าผิด',   n: 'สมศักดิ์ ท.', sla: '6 ชม.', urg: false },
  ];

  const mockup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Top row: HRIS shift catalog + OT policy */}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1.3fr 1fr' }}>
        {/* Shift catalog */}
        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}` }}>
            <div style={walkStyles.eyebrow}>HRIS · กะมาตรฐาน</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 14 }}>8 กะใช้งาน · 1 กะใหม่</h3>
          </div>
          {shifts.map(s => (
            <div key={s.code} style={{
              padding: '10px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
              display: 'grid', gridTemplateColumns: '70px 1fr 80px 60px',
              gap: 10, alignItems: 'center',
            }}>
              <div style={{
                fontFamily: 'ui-monospace, monospace', fontSize: 11,
                fontWeight: 600, color: WALK.accent,
              }}>{s.code}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{s.n}</div>
                <div style={{
                  fontSize: 10.5, color: WALK.inkMuted, marginTop: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}>{s.t}</div>
              </div>
              <div style={{ fontSize: 11, color: WALK.inkSoft }}>{s.u}</div>
              <div style={{ textAlign: 'right' }}>
                {s.st === 'new'
                  ? <WalkTag bg={WALK.accent}>ใหม่</WalkTag>
                  : <span style={{ fontSize: 12, color: WALK.inkFaint }}>✎</span>}
              </div>
            </div>
          ))}
        </div>

        {/* OT + leave policy */}
        <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <div style={walkStyles.eyebrow}>นโยบาย OT</div>
              <h3 style={{ ...walkStyles.h3Display, fontSize: 14 }}>คำนวณตาม กม.แรงงาน</h3>
            </div>
            <span style={{ flex: 1 }}/>
            <WalkTag bg={WALK.creamSoft} color={WALK.inkSoft}>มาตรฐาน</WalkTag>
          </div>

          {/* OT rule rows */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            rowGap: 8, columnGap: 10, alignItems: 'center',
          }}>
            {otRules.map(([l, v]) => (
              <React.Fragment key={l}>
                <div style={{ fontSize: 11.5, color: WALK.inkSoft }}>{l}</div>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 700,
                  color: WALK.accent, fontVariantNumeric: 'tabular-nums',
                }}>{v}</div>
              </React.Fragment>
            ))}
          </div>

          <div style={{ height: 1, background: WALK.hairlineSoft, margin: '12px 0' }}/>

          {/* Leave policy */}
          <h4 style={{
            margin: '0 0 8px', fontFamily: WALK.fontDisplay,
            fontSize: 12.5, fontWeight: 600,
          }}>นโยบายลา</h4>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            rowGap: 6, columnGap: 10,
          }}>
            {[
              ['ลาพักร้อน (ปกติ)',   '12 วัน/ปี'],
              ['ลาพักร้อน (5 ปี+)', '15 วัน/ปี'],
              ['ลาคลอดบุตร',         '98 วัน'],
              ['ลากิจส่วนตัว',        '5 วัน/ปี'],
            ].map(([l, v]) => (
              <React.Fragment key={l}>
                <div style={{ fontSize: 11, color: WALK.inkSoft }}>{l}</div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>{v}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: SPD amendment queue + active case cross-check */}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '0.85fr 1.3fr' }}>
        {/* Queue */}
        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}` }}>
            <div style={walkStyles.eyebrow}>SPD · คิวแก้เวลา</div>
            <h3 style={{ ...walkStyles.h3Display, fontSize: 14 }}>38 เคสรอตรวจ</h3>
          </div>
          {queue.map(q => (
            <div key={q.c} style={{
              padding: '10px 12px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
              display: 'grid', gridTemplateColumns: '24px 1fr auto',
              gap: 8, alignItems: 'center',
              background: q.active ? WALK.accentSoft : 'transparent',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: q.active ? WALK.accent
                          : q.urg ? WALK.dangerSoft : WALK.creamSoft,
                color: q.active ? '#fff' : q.urg ? WALK.danger : WALK.inkSoft,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>!</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600 }}>{q.t}</div>
                <div style={{
                  fontSize: 10, color: WALK.inkMuted, marginTop: 1,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{q.n} · {q.c}</div>
              </div>
              <span style={{
                background: q.urg ? WALK.coralSoft : WALK.creamSoft,
                color: q.urg ? WALK.coral : WALK.inkSoft,
                padding: '2px 7px', borderRadius: 999,
                fontSize: 9.5, fontWeight: 600,
              }}>SLA {q.sla}</span>
            </div>
          ))}
        </div>

        {/* Active case · System log vs Request + cross-check */}
        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '10px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
            background: WALK.creamSoft, display: 'flex', alignItems: 'center',
          }}>
            <div>
              <div style={walkStyles.eyebrow}>เคสที่เปิด · TX-44219</div>
              <h3 style={{ ...walkStyles.h3Display, fontSize: 14 }}>ลืมลงออกงาน · ปรีชา ว.</h3>
            </div>
            <span style={{ flex: 1 }}/>
            <WalkTag bg={WALK.coral}>SLA 2 ชม.</WalkTag>
          </div>

          {/* Side-by-side: system log vs employee request */}
          <div style={{
            padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
          }}>
            {/* System log (mono, factual) */}
            <div style={{
              padding: 10, background: WALK.creamSoft, borderRadius: 8,
              border: `1px solid ${WALK.hairlineSoft}`,
            }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9, marginBottom: 6 }}>
                ข้อมูลจากระบบ · 26 พ.ค.
              </div>
              <div style={{
                fontFamily: 'ui-monospace, monospace', fontSize: 10.5,
                lineHeight: 1.6, color: WALK.inkSoft,
              }}>
                <div style={{ color: WALK.accent }}><b>09:58</b> เข้างาน (QR · CTW)</div>
                <div style={{ color: WALK.inkFaint }}>12:01 → 12:58 พัก</div>
                <div style={{ color: WALK.warning }}>! <b>22:00</b> auto-out</div>
                <div style={{
                  marginTop: 6, paddingTop: 6, borderTop: `1px solid ${WALK.hairlineSoft}`,
                  fontSize: 10, color: WALK.inkMuted,
                }}>
                  เวลารวม: <b style={{ color: WALK.ink }}>11.0 ชม.</b>
                </div>
              </div>
            </div>

            {/* Employee request (warm, narrative) */}
            <div style={{ padding: 10, background: WALK.accentSoft, borderRadius: 8 }}>
              <div style={{ ...walkStyles.eyebrow, fontSize: 9, marginBottom: 6 }}>
                คำขอจากพนักงาน
              </div>
              <div style={{ fontSize: 11, lineHeight: 1.5, color: WALK.ink }}>
                ผมลืมลงเวลาออกครับ จริง ๆ ออก <b>18:30</b> ขอแก้ให้ตรงด้วย
              </div>
              <div style={{
                marginTop: 6, fontFamily: 'ui-monospace, monospace',
                fontSize: 10.5, color: WALK.inkSoft, fontVariantNumeric: 'tabular-nums',
              }}>
                <div>เวลาที่ขอ: <b>09:58 → 18:30</b></div>
                <div>ระยะ: <b>8 ชม. 32 นาที</b> (+0.5 OT)</div>
              </div>
            </div>
          </div>

          {/* Cross-reference rows */}
          <div style={{ padding: '0 12px 10px' }}>
            <h4 style={{
              margin: '0 0 6px', fontFamily: WALK.fontDisplay,
              fontSize: 12, fontWeight: 600,
            }}>หลักฐานข้ามระบบ</h4>
            {[
              { l: 'กล้อง POS · CTW Floor 3', v: 'ใบเสร็จ #248 · 18:24',         ok: true },
              { l: 'GPS เครื่องลงเวลา',         v: 'อยู่ในรัศมี 09:55–18:31',     ok: true },
              { l: 'ผู้จัดการรับรอง',           v: 'อาทิตย์ ช. ยืนยัน 18:30',      ok: true },
              { l: 'ขออนุมัติ OT ล่วงหน้า',     v: 'ไม่มี (ฉุกเฉิน 30 นาที)',    ok: false },
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 0',
                borderBottom: i === 3 ? 'none' : `1px solid ${WALK.hairlineSoft}`,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: c.ok ? WALK.accentSoft : WALK.warningSoft,
                  color: c.ok ? WALK.accent : WALK.warning,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, flexShrink: 0,
                }}>{c.ok ? '✓' : '!'}</div>
                <div style={{ fontSize: 10.5, fontWeight: 500, flexShrink: 0 }}>{c.l}</div>
                <div style={{ fontSize: 10, color: WALK.inkMuted, marginLeft: 'auto' }}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HRIS + SPD · จอร์แดน + พิม"
      title="ตั้งค่า + แก้ไข · นโยบาย → คิว → หลักฐาน"
      narrative="HRIS วางกะ 8 แบบ + OT/leave policy ครั้งเดียวให้ใช้ทั้งบริษัท; SPD รับงานเป็นเคสจาก amendment queue 38 เคส · หน้า detail วาง system log (mono · factual) เทียบ employee request (warm · narrative) ข้างกัน + ตรวจ POS/GPS/ผู้จัดการ ก่อนตัดสินใจ"
      mockup={mockup}
      callouts={[
        { num: 1, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 6,   w: 482, h: 220 },
        { num: 2, x: WALK.MOCKUP_X + 502, y: WALK.BODY_TOP + 6,   w: 366, h: 220 },
        { num: 3, x: WALK.MOCKUP_X + 6,   y: WALK.BODY_TOP + 238, w: 320, h: 280 },
        { num: 4, x: WALK.MOCKUP_X + 342, y: WALK.BODY_TOP + 290, w: 526, h: 130 },
      ]}
      annotations={[
        { num: 1, title: 'Shift catalog · code + เวลา + จำนวนใช้งาน',
          body: 'รหัสกะ mono font (M-STD/E-STD/N-STD/M-HOL) ทำให้อ้างถึงในที่อื่นได้ตรงกัน; แสดงจำนวน "1,824 คน" บอก HRIS ว่า change กะนี้กระทบใคร — ลดความผิดพลาดการแก้ policy' },
        { num: 2, title: 'OT/leave policy ในการ์ดเดียว',
          body: 'OT multiplier (x1.5 / x3.0) เรียงจากปกติ → วันหยุด → สูงสุด/สัปดาห์; leave policy ใต้เส้น divider — ทุก rule ที่ payroll ใช้คำนวณอยู่หน้าเดียว แก้แล้ว publish ทันที' },
        { num: 3, title: 'SPD queue · SLA tag เน้น urgency',
          body: 'แต่ละเคสมี ! icon (danger = ใกล้เกิน · neutral = ปกติ) + SLA tag (coral "2 ชม." vs cream "6 ชม.") + เคสที่เปิดอยู่ background teal — SPD ไม่ต้องเดาว่าจะหยิบเคสไหน' },
        { num: 4, title: 'System log เทียบ Request · ข้างกัน',
          body: 'ซ้าย cream + mono = "ระบบบันทึก" / ขวา teal-soft + sans = "คนพูด" · ใต้นั้น POS/GPS/ผจก./pre-approval สี่จุดข้ามระบบ — SPD ตัดสินใจจากหลักฐาน ไม่ใช่อารมณ์' },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { TimeWalk1, TimeWalk2, TimeWalk3, TimeWalk4 });
