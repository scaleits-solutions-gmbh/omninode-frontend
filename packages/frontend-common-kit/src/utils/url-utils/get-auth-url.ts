import { getOriginUrl } from "./get-origin-url";

export function getAuthUrl(callbackUrl: string) {
    const stage = process.env.STAGE;
    if(!stage || stage === "local") {
        return `${getOriginUrl()}/authflows/signin?callbackUrl=${callbackUrl}`;
    }
    if(stage === "prod") {
        return `${getOriginUrl()}/authflows/signin?callbackUrl=${callbackUrl}`;
    }
    return `${getOriginUrl()}/authflows/signin?callbackUrl=${callbackUrl}`;
}