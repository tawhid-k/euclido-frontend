'use client'

import { ArrowRight, Paperclip, Users } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Drawer, DrawerContent, useDisclosure } from '@heroui/react'
import ApplicantDetails from './applicant-details'
import useJobStore from '@/@/context/jobs/dashboard-context'
import { ApplicantType } from '@/@/lib/types/jobs/job-list'
import { dateFormat, dateFormat2 } from '@/@/utils/format'
import UniversityLogo from '../../global/university-image'
import LoadingSpinner from '../../global/skeleton'
import { useEffect } from 'react'

const ApplicantCard = ({jobUuid, applicant }: { jobUuid: string, applicant: ApplicantType  }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    
    return (
        <div className="flex items-center justify-between px-4 py-2 border-2 border-lightgray rounded-2xl bg-white mb-3">
            <div className="flex items-center gap-3">
                <Image
                    className="rounded-full p-1 border border-lightblue"
                    src={'/common.png'}
                    width={60}
                    height={60}
                    loading="lazy"
                    style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'contain'
                    }}
                    alt={'Alex'}
                />
                <div>
                    <h3 className="text-sm text-foreground font-medium">
                        {applicant.user.firstName} {applicant.user.lastName}
                    </h3>
                    <p className="text-xs text-foreground">
                        {'City, Country'}
                    </p>
                </div>
            </div>
            <p className="text-foreground text-xs">{dateFormat2(applicant.createdAt)}</p>

            <div className="flex items-center text-foreground text-xs">
                <span className="mr-1">
                    <Paperclip
                        className="text-foreground"
                        size={22}
                        strokeWidth={1}
                    />
                </span>

                <span>{applicant.jobApplicationAttachments.length}</span>
            </div>
            {applicant.isShortListed && <span
                className={`px-2 py-1 font-medium text-xs text-foreground rounded-md bg-green-100`}
            >
                Shortlisted
            </span>}
            {applicant.isRejected && <span
                className={`px-2 py-1 font-medium text-xs text-foreground rounded-md bg-red-100`}
            >
                Rejected
            </span>}
            {(!applicant.isShortListed && !applicant.isRejected) && <span
                className={`px-2 py-1 font-medium text-xs text-foreground rounded-md bg-yellow-100`}
            >
                Pending
            </span>}
            <button
                onClick={onOpen}
                className="bg-secondary p-2 inline-flex rounded-full"
            >
                <ArrowRight
                    className="text-foreground"
                    size={20}
                    strokeWidth={1}
                />
                <Drawer
                    size="xl"
                    isKeyboardDismissDisabled={true}
                    isOpen={isOpen}
                    isDismissable={true}
                    onOpenChange={onOpenChange}
                >
                    <DrawerContent>
                        <ApplicantDetails jobUuid={jobUuid} applicant={applicant}/>
                    </DrawerContent>
                </Drawer>
            </button>
        </div>
    )
}

const JobApplicantsList: React.FC<{ uuid: string }> = ({ uuid }) => {
    const jobStore = useJobStore()
    const currentJob = jobStore.getActiveJobByUuid(uuid)
    const fetchJobs = jobStore.fetchJobs

    useEffect(() => {
        if (!currentJob) {
            console.log('The function is called')
            fetchJobs()
        }
    }, [uuid, currentJob, fetchJobs])

    const [selected, setSelected] = useState<
        'all' | 'shortlisted' | 'rejected'
    >('all')
    return (
        <div className="pt-6 flex flex-col items-start gap-8">
            <div className="flex items-center gap-12">
                <div className="flex gap-2 items-center">
                    <Users
                        size={26}
                        strokeWidth={1.5}
                        className="text-primary"
                    />
                    <span className="text-foreground text-lg font-medium">
                        Job Applicants
                    </span>
                </div>
                <menu className="flex gap-6 items-center">
                    <button
                        onClick={() => setSelected('all')}
                        className={`${
                            selected === 'all'
                                ? 'font-medium text-primary'
                                : 'font-normal text-primary/70'
                        }`}
                    >
                        All ({currentJob?.applicants.length})
                    </button>
                    {/* TODO: Shortlisted and Rejected View Separation */}
                    {/* <button
                        onClick={() => setSelected('shortlisted')}
                        className={`${
                            selected === 'shortlisted'
                                ? 'font-medium text-primary'
                                : 'font-normal text-primary/70'
                        }`}
                    >
                        Shortlisted (20)
                    </button>
                    <button
                        onClick={() => setSelected('rejected')}
                        className={`${
                            selected === 'rejected'
                                ? 'font-medium text-primary'
                                : 'font-normal text-primary/70'
                        }`}
                    >
                        Rejected (57)
                    </button> */}
                </menu>
            </div>
            <div className="w-full">
                {currentJob?.applicants.map((applicant, index) => (
                    <ApplicantCard key={index} jobUuid={uuid} applicant={applicant} />
                ))}
            </div>
        </div>
    )
}

export default JobApplicantsList


export function JobHeading({uuid} : {uuid : string}) {
    const jobStore = useJobStore()
    const currentJob = jobStore.getActiveJobByUuid(uuid)
    const fetchJobs = jobStore.fetchJobs

    useEffect(() => {
        if (!currentJob) {
            fetchJobs()
        }
    }, [uuid, currentJob, fetchJobs])

    if (!currentJob) {
        return <LoadingSpinner />
    }
    return (
        <div className="xl:mt-10 flex flex-col gap-4 items-center justify-center">
                <UniversityLogo
                    size={80}
                    path={currentJob?.university.logo}
                    name={currentJob?.university.name}
                />
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-foreground">
                        {currentJob.jobTitle}
                    </h2>
                    <p className="text-foreground">{currentJob.discipline.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                            <span className="badge-style">{currentJob.jobType}</span>
                            <span className="badge-style">{currentJob.jobMode}</span>
                            <span className="badge-style">
                                Minimum Qualification - {currentJob.minimumQualification}
                            </span>
                            <span className="badge-style">
                                {currentJob.university.name}
                            </span>
                            <span className="badge-style">
                                {currentJob.university.city}, {currentJob.university.countryCode}
                            </span>
                        </div>
            </div>
    )
}