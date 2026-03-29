import { DisciplineT } from '../types/discipline-type'
import { ts, tsUpdated } from './shared'

export const mockDisciplines: DisciplineT[] = [
    {
        id: 1, uuid: 'disc-0001-0000-0000-000000000001',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Computer Science', slug: 'computer-science',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 2, uuid: 'disc-0002-0000-0000-000000000002',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Physics', slug: 'physics',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 3, uuid: 'disc-0003-0000-0000-000000000003',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Biology', slug: 'biology',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 4, uuid: 'disc-0004-0000-0000-000000000004',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Chemistry', slug: 'chemistry',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 5, uuid: 'disc-0005-0000-0000-000000000005',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Mathematics', slug: 'mathematics',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 6, uuid: 'disc-0006-0000-0000-000000000006',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Engineering', slug: 'engineering',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 7, uuid: 'disc-0007-0000-0000-000000000007',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Psychology', slug: 'psychology',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 8, uuid: 'disc-0008-0000-0000-000000000008',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Economics', slug: 'economics',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 9, uuid: 'disc-0009-0000-0000-000000000009',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Political Science', slug: 'political-science',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 10, uuid: 'disc-0010-0000-0000-000000000010',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Linguistics', slug: 'linguistics',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 11, uuid: 'disc-0011-0000-0000-000000000011',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Environmental Science', slug: 'environmental-science',
        parentId: null, grandParentId: null, icon: null
    },
    {
        id: 12, uuid: 'disc-0012-0000-0000-000000000012',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'History', slug: 'history',
        parentId: null, grandParentId: null, icon: null
    },
    // Sub-disciplines
    {
        id: 13, uuid: 'disc-0013-0000-0000-000000000013',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Machine Learning', slug: 'machine-learning',
        parentId: 1, grandParentId: null, icon: null
    },
    {
        id: 14, uuid: 'disc-0014-0000-0000-000000000014',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Artificial Intelligence', slug: 'artificial-intelligence',
        parentId: 1, grandParentId: null, icon: null
    },
    {
        id: 15, uuid: 'disc-0015-0000-0000-000000000015',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Biomedical Engineering', slug: 'biomedical-engineering',
        parentId: 6, grandParentId: null, icon: null
    },
    {
        id: 16, uuid: 'disc-0016-0000-0000-000000000016',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Civil Engineering', slug: 'civil-engineering',
        parentId: 6, grandParentId: null, icon: null
    },
    {
        id: 17, uuid: 'disc-0017-0000-0000-000000000017',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Neuroscience', slug: 'neuroscience',
        parentId: 3, grandParentId: null, icon: null
    },
    {
        id: 18, uuid: 'disc-0018-0000-0000-000000000018',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Bioinformatics', slug: 'bioinformatics',
        parentId: 3, grandParentId: null, icon: null
    },
    {
        id: 19, uuid: 'disc-0019-0000-0000-000000000019',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Data Science', slug: 'data-science',
        parentId: 1, grandParentId: null, icon: null
    },
    {
        id: 20, uuid: 'disc-0020-0000-0000-000000000020',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Materials Science', slug: 'materials-science',
        parentId: 6, grandParentId: null, icon: null
    }
]
