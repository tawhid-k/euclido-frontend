'use client'

import useProgramListStore from '@/@/context/degree-list-context'
import { useBaseFiltering } from './useBaseFiltering'

export function useProgramFiltering() {
    const setPrograms = useProgramListStore((state) => state.setPrograms)
    const setMeta = useProgramListStore((state) => state.setMeta)
    const setLinks = useProgramListStore((state) => state.setLinks)

    return useBaseFiltering({
        endpoint: 'search/program/filter',
        paramKeys: [
            'disciplines',
            'countries',
            'degree-level',
            'toefl-score',
            'states',
            'program-type',
            'delivery-mode',
            'ielts-score',
            'program-title'
        ],
        rangeParams: [
            {
                key: 'university-ranking',
                minLabel: 'uniRankMin',
                maxLabel: 'uniRankMax'
            },
            {
                key: 'tuition-fee-range',
                minLabel: 'tuitionMin',
                maxLabel: 'tuitionMax'
            }
        ],
        onSuccess: (result) => {
            setPrograms(result.result)
            setMeta(result.meta)
            setLinks(result.links)
        }
    })
}
