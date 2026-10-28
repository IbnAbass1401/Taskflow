import TaskCard from "./TaskCard";

export default function TaskColumn({
  status,
  tasks,
  active,
  index,
  removing,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  return (
    <section
      className={`animate-rise rounded-2xl bg-frost/40 p-3 lg:block ${active ? "block" : "hidden"}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <h2 className="mb-3 hidden items-center justify-between px-1 font-display text-lg font-semibold lg:flex">
        {status.label}
        <span className="rounded-full bg-white px-2.5 py-0.5 text-sm font-medium text-navy/70">
          {tasks.length}
        </span>
      </h2>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-sky/60 px-4 py-8 text-center text-sm text-navy/60">
            {status.empty}
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              removing={removing.includes(task._id)}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}