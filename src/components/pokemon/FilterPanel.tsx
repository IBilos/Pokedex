import React from 'react';

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const FilterPanel: React.FC<Props> = ({ search, setSearch }) => (
  <div className="filter-panel">
    <input
      type="text"
      placeholder="Search Pokemon..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
);

export default FilterPanel;
