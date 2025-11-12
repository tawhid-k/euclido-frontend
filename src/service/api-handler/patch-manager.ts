import axios from "axios";
import { getXsrfToken } from "./get-token";

const base_url = process.env.NEXT_PUBLIC_BASE_URL

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

export async function patchRequest(url : string, formData : any) {
 
    try {
        const token = await getXsrfToken()
        if (!token) {
            return {
                statusCode: 401,
                message: 'unauthorized'
            }
        }
        const response = await axios.patch(resolveFullUrl(url), formData, {
            headers: {
                'x-xsrf-token': token,
                'Content-Type': 'application/json'
            }, withCredentials: true
        
        });
        console.log(response)
        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
            return response.data;
        } else if (response.data.statusCode === 400) {
            return {
                statusCode: 400,
                message: response.data.message
            };
        } else {
            throw new Error(response.data.message || 'Something went wrong');
        }
} catch (error : any) {
    // console.log('There is an error')
    // console.log(error)
    // console.log(error.message)

    console.log(error)
    if (error.response) {
        return {
            statusCode: error.response.status,
            message: error.response.data.message || 'Something went wrong'
        };
    } else if (error.request) {
        return {
            statusCode: 500,
            message: 'No response received from server'
        };
    } else {
        return {
            statusCode: 500,
            message: error.message
        };
    }
}
}

// Add this new function to handle FormData specifically
export async function patchFormDataRequest(url: string, formData: FormData) {
    try {
        const token = await getXsrfToken()
        if (!token) {
            return {
                statusCode: 401,
                message: 'unauthorized'
            }
        }
        
        // For FormData, don't set Content-Type - browser will set it automatically
        const response = await axios.patch(resolveFullUrl(url), formData, {
            headers: {
                'x-xsrf-token': token,
            }, 
            withCredentials: true
        });
        
        console.log(response)
        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
            return response.data;
        } else if (response.data.statusCode === 400) {
            return {
                statusCode: 400,
                message: response.data.message
            };
        } else {
            throw new Error(response.data.message || 'Something went wrong');
        }
    } catch (error: any) {
        console.log(error)
        if (error.response) {
            return {
                statusCode: error.response.status,
                message: error.response.data.message || 'Something went wrong'
            };
        } else if (error.request) {
            return {
                statusCode: 500,
                message: 'No response received from server'
            };
        } else {
            return {
                statusCode: 500,
                message: error.message
            };
        }
    }
}