"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { FeatureCardVisual } from "@/components/home/FeatureCardVisual"
import { HomeDemoVideo } from "@/components/home/HomeDemoVideo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/src/i18n/LanguageProvider"

interface LocalizedImage {
  pt: string
  en: string
}

interface FeatureSlide {
  eyebrow: string
  title: string
  subtitle: string
  bullets: string[]
  cta: string
  href: string
  stageBadge?: string
  image: LocalizedImage
  imageAlt: LocalizedImage
  isFlowImage?: boolean
}

const slides: FeatureSlide[] = [
  {
    eyebrow: "Fluxo completo CoSocial",
    title: "Da ideia à startup",
    subtitle: "Um fluxo integrado para transformar um rabisco inicial em MVP, projeto validado ou empresa.",
    bullets: [],
    cta: "Explorar o fluxo",
    href: "#platform-flow",
    image: {
      pt: "/home/cosocial-flow.png",
      en: "/home/cosocial-flow-en.png",
    },
    imageAlt: {
      pt: "Ilustração do fluxo CoSocial da ideia à startup",
      en: "CoSocial flow illustration from idea to startup",
    },
    isFlowImage: true,
  },
  {
    eyebrow: "Business Validation",
    title: "Validação de Negócio",
    subtitle: "Compare sua ideia com soluções similares, concorrentes, sinais de mercado e plataformas de investimento.",
    bullets: ["Busca evidências externas", "Analisa novidade, risco e diferenciação", "Gera relatório crítico para decisão"],
    cta: "Validar uma ideia",
    href: "/validar-negocio",
    stageBadge: "Validação",
    image: {
      pt: "/home/feature-cards/card2.png",
      en: "/home/feature-cards/english/card2-en.png",
    },
    imageAlt: {
      pt: "Ilustração da Validação de Negócio com evidências externas, concorrentes, sinais de mercado e relatório crítico",
      en: "Business Validation illustration with external evidence, competitors, market signals and critical report",
    },
  },
  {
    eyebrow: "GitHub + colaboração",
    title: "Contribuição por tarefas",
    subtitle: "Transforme ideias em issues, branches, commits e evidências verificáveis.",
    bullets: ["Colaboradores escolhem tarefas", "Entregas ficam registradas", "Revisores aceitam ou pedem ajustes"],
    cta: "Ver projetos para contribuir",
    href: "/contribuir/projetos",
    stageBadge: "Execução",
    image: {
      pt: "/home/feature-cards/card3.png",
      en: "/home/feature-cards/english/card3-en.png",
    },
    imageAlt: {
      pt: "Ilustração do fluxo de contribuição por tarefas com issues, branches, commits, evidências e revisão",
      en: "Task contribution workflow illustration with issues, branches, commits, evidence and review",
    },
  },
  {
    eyebrow: "Pontuação e reputação",
    title: "ColabScore",
    subtitle: "Meça contribuições por horas, entrega, impacto, risco e evidências aceitas.",
    bullets: ["Pontuação por projeto", "Base para reputação", "Histórico de entregas aceitas"],
    cta: "Configurar ColabScore",
    href: "/responsavel/colabscore",
    stageBadge: "Pontuação",
    image: {
      pt: "/home/feature-cards/card4.png",
      en: "/home/feature-cards/english/card4-en.png",
    },
    imageAlt: {
      pt: "Ilustração do painel ColabScore com pontuação, reputação e entregas aceitas",
      en: "ColabScore dashboard illustration with score, reputation and accepted deliveries",
    },
  },
  {
    eyebrow: "Assistente de IA",
    title: "ColabAI Assist",
    subtitle: "Use IA para entender tarefas, gerar planos, criar Prompt Packs e revisar entregas.",
    bullets: ["Assistente por issue", "Prompt Pack para IDE", "Créditos internos de IA"],
    cta: "Abrir ColabAI",
    href: "/colabai",
    stageBadge: "IA para colaboração",
    image: {
      pt: "/home/feature-cards/card5.png",
      en: "/home/feature-cards/english/card5-en.png",
    },
    imageAlt: {
      pt: "Ilustração do ColabAI Assist com assistente por issue, plano técnico, Prompt Pack e revisão de entrega",
      en: "ColabAI Assist illustration with issue assistant, technical plan, Prompt Pack and delivery review",
    },
  },
  {
    eyebrow: "Governança inicial",
    title: "Legal & Equity Hub",
    subtitle: "Entenda participação, documentos, cap table, diluição e direitos dos colaboradores.",
    bullets: ["Simulador de participação", "Documentos essenciais", "Avisos jurídicos e governança"],
    cta: "Abrir Legal & Equity",
    href: "/legal-equity",
    stageBadge: "Governança",
    image: {
      pt: "/home/feature-cards/card6.png",
      en: "/home/feature-cards/english/card6-en.png",
    },
    imageAlt: {
      pt: "Ilustração do Legal & Equity Hub com cap table, diluição, documentos e governança",
      en: "Legal and Equity Hub illustration with cap table, dilution, documents and governance",
    },
  },
  {
    eyebrow: "Maturidade do projeto",
    title: "Maturity & Investment Hub",
    subtitle: "Meça maturidade técnica, comercial, financeira, jurídica e prontidão para investimento.",
    bullets: ["Startup Maturity Index", "Investor Readiness Report", "Próximos passos para captação"],
    cta: "Abrir Maturity Hub",
    href: "/maturity-investment",
    stageBadge: "Maturidade",
    image: {
      pt: "/home/feature-cards/card7.png",
      en: "/home/feature-cards/english/card7-en.png",
    },
    imageAlt: {
      pt: "Ilustração do Maturity & Investment Hub com índice de maturidade e relatório para investidores",
      en: "Maturity and Investment Hub illustration with maturity index and investor readiness report",
    },
  },
  {
    eyebrow: "Editais e financiamento",
    title: "Editais e Financiamento",
    subtitle: "Encontre editais, subvenções, aceleração, grants e oportunidades compatíveis.",
    bullets: ["Filtros por área, estado e estágio", "Match Score de editais", "Checklist e alerta por e-mail"],
    cta: "Buscar oportunidades",
    href: "/funding-opportunities",
    stageBadge: "Financiamento",
    image: {
      pt: "/home/feature-cards/card8.png",
      en: "/home/feature-cards/english/card8-en.png",
    },
    imageAlt: {
      pt: "Ilustração do Funding Opportunities Hub com editais, filtros, match score, checklist e alertas por e-mail",
      en: "Funding Opportunities Hub illustration with calls, filters, match score, checklist and email alerts",
    },
  },
]

