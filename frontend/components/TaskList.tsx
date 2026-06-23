import { Task } from "@/lib/types";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onStatusChange: (id: number, status: Task["status"]) => void;
  onDelete: (id: number) => void;
  pendingTasks: Record<number, "updating" | "deleting" | null>;
}

export default function TaskList({
  tasks,
  onStatusChange,
  onDelete,
  pendingTasks,
}: Props) {
  if (tasks.length === 0) {
    return (
      <div className="grid min-h-[340px] place-items-center px-5 py-12 text-center">
        <div className="max-w-sm">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-xl text-teal-200">
            +
          </div>
          <h3 className="text-lg font-semibold text-white">No tasks yet</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Add your first task from the capture panel and it will appear here.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          isUpdating={pendingTasks[task.id] === "updating"}
          isDeleting={pendingTasks[task.id] === "deleting"}
        />
      ))}
    </div>
  );
}
