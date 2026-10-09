import { useCallback, useState } from "react";
import type { LeadershipProfile } from "../content/leadership";

/** A real, approved image is optional; the portrait frame always reserves 4:5. */
export default function LeadershipPortrait({
  profile,
}: {
  profile: LeadershipProfile;
}) {
  const [failedSource, setFailedSource] = useState<string>();
  const photo = profile.photo;
  const photoSource = photo?.src;
  // A prerendered image can fail before React attaches its error handler.
  // Inspect its existing state without starting a lazy image request.
  const imageRef = useCallback(
    (image: HTMLImageElement | null) => {
      if (image && photoSource && image.complete && image.naturalWidth === 0) {
        setFailedSource(photoSource);
      }
    },
    [photoSource],
  );
  const showPhoto = photo && failedSource !== photo.src;
  const focalPoint = profile.photoFocalPoint ?? { x: 50, y: 50 };
  const initials =
    profile.initials ??
    profile.name
      .trim()
      .split(/\s+/u)
      .map((part) => part[0])
      .join("")
      .slice(0, 4)
      .toLocaleUpperCase("vi");

  return (
    <div
      className={`leadership-portrait${showPhoto ? " leadership-portrait-with-image" : ""}`}
      data-portrait={showPhoto ? "image" : "monogram"}
    >
      {showPhoto ? (
        <img
          ref={imageRef}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: `${focalPoint.x}% ${focalPoint.y}%` }}
          onError={() => setFailedSource(photo.src)}
        />
      ) : (
        <div className="leadership-monogram-frame" aria-hidden="true">
          <svg
            className="leadership-portrait-geometry"
            viewBox="0 0 320 400"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <path
              className="leadership-portrait-grid"
              d="M40 0V400M120 0V400M200 0V400M280 0V400M0 40H320M0 120H320M0 200H320M0 280H320M0 360H320"
            />
            <path
              className="leadership-portrait-trace"
              d="M0 320H80V280H240V120H320M200 0V80H280"
            />
            <path
              className="leadership-portrait-arrow"
              d="M252 286L280 314L252 342M220 314H280"
            />
            <g className="leadership-portrait-pixels">
              <path d="M240 40H264V64H240ZM272 40H296V64H272ZM272 72H296V96H272Z" />
              <path d="M24 336H36V348H24ZM44 336H56V348H44Z" />
            </g>
          </svg>
          <span className="leadership-monogram">{initials}</span>
          <span className="leadership-portrait-caption">VEX LEADERSHIP</span>
        </div>
      )}
    </div>
  );
}
