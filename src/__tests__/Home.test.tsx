import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/Home';
import { mockPokemonList, mockPokemonDetails } from './mocks/pokemonMocks';
import * as pokeApi from '../api/pokeApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the API module
jest.mock('../api/pokeApi');

const queryClient = new QueryClient();

describe('Home Page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('displays Pokémon list', async () => {
    (pokeApi.fetchPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);
    (pokeApi.fetchPokemonDetails as jest.Mock).mockImplementation((name: string) =>
      Promise.resolve(mockPokemonDetails[name]),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Wait for Pokémon names to appear
    await waitFor(() => {
      expect(screen.getByText('mew')).toBeInTheDocument();
      expect(screen.getByText('mewtwo')).toBeInTheDocument();
    });
  });

  it('shows error toast when fetching fails', async () => {
    (pokeApi.fetchPokemonList as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Wait for toast to appear
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
