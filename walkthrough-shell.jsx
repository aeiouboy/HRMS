// walkthrough-shell.jsx
// Shared shell for module Design Walkthroughs.
//
// Each module walkthrough is a sequence of "frames" (storyboard panels)
// that explain the design rationale of one module by:
//   1. Rendering a simplified mockup of the module
//   2. Drawing dashed callout outlines around key components
//   3. Connecting each callout to a numbered annotation card with a
//      bezier connector line and matching badge number
//
// This file defines the shared primitives — design tokens, layout
// constants, the <WalkFrame> shell, the <WalkAnnotation> card, common
// style helpers, and tiny <WalkAvatar> / <WalkTag> primitives — so
// each per-module walkthrough file stays focused on the storyboard
// content (mockup JSX + callout coords + annotation text).
//
// Mount via window globals; the per-module files do:
//   const { WALK, WalkFrame, WalkAvatar, WalkTag, walkStyles } = window;

// ── Design tokens ──────────────────────────────────────────────────
const WALK = {
  accent:       '#1FA8A0',
  accentSoft:   'rgba(31,168,160,0.10)',
  ink:          '#0E1B2C',
  inkSoft:      '#243447',
  inkMuted:     '#5A6A7E',
  inkFaint:     '#8A97A8',
  cream:        '#F6F1E8',
  creamSoft:    '#FCFAF5',
  surface:      '#FFFFFF',
  hairline:     '#E7DFD1',
  hairlineSoft: '#EFE9DC',
  coral:        '#E08864',
  coralSoft:    '#FBE7DC',
  butter:       '#D4A53A',
  butterSoft:   '#F4E4B8',
  sage:         '#7DA084',
  sageSoft:     '#D9E5DA',
  indigo:       '#5B6CE0',
  indigoSoft:   '#E1E4FB',
  warning:      '#F59E0B',
  warningSoft:  '#FEF3C7',
  danger:       '#DC2626',
  dangerSoft:   '#FEE2E2',
  success:      '#15803D',
  successSoft:  '#D1FAE5',

  font:         'CPN, Anuphan, system-ui, -apple-system, "Segoe UI", sans-serif',
  fontDisplay:  '"CPN Condensed", CPN, Anuphan, system-ui, sans-serif',

  // ── Layout (all frames share the same outer dimensions so they slot
  // uniformly into a horizontal storyboard row in DCSection) ────────
  // FRAME_H is the *default*; individual frames can override via the
  // `frameHeight` prop on <WalkFrame> when the mockup is taller (e.g.
  // full Home page = ~1900). Spotlight pattern keeps annotations in
  // the right column so callouts stay readable even on tall frames.
  FRAME_W:        1500,
  FRAME_H:        760,
  HEAD_H:         96,
  BODY_TOP:       120,   // = HEAD_H + 24
  MOCKUP_X:       40,
  MOCKUP_W:       880,
  ANNOT_X:        1080,
  ANNOT_W:        380,
  ANNOT_CARD_H:   122,
  ANNOT_GAP:      14,
};

// Y centre of the numbered badge on annotation card N (1-indexed).
function walkBadgeY(num) {
  return WALK.BODY_TOP + (num - 1) * (WALK.ANNOT_CARD_H + WALK.ANNOT_GAP) + 30;
}

