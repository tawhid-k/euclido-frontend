import Filter from '@/@/components/global/filter/filter'
import ProgramNavigation from '@/@/components/degree-list/navigation'
import ProgramCard from '../../components/degree-list/programs-cards'
import { Suspense } from 'react'

export default function Page() {
    return (
        <div className="xs:px-2 xs:py-1 lg:px-20 lg:pb-16">
            <div className="lg:p-4 grid xs:grid-cols-1 lg:grid-cols-7 lg:gap-x-8">
                <div className="z-0 xs:hidden lg:block lg:col-span-2 lg:pt-4">
                    <div className="sticky top-20">
                        <Filter />
                    </div>
                </div>
                <div className="lg:col-span-5 pt-4 overflow-y-auto">
                    <Suspense>
                        <ProgramCard />
                    </Suspense>
                    <ProgramNavigation />
                </div>
            </div>
        </div>
    )
}
