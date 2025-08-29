export type FeSalesOrder = {
    id: string;
    number: string;
    customer: string;
    grossAmount: string;
    netAmount: string;
    status: string;
    items: FeSalesOrderItem[];
};

export type FeSalesOrderItem = {
    name: string;
    quantity: number;
    unitPrice: string;
};
