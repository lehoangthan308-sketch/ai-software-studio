import { STORE_KEY, CURRENT_SCHEMA_VERSION } from './storageKeys.js'
import { migrateStore } from './migrations.js'

function isValidTodo(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    item.id.length > 0 &&
    typeof item.title === 'string' &&
    typeof item.done === 'boolean' &&
    typeof item.createdAt === 'number'
  )
}

function sanitizeTodos(todos) {
  if (!Array.isArray(todos)) {
    console.warn('atodo: todos is not an array, dropping list')
    return []
  }

  return todos.filter((item) => {
    const ok = isValidTodo(item)
    if (!ok) {
      console.warn('atodo: dropped invalid todo', item)
    }
    return ok
  }).map((item) => ({
    id: item.id,
    title: item.title,
    done: item.done,
    createdAt: item.createdAt,
    updatedAt: typeof item.updatedAt === 'number' ? item.updatedAt : item.createdAt,
  }))
}

export function loadStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY)
    if (raw == null) {
      return { ok: true, store: { schemaVersion: CURRENT_SCHEMA_VERSION, todos: [] } }
    }

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      const backupKey = `${STORE_KEY}.corrupt.${Date.now()}`
      window.localStorage.setItem(backupKey, raw)
      return {
        ok: false,
        error: 'corrupt',
        store: { schemaVersion: CURRENT_SCHEMA_VERSION, todos: [] },
      }
    }

    const migrated = migrateStore(parsed)
    if (Number(migrated.schemaVersion) > CURRENT_SCHEMA_VERSION) {
      return {
        ok: false,
        error: 'newer-schema',
        readOnly: true,
        store: { schemaVersion: migrated.schemaVersion, todos: sanitizeTodos(migrated.todos) },
      }
    }

    return {
      ok: true,
      store: {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        todos: sanitizeTodos(migrated.todos),
      },
    }
  } catch (err) {
    if (err && (err.name === 'SecurityError' || err.code === 18)) {
      return {
        ok: false,
        error: 'blocked',
        store: { schemaVersion: CURRENT_SCHEMA_VERSION, todos: [] },
      }
    }
    throw err
  }
}

export function saveStore(store) {
  const payload = JSON.stringify({
    schemaVersion: CURRENT_SCHEMA_VERSION,
    todos: store.todos,
  })

  try {
    window.localStorage.setItem(STORE_KEY, payload)
    return { ok: true }
  } catch (err) {
    if (err && (err.name === 'QuotaExceededError' || err.code === 22)) {
      return { ok: false, error: 'quota' }
    }
    if (err && (err.name === 'SecurityError' || err.code === 18)) {
      return { ok: false, error: 'blocked' }
    }
    return { ok: false, error: 'quota' }
  }
}

export function probeStorage() {
  try {
    const probeKey = `${STORE_KEY}.probe`
    window.localStorage.setItem(probeKey, '1')
    window.localStorage.removeItem(probeKey)
    return { ok: true }
  } catch (err) {
    if (err && (err.name === 'SecurityError' || err.code === 18)) {
      return { ok: false, error: 'blocked' }
    }
    if (err && (err.name === 'QuotaExceededError' || err.code === 22)) {
      return { ok: false, error: 'quota' }
    }
    return { ok: false, error: 'blocked' }
  }
}
