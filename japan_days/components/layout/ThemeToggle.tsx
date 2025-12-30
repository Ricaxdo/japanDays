"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

function setThemeWithTransition(nextDark: boolean) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  if (nextDark) root.classList.add("dark");
  else root.classList.remove("dark");

  window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 240);
}

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    const initial = root.classList.contains("dark");
    setIsDark(initial);
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      setThemeWithTransition(next);
      return next;
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      className="border-border/50 bg-card/20 rounded-full border backdrop-blur-xl"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
