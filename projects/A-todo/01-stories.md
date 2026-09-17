# A-todo — 01-stories.md

- Vai: BA
- Đầu vào: `00-plan.md` (PM)
- Trạng thái: Chờ CEO duyệt trước khi sang M2
- Ngày: 2026-09-17

Tổng số story: **7** (giới hạn cho phép: 8)

---

## 1. Quy ước

- Ưu tiên **P0**: không có thì MVP không chạy được. Bắt buộc hoàn thành ở M3.
- Ưu tiên **P1**: cần cho trải nghiệm tối thiểu, làm sau khi P0 xong.
- Mọi AC đều phải quan sát được bằng mắt hoặc đo được bằng thao tác. AC không đo được bị loại.
- "Việc" = một bản ghi gồm: id, tiêu đề, trạng thái (chưa xong / đã xong), thời điểm tạo (theo GD3).

---

## 2. User story

### US-01 — Xem danh sách việc
**Ưu tiên:** P0
**Mô tả:** Là người dùng, tôi muốn thấy toàn bộ việc của mình trong một danh sách để biết mình đang có gì phải làm.

> Ghi chú phạm vi: đây không phải tính năng mới. F1–F5 đều thao tác trên danh sách, nên danh sách là điều kiện tiên quyết. Không kèm sắp xếp thủ công, tìm kiếm, phân trang (Mục 2 của plan).

**AC:**
1. Khi mở ứng dụng, danh sách hiển thị tất cả việc đang lưu, mỗi việc trên một dòng.
2. Mỗi dòng hiển thị đúng 3 thành phần: ô đánh dấu trạng thái, tiêu đề, nút xóa.
3. Thứ tự hiển thị là theo thời điểm tạo, việc tạo mới nhất nằm trên cùng.
4. Việc đã xong hiển thị khác việc chưa xong (gạch ngang tiêu đề) và phân biệt được bằng mắt trong 1 lần nhìn.
5. Khi không có việc nào khớp bộ lọc hiện tại, hiển thị một dòng chữ trạng thái rỗng thay vì danh sách trắng.
6. Với 200 việc, danh sách hiển thị đầy đủ và cuộn được, không cắt bớt (giới hạn theo GD8).

---

### US-02 — Thêm việc
**Ưu tiên:** P0 · **Truy vết:** F1
**Mô tả:** Là người dùng, tôi muốn nhập tiêu đề và tạo một việc mới để ghi lại điều cần làm.

**AC:**
1. Màn hình có đúng 1 ô nhập tiêu đề và 1 nút "Thêm".
2. Nhập tiêu đề hợp lệ rồi bấm "Thêm" thì việc mới xuất hiện ở đầu danh sách trong cùng thao tác, không cần tải lại trang.
3. Nhấn phím Enter trong ô nhập cho kết quả giống hệt bấm nút "Thêm".
4. Sau khi thêm thành công, ô nhập được xóa trắng và con trỏ vẫn ở trong ô nhập.
5. Việc vừa tạo luôn có trạng thái "chưa xong".
6. Tiêu đề rỗng hoặc chỉ gồm khoảng trắng: nút "Thêm" không tạo việc nào, hiển thị thông báo "Tiêu đề không được để trống" (theo GD4).
7. Tiêu đề bị cắt khoảng trắng thừa ở đầu và cuối trước khi lưu.
8. Tiêu đề dài quá 200 ký tự: không tạo việc, hiển thị thông báo "Tiêu đề tối đa 200 ký tự" (theo GD4).
9. Cho phép hai việc trùng tiêu đề, không chặn, không cảnh báo.

---

### US-03 — Sửa tiêu đề việc
**Ưu tiên:** P0 · **Truy vết:** F2
**Mô tả:** Là người dùng, tôi muốn sửa tiêu đề một việc đã tạo để chỉnh lại khi viết sai hoặc thay đổi nội dung.

