export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-navy p-12 text-mist lg:flex">
        <span className="font-display text-2xl font-semibold">TaskFlow</span>

        <div>
          {/* mini board: pending, in progress, completed */}
          <div className="mb-10 grid max-w-sm grid-cols-3 gap-3">
            {[
              ["bg-frost/20", "h-20"],
              ["bg-sky", "h-14"],
              ["bg-royal", "h-28"],
            ].map(([color, height], i) => (
              <div key={i} className="flex flex-col justify-end">
                <div className={`rounded-lg ${color} ${height}`} />
              </div>
            ))}
          </div>
          <p className="max-w-md font-display text-4xl font-semibold leading-tight">
            See what is pending, what is moving, and what is done.
          </p>
        </div>

        <p className="text-sm text-mist/60">Create, update and track your tasks in one place.</p>
      </aside>

      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm animate-rise">
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          <p className="mt-1.5 text-navy/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-sm text-navy/70">{footer}</p>
        </div>
      </main>
    </div>
  );
}