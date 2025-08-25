import axios from 'axios';
import type { PokemonListItem, PokemonDetails } from '../types/pokemon';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MAX_ITEMS_FETCH = import.meta.env.VITE_MAX_ITEMS_FETCH;

export const fetchPokemonList = async (): Promise<PokemonListItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${MAX_ITEMS_FETCH}`);
  return response.data.results;
};

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
  return response.data;
};
