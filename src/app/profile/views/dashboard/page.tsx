import UpcomingDeadlines from './components/deadlines'
import InterestedPrograms from './components/interested-programs'
import { bookACallSvg } from '../../../../components/dashboard/svgItems'

function Calender() {
    return <div></div>
}

function BookACallAd() {
    return (
        <div
            className={`bg-gradient-to-r from-[#00406B] via-[#036694] via-60% to-[#017195] w-full rounded-lg`}
        >
            <div className="grid grid-cols-2">
                <div className="xs:col-span-2 lg:col-span-1 xs:p-6 lg:p-8 flex flex-col xs:gap-4 justify-between">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-light-text xs:text-xl lg:text-2xl font-semibold">
                            Get personalized assistance on your admission with
                            Euclido
                        </h1>
                        <p className="text-button-light-primary font-normal text-sm xs:w-full lg:w-2/3">
                            Learn about admission requirements, application
                            checklists, funding, expenses and much more ...
                        </p>
                    </div>
                    <button className="text-button-primary w-[200px] rounded-full bg-button-light-primary p-3 text-sm font-semibold">
                        <div className="flex items-center justify-center gap-4">
                            <p>Book a call</p>
                        </div>
                    </button>
                </div>
                <div className="xs:hidden lg:block col-span-1 justify-self-end mr-10">
                    {bookACallSvg}
                </div>
            </div>
        </div>
    )
}

export default function ProfileDashboard() {
    return (
        <div className="grid grid-cols-3 gap-x-8 gap-y-16">
            <div className="xs:hidden lg:block col-span-2">
                <UpcomingDeadlines />
            </div>
            <div className="col-span-1">
                <Calender />
            </div>
            {/* <div className="col-span-3">
                <InterestedPrograms />
            </div> */}
            <div className="col-span-3">
                <BookACallAd />
            </div>
        </div>
    )
}
