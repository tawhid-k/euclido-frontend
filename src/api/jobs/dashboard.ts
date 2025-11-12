import { deleteRequestWithToken } from "@/@/service/api-handler/delete-manager"
import { getRequestWithToken } from "@/@/service/api-handler/get-manager"
import { patchRequest } from "@/@/service/api-handler/patch-manager"

export async function getActiveJobsList() {
    const jobsList = await getRequestWithToken('secure/job/active', false)
    return jobsList
}

export async function getClosedJobsList() {
    const jobsList = await getRequestWithToken('secure/job/closed', false)
    return jobsList
}

export async function getDraftJobsList() {
    const jobsList = await getRequestWithToken('secure/job/draft', false)
    return jobsList
}

export async function deleteJob(uuid: string) {
    const response = deleteRequestWithToken(`secure/job/${uuid}`)
    return response
}

export async function getJobDetails(uuid: string) {
    const jobDetails = await getRequestWithToken(`secure/job/${uuid}`, true)
    console.log(jobDetails)
    return jobDetails
}

export async function shortListApplicant(jobUuid: string, applicantUuid: string) {
    console.log(`secure/job/shortlist/${jobUuid}/${applicantUuid}`)
    const response = await patchRequest(`secure/job/shortlist/${jobUuid}/${applicantUuid}`, {})
    return response
}

export async function rejectApplicant(jobUuid: string, applicantUuid: string) {
    console.log(`secure/job/shortlist/${jobUuid}/${applicantUuid}`)
    const response = await patchRequest(`secure/job/reject/${jobUuid}/${applicantUuid}`, {})
    return response
}

export async function getApplicantDetails(jobUuid: string, applicantUuid: string) {
    const jobsList = await getRequestWithToken(`secure/job/${jobUuid}/${applicantUuid}`, false)
    if (jobsList.statusCode === 200) {
        return jobsList.result
    } else {
        return null
    }
}