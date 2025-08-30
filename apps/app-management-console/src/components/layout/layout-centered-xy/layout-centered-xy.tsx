export default function LayoutCenteredXY({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 flex justify-center items-center min-h-dvh">
      {children}
    </div>
  );
}
