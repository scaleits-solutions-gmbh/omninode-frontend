export function getFeedbackUrl() {
    const stage = process.env.STAGE;
    if(!stage || stage === "local") {
        return `http://localhost:3005`;
    }
    if(stage === "prod") {
        return `https://feedback.omninode.one`;
    }

    return `https://${stage}.feedback.omninode.one`;
}