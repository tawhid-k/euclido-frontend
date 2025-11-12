'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { google } from '../../../components/auth/icons'
import AuthSideContent from '../../../components/auth/side-content'
import LoginForm from './component/login-form'
import { Logo } from '@/@/components/global/logo'
import { formLayoutStyle, layoutStyle } from '@/@/components/global/style'
import { useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { setLoading } from '../../store/authSlice'

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const handleGoogleSignIn = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        dispatch(setLoading())
        setIsLoading(true)

        await signIn('google', {
            callbackUrl: '/'
        })
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
                <div className="flex flex-col items-center xs:gap-6 lg:gap-12">
                    <h2 className="text-primary font-bold xs:text-lg lg:text-xl">
                        Great to have you back!
                    </h2>
                    <div className="flex flex-col items-center gap-4">
                        <LoginForm />
                        <Link
                            href={'/auth/forget-password'}
                            className="text-primary text-xs pt-2 font-normal"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="h-1 bg-blue-light-primary"></div>
                        <span className="text-text-gray text-sm font-normal">
                            or continue with
                        </span>
                        <div className="h-1 bg-blue-light-primary"></div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="flex gap-2 items-center justify-center w-full rounded-full px-4 py-2 bg-white transition-opacity hover:opacity-90 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                            ) : (
                                google
                            )}
                            <p className="text-foreground font-normal text-sm">
                                {isLoading
                                    ? 'Signing in...'
                                    : 'Continue with Google'}
                            </p>
                        </button>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <p className="text-xs font-medium text-foreground">
                            Don&apos;t have an account?
                        </p>
                        <Link
                            href="/auth/register"
                            className="bg-button-light-primary px-4 py-2 hover:bg-white rounded-full text-button-primary font-semibold text-sm"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
