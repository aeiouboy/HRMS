// walkthrough-lifecycle.jsx
// Lifecycle module Design Walkthrough (Transfer + Onboarding + Confirmation).
//
// RETROFIT PATTERN (static page + rotating spotlight · OPTION C split):
//   Lifecycle covers 4 separate production screens. Stacking all 4
//   into one mockup pushes past 2400px and obscures the spotlight
//   pattern. We split into 2 sub-section mockups:
//     • Frames 1 + 2 share lifecycleTransferPageMockup() — Manager
//       review (KPI + diff + reason + decision + timeline) stacked
//       above the HR Admin checklist (KPI + tabs + 4 lanes).
//     • Frames 3 + 4 share lifecycleOnboardConfirmPageMockup() —
//       Onboarding hero + Day-1 expanded + future phases + resources
//       stacked above the Confirm screen (snapshot + rating grid +
//       benefit diff + letter preview).
//
// Frames (the close-the-loop arc):
//   01 คำขอโอนย้าย       — Manager review (Transfer page · top half)
//   02 ลงมือย้าย          — HR Admin 4-lane checklist (Transfer page · bottom)
//   03 ต้อนรับวันแรก     — Onboarding Day-1 → 90 (Onboard/Confirm · top)
//   04 บรรจุพนักงาน      — Confirmation + letter (Onboard/Confirm · bottom)

const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ═════════════════════════════════════════════════════════════════════
// ── Page 1 · Transfer (frames 1 + 2 share this) ───────────────────────
// ═════════════════════════════════════════════════════════════════════

