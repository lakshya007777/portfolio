import { Award, FolderKanban, TimerReset } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [Award, FolderKanban, TimerReset] as const

export function Achievements() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="achievements" className="bg-surface py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience shown through shipped work and competitive building."
          subtitle="A compact view of the portfolio milestones already present in the site."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {site.about.achievements.map((achievement, index) => {
            const Icon = icons[index] ?? Award

            return (
              <motion.article
                key={achievement.label}
                className="rounded-lg border border-border bg-page p-6 shadow-sm"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.36, ease: 'easeOut', delay: index * 0.05 }}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon aria-hidden="true" size={21} />
                </span>
                <p className="mt-5 text-4xl font-extrabold text-text-primary">
                  {achievement.value}
                </p>
                <p className="mt-2 text-sm font-bold text-text-secondary">
                  {achievement.label}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
