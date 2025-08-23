import React from 'react';
import type { PokemonDetails } from '../../types/pokemon';

interface Props {
  pokemon: PokemonDetails;
  onClick: (name: string) => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onClick }) => {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon.name)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      <p>HP: {pokemon.stats[0].base_stat}</p>
    </div>
  );
};

export default PokemonCard;
