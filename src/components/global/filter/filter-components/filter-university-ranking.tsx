'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { Slider } from '@heroui/react'

export default function UniversityRankRanger() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [value, setValue] = useState<[number, number]>([1, 3000])

    const handleDebounce = useCallback(
        debounce(([minVal, maxVal]: [number, number]) => {
            const params = new URLSearchParams(searchParams?.toString() || '')
            params.set('uniRankMin', minVal.toString())
            params.set('uniRankMax', maxVal.toString())
            router.replace(`${pathname}?${params.toString()}`)
        }, 400),
        [pathname, searchParams, router]
    )

    const handleChange = ([minVal, maxVal]: [number, number]) => {
        setValue([minVal, maxVal])
        handleDebounce([minVal, maxVal])
    }

    const inputStyle =
        'bg-[#F8F8F8] max-w-[130px] text-[#18467E] focus:outline-none px-4 py-2 text-[#18467E]/50 text-sm rounded-full'

    return (
        <div className="flex flex-col items-start gap-6">
            <div className="flex xs:flex-col lg:flex-row gap-4">
                <input
                    type="number"
                    value={value[0]}
                    min={1}
                    max={value[1] - 1}
                    onChange={(e) => {
                        const newMinVal = Number(e.target.value)
                        if (newMinVal >= value[1]) {
                            handleChange([newMinVal, newMinVal + 1])
                        } else {
                            handleChange([newMinVal, value[1]])
                        }
                    }}
                    placeholder="Min"
                    className={inputStyle}
                />
                <input
                    type="number"
                    value={value[1]}
                    min={value[0] + 1}
                    max={3000}
                    onChange={(e) => {
                        const newMaxVal = Number(e.target.value)
                        if (newMaxVal <= value[0]) {
                            handleChange([
                                Math.max(newMaxVal - 1, 0),
                                newMaxVal
                            ])
                        } else {
                            handleChange([value[0], newMaxVal])
                        }
                    }}
                    placeholder="Max"
                    className={inputStyle}
                />
            </div>

            <div className="w-full">
                <Slider
                    className="max-w-sm"
                    maxValue={3000}
                    minValue={1}
                    step={1}
                    size="sm"
                    value={value}
                    onChange={(newValue) => {
                        handleChange(newValue as [number, number])
                    }}
                />
            </div>
        </div>
    )
}
