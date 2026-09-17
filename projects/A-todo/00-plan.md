# A-todo — 00-plan.md

- Vai: PM
- Trạng thái: Bản nháp chờ CEO duyệt
- Ngày: 2026-09-17

---

## 1. Mục tiêu MVP

Web quản lý việc cá nhân, chạy local, một người dùng, không đăng nhập.

Phạm vi được làm (đúng brief, không hơn):

| # | Năng lực | Mô tả ngắn |
|---|---|---|
| F1 | Thêm việc | Nhập tiêu đề, tạo việc mới |
| F2 | Sửa việc | Sửa tiêu đề việc đã có |
| F3 | Xóa việc | Xóa một việc |
| F4 | Đánh dấu xong | Bật/tắt trạng thái hoàn thành |
| F5 | Lọc | All / Active / Done |

Tiêu chí hoàn thành MVP:
- 5 năng lực trên chạy được trên máy local bằng một lệnh khởi động.
- Mỗi năng lực có story + AC được QA xác nhận.
- Không có tính năng nào ngoài danh sách trên.

## 2. CẤM làm trong MVP

Các mục sau **không** nằm trong scope. Agent nào tự thêm là vi phạm RULE 1.

- Đăng nhập, đăng ký, tài khoản, phân quyền, multi-user.
- Đồng bộ cloud, backend server riêng, database ngoài, API công khai.
- Hạn chót (due date), nhắc nhở, thông báo, lịch.
- Nhãn/tag, độ ưu tiên, sắp xếp thủ công, kéo-thả.
- Dự án con, thư mục, danh sách nhiều bảng.
- Tìm kiếm, phân trang, undo/redo, lưu lịch sử thay đổi.
- Import/export, chia sẻ, in ấn.
- Mobile app, PWA, offline-sync nâng cao.
- Dark mode, đa ngôn ngữ, tùy biến giao diện.
- Analytics, tracking, tối ưu hiệu năng quy mô lớn.
- Deploy production, CI/CD phức tạp (DevOps chỉ lo chạy local + script build cơ bản).

## 3. GIẢ ĐỊNH

Các giả định này được dùng để không chặn tiến độ. Nếu CEO không phản hồi trước mốc M1, coi như đã duyệt.

- GD1: Dữ liệu lưu ngay trên máy người dùng (trình duyệt), không cần server lưu trữ.
- GD2: Mất dữ liệu khi xóa dữ liệu trình duyệt là chấp nhận được ở MVP.
- GD3: Một việc chỉ gồm: id, tiêu đề, trạng thái xong/chưa, thời điểm tạo.
- GD4: Tiêu đề là bắt buộc, không rỗng, tối đa 200 ký tự.
- GD5: Không cho phép xóa hàng loạt; xóa từng việc một.
- GD6: Xóa không cần xác nhận hai bước (giữ MVP gọn) — QA kiểm lại ở M3.
- GD7: Bộ lọc mặc định là All khi mở ứng dụng.
- GD8: Số việc thực tế dưới 200, không cần tối ưu hiệu năng.
- GD9: Chỉ hỗ trợ trình duyệt desktop hiện đại mới nhất (1 loại là đủ để nghiệm thu).
- GD10: Giao diện tiếng Việt, một ngôn ngữ duy nhất.
- GD11: Chạy local nghĩa là: clone → cài → 1 lệnh chạy → mở trình duyệt.

## 4. Câu hỏi chặn tiến độ (tối đa 8)

Chỉ những câu thật sự chặn. Mỗi câu có phương án mặc định nếu CEO im lặng.

| # | Câu hỏi | Chặn vai | Mặc định nếu không trả lời |
|---|---|---|---|
| Q1 | Dữ liệu mất khi đổi máy/trình duyệt có chấp nhận được không? | Architect | Chấp nhận (theo GD1, GD2) |
| Q2 | Sửa việc thực hiện tại chỗ trong danh sách hay mở form riêng? | UX | Sửa tại chỗ trong danh sách |
| Q3 | Việc đã xong có còn sửa/xóa được không? | BA | Có, vẫn sửa và xóa được |
| Q4 | Xóa việc có cần hộp thoại xác nhận không? | UX | Không cần |
| Q5 | Bộ lọc có cần giữ nguyên khi tải lại trang không? | BA | Không cần, luôn quay về All |
| Q6 | "Chạy local" có bắt buộc kèm Docker không? | DevOps | Không, chỉ cần chạy trực tiếp |
| Q7 | Ai là người nghiệm thu cuối và tiêu chí pass là gì? | QA | CEO nghiệm thu, pass khi 100% AC đạt |
| Q8 | Deadline mong muốn cho MVP? | PM | 4 mốc như Mục 5, không ràng buộc ngày cụ thể |

## 5. Roadmap 4 mốc

| Mốc | Tên | Vai chính | Đầu ra bắt buộc (file) | Điều kiện qua mốc |
|---|---|---|---|---|
| M1 | Chốt yêu cầu | BA | `01-stories.md` | Tối đa 8 story, mỗi story có AC rõ ràng, CEO không phản đối |
| M2 | Chốt thiết kế | Architect + UX | `02-architecture.md`, `03-ux.md` | Kiến trúc và luồng màn hình phủ hết 8 story, không phát sinh tính năng mới |
| M3 | Xây và kiểm thử | Dev → QA | `04-dev-notes.md`, `05-test-plan.md`, `06-test-report.md` | Mọi AC được kiểm, lỗi chặn = 0 |
| M4 | Chạy local | DevOps | `07-runbook.md` | Người mới clone và chạy được theo runbook, không cần hỏi thêm |

Ràng buộc RULE 3: **không dòng code nào được viết trước khi M1 hoàn tất.**

## 6. Vai tiếp theo phải tạo file gì

Vai kế tiếp theo RULE 2 là **BA**.

BA phải tạo: `projects/A-todo/01-stories.md`

Nội dung bắt buộc của file đó:
1. Tối đa 8 user story, phủ đúng F1–F5, không thêm gì khác.
2. Mỗi story gồm: ID, mô tả theo mẫu "Là người dùng, tôi muốn... để...", Acceptance Criteria dạng Given/When/Then, và ghi chú trường hợp lỗi.
3. Bảng truy vết story ↔ F1–F5.
4. Danh sách những gì story **không** bao gồm (tham chiếu Mục 2).
5. Ghi rõ giả định nào trong Mục 3 mà story dựa vào.
6. Nếu BA thấy cần một tính năng ngoài Mục 1: **không tự thêm**, ghi vào mục "Đề xuất chờ CEO" ở cuối file.

Sau BA: Architect + UX (M2). Dev chỉ bắt đầu khi `01-stories.md` đã có AC đầy đủ.
CEO REVIEW: APPROVED