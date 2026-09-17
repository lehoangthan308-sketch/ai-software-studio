import { EmptyState } from './EmptyState.jsx'
import { TodoItem } from './TodoItem.jsx'

export function TodoList({
  todos,
  filter,
  editingId,
  fieldError,
  disabled,
  onToggle,
  onStartEdit,
  onSave,
  onCancel,
  onRemove,
}) {
  if (todos.length === 0) {
    return <EmptyState filter={filter} />
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editing={editingId === todo.id}
          fieldError={editingId === todo.id ? fieldError : null}
          disabled={disabled}
          onToggle={() => onToggle(todo.id)}
          onStartEdit={() => onStartEdit(todo.id)}
          onSave={(title) => onSave(todo.id, title)}
          onCancel={onCancel}
          onRemove={() => onRemove(todo.id)}
        />
      ))}
    </ul>
  )
}
