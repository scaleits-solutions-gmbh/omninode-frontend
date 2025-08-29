import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

// Initialize the AWS Secrets Manager client
const createSecretsManagerClient = () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;
  const region = process.env.AWS_REGION || 'us-east-1'; // Default region if not specified

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials not found in environment variables');
  }

  return new SecretsManagerClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

/**
 * Retrieves a secret from AWS Secrets Manager
 * @param secretName - The name or ARN of the secret
 * @returns The secret value as a string
 */
export const getSecret = async (secretName: string): Promise<string> => {
  try {
    const client = createSecretsManagerClient();
    
    const command = new GetSecretValueCommand({
      SecretId: secretName,
    });

    const response = await client.send(command);
    
    if (response.SecretString) {
      return response.SecretString;
    } else if (response.SecretBinary) {
      // Convert binary secret to string if needed
      const buff = Buffer.from(response.SecretBinary);
      return buff.toString('ascii');
    } else {
      throw new Error('Secret value is neither string nor binary');
    }
  } catch (error) {
    console.error('Error retrieving secret:', error);
    throw new Error(`Failed to retrieve secret '${secretName}': ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Retrieves a JSON secret from AWS Secrets Manager and parses it
 * @param secretName - The name or ARN of the secret
 * @returns The parsed JSON object
 */
export const getJsonSecret = async <T = unknown>(secretName: string): Promise<T> => {
  const secretString = await getSecret(secretName);
  try {
    return JSON.parse(secretString) as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON secret '${secretName}': ${error instanceof Error ? error.message : 'Invalid JSON'}`);
  }
};