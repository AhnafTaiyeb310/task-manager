import { Task, TaskStatus } from "./types";

const BASE_API = "/api/tasks";

function handleRequestError(err: unknown): never {
  if (err instanceof Error && err.message.includes("Failed to fetch")) {
    throw new Error(
      "Connection refused: Please verify the backend server is running",
    );
  }
  throw err;
}

export async function fetchTasks(): Promise<Task[]> {
  try {
    const res = await fetch(BASE_API);
    if (!res.ok) {
      throw new Error(`Server returned error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (err: unknown) {
    handleRequestError(err);
  }
}

export async function createTask(
  title: string,
  description: string,
  status: TaskStatus,
): Promise<Task> {
  try {
    const res = await fetch(BASE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });
    if (!res.ok) {
      throw new Error(`Server returned error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (err: unknown) {
    handleRequestError(err);
  }
}

export async function updateTaskStatus(
  id: number,
  status: TaskStatus,
): Promise<Task> {
  try {
    const res = await fetch(`${BASE_API}/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      throw new Error(`Server returned error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (err: unknown) {
    handleRequestError(err);
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    const res = await fetch(`${BASE_API}/${id}/`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Server returned error: ${res.status} ${res.statusText}`);
    }
  } catch (err: unknown) {
    handleRequestError(err);
  }
}
