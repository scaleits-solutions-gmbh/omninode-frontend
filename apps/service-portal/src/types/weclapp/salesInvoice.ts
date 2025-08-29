export type FeSalesInvoice = {
    id: string;
    number: string;
    customer: string;
    grossAmount: string;
    netAmount: string;
    status: string;
    items: FeSalesInvoiceItem[];
};

export type FeSalesInvoiceItem = {
    name: string;
    quantity: number;
    unitPrice: string;
};