// ── Transfer · Manager review section (frame 1 target) ────────────────
function TransferManagerReview() {
  return (
    <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1.55fr 1fr' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Employee header + KPI strip */}
        <div style={{ ...walkStyles.card(false), padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: `linear-gradient(135deg, ${WALK.accent}, ${WALK.sage})`,
              color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: WALK.fontDisplay, fontSize: 18, fontWeight: 700,
            }}>PJ</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: WALK.fontDisplay, fontSize: 17, fontWeight: 600,
                color: WALK.ink, letterSpacing: '-0.01em',
              }}>พิมพา จันทร์ฉาย <span style={{ color: WALK.inkMuted, fontWeight: 500 }}>· Pimpa J.</span></div>
              <div style={{ fontSize: 11.5, color: WALK.inkMuted, marginTop: 3 }}>Cashier · Central Ladprao · ทำงานมา 1 ปี 8 เดือน</div>
            </div>
            <span style={{ fontSize: 11.5, color: WALK.accent, fontWeight: 600 }}>ดูโปรไฟล์ →</span>
          </div>
          <div style={{
            marginTop: 12, padding: '10px 12px', background: WALK.creamSoft,
            borderRadius: 10, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
          }}>
            {[
              { l: 'ส่งคำขอ',         v: '12 พ.ค.',  sub: '2 วันก่อน' },
              { l: 'ขอย้าย',          v: '1 มิ.ย.',   sub: 'ตามคำขอ',     accent: true },
              { l: 'แจ้งล่วงหน้า',     v: '20 วัน',    sub: '≥ 14 ✓' },
              { l: 'งานคงค้าง',        v: '0',         sub: 'ส่งมอบครบ' },
            ].map(m => (
              <div key={m.l} style={{ lineHeight: 1.25 }}>
                <div style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: WALK.inkMuted, fontWeight: 600 }}>{m.l}</div>
                <div style={{
                  fontFamily: WALK.fontDisplay, fontSize: 14, fontWeight: 600, marginTop: 3,
                  color: m.accent ? WALK.accent : WALK.ink,
                }}>{m.v}</div>
                <div style={{ fontSize: 9.5, color: WALK.inkMuted, marginTop: 1 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Branch from → to comparison */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ ...walkStyles.eyebrow, marginBottom: 2 }}>การเปลี่ยนแปลง</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 14, margin: '2px 0 10px' }}>จากสาขาเดิม → สาขาใหม่</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 30px 1fr', gap: 10, alignItems: 'center' }}>
            <div style={{ padding: 10, background: WALK.creamSoft, borderRadius: 10, border: `1px solid ${WALK.hairlineSoft}` }}>
              <div style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: WALK.inkMuted, fontWeight: 600 }}>จาก</div>
              <div style={{ fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 600, marginTop: 4, color: WALK.ink }}>Central Ladprao</div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 4, lineHeight: 1.5 }}>หน.อาทิตย์ · ระยะ 18 km</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 26, height: 26, borderRadius: 99, background: WALK.accentSoft,
                color: WALK.accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
              }}>→</div>
            </div>
            <div style={{ padding: 10, background: WALK.accentSoft, borderRadius: 10 }}>
              <div style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: WALK.accent, fontWeight: 600 }}>ไป</div>
              <div style={{ fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 600, marginTop: 4, color: WALK.ink }}>Central World</div>
              <div style={{ fontSize: 10.5, color: WALK.inkSoft, marginTop: 4, lineHeight: 1.5 }}>หน.วิรัช · ระยะ 3 km</div>
            </div>
          </div>
          <div style={{
            marginTop: 10, padding: '7px 10px', background: WALK.creamSoft, borderRadius: 8,
            fontSize: 10.5, color: WALK.inkSoft, display: 'flex', gap: 12, flexWrap: 'wrap',
          }}>
            <span><b style={{ color: WALK.ink }}>ตำแหน่ง:</b> ไม่เปลี่ยน</span>
            <span><b style={{ color: WALK.ink }}>เงินเดือน:</b> ไม่เปลี่ยน</span>
            <span style={{ color: WALK.success, fontWeight: 700 }}>หัวหน้าใหม่ตกลงรับ ✓</span>
          </div>
        </div>

        {/* Reason quote */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ ...walkStyles.eyebrow, marginBottom: 6 }}>เหตุผล</div>
          <div style={{
            padding: '10px 14px', background: WALK.creamSoft, borderRadius: 8,
            borderLeft: `3px solid ${WALK.accent}`,
            fontSize: 12.5, color: WALK.inkSoft, lineHeight: 1.55, fontStyle: 'italic',
          }}>
            "ใกล้บ้านใหม่ + อยากเปลี่ยนทีม"
          </div>
        </div>

        {/* Decision buttons */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ ...walkStyles.eyebrow, marginBottom: 2 }}>การตัดสินใจ</div>
          <p style={{ margin: '2px 0 10px', fontSize: 11.5, color: WALK.inkMuted, lineHeight: 1.45 }}>หัวหน้าสาขาใหม่ตอบรับแล้ว — กดอนุมัติเพื่อให้ HR Admin ดำเนินการต่อ</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{
              padding: '11px 12px', background: WALK.surface,
              border: `1.5px solid ${WALK.hairline}`, borderRadius: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: WALK.creamSoft,
                color: WALK.warning, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>💬</div>
              <div style={{ fontFamily: WALK.fontDisplay, fontSize: 13.5, fontWeight: 600, color: WALK.ink, marginTop: 6 }}>ขอคุยก่อน</div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2 }}>นัด 1-on-1 ใน 3 วัน</div>
            </div>
            <div style={{
              padding: '11px 12px', background: WALK.accentSoft,
              border: `1.5px solid ${WALK.accent}`, borderRadius: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: WALK.accent,
                color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>✓</div>
              <div style={{ fontFamily: WALK.fontDisplay, fontSize: 13.5, fontWeight: 600, color: WALK.ink, marginTop: 6 }}>อนุมัติ</div>
              <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2 }}>ส่งต่อ HR Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT timeline */}
      <div style={{ ...walkStyles.card(true), padding: '14px 16px' }}>
        <div style={walkStyles.eyebrow}>กระบวนการ Transfer</div>
        <h3 style={{ ...walkStyles.h3Display, fontSize: 15, margin: '4px 0 12px' }}>5 ขั้นตอน</h3>
        {[
          { n: 1, t: 'พนักงานส่งคำขอ',           s: '12 พ.ค.',           st: 'done' },
          { n: 2, t: 'หัวหน้าสาขาใหม่รับ',        s: '13 พ.ค.',           st: 'done' },
          { n: 3, t: 'หัวหน้าสาขาเดิมอนุมัติ',     s: 'คุณอยู่ขั้นนี้',    st: 'current' },
          { n: 4, t: 'HR Admin จัดการ',          s: 'ออกหนังสือ + master', st: 'todo' },
          { n: 5, t: 'วันที่ย้าย',                s: '1 มิ.ย. 2569',       st: 'todo' },
        ].map((s, i, arr) => {
          const bg = s.st === 'done' ? WALK.success : s.st === 'current' ? WALK.accent : WALK.surface;
          const fg = (s.st === 'done' || s.st === 'current') ? '#fff' : WALK.inkMuted;
          const border = (s.st === 'done' || s.st === 'current') ? 'transparent' : WALK.hairline;
          return (
            <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 10, position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 99, background: bg, color: fg,
                  border: `1px solid ${border}`, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: WALK.fontDisplay, fontSize: 11, fontWeight: 700, zIndex: 1,
                }}>{s.st === 'done' ? '✓' : s.n}</div>
                {i < arr.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 24, bottom: -8, width: 2,
                    background: WALK.hairline, left: '50%', transform: 'translateX(-50%)',
                  }}/>
                )}
              </div>
              <div style={{ paddingBottom: 14 }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 600,
                  color: s.st === 'current' ? WALK.ink : (s.st === 'done' ? WALK.inkSoft : WALK.inkMuted),
                }}>{s.t}</div>
                <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 2 }}>{s.s}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Transfer · HR Admin 4-lane checklist (frame 2 target) ─────────────
