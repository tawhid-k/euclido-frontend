import { useAppSelector } from '@/@/app/store/hooks'
import Link from 'next/link'
import { hamburgerMenu } from '../icons/navbar-icons'
import { useState } from 'react'
import UserMenu from './user-menu'
import Buttons from './navbar-buttons'
import { Logo } from '../global/logo'
import LogoutButton from '../auth/logout'

export function MenuOptions({ isSignedIn, userType, isMobile = false }: { isSignedIn: boolean, userType: string | null, isMobile?: boolean }) {
    const menuStyle = 'text-foreground text-sm hover:text-hover-button-primary'
    const mobileMenuStyle = 'text-foreground text-base font-medium py-2 hover:text-hover-button-primary'
    const activeStyle = isMobile ? mobileMenuStyle : menuStyle
    
    const selectedProgramsLength = useAppSelector(
        (RootState) => RootState.compare.selectedPrograms
    ).length
    const dashboardLink = userType === 'student'? '/profile/views/dashboard' : userType === 'recruiter'? '/jobs/dashboard' : ''
    
    return (
        <div className={`flex ${isMobile ? 'flex-col gap-1' : 'gap-4'} font-medium`}>
            {!isSignedIn && (
                <div className={`flex ${isMobile ? 'flex-col gap-3' : 'gap-4'} font-medium`}>
                    <Link href="/jobs" className={activeStyle}>
                        Jobs
                    </Link>
                    <Link href="/auth/job-register" className={activeStyle}>
                        Become a recruiter
                    </Link>
                </div>
            )}
            {isSignedIn && (
                <div className={`flex ${isMobile ? 'flex-col gap-1' : 'gap-4 items-center'} font-medium`}>
                    <Link href={dashboardLink} className={activeStyle}>
                        Dashboard
                    </Link>
                    {userType === 'student' && 
                        <div className={`flex ${isMobile ? 'flex-col gap-1' : 'gap-4 items-center'} font-medium`}>
                            <Link href="/profile/views/bookmarks" className={activeStyle}>
                                Bookmarks
                            </Link>
                            <div className="flex items-center gap-1">
                                <Link
                                    href="/profile/views/compare"
                                    className={activeStyle}
                                >
                                    Compare
                                </Link>
                                {selectedProgramsLength > 0 && (
                                    <span
                                        className="w-6 h-6 rounded-full
                        inline-flex items-center justify-center bg-[#d0f0f7] p-1 text-xs font-medium text-foreground cursor-pointer"
                                    >
                                        {selectedProgramsLength}
                                    </span>
                                )}
                            </div>
                            <Link
                                href="/profile/views/update-profile"
                                className={activeStyle}
                            >
                                Profile
                            </Link>
                        </div>
                    }
                    <Link href="/jobs" className={activeStyle}>
                        Jobs
                    </Link>
                    <div className='xs:block md:hidden'><LogoutButton /></div>
                </div>
            )}
        </div>
    )
}

function UserMenuOptions() {
    const isSignedIn = false
    return (
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#E3F4FF] xs:p-6 md:p-10">
            <div className="flex flex-col justify-around min-h-screen -mt-10">
                <Logo />
                {isSignedIn ? <UserMenu path={``} name={''} /> : <Buttons />}
            </div>
        </div>
    )
}

export default function MenuModal() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="flex z-10">
            <button onClick={() => setIsOpen(!isOpen)}>{hamburgerMenu}</button>
            <div
                className={`fixed top-0 left-0 transition-transform duration-300 transform  ${
                    isOpen ? '' : '-translate-x-full'
                }`}
            >
                <UserMenuOptions />
            </div>
        </div>
    )
}
