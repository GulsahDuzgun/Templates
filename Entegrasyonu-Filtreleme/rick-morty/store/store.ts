import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterState {
  status: string;
  gender: string;
  statusOptions: FilterOption[];
  genderOptions: FilterOption[];
  setStatus: (status: string) => void;
  setGender: (gender: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set) => ({
        status: '',
        gender: '',
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
        setStatus: (status) => set({ status }),
        setGender: (gender) => set({ gender }),
        resetFilters: () => set({ status: '', gender: '' }),
      }),
      {
        name: 'filter-storage',
      }
    )
  )
);
