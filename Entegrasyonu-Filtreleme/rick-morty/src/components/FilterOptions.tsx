'use client';

import { useFilterStore } from '@/store/store';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterOptionsProps {
  initialStatus: string;
  initialGender: string;
  initialSpecies: string;
}

export default function FilterOptions({
  initialStatus,
  initialGender,
  initialSpecies,
}: FilterOptionsProps): JSX.Element {
  // Get filter options and state setters directly from the store
  const {
    statusOptions,
    genderOptions,
    speciesOptions,
    setStatus,
    setGender,
    setSpecies,
    resetFilters,
  } = useFilterStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state to track current values
  const [status, setLocalStatus] = useState<string>(initialStatus);
  const [gender, setLocalGender] = useState<string>(initialGender);
  const [species, setLocalSpecies] = useState<string>(initialSpecies);

  // Update URL and trigger server-side rendering
  const updateUrl = (
    newStatus: string,
    newGender: string,
    newSpecies: string
  ): void => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStatus) {
      params.set('status', newStatus);
    } else {
      params.delete('status');
    }

    if (newGender) {
      params.set('gender', newGender);
    } else {
      params.delete('gender');
    }

    if (newSpecies) {
      params.set('species', newSpecies);
    } else {
      params.delete('species');
    }

    // This will trigger a server-side rendering
    router.push(`?${params.toString()}`);
  };

  // Sync store with URL parameters when component mounts or URL changes
  useEffect(() => {
    // Get values from URL
    const statusFromUrl = searchParams.get('status') || '';
    const genderFromUrl = searchParams.get('gender') || '';
    const speciesFromUrl = searchParams.get('species') || '';

    // Update local state
    setLocalStatus(statusFromUrl);
    setLocalGender(genderFromUrl);
    setLocalSpecies(speciesFromUrl);

    // Update store
    setStatus(statusFromUrl);
    setGender(genderFromUrl);
    setSpecies(speciesFromUrl);
  }, [searchParams, setStatus, setGender, setSpecies]);

  // Handle status change
  const handleStatusChange = (value: string): void => {
    setLocalStatus(value);
    updateUrl(value, gender, species);
  };

  // Handle gender change
  const handleGenderChange = (value: string): void => {
    setLocalGender(value);
    updateUrl(status, value, species);
  };

  // Handle species change
  const handleSpeciesChange = (value: string): void => {
    setLocalSpecies(value);
    updateUrl(status, gender, value);
  };

  // Handle reset filters
  const handleReset = (): void => {
    setLocalStatus('');
    setLocalGender('');
    setLocalSpecies('');
    resetFilters();
    router.push(window.location.pathname); // Clear all parameters
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="status-filter" className="font-medium">
          Status
        </label>
        <select
          id="status-filter"
          value={status}
          onChange={(e): void => handleStatusChange(e.target.value)}
          className="p-2 border rounded min-w-[150px]"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="gender-filter" className="font-medium">
          Gender
        </label>
        <select
          id="gender-filter"
          value={gender}
          onChange={(e): void => handleGenderChange(e.target.value)}
          className="p-2 border rounded min-w-[150px]"
        >
          {genderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="species-filter" className="font-medium">
          Species
        </label>
        <select
          id="species-filter"
          value={species}
          onChange={(e): void => handleSpeciesChange(e.target.value)}
          className="p-2 border rounded min-w-[150px]"
        >
          {speciesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {(status || gender || species) && (
        <button
          onClick={handleReset}
          className="px-4 py-2 mt-auto text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
