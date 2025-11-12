'use client'
import Link from 'next/link'
import { Button, Link as Linkui } from '@heroui/react'
import { button as buttonStyles } from '@heroui/react'
import { MoveRightIcon, Plus, X } from 'lucide-react'
import { Drawer, DrawerContent, useDisclosure } from '@heroui/react'
import useNavbar from '@/@/hooks/useNavbar'
import { Logo } from '../../global/logo'
import RichTextEditor from '../../jobs/dashboard/text-editor'
import AddNewJobOpening from '../../jobs/dashboard/job-form'
import { useMobileDevice } from '@/@/hooks/useMobileDevice'
import { useState, useEffect, useRef } from 'react'
import { hamburgerMenu } from '../../icons/navbar-icons'

export default function RecruiterNavBar() {
    const { scrolled, user, loading, pathname } = useNavbar()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const menuStyle = 'text-foreground text-sm hover:text-hover-button-primary'
    const mobileMenuStyle = 'text-foreground text-base font-medium py-2 hover:text-hover-button-primary'
    const isMobile = useMobileDevice()
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
            className={`xs:px-2 sm:px-4 lg:px-32 xs:py-1 lg:py-4 flex justify-between items-center transition-all duration-500 ${
                scrolled ? 'bg-lightblue/20 backdrop-blur-xl' : 'bg-transparent'
            } relative z-30`}
        >
            <div className="flex gap-4 sm:gap-10 items-center">
                <Logo />
                <div className='xs:hidden md:flex gap-4 items-center'>
                    <Link href="/jobs/dashboard" className={menuStyle}>
                        Dashboard
                    </Link>
                    <Link href="/jobs/dashboard/closed-jobs" className={menuStyle}>
                        Closed Jobs
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Post a job button - visible on all devices */}
                <Button
                    className={buttonStyles({
                        color: 'primary',
                        radius: 'full',
                        size: 'sm'
                    })}
                    onPress={onOpen}
                >
                    <Plus size={20} strokeWidth={1} className="text-white" />
                    <span className="xs:hidden sm:inline">Post a job</span>
                </Button>
                
                {/* Hamburger menu button for mobile */}
                <button 
                    className="md:hidden ml-2 focus:outline-none" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {hamburgerMenu}
                </button>
                
                <Drawer
                    size="4xl"
                    isKeyboardDismissDisabled={true}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                >
                    <DrawerContent>
                        {/* Pass onOpenChange to AddNewJobOpening */}
                        <AddNewJobOpening onOpenChange={onOpenChange} />
                    </DrawerContent>
                </Drawer>
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
                        <Logo />
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="focus:outline-none"
                            aria-label="Close menu"
                        >
                            <X size={18} className="text-sky-600" />
                        </button>
                    </div>
                    
                    <div className="flex flex-col space-y-6">
                        {/* Mobile menu items */}
                        <div className="flex flex-col space-y-4">
                            <Link 
                                href="/jobs/dashboard" 
                                className={mobileMenuStyle}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href="/jobs/dashboard/closed-jobs" 
                                className={mobileMenuStyle}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Closed Jobs
                            </Link>
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-gray-200">
                        <Button
                            className={`${buttonStyles({
                                color: 'primary',
                                radius: 'full',
                                size: 'sm'
                            })} w-full justify-center`}
                            onPress={() => {
                                setMobileMenuOpen(false)
                                onOpen()
                            }}
                        >
                            <Plus size={20} strokeWidth={1} className="text-white" />
                            <span>Post a job</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
