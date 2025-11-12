'use client'
import { andline } from '@/@/lib/styles'
import { ProgramT } from '@/@/lib/types/program-type'
import { Bookmark, GitCompareArrows, SeparatorVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ProgramsOverlay } from '../global/skeleton'
import CustomTooltip from '../global/tooltip'
import { FindSupervisors } from '../global/filter/find-supervisor'
import useProgramListStore from '@/@/context/degree-list-context'
import { AcceptanceRateProgress, QSRankProgress } from './progress'
import { BasicProgramInfo } from './supervisor-modal'
import { AddToCompare, BookmarkProgram } from './actions'
import { Skeleton } from '@heroui/react'
import UniversityLogo from '../global/university-image'
import { BookmarkProgramDetailsT } from '@/@/lib/types/bookmarked-program-type'
import { Capitalize, dateFormat, tuitionFeeFormat } from '@/@/utils/format'
import {
    DegreeListProgramBasicInformationFormat,
    InfoItem
} from '@/@/utils/program'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const also = <div className={andline}></div>

function SecondRow(props: { p: ProgramT }) {
    const programInfo: InfoItem[] = [
        {
            label: 'Application Deadline',
            value:
                props.p.applicationDeadlines.length !== 0
                    ? dateFormat(
                          props.p.applicationDeadlines[0].deadlineTimestamp
                      )
                    : 'N/A'
        },
        {
            label: 'Tuition Fee / year',
            value: `${props.p.tuitionFees[0].currency.symbol} ${
                props.p.tuitionFees.length > 0 &&
                tuitionFeeFormat(props.p.tuitionFees[0].tuitionFee)
            }`
        },
        {
            label: 'Living Cost / year',
            value:
                props.p.university.livingCost.livingCost === 0
                    ? 'N/A'
                    : `US$ ${props.p.university.livingCost.livingCost}`
        },
        {
            label: 'Application Fee',
            value: `${props.p.applicationFees[0].currency.symbol} ${Math.ceil(
                props.p.applicationFees[0].applicationFeeInUsd *
                    props.p.applicationFees[0].currency.conversionRate
            )}`
        }
    ]
    return <DegreeListProgramBasicInformationFormat items={programInfo} />
}

function UniversityInfo({ program }: { program: ProgramT }) {
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <UniversityLogo
                    path={program.university.logo}
                    name={program.university.name}
                    size={48}
                />

                <div className="flex flex-col">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={program.university.websiteUrl}
                        className="text-sm font-medium text-foreground"
                    >
                        {program.university.name}
                    </a>
                    <p className="text-sm text-foreground/70">
                        {program.school.name}
                    </p>
                    <p className="text-sm font-medium text-foreground/80">
                        {`${program.university.livingCost.state}, ${program.university.livingCost.country}`}
                    </p>
                </div>
            </div>
            <div className="flex gap-6">
                <div className=" flex gap-2 items-center">
                    <QSRankProgress
                        maxValue={3000}
                        value={program.university.ranking}
                    />
                    <p className="text-foreground text-xs">
                        QS World University Ranking
                    </p>
                </div>
                <div className=" flex gap-2 items-center">
                    <AcceptanceRateProgress
                        maxValue={100}
                        value={program.university.acceptanceRate}
                    />
                    <p className="text-foreground text-xs">Acceptance Rate</p>
                </div>
            </div>
        </div>
    )
}

function ProgramCard({ p }: { p: ProgramT }) {
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
        <div className="bg-white px-6 py-4 border border-lightgray flex flex-col rounded-xl gap-12 hover:bg-secondary/20 transition-color duration-300">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <Link
                        href={`/degree-details/${p.uuid}`}
                        className="text-lg text-foreground font-semibold"
                    >
                        {p.name}
                    </Link>
                    <div className="flex gap-4 items-center text-foreground font-light text-sm">
                        <p>{Capitalize(p.degreeLevel)}</p>
                        {p.types.map((type, index) => (
                            <div
                                className="flex gap-4 items-center text-foreground font-light text-sm"
                                key={index}
                            >
                                {also}
                                <p>{Capitalize(type.type)}</p>
                            </div>
                        ))}
                        {p.commitments.map((commitment, index) => (
                            <div
                                className="flex gap-4 items-center text-foreground font-light text-sm"
                                key={index}
                            >
                                {also}
                                <p>{Capitalize(commitment.commitment)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <AddToCompare program={p} />
                    <BookmarkProgram
                        uuid={p.uuid}
                        isBookmarked={p.isBookmarked}
                    />
                    <FindSupervisors program={basicProgramInfo} />
                    {/* Might not need it */}
                    {/* <FindSupervisor program={basicProgramInfo} /> */}
                </div>
            </div>
            <div className="flex justify-between">
                <SecondRow p={p} />
                {/* <BookmarkProgram uuid={p.uuid} isBookmarked={p.isBookmarked} /> */}
            </div>
            <UniversityInfo program={p} />
        </div>
    )
}

export default function ProgramCardColumn({
    bookmarked_programs
}: {
    bookmarked_programs?: BookmarkProgramDetailsT[]
}) {
    const statePrograms = useProgramListStore((state) => state.programs)
    const programs = bookmarked_programs || statePrograms
    if (!programs) {
        return <ProgramsOverlay />
    } else
        return (
            <div className={`flex flex-col gap-8 transition-all `}>
                {programs.map((program, index) => (
                    <div key={index}>
                        <ProgramCard p={program} />
                    </div>
                ))}
            </div>
        )
}
