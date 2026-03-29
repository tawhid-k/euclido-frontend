import { SupervisorT } from '../types/supervisor-type'
import { ts, tsUpdated } from './shared'

const ri = (id: number, supId: number, name: string, slug: string, parentId: number) => ({
    researchInterestId: id, supervisorId: supId, id, uuid: `ri-${id}`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    researchInterest: { id, uuid: `ri-item-${id}`, name, slug, parentId, grandParentId: null, icon: null, createdAt: ts, updatedAt: tsUpdated, deletedAt: null }
})
const ai = (id: number, supId: number, name: string, slug: string, parentId: number) => ({
    areaOfInterestId: id, supervisorId: supId, id, uuid: `ai-${id}`,
    createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
    areaOfInterest: { id, uuid: `ai-item-${id}`, name, slug, parentId, grandParentId: null, icon: null, createdAt: ts, updatedAt: tsUpdated, deletedAt: null }
})

function makeSupervisor(id: number, groupId: number, name: string, designation: string, citation: number, hIndex: number, contact: string, gsUrl: string, avatar: string, webUrl: string, ris: ReturnType<typeof ri>[], ais: ReturnType<typeof ai>[]): SupervisorT {
    return {
        supervisorGroupId: groupId, supervisorId: id, id, uuid: `sup-${String(id).padStart(4, '0')}`,
        createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
        supervisor: {
            name, designation, citation, hIndex, contact,
            googleScholarUrl: gsUrl,
            avatarPath: avatar,
            personalWebUrl: webUrl,
            id, uuid: `sup-inner-${id}`, createdAt: ts, updatedAt: tsUpdated, deletedAt: null,
            researchInterests: ris, areaOfInterests: ais
        },
        isBookmarked: false
    }
}

