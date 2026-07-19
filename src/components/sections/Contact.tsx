import { ArrowUpRight, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { site, type SocialLink } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'
import { FlowButton } from '../ui/FlowButton'

const socialLinks: readonly SocialLink[] = site.socials
const linkedin = socialLinks.find((social) => social.type === 'linkedin')

export function Contact() {
  const contactMethods = [
    site.email
      ? {
          label: 'Email',
          value: site.email,
          href: `mailto:${site.email}`,
          icon: Mail,
        }
      : null,
    {
      label: 'GitHub',
      value: `@${site.github.username}`,
      href: site.github.href,
      icon: Github,
    },
    linkedin
      ? {
          label: 'LinkedIn',
          value: linkedin.label,
          href: linkedin.href,
          icon: Linkedin,
        }
      : null,
    site.resumeUrl
      ? {
          label: 'Resume',
          value: 'Download resume',
          href: site.resumeUrl,
          icon: FileText,
        }
      : null,
  ].filter(Boolean)

  const primaryHref = site.email ? `mailto:${site.email}` : site.github.href
  const primaryText = site.email ? 'Email Lakshya' : 'View GitHub profile'

  return (
    <section id="contact" className="bg-page py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)] lg:px-8">
        <div>
          <SectionHeading
            title="Ready to build something thoughtful?"
            subtitle="The contact options below only use verified links already available in this codebase."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <FlowButton text={primaryText} href={primaryHref} />
            {site.resumeUrl && (
              <a
                href={site.resumeUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-bold text-text-primary transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Resume
                <FileText aria-hidden="true" size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactMethods.map((method) => {
            if (!method) return null
            const Icon = method.icon
            const isExternal = method.href.startsWith('http')

            return (
              <a
                key={method.href}
                href={method.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group rounded-lg border border-border bg-surface p-5 shadow-sm transition hover:border-accent/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon aria-hidden="true" size={19} />
                </span>
                <p className="mt-4 text-sm font-bold uppercase text-text-secondary">
                  {method.label}
                </p>
                <p className="mt-1 flex items-center gap-2 break-words text-base font-extrabold text-text-primary">
                  {method.value}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
