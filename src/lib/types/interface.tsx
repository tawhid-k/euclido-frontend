export interface TuitionFee {
    minRange: number
    maxRange: number
    isReset: boolean
}

export interface UniversityRank {
    minRank: number
    maxRank: number
    isReset: boolean
}

export interface DegreeType {
    id: number
    selected: boolean
    name: string
}

export interface Eligibility {
    cgpa: string
    isCgpaSelected: boolean
    gre: string
    isGreSelected: boolean
    ielts: string
    isIeltsSelected: boolean
    toefl: string
    isToeflSelected: boolean
}
