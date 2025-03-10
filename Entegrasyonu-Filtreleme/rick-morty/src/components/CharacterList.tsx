'use client';

import { useFilterStore } from '@/store/store';
import { useState, useEffect } from 'react';

// Define types for the API response
interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
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

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export default function CharacterList({
  status,
  gender,
  species,
}: {
  status: string;
  gender: string;
  species: string;
}): JSX.Element {
  // Get selected character state from the store
  const { selectedCharacterId, setSelectedCharacter } = useFilterStore();

  // Local state for hover effects
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Local state for character data
  const [characters, setCharacters] = useState<ApiResponse>({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data when filters change
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await fetchCharacters(status, gender, species);
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [status, gender, species]);

  // Reset selected character when filters change
  useEffect(() => {
    setSelectedCharacter(null);
  }, [status, gender, species, setSelectedCharacter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-lg">Loading characters...</div>
      </div>
    );
  }

  if (!characters.results || characters.results.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">
          No characters found with the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {characters.results.map((character) => (
          <div
            key={character.id}
            className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative group ${
              selectedCharacterId === character.id
                ? 'ring-2 ring-blue-500 scale-[1.02]'
                : hoveredCard === character.id
                ? 'scale-[1.01] shadow-md'
                : ''
            }`}
            onClick={(): void =>
              setSelectedCharacter(
                selectedCharacterId === character.id ? null : character.id
              )
            }
            onMouseEnter={(): void => setHoveredCard(character.id)}
            onMouseLeave={(): void => setHoveredCard(null)}
          >
            {/* Status badge */}
            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white ${
                character.status === 'Alive'
                  ? 'bg-green-500'
                  : character.status === 'Dead'
                  ? 'bg-red-500'
                  : 'bg-gray-500'
              }`}
            >
              {character.status}
            </div>

            <div className="relative">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto transition-opacity duration-300"
              />

              {/* Hover overlay with quick info */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                <p className="text-sm">
                  <span className="font-medium">Origin:</span>{' '}
                  {character.origin.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Location:</span>{' '}
                  {character.location.name}
                </p>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded transition-colors"
                  onClick={(e): void => {
                    e.stopPropagation();
                    setSelectedCharacter(character.id);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="p-3">
              <div className="flex justify-between items-start">
                <h2
                  className="text-lg font-bold mb-2 truncate"
                  title={character.name}
                >
                  {character.name}
                </h2>

                {/* Favorite button placeholder - could be implemented with additional state */}
                <button
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                  onClick={(e): void => {
                    e.stopPropagation();
                    // Favorite functionality could be added here
                    alert(`Added ${character.name} to favorites!`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 mb-2 text-sm">
                <div className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      character.status === 'Alive'
                        ? 'bg-green-500'
                        : character.status === 'Dead'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                    }`}
                  ></span>
                  <span className="text-gray-600">Status:</span>{' '}
                  <span
                    className={`font-medium ${
                      character.status === 'Alive'
                        ? 'text-green-600'
                        : character.status === 'Dead'
                        ? 'text-red-600'
                        : ''
                    }`}
                  >
                    {character.status}
                  </span>
                </div>
                <p>
                  <span className="text-gray-600">Gender:</span>{' '}
                  <span className="font-medium">{character.gender}</span>
                </p>
                <p>
                  <span className="text-gray-600">Species:</span>{' '}
                  <span className="font-medium">{character.species}</span>
                </p>
              </div>

              {/* Episodes count badge */}
              <div className="mt-3 flex justify-between items-center">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                  {character.episode.length} episodes
                </span>

                <button
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  onClick={(e): void => {
                    e.stopPropagation();
                    setSelectedCharacter(character.id);
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Character Details Section */}
      {selectedCharacterId &&
        characters.results.some((c) => c.id === selectedCharacterId) && (
          <div className="bg-white border rounded-lg shadow-md p-6 mt-8 animate-fadeIn">
            {characters.results.map((character) =>
              character.id === selectedCharacterId ? (
                <div
                  key={`detail-${character.id}`}
                  className="flex flex-col md:flex-row gap-6"
                >
                  <div className="md:w-1/3 lg:w-1/4">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                    <div className="mt-4 flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors mr-2"
                        onClick={(e): void => {
                          e.stopPropagation();
                          // Share functionality
                          void navigator.clipboard.writeText(
                            window.location.href + `?character=${character.id}`
                          );
                          alert('Link copied to clipboard!');
                        }}
                      >
                        Share
                      </button>
                      <button
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition-colors"
                        onClick={(e): void => {
                          e.stopPropagation();
                          // Favorite functionality
                          alert(`Added ${character.name} to favorites!`);
                        }}
                      >
                        Favorite
                      </button>
                    </div>
                  </div>
                  <div className="md:w-2/3 lg:w-3/4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold">{character.name}</h2>
                      <button
                        onClick={(e): void => {
                          e.stopPropagation();
                          setSelectedCharacter(null);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Status</p>
                        <p
                          className={`font-medium ${
                            character.status === 'Alive'
                              ? 'text-green-600'
                              : character.status === 'Dead'
                              ? 'text-red-600'
                              : ''
                          }`}
                        >
                          {character.status}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Species</p>
                        <p className="font-medium">{character.species}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Gender</p>
                        <p className="font-medium">{character.gender}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Origin</p>
                        <p className="font-medium">
                          {character.origin.name || 'Unknown'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">
                          {character.location.name || 'Unknown'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">
                          {character.type || 'Unknown'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-lg font-semibold mb-2">Episodes</h3>
                      <p className="text-gray-700">
                        {character.episode.length} episodes
                      </p>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
    </div>
  );
}

// Fetch function for client-side data fetching
async function fetchCharacters(
  status?: string,
  gender?: string,
  species?: string
): Promise<ApiResponse> {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);
  if (species) params.append('species', species);

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json() as ApiResponse;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
}
