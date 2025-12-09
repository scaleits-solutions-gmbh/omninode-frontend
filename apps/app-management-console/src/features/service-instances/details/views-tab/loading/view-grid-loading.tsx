import ViewCardLoading from "./view-card-loading";

interface ViewGridLoadingProps {
  rows: number;
}

export default function ViewGridLoading({ rows }: ViewGridLoadingProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: rows }).map((_, index) => (
        <ViewCardLoading key={index} />
      ))}
    </div>
  );
}