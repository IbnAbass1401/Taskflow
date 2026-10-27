const swatches = [
  "bg-mist border border-frost",
  "bg-frost",
  "bg-sky",
  "bg-royal",
  "bg-navy",
];

export default function App() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="font-display text-4xl font-semibold">TaskFlow</h1>
      <p className="mt-2 text-navy/70">Plan it, track it, finish it.</p>

      <div className="mt-6 flex gap-3">
        {swatches.map((cls) => (
          <div key={cls} className={`h-16 w-16 rounded-lg ${cls}`} />
        ))}
      </div>

      <div className="mt-8 w-72 rounded-xl border border-frost bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-sky hover:shadow-lift">
        <h2 className="font-display text-lg font-semibold">Finish the dashboard</h2>
        <p className="mt-1 text-sm text-navy/70">Hover this card.</p>
      </div>

      <button className="mt-6 rounded-lg bg-royal px-4 py-2 font-medium text-mist transition duration-150 hover:bg-royal/90 active:scale-95">
        New task
      </button>
    </div>
  );
}