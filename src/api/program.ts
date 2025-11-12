import { ProgramDetailsSchema } from "../lib/types/program-details-type"
import { getRequest } from "../service/api-handler/get-manager"

export async function getProgramDetails(uuid: string) {
    const response = await getRequest(`program/${uuid}`)
    // console.log(response.result)
    const programConvert = ProgramDetailsSchema.safeParse(response.result)
    if (programConvert.error) {
        console.log(programConvert.error.message)
    }
    if (programConvert.success) {
        return programConvert.data
    } else {
        return null
    }
}
