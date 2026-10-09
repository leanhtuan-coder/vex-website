interface GridProps {
  id: string;
  width: number;
  height: number;
  step?: number;
  opacity?: number;
}

export function VexTechnicalGrid({
  id,
  width,
  height,
  step = 28,
  opacity = 0.12,
}: GridProps) {
  return (
    <>
      <defs>
        <pattern
          id={id}
          width={step}
          height={step}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M${step} 0H0V${step}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect
        width={width}
        height={height}
        fill={`url(#${id})`}
        opacity={opacity}
      />
    </>
  );
}

export function VexCrosshair({
  x,
  y,
  size = 7,
}: {
  x: number;
  y: number;
  size?: number;
}) {
  return (
    <path
      d={`M${x - size} ${y}H${x + size}M${x} ${y - size}V${y + size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
  );
}

export function VexPixel({
  x,
  y,
  size = 7,
  outline = false,
}: {
  x: number;
  y: number;
  size?: number;
  outline?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      fill={outline ? "none" : "currentColor"}
      stroke={outline ? "currentColor" : undefined}
      strokeWidth="1.5"
    />
  );
}

export function VexDivider() {
  return (
    <svg
      className="vex-technical-divider"
      viewBox="0 0 1248 16"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 8H1040L1048 0H1136L1144 8H1248"
        className="vex-divider-line"
      />
      <path
        d="M1080 4L1084 8L1080 12M1092 4L1096 8L1092 12"
        className="vex-divider-arrow"
      />
      <rect x="0" y="5" width="6" height="6" className="vex-divider-pixel" />
    </svg>
  );
}
