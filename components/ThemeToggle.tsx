"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVisualTheme } from "@/components/VisualThemeProvider"
import { useLanguage } from "@/src/i18n/LanguageProvider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useVisualTheme()
  const { t } = useLanguage()

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-border bg-card/80 text-foreground hover:bg-muted"
      aria-label={t("theme.current") + ": " + (theme === "dark" ? t("theme.dark") : t("theme.clean"))}
    >
      {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span>{theme === "dark" ? t("theme.dark") : t("theme.clean")}</span>
    </Button>
  )
}
