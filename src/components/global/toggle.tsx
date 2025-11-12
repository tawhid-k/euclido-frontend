import { useState } from 'react'

interface ToggleSwitchProps {
    value: boolean;
    onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onChange }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div
                className={`scale-50 w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-green-500 peer-checked:before:translate-x-6 before:content-[''] before:absolute before:top-1 before:left-1 before:w-6 before:h-6 before:bg-white before:rounded-full before:transition-all`}
            ></div>
        </label>
    )
}

export default ToggleSwitch
