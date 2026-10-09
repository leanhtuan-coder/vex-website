# Checklist phát hành VEX

Cập nhật 09/10/2026. Bản ghép corporate enhancement đã đạt kiểm tra local và sẵn sàng phát hành. Phần baseline được giữ để phân biệt bằng chứng trước/sau enhancement; Git, CI, deploy và kiểm tra domain của lần phát hành mới vẫn chờ xác nhận.

## Baseline đã kiểm tra

- [x] `npm run check` đạt: publisher, TypeScript strict, ESLint và production build của bản redesign.
- [x] `npm run verify:ui` đạt 187 lượt layout: 17 route × 11 chiều rộng từ 320 đến 2560px.
- [x] Báo cáo `artifacts/qa-results.json` ghi không có lỗi JavaScript/console và không có violation trong các lượt axe đã quét.
- [x] HTML không JavaScript có nội dung, metadata riêng, canonical/OG/Twitter và các liên kết route đã đối chiếu sitemap.
- [x] Menu desktop/mobile: mở, đóng, Escape, trả focus và focus trap.
- [x] Copy hai mã HEX vào clipboard thật; trường hợp bị từ chối báo lỗi trung thực.
- [x] Bốn download logo đúng tên và toàn bộ bytes khớp file nguồn.
- [x] Reduced motion giữ hero hiện ngay, không có animation nội dung/trang trí đang chạy.
- [x] Contact kiểm tra validation, consent, topic, soạn email; không gửi/nhận email thật, không báo đã tiếp nhận.
- [x] Analytics giữ tắt, không có request bên thứ ba trong lượt UI.

Axe tự động không phải chứng nhận tuân thủ WCAG toàn bộ. Kết quả Lighthouse cũ không chứng minh Core Web Vitals production của bản enhancement; chưa có dữ liệu người dùng thật để xác nhận p75 LCP/INP.

## Nội dung và quyền công bố

- [x] Giữ thông tin pháp nhân và các kênh liên hệ đã đối chiếu trong `company.ts`.
- [x] Chủ website đã duyệt Why VEX dưới dạng định hướng; không chuyển thành tuyên bố thành tích đã kiểm chứng.
- [x] Vision/Mission/Core Values vẫn là bản thảo đã được yêu cầu hiển thị trước đó; giữ nhãn và trạng thái DRAFT.
- [x] Chủ website xác nhận chưa có hồ sơ lãnh đạo mở rộng, thông điệp founder/CEO, PDF public hoặc mạng xã hội để bổ sung.
- [x] Đối chiếu Why VEX, Journey, FAQ và sáu nhóm nhu cầu trên bản ghép với nội dung đã đủ cơ sở; Journey chỉ dùng mốc thật.
- [x] Source có cổng VERIFIED + quyền công bố cho leadership/case study/tài liệu; UI download điều kiện khi có file public, không tạo file mẫu.
- [x] Kiểm tra bài viết/việc/case/profile/document chưa duyệt không vào bundle, HTML, sitemap hoặc JSON-LD.
- [ ] Nếu thêm nội dung thật: xác nhận tác giả/ngày, nguồn gốc dự án, quyền dùng ảnh/tên và bằng chứng kết quả; không gộp dự án cá nhân thành thành tích VEX.
- [ ] Nếu có PDF public: tải file thật, đúng tên, dung lượng, phiên bản và quyền công bố; không xuất bản PDF nội bộ từ workspace.

Hai bước có điều kiện về nội dung mới và PDF chưa áp dụng: hiện không có bài/việc/case hoặc PDF public để công bố. Chúng không chặn phát hành bản hiện tại và phải được kiểm tra khi có dữ liệu thật.

- [x] Kiểm tra FAQ không tự hứa giá, thời gian, bảo hành, SLA hoặc hỗ trợ không giới hạn.

## Bản ghép corporate enhancement

