import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function Eligibility() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const labelStyle =
        'flex flex-row justify-between items-center max-w-[200px] bg-[#F8F8F8] gap-4 px-4 py-2 text-[#18467E]/50 text-sm rounded-full'
    const inputStyle =
        'bg-[#F8F8F8] max-w-[80px] text-[#18467E] focus:outline-none'
    const handleChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value === '') {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        replace(`${pathname}?${params}`)
    }

    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 grid xs:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={labelStyle}>
                <label>CGPA</label>
                <input
                    placeholder="out of 4"
                    className={inputStyle}
                    onChange={(e) => handleChange('cgpa', e.target.value)}
                    min={0}
                    max={4}
                    step={0.25}
                    type="number"
                />
            </div>
            <div className={labelStyle}>
                <label>GRE</label>
                <input
                    className={inputStyle}
                    onChange={(e) => handleChange('gre', e.target.value)}
                    min={0}
                    max={340}
                    step={1}
                    type="number"
                />
            </div>
            <div className={labelStyle}>
                <label>IELTS</label>
                <input
                    className={inputStyle}
                    onChange={(e) =>
                        handleChange('ielts-score', e.target.value)
                    }
                    min={0}
                    max={9}
                    step={0.5}
                    type="number"
                />
            </div>
            <div className={labelStyle}>
                <label>TOEFL</label>
                <input
                    min={0}
                    onChange={(e) =>
                        handleChange('toefl-score', e.target.value)
                    }
                    max={120}
                    step={1}
                    className={inputStyle}
                    type="number"
                />
            </div>
        </div>
    )
}
