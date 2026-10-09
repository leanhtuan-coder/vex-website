# Báo cáo QA — 10/10/2026

## Tối ưu mobile

Đợt này dùng CSS theo breakpoint để thu gọn Hero, visual, portrait và khoảng cách section; header/menu/form/footer dễ thao tác hơn trên điện thoại. Không thêm dependency hoặc thay đổi nội dung đã duyệt. Tại 390 × 844px, chiều dài Home giảm 11%, About 10,5% và Leadership 15,2%; nhóm CTA Hero xuất hiện sớm hơn 93px. Menu ngang nằm trong viewport, nút đóng và các mục đạt vùng chạm tối thiểu 44px; input và Kumo Select dùng chữ 16px.

`npm run check` đạt TypeScript, ESLint, 164 content checks và build 18 trang/404. `npm run verify:ui` đạt 198 lượt layout. QA mobile bổ sung đạt 126 layout Chromium và 54 layout WebKit trên toàn bộ 18 route, ba kích thước menu dọc/ngang ở mỗi engine, form, focus/Escape, reduced motion và nội dung không JavaScript. 18 lượt axe mobile không có violation; không lỗi JavaScript/console, ảnh hoặc tràn ngang. Đây là browser emulation trên Windows, chưa thử điện thoại vật lý hay bàn phím ảo thật.

About, Leadership và Contact tại 1440px có screenshot trùng byte với baseline `7c59d08`. Home giữ cùng bố cục/kích thước; khác biệt screenshot chỉ nằm trong nét signal SVG có animation sẵn. Đã xem crop trước/sau Hero, hồ sơ và form cùng menu ngang. [Tài liệu mobile](MOBILE.md) ghi số đo, breakpoint và giới hạn; ảnh/report tại `artifacts/mobile/`, với trang so sánh `comparison.html`.

Lighthouse 13.5.0 mô phỏng mobile trên build local cuối: Home và Contact đều Performance 94, Accessibility/Best Practices/SEO 100; LCP 2,5s và TBT 0ms. CLS lần lượt 0.001 và 0.009. Đây là phép đo lab, chưa có RUM. Main JS 594.27KB (gzip 185.12KB), CSS 236.98KB (gzip 39.21KB), tăng khoảng 1,4KB CSS nén; cảnh báo main chunk hơn 500KB của Vite còn hiện diện. Báo cáo tại `artifacts/mobile/performance.json` và Lighthouse HTML/JSON.

## Leadership Team

Bốn hồ sơ đã được duyệt nguyên văn dùng chung nguồn dữ liệu trên Home, About và `/leadership/`. `npm run check` đạt TypeScript, ESLint, 164 kiểm tra publication và build 18 trang/404. `npm run verify:ui` đạt 198 lượt layout (18 route × 11 chiều rộng), không có lỗi JavaScript/console hoặc violation axe được ghi nhận. `npm audit` ghi nhận 0 vulnerability.

QA riêng Leadership đạt 30 lượt layout trên ba trang ở 320/360/390/430/768/1024/1280/1440/1920/2560px: đúng tên, chức danh đầy đủ, thứ tự, nguyên văn bốn tiểu sử/18 trách nhiệm, ba LinkedIn; CFO không có link thay thế. Kiểm tra fallback 4:5, grid 4/2/1 cột, no-JS, canonical/OG, bốn Person liên kết Organization, focus/bàn phím/vùng bấm và reduced motion đạt. Ba lượt axe riêng không có violation; không có request ảnh chưa tồn tại hoặc bên thứ ba.

Lighthouse 13.5.0 trên build cuối tại localhost:4173, mô phỏng mobile mặc định: Home và Leadership đều Performance 94, Accessibility/Best Practices/SEO 100, TBT 0ms; CLS lần lượt 0 và 0.019. Đây là số liệu lab local, chưa có RUM. Main JS 594.27KB (gzip 185.12KB), CSS 229.45KB (gzip 37.79KB), chunk Leadership 4.22KB; không thêm dependency, Vite vẫn ghi cảnh báo main chunk hơn 500KB. Báo cáo đo ở `artifacts/leadership/performance.json` và các report Lighthouse HTML/JSON.

Đã kiểm thử pipeline upload với WebP hình học trung tính 1200 × 1500px tại sáu bố cục About/Leadership: source được giữ qua hai lần staging, byte source/staging/dist/HTTP khớp, browser decode thành công, lazy/async/focal point đúng. Kiểm tra ảnh lỗi phát hiện và đã sửa trường hợp lỗi từ cache trước hydration; ảnh lỗi trở về monogram trên cả hai trang. Fixture đã xóa trước build cuối, không vào bản phát hành. Chưa có ảnh chân dung thật, nên crop khuôn mặt cần được rà soát khi upload. [Hướng dẫn và bằng chứng Leadership](LEADERSHIP.md) ghi chi tiết; báo cáo/screenshot nội bộ ở `artifacts/leadership/`.

## VEX Visual Elements pilot

