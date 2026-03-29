import { mockApiPost } from '@/@/lib/mock-data'

export async function postRequest(url: string, formData: unknown) {
    return mockApiPost(url, formData)
}

export async function postRequestForm(url: string, formData: FormData) {
    return mockApiPost(url, formData)
}

export default async function postManager(url: string, formData: unknown) {
    return mockApiPost(url, formData)
}