export const mockSupervisors: SupervisorT[] = [
    makeSupervisor(1, 1, 'Prof. Sarah Chen', 'Full Professor', 18420, 62, 'schen@mit.edu',
        'https://scholar.google.com/citations?user=MOCK001', '/prof.png',
        'https://people.csail.mit.edu/schen',
        [ri(1, 1, 'Deep Learning', 'deep-learning', 1), ri(2, 1, 'Computer Vision', 'computer-vision', 1)],
        [ai(1, 1, 'Artificial Intelligence', 'ai', 1)]
    ),
    makeSupervisor(2, 2, 'Dr. James Okafor', 'Associate Professor', 9250, 44, 'jokafor@stanford.edu',
        'https://scholar.google.com/citations?user=MOCK002', '/prof.png',
        'https://cs.stanford.edu/~jokafor',
        [ri(3, 2, 'Reinforcement Learning', 'rl', 1), ri(4, 2, 'Robotics', 'robotics', 6)],
        [ai(2, 2, 'Machine Learning', 'ml', 1)]
    ),
    makeSupervisor(3, 3, 'Prof. Elena Vasquez', 'Professor of Physics', 14800, 58, 'evasquez@physics.ox.ac.uk',
        'https://scholar.google.com/citations?user=MOCK003', '/prof.png',
        'https://www2.physics.ox.ac.uk/~evasquez',
        [ri(5, 3, 'Quantum Computing', 'quantum-computing', 2), ri(6, 3, 'Condensed Matter', 'condensed-matter', 2)],
        [ai(3, 3, 'Physics', 'physics', 2)]
    ),
    makeSupervisor(4, 4, 'Dr. Michael Ng', 'Assistant Professor', 4100, 28, 'mng@utoronto.ca',
        'https://scholar.google.com/citations?user=MOCK004', '/prof.png',
        'https://ibbme.utoronto.ca/staff/mng',
        [ri(7, 4, 'Neural Engineering', 'neural-engineering', 6), ri(8, 4, 'Medical Imaging', 'medical-imaging', 6)],
        [ai(4, 4, 'Biomedical Engineering', 'bme', 6)]
    ),
    makeSupervisor(5, 5, 'Prof. Klaus Weber', 'Full Professor', 22300, 71, 'kweber@ethz.ch',
        'https://scholar.google.com/citations?user=MOCK005', '/prof.png',
        'https://chab.ethz.ch/en/research/weber',
        [ri(9, 5, 'Catalysis', 'catalysis', 4), ri(10, 5, 'Organic Chemistry', 'organic-chemistry', 4)],
        [ai(5, 5, 'Chemistry', 'chemistry', 4)]
    ),
    makeSupervisor(6, 6, 'Dr. Priya Sharma', 'Associate Professor', 6700, 35, 'psharma@economics.ox.ac.uk',
        'https://scholar.google.com/citations?user=MOCK006', '/prof.png',
        'https://www.economics.ox.ac.uk/people/priya-sharma',
        [ri(11, 6, 'Development Economics', 'dev-economics', 8), ri(12, 6, 'Behavioural Economics', 'behavioural-economics', 8)],
        [ai(6, 6, 'Economics', 'economics', 8)]
    ),
    makeSupervisor(7, 7, 'Dr. Liam Fraser', 'Lecturer', 3200, 22, 'lfraser@ed.ac.uk',
        'https://scholar.google.com/citations?user=MOCK007', '/prof.png',
        'https://www.inf.ed.ac.uk/people/staff/lfraser',
        [ri(13, 7, 'Data Mining', 'data-mining', 1), ri(14, 7, 'Statistical Learning', 'statistical-learning', 5)],
        [ai(7, 7, 'Data Science', 'data-science', 1)]
    ),
    makeSupervisor(8, 8, 'Prof. Amara Diallo', 'Full Professor', 11500, 49, 'adiallo@unimelb.edu.au',
        'https://scholar.google.com/citations?user=MOCK008', '/prof.png',
        'https://psychologicalsciences.unimelb.edu.au/staff/adiallo',
        [ri(15, 8, 'Cognitive Neuroscience', 'cognitive-neuroscience', 7), ri(16, 8, 'Clinical Psychology', 'clinical-psychology', 7)],
        [ai(8, 8, 'Psychology', 'psychology', 7)]
    ),
    makeSupervisor(9, 9, 'Dr. Fatima Al-Hassan', 'Assistant Professor', 2800, 19, 'falhassan@mcgill.ca',
        'https://scholar.google.com/citations?user=MOCK009', '/prof.png',
        'https://www.mcgill.ca/biology/staff/falhassan',
        [ri(17, 9, 'Molecular Biology', 'molecular-biology', 3), ri(18, 9, 'Cell Biology', 'cell-biology', 3)],
        [ai(9, 9, 'Biology', 'biology', 3)]
    ),
    makeSupervisor(10, 10, 'Prof. Hiroshi Tanaka', 'Full Professor', 16900, 55, 'htanaka@mcgill.ca',
        'https://scholar.google.com/citations?user=MOCK010', '/prof.png',
        'https://www.mcgill.ca/civil/staff/htanaka',
        [ri(19, 10, 'Structural Engineering', 'structural-engineering', 6), ri(20, 10, 'Seismic Design', 'seismic-design', 6)],
        [ai(10, 10, 'Civil Engineering', 'civil-engineering', 6)]
    ),
    makeSupervisor(11, 11, 'Dr. Mei Lin', 'Associate Professor', 7600, 38, 'mlin@comp.nus.edu.sg',
        'https://scholar.google.com/citations?user=MOCK011', '/prof.png',
        'https://www.comp.nus.edu.sg/~mlin',
        [ri(21, 11, 'Natural Language Processing', 'nlp', 1), ri(22, 11, 'Large Language Models', 'llm', 1)],
        [ai(11, 11, 'Artificial Intelligence', 'ai', 1)]
    ),
    makeSupervisor(12, 12, 'Dr. Grace Osei', 'Lecturer', 1900, 15, 'gosei@ed.ac.uk',
        'https://scholar.google.com/citations?user=MOCK012', '/prof.png',
        'https://www.ed.ac.uk/geosciences/people/grace-osei',
        [ri(23, 12, 'Climate Change', 'climate-change', 11), ri(24, 12, 'Biodiversity', 'biodiversity', 11)],
        [ai(12, 12, 'Environmental Science', 'environmental-science', 11)]
    ),
    makeSupervisor(13, 13, 'Prof. Oliver Bennett', 'Full Professor', 9100, 42, 'obennett@dpir.ox.ac.uk',
        'https://scholar.google.com/citations?user=MOCK013', '/prof.png',
        'https://www.politics.ox.ac.uk/people/oliver-bennett',
        [ri(25, 13, 'International Relations', 'ir', 9), ri(26, 13, 'Comparative Politics', 'comparative-politics', 9)],
        [ai(13, 13, 'Political Science', 'political-science', 9)]
    ),
    makeSupervisor(14, 14, 'Dr. Nadia Petrov', 'Associate Professor', 5300, 31, 'npetrov@math.toronto.edu',
        'https://scholar.google.com/citations?user=MOCK014', '/prof.png',
        'https://www.math.toronto.edu/npetrov',
        [ri(27, 14, 'Number Theory', 'number-theory', 5), ri(28, 14, 'Algebraic Geometry', 'algebraic-geometry', 5)],
        [ai(14, 14, 'Mathematics', 'mathematics', 5)]
    ),
    makeSupervisor(15, 15, 'Prof. Carlos Mendez', 'Full Professor', 13200, 51, 'cmendez@ece.nus.edu.sg',
        'https://scholar.google.com/citations?user=MOCK015', '/prof.png',
        'https://www.eng.nus.edu.sg/ece/staff/cmendez',
        [ri(29, 15, 'Human-Robot Interaction', 'hri', 6), ri(30, 15, 'Autonomous Systems', 'autonomous-systems', 6)],
        [ai(15, 15, 'Robotics', 'robotics', 6)]
    ),
]
