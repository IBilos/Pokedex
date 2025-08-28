// ScrollableCheckboxDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import './ScrollableCheckboxDropdown.scss';

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ScrollableCheckboxDropdown({
  options,
  selected,
  onChange,
  placeholder = 'Select...',
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          {options.map((opt) => (
            <label key={opt.value} className="dropdown-item">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleOption(opt.value)}
              />
              {opt.label.charAt(0).toUpperCase() + opt.label.slice(1)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
