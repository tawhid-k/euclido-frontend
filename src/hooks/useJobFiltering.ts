'use client'

import useJobsListStore from '../context/jobs/jobs-list-filter-context'
import { useBaseFiltering } from './useBaseFiltering'

export function useJobFiltering() {
    const setJobs = useJobsListStore((state) => state.setJobs)
    const setMeta = useJobsListStore((state) => state.setMeta)
    const setLinks = useJobsListStore((state) => state.setLinks)
    
    return useBaseFiltering({
        endpoint: 'search/jobs/filter',
        paramKeys: [
            'job-title',
            'disciplines',
            'countries',
            'minimum-qualifications',
            'job-type',
            'job-mode'
        ],
        onSuccess: (result) => {
            setJobs(result.result)
            setMeta(result.meta)
            setLinks(result.links)
        }
    })
}
