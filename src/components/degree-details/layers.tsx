'use client'
import React, { useContext, useEffect, useState } from 'react'
import AdmissionRequirements from './admission-requirements'
import ApplicationChecklist from './application-checklist'
import Image from 'next/image'
import { BasicUniInfoBox, DateAndTimelineCard, JoinEuclido } from './cards'
import {
    ProgramDetailsProgramCommitment,
    ProgramDetailsProgramType,
    ProgramDetailsT
} from '@/@/lib/types/program-details-type'

import TuitionFeeTable from './tuition-fee'
import LoadingSpinner, {
    DegreeDetailsTopLayerSkeleton
} from '@/@/components/global/skeleton'
import { also } from '@/@/components/degree-list/program-card-column'
import { Capitalize, tuitionFeeFormat } from '@/@/utils/format'
import {
    Calendar,
    Coins,
    MoveUpRight,
    Sprout,
    ThumbsUp,
    WalletCards
} from 'lucide-react'
import { BasicProgramInfo } from '@/@/components/degree-list/supervisor-modal'
import { FindSupervisors } from '../global/filter/find-supervisor'
import { useProgramDetailsStore } from '@/@/context/degree-details-context'
import UniversityLogo from '@/@/components/global/university-image'
import { BookmarkProgram } from '../degree-list/actions'

