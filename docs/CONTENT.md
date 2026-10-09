# Nội dung và lộ trình

## Cập nhật

`company.ts` là nguồn footer/contact/schema; `services.ts` quản lý giải pháp; `research.ts` và `academy.ts` quản lý định hướng; `pages.ts` quản lý SEO/sitemap. Bài viết, việc làm và case study nằm trong ba mảng của `content/website.ts`; kiểu dữ liệu ở `src/content/articles.ts`, `careers.ts` và `projects.ts`.

`src/content/brand-strategy.ts` là nguồn chung cho Tầm nhìn, Sứ mệnh và năm Giá trị cốt lõi do chủ website cung cấp ngày 09/10/2026. Home dùng message/summary ngắn; About dùng statement đầy đủ và supportingMessages. Các giá trị giữ số thứ tự, tên Việt/Anh và mô tả nguyên văn. Trạng thái hiện tại `draft`, với nhãn bản thảo trên website; chỉ đổi sang `approved` sau xác nhận phê duyệt chính thức. Brand Guidelines không có bộ Vision/Mission/Core Values khác để thay thế. Leadership hiện chỉ hiển thị tên và chức danh pháp lý đã đối chiếu từ company.ts; chưa có ảnh/hồ sơ bổ sung nên không tạo thay thế.

`npm run prepare:content` kiểm tra và tạo `src/content/published.json`. Trình duyệt chỉ nhập JSON đã lọc; source biên tập và validator không đi vào bundle. File sinh tự động không commit và không chỉnh trực tiếp. `pretypecheck`, `predev` và `prebuild` tự chạy publisher; bản clone mới chạy `npm ci`, `npm run check` như bình thường.

Quy trình: chuẩn bị nội dung và quyền sử dụng, điền bản nháp, chủ nội dung duyệt, đặt `approvedForPublication: true` cùng trạng thái hợp lệ, chạy check/UI rồi push. `main` phát hành tự động. Cờ duyệt kiểm soát website; repo GitHub là public nên không lưu bản nháp mật, tài liệu khách hàng, thông tin cá nhân hoặc credentials trong source.

Ngày publication dùng giờ Việt Nam và cố định cho HTML/hydration. Có thể đặt `VEX_CONTENT_DATE=YYYY-MM-DD` để tái lập kiểm tra. Bài ngày tương lai và việc chưa tới ngày đăng hoặc đã quá hạn không có trang, sitemap, schema hay dữ liệu trong bundle. Cần build/deploy vào ngày đăng và ngay khi đóng/hết hạn để cập nhật HTML static.

Thêm giải pháp với slug chữ thường có gạch ngang, điền toàn bộ kiểu Service. Build tự tạo chi tiết và metadata từ dữ liệu. Kiểm tra link/anchor sau cập nhật.

## Bài viết và tuyển dụng

Hai danh sách hiện trống. Bài công khai cần slug, title, summary, category, tác giả thật, ngày đăng được xác nhận, `status: published`, cờ duyệt và body có cấu trúc. `authorType: Organization` dành cho tác giả tổ chức; mặc định Person. Ngày sửa chỉ thêm khi có chỉnh sửa thật. Body hỗ trợ paragraph, heading h2/h3 có ID, list và image; không nhận raw HTML. Ảnh cần local `/assets/...`, alt và width/height. Mục lục, tìm kiếm/bộ lọc, bài liên quan, chi tiết, Article và sitemap được tạo từ dữ liệu đã duyệt.

Việc làm cần title/department/summary, hình thức và địa điểm thật, công việc, yêu cầu, quyền lợi, hướng dẫn ứng tuyển, ngày đăng/hạn, `status: open` và cờ duyệt. Lương chỉ thêm khi được phê duyệt. Hạn bao gồm hết ngày đó theo giờ Việt Nam; JobPosting có validThrough và chỉ có trên chi tiết đang mở. Publisher kiểm tra ngày/số/khoảng lương. CTA mang slug vị trí sang Contact; chỉ vị trí public đang mở được đưa vào email. Website không nhận/lưu CV và không xác nhận VEX đã nhận hồ sơ.

## Dự án

Mảng projects trong `content/website.ts` hiện rỗng theo xác nhận của chủ website. “Chưa có dự án được công bố” là trạng thái nội dung thật. Không có case study mẫu trên trang public.

Dự án cần: slug/tên, danh mục, trạng thái Concept/Research/Prototype/Pilot/Commercial Product, mô tả, ảnh/alt, bối cảnh, bài toán, giải pháp, công nghệ, vai trò VEX, kết quả có bằng chứng, thách thức và hướng phát triển. Xác nhận quyền dùng ảnh và quyền công bố, kể cả sự đồng ý của khách hàng nếu cần. Chỉ đặt `approvedForPublication: true` sau kiểm tra. Build sẽ tạo danh sách, chi tiết và sitemap; mục chưa duyệt không có URL public.

Ảnh cần `imageWidth`/`imageHeight`. Publisher chỉ đưa ảnh của nội dung đã công bố vào allowlist build tự động; ảnh bản nháp không được copy. Chỉ chấp nhận định dạng ảnh, chặn traversal/PDF/symlink ngoài assets và SVG chứa nội dung chủ động/tham chiếu ngoài. Thư viện hiện có bốn tệp logo SVG/PNG màu-trắng tải thật; ảnh/video dự án chưa có. Không public PDF/AI/font nguồn hoặc tài nguyên nhạy cảm.

## Thông tin còn cần

- Dự án/sản phẩm, ảnh/demo, trạng thái và bằng chứng kết quả được phép giới thiệu.
- Hồ sơ lãnh đạo ngoài Lê Anh Tuấn nếu được phép đăng.
- Phê duyệt chính thức bản thảo Tầm nhìn, Sứ mệnh và Giá trị cốt lõi đã tích hợp; slogan chính thức nếu có.
- Phạm vi dịch vụ thương mại, SLA và quy trình chuẩn. Home hiện ghi quy trình tham khảo.
- Tin tức/tác giả/ngày phát hành, vị trí tuyển dụng còn mở và nghiên cứu được phép mô tả.
- Người phụ trách nội dung và rà soát privacy khi thay đổi xử lý dữ liệu.

## Trạng thái các phase

Phase 2 có R&D chi tiết, danh mục và template Insights/Careers, thư viện logo, case study template cùng publisher và cấu hình analytics tắt theo xác nhận. Nội dung public chưa được duyệt vẫn trống; không tạo bài mẫu, Article hoặc JobPosting trên danh mục trống. Tiếng Anh chưa bật; cần nội dung được biên tập và xác nhận nhu cầu.

Phase 3 có trang định hướng Academy và pipeline nội dung bằng Git; chưa có tuyển sinh/khóa học. Microsite/portal cần sản phẩm thực; CMS nâng cao cần quy trình biên tập; CRM/API cần kênh tiếp nhận, hạ tầng và cấu hình thật. Không dựng hệ thống quản trị hoặc portal giả. Xem [analytics](ANALYTICS.md) và [vận hành](OPERATIONS.md).

## Khi bổ sung API form

Chủ website xác nhận chưa có backend, giữ soạn email và ghi rõ trạng thái. API tương lai cần validation server, chống spam/rate limit và Turnstile nếu phù hợp; trạng thái gửi/lỗi/thành công theo phản hồi thực; cập nhật consent, thời hạn lưu, nơi xử lý và quyền truy cập/xóa. Không đưa khóa bí mật vào VITE\_\* hoặc bundle client.