- [x] `npm run check` trên toàn bộ source enhancement đạt.
- [x] `npm audit --audit-level=high` đạt tại thời điểm phát hành.
- [x] `npm run verify:ui` trên dist enhancement đạt; xem rõ kết quả thay vì chỉ nhìn exit code.
- [x] QA tập trung tương tác FAQ, chọn nhu cầu → Contact và các trạng thái nội dung mới đạt.
- [x] Rà ảnh desktop/tablet/mobile: 360, 390, 430, 768, 1024, 1280, 1440, 1920px; không overflow, nội dung mất, chữ/nút khó đọc.
- [x] Kumo, font/màu VEX, logo đầy đủ, clear space, focus và reduced motion vẫn đúng; không thêm hiệu ứng vào logo.
- [x] No-JS và metadata của route bị thay đổi giữ đầy đủ; ảnh/anchor/download không lỗi.
- [x] `scripts/verify-content.mjs` đạt 106 kiểm tra; fixture tổng hợp chỉ tồn tại trong bộ nhớ, không được lưu hay công bố. Lệnh này đã nằm trong npm run check/CI.
- [x] Kiểm tra `dist/` chỉ chứa tài nguyên public được allowlist; không có source map, source TypeScript, secrets hoặc tài liệu nhạy cảm.
- [x] Đo hiệu suất phù hợp với trang/component vừa thay đổi; ghi máy/môi trường/giới hạn, không gọi điểm lab là Core Web Vitals người dùng thật.

Kết quả local cuối: check gồm 106 publication checks đạt; 187 layout/functional checks đạt; sáu nhóm nhu cầu mở ở 390/1440px được quét axe, không violation. Lighthouse sáu lượt đạt Performance 94–100, Accessibility/Best Practices/SEO 100; xem số liệu và điều kiện lab ở [docs/QA.md](docs/QA.md). Không có fixture, PDF nội bộ, source TypeScript, source map hay font OTF nguồn trong dist.

## Liên hệ, dữ liệu và tính minh bạch

- [x] Hiện tại giữ mailto theo xác nhận; API/CRM chưa triển khai.
- [x] Tracking tiếp tục tắt theo xác nhận; không cần yêu cầu lại cấu hình provider cho lần phát hành này.
- [x] Bản ghép vẫn yêu cầu consent trước soạn email, giải thích phải tự nhấn gửi trong ứng dụng email và không thông báo VEX đã nhận.
- [x] Không ghi form/CV vào localStorage, log hoặc analytics; URL query không trở thành thông tin doanh nghiệp hoặc dữ liệu tracking.
- [x] Privacy và Terms mô tả đúng xử lý thực tế; không tự thêm badge ISO/SOC 2 hoặc claim bảo mật do nhà cung cấp hạ tầng.

Nếu sau này quyết định đổi sang API: xác nhận endpoint, phản hồi tiếp nhận thật, chống spam/rate limit server, kênh thông báo, người xử lý, quyền truy cập, thời hạn lưu, consent/privacy và tracking thành công thực tế trước khi bật. Các bước này là điều kiện cho thay đổi xử lý dữ liệu, không phải lỗi của luồng soạn email đã chọn.

## Git, triển khai và kiểm tra domain

- [ ] Review diff cuối, xác nhận không thay dữ liệu pháp lý/quyền công bố ngoài phạm vi đã duyệt.
- [ ] Commit/push và CI của commit cuối đạt.
- [ ] Workflow Pages trên `main` deploy đúng artifact `dist/` và báo thành công.
- [ ] Kiểm tra trên domain thật: URL public trả 200 và đủ nội dung mới; URL không tồn tại trả 404/noindex.
- [ ] Kiểm tra navigation, FAQ, topic liên hệ, clipboard và download trên bản đã phát hành.
- [ ] Kiểm tra canonical/OG/sitemap/favicon full logo và phản hồi CSS/JS/ảnh/font.
- [ ] Ghi HTTPS, redirect và response headers thực tế của lần phát hành. Không coi `_headers` là đã áp dụng trên GitHub Pages.
- [ ] Ghi commit/deploy URL và kết quả sau phát hành trong tài liệu QA; giữ commit/artifact trước để rollback.

HTTPS đã hoạt động ở lần kiểm tra production trước, trong khi HTTP vẫn có thể trả 200 và `enforce_https` chưa bật. Đợt enhancement giữ nguyên DNS, chứng chỉ và cấu hình SSL/redirect theo phạm vi đã thống nhất. Việc còn chờ kiểm tra bản phát hành mới không phải đề nghị tự đổi cấu hình hosting.

Nội dung NOT_AVAILABLE có thể tiếp tục chưa công bố mà website vẫn phát hành trung thực. Cần chặn phát hành nếu có dữ liệu giả, file/link giả, báo tiếp nhận sai, mất nội dung đã duyệt hoặc lỗi kỹ thuật thực tế.
