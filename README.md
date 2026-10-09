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

`check` chạy publisher, TypeScript, ESLint, kiểm tra cổng công bố nội dung và build. UI checks kiểm tra toàn bộ route trong sitemap × 11 chiều rộng 320–2560px (hiện 17 trang), link/ảnh/anchor, HTML không JS, metadata/404, axe, menu/focus, topic/form, reduced motion, copy HEX, bốn download logo, FAQ, nhóm nhu cầu và analytics tắt. Security headers được mô phỏng từ file build để kiểm tra tương thích; hosting chưa tự áp dụng chúng. Lighthouse đo Home và Media mobile/desktop, Contact mobile và Solutions mobile. Báo cáo và ảnh nằm trong `artifacts/` (không commit).

## Các trang

- Home `/`, About `/about/`, Solutions `/solutions/` cùng 5 chi tiết giải pháp.
- Projects `/projects/`: chưa có dự án được duyệt công bố.
- Contact `/contact/`: kênh liên hệ và biểu mẫu soạn email.
- Privacy `/privacy-policy/`, Terms `/terms/` và `404.html`.
- Research `/research/`, Insights `/insights/`, Careers `/careers/`, Media `/media/` và Academy `/academy/`.

Phase 2 có trang R&D, cơ chế đăng bài/tuyển dụng và mẫu chi tiết, thư viện logo tải xuống, topic liên hệ theo ngữ cảnh và cấu hình analytics tắt mặc định. Bài viết, việc làm và case study chỉ xuất bản khi có nội dung thật được duyệt. Tiếng Anh chưa bật. Phase 3 có trang định hướng Academy và pipeline quản lý/xuất bản nội dung; CRM/API, portal, microsite sản phẩm và CMS nâng cao cần nhu cầu vận hành cùng cấu hình cụ thể. Academy chưa mở tuyển sinh.

Đợt corporate enhancement có Why VEX được duyệt dưới dạng định hướng, Journey với mốc thành lập thật, sáu nhóm nhu cầu liên kết tới Contact và tám FAQ. Hồ sơ lãnh đạo, nguồn gốc case study và PDF public có model/gate riêng; hiện chỉ có hồ sơ pháp lý Lê Anh Tuấn, chưa có PDF hoặc case được công bố. [Danh sách nội dung cần bổ sung](CONTENT_REQUIREMENTS.md) và [checklist phát hành](LAUNCH_CHECKLIST.md) phân biệt dữ liệu còn thiếu với lỗi kỹ thuật.

## Source

| Nơi                                                  | Trách nhiệm                                               |
| ---------------------------------------------------- | --------------------------------------------------------- |
| `src/brand.css`                                      | Font SVN-Aguda 400/900, palette và ánh xạ token Kumo      |
| `src/styles.css`                                     | Bố cục corporate, responsive, focus và reduced motion     |
| `src/visual-system.css`, `src/styles-*-redesign.css` | Hệ typography/grid chung và bố cục editorial theo trang   |
| `src/content/`                                       | Công ty, giải pháp, dự án và SEO                          |
| `src/content/brand-strategy.ts`                      | Bản thảo Tầm nhìn, Sứ mệnh, giá trị dùng chung Home/About |
| `content/website.ts`                                 | Nguồn biên tập bài viết, việc làm, case study             |
| `scripts/prepare-content.mjs`                        | Kiểm tra và xuất dữ liệu đã duyệt trước khi bundle        |
| `src/content/published.json`                         | Dữ liệu public sinh tự động, không chỉnh trực tiếp        |
| `src/analytics.ts`                                   | Adapter Umami, không hoạt động khi tracking tắt           |
| `src/components/`                                    | Header/footer, CTA, card, empty state, sơ đồ và form      |
| `src/pages/`                                         | Các trang và template chi tiết                            |
| `src/App.tsx`, `src/main.tsx`                        | Điều hướng URL và hydration                               |
| `src/Prerender.tsx`, `scripts/prerender.mjs`         | Form eager ở build tĩnh, lazy trên trình duyệt            |
| `scripts/prepare-public.mjs`                         | Tạo lại public từ allowlist tài nguyên                    |
| `.github/workflows/ci.yml`                           | Kiểm tra source; không publish                            |
| `.github/workflows/deploy-pages.yml`                 | Kiểm tra và phát hành dist lên Pages từ main              |

