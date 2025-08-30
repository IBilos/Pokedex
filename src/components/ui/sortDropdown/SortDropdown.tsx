import type { SortCriteria } from '../../../types/pokemon';
import './SortDropdown.scss';

interface SortDropdownProps {
  value: SortCriteria | null | undefined;
  onChange: (value: SortCriteria | null) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? null : (e.target.value as SortCriteria))}
      >
        <option value="">No sorting</option>
        {/* Alphabetical */}
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        {/* Total power */}
        <option value="total-asc">Total power ↑</option>
        <option value="total-desc">Total power ↓</option>
        {/* Generation number */}
        <option value="generation-asc">Generation ↑</option>
        <option value="generation-desc">Generation ↓</option>
        {/* Individual stats */}
        <option value="attack-asc">Attack ↑</option>
        <option value="attack-desc">Attack ↓</option>
        <option value="defense-asc">Defense ↑</option>
        <option value="defense-desc">Defense ↓</option>
        <option value="speed-asc">Speed ↑</option>
        <option value="speed-desc">Speed ↓</option>
      </select>
    </div>
  );
}
