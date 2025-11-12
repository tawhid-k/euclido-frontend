'use client'

import { useMemo } from 'react'
import { getRequest } from '@/@/service/api-handler/get-manager'
import useSWR from 'swr'
import useJobsListStore from '../context/jobs/jobs-list-filter-context'
import { useSearchParams } from 'next/navigation'

const formatQueryParam = (
    key: string,
    searchParams: URLSearchParams
): string => {
    const itemParam = searchParams.get(key)
    return itemParam ? `&${key}=${itemParam.split('+').join('%2B')}` : ''
}

const formatMinMaxParam = (
    key: string,
    minLabel: string,
    maxLabel: string,
    searchParams: URLSearchParams
): string => {
    const min = searchParams.get(minLabel)
    if (min) {
        const max = searchParams.get(maxLabel)
        return `&${key}=${min}-${max}`
    }
    return ''
}

export function useJobData() {
    const searchParams = useSearchParams()
    const setJobs = useJobsListStore((state) => state.setJobs)
    const setMeta = useJobsListStore((state) => state.setMeta)
    const setLinks = useJobsListStore((state) => state.setLinks)

    const filterParams = useMemo(() => {
        return {
            disciplines: formatQueryParam('disciplines', searchParams),
            countries: formatQueryParam('countries', searchParams),
            'degree-level': formatQueryParam('degree-level', searchParams),
            'university-ranking': formatMinMaxParam(
                'university-ranking',
                'uniRankMin',
                'uniRankMax',
                searchParams
            ),
            'tuition-fee-range': formatMinMaxParam(
                'tuition-fee-range',
                'tuitionMin',
                'tuitionMax',
                searchParams
            ),
            'toefl-score': formatQueryParam('toefl-score', searchParams),
            states: formatQueryParam('states', searchParams),
            'program-type': formatQueryParam('program-type', searchParams),
            'delivery-mode': formatQueryParam('delivery-mode', searchParams),
            'ielts-score': formatQueryParam('ielts-score', searchParams),
            'program-title': formatQueryParam(
                'program-title',
                searchParams
            ).replace(/ /g, '-')
        }
    }, [searchParams])

    const url = useMemo(() => {
        const validParams = Object.values(filterParams)
            .filter((param) => param !== '')
            .join('')
        return `search/jobs/filter?${validParams}&limit=10`
    }, [filterParams])

    const fetcher = async (url: string) => {
        try {
            const result = await getRequest(url, true)
            setJobs(result.result)
            setMeta(result.meta)
            setLinks(result.links)
            return result
        } catch (error) {
            console.error('Failed to fetch programs:', error)
            throw error
        }
    }

    const { data, error, isLoading } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        shouldRetryOnError: true,
        errorRetryCount: 2
    })

    return {
        data,
        error,
        isLoading
    }
}
