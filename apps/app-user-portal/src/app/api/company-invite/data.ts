import {
  CompanyRelationshipType,
  ResultType,
} from "@scaleits-solutions-gmbh/services";

type apiCompanyInvite = {
  id: string;
  token: string;
  companyId: string;
  companyName: string;
  inviteeCompanyId: string;
  inviteeCompanyName: string;
  leftCompanyId: string;
  leftCompanyName: string;
  rightCompanyId: string;
  rightCompanyName: string;
  relationship: CompanyRelationshipType;
};

const mockData: apiCompanyInvite[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    token: "f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
    companyId: "f1a2b3c4-d5e6-7890-1234-567890abcdef",
    companyName: "Company 1",
    inviteeCompanyId: "16c963db-1f1e-4f41-98f3-c6d13470090a",
    inviteeCompanyName: "Company 2",
    leftCompanyId: "f1a2b3c4-d5e6-7890-1234-567890abcdef",
    leftCompanyName: "Company 1",
    rightCompanyId: "16c963db-1f1e-4f41-98f3-c6d13470090a",
    rightCompanyName: "Company 2",
    relationship: CompanyRelationshipType.ServiceProvision,
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    token: "a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8",
    companyId: "a2b3c4d5-e6f7-8901-2345-6789abcdef01",
    companyName: "Company 2",
    inviteeCompanyId: "f1a2b3c4-d5e6-7890-1234-567890abcdef",
    inviteeCompanyName: "Company 1",
    leftCompanyId: "f1a2b3c4-d5e6-7890-1234-567890abcdef",
    leftCompanyName: "Company 1",
    rightCompanyId: "a2b3c4d5-e6f7-8901-2345-6789abcdef01",
    rightCompanyName: "Company 2",
    relationship: CompanyRelationshipType.ServiceProvision,
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-345678901234",
    token: "e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4",
    companyId: "b3c4d5e6-f7a8-9012-3456-789abcdef012",
    companyName: "Company 3",
    inviteeCompanyId: "c4d5e6f7-a8b9-0123-4567-89abcdef0123",
    inviteeCompanyName: "Company 4",
    leftCompanyId: "f1a2b3c4-d5e6-7890-1234-567890abcdef",
    leftCompanyName: "Company 1",
    rightCompanyId: "a2b3c4d5-e6f7-8901-2345-6789abcdef01",
    rightCompanyName: "Company 2",
    relationship: CompanyRelationshipType.Partner,
  },
];

export const getMockData = async (
  token: string,
): Promise<{
  result: apiCompanyInvite | undefined;
  resultType: ResultType;
}> => {
  const data = mockData.find((item) => item.token === token);

  if (!data) {
    return {
      result: undefined,
      resultType: ResultType.NOT_FOUND,
    };
  }

  return {
    result: data,
    resultType: ResultType.SUCCESS,
  };
};
