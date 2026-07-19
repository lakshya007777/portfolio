import { site } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'
import { FlowButton } from '../ui/FlowButton'

export function About() {
  return (
    <section id="about" className="bg-surface py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-lg lg:mx-0 rounded-2xl overflow-hidden border border-border shadow-sm bg-surface min-h-[380px]">
            {/* Background Image at full opacity */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url('/about-photo.png')` }}
            />
            {/* Dino Game ground strip anchored to the bottom of the image */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 h-[200px] overflow-hidden"
              style={{ mixBlendMode: 'darken' }}
            >
              <iframe
                src="https://wayou.github.io/t-rex-runner/"
                className="absolute bottom-0 left-0 w-full"
                style={{
                  border: 'none',
                  height: '200px',
                  background: 'white',
                }}
                title="Chrome Dino Game"
                scrolling="no"
              />
            </div>
          </div>
          <div>
            <SectionHeading
              title={site.about.title}
              subtitle={site.about.subtitle}
            />
            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              {site.about.longBio}
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              {site.about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-accent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {site.about.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-page px-3 py-1.5 text-sm font-medium text-text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <FlowButton text="Get in touch" href="#contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
