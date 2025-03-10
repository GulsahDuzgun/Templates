'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterState {
  status: string;
  gender: string;
  species: string;
  selectedCharacterId: number | null;
  statusOptions: FilterOption[];
  genderOptions: FilterOption[];
  speciesOptions: FilterOption[];
  setStatus: (status: string) => void;
  setGender: (gender: string) => void;
  setSpecies: (species: string) => void;
  setSelectedCharacter: (id: number | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set) => ({
        status: '',
        gender: '',
        species: '',
        selectedCharacterId: null,
        statusOptions: [
          { value: '', label: 'All Status' },
          { value: 'alive', label: 'Alive' },
          { value: 'dead', label: 'Dead' },
          { value: 'unknown', label: 'Unknown' },
        ],
        genderOptions: [
          { value: '', label: 'All Genders' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'genderless', label: 'Genderless' },
          { value: 'unknown', label: 'Unknown' },
        ],
        speciesOptions: [
          { value: '', label: 'All Species' },
          { value: 'human', label: 'Human' },
          { value: 'alien', label: 'Alien' },
          { value: 'humanoid', label: 'Humanoid' },
          { value: 'poopybutthole', label: 'Poopybutthole' },
          { value: 'mythological', label: 'Mythological' },
          { value: 'animal', label: 'Animal' },
          { value: 'robot', label: 'Robot' },
          { value: 'cronenberg', label: 'Cronenberg' },
          { value: 'disease', label: 'Disease' },
          { value: 'unknown', label: 'Unknown' },
        ],
        setStatus: (status: string): void => set({ status }),
        setGender: (gender: string): void => set({ gender }),
        setSpecies: (species: string): void => set({ species }),
        setSelectedCharacter: (id: number | null): void => set({ selectedCharacterId: id }),
        resetFilters: (): void => set({ status: '', gender: '', species: '' }),
      }),
      {
        name: 'filter-storage',
      }
    )
  )
);
