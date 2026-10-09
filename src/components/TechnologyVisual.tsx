import { ArrowUpRightIcon } from "@phosphor-icons/react";

export default function TechnologyVisual() {
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
            id="vex-signature-grid"
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
          fill="url(#vex-signature-grid)"
          opacity="0.12"
        />
        <g stroke="currentColor" strokeWidth="1" opacity="0.35">
          <path d="M40 80H164M396 80H520M40 420H164M396 420H520" />
          <path d="M80 40V128M80 372V460M480 40V128M480 372V460" />
          <path d="M36 76V84M36 416V424M524 76V84M524 416V424" />
        </g>
        <path
          d="M0 170H108L188 250H324L404 330H560"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path
          d="M0 330H108L188 250M324 250L404 170H560"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path
          className="home-signature-mint"
          d="M104 122H182L310 250L182 378H104L232 250Z"
        />
        <path
          className="home-signature-white"
          d="M208 122H326L454 250L326 378H208L336 250Z"
        />
        <path
          d="M176 94H338L494 250L338 406H176"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
        <g className="home-signature-pixels">
          <rect x="52" y="122" width="18" height="18" />
          <rect x="78" y="148" width="18" height="18" />
          <rect x="52" y="352" width="18" height="18" />
          <rect x="78" y="326" width="18" height="18" />
          <rect x="478" y="242" width="16" height="16" />
          <rect x="508" y="244" width="12" height="12" />
        </g>
        <g stroke="currentColor" strokeWidth="1.5">
          <rect x="16" y="164" width="12" height="12" />
          <rect x="16" y="324" width="12" height="12" />
          <rect x="532" y="164" width="12" height="12" />
          <rect x="532" y="324" width="12" height="12" />
        </g>
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
