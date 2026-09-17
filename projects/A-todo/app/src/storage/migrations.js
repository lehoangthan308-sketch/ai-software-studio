import { CURRENT_SCHEMA_VERSION } from './storageKeys.js'

export function migrateStore(store) {
  if (!store || typeof store !== 'object') {
    return { schemaVersion: CURRENT_SCHEMA_VERSION, todos: [] }
  }

  const version = Number(store.schemaVersion) || 1
  if (version === CURRENT_SCHEMA_VERSION) {
    return {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      todos: Array.isArray(store.todos) ? store.todos : [],
    }
  }

  if (version < CURRENT_SCHEMA_VERSION) {
    return {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      todos: Array.isArray(store.todos) ? store.todos : [],
    }
  }

  return store
}
