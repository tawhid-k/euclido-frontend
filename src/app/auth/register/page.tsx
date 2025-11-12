'use client'
import { useState } from 'react'
import { google, linkedin } from '../../../components/auth/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import AuthSideContent from '../../../components/auth/side-content'
import { signIn } from 'next-auth/react'
import { userExist } from '@/@/api/auth'
import ToastWithButton from '@/@/components/global/toast-alert'

import { Logo } from '@/@/components/global/logo'
import { formLayoutStyle, layoutStyle } from '@/@/components/global/style'

export default function Page() {
    const [email, setEmail] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const router = useRouter()
    const clientAction = async () => {
        await signIn('google')
    }
    function isValidEmail(email: string): boolean {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    return (
        <div className={layoutStyle}>
            <div className="hidden lg:block lg:flex-1">
                <AuthSideContent />
            </div>
            <div className="xs:block lg:hidden">
                <Logo />
            </div>
            <div className={formLayoutStyle}>
                <div className="flex flex-col items-center xs:gap-6 lg:gap-12 max-w-fit">
                    <h2 className="text-primary font-bold text-xl">
                        Kickstart your Euclido Experience
                    </h2>
                    <div className="flex flex-col xs:gap-4 lg:gap-8 w-full">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white w-full rounded-full placeholder:text-center px-4 py-2 h-10 focus:outline-blue-400"
                            type="email"
                            required
                            placeholder="Your email address"
                        />
                        <button
                            disabled={isVerifying}
                            onClick={async () => {
                                setIsVerifying(true)
                                try {
                                    if (!isValidEmail(email)) {
                                        toast.error('Incorrect email format')
                                        return
                                    }
                                    const userAlreadyRegistered =
                                        await userExist(email)
                                    if (userAlreadyRegistered) {
                                        toast.custom(
                                            <ToastWithButton
                                                title="User already exist"
                                                description="You already have an account. Please sign in."
                                                linkPath="/auth/signin"
                                                linkLabel="Signin"
                                            />
                                        )
                                    } else {
                                        localStorage.setItem(
                                            'register-email',
                                            email
                                        )
                                        router.push('/auth/onboarding')
                                    }
                                } catch (error) {
                                    toast.error('Error checking email')
                                } finally {
                                    setIsVerifying(false)
                                }
                            }}
                            className="py-2 w-full text-center bg-button-primary hover:bg-hover-button-primary font-bold text-light-text rounded-full"
                        >
                            {isVerifying
                                ? 'Verifying email...'
                                : 'Sign up with email'}
                        </button>
                    </div>
                    <div className="flex gap-2 w-full items-center justify-center">
                        <div className="xs:hidden lg:block w-1/4 h-1 bg-blue-light-primary"></div>
                        <p className="text-text-gray text-sm font-normal">
                            or continue with
                        </p>
                        <div className="xs:hidden lg:block w-1/4 h-1 bg-blue-light-primary"></div>
                    </div>
                    <div className="flex gap-4">
                        <form action={clientAction}>
                            <button
                                type="submit"
                                className="flex gap-2 items-center justify-center w-full rounded-full px-4 py-2 bg-white"
                            >
                                {google}
                                <p className="text-foreground font-normal text-sm">
                                    Continue with Google
                                </p>
                            </button>
                        </form>
                    </div>
                    <div className="flex xs:flex-col lg:flex-row gap-4 items-center justify-center">
                        <p className="text-xs font-medium text-foreground">
                            Already have an account?
                        </p>
                        <Link
                            href={'/auth/signin'}
                            className="bg-button-light-primary px-4 py-2 hover:bg-white rounded-full text-button-primary font-semibold text-sm"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
