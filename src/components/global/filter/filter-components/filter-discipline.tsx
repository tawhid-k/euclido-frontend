'use client'

import { useState, useCallback, useMemo, memo } from 'react'
import useSWR from 'swr'
import { selectedCheckBox, unselectedCheckBox } from './icons'
import { DisciplineT, SubDisciplineT } from '@/@/lib/types/discipline-type'
import { SmallDropDownArrow } from './rotating-arrow'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useUrlParams } from '@/@/context/query-params'
import useProgramListStore from '@/@/context/degree-list-context'
import { Checkbox } from '@heroui/react'
import { getRequest } from '@/@/service/api-handler/get-manager'

const CheckboxItem = memo(
    ({
        item,
        isSelected,
        onToggle,
        renderIcon,
        className = ''
    }: {
        item: { uuid: string; name: string; slug: string }
        isSelected: boolean
        onToggle: (slug: string) => void
        renderIcon: (isSelected: boolean) => React.ReactNode
        className?: string
    }) => (
        <div className={`flex items-center gap-2 ${className}`}>
            <label className="flex items-center gap-2 cursor-pointer">
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggle(item.slug)
                    }}
                    className="w-[20px]"
                >
                    {renderIcon(isSelected)}
                </div>
                <p className="font-normal text-[#18467E] xs:text-xs lg:text-sm">
                    {item.name}
                </p>
            </label>
        </div>
    )
)

CheckboxItem.displayName = 'CheckboxItem'

const fetcher = (url: string) => getRequest(url).then((res) => res.result)

const SubDisciplineList = memo(
    ({
        discipline,
        selectedValues,
        onToggle
    }: {
        discipline: DisciplineT
        selectedValues: Set<string>
        onToggle: (slug: string) => void
    }) => {
        const { data, error, isLoading } = useSWR(
            `discipline/sub-discipline/${discipline.uuid}`,
            fetcher,
            { revalidateOnFocus: false }
        )

        if (isLoading || error) return null

        return (
            <div className="ml-6 mt-2">
                <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                    {data?.map((subDiscipline: SubDisciplineT) => (
                        <CheckboxItem
                            key={subDiscipline.uuid}
                            item={subDiscipline}
                            isSelected={selectedValues.has(subDiscipline.slug)}
                            onToggle={onToggle}
                            renderIcon={(isSelected) =>
                                isSelected
                                    ? selectedCheckBox
                                    : unselectedCheckBox
                            }
                        />
                    ))}
                </div>
            </div>
        )
    }
)

SubDisciplineList.displayName = 'SubDisciplineList'

export default function DisciplineList() {
    const [openDiscipline, setOpenDiscipline] = useState<string | null>(null)
    const disciplineList = useProgramListStore(
        (state) => state.filters.disciplines
    )
    const { toggleParam, getSelectedValues } = useUrlParams()

    const selectedDisciplines = useMemo(
        () => getSelectedValues('disciplines'),
        [getSelectedValues]
    )

    const handleToggle = useCallback(
        (slug: string) => {
            toggleParam('disciplines', slug)
        },
        [toggleParam]
    )

    const toggleDropdown = useCallback((uuid: string) => {
        setOpenDiscipline((prev) => (prev === uuid ? null : uuid))
    }, [])

    if (!disciplineList) return null

    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {disciplineList.map((discipline) => (
                <div key={discipline.uuid} className="flex flex-col">
                    <div
                        onClick={() => toggleDropdown(discipline.uuid)}
                        className="flex justify-between cursor-pointer"
                    >
                        <CheckboxItem
                            item={discipline}
                            isSelected={selectedDisciplines.has(
                                discipline.slug
                            )}
                            onToggle={handleToggle}
                            renderIcon={(isSelected) =>
                                isSelected
                                    ? selectedCheckBox
                                    : unselectedCheckBox
                            }
                        />
                        <SmallDropDownArrow
                            rotateUp={discipline.uuid !== openDiscipline}
                        />
                    </div>

                    {openDiscipline === discipline.uuid && (
                        <SubDisciplineList
                            discipline={discipline}
                            selectedValues={selectedDisciplines}
                            onToggle={handleToggle}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
