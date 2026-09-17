# 02 — Kiến trúc (A-todo)

> Vai trò: Architect. Tài liệu này mô tả thiết kế, không chứa production code.

## 0. Ghi chú về input

File `01-stories.md` **không được dán vào** yêu cầu (chỉ còn placeholder). Tài liệu này được viết trên bộ story cơ bản dưới đây. Nếu story thật khác, chỉ cần sửa mục 3 (mô hình dữ liệu) và mục 5 (luồng), phần stack và thư mục giữ nguyên.

| ID | Story giả định |
|----|----------------|
| S1 | Thêm một việc mới |
| S2 | Xem danh sách việc |
| S3 | Đánh dấu xong / bỏ đánh dấu |
| S4 | Sửa tên một việc |
| S5 | Xoá một việc |
| S6 | Lọc: Tất cả / Đang làm / Đã xong |
| S7 | Dữ liệu còn nguyên sau khi tải lại trang |

---

## 1. Stack đã chốt (không đổi)

| Hạng mục | Quyết định |
|----------|-----------|
| Build tool | **Vite** |
| UI | **React** (function component + hooks) |
| Ngôn ngữ | JavaScript (JSX) |
| Lưu dữ liệu | **localStorage** của trình duyệt |
| Backend | **Không có** |
| Đăng nhập / tài khoản | **Không có** |
| Cloud / đồng bộ nhiều máy | **Không có** |
| Router | Không dùng — app chỉ có 1 màn hình |
| State management | React state nội bộ (`useReducer` ở component gốc). Không Redux, không Zustand |
| CSS | CSS thuần / CSS Modules |

**Hệ quả phải chấp nhận:**
- Dữ liệu gắn với **một trình duyệt + một máy**. Đổi máy, đổi trình duyệt, hoặc xoá dữ liệu duyệt web → mất hết.
- Chế độ ẩn danh: dữ liệu mất khi đóng cửa sổ.
- Không có multi-user, không có lịch sử thay đổi, không khôi phục được.
- Dung lượng localStorage ~5MB → dư sức cho vài nghìn việc, nhưng phải xử lý lỗi ghi đầy (mục 4.4).

---

## 2. Cấu trúc thư mục

```
A-todo/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.jsx                 # điểm vào, mount App
   ├─ App.jsx                  # màn hình duy nhất, giữ state gốc
   ├─ styles/
   │  ├─ global.css
   │  └─ tokens.css            # màu, khoảng cách, font
   ├─ components/
   │  ├─ TodoInput.jsx         # ô nhập + nút Thêm
   │  ├─ FilterBar.jsx         # 3 nút lọc + bộ đếm
   │  ├─ TodoList.jsx          # vòng lặp render danh sách
   │  ├─ TodoItem.jsx          # 1 dòng việc: checkbox / tên / sửa / xoá
   │  ├─ EmptyState.jsx        # các trạng thái rỗng
   │  └─ ErrorBanner.jsx       # lỗi cấp màn hình
   ├─ state/
   │  ├─ todosReducer.js       # toàn bộ chuyển trạng thái (add/toggle/edit/remove)
   │  └─ useTodos.js           # hook gói reducer + đọc/ghi storage
   ├─ storage/
   │  ├─ storageKeys.js        # hằng số key
   │  ├─ todoStorage.js        # load / save / handle quota + JSON hỏng
   │  └─ migrations.js         # nâng cấp dữ liệu cũ theo schemaVersion
   └─ lib/
      ├─ validate.js           # luật hợp lệ của tên việc
      └─ id.js                 # sinh id
```

**Nguyên tắc phân tầng:**
- `components/` chỉ hiển thị + bắn sự kiện lên, không đụng localStorage.
- `state/` là nơi duy nhất quyết định dữ liệu thay đổi thế nào.
- `storage/` là nơi duy nhất gọi `localStorage`. Nếu sau này đổi sang IndexedDB hay backend, chỉ sửa thư mục này.

---

## 3. Mô hình dữ liệu

### 3.1 Một việc (`Todo`)

| Field | Kiểu | Bắt buộc | Mô tả / luật |
|-------|------|----------|--------------|
| `id` | string | ✅ | Duy nhất, sinh lúc tạo (`crypto.randomUUID()`, fallback timestamp + random). Không bao giờ đổi, không tái dùng sau khi xoá |
| `title` | string | ✅ | Tên việc. Đã trim. Dài 1–200 ký tự. Rỗng ⇒ không hợp lệ (xem 03-ui mục lỗi) |
| `done` | boolean | ✅ | `false` khi tạo. Phục vụ S3 và bộ lọc S6 |
| `createdAt` | number | ✅ | Epoch ms. Dùng để sắp xếp mặc định |
| `updatedAt` | number | ✅ | Epoch ms. Cập nhật khi đổi `title` hoặc `done` |

