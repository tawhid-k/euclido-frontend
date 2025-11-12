'use client'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { resendCodeAction, verifyCode } from './action'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'

function Submit({ loaded }: { loaded: boolean }) {
    const { pending } = useFormStatus()
    return (
        <input
            className="py-2 w-full text-center bg-button-primary hover:bg-hover-button-primary font-bold text-light-text rounded-full"
            disabled={pending}
            type='submit'
            value={pending ? 'Verifying...' : 'Confirm Verification'}
        />
    )
}

export default function CodeVerification() {
    const router = useRouter()
    const reduxEmail = useAppSelector(state => state.auth.user?.email || null) 
    const { pending } = useFormStatus()
    const [emailLoaded, setEmailLoaded] = useState(false)
    const [email, setEmail] = useState<string | null>(null)
    const inputFieldStyle =
        'bg-[#434343] w-full text-center p-3 rounded-full text-white text-lg placeholder:text-[#A1A1A1] placeholder:text-lg focus:outline-none'
    useEffect(() => {
        const email = localStorage.getItem('register-email') || reduxEmail
        setEmail(email)
        setEmailLoaded(true)
    }, [])
    const clientAction = async (formData: FormData) => {
        if (email) {
            formData.append('email', email)
        }
        const res = await verifyCode(formData)
        if (res.statusCode === 200) {
            // FIXME: Make it same as signin localStorage data
            const user = {
                firstName: res.result.firstName,
                lastName: res.result.lastName,
                email: res.result.email,
                token: res.result.token,
                avatar: res.result.avatarUrl
            }
            
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.removeItem('register-email')
            toast.success(res.message)
            router.push('/')
        } else {
            toast.error(res.message)
        }
    }
    return (
        <div className="z-30 fixed min-h-screen w-full flex justify-center items-center">
            <div className="pt-20 pb-8 px-20 bg-white bg-opacity-20 rounded-2xl backdrop-blur-md">
                <div className="flex flex-col items-center gap-12">
                    <h2 className="text-foreground font-bold text-2xl">
                        Check Your Email
                    </h2>
                    <div className="flex flex-col gap-4">
                        <form
                            className="flex flex-col gap-4"
                            action={clientAction}
                        >
                            <input
                                className="bg-white w-full rounded-full placeholder:text-center px-4 py-2 h-10 focus:outline-blue-400"
                                type="text"
                                required
                                name="email"
                                placeholder="Email"
                                defaultValue={email || ''}
                                // Remove the disabled attribute
                            />
                            <input
                                className="bg-white w-full rounded-full placeholder:text-center px-4 py-2 h-10 focus:outline-blue-400"
                                type="text"
                                required
                                name="code"
                                placeholder="Verification Code"
                            />
                            <Submit loaded={emailLoaded} />
                        </form>
                    </div>
                    {email && (
                        <button
                            onClick={async () => {
                                const response = await resendCodeAction(email)
                                if (
                                    response.statusCode === 200 ||
                                    response.statusCode === 201
                                ) {
                                    toast.success('Code sent to your email')
                                } else {
                                    toast.error(response.message)
                                }
                            }}
                            className="text-foreground/70 hover:text-foreground font-semibold text-sm"
                        >
                            Resend code
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}