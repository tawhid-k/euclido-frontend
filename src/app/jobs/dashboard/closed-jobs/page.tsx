'use client'
import { useEffect, useState } from 'react'
import {
    Award,
    Clock3,
    Trash2,
    Users
} from 'lucide-react'
import { Drawer, DrawerContent, useDisclosure } from '@heroui/react'
import UniversityLogo from '@/@/components/global/university-image'
import Link from 'next/link'
import useJobStore from '@/@/context/jobs/dashboard-context'
import LoadingSpinner from '@/@/components/global/skeleton'
import { JobCardDetails } from '@/@/lib/types/jobs/job-list'
import { dateFormat } from '@/@/utils/format'
import EditJob from '@/@/components/jobs/dashboard/edit-job'


export default function ClosedJobs() {
    const { 
        closedJobs,
        loading, 
        error, 
        fetchJobs
    } = useJobStore();

    useEffect(() => {
        if (!closedJobs) {
            fetchJobs();
        }
    }, [fetchJobs]);
    return (
        <div className="px-32 pt-12 flex flex-col gap-8">
            <div className="flex gap-2 text-foreground items-center">
                <Award size={28} strokeWidth={1} className="text-primary" />
                <h1 className="font-semibold text-lg">Closed Jobs</h1>
            </div>

            {/* Error Handling */}
            {error && (
                <div className="text-red-500 text-sm">
                    Failed to load jobs: {error}
                </div>
            )}

            {/* Job Listings */}
            <div className="flex flex-wrap gap-8">
     
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    closedJobs?.result?.map((job, index) => (
                        <PostedJob key={index} job={job} />
                        // <p>Hello World</p>
                    ))
                )}
            </div>
        </div>
    )
}

const PostedJob = ({ job }: { job: JobCardDetails }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { removeJob } = useJobStore(); // Remove loading from here
    const [isDeleting, setIsDeleting] = useState(false); // Add local loading state
    
    // TODO: 
    // Job Details - Experience, Posted Duration
    return (
        
        <div className="flex flex-col gap-2 bg-white border-2 border-lightgray rounded-xl p-4 max-w-md relative shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <UniversityLogo
                        path="university-of-waterloo.png"
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
                                <EditJob uuid={job.uuid} />
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
            <Link href={`/jobs/applicants/${job.id}`}>
                <span className={`${job.applicants.length === 0? 'bg-[#FFD6DD]' : 'bg-[#D6FFDB]'} max-w-fit text-green-800 text-xs font-medium py-2 px-4 rounded-lg`}>
                    {job.applicants.length} Applicants
                </span>
            </Link>

            {/* Footer */}
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                    <Clock3 size={16} />
                    {/* <span>Posted {job.postedDuration}</span> */}
                </div>

                <div className="flex gap-2 items-center">
                    <button
                        type="submit"
                        className="bg-[#F9F9F9] rounded-full p-2 border-[#F1F6F7] border-2"
                    >
                        <Users
                            size={22}
                            strokeWidth={1.5}
                            className="text-[#55AD5F]"
                        />
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                if (window.confirm('Are you sure you want to delete this job?')) {
                                    setIsDeleting(true); 
                                    await removeJob(job.uuid, 'closed');
                                }
                            } catch (error) {
                                setIsDeleting(false); 
                                console.error('Failed to delete job:', error);
                            } finally {
                                setIsDeleting(false);
                            }
                        }}
                        disabled={isDeleting} // Use local loading state
                        type="button"
                        className={`bg-[#F9F9F9] rounded-full p-2 border-[#F1F6F7] border-2 ${
                            isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isDeleting ? (
                            <LoadingSpinner />
                        ) : (
                            <Trash2
                                size={22}
                                strokeWidth={1.5}
                                className="text-[#FF8989]"
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
