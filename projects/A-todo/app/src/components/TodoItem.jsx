import { useEffect, useRef, useState } from 'react'

export function TodoItem({ todo, editing, fieldError, disabled, onToggle, onStartEdit, onSave, onCancel, onRemove }) {
  const [draft, setDraft] = useState(todo.title)
  const inputRef = useRef(null)
  const skipBlurSave = useRef(false)

  useEffect(() => {
    if (editing) {
      setDraft(todo.title)
      const node = inputRef.current
      if (node) {
        node.focus()
        node.select()
      }
    }
  }, [editing, todo.title])

  function commit() {
    onSave(draft)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      commit()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      skipBlurSave.current = true
      setDraft(todo.title)
      onCancel()
    }
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        disabled={disabled}
        aria-label={`Đánh dấu xong: ${todo.title}`}
        onChange={onToggle}
      />
      {editing ? (
        <div>
          <input
            ref={inputRef}
            className={fieldError ? 'todo-edit is-invalid' : 'todo-edit'}
            value={draft}
            disabled={disabled}
            aria-label="Sửa tiêu đề việc"
            onChange={(event) => setDraft(event.target.value)}
            onBlur={() => {
              if (skipBlurSave.current) {
                skipBlurSave.current = false
                return
              }
              commit()
            }}
            onKeyDown={handleKeyDown}
          />
          {fieldError ? (
            <p className="field-error" role="alert">
              ⚠ {fieldError}
            </p>
          ) : null}
        </div>
      ) : (
        <button
          type="button"
          className={todo.done ? 'todo-title is-done' : 'todo-title'}
          onClick={onStartEdit}
        >
          {todo.title}
        </button>
      )}
      <button
        type="button"
        className="delete-button"
        aria-label={`Xóa ${todo.title}`}
        disabled={disabled}
        onClick={onRemove}
      >
        🗑
      </button>
    </li>
  )
}
