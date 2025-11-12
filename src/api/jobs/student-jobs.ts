import { postRequest, postRequestForm } from "@/@/service/api-handler/post-manager"

export async function postJobApplication(formData: FormData) {
    const response = await postRequestForm('secure/job/apply', formData)
    return response
}

export async function toggleJobBookmark(jobUuid:string, isBookmarked:boolean) {

    try {
        const response = await postRequest('secure/bookmarks', {
            jobUuid: jobUuid
        });
        if (response.statusCode === 201) {
            return { 
                success: true, 
                message: response.message,
                statusCode: response.statusCode
            };
        } else {
            return { 
                success: false, 
                message: response.message || "Failed to update bookmark",
                statusCode: response.statusCode
            };
        }
    } catch (error) {
        return { 
            success: false, 
            message: "Network error. Please try again."
        };
    }
}