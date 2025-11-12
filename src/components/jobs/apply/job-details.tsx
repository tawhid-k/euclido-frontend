import React from 'react'
import UniversityLogo from '../../global/university-image'
import { badgeStyle } from '@/@/lib/styles'
import Image from 'next/image'
import { Clock3 } from 'lucide-react'
import { JobCardDetails } from '@/@/lib/types/jobs/job-list'
import { Capitalize, dateFormat, getTimeAgo } from '@/@/utils/format'
import RichTextViewer from '../../global/rich-text-viewer'

interface JobPostingProps {
    position: string
    department: string
    supervisor: {
        name: string
        title: string
        image: string
    }
    discipline: string
    subDiscipline: string
    applicationDeadline: string
    startDate: string
    duration: string
    description: string
    responsibilities: string[]
    qualifications: {
        required: string[]
        preferred: string[]
    }
    applicationProcess: string[]
}

const JobPosting: React.FC<{ jobDetails: JobCardDetails }> = ({ jobDetails }) => {

    return (
        <div className="max-w-4xl mx-auto p-6 text-foreground">
            {/* Header */}
            <div className="text-center mb-8 flex flex-col items-center">
                <UniversityLogo
                    path={jobDetails.university.logo}
                    size={56}
                    name={jobDetails.university.name}
                />
                <h1 className="mt-4 text-xl font-semibold text-foreground">
                    {jobDetails.jobTitle}
                </h1>
                <p className="text-foreground text-sm">{jobDetails.discipline.name}</p>
            </div>
            {/* Start ## */}
            <div className="flex flex-col gap-8 mb-12 items-center">
                {/* Top row of tags */}
                <div className="flex justify-between gap-4">
                    {/* FIXME: Used Capitazier */}
                    <span className="badge-style">{Capitalize(jobDetails.jobType)}</span>
                    <span className="badge-style">{Capitalize(jobDetails.jobMode)}</span>
                    <span className="badge-style">
                        Minimum Qualification - {Capitalize(jobDetails.minimumQualification)}
                    </span>
                    <span className="badge-style">{jobDetails.university.name}</span>
                    <span className="badge-style">{`${Capitalize(jobDetails.university.city)}, ${Capitalize(jobDetails.university.countryCode)}`}</span>
                </div>

                {/* Job details grid */}
                <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-1 px-4 py-2 border-2 rounded-xl border-lightgray">
                        <p className="text-xs text-foreground">Discipline</p>
                        <p className="text-primary text-sm font-semibold">
                            {jobDetails.discipline.name}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-2 border-2 rounded-xl border-lightgray">
                        <p className="text-xs text-foreground">
                            Sub-discipline
                        </p>
                        <p className="text-primary text-sm font-semibold">
                            {jobDetails.subDiscipline.name}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-2 border-2 rounded-xl border-lightgray">
                        <p className="text-xs text-foreground">
                            Application Deadline
                        </p>
                        <p className="text-primary text-sm font-semibold">
                            {dateFormat(jobDetails.applicationDeadlineTimestamp)}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-2 border-2 rounded-xl border-lightgray">
                        <p className="text-xs text-foreground">Start Date</p>
                        <p className="text-primary text-sm font-semibold">
                            {dateFormat(jobDetails.startDateTimestamp)}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-2 border-2 rounded-xl border-lightgray">
                        <p className="text-xs text-foreground">Duration</p>
                        <p className="text-primary text-sm font-semibold">
                            {jobDetails.duration}
                        </p>
                    </div>
                </div>

                {/* Professor info */}
                <div className="flex items-center gap-4 bg-flashwhite w-full p-4 rounded-2xl">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                        <Image
                            className="rounded-full p-1 border border-lightblue"
                            src={jobDetails.recruiter.avatarPath || '/common.png'}
                            width={60}
                            height={60}
                            loading="lazy"
                            style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'contain'
                            }}
                            alt={'Supervisor'}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-foreground font-medium text-sm">
                            {jobDetails.recruiter.firstName + ' ' + jobDetails.recruiter.lastName}
                        </h3>
                        {/* TODO: Recruiter info needed */}
                        {/* <p className="text-foreground text-xs">
                            Professor of Cybersecurity
                        </p>
                        <p className="text-foreground text-xs">PhD, MSc, MA</p> */}
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-[#757575] text-xs">
                        <Clock3 size={16} className="text-[#757575]" />
                        <span>{getTimeAgo(jobDetails.createdAt)}</span>
                    </div>
                </div>
            </div>
            {/* End ## */}
            <RichTextViewer contentString={jobDetails.jobDescription}/>
            <RichTextViewer contentString={jobDetails.applicationRequirement}/>
        </div>
    )
}

export default JobPosting
