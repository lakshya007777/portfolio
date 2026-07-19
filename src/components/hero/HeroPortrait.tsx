import { site } from '../../data/site'

export function HeroPortrait() {
  return (
    <div className="relative z-10 mx-auto flex w-full items-end justify-center lg:max-w-[520px]">
      <img
        src={site.portrait}
        alt="Lakshya portrait"
        width={480}
        height={640}
        className="w-[min(82vw,420px)] object-contain object-bottom lg:w-[min(38vw,480px)] drop-shadow-2xl"
        style={{ maxHeight: '82vh', display: 'block' }}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  )
}
