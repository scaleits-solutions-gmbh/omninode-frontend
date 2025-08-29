import { FeWeclappDocument } from "@/types/weclapp/document";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

export const mockProjectDocuments: FeWeclappDocument[] = [
    {
      id: "1",
      name: "Project_Plan_P-2024-001.pdf",
      documentType: "PROJECT_PLAN",
      size: 1024000,
    },
    {
      id: "2",
      name: "Requirements_Specification_P-2024-001.docx",
      documentType: "REQUIREMENTS_SPEC",
      size: 2048000,
    },
    {
      id: "3",
      name: "Technical_Design_P-2024-001.pdf",
      documentType: "TECHNICAL_DESIGN",
      size: 1536000,
    },
    {
      id: "4",
      name: "Project_Timeline_P-2024-001.xlsx",
      documentType: "TIMELINE",
      size: 512000,
    },
    {
      id: "5",
      name: "Risk_Assessment_P-2024-001.pdf",
      documentType: "RISK_ASSESSMENT",
      size: 768000,
    },
    {
      id: "6",
      name: "Project_Plan_P-2024-002.pdf",
      documentType: "PROJECT_PLAN",
      size: 1152000,
    },
    {
      id: "7",
      name: "Software_Architecture_P-2024-002.pdf",
      documentType: "ARCHITECTURE",
      size: 2560000,
    },
    {
      id: "8",
      name: "Development_Guidelines_P-2024-002.docx",
      documentType: "DEVELOPMENT_GUIDELINES",
      size: 1792000,
    },
    {
      id: "9",
      name: "Project_Plan_P-2024-003.pdf",
      documentType: "PROJECT_PLAN",
      size: 896000,
    },
    {
      id: "10",
      name: "Design_Mockups_P-2024-003.zip",
      documentType: "DESIGN_ASSETS",
      size: 4096000,
    },
    {
      id: "11",
      name: "User_Stories_P-2024-003.docx",
      documentType: "USER_STORIES",
      size: 1344000,
    },
    {
      id: "12",
      name: "Project_Plan_P-2024-004.pdf",
      documentType: "PROJECT_PLAN",
      size: 1408000,
    },
    {
      id: "13",
      name: "Cloud_Infrastructure_Plan_P-2024-004.pdf",
      documentType: "INFRASTRUCTURE_PLAN",
      size: 2304000,
    },
    {
      id: "14",
      name: "Migration_Strategy_P-2024-004.docx",
      documentType: "MIGRATION_STRATEGY",
      size: 1920000,
    },
    {
      id: "15",
      name: "Project_Plan_P-2024-005.pdf",
      documentType: "PROJECT_PLAN",
      size: 960000,
    },
    {
      id: "16",
      name: "Data_Analysis_Framework_P-2024-005.pdf",
      documentType: "ANALYSIS_FRAMEWORK",
      size: 2816000,
    },
    {
      id: "17",
      name: "Project_Plan_P-2024-006.pdf",
      documentType: "PROJECT_PLAN",
      size: 1088000,
    },
    {
      id: "18",
      name: "Mobile_App_Prototype_P-2024-006.fig",
      documentType: "PROTOTYPE",
      size: 3584000,
    },
    {
      id: "19",
      name: "Project_Plan_P-2024-007.pdf",
      documentType: "PROJECT_PLAN",
      size: 704000,
    },
    {
      id: "20",
      name: "Web_Development_Proposal_P-2024-007.docx",
      documentType: "PROPOSAL",
      size: 1664000,
    },
    {
      id: "21",
      name: "Project_Plan_P-2024-008.pdf",
      documentType: "PROJECT_PLAN",
      size: 1984000,
    },
    {
      id: "22",
      name: "AI_Implementation_Plan_P-2024-008.pdf",
      documentType: "IMPLEMENTATION_PLAN",
      size: 3072000,
    },
    {
      id: "23",
      name: "ML_Models_Specification_P-2024-008.zip",
      documentType: "ML_SPECS",
      size: 5120000,
    },
    {
      id: "24",
      name: "Project_Plan_P-2024-009.pdf",
      documentType: "PROJECT_PLAN",
      size: 1308000,
    },
    {
      id: "25",
      name: "Security_Audit_Plan_P-2024-009.pdf",
      documentType: "SECURITY_PLAN",
      size: 1920000,
    },
    {
      id: "26",
      name: "Project_Plan_P-2024-010.pdf",
      documentType: "PROJECT_PLAN",
      size: 950000,
    },
    {
      id: "27",
      name: "Network_Architecture_P-2024-010.pdf",
      documentType: "NETWORK_ARCHITECTURE",
      size: 1536000,
    },
    {
      id: "28",
      name: "Project_Plan_P-2024-011.pdf",
      documentType: "PROJECT_PLAN",
      size: 850000,
    },
    {
      id: "29",
      name: "Database_Schema_P-2024-011.sql",
      documentType: "DATABASE_SCHEMA",
      size: 1280000,
    },
    {
      id: "30",
      name: "Project_Plan_P-2024-012.pdf",
      documentType: "PROJECT_PLAN",
      size: 1400000,
    },
    {
      id: "31",
      name: "DevOps_Pipeline_Design_P-2024-012.yaml",
      documentType: "PIPELINE_DESIGN",
      size: 2048000,
    },
    {
      id: "32",
      name: "Project_Plan_P-2024-013.pdf",
      documentType: "PROJECT_PLAN",
      size: 600000,
    },
    {
      id: "33",
      name: "Testing_Strategy_P-2024-013.pdf",
      documentType: "TESTING_STRATEGY",
      size: 896000,
    },
    {
      id: "34",
      name: "Project_Plan_P-2024-014.pdf",
      documentType: "PROJECT_PLAN",
      size: 1000000,
    },
    {
      id: "35",
      name: "API_Specification_P-2024-014.yaml",
      documentType: "API_SPEC",
      size: 1344000,
    },
    {
      id: "36",
      name: "Project_Plan_P-2024-015.pdf",
      documentType: "PROJECT_PLAN",
      size: 1600000,
    },
    {
      id: "37",
      name: "Microservices_Architecture_P-2024-015.pdf",
      documentType: "MICROSERVICES_ARCH",
      size: 2560000,
    },
    {
      id: "38",
      name: "Project_Plan_P-2024-016.pdf",
      documentType: "PROJECT_PLAN",
      size: 1800000,
    },
    {
      id: "39",
      name: "Blockchain_Implementation_P-2024-016.pdf",
      documentType: "BLOCKCHAIN_IMPLEMENTATION",
      size: 3072000,
    },
    {
      id: "40",
      name: "Project_Plan_P-2024-017.pdf",
      documentType: "PROJECT_PLAN",
      size: 1200000,
    },
    {
      id: "41",
      name: "IoT_Architecture_P-2024-017.pdf",
      documentType: "IoT_ARCHITECTURE",
      size: 2304000,
    },
    {
      id: "42",
      name: "Project_Plan_P-2024-018.pdf",
      documentType: "PROJECT_PLAN",
      size: 2200000,
    },
    {
      id: "43",
      name: "ML_Model_Design_P-2024-018.pdf",
      documentType: "ML_MODEL_DESIGN",
      size: 3584000,
    },
    {
      id: "44",
      name: "Project_Plan_P-2024-019.pdf",
      documentType: "PROJECT_PLAN",
      size: 1700000,
    },
    {
      id: "45",
      name: "Big_Data_Architecture_P-2024-019.pdf",
      documentType: "BIG_DATA_ARCH",
      size: 2816000,
    },
    {
      id: "46",
      name: "Project_Plan_P-2024-020.pdf",
      documentType: "PROJECT_PLAN",
      size: 1300000,
    },
    {
      id: "47",
      name: "Cloud_Native_Design_P-2024-020.pdf",
      documentType: "CLOUD_NATIVE_DESIGN",
      size: 2048000,
    },
    {
      id: "48",
      name: "Project_Plan_P-2024-021.pdf",
      documentType: "PROJECT_PLAN",
      size: 1100000,
    },
    {
      id: "49",
      name: "Serverless_Architecture_P-2024-021.pdf",
      documentType: "SERVERLESS_ARCH",
      size: 1792000,
    },
    {
      id: "50",
      name: "Project_Plan_P-2024-022.pdf",
      documentType: "PROJECT_PLAN",
      size: 900000,
    },
    {
      id: "51",
      name: "Container_Strategy_P-2024-022.pdf",
      documentType: "CONTAINER_STRATEGY",
      size: 1536000,
    },
    {
      id: "52",
      name: "Project_Plan_P-2024-023.pdf",
      documentType: "PROJECT_PLAN",
      size: 800000,
    },
    {
      id: "53",
      name: "Monitoring_Strategy_P-2024-023.pdf",
      documentType: "MONITORING_STRATEGY",
      size: 1280000,
    },
    {
      id: "54",
      name: "Project_Plan_P-2024-024.pdf",
      documentType: "PROJECT_PLAN",
      size: 700000,
    },
    {
      id: "55",
      name: "Backup_Strategy_P-2024-024.pdf",
      documentType: "BACKUP_STRATEGY",
      size: 1024000,
    },
    {
      id: "56",
      name: "Project_Plan_P-2024-025.pdf",
      documentType: "PROJECT_PLAN",
      size: 1500000,
    },
    {
      id: "57",
      name: "DR_Strategy_P-2024-025.pdf",
      documentType: "DR_STRATEGY",
      size: 2304000,
    },
    {
      id: "58",
      name: "Project_Plan_P-2024-026.pdf",
      documentType: "PROJECT_PLAN",
      size: 1000000,
    },
    {
      id: "59",
      name: "Compliance_Framework_P-2024-026.pdf",
      documentType: "COMPLIANCE_FRAMEWORK",
      size: 1792000,
    },
    {
      id: "60",
      name: "Project_Plan_P-2024-027.pdf",
      documentType: "PROJECT_PLAN",
      size: 1200000,
    },
    {
      id: "61",
      name: "Performance_Optimization_Plan_P-2024-027.pdf",
      documentType: "PERFORMANCE_PLAN",
      size: 2048000,
    },
    {
      id: "62",
      name: "Project_Plan_P-2024-028.pdf",
      documentType: "PROJECT_PLAN",
      size: 1400000,
    },
    {
      id: "63",
      name: "Scalability_Strategy_P-2024-028.pdf",
      documentType: "SCALABILITY_STRATEGY",
      size: 2560000,
    },
  ];

  export const mockGetProjectDocuments = async (
    projectId: string,
    searchText: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<FeWeclappDocument>> => {
    // Filter documents based on search text
    let filteredDocuments = mockProjectDocuments;
  
    if (searchText && searchText.trim() !== "") {
      const searchLower = searchText.toLowerCase().trim();
      filteredDocuments = mockProjectDocuments.filter((document) => {
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
  