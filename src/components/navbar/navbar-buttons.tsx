import { MoveRight } from 'lucide-react'
import Link from 'next/link'
export default function Buttons() {
    return (
        <div className="flex items-center gap-2 text-xs font-medium text-white hover:bg-hover-button-primary bg-button-primary rounded-full px-4 py-2">
            <Link href="/auth/signin">Sign In</Link>
            <MoveRight width={20} />
        </div>
    )
}
