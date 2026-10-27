export default function App() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-navy">TaskFlow</h1>
      <div className="mt-6 flex gap-3">
        <div className="h-16 w-16 rounded-lg bg-mist border border-frost" />
        <div className="h-16 w-16 rounded-lg bg-frost" />
        <div className="h-16 w-16 rounded-lg bg-sky" />
        <div className="h-16 w-16 rounded-lg bg-royal" />
        <div className="h-16 w-16 rounded-lg bg-navy" />
      </div>
      <button className="mt-6 rounded-lg bg-royal px-4 py-2 text-mist hover:bg-royal/90">
        Add Task
      </button>
    </div>
  );
}