import { mockApiDelete } from '@/@/lib/mock-data'

export async function deleteRequestWithToken(url: string) {
    return mockApiDelete(url)
}

export async function deleteRequest(url: string) {
    return mockApiDelete(url)
}

export async function deleteRequestUrl(url: string) {
    return mockApiDelete(url)
}
