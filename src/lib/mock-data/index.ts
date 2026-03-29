import { mockDisciplines } from './disciplines'
import { mockCountries } from './countries'
import { mockUniversities } from './universities'
import { mockPrograms, PROGRAM_UUIDS } from './programs'
import { mockProgramDetails } from './program-details'
import { mockSupervisors } from './supervisors'
import { mockJobs } from './jobs'
import { mockProfile, mockUser } from './profile'
import { mockBookmarkedPrograms, mockBookmarkedSupervisors, mockBookmarkedJobs } from './bookmarks'

// ─── Pagination helpers ───────────────────────────────────────────────────────

function paginate<T>(items: T[], page = 1, limit = 10) {
    const totalItems = items.length
    const totalPages = Math.max(1, Math.ceil(totalItems / limit))
    const currentPage = Math.min(page, totalPages)
    const start = (currentPage - 1) * limit
    const paged = items.slice(start, start + limit)
    return {
        result: paged,
        meta: { totalItems, itemCount: paged.length, itemsPerPage: limit, totalPages, currentPage },
        links: { first: '', previous: '', next: '', last: '' }
    }
}

// ─── Filter programs by URL query params ─────────────────────────────────────

function filterPrograms(urlStr: string) {
    const raw = urlStr.includes('?') ? urlStr.split('?')[1] : urlStr
    const params = new URLSearchParams(raw.replace(/&limit=\d+/, ''))

    let results = [...mockPrograms]

    const disciplines = params.get('disciplines')
    if (disciplines) {
        const slugs = disciplines.toLowerCase().split('+').map(s => decodeURIComponent(s).trim())
        results = results.filter(p =>
            p.programDisciplines.some(pd =>
                slugs.some(s => pd.discipline.slug.includes(s) || pd.discipline.name.toLowerCase().includes(s))
            )
        )
    }

    const countries = params.get('countries')
    if (countries) {
        const isoCodes = countries.toUpperCase().split('+').map(s => decodeURIComponent(s).trim())
        results = results.filter(p => isoCodes.includes(p.university.countryCode))
    }

    const degreeLevel = params.get('degree-level')
    if (degreeLevel) {
        const levels = degreeLevel.toLowerCase().split('+').map(s => decodeURIComponent(s).trim())
        results = results.filter(p => levels.some(l => p.degreeLevel.toLowerCase().includes(l)))
    }

    const deliveryMode = params.get('delivery-mode')
    if (deliveryMode) {
        const modes = deliveryMode.toLowerCase().split('+')
        results = results.filter(p =>
            p.tuitionFees.some(tf => modes.includes(tf.deliveryMode.toLowerCase()))
        )
    }

    const programTitle = params.get('program-title')
    if (programTitle) {
        const q = decodeURIComponent(programTitle).replace(/-/g, ' ').toLowerCase()
        results = results.filter(p => p.name.toLowerCase().includes(q))
    }

    const programType = params.get('program-type')
    if (programType) {
        const types = programType.toLowerCase().split('+')
        results = results.filter(p =>
            p.types.some(t => types.includes(t.type.toLowerCase()))
        )
    }

    const limitMatch = urlStr.match(/[?&]limit=(\d+)/)
    const limit = limitMatch ? parseInt(limitMatch[1], 10) : 10

    const pageMatch = urlStr.match(/[?&]page=(\d+)/)
    const page = pageMatch ? parseInt(pageMatch[1], 10) : 1

    return { statusCode: 200, message: 'Success', ...paginate(results, page, limit) }
}

// ─── Filter jobs by URL query params ─────────────────────────────────────────

function filterJobs(urlStr: string) {
    const raw = urlStr.includes('?') ? urlStr.split('?')[1] : urlStr
    const params = new URLSearchParams(raw.replace(/&limit=\d+/, ''))

    let results = mockJobs.filter(j => j.isActive && !j.isDraft)

    const jobTitle = params.get('job-title')
    if (jobTitle) {
        const q = decodeURIComponent(jobTitle).toLowerCase()
        results = results.filter(j => j.jobTitle.toLowerCase().includes(q))
    }

    const disciplines = params.get('disciplines')
    if (disciplines) {
        const slugs = disciplines.toLowerCase().split('+').map(s => decodeURIComponent(s).trim())
        results = results.filter(j =>
            slugs.some(s => j.discipline.slug.includes(s) || j.discipline.name.toLowerCase().includes(s))
        )
    }

    const countries = params.get('countries')
    if (countries) {
        const isoCodes = countries.toUpperCase().split('+').map(s => decodeURIComponent(s).trim())
        results = results.filter(j => isoCodes.includes(j.university.countryCode))
    }

    const minQual = params.get('minimum-qualifications')
    if (minQual) {
        const quals = minQual.toLowerCase().split('+')
        results = results.filter(j => quals.includes(j.minimumQualification.toLowerCase()))
    }

    const jobType = params.get('job-type')
    if (jobType) {
        const types = jobType.toLowerCase().split('+')
        results = results.filter(j => types.includes(j.jobType.toLowerCase()))
    }

    const jobMode = params.get('job-mode')
    if (jobMode) {
        const modes = jobMode.toLowerCase().split('+')
        results = results.filter(j => modes.includes(j.jobMode.toLowerCase()))
    }

    const limitMatch = urlStr.match(/[?&]limit=(\d+)/)
    const limit = limitMatch ? parseInt(limitMatch[1], 10) : 10

    const pageMatch = urlStr.match(/[?&]page=(\d+)/)
    const page = pageMatch ? parseInt(pageMatch[1], 10) : 1

    return { statusCode: 200, message: 'Success', ...paginate(results, page, limit) }
}

