/*import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function getSecret(secretName: string): Promise<string> {
  try {
    const command = new GetSecretValueCommand({
      SecretId: secretName,
    });

    const response = await client.send(command);
    
    if (response.SecretString) {
      return response.SecretString;
    }
    
    if (response.SecretBinary) {
      const buff = Buffer.from(response.SecretBinary as Uint8Array);
      return buff.toString('ascii');
    }
    
    throw new Error('Secret value is neither string nor binary');
  } catch (error) {
    console.error('Error retrieving secret:', error);
    throw error;
  }
}

export async function getSecretAsJson<T = any>(secretName: string): Promise<T> {
  const secretString = await getSecret(secretName);
  try {
    return JSON.parse(secretString) as T;
  } catch (error) {
    console.error('Error parsing secret as JSON:', error);
    throw new Error('Secret is not valid JSON');
  }
}
*/