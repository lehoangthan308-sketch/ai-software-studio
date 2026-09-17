import { createId } from '../lib/id.js'
import { validateTitle } from '../lib/validate.js'

function sortByCreatedAtDesc(todos) {
  return [...todos].sort((a, b) => b.createdAt - a.createdAt)
}

export const initialUiState = {
  filter: 'all',
  draftTitle: '',
  editingId: null,
  error: null,
  fieldError: null,
  readOnly: false,
}

export function todosReducer(state, action) {
  switch (action.type) {
    case 'hydrate': {
      return {
        ...state,
        todos: sortByCreatedAtDesc(action.todos ?? []),
        error: action.error ?? null,
        readOnly: Boolean(action.readOnly),
      }
    }
    case 'set-draft': {
      return {
        ...state,
        draftTitle: action.draftTitle,
        fieldError: null,
      }
    }
    case 'clear-field-error': {
      return { ...state, fieldError: null }
    }
    case 'set-filter': {
      return { ...state, filter: action.filter, editingId: null, fieldError: null }
    }
    case 'dismiss-error': {
      return { ...state, error: null }
    }
    case 'set-error': {
      return { ...state, error: action.error }
    }
    case 'start-edit': {
      if (state.readOnly) return state
      return { ...state, editingId: action.id, fieldError: null }
    }
    case 'cancel-edit': {
      return { ...state, editingId: null, fieldError: null }
    }
    case 'add': {
      if (state.readOnly) return state
      const result = validateTitle(action.title)
      if (!result.ok) {
        return { ...state, fieldError: result.message }
      }
      const now = Date.now()
      const todo = {
        id: createId(),
        title: result.title,
        done: false,
        createdAt: now,
        updatedAt: now,
      }
      return {
        ...state,
        todos: [todo, ...state.todos],
        draftTitle: '',
        fieldError: null,
      }
    }
    case 'toggle': {
      if (state.readOnly) return state
      const now = Date.now()
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, done: !todo.done, updatedAt: now }
            : todo,
        ),
      }
    }
    case 'edit': {
      if (state.readOnly) return state
      const result = validateTitle(action.title)
      if (!result.ok) {
        return { ...state, fieldError: result.message, editingId: action.id }
      }
      const now = Date.now()
      return {
        ...state,
        fieldError: null,
        editingId: null,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, title: result.title, updatedAt: now }
            : todo,
        ),
      }
    }
    case 'remove': {
      if (state.readOnly) return state
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
        editingId: state.editingId === action.id ? null : state.editingId,
      }
    }
    default:
      return state
  }
}
