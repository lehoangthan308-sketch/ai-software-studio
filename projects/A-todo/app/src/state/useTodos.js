import { useEffect, useReducer, useRef } from 'react'
import { loadStore, probeStorage, saveStore } from '../storage/todoStorage.js'
import { STORE_KEY } from '../storage/storageKeys.js'
import { initialUiState, todosReducer } from './todosReducer.js'

const SAVE_DEBOUNCE_MS = 200

function errorFromCode(code) {
  if (code === 'quota') return 'quota'
  if (code === 'blocked') return 'blocked'
  if (code === 'corrupt') return 'corrupt'
  if (code === 'newer-schema') return 'newer-schema'
  return null
}

export function useTodos() {
  const [state, dispatch] = useReducer(todosReducer, {
    todos: [],
    ...initialUiState,
  })
  const skipSave = useRef(true)
  const saveTimer = useRef(null)

  useEffect(() => {
    const probe = probeStorage()
    const loaded = loadStore()
    skipSave.current = true
    dispatch({
      type: 'hydrate',
      todos: loaded.store.todos,
      readOnly: Boolean(loaded.readOnly),
      error: errorFromCode(loaded.error) || (probe.ok ? null : errorFromCode(probe.error)),
    })
  }, [])

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false
      return
    }
    if (state.readOnly) return

    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      const result = saveStore({ todos: state.todos })
      if (!result.ok) {
        dispatch({ type: 'set-error', error: errorFromCode(result.error) })
      }
    }, SAVE_DEBOUNCE_MS)

    return () => window.clearTimeout(saveTimer.current)
  }, [state.todos, state.readOnly])

  useEffect(() => {
    function onStorage(event) {
      if (event.key !== STORE_KEY) return
      const loaded = loadStore()
      skipSave.current = true
      dispatch({
        type: 'hydrate',
        todos: loaded.store.todos,
        readOnly: Boolean(loaded.readOnly),
        error: errorFromCode(loaded.error),
      })
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return { state, dispatch }
}
