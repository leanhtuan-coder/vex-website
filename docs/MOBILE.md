# Tối ưu giao diện mobile VEX

Đợt này giữ bố cục desktop đã duyệt, nhận diện VEX, Cloudflare Kumo, Phosphor và toàn bộ nội dung công khai. Các thay đổi nằm trong CSS cho màn hình nhỏ; không thêm dependency cho ứng dụng.

## Phạm vi thay đổi

- `src/styles-mobile.css`: giảm khoảng trắng và kích thước Hero/visual trên điện thoại; thu gọn các section Home, About và những trang dùng bố cục chung; giữ chữ và CTA rõ ràng.
- `src/styles-mobile-shell.css`: header gọn hơn, menu nằm trong chiều cao viewport khi xoay ngang, vùng chạm đủ lớn, nút đóng bám đầu menu, biểu mẫu dễ thao tác và footer gọn hơn.
- `src/styles-mobile-leadership.css`: portrait 4:5 nhỏ hơn trên điện thoại; tên, chức danh đầy đủ, tiểu sử và phạm vi trách nhiệm được giữ nguyên; không cắt chữ bằng ellipsis.
- `src/main.tsx`: nhập các stylesheet mobile sau hệ thống visual hiện có để ưu tiên đúng các điều chỉnh theo breakpoint.

Phần lớn thay đổi nội dung và khoảng cách áp dụng đến 600px. Header, bố cục form và footer áp dụng đến 760px; menu giới hạn chiều cao đến 1120px, tương ứng vùng dùng điều hướng di động. Chữ 16px và vùng chạm 44px của control cũng áp dụng đến 1120px khi thiết bị dùng con trỏ coarse và không có hover, bao gồm điện thoại xoay ngang và tablet cảm ứng. Desktop 1440px giữ bố cục đã duyệt.

## Số đo trước và sau

Baseline là build `7c59d08`. Các số dưới đây đo bằng Chromium ở viewport 390 × 844, mobile/touch emulation, DPR 2. Chiều cao tính bằng CSS pixel và làm tròn đến pixel gần nhất.

| Trang / thành phần           |         Trước |           Sau | Thay đổi                            |
| ---------------------------- | ------------: | ------------: | ----------------------------------- |
| Trang chủ                    |      12.665px |      11.268px | Giảm 11,0% chiều dài trang          |
| About                        |      13.529px |      12.115px | Giảm 10,5%                          |
| Leadership                   |       7.750px |       6.572px | Giảm 15,2%                          |
| Liên hệ                      |       3.698px |       3.402px | Giảm 8,0%                           |
| Giải pháp                    |       9.022px |       8.288px | Giảm 8,1%                           |
| Tài nguyên thương hiệu       |       6.632px |       6.349px | Giảm 4,3%                           |
| Hero Home                    |       1.172px |         930px | CTA và phần nội dung đến sớm hơn    |
| Vị trí đầu nhóm CTA Hero     |     y = 526px |     y = 433px | Sớm hơn 93px                        |
| Section lãnh đạo trong About |       3.231px |       2.541px | Giữ đủ bốn hồ sơ                    |
| Portrait đầu tiên            | 350 × 437,5px | 249,6 × 312px | Giữ tỷ lệ 4:5                       |
| Header, gồm đường viền       |          73px |          65px | Gọn hơn 8px                         |
| Footer dùng chung            |       1.245px |       1.094px | Giữ liên kết và thông tin pháp nhân |
| Chữ Kumo Select              |          14px |          16px | Đồng nhất với các trường nhập       |

Menu ngang 740 × 360 trước đây bắt đầu ở y = 64px, cao 328px và vượt đáy viewport 32px. Sau thay đổi, menu bắt đầu ở y = 12px, cao 336px và nằm trọn trong màn hình. Nút đóng tăng từ 36 × 36px lên 44 × 44px; vẫn truy cập được mục cuối khi cuộn.

## Kiểm thử đã thực hiện

- **Chromium:** 18 route × 7 chiều rộng 320, 360, 375, 390, 430, 600 và 768px = **126 lượt layout** bằng mobile/touch emulation DPR 2. Không tràn ngang, không lỗi ảnh, mỗi trang một H1. Các chức danh lãnh đạo đầy đủ và portrait 4:5 đạt ở mọi chiều rộng này.
- **WebKit:** 18 route × 3 chiều rộng 360, 390 và 430px = **54 lượt layout**. Không tràn ngang, không lỗi ảnh; bốn hồ sơ, chức danh CBDO và tỷ lệ portrait đúng.
- **Menu trên cả hai engine:** 390 × 844, 740 × 360 và 844 × 390. Kiểm tra bounds, vùng chạm tối thiểu 44px cho nút đóng và các mục, nút đóng còn thấy khi cuộn đến cuối, focus nằm trong dialog, Escape đóng menu, tap điều hướng/đóng menu.
- **Khóa cuộn nền:** Chromium dùng chuỗi touchStart/touchMove/touchEnd ở nền bên ngoài dialog và xác nhận trang không cuộn. WebKit xác nhận `body` có computed `overflow: hidden`; runtime mobile WebKit không hỗ trợ synthetic mouse wheel. Không khẳng định đã kiểm tra gesture trên iPhone thật.
- **Biểu mẫu:** trường nhập và Kumo Select 16px, cao tối thiểu 44px; option Select tối thiểu 44px; nhãn consent cao 66px ở 390px, 45px khi nằm trên một dòng ở 740/844/1024px cảm ứng. Tap chọn chủ đề, tap consent và trạng thái chuẩn bị email đạt trên Chromium; tap Select/consent và kích thước control đạt trên WebKit. Không gửi email hoặc dữ liệu thật trong kiểm thử.
- **Accessibility:** axe quét cả 18 trang tại 390px với nhóm WCAG 2 A/AA, 2.1 AA và 2.2 AA, không có violation. Quét tự động không thay thế toàn bộ đánh giá accessibility bằng người dùng.
- **Reduced motion:** Chromium không có animation đang chạy ở Home khi đặt `prefers-reduced-motion: reduce`.
- **Không JavaScript:** Home, About, Leadership, Contact, Solutions và Media hiển thị nội dung, không tràn ngang; hồ sơ lãnh đạo và kênh email trực tiếp vẫn có trong HTML.
- **Console/network:** không lỗi JavaScript/console trên hai engine; các lượt Chromium local không phát sinh HTTP request bên ngoài origin.

