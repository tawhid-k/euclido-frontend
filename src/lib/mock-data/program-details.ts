import { ProgramDetailsT } from '../types/program-details-type'
import { USD, CAD, GBP, EUR, AUD, ts, tsUpdated } from './shared'
import { mockPrograms, PROGRAM_UUIDS } from './programs'

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeGpa(id: number, point: number, letter: string, pct: number, div: string, minPoint: number, minPct: number) {
    return { id, uuid: `gpa-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, gpaPoint: point, gpaLetter: letter, gpaPercentage: pct, division: div, minimumGpaPoint: minPoint, minimumGpaPercentage: minPct }
}
function makeTest(id: number, req: string) {
    return { id, uuid: `test-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, requirement: req }
}
function makeIelts(id: number, overall: number) {
    return { id, uuid: `ielts-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, overall, listening: 6.5, reading: 6.5, writing: 6.5, speaking: 6.5 }
}
function makeToefl(id: number, overall: number) {
    return { id, uuid: `toefl-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, overall, listening: null, reading: null, writing: null, speaking: null }
}
function makeAdmission(id: number, progId: number, gpaPoint: number, gpaLetter: string, gpaPct: number, greReq: string, ieltsOverall: number, toeflOverall: number) {
    const gpa = makeGpa(id, gpaPoint, gpaLetter, gpaPct, 'First Class', gpaPoint - 0.3, gpaPct - 10)
    const gmat = makeTest(id, 'Not Required')
    const gre = makeTest(id, greReq)
    const ielts = makeIelts(id, ieltsOverall)
    const toefl = makeToefl(id, toeflOverall)
    return { id, uuid: `adm-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, programId: progId, programGpaRequirementId: id, programGmatRequirementId: id, programGreRequirementId: id, programIeltsRequirementId: id, programToeflRequirementId: id, programGpaRequirement: gpa, programGmatRequirement: gmat, programGreRequirement: gre, programIeltsRequirement: ielts, programToeflRequirement: toefl }
}
function makeFunding(id: number, progId: number, min: number, avg: number, currencyId: number, currency: typeof USD) {
    return { id, uuid: `fund-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, programId: progId, minimumDepartmentalFunding: min, averageDepartmentalFunding: avg, currencyId, currency }
}
function makeIntake(id: number, programId: number, month: string, commitment: string, intake: string, slug: string) {
    return { id, uuid: `intake-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, programId, month, commitment, intake, slug }
}
function makeDeadline(id: number, programId: number, name: string, slug: string, category: string, commitment: string, deadlineTs: string, intakeId: number, intake: ReturnType<typeof makeIntake>) {
    return { id, uuid: `deadl-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, programId, deadlineName: name, slug, category, commitment, deadlineTimestamp: deadlineTs, programIntakeId: intakeId, programIntake: intake }
}
function makeTfd(id: number, programId: number, commitment: string, category: string, mode: string, fee: number, currencyId: number, feeInUsd: number, perYear: boolean, currency: typeof USD) {
    return { id, uuid: `tfd-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, programId, commitment, category, deliveryMode: mode, tuitionFee: fee, currencyId, tuitionFeeInUsd: feeInUsd, perYear, currency }
}
function makeDur(id: number, programId: number, duration: number, commitment: string) {
    return { id, uuid: `dur-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null, programId, duration, commitment }
}
function uniForDetails(idx: number) {
    const prog = mockPrograms[idx]
    return {
        ...prog.university,
        deletedAt: null,
        livingCost: { ...prog.university.livingCost, flag: '', deletedAt: null },
        universityDetails: null
    } as any
}

// Sept / Oct / Aug / Mar intake shorthand
function septI(progId: number, id: number) { return makeIntake(id, progId, 'September', 'full-time', 'Fall 2025', 'fall-2025') }
function octI(progId: number, id: number) { return makeIntake(id, progId, 'October', 'full-time', 'Michaelmas 2025', 'michaelmas-2025') }
function augI(progId: number, id: number) { return makeIntake(id, progId, 'August', 'full-time', 'Fall 2025', 'fall-2025') }
function marI(progId: number, id: number) { return makeIntake(id, progId, 'March', 'full-time', 'Autumn 2026', 'autumn-2026') }
function janI(progId: number, id: number) { return makeIntake(id, progId, 'January', 'full-time', 'Winter 2026', 'winter-2026') }

