import * as React from "react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, message, icon, action, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`text-center py-[60px] px-[20px] color-text-muted flex flex-col items-center justify-center gap-3 ${className}`.trim()}
        {...props}
      >
        {icon && <div className="text-text-muted text-3xl mb-1">{icon}</div>}
        {title && (
          <h3 className="font-bebas text-2xl tracking-wide text-text m-0">
            {title}
          </h3>
        )}
        <p className="text-text-muted text-[14px] m-0 max-w-md">{message}</p>
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
