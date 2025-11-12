import { SeparatorVerticalIcon, CopyrightIcon } from 'lucide-react'
import { FacebookIcon, XIcon, LinkedinIcon, GithubIcon } from './icons'

export default function Footer() {
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col lg:flex-row items-center gap-4 text-foreground xs:text-xs lg:text-sm">
                    <div className="flex flex-wrap justify-center gap-3">
                        <span className="hover:text-primary cursor-pointer">
                            About us
                        </span>
                        <span className="hover:text-primary cursor-pointer">
                            Contact us
                        </span>
                        <span className="hover:text-primary cursor-pointer">
                            Privacy Policy
                        </span>
                        <span className="hover:text-primary cursor-pointer">
                            Terms and Conditions
                        </span>
                    </div>
                    <div className="hidden lg:block">
                        <SeparatorVerticalIcon strokeWidth={1.5} />
                    </div>
                    <span className="flex items-center gap-1">
                        Copyright <CopyrightIcon size={16} strokeWidth={1.5} />{' '}
                        {new Date().getFullYear()} | Euclido Inc.
                    </span>
                </div>
                <div className="xs:hidden lg:flex gap-3">
                    {[
                        { Icon: FacebookIcon, label: 'Facebook' },
                        { Icon: XIcon, label: 'X' },
                        { Icon: LinkedinIcon, label: 'LinkedIn' },
                        { Icon: GithubIcon, label: 'GitHub' }
                    ].map(({ Icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-primary hover:bg-primary/10 transition-colors"
                            aria-label={label}
                        >
                            <Icon size={20} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