function septD(id: number, progId: number, intake: ReturnType<typeof makeIntake>) {
    return makeDeadline(id, progId, 'Fall 2025 Deadline', 'fall-2025', 'international', 'full-time', '2024-12-15', intake.id, intake)
}

// ─── Definitions ─────────────────────────────────────────────────────────────

const d: Record<string, ProgramDetailsT> = {}

// 1 — CS PhD · MIT
const i1 = septI(1, 1)
d[PROGRAM_UUIDS[0]] = {
    name: mockPrograms[0].name, degreeLevel: 'PhD',
    type: mockPrograms[0].types as any, commitment: mockPrograms[0].commitments as any,
    duration: [makeDur(1, 1, 5, 'full-time')],
    totalCredit: 0, url: mockPrograms[0].programUrl,
    applicationDeadline: '2024-12-15', programIntake: null,
    applicationFee: 75, applicationFeeCurrency: 'USD',
    overview: mockPrograms[0].overview,
    university: uniForDetails(0),
    tuitionFee: { tuitionFee: 0, currency: 'USD' },
    tuitionFeesDetails: [makeTfd(1, 1, 'full-time', 'international', 'on-campus', 0, 1, 0, true, USD)],
    addmissionRequirements: makeAdmission(1, 1, 4.0, 'A+', 95, 'Recommended', 7.0, 100),
    funding: makeFunding(1, 1, 30000, 42000, 1, USD),
    department: mockPrograms[0].department as any, school: mockPrograms[0].school as any, faculty: mockPrograms[0].faculty as any,
    closestDeadline: septD(1, 1, i1), closestIntake: 'September 2025',
    deadlines: [septD(1, 1, i1)], intakes: [i1], isBookmarked: false
}

// 2 — ML MSc · Stanford
const i2 = septI(2, 2)
d[PROGRAM_UUIDS[1]] = {
    name: mockPrograms[1].name, degreeLevel: 'Masters',
    type: mockPrograms[1].types as any, commitment: mockPrograms[1].commitments as any,
    duration: [makeDur(2, 2, 2, 'full-time'), makeDur(3, 2, 3, 'part-time')],
    totalCredit: 45, url: mockPrograms[1].programUrl,
    applicationDeadline: '2024-12-01', programIntake: null,
    applicationFee: 125, applicationFeeCurrency: 'USD',
    overview: mockPrograms[1].overview,
    university: uniForDetails(1),
    tuitionFee: { tuitionFee: 62556, currency: 'USD' },
    tuitionFeesDetails: [makeTfd(4, 2, 'full-time', 'international', 'on-campus', 62556, 1, 62556, true, USD)],
    addmissionRequirements: makeAdmission(2, 2, 3.8, 'A', 90, 'Required: 320+', 7.0, 100),
    funding: makeFunding(2, 2, 0, 0, 1, USD),
    department: mockPrograms[1].department as any, school: mockPrograms[1].school as any, faculty: mockPrograms[1].faculty as any,
    closestDeadline: septD(2, 2, i2), closestIntake: 'September 2025',
    deadlines: [septD(2, 2, i2)], intakes: [i2], isBookmarked: true
}

