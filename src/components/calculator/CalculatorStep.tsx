type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  output?: React.ReactNode;
};

export function CalculatorStep({
  eyebrow,
  title,
  subtitle,
  children,
  output,
}: Props) {
  return (
    <div className="card-clean overflow-hidden">
      <div className="border-b border-border bg-surface/35 px-5 py-5 md:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-dark">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{subtitle}</p>
      </div>
      <div className="space-y-5 p-5 md:p-6">{children}</div>
      {output && (
        <div className="border-t border-border bg-accent-soft/45 px-5 py-4 md:px-6">
          {output}
        </div>
      )}
    </div>
  );
}
