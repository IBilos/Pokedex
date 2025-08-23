import axios from 'axios';
import type { PokemonListItem, PokemonDetails } from '../types/pokemon';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPokemonList = async (limit = 50, offset = 0): Promise<PokemonListItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return response.data.results;
};

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
  return response.data;
};
