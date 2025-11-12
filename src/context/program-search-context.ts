import { create } from 'zustand'
import { CountryT } from '../lib/types/country-types';

interface DisciplineType {
  label: string;
  slug: string;
}


const useDisciplineStore = create<{
  discipline: DisciplineType | null;
  setDiscipline: (discipline: DisciplineType | null) => void;
}>((set) => ({
  discipline: null,
  setDiscipline: (discipline) => set({ discipline })
}));

const useCountryStore = create<{
  country: CountryT | null;
  setCountry: (country: CountryT | null) => void;
}>((set) => ({
  country: null,
  setCountry: (country) => set({ country })
}));
const useprogramTitleStore = create<{
  programTitle: string | null
  setProgramTitle: (programTitle: string | null) => void
}>((set) => ({
  programTitle: null,
  setProgramTitle: (programTitle) => set({ programTitle })
}))




const useDegreeLevelStore = create<{
  degreeLevel: string | null
  setDegreeLevel: (degreeLevel: string | null) => void
}>((set) => ({
  degreeLevel: null,
  setDegreeLevel: (degreeLevel) => set({ degreeLevel })
}))

export { useDisciplineStore, useCountryStore, useDegreeLevelStore, useprogramTitleStore }