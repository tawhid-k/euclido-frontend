import { JobCardType } from '../types/jobs/job-list'
import { ts, tsUpdated } from './shared'
import { mockUniversities } from './universities'
import { mockDisciplines } from './disciplines'

const mockRecruiter = {
    firstName: 'Dr. Robert', lastName: 'Hayes',
    email: 'rhayes@university.edu', userType: 'recruiter', roleId: 2,
    authProvider: 'credentials', avatarPath: '/prof.png',
    id: 100, uuid: 'recr-0001-0000-0000-000000000001',
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    isEmailVerified: true, isPhoneVerified: false,
    code: '', hash: '', codeExpiredAt: 0
}

const makeApplicant = (id: number, jobId: number, firstName: string, lastName: string) => ({
    id, uuid: `appl-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    userId: 200 + id, jobId,
    academicQualification: 'MSc Computer Science',
    googleScholarUrl: `https://scholar.google.com/citations?user=MOCK${id}00`,
    otherProfile: `https://researchgate.net/profile/mock${id}`,
    linkedinUrl: `https://linkedin.com/in/mock-applicant-${id}`,
    shareEuclidoProfile: true,
    isShortListed: null, isRejected: null,
    user: {
        firstName, lastName, email: `${firstName.toLowerCase()}@example.com`,
        userType: 'student', roleId: 1,
        authProvider: 'google', avatarPath: `/prof.png${20 + id}`,
        id: 200 + id, uuid: `appl-user-${id}`,
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        isEmailVerified: true, isPhoneVerified: false,
        code: '', hash: '', codeExpiredAt: 0
    },
    jobApplicationAttachments: []
})

function makeJob(id: number, title: string, position: string, desc: string, req: string, uniIdx: number, discId: number, subDiscId: number, minQual: string, jobType: string, jobMode: string, deadline: string, start: string, duration: string, keywords: string, isActive: boolean, isDraft: boolean, applicantNames: [string, string][]): JobCardType {
    const uni = mockUniversities[uniIdx]
    const disc = mockDisciplines.find(d => d.id === discId)!
    const subDisc = mockDisciplines.find(d => d.id === subDiscId)!
    return {
        id, uuid: `job-${String(id).padStart(4, '0')}-0000-0000-000000000001`,
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        jobTitle: title, slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        position, jobDescription: desc, applicationRequirement: req,
        universityId: uni.id, disciplineId: discId, subDisciplineId: subDiscId,
        minimumQualification: minQual, jobType, jobMode,
        applicationDeadlineTimestamp: deadline, startDateTimestamp: start,
        duration, keywords, emailNotification: true, sentApplicationToEmail: false,
        isActive, isDraft, recruiterId: 100,
        isBookmarked: false,
        university: uni as any,
        discipline: disc,
        subDiscipline: subDisc,
        recruiter: mockRecruiter,
        applicants: applicantNames.map(([fn, ln], i) => makeApplicant(id * 10 + i, id, fn, ln))
    }
}

