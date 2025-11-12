import JobApplicantsList, { JobHeading } from '@/@/components/jobs/dashboard/applicants-list'

import React from 'react'

export default async function JobApplicants({
    params
}: {
    params: Promise<{ uuid: string }>
}) {
    const { uuid } = await params
    
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <JobHeading uuid={uuid}/>
            <JobApplicantsList uuid={uuid} />
        </div>
    )
}
