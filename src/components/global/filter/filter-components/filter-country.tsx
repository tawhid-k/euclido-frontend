'use client'

import useSWR from 'swr'
import { selectedCheckBox, unselectedCheckBox } from './icons'
import { SmallDropDownArrow } from './rotating-arrow'
import { CountryT, StateT } from '@/@/lib/types/country-types'
import { Suspense, useState } from 'react'
import { getRequest } from '@/@/service/api-handler/get-manager'
import { useUrlParams } from '@/@/context/query-params'
import useProgramListStore from '@/@/context/degree-list-context'
import LoadingSpinner from '@/@/components/global/skeleton'
import { useLoadFilters } from '@/@/hooks/useFilterLoader'

const labelStyle = 'font-normal text-[#18467E] xs:text-xs lg:text-sm'

function ShowStateList({ country }: { country: CountryT }) {
    const { toggleParam, getSelectedValues } = useUrlParams()
    const selectedStates = getSelectedValues('states')
    const selectedCountries = getSelectedValues('countries')
    
    const fetcher = async (url: string) => {
        const res = await getRequest(url)
        return res.result
    }
    
    const { data, error, isLoading } = useSWR(
        `state?countryCode=${country.isoCode}`,
        fetcher
    )
    
    const handleStateToggle = (stateIsoCode: string) => {
        // Always ensure the country is selected when a state is selected
        if (!selectedCountries.has(country.isoCode)) {
            toggleParam('countries', country.isoCode)
        }
        toggleParam('states', stateIsoCode)
    }
    
    return (
        <div className="flex justify-between ml-6 mt-2">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                    {data.map((state: StateT, index: number) => {
                        const isSelected = selectedStates.has(state.isoCode)
                        
                        return (
                            <div key={index} className="flex flex-col">
                                <div className="flex justify-between">
                                    <label 
                                        className="flex gap-2 items-center cursor-pointer"
                                        onClick={() => handleStateToggle(state.isoCode)}
                                    >
                                        <div className="w-[20px]">
                                            {isSelected ? selectedCheckBox : unselectedCheckBox}
                                        </div>
                                        <p className={labelStyle}>{state.name}</p>
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default function ShowCountryList() {
    const countries = useProgramListStore((state) => state.filters.countries)
    const [dropDownStates, setDropDownStates] = useState<null | string>(null)
    const { toggleParam, getSelectedValues } = useUrlParams()
    const selectedCountries = getSelectedValues('countries')
    useLoadFilters()
    
    const toggleDropdown = (countryIsoCode: string) => {
        setDropDownStates(prev => prev === countryIsoCode ? null : countryIsoCode)
    }
    
    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {countries?.map((country: CountryT, index) => {
                const isSelected = selectedCountries.has(country.isoCode)
                const isExpanded = dropDownStates === country.isoCode
                
                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between cursor-pointer">
                            <label 
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleParam('countries', country.isoCode)
                                }}
                            >
                                <div className="w-[20px]">
                                    {isSelected ? selectedCheckBox : unselectedCheckBox}
                                </div>
                                <p className={labelStyle}>{country.name}</p>
                            </label>

                            <div onClick={() => toggleDropdown(country.isoCode)}>
                                <SmallDropDownArrow rotateUp={!isExpanded} />
                            </div>
                        </div>
                        
                        {isExpanded && (
                            <Suspense>
                                <ShowStateList country={country} />
                            </Suspense>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