**AC:**
1. Bấm vào tiêu đề của một việc thì tiêu đề đó chuyển thành ô nhập sửa được ngay tại dòng đó (theo Q2 mặc định).
2. Ô nhập sửa hiển thị sẵn tiêu đề hiện tại và bôi chọn/đặt con trỏ sẵn để gõ ngay được.
3. Nhấn Enter hoặc click ra ngoài ô nhập thì lưu tiêu đề mới và hiển thị lại dạng thường.
4. Nhấn Esc thì hủy sửa, tiêu đề giữ nguyên giá trị trước khi sửa.
5. Lưu tiêu đề rỗng hoặc chỉ khoảng trắng: không lưu, giữ tiêu đề cũ, hiển thị thông báo "Tiêu đề không được để trống".
6. Lưu tiêu đề dài quá 200 ký tự: không lưu, giữ tiêu đề cũ, hiển thị thông báo "Tiêu đề tối đa 200 ký tự".
7. Sửa tiêu đề không làm thay đổi trạng thái xong/chưa xong và không thay đổi vị trí của việc trong danh sách.
8. Việc đã đánh dấu xong vẫn sửa được tiêu đề bình thường (theo Q3 mặc định).
9. Tại một thời điểm chỉ có tối đa 1 việc đang ở chế độ sửa.

---

### US-04 — Xóa việc
**Ưu tiên:** P0 · **Truy vết:** F3
**Mô tả:** Là người dùng, tôi muốn xóa một việc để danh sách chỉ còn những gì tôi quan tâm.

**AC:**
1. Mỗi dòng việc có đúng 1 nút xóa.
2. Bấm nút xóa thì việc đó biến mất khỏi danh sách ngay, không cần tải lại trang.
3. Không có hộp thoại xác nhận (theo Q4 mặc định).
4. Không có chức năng hoàn tác sau khi xóa.
5. Xóa một việc không ảnh hưởng tới bất kỳ việc nào khác.
6. Xóa việc cuối cùng thì danh sách chuyển sang hiển thị trạng thái rỗng (AC5 của US-01).
7. Việc đã xong và việc chưa xong đều xóa được như nhau (theo Q3 mặc định).
8. Chỉ xóa được từng việc một, không có nút xóa hàng loạt (theo GD5).

---

### US-05 — Đánh dấu việc đã xong / chưa xong
**Ưu tiên:** P0 · **Truy vết:** F4
**Mô tả:** Là người dùng, tôi muốn đánh dấu một việc là đã xong, và bỏ đánh dấu khi cần, để theo dõi tiến độ.

**AC:**
1. Mỗi dòng việc có đúng 1 ô đánh dấu trạng thái.
2. Bấm vào ô đánh dấu của một việc chưa xong thì việc chuyển sang "đã xong" ngay, tiêu đề được gạch ngang.
3. Bấm lại vào ô đánh dấu của một việc đã xong thì việc quay về "chưa xong", tiêu đề hết gạch ngang.
4. Đổi trạng thái không làm thay đổi tiêu đề và không thay đổi vị trí của việc trong danh sách.
5. Khi đang ở bộ lọc Active và đánh dấu xong một việc, việc đó biến mất khỏi danh sách hiện thấy.
6. Khi đang ở bộ lọc Done và bỏ đánh dấu một việc, việc đó biến mất khỏi danh sách hiện thấy.
7. Trạng thái mới được lưu lại và vẫn đúng sau khi tải lại trang (phụ thuộc US-07).

---

### US-06 — Lọc All / Active / Done
**Ưu tiên:** P0 · **Truy vết:** F5
**Mô tả:** Là người dùng, tôi muốn lọc danh sách theo tất cả / chưa xong / đã xong để tập trung vào nhóm việc mình cần.

**AC:**
1. Màn hình có đúng 3 lựa chọn lọc: All, Active, Done. Không có lựa chọn thứ tư.
2. Khi mở ứng dụng, bộ lọc đang chọn là All (theo GD7).
3. Chọn All: hiển thị toàn bộ việc.
4. Chọn Active: chỉ hiển thị việc có trạng thái "chưa xong".
5. Chọn Done: chỉ hiển thị việc có trạng thái "đã xong".
6. Lựa chọn đang được chọn hiển thị khác hai lựa chọn còn lại, phân biệt được bằng mắt.
7. Đổi bộ lọc chỉ thay đổi những gì hiển thị, không tạo, không sửa, không xóa việc nào.
8. Thêm việc mới khi đang ở bộ lọc Done: việc mới được lưu nhưng không hiển thị cho tới khi chuyển sang All hoặc Active.
9. Sau khi tải lại trang, bộ lọc quay về All (theo Q5 mặc định).

---

