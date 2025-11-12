import { Alert } from "@heroui/react"
import Link from 'next/link'

export default function ToastWithButton({
    title,
    description,
    linkPath,
    linkLabel
}: {
    title: string
    description: string
    linkPath: string
    linkLabel: string
}) {
    return (
        <div className="max-w-fit flex gap-4">
            <Alert
                title={title}
                key={'primary'}
                color={'primary'}
                variant="faded"
                description={description}
                endContent={
                    <Link
                        className="rounded-lg text-xs border-2 border-primary/40 bg-primary text-white px-2 py-1"
                        href={linkPath}
                    >
                        {linkLabel}
                    </Link>
                }
            />
        </div>
    )
}
