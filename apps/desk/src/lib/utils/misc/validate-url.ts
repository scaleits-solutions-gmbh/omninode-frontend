export const isInternalUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    const domain = process.env.DOMAIN;
    if (!domain) {
      throw new Error("DOMAIN is not set");
    }
    return hostname.endsWith(domain);
  } catch (error) {
    console.error("Error validating URL:", error);
    return false;
  }
};
