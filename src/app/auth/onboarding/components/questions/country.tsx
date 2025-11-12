import { useForm, useFormContext } from 'react-hook-form'
import { tailwindStyle } from './../questions/styles'
import { CountryT, StateT } from '@/@/lib/types/country-types'
import GenericSuggestionInput from '@/@/components/global/suggestion-input'
import { useState } from 'react'

export default function Country() {
    const { register, setValue, getValues } = useFormContext()
    const [countryCode, setCountryCode] = useState<string | null>(null)
    const setIsoCode = ({ item }: { item: CountryT }) => {
        if (item) {
            try {
                setValue('countryCode', item.isoCode)
                setCountryCode(item.isoCode)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const setStateCode = ({ item }: { item: StateT }) => {
        if (item) {
            try {
                setValue('stateCode', item.isoCode)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className={`${tailwindStyle.topDivStyle}`}>
            <label className={tailwindStyle.labelStyle}>
                Country of Residence
            </label>
            <div className={`${tailwindStyle.divStyle}`}>
                <GenericSuggestionInput<CountryT>
                    apiPath="country"
                    placeholder="Select country"
                    dataKey="country"
                    itemType={[]}
                    inputStyle={tailwindStyle.inputStyle}
                    onSelectItem={setIsoCode}
                />
                <input type="hidden" {...register('countryCode')} />
                <GenericSuggestionInput<StateT>
                    apiPath={`state?countryCode=${countryCode}`}
                    placeholder="Select state"
                    dataKey="state"
                    itemType={[]}
                    inputStyle={tailwindStyle.inputStyle}
                    onSelectItem={setStateCode}
                    disabled={countryCode === null}
                />
                <input type="hidden" {...register('stateCode')} />
            </div>
        </div>
    )
}
