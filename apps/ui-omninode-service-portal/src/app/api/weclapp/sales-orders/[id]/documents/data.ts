import { FeWeclappDocument } from "@/types/weclapp/document";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const mockSalesOrderDocuments: FeWeclappDocument[] = [
    {
      id: "25",
      name: "SalesOrder_SO-2025-013.pdf",
      documentType: "SALES_ORDER",
      size: 1520040,
    },
    {
      id: "26",
      name: "SOW_SO-2025-013.docx",
      documentType: "SOW",
      size: 2223195,
    },
    {
      id: "27",
      name: "SalesOrder_SO-2025-014.pdf",
      documentType: "SALES_ORDER",
      size: 1478111,
    },
    {
      id: "28",
      name: "SOW_SO-2025-014.docx",
      documentType: "SOW",
      size: 1984123,
    },
    {
      id: "29",
      name: "SalesOrder_SO-2025-015.pdf",
      documentType: "SALES_ORDER",
      size: 1736104,
    },
    {
      id: "30",
      name: "SOW_SO-2025-015.docx",
      documentType: "SOW",
      size: 1679002,
    },
    {
      id: "31",
      name: "SalesOrder_SO-2025-016.pdf",
      documentType: "SALES_ORDER",
      size: 1614222,
    },
    {
      id: "32",
      name: "SOW_SO-2025-016.docx",
      documentType: "SOW",
      size: 2127777,
    },
    {
      id: "33",
      name: "SalesOrder_SO-2025-017.pdf",
      documentType: "SALES_ORDER",
      size: 1389110,
    },
    {
      id: "34",
      name: "SOW_SO-2025-017.docx",
      documentType: "SOW",
      size: 2198458,
    },
    {
      id: "35",
      name: "SalesOrder_SO-2025-018.pdf",
      documentType: "SALES_ORDER",
      size: 1900444,
    },
    {
      id: "36",
      name: "SOW_SO-2025-018.docx",
      documentType: "SOW",
      size: 1453200,
    },
    {
      id: "37",
      name: "SalesOrder_SO-2025-019.pdf",
      documentType: "SALES_ORDER",
      size: 1267540,
    },
    {
      id: "38",
      name: "SOW_SO-2025-019.docx",
      documentType: "SOW",
      size: 1745632,
    },
    {
      id: "39",
      name: "SalesOrder_SO-2025-020.pdf",
      documentType: "SALES_ORDER",
      size: 1548866,
    },
    {
      id: "40",
      name: "SOW_SO-2025-020.docx",
      documentType: "SOW",
      size: 1638899,
    },
    {
      id: "41",
      name: "SalesOrder_SO-2025-021.pdf",
      documentType: "SALES_ORDER",
      size: 1814477,
    },
    {
      id: "42",
      name: "SOW_SO-2025-021.docx",
      documentType: "SOW",
      size: 1572003,
    },
    {
      id: "43",
      name: "SalesOrder_SO-2025-022.pdf",
      documentType: "SALES_ORDER",
      size: 1497229,
    },
    {
      id: "44",
      name: "SOW_SO-2025-022.docx",
      documentType: "SOW",
      size: 2097711,
    },
    {
      id: "45",
      name: "SalesOrder_SO-2025-023.pdf",
      documentType: "SALES_ORDER",
      size: 1420310,
    },
    {
      id: "46",
      name: "SOW_SO-2025-023.docx",
      documentType: "SOW",
      size: 1687599,
    },
    {
      id: "47",
      name: "SalesOrder_SO-2025-024.pdf",
      documentType: "SALES_ORDER",
      size: 1956033,
    },
    {
      id: "48",
      name: "SOW_SO-2025-024.docx",
      documentType: "SOW",
      size: 1831018,
    },
  ] as const;

  export const mockGetSalesOrderDocuments = async (
    salesOrderId: string,
    searchText: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<FeWeclappDocument>> => {
    // Filter documents based on search text
    let filteredDocuments = mockSalesOrderDocuments;
  
    if (searchText && searchText.trim() !== "") {
      const searchLower = searchText.toLowerCase().trim();
      filteredDocuments = mockSalesOrderDocuments.filter((document) => {
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
  