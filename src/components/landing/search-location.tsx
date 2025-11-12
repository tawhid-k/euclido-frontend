'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { NavigationIcon } from 'lucide-react'
import { useCountryStore } from '@/@/context/program-search-context'
import { countriesMinimized } from '@/@/hooks/useFilterLoader'

export function SearchLocations() {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [inputValue, setInputValue] = useState('')
    const { setCountry } = useCountryStore()
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
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setInputValue(newValue)
    }
    return (
        <div
            className="w-full relative flex gap-2 items-center"
            ref={containerRef}
        >
            <NavigationIcon
                className="text-primary"
                strokeWidth={1.5}
                size={20}
            />
            <input
                type="text"
                onChange={handleInputChange}
                value={inputValue}
                className="focus:outline-none text-foreground font-medium placeholder:text-[#18467E] placeholder:text-opacity-60 placeholder:font-medium w-[150px] relative"
                placeholder="Where to study"
                onFocus={() => setShowSuggestions(true)}
            />

            {showSuggestions && (
                <div className="absolute w-full left-1/2 transform -translate-x-1/2 z-50 top-8 mt-2 bg-white rounded-xl px-3 py-2">
                    <ul className="overflow-y-scroll flex flex-col gap-4">
                        {countriesMinimized.map((country, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => {
                                    setCountry(country)
                                    setShowSuggestions(false)
                                    setInputValue(country.name)
                                }}
                            >
                                <span>{country.flag}</span>
                                <span className="text-foreground font-light text-xs">
                                    {country.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
