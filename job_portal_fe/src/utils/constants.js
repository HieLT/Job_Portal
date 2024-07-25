export const TYPE_USER = [];
TYPE_USER['TEACHER'] = 0;
TYPE_USER['MANAGEMENT'] = 1;


export const STATUS_USER = [];
STATUS_USER['DE_ACTIVE'] = 0;
STATUS_USER['ACTIVE'] = 1;

export const USER_ROLE = {
    ADMIN: 'Admin',
    CANDIDATE: 'Candidate',
    COMPANY: 'Company'
}

export const JOB_STATUS = {
    OPEN: 'Open',
    CLOSED: 'Closed'
}

export const SALARY_OPTIONS = {
    FIXED: 0,
    RANGE: 1,
    AGREEMENT: 2
}

export const EMPLOYEE_TYPE = {
    LABELS: {
        FULL_TIME: 'Full-time',
        CONTRACT: 'Hợp đồng',
        FREELANCE: 'Freelance',
        PART_TIME: 'Part-time',
        INTERNSHIP: 'Thực tập',
    },
    VALUES: {
        FULL_TIME: 'FULL-TIME',
        CONTRACT: 'CONTRACT',
        FREELANCE: 'FREELANCE',
        PART_TIME: 'PART-TIME',
        INTERNSHIP: 'INTERNSHIP',
    }
}

export const JOB_EXPERIENCE = {
    LABELS: {
        LESS_THAN_1_YEAR: 'Dưới 1 năm',
        MIDDLE: '1-3 năm',
        MORE_THAN_3_YEARS: 'Trên 3 năm',
        NOT_REQUIRED: 'Không yêu cầu'
    },
    VALUES: {
        LESS_THAN_1_YEAR: 'LESS THAN 1 YEAR',
        MIDDLE: '1-3 YEARS',
        MORE_THAN_3_YEARS: 'MORE THAN 3 YEARS',
        NOT_REQUIRED: 'NOT REQUIRED'
    }
}
