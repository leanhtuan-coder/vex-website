# VEX Visual Elements — pilot 09/10/2026

Vòng này triển khai đúng ba section đại diện trên Home: Hero, bốn lĩnh vực công nghệ và R&D. Đề xuất cho từng trang, dependency và giấy phép của chín nguồn ở [VISUAL-SOURCES.md](VISUAL-SOURCES.md). Các visual mới được vẽ riêng bằng JSX/SVG/CSS; không lấy code, pattern, ảnh hoặc template từ catalog bên ngoài và không thêm package.

## Ngôn ngữ hình ảnh

Pixel vuông, mặt phẳng so le, mũi tên hướng tiến và đường kết nối tạo thành một bộ hình học thống nhất. Chiều sâu đến từ offset, mặt trước/mặt cạnh và stroke; không dùng blur, WebGL, canvas, texture hoặc hiệu ứng ánh sáng lớn. Cyan/mint dùng token VEX hiện hữu; giữ logo, favicon, font và file tải nguyên bản. Hình minh họa thể hiện lĩnh vực/định hướng, không phải ảnh sản phẩm, sơ đồ triển khai thực tế hoặc bằng chứng năng lực.

| Section    | Trước                                | Bản thử                                                                                  |
| ---------- | ------------------------------------ | ---------------------------------------------------------------------------------------- |
| Hero       | Hai chevron phẳng trên grid          | Precision stack ba lớp, inset cyan, cạnh mint và rail; giữ footprint/CTA/caption         |
| Software   | Sơ đồ nét đơn, card lớn kéo hai hàng | Các mặt module so le, liên kết dữ liệu; điểm nhấn cyan trong bento hai hàng              |
| AI         | Icon và mô tả                        | Khung nhận diện, bounding region và điểm đặc trưng; không có confidence hoặc kết quả giả |
| Robotics   | Icon và mô tả                        | Cơ cấu khớp/cánh tay, module thiết bị và tuyến kết nối hình học                          |
| Automation | Icon và mô tả, một hàng ngang        | Luồng rẽ nhánh/hợp nhất, module tác vụ và mũi tên riêng                                  |
| R&D        | Hai cột chữ trên cyan                | Nội dung/CTA bên trái, hai mặt kỹ thuật cùng đường nối/pixel bên phải; mobile xếp dọc    |

## Cấu trúc tái sử dụng

- `src/components/visuals/VexPrimitives.tsx`: grid với ID riêng, crosshair, pixel/node và divider có bước mũi tên.
- `src/components/visuals/TechnologyIllustration.tsx`: bốn scene typed cho Software/AI/Robotics/Automation, dùng chung registration/rail/stroke.
- `src/components/visuals/ResearchVisual.tsx`: mặt phẳng và tuyến nghiên cứu dùng lại các primitive.
- `src/components/TechnologyVisual.tsx`: Hero signature ba lớp.
- `src/styles-visual-elements.css`, `src/styles-visual-hero.css`: pattern, surface, stroke, responsive và motion. CSS được import sau nền chung để HTML prerender không JavaScript cũng hiển thị đủ.

Chỉ Home nhận class `vex-visual-pilot`. Bộ kit có thể tái sử dụng, nhưng vòng này không áp visual hàng loạt lên Solutions, About, Media, Contact hoặc trang pháp lý. Button, Link, Text, LayerCard và các control tiếp tục dùng Kumo; Phosphor giữ vai trò icon thao tác.

## Chuyển động và accessibility

Hero có một nhịp tín hiệu 680ms, một iteration, chỉ trên desktop >=801px với hover/fine pointer và không bật reduced motion. Sau nhịp này không có vòng lặp; hover chỉ dịch mặt trước 2px/-3px trong 220ms. Scene công nghệ nâng 3px khi hover/focus-within trên desktop. R&D và divider tĩnh.

Mobile và reduced motion giữ visual tĩnh. Nội dung/CTA hiện sẵn trong HTML, không chờ animation; không truy cập window trong render, random, scroll handler hoặc requestAnimationFrame. ID pattern từ React useId giữ ổn định qua SSR/hydration. SVG trang trí aria-hidden và không nhận focus; nhãn, liên kết và nội dung nằm trong HTML. Không dùng chữ trắng nhỏ trên mint hoặc biến phần trang trí thành control giả.

