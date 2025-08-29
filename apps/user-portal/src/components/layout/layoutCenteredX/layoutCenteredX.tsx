import Header from "../header/Header";

interface LayoutCenteredXProps {
    children: React.ReactNode;
    showHeader?: boolean;
}

export default function LayoutCenteredX({ children, showHeader = true }: LayoutCenteredXProps) {
    return (<>
        <div>
            {showHeader && <Header />}
        </div>
        <div className="p-8">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                {children}
            </div>
        </div>
    </>
    )
}