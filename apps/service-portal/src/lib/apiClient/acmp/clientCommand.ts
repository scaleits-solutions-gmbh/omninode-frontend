import { FeClientCommand } from "@/types/acmp/clientCommand";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const mockCommands: FeClientCommand[] = [
    {
        id: "1",
        name: "Update Software",
        version: 1,
    },
    {
        id: "2",
        name: "Restart Service",
        version: 2,
    },
    {
        id: "3",
        name: "Run Diagnostics",
        version: 1,
    },
    {
        id: "4",
        name: "Clear Cache",
        version: 3,
    },
    {
        id: "5",
        name: "Sync Data",
        version: 2,
    },
    {
        id: "6",
        name: "Backup System",
        version: 1,
    },
    {
        id: "7",
        name: "Check Security",
        version: 4,
    },
    {
        id: "8",
        name: "Optimize Performance",
        version: 2,
    },
    {
        id: "9",
        name: "Update Configuration",
        version: 3,
    },
    {
        id: "10",
        name: "Generate Report",
        version: 1,
    },
    {
        id: "11",
        name: "Clean Temporary Files",
        version: 2,
    },
    {
        id: "12",
        name: "Verify Integrity",
        version: 1,
    },
    {
        id: "13",
        name: "Reset Settings",
        version: 2,
    },
    {
        id: "14",
        name: "Update Drivers",
        version: 3,
    },
    {
        id: "15",
        name: "Check Network",
        version: 1,
    },
];

export const fetchAcmpCommands = async (search: string, page: number, pageSize: number): Promise<PaginatedResponse<FeClientCommand>> => {
    //wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockGetCommands(search, page, pageSize);
};

export const fetchAcmpCommand = async (id: string): Promise<FeClientCommand> => {
    return mockGetCommand(id);
}

const mockGetCommands = async (search: string, page: number, pageSize: number): Promise<PaginatedResponse<FeClientCommand>> => {
    let filteredCommands = mockCommands;
    
    // Apply search filter if provided
    if (search) {
        const searchLower = search.toLowerCase();
        filteredCommands = mockCommands.filter(command => 
            command.name.toLowerCase().includes(searchLower) ||
            command.version.toString().includes(searchLower)
        );
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredCommands.slice(startIndex, endIndex);
    
    return {
        items: paginatedItems,
        total: filteredCommands.length,
        page: page,
        pageSize: pageSize,
        totalPages: Math.ceil(filteredCommands.length / pageSize),
    };
}

const mockGetCommand = async (id: string): Promise<FeClientCommand> => {
    const command = mockCommands.find((command) => command.id === id);
    if (!command) {
        throw new Error(`Command with id ${id} not found`);
    }
    return command;
} 