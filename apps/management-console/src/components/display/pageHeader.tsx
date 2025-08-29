type PageHeaderProps = {
  title: string;
  actions?: React.ReactNode;
};
export default function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex flex-row items-center gap-2">{actions}</div>
    </div>
  );
}
