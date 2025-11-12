'use client'
import Link from 'next/link'
import { Link as Linkui, Skeleton } from '@heroui/react'
import { button as buttonStyles } from '@heroui/react'
import { MoveRightIcon, X } from 'lucide-react'
import NavSearchBox from './nav-search-box'
import UserOptions from './user-options'
import useNavbar from '@/@/hooks/useNavbar'
import { MenuOptions } from './navbar-utils'
import { Logo } from '../global/logo'
import { useState, useEffect, useRef } from 'react'
import { hamburgerMenu } from '../icons/navbar-icons'

export default function NavBar() {
    const { scrolled, user, loading, pathname } = useNavbar()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false)
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    
    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [mobileMenuOpen])
    
    return (
        <div
            className={`xs:px-4 sm:px-6 lg:px-32 xs:py-3 lg:py-4 flex justify-between items-center transition-all duration-500 ${
                scrolled ? 'bg-lightblue/20 backdrop-blur-xl' : 'bg-transparent'
            } relative z-30`}
        >
            <div className="flex gap-10 items-center">
                <Logo />

                <div className="xs:hidden lg:block">
                    <MenuOptions isSignedIn={user ? true : false} userType={user?.userType || null} />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="hidden xl:block">
                    {pathname !== '/' && <NavSearchBox />}
                </div>
                <div className="xs:hidden lg:block">
                    {pathname === '/' && !user && (
                        <Linkui
                            isExternal
                            className={buttonStyles({
                                color: 'secondary',
                                radius: 'full',
                                size: 'sm'
                            })}
                            href="/book-an-appointment"
                        >
                            Book an appointment
                        </Linkui>
                    )}
                </div>
                {/* User options - only visible on desktop */}
                <div className="xs:hidden lg:block">{user && <UserOptions user={user} />}</div>
                <div>
                    {(!user && !loading)? (
                        <Link
                            className={buttonStyles({
                                color: 'primary',
                                radius: 'full',
                                size: 'sm'
                            })}
                            href="/auth/signin"
                        >
                            Sign in
                            <MoveRightIcon size={20} strokeWidth={1} />
                        </Link>
                    ): (loading && <Skeleton className="rounded-full w-44 h-6" />)}
                
                </div>
                
                {/* Hamburger menu button for mobile */}
                <button 
                    className="lg:hidden ml-2 focus:outline-none" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {hamburgerMenu}
                </button>
            </div>
            
            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" aria-hidden="true" />
            )}
            
            {/* Mobile menu */}
            <div 
                ref={menuRef}
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-8">
                        {/* <Logo /> */}
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="focus:outline-none"
                            aria-label="Close menu"
                        >
                            <X size={18} className="text-sky-600 top-4 right-4 absolute" />
                        </button>
                    </div>
                    
                    {/* User profile section in mobile menu */}
                    {user && (
                        <div className="mb-6 pb-4 border-b border-gray-200">
                            <UserOptions user={user} />
                        </div>
                    )}
                    
                    <div className="flex flex-col space-y-6">
                        {/* Mobile menu items */}
                        <div className="flex flex-col space-y-4">
                            <div className="lg:hidden">
                                <MenuOptions isSignedIn={user ? true : false} userType={user?.userType || null} isMobile={true} />
                            </div>
                            
                            {/* {pathname !== '/' && (
                                <div className="xl:hidden pt-4">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Search</h3>
                                    <NavSearchBox isMobile={true} />
                                </div>
                            )} */}
                            
                            {pathname === '/' && !user && (
                                <div className="lg:hidden pt-4">
                                    <Link
                                        href="/book-an-appointment"
                                        className={buttonStyles({
                                            color: 'secondary',
                                            radius: 'full',
                                            size: 'sm'
                                        })}
                                    >
                                        Book an appointment
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-gray-200">
                        {!user && !loading && (
                            <Link
                                className={`${buttonStyles({
                                    color: 'primary',
                                    radius: 'full',
                                    size: 'sm'
                                })} w-full justify-center`}
                                href="/auth/signin"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign in
                                <MoveRightIcon size={20} strokeWidth={1} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
