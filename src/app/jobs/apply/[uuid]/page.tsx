import ApplicationForm from '@/@/components/forms/apply-jobs-form'
import JobPosting from '@/@/components/jobs/apply/job-details'
import { getRequest } from '@/@/service/api-handler/get-manager'
import { Suspense } from 'react'

export default async function JobApply({
    params,
  }: {
    params: Promise<{ uuid: string }>
  }) {
    const { uuid } = await params
    const jobDetails = await getJobDetailsData(uuid)
    return (
        <div className="grid grid-cols-7 gap-8">
            <div className="xs:hidden xl:block col-span-5">
                <Suspense>
                    <JobPosting jobDetails={jobDetails}/>
                </Suspense>
            </div>
            <div className="xs:col-span-7 xl:col-span-2">
                <ApplicationForm uuid={uuid}/>
            </div>
        </div>
    )
}

async function getJobDetailsData(uuid: string) {
    try {
        const response = await getRequest(`job/${uuid}`, true)
        return response.result
    } catch (error) {
        console.log(error)
        return null
    }
}