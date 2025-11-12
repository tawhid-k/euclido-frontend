import { patchRequest} from "@/@/service/api-handler/patch-manager";


export async function updateAcademicInterest(uuids : string[]) {
    const url = 'auth/update-academic-interests';
    
    try {
        const response = await patchRequest(url, {
            researchInterestUuids: uuids
        })
        console.log(response)
        if (response.statusCode === 200) {
            return response
        } else {
            return response
        }
    } catch(error) {
        console.log(error) 
        return {
            statusCode: 500,
            message: 'Server error'
        }
    }
}