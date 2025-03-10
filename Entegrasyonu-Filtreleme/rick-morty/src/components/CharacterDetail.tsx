'use client';

import { useStore } from '@store/useStore';
import { useCharacterDetails } from '@services/queries';
import Image from 'next/image';

export function CharacterDetail() {
  const { isDetailModalOpen, currentCharacterId, closeDetailModal } =
    useStore();
  const {
    data: character,
    isLoading,
    isError,
  } = useCharacterDetails(currentCharacterId);

  if (!isDetailModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Character Details</h2>
          <button
            onClick={closeDetailModal}
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

        <div className="p-4">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {isError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">
                {' '}
                Failed to load character details
              </span>
            </div>
          )}

          {character && (
            <div>
              <div className="flex flex-col items-center mb-4">
                <div className="relative h-48 w-48 mb-4">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-center">
                  {character.name}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      character.status === 'Alive'
                        ? 'bg-green-500'
                        : character.status === 'Dead'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                    }`}
                  ></span>
                  <span className="text-lg">
                    {character.status} - {character.species}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500">Gender</h4>
                  <p>{character.gender}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500">Origin</h4>
                  <p>{character.origin.name}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500">Last known location</h4>
                  <p>{character.location.name}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500">Number of episodes</h4>
                  <p>{character.episode.length}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
