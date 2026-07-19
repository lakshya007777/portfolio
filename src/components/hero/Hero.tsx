import { HeroIntro } from './HeroIntro'
import { HeroPortrait } from './HeroPortrait'
import { ServiceCards } from './ServiceCards'

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-page"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile layout */}
        <div className="relative z-20 flex flex-col gap-10 lg:hidden px-2 py-10 pt-6">
          <HeroIntro />
          <div className="flex justify-center">
            <HeroPortrait />
          </div>
          <ServiceCards />
        </div>

        {/* Desktop layout — full-height hero, portrait flush to bottom */}
        <div className="relative z-20 hidden lg:block" style={{ minHeight: '88vh' }}>
          {/* Left intro text — vertically centered */}
          <div className="absolute left-0 top-0 flex h-full w-[420px] items-center">
            <HeroIntro />
          </div>

          {/* Center portrait — flush to the very bottom edge */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none" style={{ lineHeight: 0 }}>
            <HeroPortrait />
          </div>

          {/* Right service cards — staggered 3D animated */}
          <div className="absolute right-0 top-0 h-full w-[300px]">
            <ServiceCards />
          </div>
        </div>
      </div>
    </section>
  )
}
