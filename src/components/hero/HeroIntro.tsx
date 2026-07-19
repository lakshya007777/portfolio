import { ArrowDown, Github, Linkedin } from 'lucide-react'
import { site } from '../../data/site'

export function HeroIntro() {
  return (
    <div className="relative z-20 flex flex-col justify-center lg:pr-4">
      <p className="flex items-center gap-2 text-base font-medium text-text-primary md:text-lg">
        <span className="text-2xl" role="img" aria-label="wave">👋</span>
        {site.greeting}
      </p>
      <h1
        className="mt-1 font-extrabold uppercase leading-none tracking-tight text-text-primary"
        style={{ fontSize: 'clamp(2.75rem, 10vw, 5.5rem)' }}
      >
        {site.name}
      </h1>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent md:text-sm">
        {site.tagline}
      </p>
      <p className="mt-3 max-w-sm text-sm font-bold leading-relaxed text-text-secondary md:text-base" style={{ fontFamily: "'Saans', 'Inter', system-ui, sans-serif" }}>
        {site.bio}
      </p>

      {/* Scroll indicator + availability */}
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface shadow-sm cursor-pointer transition-transform hover:scale-105">
          <ArrowDown size={18} className="text-text-primary animate-bounce" />
        </div>
        <p className="text-sm font-medium text-text-secondary md:text-base">
          Available for freelance
        </p>
      </div>

      {/* Social links */}
      <div className="mt-4 flex items-center gap-3">
        {site.socials
          .filter((s) => s.type !== 'email')
          .map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-text-primary shadow-sm transition-all hover:border-accent hover:text-accent hover:shadow-md hover:-translate-y-0.5"
              aria-label={social.label}
            >
              {social.type === 'linkedin' ? (
                <Linkedin size={18} />
              ) : social.type === 'github' ? (
                <Github size={18} />
              ) : (
                <span className="text-sm font-extrabold">Be</span>
              )}
            </a>
          ))}
      </div>
    </div>
  )
}
