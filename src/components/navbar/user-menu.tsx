'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function UserMenu({ path, name }: { path: any; name: string }) {
    const [showOptions, setShowOptions] = useState(false)
    const personSvg = (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_397_5546)">
                <path
                    d="M18.7782 14.2218C17.5801 13.0237 16.1541 12.1368 14.5982 11.5999C16.2646 10.4522 17.3594 8.53136 17.3594 6.35938C17.3594 2.85282 14.5066 0 11 0C7.49345 0 4.64062 2.85282 4.64062 6.35938C4.64062 8.53136 5.73543 10.4522 7.40188 11.5999C5.84598 12.1368 4.41994 13.0237 3.22184 14.2218C1.14421 16.2995 0 19.0618 0 22H1.71875C1.71875 16.8823 5.88229 12.7188 11 12.7188C16.1177 12.7188 20.2812 16.8823 20.2812 22H22C22 19.0618 20.8558 16.2995 18.7782 14.2218ZM11 11C8.44117 11 6.35938 8.91825 6.35938 6.35938C6.35938 3.8005 8.44117 1.71875 11 1.71875C13.5588 1.71875 15.6406 3.8005 15.6406 6.35938C15.6406 8.91825 13.5588 11 11 11Z"
                    fill="#017195"
                />
            </g>
            <defs>
                <clipPath id="clip0_397_5546">
                    <rect width="22" height="22" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )

    return (
        <div className="max-w-fit relative flex flex-col items-center justify-center gap-4">
            <div
                className="flex gap-2 items-center"
                onClick={() => setShowOptions(!showOptions)}
            >
                {path ? (
                    <Image
                        width="40"
                        height="40"
                        onClick={() => setShowOptions(!showOptions)}
                        src={path}
                        alt="Supervisor Image"
                        className="rounded-full ring-2 ring-blue-400 hover:ring-8 hover:ring-sky-300"
                    />
                ) : (
                    personSvg
                )}
                <label className="text-foreground font-semibold text-[16px] selection:select-none">
                    {name}
                </label>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.6919 6.43306C16.936 6.67713 16.936 7.07286 16.6919 7.31694L10.4419 13.5669C10.1978 13.811 9.80217 13.811 9.55808 13.5669L3.30806 7.31694C3.06398 7.07286 3.06398 6.67713 3.30806 6.43306C3.55213 6.18898 3.94786 6.18898 4.19194 6.43306L10 12.2411L15.8081 6.43306C16.0522 6.18898 16.4478 6.18898 16.6919 6.43306Z"
                        fill="#00406B"
                    />
                </svg>
            </div>
            <div className="absolute top-4 left-6">
                {showOptions ? (
                    <h3>Hello World! Welcome to Euclido!</h3>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
