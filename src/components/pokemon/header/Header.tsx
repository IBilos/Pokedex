import type { HeaderProps } from '../../../types/props';
import './Header.scss';

export default function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="title">Pokédex</h1>
      <button className="sidebar-toggle" onClick={onToggleSidebar}>
        <span>{isSidebarOpen ? '×' : '≡'}</span>
      </button>
    </header>
  );
}
