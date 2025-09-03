import { render, screen, fireEvent, within } from '@testing-library/react';
import PokemonCard from '../components/pokemon/card/PokemonCard';
import { mockPokemonDetails } from '../mocks/pokemonMocks';

describe('PokemonCard', () => {
  const mockClick = jest.fn();

  test('renders Pokémon name, image, types, and stats', () => {
    const pokemon = mockPokemonDetails.mew;
    render(<PokemonCard pokemon={pokemon} onClick={mockClick} />);

    // Name
    expect(screen.getByText('mew')).toBeInTheDocument();

    // Image
    const img = screen.getByAltText('mew') as HTMLImageElement;
    expect(img.src).toContain('mew.png');

    // Type
    expect(screen.getByText('psychic')).toBeInTheDocument();

    // Stats
    const statsContainer = screen.getByText('HP').closest('.pokemon-stats') as HTMLElement;
    const stats = within(statsContainer);

    expect(stats.getByText('HP').nextSibling).toHaveTextContent('100');
    expect(stats.getByText('Atk').nextSibling).toHaveTextContent('100');
    expect(stats.getByText('Def').nextSibling).toHaveTextContent('');
  });

  test('calls onClick when card is clicked', () => {
    const pokemon = mockPokemonDetails.mew;
    render(<PokemonCard pokemon={pokemon} onClick={mockClick} />);

    fireEvent.click(screen.getByText('mew'));
    expect(mockClick).toHaveBeenCalledWith(pokemon);
  });
});