export function TopLayer({ uuid }: { uuid: string }) {
    const informationCardStyle =
        'xs:col-span-5 md:col-span-2 lg:col-span-1 rounded-xl bg-white/30 p-4 flex flex-col gap-1'
    const informationStyle = 'pt-1 text-lg font-semibold text-foreground'

    const programDetailsContext = useProgramDetailsStore()
    const programDetails = programDetailsContext.programDetails
    useEffect(() => {
        const fetchData = async () => {
            const response = await programDetailsContext.fetchProgramDetails(
                uuid
            )
            console.log(response)
        }
        fetchData()
    }, [])
    if (!programDetails) {
        return <DegreeDetailsTopLayerSkeleton />
    } else {
        const basicProgramInfo: BasicProgramInfo = {
            uniLogo: programDetails.university?.logo,
            name: programDetails.name,
            school: programDetails.school?.name,
            degreeLevel: programDetails.degreeLevel,
            programUuid: uuid,
            degreeType: programDetails.type,
            degreeCommitment: programDetails.commitment
        }
        return (
            <div className="xs:px-4 lg:px-16 flex flex-col items-center justify-center xs:gap-8 lg:gap-12">
                {/* Scool - University */}
                <div className="flex xs:flex-col lg:flex-row gap-2 items-center justify-center lg:bg-white xs:rounded-md lg:rounded-full py-1 px-2">
                    <UniversityLogo
                        path={programDetails.university.logo}
                        name={programDetails.university.name}
                        size={40}
                    />

                    <span className="text-sm text-foreground font-medium">
                        {`${programDetails.school?.name}, ${programDetails.university?.name}`}
                    </span>
                </div>
                {/* Program */}
                <div className="flex flex-col xs:gap-2 lg:gap-8 items-center justify-center">
                    <h1 className="xs:text-2xl lg:text-4xl font-semibold text-foreground">
                        {programDetails.name}
                    </h1>
                    <div className="flex flex-wrap xs:gap-2 lg:gap-4 items-center">
                        <p className="text-foreground">
                            {Capitalize(programDetails.degreeLevel)}
                        </p>

                        {programDetails.type?.map(
                            (
                                type: ProgramDetailsProgramType,
                                index: number
                            ) => (
                                <div
                                    className="flex xs:gap-2 lg:gap-4 items-center text-foreground"
                                    key={index}
                                >
                                    <span>{also}</span>
                                    <p>{Capitalize(type?.type)}</p>
                                </div>
                            )
                        )}
                        {programDetails.commitment?.map(
                            (
                                commitment: ProgramDetailsProgramCommitment,
                                index: number
                            ) => (
                                <div
                                    className="flex gap-4 items-center text-foreground"
                                    key={index}
                                >
                                    <span>{also}</span>
                                    <span>
                                        {Capitalize(commitment?.commitment)}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
                {/* Cards */}
                <div className="grid grid-cols-5 w-full xs:px-4 lg:px-20 gap-8">
                    {/* first */}

                    <div className={informationCardStyle}>
                        <Calendar
                            className="text-button-primary"
                            size={30}
                            strokeWidth={1.5}
                        />
                        <span className="text-foreground">
                            Application Deadline
                        </span>
                        <span className={informationStyle}>
                            {programDetails.applicationDeadline}
                        </span>
                    </div>
                    {/* second */}
                    <div className={informationCardStyle}>
                        <Sprout
                            className="text-african-violet"
                            size={30}
                            strokeWidth={1.5}
                        />
                        <span className="text-foreground">Program Inatke</span>
                        <span className={informationStyle}>
                            {programDetails.programIntake
                                ? programDetails?.programIntake
                                : 'N/A'}
                        </span>
                    </div>
                    {/* 3rd */}
                    <div className={informationCardStyle}>
                        <Coins
                            className="text-[#F18701]"
                            size={30}
                            strokeWidth={1.5}
                        />
                        <span className="text-foreground">
                            Tuition Fees / Year
                        </span>
                        <span className={informationStyle}>{`${tuitionFeeFormat(
                            programDetails.tuitionFee?.tuitionFee
                        )} ${programDetails.tuitionFee?.currency}`}</span>
                    </div>

                    {/* 4rth */}
                    <div className={informationCardStyle}>
                        <WalletCards
                            className="text-[#F9C80E]"
                            size={30}
                            strokeWidth={1.5}
                        />
                        <span className="text-foreground">Application Fee</span>
                        <span
                            className={informationStyle}
                        >{`${programDetails.applicationFee} ${programDetails.applicationFeeCurrency}`}</span>
                    </div>
                    <div className={informationCardStyle}>
                        <ThumbsUp
                            className="text-[#17C3B2]"
                            size={30}
                            strokeWidth={1.5}
                        />
                        <span className="text-foreground">Acceptance Rate</span>
                        <span className={informationStyle}>
                            {`${programDetails.university?.acceptanceRate}%`}
                        </span>
                    </div>
                </div>

                {/* Find superisor and Program page */}
                <div className="flex xs:flex-col md:flex-row gap-6">
                    <FindSupervisors program={basicProgramInfo} />
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={programDetails.url}
                        className="px-4 flex gap-2 items-center py-2 rounded-full bg-white text-button-primary border-button-light-primary  text-sm"
                    >
                        <span>Visit Program Page</span>
                        <span>
                            <MoveUpRight strokeWidth={1} size={20} />
                        </span>
                    </a>
                    <BookmarkProgram
                        uuid={uuid}
                        isBookmarked={
                            programDetailsContext.programDetails
                                ?.isBookmarked || false
                        }
                    />
                </div>
            </div>
        )
    }
}

export function SecondLayer({ isSignedIn }: { isSignedIn: boolean }) {
    const programDetails = useProgramDetailsStore().programDetails
    const descriptionStyle =
        'text-foreground font-normal text-sm leading-6 text-justify whitespace-pre-line'
    return (
        <div className="grid grid-cols-1 gap-y-8 xs:px-0 lg:px-36">
            <div id="overview" className="py-10 xs:px-0 md:px-16 lg:px-0">
                <div className="grid xs:grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
                    <div className={`lg:col-span-8 flex flex-col gap-12`}>
                        <div className="flex flex-col xs:px-2 lg:px-0 gap-4">
                            <h1 className="text-2xl font-semibold text-foreground">
                                About this program
                            </h1>
                            <div className={descriptionStyle}>
                                {programDetails?.overview}
                            </div>
                        </div>
                        {isSignedIn && <DateAndTimelineCard />}
                        {isSignedIn && <AdmissionRequirements />}
                        {isSignedIn && <ApplicationChecklist />}
                    </div>
                    <div className="xs:hidden lg:block lg:col-span-4 flex flex-col gap-12">
                        <BasicUniInfoBox />
                    </div>
                </div>
            </div>
            {!isSignedIn && <JoinEuclido />}
            {isSignedIn && <TuitionFeeTable />}
        </div>
    )
}
