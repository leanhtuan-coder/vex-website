export function BrandResourceVisual() {
  return (
    <div className="media-brand-visual" aria-hidden="true">
      <svg viewBox="0 0 480 288" fill="none" focusable="false">
        <g stroke="var(--vex-cyan-line)" strokeWidth="1">
          {[48, 96, 144, 192, 240, 288, 336, 384, 432].map((x) => (
            <path key={`x-${x}`} d={`M${x} 0V288`} />
          ))}
          {[48, 96, 144, 192, 240].map((y) => (
            <path key={`y-${y}`} d={`M0 ${y}H480`} />
          ))}
          <path d="M24 24H48M24 24V48M456 24H432M456 24V48M24 264H48M24 264V240M456 264H432M456 264V240" />
        </g>
        <path d="M92 168H164V96H212V216H92V168Z" fill="var(--vex-mint)" />
        <path
          d="M236 72H356V192H308V154L260 202L226 168L274 120H236V72Z"
          fill="var(--vex-cyan)"
        />
        <path d="M68 72H164M308 216H404" stroke="var(--vex-cyan)" />
        <rect x="64" y="68" width="8" height="8" fill="var(--vex-cyan)" />
        <rect x="400" y="212" width="8" height="8" fill="var(--vex-cyan)" />
        <rect x="376" y="72" width="20" height="20" fill="var(--vex-mint)" />
        <rect x="116" y="120" width="12" height="12" fill="var(--vex-cyan)" />
      </svg>
      <div className="media-brand-visual-label">
        <span>VEX / BRAND RESOURCES</span>
        <span>SVG + PNG</span>
      </div>
    </div>
  );
}
