import './PokemonModal.scss';
import type { PokemonModalProps } from '../../../types/pokemon';
import { STAT_LIMITS } from '../../../utils/constants';

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  if (!pokemon) return null;

  const getStatWidth = (statName: string, value: number): string => {
    const key = statName.replace('-', '') as keyof typeof STAT_LIMITS;

    const [min, max] = STAT_LIMITS[key] ?? [0, 255];
    const percentage = ((value - min) / (max - min)) * 100;

    return `${Math.max(0, Math.min(100, percentage))}%`;
  };

  const formatHeight = (h: number) => `${(h / 10).toFixed(1)} m`;
  const formatWeight = (w: number) => `${(w / 10).toFixed(1)} kg`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <header className="modal-header">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <span className="pokemon-id">#{pokemon.id}</span>
        </header>

        <section className="pokemon-types">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={`type ${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </section>

        <section className="pokemon-info">
          <div className="basic-info">
            <p>
              <strong>Height:</strong> {formatHeight(pokemon.height)}
            </p>
            <p>
              <strong>Weight:</strong> {formatWeight(pokemon.weight)}
            </p>
            <p>
              <strong>Generation:</strong> {pokemon.generation ?? 'Unknown'}
            </p>
          </div>

          <div className="pokemon-stats">
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} className="stat-bar">
                <span className="label">{s.stat.name}</span>
                <div className="bar-container">
                  <div
                    className="bar"
                    style={{ width: getStatWidth(s.stat.name, s.base_stat) }}
                    title={s.base_stat.toString()}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
