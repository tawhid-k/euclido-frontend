import Image from 'next/image'
import {
    calender,
    flower,
    moneyBox,
    thumpsUp,
    cuteCalender,
    programDurationIcon,
    i,
    bookmark,
    money,
    joinEuclidoCartoon
} from './icons'
import { FindSupervisors } from '../global/filter/find-supervisor'
import { QSRankProgressDegreeDetails } from '../degree-list/progress'
import { arrow } from '../degree-list/icons'
import { useContext } from 'react'
import LoadingSpinner from '@/@/components/global/skeleton'
import { Capitalize } from '@/@/utils/format'
import { BasicProgramInfo } from '@/@/components/degree-list/supervisor-modal'
import { Bookmark, MoveUpRight } from 'lucide-react'
import { BookmarkProgram } from '@/@/components/degree-list/actions'
import { useProgramDetailsStore } from '@/@/context/degree-details-context'
import UniversityLogo from '../global/university-image'
import Link from 'next/link'

export function JoinEuclido() {
    return (
        <div
            className={`bg-gradient-to-r from-[#00406B] via-[#036694] via-60% to-[#017195] w-full rounded-lg`}
        >
            <div className="grid grid-cols-2">
                <div className="col-span-1 p-8 flex flex-col justify-between">
                    <h1 className="text-light-text text-2xl font-semibold">
                        Create a free account on Euclido to unlock full content
                    </h1>
                    <p className="text-button-light-primary font-normal text-sm w-2/3">
                        Learn about admission requirements, application
                        checklists, funding, expenses and much more ...
                    </p>
                    <Link
                        href={'/auth/register'}
                        className="text-button-primary w-[200px] rounded-full bg-button-light-primary px-4 py-2 text-sm font-semibold"
                    >
                        <div className="flex items-center justify-center gap-4">
                            <p>Join Euclido</p>
                            {arrow}
                        </div>
                    </Link>
                </div>
                <div className="col-span-1 pt-12 flex justify-center items-end">
                    {joinEuclidoCartoon}
                </div>
            </div>
        </div>
    )
}

export function BasicUniInfoBox() {
    const programDetails = useProgramDetailsStore().programDetails
    const style1 = 'font-medium xs:text-xs lg:text-sm text-foreground'
    const style2 = 'font-semibold xs:text-xs lg:text-sm text-button-primary'
    return (
        <div className="rounded-md py-8 xs:px-4 lg:px-12 bg-white border-[#F0F0F0] border-2 flex flex-col justify-center items-start gap-8">
            <div className="flex gap-4 items-center">
                <UniversityLogo
                    path={programDetails?.university.logo || ''}
                    size={80}
                    name="university logo"
                />
                <div className="flex flex-col justify-center gap-1">
                    <p className="xs:text-[16px] lg:text-[20px] font-semibold text-foreground">
                        {programDetails?.university.name}
                    </p>
                    <p className="xs:text-[16px] lg:text-[18px] font-medium text-button-primary">
                        {`${Capitalize(
                            programDetails?.university.city || ''
                        )}, ${Capitalize(
                            programDetails?.university.countryCode || ''
                        )}`}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                {/* TODO: Information not available */}
                <div className="flex justify-between">
                    <p className={style1}>Academic Staff</p>
                    <p className={style2}>
                        {
                            programDetails?.university.universityDetails
                                ?.academicStaffCount || 'N/A'
                        }
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className={style1}>Administrative Staff</p>
                    <p className={style2}>
                        {
                            programDetails?.university.universityDetails
                                ?.administrativeStaffCount || 'N/A'
                        }
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className={style1}>Students</p>
                    <p className={style2}>
                        {
                            programDetails?.university.universityDetails
                                ?.studentCount || 'N/A'
                        }
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-medium xs:text-xs lg:text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#00406B] via-[#036694] to-[#007DD1]">
                        QS World Rankings
                    </p>
                    <QSRankProgressDegreeDetails
                        maxValue={500}
                        value={programDetails?.university.ranking || 0}
                    />
                </div>
            </div>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={programDetails?.university.websiteUrl}
                className="px-4 flex gap-2 items-center py-2 rounded-full bg-secondary text-button-primary border-button-light-primary  text-sm"
            >
                <span>Visit University Website</span>
                <span>
                    <MoveUpRight strokeWidth={1} size={20} />
                </span>
            </a>
        </div>
    )
}

