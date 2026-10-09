# Vận hành và triển khai

## Local và artifact

Khuyến nghị Node.js 24, tối thiểu 22.19. Máy ban đầu dùng 22.11 vẫn build được nhưng một số dev tools cảnh báo engine; bàn giao kiểm tra thêm trên Node 24. Không đổi Node hệ thống.

Chạy `npm ci`, `npm run check`, `npm run preview`; trong terminal khác chạy `npm run verify:ui` và `npm run measure:performance`. Preview localhost:4173 strictPort. Nếu cổng bận, dừng đúng preview cũ rồi khởi động lại, không dừng hàng loạt process Node.

Chỉ phát hành nội dung `dist/`, giữ assets, route directories và 404.html. Đường dẫn tuyệt đối `/` dùng cho domain riêng `vex.biz.vn`; nếu dùng subpath cần sửa base/canonical và kiểm tra lại. Không phát hành index.html nguồn hoặc repo gốc.

## GitHub Pages

GitHub Pages dùng GitHub Actions tại repo `leanhtuan-coder/vex-website`, domain `vex.biz.vn`. Workflow `.github/workflows/deploy-pages.yml` tự chạy khi push lên `main`; cũng có thể chạy thủ công trên `main`. Environment `github-pages` chỉ cho phép deploy từ nhánh `main`.

Workflow build bằng Node 24, chạy publisher/typecheck/lint/build, audit dependency và kiểm tra toàn bộ route trong sitemap × 11 kích thước (hiện 187 lượt) cùng accessibility/menu/form trước khi upload `dist/` và deploy. Nếu kiểm tra lỗi, bản web đang hoạt động tiếp tục được giữ. Các nhánh khác không deploy. Xem [hướng dẫn GitHub chính thức](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Workflow `Website checks` kiểm tra source/UI và lưu artifact `vex-website-dist`, không deploy. Workflow `Publish VEX website` phát hành artifact `github-pages`, lưu `deployment-qa` để kiểm tra. Repo gốc có import TypeScript nên không phải artifact phát hành. DNS, nameserver và cấu hình chứng chỉ không cần đổi để cập nhật nội dung.

## Hosting static khác và 404

Upload dist vào document root/origin được xác nhận. Mỗi route dùng index.html trong thư mục; redirect URL không slash về canonical nếu host hỗ trợ. URL không có file phải phục vụ 404.html với HTTP 404, không rewrite tất cả về Home. Preview Vite có SPA fallback 200 cho URL lạ; đó không chứng minh HTTP 404 production.

## HTTPS và headers

`dist/_headers` là mẫu cho host hỗ trợ. GitHub Pages không tự đọc file này; với Pages cần áp dụng tại proxy/hạ tầng thích hợp sau khi được phép. Không coi việc có file là đã bật header production.

CSP dùng `default-src 'self'`, `script-src 'self'`, chặn object/framing; font, ảnh và mã chạy local. `style-src 'unsafe-inline'` phục vụ style động Kumo/Base UI. Nosniff, Referrer-Policy và Permissions-Policy có trong mẫu. UI checks mô phỏng header trên HTML; thêm provider/analytics/API cần cập nhật CSP và chạy lại kiểm tra.

HTTPS, redirect và chứng chỉ phải kiểm tra trên origin/Cloudflare thật; chưa thay đổi trong đợt này. Không bật HSTS trước khi xác nhận HTTPS/subdomain.

## Cache, sau phát hành và rollback

Host có cấu hình cache có thể dùng `public, max-age=31536000, immutable` cho tài nguyên tên hash; HTML/sitemap/robots/tài nguyên tên cố định nên revalidate. Không tự áp dụng rule Cloudflare.

Sau deploy: kiểm tra toàn bộ 17 trang hiện tại, menu desktop/mobile, download media, topic liên hệ/mailto, canonical/OG/sitemap, URL lạ/lồng sai trả 404, SSL/redirect/header bằng devtools hoặc curl. Mẫu chi tiết bài/việc/case chỉ có URL khi nội dung đã duyệt. Đo Lighthouse trên domain khi cần; chưa có RUM/analytics nên không tuyên bố LCP p75 hay INP người dùng đạt mục tiêu.

Giữ commit/artifact cũ; nếu phát hành lỗi, revert commit nội dung trên `main` rồi push để workflow kiểm tra và deploy lại. Kiểm tra URL và cache sau rollback; không thay DNS để rollback nội dung.

## Nội dung và dữ liệu

prepare-content kiểm tra nguồn biên tập và sinh JSON public trước bundle; ngày build mặc định theo giờ Việt Nam, có override VEX_CONTENT_DATE để tái lập. Nội dung lên lịch/hết hạn cần build-deploy đúng thời điểm; cấu hình hiện tại chạy khi push/main hoặc thủ công, chưa có job tự chạy theo ngày.

prepare-public tạo lại đúng thư mục public sinh tự động từ allowlist, cộng ảnh đã duyệt của nội dung được công bố. Vite tạo tên hash cho font. PDF nội bộ, brief, raw source biên tập, validator, source map và config dev không vào artifact; chỉ upload dist. Repo GitHub public không phải nơi lưu nội dung mật.

Form không gửi API hoặc ghi dữ liệu vào log/localStorage. Người dùng cần mail client và tự gửi; email đã gửi cần quy trình tiếp nhận/quản lý của công ty. Privacy mô tả hoạt động hiện tại và cần rà soát khi bổ sung xử lý mới. Người phụ trách có thể đối chiếu [Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15](https://vanban.chinhphu.vn/?docid=214590&pageid=27160); audit kỹ thuật không xác nhận tuân thủ pháp lý toàn bộ.

Analytics được chủ website chọn giữ tắt: mặc định không có provider script hoặc request bên ngoài. Không khai báo biến analytics trong workflow hiện tại. Xem ANALYTICS.md trước khi bật; website chưa tích hợp backend/CRM, portal hoặc CMS bên ngoài.
