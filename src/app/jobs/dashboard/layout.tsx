import type { Metadata } from 'next'
import NavBar from '@/@/components/navbar/navbar'
import Footer from '@/@/components/global/footer'
import { Suspense } from 'react'
import RecruiterNavBar from '@/@/components/navbar/recruiter-navbar/recruiter-nav'

export const metadata: Metadata = {
    title: 'Jobs list',
    description: 'Current job openings at Euclido'
}

export default function RecruiterDashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section
            style={{
                backgroundImage:
                    'url(/assets/filter-top-right.svg), url(/assets/degree-list-footer.svg)',
                backgroundPosition: 'top right, bottom right',
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: 'contain, contain'
            }}
            className="relative"
        >
            <div className="sticky top-0 z-50">
                <Suspense>
                    <RecruiterNavBar />
                </Suspense>
            </div>
            <div className="min-h-screen">{children}</div>
            <Footer />
        </section>
    )
}