export function UniversityInformationCard({ uuid }: { uuid: string }) {
    const style1 =
        'text-foreground xs:font-medium lg:font-normal xs:text-xs lg:text-base'
    const heading1 = 'text-foreground font-medium text-lg'
    const also = <div className="h-4 w-0.5 bg-sunset rotate-[30deg]"></div>
    const textColor = 'text-[#18467E]'
    const tagStyle = `flex gap-2 items-center ${textColor} font-medium xs:text-xs lg:text-sm rounded-full p-2 border-2 border-[#1469FF] border-opacity-5`
    const programDetailsContext = useProgramDetailsStore()
    const programDetails = programDetailsContext?.programDetails

    if (!programDetails) {
        return <LoadingSpinner />
    } else {
        const basicProgramInfo: BasicProgramInfo = {
            uniLogo: programDetails.university.logo,
            name: programDetails.name,
            school: programDetails.school.name,
            degreeLevel: programDetails.degreeLevel,
            programUuid: uuid,
            degreeType: programDetails.type,
            degreeCommitment: programDetails.commitment
        }
        return (
            <div className="flex flex-col xs:gap-8 lg:gap-12">
                <div className="flex flex-col gap-4">
                    <h1 className="xs:text-lg lg:text-2xl xs:font-semibold lg:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00406B] via-[#036694] to-[#007DD1]">
                        {programDetails.name}
                    </h1>
                    <div
                        className={`flex xs:gap-3 lg:gap-4 items-center ${style1}`}
                    >
                        <p>{Capitalize(programDetails.degreeLevel)}</p>

                        {programDetails.commitment.map((i, index) => (
                            <div
                                key={index}
                                className={`flex xs:gap-3 lg:gap-4 items-center ${style1}`}
                            >
                                {also}
                                <p>{Capitalize(i.commitment)}</p>
                            </div>
                        ))}
                        {also}
                        <p>{programDetails.duration[0].duration + ' months'}</p>
                    </div>
                </div>
                <div className="xs:hidden lg:inline-flex gap-2 items-center">
                    <FindSupervisors program={basicProgramInfo} />
                    {/* <p className="text-foreground">Find Supervisor</p> */}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={programDetails.url}
                        className="px-4 flex items-center py-2 rounded-full bg-white text-button-primary border-button-light-primary border-2 font-semibold text-sm"
                    >
                        Visit Program Page
                    </a>
                    <BookmarkProgram uuid={uuid} isBookmarked={false} />
                </div>
                <div className="flex gap-2">
                    <Image
                        className="rounded-full"
                        src="/alberta.png"
                        alt="university logo"
                        width={80}
                        height={80}
                    />
                    <div className="flex flex-col gap-0">
                        <p className="text-[15px] font-semibold text-foreground">
                            {programDetails.university.name}
                        </p>
                        <p className="text-[15px] font-normal text-foreground">
                            {programDetails.school.name}
                        </p>
                        <p className="text-[15px] font-medium text-button-primary">
                            {`${programDetails.university.livingCost.state}, ${programDetails.university.livingCost.country}`}
                        </p>
                    </div>
                </div>
                <div className="lg:hidden xs:inline-flex gap-2">
                    {/* <FindSupervisor /> */}
                    <p className="text-foreground">Find Supervisor</p>

                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={programDetails.url}
                        className="p-2 rounded-full bg-white text-button-primary border-button-light-primary border-2 font-semibold text-xs"
                    >
                        Visit Program Page
                    </a>
                </div>
            </div>
        )
    }
}
//calender, flower, moneybox, thumbsup
export function FourStickers() {
    const style1 =
        'xs:text-xs lg:text-base xs:font-semibold lg:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00406B] via-[#036694] to-[#007DD1]'
    const style2 =
        'xs:text-sm lg:text-base xs:font-semibold lg:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00406B] via-[#036694] to-[#007DD1]'
    const boxStyle =
        'flex xs:flex-col lg:flex-row justify-between xs:items-start lg:items-center p-4 bg-white rounded-md lg:shadow-[rgba(217,_239,_254)_0px_0px_16px]'
    const informationLabel =
        'flex xs:flex-col lg:flex-row xs:items-start lg:items-center xs:gap-4 lg:gap-0 lg:gap-4 xs:gap-0'
    const programDetailsContext = useProgramDetailsStore()
    const programDetails = programDetailsContext?.programDetails
    if (!programDetails) {
        return <LoadingSpinner />
    } else
        return (
            <div className="grid xs:grid-cols-2 lg:grid-cols-1 xs:gap-0 lg:gap-4 xs:w-full lg:w-[550px] xs:bg-white lg:bg-inherit">
                <div className={boxStyle}>
                    <div className={informationLabel}>
                        {calender}
                        <p className={style1}>Application Deadline</p>
                    </div>
                    <p className={style2}>
                        {programDetails.applicationDeadline}
                    </p>
                </div>
                <div className={boxStyle}>
                    <div className={informationLabel}>
                        {flower}
                        <p className={style1}>Program Intake</p>
                    </div>
                    <p className={style2}>
                        {programDetails.programIntake
                            ? programDetails.programIntake
                            : 'N/A'}
                    </p>
                </div>
                <div className={boxStyle}>
                    <div className={informationLabel}>
                        {moneyBox}
                        <p className={style1}>Tuition Fee / Year</p>
                    </div>
                    <p className={style2}>
                        {`${programDetails?.tuitionFee?.tuitionFee || ''} ${
                            programDetails?.tuitionFee?.currency || ''
                        }`}
                    </p>
                </div>
                <div className={boxStyle}>
                    <div className={informationLabel}>
                        {money}
                        <p className={style1}>Application Fee</p>
                    </div>
                    <p className={style2}>
                        {programDetails.applicationFee
                            ? `${programDetails.applicationFee} ${programDetails.applicationFeeCurrency}`
                            : `N/A`}
                    </p>
                </div>
                <div className={boxStyle}>
                    <div className={informationLabel}>
                        {thumpsUp}
                        <p className={style1}>Acceptance rate</p>
                    </div>
                    <p
                        className={style2}
                    >{`${programDetails.university.acceptanceRate}%`}</p>
                </div>
            </div>
        )
}

