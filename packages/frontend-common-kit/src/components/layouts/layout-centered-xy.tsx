interface LayoutCenteredXYProps {
  children: React.ReactNode;
  showHeader?: boolean;
  header?: React.ReactNode;
}

export function LayoutCenteredXY({
  header,
  children,
  showHeader = true,
}: LayoutCenteredXYProps) {
  return (
    <div className="flex flex-col min-h-dvh">
      {showHeader && header}
      <div className="p-6 flex justify-center items-center flex-1">
        {children}
      </div>
    </div>
  );
}
