import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/Home';
import { mockPokemonList, mockPokemonDetails } from './mocks/pokemonMocks';
import * as pokeApi from '../api/pokeApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../api/pokeApi');

describe('Home Page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    jest.resetAllMocks();
  });

  it('displays Pokémon list', async () => {
    const mockedFetchPokemonList = pokeApi.fetchPokemonList as jest.MockedFunction<
      typeof pokeApi.fetchPokemonList
    >;
    const mockedFetchPokemonDetails = pokeApi.fetchPokemonDetails as jest.MockedFunction<
      typeof pokeApi.fetchPokemonDetails
    >;

    mockedFetchPokemonList.mockResolvedValue(mockPokemonList);
    mockedFetchPokemonDetails.mockImplementation((name: string) =>
      Promise.resolve(mockPokemonDetails[name]),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('mew')).toBeInTheDocument();
      expect(screen.getByText('mewtwo')).toBeInTheDocument();
    });
  });

  it('shows error toast when fetching fails', async () => {
    const mockedFetchPokemonList = pokeApi.fetchPokemonList as jest.MockedFunction<
      typeof pokeApi.fetchPokemonList
    >;
    mockedFetchPokemonList.mockRejectedValue(new Error('Failed to fetch'));

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
