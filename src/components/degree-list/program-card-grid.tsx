'use client'
import { useContext, useState } from 'react'
import Image from 'next/image'
import { FindSupervisors } from '../global/filter/find-supervisor'
import { allRanks, bookmark, iNote, moreInformation } from './icons'
import InfoSwitcher from './info-switcher'
import { ProgramT } from '@/@/lib/types/program-type'
import useProgramListStore from '@/@/context/degree-list-context'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/@/components/global/skeleton'
import { Bookmark, GitCompareArrows, Info } from 'lucide-react'
import { BasicProgramInfo } from './supervisor-modal'
import { getUniversityLogoUrl } from '@/@/utils/format'
import CustomTooltip from '../global/tooltip'
import { AddToCompare, BookmarkProgram } from './actions'
import UniversityLogo from '../global/university-image'
import { BookmarkProgramDetailsT } from '@/@/lib/types/bookmarked-program-type'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const bookmarked = (
    <div className="w-10 h-10 rounded-full bg-[#FFCB77]"></div>
)

function ProgramCard({ p }: { p: ProgramT }) {
    const [infoHover, setInfoHover] = useState(false)
    const [ranksHover, setRanksHover] = useState(false)
    const basicProgramInfo: BasicProgramInfo = {
        uniLogo: p.university.logo,
        name: p.name,
        school: p.school.name,
        degreeLevel: p.degreeLevel,
        programUuid: p.uuid,
        degreeType: p.types,
        degreeCommitment: p.commitments
    }
    return (
        <div
            className={`p-4 rounded-lg bg-white hover:bg-gradient-to-br hover:from-[#F4FDFF] hover:to-[#fefefe] hover:border-button-light-primary hover:border border border-lightgray'
            }`}
        >
            <div className="flex flex-col gap-4">
                <div className="relative flex items-start justify-between">
                    <InfoSwitcher
                        info={infoHover}
                        ranks={ranksHover}
                        program={p}
                    />
                    <button
                        className="absolute right-0"
                        onMouseEnter={() => setInfoHover(true)}
                        onMouseLeave={() => setInfoHover(false)}
                    >
                        <CustomTooltip
                            Component={
                                <Info className="text-[#EAEAEA]" size={32} />
                            }
                            tip="Primary information"
                        />
                    </button>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <div className="min-w-fit">
                            <UniversityLogo
                                path={p.university.logo}
                                name={p.university.name}
                                size={48}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[15px] font-semibold text-foreground">
                                {p.university.name}
                            </p>
                            <p className="text-[15px] font-normal text-foreground">
                                {p.school.name}
                            </p>
                            <p className="text-[15px] font-medium text-button-primary">
                                {`${p.university.livingCost.state}, ${p.university.livingCost.country}`}
                            </p>
                        </div>
                    </div>
                    <button
                        onMouseEnter={() => setRanksHover(true)}
                        onMouseLeave={() => setRanksHover(false)}
                    >
                        <CustomTooltip
                            Component={
                                <Info className="text-[#EAEAEA]" size={32} />
                            }
                            tip="Rankings"
                        />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <FindSupervisors program={basicProgramInfo} />
                    <div className="flex gap-2">
                        <AddToCompare program={p} />
                        <BookmarkProgram
                            uuid={p.uuid}
                            isBookmarked={p.isBookmarked}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ProgramCardGrid({
    bookmarked_programs
}: {
    bookmarked_programs?: BookmarkProgramDetailsT[]
}) {
    const statePrograms = useProgramListStore((state) => state.programs)
    const programs = bookmarked_programs || statePrograms
    if (!programs) {
        return <LoadingSpinner />
    } else
        return (
            <div
                className={`grid xs:grid-cols-1 xl:grid-cols-2 gap-4 transition-all `}
            >
                {programs.map((program, index) => (
                    <div key={index}>
                        <ProgramCard p={program} />
                    </div>
                ))}
            </div>
        )
}
