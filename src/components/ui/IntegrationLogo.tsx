import { cn } from "@/lib/utils";

type IntegrationLogoProps = {
  name: string;
  src: string;
  className?: string;
};

export function IntegrationLogo({ name, src, className }: IntegrationLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      className={cn("h-8 w-auto max-w-[120px] object-contain object-center", className)}
      loading="lazy"
    />
  );
}
