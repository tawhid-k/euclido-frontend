'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Award, Navigation, SearchIcon } from 'lucide-react'
import { getRequest } from '@/@/service/api-handler/get-manager'
import { debounce } from 'lodash'

interface JobMeilisearch {
    title: string;
    keywords: string;
}

export default function SearchBoxJobs() {
    const [inputValue, setInputValue] = useState('')
    const [jobKeywords, setJobKeywords] = useState<string>('')
    const inputStyle = 'bg-white rounded-full px-2 w-full xs:py-2'
    const containerRef = useRef<HTMLDivElement>(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [suggestionJobs, setSuggestionJobs] = useState<JobMeilisearch[]>(
        []
    )

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
                    `search/jobs?keyword=${searchTerm}`
                )
                console.log(response.result)
                setSuggestionJobs(response.result)
            } catch (error) {
                console.error('Error fetching suggestions:', error)
                resetSuggestions()
            }
        },
        [inputValue]
    )

    const debouncedFetch = useCallback(
        debounce((term: string) => fetchSuggestions(term), 300),
        [fetchSuggestions]
    )

    const resetSuggestions = () => {
        setShowSuggestions(false)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setInputValue(newValue)
        debouncedFetch(newValue)
    }
    const selectJob = (job: JobMeilisearch) => {
        setInputValue(job.title)
        setJobKeywords(job.keywords)
        setShowSuggestions(false)
    }

    return (
        <div ref={containerRef} className="xs:w-4/5 lg:w-1/3 relative flex lg:flex-row xs:flex-col xs:rounded-md lg:rounded-full text-sm py-2 xs:px-2 lg:px-6 xs:bg-transparent xl:bg-white items-center justify-between">
            <div className="flex xs:flex-col gap-2 w-full xl:flex-row xl:justify-between items-center xs:pr-0 xl:pr-8">
                <div className={inputStyle}>
                    <div className="w-full relative flex gap-2 items-center">
                        <Award
                            className="text-primary"
                            size={20}
                            strokeWidth={1.5}
                        />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="focus:outline-none w-full text-foreground font-medium placeholder:text-[#18467E] placeholder:text-opacity-60 placeholder:font-medium relative"
                            placeholder="Job title or keyword"
                        />
                    </div>
                    {showSuggestions && (
                <div className="absolute  z-50 top-8 mt-8 bg-white rounded-xl px-3">
                    <ul className="overflow-y-scroll h-[250px] flex flex-col gap-4 pt-2">
                        {
                            suggestionJobs.map((job, index) => (
                                <li
                                    key={index}
                                    onClick={() => selectJob(job)}
                                    className="flex flex-col gap-0 items-start cursor-pointer text-start font-medium text-foreground text-opacity-80 hover:text-opacity-100"
                                >
                                    <p className="xs:text-wrap xl:text-nowrap text-sm">
                                        {job.title}
                                    </p>
                                </li>
                            ))}

                
                    </ul>
                </div>
            )}
                </div>
                <div className={inputStyle}>
                    <div className="w-full relative flex gap-2 items-center">
                        <Navigation
                            className="text-primary"
                            size={20}
                            strokeWidth={1.5}
                        />
                        <input
                            type="text"
                            className="focus:outline-none w-full text-foreground font-medium placeholder:text-[#18467E] placeholder:text-opacity-60 placeholder:font-medium relative"
                            placeholder="Location"
                        />
                    </div>
                </div>
                <Link
                    href={`jobs/jobs-list?job-title=${jobKeywords || inputValue}`}
                    className="xl:absolute xl:right-2 inline-flex justify-center items-center bg-button-primary hover:bg-hover-button-primary h-10 w-10 rounded-full"
                >
                    <SearchIcon className="text-white" strokeWidth={1.5} />
                </Link>
            </div>
        </div>
    )
}