export const mockJobs: JobCardType[] = [
    makeJob(1, 'Postdoctoral Researcher in Machine Learning', 'Postdoctoral Researcher',
        'We are seeking a highly motivated postdoctoral researcher to join our Machine Learning group at MIT. The successful candidate will work on cutting-edge research in deep learning, particularly in the areas of large language models and multimodal learning. You will have the opportunity to publish in top-tier venues and collaborate with industry partners.',
        'PhD in Computer Science, Machine Learning, or a related field. Strong publication record in NLP or machine learning. Experience with PyTorch/JAX. Excellent written and oral communication skills.',
        0, 1, 14, 'doctorate', 'full-time', 'on-site', '2025-06-30T00:00:00.000Z', '2025-09-01T00:00:00.000Z', '2 years',
        'deep learning, NLP, LLMs, PyTorch', true, false,
        [['Emma', 'Williams'], ['Lucas', 'Patel']]
    ),
    makeJob(2, 'PhD Position in Quantum Computing', 'PhD Student',
        'The Department of Physics at ETH Zurich invites applications for a fully-funded PhD position in quantum computing. The project focuses on developing new quantum algorithms for optimization problems and quantum error correction. The position is funded for 4 years.',
        'MSc degree in Physics, Computer Science, or Mathematics. Strong background in linear algebra and quantum mechanics. Programming experience in Python. Research experience highly valued.',
        4, 2, 2, 'masters', 'full-time', 'on-site', '2025-04-15T00:00:00.000Z', '2025-09-15T00:00:00.000Z', '4 years',
        'quantum computing, quantum algorithms, error correction', true, false,
        [['Sophie', 'Anderson']]
    ),
    makeJob(3, 'Research Associate in Computational Biology', 'Research Associate',
        'University of Edinburgh School of Informatics is looking for a Research Associate to work on computational approaches to understanding gene regulatory networks. The role involves developing machine learning methods for genomics data analysis.',
        'PhD in Bioinformatics, Computational Biology, or related field. Experience with genomics data analysis and machine learning. Proficiency in Python and R. Publication track record in computational biology journals.',
        9, 3, 18, 'doctorate', 'full-time', 'hybrid', '2025-05-31T00:00:00.000Z', '2025-08-01T00:00:00.000Z', '18 months',
        'bioinformatics, genomics, machine learning, Python, R', true, false,
        [['Yuki', 'Tanaka'], ['Maria', 'Santos'], ['James', 'Osei']]
    ),
    makeJob(4, 'Lecturer in Data Science', 'Lecturer',
        'The Faculty of Engineering at McGill University is recruiting a Lecturer in Data Science. The successful candidate will teach undergraduate and graduate courses, develop curriculum, and engage in service activities. This is a teaching-focused position with opportunities for research.',
        'PhD in Computer Science, Statistics, or Data Science. Demonstrated teaching excellence. Experience with curriculum development. Strong communication skills.',
        8, 1, 19, 'doctorate', 'full-time', 'on-site', '2025-03-31T00:00:00.000Z', '2025-07-01T00:00:00.000Z', 'Permanent',
        'data science, teaching, Python, statistics', true, false,
        []
    ),
    makeJob(5, 'Research Scientist in Natural Language Processing', 'Research Scientist',
        'NUS School of Computing seeks a Research Scientist to lead a team working on multilingual NLP systems. This role involves both applied research and collaboration with external partners in Southeast Asia. Competitive salary and research budget provided.',
        'PhD in Computer Science or related field. 2+ years research experience in NLP. Publications in ACL, EMNLP, or NAACL. Experience with multilingual systems preferred.',
        7, 1, 14, 'doctorate', 'full-time', 'on-site', '2025-05-01T00:00:00.000Z', '2025-08-01T00:00:00.000Z', '3 years',
        'NLP, multilingual, deep learning, Singapore', true, false,
        [['Alex', 'Kim']]
    ),
    makeJob(6, 'Postdoc in Climate Systems Modelling', 'Postdoctoral Researcher',
        'The School of GeoSciences at the University of Edinburgh is offering a postdoctoral position in climate systems modelling. The role involves developing and applying global climate models to study atmospheric dynamics and climate extremes.',
        'PhD in Atmospheric Sciences, Physical Geography, or related discipline. Experience with numerical climate models (e.g., CESM, ECMWF). Strong programming skills in Python and Fortran.',
        9, 11, 11, 'doctorate', 'full-time', 'on-site', '2025-04-30T00:00:00.000Z', '2025-07-15T00:00:00.000Z', '2 years',
        'climate modelling, atmospheric science, Python, Fortran', true, false,
        [['Ingrid', 'Nielsen'], ['Kwame', 'Asante']]
    ),
    makeJob(7, 'Assistant Professor of Robotics', 'Assistant Professor',
        'National University of Singapore College of Design and Engineering invites applications for a tenure-track Assistant Professor in Robotics. The candidate is expected to establish a strong independent research program and teach graduate courses.',
        'PhD in Robotics, Mechanical Engineering, or related field. Proven research excellence in robotics or autonomous systems. Demonstrated ability to attract funding. Strong publication record.',
        7, 6, 6, 'doctorate', 'full-time', 'on-site', '2025-12-01T00:00:00.000Z', '2026-07-01T00:00:00.000Z', 'Permanent',
        'robotics, autonomous systems, tenure-track, Singapore', true, false,
        []
    ),
    makeJob(8, 'PhD Fellowship in Neuroscience', 'PhD Student',
        'The Melbourne Neuroscience Institute is offering competitive PhD fellowships for outstanding students. Projects are available in cognitive neuroscience, systems neuroscience, and computational neuroscience. Full tuition coverage and living stipend included.',
        'Honours or Masters degree in Neuroscience, Psychology, Biology, or related field. Strong academic record (GPA 3.5+). Research experience desirable. IELTS 6.5+ for international applicants.',
        6, 3, 17, 'masters', 'full-time', 'on-site', '2025-06-30T00:00:00.000Z', '2026-03-01T00:00:00.000Z', '4 years',
        'neuroscience, PhD fellowship, stipend, Melbourne', true, false,
        [['Zara', 'Okonkwo']]
    ),
    makeJob(9, 'Research Engineer, Computer Vision', 'Research Engineer',
        'MIT CSAIL is seeking a Research Engineer to support faculty research groups working on computer vision and scene understanding. Responsibilities include implementing state-of-the-art algorithms, maintaining code repositories, and assisting with paper preparation.',
        'MSc in Computer Science or related field. Strong software engineering skills. Experience with deep learning frameworks (PyTorch/TensorFlow). Familiarity with computer vision datasets and benchmarks.',
        0, 1, 13, 'masters', 'full-time', 'on-site', '2025-04-01T00:00:00.000Z', '2025-06-01T00:00:00.000Z', '2 years',
        'computer vision, PyTorch, research engineering, Cambridge', true, false,
        [['Raj', 'Gupta'], ['Li', 'Wei']]
    ),
    makeJob(10, 'Visiting Research Fellow in Economics', 'Research Fellow',
        'The Department of Economics at the University of Oxford offers short-term visiting fellowships for postdoctoral economists. Fellows will engage in collaborative research, present at department seminars, and contribute to the Oxford Economics community.',
        'PhD in Economics. Active research agenda in microeconomics, macroeconomics, or econometrics. Recent publications in top-5 economics journals. Strong collegiality and collaborative spirit.',
        2, 8, 8, 'doctorate', 'full-time', 'on-site', '2025-03-15T00:00:00.000Z', '2025-10-01T00:00:00.000Z', '1 year',
        'economics, research fellowship, Oxford, visiting', true, false,
        []
    ),
    makeJob(11, 'Instructor in Biomedical Engineering (Part-Time)', 'Instructor',
        'U of T\'s Institute of Biomedical Engineering is hiring part-time instructors for graduate-level courses in medical device design and regulatory affairs. Remote teaching is available for non-Toronto candidates.',
        'Masters or PhD in Biomedical Engineering, Mechanical Engineering, or related field. Teaching experience at university level. Knowledge of medical device standards (ISO 13485, FDA regulations).',
        3, 6, 15, 'masters', 'part-time', 'remote', '2025-05-31T00:00:00.000Z', '2025-09-01T00:00:00.000Z', '1 semester',
        'biomedical engineering, teaching, part-time, remote, Toronto', true, false,
        [['Chen', 'Liu']]
    ),
    makeJob(12, 'Postdoctoral Fellow in Computational Chemistry', 'Postdoctoral Fellow',
        'ETH Zurich\'s Computational Chemistry group seeks a postdoctoral fellow to work on molecular dynamics simulations and quantum chemical calculations for drug design applications. Access to world-class HPC facilities.',
        'PhD in Computational Chemistry, Physical Chemistry, or Chemical Engineering. Experience with molecular dynamics software (GROMACS, NAMD). Proficiency in Python and C++.',
        4, 4, 4, 'doctorate', 'full-time', 'on-site', '2025-07-31T00:00:00.000Z', '2025-10-01T00:00:00.000Z', '2 years',
        'computational chemistry, molecular dynamics, drug design, ETH', true, false,
        [['Anna', 'Kovacs'], ['Samuel', 'Acheampong'], ['Laila', 'Hassan']]
    ),
    makeJob(13, 'Research Analyst, Political Economy', 'Research Analyst',
        'The Department of Politics at Oxford seeks a Research Analyst to support an ERC-funded project on the political economy of climate policy. Responsibilities include data collection, statistical analysis, and literature reviews.',
        'Masters degree in Political Science, Economics, or Public Policy. Quantitative skills in Stata, R, or Python. Interest in climate politics and comparative politics. Native or near-native English.',
        2, 9, 9, 'masters', 'full-time', 'hybrid', '2025-04-30T00:00:00.000Z', '2025-06-01T00:00:00.000Z', '2 years',
        'political economy, climate policy, Stata, R, Oxford', true, false,
        []
    ),
    // 2 Draft jobs
    makeJob(14, 'PhD Scholarship in Applied Mathematics', 'PhD Student',
        'The Department of Mathematics at the University of Toronto invites applications for a fully-funded PhD scholarship in applied mathematics, focusing on numerical methods for PDEs and scientific computing.',
        'BSc or MSc in Mathematics, Applied Mathematics, or Physics. Strong background in analysis and linear algebra. Programming experience in MATLAB or Python.',
        3, 5, 5, 'masters', 'full-time', 'on-site', '2025-08-31T00:00:00.000Z', '2025-09-15T00:00:00.000Z', '5 years',
        'mathematics, PDE, scientific computing, scholarship', false, true,
        []
    ),
    makeJob(15, 'Research Assistant in Environmental Policy', 'Research Assistant',
        'School of GeoSciences, University of Edinburgh — draft posting for a part-time research assistant to assist with policy report writing and stakeholder engagement in sustainable agriculture.',
        'Undergraduate or Masters in Environmental Science, Geography, or related field. Strong writing skills. Familiarity with UK agricultural policy a plus.',
        9, 11, 11, 'bachelor', 'part-time', 'hybrid', '2025-09-30T00:00:00.000Z', '2025-11-01T00:00:00.000Z', '6 months',
        'environmental policy, research assistant, Edinburgh, part-time', false, true,
        []
    ),
]
