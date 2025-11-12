import { Skeleton } from '@heroui/skeleton'
import Image from 'next/image'

export default function UniversityLogo({
    path,
    name,
    size
}: {
    path: string
    name: string
    size: number
}) {
    if (!path) {
        return <Skeleton className="rounded-full w-20 h-30" />
    }
    return (
        <Image
            src={`/university-logo/${path}`}
            alt={name}
            width={size}
            height={size}
        />
    )
}
