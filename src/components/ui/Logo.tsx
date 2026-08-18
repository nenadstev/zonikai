import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "full" | "compact" | "icon";
  href?: string;
};

export function BrandMark({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/brand/zonik-favicon.png"
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      aria-hidden
    />
  );
}

export function Logo({ className, variant = "compact", href = "/" }: LogoProps) {
  const content =
    variant === "icon" ? (
      <BrandMark size={32} className="h-8 w-8" />
    ) : variant === "full" ? (
      <Image
        src="/brand/zonik-ai-logo.png"
        alt="Zonik AI"
        width={200}
        height={48}
        className="h-10 w-auto object-contain"
        priority
      />
    ) : (
      <Image
        src="/brand/zonik-header.png"
        alt="Zonik AI"
        width={190}
        height={37}
        className="h-7 w-auto object-contain"
        priority
      />
    );

  if (!href) {
    return <span className={cn("inline-flex items-center", className)}>{content}</span>;
  }

  return (
    <Link href={href} className={cn("inline-flex items-center", className)}>
      {content}
    </Link>
  );
}
