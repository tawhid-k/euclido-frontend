import Footer from '@/@/components/global/footer'
import JobCard from '@/@/components/jobs/landing/job-card'
import SearchBoxJobs from '@/@/components/jobs/landing/search-bar'
import NavBar from '@/@/components/navbar/navbar'
import { JobCardType } from '@/@/lib/types/jobs/job-list'
import { getRequest } from '@/@/service/api-handler/get-manager'
import { Suspense } from 'react'


export default function JobsLandingPage() {
    return (
        <div
            className="flex flex-col justify-between min-h-screen"
            style={{
                backgroundImage: 'url(/assets/home-bg.svg)',
                backgroundPosition: 'bottom center',
                backgroundSize: 'cover'
            }}
        >
            <header className="sticky top-0 z-50">
                <Suspense>
                    <NavBar />
                </Suspense>
            </header>
            <div className="w-full flex flex-col xs:gap-4 lg:gap-8 xl:pt-24 items-center lg:pl-0 lg:pr-0">
                <h1 className="xs:text-lg lg:text-5xl font-semibold text-foreground">
                    Find your next big opportunity
                </h1>
                <span className="xs:text-xs lg:text-base text-foreground text-center max-w-md">
                    Find open academic positions from top universities all
                    around the world
                </span>
                <div className="flex flex-col w-full justify-center items-center xs:gap-4 xl:gap-16 xs:pt-2 lg:pt-8">
                    <SearchBoxJobs />

                    <RandomJobsList />
                </div>
            </div>
            <div className="pt-12 w-full">
                <Footer />
            </div>
        </div>
    )
}

async function RandomJobsList() {
    const randomJobsResponse = await getRequest(
        'search/jobs/filter?limit=6',
        true
    )
    const jobsList: JobCardType[] = randomJobsResponse.result

    return (
        <div className="grid xs:grid-cols-1 xl:grid-cols-3 xs:gap-2 xl:gap-4 max-w-fit xs:px-2 xl:px-44">
            {jobsList?.map((item: JobCardType) => (
                <div
                    key={item.id}
                >
                    <JobCard job={item} />
                </div>
            ))}
        </div>
    )
}