// 3 — Physics DPhil · Oxford
const i3 = octI(3, 3)
const d3 = makeDeadline(3, 3, 'January Deadline', 'jan', 'international', 'full-time', '2025-01-10', i3.id, i3)
d[PROGRAM_UUIDS[2]] = {
    name: mockPrograms[2].name, degreeLevel: 'PhD',
    type: mockPrograms[2].types as any, commitment: mockPrograms[2].commitments as any,
    duration: [makeDur(5, 3, 4, 'full-time')],
    totalCredit: 0, url: mockPrograms[2].programUrl,
    applicationDeadline: '2025-01-10', programIntake: null,
    applicationFee: 95, applicationFeeCurrency: 'GBP',
    overview: mockPrograms[2].overview,
    university: uniForDetails(2),
    tuitionFee: { tuitionFee: 37730, currency: 'USD' },
    tuitionFeesDetails: [makeTfd(6, 3, 'full-time', 'international', 'on-campus', 29700, 3, 37730, true, GBP)],
    addmissionRequirements: makeAdmission(3, 3, 3.7, 'A', 88, 'Optional', 7.5, 110),
    funding: makeFunding(3, 3, 15000, 20000, 3, GBP),
    department: mockPrograms[2].department as any, school: mockPrograms[2].school as any, faculty: mockPrograms[2].faculty as any,
    closestDeadline: d3, closestIntake: 'October 2025',
    deadlines: [d3], intakes: [i3], isBookmarked: false
}

// 4 — Biomedical Eng MSc · Toronto
const i4 = septI(4, 4)
d[PROGRAM_UUIDS[3]] = {
    name: mockPrograms[3].name, degreeLevel: 'Masters',
    type: mockPrograms[3].types as any, commitment: mockPrograms[3].commitments as any,
    duration: [makeDur(7, 4, 2, 'full-time')],
    totalCredit: 0, url: mockPrograms[3].programUrl,
    applicationDeadline: '2024-12-15', programIntake: null,
    applicationFee: 93, applicationFeeCurrency: 'CAD',
    overview: mockPrograms[3].overview,
    university: uniForDetails(3),
    tuitionFee: { tuitionFee: 16066, currency: 'USD' },
    tuitionFeesDetails: [makeTfd(8, 4, 'full-time', 'international', 'on-campus', 21710, 2, 16066, true, CAD)],
    addmissionRequirements: makeAdmission(4, 4, 3.5, 'A', 80, 'Optional', 7.0, 100),
    funding: makeFunding(4, 4, 18000, 22000, 2, CAD),
    department: mockPrograms[3].department as any, school: mockPrograms[3].school as any, faculty: mockPrograms[3].faculty as any,
    closestDeadline: septD(4, 4, i4), closestIntake: 'September 2025',
    deadlines: [septD(4, 4, i4)], intakes: [i4], isBookmarked: false
}

// 5 — Chemistry PhD · ETH Zurich
const i5 = septI(5, 5)
d[PROGRAM_UUIDS[4]] = {
    name: mockPrograms[4].name, degreeLevel: 'PhD',
    type: mockPrograms[4].types as any, commitment: mockPrograms[4].commitments as any,
    duration: [makeDur(9, 5, 4, 'full-time')],
    totalCredit: 0, url: mockPrograms[4].programUrl,
    applicationDeadline: 'Rolling', programIntake: null,
    applicationFee: 0, applicationFeeCurrency: 'EUR',
    overview: mockPrograms[4].overview,
    university: uniForDetails(4),
    tuitionFee: { tuitionFee: 1512, currency: 'USD' },
    tuitionFeesDetails: [makeTfd(10, 5, 'full-time', 'international', 'on-campus', 1400, 4, 1512, true, EUR)],
    addmissionRequirements: makeAdmission(5, 5, 3.8, 'A', 90, 'Not Required', 7.0, 100),
    funding: makeFunding(5, 5, 27000, 34000, 4, EUR),
    department: mockPrograms[4].department as any, school: mockPrograms[4].school as any, faculty: mockPrograms[4].faculty as any,
    closestDeadline: septD(5, 5, i5), closestIntake: 'September 2025',
    deadlines: [septD(5, 5, i5)], intakes: [i5], isBookmarked: false
}

