import { mockApiPatch } from '@/@/lib/mock-data'

export async function patchRequest(url: string, formData: unknown) {
    return mockApiPatch(url, formData)
}

export async function patchFormDataRequest(url: string, formData: FormData) {
    return mockApiPatch(url, formData)
}
