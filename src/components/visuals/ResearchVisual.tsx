import { useId } from "react";
import { VexCrosshair, VexPixel, VexTechnicalGrid } from "./VexPrimitives";

export default function ResearchVisual() {
  const gridId = `vex-research-grid-${useId()}`;
  return (
    <div className="vex-research-visual" aria-hidden="true">
      <svg viewBox="0 0 560 260" fill="none" focusable="false">
        <VexTechnicalGrid
          id={gridId}
          width={560}
          height={260}
          step={32}
          opacity={0.09}
        />
        <g className="vex-research-rails">
          <path d="M20 133H125L194 64H360L432 136H540M20 197H125L194 128H360L432 200H540" />
          <path d="M125 133V197M432 136V200M194 64V128M360 64V128" />
          <path d="M40 58H90M470 230H520" />
        </g>
        <g className="vex-research-planes">
          <path
            d="M163 113L279 178L395 113L279 48Z"
            className="vex-research-plane-back"
          />
          <path
            d="M163 145L279 210L395 145L279 80Z"
            className="vex-research-plane"
          />
          <path
            d="M228 118H263L296 145L263 172H228L261 145Z"
            className="vex-research-arrow-back"
          />
          <path
            d="M278 118H313L346 145L313 172H278L311 145Z"
            className="vex-research-arrow-front"
          />
        </g>
        <g className="vex-research-pixels">
          <VexPixel x={16} y={129} size={8} outline />
          <VexPixel x={16} y={193} size={8} outline />
          <VexPixel x={536} y={132} size={8} outline />
          <VexPixel x={536} y={196} size={8} outline />
          <VexPixel x={115} y={87} size={12} />
          <VexPixel x={134} y={106} size={8} />
          <VexPixel x={430} y={215} size={9} />
        </g>
        <g className="vex-research-registration">
          <VexCrosshair x={50} y={218} />
          <VexCrosshair x={502} y={48} />
        </g>
      </svg>
    </div>
  );
}
