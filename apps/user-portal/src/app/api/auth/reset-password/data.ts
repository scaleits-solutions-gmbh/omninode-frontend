import { ResultType } from "@scaleits-solutions-gmbh/services";

type ApiResetPasswordProcess = {
  id: string;
  token: string;
  userId: string;
  email: string;
  expiresAt: string;
  isUsed: boolean;
};

const mockData: ApiResetPasswordProcess[] = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    token: "1a2b3c4d5e6f7890123456789abcdef0",
    userId: "12345678-90ab-cdef-1234-567890abcdef",
    email: "bernardo.cabral@omnibiz.com",
    expiresAt: "2025-06-26T19:00:00Z",
    isUsed: false,
  },
  {
    id: "b2c3d4e5-f6a7-8901-2345-678901bcdefg",
    token: "2b3c4d5e6f7890123456789abcdef012",
    userId: "23456789-01bc-def1-2345-678901bcdefg",
    email: "jane.doe@example.com",
    expiresAt: "2025-06-25T19:00:00Z",
    isUsed: false,
  },
  {
    id: "c3d4e5f6-a7b8-9012-3456-789012cdefgh",
    token: "3c4d5e6f7890123456789abcdef0123",
    userId: "34567890-12cd-ef12-3456-789012cdefgh",
    email: "john.smith@example.com",
    expiresAt: "2025-05-20T19:00:00Z",
    isUsed: true,
  },
];

export const getMockData = async (token: string): Promise<{result: ApiResetPasswordProcess | undefined, resultType: ResultType}> => {
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

