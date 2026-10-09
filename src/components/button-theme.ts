import type { CSSProperties } from "react";

// Use Kumo's style API while retaining readable white text in every gradient state.
export const primaryButtonStyle = {
  "--kumo-button-emphasis-bg": "var(--vex-cyan-hover)",
  "--kumo-button-emphasis-gradient-start": "var(--vex-cyan)",
  "--kumo-button-emphasis-gradient-end": "var(--vex-cyan-hover)",
} as CSSProperties;
