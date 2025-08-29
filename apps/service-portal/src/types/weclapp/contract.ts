export type FeContract = {
    id: string;
    number: string;
    customer: string;
    status: string;
    startDate: string;
    endDate: string;
    latestCancellationWarningQuantity: number;
    latestCancellationWarningUnit: string;
    items: FeContractItem[];
}

export type FeContractItem = {
    name: string;
    quantity: number;
    unitPrice: string;
};