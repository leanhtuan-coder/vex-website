# Nội dung và lộ trình

## Cập nhật

`company.ts` là nguồn footer/contact/schema; `services.ts` quản lý title, summary, bài toán, đối tượng, cách tiếp cận, công nghệ, phạm vi và kỳ vọng; `pages.ts` quản lý SEO/sitemap. Nội dung dài còn lại đặt trong component trang tương ứng.

Thêm giải pháp với slug chữ thường có gạch ngang, điền toàn bộ kiểu Service. Build tự tạo chi tiết và metadata từ dữ liệu. Kiểm tra link/anchor sau cập nhật.

## Dự án

`projects.ts` hiện rỗng theo xác nhận của chủ website. “Chưa có dự án được công bố” là trạng thái nội dung thật. Không có case study mẫu trên trang public.

Dự án cần: slug/tên, danh mục, trạng thái Concept/Research/Prototype/Pilot/Commercial Product, mô tả, ảnh/alt, bối cảnh, bài toán, giải pháp, công nghệ, vai trò VEX, kết quả có bằng chứng, thách thức và hướng phát triển. Xác nhận quyền dùng ảnh và quyền công bố, kể cả sự đồng ý của khách hàng nếu cần. Chỉ đặt `approvedForPublication: true` sau kiểm tra. Build sẽ tạo danh sách, chi tiết và sitemap; mục chưa duyệt không có URL public.

Thêm ảnh được duyệt vào allowlist `scripts/prepare-public.mjs`, tối ưu file và khai báo kích thước/alt. Không đưa nguồn chứa dữ liệu nhạy cảm vào tài nguyên public.

## Thông tin còn cần

- Dự án/sản phẩm, ảnh/demo, trạng thái và bằng chứng kết quả được phép giới thiệu.
- Hồ sơ lãnh đạo ngoài Lê Anh Tuấn nếu được phép đăng.
- Slogan, tầm nhìn, sứ mệnh và giá trị chính thức.
- Phạm vi dịch vụ thương mại, SLA và quy trình chuẩn. Home hiện ghi quy trình tham khảo.
- Tin tức/tác giả/ngày phát hành, vị trí tuyển dụng còn mở và nghiên cứu được phép mô tả.
- Người phụ trách nội dung và rà soát privacy khi thay đổi xử lý dữ liệu.

## Các giai đoạn sau

Phase 2: Insights/News, Careers, R&D chi tiết, thư viện media, case study đã duyệt, analytics có mục đích rõ và tiếng Anh. Không tạo bài mẫu, JobPosting hoặc Article schema khi thiếu dữ liệu thật.

Phase 3: Academy khi kế hoạch đào tạo được thông qua; microsite khi có sản phẩm; CMS khi quy trình biên tập cần; CRM/API/portal theo hoạt động thực tế. Phiên bản hiện tại không có tuyển sinh/khóa học đang mở.

## Khi bổ sung API form

Chủ website xác nhận chưa có backend, giữ soạn email và ghi rõ trạng thái. API tương lai cần validation server, chống spam/rate limit và Turnstile nếu phù hợp; trạng thái gửi/lỗi/thành công theo phản hồi thực; cập nhật consent, thời hạn lưu, nơi xử lý và quyền truy cập/xóa. Không đưa khóa bí mật vào VITE\_\* hoặc bundle client.
