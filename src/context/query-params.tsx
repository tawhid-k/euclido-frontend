'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export const useUrlParams = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentParams = useMemo(
        () => new URLSearchParams(searchParams.toString()),
        [searchParams]
    )

    const updateUrl = useCallback(
        (params: URLSearchParams) => {
            router.push(`${pathname}?${params.toString()}`)
        },
        [pathname, router]
    )

    const toggleParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(currentParams)
            const values = params.get(key)?.split('+') || []
            const valueSet = new Set(values)

            if (valueSet.has(value)) {
                valueSet.delete(value)
            } else {
                valueSet.add(value)
            }

            if (valueSet.size) {
                params.set(key, Array.from(valueSet).join('+'))
            } else {
                params.delete(key)
            }

            updateUrl(params)
        },
        [currentParams, updateUrl]
    )

    const getSelectedValues = useCallback(
        (key: string) => {
            return new Set(searchParams.get(key)?.split('+') || [])
        },
        [searchParams]
    )

    return { toggleParam, getSelectedValues }
}