// 6 — Economics MPhil · Oxford
const i6 = octI(6, 6)
const d6 = makeDeadline(6, 6, 'January Deadline', 'jan', 'international', 'full-time', '2025-01-10', i6.id, i6)
d[PROGRAM_UUIDS[5]] = {
    name: mockPrograms[5].name, degreeLevel: 'Masters',
    type: mockPrograms[5].types as any, commitment: mockPrograms[5].commitments as any,
    duration: [makeDur(11, 6, 2, 'full-time')],
    totalCredit: 0, url: mockPrograms[5].programUrl,
    applicationDeadline: '2025-01-10', programIntake: null,
    applicationFee: 95, applicationFeeCurrency: 'GBP',
    overview: mockPrograms[5].overview,
    university: uniForDetails(2),
    tuitionFee: { tuitionFee: 35135, currency: 'USD' },
    tuitionFeesDetails: [makeTfd(12, 6, 'full-time', 'international', 'on-campus', 27650, 3, 35135, true, GBP)],
    addmissionRequirements: makeAdmission(6, 6, 3.8, 'A', 90, 'Not Required', 7.5, 110),
    funding: makeFunding(6, 6, 0, 0, 3, GBP),
    department: mockPrograms[5].department as any, school: mockPrograms[5].school as any, faculty: mockPrograms[5].faculty as any,
    closestDeadline: d6, closestIntake: 'October 2025',
    deadlines: [d6], intakes: [i6], isBookmarked: false
}

// 7 — Data Science MSc · Edinburgh
const i7 = septI(7, 7)
d[PROGRAM_UUIDS[6]] = {
    name: mockPrograms[6].name, degreeLevel: 'Masters',
    type: mockPrograms[6].types as any, commitment: mockPrograms[6].commitments as any,
    duration: [makeDur(13, 7, 1, 'full-time'), makeDur(14, 7, 2, 'part-time')],
    totalCredit: 180, url: mockPrograms[6].programUrl,
    applicationDeadline: '2025-03-15', programIntake: null,
    applicationFee: 0, applicationFeeCurrency: 'GBP',
    overview: mockPrograms[6].overview,
    university: uniForDetails(9),
    tuitionFee: { tuitionFee: 35941, currency: 'USD' },
    tuitionFeesDetails: [
        makeTfd(15, 7, 'full-time', 'international', 'on-campus', 28300, 3, 35941, true, GBP),
        makeTfd(16, 7, 'part-time', 'international', 'online', 14150, 3, 17970, true, GBP)
    ],
    addmissionRequirements: makeAdmission(7, 7, 3.5, 'A', 80, 'Not Required', 6.5, 92),
    funding: makeFunding(7, 7, 0, 0, 3, GBP),
    department: mockPrograms[6].department as any, school: mockPrograms[6].school as any, faculty: mockPrograms[6].faculty as any,
    closestDeadline: septD(7, 7, i7), closestIntake: 'September 2025',
    deadlines: [septD(7, 7, i7)], intakes: [i7], isBookmarked: false
}

// 8 — Psychology PhD · Melbourne
const i8 = marI(8, 8)
const d8 = makeDeadline(8, 8, 'March Intake Deadline', 'march', 'international', 'full-time', '2026-01-15', i8.id, i8)
d[PROGRAM_UUIDS[7]] = {
    name: mockPrograms[7].name, degreeLevel: 'PhD',
    type: mockPrograms[7].types as any, commitment: mockPrograms[7].commitments as any,
    duration: [makeDur(17, 8, 4, 'full-time'), makeDur(18, 8, 8, 'part-time')],
    totalCredit: 0, url: mockPrograms[7].programUrl,
    applicationDeadline: 'Rolling', programIntake: null,
    applicationFee: 65, applicationFeeCurrency: 'AUD',
    overview: mockPrograms[7].overview,
    university: uniForDetails(6),
    tuitionFee: { tuitionFee: 30347, currency: 'USD' },
    tuitionFeesDetails: [makeTfd(19, 8, 'full-time', 'international', 'on-campus', 46688, 5, 30347, true, AUD)],
    addmissionRequirements: makeAdmission(8, 8, 3.3, 'B+', 75, 'Not Required', 6.5, 79),
    funding: makeFunding(8, 8, 0, 0, 5, AUD),
    department: mockPrograms[7].department as any, school: mockPrograms[7].school as any, faculty: mockPrograms[7].faculty as any,
    closestDeadline: d8, closestIntake: 'March 2026',
    deadlines: [d8], intakes: [i8], isBookmarked: false
}

