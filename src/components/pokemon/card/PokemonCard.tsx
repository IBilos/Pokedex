import type { PokemonCardProps } from '../../../types/pokemon';
import './PokemonCard.scss';

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <div className="pokemon-image">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>

      <p className="pokemon-name">{pokemon.name}</p>

      <div className="pokemon-types">
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="pokemon-stats">
        <div className="stat">
          <span className="label">HP</span>
          <span className="value">
            {pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat}
          </span>
        </div>
        <div className="stat">
          <span className="label">Atk</span>
          <span className="value">
            {pokemon.stats.find((s) => s.stat.name === 'attack')?.base_stat}
          </span>
        </div>
        <div className="stat">
          <span className="label">Def</span>
          <span className="value">
            {pokemon.stats.find((s) => s.stat.name === 'defense')?.base_stat}
          </span>
        </div>
      </div>
    </div>
  );
}
