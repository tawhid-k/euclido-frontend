import { create } from 'zustand'
import { ProgramT } from '../lib/types/program-type'
import { CountryT } from '../lib/types/country-types'
import { DisciplineT } from '../lib/types/discipline-type'
import { SupervisorT } from '../lib/types/supervisor-type'

interface Filters {
    countries: CountryT[] | null
    disciplines: DisciplineT[] | null
}

interface Links {
    first: string | null
    previous: string | null
    next: string | null
    last: string | null
}

interface Meta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

interface ProgramListState {
    programs: ProgramT[] | null
    supervisors: SupervisorT[] | null
    meta: Meta | null
    filters: Filters
    links: Links
}

interface ProgramListStore extends ProgramListState {
  
    setPrograms: (programs: ProgramT[]) => void
    setSupervisors: (supervisor : SupervisorT[]) => void
    clearPrograms: () => void
    setMeta: (meta: Meta) => void
    setLinks: (links: Links) => void

    setFilters: (filters: Filters) => void
    updateCountryFilters: (countries: CountryT[]) => void
    updateDisciplineFilters: (disciplines: DisciplineT[]) => void
    resetFilters: () => void

    updateProgramBookmark: (programUuid: string, isBookmarked: boolean) => void
    updateSupervisorBookmark: (supervisorUuid: string, isBookmarked: boolean) => void
    getProgram: (programId: number) => ProgramT | null

}

const initialState: ProgramListState = {
    programs: null,
    supervisors: null,
    meta: null,
    filters: {
        countries: null,
        disciplines: null
    },
    links: {
        first: null,
        previous: null,
        next: null,
        last: null
    }
}

const useProgramListStore = create<ProgramListStore>((set, get) => ({
    ...initialState,

    setPrograms: (programs) => set({ programs }),
    setSupervisors: (supervisors) => set({ supervisors }),
    clearPrograms: () => set({ programs: null }),
    setMeta: (meta) => set({ meta }),
    setLinks: (links) => set({ links }),

    setFilters: (filters) => set({ filters }),
    updateCountryFilters: (countries) =>
        set((state) => ({
            filters: {
                ...state.filters,
                countries
            }
        })),
    updateDisciplineFilters: (disciplines) =>
        set((state) => ({
            filters: {
                ...state.filters,
                disciplines
            }
        })),
    resetFilters: () => set({ filters: initialState.filters }),

    updateProgramBookmark: (programId, isBookmarked) =>
        set((state) => ({
            programs: state.programs?.map(program =>
                program.uuid === programId
                    ? { ...program, isBookmarked }
                    : program
            ) || null
        })),

    updateSupervisorBookmark: (supervisorId, isBookmarked) => 
        set((state) => ({
            supervisors: state.supervisors?.map(supervisor =>
                supervisor.supervisor.uuid === supervisorId
                    ? { ...supervisor, isBookmarked }
                    : supervisor
            ) || null
        })),

    getProgram: (programId) => {
        const state = get()
        return state.programs?.find(program => program.id === programId) || null
    },

 
}))

export default useProgramListStore