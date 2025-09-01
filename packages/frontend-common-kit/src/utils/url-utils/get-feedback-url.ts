export function getFeedbackUrl() {
    const stage = process.env.STAGE;
    if(!stage || stage === "local") {
        return `http://localhost:3005`;
    }

    return `https://${stage}.feedback.omninode.one`;
}