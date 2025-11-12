'use client'

import { useEffect, useRef, useState } from 'react'
import { clearAuthCookies } from '@/@/api/auth';
import { useAppDispatch, useAppSelector } from '@/@/app/store/hooks'
import { User } from '@/@/app/store/authSlice'
import { personSvg } from '../icons/navbar-icons'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '../auth/logout';

export default function UserOptions({ user }: { user: User }) {
    const menuRef = useRef<HTMLDivElement>(null)
    
    const [options, setOptions] = useState(false)
    
    const userContext = useAppSelector((state) => state.auth.user)
    const userName = userContext
        ? `${userContext.firstName} ${userContext.lastName}`
        : null
    const namingStyle = 'text-foreground font-medium text-base'
    const divider = (
        <div className="h-[2px] w-full bg-text-primary bg-opacity-20"></div>
    )
    const buttonStyle = 'hover:font-semibold'

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOptions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
  
    return (
        <div
            className="relative flex gap-2 items-center xs:justify-start lg:justify-center"
            ref={menuRef}
        >
            {personSvg}
            <button
                onClick={() => setOptions(!options)}
                className={namingStyle}
            >
                {userName || user?.firstName + ' ' + user?.lastName}
            </button>
            {options && userContext?.userType === 'student' && (
                <div className="xs:hidden md:flex md:flex-col absolute text-start max-w-fit items-start justify-center gap-2 top-10 left-1/2 transform -translate-x-1/2 bg-white border-lightgray rounded-lg w-full px-4 py-2 text-foreground text-sm shadow-xl">
                    <Link
                        href="/profile/views/dashboard"
                        className={buttonStyle}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/profile/views/bookmarks"
                        className={buttonStyle}
                    >
                        Bookmarks
                    </Link>
                    <Link
                        href="/profile/views/update-profile"
                        className={buttonStyle}
                    >
                        Profile
                    </Link>

                   <LogoutButton />
                </div>
            )}
            {options && userContext?.userType === 'recruiter' && (
                <div className="xs:hidden md:flex md:flex-col absolute text-start max-w-fit items-start justify-center gap-2 top-10 left-1/2 transform -translate-x-1/2 bg-white border-lightgray rounded-lg w-full px-4 py-2 text-foreground text-sm shadow-xl">
                    <Link
                        href="/jobs/dashboard"
                        className={buttonStyle}
                    >
                        Dashboard
                    </Link>
                    <LogoutButton />
                </div>
            )}
        </div>
    )
}