// 9 — Biology MSc · McGill
const i9 = septI(9, 9)
d[PROGRAM_UUIDS[8]] = {
    name: mockPrograms[8].name, degreeLevel: 'Masters',
    type: mockPrograms[8].types as any, commitment: mockPrograms[8].commitments as any,
    duration: [makeDur(20, 9, 2, 'full-time')],
    totalCredit: 45, url: mockPrograms[8].programUrl,
    applicationDeadline: '2025-01-10', programIntake: null,
    applicationFee: 87, applicationFeeCurrency: 'CAD',
    overview: mockPrograms[8].overview,
    university: uniForDetails(8),
    tuitionFee: { tuitionFee: 12908, currency: 'USD' },
    tuitionFeesDetails: [makeTfd(21, 9, 'full-time', 'international', 'on-campus', 17440, 2, 12908, true, CAD)],
    addmissionRequirements: makeAdmission(9, 9, 3.3, 'B+', 75, 'Optional', 6.5, 86),
    funding: makeFunding(9, 9, 15000, 18000, 2, CAD),
    department: mockPrograms[8].department as any, school: mockPrograms[8].school as any, faculty: mockPrograms[8].faculty as any,
    closestDeadline: septD(9, 9, i9), closestIntake: 'September 2025',
    deadlines: [septD(9, 9, i9)], intakes: [i9], isBookmarked: false
}

// 10 — Civil Eng MEng · McGill
const i10 = janI(10, 10)
const d10 = makeDeadline(10, 10, 'Fall Deadline', 'fall', 'international', 'full-time', '2025-03-01', i10.id, i10)
d[PROGRAM_UUIDS[9]] = {
    name: mockPrograms[9].name, degreeLevel: 'Masters',
    type: mockPrograms[9].types as any, commitment: mockPrograms[9].commitments as any,
    duration: [makeDur(22, 10, 1, 'full-time'), makeDur(23, 10, 2, 'part-time')],
    totalCredit: 45, url: mockPrograms[9].programUrl,
    applicationDeadline: '2025-03-01', programIntake: null,
    applicationFee: 87, applicationFeeCurrency: 'CAD',
    overview: mockPrograms[9].overview,
    university: uniForDetails(8),
    tuitionFee: { tuitionFee: 12908, currency: 'USD' },
    tuitionFeesDetails: [
        makeTfd(24, 10, 'full-time', 'international', 'on-campus', 17440, 2, 12908, true, CAD),
        makeTfd(25, 10, 'part-time', 'international', 'online', 8720, 2, 6454, true, CAD)
    ],
    addmissionRequirements: makeAdmission(10, 10, 3.0, 'B', 70, 'Not Required', 6.5, 86),
    funding: makeFunding(10, 10, 0, 0, 2, CAD),
    department: mockPrograms[9].department as any, school: mockPrograms[9].school as any, faculty: mockPrograms[9].faculty as any,
    closestDeadline: d10, closestIntake: 'January 2026',
    deadlines: [d10], intakes: [i10], isBookmarked: false
}

