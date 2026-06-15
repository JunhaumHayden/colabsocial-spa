"use client"

import { Globe2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { useLanguage } from "@/src/i18n/LanguageProvider"
import type { Language } from "@/src/i18n/translations"

const languageOptions: Array<{ value: Language; label: string; translationKey: string }> = [
  { value: "pt-BR", label: "🇧🇷 PT", translationKey: "common.portuguese" },
  { value: "en", label: "🇺🇸 EN", translationKey: "common.english" },
]

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const selectedLanguage = languageOptions.find((option) => option.value === language)

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger
        size="sm"
        aria-label={t("common.selectLanguage")}
        className="h-8 min-w-[92px] border-border bg-card/80 text-foreground hover:bg-muted"
      >
        <Globe2 className="h-4 w-4" />
        <span className="text-xs font-semibold">{selectedLanguage?.label}</span>
      </SelectTrigger>
      <SelectContent align="end">
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span aria-hidden="true">{option.label}</span>
            <span className="sr-only">{t(option.translationKey)}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
