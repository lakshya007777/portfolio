import { Gamepad2, Smartphone, Globe } from 'lucide-react'
import { site } from '../../data/site'

const iconMap: Record<string, React.ReactNode> = {
  gamepad: <Gamepad2 size={28} />,
  smartphone: <Smartphone size={28} />,
  globe: <Globe size={28} />,
}

const cardClasses = ['card-3d-1', 'card-3d-2', 'card-3d-3'] as const

export function ServiceCards() {
  return (
    <>
      {/* Mobile: horizontal snap scroll with 3D cards */}
      <div className="relative z-20 -mx-4 flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide lg:hidden">
        {site.serviceCards.map((card, index) => (
          <article
            key={card.title}
            className="w-[200px] shrink-0 snap-center"
          >
            <Card3D card={card} index={index} />
          </article>
        ))}
      </div>

      {/* Desktop: floating 3D animated cards staggered on the right */}
      <div className="relative z-20 hidden h-full w-[300px] lg:block">
        {site.serviceCards.map((card, index) => {
          const positions = [
            { top: 60, right: -20 },
            { top: 250, right: -40 },
            { top: 440, right: -10 },
          ] as const

          const dotPositions = [
            { top: 40, right: 200 },
            { top: 232, right: -38 },
            { top: 420, right: 215 },
          ] as const

          const p = positions[index] ?? positions[0]
          const dp = dotPositions[index] ?? dotPositions[0]

          return (
            <div key={card.title}>
              {/* Decorative dot */}
              <div
                className="absolute h-2.5 w-2.5 rounded-full bg-gray-300"
                style={{ top: dp.top, right: dp.right }}
                aria-hidden
              />
              {/* 3D Card */}
              <div
                className="absolute"
                style={{ top: p.top, right: p.right }}
              >
                <Card3D card={card} index={index} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

function Card3D({
  card,
  index,
}: {
  card: (typeof site.serviceCards)[number]
  index: number
}) {
  const animClass = cardClasses[index] ?? cardClasses[0]

  return (
    <div className={`${animClass} glow-pulse w-[210px] rounded-2xl bg-surface/90 backdrop-blur-sm p-5 shadow-lg`}>
      {/* 3D Icon container with gradient background */}
      <div className="relative flex items-center justify-center">
        <div
          className={`relative h-[100px] w-full rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center overflow-hidden`}
        >
          {/* Orbiting particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="orbit-dot absolute h-2 w-2 rounded-full bg-white/40"
              style={{ transformOrigin: 'center center' }}
            />
            <div
              className="orbit-dot-2 absolute h-1.5 w-1.5 rounded-full bg-white/30"
              style={{ transformOrigin: 'center center' }}
            />
          </div>

          {/* Grid lines for 3D effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              transform: 'perspective(300px) rotateX(60deg)',
              transformOrigin: 'bottom',
            }} />
          </div>

          {/* Main icon */}
          <div className="icon-3d-spin relative text-white drop-shadow-lg">
            {iconMap[card.icon]}
          </div>

          {/* Floating mini shapes */}
          <div className="absolute top-3 right-3 h-3 w-3 rounded-sm bg-white/20 rotate-45" />
          <div className="absolute bottom-3 left-4 h-2 w-2 rounded-full bg-white/25" />
          <div className="absolute top-4 left-3 h-2.5 w-2.5 rounded-sm bg-white/15 rotate-12" />
        </div>
      </div>

      {/* Title with accent dot */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: card.accent }}
        />
        <p className="text-sm font-semibold text-text-primary">
          {card.title}
        </p>
      </div>
    </div>
  )
}
