# VEX Technology Solutions

Website corporate tiếng Việt dùng React 19, TypeScript strict, Vite 6 và Cloudflare Kumo 2.14.0. Giữ kiến trúc static: mỗi URL public có HTML hoàn chỉnh để đọc và thu thập nội dung khi tắt JavaScript. Layout riêng và các component Kumo sử dụng nhận diện VEX.

## Chạy local và build

Khuyến nghị Node.js 24; tối thiểu 22.19 để chạy đầy đủ bộ công cụ.

```sh
npm ci
npm run dev
```

```sh
npm run check
npx playwright install chromium
npm run preview
```

Trong terminal khác, khi preview đang chạy tại `http://127.0.0.1:4173`:

```sh
npm run verify:ui
npm run measure:performance
npm audit
```

`check` chạy TypeScript, ESLint và build. UI checks kiểm tra 12 trang × 11 chiều rộng 320–2560px, link/ảnh/anchor, HTML không JS, metadata/404, axe, menu/focus và form. Security headers được mô phỏng từ file build để kiểm tra tương thích; hosting chưa tự áp dụng chúng. Lighthouse đo Home mobile/desktop, Contact mobile và Solutions mobile. Báo cáo và ảnh nằm trong `artifacts/` (không commit).

## Các trang

- Home `/`, About `/about/`, Solutions `/solutions/` cùng 5 chi tiết giải pháp.
- Projects `/projects/`: chưa có dự án được duyệt công bố.
- Contact `/contact/`: kênh liên hệ và biểu mẫu soạn email.
- Privacy `/privacy-policy/`, Terms `/terms/` và `404.html`.

R&D chi tiết, tin tức, tuyển dụng, analytics và tiếng Anh thuộc Phase 2. Academy, CRM/API tiếp nhận thuộc Phase 3; Academy hiện chỉ là định hướng tương lai.

## Source

| Nơi                                          | Trách nhiệm                                           |
| -------------------------------------------- | ----------------------------------------------------- |
| `src/brand.css`                              | Font SVN-Aguda 400/900, palette và ánh xạ token Kumo  |
| `src/styles.css`                             | Bố cục corporate, responsive, focus và reduced motion |
| `src/content/`                               | Công ty, giải pháp, dự án và SEO                      |
| `src/components/`                            | Header/footer, CTA, card, empty state, sơ đồ và form  |
| `src/pages/`                                 | Các trang và template chi tiết                        |
| `src/App.tsx`, `src/main.tsx`                | Điều hướng URL và hydration                           |
| `src/Prerender.tsx`, `scripts/prerender.mjs` | Form eager ở build tĩnh, lazy trên trình duyệt        |
| `scripts/prepare-public.mjs`                 | Tạo lại public từ allowlist tài nguyên                |
| `.github/workflows/ci.yml`                   | Kiểm tra source; không publish                        |

Import Kumo theo từng component: Button/LinkButton, Link, Text, LayerCard, Badge, Empty, Dialog, Input/InputArea, Select, Checkbox và Banner. Control giữ cơ chế focus/validation/popup của Kumo; HTML/CSS riêng phục vụ cấu trúc và nhận diện website.

Font WOFF2 local. Cyan `#00707E`, mint `#67C08B`, trắng và xám `#E6E7E8` theo Brand Guidelines. Chú thích HEX của mint trong PDF bị lặp cyan nên mint lấy từ màu tô vector. Các nền/hover được pha từ màu thương hiệu; màu lỗi/cảnh báo dùng cho ngữ nghĩa UI.

## Form và phát hành

Theo xác nhận của chủ website, chưa có backend; form chỉ tạo `mailto:contact@vex.biz.vn`. Người dùng kiểm tra và tự nhấn gửi trong ứng dụng email. Không báo VEX đã nhận; không ghi dữ liệu vào localStorage/log. Có validation, consent, giới hạn độ dài, honeypot và chặn thao tác lặp; đây không thay thế chống spam server khi thêm API.

Chỉ upload **nội dung dist/** lên hosting. Build có HTML riêng, SEO/JSON-LD, sitemap/robots, CNAME, 404, `.nojekyll` và mẫu `_headers`; không có PDF nội bộ hay source map. Không phục vụ repo hoặc index.html nguồn.

Xem [audit](docs/AUDIT.md), [nội dung và lộ trình](docs/CONTENT.md), [kết quả QA](docs/QA.md) và [hướng dẫn vận hành/deploy](docs/OPERATIONS.md). Mẫu GitHub Pages ở `docs/github-pages.workflow.example.yml` chưa kích hoạt. DNS, nameserver, SSL và production chưa được thay đổi ở đợt này.
