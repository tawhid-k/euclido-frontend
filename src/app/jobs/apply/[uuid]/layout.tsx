import { Suspense } from 'react'
import NavBar from '@/@/components/navbar/navbar'
import Footer from '@/@/components/global/footer'

export default function ApplyJobLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section
            style={{
                backgroundImage:
                    'url(/assets/profile-top.svg), url(/assets/profile-center.svg), url(/assets/profile-bottom.svg)',
                backgroundPosition: 'top right, center left, bottom right',
                backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
                backgroundSize: '60%, contain, contain'
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
