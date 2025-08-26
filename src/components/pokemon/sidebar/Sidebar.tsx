import './Sidebar.scss';
import type { SidebarProps } from '../../../types/props';

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2>Filter & Sort</h2>

      <div className="filter-section">
        <label>Search by name</label>
        <input type="text" placeholder="Pikachu..." />
      </div>

      <div className="filter-section">
        <label>Filter by Type</label>
        <select>
          <option value="">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
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
