export const TITLE_MAX = 200

export function validateTitle(raw) {
  const title = String(raw ?? '').trim()
  if (!title) {
    return { ok: false, code: 'empty', message: 'Tiêu đề không được để trống' }
  }
  if (title.length > TITLE_MAX) {
    return { ok: false, code: 'too-long', message: 'Tiêu đề tối đa 200 ký tự' }
  }
  return { ok: true, title }
}
