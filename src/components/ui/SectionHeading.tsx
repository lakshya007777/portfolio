type SectionHeadingProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
      }
    >
      <h2 className="text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
