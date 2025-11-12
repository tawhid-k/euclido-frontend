'use server'
import { cookies } from 'next/headers'

export async function hasXsrfToken() {
    const hasCookie = (await cookies()).has('XSRF-TOKEN')
    return hasCookie
}

export async function getXsrfToken() {
    return (await cookies()).get('XSRF-TOKEN')?.value
}

export async function googleToken() {
    return (await cookies()).get('google-signin-token')?.value
}

export async function removeGoogleToken() {
    ;(await cookies()).delete('google-signin-token')
}
