import { mockApiGet } from '@/@/lib/mock-data'

export async function getRequestWithToken(url: string, _cache = false) {
    return mockApiGet(url) as any
}

export async function getRequest(url: string, _cache = false) {
    return mockApiGet(url) as any
}

export async function getRequestUrl(url: string, _cache = false) {
    return mockApiGet(url) as any
}
