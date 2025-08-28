import './Sidebar.scss';
import type { SidebarProps } from '../../../types/props';

export default function Sidebar({
  isOpen,
  search,
  onSearchChange,
  types,
  isTypesLoading,
  selectedType,
  onTypeChange,
  generations,
  isGenerationsLoading,
  selectedGeneration,
  onGenerationChange,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2>Filter & Sort</h2>

      <div className="filter-section">
        <label>Search by name</label>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-section">
        <label>Filter by Type</label>
        <select
          id="type"
          value={selectedType ?? ''}
          onChange={(e) => onTypeChange(e.target.value || null)}
          disabled={isTypesLoading}
        >
          <option value="">All</option>
          {types?.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label>Filter by Generation</label>
        <select
          id="generation"
          value={selectedGeneration ?? ''}
          onChange={(e) => onGenerationChange(e.target.value || null)}
          disabled={isGenerationsLoading}
        >
          <option value="">All</option>
          {generations?.map((g) => (
            <option key={g.name} value={g.name}>
              {g.name.charAt(0).toUpperCase() + g.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label>Sort by</label>
        <select>
          <option value="name">Name</option>
          <option value="power">Total Power</option>
          <option value="generation">Generation</option>
        </select>
      </div>
    </aside>
  );
}
