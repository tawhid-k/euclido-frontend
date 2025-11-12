'use client'

import { useState } from 'react'
import AddAcademicInterest from './add-academic-interest'

export default function AcademicInterestModal() {
    const [modalView, setModalView] = useState(false)

    const toggleModalView = () => {
        setModalView(!modalView)
    }

    const setModalFalse = () => {
        setModalView(false)
    }

    return (
        <div className="relative">
            {modalView && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-0"
                    onClick={setModalFalse}
                ></div>
            )}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    toggleModalView()
                }}
                className="flex justify-center items-center bg-[#F9FDFF] border-[#EDF8FF] border-[3px] rounded-lg px-12 py-6 text-foreground max-w-fit hover:bg-[#F1FAFF] hover:border-[#E4F4FF]"
            >
                Add Interest
            </button>
            <div
                className={`fixed z-50 top-0 right-0 h-full w-full xs:w-3/4 lg:w-1/3 bg-white shadow-lg transition-transform duration-700 transform ${
                    modalView ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <AddAcademicInterest isOpen={modalView} />
            </div>
        </div>
    )
}
