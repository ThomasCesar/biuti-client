export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-around relative bg-radial-[at_50%_75%] from-primary via-secondary to-secondary/20 to-90%">
      <div className="@container relative w-full max-w-[402px] h-full max-h-[874px] md:border md:rounded-2xl bg-background md:overflow-clip md:shadow-2xl md:shadow-background/50">
        {children}
      </div>
    </div>
  )
}