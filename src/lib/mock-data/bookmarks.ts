import { BookmarkedProgramT } from '../types/bookmarked-program-type'
import { BookmarkedJobType } from '../types/jobs/job-list'
import { ts, tsUpdated } from './shared'
import { mockPrograms } from './programs'
import { mockSupervisors } from './supervisors'
import { mockJobs } from './jobs'

// ─── Bookmarked Programs ────────────────────────────────────────────────────

function makeBookmarkedProgram(id: number, userId: number, programIdx: number): BookmarkedProgramT {
    const prog = mockPrograms[programIdx]
    return {
        programId: prog.id, userId, id,
        uuid: `bkp-${String(id).padStart(4, '0')}`,
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        program: {
            ...prog,
            deletedAt: null,
            isBookmarked: true,
            university: { ...prog.university, deletedAt: null, livingCost: { ...prog.university.livingCost, deletedAt: null } } as any
        }
    }
}

export const mockBookmarkedPrograms: BookmarkedProgramT[] = [
    makeBookmarkedProgram(1, 1, 1),  // ML MSc · Stanford
    makeBookmarkedProgram(2, 1, 0),  // CS PhD · MIT
    makeBookmarkedProgram(3, 1, 6),  // Data Science MSc · Edinburgh
    makeBookmarkedProgram(4, 1, 10), // AI PhD · NUS
]

// ─── Bookmarked Supervisors ──────────────────────────────────────────────────

export const mockBookmarkedSupervisors = [
    { ...mockSupervisors[0], isBookmarked: true },
    { ...mockSupervisors[2], isBookmarked: true },
    { ...mockSupervisors[10], isBookmarked: true },
].map((sup, i) => ({
    supervisorId: sup.supervisorId,
    userId: 1,
    id: i + 1,
    uuid: `bks-${String(i + 1).padStart(4, '0')}`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    supervisor: sup.supervisor,
    isBookmarked: true
}))

// ─── Bookmarked Jobs ─────────────────────────────────────────────────────────

function makeBookmarkedJob(id: number, userId: number, jobIdx: number): BookmarkedJobType {
    const job = mockJobs[jobIdx]
    return {
        jobId: job.id, userId, id,
        uuid: `bkj-${String(id).padStart(4, '0')}`,
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        job: {
            id: job.id, uuid: job.uuid, createdAt: job.createdAt, updatedAt: job.updatedAt, deletedAt: job.deletedAt,
            jobTitle: job.jobTitle, slug: job.slug, position: job.position,
            jobDescription: job.jobDescription, applicationRequirement: job.applicationRequirement,
            universityId: job.universityId, disciplineId: job.disciplineId, subDisciplineId: job.subDisciplineId,
            minimumQualification: job.minimumQualification, jobType: job.jobType, jobMode: job.jobMode,
            applicationDeadlineTimestamp: job.applicationDeadlineTimestamp,
            startDateTimestamp: job.startDateTimestamp, duration: job.duration,
            keywords: job.keywords, emailNotification: job.emailNotification,
            sentApplicationToEmail: job.sentApplicationToEmail,
            isActive: job.isActive, recruiterId: job.recruiterId, isDraft: job.isDraft
        }
    }
}

export const mockBookmarkedJobs: BookmarkedJobType[] = [
    makeBookmarkedJob(1, 1, 0),  // ML Postdoc · MIT
    makeBookmarkedJob(2, 1, 1),  // PhD Quantum · ETH
    makeBookmarkedJob(3, 1, 4),  // NLP Researcher · NUS
]
