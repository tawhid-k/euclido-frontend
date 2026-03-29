import { ts, tsUpdated } from './shared'

const makeLivingCost = (id: number, countryCode: string, country: string, state: string, stateCode: string, city: string, cost: number) => ({
    id, uuid: `lc-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    countryCode, country, flag: '', stateCode, state, city, livingCost: cost
})

export const mockUniversities = [
    {
        id: 1, uuid: 'uni-0001-0000-0000-000000000001',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Massachusetts Institute of Technology', slug: 'mit',
        websiteUrl: 'https://www.mit.edu',
        qsScore: 100, ranking: 1, acceptanceRate: 4,
        countryCode: 'US', stateCode: 'MA', city: 'Cambridge',
        logo: 'alberta.png',
        livingCostId: 1,
        livingCost: makeLivingCost(1, 'US', 'United States', 'Massachusetts', 'MA', 'Cambridge', 3200)
    },
    {
        id: 2, uuid: 'uni-0002-0000-0000-000000000002',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Stanford University', slug: 'stanford',
        websiteUrl: 'https://www.stanford.edu',
        qsScore: 98, ranking: 2, acceptanceRate: 4,
        countryCode: 'US', stateCode: 'CA', city: 'Stanford',
        logo: 'alberta.png',
        livingCostId: 2,
        livingCost: makeLivingCost(2, 'US', 'United States', 'California', 'CA', 'Stanford', 3500)
    },
    {
        id: 3, uuid: 'uni-0003-0000-0000-000000000003',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'University of Oxford', slug: 'oxford',
        websiteUrl: 'https://www.ox.ac.uk',
        qsScore: 97, ranking: 3, acceptanceRate: 17,
        countryCode: 'GB', stateCode: '', city: 'Oxford',
        logo: 'alberta.png',
        livingCostId: 3,
        livingCost: makeLivingCost(3, 'GB', 'United Kingdom', 'England', 'ENG', 'Oxford', 2100)
    },
    {
        id: 4, uuid: 'uni-0004-0000-0000-000000000004',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'University of Toronto', slug: 'utoronto',
        websiteUrl: 'https://www.utoronto.ca',
        qsScore: 91, ranking: 21, acceptanceRate: 43,
        countryCode: 'CA', stateCode: 'ON', city: 'Toronto',
        logo: 'alberta.png',
        livingCostId: 4,
        livingCost: makeLivingCost(4, 'CA', 'Canada', 'Ontario', 'ON', 'Toronto', 2400)
    },
    {
        id: 5, uuid: 'uni-0005-0000-0000-000000000005',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'ETH Zurich', slug: 'eth-zurich',
        websiteUrl: 'https://ethz.ch',
        qsScore: 95, ranking: 7, acceptanceRate: 27,
        countryCode: 'CH', stateCode: '', city: 'Zurich',
        logo: 'alberta.png',
        livingCostId: 5,
        livingCost: makeLivingCost(5, 'CH', 'Switzerland', 'Zurich', 'ZH', 'Zurich', 2800)
    },
    {
        id: 6, uuid: 'uni-0006-0000-0000-000000000006',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'Technical University of Munich', slug: 'tum',
        websiteUrl: 'https://www.tum.de',
        qsScore: 89, ranking: 37, acceptanceRate: 8,
        countryCode: 'DE', stateCode: '', city: 'Munich',
        logo: 'alberta.png',
        livingCostId: 6,
        livingCost: makeLivingCost(6, 'DE', 'Germany', 'Bavaria', 'BY', 'Munich', 1800)
    },
    {
        id: 7, uuid: 'uni-0007-0000-0000-000000000007',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'University of Melbourne', slug: 'unimelb',
        websiteUrl: 'https://www.unimelb.edu.au',
        qsScore: 87, ranking: 33, acceptanceRate: 70,
        countryCode: 'AU', stateCode: 'VIC', city: 'Melbourne',
        logo: 'alberta.png',
        livingCostId: 7,
        livingCost: makeLivingCost(7, 'AU', 'Australia', 'Victoria', 'VIC', 'Melbourne', 2000)
    },
    {
        id: 8, uuid: 'uni-0008-0000-0000-000000000008',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'National University of Singapore', slug: 'nus',
        websiteUrl: 'https://www.nus.edu.sg',
        qsScore: 94, ranking: 8, acceptanceRate: 5,
        countryCode: 'SG', stateCode: '', city: 'Singapore',
        logo: 'alberta.png',
        livingCostId: 8,
        livingCost: makeLivingCost(8, 'SG', 'Singapore', '', '', 'Singapore', 2200)
    },
    {
        id: 9, uuid: 'uni-0009-0000-0000-000000000009',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'McGill University', slug: 'mcgill',
        websiteUrl: 'https://www.mcgill.ca',
        qsScore: 84, ranking: 46, acceptanceRate: 46,
        countryCode: 'CA', stateCode: 'QC', city: 'Montreal',
        logo: 'alberta.png',
        livingCostId: 9,
        livingCost: makeLivingCost(9, 'CA', 'Canada', 'Quebec', 'QC', 'Montreal', 1900)
    },
    {
        id: 10, uuid: 'uni-0010-0000-0000-000000000010',
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'University of Edinburgh', slug: 'edinburgh',
        websiteUrl: 'https://www.ed.ac.uk',
        qsScore: 82, ranking: 22, acceptanceRate: 52,
        countryCode: 'GB', stateCode: '', city: 'Edinburgh',
        logo: 'alberta.png',
        livingCostId: 10,
        livingCost: makeLivingCost(10, 'GB', 'United Kingdom', 'Scotland', 'SCT', 'Edinburgh', 1700)
    }
]
