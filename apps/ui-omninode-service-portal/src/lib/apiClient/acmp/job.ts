import { FeJob } from "@/types/acmp/job";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const mockJobs: FeJob[] = [
    {
        id: "1",
        jobName: "System Update",
        kind: "update",
        origin: "scheduler",
        dateTime: "2024-03-15T10:00:00Z",
    },
    {
        id: "2",
        jobName: "Security Scan",
        kind: "security",
        origin: "manual",
        dateTime: "2024-03-15T11:30:00Z",
    },
    {
        id: "3",
        jobName: "Backup Database",
        kind: "backup",
        origin: "scheduler",
        dateTime: "2024-03-15T12:00:00Z",
    },
    {
        id: "4",
        jobName: "Clean Temp Files",
        kind: "maintenance",
        origin: "scheduler",
        dateTime: "2024-03-15T13:15:00Z",
    },
    {
        id: "5",
        jobName: "Network Diagnostics",
        kind: "diagnostic",
        origin: "manual",
        dateTime: "2024-03-15T14:00:00Z",
    },
    {
        id: "6",
        jobName: "Software Installation",
        kind: "installation",
        origin: "manual",
        dateTime: "2024-03-15T15:30:00Z",
    },
    {
        id: "7",
        jobName: "Performance Analysis",
        kind: "analysis",
        origin: "scheduler",
        dateTime: "2024-03-15T16:00:00Z",
    },
    {
        id: "8",
        jobName: "Log Rotation",
        kind: "maintenance",
        origin: "scheduler",
        dateTime: "2024-03-15T17:00:00Z",
    },
    {
        id: "9",
        jobName: "Antivirus Update",
        kind: "update",
        origin: "scheduler",
        dateTime: "2024-03-15T18:00:00Z",
    },
    {
        id: "10",
        jobName: "System Health Check",
        kind: "diagnostic",
        origin: "manual",
        dateTime: "2024-03-15T19:30:00Z",
    },
    {
        id: "11",
        jobName: "Data Synchronization",
        kind: "sync",
        origin: "scheduler",
        dateTime: "2024-03-15T20:00:00Z",
    },
    {
        id: "12",
        jobName: "Configuration Backup",
        kind: "backup",
        origin: "manual",
        dateTime: "2024-03-15T21:15:00Z",
    },
    {
        id: "13",
        jobName: "Driver Update",
        kind: "update",
        origin: "scheduler",
        dateTime: "2024-03-15T22:00:00Z",
    },
    {
        id: "14",
        jobName: "Security Patch",
        kind: "security",
        origin: "manual",
        dateTime: "2024-03-15T23:30:00Z",
    },
    {
        id: "15",
        jobName: "System Optimization",
        kind: "maintenance",
        origin: "scheduler",
        dateTime: "2024-03-16T00:00:00Z",
    },
];

export const fetchAcmpJobs = async (search: string, page: number, pageSize: number): Promise<PaginatedResponse<FeJob>> => {
    //wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockGetJobs(search, page, pageSize);
};

export const fetchAcmpJob = async (id: string): Promise<FeJob> => {
    return mockGetJob(id);
}

const mockGetJobs = async (search: string, page: number, pageSize: number): Promise<PaginatedResponse<FeJob>> => {
    let filteredJobs = mockJobs;
    
    // Apply search filter if provided
    if (search) {
        const searchLower = search.toLowerCase();
        filteredJobs = mockJobs.filter(job => 
            job.jobName.toLowerCase().includes(searchLower) ||
            job.kind.toLowerCase().includes(searchLower) ||
            job.origin.toLowerCase().includes(searchLower)
        );
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredJobs.slice(startIndex, endIndex);
    
    return {
        items: paginatedItems,
        total: filteredJobs.length,
        page: page,
        pageSize: pageSize,
        totalPages: Math.ceil(filteredJobs.length / pageSize),
    };
}

const mockGetJob = async (id: string): Promise<FeJob> => {
    const job = mockJobs.find((job) => job.id === id);
    if (!job) {
        throw new Error(`Job with id ${id} not found`);
    }
    return job;
} 