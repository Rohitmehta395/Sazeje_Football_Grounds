import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "dark" | "azg" | "accent" | "surface";
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "dark", className = "", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center font-mono text-[11px] px-[8px] py-[4px] rounded-[20px] uppercase tracking-[0.06em] leading-none";

    const variantStyles = {
      dark: "bg-[rgba(20,25,20,0.65)] text-white",
      azg: "bg-surface-2 text-azg border border-border",
      accent: "bg-accent-soft text-accent border border-accent/20",
      surface: "bg-surface-2 text-text-muted border border-border",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

    return (
      <span ref={ref} className={combinedClassName} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
