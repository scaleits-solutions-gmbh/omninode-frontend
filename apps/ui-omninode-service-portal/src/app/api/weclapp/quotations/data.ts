import { FeQuotation } from "@/types/weclapp/quotation";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

export const mockQuotations: FeQuotation[] = [
  {
    id: "1",
    number: "Q-2024-001",
    customer: "Edler & Stiegler Consulting GmbH",
    grossAmount: "600",
    netAmount: "550",
    status: "active",
    items: [
      { name: "Strategic Consulting", quantity: 12, unitPrice: "50" },
      { name: "Business Process Analysis", quantity: 8, unitPrice: "45" },
      { name: "Technology Assessment", quantity: 6, unitPrice: "55" },
      { name: "Digital Transformation Planning", quantity: 10, unitPrice: "60" },
      { name: "Change Management", quantity: 15, unitPrice: "40" },
      { name: "Project Management", quantity: 20, unitPrice: "50" },
      { name: "Risk Assessment", quantity: 5, unitPrice: "65" },
      { name: "Compliance Review", quantity: 8, unitPrice: "55" },
      { name: "Performance Optimization", quantity: 12, unitPrice: "45" },
      { name: "Team Training", quantity: 16, unitPrice: "35" },
      { name: "System Integration", quantity: 14, unitPrice: "50" },
      { name: "Data Migration", quantity: 10, unitPrice: "55" },
      { name: "Security Audit", quantity: 6, unitPrice: "70" },
      { name: "Backup Strategy", quantity: 4, unitPrice: "45" },
      { name: "Disaster Recovery Planning", quantity: 8, unitPrice: "60" },
      { name: "Cloud Migration Support", quantity: 12, unitPrice: "50" },
      { name: "API Development", quantity: 18, unitPrice: "45" },
      { name: "Database Optimization", quantity: 10, unitPrice: "55" },
      { name: "Monitoring Setup", quantity: 6, unitPrice: "40" },
      { name: "Documentation", quantity: 8, unitPrice: "35" },
      { name: "Quality Assurance", quantity: 12, unitPrice: "40" },
      { name: "User Acceptance Testing", quantity: 10, unitPrice: "45" },
      { name: "Go-Live Support", quantity: 6, unitPrice: "60" },
      { name: "Post-Implementation Review", quantity: 4, unitPrice: "50" }
    ],
  },
  {
    id: "2",
    number: "Q-2024-002",
    customer: "Tech Solutions AG",
    grossAmount: "1200",
    netAmount: "1100",
    status: "active",
    items: [{ name: "Software Development", quantity: 20, unitPrice: "60" }],
  },
  {
    id: "3",
    number: "Q-2024-003",
    customer: "Digital Innovations GmbH",
    grossAmount: "800",
    netAmount: "750",
    status: "active",
    items: [{ name: "UI/UX Design", quantity: 16, unitPrice: "50" }],
  },
  {
    id: "4",
    number: "Q-2024-004",
    customer: "Cloud Systems Ltd",
    grossAmount: "1500",
    netAmount: "1400",
    status: "active",
    items: [{ name: "Cloud Migration", quantity: 25, unitPrice: "60" }],
  },
  {
    id: "5",
    number: "Q-2024-005",
    customer: "Data Analytics Corp",
    grossAmount: "900",
    netAmount: "850",
    status: "active",
    items: [{ name: "Data Analysis", quantity: 18, unitPrice: "50" }],
  },
  {
    id: "6",
    number: "Q-2024-006",
    customer: "Mobile Apps GmbH",
    grossAmount: "1100",
    netAmount: "1000",
    status: "active",
    items: [{ name: "Mobile Development", quantity: 22, unitPrice: "50" }],
  },
  {
    id: "7",
    number: "Q-2024-007",
    customer: "Web Solutions AG",
    grossAmount: "700",
    netAmount: "650",
    status: "active",
    items: [{ name: "Web Development", quantity: 14, unitPrice: "50" }],
  },
  {
    id: "8",
    number: "Q-2024-008",
    customer: "AI Technologies Ltd",
    grossAmount: "2000",
    netAmount: "1850",
    status: "active",
    items: [{ name: "AI Implementation", quantity: 40, unitPrice: "50" }],
  },
  {
    id: "9",
    number: "Q-2024-009",
    customer: "Security Systems GmbH",
    grossAmount: "1300",
    netAmount: "1200",
    status: "active",
    items: [{ name: "Security Audit", quantity: 26, unitPrice: "50" }],
  },
  {
    id: "10",
    number: "Q-2024-010",
    customer: "Network Solutions AG",
    grossAmount: "950",
    netAmount: "900",
    status: "active",
    items: [{ name: "Network Setup", quantity: 19, unitPrice: "50" }],
  },
  {
    id: "11",
    number: "Q-2024-011",
    customer: "Database Experts GmbH",
    grossAmount: "850",
    netAmount: "800",
    status: "active",
    items: [{ name: "Database Optimization", quantity: 17, unitPrice: "50" }],
  },
  {
    id: "12",
    number: "Q-2024-012",
    customer: "DevOps Solutions Ltd",
    grossAmount: "1400",
    netAmount: "1300",
    status: "active",
    items: [{ name: "DevOps Implementation", quantity: 28, unitPrice: "50" }],
  },
  {
    id: "13",
    number: "Q-2024-013",
    customer: "Testing Services AG",
    grossAmount: "600",
    netAmount: "550",
    status: "active",
    items: [{ name: "Quality Assurance", quantity: 12, unitPrice: "50" }],
  },
  {
    id: "14",
    number: "Q-2024-014",
    customer: "API Development GmbH",
    grossAmount: "1000",
    netAmount: "950",
    status: "active",
    items: [{ name: "API Development", quantity: 20, unitPrice: "50" }],
  },
  {
    id: "15",
    number: "Q-2024-015",
    customer: "Microservices Corp",
    grossAmount: "1600",
    netAmount: "1500",
    status: "active",
    items: [
      { name: "Microservices Architecture", quantity: 32, unitPrice: "50" },
    ],
  },
  {
    id: "16",
    number: "Q-2024-016",
    customer: "Blockchain Solutions AG",
    grossAmount: "1800",
    netAmount: "1700",
    status: "active",
    items: [
      { name: "Blockchain Implementation", quantity: 36, unitPrice: "50" },
    ],
  },
  {
    id: "17",
    number: "Q-2024-017",
    customer: "IoT Services GmbH",
    grossAmount: "1200",
    netAmount: "1100",
    status: "active",
    items: [{ name: "IoT Integration", quantity: 24, unitPrice: "50" }],
  },
  {
    id: "18",
    number: "Q-2024-018",
    customer: "Machine Learning Corp",
    grossAmount: "2200",
    netAmount: "2050",
    status: "active",
    items: [{ name: "ML Model Development", quantity: 44, unitPrice: "50" }],
  },
  {
    id: "19",
    number: "Q-2024-019",
    customer: "Big Data Solutions AG",
    grossAmount: "1700",
    netAmount: "1600",
    status: "active",
    items: [{ name: "Big Data Processing", quantity: 34, unitPrice: "50" }],
  },
  {
    id: "20",
    number: "Q-2024-020",
    customer: "Cloud Native GmbH",
    grossAmount: "1300",
    netAmount: "1200",
    status: "active",
    items: [
      { name: "Cloud Native Development", quantity: 26, unitPrice: "50" },
    ],
  },
  {
    id: "21",
    number: "Q-2024-021",
    customer: "Serverless Solutions Ltd",
    grossAmount: "1100",
    netAmount: "1000",
    status: "active",
    items: [{ name: "Serverless Architecture", quantity: 22, unitPrice: "50" }],
  },
  {
    id: "22",
    number: "Q-2024-022",
    customer: "Container Services AG",
    grossAmount: "900",
    netAmount: "850",
    status: "active",
    items: [{ name: "Container Orchestration", quantity: 18, unitPrice: "50" }],
  },
  {
    id: "23",
    number: "Q-2024-023",
    customer: "Monitoring Systems GmbH",
    grossAmount: "800",
    netAmount: "750",
    status: "active",
    items: [{ name: "System Monitoring", quantity: 16, unitPrice: "50" }],
  },
  {
    id: "24",
    number: "Q-2024-024",
    customer: "Backup Solutions Corp",
    grossAmount: "700",
    netAmount: "650",
    status: "active",
    items: [{ name: "Backup Implementation", quantity: 14, unitPrice: "50" }],
  },
  {
    id: "25",
    number: "Q-2024-025",
    customer: "Disaster Recovery AG",
    grossAmount: "1500",
    netAmount: "1400",
    status: "active",
    items: [{ name: "DR Strategy", quantity: 30, unitPrice: "50" }],
  },
  {
    id: "26",
    number: "Q-2024-026",
    customer: "Compliance Services GmbH",
    grossAmount: "1000",
    netAmount: "950",
    status: "active",
    items: [{ name: "Compliance Audit", quantity: 20, unitPrice: "50" }],
  },
  {
    id: "27",
    number: "Q-2024-027",
    customer: "Performance Optimization Ltd",
    grossAmount: "1200",
    netAmount: "1100",
    status: "active",
    items: [{ name: "Performance Tuning", quantity: 24, unitPrice: "50" }],
  },
  {
    id: "28",
    number: "Q-2024-028",
    customer: "Scalability Solutions AG",
    grossAmount: "1400",
    netAmount: "1300",
    status: "active",
    items: [{ name: "Scalability Planning", quantity: 28, unitPrice: "50" }],
  },
];

export const mockGetQuotations = async (
    searchText: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<FeQuotation>> => {
    // Filter quotations based on search text
    let filteredQuotations = mockQuotations;
  
    if (searchText && searchText.trim() !== "") {
      const searchLower = searchText.toLowerCase().trim();
      filteredQuotations = mockQuotations.filter((quotation) => {
        return (
          quotation.number.toLowerCase().includes(searchLower) ||
          quotation.customer.toLowerCase().includes(searchLower) ||
          quotation.status.toLowerCase().includes(searchLower) ||
          quotation.grossAmount.includes(searchLower) ||
          quotation.netAmount.includes(searchLower) ||
          quotation.items.some((item) =>
            item.name.toLowerCase().includes(searchLower)
          )
        );
      });
    }
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredQuotations.slice(startIndex, endIndex);
  
    return {
      items: paginatedItems,
      total: filteredQuotations.length,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(filteredQuotations.length / pageSize),
    };
  };
