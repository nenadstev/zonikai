import { cn } from "@/lib/utils";

type IntegrationLogoProps = {
  name: string;
  src: string;
  className?: string;
};

export function IntegrationLogo({ name, src, className }: IntegrationLogoProps) {
  return (
    <div className="flex h-12 w-full max-w-[160px] items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        className={cn("h-8 w-auto max-w-full object-contain object-center", className)}
        loading="lazy"
      />
    </div>
  );
}
