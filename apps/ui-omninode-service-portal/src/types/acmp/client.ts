export type FeClient = {
    id: string;
    clientNo: number;
    computerName: string;
    lastUpdate: string;
    tenantId: string;
    name: string;
}

export type FeClientActivity = {
    activeDevices: number;
    inactiveDevices: number;
}