## Kiểm tra bản thử

`npm run check` đạt: TypeScript, ESLint, 106 publication checks và build 17 trang/404. `npm run verify:ui` đạt 187 lượt layout cùng kiểm tra no-JS, menu, form, metadata, link/404, FAQ, clipboard và download hiện có.

QA riêng cho visual đạt 11 viewport từ 320 đến 2560px; axe ở 390/768/1440px không có violation. Không overflow, lỗi JavaScript/console, request bên thứ ba hoặc trùng ID SVG. Font Aguda tải đúng; mobile CTA có focus rõ và chiều cao 44px. No-JS vẫn có hai CTA Hero/bốn lĩnh vực; reduced motion không có animation hoặc transform hover. Nhịp Hero kết thúc sau 680ms, không chạy tiếp khi cuộn khỏi visual.

Đã xem ảnh Hero/Technology/R&D tại desktop 1440, mobile 390 và tablet 768. Hero mobile giữ chiều cao khoảng 1172px. Toàn trang mobile tăng khoảng 763px do ba scene công nghệ mới và visual R&D; bản desktop không có khoảng trắng bất thường. Main JS tăng 8.4KB và CSS tăng 5.2KB trước gzip; không xem số byte nhỏ là bằng chứng thay cho phép đo hiệu năng.

Ảnh BEFORE thuộc source 0bdc1f5; AFTER thuộc pilot này. Bản đối chiếu tương tác ở `artifacts/visual-elements/comparison.html`, cho chọn section/viewport và xem hai ảnh thật cạnh nhau. Báo cáo/ảnh ở `artifacts/visual-elements/before/` và `artifacts/visual-elements/after/`. Artifact QA không được phục vụ trên website.

Lighthouse 13.5.0 đo đúng production dist trên localhost:4173 bằng Node 24/Chromium, khi các browser QA khác đã đóng. Mobile dùng mô phỏng mặc định, desktop 1440×900/CPU 1×/RTT 40ms/throughput 10240Kbps. Đây là dữ liệu lab; không xác nhận Core Web Vitals p75 hoặc INP của người dùng thật.

| Lượt đo      | Performance | Accessibility | Best Practices | SEO |  LCP |  TBT |   CLS |
| ------------ | ----------: | ------------: | -------------: | --: | ---: | ---: | ----: |
| Home mobile  |          94 |           100 |            100 | 100 | 2,5s | 10ms |     0 |
| Home desktop |         100 |           100 |            100 | 100 | 0,5s |  0ms | 0,003 |

Baseline phase trước đạt Home mobile 95/desktop 100. Lần này mobile 94; không tuyên bố hiệu năng tăng sau khi thêm visual hoặc đo lại chỉ để tìm điểm cao hơn. Báo cáo JSON/HTML ở `artifacts/visual-elements/lighthouse-home-*`, summary ở `artifacts/visual-elements/performance-summary.json`. Vite vẫn cảnh báo main chunk >500KB; phần lớn payload đã có trước pilot, nhưng chi phí SVG/CSS bổ sung được ghi rõ.

Toàn văn notice của các thư viện UI được chọn nằm trong `THIRD_PARTY_UI_NOTICES.txt` và được copy theo allowlist vào public/dist. Đây là notice cho sáu dependency được nêu, không phải danh mục audit toàn bộ dependency tree. Visual mới không chứa tài nguyên lấy từ catalog ngoài.

## Đầu vào cho vòng tiếp theo

Bộ visual thử nghiệm đã đủ dữ liệu và không cần mua Pro. Trước khi mở rộng toàn site, đánh giá hướng hình học/mức độ trang trí trong ba section này theo yêu cầu thử nghiệm. Ảnh robot, thiết bị, sản phẩm, màn hình ứng dụng hoặc case study thực tế chỉ thêm khi có file/demo và quyền công bố thật; danh sách ở [CONTENT_REQUIREMENTS.md](../CONTENT_REQUIREMENTS.md). Không tạo ảnh sản phẩm, profile hoặc tài liệu thay thế dữ liệu chưa có.
