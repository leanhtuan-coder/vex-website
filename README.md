# VEX Technology Solutions

Website tiếng Việt sử dụng React và component thật từ Cloudflare Kumo 2.14.0: LinkButton, Button, Link, Input, InputArea, Select, Badge, Banner, Text và LayerCard. CSS standalone của Kumo được nhập trước CSS thương hiệu VEX.

## Phát triển

Yêu cầu Node.js 22 và npm.

```sh
npm ci
npm run dev
```

## Build và xem trước

```sh
npm run build
npm run preview
```

Build tạo `dist/` với HTML render sẵn, metadata SEO, JSON-LD, tài nguyên thương hiệu, CNAME, robots.txt và sitemap.xml. Chỉ đưa các file trong `dist/` lên hosting. Không phục vụ trực tiếp thư mục mã nguồn hoặc index.html nguồn. Với GitHub Pages, dùng quy trình build và upload artifact `dist/` thay cho phục vụ nhánh gốc. Chưa có thao tác publish tự động.

`public/` được tạo từ danh sách tài nguyên công khai trong `scripts/prepare-public.mjs`; các tài liệu nội bộ không được đưa vào build.

## Kiểm tra giao diện

```sh
npx playwright install chromium
npm run preview
# Trong terminal khác:
npm run verify:ui
```

Kiểm tra các chiều rộng 1440, 768, 390 và 320px, tải hình ảnh, lỗi JavaScript/hydration, menu di động và biểu mẫu. Ảnh kiểm tra lưu ở `artifacts/`.

## Biểu mẫu liên hệ

Website chưa có API nhận yêu cầu. Biểu mẫu kiểm tra các trường bắt buộc rồi tạo email `mailto:contact@vex.biz.vn` chứa thông tin đã nhập. Người dùng cần ứng dụng email được cấu hình và phải tự nhấn gửi. Giao diện không báo VEX đã nhận yêu cầu khi chưa có xác nhận từ máy chủ.

## Nhận diện VEX

`src/brand.css` quản lý font và token thương hiệu, ánh xạ vào token Kumo. Font SVN-Aguda Regular (400) và Black (900) được chuyển từ các file OTF có sẵn sang WOFF2 trong `assets/fonts/`; không phụ thuộc Google Fonts. Tiêu đề dùng Black, nội dung dùng Regular.

Màu chính `#00707E` theo trang 7 của Brand Guidelines. Màu bạc hà `#67C08B` lấy từ màu tô vector của ô mẫu trong PDF vì phần chú thích của ô bạc hà bị lặp mã màu cyan. Trắng và xám `#E6E7E8` là màu nền; các nền nhạt và trạng thái hover được pha từ màu thương hiệu. Màu bạc hà dành cho điểm nhấn đồ họa, cyan dành cho chữ và nút để giữ độ tương phản.

## Rà soát Kumo

| Thành phần             | Triển khai                                         |
| ---------------------- | -------------------------------------------------- |
| Nút và CTA             | Button / LinkButton; menu dùng shape="square"      |
| Liên kết, kể cả logo   | Link                                               |
| Các trường liên hệ     | Input / InputArea với label tích hợp               |
| Chọn dịch vụ           | Select, popup do Kumo/Base UI quản lý              |
| Thông báo sau thao tác | Banner                                             |
| Tiêu đề, đoạn văn      | Text với as="h1", "h2", "h3", "p" để giữ ngữ nghĩa |
| Badge và card          | Badge / LayerCard, dùng surface mặc định           |
| Màu và font            | Token Kumo được ánh xạ sang nhận diện VEX          |

Không còn control HTML tự dựng hoặc CSS ghi đè border, nền, padding và radius của input. Card giữ surface Kumo; CSS trang chỉ bố trí và tạo khoảng cách cho card. Các phần cấu trúc trang (header, nav, main, section, footer), bố cục responsive và sơ đồ năng lực VEX là HTML/CSS riêng. Đây là giao diện dùng component Kumo với nhận diện VEX, không phải sao chép toàn bộ bố cục trang tài liệu Kumo.

Kiểm tra bổ sung: logo không có chữ bên cạnh, dropdown chọn dịch vụ mở/chọn/đóng bằng bàn phím, Escape trả focus về trigger, popup không gây tràn ngang ở 320px và giá trị dịch vụ được đưa đúng vào FormData.
