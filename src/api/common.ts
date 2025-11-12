import { getRequest, getRequestWithToken } from "../service/api-handler/get-manager"

export const getUniversityList = async () => {
    const response = await getRequest('university', true)
    return response.result
 }


 export const getDisciplineList = async () => {
    const response = await getRequest('discipline', true)
    return response.result
 }


 export const getSubDisciplineList = async (parentDisciplineUuid: string) => {
    const response = await getRequest(`discipline/sub-discipline/${parentDisciplineUuid}`, true)
    return response.result
 }

export const getJobDetails = async (uuid: string) => {
    const response = await getRequestWithToken(`secure/job/${uuid}`, true)
    return response.result
}