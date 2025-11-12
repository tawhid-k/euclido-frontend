import { Suspense } from 'react'
import NavBar from '@/@/components/navbar/navbar'
import Footer from '@/@/components/global/footer'
export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section
            style={{
                backgroundImage:
                    'url(/assets/apply-jobs.svg), url(/assets/profile-bottom.svg)',
                backgroundPosition: 'top right,  bottom right',
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: 'contain, contain'
            }}
            className="relative"
        >
            <div className="sticky top-0 z-30">
                <Suspense>
                    <NavBar />
                </Suspense>
            </div>
            <div className="min-h-screen xs:px-4 lg:px-32 xs:py-4 lg:py-12">
                {children}
            </div>
            <Footer />
        </section>
    )
}
