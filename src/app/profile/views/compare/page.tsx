'use client'
import { capitalize } from 'lodash'
import { Capitalize } from '@/@/utils/format'

import UniversityLogo from '@/@/components/global/university-image'
import { useAppDispatch, useAppSelector } from '@/@/app/store/hooks'
import { removeProgram } from '@/@/app/store/compareProgramsSlice'
import { CircleMinus } from 'lucide-react'
import CustomTooltip from '@/@/components/global/tooltip'
import { Alert, Spacer } from '@heroui/react'
import { getTuitionFee } from '@/@/components/degree-details/tuition-fee'

// TODO: Add the remaining comparisons

export default function ProfileCompareSavedPrograms() {
    const tdStyle = 'py-4 px-6'
    const programsToCompare = useAppSelector(
        (state) => state.compare.selectedPrograms
    )
    const dispatch = useAppDispatch()
    if (programsToCompare.length === 0) {
        return (
            <Alert
                hideIcon
                color="primary"
                description={'Select at least 2 programs'}
                title={'No programs selected'}
                variant="faded"
            />
        )
    }
    const universityNameTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            <div className="flex gap-2 items-center justify-center">
                <UniversityLogo
                    path={p.program.university.logo}
                    name="university logo"
                    size={40}
                />

                <p>{p.program.university.name}</p>
            </div>
        </td>
    ))
    const locationTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            <div className="flex gap-2 items-center justify-center">
                <p>{`${p.program.university.livingCost.state}, ${p.program.university.livingCost.country}`}</p>
            </div>
        </td>
    ))
    const degreeTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {capitalize(p.program.degreeLevel)}
        </td>
    ))

    const applicationDeadlineTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {Capitalize(p.program.applicationDeadline)}
        </td>
    ))
    const universityRankTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {p.program.university.ranking}
        </td>
    ))
    const programIntakeTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {p.program.programIntake || 'N/A'}
        </td>
    ))

    const acceptanceRateTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {`${p.program.university.acceptanceRate}%`}
        </td>
    ))
    const livingCostTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {p.program.university.livingCost.livingCost}
        </td>
    ))
    const departmentTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {p.program.department.name}
        </td>
    ))
    const fundingTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {p.program.funding ? 'Yes' : 'No'}
        </td>
    ))
    // FIXME: Look for other types as well - (part-time) / 'online'
    const internationalTuitionFeeTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {`US$ ${
                getTuitionFee(
                    p.program.tuitionFeesDetails || [],
                    'on-campus',
                    'full-time',
                    'international'
                ) || 0
            }`}
        </td>
    ))
    // FIXME: Look for other types as well - (part-time) / 'online'
    const domesticTuitionFeeTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {`US$ ${
                getTuitionFee(
                    p.program.tuitionFeesDetails || [],
                    'on-campus',
                    'full-time',
                    'domestic'
                ) || 0
            }`}
        </td>
    ))
    const applicationFeeTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {`${Math.ceil(p.program.applicationFee)} ${
                p.program.applicationFeeCurrency
            } `}
        </td>
    ))
    const cgpaTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {p.program.addmissionRequirements?.programGpaRequirement?.gpaPoint}
        </td>
    ))
    const greTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {
                p.program.addmissionRequirements?.programGreRequirement
                    ?.requirement
            }
        </td>
    ))
    const toeflTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {p.program.addmissionRequirements?.programToeflRequirement?.overall}
        </td>
    ))
    const ieltsTd = programsToCompare.map((p, index) => (
        <td className={tdStyle} key={index}>
            {p.program.addmissionRequirements?.programIeltsRequirement?.overall}
        </td>
    ))

    return (
        <div className="grid grid-cols-4">
            <div className="col-span-1">{/* Empty header */}</div>
            <div className="col-span-3">{/* Selected Program's name */}</div>
            <div className="col-span-4 flex flex-col">
                <div className="grid grid-cols-4">
                    <table className="col-span-4 text-center">
                        <thead>
                            <tr className="divide-x-2 divide-button-light-primary">
                                <th></th>
                                {programsToCompare.map((p, index) => (
                                    <th
                                        className="p-4 text-foreground font-semibold text-sm bg-white/60"
                                        key={index}
                                    >
                                        <div className="flex gap-2 justify-center items-center pl-4">
                                            <p className="text-wrap">
                                                {p.program.name}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    dispatch(
                                                        removeProgram(p.uuid)
                                                    )
                                                }}
                                            >
                                                <CustomTooltip
                                                    Component={
                                                        <CircleMinus
                                                            strokeWidth={1}
                                                            size={22}
                                                            className="text-[#CCCCCC] hover:text-red-400"
                                                        />
                                                    }
                                                    tip="Remove program"
                                                />
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0] bg-white text-foreground font-medium text-sm">
                            <tr className="text-center">
                                <td className={tdStyle}>University</td>
                                {universityNameTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>Location</td>
                                {locationTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>University Ranking</td>
                                {universityRankTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>Acceptance Rate</td>
                                {acceptanceRateTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>Department / School</td>
                                {departmentTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>Degree</td>
                                {degreeTd}
                            </tr>

                            <tr>
                                <td className={tdStyle}>
                                    Application Deadline
                                </td>
                                {applicationDeadlineTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>CGPA Requirement</td>
                                {cgpaTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>GRE Requirement</td>
                                {greTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>TOEFL (overall)</td>
                                {toeflTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>IELTS (overall)</td>
                                {ieltsTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>Program Intake</td>
                                {programIntakeTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>Living Cost / year</td>
                                {livingCostTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>
                                    International Tuition
                                    <br />
                                    Fee / year
                                </td>
                                {internationalTuitionFeeTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>
                                    Domestic Tuition
                                    <br />
                                    Fee / year
                                </td>
                                {domesticTuitionFeeTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>Living Cost / year</td>
                                {livingCostTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>
                                    Funding Availability
                                </td>
                                {fundingTd}
                            </tr>

                            <tr>
                                <td className={tdStyle}>Application Fee</td>
                                {applicationFeeTd}
                            </tr>
                            {/* <tr>
                                <td className={tdStyle}>CGPA</td>
                                {cgpaTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>GRE</td>
                                {greTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>IELTS</td>
                                {ieltsTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>TOEFL</td>
                                {toeflTd}
                            </tr>
                            <tr>
                                <td className={tdStyle}>GMAT</td>
                                {gmatTd}
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
