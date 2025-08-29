import type { PokemonDetails } from '../types/pokemon';
import type { StatRanges } from '../types/props';

export function filterByStats(pokemons: PokemonDetails[], ranges: StatRanges): PokemonDetails[] {
  const { attackRange, defenseRange, speedRange } = ranges;

  return pokemons.filter((p) => {
    const statsMap = Object.fromEntries(p.stats.map((s) => [s.stat.name, s.base_stat]));

    const attack = statsMap['attack'] ?? 0;
    const defense = statsMap['defense'] ?? 0;
    const speed = statsMap['speed'] ?? 0;

    const attackOk = !attackRange || (attack >= attackRange[0] && attack <= attackRange[1]);
    const defenseOk = !defenseRange || (defense >= defenseRange[0] && defense <= defenseRange[1]);
    const speedOk = !speedRange || (speed >= speedRange[0] && speed <= speedRange[1]);

    return attackOk && defenseOk && speedOk;
  });
}
