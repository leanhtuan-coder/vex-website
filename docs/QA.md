# Báo cáo QA — 09/10/2026

## Các lệnh đã chạy

- `npm run check`: TypeScript strict, ESLint và production build đạt. Kiểm tra thêm trên Node 24 đạt.
- `npm run verify:ui`: đạt 132 lượt layout (12 route × 11 chiều rộng), HTML không JS, ảnh, link/anchor, SEO metadata, sitemap, 404, menu bàn phím/focus trap/Escape và form.
- Axe WCAG 2 A/AA, 2.1 AA, 2.2 AA: không có violation trong các trang đã quét và menu mobile. Không có lỗi Console/JavaScript/hydration được ghi nhận.
- `npm audit` và `npm audit --omit=dev`: 0 vulnerability tại thời điểm kiểm tra. Công cụ Lighthouse đã cập nhật 13.5.0; không dùng phiên bản có cảnh báo dependency.
- Rà soát dist: không có PDF nội bộ, source map, OTF nguồn hoặc cấu hình dev; không phát hiện mẫu private key/access token trong source và dist.
- Kiểm tra ảnh chụp desktop/mobile: logo không còn chữ TECHNOLOGY/SOLUTIONS bên cạnh; heading R&D và CTA trên nền cyan đọc rõ; form/điều hướng không tràn ngang.

Width đã kiểm tra: 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560px. Trang public: Home, About, Solutions, Projects, Contact, Privacy, Terms và 5 chi tiết giải pháp.

Form checks không gửi email thật: đồng ý trước khi soạn; kiểm tra dữ liệu bắt buộc/khoảng trắng; Select bằng bàn phím; topic vào FormData; thông báo yêu cầu mở email và người dùng phải tự gửi; không ghi localStorage. Security headers được mô phỏng từ dist/\_headers trong lượt UI; host preview không tự áp dụng file.

Build có thông báo Vite rằng ContactPage được import cả eager/lazy ở **entry SSR**. Đây là chủ đích để HTML tĩnh đầy đủ; bundle trình duyệt vẫn tạo chunk ContactPage riêng (~107KB, gzip ~36KB). Không phải lỗi build hoặc tải toàn bộ form trên Home.

## Lighthouse đo thật

Lighthouse 13.5.0, Chromium của Playwright, production dist tại localhost:4173. Mobile dùng mô phỏng mặc định; desktop 1440×900, CPU 1×, RTT 40ms, throughput 10240Kbps. Đo bằng script measure-performance; không phải dữ liệu production.

| Lượt đo          | Performance | Accessibility | Best Practices | SEO |  LCP |   CLS |
| ---------------- | ----------: | ------------: | -------------: | --: | ---: | ----: |
| Home mobile      |          96 |           100 |            100 | 100 | 2,4s | 0,002 |
| Home desktop     |         100 |           100 |            100 | 100 | 0,5s | 0,002 |
| Contact mobile   |          97 |           100 |            100 | 100 | 2,3s | 0,001 |
| Solutions mobile |          97 |           100 |            100 | 100 | 2,3s | 0,016 |

Lượt cuối TBT Home mobile 10ms, các lượt còn lại 0ms. Báo cáo JSON/HTML đầy đủ và ảnh ở artifacts; không đưa chúng vào tài nguyên website. Điểm có thể dao động theo máy/mạng.

Đã sửa CLS cao ở trang con bằng entry prerender đồng bộ; HTML không còn loading shell/payload ẩn cần script để hiển thị. Đã sửa thứ tự heading và độ tương phản R&D sau kiểm tra tự động lẫn xem ảnh.

## Giới hạn và việc tiếp theo

Lighthouse vẫn gợi ý thu nhỏ PNG logo và giảm JS/CSS chưa dùng của thư viện; các điểm trên đã đạt mục tiêu tham khảo trong brief. Chưa có dữ liệu thực để xác nhận LCP p75 hoặc INP. Axe/Lighthouse không thay thế kiểm tra screen reader trên thiết bị thật hay xác nhận tuân thủ WCAG toàn bộ.

Chưa phát hành production hoặc kiểm tra HTTPS/header/HTTP 404 trên domain thật. \_headers chỉ là mẫu, Pages không tự đọc. Form chưa có API theo xác nhận của chủ website. Không kiểm tra gửi/nhận email thật. Dự án và nội dung Phase 2/3 cần dữ liệu được duyệt theo CONTENT.md. Kiểm tra lại URL, security, Lighthouse và mailto sau khi phát hành bằng pipeline đã xác nhận.
