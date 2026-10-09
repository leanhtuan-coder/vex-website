/** Decorative geometry derived from VEX's pixel and forward-arrow language. */
export default function BrandGeometry() {
  return (
    <svg
      className="brand-geometry"
      viewBox="0 0 280 220"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="brand-geometry-grid"
        d="M0 40H280M0 100H280M0 160H280M40 0V220M100 0V220M160 0V220M220 0V220"
      />
      <path
        className="brand-geometry-line"
        d="M40 160H100V100H160V40H220M100 160H220V100"
      />
      <path
        className="brand-geometry-arrow"
        d="M146 68H178L220 110L178 152H146L188 110Z"
      />
      <path
        className="brand-geometry-pixels"
        d="M32 152H48V168H32ZM92 92H108V108H92ZM152 32H168V48H152ZM212 32H228V48H212Z"
      />
    </svg>
  );
}
