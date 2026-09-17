const COPY = {
  all: {
    title: 'Chưa có việc nào',
    detail: 'Gõ việc đầu tiên vào ô phía trên rồi bấm Thêm.',
  },
  active: {
    title: 'Không có việc chưa xong',
    detail: 'Không còn việc nào đang làm.',
  },
  done: {
    title: 'Chưa có việc nào hoàn thành',
    detail: 'Đánh dấu một việc là xong để nó xuất hiện ở đây.',
  },
}

export function EmptyState({ filter }) {
  const copy = COPY[filter] ?? COPY.all
  return (
    <div className="empty">
      <div aria-hidden="true">○</div>
      <h2>{copy.title}</h2>
      <p>{copy.detail}</p>
    </div>
  )
}
