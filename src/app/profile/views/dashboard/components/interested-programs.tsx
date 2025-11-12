import { gradientText } from '@/@/lib/styles'
import {
    leftArrow,
    rightArrow
} from '../../../../../components/dashboard/svgItems'
import Image from 'next/image'

function Heading() {
    return (
        <div className="flex xs:flex-col lg:flex-row xs:gap-4 lg:gap-0 justify-between xs:items-start lg:items-center">
            <div className="flex flex-col gap-1">
                <h2
                    className={`${gradientText} xs:text-base lg:text-xl font-bold`}
                >
                    Programs you might be interested in
                </h2>
                <h3 className={`${gradientText} font-normal text-sm`}>
                    Based on your recent searches and research interest
                </h3>
            </div>
            <div className="flex gap-4">
                {leftArrow} {rightArrow}
            </div>
        </div>
    )
}

function ProgramCard() {
    const style1 =
        'text-foreground xs:font-medium lg:font-normal xs:text-xs lg:text-base'
    const heading1 = 'text-foreground font-medium xs:text-base lg:text-lg'
    const also = <div className="h-4 w-0.5 bg-sunset rotate-[30deg]"></div>
    const style3 = `font-medium text-foreground xs:text-xs lg:text-sm`
    const style4 = `font-semibold text-button-primary xs:text-[15px] lg:text-[16px]`
    const divider = <div className="h-8 w-[3px] bg-african-violet"></div>
    return (
        <div
            className={`p-4 rounded-lg grid grid-cols-10  max-w-fit border-2 border-[#F0F0F0]`}
        >
            <div className="col-span-9 flex flex-col gap-8">
                {/* <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <Link href="/degree-details" className={heading1}>
                            {program.name}
                        </Link>
                        <div
                            className={`flex gap-4 items-center ${style1}`}
                        >
                            <p>{program.degreeType}</p>
                            {also}
                            {program.thesisBased ? (
                                <p>Thesis Based</p>
                            ) : (
                                <p>Course Based</p>
                            )}
                            {also}
                            {program.fullTime ? (
                                <p>Full Time</p>
                            ) : (
                                <p>Part Time</p>
                            )}
                            {also}
                            <p>{program.length}</p>
                        </div>
                    </div>
                    <div className="flex xs:gap-4 lg:gap-6 items-center">
                        <div className="flex flex-col gap-1">
                            <p className={style3}>Tuition Fee / year</p>
                            <p className={style4}>{program.tuitionFee}</p>
                        </div>
                        {divider}
                        <div className="flex flex-col gap-1">
                            <p className={style3}>Application Deadline</p>
                            <p className={style4}>
                                {program.applicationDeadline}
                            </p>
                        </div>
                    </div>
                </div> */}
                <div className="flex gap-2">
                    {/* <Image
                        className="rounded-full"
                        src="/alberta.png"
                        alt="university logo"
                        width={80}
                        height={80}
                    />
                    <div className="flex flex-col justify-center gap-0">
                        <p className="text-[13px] lg:text-[15px] font-semibold text-foreground">
                            {university.name}
                        </p>
                        <p className="text-[13px] lg:text-[15px] font-normal text-foreground">
                            {university.department}
                        </p>
                        <p className="text-[13px] lg:text-[15px] font-medium text-button-primary">
                            {university.location}
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

function ProgramCards() {
    return (
        <div className="flex xs:flex-col xs:gap-0 xs:gap-4 lg:gap-0 lg:flex-row lg:justify-between lg:gap-4 lg:items-center">
            <ProgramCard />
            <ProgramCard />
            <ProgramCard />
        </div>
    )
}

export default function InterestedPrograms() {
    return (
        <div className="w-full flex flex-col xs:gap-4 lg:gap-8">
            <Heading />
            <ProgramCards />
        </div>
    )
}
