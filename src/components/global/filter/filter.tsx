'use client'
import { Suspense, useState } from 'react'
import { usePathname } from 'next/navigation'
import ShowDisciplineList from './filter-components/filter-discipline'
import ShowCountryList from './filter-components/filter-country'
import TuitionFeeRanger from './filter-components/filter-tuition-fees'
import UniversityRankRanger from './filter-components/filter-university-ranking'
import Eligibility from './filter-components/filter-eligibility'
import DropDownArrow from './filter-components/rotating-arrow'
import {
    book,
    location,
    money,
    rank,
    batch,
    hat
} from './filter-components/icons'
import DeliveryModeFilter from './filter-components/filter-delivery-mode'
import DegreeLevelFilter from './filter-components/filter-degree-level'

import { useLoadFilters } from '@/@/hooks/useFilterLoader'
import { CircleX, CrossIcon, Settings2 } from 'lucide-react'
import MinimumQualificationFilter from './filter-components/minimum-qualification'
import JobTypeFilter from './job-filters/job-type-filter'
import JobModeFilter from './job-filters/job-mode-filter'

type DropdownKeys =
    | 'discipline'
    | 'country'
    | 'tuitionFees'
    | 'universityRank'
    | 'eligibility'
    | 'degreeLevel'
    | 'degreeType'
    | 'deliveryMode'

interface DropdownState {
    [key: string]: boolean
}

function FilterOptions({ toggleOpen }: { toggleOpen: () => void }) {
    const pathname = usePathname()
    const labelStyle = `xs:text-xs lg:text-sm text-foreground`

    const [dropdowns, setDropdowns] = useState<DropdownState>({
        discipline: false,
        country: false,
        tuitionFees: false,
        universityRank: false,
        eligibility: false,
        degreeLevel: false,
        degreeType: false,
        deliveryMode: false
    })

    const toggleDropdown = (key: DropdownKeys) => {
        setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
    }
    const dropdownSectionsForJobs = [
        {
            key: 'discipline' as DropdownKeys,
            label: 'Discipline',
            icon: book,
            content: <ShowDisciplineList />
        },
        {
            key: 'country' as DropdownKeys,
            label: 'Country',
            icon: location,
            content: <ShowCountryList />
        },
        {
            key: 'minimum-qualifications' as DropdownKeys,
            label: 'Minimum Qualification',
            icon: hat,
            content: <MinimumQualificationFilter />
        },
        {
            key: 'job-type' as DropdownKeys,
            label: 'Job Type',
            icon: hat,
            content: <JobTypeFilter />
        },
        {
            key: 'job-mode' as DropdownKeys,
            label: 'Mode',
            icon: hat,
            content: <JobModeFilter />
        },
    ]
    const dropdownSectionsForDegrees = [
        {
            key: 'discipline' as DropdownKeys,
            label: 'Discipline',
            icon: book,
            content: <ShowDisciplineList />
        },
        {
            key: 'country' as DropdownKeys,
            label: 'Country',
            icon: location,
            content: <ShowCountryList />
        },
        {
            key: 'degreeLevel' as DropdownKeys,
            label: 'Degree Level',
            icon: hat,
            content: <DegreeLevelFilter />
        },
        {
            key: 'tuitionFees' as DropdownKeys,
            label: 'Tuition Fee',
            icon: money,
            content: <TuitionFeeRanger />
        },
        {
            key: 'universityRank' as DropdownKeys,
            label: 'University Rank',
            icon: rank,
            content: <UniversityRankRanger />
        },

        {
            key: 'eligibility' as DropdownKeys,
            label: 'Eligibility',
            icon: batch,
            content: <Eligibility />
        },
        {
            key: 'deliveryMode' as DropdownKeys,
            label: 'Delivery Mode',
            icon: hat,
            content: <DeliveryModeFilter />
        }
        // {
        //     key: 'degreeType' as DropdownKeys,
        //     label: 'Program Type',
        //     icon: hat,
        //     content: <DegreeType />
        // }
    ]
    // Determine which sections to show based on pathname
    const dropdownSections = pathname.includes('jobs-list') 
        ? dropdownSectionsForJobs 
        : dropdownSectionsForDegrees

    return (
        <div className="relative flex flex-col bg-white border border-[#f6f6f6] gap-3 rounded-2xl p-6 xs:mt-14 lg:mt-0">
            <button
                onClick={toggleOpen}
                className="absolute xs:block lg:hidden left-1 top-2 rotate-180"
            >
                <CircleX
                    className="text-gray-400"
                    size={20}
                    strokeWidth={1.5}
                />
            </button>
            <div className="xs:pt-2 lg:pt-0 flex flex-col gap-2">
                {dropdownSections.map(({ key, label, icon, content }) => (
                    <div key={key}>
                        <div
                            onClick={() => toggleDropdown(key)}
                            className="flex justify-between"
                        >
                            <div className="flex gap-2">
                                {icon}
                                <label
                                    className={`${labelStyle} ${
                                        dropdowns[key] && 'font-semibold'
                                    }`}
                                >
                                    {label}
                                </label>
                            </div>
                            <div>
                                <button>
                                    <DropDownArrow rotateUp={dropdowns[key]} />
                                </button>
                            </div>
                        </div>
                        <div className="xs:py-1 lg:py-3">
                            {dropdowns[key] && content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Filter() {
    useLoadFilters()
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <div className="xs:block lg:hidden">
                <button onClick={toggleOpen}>
                    <Settings2 className="text-foreground" size={20} />
                </button>

                <div
                    className={`xs:block lg:hidden fixed z-30 w-full top-0 left-0 transition-transform duration-300 transform  ${
                        isOpen ? '' : '-translate-x-full'
                    }`}
                >
                    <Suspense><FilterOptions toggleOpen={toggleOpen} /></Suspense>
                </div>
            </div>
            <div className="xs:hidden lg:block">
                <Suspense><FilterOptions toggleOpen={toggleOpen} /></Suspense>
            </div>
        </div>
    )
}
