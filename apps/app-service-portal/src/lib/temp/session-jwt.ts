import { SignJWT, jwtVerify, importPKCS8, importSPKI, decodeJwt, JWTPayload } from 'jose';

const privateKey = process.env.JWT_PRIVATE_KEY;
const publicKey = process.env.JWT_PUBLIC_KEY;

// Helper function to format PEM keys properly
function formatPemKey(key: string): string {
  if (!key) return key;
  
  // Remove extra quotes if present
  let formattedKey = key.replace(/^"(.*)"$/, '$1');
  
  // Replace literal \n with actual newlines
  formattedKey = formattedKey.replace(/\\n/g, '\n');
  
  return formattedKey;
}

// Cache for imported keys
let cachedPrivateKey: Awaited<ReturnType<typeof importPKCS8>> | null = null;
let cachedPublicKey: Awaited<ReturnType<typeof importSPKI>> | null = null;

async function getPrivateKey() {
  if (!cachedPrivateKey) {
    if (!privateKey) {
      throw new Error("JWT private key is not set in environment variables");
    }
    const formattedPrivateKey = formatPemKey(privateKey);
    cachedPrivateKey = await importPKCS8(formattedPrivateKey, 'RS256');
  }
  return cachedPrivateKey;
}

async function getPublicKey() {
  if (!cachedPublicKey) {
    if (!publicKey) {
      throw new Error("JWT public key is not set in environment variables");
    }
    const formattedPublicKey = formatPemKey(publicKey);
    cachedPublicKey = await importSPKI(formattedPublicKey, 'RS256');
  }
  return cachedPublicKey;
}

export async function generateSessionJWT(payload: { sub?: string; role?: string; [key: string]: unknown }) {
  const defaultPayload = {
    sub: 'admin',
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  };

  const tokenPayload = { ...defaultPayload, ...payload };
  
  const key = await getPrivateKey();
  
  const jwt = await new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt(tokenPayload.iat)
    .setExpirationTime(tokenPayload.exp)
    .sign(key);
    
  return jwt;
}

export async function verifySessionJWT(token: string) {
  try {
    const key = await getPublicKey();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['RS256']
    });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error('Invalid token');
  }
}

export async function decodeSessionJWT(token: string): Promise<JWTPayload> {
  try {
    const decoded = decodeJwt(token);
    return decoded;
  } catch (error) {
    console.error("JWT decoding failed:", error);
    throw new Error('Invalid token format');
  }
}