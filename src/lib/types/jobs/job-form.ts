export interface JobFormData {
    jobTitle: string;
    position: string;
    jobDescription: string;
    applicationRequirement: string;
    universityUuid: string;
    disciplineUuid: string;
    subDisciplineUuid: string;
    minimumQualification: 'bachelor' | 'masters' | 'doctorate' | 'postdoctorate' | 'certificate' | 'diploma' | 'associate' | 'foundation' | 'preparatory' | 'graduate_diploma';
    jobType: 'full-time' | 'part-time';
    jobMode: 'on-site' | 'remote' | 'hybrid';
    applicationDeadlineTimestamp: string;
    startDateTimestamp: string;
    duration: number;
    keywords: string;
    emailNotification: boolean;
    sentApplicationToEmail: boolean;
    isDraft: boolean;
    isActive: boolean;
}
