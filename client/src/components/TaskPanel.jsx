import { useEffect, useState } from "react";
import { PRIORITIES, STATUSES } from "../constants";
import Field from "./Field";

function Segmented({ label, options, value, onChange }) {
  return (
    <div>
      <span className="mb-2 block text-base font-medium lg:mb-1.5 lg:text-sm">{label}</span>
      <div className="grid auto-cols-fr grid-flow-col gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-xl border px-2 py-3 text-sm font-medium transition duration-150 active:scale-95 lg:rounded-lg lg:py-2 ${
              value === o.value
                ? "border-royal bg-royal text-mist"
                : "border-frost bg-white hover:border-sky"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const EMPTY = { title: "", description: "", priority: "medium", status: "pending", dueDate: "" };

export default function TaskPanel({ task, onClose, onSave }) {
  const [form, setForm] = useState(() =>
    task
      ? {
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        }
      : EMPTY
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSave({ ...form, title: form.title.trim(), dueDate: form.dueDate || null });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 animate-fade bg-navy/40" onClick={onClose} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={task ? "Edit task" : "New task"}
        className="relative flex h-full w-full animate-slide-in flex-col bg-mist shadow-panel sm:max-w-md"
      >
        <div className="flex items-center justify-between border-b border-frost px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">
            {task ? "Edit task" : "New task"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-medium transition duration-150 hover:bg-frost"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 space-y-5 px-5 py-6">
            <Field
              label="Title"
              id="title"
              placeholder="What needs doing?"
              value={form.title}
              onChange={(e) => set("title")(e.target.value)}
              maxLength={100}
              required
              autoFocus
            />

            <div>
              <label htmlFor="description" className="mb-2 block text-base font-medium lg:mb-1.5 lg:text-sm">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Add some detail (optional)"
                value={form.description}
                onChange={(e) => set("description")(e.target.value)}
                className="w-full resize-none rounded-xl border border-frost bg-white px-4 py-4 text-lg outline-none transition duration-150 placeholder:text-navy/40 hover:border-sky focus:border-royal focus:ring-4 focus:ring-sky/30 lg:rounded-lg lg:py-2.5 lg:text-sm"
              />
            </div>

            <Segmented label="Priority" options={PRIORITIES} value={form.priority} onChange={set("priority")} />
            <Segmented label="Status" options={STATUSES} value={form.status} onChange={set("status")} />

            <Field
              label="Due date"
              id="dueDate"
              type="date"
              value={form.dueDate}
              onChange={(e) => set("dueDate")(e.target.value)}
            />

            {error && (
              <p role="alert" className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-base text-danger lg:text-sm">
                {error}
              </p>
            )}
          </div>

          <div className="border-t border-frost bg-white px-5 py-4">
            <button
              disabled={saving}
              className="w-full rounded-xl bg-royal px-4 py-4 text-lg font-medium text-mist transition duration-150 hover:bg-royal/90 active:scale-[0.98] disabled:opacity-60 lg:rounded-lg lg:py-2.5 lg:text-sm"
            >
              {saving ? "Saving..." : task ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}