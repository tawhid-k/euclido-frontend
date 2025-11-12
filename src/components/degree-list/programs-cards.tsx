'use client'

import Filter from '../global/filter/filter'
import SelectedFilters from '../global/filter/filter-components/selected-filters'
import { Suspense, useState } from 'react'
import ProgramCardGrid from './program-card-grid'
import ProgramCardColumn from './program-card-column'
import { SortOptions } from './sort'
import useProgramListStore from '@/@/context/degree-list-context'
import { ProgramsOverlay } from '../global/skeleton'
import {
    ArrowDownWideNarrow,
    LayoutGrid,
    List,
    SeparatorVerticalIcon
} from 'lucide-react'
import { useMobileDevice } from '@/@/hooks/useMobileDevice'
import { useProgramFiltering } from '@/@/hooks/useProgramFiltering'

export default function ProgramCard() {
    const { isLoading } = useProgramFiltering()
    const [gridView, setGridView] = useState(false)
    const [showSortOptions, setShowSortOptions] = useState(false)
    const meta = useProgramListStore((state) => state.meta)
    const isMobile = useMobileDevice()
    return (
        <div className="flex flex-col gap-2">
            <div className="xs:flex justify-between lg:hidden pb-2">
                <Filter />
                <Suspense>
                    <SelectedFilters />
                </Suspense>
            </div>
            <div className="relative flex justify-between items-center pb-4">
                <div className="flex items-center gap-4 text-foreground/70 font-medium xs:text-xs lg:text-sm">
                    <span>{`Page ${meta?.currentPage || 0} of ${
                        meta?.totalPages || 0
                    }`}</span>

                    <SeparatorVerticalIcon
                        strokeWidth={1.5}
                        className="text-lightblue"
                    />
                    <span>{`${meta?.totalItems || 0} Programs`}</span>
                </div>
                <div className="hidden xl:flex gap-4">
                    <div className="flex items-center justify-center gap-2 bg-white rounded-xl">
                        <div className="grid grid-cols-2 divide-x">
                            <button
                                className="px-4 py-2"
                                onClick={() => setGridView(false)}
                            >
                                {
                                    <List
                                        className={`${
                                            gridView
                                                ? 'text-[#EAEAEA]'
                                                : 'text-[#017195]'
                                        }`}
                                    />
                                }
                            </button>
                            <button
                                className="px-4 py-2"
                                onClick={() => setGridView(true)}
                            >
                                <LayoutGrid
                                    className={`${
                                        gridView
                                            ? 'text-[#017195]'
                                            : 'text-[#EAEAEA]'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    <Suspense>
                        <SelectedFilters />
                    </Suspense>
                    <button
                        onClick={() => setShowSortOptions(!showSortOptions)}
                        className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-xl"
                    >
                        <ArrowDownWideNarrow
                            className="text-foreground"
                            size={20}
                        />
                        <span className="font-medium text-foreground text-sm cursor-pointer">
                            Sort
                        </span>
                    </button>
                    {showSortOptions && <SortOptions />}
                </div>
            </div>
            <div>
                {isLoading && <ProgramsOverlay />}
                {(!isLoading && gridView) || isMobile ? (
                    <ProgramCardGrid />
                ) : (
                    <ProgramCardColumn />
                )}
            </div>
        </div>
    )
}