Home Hero/Technology/R&D đã có ba section thử nghiệm với visual SVG riêng, không thêm dependency. `npm run check` gồm 106 content checks và build 17 trang/404 đạt; full UI đạt 187 lượt layout. QA riêng 11 viewport, axe 390/768/1440, ID/SSR/no-JS, focus/mobile44px, reduced motion và vòng đời animation đạt; đã xem ảnh desktop/mobile/tablet. Lighthouse Home mobile94/desktop100, Accessibility/Best Practices/SEO100; đây là phép đo local lab. Notice thư viện UI được bổ sung theo allowlist cho bản static. Chi tiết, mức tăng payload và đường dẫn ảnh trước/sau ở [VEX-VISUAL-ELEMENTS.md](VEX-VISUAL-ELEMENTS.md); các phần dưới ghi kết quả các phase trước.

## Visual redesign và corporate enhancement

Đã triển khai bố cục editorial và visual SVG pixel/grid/mũi tên trên Home/Media, typography và container chung, các trang corporate/R&D/Careers/Insights/Contact, footer nhóm liên kết và CTA tương phản rõ. Logo nguyên bản và bốn download không thay đổi; header/footer dùng SVG đầy đủ thay PNG. Navigation/footer 14px, body 16–17px; input và Select mobile 44px.

About có Why VEX đã được chủ website duyệt dưới dạng định hướng và Journey chỉ có mốc đăng ký 10/03/2026. Solutions có sáu nhóm nhu cầu từ service hiện có; disclosure hoạt động cả khi tắt JS, CTA chuyển ID nhu cầu hợp lệ sang Contact. FAQ dùng Kumo Accordion với tám câu mở sẵn để HTML không JS đọc đầy đủ, cho phép đóng/mở bằng bàn phím. Không hứa SLA/giá/bảo hành hoặc tiếp nhận form tự động.

`npm run check` trên bản ghép đạt: publisher, TypeScript, ESLint, 106 kiểm tra cổng công bố trong bộ nhớ và build 17 trang/404. `npm run verify:ui` đạt 187 lượt layout, axe/metadata/no-JS/link/404/menu/form/tracking cũ cùng kiểm tra Why VEX/Journey, 12 lượt mở nhóm nhu cầu ở 390/1440, ID nhu cầu không hợp lệ, FAQ bàn phím/no-JS, clipboard thật/thất bại và bốn lượt tải đúng bytes. Không ghi nhận lỗi JavaScript/console/hydration hoặc violation trong lượt quét.

Đã xem ảnh Home/About/Media và các trang mới tại các viewport trong brief, gồm 360/390/430/768/1024/1280/1440/1920. Đối chiếu nội dung Tầm nhìn/Sứ mệnh/năm giá trị, draft note, anchors và không JS 390/1440 đạt. Sau khi sửa khoảng cách giữa focus outline và nội dung disclosure, build lại và kiểm tra cả sáu nhóm mở cùng lúc tại 390/1440: không overflow, focus không chạm heading, axe không có violation. Full UI của workflow kiểm tra lại artifact cuối trước deploy.

Publisher hiện xuất 1 hồ sơ Lê Anh Tuấn chỉ tên/chức danh pháp lý, 0 bài viết, việc làm, case study hoặc PDF. Project có provenance bắt buộc, phân biệt nguồn gốc với trạng thái phát triển; kết quả và kiến trúc không có dữ liệu được ẩn. Leadership/document/project cần VERIFIED và quyền công bố; field ngoài whitelist, draft/chờ duyệt, file tương lai và đường dẫn không an toàn bị loại/chặn trong 106 kiểm tra. Fixture không lưu hoặc vào dist. File PDF nội bộ, TypeScript, source map và OTF không có trong build hiện tại. `npm audit --audit-level=high` báo 0 vulnerability; không thêm dependency.

Ảnh và dữ liệu ở `artifacts/enhancement-visual/`, `redesign-governance-final/`, `redesign-media-corporate/`, `redesign-growth-qa/` và `qa-results.json`. Portrait/PDF/case thật chưa được cung cấp; chỉ kiểm tra model/gates và template có điều kiện, chưa gọi đó là đã kiểm tra tải tài liệu thật hoặc hồ sơ đầy đủ. Danh sách còn cần ở [CONTENT_REQUIREMENTS.md](../CONTENT_REQUIREMENTS.md), trạng thái ở [audit](ENHANCEMENT-AUDIT.md), bước phát hành ở [LAUNCH_CHECKLIST.md](../LAUNCH_CHECKLIST.md).

Browser JS cuối khoảng 576KB (gzip 180KB), CSS 218KB (gzip 36KB). Vite tiếp tục cảnh báo chunk >500KB; không tăng ngưỡng để che cảnh báo. Các chunk trang bổ sung vẫn tách riêng; thông báo eager/lazy trong entry SSR phục vụ prerender đầy đủ.

Lighthouse 13.5.0 đo trên production dist cuối tại localhost:4173, Node 24/Chromium Playwright, không chạy browser QA khác đồng thời. Mobile dùng mô phỏng mặc định; desktop 1440×900, CPU 1×, RTT 40ms, throughput 10240Kbps. Accessibility/Best Practices/SEO đều 100 ở cả sáu lượt. Đây là dữ liệu lab, không phải Core Web Vitals p75 của người dùng thật.

