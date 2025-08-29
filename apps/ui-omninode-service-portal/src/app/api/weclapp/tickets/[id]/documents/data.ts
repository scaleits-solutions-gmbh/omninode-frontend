import { FeWeclappDocument } from "@/types/weclapp/document";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const mockTicketDocuments: FeWeclappDocument[] = [
    {
        id: "1",
        name: "Ticket_T-2025-001.pdf",
        documentType: "TICKET",
        size: 1000000,
    },
];

export const mockGetTicketDocuments = async (
  ticketId: string,
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeWeclappDocument>> => {
  // Filter documents based on search text
  let filteredDocuments = mockTicketDocuments;

  if (searchText && searchText.trim() !== "") {
    const searchLower = searchText.toLowerCase().trim();
    filteredDocuments = mockTicketDocuments.filter((document) => {
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