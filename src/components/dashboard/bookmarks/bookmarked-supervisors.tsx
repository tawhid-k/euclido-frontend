import { SupervisorCard } from '@/@/components/degree-list/supervisor-modal'
import {
    useProfileStore,
} from '@/@/context/dashboard-context'


export default function ProfileSavedSupervisors() {
    const supervisors = useProfileStore().savedSupervisors
    return (
        <div className="flex flex-col gap-6">
            
            <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-4">
            {supervisors?.map((p, index) => (
                <div key={index}>
                    {' '}
                    <SupervisorCard prof={p} fromDashboard={true} />{' '}
                </div>
            ))}
        </div>
        </div>
    )
}
