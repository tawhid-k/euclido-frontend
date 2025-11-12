
import { TopLayer, SecondLayer } from '@/@/components/degree-details/layers'

import { headers } from 'next/headers'

export default async function DegreeDetails({
    params
}: {
    params: Promise<{ uuid: string }>
}) {
    const headersList = headers()
    const isSignedIn = (await headersList).get('x-is-authenticated') === 'true'
    const { uuid } = await params
    return (
        <div className="py-12 flex flex-col gap-20">
            <TopLayer uuid={uuid} />
            <SecondLayer isSignedIn={isSignedIn} />
        </div>
    )
}
