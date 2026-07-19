export function DecorativeShapes() {
  return (
    <>
      {/* Very subtle background gradient orbs — barely visible, just adds depth */}
      <div
        className="pointer-events-none absolute -left-40 -top-20 hidden h-[500px] w-[500px] rounded-full bg-blue-50/40 blur-3xl lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-40 hidden h-[400px] w-[400px] rounded-full bg-blue-50/30 blur-3xl lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/3 hidden h-[350px] w-[350px] rounded-full bg-gray-100/50 blur-3xl lg:block"
        aria-hidden
      />
    </>
  )
}
