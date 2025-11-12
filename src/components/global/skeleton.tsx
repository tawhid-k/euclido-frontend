import { Skeleton } from '@heroui/skeleton'
import {
    Bookmark,
    Calendar,
    Coins,
    Mail,
    MapPinHouse,
    School,
    Sprout,
    ThumbsUp,
    WalletCards
} from 'lucide-react'

export default function LoadingSpinner() {
    return (
        <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-neutral-50 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    )
}

export function DegreeDetailsTopLayerSkeleton() {
    const informationCardStyle =
        'xs:col-span-5 md:col-span-2 lg:col-span-1 rounded-xl bg-white/30 p-4 flex flex-col gap-1'
    return (
        <div className="xs:px-4 lg:px-16 flex flex-col items-center justify-center xs:gap-8 lg:gap-12">
            {/* School - University */}
            <div className="flex xs:flex-col lg:flex-row gap-2 items-center justify-center lg:bg-white xs:rounded-md lg:rounded-full py-1 px-2">
                <Skeleton className="rounded-full w-12 h-12" />
                <span className="text-sm text-foreground font-medium">
                    <Skeleton className="rounded-lg w-40 h-4" />
                </span>
            </div>

            {/* Program */}
            <div className="flex flex-col xs:gap-2 lg:gap-8 items-center justify-center">
                <h1 className="xs:text-2xl lg:text-4xl font-semibold text-foreground">
                    <Skeleton className="rounded-lg w-64 h-6" />
                </h1>
                <div className="flex flex-wrap xs:gap-2 lg:gap-4 items-center">
                    <Skeleton className="rounded-lg w-20 h-4" />
                    <Skeleton className="rounded-lg w-24 h-4" />
                    <Skeleton className="rounded-lg w-28 h-4" />
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-5 w-full xs:px-4 lg:px-20 gap-8">
                <div className={informationCardStyle}>
                    <Calendar
                        className="text-button-primary"
                        size={30}
                        strokeWidth={1.5}
                    />
                    <span className="text-foreground">
                        Application Deadline
                    </span>
                    <Skeleton className="rounded-lg w-32 h-4" />
                </div>
                <div className={informationCardStyle}>
                    <Sprout
                        className="text-african-violet"
                        size={30}
                        strokeWidth={1.5}
                    />
                    <span className="text-foreground">Program Intake</span>
                    <Skeleton className="rounded-lg w-32 h-4" />
                </div>
                <div className={informationCardStyle}>
                    <Coins
                        className="text-[#F18701]"
                        size={30}
                        strokeWidth={1.5}
                    />
                    <span className="text-foreground">Tuition Fees / Year</span>
                    <Skeleton className="rounded-lg w-32 h-4" />
                </div>
                <div className={informationCardStyle}>
                    <WalletCards
                        className="text-[#F9C80E]"
                        size={30}
                        strokeWidth={1.5}
                    />
                    <span className="text-foreground">Application Fee</span>
                    <Skeleton className="rounded-lg w-32 h-4" />
                </div>
                <div className={informationCardStyle}>
                    <ThumbsUp
                        className="text-[#17C3B2]"
                        size={30}
                        strokeWidth={1.5}
                    />
                    <span className="text-foreground">Acceptance Rate</span>
                    <Skeleton className="rounded-lg w-24 h-4" />
                </div>
            </div>

            {/* Find Supervisor and Program Page */}
            <div className="flex xs:flex-col md:flex-row gap-6">
                <Skeleton className="rounded-lg w-40 h-10" />
                <Skeleton className="rounded-full w-40 h-10" />
                <Skeleton className="rounded-full w-10 h-10" />
            </div>
        </div>
    )
}


