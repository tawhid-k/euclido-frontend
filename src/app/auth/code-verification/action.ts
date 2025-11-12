import { updateEmailVerificationStatus } from "@/@/api/auth";
import { postRequest } from "@/@/service/api-handler/post-manager";

export async function verifyCode(formData: FormData) {
    const email = formData.get('email') as string;
    const code = formData.get('code') as string;
    
    const response = await postRequest('auth/verify-email', { email, code });
    
    // If verification is successful, update the cookie
    if (response.statusCode === 200) {
        await updateEmailVerificationStatus(true);
    }
    
    return response;
}

export async function resendCodeAction(email: string) {
    return await postRequest('auth/resend-verification-code', { email });
}