export function FeatureCarousel() {
  const { content, language } = useLanguage()
  const carousel = content.home.featureCarousel
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHoverPaused, setIsHoverPaused] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const isPaused = isHoverPaused || isVideoPlaying

  useEffect(() => {
    if (isPaused) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [isPaused])

  const slide = { ...slides[activeIndex], ...carousel.slides[activeIndex] }
  const isFlowImageSlide = Boolean(slide.isFlowImage)
  const imageSrc = language === "en" ? slide.image.en : slide.image.pt
  const imageAlt = language === "en" ? slide.imageAlt.en : slide.imageAlt.pt

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  return (
    <section id="modules" className="py-20 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="outline" className="mb-3">
              {carousel.sectionBadge}
            </Badge>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{carousel.title}</h2>
          </div>
          <p className="max-w-2xl text-muted-foreground">
            {carousel.subtitle}
          </p>
        </div>

        <Card
          className="overflow-hidden border-border bg-card"
          onMouseEnter={() => setIsHoverPaused(true)}
          onMouseLeave={() => setIsHoverPaused(false)}
        >
          <CardContent className="p-0">
            <div className={`grid gap-0 ${isFlowImageSlide ? "min-h-[500px] items-center lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)]" : "min-h-[520px] items-center lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)]"}`}>
              <div className="flex min-w-0 flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{slide.eyebrow}</Badge>
                    {slide.stageBadge && (
                      <Badge variant="outline" className="border-secondary/40 text-secondary">
                        {slide.stageBadge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="max-w-3xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                    {slide.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {slide.subtitle}
                  </p>

                  {!isFlowImageSlide && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                      {slide.bullets.map((bullet) => (
                        <li key={bullet} className="rounded-xl border border-border bg-background/60 p-3 text-sm text-muted-foreground">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button className="w-fit bg-primary hover:bg-primary/90" asChild>
                    <a href={slide.href}>
                      {slide.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" aria-label={carousel.previousSlide} onClick={goToPrevious}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label={carousel.nextSlide} onClick={goToNext}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className={`relative min-w-0 border-t border-border bg-gradient-to-br from-primary/15 via-background to-secondary/20 lg:border-l lg:border-t-0 ${
                isFlowImageSlide ? "min-h-[300px] p-4 sm:p-6 lg:p-8" : "min-h-[320px] p-4 sm:p-6 lg:min-h-[520px] lg:p-8"
              }`}>
                <div className="absolute right-6 top-6 z-20 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground shadow-sm">
                  {activeIndex + 1}/{slides.length}
                </div>
                {isFlowImageSlide ? (
                  <div className="flex h-full items-center justify-center pt-10 lg:pt-0">
                    <HomeDemoVideo onPlaybackChange={setIsVideoPlaying} />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center pt-10 lg:pt-0">
                    <FeatureCardVisual
                      src={imageSrc}
                      alt={imageAlt}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-5 flex justify-center gap-2">
          {carousel.slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`${carousel.goToSlide} ${index + 1}: ${item.title}`}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/35 hover:bg-muted-foreground/60"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
