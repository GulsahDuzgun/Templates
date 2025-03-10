import { useQuery } from '@tanstack/react-query';
import { Gender, Status } from '../store/useFilterStore';

// Define the API base URL
const API_BASE_URL = 'https://rickandmortyapi.com/api';

// Define the Character interface
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

// Define the API response interface
export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

// Define error type
export interface ApiError {
  message: string;
  status?: number;
}

// Function to fetch characters with filters
export const fetchCharacters = async (
  page: number = 1,
  name: string = '',
  status: Status = '',
  gender: Gender = ''
): Promise<ApiResponse> => {
  // Build query parameters
  const params = new URLSearchParams();
  params.append('page', page.toString());

  if (name) params.append('name', name);
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);

  // Make the API request
  const response = await fetch(
    `${API_BASE_URL}/character?${params.toString()}`
  );

  // Handle errors
  if (!response.ok) {
    if (response.status === 404) {
      // Return empty results for 404 (no matches found)
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      };
    }

    const error: ApiError = {
      message: `API error: ${response.status}`,
      status: response.status,
    };
    throw error;
  }

  return response.json() as Promise<ApiResponse>;
};

// React Query hook for fetching characters
export const useCharacters = (
  page: number = 1,
  name: string = '',
  status: Status = '',
  gender: Gender = ''
) => {
  return useQuery<ApiResponse, ApiError>({
    queryKey: ['characters', page, name, status, gender],
    queryFn: () => fetchCharacters(page, name, status, gender),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
