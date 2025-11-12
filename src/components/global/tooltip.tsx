import { Tooltip, Button } from "@heroui/react"

export default function CustomTooltip({
    Component,
    tip
}: {
    Component: React.ReactNode
    tip: string
}) {
    return (
        <Tooltip
            showArrow
            classNames={{
                base: ['bg-white rounded-xl border-[F0F0F0]/40'],
                content: [
                    'py-2 px-4 bg-white rounded-xl',
                    'text-gray-600 font-medium text-xs bg-white'
                ]
            }}
            content={tip}
            placement="top"
        >
            {Component}
        </Tooltip>
    )
}
