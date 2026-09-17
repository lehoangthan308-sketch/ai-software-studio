const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
]

export function FilterBar({ filter, onChange }) {
  return (
    <div className="filters" role="tablist" aria-label="Bộ lọc việc">
      {FILTERS.map((item) => {
        const selected = filter === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            className={selected ? 'filter-button is-selected' : 'filter-button'}
            aria-selected={selected}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
