'use client'
import { useProgramDetailsStore } from '@/@/context/degree-details-context'
import {
    CategoryType,
    CommitmentType,
    DeliveryModeType
} from '@/@/lib/types/program-type'
import { ProgramDetailsTuitionFeeDetails } from '@/@/lib/types/program-details-type'
import { useEffect, useState } from 'react'
import { tuitionFeeFormat } from '@/@/utils/format'

export function getTuitionFee(
    tuitionFees: ProgramDetailsTuitionFeeDetails[],
    deliveryMode: DeliveryModeType,
    commitment: CommitmentType,
    category: CategoryType
) {
    // TODO: In-state / out-of-state not considered. Merged in domestic
    const matchingFee = tuitionFees.find(
        (i) =>
            i.commitment === commitment &&
            (i.category === category ||
                (category === 'domestic' && i.category !== 'international')) &&
            i.deliveryMode === deliveryMode
    )

    if (matchingFee) {
        return `${matchingFee.currency?.symbol} ${tuitionFeeFormat(
            Math.ceil(
                matchingFee.tuitionFeeInUsd *
                    (matchingFee.currency?.conversionRate || 1)
            )
        )}`
    }

    return null
}

export default function TuitionFeeTable() {
    const [deliveryMode, setDeliveryMode] =
        useState<DeliveryModeType>('on-campus')
    const [commitment, setCommitment] = useState<CommitmentType>('full-time')
    const [internationalTuitionFee, setInternationalTuitionFee] = useState<
        string | null
    >(null)
    const [domesticTuitionFee, setDomesticTuitionFee] = useState<string | null>(
        null
    )
    const divider = <div className="w-full h-[2px] bg-button-primary"></div>
    const programDetailsContext = useProgramDetailsStore()
    const tuitionFeeObject =
        programDetailsContext.programDetails?.tuitionFeesDetails
    useEffect(() => {
        setInternationalTuitionFee(
            getTuitionFee(
                tuitionFeeObject || [],
                deliveryMode,
                commitment,
                'international'
            )
        )
        setDomesticTuitionFee(
            getTuitionFee(
                tuitionFeeObject || [],
                deliveryMode,
                commitment,
                'domestic'
            )
        )
    }, [deliveryMode, commitment, tuitionFeeObject])
    return (
        <div id="funding" className="xs:px-4 md:px-16 lg:px-0 py-2">
            <h1 className="text-2xl pb-8 font-semibold text-foreground">
                Tuition Fee / year
            </h1>
            <div
                className={`rounded-xl flex flex-col gap-4 max-w-fit border-[#F0F0F0] border-2 p-4`}
            >
                <div className="flex xs:flex-col xl:flex-row items-center xs:gap-8 lg:gap-12">
                    <div className="flex xs:flex-row xl:flex-col items-center justify-center gap-8">
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-foreground text-sm ">
                                International
                            </p>
                            <p className="text-button-primary font-semibold">
                                {internationalTuitionFee || 'N/A'}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-foreground text-sm ">Domestic</p>
                            <p className="text-button-primary font-semibold">
                                {domesticTuitionFee || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start xs:gap-4 lg:gap-8 text-[#01416C]">
                        <div className="flex flex-col gap-4">
                            {/*  */}
                            <h3 className="font-semibold text-sm text-foreground">
                                Delivery Mode
                            </h3>
                            <div className="flex xs:text-xs lg:text-sm rounded-full bg-[#FAFAFA] max-w-fit">
                                <button
                                    onClick={() => setDeliveryMode('online')}
                                    className={`${
                                        deliveryMode === 'online' &&
                                        'bg-[#D9EFFE] font-medium'
                                    } py-2 px-6 rounded-full`}
                                >
                                    Online
                                </button>
                                <button
                                    onClick={() => setDeliveryMode('on-campus')}
                                    className={`${
                                        deliveryMode === 'on-campus' &&
                                        'bg-[#D9EFFE] font-semibold'
                                    } py-2 px-6 rounded-full`}
                                >
                                    On-campus
                                </button>
                                <button
                                    onClick={() => setDeliveryMode('hybrid')}
                                    className={`${
                                        deliveryMode === 'hybrid' &&
                                        'bg-[#D9EFFE] font-semibold'
                                    } py-2 px-6 rounded-full`}
                                >
                                    Hybrid
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 xs:py-2">
                            <h3 className="font-semibold text-sm text-foreground">
                                Duration
                            </h3>
                            <div className="flex xs:text-xs lg:text-sm rounded-full bg-[#FAFAFA] max-w-fit">
                                <button
                                    onClick={() => setCommitment('full-time')}
                                    className={`${
                                        commitment === 'full-time' &&
                                        'bg-[#D9EFFE] font-semibold'
                                    } py-2 px-6 rounded-full`}
                                >
                                    Full-time
                                </button>
                                <button
                                    onClick={() => setCommitment('part-time')}
                                    className={`${
                                        commitment === 'part-time' &&
                                        'bg-[#D9EFFE] font-semibold'
                                    } py-2 px-6 rounded-full`}
                                >
                                    Part-time
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
