interface InviteCodeResponse {
  isValid: boolean;
}

export async function getInviteCode(inviteCode: string): Promise<InviteCodeResponse> {
  console.log("getInviteCode", inviteCode);
  //simulate a delay
  await new Promise(resolve => setTimeout(resolve, 800));
  const response: InviteCodeResponse = {
    isValid: true,
  }
    return response;
}


