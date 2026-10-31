// Ambient glowing orbs + subtle grid behind every screen.
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-neon/[0.13] blur-[120px] dark:bg-neon/[0.12]" />
      <div className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-aqua/[0.12] blur-[120px]" />
      <div className="absolute bottom-[-12rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-violet/[0.08] blur-[120px]" />
    </div>
  )
}
