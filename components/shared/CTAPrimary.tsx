import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

type CTAPrimaryProps = {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export default function CTAPrimary({
  href,
  children,
  showArrow = true,
  className,
  ...rest
}: CTAPrimaryProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 px-7 py-[17px] bg-ink text-bg text-[15px] font-medium rounded-lg transition-colors hover:bg-accent no-underline",
        className
      )}
      {...rest}
    >
      {children}
      {showArrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-[180ms] group-hover:translate-x-[3px]"
        >
          →
        </span>
      )}
    </Link>
  );
}
