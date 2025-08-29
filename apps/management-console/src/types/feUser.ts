import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

export type FeUser = {
    id: string;
    UserCompanyId: string;
    imageUrl: string;
    email: string;
    firstName: string;
    middleNames: string;
    lastName: string;
    position: string;
    managementConsoleAccess: ManagementConsoleAccess;
    status: string;
    lastSeenAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type FeUserProfile = {
    id: string;
    imageUrl: string;
    email: string;
    firstName: string;
    middleNames: string;
    lastName: string;
    position: string;
    theme: string;
    language: string;
    createdAt: Date;
};
