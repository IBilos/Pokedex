import { useState } from 'react';
import './Sidebar.scss';
import type { SidebarProps } from '../../../types/props';
import ScrollableCheckboxDropdown from '../../ui/scrollableCheckboxDropdown/ScrollableCheckboxDropdown';
import StatSlider from '../../ui/statSlider/StatSlider';
import { STAT_LIMITS } from '../../../utils/constants';
import SortDropdown from '../../ui/sortDropdown/SortDropdown';
import { FiSearch } from 'react-icons/fi';

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
  attackRange,
  defenseRange,
  speedRange,
  onAttackChange,
  onDefenseChange,
  onSpeedChange,
  sortCriteria,
  onSortCriteriaChange,
}: SidebarProps) {
  const [localSearch, setLocalSearch] = useState(search);

  const handleSearch = () => {
    onSearchChange(localSearch.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearAllFilters = () => {
    setLocalSearch('');
    onSearchChange('');
    onTypeChange([]);
    onGenerationChange([]);
    onAbilityChange([]);
    onAttackChange([STAT_LIMITS.attack[0], STAT_LIMITS.attack[1]]);
    onDefenseChange([STAT_LIMITS.defense[0], STAT_LIMITS.defense[1]]);
    onSpeedChange([STAT_LIMITS.speed[0], STAT_LIMITS.speed[1]]);
    onSortCriteriaChange(null);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        {/* Clear All Button */}
        <div className="filter-clear-all">
          <button onClick={clearAllFilters}>Clear All Filters</button>
        </div>

        {/* Search Section */}
        <div className="filter-section search-input">
          <label htmlFor="search">Search by name</label>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch} className="search-button">
              <FiSearch />
            </button>
          </div>
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

        {/* Stat Filters */}
        <div className="filter-section">
          <StatSlider
            label="Attack"
            min={STAT_LIMITS.attack[0]}
            max={STAT_LIMITS.attack[1]}
            values={attackRange ?? [STAT_LIMITS.attack[0], STAT_LIMITS.attack[1]]}
            onChange={onAttackChange}
          />
        </div>

        <div className="filter-section">
          <StatSlider
            label="Defense"
            min={STAT_LIMITS.defense[0]}
            max={STAT_LIMITS.defense[1]}
            values={defenseRange ?? [STAT_LIMITS.defense[0], STAT_LIMITS.defense[1]]}
            onChange={onDefenseChange}
          />
        </div>

        <div className="filter-section">
          <StatSlider
            label="Speed"
            min={STAT_LIMITS.speed[0]}
            max={STAT_LIMITS.speed[1]}
            values={speedRange ?? [STAT_LIMITS.speed[0], STAT_LIMITS.speed[1]]}
            onChange={onSpeedChange}
          />
        </div>

        <div className="filter-group">
          <SortDropdown value={sortCriteria} onChange={onSortCriteriaChange} />
        </div>
      </div>
    </aside>
  );
}