| Lượt đo cuối     | Performance |  LCP |  TBT |   CLS |
| ---------------- | ----------: | ---: | ---: | ----: |
| Home mobile      |          95 | 2,4s | 10ms |     0 |
| Home desktop     |         100 | 0,5s |  0ms | 0,003 |
| Contact mobile   |          94 | 2,5s | 20ms | 0,007 |
| Solutions mobile |          94 | 2,5s |  0ms | 0,031 |
| Media mobile     |          94 | 2,5s |  0ms | 0,014 |
| Media desktop    |         100 | 0,5s |  0ms | 0,001 |

Ảnh SVG thay PNG giảm tải logo, nhưng phần nội dung và Accordion mới làm bundle lớn hơn baseline. Lighthouse vẫn gợi ý giảm JS không dùng và chuỗi request chặn render. Không tuyên bố điểm lab hoặc mọi chỉ số đều tăng so với baseline; kết quả đủ để đánh giá chi phí của lần bổ sung này và ưu tiên tối ưu bundle tiếp theo.

## Production của corporate enhancement

Source release [e68b93d](https://github.com/leanhtuan-coder/vex-website/commit/e68b93db5bc041accb2a48c67565c19c14e72cc3) đã push `main`. [CI 37926298722](https://github.com/leanhtuan-coder/vex-website/actions/runs/37926298722) và [Publish Pages 37926298682](https://github.com/leanhtuan-coder/vex-website/actions/runs/37926298682) đều success. Kết quả sau phát hành ngày 09/10/2026 kiểm tra trực tiếp [vex.biz.vn](https://vex.biz.vn); các tài liệu kết quả được commit riêng sau source release.

HTTP xác nhận 17 route public trả 200, HTML sau chuẩn hóa CR khớp `dist/`, canonical/metadata/favicon full logo và sitemap đủ 17 URL. Bốn URL không tồn tại trả 404/noindex và nội dung khớp trang 404. Bảy file logo cùng toàn bộ 22 asset CSS/JS/font/ảnh được tải và đối chiếu bytes với dist. Báo cáo: `artifacts/phase-production-http.json` và `artifacts/production-assets-redesign.json`.

Browser production kiểm tra Home/About/Solutions/Media/Contact ở 390 và 1440px, tổng cộng 10 lượt layout: HTTP 200/canonical đúng, không overflow và không có lỗi JavaScript/console hoặc request bên thứ ba trong các lượt này. Đã xem 14 ảnh. About có đúng bốn định hướng Why VEX, Journey 10/03/2026, nhãn VM draft/năm giá trị và một hồ sơ lãnh đạo chỉ tên/chức danh pháp lý, không có ảnh/bio giả. Sáu native disclosure chuyển nhu cầu hợp lệ sang Contact; ID sai bị bỏ qua. Tám FAQ thao tác bàn phím đạt. Tracking giữ tắt.

Media copy hai HEX vào clipboard thật đạt. Bốn download đúng filename và toàn bộ bytes khớp nguồn: SVG màu 1309 bytes, PNG màu 26003 bytes, SVG trắng 1309 bytes, PNG trắng 25403 bytes. Báo cáo browser và ảnh: `artifacts/production-enhancement/summary.json`, `artifacts/production-enhancement/`. Không submit form hoặc gửi/nhận email thật; không gọi model/profile/PDF có điều kiện là dữ liệu thật đã kiểm tra.

HTTPS hợp lệ; www trả 301 về apex; HTTP vẫn trả 200. Pages API read-only xác nhận CNAME `vex.biz.vn`, status `built`, `https_enforced: false`. Response GitHub có `Cache-Control: max-age=600`; HSTS, CSP, X-Content-Type-Options, X-Frame-Options và Referrer-Policy không hiện diện. Không thay DNS/SSL/hosting. `_headers` là mẫu và không được GitHub Pages tự áp dụng; kết quả mô phỏng header trong preview không phải header production.

Các số Lighthouse ở phần trên vẫn là local lab, không phải phép đo production hoặc RUM. Bộ production này tập trung HTTP/asset và tương tác trên năm trang tại hai viewport; kết quả 187 lượt layout/axe thuộc local/CI, không được đổi nhãn thành 187 lượt browser production.

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

Kết quả layout/axe/Lighthouse local và bằng chứng production được tách riêng ở trên. Mỗi lần phát hành tiếp theo cần kiểm tra lại URL, HTTPS, header, HTTP 404 và luồng Contact trên domain thật. Workflow Pages trên `main` lưu QA và trạng thái deploy trong Actions. \_headers chỉ là mẫu, Pages không tự đọc. Form chưa có API theo xác nhận của chủ website; lượt browser production lần này không submit form hoặc kiểm tra gửi/nhận email thật. Bài viết, việc làm, dự án, tiếng Anh và những phần Phase 3 còn lại cần dữ liệu/hạ tầng thật theo CONTENT.md; không tuyên bố đã hoàn thành CMS/CRM/portal hoặc tích hợp analytics production.
