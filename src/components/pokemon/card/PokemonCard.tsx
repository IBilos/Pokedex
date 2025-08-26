import type { PokemonCardProps } from '../../../types/pokemon';
import './PokemonCard.scss';

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
}
