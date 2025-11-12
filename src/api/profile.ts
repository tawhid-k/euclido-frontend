import { bookmarkedProgramsArraySchema } from "../lib/types/bookmarked-program-type"
import { getRequestWithToken } from "../service/api-handler/get-manager"

export async function fetchPersonalData() {
    const userInfoData = await getRequestWithToken('auth/my-profile')
    return userInfoData.result
}

export async function fetchBookmarkedPrograms() {
    const bookmarkedProgramsData = await getRequestWithToken(
        'secure/bookmarks/program'
    )
    const parsedData = bookmarkedProgramsArraySchema.safeParse(
        bookmarkedProgramsData.result
    )
    if (parsedData.error) {
        console.log(parsedData.error.message)
    }
    return parsedData.data || []
}

export async function fetchBookmarkedSupervisors() {
    const bookmarkedSupervisorsData = await getRequestWithToken(
        'secure/bookmarks/supervisor'
    )
    return bookmarkedSupervisorsData.result
}

export async function fetchBookmarkedJobs() {
    const bookmarkedSupervisorsData = await getRequestWithToken(
        'secure/bookmarks/jobs'
    )
    // FIXME: I am getting one extra null job in the response. 
    //console.log(bookmarkedSupervisorsData.result)
    return bookmarkedSupervisorsData.result
}
