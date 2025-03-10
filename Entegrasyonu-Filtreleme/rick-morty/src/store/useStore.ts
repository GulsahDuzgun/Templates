import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Character type
export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

// Filter types
export type Status = '' | 'alive' | 'dead';
export type Gender = '' | 'female' | 'male';
export type Species = '' | 'human' | 'alien' | 'other';

// Combined store state
interface StoreState {
  // Filter state
  name: string;
  status: Status;
  gender: Gender;
  species: Species;
  page: number;

  // Selected characters
  selectedCharacters: Character[];

  // UI state
  isDetailModalOpen: boolean;
  currentCharacterId: number | null;

  // Filter actions
  setName: (name: string) => void;
  setStatus: (status: Status) => void;
  setGender: (gender: Gender) => void;
  setSpecies: (species: Species) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;

  // Character selection actions
  selectCharacter: (character: Character) => void;
  unselectCharacter: (characterId: number) => void;
  clearSelectedCharacters: () => void;

  // Modal actions
  openDetailModal: (characterId: number) => void;
  closeDetailModal: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial filter state
      name: '',
      status: '',
      gender: '',
      species: '',
      page: 1,

      // Initial selection state
      selectedCharacters: [],

      // Initial UI state
      isDetailModalOpen: false,
      currentCharacterId: null,

      // Filter actions
      setName: (name) => set({ name, page: 1 }), // Reset page when filter changes
      setStatus: (status) => set({ status, page: 1 }),
      setGender: (gender) => set({ gender, page: 1 }),
      setSpecies: (species) => set({ species, page: 1 }),
      setPage: (page) => set({ page }),
      resetFilters: () =>
        set({
          name: '',
          status: '',
          gender: '',
          species: '',
          page: 1,
        }),

      // Character selection actions
      selectCharacter: (character) =>
        set((state) => ({
          selectedCharacters: [...state.selectedCharacters, character],
        })),

      unselectCharacter: (characterId) =>
        set((state) => ({
          selectedCharacters: state.selectedCharacters.filter(
            (char) => char.id !== characterId
          ),
        })),

      clearSelectedCharacters: () => set({ selectedCharacters: [] }),

      // Modal actions
      openDetailModal: (characterId) =>
        set({ isDetailModalOpen: true, currentCharacterId: characterId }),

      closeDetailModal: () =>
        set({ isDetailModalOpen: false, currentCharacterId: null }),
    }),
    {
      name: 'rick-morty-store',
    }
  )
);
