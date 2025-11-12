'use client'
import { Link } from 'lucide-react'
import { Button } from "@heroui/react"
import { getRequestUrl, getRequest } from '@/@/service/api-handler/get-manager'
import toast from 'react-hot-toast'
import useProgramListStore from '@/@/context/degree-list-context'

export default function BookmarkedProgramsSwitcher() {
    const programs = useProgramListStore((state) => state.programs)
    const links = useProgramListStore((state) => state.links)

    const clearPrograms = useProgramListStore((state) => state.clearPrograms)
    const setPrograms = useProgramListStore((state) => state.setPrograms)
    const setMeta = useProgramListStore((state) => state.setMeta)

    const setLinks = useProgramListStore((state) => state.setLinks)
    const fetchAndUpdate = async (url: string | undefined) => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }

        if (!url) {
            return
        }
        clearPrograms()
        const result = await getRequestUrl(url)

        scrollToTop()
        setPrograms(result.result)
        setMeta(result.meta)
        setLinks(result.links)
    }
    if (programs?.length === 0 || !links) {
        return <></>
    } else
        return (
            <div className="flex gap-4 py-6 h-24">
                <button
                    disabled={links.previous === '' || !links.previous}
                    onClick={() => fetchAndUpdate(links.previous || '')}
                    className="text-button-primary bg-white font-medium text-sm flex items-center gap-2 rounded-lg border-2 border-text-light-gray py-2 px-4 hover:border-button-primary transition ease-out duration-150"
                >
                    <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.0925331 5.81885L3.27428 10.3419C3.38857 10.5316 3.58944 10.5537 3.7229 10.3912C3.85636 10.2287 3.87192 9.9432 3.7576 9.75348C3.74693 9.7358 3.73534 9.71928 3.7229 9.70416L1.08523 5.95003L13.6818 5.95003C13.8575 5.95003 14 5.74752 14 5.49771C14 5.24789 13.8575 5.04542 13.6818 5.04542L1.08523 5.04542L3.7229 1.29584C3.85636 1.13337 3.87192 0.847831 3.7576 0.658108C3.64327 0.468384 3.44244 0.446268 3.30898 0.608782C3.29653 0.623941 3.28491 0.640422 3.27428 0.658108L0.0925055 5.18115C-0.0308399 5.3575 -0.030839 5.64242 0.0925331 5.81885Z"
                            fill="#017195"
                        />
                    </svg>
                    <span>Prev</span>
                </button>

                <button
                    disabled={links.next === '' || !links.next}
                    onClick={() => fetchAndUpdate(links.next || '')}
                    className="text-button-primary bg-white font-medium text-sm flex items-center gap-2 rounded-lg border-2 border-text-light-gray py-2 px-4 hover:border-button-primary transition ease-out duration-150"
                >
                    <span>Next</span>
                    <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.9075 5.18115L10.7257 0.658108C10.6114 0.468385 10.4106 0.446268 10.2771 0.608783C10.1436 0.771258 10.1281 1.0568 10.2424 1.24652C10.2531 1.2642 10.2647 1.28072 10.2771 1.29584L12.9148 5.04997H0.318166C0.142458 5.04997 0 5.25248 0 5.50229C0 5.75211 0.142458 5.95458 0.318166 5.95458H12.9148L10.2771 9.70416C10.1436 9.86663 10.1281 10.1522 10.2424 10.3419C10.3567 10.5316 10.5576 10.5537 10.691 10.3912C10.7035 10.3761 10.7151 10.3596 10.7257 10.3419L13.9075 5.81885C14.0308 5.6425 14.0308 5.35758 13.9075 5.18115Z"
                            fill="#017195"
                        />
                    </svg>
                </button>
            </div>
        )
}
