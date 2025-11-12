'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

function TableOfContent({ id, name }: { id: string; name: string }) {
    return (
        <Link
            href={`#${id}`}
            scroll={false}
            onClick={() =>
                document
                    .getElementById(`${id}`)
                    ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="h-10 hover:font-extrabold hover:border-b-2 hover:text-hover-button-primary hover:border-b-hover-button-primary"
        >
            {name}
        </Link>
    )
}

type Content = {
    id: string
    name: string
}

export default function TableOfContents() {
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY

            setVisible(currentScrollPos > 600)

            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos, visible])

    const textColor = 'text-foreground'
    const contents: Content[] = [
        { id: 'overview', name: 'Overview' },
        { id: 'admission-requirements', name: 'Admission Requirements' },
        { id: 'application-checklist', name: 'Application Checklist' },
        { id: 'funding', name: 'Funding, Tuition fees & Expenses' }
    ]
    return (
        <div
            className={`xs:hidden lg:inline-flex border-b-2 border-b-text-primary/10 justify-between w-full ${
                visible ? 'fixed top-0 w-full pb-2 z-10' : ''
            } ${textColor} xs:px-8 lg:px-16 pt-6 xs:overflow-y-hidden xs:overflow-x-scroll md:overflow-x-auto font-medium text-sm`}
        >
            {contents.map((content, index) => (
                <TableOfContent
                    key={index}
                    id={content.id}
                    name={content.name}
                />
            ))}
        </div>
    )
}

// lg:col-span-2 lg:pt-8 flex xs:flex-row xs:gap-6 lg:gap-0 lg:gap-10 xs:overflow-scroll md:overflow-hidden lg:flex-col
