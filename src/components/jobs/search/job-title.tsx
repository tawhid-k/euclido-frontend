'use client'

import { debounce } from 'lodash'
import { useCallback, useState, useRef, useEffect } from 'react'
import {
    useDisciplineStore,
    useprogramTitleStore
} from '@/@/context/program-search-context'
import { getRequest } from '@/@/service/api-handler/get-manager'
import { Skeleton } from '@heroui/skeleton'
import { Capitalize } from '@/@/utils/format'
import { BookOpenIcon } from 'lucide-react'

type DisciplineType = {
    alias: string
    name: string
    slugs: string[]
}

type ProgramType = {
    name: string
    degreeLevelType: string
    city: string
    state: string
    country: string
}

export function SearchDisciplines() {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isDisciplineTab, setIsDisciplineTab] = useState(true)
    const [suggestionDisciplines, setSuggestionDisciplines] = useState<
        DisciplineType[]
    >([])
    const [suggestionPrograms, setSuggestionPrograms] = useState<ProgramType[]>(
        []
    )

    const { setDiscipline } = useDisciplineStore()
    const { setProgramTitle } = useprogramTitleStore()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const fetchSuggestions = useCallback(
        async (searchTerm: string) => {
            if (!searchTerm) {
                resetSuggestions()
                return
            }

            setShowSuggestions(true)
            try {
                const response = await getRequest(
                    `search?keyword=${searchTerm}`
                )
                setSuggestionDisciplines(response.result?.discipline || [])
                setSuggestionPrograms(response.result?.program || [])
                setProgramTitle(searchTerm)
            } catch (error) {
                console.error('Error fetching suggestions:', error)
                resetSuggestions()
            }
        },
        [setProgramTitle]
    )

    const debouncedFetch = useCallback(
        debounce((term: string) => fetchSuggestions(term), 300),
        [fetchSuggestions]
    )

    const resetSuggestions = () => {
        setSuggestionDisciplines([])
        setSuggestionPrograms([])
        setShowSuggestions(false)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setInputValue(newValue)
        setProgramTitle(newValue)
        debouncedFetch(newValue)
    }

    const selectDiscipline = (discipline: DisciplineType) => {
        setDiscipline({
            label: discipline.name,
            slug: discipline.slugs.join('%2b')
        })
        setProgramTitle(null)
        setInputValue(discipline.name)
        setShowSuggestions(false)
    }

    const selectProgram = (program: ProgramType) => {
        setDiscipline(null)
        setProgramTitle(program.name)
        setInputValue(program.name)
        setShowSuggestions(false)
    }

    return (
        <div
            className="w-full relative flex gap-2 items-center"
            ref={containerRef}
        >
            <BookOpenIcon
                className="text-primary"
                size={20}
                strokeWidth={1.5}
            />
            <input
                type="text"
                onChange={handleInputChange}
                value={inputValue}
                className="focus:outline-none text-foreground font-medium placeholder:text-[#18467E] placeholder:text-opacity-60 placeholder:font-medium w-[150px] relative"
                placeholder="What to study"
            />

            {showSuggestions && (
                <div className="absolute left-1/2 transform -translate-x-1/2 z-50 top-8 mt-2 bg-white rounded-xl px-3">
                    <div className="flex gap-4 py-2 justify-center">
                        <button
                            onClick={() => setIsDisciplineTab(true)}
                            className={`text-sm py-2 cursor-pointer text-start p-1 ${
                                isDisciplineTab
                                    ? 'text-primary font-semibold border-b-2 border-primary'
                                    : 'text-primary/80'
                            }`}
                        >
                            Disciplines
                        </button>
                        <button
                            onClick={() => setIsDisciplineTab(false)}
                            className={`text-sm py-2 cursor-pointer text-start p-1 ${
                                isDisciplineTab
                                    ? 'text-primary/80'
                                    : 'text-primary font-semibold border-b-2 border-primary'
                            }`}
                        >
                            Programs
                        </button>
                    </div>

                    <ul className="overflow-y-scroll h-[250px] flex flex-col gap-4 pt-2">
                        {!isDisciplineTab &&
                            suggestionPrograms.map((program, index) => (
                                <li
                                    key={index}
                                    onClick={() => selectProgram(program)}
                                    className="flex flex-col gap-0 items-start cursor-pointer text-start font-medium text-foreground text-opacity-80 hover:text-opacity-100"
                                >
                                    <p className="xs:text-wrap xl:text-nowrap text-sm">
                                        {program.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {Capitalize(program.degreeLevelType)}
                                    </p>
                                </li>
                            ))}

                        {isDisciplineTab &&
                            (suggestionDisciplines.length > 0 ? (
                                suggestionDisciplines.map(
                                    (discipline, index) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                selectDiscipline(discipline)
                                            }
                                            className="flex flex-col xs:text-wrap xl:text-nowrap gap-0 items-start cursor-pointer text-start font-medium text-foreground text-opacity-80 hover:text-opacity-100"
                                        >
                                            {discipline.name}
                                        </li>
                                    )
                                )
                            ) : (
                                <div className="flex flex-col justify-center items-center gap-2">
                                    {[1, 2, 3, 4].map((index) => (
                                        <Skeleton
                                            key={index}
                                            className="h-4 rounded-xl w-full"
                                        />
                                    ))}
                                </div>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