function JobCardSkeleton() {
    return (
        <div className="flex flex-col gap-2 bg-white border-2 border-lightgray rounded-xl p-4 max-w-fit relative">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                <Skeleton className="rounded-full w-24 h-24" />
                    <div className='flex flex-col gap-4'>
                        <Skeleton className="rounded-lg w-36 h-4" />
                    
                        <Skeleton className="rounded-lg w-36 h-4" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
            <Skeleton className="rounded-md w-24 h-6" />
            <Skeleton className="rounded-md w-24 h-6" />
            <Skeleton className="rounded-md w-24 h-6" />
            <Skeleton className="rounded-md w-24 h-6" />

            </div>

            {/* Third Row  */}
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 mt-5 text-xs">
                <Skeleton className="rounded-lg w-16 h-4" />
                <Skeleton className="rounded-lg w-16 h-4" />
                </div>
                {/* Posted Time */}
                <div className="flex flex-col items-end">
                
                <Skeleton className="rounded-full w-8 h-8" />
                </div>
            </div>
        </div>
    )  
}

function ProgramLoading() {
    return (
        <div className="bg-white px-6 py-4 border border-lightgray flex flex-col rounded-xl w-full gap-6 bg-secondary/20">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="rounded-lg w-1/2 h-4" />
                    <div className="flex gap-4 items-center text-foreground font-light">
                        <Skeleton className="rounded-lg w-1/6 h-4" />
                        <Skeleton className="rounded-lg w-1/6 h-4" />
                        <Skeleton className="rounded-lg w-1/6 h-4" />
                        <Skeleton className="rounded-lg w-1/6 h-4" />
                    </div>
                </div>
                <div className="flex gap-4 justify-end w-full">
                    <Skeleton className="rounded-lg h-4 w-1/2" />
                </div>
            </div>
            <div className="flex gap-2 w-full">
                <Skeleton className="rounded-lg w-1/6 h-6" />
                <Skeleton className="rounded-lg w-1/6 h-6" />
                <Skeleton className="rounded-lg w-1/6 h-6" />
                <Skeleton className="rounded-lg w-1/6 h-6" />
                {/* <BookmarkProgram uuid={p.uuid} isBookmarked={p.isBookmarked} /> */}
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 w-full">
                    <Skeleton className="rounded-full w-12 h-12" />
                    <div className="flex flex-col gap-2 w-full">
                        <Skeleton className="rounded-lg w-1/4 h-2" />
                        <Skeleton className="rounded-lg w-1/4 h-2" />
                        <Skeleton className="rounded-lg w-1/4 h-2" />
                    </div>
                </div>
                <div className="flex gap-2 items-center justify-end w-full">
                    <Skeleton className="rounded-lg w-1/6 h-4" />
                    <Skeleton className="rounded-lg w-1/6 h-4" />
                </div>
            </div>
        </div>
    )
}

export function DashboardTopLayerSkeleton() {
    return (
        <div className="w-full items-center justify-center flex flex-col gap-4">
            <Skeleton className="rounded-full p-16" />
            <div className="flex flex-col justify-center items-center gap-2 text-foreground w-full">
                <Skeleton className="rounded-lg w-56 h-6" />
                <div className="flex items-center gap-8">
                    <div className="flex gap-2 items-center">
                        <Skeleton className="rounded-md w-6 h-6" />
                        <Skeleton className="rounded-lg w-16 h-4" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Skeleton className="rounded-md w-6 h-6" />
                        <Skeleton className="rounded-lg w-10 h-4" />
                    </div>
                </div>
            </div>
            <div className="pt-2 flex flex-col items-center gap-2 text-foreground w-full">
                {/* area */}
                <div className="flex items-center justify-center gap-2">
                    <Skeleton className="rounded-lg w-28 h-6" />
                    <Skeleton className="rounded-lg w-28 h-6" />
                </div>
                {/* research */}
                <div className="flex gap-2 items-center justify-center ">
                    <Skeleton className="rounded-lg w-12 h-4" />
                    <Skeleton className="rounded-lg w-12 h-4" />
                    <Skeleton className="rounded-lg w-12 h-4" />
                    <Skeleton className="rounded-lg w-12 h-4" />
                    <Skeleton className="rounded-lg w-12 h-4" />
                </div>
            </div>
        </div>
    )
}

export function JobsOverlay() {
    return (
        <div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-4 max-w-fit">
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton /> 
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
        </div>
    )
}


export function ProgramsOverlay() {
    return (
        <div className="flex flex-col gap-8 items-center w-full">
            <ProgramLoading />
            <ProgramLoading />
            <ProgramLoading />
            <ProgramLoading />
            <ProgramLoading />
        </div>
    )
}
