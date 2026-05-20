(() => {
// walkthrough-offboard.jsx
// Offboard module Design Walkthrough (Manager + HR Admin personas).
//
// RETROFIT PATTERN (static page + rotating spotlight):
//   offboardPageMockup() renders the entire Offboarding Workspace —
//   Manager approval section (employee header + reason + decision +
//   timeline) stacked above HR Admin clearance KPI strip + 4-tab bar +
//   2 checklist groups, then the final-pay ledger + bank/docs/CTA,
//   ending with the dark "ปิดเคส" hero + letters + farewell post.
//   The same page is reused as the static background of every frame;
//   spotlight rotates between regions.
//
// Frames (the resignation → final-pay arc):
//   01 อนุมัติลาออก   — Manager approval (top of page)
//   02 Clearance      — 4-category checklist (mid-top)
//   03 Final pay      — termination payroll ledger (mid-bottom)
//   04 ปิด record      — exit summary + letters + farewell (bottom)

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═════════════════════════════════════════════════════════════════════
// ── Section 1 · Manager approval (frame 1 target) ─────────────────────
// ═════════════════════════════════════════════════════════════════════
function ManagerApprovalSection() {
  return (
    <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1.4fr 1fr' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Employee header card */}
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

        {/* Reason quote */}
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

        {/* Decision */}
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

      {/* RIGHT timeline + replacement */}
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
                    fontFamily: WALK.fontDisplay, fontSize: 10, fontWeight: 700, zIndex: 1,
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
}

// ═════════════════════════════════════════════════════════════════════
// ── Section 2 · Clearance KPI + tabs + 2 groups (frame 2 target) ──────
// ═════════════════════════════════════════════════════════════════════
function ClearanceSection() {
  const groups = [
    { cat: 'คืนของบริษัท', items: [
      { l: 'Laptop · Dell Latitude 5430', st: 'done',    who: 'IT' },
      { l: 'บัตรพนักงาน + บัตรจอดรถ',     st: 'done',    who: 'Security' },
      { l: 'เครื่องแบบ 3 ชุด + รองเท้า',  st: 'pending', who: 'Store Ops' },
    ]},
    { cat: 'เคลียร์ระบบ + บัญชี', items: [
      { l: 'ลบสิทธิ์ HRMS · Email · Slack', st: 'scheduled', who: 'IT' },
      { l: 'ส่งต่อ task ใน workdesk',       st: 'todo',      who: 'Manager' },
    ]},
  ];
  const ST = {
    done:      { l: 'เสร็จ',      bg: WALK.successSoft, fg: WALK.success, ic: '✓' },
    pending:   { l: 'กำลังทำ',    bg: WALK.warningSoft, fg: '#92660C',    ic: '◐' },
    scheduled: { l: 'ตั้งเวลา',   bg: WALK.accentSoft,  fg: WALK.accent,  ic: '⏱' },
    todo:      { l: 'ยังไม่ทำ',   bg: WALK.creamSoft,   fg: WALK.inkMuted, ic: '○' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* KPI strip */}
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
}

// ═════════════════════════════════════════════════════════════════════
// ── Section 3 · Final pay ledger (frame 3 target) ─────────────────────
// ═════════════════════════════════════════════════════════════════════
function FinalPaySection() {
  const rows = [
    { l: 'เงินเดือนงวด 1–15 พ.ค.',                       v:  12500, k: 'earn'   },
    { l: 'ค่าชดเชยวันลาคงเหลือ × 6 วัน',                  v:   5000, k: 'earn'   },
    { l: 'โบนัส pro-rated (Q2)',                          v:   8500, k: 'earn'   },
    { l: 'กองทุนสำรองเลี้ยงชีพ (พนักงาน + บริษัท)',         v:  18840, k: 'earn'   },
    { l: 'หัก ภงด.91',                                    v:  -1200, k: 'deduct' },
    { l: 'หัก ประกันสังคม',                                v:   -750, k: 'deduct' },
  ];
  const total = rows.reduce((s, r) => s + r.v, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
      {/* LEFT · ledger */}
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

      {/* RIGHT · bank + docs + CTA */}
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
}

// ═════════════════════════════════════════════════════════════════════
// ── Section 4 · Exit summary + letters + farewell (frame 4 target) ────
// ═════════════════════════════════════════════════════════════════════
function ExitSummarySection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Dark hero */}
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
        <div style={{ ...walkStyles.card(false), padding: '14px 18px' }}>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 13, margin: '0 0 10px' }}>เอกสาร · จดหมาย</h3>
          {[
            { t: 'หนังสือรับรองการทำงาน (TH)', date: 'ส่งแล้ว 15 พ.ค.' },
            { t: 'Certificate of Employment (EN)', date: 'ส่งแล้ว 15 พ.ค.' },
            { t: 'หนังสือรับรองเงินเดือนสุดท้าย', date: 'ส่งแล้ว 15 พ.ค.' },
            { t: 'จดหมายขอบคุณจากผู้บริหาร', date: 'ส่งแล้ว 14 พ.ค.' },
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
}

// ── Shared full-page mockup ───────────────────────────────────────────
function offboardPageMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <ManagerApprovalSection/>
      <ClearanceSection/>
      <FinalPaySection/>
      <ExitSummarySection/>
    </div>
  );
}

// ── Regions (frame-space) ─────────────────────────────────────────────
const SPOTX = WALK.MOCKUP_X - 4;
const SPOTW = WALK.MOCKUP_W + 8;
const REGIONS = {
  approval:  { y: WALK.BODY_TOP - 4,    h: 348 },  // manager approval section
  clearance: { y: WALK.BODY_TOP + 362,  h: 504 },  // KPI + tabs + 2 lists
  finalPay:  { y: WALK.BODY_TOP + 880,  h: 388 },  // ledger + bank + docs + CTA
  exit:      { y: WALK.BODY_TOP + 1286, h: 366 },  // dark hero + letters + farewell
};
const OFFBOARD_FRAME_H = 1820;
const COMMON = {
  totalSteps: 4,
  persona: 'Manager · HR Admin',
  frameHeight: OFFBOARD_FRAME_H,
};

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · อนุมัติลาออก — Manager approval
// ═══════════════════════════════════════════════════════════════════
function OffboardWalk1() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={1}
      persona="Manager · คุณจงรักษ์"
      title="อนุมัติลาออก · ข้อมูลครบใน 1 หน้า"
      narrative="Resignation ไม่ใช่แค่ approve/reject — Manager ต้องรู้บริบท (tenure · เหตุผล · timeline) + เริ่มคิดแผนทดแทนทันที. จัด 2 column ให้ตัดสินใจและวางแผนพร้อมกัน"
      mockup={offboardPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.approval.y,        w: 520, h: 88,  color: WALK.accent },
        { num: 2, x: SPOTX, y: REGIONS.approval.y + 142,  w: 520, h: 78,  color: WALK.coral },
        { num: 3, x: WALK.MOCKUP_X + 540, y: REGIONS.approval.y, w: 340, h: 340, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'Employee header + tenure metric strip',
          body: 'ทำไม tenure อยู่ใน metric strip ไม่ใช่ใต้ชื่อ? เพราะ tenure เป็นข้อมูลตัดสินใจ — 2 ปี 4 เดือนต่างกันมากจาก 2 เดือน. ใส่ใน 4-up metric grid (ส่งคำขอ · วันสุดท้าย · แจ้งล่วงหน้า · วันลาเหลือ) ที่ Manager scan ได้ในแถวเดียว. "วันสุดท้าย" ใช้ accent เน้นเพราะเป็น anchor วันที่ทั้ง workflow ผูกกับเลขนี้.',
          color: WALK.accent },
        { num: 2, title: 'Reason quote · italic + teal bar ไม่ใช่ tag',
          body: 'ทำไมไม่แสดงเป็น dropdown tag ("Career growth")? เพราะข้อความจริงของพนักงานสำคัญต่อ tone การตอบกลับ + การส่งต่อ HR. category tag อยู่ขวาบนเพื่อ classify; quote ใน italic + creamSoft + borderLeft teal เน้นว่านี่คือ "เสียงพนักงาน" ไม่ใช่ system label.',
          color: WALK.coral },
        { num: 3, title: 'Sticky timeline + แผนทดแทน คู่กัน',
          body: 'ทำไม timeline อยู่ตั้งแต่ frame นี้แทนที่จะรอ HR? เพราะ Manager จะกล้า approve กว่าเมื่อเห็น handoff path ชัด — "ลาออก ≠ หายไป". cream variant แยกจาก action area. "แผนทดแทน" 2 ปุ่ม (Job Req + โอนย้ายภายใน) ให้ Manager เริ่ม think replacement ตั้งแต่กดอนุมัติ — ไม่ต้องรอ 30 วัน.',
          color: WALK.butter },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · Clearance — 4-category checklist
// ═══════════════════════════════════════════════════════════════════
function OffboardWalk2() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={2}
      persona="HR Admin · คุณนัฐญา"
      title="Clearance · เปลี่ยน checklist เป็น workflow"
      narrative="Offboarding มี 13 งานกระจาย 4 ทีม (IT · Security · Payroll · HR) — แสดง progress รวม + KPI urgency แล้วแยกตามหมวด พร้อม owner ทุกแถวเพื่อ accountability ชัด"
      mockup={offboardPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.clearance.y,        w: SPOTW, h: 84,  color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 470, y: REGIONS.clearance.y, w: 400, h: 84, color: WALK.danger },
        { num: 3, x: SPOTX, y: REGIONS.clearance.y + 100,  w: SPOTW, h: 38,  color: WALK.coral },
        { num: 4, x: SPOTX, y: REGIONS.clearance.y + 160,  w: SPOTW, h: 340, color: WALK.sage },
      ]}
      annotations={[
        { num: 1, title: 'Progress big-number + bar + count',
          body: 'ทำไมไม่แค่ % หรือแค่ bar? เพราะ HR Admin ต้อง report Manager ทุกวันต้องการตัวเลขจริง ("3/13"), ขณะที่ visual bar ให้สแกนความคืบหน้าได้ทันที. รวมทั้ง 2 ใน tile เดียว = ไม่ต้องเลือก mode ระหว่าง visual กับ exact number.',
          color: WALK.accent },
        { num: 2, title: 'KPI urgency · danger เฉพาะเวลา',
          body: 'ทำไมงานคงค้าง = warning amber แต่วันที่เหลือ = danger red? เพราะ "งาน" แก้ได้ (รับคน · เร่ง task), แต่ "วันที่เหลือ" เป็น hard deadline แก้ไม่ได้. สี = ระดับ recoverability, ไม่ใช่แค่ตกแต่ง. เงินสุดท้าย neutral เพราะเป็น info ไม่ใช่ alert.',
          color: WALK.danger },
        { num: 3, title: 'Tab + content preview badge',
          body: 'ทำไม tab ต้องมี badge content? เพราะ HR Admin switch tab บ่อย — badge ("3/13 · ฿42,840 · 2 · ส่งแล้ว") preview state ก่อนคลิก ลด blind navigation. badge บนสุดของแต่ละ tab = "อะไรอยู่ในนี้", ไม่ใช่แค่ "เปิด/ปิด".',
          color: WALK.coral },
        { num: 4, title: 'Owner chip ทุกแถว · ไม่ใช่ HR คนเดียวทำ',
          body: 'ทำไมต้องโชว์ owner inline? เพราะ clearance ไม่ใช่ HR ทำทุกอย่าง — IT · Security · Store Ops · Manager แต่ละทีมรับผิดชอบ task ที่ skill match. owner chip cream เป็น quick reference; HR scan ดูว่า task ค้างอยู่ทีมไหน → ตามทีมตรง ไม่ต้องตามเอง.',
          color: WALK.sage },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · Final pay — termination payroll
// ═══════════════════════════════════════════════════════════════════
function OffboardWalk3() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={3}
      persona="HR Admin · คุณนัฐญา"
      title="Final pay · ทุกบาทมีที่มา"
      narrative="Final pay ของคนลาออกซับซ้อนกว่าเงินเดือนปกติ — มีค่าชดเชยลา + PF + tax true-up + หักประกันสังคม. จัดเป็น line-item ledger ให้ตรวจสอบและ defend ต่อพนักงานได้"
      mockup={offboardPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.finalPay.y + 64,   w: 510, h: 156, color: WALK.accent },
        { num: 2, x: WALK.MOCKUP_X + 380, y: REGIONS.finalPay.y + 158, w: 130, h: 62, color: WALK.danger },
        { num: 3, x: SPOTX, y: REGIONS.finalPay.y + 226,  w: 510, h: 56,  color: WALK.success },
        { num: 4, x: WALK.MOCKUP_X + 530, y: REGIONS.finalPay.y + 120,  w: 340, h: 240, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'Earn lines แยก 4 แหล่งที่มา',
          body: 'ทำไมไม่รวมเป็น "gross"? เพราะถ้าพนักงานถามว่า "฿18,840 มาจากไหน" Admin ต้องตอบทันที. แยก 4 รายการ (เงินเดือน · ค่าชดเชยลา · โบนัส pro-rated · PF) ตามแหล่งกฎหมาย — ไม่ใช่แค่ผลรวม. label ระบุ basis ("× 6 วัน", "Q2", "พนักงาน + บริษัท") = self-documenting.',
          color: WALK.accent },
        { num: 2, title: 'Deduction = red minus · ไม่แยก column',
          body: 'ทำไมไม่ใช้ 2-column table (earn | deduct)? เพราะ chronological order สำคัญ — earn สูง → deduct ต่ำเป็นลำดับ math ที่อ่านง่าย. "-฿1,200" สี danger ใช้ขั้ว visual ตรงกับขั้ว math; - sign ซ้ำกับ red color = redundant แต่จงใจกัน color-blind miss.',
          color: WALK.danger },
        { num: 3, title: 'Total ใน accent strip · payslip pattern',
          body: 'ทำไม total ไม่ bold ที่ row สุดท้าย? เพราะ "หมุดสำคัญ" ต้องมี visual weight ต่างจาก rows. teal-soft bg + font size 20 (vs 14 ใน rows) = scan แล้วเจอทันที. pattern เดียวกับ payslip ปกติของ Humi — consistency ข้าม module ทำให้พนักงานเดาได้ว่า "เลขสำคัญอยู่ตรงนี้".',
          color: WALK.success },
        { num: 4, title: 'Right rail = "หลังจ่ายแล้วทำอะไรต่อ"',
          body: 'ทำไม bank + docs + CTA อยู่ใน column ขวา? เพราะเป็น sequence ที่ผูกกัน — เห็น bank ก่อนกด send. 3 เอกสาร (ภงด.91 · สปส.6-09 · กสล.) เป็น compliance requirement ตามกฎหมายแรงงาน — แต่ละ deadline ระบุ inline ไม่ซ่อนใน docs. ปุ่ม "ส่งให้ Payroll" ใหญ่ล่างสุดเป็น final step ของ sequence.',
          color: WALK.butter },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · ปิด record — exit summary + reference + farewell
// ═══════════════════════════════════════════════════════════════════
function OffboardWalk4() {
  return (
    <WalkFrame
      {...COMMON}
      stepIdx={4}
      persona="HR Admin · คุณนัฐญา"
      title="ปิด record · จบแบบไม่ตัดขาด"
      narrative="วันสุดท้ายไม่ใช่จุดจบ — HR Admin ต้องการ summary ว่าทุกอย่างปิดครบ + ระบบช่วย humanise การจากไป (จดหมาย · post อำลา · alumni track) เพื่อรักษา relationship สำหรับ boomerang hire"
      mockup={offboardPageMockup()}
      dim
      callouts={[
        { num: 1, x: SPOTX, y: REGIONS.exit.y,        w: SPOTW, h: 128, color: WALK.ink },
        { num: 2, x: SPOTX, y: REGIONS.exit.y + 142,  w: 425, h: 200, color: WALK.success },
        { num: 3, x: WALK.MOCKUP_X + 447, y: REGIONS.exit.y + 280, w: 423, h: 76, color: WALK.coral },
      ]}
      annotations={[
        { num: 1, title: 'Dark hero · ceremonial closing',
          body: 'ทำไม dark ink พื้นหลัง? เพราะเปลี่ยน mood จาก operational (frames 2-3 ขาว/cream) เป็น ceremonial. dark = "complete + ปิด record". 3 summary metric (Clearance 13/13 · Final pay โอนแล้ว · Interview 6/6) สรุปผลของ 3 frames ก่อนหน้าใน 1 บรรทัด — lower cognitive load หลังเสร็จงาน.',
          color: WALK.ink },
        { num: 2, title: 'จดหมาย 4 ฉบับ · all green ✓',
          body: 'ทำไมต้องโชว์เอกสาร list หลังจ่ายเงินแล้ว? เพราะกฎหมายแรงงาน + compliance — HR ต้องพิสูจน์ได้ว่าส่งครบ. ทั้ง 4 ฉบับ (รับรองงาน TH/EN · เงินเดือนสุดท้าย · ขอบคุณจากผู้บริหาร) เป็นชุดมาตรฐาน. status pill success green ทุกอัน = visual audit trail พร้อมโดน inspect.',
          color: WALK.success },
        { num: 3, title: 'Alumni network · dashed = optional bridge',
          body: 'ทำไม dashed border ไม่ใช่ solid? เพราะ Alumni ไม่ใช่ required output ของ workflow — เป็น "ทางเลือก" ที่ Humi warm philosophy เปิดไว้สำหรับ boomerang hire. ใช้ teal dashed สื่อ "เปิดประตูไว้" แทน solid ที่จะดูเป็น mandatory step. แยก visual จาก farewell post solid ด้านบน.',
          color: WALK.coral },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { OffboardWalk1, OffboardWalk2, OffboardWalk3, OffboardWalk4 });

})();
