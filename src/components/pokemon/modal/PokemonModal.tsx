import './PokemonModal.scss';
import type { PokemonModalProps } from '../../../types/pokemon';

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>
          <strong>ID:</strong> {pokemon.id}
        </p>
        <p>
          <strong>Height:</strong> {pokemon.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight}
        </p>
        <p>
          <strong>Generation:</strong> {pokemon.generation ?? 'Unknown'}
        </p>

        <h3>Types:</h3>
        <ul>
          {pokemon.types.map((t) => (
            <li key={t.type.name}>{t.type.name}</li>
          ))}
        </ul>

        <h3>Stats:</h3>
        <ul>
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
