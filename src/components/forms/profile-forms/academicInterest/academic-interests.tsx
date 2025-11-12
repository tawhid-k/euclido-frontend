'use client'
import { useFormStatus } from 'react-dom'
import { useContext } from 'react'
import {
    AreaOfInterestT,
    ResearchInterestT
} from '@/@/lib/types/user-profile-type'
import { crossItem } from '@/@/components/dashboard/svgItems'
import AcademicInterestModal from './academic-interest-modal'
import { updateAcademicInterest } from './action'
import toast from 'react-hot-toast'
import { getRequestWithToken } from '@/@/service/api-handler/get-manager'
import { useProfileStore } from '@/@/context/dashboard-context'
import { useLoadProfileData } from '@/@/hooks/useProfile'

function UnitAreaOfInterest({ ai }: { ai: ResearchInterestT }) {
    const profileContext = useProfileStore()
    const { refreshPersonalInformation } = useLoadProfileData()
    const deleteAreaOfInterest = async () => {
        const prevResearchInterest =
            profileContext?.profileInformation?.researchInterests
        const updatedResearchInterest = prevResearchInterest
            ?.filter(
                (id) => id.researchInterest.uuid !== ai.researchInterest.uuid
            )
            .map((researchInterest) => researchInterest.researchInterest.uuid)

        const response = await updateAcademicInterest(
            updatedResearchInterest ? updatedResearchInterest : []
        )

        if (response.statusCode === 200) {
            refreshPersonalInformation()
            toast.success('Area of Interest Deleted')
        }
    }
    return (
        <div className="flex items-center gap-4 border-lightgray bg-white border-2 rounded-3xl py-2 px-4 text-foreground max-w-fit">
            <div className="flex flex-col gap-1">
                <p className="font-normal text-sm">
                    {ai.researchInterest.name}
                </p>
                <p className="font-light text-xs">
                    Discipline / Sub-discipline
                </p>
            </div>
            <form action={deleteAreaOfInterest}>
                <button type="submit">{crossItem}</button>
            </form>
        </div>
    )
}

function AddInterest() {
    return (
        <div>
            <AcademicInterestModal />
        </div>
    )
}

export default function AcademicInterestsUpdateForm() {
    const labelStyle = 'text-foreground text-sm font-semibold'
    const inputStyle =
        'text-foreground text-sm border-2 border-[#EBEBEB] rounded-2xl p-4 focus:outline-none bg-white h-[150px]'

    const researchInterests =
        useProfileStore().profileInformation?.researchInterests

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className={labelStyle}>Areas of Interest (max 5)</label>
                <div className="flex flex-col gap-6 flex-wrap">
                    {researchInterests?.map((ai, index) => (
                        <UnitAreaOfInterest key={index} ai={ai} />
                    ))}
                    <AddInterest />
                </div>
            </div>
            {/* <SubmitForm /> */}
        </div>
    )
}
