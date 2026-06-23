"use client";
import { STATUS_LABELS, TaskStatus } from "@/lib/types";
import { useState } from "react";

interface Props {
  onAdd: (
    title: string,
    description: string,
    status: TaskStatus,
  ) => Promise<void>;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setIsLoading(true);
    try {
      await onAdd(title.trim(), desc.trim(), status);
      setTitle("");
      setDesc("");
      setStatus("todo");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add task.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur"
    >
      <div className="mb-5">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">
          Capture
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white">New task</h2>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-teal-300/70 focus:ring-2 focus:ring-teal-300/15"
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-teal-300/70 focus:ring-2 focus:ring-teal-300/15"
          disabled={isLoading}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none transition focus:border-teal-300/70 focus:ring-2 focus:ring-teal-300/15"
          disabled={isLoading}
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {error && (
          <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-teal-300 px-4 py-3 text-sm font-bold text-zinc-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}
