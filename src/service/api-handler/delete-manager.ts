import { getXsrfToken } from "./get-token";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

interface ErrorResponse {
    statusCode: number;
    message: string;
}

async function fetchWithHandling(url: string, options: RequestInit) {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: 'include',
            cache: 'no-store'
        });
        
        // For DELETE operations, the response might be empty
        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = { message: 'Operation completed successfully' };
        }

        if (response.status === 200 || response.status === 204) {
            return data;
        } else if (response.status === 400) {
            return {
                statusCode: 400,
                message: data.message || 'Bad request'
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

export async function deleteRequestWithToken(url: string) {
    console.log(url)
    const token = await getXsrfToken();
    if (!token) {
        return {
            statusCode: 401,
            message: 'unauthorized'
        };
    }
    const fullUrl = new URL(url, base_url).toString();
    return fetchWithHandling(fullUrl, {
        method: 'DELETE',
        headers: {
            'x-xsrf-token': token,
            'Content-Type': 'application/json',
        }
    });
}

export async function deleteRequest(url: string) {
    const fullUrl = new URL(url, base_url).toString();
    return fetchWithHandling(fullUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export async function deleteRequestUrl(url: string) {
    return fetchWithHandling(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}