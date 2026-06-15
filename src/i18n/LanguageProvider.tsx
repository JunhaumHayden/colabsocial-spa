"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  supportedLanguages,
  translations,
  type Language,
} from "@/src/i18n/translations"

type TranslationMessages = (typeof translations)[Language]

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (path: string) => string
  content: TranslationMessages
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isSupportedLanguage(value: string | null): value is Language {
  return supportedLanguages.includes(value as Language)
}

function resolveTranslation(content: TranslationMessages, path: string) {
  const value = path.split(".").reduce<unknown>((currentValue, segment) => {
    if (currentValue && typeof currentValue === "object" && segment in currentValue) {
      return (currentValue as Record<string, unknown>)[segment]
    }

    return undefined
  }, content)

  return typeof value === "string" ? value : path
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (isSupportedLanguage(storedLanguage)) {
      setLanguageState(storedLanguage)
    }

    setIsReady(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language

    if (isReady) {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    }
  }, [isReady, language])

  const content = translations[language]

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (path) => resolveTranslation(content, path),
      content,
    }),
    [content, language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }

  return context
}
