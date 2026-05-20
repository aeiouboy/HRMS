// prod-home-overview.jsx
// Storyboard user-journey overview for the Home dashboard (Manager persona).
// Four frames following the first-touch arc:
//   01 แรกเข้า       — Greeting hero + Today's attendance pulse
//   02 รับข้อมูล     — Organisational Updates tiles
//   03 ลงมือทำ      — Leave approvals + Pending documents
//   04 เชื่อมสัมพันธ์ — Announcements feed + Birthday card
//
// Each frame is a self-contained <HoFrame> that renders:
//   • A header strip (step number, persona, title, narrative)
//   • A mockup column on the left (a faithful but simplified rebuild
//     of the corresponding Row in prod-home.jsx — inline so the
//     overview file is robust to changes in the live mockup)
//   • An annotation column on the right (numbered rationale cards)
//   • A single SVG overlay above the body that paints dashed callout
//     boxes around the components plus bezier connector lines from
//     each callout to its matching annotation card
//
// Coordinates are all in frame-space pixels (origin = frame top-left).
// Drop each component into its own DCArtboard inside a DCSection so the
// canvas can sequence them as storyboard panels.
//
// Usage in deck HTML (after react / prod-icons.jsx / design-canvas.jsx):
//   <DCSection id="home-overview" title="Home · User Journey">
//     <DCArtboard id="f1" label="01 · แรกเข้า"     width={1500} height={760}>
//       <HomeOverviewFrame1/>
//     </DCArtboard>
//     <DCArtboard id="f2" label="02 · รับข้อมูล"   width={1500} height={760}>
//       <HomeOverviewFrame2/>
//     </DCArtboard>
//     <DCArtboard id="f3" label="03 · ลงมือทำ"     width={1500} height={760}>
//       <HomeOverviewFrame3/>
//     </DCArtboard>
//     <DCArtboard id="f4" label="04 · เชื่อมสัมพันธ์" width={1500} height={760}>
//       <HomeOverviewFrame4/>
//     </DCArtboard>
//   </DCSection>

const HO = {
  accent: '#1FA8A0',
  accentSoft: 'rgba(31,168,160,0.10)',
  accentInk: '#0E1B2C',
  ink: '#0E1B2C',
  inkSoft: '#243447',
  inkMuted: '#5A6A7E',
  inkFaint: '#8A97A8',
  cream: '#F6F1E8',
  creamSoft: '#FCFAF5',
  surface: '#FFFFFF',
  hairline: '#E7DFD1',
  hairlineSoft: '#EFE9DC',
  coral: '#E08864',
  coralSoft: '#FBE7DC',
  butter: '#D4A53A',
  butterSoft: '#F4E4B8',
  sage: '#7DA084',
  sageSoft: '#D9E5DA',
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',
  font: 'CPN, Anuphan, system-ui, -apple-system, "Segoe UI", sans-serif',
  fontDisplay: '"CPN Condensed", CPN, Anuphan, system-ui, sans-serif',
};

// ── Frame layout constants ──────────────────────────────────────────
// All frames share the same outer size so they slot uniformly into a
// horizontal storyboard row in DCSection.
const FRAME_W = 1500;
const FRAME_H = 760;
const HEAD_H = 96;
const BODY_TOP = HEAD_H + 24;        // y where mockup + annotations start
const MOCKUP_X = 40;                 // mockup column left edge
const MOCKUP_W = 880;                // mockup column width
const ANNOT_X = 1080;                // annotation column left edge
const ANNOT_W = 380;                 // annotation column width
const ANNOT_CARD_H = 122;            // each annotation card height
const ANNOT_GAP = 14;                // gap between annotation cards

// Y centre of the numbered badge on annotation card N (1-indexed).
function annotBadgeY(num) {
  return BODY_TOP + (num - 1) * (ANNOT_CARD_H + ANNOT_GAP) + 30;
}

