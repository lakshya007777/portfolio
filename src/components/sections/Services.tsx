import { motion, useReducedMotion } from 'framer-motion'
import {
  Code2,
  Gamepad2,
  Globe2,
  Layers3,
  Palette,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { site } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

const skillIcons: Record<string, LucideIcon> = {
  code: Code2,
  layout: Layers3,
  palette: Palette,
  sparkles: Sparkles,
}

const serviceIcons = [Gamepad2, Smartphone, Globe2] as const

export function Services() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="services" className="bg-page py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="A practical toolkit for building polished products."
          subtitle="Grouped by how the work actually happens: interface engineering, programming fundamentals, product design, and ongoing learning."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {site.about.skillGroups.map((group, index) => {
            const Icon = skillIcons[group.icon] ?? Sparkles

            return (
              <motion.article
                key={group.title}
                className="rounded-lg border border-border bg-surface p-5 shadow-sm"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.38, ease: 'easeOut', delay: index * 0.04 }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon aria-hidden="true" size={19} />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-text-primary">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-border bg-page px-3 py-1 text-xs font-bold text-text-secondary"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-12 border-t border-border pt-10">
          <SectionHeading
            title="What I can help build."
            subtitle="Existing portfolio capabilities are preserved and presented with clearer scope."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {site.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? Sparkles

              return (
                <article
                  key={service.title}
                  className="rounded-lg border border-border bg-surface p-5 shadow-sm"
                >
                  <Icon aria-hidden="true" className="text-accent" size={22} />
                  <h3 className="mt-4 text-lg font-extrabold text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    {service.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
