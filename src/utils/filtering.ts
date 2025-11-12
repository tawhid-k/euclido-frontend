import { useUrlParams } from '@/@/context/query-params'

// Format a query parameter for URL construction
export const formatQueryParam = (
    key: string,
    getParams: (key: string) => string | null
): string => {
    const itemParam = getParams(key)
    return itemParam ? `&${key}=${itemParam.split('+').join('%2B')}` : ''
}

export const formatMinMaxParam = (
    key: string,
    minLabel: string,
    maxLabel: string,
    getParams: (key: string) => string | null
): string => {
    const min = getParams(minLabel)
    if (min) {
        const max = getParams(maxLabel)
        return `&${key}=${min}-${max}`
    }
    return ''
}

export const useFilterToggle = (paramKey: string) => {
    const { toggleParam, getSelectedValues } = useUrlParams()
    const selectedValues = getSelectedValues(paramKey)
    
    return {
        selectedValues,
        toggleValue: (value: string) => toggleParam(paramKey, value),
        isSelected: (value: string) => selectedValues.has(value)
    }
}
