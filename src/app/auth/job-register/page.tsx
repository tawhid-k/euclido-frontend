'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { Logo } from '@/@/components/global/logo'
import { formLayoutStyle, layoutStyle } from '@/@/components/global/style'
import JobAuthSideContent from '@/@/components/auth/job-auth-side-content'
import { useState } from 'react'
import FacultyRegistrationForm from '@/@/components/forms/faculty-registration-form'

export default function SignIn() {
    const [registerType, setRegisterType] = useState<
        'individual' | 'organization'
    >('individual')
    return (
        <div className={layoutStyle}>
            <div className="hidden lg:block lg:flex-1">
                <JobAuthSideContent />
            </div>
            <div className="xs:block lg:hidden">
                <Logo />
            </div>
            <div className={formLayoutStyle}>
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col gap-4 xs:py-2">
                        <div className="flex xs:text-xs lg:text-sm rounded-full bg-[#FAFAFA] max-w-fit">
                            <button
                                onClick={() => setRegisterType('individual')}
                                className={`${
                                    registerType === 'individual' &&
                                    'bg-[#D9EFFE] font-semibold'
                                } py-2 px-6 rounded-full text-foreground`}
                            >
                                Individual
                            </button>
                            <button
                                onClick={() => setRegisterType('organization')}
                                className={`${
                                    registerType === 'organization' &&
                                    'bg-[#D9EFFE] font-semibold'
                                } py-2 px-6 rounded-full text-foreground`}
                            >
                                Organization
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <FacultyRegistrationForm registerType={registerType} />
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <p className="text-xs font-medium text-foreground">
                            Already have an account?
                        </p>
                        <Link
                            href="/auth/signin"
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
