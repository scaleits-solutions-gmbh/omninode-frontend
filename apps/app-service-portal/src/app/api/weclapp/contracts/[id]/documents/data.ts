import { FeWeclappDocument } from "@/types/weclapp/document";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

export const mockContractDocuments: FeWeclappDocument[] = [
  {
    id: "1",
    name: "Contract_C-2024-001.pdf",
    documentType: "CONTRACT",
    size: 1024000,
  },
  {
    id: "2",
    name: "Service_Agreement_C-2024-001.pdf",
    documentType: "SERVICE_AGREEMENT",
    size: 2048000,
  },
  {
    id: "3",
    name: "Terms_and_Conditions_C-2024-001.pdf",
    documentType: "LEGAL",
    size: 768000,
  },
  {
    id: "4",
    name: "Scope_of_Services_C-2024-001.docx",
    documentType: "SCOPE_DOCUMENT",
    size: 1280000,
  },
  {
    id: "5",
    name: "Payment_Schedule_C-2024-001.xlsx",
    documentType: "PAYMENT_SCHEDULE",
    size: 512000,
  },
  {
    id: "6",
    name: "Contract_C-2024-002.pdf",
    documentType: "CONTRACT",
    size: 1152000,
  },
  {
    id: "7",
    name: "Technical_Specifications_C-2024-002.pdf",
    documentType: "TECHNICAL_SPEC",
    size: 2560000,
  },
  {
    id: "8",
    name: "Development_Agreement_C-2024-002.pdf",
    documentType: "DEVELOPMENT_AGREEMENT",
    size: 1792000,
  },
  {
    id: "9",
    name: "Contract_C-2024-003.pdf",
    documentType: "CONTRACT",
    size: 896000,
  },
  {
    id: "10",
    name: "Design_Contract_C-2024-003.pdf",
    documentType: "DESIGN_CONTRACT",
    size: 1344000,
  },
  {
    id: "11",
    name: "Contract_C-2024-004.pdf",
    documentType: "CONTRACT",
    size: 1408000,
  },
  {
    id: "12",
    name: "Cloud_Migration_Contract_C-2024-004.pdf",
    documentType: "MIGRATION_CONTRACT",
    size: 2304000,
  },
  {
    id: "13",
    name: "Contract_C-2024-005.pdf",
    documentType: "CONTRACT",
    size: 960000,
  },
  {
    id: "14",
    name: "Data_Analytics_Agreement_C-2024-005.pdf",
    documentType: "ANALYTICS_AGREEMENT",
    size: 2816000,
  },
  {
    id: "15",
    name: "Contract_C-2024-006.pdf",
    documentType: "CONTRACT",
    size: 1088000,
  },
  {
    id: "16",
    name: "Mobile_Development_Contract_C-2024-006.pdf",
    documentType: "MOBILE_CONTRACT",
    size: 3584000,
  },
  {
    id: "17",
    name: "Contract_C-2024-007.pdf",
    documentType: "CONTRACT",
    size: 704000,
  },
  {
    id: "18",
    name: "Web_Development_Contract_C-2024-007.pdf",
    documentType: "WEB_CONTRACT",
    size: 1664000,
  },
  {
    id: "19",
    name: "Contract_C-2024-008.pdf",
    documentType: "CONTRACT",
    size: 1984000,
  },
  {
    id: "20",
    name: "AI_Implementation_Contract_C-2024-008.pdf",
    documentType: "AI_CONTRACT",
    size: 3072000,
  },
  {
    id: "21",
    name: "Contract_C-2024-009.pdf",
    documentType: "CONTRACT",
    size: 1308000,
  },
  {
    id: "22",
    name: "Security_Contract_C-2024-009.pdf",
    documentType: "SECURITY_CONTRACT",
    size: 1920000,
  },
  {
    id: "23",
    name: "Contract_C-2024-010.pdf",
    documentType: "CONTRACT",
    size: 950000,
  },
  {
    id: "24",
    name: "Network_Contract_C-2024-010.pdf",
    documentType: "NETWORK_CONTRACT",
    size: 1536000,
  },
];

export const mockGetContractDocuments = async (
    contractId: string,
    searchText: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<FeWeclappDocument>> => {
    // Filter documents based on search text
    let filteredDocuments = mockContractDocuments;
  
    if (searchText && searchText.trim() !== "") {
      const searchLower = searchText.toLowerCase().trim();
      filteredDocuments = mockContractDocuments.filter((document) => {
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
  