// ScrollableCheckboxDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import './ScrollableCheckboxDropdown.scss';
import type { PropsScrollableCheckbox } from '../../../types/props';

export default function ScrollableCheckboxDropdown({
  options,
  selected,
  onChange,
  placeholder = 'Select...',
  disabled = false,
}: PropsScrollableCheckbox) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className={`checkbox-dropdown ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => !disabled && setIsOpen((prev) => !prev)}>
        <span>{selected.length ? selected.join(', ') : placeholder}</span>
        <div className="actions">
          {selected.length > 0 && (
            <button className="clear-btn" onClick={clearSelection}>
              ×
            </button>
          )}
          <span className={`arrow ${isOpen ? 'open' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {/* Filter input inside dropdown */}
          <div className="filter-input">
            <input
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          {filteredOptions.map((opt) => (
            <label key={opt.value} className="dropdown-item">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleOption(opt.value)}
              />
              {opt.label.charAt(0).toUpperCase() + opt.label.slice(1)}
            </label>
          ))}

          {filteredOptions.length === 0 && <div className="no-results">No options found</div>}
        </div>
      )}
    </div>
  );
}
