# Ảnh đội ngũ lãnh đạo VEX

Thư mục này là nguồn ảnh do VEX cung cấp. Build giữ nguyên file nguồn và chỉ phát
hành ảnh của các hồ sơ `VERIFIED` đã được duyệt công khai trong
`content/website.ts`. Chưa có ảnh thì website dùng monogram, không tạo request ảnh
không tồn tại.

| Thành viên       | Tên file                | Đường dẫn public                           |
| ---------------- | ----------------------- | ------------------------------------------ |
| Lê Anh Tuấn      | `le-anh-tuan.webp`      | `/images/leadership/le-anh-tuan.webp`      |
| Hoàng Mai        | `hoang-mai.webp`        | `/images/leadership/hoang-mai.webp`        |
| Đỗ Mai Trang     | `do-mai-trang.webp`     | `/images/leadership/do-mai-trang.webp`     |
| Huỳnh Ngô Cẩm Tú | `huynh-ngo-cam-tu.webp` | `/images/leadership/huynh-ngo-cam-tu.webp` |

- Chân dung tỷ lệ **4:5**, khuyến nghị tối thiểu **1200 × 1500 px**.
- Dùng **WebP tĩnh**, không đổi đuôi JPG/PNG thành `.webp`. File phải hợp lệ, tối
  đa 8 MiB; nên tối ưu về khoảng 200–350 KiB để tải nhanh trên điện thoại.
- Ảnh rõ nét, phông nền, ánh sáng, trang phục doanh nghiệp và vị trí chủ thể thống
  nhất. Chừa không gian quanh đầu và vai để khung 4:5 không cắt khuôn mặt.
- Chỉ dùng ảnh có sự đồng ý của người được chụp và quyền sử dụng cho website.
  Không dùng ảnh stock của người khác, không tạo khuôn mặt AI, không chỉnh sửa
  khuôn mặt khi chưa được chỉ đạo. Nên xóa metadata cá nhân trước khi upload.

Để thay ảnh, upload hoặc thay thế đúng tên file trong thư mục này, rồi chạy
`npm run build`. Nếu đang chạy dev server, khởi động lại bằng `npm run dev` để
publisher nhận file mới. Không cần import ảnh, điền kích thước hoặc sửa component.
Để cập nhật website công khai, commit ảnh và triển khai lại qua workflow hiện có.
Xóa file rồi build sẽ tự trở về monogram.

Build đo kích thước thực của ảnh. Component dùng `object-fit: cover` trong khung
4:5; nếu cần chỉnh điểm căn ảnh, thêm `photoFocalPoint: { x: 50, y: 40 }` trong hồ sơ
tương ứng tại `content/website.ts` (phần trăm 0–100). Giữ ảnh gốc để có thể chỉnh
cách crop khi cần. Thay tiểu sử, chức danh, LinkedIn hoặc thứ tự tại cùng data
source sau khi nội dung mới được duyệt; không sao chép vào JSX từng trang.

`public/images/leadership` không bị xóa khi build. `.public-build` là staging tự
sinh; không upload vào đó. README này và file chưa được duyệt không được đưa vào
bản phát hành. Thêm nhân sự mới cần hồ sơ được duyệt, slug riêng và cập nhật
allowlist tên ảnh trong `.gitignore`.
