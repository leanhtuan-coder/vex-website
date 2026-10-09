# Visual redesign — 09/10/2026

## Audit và hướng thiết kế

Audit source, Brand Guidelines và ảnh trình duyệt cho thấy navigation/footer 12–13px, nhiều caption R&D 11px và paragraph/card 13–14px gây khó đọc. Home dùng visual giống sơ đồ dashboard; nhiều trang lặp hero mint, card đều nhau và CTA mint. Các trạng thái chưa công bố chiếm khoảng trắng lớn dù chưa có dữ liệu. Đây là các vấn đề được sửa; routing, HTML tĩnh, menu Kumo, TOC, disclosure và luồng soạn email đang hoạt động được giữ.

Hướng thiết kế: Premium Technology Corporate, bố cục editorial và hình học kỹ thuật. Nền trắng/trung tính chiếm phần lớn, dark cyan tạo điểm nhấn, mint dùng cho pixel/nodes. SVG thương hiệu mới dùng grid, đường kết nối và mũi tên; logo chính thức không chỉnh đường nét, màu hoặc tỷ lệ. Không thêm thư viện hoặc ảnh stock.

## Hệ thống chung

| Thành phần        | Quy tắc                                                      |
| ----------------- | ------------------------------------------------------------ |
| Container         | Tối đa 1248px; lề desktop 32px, mobile 20px                  |
| Section           | 100px desktop, 64px mobile; CTA có nhịp riêng                |
| Typeface          | SVN-Aguda Regular 400 cho nội dung, Black 900 cho heading    |
| Display Home      | 48–64px desktop theo viewport; 34–40px mobile                |
| H1 trang con      | 40–60px desktop; 34–42px mobile                              |
| Body              | 16–17px, line-height 1.75–1.85, giới hạn chiều dài dòng      |
| Navigation/footer | 14px; thông tin liên hệ và nội dung chính 16–17px            |
| CTA               | Kumo base 36px; một số hành động 40px; mobile tối thiểu 44px |
| Interaction       | Hover 160ms, focus rõ; reduced motion, nội dung hiện ngay    |

Dark cyan `#00707E` khớp mã in trong guideline. Mint `#67C08B` lấy từ swatch vector vì nhãn HEX/RGB mint trong PDF bị lặp cyan. Bảng màu công khai ghi rõ sự khác biệt này. Không tự suy diễn công thức khoảng cách an toàn hoặc kích thước logo tối thiểu từ hình minh họa chưa rõ. Logo SVG gốc dùng trong header/footer/preview; cả bốn download và favicon toàn bộ logo được giữ nguyên.

Kumo tiếp tục cung cấp Text, Link, Button/LinkButton, Badge, LayerCard, Empty, Dialog, DropdownMenu và các control form. SVG, cấu trúc editorial và CSS riêng phục vụ nhận diện. CSS trang có trong entry ban đầu để HTML không JS vẫn có bố cục đầy đủ.

## Bố cục theo mục tiêu trang

- Home: hero bất đối xứng với hai CTA, visual kết nối trên cyan; capabilities bento; About và Tầm nhìn/Sứ mệnh editorial; dự án chưa công bố thu gọn; quy trình đánh số và CTA cuối nổi bật.
- Media: hero gọn, logo showcase tách preview/metadata/download; palette copy HEX có thông báo thành công/lỗi; mẫu chữ Aguda; bốn nhóm hướng dẫn; ghi chú liên hệ thay placeholder ảnh/video lớn.
- About/Leadership: câu chuyện có logo nguyên bản, hai hàng Tầm nhìn/Sứ mệnh đầy đủ, năm giá trị đánh số, hồ sơ Lê Anh Tuấn chỉ dùng thông tin đã xác nhận.
- Solutions: danh mục sticky và năm khối editorial, khối đầu cyan; chi tiết giữ TOC và nội dung, có chỉ mục section.
- Research/Academy: rail đánh số, sơ đồ kỹ thuật với phân cấp rõ, timeline và panel học tập; Academy vẫn ở trạng thái chuẩn bị.
- Insights/Careers/Projects: trạng thái chưa công bố gọn; chuyên môn thành hàng; template tương lai chỉ dùng dữ liệu và ảnh thật qua publisher hiện có.
- Contact: kênh liên hệ chia bằng đường ngang, form trắng trên nền trung tính, chữ và control dễ đọc; giữ disclosure soạn email.
- Footer: logo trắng đầy đủ, liên hệ, hai nhóm navigation và thông tin pháp nhân; không có liên kết Sitemap.

## Bảo toàn nội dung và vận hành

Không sửa dữ liệu công ty, nội dung Tầm nhìn/Sứ mệnh/giá trị, trạng thái draft, cổng phê duyệt nội dung hoặc metadata/route. Không thêm dự án, bài viết, tuyển dụng, ảnh đội ngũ hoặc thành tích mẫu. Tracking tiếp tục tắt; form chỉ soạn email và chưa nhận dữ liệu tự động. Không thay DNS, chứng chỉ hoặc cấu hình hosting.

Kết quả kiểm tra bản ghép và Lighthouse được ghi trong [QA.md](QA.md). Ảnh và báo cáo máy nằm trong `artifacts/`, không phục vụ trên website.
