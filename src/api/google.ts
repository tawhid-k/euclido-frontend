import postManager from "../service/api-handler/post-manager"

export async function googleSignin(googleToken: string) {
    console.log('I came to this place')
    console.log(googleToken)
    const response = await postManager('auth/verify-google-login', {token: googleToken})
    return response
}
