import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "default" | "small";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold font-inter cursor-pointer transition-colors duration-150 border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary: "bg-accent text-white hover:opacity-90",
      ghost:
        "bg-transparent text-text border border-border hover:bg-surface-2 hover:border-accent",
    };

    const sizeStyles = {
      default: "px-[20px] py-[11px] text-[14px]",
      small: "px-[14px] py-[7px] text-[12.5px]",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
