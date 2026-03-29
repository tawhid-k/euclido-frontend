// Shared mock objects reused across multiple mock data files

export const USD = {
    id: 1, uuid: 'curr-0001-0000-0000-000000000001',
    createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', deletedAt: null,
    name: 'US Dollar', code: 'USD', symbol: '$', symbolNative: '$',
    namePlural: 'US dollars', position: 'before', decimalPlaces: 2,
    thousandSeparator: ',', decimalSeparator: '.', conversionRate: 1
}

export const CAD = {
    id: 2, uuid: 'curr-0002-0000-0000-000000000002',
    createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', deletedAt: null,
    name: 'Canadian Dollar', code: 'CAD', symbol: 'CA$', symbolNative: '$',
    namePlural: 'Canadian dollars', position: 'before', decimalPlaces: 2,
    thousandSeparator: ',', decimalSeparator: '.', conversionRate: 0.74
}

export const GBP = {
    id: 3, uuid: 'curr-0003-0000-0000-000000000003',
    createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', deletedAt: null,
    name: 'British Pound', code: 'GBP', symbol: '£', symbolNative: '£',
    namePlural: 'British pounds', position: 'before', decimalPlaces: 2,
    thousandSeparator: ',', decimalSeparator: '.', conversionRate: 1.27
}

export const EUR = {
    id: 4, uuid: 'curr-0004-0000-0000-000000000004',
    createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', deletedAt: null,
    name: 'Euro', code: 'EUR', symbol: '€', symbolNative: '€',
    namePlural: 'Euros', position: 'before', decimalPlaces: 2,
    thousandSeparator: '.', decimalSeparator: ',', conversionRate: 1.08
}

export const AUD = {
    id: 5, uuid: 'curr-0005-0000-0000-000000000005',
    createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', deletedAt: null,
    name: 'Australian Dollar', code: 'AUD', symbol: 'A$', symbolNative: '$',
    namePlural: 'Australian dollars', position: 'before', decimalPlaces: 2,
    thousandSeparator: ',', decimalSeparator: '.', conversionRate: 0.65
}

export const ts = '2024-01-15T08:00:00.000Z'
export const tsUpdated = '2024-06-01T08:00:00.000Z'
