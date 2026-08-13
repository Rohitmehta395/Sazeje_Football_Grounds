"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`w-[40px] h-[40px] rounded-full border border-border bg-surface-2 flex items-center justify-center text-text cursor-pointer transition-colors hover:border-accent ${className}`.trim()}
    >
      {theme === "light" ? (
        <Moon className="w-[18px] h-[18px] text-text" />
      ) : (
        <Sun className="w-[18px] h-[18px] text-accent-2" />
      )}
    </button>
  );
}