// ── WalkFrame: storyboard shell ────────────────────────────────────
// Renders header narrative + mockup column + annotation column +
// the SVG overlay that paints dashed callout boxes and connector lines.
//
// Props:
//   stepIdx       — 1-indexed step number in the journey
//   totalSteps    — total step count (for "N / M" indicator)
//   persona       — short persona label (e.g. "Manager · จงรักษ์")
//   title         — frame heading
//   narrative     — short rationale paragraph in the header chip
//   mockup        — JSX rendered into the mockup column
//   callouts      — [{ num, x, y, w, h, radius?, color? }, ...]
//                   coords are in frame-space pixels (origin = frame top-left)
//   annotations   — [{ num, title, body, color? }, ...]
//                   length should match callouts; both ordered by num
function WalkFrame({
  stepIdx, totalSteps, persona, title, narrative,
  mockup, callouts = [], annotations = [],
  // ── Spotlight retrofit props ─────────────────────────────────────
  // dim       — when true, paint a translucent overlay everywhere
  //             EXCEPT inside the callout rectangles. The page mockup
  //             stays visible underneath; the audience sees full
  //             context while the spotlight pulls attention to one
  //             region. Pairs with the dashed callout outline on top.
  // dimOpacity — 0..1 (default 0.25 = subtle, per plan §3 question 3)
  // frameHeight — override the default 760 when the mockup needs the
  //             whole production page in one frame (e.g. Home = 1900).
  //             Annotation column re-flows from the top automatically.
  dim         = false,
  dimOpacity  = 0.25,
  frameHeight,
}) {
  const FH = frameHeight || WALK.FRAME_H;
  const maskId = `walk-spot-${stepIdx}-${callouts.length}-${FH}`;

  return (
    <div style={{
      width: WALK.FRAME_W,
      height: FH,
      background: WALK.cream,
      fontFamily: WALK.font,
      color: WALK.ink,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* ── Header strip ────────────────────────────────────────── */}
      <div style={{
        height: WALK.HEAD_H,
        padding: '20px 40px',
        borderBottom: `1px solid ${WALK.hairline}`,
        background: WALK.creamSoft,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 24,
          background: WALK.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: WALK.fontDisplay,
          fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em',
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0,
        }}>
          {String(stepIdx).padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase',
            color: WALK.inkMuted, fontWeight: 600,
          }}>
            Frame {stepIdx} / {totalSteps} · Persona: {persona}
          </div>
          <h2 style={{
            margin: '3px 0 0',
            fontFamily: WALK.fontDisplay,
            fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em',
            color: WALK.ink,
          }}>{title}</h2>
        </div>
        <div style={{
          maxWidth: 520, flexShrink: 0,
          fontSize: 13, lineHeight: 1.55, color: WALK.inkSoft,
          padding: '10px 14px',
          background: WALK.surface,
          borderRadius: 10,
          border: `1px solid ${WALK.hairline}`,
        }}>{narrative}</div>
      </div>

      {/* ── Mockup column ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: WALK.MOCKUP_X, top: WALK.BODY_TOP,
        width: WALK.MOCKUP_W,
      }}>{mockup}</div>

      {/* ── Annotation column ───────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: WALK.ANNOT_X, top: WALK.BODY_TOP,
        width: WALK.ANNOT_W,
        display: 'flex', flexDirection: 'column', gap: WALK.ANNOT_GAP,
      }}>
        {annotations.map(a => (
          <WalkAnnotation key={a.num} num={a.num}
                          title={a.title} body={a.body}
                          color={a.color || WALK.accent}/>
        ))}
      </div>

      {/* ── Overlay: dim mask + callout outlines + bezier connectors ─ */}
      <svg width={WALK.FRAME_W} height={FH}
           style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* SVG mask: white = visible (dim painted), black = punch hole
            (mockup shows through). Only mounted when dim is enabled so
            the legacy non-dim modules keep their original look. */}
        {dim && (
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width={WALK.FRAME_W} height={FH} fill="white"/>
              {callouts.map(c => (
                <rect key={`hole-${c.num}`}
                      x={c.x} y={c.y} width={c.w} height={c.h}
                      rx={c.radius != null ? c.radius : 12}
                      fill="black"/>
              ))}
            </mask>
          </defs>
        )}
        {dim && (
          // Cover only the mockup column so the header + annotations
          // stay crisp. Anchored to MOCKUP_X / BODY_TOP and extended to
          // the right edge of the mockup area (920px = 40 + 880).
          <rect
            x={WALK.MOCKUP_X - 8}
            y={WALK.BODY_TOP - 8}
            width={WALK.MOCKUP_W + 16}
            height={FH - WALK.BODY_TOP + 8}
            fill={WALK.ink}
            fillOpacity={dimOpacity}
            mask={`url(#${maskId})`}
          />
        )}

        {callouts.map(c => {
          const color = c.color || WALK.accent;
          const r = c.radius != null ? c.radius : 12;
          const startX = c.x + c.w;
          const startY = c.y + c.h / 2;
          const endX = WALK.ANNOT_X - 14;
          const endY = walkBadgeY(c.num);

          // ── Connector routing (text-overlap avoidance) ────────────
          // For NARROW callouts (sidebars, rails) a straight bezier
          // from the right edge would slice horizontally across rows
          // of body copy in the mockup. Instead we route a Manhattan
          // U-shape that hugs the empty 24-px gap between the header
          // strip and the mockup top — the line exits the callout
          // UP from just below its top edge, runs RIGHT across the
          // gap above the mockup, then comes DOWN in the column gap
          // beside the annotation card. The vertical exit stays at
          // the callout's right edge (typically card padding or the
          // mockup boundary, both text-free).
          //
          // For WIDE callouts that already reach the mockup right
          // edge (e.g. full-row spotlights in Home), the short bezier
          // through the column gap stays in empty space — keep that
          // path.
          const mockupRight = WALK.MOCKUP_X + WALK.MOCKUP_W;  // 920
          const topY        = WALK.BODY_TOP - 12;             // 108: in header-mockup gap
          const useTopRoute = (mockupRight - startX) > 60;

          // Vertical exit anchor — drop just below any top-edge badge
          // so the connector visually emerges from the callout body
          // rather than the badge itself.
          const exitY = c.y + 16;

          let path;
          if (useTopRoute) {
            // Manhattan U with small rounded corners (quadratic joins)
            const r1 = 8;
            path =
              `M ${startX} ${exitY}` +
              ` L ${startX} ${topY + r1}` +
              ` Q ${startX} ${topY}  ${startX + r1} ${topY}` +
              ` L ${endX - r1} ${topY}` +
              ` Q ${endX} ${topY}  ${endX} ${topY + r1}` +
              ` L ${endX} ${endY}`;
          } else {
            const ext = Math.max(30, Math.min(140, (endX - startX) / 2.5));
            path = `M ${startX} ${startY} C ${startX + ext} ${startY} ${endX - ext} ${endY} ${endX} ${endY}`;
          }

          // Start dot anchored to the callout (right edge midline for
          // wide callouts; just below top-right corner for narrow ones
          // routed via TOP).
          const startDotX = useTopRoute ? startX : startX;
          const startDotY = useTopRoute ? exitY  : startY;

          return (
            <g key={c.num}>
              {/* Tint fill is skipped under dim mode (the spotlight
                  already isolates the region); keep the dashed border
                  and badge for both modes. */}
              {!dim && (
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={r}
                      fill={color} opacity="0.07"/>
              )}
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={r}
                    fill="none" stroke={color} strokeWidth="2"
                    strokeDasharray="6 5"/>
              <circle cx={c.x} cy={c.y} r={13} fill={color}/>
              <text x={c.x} y={c.y + 4.5} textAnchor="middle"
                    fontSize="13" fontWeight="700" fill="#fff"
                    fontFamily="ui-sans-serif, system-ui">{c.num}</text>
              {/* Cream halo first — masks text behind the line strip
                  so the dashed connector stays sharp without overlap. */}
              <path d={path}
                    stroke={WALK.cream} strokeWidth="5" fill="none"
                    strokeLinecap="round" opacity="0.85"/>
              {/* Dashed connector on top — subtle 0.55 opacity, thinner
                  stroke so it whispers rather than shouts. */}
              <path d={path}
                    stroke={color} strokeWidth="1.3" fill="none"
                    strokeDasharray="5 4" opacity="0.55"/>
              <circle cx={startDotX} cy={startDotY} r={3.5} fill={color}/>
              <circle cx={endX} cy={endY} r={3.5} fill={color}/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── WalkAnnotation: numbered rationale card ────────────────────────
function WalkAnnotation({ num, title, body, color }) {
  return (
    <div style={{
      background: WALK.surface,
      borderRadius: 14,
      border: `1px solid ${WALK.hairline}`,
      padding: '14px 16px 14px 26px',
      position: 'relative',
      boxShadow: '0 1px 2px rgba(14,27,44,.04), 0 4px 12px rgba(14,27,44,.04)',
      minHeight: WALK.ANNOT_CARD_H - 2,
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
        fontFamily: WALK.fontDisplay,
        fontSize: 14.5, fontWeight: 600, color: WALK.ink,
        letterSpacing: '-0.005em', lineHeight: 1.3,
      }}>{title}</h4>
      <p style={{
        margin: '6px 0 0',
        fontSize: 12.5, lineHeight: 1.55, color: WALK.inkSoft,
      }}>{body}</p>
    </div>
  );
}

// ── Common style helpers ───────────────────────────────────────────
const walkStyles = {
  eyebrow: {
    fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase',
    color: WALK.inkMuted, fontWeight: 600,
  },
  card: (cream = false) => ({
    background: cream ? WALK.creamSoft : WALK.surface,
    border: `1px solid ${WALK.hairline}`,
    borderRadius: 18,
    padding: '20px 22px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(14,27,44,.04), 0 4px 12px rgba(14,27,44,.04)',
  }),
  cardDark: {
    background: WALK.ink,
    borderRadius: 18,
    padding: '20px 22px',
    position: 'relative',
    overflow: 'hidden',
    color: WALK.creamSoft,
  },
  btnPrimary: {
    background: WALK.accent, color: '#fff',
    border: 0, borderRadius: 10,
    padding: '8px 14px',
    fontSize: 13, fontWeight: 600, fontFamily: WALK.font,
    display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
  },
  btnGhost: {
    background: 'transparent', color: WALK.inkSoft,
    border: `1px solid ${WALK.hairline}`, borderRadius: 10,
    padding: '8px 14px',
    fontSize: 13, fontWeight: 600, fontFamily: WALK.font,
    display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
  },
  h3Display: {
    margin: '6px 0 0',
    fontFamily: WALK.fontDisplay,
    fontSize: 19, fontWeight: 600, color: WALK.ink, letterSpacing: '-0.01em',
  },
  row: { display: 'flex', alignItems: 'center', gap: 10 },
  col: { display: 'flex', flexDirection: 'column' },
  divider: { height: 1, background: WALK.hairlineSoft, margin: '14px 0' },
};

// ── WalkAvatar: small circular initials chip ───────────────────────
function WalkAvatar({ initials, color = WALK.accent, size = 28, border = '#fff' }) {
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

// ── WalkTag: pill-shaped label ─────────────────────────────────────
function WalkTag({ children, bg = WALK.accent, color = '#fff' }) {
  return (
    <span style={{
      background: bg, color,
      padding: '3px 10px', borderRadius: 999,
      fontSize: 10.5, fontWeight: 600, letterSpacing: '.06em',
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>{children}</span>
  );
}

// ── Expose to window ───────────────────────────────────────────────
Object.assign(window, {
  WALK,
  WalkFrame,
  WalkAnnotation,
  WalkAvatar,
  WalkTag,
  walkStyles,
  walkBadgeY,
});
