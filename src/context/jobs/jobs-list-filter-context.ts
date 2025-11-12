import { JobCardDetails } from '@/@/lib/types/jobs/job-list'
import { create } from 'zustand'
import { postRequest } from '@/@/service/api-handler/post-manager'
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

interface JobsListState {
    jobs: JobCardDetails[] | null
    meta: Meta | null
    links: Links
}

interface JobsListStore extends JobsListState {
    setJobs: (jobs : JobCardDetails[]) => void
    clearJobs: () => void
    setMeta: (meta: Meta) => void
    setLinks: (links: Links) => void

    updateJobBookmark: (jobId: string, isBookmarked: boolean) => void
    toggleJobBookmark: (jobId: string) => {
        success: boolean;
        message: string;
        statusCode?: number;
    }
}

const initialState: JobsListState = {
    jobs: null,
    meta: null,
    
    links: {
        first: null,
        previous: null,
        next: null,
        last: null
    }
}

const useJobsListStore = create<JobsListStore>((set, get) => ({
    ...initialState,

    setJobs: (jobs) => set({ jobs }),
    clearJobs: () => set({ jobs: null }),
    setMeta: (meta) => set({ meta }),
    setLinks: (links) => set({ links }),
    
    updateJobBookmark: (jobId, isBookmarked) =>
        set((state) => ({
            jobs: state.jobs 
                ? state.jobs.map(job => 
                    job.uuid === jobId 
                        ? { ...job, isBookmarked } 
                        : job
                  )
                : null
        })),
        
    toggleJobBookmark: (jobId) => {
        const state = get();
        const job = state.jobs?.find(job => job.uuid === jobId);
        
        if (!job) {
            return { 
                success: false, 
                message: "Job not found" 
            };
        }
        
        const currentBookmarkState = job.isBookmarked!;
        state.updateJobBookmark(jobId, !currentBookmarkState);
        
        return { 
            success: true, 
            message: currentBookmarkState ? "Bookmark removed" : "Job bookmarked",
            statusCode: 200
        };
    }
}))

export default useJobsListStore