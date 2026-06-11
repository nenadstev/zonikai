type DashboardPageShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export function DashboardPageShell({ children, title, subtitle }: DashboardPageShellProps) {
  return (
    <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 lg:px-6 lg:py-8">
      {(title || subtitle) && (
        <div>
          {title && (
            <h1 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">{title}</h1>
          )}
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
      )}
      {children}
    </main>
  );
}
