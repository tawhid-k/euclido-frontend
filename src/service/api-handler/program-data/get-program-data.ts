'use server'

// TODO: DELETE this file

import { cookies } from 'next/headers'

const base_url = process.env.NEXT_PUBLIC_BASE_URL

interface FetchOptions {
    revalidate?: number | false
    tags?: string[]
    dynamic?: boolean
}

interface ErrorResponse {
    statusCode: number
    message: string
}

export async function hasTokenCookie() {
    const hasCookie = (await cookies()).get('token')
    return hasCookie
}

export async function fetchWithAuthToken(url: string, options?: FetchOptions) {
    try {
        const token = (await cookies()).get('XSRF-TOKEN')?.value
        if (!token) {
            return {
                statusCode: 401,
                message: 'unauthorized'
            }
        }

        const response = await fetch(`${base_url}/${url}`, {
            method: 'GET', 
            headers: {
                'x-xsrf-token': token,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: options?.dynamic ? 'no-store' : 'force-cache'
        })

        const data = await response.json()

        if (response.status === 200 || response.status === 201) {
            return data
        } else if (response.status === 400) {
            return {
                statusCode: 400,
                message: data.message
            } as ErrorResponse
        } else {
            throw new Error(data.message || 'Something went wrong')
        }
    } catch (error: any) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            return {
                statusCode: 500,
                message: 'No response received from server'
            } as ErrorResponse
        }

        return {
            statusCode: 500,
            message: error.message || 'Something went wrong'
        } as ErrorResponse
    }
}
