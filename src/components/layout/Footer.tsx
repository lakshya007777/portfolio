import { Github, Linkedin, Mail } from 'lucide-react'
import { site } from '../../data/site'

export function Footer() {
  return (
    <footer
      className="border-t border-border/80 bg-surface py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-text-secondary">
          Have a project in mind?
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
          Let&apos;s work together
        </h2>
        {site.email && (
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-accent hover:text-accent-hover"
          >
            <Mail size={20} />
            {site.email}
          </a>
        )}
        <div className="mt-8 flex justify-center gap-4">
          {site.socials
            .filter((s) => s.type !== 'email')
            .map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-page text-text-primary transition-colors hover:border-accent hover:text-accent"
                aria-label={social.label}
              >
                {social.type === 'linkedin' ? (
                  <Linkedin size={20} />
                ) : social.type === 'github' ? (
                  <Github size={20} />
                ) : (
                  <span className="text-sm font-bold">Be</span>
                )}
              </a>
            ))}
        </div>
        <p className="mt-12 text-sm text-text-secondary">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
