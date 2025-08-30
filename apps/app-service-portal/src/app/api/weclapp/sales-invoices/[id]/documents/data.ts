import { FeWeclappDocument } from "@/types/weclapp/document";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const mockSalesInvoiceDocuments: FeWeclappDocument[] = [
    {
      id: "1",
      name: "SalesInvoice_SI-2025-001.pdf",
      documentType: "SALES_INVOICE",
      size: 1813192,
    },
    {
      id: "2",
      name: "Statement_of_Work_SI-2025-001.docx",
      documentType: "SOW",
      size: 2481679,
    },
    {
      id: "3",
      name: "SalesInvoice_SI-2025-002.pdf",
      documentType: "SALES_INVOICE",
      size: 1145273,
    },
    {
      id: "4",
      name: "Statement_of_Work_SI-2025-002.docx",
      documentType: "SOW",
      size: 2014990,
    },
    {
      id: "5",
      name: "SalesInvoice_SI-2025-003.pdf",
      documentType: "SALES_INVOICE",
      size: 1478221,
    },
    {
      id: "6",
      name: "Statement_of_Work_SI-2025-003.docx",
      documentType: "SOW",
      size: 986114,
    },
    {
      id: "7",
      name: "SalesInvoice_SI-2025-004.pdf",
      documentType: "SALES_INVOICE",
      size: 1614400,
    },
    {
      id: "8",
      name: "Statement_of_Work_SI-2025-004.docx",
      documentType: "SOW",
      size: 2026143,
    },
    {
      id: "9",
      name: "SalesInvoice_SI-2025-005.pdf",
      documentType: "SALES_INVOICE",
      size: 1927466,
    },
    {
      id: "10",
      name: "Statement_of_Work_SI-2025-005.docx",
      documentType: "SOW",
      size: 1412055,
    },
    {
      id: "11",
      name: "SalesInvoice_SI-2025-006.pdf",
      documentType: "SALES_INVOICE",
      size: 1091446,
    },
    {
      id: "12",
      name: "Statement_of_Work_SI-2025-006.docx",
      documentType: "SOW",
      size: 2276184,
    },
    {
      id: "13",
      name: "SalesInvoice_SI-2025-007.pdf",
      documentType: "SALES_INVOICE",
      size: 926518,
    },
    {
      id: "14",
      name: "Statement_of_Work_SI-2025-007.docx",
      documentType: "SOW",
      size: 1638009,
    },
    {
      id: "15",
      name: "SalesInvoice_SI-2025-008.pdf",
      documentType: "SALES_INVOICE",
      size: 1967813,
    },
    {
      id: "16",
      name: "Statement_of_Work_SI-2025-008.docx",
      documentType: "SOW",
      size: 1200771,
    },
    {
      id: "17",
      name: "SalesInvoice_SI-2025-009.pdf",
      documentType: "SALES_INVOICE",
      size: 1336406,
    },
    {
      id: "18",
      name: "Statement_of_Work_SI-2025-009.docx",
      documentType: "SOW",
      size: 2259079,
    },
    {
      id: "19",
      name: "SalesInvoice_SI-2025-010.pdf",
      documentType: "SALES_INVOICE",
      size: 1185635,
    },
    {
      id: "20",
      name: "Statement_of_Work_SI-2025-010.docx",
      documentType: "SOW",
      size: 1605882,
    },
    {
      id: "21",
      name: "SalesInvoice_SI-2025-011.pdf",
      documentType: "SALES_INVOICE",
      size: 1534819,
    },
    {
      id: "22",
      name: "Statement_of_Work_SI-2025-011.docx",
      documentType: "SOW",
      size: 1794410,
    },
    {
      id: "23",
      name: "SalesInvoice_SI-2025-012.pdf",
      documentType: "SALES_INVOICE",
      size: 847221,
    },
    {
      id: "24",
      name: "Statement_of_Work_SI-2025-012.docx",
      documentType: "SOW",
      size: 2045666,
    },
  ] as const;

export const mockGetSalesInvoiceDocuments = async (
    salesInvoiceId: string,
    searchText: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<FeWeclappDocument>> => {
    // Filter documents based on search text
    let filteredDocuments = mockSalesInvoiceDocuments;
  
    if (searchText && searchText.trim() !== "") {
      const searchLower = searchText.toLowerCase().trim();
      filteredDocuments = mockSalesInvoiceDocuments.filter((document) => {
        return (
          document.name.toLowerCase().includes(searchLower) ||
          document.documentType.toLowerCase().includes(searchLower) ||
          document.size.toString().includes(searchLower)
        );
      });
    }
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredDocuments.slice(startIndex, endIndex);
  
    return {
      items: paginatedItems,
      total: filteredDocuments.length,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(filteredDocuments.length / pageSize),
    };
  };
  