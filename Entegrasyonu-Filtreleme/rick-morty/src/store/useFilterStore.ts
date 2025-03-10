import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the types for our filter state
export type Gender = '' | 'female' | 'male' | 'genderless' | 'unknown';
export type Status = '' | 'alive' | 'dead' | 'unknown';
export type Species = '' | 'human' | 'alien' | 'other';

// Define the filter state interface
interface FilterState {
  name: string;
  status: Status;
  gender: Gender;
  species: Species;
  page: number;

  // Actions
  setName: (name: string) => void;
  setStatus: (status: Status) => void;
  setGender: (gender: Gender) => void;
  setSpecies: (species: Species) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

// Create the filter store
export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      name: '',
      status: '',
      gender: '',
      species: '',
      page: 1,

      // Action implementations
      setName: (name: string) => set({ name, page: 1 }),
      setStatus: (status: Status) => set({ status, page: 1 }),
      setGender: (gender: Gender) => set({ gender, page: 1 }),
      setSpecies: (species: Species) => set({ species, page: 1 }),
      setPage: (page: number) => set({ page }),
      resetFilters: () =>
        set({ name: '', status: '', gender: '', species: '', page: 1 }),
    }),
    {
      name: 'rick-morty-filters',
    }
  )
);
