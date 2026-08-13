import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isStatic?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ isStatic = false, className = "", children, ...props }, ref) => {
    const baseStyles =
      "bg-surface border border-border rounded overflow-hidden shadow-card flex flex-col transition-transform duration-150 ease-in-out";

    const interactiveStyles = isStatic
      ? "cursor-default"
      : "hover:-translate-y-[3px] cursor-pointer";

    const combinedClassName = `${baseStyles} ${interactiveStyles} ${className}`.trim();

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