### US-07 — Giữ dữ liệu sau khi tải lại trang
**Ưu tiên:** P0 · **Truy vết:** nền tảng cho F1–F5 (theo GD1, GD2)
**Mô tả:** Là người dùng, tôi muốn danh sách việc của mình còn nguyên sau khi đóng và mở lại trang để không phải nhập lại từ đầu.

**AC:**
1. Sau khi thêm, sửa, xóa hoặc đổi trạng thái một việc, dữ liệu được lưu lại ngay trên máy người dùng.
2. Tải lại trang: danh sách hiển thị đúng số lượng việc, đúng tiêu đề, đúng trạng thái như trước khi tải lại.
3. Đóng hẳn trình duyệt rồi mở lại ứng dụng: kết quả giống AC2.
4. Lần mở đầu tiên khi chưa có dữ liệu: ứng dụng hiển thị trạng thái rỗng, không báo lỗi.
5. Dữ liệu không được gửi ra bất kỳ máy chủ nào.
6. Khi người dùng xóa dữ liệu trình duyệt, ứng dụng quay về trạng thái rỗng và vẫn dùng được bình thường (chấp nhận mất dữ liệu theo GD2).

---

## 3. Bảng truy vết

| Năng lực (plan) | Story phủ |
|---|---|
| F1 Thêm việc | US-02 |
| F2 Sửa việc | US-03 |
| F3 Xóa việc | US-04 |
| F4 Đánh dấu xong | US-05 |
| F5 Lọc All/Active/Done | US-06 |
| Nền tảng hiển thị | US-01 |
| Nền tảng lưu trữ (GD1) | US-07 |

Không có năng lực nào trong plan bị bỏ sót. Không có story nào nằm ngoài plan.

---

## 4. Ngoài phạm vi của các story trên

Các story trên **không** bao gồm (tham chiếu Mục 2 của `00-plan.md`):
đăng nhập/tài khoản/multi-user · đồng bộ cloud, server, database ngoài · due date, nhắc nhở, thông báo · tag, độ ưu tiên, sắp xếp thủ công, kéo-thả · dự án con, nhiều danh sách · tìm kiếm, phân trang, undo/redo, lịch sử thay đổi · import/export, chia sẻ, in · mobile app, PWA · dark mode, đa ngôn ngữ · analytics · deploy production.

Ngoài ra, các story này cố ý **không** có: bộ đếm số việc còn lại, nút "xóa hết việc đã xong", nút "đánh dấu xong tất cả". Đây là những thứ thường đi kèm ứng dụng todo nhưng không có trong brief.

---

## 5. Giả định được sử dụng

| Story | Giả định dựa vào |
|---|---|
| US-01 | GD3, GD8, GD9, GD10 |
| US-02 | GD3, GD4 |
| US-03 | GD4, Q2 (sửa tại chỗ), Q3 (việc xong vẫn sửa được) |
| US-04 | GD5, Q3, Q4 (không xác nhận) |
| US-05 | GD3 |
| US-06 | GD7, Q5 (không nhớ bộ lọc) |
| US-07 | GD1, GD2 |

Nếu CEO trả lời khác ở Q2, Q3, Q4, Q5: phải sửa lại AC tương ứng trước khi Dev bắt đầu.

---

## 6. Đề xuất chờ CEO (KHÔNG làm trong MVP)

Ghi lại để không mất, tuyệt đối không tự đưa vào M3:

1. Bộ đếm "còn N việc chưa xong" — hữu ích nhưng không có trong brief.
2. Nút xóa toàn bộ việc đã xong — tiết kiệm thao tác, nhưng mâu thuẫn GD5.
3. Hoàn tác sau khi xóa — giảm rủi ro mất việc do bấm nhầm, liên quan Q4.
4. Nhớ bộ lọc sau khi tải lại trang — liên quan Q5.

---

## 7. Điều kiện qua mốc M1

- [ ] CEO duyệt 7 story và toàn bộ AC.
- [ ] CEO chốt hoặc chấp nhận mặc định cho Q1–Q8 trong `00-plan.md`.
- [ ] Không có yêu cầu bổ sung tính năng ngoài Mục 2.

Khi cả 3 mục trên đạt, chuyển sang M2: Architect tạo `02-architecture.md`, UX tạo `03-ux.md`. Dev vẫn chưa được viết code cho tới khi M2 xong.
CEO REVIEW: APPROVED — 8 stories