function TransferAdminChecklist() {
  const ST = {
    done:    { bg: WALK.successSoft, fg: WALK.success, l: 'เสร็จ',     ic: '✓' },
    pending: { bg: WALK.warningSoft, fg: '#92660C',    l: 'กำลังทำ',   ic: '⏱' },
    draft:   { bg: WALK.warningSoft, fg: '#92660C',    l: 'ร่าง',      ic: '✎' },
    sent:    { bg: WALK.accentSoft,  fg: WALK.accent,  l: 'ส่งแล้ว',   ic: '➤' },
    todo:    { bg: WALK.creamSoft,   fg: WALK.inkMuted,l: 'ยังไม่ได้', ic: '○' },
  };
  const LANES = [
    { cat: 'Master data',       done: 3, total: 3, items: [
      { l: 'อัปเดต Branch',               st: 'done',    who: 'HR Admin' },
      { l: 'เปลี่ยน Manager · Cost Center', st: 'done',    who: 'HR Admin' },
    ]},
    { cat: 'ระบบและสิทธิ์',     done: 0, total: 3, items: [
      { l: 'เปลี่ยน Location · Time tracking', st: 'pending', who: 'IT' },
      { l: 'อัปเดต Badge access',              st: 'todo',    who: 'Security' },
    ]},
    { cat: 'เอกสาร + จดหมาย',   done: 2, total: 3, items: [
      { l: 'หนังสือโอนย้าย',           st: 'draft',   who: 'HR Admin' },
      { l: 'แจ้งสาขาเก่า + ใหม่',      st: 'sent',    who: 'System' },
    ]},
    { cat: 'Knowledge Transfer', done: 0, total: 2, items: [
      { l: 'Handover document',         st: 'pending', who: 'Employee' },
      { l: 'นัด introduce ทีมใหม่',     st: 'todo',    who: 'Manager' },
    ]},
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: 10 }}>
        <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
          <div style={walkStyles.eyebrow}>ความคืบหน้ารวม</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginTop: 4 }}>
            <span style={{
              fontFamily: WALK.fontDisplay, fontSize: 26, fontWeight: 600,
              letterSpacing: '-0.025em', color: WALK.ink,
            }}>45%</span>
            <span style={{ fontSize: 11.5, color: WALK.inkMuted, marginBottom: 4 }}>5 / 11 งาน</span>
          </div>
          <div style={{ height: 6, background: WALK.creamSoft, borderRadius: 99, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ width: '45%', height: '100%', background: WALK.accent }}/>
          </div>
        </div>
        {[
          { l: 'งานคงค้าง',      v: '6',     sub: 'ก่อน 1 มิ.ย.', c: WALK.warning },
          { l: 'เหลืออีก',       v: '12 วัน', sub: 'ถึงวันย้าย' },
          { l: 'ค่าใช้จ่าย',     v: '฿0',    sub: 'ใช้ที่พักบริษัท' },
        ].map(k => (
          <div key={k.l} style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
            <div style={walkStyles.eyebrow}>{k.l}</div>
            <div style={{
              fontFamily: WALK.fontDisplay, fontSize: 22, fontWeight: 600,
              letterSpacing: '-0.025em', marginTop: 4, lineHeight: 1,
              color: k.c || WALK.ink,
            }}>{k.v}</div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 5 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, borderBottom: `1px solid ${WALK.hairline}` }}>
        {[
          ['Transfer Checklist', '5/11', true],
          ['หนังสือโอนย้าย',     'ร่าง',  false],
          ['เปรียบเทียบก่อน-หลัง', 'อัปเดต', false],
        ].map(([l, badge, active]) => (
          <div key={l} style={{
            padding: '8px 14px', borderBottom: `2px solid ${active ? WALK.accent : 'transparent'}`,
            marginBottom: -1, fontSize: 12,
            fontWeight: active ? 600 : 500,
            color: active ? WALK.ink : WALK.inkMuted,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>{l}
            <span style={{
              padding: '1px 7px', borderRadius: 99,
              background: active ? WALK.accentSoft : WALK.creamSoft,
              color: active ? WALK.ink : WALK.inkMuted,
              fontSize: 9.5, fontWeight: 600,
            }}>{badge}</span>
          </div>
        ))}
      </div>

      {/* 4 lanes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {LANES.map(g => (
          <div key={g.cat} style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
            <div style={{
              padding: '10px 14px', borderBottom: `1px solid ${WALK.hairlineSoft}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 600, color: WALK.ink }}>{g.cat}</div>
              <span style={{ fontSize: 10.5, color: WALK.inkMuted, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{g.done}/{g.total} เสร็จ</span>
            </div>
            {g.items.map((it, i) => {
              const s = ST[it.st];
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '22px 1fr auto',
                  gap: 8, alignItems: 'center', padding: '9px 14px',
                  borderTop: i === 0 ? 0 : `1px solid ${WALK.hairlineSoft}`,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 99, background: s.bg, color: s.fg,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                  }}>{s.ic}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: 11.5, fontWeight: 600, color: WALK.ink,
                      textDecoration: it.st === 'done' ? 'line-through' : 'none',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{it.l}</div>
                    <div style={{ fontSize: 9.5, color: WALK.inkMuted, marginTop: 1 }}>{it.who}</div>
                  </div>
                  <span style={{
                    fontSize: 9.5, fontWeight: 600, color: s.fg,
                    padding: '2px 7px', borderRadius: 99, background: s.bg,
                  }}>{s.l}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function lifecycleTransferPageMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <TransferManagerReview/>
      <TransferAdminChecklist/>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ── Page 2 · Onboard + Confirm (frames 3 + 4 share this) ──────────────
// ═════════════════════════════════════════════════════════════════════

// ── Onboarding Day-1 → 90 (frame 3 target) ────────────────────────────
function OnboardingPhases() {
  const PHASES = [
    { l: 'Day 1 · วันแรก',         date: '1 มิ.ย.',  done: 3, total: 5, current: true },
    { l: 'สัปดาห์แรก · Day 2-5',    date: '2-5 มิ.ย.', done: 1, total: 6 },
    { l: 'เดือนแรก · Week 2-4',    date: '8-30 มิ.ย.', done: 0, total: 4 },
  ];
  const DAY1_ITEMS = [
    { l: 'ลงทะเบียนเข้าระบบ HRMS',       st: 'done',    who: 'ตัวเอง',       action: 'เสร็จแล้ว' },
    { l: 'กรอกข้อมูลส่วนตัวที่เหลือ',     st: 'done',    who: 'ตัวเอง',       action: 'เสร็จแล้ว' },
    { l: 'นัดปฐมนิเทศ + ทำความรู้จักทีม', st: 'current', who: 'HR + Manager', action: '14:00 ห้อง 12B' },
    { l: 'รับ Laptop + อุปกรณ์',         st: 'todo',    who: 'IT',           action: 'รอ IT แจ้ง' },
  ];
  const ST = {
    done:    { c: WALK.success, bg: WALK.successSoft, ic: '✓' },
    current: { c: WALK.accent,  bg: WALK.accentSoft,  ic: '⏱' },
    todo:    { c: WALK.inkFaint, bg: WALK.creamSoft,  ic: '○' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Hero welcome */}
      <div style={{
        padding: '18px 20px',
        background: `linear-gradient(135deg, ${WALK.creamSoft}, ${WALK.accentSoft})`,
        borderRadius: 14, border: `1px solid ${WALK.hairline}`, position: 'relative', overflow: 'hidden',
      }}>
        <div style={walkStyles.eyebrow}>Onboarding · Day 1 → 90</div>
        <h1 style={{
          margin: '6px 0 0',
          fontFamily: WALK.fontDisplay, fontSize: 22, fontWeight: 600,
          color: WALK.ink, letterSpacing: '-0.015em', maxWidth: 540,
        }}>ยินดีต้อนรับเข้าทีม Central Retail นะคะ คุณภานุพงศ์</h1>
        <p style={{ margin: '8px 0 0', fontSize: 12, color: WALK.inkSoft, lineHeight: 1.55, maxWidth: 540 }}>
          ทุกอย่างที่ต้องทำใน 90 วันแรก รวมอยู่ที่นี่ — ถ้ามีคำถาม ทักไปที่ <b style={{ color: WALK.ink }}>Buddy</b> ของคุณ
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 12, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11, color: WALK.inkSoft }}>
              <span style={{ fontWeight: 600 }}>ความคืบหน้ารวม</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700, color: WALK.ink }}>4 / 15 งาน</span>
            </div>
            <div style={{ height: 7, background: 'rgba(14,27,44,0.08)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: '27%', height: '100%', background: WALK.accent }}/>
            </div>
          </div>
          <button style={{ ...walkStyles.btnGhost, padding: '6px 12px', fontSize: 11.5 }}>👥 ทักไปหา Buddy</button>
        </div>
      </div>

      {/* Day 1 expanded */}
      <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '12px 14px', background: WALK.accentSoft,
          display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: `1px solid ${WALK.hairlineSoft}`,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, background: WALK.accent, color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: WALK.fontDisplay, fontSize: 13, fontWeight: 700,
          }}>3/5</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: WALK.fontDisplay, fontSize: 14.5, fontWeight: 600, color: WALK.ink }}>{PHASES[0].l}</div>
            <div style={{ fontSize: 11, color: WALK.inkMuted, marginTop: 2 }}>{PHASES[0].date} · จันทร์</div>
          </div>
          <WalkTag bg={WALK.accent}>กำลังอยู่ในช่วงนี้</WalkTag>
        </div>
        {DAY1_ITEMS.map((it, i) => {
          const s = ST[it.st];
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '28px 1fr 140px 140px',
              gap: 10, alignItems: 'center', padding: '9px 14px',
              borderTop: i === 0 ? 0 : `1px solid ${WALK.hairlineSoft}`,
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: 99, background: s.bg, color: s.c,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>{s.ic}</span>
              <div style={{
                fontSize: 12, fontWeight: 600, color: WALK.ink,
                textDecoration: it.st === 'done' ? 'line-through' : 'none',
              }}>{it.l}</div>
              <span style={{
                background: WALK.creamSoft, color: WALK.inkSoft,
                padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 600,
                width: 'fit-content', border: `1px solid ${WALK.hairlineSoft}`,
              }}>{it.who}</span>
              {it.st === 'current' ? (
                <button style={{
                  ...walkStyles.btnPrimary, padding: '5px 10px', fontSize: 11, minHeight: 26,
                }}>{it.action}</button>
              ) : (
                <span style={{ fontSize: 10.5, color: s.c, fontWeight: 600, textAlign: 'right' }}>{it.action}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Future phases */}
      {PHASES.slice(1).map(p => (
        <div key={p.l} style={{
          ...walkStyles.card(false),
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 12, opacity: 0.85,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, background: WALK.creamSoft, color: WALK.inkMuted,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: WALK.fontDisplay, fontSize: 12, fontWeight: 700,
          }}>{p.done}/{p.total}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: WALK.fontDisplay, fontSize: 13.5, fontWeight: 600, color: WALK.ink }}>{p.l}</div>
            <div style={{ fontSize: 10.5, color: WALK.inkMuted, marginTop: 1 }}>{p.date}</div>
          </div>
        </div>
      ))}

      {/* Resources */}
      <div style={{ ...walkStyles.card(false), padding: '12px 14px' }}>
        <div style={{ ...walkStyles.eyebrow, marginBottom: 8 }}>ทรัพยากรที่ช่วยคุณ</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { ic: '📘', t: 'Employee Handbook', sub: 'PDF · 48 หน้า' },
            { ic: '👥', t: 'Buddy: เจสซิก้า ศรี', sub: 'Senior · 3 ปี', highlight: true },
            { ic: '📞', t: 'IT Helpdesk',         sub: '02-555-0123' },
            { ic: '🗺', t: 'Org Chart',           sub: 'ดูทีมทั้งหมด' },
          ].map(r => (
            <div key={r.t} style={{
              padding: '10px 11px',
              background: r.highlight ? WALK.accentSoft : WALK.creamSoft,
              border: `1px solid ${r.highlight ? WALK.accent : 'transparent'}`,
              borderRadius: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: WALK.surface,
                color: WALK.accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>{r.ic}</div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: WALK.ink, marginTop: 5 }}>{r.t}</div>
              <div style={{ fontSize: 10, color: WALK.inkMuted, marginTop: 1 }}>{r.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Confirmation after probation (frame 4 target) ─────────────────────
function ConfirmationSection() {
  return (
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1.55fr 1fr' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Employee header + score */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: `linear-gradient(135deg, ${WALK.coral}, ${WALK.butterSoft})`,
              color: WALK.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: WALK.fontDisplay, fontSize: 18, fontWeight: 700,
            }}>SC</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: WALK.fontDisplay, fontSize: 16, fontWeight: 600,
                color: WALK.ink, letterSpacing: '-0.01em',
              }}>สมพร เจริญสุข <span style={{ color: WALK.inkMuted, fontWeight: 500 }}>· Somporn C.</span></div>
              <div style={{ fontSize: 11.5, color: WALK.inkMuted, marginTop: 3 }}>Sales Associate · Central EastVille · 90 วันครบ</div>
            </div>
            <span style={{
              background: WALK.successSoft, color: WALK.success,
              padding: '5px 12px', borderRadius: 99,
              fontSize: 11, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>✓ ผ่าน 4.6/5</span>
          </div>
        </div>

        {/* Probation review summary */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={walkStyles.eyebrow}>สรุปผลการประเมิน</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 14, margin: '4px 0 2px' }}>โดยเจสซิก้า ศรี · 28 พ.ค.</h3>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10,
          }}>
            {[
              { l: 'ความรู้ด้านงาน',     v: 5 },
              { l: 'ทักษะการบริการ',    v: 5 },
              { l: 'การทำงานเป็นทีม',  v: 4 },
              { l: 'ทัศนคติ',           v: 5 },
              { l: 'ความตรงต่อเวลา',   v: 4 },
              { l: 'ความรับผิดชอบ',   v: 5 },
            ].map(c => (
              <div key={c.l} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '6px 10px', background: WALK.creamSoft, borderRadius: 8,
              }}>
                <span style={{ fontSize: 11.5, color: WALK.inkSoft, flex: 1 }}>{c.l}</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} style={{
                      width: 7, height: 7, borderRadius: 99,
                      background: n <= c.v ? WALK.accent : WALK.hairline,
                    }}/>
                  ))}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: WALK.ink, width: 14, textAlign: 'right' }}>{c.v}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 10, padding: '8px 12px', background: WALK.creamSoft,
            borderRadius: 8, borderLeft: `3px solid ${WALK.accent}`,
            fontSize: 11.5, color: WALK.inkSoft, lineHeight: 1.5, fontStyle: 'italic',
          }}>
            "ทำงานได้ดี เรียนรู้เร็ว ทัศนคติดีกับลูกค้า แนะนำให้บรรจุเข้าทำงานประจำ"
          </div>
        </div>

        {/* Benefit diff */}
        <div style={{ ...walkStyles.card(false), padding: '14px 16px' }}>
          <div style={walkStyles.eyebrow}>การเปลี่ยนแปลงเมื่อบรรจุ</div>
          <h3 style={{ ...walkStyles.h3Display, fontSize: 14, margin: '4px 0 8px' }}>สิทธิประโยชน์ที่เปิดใช้</h3>
          {[
            { l: 'สถานะ',              from: 'ทดลองงาน',           to: 'พนักงานประจำ',     unlock: true },
            { l: 'สิทธิประกันสุขภาพ',   from: 'พื้นฐาน',             to: 'แบบเต็ม + บุตร',   unlock: true },
            { l: 'วันลาพักร้อน',        from: '3 วัน/ปี',            to: '6 วัน/ปี (เต็ม)',  unlock: true },
            { l: 'กองทุนสำรอง',         from: 'ยังไม่เข้าร่วม',       to: 'เปิดให้สมัครได้',  unlock: true },
            { l: 'เงินเดือน',           from: '฿16,000',             to: '฿16,000 (คงเดิม)',  unlock: false },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '130px 1fr 24px 1fr',
              gap: 8, alignItems: 'center', padding: '6px 0',
              borderBottom: i === 4 ? 0 : `1px solid ${WALK.hairlineSoft}`,
            }}>
              <span style={{ fontSize: 11.5, color: WALK.inkMuted, fontWeight: 500 }}>{r.l}</span>
              <span style={{ fontSize: 11.5, color: WALK.inkSoft }}>{r.from}</span>
              <span style={{ textAlign: 'center', color: WALK.inkFaint, fontSize: 12 }}>→</span>
              <span style={{
                fontSize: 11.5,
                color: r.unlock ? WALK.accent : WALK.inkSoft,
                fontWeight: r.unlock ? 600 : 500,
              }}>{r.to}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — letter + CTA + side-effect */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ ...walkStyles.card(false), padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '8px 14px', background: WALK.creamSoft,
            borderBottom: `1px solid ${WALK.hairlineSoft}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{
              fontSize: 9.5, color: WALK.inkMuted, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.06em',
            }}>ตัวอย่างหนังสือ</span>
            <span style={{ fontSize: 11, color: WALK.inkMuted }}>📄</span>
          </div>
          <div style={{ padding: '14px 16px', background: '#fff', fontSize: 10.5, lineHeight: 1.65, color: WALK.ink }}>
            <div style={{ textAlign: 'right', fontSize: 9, color: WALK.inkMuted }}>HR-2569/512</div>
            <h4 style={{ textAlign: 'center', margin: '8px 0 12px', fontSize: 12, letterSpacing: '-0.01em', fontFamily: WALK.fontDisplay }}>หนังสือบรรจุพนักงาน</h4>
            <p style={{ margin: 0 }}>เรียน คุณสมพร เจริญสุข</p>
            <p style={{ margin: '8px 0 0' }}>บริษัทขอแสดงความยินดี และขอแจ้งว่าท่านได้ผ่านช่วงทดลองงาน 90 วัน และได้รับการ<b> บรรจุเป็นพนักงานประจำ </b>มีผลตั้งแต่ <b>1 มิ.ย. 2569</b></p>
            <p style={{ margin: '8px 0 0' }}>คะแนนการประเมิน 4.6/5 จากผู้บังคับบัญชา…</p>
            <p style={{ margin: '12px 0 0' }}>ขอแสดงความนับถือ<br/>ฝ่ายทรัพยากรบุคคล</p>
          </div>
        </div>

        <button style={walkStyles.btnPrimary}>➤ ส่งให้พนักงาน + บรรจุ</button>
        <button style={walkStyles.btnGhost}>✎ แก้ไขก่อนส่ง</button>

        <div style={{
          padding: '10px 12px', background: WALK.accentSoft, borderRadius: 10,
          fontSize: 11, color: WALK.inkSoft, lineHeight: 1.5,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 9.5, fontWeight: 700, color: WALK.ink, marginBottom: 4,
            textTransform: 'uppercase', letterSpacing: '.1em',
          }}>
            <span style={{ color: WALK.accent }}>⚡</span> หลังกดส่ง
          </div>
          เปลี่ยนสถานะเป็น "ประจำ" · เปิดประกันเต็ม · ปรับวันลา · แจ้ง Payroll · ส่ง email + PDF
        </div>
      </div>
    </div>
  );
}

function lifecycleOnboardConfirmPageMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <OnboardingPhases/>
      <ConfirmationSection/>
    </div>
  );
}

// ── Regions (frame-space) ─────────────────────────────────────────────
const SPOTX = WALK.MOCKUP_X - 4;
const SPOTW = WALK.MOCKUP_W + 8;

// Transfer page regions
const TR = {
  managerReview: { y: WALK.BODY_TOP - 4,    h: 568 },   // top half · 4-card stack + timeline
  adminChecklist:{ y: WALK.BODY_TOP + 582,  h: 460 },   // bottom · KPI + tabs + 4 lanes
};
const TRANSFER_FRAME_H = 1180;

// Onboard/Confirm page regions
const OC = {
  onboarding:  { y: WALK.BODY_TOP - 4,    h: 720 },     // hero + Day1 + future + resources
  confirm:     { y: WALK.BODY_TOP + 738,  h: 540 },     // snapshot + rating + diff + letter
};
const OC_FRAME_H = 1420;

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · คำขอโอนย้าย — Manager review (Transfer page · top)
// ═══════════════════════════════════════════════════════════════════
function LifecycleWalk1() {
  return (
    <WalkFrame
      stepIdx={1} totalSteps={4}
      persona="Manager · คุณอาทิตย์"
      title="คำขอโอนย้าย · ตัดสินใจในหน้าจอเดียว"
      narrative="พนักงานยื่นย้าย — Manager ต้องตอบ 3 คำถาม: 'คนที่ไป OK ไหม', 'งานเก่าจบไหม', 'ขั้นต่อไปคืออะไร'. หน้าจอนี้รวม KPI + comparison + reason + decision + timeline ในที่เดียว"
      mockup={lifecycleTransferPageMockup()}
      dim
      frameHeight={TRANSFER_FRAME_H}
      callouts={[
        { num: 1, x: SPOTX, y: TR.managerReview.y, w: SPOTW, h: TR.managerReview.h, color: WALK.accent },
      ]}
      annotations={[
        { num: 1, title: 'Single screen review · ไม่ใช่ multi-step',
          body: 'ทำไมรวม KPI strip + from/to + reason + decision + timeline ในหน้าเดียว? เพราะ Manager ตัดสินใจดีที่สุดเมื่อเห็นบริบทพร้อมกัน — แยกเป็นหลายหน้าจะสร้าง re-context cost ทุก step. KPI 4 ตัว (ส่งคำขอ · วันที่ย้าย · แจ้งล่วงหน้า · งานคงค้าง) ตอบ "พร้อมอนุมัติไหม" ใน scan. From → To diff ใช้ accent ฝั่งใหม่ + creamSoft ฝั่งเก่า — direction ชัด. Decision เป็น 2 card (ขอคุยก่อน / อนุมัติ) ไม่มี Reject ตรงนี้ — เพราะ healthy discussion เป็น middle ground ที่ workflow เก่ามักไม่มี. Sticky timeline ขวาบอก "อนุมัติแล้วยังไงต่อ" — ลด anxiety.',
          color: WALK.accent },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · ลงมือย้าย — HR Admin 4-lane (Transfer page · bottom)
// ═══════════════════════════════════════════════════════════════════
function LifecycleWalk2() {
  return (
    <WalkFrame
      stepIdx={2} totalSteps={4}
      persona="HR Admin · คุณดานา"
      title="ลงมือย้าย · 4 lanes แบ่งตามทีม"
      narrative="หลัง Manager อนุมัติ — HR Admin ต้อง orchestrate งานข้าม 4 ทีม (HR · IT · Security · Manager). แทนที่จะเปิด 11 ticket — รวมเป็น swim lanes + KPI strip เพื่อเห็น end-to-end ในจอเดียว"
      mockup={lifecycleTransferPageMockup()}
      dim
      frameHeight={TRANSFER_FRAME_H}
      callouts={[
        { num: 1, x: SPOTX, y: TR.adminChecklist.y,         w: SPOTW, h: 90,  color: WALK.accent },
        { num: 2, x: SPOTX, y: TR.adminChecklist.y + 200,   w: SPOTW, h: 260, color: WALK.sage },
      ]}
      annotations={[
        { num: 1, title: 'KPI strip pulse · ไม่ใช่ % ลอย',
          body: 'ทำไมไม่แค่ progress bar? เพราะ HR Admin ต้อง report Manager ทุกวัน — ต้องมีตัวเลขจริง. 45% + bar + "5/11 งาน" รวมในตัวเดียว: visual scan สำหรับ pattern + ตัวเลขสำหรับ report. KPI ข้างเคียง (งานคงค้าง 6 = warning · เหลือ 12 วัน · ค่าใช้จ่าย ฿0) ใช้สี token บอก urgency — Admin จัด priority ใน 2 วินาที.',
          color: WALK.accent },
        { num: 2, title: '4 lanes · ทีมเดียวต่อ lane = ownership ชัด',
          body: 'ทำไมไม่ใช้ table ยาว? เพราะ table ทำให้ตกหล่นระหว่างทีม — IT ดู task ของ HR แล้ว skip ได้ง่าย. แยก 4 card (Master data · ระบบและสิทธิ์ · เอกสาร · KT) แต่ละ card belongs ทีมเดียว — accountability ชัดแบบ Kanban. status pill 5 สี (done · pending · draft · sent · todo) ให้ scan ภายใน lane ได้ใน 2 วินาที — ไม่ใช่ binary done/not-done เหมือน to-do list.',
          color: WALK.sage },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ต้อนรับวันแรก — Onboarding (Onboard/Confirm · top)
// ═══════════════════════════════════════════════════════════════════
function LifecycleWalk3() {
  return (
    <WalkFrame
      stepIdx={3} totalSteps={4}
      persona="พนักงานใหม่ · คุณภานุพงศ์"
      title="ต้อนรับวันแรก · 90 วัน roadmap"
      narrative="พนักงานใหม่เปิด Humi วันแรกแล้วต้องไม่งง — Hero ทักทายด้วยชื่อ + bar 4/15 งาน · phases แบ่ง Day1/Week1/Month1 · current phase teal halo · pin Buddy เป็น resource อันดับแรก"
      mockup={lifecycleOnboardConfirmPageMockup()}
      dim
      frameHeight={OC_FRAME_H}
      callouts={[
        { num: 1, x: SPOTX, y: OC.onboarding.y,        w: SPOTW, h: 170, color: WALK.accent },
        { num: 2, x: SPOTX, y: OC.onboarding.y + 180,  w: SPOTW, h: 224, color: WALK.coral },
        { num: 3, x: SPOTX, y: OC.onboarding.y + 540,  w: SPOTW, h: 130, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'Hero gradient + ชื่อจริง · ไม่ใช่ corporate banner',
          body: 'ทำไมไม่ใส่แค่ "Welcome to Central Retail"? เพราะ Humi positioning คือ warm · Thai-first — ชื่อจริงในประโยคทักทายลดความรู้สึก corporate. Gradient cream→teal soft + ชื่อใส่ตอนกลางประโยค ("ยินดีต้อนรับเข้าทีม Central Retail นะคะ คุณภานุพงศ์") เลียนแบบจดหมายจริง. bar "4/15 งาน" ใต้ hero ตอบทันทีว่ายังเหลือเท่าไหร่ — ไม่ต้องเลื่อนหา.',
          color: WALK.accent },
        { num: 2, title: 'Current phase = teal halo · future = collapse',
          body: 'ทำไมไม่ expand ทุก phase? เพราะ Day 1 พนักงานใหม่มี mental load สูงอยู่แล้ว — ถ้าโชว์ทุกอย่างจะ overwhelm. Day 1 header ใช้ accentSoft bg + "กำลังอยู่ในช่วงนี้" pill — focus งานปัจจุบัน. Week 1 + Month 1 แสดงแค่ progress count (1/6 · 0/4) opacity ลด — รู้ว่ามาแต่ไม่ดึงสายตา. inline CTA "14:00 ห้อง 12B" teal solid เฉพาะ current item ที่ทำตอนนี้ได้.',
          color: WALK.coral },
        { num: 3, title: 'Buddy = resource อันดับ 1 · teal border',
          body: 'ทำไม Buddy ไม่ใช่แค่ contact ธรรมดา? เพราะ Humi philosophy: "พนักงานใหม่ควรมีคนถามได้ ไม่ใช่แค่ chatbot". 4 resource ใน grid (Handbook · Buddy · IT · OrgChart) — Buddy ใช้ accentSoft bg + teal border ยก visual weight ขึ้นมาก่อน. ใส่ชื่อ + tenure ("เจสซิก้า · Senior · 3 ปี") สร้าง human connection แทน "Buddy: assigned".',
          color: WALK.butter },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · บรรจุพนักงาน — Confirmation (Onboard/Confirm · bottom)
// ═══════════════════════════════════════════════════════════════════
function LifecycleWalk4() {
  return (
    <WalkFrame
      stepIdx={4} totalSteps={4}
      persona="HR Admin · คุณดานา"
      title="บรรจุพนักงาน · ปิด loop probation"
      narrative="หลังพนักงานผ่าน 90 วัน — Admin ไม่ต้องกรอกข้อมูลซ้ำ; ระบบดึง score, manager comment, benefit diff มาแสดงพร้อม letter preview · กดปุ่มเดียว trigger 5 อย่าง: เปลี่ยน status, เปิดสิทธิ, ปรับลา, แจ้ง payroll, ส่ง PDF"
      mockup={lifecycleOnboardConfirmPageMockup()}
      dim
      frameHeight={OC_FRAME_H}
      callouts={[
        { num: 1, x: SPOTX, y: OC.confirm.y,        w: SPOTW * 0.6, h: 80,  color: WALK.success },
        { num: 2, x: SPOTX, y: OC.confirm.y + 90,   w: SPOTW * 0.6, h: 250, color: WALK.accent },
        { num: 3, x: WALK.MOCKUP_X + 540, y: OC.confirm.y + 260, w: 340, h: 140, color: WALK.butter },
      ]}
      annotations={[
        { num: 1, title: 'Outcome pill · เห็นผลก่อน detail',
          body: 'ทำไม pill อยู่บนสุด ไม่ใช่ใต้ rating? เพราะ Admin scan top-down — ถ้าเห็น "ผ่าน 4.6/5" ใน 0.5 วินาทีก็รู้ outcome แล้ว ไม่ต้องอ่าน detail หากไม่สงสัย. pill success green วางขวาบนสุด — ถ้าไม่ผ่าน ระบบ route ไป Extend/Terminate flow แทน (หน้านี้ไม่โชว์) — ลด ambiguity 100%.',
          color: WALK.success },
        { num: 2, title: 'Rating dot grid + manager quote คู่กัน',
          body: 'ทำไมไม่ใช้ star เหมือน Probation? เพราะที่นี่ต้องโชว์ 6 มิติ — star × 6 ใช้พื้นที่เยอะ. dot 5 ระดับ (teal vs grey) compact กว่าและ scan ได้ — visual density 3x. ตามด้วย italic quote ใน borderLeft teal — "ความเห็นมนุษย์" สำคัญกว่า score เฉลี่ย, จัดให้น้ำหนัก visual เหมือนกัน. cream variant แยก visual ว่าเป็น context (read-only).',
          color: WALK.accent },
        { num: 3, title: 'Side-effect callout ใต้ปุ่ม · atomic action',
          body: 'ทำไมต้องอธิบาย side-effect ก่อนกด? เพราะปุ่ม "ส่ง + บรรจุ" trigger 5 ระบบพร้อมกัน — status · ประกัน · วันลา · payroll · email. Admin ที่ไม่เห็น scope จะกลัวกด. callout teal soft "หลังกดส่ง: เปลี่ยนสถานะ · เปิดประกัน · ปรับลา · แจ้ง Payroll · ส่ง PDF" ทำให้ workflow atomic — กดทีเดียวจบ ไม่ต้องตามแก้ทีละระบบ.',
          color: WALK.butter },
      ]}
    />
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, { LifecycleWalk1, LifecycleWalk2, LifecycleWalk3, LifecycleWalk4 });
