import { getJsonSecret } from "../misc/aws-secrets";

export const getSecret = async () => {
  if (!process.env.AWS_PATH_TO_SECRET) {
    throw new Error("AWS_PATH_TO_SECRET is not set");
  }
  const secret = await getJsonSecret(process.env.AWS_PATH_TO_SECRET);
  return secret;
};

export const getOmninodeAPIKey = async () => {
  if (!process.env.OMNINODE_API_KEY) {
    throw new Error("OMNINODE_API_KEY is not set");
  }
  return process.env.OMNINODE_API_KEY;
};

/* To be used when we have a secret in AWS Secrets Manager
export const getOmninodeAPIKey = async () => {
    if (!process.env.AWS_PATH_TO_OMNINODE_API_KEY) {
        throw new Error("AWS_PATH_TO_OMNINODE_API_KEY is not set");
    }
    const secret = await getJsonSecret(process.env.AWS_PATH_TO_OMNINODE_API_KEY);
    return secret;
}
*/
