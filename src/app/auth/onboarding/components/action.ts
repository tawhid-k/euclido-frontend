"use server"
import postManager from "@/@/service/api-handler/post-manager"
import { cookies } from "next/headers"

const base_url = process.env.NEXT_PUBLIC_BASE_URL

export async function setEmailinCookie(email : string) {
   (await cookies()).set('email', email)
}

export async function handleRegisterSubmit (formData : any) {

    try {
        const response = await postManager('auth/registration', formData)
        if (response.statusCode === 200 || response.statusCode === 201) {
            (await cookies()).set('email', response.result.email)
        }
        //console.log(response)
        return response
    }
     catch(error : any) {
        console.log(error.message)
        return error
    }
}

