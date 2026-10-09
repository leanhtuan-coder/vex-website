# Nội dung và lộ trình

## Cập nhật

`company.ts` là nguồn footer/contact/schema; `services.ts` quản lý giải pháp; `research.ts` và `academy.ts` quản lý định hướng; `pages.ts` quản lý SEO/sitemap. Bài viết, việc làm, case study, lãnh đạo và tài liệu công khai nằm trong `content/website.ts`; kiểu dữ liệu ở `src/content/`.

Các trạng thái nội bộ `VERIFIED`, `DRAFT`, `PENDING_APPROVAL`, `NOT_AVAILABLE` tách khỏi cờ cho phép công bố. Case study, hồ sơ lãnh đạo và tài liệu cần `contentState: VERIFIED` và `approvedForPublication: true`; thiếu một trong hai sẽ không xuất bản. Bài viết/việc làm giữ điều kiện duyệt và ngày, đồng thời loại mọi trạng thái draft/chờ duyệt/chưa có. Lịch sử cấu hình không có contentState tiếp tục được nhận với cờ duyệt/trạng thái đăng hợp lệ; nội dung mới nên điền trạng thái rõ ràng. Xem [dữ liệu cần bổ sung](../CONTENT_REQUIREMENTS.md) và [checklist phát hành](../LAUNCH_CHECKLIST.md).

`corporate-identity.ts` chứa Why VEX đã được chủ website duyệt công khai dưới dạng định hướng, cùng một mốc đăng ký thành lập đã xác nhận. `challenges.ts` chỉ ánh xạ sáu nhóm nhu cầu tới dữ liệu giải pháp hiện có; `faq.ts` giải đáp từ nội dung dịch vụ/quy trình/kênh liên hệ đã công khai. Không tạo sản phẩm thương mại, thành tích hoặc SLA từ các định hướng này.

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

Dự án cần: slug/tên, danh mục, trạng thái Concept/Research/Prototype/Pilot/Commercial Product, mô tả, ảnh/alt, bối cảnh, bài toán, giải pháp, công nghệ, vai trò VEX. `provenance.ownership` phân biệt `vex`, `founder-before-vex`, `personal-research`, `collaboration`; `provenance.statement` giải thích nguồn gốc và quyền sở hữu. Trạng thái phát triển tách khỏi nguồn gốc. Kiến trúc công khai, kết quả có bằng chứng, thách thức và hướng phát triển chỉ thêm khi có dữ liệu; các mục thiếu được ẩn. Xác nhận quyền dùng ảnh và quyền công bố, kể cả sự đồng ý của khách hàng nếu cần. Chỉ đặt VERIFIED và cờ duyệt sau kiểm tra. Build tạo danh sách, chi tiết và sitemap; mục chưa duyệt không có URL public.

Ảnh cần `imageWidth`/`imageHeight`. Publisher chỉ đưa ảnh của nội dung đã công bố vào allowlist build tự động; ảnh bản nháp không được copy. Chỉ chấp nhận định dạng ảnh, chặn traversal/PDF/symlink ngoài assets và SVG chứa nội dung chủ động/tham chiếu ngoài. Thư viện hiện có bốn tệp logo SVG/PNG màu-trắng tải thật; ảnh/video dự án chưa có. Không public PDF nội bộ, AI/font nguồn hoặc tài nguyên nhạy cảm.

## Hồ sơ lãnh đạo và tài liệu công khai

Mảng leadership hiện chỉ có tên/chức danh pháp lý của Lê Anh Tuấn. Ảnh, biography, responsibilities, expertise và links là tùy chọn có xác minh/quyền công bố. Ảnh hiển thị tỷ lệ 4:5, không tạo placeholder khi chưa có; liên kết hồ sơ chỉ nhận HTTPS đã duyệt. Không tự nâng chức danh thành Founder/CEO hoặc thêm bằng cấp.

Mảng documents hiện trống. Khi có file được duyệt, lưu **bản dành riêng cho công khai** dưới `assets/documents/public-*.pdf`, thêm metadata và cờ VERIFIED/duyệt. Publisher kiểm tra đường dẫn, file thường, chữ ký PDF và dung lượng thật; allowlist chỉ copy file đã công bố. Chữ ký PDF không thay thế việc kiểm tra nội dung/quyền sử dụng hoặc quét malware. PDF Brand Guidelines nguồn ở root không được tự đưa lên web. Download Center tự xuất hiện khi có file thật; About nhận Company Profile đúng danh mục. Không cần tạo link chờ hoặc file PDF giả.

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