Ví dụ một bản ghi:

```json
{
  "id": "a3f1c0e2-7b4d-4f19-9a02-2c8f5e6d1b77",
  "title": "Mua sữa",
  "done": false,
  "createdAt": 1758000000000,
  "updatedAt": 1758000000000
}
```

**Cố ý KHÔNG có ở phiên bản này:** hạn chót, độ ưu tiên, nhãn, ghi chú, việc con, người phụ trách. Story hiện tại không cần; thêm sau qua migration.

### 3.2 Gói lưu trữ (`TodoStore`)

Thứ thực sự nằm trong localStorage là một object bao ngoài, không phải mảng trần — để còn chỗ gắn version.

| Field | Kiểu | Mô tả |
|-------|------|-------|
| `schemaVersion` | number | Hiện tại `1`. Tăng khi đổi cấu trúc |
| `todos` | Todo[] | Danh sách việc, thứ tự mới nhất trước |

```json
{
  "schemaVersion": 1,
  "todos": [ /* ...Todo... */ ]
}
```

### 3.3 State chỉ tồn tại trong bộ nhớ (KHÔNG lưu)

| State | Kiểu | Vì sao không lưu |
|-------|------|------------------|
| `filter` | `"all" \| "active" \| "done"` | Mỗi lần mở app nên về `all` cho dễ đoán |
| `draftTitle` | string | Nội dung đang gõ dở ở ô nhập |
| `editingId` | string \| null | Việc nào đang ở chế độ sửa |
| `error` | object \| null | Lỗi hiển thị tạm |

---

## 4. Chỗ lưu localStorage

### 4.1 Key

| Key | Nội dung |
|-----|----------|
| `atodo.v1.store` | Chuỗi JSON của `TodoStore` (mục 3.2) |

Chỉ **một key duy nhất**. Không tách mỗi việc một key — tránh phải quét `localStorage` và tránh ghi dở dang.
Tiền tố `atodo.` để không đụng key của app khác trên cùng origin.

### 4.2 Khi nào đọc

Đúng một lần, lúc app khởi động (`useTodos` mount): đọc chuỗi → `JSON.parse` → chạy migration → lọc bỏ bản ghi hỏng → nạp vào state React. Sau đó **React state là nguồn sự thật**, mọi thứ render từ đó.

### 4.3 Khi nào ghi

Sau **mỗi** thay đổi danh sách (thêm / sửa / toggle / xoá): ghi đè nguyên gói `TodoStore`. Ghi có debounce ~200ms để gõ sửa nhanh không làm ghi liên tục. Đổi bộ lọc **không** ghi.

### 4.4 Các trường hợp hỏng phải xử lý

| Tình huống | Cách xử lý |
|------------|-----------|
| Chưa có key (lần đầu mở) | Coi như danh sách rỗng, không báo lỗi |
| JSON hỏng / parse lỗi | Không xoá dữ liệu ngầm. Đổi tên key hỏng thành `atodo.v1.store.corrupt.<timestamp>`, khởi động với danh sách rỗng, hiện banner lỗi |
| `todos` không phải mảng, hoặc một phần tử thiếu `id`/`title` | Bỏ phần tử hỏng, giữ phần còn lại, ghi log console |
| Ghi thất bại vì đầy dung lượng (`QuotaExceededError`) | Giữ nguyên state trên màn hình, hiện banner "Không lưu được". Không âm thầm nuốt lỗi |
| localStorage bị chặn (ẩn danh / chặn cookie) | App vẫn chạy trong phiên; hiện banner một lần: dữ liệu sẽ không được lưu |
| `schemaVersion` lớn hơn version app biết | Không tự ý đọc. Hiện banner đề nghị cập nhật, chạy ở chế độ chỉ đọc |

### 4.5 Nhiều tab

Sự kiện `storage` của trình duyệt được lắng nghe để nạp lại khi tab khác sửa dữ liệu. Không giải quyết xung đột phức tạp: **ghi sau thắng**. Chấp nhận được với app một người dùng.

---

## 5. Luồng dữ liệu

```
người dùng thao tác
      │
      ▼
component  ──dispatch action──▶  todosReducer  ──trả về state mới──▶  React render
                                      │
                                      └──▶ todoStorage.save()  ──▶  localStorage
                                                   │
                                                   └── lỗi ──▶ ErrorBanner
```

Khởi động: `localStorage → parse → migrate → làm sạch → state ban đầu → render`.

## 6. Ranh giới phạm vi

Không thuộc phiên bản này: đồng bộ, chia sẻ, thông báo, kéo thả sắp xếp, hoàn tác nhiều bước, tìm kiếm, xuất/nhập file, dark mode toggle (theo hệ điều hành là đủ).
CEO REVIEW: APPROVED — stack Vite + React + localStorage