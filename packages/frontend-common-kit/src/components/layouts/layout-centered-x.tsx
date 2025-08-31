interface LayoutCenteredXProps {
  children: React.ReactNode;
  showHeader?: boolean;
  header?: React.ReactNode;
}

export function LayoutCenteredX({
  header,
  children,
  showHeader = true,
}: LayoutCenteredXProps) {
  return (
    <>
      <div>{showHeader && header}</div>
      <div className="p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">{children}</div>
      </div>
    </>
  );
}
