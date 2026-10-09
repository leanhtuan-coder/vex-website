# Đo lường website

Tracking đang tắt theo xác nhận của chủ website. Bản mặc định không tải script/endpoint analytics, không lưu định danh vào cookie/localStorage và không thu thập nội dung form.

## Cấu hình đã chuẩn bị

Adapter hỗ trợ Umami qua API payload riêng và tracking thủ công. Chưa có tài khoản/website ID/script URL; chưa kiểm tra gửi hoặc nhận dữ liệu tại nhà cung cấp thật. Không có dashboard giả hoặc số liệu mẫu.

Khi chủ website chọn nhà cung cấp và cho phép bật: tạo website trên Umami, xác nhận endpoint HTTPS, điền ba biến public trong `.env.example`, cập nhật biến build trong workflow, rà soát hoạt động xử lý dữ liệu/chính sách quyền riêng tư và kiểm tra thực tế trước deploy. Không dùng API key bí mật làm website ID. Khi flag bật nhưng cấu hình không hợp lệ, build thất bại. Preview/local không tự gửi dữ liệu; hostname production được kiểm tra.

| Biến                   | Giá trị hiện tại |
| ---------------------- | ---------------- |
| VITE_ANALYTICS_ENABLED | false            |
| VITE_UMAMI_SCRIPT_URL  | trống            |
| VITE_UMAMI_WEBSITE_ID  | trống            |

Tracker đặt auto-track=false, exclude-search/exclude-hash, và tôn trọng Do Not Track/Global Privacy Control. Payload chỉ gồm website ID, hostname, canonical của trang public và title được quản lý; không đọc referrer, query, nội dung form hoặc mã người dùng. Metadata có thể thay đổi theo nội dung công khai nên người biên tập cần giữ title không chứa dữ liệu cá nhân. [Cấu hình Umami](https://docs.umami.is/docs/tracker-configuration), [API payload thủ công](https://docs.umami.is/docs/tracker-functions).

## Sự kiện

| Sự kiện                                | Ý nghĩa                                                             |
| -------------------------------------- | ------------------------------------------------------------------- |
| pageview                               | Đọc trang public; path lạ được chuẩn hóa thành 404                  |
| cta_click                              | Bấm CTA; destination chỉ là route public                            |
| email_click / phone_click              | Bấm kênh liên hệ; không gửi email/số điện thoại                     |
| email_prepared                         | Website đã tạo mailto; không chứng minh thư đã gửi hoặc VEX đã nhận |
| media_download                         | Bấm tệp media được duyệt; không chứng minh download hoàn tất        |
| article_open / job_open / project_open | Mở chi tiết đã công bố                                              |

Không có form_success vì website không có API nhận form. Không đo từ khóa tìm kiếm, không gửi attachment/CV hoặc consent/form values. Lỗi tracker không chặn điều hướng và soạn email. Sự kiện không được lưu hoặc xếp hàng trên thiết bị khi tracking tắt.

## Kiểm tra trước khi bật

Kiểm tra payload bằng stub và Network, không dùng dữ liệu người thật; kiểm tra DNT/GPC, local/staging, query chứa giá trị thử, lỗi provider và ad blocker. Kiểm tra CSP trên host thật: build chỉ tạo mẫu `_headers`; GitHub Pages không tự áp dụng. Xác nhận dữ liệu nhận thật và mục đích/thời hạn lưu ở provider rồi mới báo analytics hoạt động. Các bước này chưa thực hiện với provider thật vì chưa có cấu hình và tracking đang tắt.
