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
      className={`animate-pop rounded-2xl border border-frost bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-sky hover:shadow-lift sm:p-4 ${
        removing ? "pointer-events-none scale-95 opacity-0" : ""
      }`}
    >
      <span
        className={`inline-block rounded-full px-3 py-1 text-sm font-medium capitalize sm:float-right sm:ml-3 sm:px-2.5 sm:text-xs ${PRIORITY_STYLE[task.priority]}`}
      >
        {task.priority}
      </span>

      <h3
        className={`mt-3 font-display text-xl font-semibold leading-snug sm:mt-0 sm:text-lg ${
          done ? "text-navy/50 line-through" : ""
        }`}
      >
        {task.title}
      </h3>

      {task.description && (
        <p className="mt-2 line-clamp-3 text-base text-navy/70 sm:mt-1.5 sm:line-clamp-2 sm:text-sm">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <p
          className={`mt-3 text-base sm:text-sm ${
            overdue ? "font-medium text-danger" : "text-navy/60"
          }`}
        >
          {overdue ? "Overdue: " : "Due "}
          {formatDue(task.dueDate)}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 border-t border-frost pt-4 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-3">
        <button
          onClick={() => onStatusChange(task, next.to)}
          className={`w-full rounded-xl px-4 py-3.5 text-base font-medium transition duration-150 active:scale-95 sm:w-auto sm:rounded-lg sm:px-3.5 sm:py-2 sm:text-sm ${
            done
              ? "border border-frost bg-white text-navy hover:border-sky"
              : "bg-royal text-mist hover:bg-royal/90"
          }`}
        >
          {next.label}
        </button>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-1">
          <button
            onClick={() => onEdit(task)}
            className="rounded-xl border border-frost py-3 text-base font-medium text-navy transition duration-150 hover:border-sky hover:bg-frost/50 sm:rounded-lg sm:border-transparent sm:px-3 sm:py-2 sm:text-sm sm:text-navy/70"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={`rounded-xl border py-3 text-base font-medium transition duration-150 sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm ${
              confirming
                ? "border-danger bg-danger text-white"
                : "border-frost text-navy hover:border-danger hover:bg-danger/10 hover:text-danger sm:border-transparent sm:text-navy/70"
            }`}
          >
            {confirming ? "Yes" : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}