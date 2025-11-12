"use server"
import postManager from "@/@/service/api-handler/post-manager"
import { cookies } from "next/headers"


export async function handleRequestCode(formData : FormData) {
    try {
        const response = await postManager('auth/forget-password', {
            email: formData.get('email')
        })
        if (response.statusCode === 201) {
            // TODO: remove cookies email after reset password
            (await cookies()).set('email-forget-password', response.result.email)
        }
        return response

    } catch(error : any) {
        
        return error
    } 
}

export async function handleVerifyCode(formData : FormData) {
    
    try {
        const emailToVerify = (await cookies()).get('email-forget-password')?.value
        const response = await postManager('auth/code-verification', {
            code: formData.get('code'),
            email: emailToVerify
        })
        if (response.statusCode === 201 || response.statusCode === 200) {
            
            const userIdentification = {
                email: response.result.email,
                uuid: response.result.uuid,
                hash: response.result.hash
            }
            ;(await cookies()).set('reset-password', JSON.stringify(userIdentification))
        }
        return response

    } catch(error : any) {
        
        return error
    } 
}


export async function handleResetPassword(formData : FormData) {
    try {
        const resetPasswordObj = JSON.parse((await cookies()).get('reset-password')?.value || '')
        
   
        const response = await postManager('auth/recover-password', {
            hash: resetPasswordObj.hash,
            userUuid: resetPasswordObj.uuid,
            currentPassword: "",
            newPassword: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        })
        if (response.statusCode === 201 || response.statusCode === 200) {
            
            (await cookies()).delete('email-forget-password');
            (await cookies()).delete('reset-password')
            
        }
        return response

    } catch(error : any) {
        
        return error
    } 
}
