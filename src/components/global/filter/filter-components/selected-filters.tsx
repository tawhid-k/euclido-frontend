import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useUrlParams } from '@/@/context/query-params'
import { Minus, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { location, book, money, rank, hat, batch, cross } from './icons'
import { Capitalize } from '@/@/utils/format'

const CLOUD_STYLE =
    'flex items-center py-1 w-full justify-between rounded-full truncate cursor-pointer'

export default function SelectedFilters() {
    const [showFilters, setShowFilters] = useState(false)
    const [filterCount, setFilterCount] = useState(0)
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const menuRef = useRef<HTMLDivElement>(null)

    const clearQueryParams = () => {
        router.replace(pathname)
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowFilters(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    useEffect(() => {
        const params = new URLSearchParams(searchParams)

        let totalCount = 0

        params.forEach((value, key) => {
            if (Array.isArray(value.split('+'))) {
                totalCount += value.split('+').length
            } else if (value) {
                totalCount += 1
            }
        })

        if (params.has('program-title')) {
            totalCount -= 1
        }
        if (params.has('tuitionMin')) {
            totalCount -= 1
        }
        if (params.has('uniRankMin')) {
            totalCount -= 1
        }
        setFilterCount(totalCount)
    }, [searchParams])
    return (
        <div
            ref={menuRef}
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
        >
            <div className="cursor-pointer flex items-center justify-center gap-2 px-4 xs:py-0 lg:py-2 bg-white rounded-xl">
                <SlidersHorizontal className="text-foreground" size={20} />
                <span className="font-medium text-foreground xs:text-xs lg:text-sm cursor-pointer">
                    Filters
                </span>
                {filterCount > 0 && (
                    <span
                        className="w-6 h-6 rounded-full 
                inline-flex items-center justify-center bg-[#F1F6F7] p-2 text-sm font-medium text-foreground cursor-pointer"
                    >
                        {filterCount}
                    </span>
                )}
            </div>
            {showFilters && filterCount > 0 && (
                <div className="flex flex-col gap-6 absolute z-20 top-full right-0 mt-4 px-4 pt-4 pb-6 bg-white rounded-xl shadow-xl min-w-max">
                    <div className="flex items-center justify-between min-w-fit">
                        <span className="min-w-fit text-sm font-semibold text-foreground">
                            Applied Filters
                        </span>

                        <div className="min-w-fit pl-4 flex gap-1 items-center text-primary hover:text-primary-400">
                            <RotateCcw className="" size={18} />
                            <span
                                onClick={clearQueryParams}
                                className="min-w-fit cursor-pointer font-medium text-xs"
                            >
                                Clear all filters
                            </span>
                        </div>
                    </div>
                    <Suspense>
                        <SelectedFiltersList />
                    </Suspense>
                </div>
            )}
        </div>
    )
}

function SelectedFiltersList() {
    const { getSelectedValues, toggleParam } = useUrlParams()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const filters = [
        { key: 'disciplines', label: 'Discipline', icon: book },
        { key: 'sub-discipline', label: 'Sub discipline', icon: book },
        { key: 'states', label: 'State', icon: location },
        { key: 'countries', label: 'Country', icon: location },
        { key: 'program-type', label: 'Program type', icon: hat },
        { key: 'degree-level', label: 'Degree level', icon: hat },
        { key: 'delivery-mode', label: 'Delivery mode', icon: hat }
    ]

    const rangeFilters = [
        {
            key: ['tuitionMin', 'tuitionMax'],

            icon: money,
            label: 'Tuition fee',
            labelValue: () =>
                `${searchParams.get('tuitionMin')} - ${searchParams.get(
                    'tuitionMax'
                )}`
        },
        {
            key: ['uniRankMin', 'uniRankMax'],
            icon: rank,
            label: 'University rank',
            labelValue: () =>
                `${searchParams.get('uniRankMin')} - ${searchParams.get(
                    'uniRankMax'
                )}`
        }
    ]

    const eligibilityFilters = [
        { key: 'cgpa', label: 'CGPA', icon: batch },
        { key: 'gre', label: 'GRE', icon: batch },
        { key: 'ielts-score', label: 'IELTS', icon: batch },
        { key: 'toefl-score', label: 'TOEFL', icon: batch }
    ]
    const handleDeleteParams = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            if (value === 'all') params.delete(key)
            else {
                const items = params.get(key)?.split(',') || []
                params.set(
                    key,
                    items.filter((item) => item !== value).join(',')
                )
            }
            router.push(`${pathname}?${params}`)
        },
        [searchParams, router, pathname]
    )

    const deleteMultipleParams = useCallback(
        (keys: string[]) => {
            const params = new URLSearchParams(searchParams)
            keys.forEach((key) => params.delete(key))
            router.push(`${pathname}?${params}`)
        },
        [searchParams, router, pathname]
    )

    return (
        <div className="flex flex-col gap-2">
            {filters.map(({ key, label, icon }) => {
                const values = getSelectedValues(key)
                return (
                    Array.from(values).map((value, index) => (
                        <FilterItem
                            key={index}
                            icon={icon}
                            label={label}
                            labelValue={value}
                            onDelete={() => toggleParam(key, value)}
                        />
                    )) || null
                )
            })}

            {rangeFilters.map(({ key, icon, label, labelValue }, index) => {
                const [minKey, maxKey] = key
                if (searchParams.has(minKey)) {
                    return (
                        <FilterItem
                            key={index}
                            icon={icon}
                            label={label}
                            labelValue={labelValue()}
                            onDelete={() => deleteMultipleParams(key)}
                        />
                    )
                }
                return null
            })}

            {eligibilityFilters.map(({ key, label, icon }, index) => {
                if (searchParams.has(key)) {
                    return (
                        <FilterItem
                            key={index}
                            icon={icon}
                            label={label}
                            labelValue={`${label} - ${searchParams.get(key)}`}
                            onDelete={() => handleDeleteParams(key, 'all')}
                        />
                    )
                }
                return null
            })}
        </div>
    )
}

function FilterItem({
    icon,
    label,
    labelValue,
    onDelete
}: {
    icon: React.ReactNode
    label: string
    labelValue: string
    onDelete: () => void
}) {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        onDelete()
    }

    return (
        <div className={CLOUD_STYLE}>
            <div className="flex items-center gap-3">
                {icon}
                <div className="flex flex-col gap-1">
                    <span className="text-[#C0C0C0] text-xs font-medium">
                        {label}
                    </span>
                    <span className="text-sm text-foreground">
                        {label === 'University rank' || label === 'Tuition fee'
                            ? labelValue
                            : Capitalize(labelValue)}
                    </span>
                </div>
            </div>
            <button className="pl-6" onClick={handleDelete}>
                <Minus className="text-[#DFDFDF] hover:text-red-400" />
            </button>
        </div>
    )
}
