'use client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/button'
import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/@/components/global/logo'
import {
    handleRequestCode,
    handleResetPassword,
    handleVerifyCode
} from './action'
import { InputOtp } from '@heroui/react'

enum ResetPasswordStage {
    emailSubmission,
    codeVerification,
    resetPassword
}

export default function EmailSubmission() {
    const [passwordResetStage, setPasswordResetStage] =
        useState<ResetPasswordStage>(ResetPasswordStage.emailSubmission)

    return (
        <div className="w-full flex flex-col gap-16 items-center justify-center">
            <Logo />
            <div className=" px-12 bg-white/20 max-w-fit rounded-3xl backdrop-blur-xl">
                {passwordResetStage === ResetPasswordStage.emailSubmission && (
                    <EmailSubmissionForm setStage={setPasswordResetStage} />
                )}
                {passwordResetStage === ResetPasswordStage.codeVerification && (
                    <CodeVerificationForm setStage={setPasswordResetStage} />
                )}
                {passwordResetStage === ResetPasswordStage.resetPassword && (
                    <ResetPasswordForm />
                )}
            </div>
        </div>
    )
}

function EmailSubmissionForm({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<ResetPasswordStage>>
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)
        const response = await handleRequestCode(formData)
        if (response.statusCode === 201) {
            toast.success('A code has been sent to your email')
            setStage(ResetPasswordStage.codeVerification)
        } else {
            // console.log(response)
            toast.error(response.message)
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-12 py-12">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-foreground font-semibold xs:text-lg lg:text-2xl">
                    Forgot your password?
                </h1>
                <span className="text-foregound/80 text-sm w-2/3 text-center">
                    Enter your email address to receive the password reset link
                </span>
            </div>
            <form
                onSubmit={onSubmit}
                className="flex flex-col w-full items-center justify-center gap-4"
            >
                <input
                    className="bg-white w-full focus:outline-none rounded-full placeholder:text-center h-10 px-4 py-2"
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    required
                />

                <Button
                    isLoading={isLoading}
                    color="primary"
                    radius="full"
                    type="submit"
                    className="w-full font-medium"
                >
                    Reset my password
                </Button>
            </form>
            <div className="flex gap-4 items-center justify-center">
                <p className="text-xs font-semibold text-foreground">
                    I remember my password
                </p>
                <Link
                    href="/auth/signin"
                    className="bg-button-light-primary px-4 py-2 hover:bg-white rounded-full text-button-primary font-semibold text-sm"
                >
                    Sign In
                </Link>
            </div>
        </div>
    )
}

function CodeVerificationForm({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<ResetPasswordStage>>
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [otp, setOtp] = useState<string>('')
    const router = useRouter()
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)
        const response = await handleVerifyCode(formData)
        if (response.statusCode === 200) {
            toast.success('Email Verified')
            setStage(ResetPasswordStage.resetPassword)
        } else {
            // console.log(response)
            toast.error(response.message)
            setIsLoading(false)
        }
    }
    const [timer, setTimer] = useState<number>(120)
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevSeconds) =>
                prevSeconds > 0 ? prevSeconds - 1 : prevSeconds
            )
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="flex flex-col items-center gap-8 py-12">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-foreground font-semibold xs:text-lg lg:text-2xl">
                    Enter the Code
                </h1>
                <span className="text-foregound/80 text-sm w-full text-center">
                    A code has been sent to your email
                </span>
            </div>
            <span className="text-primary font-medium w-full text-center">
                {timer > 0 ? `${timer} seconds remaining` : "Time's up!"}
            </span>
            <form
                onSubmit={onSubmit}
                className="flex flex-col w-full items-center justify-center gap-4"
            >
                {/* <input
                    className="bg-white w-full focus:outline-none rounded-full placeholder:text-center h-10 px-4 py-2"
                    type="text"
                    name="code"
                    placeholder="Enter the code"
                    required
                /> */}
                <InputOtp
                    size="lg"
                    length={6}
                    value={otp}
                    onValueChange={setOtp}
                />
                <input type="hidden" name="code" value={otp} />
                <Button
                    isLoading={isLoading}
                    color="primary"
                    radius="full"
                    type="submit"
                    className="w-full font-medium"
                >
                    Verify code
                </Button>
            </form>
            <div className="flex gap-4 items-center justify-center">
                <p className="text-xs font-semibold text-foreground">
                    I am okay with my previous password
                </p>
                <Link
                    href="/auth/signin"
                    className="bg-button-light-primary px-4 py-2 hover:bg-white rounded-full text-button-primary font-semibold text-sm"
                >
                    Sign In
                </Link>
            </div>
        </div>
    )
}

function ResetPasswordForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)
        const response = await handleResetPassword(formData)
        if (response.statusCode === 201) {
            toast.success('Password Changed Successfully')
            router.push('/')
        } else {
            // console.log(response)
            toast.error(response.message)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col items-center gap-12 py-12">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-foreground font-semibold xs:text-lg lg:text-2xl">
                    Verify Code
                </h1>
                <span className="text-foregound/80 text-sm w-2/3 text-center">
                    Enter the code that has been sent to your email
                </span>
            </div>
            <form
                onSubmit={onSubmit}
                className="flex flex-col w-full items-center justify-center gap-4"
            >
                <input
                    className="bg-white w-full focus:outline-none rounded-full placeholder:text-center h-10 px-4 py-2"
                    type="password"
                    name="password"
                    placeholder="Your new password"
                    required
                />
                <input
                    className="bg-white w-full focus:outline-none rounded-full placeholder:text-center h-10 px-4 py-2"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    required
                />

                <Button
                    isLoading={isLoading}
                    color="primary"
                    radius="full"
                    type="submit"
                    className="w-full font-medium"
                >
                    Update my password
                </Button>
            </form>
            <div className="flex gap-4 items-center justify-center">
                <p className="text-xs font-semibold text-foreground">
                    I am okay with my previous password
                </p>
                <Link
                    href="/auth/signin"
                    className="bg-button-light-primary px-4 py-2 hover:bg-white rounded-full text-button-primary font-semibold text-sm"
                >
                    Sign In
                </Link>
            </div>
        </div>
    )
}
