# VEX Leadership

## Nội dung và mô hình xuất bản

Người dùng đã duyệt nguyên văn tiểu sử và phạm vi trách nhiệm của cả bốn hồ sơ trong brief Leadership. Thứ tự hiển thị là thứ tự được cung cấp, không suy diễn thứ bậc pháp lý.

| Thành viên       | Chức danh hiển thị đầy đủ          | Badge | LinkedIn                                                                        |
| ---------------- | ---------------------------------- | ----- | ------------------------------------------------------------------------------- |
| Lê Anh Tuấn      | Founder & Chief Executive Officer  | CEO   | [URL được cung cấp](https://www.linkedin.com/in/anhtuanle05/)                   |
| Hoàng Mai        | Chief Marketing Officer            | CMO   | [URL được cung cấp](https://www.linkedin.com/in/maihoang0405/)                  |
| Đỗ Mai Trang     | Chief Financial Officer            | CFO   | Chưa được cung cấp; không hiển thị biểu tượng/liên kết                          |
| Huỳnh Ngô Cẩm Tú | Chief Business Development Officer | CBDO  | [URL được cung cấp](https://www.linkedin.com/in/c%E1%BA%A9m-t%C3%BA-94786b42a/) |

Chức danh điều hành trong hồ sơ do người dùng xác nhận. Thông tin pháp nhân và tư cách đại diện theo pháp luật tiếp tục lấy từ nguồn pháp lý riêng; chức danh CEO không thay thế chức danh pháp lý. Không suy diễn vai trò Co-Founder, thành viên Hội đồng quản trị, bằng cấp, chứng chỉ, thành tích, doanh thu hoặc số năm kinh nghiệm.

Chọn phương án A: một trang `/leadership/` có bốn hồ sơ đầy đủ và các anchor theo slug. Home dùng preview ngắn; About dùng overview bốn chân dung. “Xem hồ sơ” dẫn tới đúng anchor trên trang Leadership. Tiểu sử và danh sách trách nhiệm nằm ở trang chi tiết, không đổ toàn bộ vào card. Một trang đầy đủ phù hợp với lượng nội dung đã được duyệt, giúp truy cập bằng bàn phím, chia sẻ anchor, đọc khi JavaScript tắt và giữ metadata tập trung. Chưa tạo bốn trang cá nhân riêng khi chưa có nội dung bổ sung để phân biệt các trang.

Các component tích hợp:

- `src/components/LeadershipProfiles.tsx`: overview trên About, bốn cột từ 1280px, hai cột tablet và một cột tới 600px.
- `src/components/LeadershipPortrait.tsx`: khung 4:5, ảnh tùy chọn, focal point và fallback chữ viết tắt dùng chung.
- `src/components/LeadershipPreview.tsx`: bốn tên/chức danh đầy đủ và CTA trên Home; không đưa tiểu sử dài vào trang chủ.
- `src/pages/LeadershipPage.tsx`: bốn hồ sơ chi tiết, anchor ổn định, phạm vi phụ trách và các liên kết đã cung cấp.

UI tiếp tục dùng Kumo, Phosphor và font/màu VEX. Visual fallback dùng SVG/CSS riêng; không thêm dependency hoặc motion liên tục. About và Home liên kết trực tiếp tới từng anchor. Footer thêm một liên kết lãnh đạo, không tăng số mục trên navigation chính.

## Tham khảo thiết kế

Các nguồn chính thức được đọc để đánh giá cách phân cấp nội dung, không sử dụng ảnh hay sao chép giao diện:

- [Cloudflare People](https://www.cloudflare.com/people/): trình bày tên và vai trò cùng chân dung, phân biệt nhóm lãnh đạo/hội đồng.
- [Microsoft Executive Biographies](https://news.microsoft.com/source/leadership/): overview tên/chức danh dẫn đến thông tin hồ sơ; phân biệt executive và board.
- [Adobe Leadership](https://www.adobe.com/about-adobe/leaders.html): chức danh đầy đủ, chân dung nhất quán và đường dẫn từ danh sách tới hồ sơ.

Áp dụng cho VEX là quyết định thiết kế: hai cấp overview/detail, chân dung 4:5, typography đủ lớn, thứ tự rõ ràng và khoảng trắng cân đối. Không hàm ý VEX có quy mô, thành tích hoặc cấu trúc pháp lý giống các doanh nghiệp tham khảo. Không truy cập LinkedIn để thu thập dữ liệu cá nhân.

## Nguồn dữ liệu dùng chung

Biên tập `content/website.ts`, mục `websiteContent.leadership`. Kiểu dữ liệu nằm trong `src/content/leadership.ts`. Publisher sinh projection công khai; component và các trang chỉ đọc `publicLeadership`, không import nguồn biên tập vào trình duyệt.

Các field chính:

| Field                                     | Ý nghĩa                                                  |
| ----------------------------------------- | -------------------------------------------------------- |
| `id`, `slug`, `name`                      | Định danh, anchor ổn định và họ tên                      |
| `role`, `titleVietnamese`, `abbreviation` | Chức danh tiếng Anh đầy đủ, tiếng Việt và badge phụ      |
| `initials`                                | Chữ viết tắt của fallback; `LAT`, `HM`, `ĐMT`, `HNCT`    |
| `photo`, `photoFocalPoint`                | Metadata ảnh và vị trí chủ thể theo phần trăm x/y        |
| `shortBiography`, `biography`             | Giới thiệu ngắn tùy chọn và tiểu sử theo đoạn            |
| `responsibilities`, `expertise`           | Phạm vi trách nhiệm và lĩnh vực chuyên môn đã được duyệt |
| `education`, `careerHighlights`           | Học vấn/thành tích tùy chọn; hiện chưa có dữ liệu        |
| `linkedinUrl`, `personalWebsite`          | Liên kết thật tùy chọn                                   |
| `displayOrder`                            | Thứ tự hiển thị                                          |
| `contentState`, `approvedForPublication`  | Trạng thái quản trị và quyền công bố                     |

Chỉ hồ sơ `VERIFIED` và `approvedForPublication: true` được xuất bản. Muốn ẩn một hồ sơ, thay quyền công bố hoặc trạng thái rồi build/deploy lại. Field chưa có dữ liệu được bỏ trống; không dựng nội dung hoặc hiển thị “Updating…”. Nội dung thay đổi, người mới, học vấn, thành tích và liên kết mới phải được chủ sở hữu xác nhận trước khi xuất bản.

## Ảnh chân dung

Chuẩn bị bốn file WebP cùng tỷ lệ 4:5, khuyến nghị 1200 × 1500px hoặc lớn hơn, có quyền công bố và ánh sáng/phông nền/bố cục đồng nhất:

| File                    | Thành viên       | URL                                        |
| ----------------------- | ---------------- | ------------------------------------------ |
| `le-anh-tuan.webp`      | Lê Anh Tuấn      | `/images/leadership/le-anh-tuan.webp`      |
| `hoang-mai.webp`        | Hoàng Mai        | `/images/leadership/hoang-mai.webp`        |
| `do-mai-trang.webp`     | Đỗ Mai Trang     | `/images/leadership/do-mai-trang.webp`     |
| `huynh-ngo-cam-tu.webp` | Huỳnh Ngô Cẩm Tú | `/images/leadership/huynh-ngo-cam-tu.webp` |

Upload trực tiếp vào thư mục được giữ lại trong source `public/images/leadership/`. Hướng dẫn chi tiết nằm tại `public/images/leadership/README.md`. Thư mục này không bị publisher xóa. Pipeline tự nhận bốn tên file hợp lệ, đọc header/dimensions WebP và bổ sung metadata ảnh cho hồ sơ đã duyệt; không cần sửa JSON, import ảnh hoặc viết lại component.

Vite phục vụ static assets từ thư mục sinh `.public-build`, chỉ chứa tài nguyên công khai đã được allowlist và chân dung được phép xuất bản. README hướng dẫn và các file tùy ý trong `public/` không được đưa lên website. Cần build/deploy hoặc restart dev sau khi upload; static hosting không tự lấy file chưa được phát hành. Khi chưa có ảnh, fallback chữ viết tắt trên nền thương hiệu vẫn giữ tỷ lệ 4:5. Không dùng stock portrait, không dựng khuôn mặt AI, không yêu cầu import file ảnh chưa tồn tại. Cùng một component xử lý ảnh thật hoặc fallback; `object-position` điều chỉnh qua `photoFocalPoint` trong nguồn dữ liệu với x/y từ 0 đến 100.

Hiện chưa có ảnh chân dung thật. Test ảnh bằng fixture hình học không thể xác nhận crop khuôn mặt của từng người; việc này cần được kiểm tra lại sau khi chủ sở hữu upload ảnh thật.

## Kiểm thử và ảnh đối chiếu

Baseline trước thay đổi đã chụp trên production build c9b2eb5 tại preview local: Home và About ở 1440, 390 và 768px. About có một hồ sơ xác nhận pháp lý, chưa có ảnh; Home chưa có preview Leadership. Cả sáu lượt không tràn ngang. Kết quả và ảnh: `artifacts/leadership/before/`.

Kiểm thử bản mới đã chạy ngày 10/10/2026 trên build cuối không có ảnh fixture:

| Kiểm tra                                 | Kết quả                                                                                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                          | TypeScript, lint, 164 kiểm tra publication và build/prerender 18 trang đều đạt                                                                            |
| `npm run verify:ui`                      | 18 trang × 11 chiều rộng = 198 lượt; không overflow, không lỗi runtime, không vi phạm axe                                                                 |
| `node artifacts/qa-leadership-after.mjs` | Home, About, Leadership × 320, 360, 390, 430, 768, 1024, 1280, 1440, 1920, 2560px = 30 bố cục đạt                                                         |
| Nội dung hồ sơ                           | Đúng thứ tự, bốn tên/chức danh đầy đủ, nguyên văn bốn tiểu sử và 18 phạm vi trách nhiệm đã duyệt                                                          |
| LinkedIn                                 | Ba URL đúng nguyên văn, label truy cập, `_blank`, `noopener noreferrer`; CFO không có icon/link/sameAs                                                    |
| Fallback                                 | Tỷ lệ 4:5, đúng LAT/HM/ĐMT/HNCT, không tạo request ảnh chưa tồn tại; không tràn chữ hoặc thu nhỏ chức danh trong overview                                 |
| Accessibility                            | Axe WCAG 2 A/AA, 2.1 AA và 2.2 AA: không vi phạm trên ba trang; keyboard Tab, focus nhìn thấy, target profile/LinkedIn tối thiểu 44px                     |
| Anchor và reduced motion                 | Click thật từ About tới CBDO, anchor không nằm dưới sticky header; hover translation tắt khi reduced motion                                               |
| Prerender/SEO                            | 18 route có một h1, canonical, description/OG và nội dung tĩnh; ba trang tích hợp đọc đủ tên/chức danh khi JavaScript tắt                                 |
| Structured data                          | Bốn `Person` chỉ trên Leadership, tên/title/bio/URL đúng dữ liệu duyệt, `worksFor` liên kết Organization; không có ảnh placeholder hay thông tin suy diễn |

Roundtrip ảnh đã kiểm thử riêng bằng WebP hình học 1200 × 1500px, không chứa khuôn mặt. Upload tạm đúng tên `le-anh-tuan.webp` cho kết quả một ảnh và ba fallback trên About/Leadership ở 390, 768, 1440px. File nguồn giữ nguyên sau lần chạy `prepare-public` thứ hai; source, staging, dist và HTTP có byte giống hệt nhau. Trình duyệt giải mã đúng kích thước, giữ 4:5, `object-fit: cover`, `object-position: 50% 50%`, alt có tên, lazy/async và width/height thực.

Test response ảnh lỗi phát hiện trường hợp ảnh prerender lỗi trước hydration nên `onError` chưa được gắn. Đã bổ sung kiểm tra trạng thái ảnh khi mount, giữ handler cho lỗi xảy ra sau; chạy lại xác nhận About và Leadership thay ảnh lỗi bằng LAT và không để lại broken image. Fixture đã xóa khỏi source/staging/dist và projection trước build cuối. Chưa có ảnh chân dung thật để đánh giá crop khuôn mặt; không báo đã kiểm tra việc này.

Ảnh desktop/tablet/mobile ở 1440, 768 và 390px đã chụp và xem trực tiếp: chín ảnh toàn trang, chín crop section cho About, Home preview và hồ sơ đầu tiên. Crop section cao tạm ẩn sticky header/skip link trong trình duyệt để chrome không đè lên ảnh đối chiếu; không sửa CSS website. Ảnh toàn trang giữ giao diện đầy đủ.

- Đối chiếu: `artifacts/leadership/comparison.html`.
- Ảnh và kết quả 30 bố cục: `artifacts/leadership/after/`.
- Kết quả ảnh fixture: `artifacts/leadership/photo-fixture/results.json`.
- Baseline: `artifacts/leadership/before/`.

Thư mục `artifacts/` chỉ phục vụ đánh giá nội bộ, không xuất bản vào website. Không scrape LinkedIn hoặc kiểm tra danh tính qua tài khoản trùng tên. URL bên ngoài được đối chiếu với dữ liệu chủ sở hữu cung cấp; không coi trang đăng nhập/chặn truy cập của LinkedIn là link hỏng.

## Tài nguyên còn cần bổ sung

Bốn tiểu sử và phạm vi trách nhiệm đã được duyệt, không còn chờ phê duyệt nội dung này. Chủ sở hữu có thể upload bốn chân dung thật đúng tên, có quyền công bố, rồi build/deploy lại. LinkedIn của Đỗ Mai Trang, website cá nhân, học vấn, thành tích và lĩnh vực chuyên môn chi tiết là tùy chọn; hiện không có dữ liệu và không hiển thị placeholder. Sau khi có ảnh thật, cần xem lại crop chủ thể trên desktop/mobile và điều chỉnh focal point nếu cần.
