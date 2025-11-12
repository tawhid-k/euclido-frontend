'use client'
import { SearchDisciplines } from '../landing/search-discipline'
import { Suspense, useEffect, useState } from 'react'
import { BookOpenIcon, NavigationIcon, SearchIcon } from 'lucide-react'
import LoadingSpinner from '@/@/components/global/skeleton'
import { SearchLocations } from '../landing/search-location'
import Link from 'next/link'
import {
    useCountryStore,
    useDegreeLevelStore,
    useDisciplineStore,
    useprogramTitleStore
} from '@/@/context/program-search-context'

export default function NavSearchBox({ isMobile = false }: { isMobile?: boolean }) {
    const [degreeListLink, setDegreeListLink] = useState('/degree-list')

    const disciplines = useDisciplineStore((state) => state.discipline)
    const country = useCountryStore((state) => state.country)
    const degreeLevel = useDegreeLevelStore((state) => state.degreeLevel)
    const programName = useprogramTitleStore((state) => state.programTitle)

    useEffect(() => {
        setDegreeListLink(
            `/degree-list?${
                disciplines ? `&disciplines=${disciplines.slug}` : ''
            }${country ? `&countries=${country.isoCode}` : ''}${
                degreeLevel ? `&degree-level=${degreeLevel}` : ''
            }${programName ? `&program-title=${programName}` : ''}`
        )
    }, [disciplines, country, degreeLevel, programName])
    
    const inputStyle =
        'w-full xs:border-b-2 lg:border-0 xs:py-2 flex gap-2 items-center justify-start'

    return (
        <div className={`relative flex w-full xs:rounded-md lg:rounded-full text-sm py-0 px-2 bg-white items-center justify-between xs:gap-6 lg:gap-0 ${isMobile ? 'flex-col' : ''}`}>
            <div className={`${isMobile ? 'flex flex-col w-full space-y-4' : 'grid grid-cols-2 w-full'} justify-items-center`}>
                <div className={`${inputStyle} ${!isMobile ? 'col-span-1' : ''} pl-3`}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <SearchDisciplines />
                    </Suspense>
                </div>
                <div className={`${inputStyle} ${!isMobile ? 'col-span-1' : ''}`}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <SearchLocations />
                    </Suspense>
                </div>
            </div>
            <Link href={degreeListLink} className={isMobile ? 'w-full mt-4' : ''}>
                <div className={`flex justify-center items-center bg-button-primary hover:bg-hover-button-primary p-2 rounded-full ${isMobile ? 'w-full' : ''}`}>
                    <SearchIcon
                        className="text-white"
                        size={18}
                        strokeWidth={1.5}
                    />
                    {isMobile && <span className="text-white ml-2">Search</span>}
                </div>
            </Link>
        </div>
    )
}
