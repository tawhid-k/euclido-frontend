import { create } from 'zustand'
import { ProgramDetailsT } from '@/@/lib/types/program-details-type'
import { getProgramDetails } from '@/@/api/program'

interface ProgramStore {
  programDetails: ProgramDetailsT | null
  setProgramDetails: (details: ProgramDetailsT | null) => void
  toggleBookmark: () => void
  fetchProgramDetails: (uuid: string) => Promise<void>
}

export const useProgramDetailsStore = create<ProgramStore>((set) => ({
  programDetails: null,
  
  setProgramDetails: (details) => set({ programDetails: details }),

  toggleBookmark: () => set((state) => ({
    programDetails: state.programDetails
      ? {
          ...state.programDetails,
          isBookmarked: !state.programDetails.isBookmarked
        }
      : null
  })),

  fetchProgramDetails: async (uuid) => {
    try {
      const data = await getProgramDetails(uuid)
   
      set({ programDetails: data })
    } catch (error) {
      console.error('Error fetching program details:', error)
    }
  }
}))
