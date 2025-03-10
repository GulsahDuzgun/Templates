'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '@store/useStore';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

// Types
export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// API functions
const fetchCharacters = async (
  page = 1,
  name?: string,
  status?: string,
  gender?: string,
  species?: string
): Promise<ApiResponse<Character>> => {
  const params = new URLSearchParams();

  params.append('page', page.toString());
  if (name) params.append('name', name);
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);
  if (species && species !== '') params.append('species', species);

  const response = await axios.get<ApiResponse<Character>>(
    `${API_BASE_URL}/character?${params.toString()}`
  );

  return response.data;
};

const fetchCharacterById = async (id: number): Promise<Character> => {
  const response = await axios.get<Character>(
    `${API_BASE_URL}/character/${id}`
  );
  return response.data;
};

// React Query hooks
export const useCharacters = () => {
  const { name, status, gender, species, page } = useStore();

  return useQuery<ApiResponse<Character>, Error>({
    queryKey: ['characters', page, name, status, gender, species],
    queryFn: () => fetchCharacters(page, name, status, gender, species),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (previousData) => previousData, // Use this instead of keepPreviousData
  });
};

export const useCharacterDetails = (characterId: number | null) => {
  return useQuery<Character, Error>({
    queryKey: ['character', characterId],
    queryFn: () => {
      if (!characterId) throw new Error('Character ID is required');
      return fetchCharacterById(characterId);
    },
    enabled: !!characterId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
