import { useForm, useFormContext } from 'react-hook-form'
import { tailwindStyle } from './../questions/styles'
import GenericSuggestionInput from '@/@/components/global/suggestion-input'
import { useState } from 'react'
import { DisciplineT, SubDisciplineT } from '@/@/lib/types/discipline-type'

export default function Specialization() {
    const { register, setValue, getValues } = useFormContext()

    const setSubDisciplineUuidFunc = ({ item }: { item: SubDisciplineT }) => {
        if (item) {
            try {
                setValue('subDisciplineUuid', [item.uuid])
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className={`${tailwindStyle.topDivStyle}`}>
            <label className={tailwindStyle.labelStyle}>Specialization</label>
            <div className={`${tailwindStyle.divStyle}`}>
                <GenericSuggestionInput<SubDisciplineT>
                    apiPath={`discipline/sub-discipline/${getValues(
                        'disciplineUuid'
                    )}`}
                    placeholder="Select specialization"
                    dataKey="Specialization"
                    itemType={[]}
                    inputStyle={tailwindStyle.inputStyle}
                    onSelectItem={setSubDisciplineUuidFunc}
                />
                <input type="hidden" {...register('subDisciplineUuid')} />
            </div>
        </div>
    )
}
