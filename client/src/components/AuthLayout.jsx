function MiniBoard({ heights, className = "" }) {
  const colors = ["bg-frost/20", "bg-sky", "bg-royal"];
  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
      {colors.map((color, i) => (
        <div key={color} className="flex flex-col justify-end">
          <div className={`rounded-lg ${color} ${heights[i]}`} />
        </div>
      ))}
    </div>
  );
}

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-dvh flex-col lg:grid lg:grid-cols-2">
      {/* laptop: side panel */}
      <aside className="hidden flex-col justify-between bg-navy p-12 text-mist lg:flex">
        <span className="font-display text-4xl font-semibold">TaskFlow</span>
        <div>
          <MiniBoard heights={["h-20", "h-14", "h-28"]} className="mb-10 max-w-sm" />
          <p className="max-w-md font-display text-4xl font-semibold leading-tight">
            See what is pending, what is moving, and what is done.
          </p>
        </div>
        <p className="text-sm text-mist/60">
          Create, update and track your tasks in one place.
        </p>
      </aside>

      {/* phone: compact header */}
      <header className="bg-navy px-6 pb-10 pt-10 text-mist lg:hidden">
        <span className="font-display text-4xl font-semibold">TaskFlow</span>
        <MiniBoard heights={["h-10", "h-7", "h-14"]} className="mt-6 max-w-56" />
        <p className="mt-5 font-display text-xl font-semibold leading-snug text-mist/90">
        See what is pending, what is moving, and what is done.
        </p>
      </header>

      {/* form card: fills the rest of the phone screen */}
      <main className="flex flex-1 p-4 pb-6 lg:items-center lg:justify-center lg:p-6">
        <div className="flex w-full animate-rise flex-col justify-center rounded-3xl border border-frost bg-white p-6 shadow-lift lg:max-w-sm lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
          <h1 className="font-display text-4xl font-semibold lg:text-3xl">{title}</h1>
          <p className="mt-2 text-lg text-navy/70 lg:mt-1.5 lg:text-base">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-base text-navy/70 lg:mt-6 lg:text-sm">{footer}</p>
        </div>
      </main>
    </div>
  );
}