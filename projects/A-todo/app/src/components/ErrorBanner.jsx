const MESSAGES = {
  quota: 'Không lưu được thay đổi — bộ nhớ trình duyệt đã đầy. Xoá bớt việc cũ rồi thử lại.',
  blocked: 'Trình duyệt đang chặn lưu dữ liệu. Bạn vẫn dùng được, nhưng đóng tab là mất.',
  corrupt: 'Không đọc được dữ liệu đã lưu. Danh sách bắt đầu lại từ đầu; bản cũ vẫn được giữ trong bộ nhớ trình duyệt.',
  'newer-schema': 'Dữ liệu này thuộc phiên bản mới hơn. Hãy tải lại trang để cập nhật.',
}

export function ErrorBanner({ error, onDismiss }) {
  if (!error) return null
  return (
    <div className="banner" role="alert">
      <p>⚠ {MESSAGES[error] ?? error}</p>
      <button className="icon-button" type="button" aria-label="Đóng" onClick={onDismiss}>
        ×
      </button>
    </div>
  )
}
