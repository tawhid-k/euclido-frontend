import { create } from 'zustand';
import axios from 'axios';
import { JobApiResponse, JobCardDetails } from '@/@/lib/types/jobs/job-list';
import { deleteJob, getActiveJobsList, getClosedJobsList, getDraftJobsList } from '@/@/api/jobs/dashboard';

interface JobStore {
  activeJobs: JobApiResponse | null;
  draftJobs: JobApiResponse | null;
  closedJobs: JobApiResponse | null;
  loading: boolean;
  error: string | null;
  
  fetchJobs: () => Promise<void>;
  updateJobStatus: (uuid: string, updates: { isActive?: boolean; isDraft?: boolean }) => Promise<void>;
  addJob: (job: JobCardDetails, category: 'active' | 'draft' | 'closed') => Promise<void>;
  getActiveJobByUuid: (uuid: string) => JobCardDetails | undefined; 
  removeJob: (uuid: string, category: 'active' | 'draft' | 'closed') => Promise<void>;
  reset: () => void;
}

const useJobStore = create<JobStore>((set, get) => ({
  activeJobs: null,
  draftJobs: null,
  closedJobs: null,
  error: null,
  loading: false,
  
  fetchJobs: async () => {
    try {
      set({ loading: true, error: null });
      const [activeJobResponse, closedJobResponse, draftJobResponse] = await Promise.all([
        getActiveJobsList(),
        getClosedJobsList(),
        getDraftJobsList()
      ]);
      set({ activeJobs: activeJobResponse, closedJobs: closedJobResponse, draftJobs: draftJobResponse, loading: false });
    
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch jobs', 
        loading: false 
      });
    }
  },
  getActiveJobByUuid: (uuid: string) => {
    const { activeJobs } = get();
    if (!activeJobs) return undefined;
    return activeJobs.result.find(job => job.uuid === uuid);
  },
  updateJobStatus: async (uuid: string, updates: { isActive?: boolean; isDraft?: boolean }) => {
    try {
      set({ loading: true, error: null });
      
      // Make API call to update job status
      await axios.patch(`/api/jobs/${uuid}`, updates);
      
      // Update local state based on the new status
      const { activeJobs, draftJobs, closedJobs } = get();
      
      // Helper function to find and remove a job from a category
      const removeJobFromCategory = (jobs: JobApiResponse | null, id: string) => {
        if (!jobs) return jobs;
        return {
          ...jobs,
          result: jobs.result.filter(job => job.uuid !== id),
          meta: {
            ...jobs.meta,
            totalItems: jobs.meta.totalItems - 1,
            itemCount: jobs.meta.itemCount - 1
          }
        };
      };
      
      // Find the job in any of the categories
      const findJob = (): JobCardDetails | undefined => {
        if (activeJobs && activeJobs.result.some(job => job.uuid === uuid)) {
          return activeJobs.result.find(job => job.uuid === uuid);
        }
        if (draftJobs && draftJobs.result.some(job => job.uuid === uuid)) {
          return draftJobs.result.find(job => job.uuid === uuid);
        }
        if (closedJobs && closedJobs.result.some(job => job.uuid === uuid)) {
          return closedJobs.result.find(job => job.uuid === uuid);
        }
        return undefined;
      };
      
      const job = findJob();
      if (!job) {
        throw new Error('Job not found');
      }
      
      // Create updated job with new status
      const updatedJob = { ...job, ...updates };
      
      // Remove job from all categories
      let newActiveJobs = removeJobFromCategory(activeJobs, uuid);
      let newDraftJobs = removeJobFromCategory(draftJobs, uuid);
      let newClosedJobs = removeJobFromCategory(closedJobs, uuid);
      
      // Add job to appropriate category based on new status
      if (updates.isActive === true && updates.isDraft === false) {
        // Active job
        if (newActiveJobs) {
          newActiveJobs = {
            ...newActiveJobs,
            result: [updatedJob, ...newActiveJobs.result],
            meta: {
              ...newActiveJobs.meta,
              totalItems: newActiveJobs.meta.totalItems + 1,
              itemCount: newActiveJobs.meta.itemCount + 1
            }
          };
        }
      } else if (updates.isDraft === true) {
        // Draft job
        if (newDraftJobs) {
          newDraftJobs = {
            ...newDraftJobs,
            result: [updatedJob, ...newDraftJobs.result],
            meta: {
              ...newDraftJobs.meta,
              totalItems: newDraftJobs.meta.totalItems + 1,
              itemCount: newDraftJobs.meta.itemCount + 1
            }
          };
        }
      } else if (updates.isActive === false && updates.isDraft === false) {
        // Closed job
        if (newClosedJobs) {
          newClosedJobs = {
            ...newClosedJobs,
            result: [updatedJob, ...newClosedJobs.result],
            meta: {
              ...newClosedJobs.meta,
              totalItems: newClosedJobs.meta.totalItems + 1,
              itemCount: newClosedJobs.meta.itemCount + 1
            }
          };
        }
      }
      
      set({
        activeJobs: newActiveJobs,
        draftJobs: newDraftJobs,
        closedJobs: newClosedJobs,
        loading: false
      });
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update job status', 
        loading: false 
      });
    }
  },
  
  addJob: async (job: JobCardDetails, category: 'active' | 'draft' | 'closed') => {
    try {
      set({ loading: true, error: null });
      
      const state = get();
      if (category === 'active' && state.activeJobs) {
        set({
          activeJobs: {
            ...state.activeJobs,
            result: [job, ...state.activeJobs.result],
            meta: {
              ...state.activeJobs.meta,
              totalItems: state.activeJobs.meta.totalItems + 1,
              itemCount: state.activeJobs.meta.itemCount + 1
            }
          },
          loading: false
        });
      } else if (category === 'draft' && state.draftJobs) {
        set({
          draftJobs: {
            ...state.draftJobs,
            result: [job, ...state.draftJobs.result],
            meta: {
              ...state.draftJobs.meta,
              totalItems: state.draftJobs.meta.totalItems + 1,
              itemCount: state.draftJobs.meta.itemCount + 1
            }
          },
          loading: false
        });
      } else if (category === 'closed' && state.closedJobs) {
        set({
          closedJobs: {
            ...state.closedJobs,
            result: [job, ...state.closedJobs.result],
            meta: {
              ...state.closedJobs.meta,
              totalItems: state.closedJobs.meta.totalItems + 1,
              itemCount: state.closedJobs.meta.itemCount + 1
            }
          },
          loading: false
        });
      }
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add job', 
        loading: false 
      });
    }
  },
  
  removeJob: async (uuid: string, category: 'active' | 'draft' | 'closed'): Promise<void> => {
    try {
 
      await deleteJob(uuid);
      
      const state = get();
      
      if (category === 'active' && state.activeJobs) {
        set({
          activeJobs: {
            ...state.activeJobs,
            result: state.activeJobs.result.filter(job => job.uuid !== uuid),
            meta: {
              ...state.activeJobs.meta,
              totalItems: state.activeJobs.meta.totalItems - 1,
              itemCount: state.activeJobs.meta.itemCount - 1
            }
          }
          // Don't set loading: false here
        });
      } else if (category === 'draft' && state.draftJobs) {
        set({
          draftJobs: {
            ...state.draftJobs,
            result: state.draftJobs.result.filter(job => job.uuid !== uuid),
            meta: {
              ...state.draftJobs.meta,
              totalItems: state.draftJobs.meta.totalItems - 1,
              itemCount: state.draftJobs.meta.itemCount - 1
            }
          }
          // Don't set loading: false here
        });
      } else if (category === 'closed' && state.closedJobs) {
        set({
          closedJobs: {
            ...state.closedJobs,
            result: state.closedJobs.result.filter(job => job.uuid !== uuid),
            meta: {
              ...state.closedJobs.meta,
              totalItems: state.closedJobs.meta.totalItems - 1,
              itemCount: state.closedJobs.meta.itemCount - 1
            }
          }
          // Don't set loading: false here
        });
      }
      
      return; // Function returns void
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to remove job'
        // Don't set loading: false here
      });
      throw error; // Re-throw to handle in component
    }
  },
  
  reset: () => set({ activeJobs: null, draftJobs: null, closedJobs: null, loading: false, error: null })
}));

export default useJobStore;