import LayoutCenteredXY from "@/components/layout/layoutCenteredXY/layoutCenteredXY";
import PageContent from "@/features/forgotPassword/PageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Forgot Password",
};

export default function ForgotPasswordPage() {
    return (
            <LayoutCenteredXY showHeader={false}> 
                <PageContent />
        </LayoutCenteredXY>
    );
}