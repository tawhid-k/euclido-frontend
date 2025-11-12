'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { SearchDisciplines } from './search-discipline'
import { SearchLocations } from './search-location'
import LoadingSpinner from '@/@/components/global/skeleton'
import {
    BookOpenIcon,
    GraduationCapIcon,
    NavigationIcon,
    SearchIcon
} from 'lucide-react'
import {
    useCountryStore,
    useDegreeLevelStore,
    useDisciplineStore,
    useprogramTitleStore
} from '@/@/context/program-search-context'

enum degreeType {
    p = 'doctorate',
    m = 'masters',
    c = 'certificate',
    n = 'none'
}

export default function SearchBox() {
    const [degreeListLink, setDegreeListLink] = useState('/degree-list')

    const disciplines = useDisciplineStore((state) => state.discipline)
    const country = useCountryStore((state) => state.country)
    const degreeLevel = useDegreeLevelStore((state) => state.degreeLevel)
    const programName = useprogramTitleStore((state) => state.programTitle)
    const { setDegreeLevel } = useDegreeLevelStore()

    const resetStores = useCallback(() => {
        useDisciplineStore.getState().setDiscipline(null)
        useCountryStore.getState().setCountry(null)
        useDegreeLevelStore.getState().setDegreeLevel(null)
        useprogramTitleStore.getState().setProgramTitle(null)
    }, [])

    useEffect(() => {
        resetStores()
    }, [resetStores])
    useEffect(() => {
        setDegreeListLink(
            `/degree-list?${
                disciplines ? `&disciplines=${disciplines.slug}` : ''
            }${country ? `&countries=${country.isoCode}` : ''}${
                degreeLevel ? `&degree-level=${degreeLevel}` : ''
            }${programName ? `&program-title=${programName}` : ''}`
        )
    }, [disciplines, country, degreeLevel, programName])
    const inputStyle = 'bg-white rounded-full px-2 w-full xs:py-2'

    const [masters, setMasters] = useState<degreeType>(degreeType.n)
    return (
        <div className="relative flex lg:flex-row xs:flex-col xs:rounded-md lg:rounded-full text-sm py-2 xs:px-2 lg:px-6 xs:bg-transparent xl:bg-white items-center justify-between">
            <div className="flex xs:flex-col justify-start gap-2 items-center xl:flex-row xs:pr-0 xl:pr-8">
                <div className={inputStyle}>
                    <SearchDisciplines />
                </div>
                <div className={inputStyle}>
                    <SearchLocations />
                </div>
                <div className={`flex items-center gap-2 ${inputStyle}`}>
                    <GraduationCapIcon
                        className="text-primary"
                        strokeWidth={1.5}
                    />
                    <button
                        onClick={() => {
                            setMasters(degreeType.m)
                            setDegreeLevel(degreeType.m)
                        }}
                        className={`text-[#18467E] font-medium ${
                            masters === degreeType.m ? '' : 'text-opacity-60'
                        }`}
                    >
                        Masters
                    </button>
                    <button
                        onClick={() => {
                            setMasters(degreeType.p)
                            setDegreeLevel(degreeType.p)
                        }}
                        className={`text-[#18467E] font-medium ${
                            masters === degreeType.p ? '' : 'text-opacity-60'
                        }`}
                    >
                        PhDs
                    </button>
                </div>
                <Link
                    href={degreeListLink}
                    className="xl:absolute xl:right-2 inline-flex justify-center items-center bg-button-primary hover:bg-hover-button-primary h-10 w-10 rounded-full"
                >
                    <SearchIcon className="text-white" strokeWidth={1.5} />
                </Link>
            </div>
        </div>
    )
}
