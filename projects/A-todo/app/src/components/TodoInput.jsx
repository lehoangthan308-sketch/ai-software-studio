import { useEffect, useRef } from 'react'
import { TITLE_MAX } from '../lib/validate.js'

export function TodoInput({ draftTitle, fieldError, disabled, onDraftChange, onSubmit }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSubmit()
      queueMicrotask(() => inputRef.current?.focus())
    }
    if (event.key === 'Escape') {
      onDraftChange('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
    queueMicrotask(() => inputRef.current?.focus())
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer-field">
        <label className="sr-only" htmlFor="todo-title-input">
          Tên việc cần làm
        </label>
        <input
          id="todo-title-input"
          ref={inputRef}
          value={draftTitle}
          disabled={disabled}
          maxLength={TITLE_MAX + 50}
          placeholder="Thêm việc mới..."
          className={fieldError ? 'is-invalid' : undefined}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        {fieldError ? (
          <p className="field-error" role="alert">
            ⚠ {fieldError}
          </p>
        ) : null}
      </div>
      <button className="primary-button" type="submit" disabled={disabled}>
        Thêm
      </button>
    </form>
  )
}
