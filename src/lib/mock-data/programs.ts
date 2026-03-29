import { ProgramT } from '../types/program-type'
import { USD, CAD, GBP, EUR, AUD, ts, tsUpdated } from './shared'
import { mockUniversities } from './universities'
import { mockDisciplines } from './disciplines'

// ─── Helpers ────────────────────────────────────────────────────────────────

const dept = (id: number, uniId: number, name: string, slug: string) => ({
    id, uuid: `dept-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    universityId: uniId, name, slug
})

const supervisorGroup = (id: number, uniId: number, name: string, slug: string) => ({
    id, uuid: `sgrp-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    universityId: uniId, name, slug
})

const deadline = (id: number, programId: number, name: string, slug: string, category: string, commitment: string, timestamp: string, intakeId: number) => ({
    id, uuid: `ddl-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    programId, deadlineName: name, slug, category, commitment,
    deadlineTimestamp: timestamp, programIntakeId: intakeId
})

const appFee = (id: number, programId: number, category: string, fee: number, currencyId: number, feeInUsd: number, currency: typeof USD) => ({
    id, uuid: `appfee-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    programId, category, applicationFee: fee, currencyId, applicationFeeInUsd: feeInUsd, currency
})

const pType = (id: number, programId: number, type: string) => ({
    id, uuid: `ptype-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    programId, type
})

const commitment = (id: number, programId: number, value: string) => ({
    id, uuid: `comm-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    programId, commitment: value
})

const tuitionFee = (id: number, programId: number, comm: string, category: string, mode: string, fee: number, currencyId: number, feeInUsd: number, perYear: boolean, currency: typeof USD) => ({
    id, uuid: `tfee-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    programId, commitment: comm, category, deliveryMode: mode,
    tuitionFee: fee, currencyId, tuitionFeeInUsd: feeInUsd, perYear, currency
})

const progDisc = (id: number, programId: number, disciplineId: number) => ({
    id, uuid: `pd-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    programId, disciplineId,
    discipline: mockDisciplines.find(d => d.id === disciplineId)!
})

const uni = (idx: number) => mockUniversities[idx]

// ─── 20 Programs ────────────────────────────────────────────────────────────

export const PROGRAM_UUIDS = [
    'prog-0001-0000-0000-000000000001',
    'prog-0002-0000-0000-000000000002',
    'prog-0003-0000-0000-000000000003',
    'prog-0004-0000-0000-000000000004',
    'prog-0005-0000-0000-000000000005',
    'prog-0006-0000-0000-000000000006',
    'prog-0007-0000-0000-000000000007',
    'prog-0008-0000-0000-000000000008',
    'prog-0009-0000-0000-000000000009',
    'prog-0010-0000-0000-000000000010',
    'prog-0011-0000-0000-000000000011',
    'prog-0012-0000-0000-000000000012',
    'prog-0013-0000-0000-000000000013',
    'prog-0014-0000-0000-000000000014',
    'prog-0015-0000-0000-000000000015',
    'prog-0016-0000-0000-000000000016',
    'prog-0017-0000-0000-000000000017',
    'prog-0018-0000-0000-000000000018',
    'prog-0019-0000-0000-000000000019',
    'prog-0020-0000-0000-000000000020',
]

