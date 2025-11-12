'use client'

import { useMemo } from 'react'
import { getRequest } from '@/@/service/api-handler/get-manager'
import useSWR from 'swr'
import { formatMinMaxParam, formatQueryParam } from '../utils/filtering'
import { useUrlParams } from '@/@/context/query-params'

export type FilterConfig = {
  endpoint: string;
  paramKeys: string[];
  rangeParams?: {
    key: string;
    minLabel: string;
    maxLabel: string;
  }[];
  onSuccess: (data: any) => void;
}

export function useBaseFiltering(config: FilterConfig) {
    const { getSelectedValues } = useUrlParams()
    
    // Convert the getSelectedValues to a format compatible with formatQueryParam
    const getParams = (key: string) => {
        const values = getSelectedValues(key)
        return values.size > 0 ? Array.from(values).join('+') : null
    }
    
    const filterParams = useMemo(() => {
        const params: Record<string, string> = {}
        
        // Add regular params
        config.paramKeys.forEach(key => {
            params[key] = formatQueryParam(key, getParams)
        })
        
        // Add range params if any
        if (config.rangeParams) {
            config.rangeParams.forEach(({ key, minLabel, maxLabel }) => {
                params[key] = formatMinMaxParam(key, minLabel, maxLabel, getParams)
            })
        }
        
        return params
    }, [getParams, config.paramKeys, config.rangeParams])

    const url = useMemo(() => {
        const validParams = Object.values(filterParams)
            .filter((param) => param !== '')
            .join('')
        return `${config.endpoint}?${validParams}&limit=10`
    }, [filterParams, config.endpoint])

    const fetcher = async (url: string) => {
        try {
            const result = await getRequest(url, true)
            config.onSuccess(result)
            return result
        } catch (error) {
            console.error(`Failed to fetch from ${config.endpoint}:`, error)
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