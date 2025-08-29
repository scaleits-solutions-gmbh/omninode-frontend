export default function LayoutCenteredXY({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-4">
      {children}
    </div>
  );
}
