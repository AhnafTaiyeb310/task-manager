import { STATUS_LABELS, Task, TaskStatus } from "@/lib/types";

interface Props {
  task: Task;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
  isUpdating,
  isDeleting,
}: Props) {
  const isBusy = isUpdating || isDeleting;
  const statusStyles: Record<TaskStatus, string> = {
    todo: "border-red-500/30 bg-red-500/10 text-red-200",
    in_progress: "border-amber-300/30 bg-amber-300/10 text-amber-100",
    done: "border-green-400/30 bg-green-400/10 text-green-300",
  };

  return (
    <article
      className={`group border-b border-white/10 px-5 py-4 transition hover:bg-white/[0.03] ${isBusy ? "opacity-60" : ""}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status]}`}
            >
              {STATUS_LABELS[task.status]}
            </span>
            <span className="text-xs text-zinc-600">
              {new Date(task.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="break-words text-base font-semibold text-white">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 break-words text-sm leading-6 text-zinc-400">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <select
            value={task.status}
            onChange={(e) =>
              onStatusChange(task.id, e.target.value as TaskStatus)
            }
            className="min-h-10 flex-1 rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-100 outline-none transition focus:border-teal-300/70 focus:ring-2 focus:ring-teal-300/15 disabled:opacity-50 sm:flex-none [&>option]:bg-zinc-950 [&>option]:text-zinc-100"
            disabled={isBusy}
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            onClick={() => onDelete(task.id)}
            className="min-h-10 rounded-md border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-200 transition hover:border-red-300/40 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[92px]"
            disabled={isBusy}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