Các kiểm thử bổ sung này dùng Chromium và WebKit của Playwright trên Windows. Chưa thử điện thoại vật lý, bàn phím ảo thật, thanh địa chỉ Safari co giãn hay các giá trị safe-area trên thiết bị thật. WebKit runtime chỉ là công cụ kiểm thử, không được thêm vào dependency hay bundle của website.

Sau khi xem screenshot và rà soát breakpoint, đã sửa thêm nền sticky header để các mục menu không lọt phía trên khi cuộn, mở rộng control cho điện thoại ngang/tablet cảm ứng và tăng padding nhãn consent. Kiểm tra cuối đạt 12 cấu hình: mỗi engine ở 390/740/844/1024px cảm ứng và 768/1440px con trỏ fine. CTA, form, menu, focus/Escape và thao tác consent đạt; form desktop fine giữ kích thước cũ. Số đo và ảnh Contact/menu trong bảng là bản cuối. Hai báo cáo layout 126/54 lượt giữ dữ liệu lần đầu; report `final-controls-menu.json` bổ sung kết quả sau các sửa cuối.

`npm run check` đạt TypeScript, ESLint, 164 kiểm tra nội dung và build 18 trang/404. `npm run verify:ui` đạt thêm 198 lượt layout cùng các kiểm tra tương tác và nội dung chung. Lighthouse 13.5.0 trên build local cuối, mô phỏng mobile mặc định: Home và Contact đều Performance 94, Accessibility/Best Practices/SEO 100, LCP 2,5s và TBT 0ms; CLS lần lượt 0.001 và 0.009. Đây là dữ liệu lab, không phải Core Web Vitals của người dùng thật. CSS tăng khoảng 1,4KB sau gzip; không thêm JavaScript hoặc dependency cho tính năng mobile.

## Kiểm tra desktop và ảnh chụp

About, Leadership và Contact tại 1440px có screenshot trùng byte với baseline. Home giữ cùng kích thước 1440 × 7.860px; khác biệt giới hạn trong nét signal SVG có chuyển động sẵn, không có thay đổi layout. Cặp screenshot đã chờ và finish animation hữu hạn vẫn có 142 pixel khác nhau, nằm trong vùng x = 867–913, y = 388–403; không tuyên bố screenshot Home trùng byte.

Đã kiểm tra trực quan các crop browser của Hero, profile About đầu tiên, biểu mẫu và menu ngang. Crop trước lấy từ bản production `7c59d08` trước khi deploy đợt này; crop sau lấy từ preview build mới. Chỉ tạm ẩn sticky header bằng `visibility: hidden` trong lượt chụp crop để tránh header đè vào nội dung; không sửa CSS sản phẩm hay ảnh nguồn.

Các artifact nằm trong thư mục bị Git ignore:

- `artifacts/mobile/comparison.html`: so sánh trước/sau, số đo, screenshot toàn trang và crop.
- `artifacts/mobile/before/metrics.json`: số đo baseline.
- `artifacts/mobile/report.json`: Chromium, axe, menu, form, no-JS, reduced motion và so sánh desktop.
- `artifacts/mobile/webkit-report.json`: WebKit và giới hạn kiểm thử.
- `artifacts/mobile/final-controls-menu.json`: 12 cấu hình sau các sửa cuối, với Contact và menu screenshot đã cập nhật.
- `artifacts/mobile/performance.json` và các file `lighthouse-*.html`/`.json`: hai phép đo Lighthouse mobile.
- `artifacts/mobile/before/` và `artifacts/mobile/after/`: screenshot sáu trang 390px, bốn trang desktop 1440px, crop Hero/profile/form và menu ngang.
- `artifacts/mobile/webkit/`: screenshot phone và menu trên WebKit.

Ảnh chân dung thật vẫn chưa được cung cấp. Các kiểm thử portrait hiện xác nhận fallback monogram và khung 4:5, chưa đánh giá crop khuôn mặt của bốn lãnh đạo trên thiết bị thật. Cách thêm ảnh giữ theo `docs/LEADERSHIP.md`.
