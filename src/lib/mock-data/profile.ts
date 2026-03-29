import { ProfileT } from '../types/user-profile-type'
import { ts, tsUpdated } from './shared'

// Mock user for Redux auth state
export const mockUser = {
    uuid: 'user-0001-0000-0000-000000000001',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex@euclido.com',
    userType: 'student' as const,
    avatarPath: '/prof.png',
}

// Full profile for profile pages
export const mockProfile: ProfileT = {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex@euclido.com',
    password: '',
    userType: 'student',
    authProvider: 'google',
    avatarPath: '/prof.png',
    id: 1,
    uuid: 'user-0001-0000-0000-000000000001',
    isEmailVerified: true,
    role: {
        name: 'Student',
        isDefault: true,
        id: 1,
        slug: 'student',
        permissions: []
    },
    studentDetails: {
        id: 1,
        uuid: 'std-0001-0000-0000-000000000001',
        createdAt: ts,
        updatedAt: tsUpdated,
        deletedAt: null,
        userId: 1,
        country: 'US',
        countryName: 'United States',
        stateName: 'California',
        state: 'CA'
    },
    disciplines: [
        {
            disciplineId: 1,
            studentId: 1,
            id: 1,
            uuid: 'stddisc-0001',
            createdAt: ts,
            updatedAt: tsUpdated,
            deletedAt: null,
            discipline: {
                id: 1, uuid: 'disc-0001-0000-0000-000000000001',
                name: 'Computer Science', slug: 'computer-science',
                parentId: null, grandParentId: null, icon: null,
                createdAt: ts, updatedAt: tsUpdated, deletedAt: null
            }
        },
        {
            disciplineId: 5,
            studentId: 1,
            id: 2,
            uuid: 'stddisc-0002',
            createdAt: ts,
            updatedAt: tsUpdated,
            deletedAt: null,
            discipline: {
                id: 5, uuid: 'disc-0005-0000-0000-000000000005',
                name: 'Mathematics', slug: 'mathematics',
                parentId: null, grandParentId: null, icon: null,
                createdAt: ts, updatedAt: tsUpdated, deletedAt: null
            }
        }
    ],
    areaOfInterests: [
        {
            areaOfInterestId: 13,
            studentId: 1,
            id: 1,
            uuid: 'stdaoi-0001',
            createdAt: ts,
            updatedAt: tsUpdated,
            deletedAt: null,
            areaOfInterest: {
                id: 13, uuid: 'disc-0013-0000-0000-000000000013',
                name: 'Machine Learning', slug: 'machine-learning',
                parentId: 1, grandParentId: null, icon: null,
                createdAt: ts, updatedAt: tsUpdated, deletedAt: null
            }
        }
    ],
    researchInterests: [
        {
            researchInterestId: 14,
            studentId: 1,
            id: 1,
            uuid: 'stdri-0001',
            createdAt: ts,
            updatedAt: tsUpdated,
            deletedAt: null,
            researchInterest: {
                id: 14, uuid: 'disc-0014-0000-0000-000000000014',
                name: 'Artificial Intelligence', slug: 'artificial-intelligence',
                parentId: 1, grandParentId: null, icon: null,
                createdAt: ts, updatedAt: tsUpdated, deletedAt: null
            }
        },
        {
            researchInterestId: 19,
            studentId: 1,
            id: 2,
            uuid: 'stdri-0002',
            createdAt: ts,
            updatedAt: tsUpdated,
            deletedAt: null,
            researchInterest: {
                id: 19, uuid: 'disc-0019-0000-0000-000000000019',
                name: 'Data Science', slug: 'data-science',
                parentId: 1, grandParentId: null, icon: null,
                createdAt: ts, updatedAt: tsUpdated, deletedAt: null
            }
        }
    ]
}
