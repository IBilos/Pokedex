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

export const fetchPokemonTypes = async (): Promise<{ name: string; url: string }[]> => {
  const response = await axios.get(`${API_BASE_URL}/type`);
  return response.data.results;
};

export const fetchPokemonsByType = async (type: string): Promise<PokemonListItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/type/${type}`);
  return response.data.pokemon.map((p: any) => p.pokemon);
};

export const fetchPokemonGenerations = async (): Promise<{ name: string; url: string }[]> => {
  const response = await axios.get(`${API_BASE_URL}/generation`);
  return response.data.results;
};

export const fetchPokemonsByGeneration = async (generation: string): Promise<PokemonListItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/generation/${generation}`);
  return response.data.pokemon_species.map((p: any) => ({
    name: p.name,
    url: p.url,
  }));
};
