export interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  search: string;
  onSearchChange: (value: string) => void;
}

export interface EmptyStateProps {
  message?: string;
  imageSrc?: string;
}
