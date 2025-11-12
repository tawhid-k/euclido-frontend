'use client'
import LoadingSpinner, { JobsOverlay } from '@/@/components/global/skeleton'
import UniversityLogo from '@/@/components/global/university-image'
import EditJob from '@/@/components/jobs/dashboard/edit-job'
import useJobStore from '@/@/context/jobs/dashboard-context'
import { JobCardDetails } from '@/@/lib/types/jobs/job-list'
import { dateFormat, getTimeAgo } from '@/@/utils/format'
import { Drawer, DrawerContent, useDisclosure } from '@heroui/react'
import {
    Award,
    Clock3,
    Settings2,
    Trash2,
    Users
} from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Dashboard() {
    const { 
        activeJobs, 
        draftJobs,
        loading, 
        error, 
        fetchJobs 
    } = useJobStore();

    useEffect(() => {
        if (!activeJobs) {
            fetchJobs();
        }
    }, [fetchJobs]);
    return (
        <div>
            <div className="xs:px-4 xl:px-32 pt-12 flex flex-col gap-8">
            <div className="flex gap-2 text-foreground items-center">
                <Award size={28} strokeWidth={1} className="text-primary" />
                <h1 className="font-semibold text-lg">Active Job Openings</h1>
            </div>

            {/* Error Handling */}
            {error && (
                <div className="text-red-500 text-sm">
                    Failed to load jobs: {error}
                </div>
            )}

            {/* Job Listings */}
            <div className="grid xs:grid-cols-1 xl:grid-cols-3 gap-6">
     
                {loading ? (
                    <div className='col-span-3'><JobsOverlay /></div>
                ) : activeJobs?.result?.length ? (
                    activeJobs.result.map((job, index) => (
                        <PostedJob key={index} job={job} />
                        // <p>Hello World</p>
                    ))
                ) : (
                    <div className="w-full text-center py-8 text-gray-500">
                        Currently there are no active jobs
                    </div>
                )}
            </div>
        </div>
        <div className="xs:px-4 xl:px-32 pt-12 flex flex-col gap-8">
            <div className="flex gap-2 text-foreground items-center">
                <Award size={28} strokeWidth={1} className="text-primary" />
                <h1 className="font-semibold text-lg">Drafts</h1>
            </div>

            {/* Error Handling */}
            {error && (
                <div className="text-red-500 text-sm">
                    Failed to load jobs: {error}
                </div>
            )}

            {/* Job Listings */}
            <div className="grid xs:grid-cols-1 xl:grid-cols-3 gap-4">
     
                {loading ? (
                    <div className='"flex flex-wrap gap-8"'><JobsOverlay /></div>
                ) : draftJobs?.result?.length ? (
                    draftJobs.result.map((job, index) => (
                        <PostedJob key={index} job={job} />
                        // <p>Hello World</p>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-8 text-gray-500">
                        Currently there are no draft jobs
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

const PostedJob = ({ job }: { job: JobCardDetails }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { removeJob, loading, fetchJobs } = useJobStore(); 
    // TODO: 
    // Job Details - Experience, Posted Duration
    return (
        
        <div className="flex flex-col gap-2 bg-white border-2 border-lightgray rounded-xl p-4 max-w-md relative shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <UniversityLogo
                        path={job.university.logo}
                        name="university logo"
                        size={50}
                    />
                    <div>
                        <h2
                            onClick={onOpen}
                            className="text-sm font-semibold text-gray-900 cursor-pointer"
                        >
                            {job.jobTitle} 
                        </h2>
                        <p className='text-foreground text-xs'>{job.discipline.name}</p>
                        <Drawer
                            size="4xl"
                            isKeyboardDismissDisabled={true}
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                        >
                            <DrawerContent>
                                <EditJob 
                                    uuid={job.uuid} 
                                    onClose={() => {
                                        onClose();
                                        fetchJobs(); // Refresh the job list after update
                                    }} 
                                />
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
                <span className="badge-style">{job.jobType}</span>
                <span className="badge-style">{job.jobMode}</span>
                <span className="badge-style">
                    Application Deadline - {dateFormat(job.applicationDeadlineTimestamp)}
                </span>
            </div>
            <Link href={`/jobs/applicants/${job.uuid}`}>
                <span className={`${job.applicants.length === 0? 'bg-[#FFD6DD]' : 'bg-[#D6FFDB]'} max-w-fit text-green-800 text-xs font-medium py-2 px-4 rounded-lg`}>
                    {job.applicants.length} Applicants
                </span>
            </Link>

            {/* Footer */}
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                    <Clock3 size={16} />
                    <span>{getTimeAgo(job.createdAt)}</span>
                </div>

                <div className="flex gap-2 items-center">
                    <Link href={`/jobs/applicants/${job.uuid}`} className="bg-[#F9F9F9] rounded-full p-2 border-[#F1F6F7] border-2">
               
                        
                    
                        <Users
                            size={22}
                            strokeWidth={1.5}
                            className="text-[#55AD5F]"
                        />
                    </Link>
                    {job.isDraft && <button
                        onClick={async () => {
                            try {
                                if (window.confirm('Are you sure you want to delete this job?')) {
                                    await removeJob(job.uuid, 'draft');
                                    // Optional: Add a toast notification for success
                                    // toast.success('Job deleted successfully');
                                }
                            } catch (error) {
                                // Optional: Add a toast notification for error
                                // toast.error('Failed to delete job');
                                console.error('Failed to delete job:', error);
                            }
                        }}
                        disabled={loading} // Disable button while loading
                        type="button" // Changed from submit to button as it's not in a form
                        className={`bg-[#F9F9F9] rounded-full p-2 border-[#F1F6F7] border-2 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? (
                            <LoadingSpinner  />
                        ) : (
                            <Trash2
                                size={22}
                                strokeWidth={1.5}
                                className="text-[#FF8989]"
                            />
                        )}
                    </button>}
                    {job.isActive && <button
                        type="submit"
                        className="bg-[#F9F9F9] rounded-full p-2 border-[#F1F6F7] border-2"
                    >
                        <Settings2
                            size={22}
                            strokeWidth={1.5}
                            className="text-primary"
                        />
                    </button>}
                </div>
            </div>
        </div>
    )
}
