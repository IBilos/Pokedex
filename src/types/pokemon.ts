export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  stats: PokemonStat[];
  id: number;
  height: number;
  weight: number;
}

export interface PokemonGridProps {
  pokemons: PokemonDetails[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}

export interface PokemonCardProps {
  pokemon: PokemonDetails;
  onClick: (pokemon: PokemonDetails) => void;
}

export interface PokemonModalProps {
  pokemon: PokemonDetails | null;
  onClose: () => void;
}
