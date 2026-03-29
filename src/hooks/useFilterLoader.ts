'use client'

import { useEffect } from 'react'
import useProgramListStore from '@/@/context/degree-list-context'
import { mockCountries, mockDisciplines } from '@/@/lib/mock-data'
import { CountryT } from '@/@/lib/types/country-types'

export const countriesMinimized: CountryT[] = mockCountries

export function useLoadFilters() {
    const setFilters = useProgramListStore((state) => state.setFilters)
    useEffect(() => {
        setFilters({
            countries: mockCountries,
            disciplines: mockDisciplines
        })
    }, [setFilters])
}
