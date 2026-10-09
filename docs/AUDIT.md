# Audit — 09/10/2026

## Trạng thái ban đầu

Repository đã có React/Vite, Kumo 2.14.0, SVN-Aguda local, logo PNG, OG image, CNAME, robots và sitemap. Bản trước là một trang dài; thiếu trang phụ, metadata riêng, typing và kiểm tra chất lượng cho website corporate.

API GitHub Pages của `leanhtuan-coder/vex-website` tại thời điểm audit trả `build_type: workflow`, nguồn `main /`, URL `http://vex.biz.vn/`. Actions có workflow động `pages-build-deployment`; không thấy workflow build Vite được lưu trong repo trước thay đổi. Đây là bằng chứng cấu hình Pages, chưa xác nhận origin thực tế của domain qua Cloudflare hoặc SSL. Không giả định Cloudflare Pages/Workers/cPanel là hosting đang chạy.

## Quyết định

Giữ React/Vite/static hosting, chuyển TypeScript strict. Prerender 12 trang public và 404 từ component React cùng metadata dùng chung. Entry build nhập form trực tiếp để tránh loading shell và streaming payload; trình duyệt vẫn tải form riêng khi vào Contact. HTML đọc được khi tắt JS; menu/dialog và form cần JS để tương tác.

Không thêm framework SSR, database hoặc CMS khi chưa cần. Content công ty/dịch vụ/dự án/SEO đặt trong `src/content/`. Bố cục riêng dùng component thật Kumo, token VEX. CI kiểm tra mọi nhánh; workflow Pages build, kiểm tra và deploy từ `main`.

## Đối chiếu nguồn

| Nội dung                                                     | Nguồn / xử lý                                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Cyan, font, triết lý logo                                    | Brand Guidelines; màu trang 7, font trang 9                               |
| Mint                                                         | Vector swatch `#67C08B`; chú thích HEX bị lặp cyan                        |
| Pháp nhân, mã số, ngày đăng ký, trụ sở, đại diện, điện thoại | Đối chiếu giấy chứng nhận đăng ký doanh nghiệp trong workspace            |
| Email theo đăng ký                                           | `contact.vextech@gmail.com`                                               |
| Email chính website                                          | `contact@vex.biz.vn`, có trong repo và chủ website chấp nhận cho mailto   |
| Hướng công nghệ                                              | Brief của chủ website; mô tả định hướng, không tuyên bố đã thương mại hóa |
| Dự án/khách hàng/thành tích/lãnh đạo bổ sung                 | Chưa có dữ liệu được duyệt; không dựng thay thế                           |

Không đưa PDF đăng ký, số giấy tờ, ngày sinh hay địa chỉ cá nhân lên website. Bỏ postcode và hồ sơ founder chưa xác minh khỏi JSON-LD. Không biến slogan/tầm nhìn/sứ mệnh bản nháp thành tuyên bố chính thức.

Phase 1 đã triển khai: brand system, header/footer, Home/About/Solutions/Projects/Contact, 5 chi tiết giải pháp, privacy/terms/404, responsive, SEO, QA và tài liệu. Phase 2/3 xem CONTENT.md. Không có menu trỏ tới trang chưa tồn tại. Production dùng workflow Pages trên `main`; trạng thái từng lần phát hành xem Actions/Deployments.

Đợt mở rộng Phase 2/3 thêm Research, Insights, Careers, Media và Academy, đưa số trang static hiện có lên 17. Mẫu bài viết/việc làm chỉ xuất bản khi có dữ liệu đã duyệt. Pipeline biên tập lọc trước bundle, kiểm tra nội dung và ảnh; ngày publication cố định giữa SSR/hydration. Các trang mới lazy-load JS và có CSS ngay từ HTML; menu desktop dùng Kumo DropdownMenu, menu mobile vẫn Kumo Dialog. Không dựng bài viết/việc/case giả hoặc học phí/tuyển sinh/portal không có hoạt động thật.

Analytics được chủ website xác nhận giữ tắt. Adapter/sự kiện đã chuẩn bị, chưa có tài khoản hay cấu hình provider. API tiếp nhận/CRM/CMS nâng cao, microsite/portal và tiếng Anh chưa bật; phần cần dữ liệu và hạ tầng xem CONTENT.md.

Nội dung chiến lược bổ sung ngày 09/10/2026: Home có bản rút gọn Tầm nhìn/Sứ mệnh; About có nội dung đầy đủ, năm giá trị và lãnh đạo theo thứ tự yêu cầu. Nguồn chung brand-strategy.ts giữ trạng thái draft và nhãn chờ phê duyệt. Đối chiếu đủ 16 trang Brand Guidelines không có bộ Vision/Mission/Core Values chính thức khác; không dùng câu quảng bá dẫn đầu trong phần giải thích logo. Không bổ sung chân dung/hồ sơ/chức danh lãnh đạo chưa xác nhận. Hai liên kết Robotics/Embedded ở Research được sửa về chi tiết IoT & Embedded đang tồn tại.
