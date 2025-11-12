'use client'

import { useEffect, useState } from 'react'

import GenericSuggestionInput from '@/@/components/global/suggestion-input'

import { DisciplineT, SubDisciplineT } from '@/@/lib/types/discipline-type'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import {
    getRequest,
    getRequestWithToken
} from '@/@/service/api-handler/get-manager'
import { selectedCheckBox, unselectedCheckBox } from '@/@/components/global/filter/filter-components/icons'
import toast from 'react-hot-toast'
import { useFormStatus } from 'react-dom'
import { updateAcademicInterest } from './action'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/@/context/dashboard-context'
import { useLoadProfileData } from '@/@/hooks/useProfile'

function SubmitForm() {
    const { pending } = useFormStatus()
    return (
        <button
            className={`${
                pending
                    ? 'bg-[#00406B]'
                    : 'bg-gradient-to-r from-[#00406B] via-[#036694] to-[#007DD1]'
            } p-3 rounded-full text-light-text font-bold max-w-fit px-8 py-3 text-sm hover:bg-gradient-to-r hover:from-[#036694] hover:to-[#007DD1]`}
            disabled={pending}
            type="submit"
        >
            {pending ? 'Saving...' : 'Save Changes'}
        </button>
    )
}

function SelectAcademicInterests() {
    const { register, setValue, getValues } = useFormContext()
    const [disciplineUuid, setDisciplineUuid] = useState<string | null>(null)
    const [subDisciplineUuid, setsubDisciplineUuid] = useState<string | null>(
        null
    )
    const profileContext = useProfileStore()
    const pRI = profileContext?.profileInformation?.researchInterests.map(
        (ri) => ri.researchInterest
    )
    const [areaOfInterestUuids, setAreaOfInterestUuids] = useState<
        SubDisciplineT[]
    >([])
    const [selectedAreaOfInterest, setSelectedAreaOfInterest] = useState<
        SubDisciplineT[]
    >(pRI ? pRI : [])
    const inputStyle =
        'text-foreground text-sm border-2 border-[#EBEBEB] rounded-full p-4 focus:outline-none bg-white w-full'

    useEffect(() => {
        setAreaOfInterestUuids([])
        const fetchAreaOfInterests = async () => {
            try {
                const response = await getRequest(
                    `discipline/research-interest/${subDisciplineUuid}`
                )
                if (response.statusCode === 200) {
                    try {
                        setAreaOfInterestUuids(response.result)
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (subDisciplineUuid) {
            fetchAreaOfInterests()
        }
    }, [subDisciplineUuid, disciplineUuid])

    const setDisciplineUuidFunc = ({ item }: { item: DisciplineT }) => {
        if (item) {
            try {
                setDisciplineUuid(item.uuid)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const setSubDisciplineUuidFunc = ({ item }: { item: SubDisciplineT }) => {
        if (item) {
            try {
                setsubDisciplineUuid(item.uuid)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const manageResearchInterestSelection = (ai: SubDisciplineT) => {
        if (selectedAreaOfInterest.includes(ai)) {
            const updatedSelection = selectedAreaOfInterest.filter(
                (id) => id.uuid !== ai.uuid
            )
            setValue(
                'researchInterest',
                updatedSelection.map((ri) => ri.uuid)
            )
            setSelectedAreaOfInterest(updatedSelection)
        } else {
            if (selectedAreaOfInterest.length === 5) {
                toast('Maximum 5 Area of Interests can be selected!', {
                    icon: '⚠️',
                    style: {
                        background: 'white',
                        color: 'black'
                    }
                })
            } else {
                const uuidSets = new Set<SubDisciplineT>([
                    ...selectedAreaOfInterest,
                    ai
                ])
                const riArray = Array.from(uuidSets)
                setValue(
                    'researchInterest',
                    riArray.map((ri) => ri.uuid)
                )
                setSelectedAreaOfInterest(riArray)
            }
        }
    }
    const labelStyle = 'text-foreground text-sm font-semibold'
    return (
        <div className="xs:col-span-3 lg:col-span-2 flex flex-col gap-6">
            <input {...register('researchInterest')} type="hidden" />
            <div className="flex flex-col gap-2 w-full">
                <label className={labelStyle}>Discipline</label>
                <GenericSuggestionInput<DisciplineT>
                    apiPath="discipline"
                    placeholder="Select discipline"
                    dataKey="discipline"
                    itemType={[]}
                    inputStyle={inputStyle}
                    onSelectItem={setDisciplineUuidFunc}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label className={labelStyle}>Sub-discipline</label>
                <GenericSuggestionInput<SubDisciplineT>
                    apiPath={`discipline/sub-discipline/${disciplineUuid}`}
                    placeholder="Select sub-discipline"
                    dataKey="Specialization"
                    itemType={[]}
                    inputStyle={inputStyle}
                    onSelectItem={setSubDisciplineUuidFunc}
                />
            </div>
            <div className="flex flex-col gap-4  w-full">
                <label className={labelStyle}>Area of Interest</label>
                {/* TODO: No need to show selected academic interest */}
                {/* <div className="flex gap-6 max-h-fit flex-wrap h-[200px] overflow-y-auto">
                    {selectedAreaOfInterest.map((ai, index) => (
                        <div
                            onClick={() => manageResearchInterestSelection(ai)}
                            key={index}
                            className="flex gap-2"
                        >
                            {selectedCheckBox}
                            <label className="font-normal text-[#18467E] text-sm">
                                {ai.name}
                            </label>
                        </div>
                    ))}
                </div> */}

                <div className="flex gap-6 max-h-fit flex-wrap h-[300px] overflow-y-auto">
                    {areaOfInterestUuids.map((ai, index) => (
                        <div
                            onClick={() => manageResearchInterestSelection(ai)}
                            key={index}
                            className="flex gap-2"
                        >
                            {selectedAreaOfInterest.includes(ai)
                                ? selectedCheckBox
                                : unselectedCheckBox}
                            <label className="font-normal text-[#18467E] text-sm">
                                {ai.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <SubmitForm />
        </div>
    )
}

export default function AddAcademicInterest(props: { isOpen: boolean }) {
    const methods = useForm({})
    const router = useRouter()
    const { refreshPersonalInformation } = useLoadProfileData()
    const profileContext = useProfileStore()
    useEffect(() => {
        if (props.isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [props.isOpen])
    const clientAction = async (data: any) => {
        const response = await updateAcademicInterest(data.researchInterest)

        if (response.statusCode === 200) {
            toast.success('Area of Interest updated successfully!')
            refreshPersonalInformation()
            const userInfoData = await getRequestWithToken('auth/my-profile')
        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(clientAction)}>
                <div className="py-32 px-8 h-full w-full bg-white">
                    <SelectAcademicInterests />
                </div>
            </form>
        </FormProvider>
    )
}
