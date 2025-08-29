import Header from "../header/Header";

interface LayoutCenteredXYProps {
    showHeader?: boolean;
  children: React.ReactNode;
}

export default function LayoutCenteredXY({
  children,
  showHeader = true,
}: LayoutCenteredXYProps) {
  return (
    <div className="flex flex-col min-h-dvh">
      {showHeader && <Header />}
      <div className="p-6 flex justify-center items-center flex-1">
        {children}
      </div>
    </div>
  );
}
