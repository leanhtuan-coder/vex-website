import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useId } from "react";

export default function TechnologyVisual() {
  const gridId = `vex-signature-grid-${useId().replace(/:/g, "")}`;

  return (
    <figure className="home-signature">
      <div className="home-signature-heading">
        <span>VEX / KẾT NỐI CÔNG NGHỆ</span>
        <ArrowUpRightIcon size={22} aria-hidden="true" />
      </div>
      <svg
        className="home-signature-drawing"
        viewBox="0 0 560 500"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={gridId}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M40 0H0V40" stroke="currentColor" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect
          width="560"
          height="500"
          fill={`url(#${gridId})`}
          opacity="0.085"
        />
        <g className="vex-hero-datum" stroke="currentColor" strokeWidth="1">
          <path d="M40 80H176M384 80H520M40 420H176M384 420H520" />
          <path d="M80 40V116M80 384V460M480 40V116M480 384V460" />
          <path d="M36 76V84M36 416V424M524 76V84M524 416V424" />
          <path d="M74 80H86M80 74V86M474 420H486M480 414V426" />
        </g>

        <g className="vex-hero-rails" stroke="currentColor" strokeWidth="1.2">
          <path d="M24 202H108L188 282H296L380 202H536" />
          <path d="M24 338H108L188 258H296L380 338H536" />
          <path d="M120 146L168 106M270 146L318 106M406 282L454 242M270 418L318 378M120 418L168 378" />
        </g>

        <g className="vex-hero-stack">
          <path
            className="vex-hero-plane-back"
            d="M120 146H270L406 282L270 418H120L256 282Z"
          />
          <path
            className="vex-hero-plane-mid"
            d="M144 126H294L430 262L294 398H144L280 262Z"
          />
          <path
            className="vex-hero-depth"
            d="M318 106L454 242L430 262L294 126ZM454 242L318 378L294 398L430 262Z"
          />
          <g className="vex-hero-plane-front">
            <path
              className="home-signature-white"
              d="M168 106H318L454 242L318 378H168L304 242Z"
            />
            <path
              className="vex-hero-inlay"
              d="M216 130H308L420 242L308 354H216L328 242Z"
            />
            <path
              className="vex-hero-inlay-line"
              d="M252 146H300L396 242L300 338H252"
            />
            <rect
              className="vex-hero-pin"
              x="296"
              y="122"
              width="8"
              height="8"
            />
            <rect
              className="vex-hero-pin"
              x="296"
              y="354"
              width="8"
              height="8"
            />
          </g>
        </g>

        <g className="home-signature-pixels vex-hero-pixels">
          <rect x="52" y="122" width="16" height="16" />
          <rect x="76" y="146" width="12" height="12" />
          <rect x="52" y="354" width="16" height="16" />
          <rect x="76" y="334" width="12" height="12" />
          <rect x="478" y="234" width="16" height="16" />
          <rect x="508" y="236" width="12" height="12" />
        </g>
        <g
          className="vex-hero-terminals"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="18" y="196" width="12" height="12" />
          <rect x="18" y="332" width="12" height="12" />
          <rect x="530" y="196" width="12" height="12" />
          <rect x="530" y="332" width="12" height="12" />
        </g>
        <path
          className="vex-hero-signal"
          d="M30 202H108L188 282H296L380 202H530"
          pathLength="100"
        />
      </svg>
      <figcaption className="home-signature-caption">
        <span>
          Phần mềm. Trí tuệ nhân tạo.
          <br />
          Hệ thống vật lý.
        </span>
        <span className="home-signature-caption-note">
          Một hướng tiếp cận
          <br />
          kết nối nhiều công nghệ.
        </span>
      </figcaption>
    </figure>
  );
}
