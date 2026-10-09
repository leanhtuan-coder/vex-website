import type { CSSProperties } from "react";

// A flat brand fill through Kumo's style API, with a darker hover state.
export const primaryButtonStyle = {
  "--kumo-button-emphasis-bg": "var(--vex-cyan-hover)",
  "--kumo-button-emphasis-gradient-start": "var(--vex-cyan)",
  "--kumo-button-emphasis-gradient-end": "var(--vex-cyan)",
} as CSSProperties;
