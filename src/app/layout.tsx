import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import ReduxProvider from './store/components/reduxProvider'
import { HeroUIProvider } from '@heroui/react'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Euclido',
    description:
        'Euclido search portal. Online degree searching portal for Masters and PhD'
}

export const viewport: Viewport = {
    initialScale: 1,
    userScalable: false
}

import { StrictMode } from 'react'

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={plusJakartaSans.className}>
                <StrictMode>
                    <ReduxProvider>
                        <HeroUIProvider>
                            <main className="min-h-screen">{children}</main>
                            <Toaster position="top-center" />
                        </HeroUIProvider>
                    </ReduxProvider>
                </StrictMode>
            </body>
        </html>
    )
}
