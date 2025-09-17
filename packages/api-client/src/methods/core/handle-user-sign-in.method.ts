export const handleUserSignIn = async (baseUrl: string, accessToken: string): Promise<void> => {
    console.log(accessToken);
    console.log(`${baseUrl}/handle-sign-in`);
    const response = await fetch(`${baseUrl}/handle-sign-in`, {
        headers: {
            Authorization: `${accessToken}`,
        },
        method: "POST",
    });
    if (!response.ok) {
        const message = await safeReadError(response);
        throw new Error(`Sign-in handle failed: ${response.status} ${message}`);
    }
}

async function safeReadError(response: Response): Promise<string> {
    try {
        const text = await response.text();
        return text?.slice(0, 500) ?? "";
    } catch {
        return "";
    }
}