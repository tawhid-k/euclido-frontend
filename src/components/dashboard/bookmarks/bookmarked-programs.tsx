'use client'

import { useState } from 'react'
import { LayoutGrid, List, SearchIcon } from 'lucide-react'
import {
    useProfileStore,
    useSavedPrograms
} from '@/@/context/dashboard-context'
import ProgramCardColumn from '@/@/components/degree-list/program-card-column'
import ProgramCardGrid from '@/@/components/degree-list/program-card-grid'
import { ProgramsOverlay } from '@/@/components/global/skeleton'
import BookmarkedProgramsSwitcher from '@/@/components/profile/programs/navigation'
import { useMobileDevice } from '@/@/hooks/useMobileDevice'

type gridColHandler = {
    gridView: boolean
    setGridView: React.Dispatch<React.SetStateAction<boolean>>
}

type sortHandler = {
    sort: boolean
    setSort: React.Dispatch<React.SetStateAction<boolean>>
}

function MenuOptions({
    viewHandler,
    sortHandler,
    searchHandler
}: {
    viewHandler: gridColHandler
    sortHandler: sortHandler
    searchHandler: {
        searchQuery: string
        setSearchQuery: (query: string) => void
    }
}) {
    return (
        <div className="flex justify-between w-full ite">
            {/* searchbar, grid, sort */}
            {/* TODO: Add the search */}
            {/* <div className="border-[#ECF7FF] bg-white border-2 rounded-lg p-2 flex gap-2 items-center xs:w-full lg:max-w-fit">
                <div className="p-2 bg-[#EEF8FF] rounded-lg">
                    <SearchIcon strokeWidth={1} size={22} />
                </div>
                <input
                    type="text"
                    className="focus:outline-none"
                    placeholder="Search your programs"
                />
            </div> */}
            <div>
                <div className="flex items-center justify-center gap-2 bg-white rounded-xl">
                    <div className="grid grid-cols-2 divide-x">
                        <button
                            className="px-4 py-2"
                            onClick={() => viewHandler.setGridView(false)}
                        >
                            {
                                <List
                                    className={`${
                                        viewHandler.gridView
                                            ? 'text-[#EAEAEA]'
                                            : 'text-[#017195]'
                                    }`}
                                />
                            }
                        </button>
                        <button
                            className="px-4 py-2"
                            onClick={() => viewHandler.setGridView(true)}
                        >
                            <LayoutGrid
                                className={`${
                                    viewHandler.gridView
                                        ? 'text-[#017195]'
                                        : 'text-[#EAEAEA]'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ProfileSavedPrograms() {
    const savedPrograms = useSavedPrograms()
    const savedProgramsDetails = savedPrograms?.map(
        (program) => program.program
    )
    const isMobile = useMobileDevice()
    // FIXME: Proper Filter Implementation
    const filteredPrograms = savedPrograms
    const [gridView, setGridView] = useState(false)
    const [sort, setSort] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    if (!savedPrograms) {
        return <ProgramsOverlay />
    } else if (savedPrograms.length === 0) {
        return <p className="text-foreground-50">No bookmarked programs</p>
    } else {
        return (
            <div className="w-full flex items-center justify-center">
                <div className="min-h-screen max-w-fit flex flex-col gap-6">
                    {!isMobile && <MenuOptions
                        viewHandler={{ gridView, setGridView }}
                        sortHandler={{ sort, setSort }}
                        searchHandler={{ searchQuery, setSearchQuery }}
                    />}
                    <div>
                        {!gridView && !isMobile ? (
                            <ProgramCardColumn
                                bookmarked_programs={savedProgramsDetails}
                            />
                        ) : (
                            <ProgramCardGrid
                                bookmarked_programs={savedProgramsDetails}
                            />
                        )}
                        <BookmarkedProgramsSwitcher />
                    </div>
                </div>
            </div>
        )
    }
}