Import Kumo theo từng component: Button/LinkButton, Link, Text, LayerCard, Badge, Empty, Dialog, DropdownMenu, Input/InputArea, Select, Checkbox và Banner. Control giữ cơ chế focus/validation/popup của Kumo; HTML/CSS riêng phục vụ cấu trúc và nhận diện website. Trang mới và form được tách chunk; CSS có sẵn ngay trong HTML để không mất bố cục khi tắt JavaScript.

FAQ dùng Kumo Accordion primitive, mở sẵn để no-JS đọc đầy đủ. Sáu nhóm nhu cầu dùng disclosure HTML native cùng Kumo Text/Link/CTA để vẫn có thể mở khi tắt JavaScript. Cổng công bố mới có 106 kiểm tra fixture trong bộ nhớ, không đưa dữ liệu kiểm thử lên website.

CTA dùng cỡ Kumo base (36px) cho header/hero và phần lớn hành động, lg (40px) khi phù hợp; trên mobile vùng bấm tối thiểu 44px. `button-theme.ts` tạo nền cyan phẳng qua style API của Kumo và hover tối hơn. CTA trên nền cyan dùng nền trắng, chữ cyan và focus trắng.

Favicon dùng đầy đủ logo VEX và motif pixel từ vector logo gốc, giữ nguyên tỷ lệ trên nền trắng, có SVG, PNG 32px và Apple touch 180px. URL tài nguyên mới tránh cache favicon cũ. Footer chỉ hiển thị các liên kết chính sách; sitemap XML vẫn được tạo cho crawler.

Font WOFF2 local. Cyan `#00707E`, mint `#67C08B`, trắng và xám `#E6E7E8` theo Brand Guidelines. Chú thích HEX của mint trong PDF bị lặp cyan nên mint lấy từ màu tô vector. Các nền/hover được pha từ màu thương hiệu; màu lỗi/cảnh báo dùng cho ngữ nghĩa UI.

## Form và phát hành

Theo xác nhận của chủ website, chưa có backend; form chỉ tạo `mailto:contact@vex.biz.vn`. Người dùng kiểm tra và tự nhấn gửi trong ứng dụng email. Không báo VEX đã nhận; không ghi dữ liệu vào localStorage/log. Có validation, consent, giới hạn độ dài, honeypot và chặn thao tác lặp; đây không thay thế chống spam server khi thêm API.

Các CTA R&D/Academy/tuyển dụng/truyền thông mở Contact với chủ đề tương ứng. `position` chỉ được đưa vào email khi khớp slug vị trí đang mở đã công bố; query tự nhập không trở thành thông tin công ty hoặc analytics.

Analytics giữ tắt theo xác nhận của chủ website. Không tải script bên ngoài, không có cookie banner hoặc marketing pixel. Cấu hình mẫu trong `.env.example`; cách bật và sự kiện ở [analytics](docs/ANALYTICS.md). Website không đo “gửi form thành công” vì chỉ soạn email.

Chỉ upload **nội dung dist/** lên hosting. Build có HTML riêng, SEO/JSON-LD, sitemap/robots, CNAME, 404, `.nojekyll` và mẫu `_headers`; không có PDF nội bộ hay source map. Không phục vụ repo hoặc index.html nguồn.

Workflow `Publish VEX website` tự chạy khi push lên `main`, hoặc chạy thủ công trên `main`. Chỉ deploy sau khi typecheck, lint, build, audit dependency và kiểm tra UI đạt. Các nhánh khác chỉ chạy CI. DNS và cấu hình chứng chỉ được giữ nguyên.

Xem [audit](docs/AUDIT.md), [visual redesign](docs/VISUAL-REDESIGN.md), [nội dung và lộ trình](docs/CONTENT.md), [kết quả QA](docs/QA.md) và [hướng dẫn vận hành/deploy](docs/OPERATIONS.md).
