import { Suspense } from 'react';
import FilterOptions from '@/components/FilterOptions';
import CharacterList from '@/components/CharacterList';

interface PageProps {
  searchParams: {
    status?: string;
    gender?: string;
    species?: string;
  };
}

// This is a Server Component
export default function Page({ searchParams }: PageProps): JSX.Element {
  // Get filter parameters from URL
  const status = searchParams.status || '';
  const gender = searchParams.gender || '';
  const species = searchParams.species || '';

  return (
    <main className="container mx-auto p-4 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Rick and Morty Characters
      </h1>

      {/* Client-side Filter Options Component */}
      <FilterOptions
        initialStatus={status}
        initialGender={gender}
        initialSpecies={species}
      />

      {/* Show active filters */}
      {(status || gender || species) && (
        <div className="mb-6 p-3 bg-gray-50 rounded-md shadow-sm">
          <p className="text-sm text-gray-600">
            Active filters:
            {status && (
              <span className="ml-2 font-medium">Status: {status}</span>
            )}
            {gender && (
              <span className="ml-2 font-medium">Gender: {gender}</span>
            )}
            {species && (
              <span className="ml-2 font-medium">Species: {species}</span>
            )}
          </p>
        </div>
      )}

      {/* Character List Component */}
      <CharacterList status={status} gender={gender} species={species} />
    </main>
  );
}
