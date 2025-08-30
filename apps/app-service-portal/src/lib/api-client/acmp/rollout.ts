import { FeRollout } from "@/types/acmp/rollout";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const mockRollouts: FeRollout[] = [
    {
        id: "1",
        name: "Windows 11 Enterprise",
        description: "Standard Windows 11 Enterprise deployment",
        osEdition: "Windows 11 Enterprise",
        language: "en-US",
    },
    {
        id: "2",
        name: "Windows 10 Pro",
        description: "Windows 10 Pro with security updates",
        osEdition: "Windows 10 Pro",
        language: "en-US",
    },
    {
        id: "3",
        name: "Windows 11 Pro",
        description: "Windows 11 Pro with development tools",
        osEdition: "Windows 11 Pro",
        language: "en-US",
    },
    {
        id: "4",
        name: "Windows 10 Enterprise LTSC",
        description: "Long-term servicing channel deployment",
        osEdition: "Windows 10 Enterprise LTSC",
        language: "en-US",
    },
    {
        id: "5",
        name: "Windows 11 Education",
        description: "Educational institution deployment",
        osEdition: "Windows 11 Education",
        language: "en-US",
    },
    {
        id: "6",
        name: "Windows 10 Enterprise",
        description: "Standard enterprise deployment",
        osEdition: "Windows 10 Enterprise",
        language: "de-DE",
    },
    {
        id: "7",
        name: "Windows 11 Pro Education",
        description: "Professional education deployment",
        osEdition: "Windows 11 Pro Education",
        language: "en-GB",
    },
    {
        id: "8",
        name: "Windows 10 Pro Education",
        description: "Professional education setup",
        osEdition: "Windows 10 Pro Education",
        language: "fr-FR",
    },
    {
        id: "9",
        name: "Windows 11 Enterprise German",
        description: "German localized enterprise deployment",
        osEdition: "Windows 11 Enterprise",
        language: "de-DE",
    },
    {
        id: "10",
        name: "Windows 10 Pro French",
        description: "French localized professional deployment",
        osEdition: "Windows 10 Pro",
        language: "fr-FR",
    },
    {
        id: "11",
        name: "Windows 11 Pro German",
        description: "German localized professional deployment",
        osEdition: "Windows 11 Pro",
        language: "de-DE",
    },
    {
        id: "12",
        name: "Windows 10 Enterprise French",
        description: "French localized enterprise deployment",
        osEdition: "Windows 10 Enterprise",
        language: "fr-FR",
    },
    {
        id: "13",
        name: "Windows 11 Education German",
        description: "German localized education deployment",
        osEdition: "Windows 11 Education",
        language: "de-DE",
    },
    {
        id: "14",
        name: "Windows 10 Education French",
        description: "French localized education deployment",
        osEdition: "Windows 10 Education",
        language: "fr-FR",
    },
    {
        id: "15",
        name: "Windows 11 LTSC",
        description: "Latest long-term servicing channel",
        osEdition: "Windows 11 Enterprise LTSC",
        language: "en-US",
    },
];

export const fetchAcmpRollouts = async (search: string, page: number, pageSize: number): Promise<PaginatedResponse<FeRollout>> => {
    //wait 0.5 seconds
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockGetRollouts(search, page, pageSize);
};

export const fetchAcmpRollout = async (id: string): Promise<FeRollout> => {
    return mockGetRollout(id);
}

const mockGetRollouts = async (search: string, page: number, pageSize: number): Promise<PaginatedResponse<FeRollout>> => {
    let filteredRollouts = mockRollouts;
    
    // Apply search filter if provided
    if (search) {
        const searchLower = search.toLowerCase();
        filteredRollouts = mockRollouts.filter(rollout => 
            rollout.name.toLowerCase().includes(searchLower) ||
            rollout.description.toLowerCase().includes(searchLower) ||
            rollout.osEdition.toLowerCase().includes(searchLower) ||
            rollout.language.toLowerCase().includes(searchLower)
        );
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredRollouts.slice(startIndex, endIndex);
    
    return {
        items: paginatedItems,
        total: filteredRollouts.length,
        page: page,
        pageSize: pageSize,
        totalPages: Math.ceil(filteredRollouts.length / pageSize),
    };
}

const mockGetRollout = async (id: string): Promise<FeRollout> => {
    const rollout = mockRollouts.find((rollout) => rollout.id === id);
    if (!rollout) {
        throw new Error(`Rollout with id ${id} not found`);
    }
    return rollout;
} 