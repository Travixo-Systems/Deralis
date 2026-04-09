import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

type CTASecondaryProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export default function CTASecondary({
  href,
  children,
  className,
  ...rest
}: CTASecondaryProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[15px] font-medium text-ink no-underline border-b border-transparent pb-[2px] hover:border-ink transition-[border-color] duration-150",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
