export default function LayoutCenteredX({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen justify-center bg-background p-4">
      {children}
    </div>
  );
}
