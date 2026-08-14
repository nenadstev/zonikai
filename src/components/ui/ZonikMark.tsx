import { cn } from "@/lib/utils";

export function ZonikMark({
  className,
  color = "#4E46FC",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M32 4c15.464 0 28 12.536 28 28 0 9.05-4.3 17.12-11 22.32L32 76 15 54.32C8.3 49.12 4 41.05 4 32 4 16.536 16.536 4 32 4Zm0 12c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16Z"
      />
      <path
        d="M24 46 32 70 40 46"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 50v16"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3.5 5"
      />
    </svg>
  );
}
