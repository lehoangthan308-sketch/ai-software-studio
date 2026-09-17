import { ErrorBanner } from './components/ErrorBanner.jsx'
import { FilterBar } from './components/FilterBar.jsx'
import { TodoInput } from './components/TodoInput.jsx'
import { TodoList } from './components/TodoList.jsx'
import { useTodos } from './state/useTodos.js'

function visibleTodos(todos, filter) {
  if (filter === 'active') return todos.filter((todo) => !todo.done)
  if (filter === 'done') return todos.filter((todo) => todo.done)
  return todos
}

export default function App() {
  const { state, dispatch } = useTodos()
  const list = visibleTodos(state.todos, state.filter)
  const fieldErrorForInput = state.editingId ? null : state.fieldError

  function startEdit(id) {
    if (state.editingId && state.editingId !== id) {
      const current = state.todos.find((todo) => todo.id === state.editingId)
      if (current) {
        dispatch({ type: 'edit', id: current.id, title: current.title })
      }
    }
    dispatch({ type: 'start-edit', id })
  }

  return (
    <main className="app">
      <header className="header">
        <h1>Việc cần làm</h1>
      </header>

      <ErrorBanner error={state.error} onDismiss={() => dispatch({ type: 'dismiss-error' })} />

      <TodoInput
        draftTitle={state.draftTitle}
        fieldError={fieldErrorForInput}
        disabled={state.readOnly}
        onDraftChange={(draftTitle) => {
          dispatch({ type: 'set-draft', draftTitle })
          if (state.fieldError) dispatch({ type: 'clear-field-error' })
        }}
        onSubmit={() => dispatch({ type: 'add', title: state.draftTitle })}
      />

      <FilterBar
        filter={state.filter}
        onChange={(filter) => dispatch({ type: 'set-filter', filter })}
      />

      <TodoList
        todos={list}
        filter={state.filter}
        editingId={state.editingId}
        fieldError={state.editingId ? state.fieldError : null}
        disabled={state.readOnly}
        onToggle={(id) => dispatch({ type: 'toggle', id })}
        onStartEdit={startEdit}
        onSave={(id, title) => dispatch({ type: 'edit', id, title })}
        onCancel={() => dispatch({ type: 'cancel-edit' })}
        onRemove={(id) => dispatch({ type: 'remove', id })}
      />

      <p className="sr-only" aria-live="polite">
        {list.length === 0 ? 'Danh sách trống' : `${list.length} việc đang hiển thị`}
      </p>
    </main>
  )
}
