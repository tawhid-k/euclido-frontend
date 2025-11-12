'use server'
import { cookies } from "next/headers";
import { getRequest } from "../service/api-handler/get-manager";
import postManager from "../service/api-handler/post-manager";


export async function userExist(email : string) {
    const response = await getRequest(`user/existance/${email}`)

    return response.statusCode === 200
}



export async function setAuthCookies(userType: string, isEmailVerified: boolean) {
    
    const cookieStore = await cookies();

    try {
        cookieStore.set('userType', userType, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });

        cookieStore.set('isEmailVerified', isEmailVerified ? 'true' : 'false', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            path: '/',
        });

        console.log('Cookies set successfully');
    } catch (error) {
        console.error('Error setting cookies:', error);
        throw new Error('Failed to set authentication cookies');
    }
}

export async function updateEmailVerificationStatus(isVerified: boolean = true) {
    const cookieStore = await cookies();
    
    try {
        cookieStore.set('isEmailVerified', isVerified ? 'true' : 'false', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });
        
        console.log('Email verification status updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating email verification status:', error);
        throw new Error('Failed to update email verification status');
    }
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    
    try {
        cookieStore.delete('userType');
        cookieStore.delete('isEmailVerified');
        cookieStore.delete('AUTH-TOKEN');
        cookieStore.delete('XSRF-TOKEN');
        cookieStore.delete('token');
        cookieStore.delete('__next_hmr_refresh_hash__');
        
        console.log('Auth cookies cleared successfully');
        return true;
    } catch (error) {
        console.error('Error clearing auth cookies:', error);
        throw new Error('Failed to clear authentication cookies');
    }
}