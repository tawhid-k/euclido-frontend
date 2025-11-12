import { useForm, useFormContext } from 'react-hook-form'
import { tailwindStyle } from './../questions/styles'
import GenericSuggestionInput from '@/@/components/global/suggestion-input'
import { useState } from 'react'
import { DisciplineT, SubDisciplineT } from '@/@/lib/types/discipline-type'
import { crossItem } from '@/@/components/dashboard/svgItems'

export default function ResearchInterest() {
    const { register, setValue, getValues } = useFormContext()
    const [selectedRI, setSelectedRI] = useState<SubDisciplineT[]>([])
    const setResearchInterestUuidFunc = ({
        item
    }: {
        item: SubDisciplineT
    }) => {
        if (item && !selectedRI.includes(item)) {
            try {
                setSelectedRI([...selectedRI, item])
                setValue('researchInterestUuid', [
                    ...selectedRI.map((ri) => ri.uuid),
                    item.uuid
                ])
            } catch (error) {
                console.log(error)
            }
        }
    }
    const cancelItem = (uuid: string) => {
        setSelectedRI(selectedRI.filter((ri) => ri.uuid !== uuid))
    }
    return (
        <div className={`${tailwindStyle.topDivStyle}`}>
            <label className={tailwindStyle.labelStyle}>
                Research Interest
            </label>

            <div className={`${tailwindStyle.divStyle}`}>
                <GenericSuggestionInput<SubDisciplineT>
                    apiPath={`discipline/research-interest/${getValues(
                        'subDisciplineUuid'
                    )}`}
                    placeholder="Select Research Interest"
                    dataKey="ResearchInterest"
                    itemType={[]}
                    inputStyle={tailwindStyle.inputStyle}
                    onSelectItem={setResearchInterestUuidFunc}
                    disabled={selectedRI.length === 5}
                    clearIfSelected={true}
                />

                <input type="hidden" {...register('researchInterestUuid')} />
            </div>
            <div className="flex flex-wrap gap-4 pb-8">
                {selectedRI.map((ri, index) => (
                    <div
                        key={index}
                        className="rounded-full pl-4 pr-2 py-2 flex gap-4 items-center justify-center bg-white text-foreground font-medium"
                    >
                        <p>{ri.name}</p>{' '}
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                cancelItem(ri.uuid)
                            }}
                        >
                            {crossItem}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
