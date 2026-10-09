export interface MediaAsset {
  id: string;
  title: string;
  variant: "color" | "white";
  format: "PNG" | "SVG";
  href: string;
  filename: string;
  bytes: number;
  dimensions: string;
  approvedForPublication: boolean;
}

export { publicDocuments, documentCategoryLabels } from "./documents";

// Public logo files only. File sizes reflect the downloadable assets in /assets.
// Project photography and videos require publication approval before being added.
export const mediaAssets: MediaAsset[] = [
  {
    id: "logo-color-svg",
    title: "Logo VEX màu — vector",
    variant: "color",
    format: "SVG",
    href: "/assets/vex-logo.svg",
    filename: "vex-logo.svg",
    bytes: 1309,
    dimensions: "Vector, giữ nguyên tỷ lệ",
    approvedForPublication: true,
  },
  {
    id: "logo-color-png",
    title: "Logo VEX màu — PNG",
    variant: "color",
    format: "PNG",
    href: "/assets/logo-color-tight.png",
    filename: "vex-logo-color.png",
    bytes: 26003,
    dimensions: "3067 × 935 px",
    approvedForPublication: true,
  },
  {
    id: "logo-white-svg",
    title: "Logo VEX trắng — vector",
    variant: "white",
    format: "SVG",
    href: "/assets/vex-logo-white.svg",
    filename: "vex-logo-white.svg",
    bytes: 1309,
    dimensions: "Vector, giữ nguyên tỷ lệ",
    approvedForPublication: true,
  },
  {
    id: "logo-white-png",
    title: "Logo VEX trắng — PNG",
    variant: "white",
    format: "PNG",
    href: "/assets/logo-white-tight.png",
    filename: "vex-logo-white.png",
    bytes: 25403,
    dimensions: "3067 × 935 px",
    approvedForPublication: true,
  },
];

export const publicMedia = mediaAssets.filter(
  (asset) => asset.approvedForPublication,
);

export function formatMediaSize(bytes: number) {
  return `${(bytes / 1024).toLocaleString("vi-VN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} KiB`;
}
