import { info } from 'console'
import Link from 'next/link'
import { AcceptanceRateProgress, QSRankProgress } from './progress'
import { ProgramT } from '@/@/lib/types/program-type'
import { Capitalize, dateFormat, tuitionFeeFormat } from '@/@/utils/format'
import { SeparatorVerticalIcon } from 'lucide-react'
import CustomTooltip from '../global/tooltip'
import {
    DegreeListProgramBasicInformationFormat,
    InfoItem
} from '@/@/utils/program'

const divider = <div className="h-8 w-[3px] bg-african-violet"></div>

function PrimaryInformation(props: { p: ProgramT }) {
    const style1 = 'text-foreground font-light xs:text-xs md:text-sm'
    const heading1 =
        'text-foreground font-medium xs:text-base lg:text-lg truncate w-5/6'
    const also = (
        <div className="h-4 w-0.5 bg-african-violet rotate-[30deg]"></div>
    )
    const style3 = 'text-sm text-foreground/90 font-light'
    const style4 = 'font-medium text-primary'
    const str = props.p.degreeLevel
    const degreeLevel = str[0].toUpperCase() + str.slice(1)
    const programInfo: InfoItem[] = [
        {
            label: 'Tuition Fee / year',
            value: `${props.p.tuitionFees[0].currency.symbol} ${
                props.p.tuitionFees.length > 0 &&
                tuitionFeeFormat(props.p.tuitionFees[0].tuitionFee)
            }`
        },
        {
            label: 'Application Deadline',
            value:
                props.p.applicationDeadlines.length !== 0
                    ? dateFormat(
                          props.p.applicationDeadlines[0].deadlineTimestamp
                      )
                    : 'N/A'
        }
    ]
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <CustomTooltip
                    Component={
                        <Link
                            href={`/degree-details/${props.p.uuid}`}
                            className={heading1}
                        >
                            {props.p.name}
                        </Link>
                    }
                    tip={props.p.name}
                />
                <div
                    className={`flex flex-wrap xs:gap-2 md:gap-4 items-center ${style1}`}
                >
                    <p>{Capitalize(degreeLevel)}</p>

                    {props.p.types.map((type, index) => (
                        <div
                            className={`flex gap-4 items-center ${style1}`}
                            key={index}
                        >
                            {also}
                            <p>{Capitalize(type.type)}</p>
                        </div>
                    ))}
                    {props.p.commitments.map((commitment, index) => (
                        <div
                            className={`flex gap-4 items-center ${style1}`}
                            key={index}
                        >
                            {also}
                            <p>{Capitalize(commitment.commitment)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <DegreeListProgramBasicInformationFormat items={programInfo} />
            {/* <div className="flex xs:gap-4 lg:gap-6 items-center">
                <div className="flex flex-col gap-1">
                    <p className={style3}>Tuition Fee / year</p>
                    <p className={style4}>{`${
                        props.p.tuitionFees[0].currency.code
                    } ${
                        props.p.tuitionFees.length > 0 &&
                        tuitionFeeFormat(props.p.tuitionFees[0].tuitionFeeInUsd)
                    }`}</p>
                </div>
                <SeparatorVerticalIcon
                    strokeWidth={1.5}
                    className="text-lightblue"
                />
                <div className="flex flex-col gap-1">
                    <p className={style3}>Application Deadline</p>
                    <p className={style4}>
                        {props.p.applicationDeadlines.length !== 0
                            ? dateFormat(
                                  props.p.applicationDeadlines[0]
                                      .deadlineTimestamp
                              )
                            : 'N/A'}
                    </p>
                </div>
            </div> */}
        </div>
    )
}

function SecondaryInformation({ program }: { program: ProgramT }) {
    const style3 = 'text-sm text-foreground/90 font-light'
    const style4 = 'font-medium text-primary'
    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-center">
                <div className="flex flex-col gap-1">
                    <p className={style3}>Average Living Cost / year</p>
                    <p className={style4}>{`${
                        program.university.livingCost.livingCost === 0
                            ? 'N/A'
                            : `US$ ${program.university.livingCost.livingCost}`
                    }`}</p>
                </div>
                {divider}
                <div className="flex flex-col gap-1">
                    <p className={style3}>Application Fee</p>
                    <p className={style4}>{`${
                        program.applicationFees[0].currency.symbol
                    } ${Math.ceil(
                        program.applicationFees[0].applicationFeeInUsd *
                            program.applicationFees[0].currency.conversionRate
                    )}`}</p>
                </div>
            </div>
            <div className="flex gap-6 items-center">
                <div className="flex flex-col gap-1">
                    <p className={style3}>Tuition Fee / Year</p>
                    <p className={style4}>
                        {program.tuitionFees[0].currency.symbol}
                        {program.tuitionFees.length > 0 &&
                            tuitionFeeFormat(program.tuitionFees[0].tuitionFee)}
                    </p>
                </div>
                {divider}
                <div className="flex flex-col gap-1">
                    <p className={style3}>Application Deadline</p>
                    <p className={style4}>
                        {program.applicationDeadlines.length !== 0
                            ? dateFormat(
                                  program.applicationDeadlines[0]
                                      .deadlineTimestamp
                              )
                            : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}

function Rankings({ p }: { p: ProgramT }) {
    return (
        <div className="flex gap-8 justify-center items-center py-4 w-full">
            <div className="flex flex-col gap-2 justify-center items-center">
                <QSRankProgress maxValue={3000} value={p.university.ranking} />
                <p className="text-foreground font-medium text-sm">
                    QS World University Ranking
                </p>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <AcceptanceRateProgress
                    maxValue={100}
                    value={p.university.acceptanceRate}
                />
                <p className="text-foreground font-medium text-sm">
                    Acceptance Rate
                </p>
            </div>
        </div>
    )
}

export default function InfoSwitcher(props: {
    info: boolean
    ranks: boolean
    program: ProgramT
}) {
    return (
        <div className="w-full h-36">
            {props.info ? (
                <SecondaryInformation program={props.program} />
            ) : props.ranks ? (
                <Rankings p={props.program} />
            ) : (
                <PrimaryInformation p={props.program} />
            )}
        </div>
    )
}