// ── HoFrame: storyboard shell ───────────────────────────────────────
// Renders header + mockup + annotations + SVG callout/connector overlay.
function HoFrame({ stepIdx, totalSteps, persona, title, narrative, mockup, callouts, annotations }) {
  return (
    <div style={{
      width: FRAME_W,
      height: FRAME_H,
      background: HO.cream,
      fontFamily: HO.font,
      color: HO.ink,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* ── Header strip ──────────────────────────────────────────── */}
      <div style={{
        height: HEAD_H,
        padding: '20px 40px',
        borderBottom: `1px solid ${HO.hairline}`,
        background: HO.creamSoft,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 24,
          background: HO.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: HO.fontDisplay,
          fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em',
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0,
        }}>
          {String(stepIdx).padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase',
            color: HO.inkMuted, fontWeight: 600,
          }}>
            Frame {stepIdx} / {totalSteps} · Persona: {persona}
          </div>
          <h2 style={{
            margin: '3px 0 0',
            fontFamily: HO.fontDisplay,
            fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em',
            color: HO.ink,
          }}>{title}</h2>
        </div>
        <div style={{
          maxWidth: 520, flexShrink: 0,
          fontSize: 13, lineHeight: 1.55, color: HO.inkSoft,
          padding: '10px 14px',
          background: HO.surface,
          borderRadius: 10,
          border: `1px solid ${HO.hairline}`,
        }}>{narrative}</div>
      </div>

      {/* ── Mockup column ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: MOCKUP_X, top: BODY_TOP,
        width: MOCKUP_W,
      }}>{mockup}</div>

      {/* ── Annotation column ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: ANNOT_X, top: BODY_TOP,
        width: ANNOT_W,
        display: 'flex', flexDirection: 'column', gap: ANNOT_GAP,
      }}>
        {annotations.map(a => (
          <HoAnnotation key={a.num} num={a.num}
                        title={a.title} body={a.body}
                        color={a.color || HO.accent}/>
        ))}
      </div>

      {/* ── Overlay: callout rings + connector bezier lines ───────── */}
      <svg width={FRAME_W} height={FRAME_H}
           style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {callouts.map(c => {
          const color = c.color || HO.accent;
          const r = c.radius != null ? c.radius : 12;
          // Connector endpoints: right edge of callout → left edge of annotation badge
          const startX = c.x + c.w;
          const startY = c.y + c.h / 2;
          const endX = ANNOT_X - 14;     // 14px before badge centre (badge -14 from card left)
          const endY = annotBadgeY(c.num);
          const dx = endX - startX;
          // Bezier control points: pull out horizontally for a smooth S-curve.
          const c1x = startX + Math.min(160, Math.max(60, dx * 0.55));
          const c2x = endX - Math.min(160, Math.max(60, dx * 0.55));
          return (
            <g key={c.num}>
              {/* Subtle fill highlight inside the callout */}
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={r}
                    fill={color} opacity="0.07"/>
              {/* Dashed outline */}
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={r}
                    fill="none" stroke={color} strokeWidth="2"
                    strokeDasharray="6 5"/>
              {/* Numbered badge on top-left of callout */}
              <circle cx={c.x} cy={c.y} r={13} fill={color}/>
              <text x={c.x} y={c.y + 4.5} textAnchor="middle"
                    fontSize="13" fontWeight="700" fill="#fff"
                    fontFamily="ui-sans-serif, system-ui">{c.num}</text>
              {/* Bezier connector */}
              <path d={`M ${startX} ${startY} C ${c1x} ${startY} ${c2x} ${endY} ${endX} ${endY}`}
                    stroke={color} strokeWidth="1.6" fill="none"
                    strokeDasharray="5 4" opacity="0.85"/>
              {/* Endpoint dots */}
              <circle cx={startX} cy={startY} r={3.5} fill={color}/>
              <circle cx={endX} cy={endY} r={3.5} fill={color}/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Annotation card ─────────────────────────────────────────────────
// Numbered badge tucked into the top-left corner; the connector line
// from HoFrame's SVG terminates on this badge.
function HoAnnotation({ num, title, body, color }) {
  return (
    <div style={{
      background: HO.surface,
      borderRadius: 14,
      border: `1px solid ${HO.hairline}`,
      padding: '14px 16px 14px 26px',
      position: 'relative',
      boxShadow: '0 1px 2px rgba(14,27,44,.04), 0 4px 12px rgba(14,27,44,.04)',
      minHeight: ANNOT_CARD_H - 2,
    }}>
      <div style={{
        position: 'absolute', left: -14, top: 16,
        width: 28, height: 28, borderRadius: 14,
        background: color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700,
        fontFamily: 'ui-sans-serif, system-ui',
        boxShadow: '0 1px 4px rgba(14,27,44,.18)',
      }}>{num}</div>
      <h4 style={{
        margin: 0,
        fontFamily: HO.fontDisplay,
        fontSize: 14.5, fontWeight: 600, color: HO.ink,
        letterSpacing: '-0.005em', lineHeight: 1.3,
      }}>{title}</h4>
      <p style={{
        margin: '6px 0 0',
        fontSize: 12.5, lineHeight: 1.55, color: HO.inkSoft,
      }}>{body}</p>
    </div>
  );
}

// ── Shared small primitives for the inline mockups ──────────────────
const eyebrowStyle = {
  fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase',
  color: HO.inkMuted, fontWeight: 600,
};
const cardStyle = (cream = false) => ({
  background: cream ? HO.creamSoft : HO.surface,
  border: `1px solid ${HO.hairline}`,
  borderRadius: 18,
  padding: '20px 22px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(14,27,44,.04), 0 4px 12px rgba(14,27,44,.04)',
});
const btnPrimary = {
  background: HO.accent, color: '#fff',
  border: 0, borderRadius: 10,
  padding: '8px 14px',
  fontSize: 13, fontWeight: 600, fontFamily: HO.font,
  display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
};
const btnGhost = {
  background: 'transparent', color: HO.inkSoft,
  border: `1px solid ${HO.hairline}`, borderRadius: 10,
  padding: '8px 14px',
  fontSize: 13, fontWeight: 600, fontFamily: HO.font,
  display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
};
function HoAvatar({ initials, color = HO.accent, size = 28, border = '#fff' }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff',
      fontSize: Math.round(size * 0.4), fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      border: `2px solid ${border}`,
      flexShrink: 0,
    }}>{initials}</span>
  );
}
function HoTag({ children, bg = HO.accent, color = '#fff' }) {
  return (
    <span style={{
      background: bg, color,
      padding: '3px 10px', borderRadius: 999,
      fontSize: 10.5, fontWeight: 600, letterSpacing: '.06em',
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>{children}</span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 1 · แรกเข้า — Greeting + Today's pulse
// ═══════════════════════════════════════════════════════════════════
function HomeOverviewFrame1() {
  const mockup = (
    <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1.35fr 1fr' }}>
      {/* Hero greeting card */}
      <div style={{ ...cardStyle(false), paddingRight: 90, minHeight: 240 }}>
        <div style={{
          position: 'absolute', width: 130, height: 150, right: -30, top: -30,
          background: `radial-gradient(circle, ${HO.accent} 0%, transparent 70%)`,
          opacity: 0.7,
        }}/>
        <div style={{
          position: 'absolute', width: 80, height: 100, right: 50, bottom: -20,
          background: `radial-gradient(circle, ${HO.coral} 0%, transparent 70%)`,
          opacity: 0.6,
        }}/>
        <div style={{
          position: 'absolute', width: 40, height: 50, right: 105, top: 70,
          background: `radial-gradient(circle, ${HO.butter} 0%, transparent 70%)`,
          opacity: 0.85,
        }}/>

        <div style={eyebrowStyle}>วันอังคาร · 21 เมษายน 2568</div>
        <h1 style={{
          margin: '10px 0 0',
          fontFamily: HO.fontDisplay,
          fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em',
          color: HO.ink, maxWidth: 360,
        }}>
          สวัสดีตอนเช้า คุณจงรักษ์
          <span style={{ display: 'block', color: HO.inkSoft, fontSize: 17, fontWeight: 400, marginTop: 4 }}>
            มีคำขอ 2 รายการรอคุณวันนี้
          </span>
        </h1>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
          <button style={btnPrimary}>✓ ตรวจคำขอลา</button>
          <button style={btnGhost}>📢 ดูประกาศ</button>
        </div>
      </div>

      {/* Today's pulse card */}
      <div style={{ ...cardStyle(false), minHeight: 240 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div>
            <div style={eyebrowStyle}>วันนี้</div>
            <h3 style={{
              margin: '6px 0 0',
              fontFamily: HO.fontDisplay,
              fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', color: HO.ink,
            }}>การมาทำงาน · 247 คน</h3>
          </div>
          <span style={{ marginLeft: 'auto' }}>
            <HoTag bg={HO.accent}>● สด</HoTag>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 18, marginTop: 16, alignItems: 'center' }}>
          {/* Ring */}
          <div style={{
            width: 92, height: 92, borderRadius: '50%',
            background: `conic-gradient(${HO.accent} 0% 78%, ${HO.hairlineSoft} 78% 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              width: 70, height: 70, borderRadius: '50%', background: HO.surface,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: HO.fontDisplay,
                fontSize: 22, fontWeight: 700, color: HO.ink, lineHeight: 1,
              }}>193</div>
              <div style={{
                fontSize: 9, letterSpacing: '.1em', color: HO.inkMuted,
                textTransform: 'uppercase', marginTop: 3,
              }}>ทำงาน</div>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { l: 'เข้างาน', v: 193, c: HO.accent },
              { l: 'ลางาน',   v:  32, c: HO.warning },
              { l: 'นอกกะ',   v:  22, c: HO.hairline },
            ].map(r => (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: r.c }}/>
                  <span style={{ fontSize: 12.5, color: HO.inkSoft }}>{r.l}</span>
                </div>
                <b style={{ fontSize: 13.5, fontVariantNumeric: 'tabular-nums' }}>{r.v}</b>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: HO.hairlineSoft, margin: '16px 0 12px' }}/>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['TS','RP','JC','MK','AP'].map((s, idx) => (
            <span key={s} style={{ marginLeft: idx === 0 ? 0 : -6 }}>
              <HoAvatar initials={s} size={28}
                        color={[HO.accent, HO.sage, HO.butter, HO.ink, HO.accent][idx]}
                        border={HO.surface}/>
            </span>
          ))}
          <span style={{ fontSize: 12.5, color: HO.inkMuted, marginLeft: 10 }}>+188 คนทำงานอยู่</span>
        </div>
      </div>
    </div>
  );

  return (
    <HoFrame
      stepIdx={1} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="แรกเข้า · ทักทายแล้ว surface งานเร่งด่วน"
      narrative="เปิด Humi ตอนเช้า Home ต้องตอบ 2 คำถามภายใน 3 วินาที — 'ฉันคือใคร วันนี้คือวันอะไร' และ 'มีอะไรต้องทำ' Hero ทักทายแบบ time-aware + summary คำขอ; Today card ให้ pulse องค์กรในรูป ring + breakdown"
      mockup={mockup}
      callouts={[
        // 1. Greeting block (eyebrow + title + subtitle)
        { num: 1, x: MOCKUP_X + 12, y: BODY_TOP + 8,  w: 365, h: 110 },
        // 2. Quick action buttons in hero
        { num: 2, x: MOCKUP_X + 12, y: BODY_TOP + 132, w: 280, h: 50 },
        // 3. Ring + breakdown (Today card body)
        { num: 3, x: MOCKUP_X + 528, y: BODY_TOP + 50, w: 340, h: 130 },
        // 4. Avatar stack (organisation pulse)
        { num: 4, x: MOCKUP_X + 528, y: BODY_TOP + 198, w: 340, h: 48 },
      ]}
      annotations={[
        { num: 1, title: 'Greeting แบบ time-aware',
          body: 'สวัสดี + ชื่อจริง + วันที่ภาษาไทย (พ.ศ.) ในทันทีที่เปิด — ลด cognitive load ก่อนเริ่มงาน และยืนยัน identity ว่า login ถูก persona' },
        { num: 2, title: 'Primary + Secondary action',
          body: 'Teal solid = action ที่ต้องทำตอนนี้ (ตรวจคำขอลา 2 รายการ) · Ghost = exploration (ดูประกาศ) — แยกชัดด้วย hierarchy ของสีและ weight' },
        { num: 3, title: 'Pulse ring 78% + breakdown',
          body: 'ring chart conic-gradient อ่านได้แว้บเดียว (193/247 ทำงาน) แทน table; breakdown ให้ context (ลา 32, นอกกะ 22) ใช้ warm token แทน red/green' },
        { num: 4, title: 'Avatar stack = humanise number',
          body: '+188 คนทำงานอยู่ ไม่ใช่แค่ตัวเลข — เห็นคน 5 หน้ามาก่อน ช่วยสร้างความรู้สึก team awareness ตามหลัก Humi warm-Thai-first' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 2 · รับข้อมูล — Organisational Updates
// ═══════════════════════════════════════════════════════════════════
function HomeOverviewFrame2() {
  const BRAND_PALETTES = [
    [HO.accent,  '#D6EEEC'],
    [HO.coral,   HO.coralSoft],
    [HO.butter,  HO.butterSoft],
    [HO.sage,    HO.sageSoft],
    [HO.ink,     '#5F7689'],
  ];
  const tiles = [
    { l: 'People Portal',           badge: null },
    { l: 'CNEXT | LINE',            badge: 'ใหม่' },
    { l: 'AI Academy',              badge: null },
    { l: 'User Manual',             badge: null },
    { l: 'สมัครกองทุนสำรอง',         badge: null },
    { l: 'Download documents',      badge: null },
    { l: 'Mobile (TAM)',            badge: null },
    { l: 'Tax Deduction',           badge: null },
  ].map((t, i) => ({ ...t, palette: BRAND_PALETTES[i % BRAND_PALETTES.length] }));

  const mockup = (
    <div style={{ ...cardStyle(true), padding: '20px 22px' }}>
      <div style={{
        position: 'absolute', width: 100, height: 130, right: -30, top: -40,
        background: `radial-gradient(circle, ${HO.accent} 0%, transparent 70%)`,
        opacity: 0.4,
      }}/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, position: 'relative' }}>
        <div>
          <div style={eyebrowStyle}>ลิงก์องค์กร · Central Retail</div>
          <h3 style={{
            margin: '4px 0 0',
            fontFamily: HO.fontDisplay,
            fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', color: HO.ink,
          }}>Organisational Updates</h3>
        </div>
        <div style={{ flex: 1 }}/>
        {[
          { id: 'all',  l: 'All (12)',         on: true  },
          { id: 'news', l: 'News (3)',         on: false },
          { id: 'link', l: 'Quick link (9)',   on: false },
        ].map(t => (
          <span key={t.id} style={{
            padding: '5px 12px', borderRadius: 999,
            fontSize: 11.5, fontWeight: 600,
            background: t.on ? HO.accent : 'transparent',
            color: t.on ? '#fff' : HO.inkSoft,
            border: `1px solid ${t.on ? HO.accent : HO.hairline}`,
          }}>{t.l}</span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {tiles.map(t => {
          const [c1, c2] = t.palette;
          return (
            <div key={t.l} style={{
              display: 'flex', alignItems: 'stretch',
              background: HO.surface, borderRadius: 12,
              border: `1px solid ${HO.hairline}`,
              overflow: 'hidden', minHeight: 78,
            }}>
              <div style={{
                width: 60, background: c2, position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRight: `1px solid ${c1}22`,
              }}>
                <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c1 }}/>
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect x="5" y="7" width="22" height="18" rx="2" stroke={c1} strokeWidth="2"/>
                  <rect x="5" y="7" width="22" height="3" fill={c1}/>
                </svg>
                {t.badge && (
                  <span style={{
                    position: 'absolute', top: 4, left: 4,
                    background: HO.accent, color: '#fff',
                    padding: '1px 6px', borderRadius: 3,
                    fontSize: 8.5, fontWeight: 700, letterSpacing: '.06em',
                  }}>{t.badge}</span>
                )}
              </div>
              <div style={{ flex: 1, padding: '10px 12px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: HO.ink, lineHeight: 1.3 }}>{t.l}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <HoFrame
      stepIdx={2} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="รับข้อมูล · ลิงก์องค์กรในที่เดียว"
      narrative="ก่อนเริ่มงาน Manager มักต้องเช็คข่าวสาร/ลิงก์จากสำนักงานใหญ่ — เอา shortcut ของ Central Retail intranet มารวมไว้ที่ Home แทนการบังคับเปิดหน้าใหม่"
      mockup={mockup}
      callouts={[
        // 1. Section header (eyebrow + title)
        { num: 1, x: MOCKUP_X + 14, y: BODY_TOP + 14, w: 230, h: 50 },
        // 2. Filter pills row
        { num: 2, x: MOCKUP_X + 530, y: BODY_TOP + 20, w: 320, h: 36, radius: 18 },
        // 3. Single tile (showcase grid item)
        { num: 3, x: MOCKUP_X + 230, y: BODY_TOP + 88, w: 200, h: 84 },
        // 4. "ใหม่" badge on a tile
        { num: 4, x: MOCKUP_X + 230, y: BODY_TOP + 92, w: 38, h: 18, radius: 6 },
      ]}
      annotations={[
        { num: 1, title: 'Section eyebrow + title',
          body: 'Eyebrow uppercase "ลิงก์องค์กร · Central Retail" บอก scope; title display font แยก typography hierarchy จาก body — pattern เดียวกับทุก section ใน Home' },
        { num: 2, title: 'Filter pills แทน tab',
          body: 'Pill รวม count ในป้าย (All 12 / News 3 / Quick link 9) ให้รู้ปริมาณก่อนคลิก · active = solid teal, inactive = ghost — ลดการเข้าหน้าใหม่' },
        { num: 3, title: 'Tile = thumbnail + label',
          body: 'แต่ละ tile cycle 5 duotone (teal · coral · butter · sage · ink) เพื่อ visual distinction — accent stripe ซ้ายเป็น brand color, thumbnail tinted bg, label เป็น tap target' },
        { num: 4, title: '"ใหม่" badge สำหรับ surface ใหม่',
          body: 'Badge teal บน corner เน้นเนื้อหาใหม่ (CNEXT | LINE, Tax Deduction) — ใช้ teal เดียวกับ primary CTA เพื่อ consistency ระหว่าง content และ action' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 3 · ลงมือทำ — Approvals + Pending docs
// ═══════════════════════════════════════════════════════════════════
function HomeOverviewFrame3() {
  const approvals = [
    { i: 'MK', c: HO.accent, n: 'มาร์คัส เคลลี่',  t: 'ลาพักร้อน 5 วัน', w: '28 เม.ย. – 2 พ.ค.', d: 'ยื่นเมื่อวาน' },
    { i: 'PS', c: HO.butter, n: 'พริยะ ชาห์',      t: 'ลาป่วย 1 วัน',    w: 'พรุ่งนี้',         d: '1 ชม.ก่อน' },
  ];
  const docs = [
    { t: 'แบบฟอร์ม PND91 ปี 2567', s: 'ภาษีเงินได้ประจำปี · กรอกรายได้', near: true },
    { t: 'เอกสารยืนยันที่อยู่',     s: 'ตรงตามทะเบียนบ้าน · รูปถ่าย',  near: false },
    { t: 'กองทุนสำรองเลี้ยงชีพ',    s: 'เลือกสัดส่วนเงินสมทบ',         near: false },
  ];

  const mockup = (
    <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1.35fr 1fr' }}>
      {/* Approvals card */}
      <div style={{ ...cardStyle(false), minHeight: 280 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={eyebrowStyle}>รออนุมัติ</div>
            <h3 style={{
              margin: '6px 0 0',
              fontFamily: HO.fontDisplay,
              fontSize: 19, fontWeight: 600, color: HO.ink, letterSpacing: '-0.01em',
            }}>คำขอลางาน</h3>
          </div>
          <span style={{ marginLeft: 'auto' }}>
            <HoTag bg={HO.coral}>2 รายการ</HoTag>
          </span>
        </div>
        {approvals.map(a => (
          <div key={a.n} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0',
            borderTop: `1px solid ${HO.hairlineSoft}`,
          }}>
            <HoAvatar initials={a.i} color={a.c} size={36}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: HO.ink }}>
                {a.n} <span style={{ color: HO.inkMuted, fontWeight: 400 }}>· {a.t}</span>
              </div>
              <div style={{ fontSize: 12, color: HO.inkMuted, marginTop: 2 }}>
                {a.w} · {a.d}
              </div>
            </div>
            <button style={{ ...btnGhost, padding: '5px 10px', fontSize: 12 }}>✕ ปฏิเสธ</button>
            <button style={{ ...btnPrimary, padding: '5px 10px', fontSize: 12 }}>✓ อนุมัติ</button>
          </div>
        ))}
      </div>

      {/* Pending docs card */}
      <div style={{ ...cardStyle(true), minHeight: 280 }}>
        <div style={eyebrowStyle}>เอกสารค้าง</div>
        <h3 style={{
          margin: '6px 0 12px',
          fontFamily: HO.fontDisplay,
          fontSize: 19, fontWeight: 600, color: HO.ink, letterSpacing: '-0.01em',
        }}>ต้องทำให้เสร็จ</h3>
        {docs.map(d => (
          <div key={d.t} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 0',
            borderTop: `1px solid ${HO.hairlineSoft}`,
          }}>
            <div style={{
              width: 30, height: 38, borderRadius: 5,
              background: HO.surface,
              border: `1px solid ${HO.hairline}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: HO.inkMuted, fontSize: 12,
            }}>📄</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: HO.ink }}>{d.t}</div>
              <div style={{ fontSize: 11.5, color: HO.inkMuted, marginTop: 1 }}>{d.s}</div>
            </div>
            {d.near && <HoTag bg={HO.butterSoft} color={HO.ink}>ใกล้ครบกำหนด</HoTag>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <HoFrame
      stepIdx={3} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="ลงมือทำ · งานเร่งด่วนใน 1 คลิก"
      narrative="Manager เห็นงานที่ต้องทำ (อนุมัติลา + เอกสารค้าง) จาก Home โดยตรง — approve/reject inline ไม่ต้องเข้าหน้า approval แยก; เอกสารส่วนตัวปักธง 'ใกล้ครบกำหนด' เพื่อ urgency cue"
      mockup={mockup}
      callouts={[
        // 1. Single approval row with all info + buttons
        { num: 1, x: MOCKUP_X + 14, y: BODY_TOP + 70, w: 490, h: 64 },
        // 2. Inline approve/reject buttons
        { num: 2, x: MOCKUP_X + 365, y: BODY_TOP + 84, w: 140, h: 36, radius: 10 },
        // 3. Cream card variant (Pending docs)
        { num: 3, x: MOCKUP_X + 530, y: BODY_TOP + 4, w: 340, h: 70 },
        // 4. "ใกล้ครบกำหนด" tag
        { num: 4, x: MOCKUP_X + 770, y: BODY_TOP + 92, w: 96, h: 22, radius: 11 },
      ]}
      annotations={[
        { num: 1, title: 'Inline approval row',
          body: 'แต่ละแถวมี: avatar · ชื่อ + ประเภทลา · ระยะเวลา · timestamp · ปุ่ม approve/reject — ทุกข้อมูลที่ต้องตัดสินใจอยู่ในแถวเดียว ไม่ต้องเข้า detail page' },
        { num: 2, title: 'Pumpkin danger ไม่ใช่สีแดง',
          body: 'ปุ่ม "ปฏิเสธ" ใช้ ghost (text only) ไม่ใช่ red solid — ลด aggressive tone; approve เด่นกว่าด้วย teal solid เพราะเป็น expected path' },
        { num: 3, title: 'Cream card variant',
          body: 'เอกสารค้างใช้ creamSoft background แยกจาก approvals (white surface) — สื่อว่าเป็นงานส่วนตัวคนเดียว ไม่ใช่ workflow ที่ต้องตัดสินใจให้คนอื่น' },
        { num: 4, title: 'Butter tag = ใกล้ครบกำหนด',
          body: 'ใช้ butter (warm yellow) แทน red urgency — สื่อ "ระวัง" แต่ไม่ alarming; PND91 ภาษีประจำปีเป็น recurring deadline ที่ต้องเตือนแต่ไม่ panic' },
      ]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// Frame 4 · เชื่อมสัมพันธ์ — Announcements + Birthday
// ═══════════════════════════════════════════════════════════════════
function HomeOverviewFrame4() {
  const posts = [
    {
      who: 'จอร์แดน เหมย · ฝ่ายบุคคล', i: 'JM', c: HO.sage, w: 'เมื่อวาน', pin: true,
      t: 'นโยบายลาคลอดใหม่ · เริ่มใช้ 1 พ.ค.',
      b: 'ขยายสิทธิลาคลอดเป็น 16 สัปดาห์โดยรับค่าจ้างเต็ม · เซสชันถามตอบพฤหัสบดี 15:00',
      r: ['❤️ 42', '🎉 21'],
    },
    {
      who: 'ฝ่ายปฏิบัติการ', i: 'OP', c: HO.accent, w: '2 วันก่อน',
      t: 'ตรวจนับสินค้าฤดูใบไม้ผลิ · เสาร์ 25 เม.ย.',
      b: 'ปิดก่อนกำหนด 30 นาที · ค่าแรงตามอัตรากะ + อาหาร',
      r: ['👍 14', '🙌 6'],
    },
  ];

  const mockup = (
    <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1.35fr 1fr' }}>
      {/* Announcements feed */}
      <div style={{ ...cardStyle(false), padding: '20px 22px', minHeight: 380 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={eyebrowStyle}>ประกาศ</div>
            <h3 style={{
              margin: '6px 0 0',
              fontFamily: HO.fontDisplay,
              fontSize: 19, fontWeight: 600, color: HO.ink, letterSpacing: '-0.01em',
            }}>สำคัญสำหรับคุณ</h3>
          </div>
          <div style={{ flex: 1 }}/>
          <a style={{
            color: HO.accent, fontSize: 12.5, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>เปิดฟีด →</a>
        </div>
        {posts.map((p, idx) => (
          <article key={p.t} style={{
            padding: '14px 14px',
            margin: idx === 0 ? '0 0 12px' : '0',
            background: p.pin ? HO.creamSoft : HO.surface,
            border: `1px solid ${p.pin ? HO.butterSoft : HO.hairlineSoft}`,
            borderRadius: 12,
            position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <HoAvatar initials={p.i} color={p.c} size={28}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5 }}>
                  <b>{p.who}</b>
                  <span style={{ color: HO.inkMuted }}> · {p.w}</span>
                </div>
              </div>
              {p.pin && <HoTag bg={HO.ink}>📌 ปักหมุด</HoTag>}
            </div>
            <h4 style={{
              margin: '8px 0 0',
              fontFamily: HO.fontDisplay,
              fontSize: 16, fontWeight: 600, color: HO.ink, letterSpacing: '-0.005em',
            }}>{p.t}</h4>
            <p style={{
              margin: '6px 0 0',
              fontSize: 12.5, lineHeight: 1.55, color: HO.inkSoft,
            }}>{p.b}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              {p.r.map(x => (
                <span key={x} style={{
                  background: HO.creamSoft, color: HO.inkSoft,
                  padding: '3px 9px', borderRadius: 999, fontSize: 11.5,
                  border: `1px solid ${HO.hairlineSoft}`,
                }}>{x}</span>
              ))}
              <div style={{ flex: 1 }}/>
              <button style={{ ...btnGhost, padding: '4px 10px', fontSize: 11.5 }}>ตอบกลับ</button>
            </div>
          </article>
        ))}
      </div>

      {/* Birthday card (dark ink variant) */}
      <div style={{
        background: HO.ink,
        borderRadius: 18,
        padding: '20px 22px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 200,
      }}>
        <div style={{
          position: 'absolute', width: 110, height: 130, right: -20, bottom: -30,
          background: `radial-gradient(circle, ${HO.accent} 0%, transparent 70%)`,
          opacity: 0.55,
        }}/>
        <div style={{
          ...eyebrowStyle,
          color: HO.accent,
          position: 'relative',
        }}>🎉 สัปดาห์นี้</div>
        <h3 style={{
          margin: '8px 0 0',
          fontFamily: HO.fontDisplay,
          fontSize: 19, fontWeight: 600, color: HO.creamSoft, letterSpacing: '-0.01em',
          position: 'relative',
        }}>วันเกิด 2 คน · ครบรอบ 1 คน</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 14, position: 'relative' }}>
          {['TS','RP','JC'].map((s, idx) => (
            <span key={s} style={{ marginLeft: idx === 0 ? 0 : -6 }}>
              <HoAvatar initials={s} size={32}
                        color={[HO.accent, HO.coral, HO.sage][idx]}
                        border={HO.ink}/>
            </span>
          ))}
          <div style={{ flex: 1 }}/>
          <button style={btnPrimary}>ส่งคำอวยพร</button>
        </div>
      </div>
    </div>
  );

  return (
    <HoFrame
      stepIdx={4} totalSteps={4}
      persona="Manager · คุณจงรักษ์"
      title="เชื่อมสัมพันธ์ · Humi ไม่ใช่แค่ admin tool"
      narrative="Announcement feed + Birthday widget ทำให้ Home รู้สึก 'อบอุ่น' ตามหลักการ Humi (warm · Thai-first · human) แยกจาก SAP SuccessFactors เดิมที่เป็น admin tool ล้วน — culture surface ก่อน workflow"
      mockup={mockup}
      callouts={[
        // 1. Pinned post indicator (cream bg + butter border)
        { num: 1, x: MOCKUP_X + 14, y: BODY_TOP + 56, w: 490, h: 156 },
        // 2. Reactions row inside post
        { num: 2, x: MOCKUP_X + 28, y: BODY_TOP + 170, w: 170, h: 30, radius: 15 },
        // 3. Dark ink birthday card
        { num: 3, x: MOCKUP_X + 530, y: BODY_TOP, w: 340, h: 200 },
        // 4. Send wish button
        { num: 4, x: MOCKUP_X + 752, y: BODY_TOP + 152, w: 116, h: 36, radius: 10 },
      ]}
      annotations={[
        { num: 1, title: 'Pinned post · butter halo',
          body: 'โพสต์ปักหมุด (นโยบายลาคลอด) ใช้ creamSoft bg + butter border ให้เด่นจาก feed ปกติ; tag "📌 ปักหมุด" ink dark เพื่อ contrast สูง — ทำให้ scan เจอใน 1 วินาที' },
        { num: 2, title: 'Emoji reactions = ไม่ทางการ',
          body: '❤️ 42 · 🎉 21 แทน "Like" button — สื่อ tone เพื่อนร่วมงาน ไม่ใช่ corporate; reaction count แสดงให้รู้สึก community engagement' },
        { num: 3, title: 'Dark ink variant card',
          body: 'Birthday widget ใช้ ink background (#0E1B2C) ตัดกับทุก card อื่นในหน้า — เปลี่ยน mood จาก "งาน" เป็น "ฉลอง"; teal accent กลับมาเป็น text color บน dark surface' },
        { num: 4, title: '"ส่งคำอวยพร" CTA บน dark',
          body: 'Primary button teal เหมือนเดิม — invariant ของ design system: primary action สีเดียวกันไม่ว่า surface เป็น light/dark/cream; ทำให้ user คาดเดา interaction ได้ตลอด' },
      ]}
    />
  );
}

// ── Expose to window for use in deck HTML / DesignCanvas ────────────
Object.assign(window, {
  HomeOverviewFrame1,
  HomeOverviewFrame2,
  HomeOverviewFrame3,
  HomeOverviewFrame4,
  HoFrame,
  HoAnnotation,
});
