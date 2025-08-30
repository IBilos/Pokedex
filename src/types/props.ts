import type { SortCriteria } from './pokemon';

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

  attackRange: [number, number];
  defenseRange: [number, number];
  speedRange: [number, number];
  onAttackChange: (range: [number, number]) => void;
  onDefenseChange: (range: [number, number]) => void;
  onSpeedChange: (range: [number, number]) => void;

  sortCriteria?: SortCriteria;
  onSortCriteriaChange: (value: SortCriteria) => void;
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
  sortCriteria: SortCriteria;
  pokemonToGeneration?: Map<string, number>;
}

export interface OptionScrollableCheckbox {
  label: string;
  value: string;
}

export interface PropsScrollableCheckbox {
  options: OptionScrollableCheckbox[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface StatRanges {
  attackRange?: [number, number];
  defenseRange?: [number, number];
  speedRange?: [number, number];
}

export interface StatSliderProps {
  label: string;
  min: number;
  max: number;
  values: [number, number];
  step?: number;
  onChange: (newRange: [number, number]) => void;
}

export interface PokemonFilters extends Options, StatRanges {}
