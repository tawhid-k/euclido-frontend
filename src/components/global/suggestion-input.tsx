import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getRequest } from '@/@/service/api-handler/get-manager'

type SuggestionType = {
    name: string
}

interface GenericSuggestionInputProps<T> {
    apiPath: string
    placeholder: string
    dataKey: string
    itemType: T[]
    inputStyle: string
    defaultValue?: string
    onSelectItem?: ({ item }: { item: T; selected?: boolean }) => void
    disabled?: boolean
    clearIfSelected?: boolean
}

export default function GenericSuggestionInput<T extends SuggestionType>({
    apiPath,
    placeholder,
    dataKey,
    itemType,
    inputStyle,
    defaultValue = '',
    onSelectItem,
    disabled = false,
    clearIfSelected = false
}: GenericSuggestionInputProps<T>) {
    const [items, setItems] = useState<T[]>([])
    const [inputValue, setInputValue] = useState(defaultValue)
    const [isFocused, setIsFocused] = useState(false)
    const { register, setValue } = useFormContext()
    const [selected, setSelected] = useState(false)
    useEffect(() => {
        getRequest(apiPath, true).then((response) => {
            if (response.statusCode === 200) {
                setItems(response.result as T[])
            }
        })
    }, [apiPath])
    useEffect(() => {
        setValue(dataKey, defaultValue)
    }, [defaultValue, dataKey, setValue])

    const filteredItems = useMemo(() => {
        if (inputValue === '') return items
        const filteredItems = items.filter((item) =>
            item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
        if (filteredItems.length === 1) {
            if (filteredItems[0].name === inputValue) {
                setSelected(true)
            }
        }
        return filteredItems
    }, [inputValue, items])

    const handleBlur = () => setTimeout(() => setIsFocused(false), 200)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selected) {
            setInputValue('')
            setSelected(false)
        } else {
            setInputValue(e.target.value)
        }
    }

    return (
        <div className="relative w-full">
            <input
                {...register(dataKey)}
                type="text"
                defaultValue={defaultValue}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                className={`${inputStyle} ${selected && 'bg-white'}`}
                placeholder={placeholder}
                disabled={disabled}
                required
            />
            {isFocused && filteredItems.length > 0 && (
                <ul className="z-10 absolute top-full left-0 right-0 bg-white mt-1 max-h-60 overflow-y-auto rounded-xl p-3 text-sm text-foreground/80 font-normal">
                    {filteredItems.map((item, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setInputValue(item.name)
                                setValue(dataKey, item.name)
                                setSelected(true && !clearIfSelected)
                                if (onSelectItem) {
                                    if (clearIfSelected) {
                                        setInputValue('')
                                    }
                                    onSelectItem({
                                        item: item,
                                        selected: selected
                                    })
                                }
                            }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
