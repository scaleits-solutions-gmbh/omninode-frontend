import LayoutCenteredXY from "@/components/layout/layoutCenteredXY/LayoutCenteredXY";
import PageContent from "@/features/login/pageContent";
import { getSessionTokenPayload } from "@/lib/utils/misc/sessionToken";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
    let hasValidSession = false;
    try {
        const sessionTokenPayload = await getSessionTokenPayload();
        if(sessionTokenPayload.exp > Date.now() / 1000){
            hasValidSession = true;
        }
    }catch{}

    if(hasValidSession){
        redirect("/");
    }

    return (
        <LayoutCenteredXY>
            <PageContent />
        </LayoutCenteredXY>
    )
}