export function DateAndTimelineCard() {
    const programDetailsContext = useProgramDetailsStore()
    const programDetails = programDetailsContext?.programDetails
    if (!programDetails) {
        return <LoadingSpinner />
    } else {
        const textColor = 'text-[#18467E]'
        const textStyle = `text-button-light-primary text-sm`
        const stepStyle = `flex gap-2 py-4 px-8 ${textStyle}`
        const step1info1 = (
            <div className={stepStyle}>
                <div className="rounded-full w-12 h-12 flex items-center justify-center ">
                    {cuteCalender}
                </div>
                <div className={`flex flex-col gap-1`}>
                    <h4 className="text-foreground">Upcoming Intake Season</h4>
                    <h4 className="font-bold text-foreground">
                        {programDetails.programIntake
                            ? programDetails.programIntake
                            : 'N/A'}
                    </h4>
                </div>
            </div>
        )
        const step1info2 = (
            <div className={stepStyle}>
                <div className="rounded-full w-12 h-12 flex items-center justify-center">
                    {cuteCalender}
                </div>
                <div className={`flex flex-col gap-1`}>
                    <h4 className="font-normal text-foreground">
                        Application Deadline
                    </h4>
                    <h4 className="font-bold text-foreground">
                        {programDetails.applicationDeadline}
                    </h4>
                </div>
            </div>
        )
        const step2info1 = (
            <div className={stepStyle}>
                <div className="rounded-full w-12 h-12 flex items-center justify-center">
                    {programDurationIcon}
                </div>
                <div className={`flex flex-col gap-1`}>
                    <h4 className="font-normal text-foreground">Full Time</h4>
                    <h4 className="font-bold text-foreground">
                        {programDetails.duration[0]?.commitment === 'full-time'
                            ? programDetails.duration[0].duration + ' Months'
                            : 'N/A'}
                    </h4>
                </div>
            </div>
        )
        const step2info2 = (
            <div className={stepStyle}>
                <div className="rounded-full w-12 h-12 flex items-center justify-center">
                    {programDurationIcon}
                </div>
                <div className={`flex flex-col gap-1`}>
                    <h4 className="font-normal text-foreground">Part Time</h4>
                    <h4 className="font-bold text-foreground">
                        {programDetails.duration[0]?.commitment === 'part-time'
                            ? programDetails.duration[0].duration + ' Months'
                            : 'N/A'}
                    </h4>
                </div>
            </div>
        )
        const step3info = (
            <div className={stepStyle}>
                <div className="rounded-full w-12 h-12 flex items-center justify-center">
                    {i}
                </div>
                <div className={`flex flex-col gap-1`}>
                    <h4 className="font-normal text-foreground">
                        Credit Information
                    </h4>
                    <h4 className="font-bold text-foreground">
                        {programDetails.totalCredit}
                    </h4>
                </div>
            </div>
        )
        return (
            <div
                className={`flex flex-col pt-4 gap-2 lg:rounded-md bg-white border-[#F0F0F0] border-2`}
            >
                <div className="grid grid-cols-6">
                    <div className="xs:col-span-5 lg:col-span-2">
                        {step1info1}
                    </div>
                    <div className="xs:col-span-5 lg:col-span-2">
                        {step2info1}
                    </div>
                    <div className="xs:col-span-5 lg:col-span-2">
                        {step3info}
                    </div>
                </div>
                <div className="grid grid-cols-6">
                    <div className="xs:col-span-5 lg:col-span-2">
                        {step1info2}
                    </div>
                    <div className="xs:col-span-5 lg:col-span-2">
                        {step2info2}
                    </div>
                </div>
                <div className="w-full h-0.5 bg-[#F0F0F0]/50"></div>
                <div className={`p-6  ${textColor} text-xs`}>
                    <h3 className="font-normal text-foreground">
                        Affiliated Department / Institute
                    </h3>
                    <ul className="pl-8 pt-2 xs:pb-36 lg:pb-0 font-medium text-foreground list-disc">
                        <li>{programDetails.department.name}</li>
                        {/* <li>{programDetails.school.name}</li> */}

                        {/* <li>{programDetails.faculty.name}</li> */}
                    </ul>
                </div>
            </div>
        )
    }
}
