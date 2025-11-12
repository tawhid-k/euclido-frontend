'use client'
import Filter from '@/@/components/global/filter/filter'
import JobCard from '@/@/components/jobs/landing/job-card'
import { useJobData } from '@/@/hooks/useJobData'
import { JobCardType } from '@/@/lib/types/jobs/job-list'
import { SeparatorVerticalIcon } from 'lucide-react'
import { Suspense } from 'react'
import { useJobFiltering } from '@/@/hooks/useJobFiltering'
import { JobsOverlay, ProgramsOverlay } from '@/@/components/global/skeleton'
import useJobsListStore from '@/@/context/jobs/jobs-list-filter-context'
import JobsNavigation from '@/@/components/jobs/jobs-list/jobs-navigation'

function JobsList() {
    const { isLoading } = useJobFiltering()
    const { jobs, meta } = useJobsListStore()

    return (
        <div className="xs:px-2 xs:py-1 lg:px-20 lg:pb-16">
            <div className="lg:p-4 grid xs:grid-cols-1 lg:grid-cols-7 lg:gap-x-8">
                <div className="z-0 xs:hidden lg:block lg:col-span-2 lg:pt-4">
                    <div className="sticky top-20">
                        <Filter />
                    </div>
                </div>
                {((!isLoading && jobs)) ? 
                <div className="col-span-5 pt-4">
                    <div className="relative flex justify-between items-center pb-4">
                        <div className="flex items-center gap-4 text-foreground/70 font-medium xs:text-xs lg:text-sm">
                            <span>{`Page ${meta?.currentPage} of ${meta?.totalPages}`}</span>

                            <SeparatorVerticalIcon
                                strokeWidth={1.5}
                                className="text-lightblue"
                            />
                            <span>{`${meta?.totalItems} job openings`}</span>
                        </div>
                        <div className="hidden xl:flex gap-4">
                            {/* <Suspense>
                                <SelectedFilters />
                            </Suspense> */}
                        </div>
                    </div>
                    <div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-4 max-w-fit">
                        {jobs.map((job: JobCardType, index : number) => (
                            <JobCard key={index} job={job} />
                        ))}
                        <JobsNavigation />
                    </div>
                </div> : <div className='col-span-5 pt-4'><JobsOverlay /></div>}
                
            </div>
        </div>
    )
}


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobsList />
        </Suspense>
    )
}
