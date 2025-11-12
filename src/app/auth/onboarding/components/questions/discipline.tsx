import { useForm, useFormContext } from 'react-hook-form'
import { tailwindStyle } from './../questions/styles'
import GenericSuggestionInput from '@/@/components/global/suggestion-input'
import { useState } from 'react'
import { DisciplineT } from '@/@/lib/types/discipline-type'

export default function ChoiceOfDiscipline() {
    const { register, setValue, getValues } = useFormContext()

    const setDisciplineUuidFunc = ({ item }: { item: DisciplineT }) => {
        if (item) {
            try {
                setValue('disciplineUuid', [item.uuid])
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className={`${tailwindStyle.topDivStyle}`}>
            <label className={tailwindStyle.labelStyle}>
                Choice of Discipline
            </label>
            <div className={`${tailwindStyle.divStyle}`}>
                <GenericSuggestionInput<DisciplineT>
                    apiPath="discipline"
                    placeholder="Select discipline"
                    dataKey="discipline"
                    itemType={[]}
                    inputStyle={tailwindStyle.inputStyle}
                    onSelectItem={setDisciplineUuidFunc}
                />
                <input type="hidden" {...register('disciplineUuid')} />
            </div>
        </div>
    )
}
