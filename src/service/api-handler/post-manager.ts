import axios from "axios";
import { getXsrfToken } from "./get-token";

const base_url = process.env.NEXT_PUBLIC_BASE_URL

export async function postRequest(url: string, formData: any) {
    try {
        const token = await getXsrfToken();
        
        if (!token) {
            return {
                statusCode: 401,
                message: 'unauthorized'
            }
        }
        const response = await fetch(`${base_url}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-xsrf-token': token,
                
            },
            credentials: 'include',
            body: JSON.stringify(formData),
            
        });

        const data = await response.json();
        console.log(data);

        if (data.statusCode === 200 || data.statusCode === 201) {
            return data;
        } else if (data.statusCode === 400) {
            return {
                statusCode: 400,
                message: data.message
            };
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error: any) {
        if (!error.response) {
            return {
                statusCode: 500,
                message: error.message || 'Network error occurred'
            };
        }

        return {
            statusCode: error.response?.status || 500,
            message: error.response?.data?.message || 'Something went wrong'
        };
    }
}

export default async function postManager(url : string, formData : any) {
    try {
        const response = await axios.post(`${base_url}/${url}`, formData, {
            withCredentials: true
        });
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

export async function postRequestForm(url: string, formData: FormData) {
    try {
        const token = await getXsrfToken();
        if (!token) {
            return {
                statusCode: 401,
                message: 'unauthorized'
            }
        }
        const response = await fetch(`${base_url}/${url}`, {
            method: 'POST',
            headers: {
                'x-xsrf-token': token,
                
            },
            credentials: 'include',
            body: formData,
            
        });

        const data = await response.json();
        // console.log(data);

        if (data.statusCode === 200 || data.statusCode === 201) {
            return data;
        } else if (data.statusCode === 400) {
            return {
                statusCode: 400,
                message: data.message
            };
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error: any) {
       console.log(error)
        if (!error.response) {
            return {
                statusCode: 500,
                message: error.message || 'Network error occurred'
            };
        }

        return {
            statusCode: error.response?.status || 500,
            message: error.response?.data?.message || 'Something went wrong'
        };
    }
}