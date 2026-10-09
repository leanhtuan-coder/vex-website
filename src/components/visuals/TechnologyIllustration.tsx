import { useId } from "react";
import { VexCrosshair, VexPixel, VexTechnicalGrid } from "./VexPrimitives";

export type TechnologyVisualKind =
  "software" | "ai" | "robotics" | "automation";

function SoftwareScene() {
  return (
    <>
      <g className="vex-scene-rail">
        <path d="M22 174H76L116 134M304 134L344 174H398M210 190V218" />
        <path d="M78 68H110M310 68H342" />
      </g>
      <g className="vex-scene-lift">
        <path
          d="M96 139L210 199L324 139L210 79Z"
          className="vex-scene-outline"
        />
        <path
          d="M96 112L210 172L324 112L210 52Z"
          className="vex-scene-surface"
        />
        <path d="M96 112V127L210 187V172Z" className="vex-scene-soft" />
        <path d="M210 172V187L324 127V112Z" className="vex-scene-accent" />
        <path d="M96 85L210 145L324 85L210 25Z" className="vex-scene-surface" />
        <path d="M96 85V100L210 160V145Z" className="vex-scene-soft" />
        <path d="M210 145V160L324 100V85Z" className="vex-scene-accent" />
        <path
          d="M147 78L182 59L215 77L180 96ZM205 108L238 90L271 108L238 126Z"
          className="vex-scene-outline"
        />
        <path d="M181 96L204 108M215 77L239 90" className="vex-scene-line" />
        <path d="M165 77L179 69M224 108L237 101" className="vex-scene-mark" />
      </g>
      <g className="vex-scene-pixels">
        <VexPixel x={18} y={170} size={8} outline />
        <VexPixel x={394} y={170} size={8} outline />
        <VexPixel x={206} y={215} size={8} />
        <VexPixel x={67} y={63} size={10} />
      </g>
    </>
  );
}

function AIScene() {
  return (
    <>
      <g className="vex-scene-rail">
        <path d="M22 116H84M336 116H398M84 116L104 96M316 96L336 116" />
        <path d="M103 180H148M272 180H316" />
      </g>
      <g className="vex-scene-lift">
        <path d="M104 51H316V189H104Z" className="vex-scene-soft" />
        <path
          d="M92 65V39H120M300 39H328V65M328 175V201H300M120 201H92V175"
          className="vex-scene-line"
        />
        <path
          d="M132 156L174 99L208 133L252 76L289 156Z"
          className="vex-scene-surface"
        />
        <path
          d="M158 77H265V165H158Z"
          className="vex-scene-outline"
          strokeDasharray="4 6"
        />
        <path
          d="M158 94V77H175M248 77H265V94M265 148V165H248M175 165H158V148"
          className="vex-scene-mark"
        />
        <path
          d="M174 99L208 133L252 76M174 99L193 79L228 100L252 76"
          className="vex-scene-line"
        />
        <circle cx="174" cy="99" r="5" className="vex-scene-accent" />
        <circle cx="208" cy="133" r="5" className="vex-scene-accent" />
        <circle cx="252" cy="76" r="5" className="vex-scene-accent" />
      </g>
      <g className="vex-scene-pixels">
        <VexPixel x={18} y={112} size={8} outline />
        <VexPixel x={394} y={112} size={8} outline />
        <VexPixel x={274} y={174} size={8} />
        <VexPixel x={288} y={174} size={5} />
      </g>
    </>
  );
}

function RoboticsScene() {
  return (
    <>
      <g className="vex-scene-rail">
        <path d="M26 174H81L108 147M302 174H394M325 102H366V152" />
        <path d="M100 207H308M178 202V216M282 202V216" />
      </g>
      <g className="vex-scene-lift">
        <path
          d="M133 185L205 222L276 185L205 148Z"
          className="vex-scene-soft"
        />
        <path d="M181 159H227V184H181Z" className="vex-scene-surface" />
        <path d="M200 164L174 137L218 82L285 111" className="vex-scene-arm" />
        <path d="M200 164L174 137L218 82L285 111" className="vex-scene-line" />
        <circle cx="174" cy="137" r="14" className="vex-scene-surface" />
        <circle cx="218" cy="82" r="14" className="vex-scene-surface" />
        <circle cx="285" cy="111" r="10" className="vex-scene-accent" />
        <circle cx="174" cy="137" r="4" className="vex-scene-accent" />
        <circle cx="218" cy="82" r="4" className="vex-scene-accent" />
        <path
          d="M292 112L313 121L307 134M292 120L299 144L312 144"
          className="vex-scene-line"
        />
        <path
          d="M97 103L122 116L147 103L122 90ZM97 103V129L122 142L147 129V103M122 116V142"
          className="vex-scene-outline"
        />
        <path d="M242 47H271M257 32V62" className="vex-scene-rail" />
      </g>
      <g className="vex-scene-pixels">
        <VexPixel x={22} y={170} size={8} outline />
        <VexPixel x={390} y={170} size={8} outline />
        <VexPixel x={119} y={73} size={7} />
      </g>
    </>
  );
}

function AutomationScene() {
  return (
    <>
      <g className="vex-scene-rail">
        <path d="M62 120H147M273 72H324M273 168H324M357 72H389V168H357M357 120H405" />
        <path d="M238 120H259V72H273M259 120V168H273" />
        <path d="M91 49H130M91 193H130" />
      </g>
      <g className="vex-scene-lift">
        <path
          d="M147 120L192 75L237 120L192 165Z"
          className="vex-scene-surface"
        />
        <path
          d="M178 105L193 120L178 135M196 105L211 120L196 135"
          className="vex-scene-mark"
        />
        <rect
          x="27"
          y="101"
          width="38"
          height="38"
          className="vex-scene-soft"
        />
        <rect
          x="319"
          y="53"
          width="38"
          height="38"
          className="vex-scene-soft"
        />
        <rect
          x="319"
          y="149"
          width="38"
          height="38"
          className="vex-scene-soft"
        />
        <path
          d="M33 95H71V133M325 47H363V85M325 143H363V181"
          className="vex-scene-outline"
        />
        <path
          d="M40 114H52M40 123H52M332 66H344M332 75H344M332 162H344M332 171H344"
          className="vex-scene-line"
        />
      </g>
      <g className="vex-scene-pixels">
        <VexPixel x={93} y={116} size={8} />
        <VexPixel x={269} y={68} size={8} />
        <VexPixel x={269} y={164} size={8} outline />
        <VexPixel x={399} y={114} size={10} />
      </g>
    </>
  );
}

const scenes = {
  software: SoftwareScene,
  ai: AIScene,
  robotics: RoboticsScene,
  automation: AutomationScene,
};

export default function TechnologyIllustration({
  kind,
}: {
  kind: TechnologyVisualKind;
}) {
  const gridId = `vex-tech-grid-${useId()}`;
  const Scene = scenes[kind];
  return (
    <div
      className={`vex-technology-visual vex-technology-visual-${kind}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 420 240" fill="none" focusable="false">
        <VexTechnicalGrid
          id={gridId}
          width={420}
          height={240}
          step={30}
          opacity={0.065}
        />
        <g className="vex-scene-registration">
          <VexCrosshair x={14} y={14} size={5} />
          <VexCrosshair x={406} y={226} size={5} />
        </g>
        <Scene />
      </svg>
    </div>
  );
}
