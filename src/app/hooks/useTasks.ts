import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Task {
  id: number;
  title: string;
  assignee: string;
  category: "Frontend" | "Architecture" | "State" | "Optimization";
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "DONE";
}

// Realistic Engineering Sprint Seed Data
const initialSprintBacklog: Task[] = [
  {
    id: 101,
    title: "Implement TanStack React Query cache hydration in Next.js layout",
    assignee: "Sanskriti",
    category: "Architecture",
    priority: "HIGH",
    status: "DONE",
  },
  {
    id: 102,
    title: "Migrate filter & query drawer state to lightweight Zustand store",
    assignee: "Sanskriti",
    category: "State",
    priority: "HIGH",
    status: "OPEN",
  },
  {
    id: 103,
    title: "Audit App Router client boundary bundles to reduce initial payload",
    assignee: "Team",
    category: "Optimization",
    priority: "MEDIUM",
    status: "OPEN",
  },
  {
    id: 104,
    title: "Write optimistic cache update handler for task completion toggles",
    assignee: "Sanskriti",
    category: "Frontend",
    priority: "MEDIUM",
    status: "OPEN",
  },
  {
    id: 105,
    title: "Configure staleTime: 60000ms to eliminate redundant network re-fetching",
    assignee: "Team",
    category: "Architecture",
    priority: "LOW",
    status: "DONE",
  },
  {
    id: 106,
    title: "Review PR #14: Enforce strict TypeScript interfaces across backlog models",
    assignee: "Lead",
    category: "Optimization",
    priority: "HIGH",
    status: "OPEN",
  },
];

export function useTasks() {
  const queryClient = useQueryClient();

  // 1. Fetcher with simulated network latency to demonstrate real React Query loading
  const taskQuery = useQuery({
    queryKey: ["sprint-tasks"],
    queryFn: async (): Promise<Task[]> => {
      // Simulate real microsecond async network turnaround
      await new Promise((resolve) => setTimeout(resolve, 200));
      return initialSprintBacklog;
    },
    staleTime: 1000 * 60 * 5, // Cache stays fresh for 5 mins
  });

  // 2. Add Task Mutation
  const addTaskMutation = useMutation({
    mutationFn: async (newTask: Omit<Task, "id">) => {
      return { id: Date.now(), ...newTask };
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(["sprint-tasks"], (old = []) => [
        createdTask,
        ...old,
      ]);
    },
  });

  // 3. Toggle Status Mutation
  const toggleTaskMutation = useMutation({
    mutationFn: async (id: number) => id,
    onSuccess: (id) => {
      queryClient.setQueryData<Task[]>(["sprint-tasks"], (old = []) =>
        old.map((t) =>
          t.id === id ? { ...t, status: t.status === "OPEN" ? "DONE" : "OPEN" } : t
        )
      );
    },
  });

  // 4. Delete Task Mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => id,
    onSuccess: (id) => {
      queryClient.setQueryData<Task[]>(["sprint-tasks"], (old = []) =>
        old.filter((t) => t.id !== id)
      );
    },
  });

  return {
    tasks: taskQuery.data || [],
    isLoading: taskQuery.isLoading,
    isError: taskQuery.isError,
    addTask: addTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
}