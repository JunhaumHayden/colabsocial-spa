"use client"

import { useLanguage } from "@/src/i18n/LanguageProvider"

const demoVideoSrc = "/home/videos/cosocial-demo.mp4"

interface HomeDemoVideoProps {
  onPlaybackChange?: (isPlaying: boolean) => void
}

export function HomeDemoVideo({ onPlaybackChange }: HomeDemoVideoProps) {
  const { content, language } = useLanguage()
  const demoVideo = content.home.featureCarousel.demoVideo
  const poster = language === "en" ? "/home/cosocial-flow-en.png" : "/home/cosocial-flow.png"

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{demoVideo.label}</p>
      <div className="relative w-full overflow-hidden rounded-[28px] border border-border bg-slate-950/5 p-2 shadow-sm">
        <div className="relative aspect-video w-full">
          <video
            className="h-full w-full rounded-[22px] bg-slate-950 object-contain"
            controls
            preload="metadata"
            playsInline
            poster={poster}
            aria-label={demoVideo.description}
            onPlay={() => onPlaybackChange?.(true)}
            onPause={() => onPlaybackChange?.(false)}
            onEnded={() => onPlaybackChange?.(false)}
          >
            <source src={demoVideoSrc} type="video/mp4" />
            {demoVideo.fallback}
          </video>
        </div>
      </div>
    </div>
  )
}
