import { useProfileStore } from "@/@/context/dashboard-context"
import { JobCardType } from "@/@/lib/types/jobs/job-list"
import JobCard from "../../jobs/landing/job-card"

export default function ProfileSavedJobs() {
    const bookmarkedJobs = useProfileStore().savedJobs
    
    if (!bookmarkedJobs || bookmarkedJobs.length === 0) {
        return <div className="text-center py-8">No bookmarked jobs found</div>
    }
    
    return (
        <div className="grid grid-cols-3 gap-4">
           {bookmarkedJobs.map((bookmarkedJob, index) => {
        
             const jobData = bookmarkedJob.job;
             
             const job = {
               ...jobData,
               isBookmarked: true, 
               university: { name: "Unknown", logo: "", city: "", countryCode: "" } as any,
               discipline: { name: "Unknown" } as any,
               subDiscipline: { name: "Unknown" } as any,
               recruiter: {} as any,
               applicants: []
             } as JobCardType;
             
             return <JobCard key={index} job={job} />
           })}
        </div>
    )
}