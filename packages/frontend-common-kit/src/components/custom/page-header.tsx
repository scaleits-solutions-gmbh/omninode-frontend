type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};
export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex flex-row items-center gap-2">{actions}</div>
    </div>
  );
}
