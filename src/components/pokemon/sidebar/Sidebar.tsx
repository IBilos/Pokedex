import './Sidebar.scss';
import type { SidebarProps } from '../../../types/props';
import ScrollableCheckboxDropdown from '../../ui/scrollableCheckboxDropdown/ScrollableCheckboxDropdown';

export default function Sidebar({
  isOpen,
  search,
  onSearchChange,
  types,
  generations,
  abilities,
  isTypesLoading,
  isGenerationsLoading,
  isAbilitiesLoading,
  selectedTypes,
  selectedGenerations,
  selectedAbilities,
  onTypeChange,
  onGenerationChange,
  onAbilityChange,
}: SidebarProps) {
  const clearAllFilters = () => {
    onSearchChange('');
    onTypeChange([]);
    onGenerationChange([]);
    onAbilityChange([]);
  };
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2>Filter & Sort</h2>

      {/* Clear All Button */}
      <div className="filter-clear-all">
        <button onClick={clearAllFilters}>Clear All Filters</button>
      </div>

      <div className="filter-section">
        <label>Search by name</label>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Types */}
      <div className="filter-section">
        <label>Filter by Type</label>
        <ScrollableCheckboxDropdown
          options={types?.map((t) => ({ label: t.name, value: t.name })) || []}
          selected={selectedTypes}
          onChange={onTypeChange}
          placeholder="Select Types"
          disabled={isTypesLoading}
        />
      </div>

      {/* Generations */}
      <div className="filter-section">
        <label>Filter by Generation</label>
        <ScrollableCheckboxDropdown
          options={generations?.map((g) => ({ label: g.name, value: g.name })) || []}
          selected={selectedGenerations}
          onChange={onGenerationChange}
          placeholder="Select Generations"
          disabled={isGenerationsLoading}
        />
      </div>

      {/* Abilities */}
      <div className="filter-section">
        <label>Filter by Abilities</label>
        <ScrollableCheckboxDropdown
          options={abilities?.map((a) => ({ label: a.name, value: a.name })) || []}
          selected={selectedAbilities}
          onChange={onAbilityChange}
          placeholder="Select Abilities"
          disabled={isAbilitiesLoading}
        />
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
