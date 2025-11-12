import { CircularProgress } from "@heroui/react"

//<ProgressCircle identity={1} maxValue={9} value={7} />

export function QSRankProgressDegreeDetails(props: {
    maxValue: number
    value: number
}) {
    return (
        <CircularProgress
            classNames={{
                svg: 'w-12 h-12',
                indicator: 'stroke-[#D9EFFE]',
                track: 'stroke-[#D9EFFE]',
                value: 'text-xs font-semibold text-button-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            }}
            aria-label="Progress Bar"
            value={props.value}
            valueLabel={`${props.value}`}
            maxValue={props.maxValue}
            strokeWidth={2}
            showValueLabel={true}
        />
    )
}

export function QSRankProgress(props: { maxValue: number; value: number }) {
    return (
        <CircularProgress
            classNames={{
                svg: 'w-12 h-12',
                indicator: 'stroke-[#FFCB77]',
                track: 'stroke-[#FFCB77]',
                value: 'text-xs font-semibold text-[#18467E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            }}
            aria-label="Progress Bar"
            value={props.value}
            valueLabel={`${props.value}`}
            maxValue={props.maxValue}
            strokeWidth={2}
            showValueLabel={true}
        />
    )
}

export function AcceptanceRateProgress(props: {
    maxValue: number
    value: number
}) {
    return (
        <CircularProgress
            classNames={{
                svg: 'w-12 h-12',
                indicator: 'stroke-[#17C3B2]',
                track: 'stroke-[#17C3B2]/20',
                value: 'text-xs font-semibold text-light-sea-green absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            }}
            aria-label="Progress Bar"
            value={Math.round(props.value)}
            valueLabel={`${Math.round(props.value)}%`}
            maxValue={props.maxValue}
            strokeWidth={2}
            showValueLabel={true}
        />
    )
}
