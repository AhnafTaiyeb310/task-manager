"use client";

import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "@/lib/api";
import { Task, TaskStatus } from "@/lib/types";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const statusOrder: TaskStatus[] = ["todo", "in_progress", "done"];

const statusSummary: Record<TaskStatus, { label: string; accent: string }> = {
  todo: { label: "To do", accent: "bg-red-400" },
  in_progress: { label: "In progress", accent: "bg-amber-400" },
  done: { label: "Done", accent: "bg-green-300" },
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingTasks, setPendingTasks] = useState<
    Record<number, "updating" | "deleting" | null>
  >({});
  const completedCount = tasks.filter((task) => task.status === "done").length;
  const activeCount = tasks.length - completedCount;

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(
    title: string,
    description: string,
    status: TaskStatus,
  ) {
    try {
      const newTask = await createTask(title, description, status);
      setTasks([newTask, ...tasks]);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to add task");
      await loadTasks(); // Refresh to be safe
    }
  }

  async function handleStatusChange(id: number, newStatus: TaskStatus) {
    setPendingTasks((prev) => ({ ...prev, [id]: "updating" }));
    try {
      const updated = await updateTaskStatus(id, newStatus);
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update status");
      await loadTasks(); // Revert to server state
    } finally {
      setPendingTasks((prev) => ({ ...prev, [id]: null }));
    }
  }

  async function handleDelete(id: number) {
    setPendingTasks((prev) => ({ ...prev, [id]: "deleting" }));
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete task");
      await loadTasks(); // Revert to server state
    } finally {
      setPendingTasks((prev) => ({ ...prev, [id]: null }));
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="border-b border-white/10 px-5 py-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-md bg-teal-300 text-lg font-black text-zinc-950">
                    T
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">
                      Workspace
                    </p>
                    <h1 className="text-2xl font-semibold text-white">
                      Task Manager
                    </h1>
                  </div>
                </div>
                <div className="rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-xs font-semibold text-teal-200">
                  Live
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Active
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {activeCount}
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Complete
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-teal-200">
                    {completedCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 px-5 py-5">
              {statusOrder.map((status) => {
                const count = tasks.filter(
                  (task) => task.status === status,
                ).length;
                return (
                  <div
                    key={status}
                    className="flex items-center justify-between rounded-md border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`size-2.5 rounded-full ${statusSummary[status].accent}`}
                      />
                      <span className="text-sm font-medium text-zinc-300">
                        {statusSummary[status].label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <TaskForm onAdd={handleAdd} />
        </aside>

        <section className="min-w-0 rounded-lg border border-white/10 bg-zinc-950/55 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">
                Current sprint
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Today&apos;s tasks
              </h2>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-400">
              {tasks.length} total tasks
            </div>
          </div>

          {error && (
            <div className="m-5 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid min-h-[340px] place-items-center px-5 py-12 text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="size-3 animate-pulse rounded-full bg-teal-300" />
                Loading tasks...
              </div>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              pendingTasks={pendingTasks}
            />
          )}
        </section>
      </section>
    </main>
  );
}
