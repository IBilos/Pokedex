export interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  types?: { name: string; url: string }[];
  isTypesLoading?: boolean;
  selectedType: string | null;
  onTypeChange: (value: string | null) => void;
  generations?: { name: string; url: string }[];
  isGenerationsLoading?: boolean;
  selectedGeneration: string | null;
  onGenerationChange: (value: string | null) => void;
}

export interface EmptyStateProps {
  message?: string;
  imageSrc?: string;
}

export interface Options {
  limit?: number;
  search?: string;
  type?: string | null;
  generation?: string | null;
  enabled?: boolean;
}
