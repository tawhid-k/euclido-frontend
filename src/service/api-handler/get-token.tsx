'use server'

export async function hasXsrfToken() {
    return true
}

export async function getXsrfToken() {
    return 'mock-xsrf-token'
}

export async function googleToken() {
    return undefined
}

export async function removeGoogleToken() {
    // no-op in mock mode
}
