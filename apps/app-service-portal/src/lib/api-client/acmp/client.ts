import { FeClient } from "@/types/acmp/client";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const mockClients: FeClient[] = [
    {
        id: "1",
        clientNo: 1001,
        computerName: "DESKTOP-A1B2C3",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-001",
        name: "Marketing Dept PC-01",
    },
    {
        id: "2",
        clientNo: 1002,
        computerName: "LAPTOP-X1Y2Z3",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-001",
        name: "Sales Team Laptop-01",
    },
    {
        id: "3",
        clientNo: 1003,
        computerName: "WORKSTATION-DEV1",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-002",
        name: "Development Workstation-01",
    },
    {
        id: "4",
        clientNo: 1004,
        computerName: "SERVER-PROD1",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-002",
        name: "Production Server-01",
    },
    {
        id: "5",
        clientNo: 1005,
        computerName: "DESKTOP-QRS789",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-003",
        name: "HR Department PC-01",
    },
    {
        id: "6",
        clientNo: 1006,
        computerName: "LAPTOP-MNO456",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-003",
        name: "Finance Laptop-01",
    },
    {
        id: "7",
        clientNo: 1007,
        computerName: "WORKSTATION-QA1",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-004",
        name: "QA Testing Station-01",
    },
    {
        id: "8",
        clientNo: 1008,
        computerName: "SERVER-STAGE1",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-004",
        name: "Staging Server-01",
    },
    {
        id: "9",
        clientNo: 1009,
        computerName: "DESKTOP-UVW321",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-005",
        name: "Support Team PC-01",
    },
    {
        id: "10",
        clientNo: 1010,
        computerName: "LAPTOP-PQR987",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-005",
        name: "Operations Laptop-01",
    },
    {
        id: "11",
        clientNo: 1011,
        computerName: "WORKSTATION-DES1",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-006",
        name: "Design Team Station-01",
    },
    {
        id: "12",
        clientNo: 1012,
        computerName: "SERVER-BACKUP1",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-006",
        name: "Backup Server-01",
    },
    {
        id: "13",
        clientNo: 1013,
        computerName: "DESKTOP-LMN654",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-007",
        name: "Reception PC-01",
    },
    {
        id: "14",
        clientNo: 1014,
        computerName: "LAPTOP-STU123",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-007",
        name: "Mobile Sales Laptop-01",
    },
    {
        id: "15",
        clientNo: 1015,
        computerName: "WORKSTATION-3D1",
        lastUpdate: new Date().toISOString(),
        tenantId: "tenant-008",
        name: "3D Rendering Station-01",
    },
];

export const fetchAcmpClients = async (search: string, page: number, pageSize: number): Promise<PaginatedResponse<FeClient>> => {
    //wait 0.5 seconds
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockGetClients(search, page, pageSize);
};

export const fetchAcmpClient = async (id: string): Promise<FeClient> => {
    return mockGetClient(id);
}

const mockGetClients = async (search: string, page: number, pageSize: number): Promise<PaginatedResponse<FeClient>> => {
    let filteredClients = mockClients;
    
    // Apply search filter if provided
    if (search) {
        const searchLower = search.toLowerCase();
        filteredClients = mockClients.filter(client => 
            client.computerName.toLowerCase().includes(searchLower) ||
            client.name.toLowerCase().includes(searchLower) ||
            client.clientNo.toString().includes(searchLower)
        );
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredClients.slice(startIndex, endIndex);
    
    return {
        items: paginatedItems,
        total: filteredClients.length,
        page: page,
        pageSize: pageSize,
        totalPages: Math.ceil(filteredClients.length / pageSize),
    };
}

const mockGetClient = async (id: string): Promise<FeClient> => {
    const client = mockClients.find((client) => client.id === id);
    if (!client) {
        throw new Error(`Client with id ${id} not found`);
    }
    return client;
} 