// ─── Main URL resolver ────────────────────────────────────────────────────────

export function mockApiGet(url: string): unknown {
    // Strip base URL if present
    const path = url.replace(/^https?:\/\/[^/]+\//, '')

    if (path.startsWith('search/program/filter') || path.includes('search/program/filter')) {
        return filterPrograms(path)
    }
    if (path.startsWith('search/jobs/filter') || path.includes('search/jobs/filter')) {
        return filterJobs(path)
    }
    if (path.startsWith('discipline/sub-discipline/')) {
        const parentId = mockDisciplines.find(d => path.includes(d.uuid))?.id
        const subs = parentId ? mockDisciplines.filter(d => d.parentId === parentId) : mockDisciplines.filter(d => d.parentId !== null)
        return { statusCode: 200, message: 'Success', result: subs }
    }
    if (path === 'discipline' || path.startsWith('discipline?')) {
        return { statusCode: 200, message: 'Success', result: mockDisciplines }
    }
    if (path === 'university' || path.startsWith('university?')) {
        return { statusCode: 200, message: 'Success', result: mockUniversities }
    }
    if (path.match(/^program\/[^/]+\/supervisors/)) {
        return { statusCode: 200, message: 'Success', result: mockSupervisors }
    }
    if (path.startsWith('program/')) {
        const uuid = path.split('program/')[1]?.split('?')[0]
        const details = mockProgramDetails[uuid] ?? mockProgramDetails[PROGRAM_UUIDS[0]]
        return { statusCode: 200, message: 'Success', result: details }
    }
    if (path.startsWith('auth/my-profile') || path.startsWith('auth/refresh-access-token')) {
        return { statusCode: 200, message: 'Success', result: { ...mockProfile, ...mockUser } }
    }
    if (path.startsWith('user/existance/')) {
        return { statusCode: 400, message: 'User does not exist' }
    }
    if (path.startsWith('secure/bookmarks/program')) {
        return { statusCode: 200, message: 'Success', result: mockBookmarkedPrograms }
    }
    if (path.startsWith('secure/bookmarks/supervisor')) {
        return { statusCode: 200, message: 'Success', result: mockBookmarkedSupervisors }
    }
    if (path.startsWith('secure/bookmarks/jobs')) {
        return { statusCode: 200, message: 'Success', result: mockBookmarkedJobs }
    }
    if (path === 'secure/job/active' || path.startsWith('secure/job/active?')) {
        const active = mockJobs.filter(j => j.isActive && !j.isDraft)
        return { statusCode: 200, message: 'Success', ...paginate(active) }
    }
    if (path === 'secure/job/draft' || path.startsWith('secure/job/draft?')) {
        const draft = mockJobs.filter(j => j.isDraft)
        return { statusCode: 200, message: 'Success', ...paginate(draft) }
    }
    if (path === 'secure/job/closed' || path.startsWith('secure/job/closed?')) {
        return { statusCode: 200, message: 'Success', ...paginate([]) }
    }
    if (path.startsWith('secure/job/')) {
        // Try to match by UUID
        const segments = path.split('/')
        const uuid = segments[2]
        const job = mockJobs.find(j => j.uuid === uuid) ?? mockJobs[0]
        return { statusCode: 200, message: 'Success', result: job }
    }

    // Default fallback for supervisor group / programme data
    if (path.includes('supervisor')) {
        return { statusCode: 200, message: 'Success', result: mockSupervisors }
    }

    return { statusCode: 200, message: 'Success', result: [] }
}

export function mockApiPost(_url: string, _body: unknown): unknown {
    return { statusCode: 201, message: 'Success' }
}

export function mockApiPatch(_url: string, _body: unknown): unknown {
    return { statusCode: 200, message: 'Updated successfully' }
}

export function mockApiDelete(_url: string): unknown {
    return { statusCode: 200, message: 'Deleted successfully' }
}

// Re-export data for direct use in hooks
export {
    mockDisciplines, mockCountries, mockUniversities, mockPrograms,
    mockProgramDetails, mockSupervisors, mockJobs, mockProfile, mockUser,
    mockBookmarkedPrograms, mockBookmarkedSupervisors, mockBookmarkedJobs
}
