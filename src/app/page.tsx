import { Suspense } from 'react'
import SearchBox from '../components/landing/search-box'
import LoadingSpinner from '@/@/components/global/skeleton'
import Footer from '@/@/components/global/footer'
import Link from 'next/link'
import { DisciplineT } from '@/@/lib/types/discipline-type'
import NavBar from '../components/navbar/navbar'
import { getRequest } from '../service/api-handler/get-manager'

export default async function Home() {
    return (
        <div>
            <header className="sticky top-0 z-50">
                <Suspense fallback={<LoadingSpinner />}>
                    <NavBar />
                </Suspense>
            </header>
            <main>
                <Landing />
            </main>
        </div>
    )
}

async function DisciplineList() {
    const disciplineList = await getRequest(
        'discipline/random-discipline',
        true
    )
    const dataList: DisciplineT[] = disciplineList.result

    return (
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {dataList?.map((item: DisciplineT) => (
                <div
                    key={item.slug}
                    className="flex items-center justify-center rounded-full px-3 py-2 bg-white/30"
                >
                    <Link
                        href={`/degree-list?disciplines=${item.slug}`}
                        className="text-center text-foreground font-light text-xs"
                    >
                        {item.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}

function Landing() {
    return (
        <div
            className="flex flex-col justify-between min-h-screen"
            style={{
                backgroundImage: 'url(/assets/home-bg.svg)',
                backgroundPosition: 'bottom center',
                backgroundSize: 'cover'
            }}
        >
            <div className="w-full flex flex-col xs:gap-4 lg:gap-8 items-center xs:pt-12 lg:pt-32 xs:pl-4 xs:pr-4 lg:pl-0 lg:pr-0">
                <h1 className="xs:text-lg lg:text-5xl font-semibold text-foreground">
                    Unlock Postgrad Possibilities
                </h1>
                <span className="xs:text-xs lg:text-base text-foreground text-center max-w-md">
                    Find research degrees (Masters & PhDs), supervisors and
                    collaborators all around the world
                </span>
                <div className="flex flex-col justify-center items-center xs:gap-4 xl:gap-16 xs:pt-2 lg:pt-8">
                    <SearchBox />

                    <DisciplineList />
                </div>
            </div>
            <div className="pt-12 w-full">
                <Footer />
            </div>
        </div>
    )
}
