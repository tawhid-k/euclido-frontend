import Link from 'next/link'
import { logo } from '../../../public/logo'

export function Logo() {
    return (
        <Link href="/">
            <div className="flex gap-4 justify-center items-center">
                {logo}
                <p className="font-semibold xs:text-sm lg:text-base text-foreground">
                    EUCLIDO
                </p>
            </div>
        </Link>
    )
}
