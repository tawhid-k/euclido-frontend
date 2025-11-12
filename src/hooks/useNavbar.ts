'use client';
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useAppSelector } from "../app/store/hooks";

export default function useNavbar() {
    const authState = useAppSelector((state) => state.auth)
    const [scrolled, setScrolled] = useState(false)
    const user = authState.user
    const loading = authState.status === 'loading' || authState.status === 'idle'
    const pathname = usePathname()
    useEffect(() => {
            
            const handleScroll = () => {
                const isScrolled = window.scrollY > 0
                setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
            }
    
            window.addEventListener('scroll', handleScroll)
    
            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }, [])
        return {scrolled, user, loading, pathname}
}