import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { STATUSES } from "../constants";
import Navbar from "../components/Navbar";
import TaskColumn from "../components/TaskColumn";
import TaskPanel from "../components/TaskPanel";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function Skeleton() {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`space-y-3 rounded-2xl bg-frost/40 p-3 ${i > 0 ? "hidden lg:block" : ""}`}>
          {[0, 1].map((j) => (
            <div key={j} className="h-28 animate-pulse rounded-2xl bg-frost" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("pending");
  const [panel, setPanel] = useState(null); // null, "new", or a task
  const [removing, setRemoving] = useState([]);

  const loadTasks = useCallback(async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
      setError("");
    } catch {
      setError("Could not load your tasks. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const grouped = useMemo(
    () =>
      Object.fromEntries(
        STATUSES.map((s) => [s.value, tasks.filter((t) => t.status === s.value)])
      ),
    [tasks]
  );

  const total = tasks.length;
  const done = grouped.completed.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const closePanel = useCallback(() => setPanel(null), []);

  const handleSave = async (values) => {
    if (panel && panel !== "new") {
      const { data: updated } = await api.put(`/tasks/${panel._id}`, values);
      setTasks((t) => t.map((x) => (x._id === updated._id ? updated : x)));
    } else {
      const { data: created } = await api.post("/tasks", values);
      setTasks((t) => [created, ...t]);
      setTab(created.status);
    }
    setPanel(null);
  };

  const handleStatusChange = async (task, status) => {
    setTasks((t) => t.map((x) => (x._id === task._id ? { ...x, status } : x)));
    setTab(status);
    try {
      await api.put(`/tasks/${task._id}`, { status });
    } catch {
      loadTasks();
    }
  };

  const handleDelete = async (id) => {
    setRemoving((r) => [...r, id]);
    try {
      await Promise.all([
        api.delete(`/tasks/${id}`),
        new Promise((resolve) => setTimeout(resolve, 200)),
      ]);
      setTasks((t) => t.filter((x) => x._id !== id));
    } catch {
      setError("Could not delete that task. Try again.");
    } finally {
      setRemoving((r) => r.filter((x) => x !== id));
    }
  };

  return (
    <div className="min-h-dvh pb-28 lg:pb-12">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-8 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold lg:text-3xl">
              {greeting()}, {user.name.split(" ")[0]}
            </h1>
            <p className="mt-1.5 text-lg text-navy/70 lg:text-base">
              {total === 0 ? "Add your first task to get started." : `${done} of ${total} tasks done.`}
            </p>
          </div>

          <button
            onClick={() => setPanel("new")}
            className="fixed bottom-5 right-5 z-30 rounded-full bg-royal px-6 py-4 text-lg font-medium text-mist shadow-lift transition duration-150 hover:bg-royal/90 active:scale-95 lg:static lg:rounded-xl lg:px-5 lg:py-2.5 lg:text-base lg:shadow-none"
          >
            + New task
          </button>
        </div>

        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-frost"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-royal transition-[width] duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* phone: tabs */}
        <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-frost/60 p-1.5 lg:hidden" role="tablist">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              role="tab"
              aria-selected={tab === s.value}
              onClick={() => setTab(s.value)}
              className={`rounded-xl px-2 py-3 text-sm font-medium transition duration-150 ${
                tab === s.value ? "bg-white text-navy shadow-sm" : "text-navy/60"
              }`}
            >
              {s.label}
              <span className="block text-xs text-navy/50">{grouped[s.value].length}</span>
            </button>
          ))}
        </div>

        {error && (
          <div role="alert" className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-danger">
            <span className="text-base lg:text-sm">{error}</span>
            <button
              onClick={() => {
                setLoading(true);
                loadTasks();
              }}
              className="font-medium underline"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <>
            <Skeleton />
            <p className="mt-4 text-sm text-navy/60">
              Loading your tasks. The first load can take a moment while the server wakes up.
            </p>
          </>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {STATUSES.map((s, i) => (
              <TaskColumn
                key={s.value}
                status={s}
                index={i}
                active={tab === s.value}
                tasks={grouped[s.value]}
                removing={removing}
                onStatusChange={handleStatusChange}
                onEdit={setPanel}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {panel && (
        <TaskPanel
          key={panel === "new" ? "new" : panel._id}
          task={panel === "new" ? null : panel}
          onClose={closePanel}
          onSave={handleSave}
        />
      )}
    </div>
  );
}