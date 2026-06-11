import { cn } from "@/lib/utils";

type IntegrationLogoProps = {
  name: string;
  src: string;
  className?: string;
  surface?: "light" | "dark";
};

export function IntegrationLogo({
  name,
  src,
  className,
  surface = "light",
}: IntegrationLogoProps) {
  return (
    <div
      className={cn(
        "flex h-11 w-full max-w-[132px] items-center justify-center rounded-lg px-3 py-2",
        surface === "dark" ? "bg-neutral-950" : "bg-surface/60"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        className={cn("h-6 w-auto max-w-full object-contain object-center", className)}
        loading="lazy"
      />
    </div>
  );
}
