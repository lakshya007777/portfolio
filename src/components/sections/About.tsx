import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Braces,
  Code2,
  Lightbulb,
  Rocket,
  Sparkles,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { site } from '../../data/site'
import { FlowButton } from '../ui/FlowButton'
import { SectionHeading } from '../ui/SectionHeading'

const journeyDetails: readonly {
  title: (typeof site.about.journey)[number]
  description: string
  icon: LucideIcon
}[] = [
  {
    title: site.about.journey[0],
    description: 'Turned curiosity about technology into hands-on practice.',
    icon: Lightbulb,
  },
  {
    title: site.about.journey[1],
    description: 'Built programming fundamentals through structured problem-solving.',
    icon: Braces,
  },
  {
    title: site.about.journey[2],
    description: 'Moved that foundation into useful, considered experiences for the web.',
    icon: Code2,
  },
  {
    title: site.about.journey[3],
    description: 'Practiced fast product thinking and execution in hackathon settings.',
    icon: Trophy,
  },
  {
    title: site.about.journey[4],
    description: 'Creating web, app, and 2D game experiences from idea to interface.',
    icon: Rocket,
  },
  {
    title: site.about.journey[5],
    description: 'Continuing to push into newer tools, patterns, and product thinking.',
    icon: Sparkles,
  },
]

export function About() {
  const shouldReduceMotion = useReducedMotion()
  const [isGameOpen, setIsGameOpen] = useState(false)

  return (
    <section id="about" className="bg-page py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          >
            <SectionHeading
              title={site.about.subtitle}
              subtitle={site.about.longBio}
            />

            <div className="mt-8 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
              <img
                src="/about-photo.png"
                alt={`${site.displayName} outdoors in the mountains`}
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-[center_62%]"
              />
              <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-bold text-text-primary">
                  Building with intent, learning in public.
                </p>
                <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                  Open to collaborate
                </span>
              </div>
            </div>

            <div className="mt-8">
              <FlowButton text="Get in touch" href="#contact" />
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 }}
            className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6"
          >
            <p className="text-sm font-bold uppercase text-accent">
              Career journey
            </p>
            <h3 className="mt-3 text-2xl font-extrabold text-text-primary">
              From fundamentals to products.
            </h3>

            <ol className="relative mt-8 space-y-1 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-border">
              {journeyDetails.map((step, index) => {
                const Icon = step.icon

                return (
                  <motion.li
                    key={step.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                      delay: shouldReduceMotion ? 0 : index * 0.04,
                    }}
                    className="relative flex gap-4 rounded-lg px-1 py-3"
                  >
                    <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-page text-accent shadow-sm">
                      <Icon aria-hidden="true" size={19} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-extrabold text-text-primary">{step.title}</p>
                      <p className="mt-1 text-sm leading-7 text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
            </ol>

            <details
              className="mt-6 rounded-lg border border-border bg-page p-4"
              onToggle={(event) => setIsGameOpen(event.currentTarget.open)}
            >
              <summary className="cursor-pointer text-sm font-bold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                Take a short Dino Game break
              </summary>
              {isGameOpen && (
                <iframe
                  src="https://wayou.github.io/t-rex-runner/"
                  title="Chrome Dino Game"
                  loading="lazy"
                  scrolling="no"
                  className="mt-4 h-52 w-full rounded-lg border border-border bg-white"
                />
              )}
            </details>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
