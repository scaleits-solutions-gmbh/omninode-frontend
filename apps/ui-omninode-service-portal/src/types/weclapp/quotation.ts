export type FeQuotation = {
    id: string;
    number: string;
    customer: string;
    grossAmount: string;
    netAmount: string;
    status: string;
    items: FeQuotationItem[];
};

export type FeQuotationItem = {
    name: string;
    quantity: number;
    unitPrice: string;
};
