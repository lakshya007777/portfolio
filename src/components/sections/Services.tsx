import { site } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function Services() {
  return (
    <section id="services" className="bg-page py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Services"
          subtitle="What I can help you build — from concept to launch."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {site.services.map((service, i) => (
            <article
              key={service.title}
              className="rounded-2xl bg-white p-8 shadow-lg shadow-black/5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl font-bold text-text-primary">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
