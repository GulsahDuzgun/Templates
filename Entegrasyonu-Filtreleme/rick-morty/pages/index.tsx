import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import FilterOptions from '../components/FilterOptions';
import { useQueryState } from 'nuqs';

// Fetch function that can be used both on client and server
const fetchCharacters = async (status?: string, gender?: string) => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { status, gender } = context.query;

  // Pre-fetch the data on the server based on URL parameters
  await queryClient.prefetchQuery({
    queryKey: [
      'characters',
      {
        status: (status as string) || '',
        gender: (gender as string) || '',
      },
    ],
    queryFn: () => fetchCharacters(status as string, gender as string),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage = () => {
  // Get URL parameters using nuqs
  const [statusParam] = useQueryState('status', {
    defaultValue: '',
  });

  const [genderParam] = useQueryState('gender', {
    defaultValue: '',
  });

  // Fetch data based on URL parameters using React Query
  const { data, isLoading } = useQuery({
    queryKey: ['characters', { status: statusParam, gender: genderParam }],
    queryFn: () => fetchCharacters(statusParam, genderParam),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Rick and Morty Characters</h1>

      {/* Filter Options Component */}
      <FilterOptions />

      {/* Show active filters */}
      {(statusParam || genderParam) && (
        <div className="mb-4 p-2 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            Active filters:
            {statusParam && (
              <span className="ml-1 font-medium">Status: {statusParam}</span>
            )}
            {genderParam && (
              <span className="ml-2 font-medium">Gender: {genderParam}</span>
            )}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.results?.map((character: any) => (
            <div
              key={character.id}
              className="border rounded p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto rounded"
              />
              <h2 className="text-xl font-bold mt-2">{character.name}</h2>
              <p>
                Status: <span className="font-medium">{character.status}</span>
              </p>
              <p>
                Gender: <span className="font-medium">{character.gender}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