// 11–20: build remaining entries similarly
const remaining: Array<{ idx: number; currency: typeof USD; feeInUsd: number; rawFee: number; currId: number; gpa: number; gre: string; ielts: number; toefl: number; funding: [number, number]; dur: number; intake: () => ReturnType<typeof makeIntake> }> = [
    { idx: 10, currency: USD, feeInUsd: 17500, rawFee: 17500, currId: 1, gpa: 3.7, gre: 'Required: 315+', ielts: 6.5, toefl: 92, funding: [18000, 24000], dur: 4, intake: () => augI(11, 11) },
    { idx: 11, currency: GBP, feeInUsd: 34036, rawFee: 26800, currId: 3, gpa: 3.3, gre: 'Not Required', ielts: 6.5, toefl: 92, funding: [0, 0], dur: 1, intake: () => septI(12, 12) },
    { idx: 12, currency: GBP, feeInUsd: 37730, rawFee: 29700, currId: 3, gpa: 3.7, gre: 'Not Required', ielts: 7.5, toefl: 110, funding: [0, 0], dur: 4, intake: () => octI(13, 13) },
    { idx: 13, currency: CAD, feeInUsd: 16066, rawFee: 21710, currId: 2, gpa: 3.7, gre: 'Recommended', ielts: 6.5, toefl: 86, funding: [18000, 22000], dur: 2, intake: () => septI(14, 14) },
    { idx: 14, currency: GBP, feeInUsd: 33655, rawFee: 26500, currId: 3, gpa: 3.5, gre: 'Optional', ielts: 6.5, toefl: 92, funding: [15000, 18000], dur: 4, intake: () => septI(15, 15) },
    { idx: 15, currency: EUR, feeInUsd: 0, rawFee: 0, currId: 4, gpa: 3.0, gre: 'Not Required', ielts: 6.5, toefl: 86, funding: [0, 0], dur: 2, intake: () => octI(16, 16) },
    { idx: 16, currency: USD, feeInUsd: 62556, rawFee: 62556, currId: 1, gpa: 3.5, gre: 'Not Required', ielts: 7.0, toefl: 100, funding: [0, 0], dur: 1, intake: () => septI(17, 17) },
    { idx: 17, currency: USD, feeInUsd: 17500, rawFee: 17500, currId: 1, gpa: 3.5, gre: 'Required: 315+', ielts: 6.5, toefl: 92, funding: [18000, 24000], dur: 4, intake: () => augI(18, 18) },
    { idx: 18, currency: AUD, feeInUsd: 30347, rawFee: 46688, currId: 5, gpa: 3.5, gre: 'Not Required', ielts: 6.5, toefl: 79, funding: [0, 0], dur: 4, intake: () => marI(19, 19) },
    { idx: 19, currency: USD, feeInUsd: 0, rawFee: 0, currId: 1, gpa: 4.0, gre: 'Optional', ielts: 7.0, toefl: 100, funding: [30000, 42000], dur: 5, intake: () => septI(20, 20) },
]

remaining.forEach(({ idx, currency, feeInUsd, rawFee, currId, gpa, gre, ielts, toefl, funding, dur, intake }) => {
    const prog = mockPrograms[idx]
    const pid = prog.id
    const uuidKey = PROGRAM_UUIDS[idx]
    const intakeObj = intake()
    const deadlineObj = septD(pid, pid, intakeObj)

    const uniIdxMap: Record<number, number> = { 8: 7, 9: 9, 10: 9, 11: 9, 12: 2, 13: 3, 14: 9, 15: 4, 16: 1, 17: 7, 18: 6, 19: 0 }
    const uniIdx2 = uniIdxMap[idx] ?? (idx % 10)

    d[uuidKey] = {
        name: prog.name, degreeLevel: prog.degreeLevel,
        type: prog.types as any, commitment: prog.commitments as any,
        duration: [makeDur(50 + idx, pid, dur, 'full-time')],
        totalCredit: prog.totalCredit, url: prog.programUrl,
        applicationDeadline: '2024-12-15', programIntake: null,
        applicationFee: prog.applicationFees[0]?.applicationFeeInUsd ?? 0,
        applicationFeeCurrency: currency.code,
        overview: prog.overview,
        university: uniForDetails(uniIdx2),
        tuitionFee: { tuitionFee: feeInUsd, currency: currency.code },
        tuitionFeesDetails: [makeTfd(50 + idx, pid, 'full-time', 'international', 'on-campus', rawFee, currId, feeInUsd, true, currency)],
        addmissionRequirements: makeAdmission(pid, pid, gpa, gpa >= 3.7 ? 'A' : gpa >= 3.5 ? 'A-' : 'B+', Math.round(gpa * 23), gre, ielts, toefl),
        funding: makeFunding(pid, pid, funding[0], funding[1], currId, currency),
        department: prog.department as any, school: prog.school as any, faculty: prog.faculty as any,
        closestDeadline: deadlineObj, closestIntake: intakeObj.intake,
        deadlines: [deadlineObj], intakes: [intakeObj], isBookmarked: false
    }
})

export const mockProgramDetails: Record<string, ProgramDetailsT> = d