export const mockPrograms: ProgramT[] = [
    // 1 — CS PhD · MIT · USA
    {
        id: 1, uuid: PROGRAM_UUIDS[0], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'PhD in Computer Science', slug: 'phd-computer-science-mit',
        degreeLevel: 'PhD', universityId: 1, overview: 'The MIT EECS PhD program is consistently ranked #1 worldwide. Students work alongside world-leading faculty on cutting-edge research in AI, systems, theory, and more. Full funding guaranteed for all admitted students.',
        departmentId: 1, schoolId: 1, facultyId: 1, programUrl: 'https://www.eecs.mit.edu/academics-admissions/graduate-program',
        totalCredit: 0, totalCourse: 0, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 1,
        applicationDeadlines: [deadline(1, 1, 'Round 1', 'round-1', 'international', 'full-time', '1735689600000', 1)],
        applicationFees: [appFee(1, 1, 'international', 75, 1, 75, USD)],
        types: [pType(1, 1, 'thesis')],
        commitments: [commitment(1, 1, 'full-time')],
        department: dept(1, 1, 'Electrical Engineering and Computer Science', 'eecs'),
        faculty: dept(1, 1, 'Electrical Engineering and Computer Science', 'eecs'),
        school: dept(1, 1, 'School of Engineering', 'engineering'),
        programDisciplines: [progDisc(1, 1, 1), progDisc(2, 1, 14)],
        programTags: [],
        university: uni(0),
        supervisorGroup: supervisorGroup(1, 1, 'EECS Graduate Group', 'eecs-grad'),
        tuitionFees: [tuitionFee(1, 1, 'full-time', 'international', 'on-campus', 0, 1, 0, true, USD)],
        isBookmarked: false
    },
    // 2 — ML MSc · Stanford · USA
    {
        id: 2, uuid: PROGRAM_UUIDS[1], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MSc in Machine Learning', slug: 'msc-machine-learning-stanford',
        degreeLevel: 'Masters', universityId: 2, overview: 'Stanford\'s MSc in Machine Learning equips students with deep theoretical and practical knowledge. Join a vibrant community of researchers at one of Silicon Valley\'s leading universities.',
        departmentId: 2, schoolId: 2, facultyId: 2, programUrl: 'https://cs.stanford.edu/academics/masters',
        totalCredit: 45, totalCourse: 15, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 2,
        applicationDeadlines: [deadline(2, 2, 'Regular Decision', 'regular', 'international', 'full-time', '1733011200000', 2)],
        applicationFees: [appFee(2, 2, 'international', 125, 1, 125, USD)],
        types: [pType(2, 2, 'coursework')],
        commitments: [commitment(2, 2, 'full-time'), commitment(3, 2, 'part-time')],
        department: dept(2, 2, 'Department of Computer Science', 'cs'),
        faculty: dept(2, 2, 'Department of Computer Science', 'cs'),
        school: dept(2, 2, 'School of Engineering', 'engineering'),
        programDisciplines: [progDisc(3, 2, 1), progDisc(4, 2, 13)],
        programTags: [],
        university: uni(1),
        supervisorGroup: supervisorGroup(2, 2, 'CS Graduate Group', 'cs-grad'),
        tuitionFees: [tuitionFee(2, 2, 'full-time', 'international', 'on-campus', 62556, 1, 62556, true, USD)],
        isBookmarked: true
    },
    // 3 — Physics PhD · Oxford · UK
    {
        id: 3, uuid: PROGRAM_UUIDS[2], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'DPhil in Physics', slug: 'dphil-physics-oxford',
        degreeLevel: 'PhD', universityId: 3, overview: 'Oxford\'s DPhil in Physics spans particle physics, condensed matter, astrophysics and quantum information. Students join a college community while pursuing independent research.',
        departmentId: 3, schoolId: 3, facultyId: 3, programUrl: 'https://www.physics.ox.ac.uk/study-here/postgraduate',
        totalCredit: 0, totalCourse: 0, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 3,
        applicationDeadlines: [deadline(3, 3, 'January Deadline', 'jan-deadline', 'international', 'full-time', '1736294400000', 3)],
        applicationFees: [appFee(3, 3, 'international', 75, 3, 95, GBP)],
        types: [pType(3, 3, 'thesis')],
        commitments: [commitment(4, 3, 'full-time')],
        department: dept(3, 3, 'Department of Physics', 'physics'),
        faculty: dept(3, 3, 'Department of Physics', 'physics'),
        school: dept(3, 3, 'Mathematical, Physical and Life Sciences Division', 'mpls'),
        programDisciplines: [progDisc(5, 3, 2)],
        programTags: [],
        university: uni(2),
        supervisorGroup: supervisorGroup(3, 3, 'Physics Graduate Group', 'physics-grad'),
        tuitionFees: [tuitionFee(3, 3, 'full-time', 'international', 'on-campus', 29700, 3, 37730, true, GBP)],
        isBookmarked: false
    },
    // 4 — Biomedical Engineering MSc · Toronto · Canada
    {
        id: 4, uuid: PROGRAM_UUIDS[3], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MSc in Biomedical Engineering', slug: 'msc-biomedical-engineering-utoronto',
        degreeLevel: 'Masters', universityId: 4, overview: 'The Institute of Biomedical Engineering at U of T provides world-class training at the intersection of engineering and medicine. Graduates are equipped for careers in academia, industry, and healthcare.',
        departmentId: 4, schoolId: 4, facultyId: 4, programUrl: 'https://ibbme.utoronto.ca/graduate/msc/',
        totalCredit: 0, totalCourse: 6, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 4,
        applicationDeadlines: [deadline(4, 4, 'Fall Deadline', 'fall', 'international', 'full-time', '1735084800000', 4)],
        applicationFees: [appFee(4, 4, 'international', 125, 2, 93, CAD)],
        types: [pType(4, 4, 'thesis')],
        commitments: [commitment(5, 4, 'full-time')],
        department: dept(4, 4, 'Institute of Biomedical Engineering', 'ibme'),
        faculty: dept(4, 4, 'Institute of Biomedical Engineering', 'ibme'),
        school: dept(4, 4, 'Faculty of Applied Science and Engineering', 'fase'),
        programDisciplines: [progDisc(6, 4, 6), progDisc(7, 4, 15)],
        programTags: [],
        university: uni(3),
        supervisorGroup: supervisorGroup(4, 4, 'BME Graduate Group', 'bme-grad'),
        tuitionFees: [tuitionFee(4, 4, 'full-time', 'international', 'on-campus', 21710, 2, 16066, true, CAD)],
        isBookmarked: false
    },
    // 5 — Chemistry PhD · ETH Zurich · Switzerland
    {
        id: 5, uuid: PROGRAM_UUIDS[4], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'PhD in Chemistry', slug: 'phd-chemistry-eth-zurich',
        degreeLevel: 'PhD', universityId: 5, overview: 'ETH Zurich\'s Chemistry PhD program trains the next generation of chemists at the frontier of research. Students benefit from state-of-the-art labs and close collaboration with ETH\'s Nobel Prize-winning faculty.',
        departmentId: 5, schoolId: 5, facultyId: 5, programUrl: 'https://chab.ethz.ch/education/doctoral-studies.html',
        totalCredit: 0, totalCourse: 0, deliveryLanguage: 'English', isRolling: true, supervisorGroupId: 5,
        applicationDeadlines: [],
        applicationFees: [],
        types: [pType(5, 5, 'thesis')],
        commitments: [commitment(6, 5, 'full-time')],
        department: dept(5, 5, 'Department of Chemistry and Applied Biosciences', 'chab'),
        faculty: dept(5, 5, 'Department of Chemistry and Applied Biosciences', 'chab'),
        school: dept(5, 5, 'Department of Chemistry and Applied Biosciences', 'chab'),
        programDisciplines: [progDisc(8, 5, 4)],
        programTags: [],
        university: uni(4),
        supervisorGroup: supervisorGroup(5, 5, 'Chemistry Graduate Group', 'chem-grad'),
        tuitionFees: [tuitionFee(5, 5, 'full-time', 'international', 'on-campus', 1400, 4, 1512, true, EUR)],
        isBookmarked: false
    },
    // 6 — Economics MA · Oxford · UK
    {
        id: 6, uuid: PROGRAM_UUIDS[5], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MPhil in Economics', slug: 'mphil-economics-oxford',
        degreeLevel: 'Masters', universityId: 3, overview: 'Oxford\'s MPhil in Economics is a rigorous two-year research-focused degree preparing students for doctoral study or high-level policy work. Strong quantitative foundations are developed throughout.',
        departmentId: 6, schoolId: 6, facultyId: 6, programUrl: 'https://www.economics.ox.ac.uk/graduate-study/mphil',
        totalCredit: 0, totalCourse: 10, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 6,
        applicationDeadlines: [deadline(5, 6, 'January Deadline', 'jan', 'international', 'full-time', '1736294400000', 5)],
        applicationFees: [appFee(5, 6, 'international', 75, 3, 95, GBP)],
        types: [pType(6, 6, 'coursework')],
        commitments: [commitment(7, 6, 'full-time')],
        department: dept(6, 3, 'Department of Economics', 'economics'),
        faculty: dept(6, 3, 'Department of Economics', 'economics'),
        school: dept(6, 3, 'Social Sciences Division', 'socsci'),
        programDisciplines: [progDisc(9, 6, 8)],
        programTags: [],
        university: uni(2),
        supervisorGroup: supervisorGroup(6, 3, 'Economics Graduate Group', 'econ-grad'),
        tuitionFees: [tuitionFee(6, 6, 'full-time', 'international', 'on-campus', 27650, 3, 35135, true, GBP)],
        isBookmarked: false
    },
    // 7 — Data Science MSc · Edinburgh · UK (online option)
    {
        id: 7, uuid: PROGRAM_UUIDS[6], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MSc in Data Science', slug: 'msc-data-science-edinburgh',
        degreeLevel: 'Masters', universityId: 10, overview: 'The University of Edinburgh\'s MSc Data Science develops expertise in machine learning, statistics, and data engineering. Flexible online and on-campus options are available.',
        departmentId: 7, schoolId: 7, facultyId: 7, programUrl: 'https://www.ed.ac.uk/studying/postgraduate/degrees/index.php?r=site/view&id=902',
        totalCredit: 180, totalCourse: 12, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 7,
        applicationDeadlines: [deadline(6, 7, 'First Round', 'r1', 'international', 'full-time', '1740355200000', 6)],
        applicationFees: [appFee(6, 7, 'international', 0, 3, 0, GBP)],
        types: [pType(7, 7, 'coursework')],
        commitments: [commitment(8, 7, 'full-time'), commitment(9, 7, 'part-time')],
        department: dept(7, 10, 'School of Informatics', 'informatics'),
        faculty: dept(7, 10, 'School of Informatics', 'informatics'),
        school: dept(7, 10, 'School of Informatics', 'informatics'),
        programDisciplines: [progDisc(10, 7, 19), progDisc(11, 7, 1)],
        programTags: [],
        university: uni(9),
        supervisorGroup: supervisorGroup(7, 10, 'Informatics Graduate Group', 'informatics-grad'),
        tuitionFees: [
            tuitionFee(7, 7, 'full-time', 'international', 'on-campus', 28300, 3, 35941, true, GBP),
            tuitionFee(8, 7, 'part-time', 'international', 'online', 14150, 3, 17970, true, GBP)
        ],
        isBookmarked: false
    },
    // 8 — Psychology PhD · Melbourne · Australia
    {
        id: 8, uuid: PROGRAM_UUIDS[7], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'PhD in Psychology', slug: 'phd-psychology-melbourne',
        degreeLevel: 'PhD', universityId: 7, overview: 'The PhD in Psychology at the University of Melbourne supports original research across clinical, developmental, social, cognitive, and neuroscience sub-fields.',
        departmentId: 8, schoolId: 8, facultyId: 8, programUrl: 'https://psychologicalsciences.unimelb.edu.au/study/graduate/doctor-of-philosophy',
        totalCredit: 0, totalCourse: 0, deliveryLanguage: 'English', isRolling: true, supervisorGroupId: 8,
        applicationDeadlines: [],
        applicationFees: [appFee(7, 8, 'international', 100, 5, 65, AUD)],
        types: [pType(8, 8, 'thesis')],
        commitments: [commitment(10, 8, 'full-time'), commitment(11, 8, 'part-time')],
        department: dept(8, 7, 'Melbourne School of Psychological Sciences', 'psychology'),
        faculty: dept(8, 7, 'Melbourne School of Psychological Sciences', 'psychology'),
        school: dept(8, 7, 'Faculty of Medicine, Dentistry and Health Sciences', 'mdhs'),
        programDisciplines: [progDisc(12, 8, 7)],
        programTags: [],
        university: uni(6),
        supervisorGroup: supervisorGroup(8, 7, 'Psychology Graduate Group', 'psych-grad'),
        tuitionFees: [tuitionFee(9, 8, 'full-time', 'international', 'on-campus', 46688, 5, 30347, true, AUD)],
        isBookmarked: false
    },
    // 9 — Biology MSc · McGill · Canada (online)
    {
        id: 9, uuid: PROGRAM_UUIDS[8], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MSc in Biology', slug: 'msc-biology-mcgill',
        degreeLevel: 'Masters', universityId: 9, overview: 'McGill\'s MSc in Biology is a research-based graduate program with specializations in ecology, cell biology, molecular biology, and evolutionary biology. Thesis and non-thesis options available.',
        departmentId: 9, schoolId: 9, facultyId: 9, programUrl: 'https://www.mcgill.ca/biology/graduate',
        totalCredit: 45, totalCourse: 5, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 9,
        applicationDeadlines: [deadline(7, 9, 'January Deadline', 'jan', 'international', 'full-time', '1736294400000', 7)],
        applicationFees: [appFee(8, 9, 'international', 118, 2, 87, CAD)],
        types: [pType(9, 9, 'thesis'), pType(10, 9, 'coursework')],
        commitments: [commitment(12, 9, 'full-time')],
        department: dept(9, 9, 'Department of Biology', 'biology'),
        faculty: dept(9, 9, 'Department of Biology', 'biology'),
        school: dept(9, 9, 'Faculty of Science', 'science'),
        programDisciplines: [progDisc(13, 9, 3)],
        programTags: [],
        university: uni(8),
        supervisorGroup: supervisorGroup(9, 9, 'Biology Graduate Group', 'bio-grad'),
        tuitionFees: [tuitionFee(10, 9, 'full-time', 'international', 'on-campus', 17440, 2, 12908, true, CAD)],
        isBookmarked: false
    },
    // 10 — Civil Engineering MEng · McGill · Canada
    {
        id: 10, uuid: PROGRAM_UUIDS[9], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MEng in Civil Engineering', slug: 'meng-civil-engineering-mcgill',
        degreeLevel: 'Masters', universityId: 9, overview: 'McGill\'s MEng in Civil Engineering is a professional coursework-based degree for engineers seeking advanced specialization in structural, environmental, or geotechnical engineering.',
        departmentId: 10, schoolId: 10, facultyId: 10, programUrl: 'https://www.mcgill.ca/civil/graduate/meng',
        totalCredit: 45, totalCourse: 15, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 10,
        applicationDeadlines: [deadline(8, 10, 'Spring Deadline', 'spring', 'international', 'full-time', '1738368000000', 8)],
        applicationFees: [appFee(9, 10, 'international', 118, 2, 87, CAD)],
        types: [pType(11, 10, 'coursework')],
        commitments: [commitment(13, 10, 'full-time'), commitment(14, 10, 'part-time')],
        department: dept(10, 9, 'Department of Civil Engineering', 'civil'),
        faculty: dept(10, 9, 'Department of Civil Engineering', 'civil'),
        school: dept(10, 9, 'Faculty of Engineering', 'engineering'),
        programDisciplines: [progDisc(14, 10, 6), progDisc(15, 10, 16)],
        programTags: [],
        university: uni(8),
        supervisorGroup: supervisorGroup(10, 9, 'Civil Engineering Group', 'civil-grad'),
        tuitionFees: [
            tuitionFee(11, 10, 'full-time', 'international', 'on-campus', 17440, 2, 12908, true, CAD),
            tuitionFee(12, 10, 'part-time', 'international', 'online', 8720, 2, 6454, true, CAD)
        ],
        isBookmarked: false
    },
    // 11 — AI PhD · NUS · Singapore
    {
        id: 11, uuid: PROGRAM_UUIDS[10], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'PhD in Artificial Intelligence', slug: 'phd-ai-nus',
        degreeLevel: 'PhD', universityId: 8, overview: 'NUS\'s PhD in AI is at the cutting edge of research in machine learning, robotics, computer vision, and natural language processing. Generous scholarships are available for top candidates.',
        departmentId: 11, schoolId: 11, facultyId: 11, programUrl: 'https://www.comp.nus.edu.sg/programmes/pg/phd/',
        totalCredit: 0, totalCourse: 4, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 11,
        applicationDeadlines: [deadline(9, 11, 'Main Round', 'main', 'international', 'full-time', '1735689600000', 9)],
        applicationFees: [appFee(10, 11, 'international', 0, 1, 0, USD)],
        types: [pType(12, 11, 'thesis')],
        commitments: [commitment(15, 11, 'full-time')],
        department: dept(11, 8, 'School of Computing', 'soc'),
        faculty: dept(11, 8, 'School of Computing', 'soc'),
        school: dept(11, 8, 'School of Computing', 'soc'),
        programDisciplines: [progDisc(16, 11, 1), progDisc(17, 11, 14)],
        programTags: [],
        university: uni(7),
        supervisorGroup: supervisorGroup(11, 8, 'Computing Graduate Group', 'computing-grad'),
        tuitionFees: [tuitionFee(13, 11, 'full-time', 'international', 'on-campus', 17500, 1, 17500, true, USD)],
        isBookmarked: false
    },
    // 12 — Environmental Science MSc · Edinburgh · UK
    {
        id: 12, uuid: PROGRAM_UUIDS[11], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MSc in Environmental Sustainability', slug: 'msc-env-sustainability-edinburgh',
        degreeLevel: 'Masters', universityId: 10, overview: 'Edinburgh\'s MSc in Environmental Sustainability addresses global challenges including climate change, biodiversity loss, and sustainable development through interdisciplinary study.',
        departmentId: 12, schoolId: 12, facultyId: 12, programUrl: 'https://www.ed.ac.uk/geosciences/postgraduate/masters/environmental-sustainability',
        totalCredit: 180, totalCourse: 12, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 12,
        applicationDeadlines: [deadline(10, 12, 'Rolling Deadline', 'rolling', 'international', 'full-time', '1746057600000', 10)],
        applicationFees: [appFee(11, 12, 'international', 0, 3, 0, GBP)],
        types: [pType(13, 12, 'coursework')],
        commitments: [commitment(16, 12, 'full-time')],
        department: dept(12, 10, 'School of GeoSciences', 'geosciences'),
        faculty: dept(12, 10, 'School of GeoSciences', 'geosciences'),
        school: dept(12, 10, 'College of Science and Engineering', 'cse'),
        programDisciplines: [progDisc(18, 12, 11)],
        programTags: [],
        university: uni(9),
        supervisorGroup: supervisorGroup(12, 10, 'GeoSciences Graduate Group', 'geo-grad'),
        tuitionFees: [tuitionFee(14, 12, 'full-time', 'international', 'on-campus', 26800, 3, 34036, true, GBP)],
        isBookmarked: false
    },
    // 13 — Political Science PhD · Oxford · UK
    {
        id: 13, uuid: PROGRAM_UUIDS[12], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'DPhil in Politics', slug: 'dphil-politics-oxford',
        degreeLevel: 'PhD', universityId: 3, overview: 'Oxford\'s DPhil in Politics is one of the most prestigious doctoral programs in political science worldwide, covering comparative politics, international relations, and political theory.',
        departmentId: 13, schoolId: 13, facultyId: 13, programUrl: 'https://www.politics.ox.ac.uk/graduate/dphil-politics',
        totalCredit: 0, totalCourse: 0, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 13,
        applicationDeadlines: [deadline(11, 13, 'January Deadline', 'jan', 'international', 'full-time', '1736294400000', 11)],
        applicationFees: [appFee(12, 13, 'international', 75, 3, 95, GBP)],
        types: [pType(14, 13, 'thesis')],
        commitments: [commitment(17, 13, 'full-time')],
        department: dept(13, 3, 'Department of Politics and International Relations', 'dpir'),
        faculty: dept(13, 3, 'Department of Politics and International Relations', 'dpir'),
        school: dept(13, 3, 'Social Sciences Division', 'socsci'),
        programDisciplines: [progDisc(19, 13, 9)],
        programTags: [],
        university: uni(2),
        supervisorGroup: supervisorGroup(13, 3, 'Politics Graduate Group', 'politics-grad'),
        tuitionFees: [tuitionFee(15, 13, 'full-time', 'international', 'on-campus', 29700, 3, 37730, true, GBP)],
        isBookmarked: false
    },
    // 14 — Mathematics MSc · Toronto · Canada
    {
        id: 14, uuid: PROGRAM_UUIDS[13], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MSc in Mathematics', slug: 'msc-mathematics-utoronto',
        degreeLevel: 'Masters', universityId: 4, overview: 'U of T\'s MSc in Mathematics offers specializations in algebra, analysis, combinatorics, geometry, probability, and statistics. Exceptional researchers have access to the Fields Institute.',
        departmentId: 14, schoolId: 14, facultyId: 14, programUrl: 'https://www.math.toronto.edu/cms/graduate-program/',
        totalCredit: 0, totalCourse: 5, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 14,
        applicationDeadlines: [deadline(12, 14, 'December Deadline', 'dec', 'international', 'full-time', '1733011200000', 12)],
        applicationFees: [appFee(13, 14, 'international', 125, 2, 93, CAD)],
        types: [pType(15, 14, 'thesis'), pType(16, 14, 'coursework')],
        commitments: [commitment(18, 14, 'full-time')],
        department: dept(14, 4, 'Department of Mathematics', 'math'),
        faculty: dept(14, 4, 'Department of Mathematics', 'math'),
        school: dept(14, 4, 'Faculty of Arts and Science', 'artsci'),
        programDisciplines: [progDisc(20, 14, 5)],
        programTags: [],
        university: uni(3),
        supervisorGroup: supervisorGroup(14, 4, 'Mathematics Graduate Group', 'math-grad'),
        tuitionFees: [tuitionFee(16, 14, 'full-time', 'international', 'on-campus', 21710, 2, 16066, true, CAD)],
        isBookmarked: false
    },
    // 15 — Bioinformatics PhD · Edinburgh · UK
    {
        id: 15, uuid: PROGRAM_UUIDS[14], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'PhD in Bioinformatics', slug: 'phd-bioinformatics-edinburgh',
        degreeLevel: 'PhD', universityId: 10, overview: 'Edinburgh\'s PhD in Bioinformatics bridges biology, statistics, and computer science. Students develop cutting-edge computational tools to analyze biological data at scale.',
        departmentId: 15, schoolId: 15, facultyId: 15, programUrl: 'https://www.ed.ac.uk/biology/postgraduate/phd/bioinformatics',
        totalCredit: 0, totalCourse: 0, deliveryLanguage: 'English', isRolling: true, supervisorGroupId: 15,
        applicationDeadlines: [],
        applicationFees: [appFee(14, 15, 'international', 0, 3, 0, GBP)],
        types: [pType(17, 15, 'thesis')],
        commitments: [commitment(19, 15, 'full-time')],
        department: dept(15, 10, 'School of Biological Sciences', 'biology'),
        faculty: dept(15, 10, 'School of Biological Sciences', 'biology'),
        school: dept(15, 10, 'College of Science and Engineering', 'cse'),
        programDisciplines: [progDisc(21, 15, 18), progDisc(22, 15, 3)],
        programTags: [],
        university: uni(9),
        supervisorGroup: supervisorGroup(15, 10, 'Biology Graduate Group', 'bio-grad'),
        tuitionFees: [tuitionFee(17, 15, 'full-time', 'international', 'on-campus', 26500, 3, 33655, true, GBP)],
        isBookmarked: false
    },
    // 16 — Materials Science MSc · TU Munich · Germany
    {
        id: 16, uuid: PROGRAM_UUIDS[15], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MSc in Materials Science and Engineering', slug: 'msc-materials-science-tum',
        degreeLevel: 'Masters', universityId: 6, overview: 'TU Munich\'s MSc in Materials Science and Engineering is a German-language-optional program focusing on advanced materials, nanomaterials, and sustainable technologies.',
        departmentId: 16, schoolId: 16, facultyId: 16, programUrl: 'https://www.mse.tum.de/en/education/master/',
        totalCredit: 120, totalCourse: 20, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 16,
        applicationDeadlines: [deadline(13, 16, 'May Deadline', 'may', 'international', 'full-time', '1746748800000', 13)],
        applicationFees: [appFee(15, 16, 'international', 0, 4, 0, EUR)],
        types: [pType(18, 16, 'coursework')],
        commitments: [commitment(20, 16, 'full-time')],
        department: dept(16, 6, 'Department of Materials Science and Engineering', 'mse'),
        faculty: dept(16, 6, 'Department of Materials Science and Engineering', 'mse'),
        school: dept(16, 6, 'TUM School of Natural Sciences', 'natural-sciences'),
        programDisciplines: [progDisc(23, 16, 20), progDisc(24, 16, 6)],
        programTags: [],
        university: uni(5),
        supervisorGroup: supervisorGroup(16, 6, 'MSE Graduate Group', 'mse-grad'),
        tuitionFees: [tuitionFee(18, 16, 'full-time', 'international', 'on-campus', 0, 4, 0, true, EUR)],
        isBookmarked: false
    },
    // 17 — History MA · Stanford · USA
    {
        id: 17, uuid: PROGRAM_UUIDS[16], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'MA in History', slug: 'ma-history-stanford',
        degreeLevel: 'Masters', universityId: 2, overview: 'Stanford\'s MA in History enables students to master historical methodology and develop expertise in a chosen geographical or thematic area, preparing them for doctoral work or professional careers.',
        departmentId: 17, schoolId: 17, facultyId: 17, programUrl: 'https://history.stanford.edu/academics/graduate/ma',
        totalCredit: 45, totalCourse: 15, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 17,
        applicationDeadlines: [deadline(14, 17, 'December Deadline', 'dec', 'international', 'full-time', '1733097600000', 14)],
        applicationFees: [appFee(16, 17, 'international', 125, 1, 125, USD)],
        types: [pType(19, 17, 'coursework')],
        commitments: [commitment(21, 17, 'full-time')],
        department: dept(17, 2, 'Department of History', 'history'),
        faculty: dept(17, 2, 'Department of History', 'history'),
        school: dept(17, 2, 'School of Humanities and Sciences', 'humsci'),
        programDisciplines: [progDisc(25, 17, 12)],
        programTags: [],
        university: uni(1),
        supervisorGroup: supervisorGroup(17, 2, 'History Graduate Group', 'history-grad'),
        tuitionFees: [tuitionFee(19, 17, 'full-time', 'international', 'on-campus', 62556, 1, 62556, true, USD)],
        isBookmarked: false
    },
    // 18 — Robotics PhD · NUS · Singapore
    {
        id: 18, uuid: PROGRAM_UUIDS[17], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'PhD in Robotics', slug: 'phd-robotics-nus',
        degreeLevel: 'PhD', universityId: 8, overview: 'The Robotics PhD at NUS spans intelligent systems, human-robot interaction, and autonomous systems. Students collaborate with industry partners and the Advanced Robotics Centre.',
        departmentId: 18, schoolId: 18, facultyId: 18, programUrl: 'https://www.eng.nus.edu.sg/ece/graduate/phd/',
        totalCredit: 0, totalCourse: 4, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 18,
        applicationDeadlines: [deadline(15, 18, 'Main Round', 'main', 'international', 'full-time', '1735689600000', 15)],
        applicationFees: [appFee(17, 18, 'international', 0, 1, 0, USD)],
        types: [pType(20, 18, 'thesis')],
        commitments: [commitment(22, 18, 'full-time')],
        department: dept(18, 8, 'Department of Electrical and Computer Engineering', 'ece'),
        faculty: dept(18, 8, 'Department of Electrical and Computer Engineering', 'ece'),
        school: dept(18, 8, 'College of Design and Engineering', 'cde'),
        programDisciplines: [progDisc(26, 18, 6), progDisc(27, 18, 1)],
        programTags: [],
        university: uni(7),
        supervisorGroup: supervisorGroup(18, 8, 'Engineering Graduate Group', 'eng-grad'),
        tuitionFees: [tuitionFee(20, 18, 'full-time', 'international', 'on-campus', 17500, 1, 17500, true, USD)],
        isBookmarked: false
    },
    // 19 — Neuroscience PhD · Melbourne · Australia
    {
        id: 19, uuid: PROGRAM_UUIDS[18], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'PhD in Neuroscience', slug: 'phd-neuroscience-melbourne',
        degreeLevel: 'PhD', universityId: 7, overview: 'Melbourne\'s PhD in Neuroscience covers systems neuroscience, cellular and molecular neuroscience, and cognitive neuroscience. Students benefit from collaborations with the Florey Institute.',
        departmentId: 19, schoolId: 19, facultyId: 19, programUrl: 'https://medicine.unimelb.edu.au/study/graduate/doctor-of-philosophy-neuroscience',
        totalCredit: 0, totalCourse: 0, deliveryLanguage: 'English', isRolling: true, supervisorGroupId: 19,
        applicationDeadlines: [],
        applicationFees: [appFee(18, 19, 'international', 100, 5, 65, AUD)],
        types: [pType(21, 19, 'thesis')],
        commitments: [commitment(23, 19, 'full-time'), commitment(24, 19, 'part-time')],
        department: dept(19, 7, 'Melbourne Neuroscience Institute', 'neuroscience'),
        faculty: dept(19, 7, 'Melbourne Neuroscience Institute', 'neuroscience'),
        school: dept(19, 7, 'Faculty of Medicine, Dentistry and Health Sciences', 'mdhs'),
        programDisciplines: [progDisc(28, 19, 17), progDisc(29, 19, 3)],
        programTags: [],
        university: uni(6),
        supervisorGroup: supervisorGroup(19, 7, 'Neuroscience Graduate Group', 'neuro-grad'),
        tuitionFees: [tuitionFee(21, 19, 'full-time', 'international', 'on-campus', 46688, 5, 30347, true, AUD)],
        isBookmarked: false
    },
    // 20 — Linguistics MA · MIT · USA (online)
    {
        id: 20, uuid: PROGRAM_UUIDS[19], createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        name: 'PhD in Linguistics', slug: 'phd-linguistics-mit',
        degreeLevel: 'PhD', universityId: 1, overview: 'MIT\'s Linguistics PhD is ranked #1 globally. The program covers syntax, phonology, semantics, and psycholinguistics, with students conducting original empirical and theoretical research.',
        departmentId: 20, schoolId: 20, facultyId: 20, programUrl: 'https://linguistics.mit.edu/graduate-program/',
        totalCredit: 0, totalCourse: 8, deliveryLanguage: 'English', isRolling: false, supervisorGroupId: 20,
        applicationDeadlines: [deadline(16, 20, 'December Deadline', 'dec', 'international', 'full-time', '1733097600000', 16)],
        applicationFees: [appFee(19, 20, 'international', 75, 1, 75, USD)],
        types: [pType(22, 20, 'thesis')],
        commitments: [commitment(25, 20, 'full-time')],
        department: dept(20, 1, 'Department of Linguistics and Philosophy', 'linguistics'),
        faculty: dept(20, 1, 'Department of Linguistics and Philosophy', 'linguistics'),
        school: dept(20, 1, 'School of Humanities, Arts, and Social Sciences', 'shass'),
        programDisciplines: [progDisc(30, 20, 10)],
        programTags: [],
        university: uni(0),
        supervisorGroup: supervisorGroup(20, 1, 'Linguistics Graduate Group', 'linguistics-grad'),
        tuitionFees: [tuitionFee(22, 20, 'full-time', 'international', 'on-campus', 0, 1, 0, true, USD)],
        isBookmarked: false
    }
]
