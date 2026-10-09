# Báo cáo QA — 09/10/2026

## Bổ sung nội dung chiến lược thương hiệu

Home dùng hai khối rút gọn, liên kết vào Tầm nhìn và Sứ mệnh trên About. About có nguyên văn nội dung đầy đủ, thông điệp hỗ trợ, năm giá trị Việt/Anh và phần lãnh đạo kế tiếp. Nguồn nội dung chung giữ trạng thái draft và nhãn chờ phê duyệt; không thêm chức danh, hồ sơ hay chân dung chưa xác nhận.

`npm run check` và `npm run verify:ui` đạt trên bản ghép, gồm 187 lượt layout, HTML không JS, metadata, axe và kiểm tra tương tác hiện có. Hai link sai từ R&D tới Robotics/Embedded được sửa về IoT & Embedded; bước kiểm tra link HTML nay đối chiếu route với sitemap để SPA fallback 200 không che giấu link tới trang chưa công bố.

QA tập trung Home/About ở 320, 390, 768, 1024 và 1440px đạt: 34 trường nội dung khớp tài liệu bổ sung, Home không lặp statement dài; About đầy đủ statement/supportingMessages, năm giá trị và thứ tự các section. Không overflow/pageerror, axe section mới không có violation; font SVN-Aguda và số cột đúng breakpoint. Click cả hai liên kết Home → About thấy heading bên dưới sticky header. Không JS ở 390/768/1440 vẫn đủ nội dung và CSS. Đã xem ảnh riêng section ở desktop/tablet/mobile; báo cáo brand-strategy-qa.json và ảnh brand-*.png trong artifacts.

## Mở rộng Phase 2 và định hướng Academy

Đã bổ sung Research, Insights, Careers, Media và Academy, nâng tổng số trang public lên 17. `npm run check` đạt; `npm run verify:ui` đạt 187 lượt layout (17 route × 11 chiều rộng), không có violation axe hoặc lỗi Console/JavaScript/hydration được ghi nhận. Menu Khám phá dùng Kumo DropdownMenu, kiểm tra Escape và trả focus; menu mobile có các trang mới. HTML không JS vẫn có nội dung và CSS đầy đủ.

Kiểm tra phát hành phát hiện bộ thay metadata chỉ khớp thẻ một dòng. Đã sửa để nhận template nhiều dòng và fail build nếu thiếu thẻ; kiểm tra không JS đối chiếu title, description/OG/Twitter, ảnh, type và canonical với metadata của trang sau hydration trên toàn bộ route. Bản sửa chỉ thay HTML head và bước QA, giữ nguyên bundle giao diện đã kiểm tra.

Kiểm tra topic research/academy/careers/media, query không hợp lệ và route lồng sai đạt. Form tiếp tục chỉ soạn email; stub analytics không nhận sự kiện và không có request analytics khi tracking tắt. Không gửi hoặc nhận email thật. Position chỉ nhận slug của việc làm public đang mở; hiện chưa có việc làm sản xuất để kiểm tra ngữ cảnh vị trí trên domain thật.

Thư viện logo có bốn lượt tải SVG/PNG màu-trắng đúng tên và bytes. R&D/Academy đã rà trực quan tại 1440, 390 và 320px; Media kiểm tra 11 chiều rộng. Publisher được kiểm tra bằng fixture trong bộ nhớ: draft/chưa duyệt/ngày tương lai/việc hết hạn và trường ngoài whitelist không đi vào bundle; ngày, slug, HTML/URL không an toàn, ảnh thiếu thông tin và SVG chủ động bị chặn. Fixture không lưu hoặc xuất bản lên website.

Nội dung bài viết, việc làm và dự án vẫn trống; không sinh Article/JobPosting hoặc thành tích mẫu. Academy ghi rõ đang chuẩn bị, chưa tuyển sinh. Analytics chưa có cấu hình provider thật và đang tắt theo xác nhận của chủ website. Dist không chứa PDF, source map, OTF, source TypeScript hoặc file env. `npm audit --audit-level=high` báo 0 vulnerability.

## Cập nhật CTA và favicon

Đã chạy lại check (type/lint/build) và verify:ui sau thay đổi CTA/favicon/footer: đạt 132 lượt layout và quét axe, không có lỗi Console/hydration. Rà trực quan và đo normal/hover/focus ở 1440, 390 và 320px: chữ/icon không bị cắt, không tràn ngang.

CTA header/R&D/empty dùng cỡ base 36px desktop; hero/closing/submit 40px; toàn bộ CTA/submit mobile tối thiểu 44px. Kumo style API giữ gradient primary từ cyan tới cyan-hover: tương phản thấp nhất 5,80:1 ở normal, 7,27:1 khi hover. R&D chữ cyan trên nền trắng đạt 5,80:1, hover 5,31:1; focus trắng 3px và offset 4px hiện rõ trên nền cyan.

Favicon dùng toàn bộ logo VEX và motif pixel, giữ nguyên tỷ lệ; có SVG, PNG 32px và Apple touch 180px. URL icon có tên `vex-logo-*` để tránh cache bản glyph E trước đó. Đã bỏ link Sitemap ở footer; sitemap XML tiếp tục được tạo cho crawler. Ảnh kiểm tra CTA ở artifacts/cta-final-*.png.

