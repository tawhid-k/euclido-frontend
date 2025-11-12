'use client'
import { create } from 'zustand'
import { BookmarkedProgramT, BookmarkProgramDetailsT } from '@/@/lib/types/bookmarked-program-type'
import { BookmarkedSupervisorT } from '@/@/lib/types/bookmarked-supervisor-type'
import { ProfileT } from '@/@/lib/types/user-profile-type'
import { BookmarkedJobType } from '@/@/lib/types/jobs/job-list'

interface ProfileState {
  savedPrograms: BookmarkedProgramT[] | null
  savedSupervisors: BookmarkedSupervisorT[] | null
  savedJobs: BookmarkedJobType[] | null
  profileInformation: ProfileT | null
  comparePrograms: BookmarkProgramDetailsT[] | null

  setSavedPrograms: (programs: BookmarkedProgramT[] | null) => void
  setSavedSupervisors: (supervisors: BookmarkedSupervisorT[] | null) => void
  setSavedJobs: (jobs: BookmarkedJobType[] | null) => void
  setProfileInformation: (profile: ProfileT | null) => void
  setComparePrograms: (programs: BookmarkProgramDetailsT[] | null) => void
  
  removeSavedProgram: (uuid: string) => void
  removeSavedSupervisor: (uuid: string) => void
  removeSavedJob: (uuid: string) => void
  removeResearchInterest: (uuid: string) => void
  
  setValue: (obj: Partial<Omit<ProfileState, 'setValue' | 'setSavedPrograms' | 'setSavedSupervisors' | 'setSavedJobs' | 'setProfileInformation' | 'setComparePrograms' | 'removeSavedProgram' | 'removeSavedSupervisor' | 'removeSavedJob'>>) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  savedPrograms: null,
  savedSupervisors: null,
  savedJobs: null,
  profileInformation: null,
  comparePrograms: null,

  setSavedPrograms: (programs) => 
    set({ savedPrograms: programs }),
  
  setSavedSupervisors: (supervisors) => 
    set({ savedSupervisors: supervisors }),
  
  setSavedJobs: (jobs) => 
    set({ savedJobs: jobs }),
  
  setProfileInformation: (profile) => 
    set({ profileInformation: profile }),
  
  setComparePrograms: (programs) => 
    set({ comparePrograms: programs }),

  removeSavedProgram: (uuid) =>
    set((state) => {
      if (!state.savedPrograms) return state;
      
      const updatedPrograms = state.savedPrograms.filter(
        program => program.program.uuid !== uuid
      );
      
      return {
        savedPrograms: updatedPrograms.length > 0 ? updatedPrograms : null
      };
    }),

  removeSavedSupervisor: (uuid) =>
    set((state) => {
      if (!state.savedSupervisors) return state;
      
      const updatedSupervisors = state.savedSupervisors.filter(
        supervisor => supervisor.supervisor.uuid !== uuid
      );
      
      return {
        savedSupervisors: updatedSupervisors.length > 0 ? updatedSupervisors : null
      };
    }),

  removeSavedJob: (uuid) =>
    set((state) => {
      if (!state.savedJobs) return state;
      
      const updatedJobs = state.savedJobs.filter(
        job => job.job && job.job.uuid !== uuid
      );
      
      return {
        savedJobs: updatedJobs.length > 0 ? updatedJobs : null
      };
    }),

  removeResearchInterest: (uuid) =>
    set((state) => {
      if (!state.profileInformation) return state;
      
      const updatedResearchInterest = state.profileInformation.researchInterests.filter(
        researchInterest => researchInterest.researchInterest.uuid !== uuid
      );
      
      return {
        profileInformation: { ...state.profileInformation, researchInterests: updatedResearchInterest}
      };
    }),

  setValue: (obj) =>
    set((state) => ({
      savedPrograms: obj.savedPrograms ?? state.savedPrograms,
      profileInformation: obj.profileInformation ?? state.profileInformation,
      savedSupervisors: obj.savedSupervisors ?? state.savedSupervisors,
      savedJobs: obj.savedJobs ?? state.savedJobs,
      comparePrograms: obj.comparePrograms ?? state.comparePrograms,
    })),
}))


export const useSavedPrograms = () => useProfileStore((state) => state.savedPrograms)
export const useSavedSupervisors = () => useProfileStore((state) => state.savedSupervisors)
export const useSavedJobs = () => useProfileStore((state) => state.savedJobs)
export const useProfileInformation = () => useProfileStore((state) => state.profileInformation)
export const useComparePrograms = () => useProfileStore((state) => state.comparePrograms)


export const useSavedProgramsSetter = () => useProfileStore((state) => state.setSavedPrograms)
export const useSavedSupervisorsSetter = () => useProfileStore((state) => state.setSavedSupervisors)
export const useSavedJobsSetter = () => useProfileStore((state) => state.setSavedJobs)
export const useProfileInformationSetter = () => useProfileStore((state) => state.setProfileInformation)
export const useCompareProgramsSetter = () => useProfileStore((state) => state.setComparePrograms)


export const useRemoveSavedProgram = () => useProfileStore((state) => state.removeSavedProgram)
export const useRemoveSavedSupervisor = () => useProfileStore((state) => state.removeSavedSupervisor)
export const useRemoveSavedJob = () => useProfileStore((state) => state.removeSavedJob)