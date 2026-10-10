"use client";

import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { useFilterStore } from "./store/useFilterStore";
import {
  CheckCircle2,
  Circle,
  Plus,
  Search,
  RotateCcw,
  Layers,
  Trash2,
  Check,
  Tag,
  GitPullRequest,
} from "lucide-react";

export default function DevSprintPage() {
  const { tasks, isLoading, isError, addTask, toggleTask, deleteTask } = useTasks();
  const {
    searchQuery,
    setSearchQuery,
    selectedPriority,
    setSelectedPriority,
    resetFilters,
  } = useFilterStore();

  const [taskTitle, setTaskTitle] = useState("");
  const [priorityInput, setPriorityInput] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [categoryInput, setCategoryInput] = useState<"Frontend" | "Architecture" | "State" | "Optimization">("Frontend");

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      selectedPriority === "ALL" || t.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const completedCount = tasks.filter((t) => t.status === "DONE").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask({
      title: taskTitle.trim(),
      assignee: "Sanskriti",
      category: categoryInput,
      priority: priorityInput,
      status: "OPEN",
    });
    setTaskTitle("");
  };

  return (
    <main className="max-w-3xl mx-auto px-5 py-10 space-y-7">
      {/* Editorial Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Sprint 26.4 • Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            DevSprint Workspace
          </h1>
          <p className="text-sm text-slate-500">
            Backlog orchestration across Next.js components and query syncs.
          </p>
        </div>

        {/* Sprint Progress Gauge */}
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-xs flex flex-col gap-1.5 min-w-[140px]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Sprint Velocity</span>
            <span className="font-semibold text-slate-800">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>{tasks.length} tickets</span>
            <span className="text-emerald-600 font-medium">{completedCount} closed</span>
          </div>
        </div>
      </header>

      {/* Task Creation Box */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 transition-all">
        <form onSubmit={handleCreateTask} className="space-y-3">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <GitPullRequest className="w-3.5 h-3.5 text-indigo-500" />
              <span>Create Backlog Item</span>
            </div>
            <span className="text-[11px] text-slate-400">Auto-assigned: Sanskriti</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              placeholder="e.g., Configure optimistic cache updates for task mutation..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="flex-1 bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />

            <div className="flex gap-2">
              <select
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value as any)}
                className="bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-slate-400"
              >
                <option value="Frontend">Frontend</option>
                <option value="Architecture">Architecture</option>
                <option value="State">State</option>
                <option value="Optimization">Optimization</option>
              </select>

              <select
                value={priorityInput}
                onChange={(e) => setPriorityInput(e.target.value as any)}
                className="bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-slate-400"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Filter & Search Bar (Managed by Zustand) */}
      <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets, tags, or assignees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
          />
        </div>

        {/* Priority Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          {(["ALL", "HIGH", "MEDIUM", "LOW"] as const).map((prio) => (
            <button
              key={prio}
              onClick={() => setSelectedPriority(prio)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                selectedPriority === prio
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {prio}
            </button>
          ))}
          {(searchQuery || selectedPriority !== "ALL") && (
            <button
              onClick={resetFilters}
              title="Reset Filters"
              className="px-2 py-1.5 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Task List (Managed by React Query) */}
      <section className="space-y-2.5">
        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
          <span>Sprint Backlog ({filteredTasks.length})</span>
          <span>Priority & Action</span>
        </div>

        {isLoading && (
          <div className="py-14 text-center border border-dashed border-slate-200 rounded-2xl bg-white">
            <div className="inline-block w-5 h-5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin mb-3" />
            <p className="text-xs text-slate-400 font-medium">Hydrating sprint tickets via React Query...</p>
          </div>
        )}

        {isError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 text-center">
            Could not fetch backlog items. Please check network connectivity.
          </div>
        )}

        {!isLoading && filteredTasks.length === 0 && (
          <div className="py-12 text-center border border-slate-200 rounded-2xl bg-white">
            <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">No matching tickets found</p>
            <p className="text-xs text-slate-400 mt-0.5">Refine your search term or active priority.</p>
          </div>
        )}

        {filteredTasks.map((t) => (
          <div
            key={t.id}
            className={`group flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl transition-all duration-150 hover:border-slate-300 hover:shadow-xs ${
              t.status === "DONE" ? "bg-slate-50/60 opacity-75" : ""
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0 pr-3">
              <button
                onClick={() => toggleTask(t.id)}
                className="shrink-0 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {t.status === "DONE" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="space-y-1 min-w-0">
                <span
                  className={`text-sm tracking-tight block truncate ${
                    t.status === "DONE"
                      ? "line-through text-slate-400"
                      : "text-slate-800 font-normal"
                  }`}
                >
                  {t.title}
                </span>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                    <Tag className="w-2.5 h-2.5" />
                    {t.category}
                  </span>
                  <span>•</span>
                  <span>Assigned: <strong className="font-medium text-slate-600">{t.assignee}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-md border ${
                  t.priority === "HIGH"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : t.priority === "MEDIUM"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {t.priority}
              </span>

              <button
                onClick={() => deleteTask(t.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 rounded transition-all cursor-pointer"
                title="Delete ticket"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Grounded Technical Footer */}
      <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Architecture:</span>
          <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            React Query (Server Cache) + Zustand (Filter Store)
          </span>
        </div>
        <div>
          <span>Next.js 16 App Router</span>
        </div>
      </footer>
    </main>
  );
}