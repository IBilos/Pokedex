export interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  search: string;
  onSearchChange: (value: string) => void;

  types?: { name: string; url: string }[];
  generations?: { name: string; url: string }[];
  abilities?: { name: string; url: string }[];

  isTypesLoading?: boolean;
  isGenerationsLoading?: boolean;
  isAbilitiesLoading?: boolean;

  selectedTypes: string[];
  selectedGenerations: string[];
  selectedAbilities: string[];

  onTypeChange: (values: string[]) => void;
  onGenerationChange: (values: string[]) => void;
  onAbilityChange: (values: string[]) => void;
}

export interface EmptyStateProps {
  message?: string;
  imageSrc?: string;
}

export interface Options {
  limit?: number;
  search?: string;
  types?: string[];
  generations?: string[];
  abilities?: string[];
  enabled?: boolean;
}
