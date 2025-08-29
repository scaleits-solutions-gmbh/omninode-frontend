export type FeProject = {
    id: string;
    number: string;
    customer: string;
    status: string;
    startDate: string;
    endDate: string;
    members: FeProjectMember[];
};

export type FeProjectMember = {
    id: string;
    role: string; //weclapp enum
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
};