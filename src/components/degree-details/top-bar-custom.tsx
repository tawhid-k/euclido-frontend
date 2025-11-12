'use client'
import Buttons from '../navbar/navbar-buttons'
import Link from 'next/link'
import MenuModal from '../navbar/navbar-utils'
import { logo } from '../../../public/logo'

import { useEffect, useState } from 'react'
import UserOptions from '@/@/components/navbar/user-options'

function Logo() {
    return (
        <Link href="/">
            <div className="flex gap-4 justify-center items-center">
                {logo}
                <p className="font-semibold xs:text-sm lg:text-lg text-foreground">
                    EUCLIDO
                </p>
            </div>
        </Link>
    )
}

function Menu() {
    return (
        <div className="flex flex-row gap-6 text-base font-medium">
            <p className="text-[#18467E] hover:text-hover-button-primary">
                Researchers
            </p>
            <p className="text-[#18467E] hover:text-hover-button-primary">
                Scholarships
            </p>
            <p className="text-[#18467E] hover:text-hover-button-primary">
                Blog
            </p>
            <p className="text-[#18467E] hover:text-hover-button-primary">
                Contact
            </p>
        </div>
    )
}

export default function TopBar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const userLocal = localStorage.getItem('user')
        setUser(userLocal ? JSON.parse(userLocal) : null)
        setLoading(false)
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY

            setVisible(currentScrollPos < 500)

            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos, visible])

    return (
        <>
            <div
                className={`xs:hidden md:block fixed top-0 w-full ${
                    visible ? 'block' : 'hidden'
                }${
                    visible
                        ? 'transition-transform duration-500 transform translate-y-0'
                        : 'transition-transform duration-500 transform -translate-y-full'
                }`}
            >
                <div className="top-0 z-50 px-14 py-6 flex flex-row justify-between items-center">
                    <Logo />
                    <Menu />
                    {loading ? (
                        <p className="text-foreground font-medium text-sm">
                            Loading...
                        </p>
                    ) : (
                        <div className="min-w-[220px] flex justify-center">
                            {user ? <UserOptions user={user!} /> : <Buttons />}
                        </div>
                    )}
                </div>
            </div>
            <div className="xs:block lg:hidden">
                <div className="flex justify-between items-center py-4 px-2 bg-gradient-to-r from-[#FFFFFF] to-[#E3F4FF]">
                    <Logo />
                    <MenuModal />
                </div>
            </div>
        </>
    )
}