## Các lệnh đã chạy

- `npm run check`: TypeScript strict, ESLint và production build đạt. Kiểm tra thêm trên Node 24 đạt.
- `npm run verify:ui`: đạt 187 lượt layout (17 route × 11 chiều rộng), HTML không JS, ảnh, link/anchor, SEO metadata, sitemap, 404, menu bàn phím/focus trap/Escape, topic và form.
- Axe WCAG 2 A/AA, 2.1 AA, 2.2 AA: không có violation trong các trang đã quét và menu mobile. Không có lỗi Console/JavaScript/hydration được ghi nhận.
- `npm audit` và `npm audit --omit=dev`: 0 vulnerability tại thời điểm kiểm tra. Công cụ Lighthouse đã cập nhật 13.5.0; không dùng phiên bản có cảnh báo dependency.
- Rà soát dist: không có PDF nội bộ, source map, OTF nguồn hoặc cấu hình dev; không phát hiện mẫu private key/access token trong source và dist.
- Kiểm tra ảnh chụp desktop/mobile: logo không còn chữ TECHNOLOGY/SOLUTIONS bên cạnh; heading R&D và CTA trên nền cyan đọc rõ; form/điều hướng không tràn ngang.

Width đã kiểm tra: 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560px. Trang public: Home, About, Solutions, Projects, Contact, Privacy, Terms, Research, Insights, Careers, Media, Academy và 5 chi tiết giải pháp.

Form checks không gửi email thật: đồng ý trước khi soạn; kiểm tra dữ liệu bắt buộc/khoảng trắng; Select bằng bàn phím; topic vào FormData; thông báo yêu cầu mở email và người dùng phải tự gửi; không ghi localStorage. Security headers được mô phỏng từ dist/\_headers trong lượt UI; host preview không tự áp dụng file.

Build có thông báo Vite rằng các trang bổ sung được import cả eager/lazy ở **entry SSR**. Đây là chủ đích để HTML tĩnh đầy đủ; bundle trình duyệt vẫn có chunk riêng cho Contact, Research/Academy, ContentGrowth và Media. Sau bổ sung nội dung chiến lược, main JS khoảng 544KB (gzip 172KB) nên Vite cảnh báo dung lượng. Không tăng ngưỡng để ẩn cảnh báo.

## Lighthouse đo thật

Lighthouse 13.5.0, Chromium của Playwright, production dist tại localhost:4173. Mobile dùng mô phỏng mặc định; desktop 1440×900, CPU 1×, RTT 40ms, throughput 10240Kbps. Đo bằng script measure-performance; không phải dữ liệu production. Bảng này là baseline Phase 2 trước bổ sung nội dung chiến lược; không chạy lại Lighthouse cho thay đổi nội dung và section lần này.

| Lượt đo          | Performance | Accessibility | Best Practices | SEO |  LCP |   CLS |
| ---------------- | ----------: | ------------: | -------------: | --: | ---: | ----: |
| Home mobile      |          95 |           100 |            100 | 100 | 2,4s | 0,002 |
| Home desktop     |         100 |           100 |            100 | 100 | 0,5s | 0,002 |
| Contact mobile   |          96 |           100 |            100 | 100 | 2,3s | 0,001 |
| Solutions mobile |          96 |           100 |            100 | 100 | 2,3s | 0,016 |

Lượt cuối TBT cả bốn lượt đo 0ms. Báo cáo JSON/HTML đầy đủ và ảnh ở artifacts; không đưa chúng vào tài nguyên website. Điểm có thể dao động theo máy/mạng.

Đã sửa CLS cao ở trang con bằng entry prerender đồng bộ; HTML không còn loading shell/payload ẩn cần script để hiển thị. Đã sửa thứ tự heading và độ tương phản R&D sau kiểm tra tự động lẫn xem ảnh.

## Giới hạn và việc tiếp theo

Lighthouse vẫn gợi ý thu nhỏ PNG logo và giảm JS/CSS chưa dùng của thư viện; các điểm trên đã đạt mục tiêu tham khảo trong brief. Chưa có dữ liệu thực để xác nhận LCP p75 hoặc INP. Axe/Lighthouse không thay thế kiểm tra screen reader trên thiết bị thật hay xác nhận tuân thủ WCAG toàn bộ.

Các kết quả layout/axe/Lighthouse ở trên đo trên preview; mỗi lần phát hành cần kiểm tra lại URL, HTTPS, header, HTTP 404 và mailto trên domain thật. Workflow Pages trên `main` lưu QA và trạng thái deploy trong Actions. \_headers chỉ là mẫu, Pages không tự đọc. Form chưa có API theo xác nhận của chủ website. Không kiểm tra gửi/nhận email thật. Bài viết, việc làm, dự án, tiếng Anh và những phần Phase 3 còn lại cần dữ liệu/hạ tầng thật theo CONTENT.md; không tuyên bố đã hoàn thành CMS/CRM/portal hoặc tích hợp analytics production.
