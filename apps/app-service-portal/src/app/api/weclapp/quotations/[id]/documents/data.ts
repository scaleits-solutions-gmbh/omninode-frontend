import { FeWeclappDocument } from "@/types/weclapp/document";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const mockQuotationDocuments: FeWeclappDocument[] = [
  {
    id: "1",
    name: "Quotation_Q-2024-001.pdf",
    documentType: "QUOTATION",
    size: 1024000,
  },
  {
    id: "2",
    name: "Technical_Specifications_Q-2024-001.docx",
    documentType: "TECHNICAL_SPEC",
    size: 2048000,
  },
  {
    id: "3",
    name: "Project_Timeline_Q-2024-001.xlsx",
    documentType: "TIMELINE",
    size: 512000,
  },
  {
    id: "4",
    name: "Cost_Breakdown_Q-2024-001.pdf",
    documentType: "COST_ANALYSIS",
    size: 1536000,
  },
  {
    id: "5",
    name: "Terms_and_Conditions_Q-2024-001.pdf",
    documentType: "LEGAL",
    size: 768000,
  },
  {
    id: "6",
    name: "Scope_of_Work_Q-2024-001.docx",
    documentType: "SCOPE_DOCUMENT",
    size: 1280000,
  },
  {
    id: "7",
    name: "Quotation_Q-2024-002.pdf",
    documentType: "QUOTATION",
    size: 1152000,
  },
  {
    id: "8",
    name: "Software_Architecture_Q-2024-002.pdf",
    documentType: "ARCHITECTURE",
    size: 2560000,
  },
  {
    id: "9",
    name: "Development_Plan_Q-2024-002.docx",
    documentType: "DEVELOPMENT_PLAN",
    size: 1792000,
  },
  {
    id: "10",
    name: "Quotation_Q-2024-003.pdf",
    documentType: "QUOTATION",
    size: 896000,
  },
  {
    id: "11",
    name: "Design_Mockups_Q-2024-003.zip",
    documentType: "DESIGN_ASSETS",
    size: 4096000,
  },
  {
    id: "12",
    name: "User_Experience_Guide_Q-2024-003.pdf",
    documentType: "UX_GUIDE",
    size: 1344000,
  },
  {
    id: "13",
    name: "Quotation_Q-2024-004.pdf",
    documentType: "QUOTATION",
    size: 1408000,
  },
  {
    id: "14",
    name: "Migration_Strategy_Q-2024-004.docx",
    documentType: "MIGRATION_PLAN",
    size: 2304000,
  },
  {
    id: "15",
    name: "Cloud_Infrastructure_Q-2024-004.pdf",
    documentType: "INFRASTRUCTURE",
    size: 1920000,
  },
  {
    id: "16",
    name: "Quotation_Q-2024-005.pdf",
    documentType: "QUOTATION",
    size: 960000,
  },
  {
    id: "17",
    name: "Data_Analysis_Report_Q-2024-005.xlsx",
    documentType: "ANALYSIS_REPORT",
    size: 2816000,
  },
  {
    id: "18",
    name: "Quotation_Q-2024-006.pdf",
    documentType: "QUOTATION",
    size: 1088000,
  },
  {
    id: "19",
    name: "Mobile_App_Prototype_Q-2024-006.fig",
    documentType: "PROTOTYPE",
    size: 3584000,
  },
  {
    id: "20",
    name: "Quotation_Q-2024-007.pdf",
    documentType: "QUOTATION",
    size: 704000,
  },
  {
    id: "21",
    name: "Web_Development_Proposal_Q-2024-007.docx",
    documentType: "PROPOSAL",
    size: 1664000,
  },
  {
    id: "22",
    name: "Quotation_Q-2024-008.pdf",
    documentType: "QUOTATION",
    size: 1984000,
  },
  {
    id: "23",
    name: "AI_Implementation_Plan_Q-2024-008.pdf",
    documentType: "IMPLEMENTATION_PLAN",
    size: 3072000,
  },
  {
    id: "24",
    name: "Machine_Learning_Models_Q-2024-008.zip",
    documentType: "ML_MODELS",
    size: 5120000,
  },
];

export const mockGetQuotationDocuments = async (
  quotationId: string,
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeWeclappDocument>> => {
  // Filter documents based on search text
  let filteredDocuments = mockQuotationDocuments;

  if (searchText && searchText.trim() !== "") {
    const searchLower = searchText.toLowerCase().trim();
    filteredDocuments = mockQuotationDocuments.filter((document) => {
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
