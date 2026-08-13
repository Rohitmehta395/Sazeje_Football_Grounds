import * as React from "react";

export interface InfoBoxItem {
  label: string;
  value: React.ReactNode;
}

export interface InfoBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  items: InfoBoxItem[];
}

export const InfoBox = React.forwardRef<HTMLDivElement, InfoBoxProps>(
  ({ items, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-surface-2 border border-border rounded-[12px] p-[20px] ${className}`.trim()}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-[9px] border-b border-border last:border-b-0 text-[13.5px]"
          >
            <span className="text-text-muted">{item.label}</span>
            <span className="font-mono font-bold text-azg">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
);

InfoBox.displayName = "InfoBox";
