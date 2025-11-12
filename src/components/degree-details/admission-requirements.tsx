'use client'
import { gradientCards } from '@/@/lib/styles'
import { CircularProgress } from '@heroui/react'
import { useContext } from 'react'
import LoadingSpinner from '@/@/components/global/skeleton'
import { useProgramDetailsStore } from '@/@/context/degree-details-context'

function ScoreCards() {
    const programDetails =
        useProgramDetailsStore().programDetails?.addmissionRequirements
    if (!programDetails) {
        return <LoadingSpinner />
    } else {
        const ielts = (
            <div className={`${gradientCards} rounded-lg p-4`}>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-button-light-primary font-bold text-[18px]">
                            IELTS
                        </p>
                        <p className="text-button-light-primary font-bold text-[20px]">
                            {programDetails?.programIeltsRequirement?.overall}
                        </p>
                    </div>
                    <div className="w-full h-0.5 bg-button-primary bg-opacity-40"></div>
                    <div className="text-button-light-primary font-normal text-sm flex flex-col gap-1">
                        {programDetails?.programIeltsRequirement?.reading && (
                            <div className="flex justify-between">
                                <p>Reading</p>
                                <p>
                                    {
                                        programDetails?.programIeltsRequirement
                                            ?.reading
                                    }
                                </p>
                            </div>
                        )}
                        {programDetails?.programIeltsRequirement?.listening && (
                            <div className="flex justify-between">
                                <p>Listening</p>
                                <p>
                                    {
                                        programDetails?.programIeltsRequirement
                                            ?.listening
                                    }
                                </p>
                            </div>
                        )}
                        {programDetails?.programIeltsRequirement?.writing && (
                            <div className="flex justify-between">
                                <p>Writing</p>
                                <p>
                                    {
                                        programDetails?.programIeltsRequirement
                                            ?.writing
                                    }
                                </p>
                            </div>
                        )}
                        {programDetails?.programIeltsRequirement?.speaking && (
                            <div className="flex justify-between">
                                <p>Speaking</p>
                                <p>
                                    {
                                        programDetails?.programIeltsRequirement
                                            ?.speaking
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
        const toefl = (
            <div className={`${gradientCards} rounded-lg p-4`}>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-button-light-primary font-bold text-[18px]">
                            TOEFL
                        </p>
                        <p className="text-button-light-primary font-bold text-[20px]">
                            {programDetails?.programToeflRequirement?.overall}
                        </p>
                    </div>
                    <div className="w-full h-0.5 bg-button-primary bg-opacity-40"></div>
                    <div className="text-button-light-primary font-normal text-sm flex flex-col gap-1">
                        {programDetails?.programToeflRequirement?.reading && (
                            <div className="flex justify-between">
                                <p>Reading</p>
                                <p>
                                    {
                                        programDetails?.programToeflRequirement
                                            ?.reading
                                    }
                                </p>
                            </div>
                        )}
                        {programDetails?.programToeflRequirement?.listening && (
                            <div className="flex justify-between">
                                <p>Listening</p>
                                <p>
                                    {
                                        programDetails?.programToeflRequirement
                                            ?.listening
                                    }
                                </p>
                            </div>
                        )}
                        {programDetails?.programToeflRequirement?.writing && (
                            <div className="flex justify-between">
                                <p>Writing</p>
                                <p>
                                    {
                                        programDetails?.programToeflRequirement
                                            ?.writing
                                    }
                                </p>
                            </div>
                        )}
                        {programDetails?.programToeflRequirement?.speaking && (
                            <div className="flex justify-between">
                                <p>Speaking</p>
                                <p>
                                    {
                                        programDetails?.programToeflRequirement
                                            ?.speaking
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
        const det = (
            <div className={`${gradientCards} rounded-lg p-4`}>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-button-light-primary font-bold text-[18px]">
                            DET
                        </p>
                        <p className="text-button-light-primary font-bold text-[20px]">
                            90
                        </p>
                    </div>
                    <p className="text-button-light-primary font-normal text-sm">
                        Requires minimum 90 in each band
                    </p>
                </div>
            </div>
        )
        const gre = (
            <div className={`${gradientCards} rounded-lg p-4`}>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-button-light-primary font-bold text-[18px]">
                            GRE
                        </p>
                        <p className="text-button-light-primary font-bold text-[20px]">
                            N/A
                        </p>
                    </div>
                    <p className="text-button-light-primary font-normal text-sm">
                        Not required for this program
                    </p>
                </div>
            </div>
        )
        return (
            <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {ielts} {toefl}
                {/* {det} {gre} */}
            </div>
        )
    }
}

function EnglishLanguageTestRequirements() {
    return (
        <div className="lg:pt-4 flex flex-col gap-8">
            <ScoreCards />
        </div>
    )
}

function ProgressCircle(props: {
    identity: 0 | 1
    maxValue: number
    value: number
}) {
    const strokeColor =
        props?.identity == 0 ? 'stroke-[#F35B04]/70' : 'stroke-[#18467E]/70'
    const trackColor =
        props?.identity == 0 ? 'stroke-[#F35B04]/50' : 'stroke-[#18467E]/20'
    return (
        <CircularProgress
            classNames={{
                svg: 'w-12 h-12 drop-shadow-md',
                indicator: strokeColor,
                track: trackColor,
                value: 'text-xs font-semibold text-[#18467E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            }}
            aria-label="Progress Bar"
            value={props?.value}
            valueLabel={props?.value}
            maxValue={props?.maxValue}
            strokeWidth={2}
            showValueLabel={true}
        />
    )
}

export default function AdmissionRequirements() {
    const programDetailsContext = useProgramDetailsStore()
    const cardStyle =
        'xs:col-span-2 lg:col-span-1 bg-white rounded-xl border-[#F0F0F0] border-2 p-4'
    const programDetails =
        useProgramDetailsStore().programDetails?.addmissionRequirements
    if (!programDetails) {
        return <LoadingSpinner />
    } else
        return (
            <div
                id="admission-requirements"
                className="xs:pt-52 lg:pt-0 xs:px-4 md:px-16 lg:px-0 py-4"
            >
                <div className="flex flex-col gap-8">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Admission Requirements
                    </h1>
                    <div className="grid grid-cols-2 gap-4">
                        {/* CGPA CARD */}
                        <div className={cardStyle}>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-2">
                                    <span className="text-button-primary font-bold">
                                        CGPA
                                    </span>
                                    <span className="text-foreground text-sm">{`Minimum CGPA requirement is ${programDetailsContext?.programDetails?.addmissionRequirements?.programGpaRequirement?.gpaPoint} with a minimum ${programDetailsContext?.programDetails?.addmissionRequirements?.programGpaRequirement?.gpaPercentage}%`}</span>
                                </div>
                                <div
                                    className="w-16 h-16 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-xl text-foreground font-semibold"
                                >
                                    <span>
                                        {
                                            programDetailsContext
                                                ?.programDetails
                                                ?.addmissionRequirements
                                                ?.programGpaRequirement
                                                ?.gpaPoint
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* GRE CARD */}
                        <div className={cardStyle}>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-2">
                                    <span className="text-button-primary font-bold">
                                        GRE
                                    </span>
                                    <span className="text-foreground text-sm">{`GRE requiremnt for this program is ${programDetailsContext?.programDetails?.addmissionRequirements?.programGreRequirement?.requirement}`}</span>
                                </div>
                                <div
                                    className="w-16 h-16 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-xl text-foreground font-semibold"
                                >
                                    <span>{'N/A'}</span>
                                </div>
                            </div>
                        </div>
                        {/* IELTS */}
                        <div className={`${cardStyle} flex flex-col gap-4`}>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-2">
                                    <span className="text-button-primary font-bold">
                                        IELTS
                                    </span>
                                    <span className="text-foreground text-sm">{`Requires minimum IELTS score of ${programDetailsContext?.programDetails?.addmissionRequirements?.programIeltsRequirement?.overall}`}</span>
                                </div>
                                <div
                                    className="w-16 h-16 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-xl text-foreground font-semibold"
                                >
                                    <span>
                                        {
                                            programDetailsContext
                                                ?.programDetails
                                                ?.addmissionRequirements
                                                ?.programIeltsRequirement
                                                ?.overall
                                        }
                                    </span>
                                </div>
                            </div>
                            {/* Reading, Writing, Speaking, Listening */}
                            <div className="grid grid-cols-2 gap-4 justify-items-center">
                                <div className="col-span-1 flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-foreground font-semibold"
                                    >
                                        <span>
                                            {
                                                programDetailsContext
                                                    ?.programDetails
                                                    ?.addmissionRequirements
                                                    ?.programIeltsRequirement
                                                    ?.speaking
                                            }
                                        </span>
                                    </div>
                                    <span className="text-foreground text-sm">
                                        Speaking
                                    </span>
                                </div>
                                <div className="col-span-1 flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-foreground font-semibold"
                                    >
                                        <span>
                                            {
                                                programDetailsContext
                                                    ?.programDetails
                                                    ?.addmissionRequirements
                                                    ?.programIeltsRequirement
                                                    ?.listening
                                            }
                                        </span>
                                    </div>
                                    <span className="text-foreground text-sm">
                                        Listening
                                    </span>
                                </div>
                                <div className="col-span-1 flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-foreground font-semibold"
                                    >
                                        <span>
                                            {
                                                programDetailsContext
                                                    ?.programDetails
                                                    ?.addmissionRequirements
                                                    ?.programIeltsRequirement
                                                    ?.reading
                                            }
                                        </span>
                                    </div>
                                    <span className="text-foreground text-sm">
                                        Reading
                                    </span>
                                </div>
                                <div className="col-span-1 flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-foreground font-semibold"
                                    >
                                        <span>
                                            {
                                                programDetailsContext
                                                    ?.programDetails
                                                    ?.addmissionRequirements
                                                    ?.programIeltsRequirement
                                                    ?.writing
                                            }
                                        </span>
                                    </div>
                                    <span className="text-foreground text-sm">
                                        Writing
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Toefl */}
                        <div className={`${cardStyle} flex flex-col gap-4`}>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-2">
                                    <span className="text-button-primary font-bold">
                                        TOEFL
                                    </span>
                                    <span className="text-foreground text-sm">{`Requires minimum TOEFL score of ${programDetailsContext?.programDetails?.addmissionRequirements?.programToeflRequirement?.overall}`}</span>
                                </div>
                                <div
                                    className="w-16 h-16 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-xl text-foreground font-semibold"
                                >
                                    <span>
                                        {
                                            programDetailsContext
                                                ?.programDetails
                                                ?.addmissionRequirements
                                                ?.programToeflRequirement
                                                ?.overall
                                        }
                                    </span>
                                </div>
                            </div>
                            {/* Reading, Writing, Speaking, Listening */}
                            <div className="grid grid-cols-2 gap-4 justify-items-center">
                                <div className="col-span-1 flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-foreground font-semibold"
                                    >
                                        <span>
                                            {programDetailsContext
                                                ?.programDetails
                                                ?.addmissionRequirements
                                                ?.programToeflRequirement
                                                ?.speaking || 'N/A'}
                                        </span>
                                    </div>
                                    <span className="text-foreground text-sm">
                                        Speaking
                                    </span>
                                </div>
                                <div className="col-span-1 flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-foreground font-semibold"
                                    >
                                        <span>
                                            {programDetailsContext
                                                ?.programDetails
                                                ?.addmissionRequirements
                                                ?.programToeflRequirement
                                                ?.listening || 'N/A'}
                                        </span>
                                    </div>
                                    <span className="text-foreground text-sm">
                                        Listening
                                    </span>
                                </div>
                                <div className="col-span-1 flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-foreground font-semibold"
                                    >
                                        <span>
                                            {programDetailsContext
                                                ?.programDetails
                                                ?.addmissionRequirements
                                                ?.programToeflRequirement
                                                ?.reading || 'N/A'}
                                        </span>
                                    </div>
                                    <span className="text-foreground text-sm">
                                        Reading
                                    </span>
                                </div>
                                <div className="col-span-1 flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-3 text-foreground font-semibold"
                                    >
                                        <span>
                                            {programDetailsContext
                                                ?.programDetails
                                                ?.addmissionRequirements
                                                ?.programToeflRequirement
                                                ?.writing || 'N/A'}
                                        </span>
                                    </div>
                                    <span className="text-foreground text-sm">
                                        Writing
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
