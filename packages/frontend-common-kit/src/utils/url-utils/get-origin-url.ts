

export function getOriginUrl() {
    const stage = process.env.STAGE;
    if(!stage || stage === "local") {
        return `http://localhost:3000`;
    }
    if(stage === "prod") {
        return `https://app.omninode.one`;
    }
    return `https://${stage}-app.omninode.one`;
}