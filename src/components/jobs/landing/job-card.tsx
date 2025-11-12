'use client'

import React from 'react'
import UniversityLogo from '../../global/university-image'
import { Bookmark, Clock3, School } from 'lucide-react'
import { Drawer, DrawerContent, useDisclosure } from '@heroui/react'
import JobDetails from '../jobs-list/jobs-details'
import { JobCardType } from '@/@/lib/types/jobs/job-list'
import { dateFormat, getTimeAgo } from '@/@/utils/format'
import { useProfileStore } from '@/@/context/dashboard-context'
import { toggleJobBookmark } from '@/@/api/jobs/student-jobs'
import { useAppSelector } from '@/@/app/store/hooks'
import JobBookmarkButton from '../actions/bookmarks'

const JobCard = ({job} : {job:JobCardType}) => {
    const userType = useAppSelector((state) => state.auth.user?.userType)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const removeSavedJob = useProfileStore((state) => state.removeSavedJob)
    const [isBookmarked, setIsBookmarked] = React.useState(job.isBookmarked || false)
    return (
        <div className="flex max-auto flex-col gap-2 bg-white border-2 border-lightgray rounded-xl p-4 w-full h-full relative">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <UniversityLogo
                        path={job.university.logo}
                        name={job.university.name}
                        size={48}
                    />
                    <div>
                        <div className="max-w-fit">
                            <h2
                                onClick={onOpen}
                                className="text-sm cursor-pointer font-semibold text-foreground"
                            >
                                {job.jobTitle}
                            </h2>
                            <Drawer
                                size="4xl"
                                isKeyboardDismissDisabled={true}
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                            >
                                <DrawerContent>
                                    <JobDetails job={job}/>
                                </DrawerContent>
                            </Drawer>
                        </div>
                        <p className="text-xs text-foreground">{job.discipline.name} </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                <span className="badge-style">{job.jobType}</span>
                <span className="badge-style">{job.jobMode}</span>
                <span className="badge-style">{job.minimumQualification}</span>
                <span className="badge-style">
                    Application Deadline - {dateFormat(job.applicationDeadlineTimestamp)}
                </span>
            </div>

            {/* Third Row  */}
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 mt-5 text-xs">
                    <School
                        size={22}
                        className="text-foreground"
                        strokeWidth={1.5}
                    />
                    <div className="flex flex-col items-start text-foreground">
                        <span>{job.university.name}</span>
                        <span className="text-foreground/60">
                            {job.university.city}, {job.university.countryCode}
                        </span>
                    </div>
                </div>
                {/* Posted Time */}
                <div className="flex flex-col items-end">
                
                {userType === 'student' && <JobBookmarkButton job={job} />}
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                        <Clock3 size={16} className="text-gray-500" />
                        <span>{getTimeAgo(job.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobCard
