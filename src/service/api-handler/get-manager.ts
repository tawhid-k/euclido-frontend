import { getXsrfToken } from "./get-token";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const ONE_HOUR = 3600;

function resolveFullUrl(input: string): string {
    if (/^https?:\/\//i.test(input)) return input;
    const fallback = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
    const base = base_url || fallback;
    if (!base) {
        throw new Error('Base URL is not configured. Set NEXT_PUBLIC_BASE_URL or VERCEL_URL.');
    }
    const baseClean = base.replace(/\/+$/, '');
    const pathClean = input.replace(/^\/+/, '');
    return `${baseClean}/${pathClean}`;
}

interface ErrorResponse {
    statusCode: number;
    message: string;
}

async function fetchWithHandling(url: string, options: RequestInit, cache: boolean) {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: 'include',
            ...(cache ? { next: { revalidate: ONE_HOUR } } : { cache: 'no-store' })
        });
        const data = await response.json();

        if (response.status === 200 || response.status === 201) {
            return data;
        } else if (response.status === 400) {
            return {
                statusCode: 400,
                message: data.message
            } as ErrorResponse;
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error: any) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            return {
                statusCode: 500,
                message: 'No response received from server'
            } as ErrorResponse;
        }

        return {
            statusCode: 500,
            message: error.message || 'Something went wrong'
        } as ErrorResponse;
    }
}

export async function getRequestWithToken(url: string, cache = false) {
    const token = await getXsrfToken();
    if (!token) {
        return {
            statusCode: 401,
            message: 'unauthorized'
        };
    }
    const fullUrl = resolveFullUrl(url);
    return fetchWithHandling(fullUrl, {
        method: 'GET',
        headers: {
            'x-xsrf-token': token,
            'Content-Type': 'application/json',
        }
    }, cache);
}

export async function getRequest(url: string, cache = false) {
    const fullUrl = resolveFullUrl(url);
    return fetchWithHandling(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }, cache);
}

export async function getRequestUrl(url: string, cache = false) {
    return fetchWithHandling(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }, cache);
}