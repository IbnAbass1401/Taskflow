import { useEffect, useRef, useState } from "react";

const NEXT = {
  pending: { to: "in-progress", label: "Start" },
  "in-progress": { to: "completed", label: "Complete" },
  completed: { to: "pending", label: "Reopen" },
};

const PRIORITY_STYLE = {
  high: "bg-royal text-mist",
  medium: "bg-sky/30 text-navy",
  low: "bg-frost text-navy",
};

function formatDue(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export default function TaskCard({ task, removing, onStatusChange, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const next = NEXT[task.status];
  const done = task.status === "completed";
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
  const overdue = task.dueDate && !done && task.dueDate.slice(0, 10) < today;

  const handleDelete = () => {
    if (!confirming) {
      setConfirming(true);
      timer.current = setTimeout(() => setConfirming(false), 3000);
      return;
    }
    clearTimeout(timer.current);
    onDelete(task._id);
  };

  return (
    <article
      className={`animate-pop rounded-2xl border border-frost bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-sky hover:shadow-lift ${
        removing ? "pointer-events-none scale-95 opacity-0" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-display text-lg font-semibold leading-snug ${
            done ? "text-navy/50 line-through" : ""
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${PRIORITY_STYLE[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="mt-1.5 line-clamp-2 text-sm text-navy/70">{task.description}</p>
      )}

      {task.dueDate && (
        <p className={`mt-3 text-sm ${overdue ? "font-medium text-danger" : "text-navy/60"}`}>
          {overdue ? "Overdue: " : "Due "}
          {formatDue(task.dueDate)}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-frost pt-3">
        <button
          onClick={() => onStatusChange(task, next.to)}
          className={`rounded-lg px-3.5 py-2 text-sm font-medium transition duration-150 active:scale-95 ${
            done
              ? "border border-frost bg-white text-navy hover:border-sky"
              : "bg-royal text-mist hover:bg-royal/90"
          }`}
        >
          {next.label}
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-navy/70 transition duration-150 hover:bg-frost hover:text-navy"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition duration-150 ${
              confirming
                ? "bg-danger text-white"
                : "text-navy/70 hover:bg-danger/10 hover:text-danger"
            }`}
          >
            {confirming ? "Sure?" : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}