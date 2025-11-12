import { SeparatorVerticalIcon } from 'lucide-react'

export interface InfoItem {
    label: string
    value: string | number
}

export function DegreeListProgramBasicInformationFormat({
    items
}: {
    items: InfoItem[]
}) {
    return (
        <div className="flex items-center gap-4">
            {items.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-foreground/90 font-light">
                            {item.label}
                        </p>
                        <p className="font-medium text-primary">{item.value}</p>
                    </div>
                    {index < items.length - 1 && (
                        <SeparatorVerticalIcon
                            strokeWidth={1.5}
                            className="text-lightblue"
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
