"use client";
import { useState } from "react";
import {
  CheckSquare, Plus, Search, MoreHorizontal,
  Calendar, CheckCircle2, Circle, Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/misc";
import { mockTasks } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types";

const statusTabs: { id: TaskStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "todo", label: "To Do" },
  { id: "in_progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

const priorityConfig: Record<string, { label: string; variant: "danger" | "warning" | "info" | "muted" | "success"; icon: string }> = {
  urgent: { label: "Urgent", variant: "danger", icon: "🔴" },
  high: { label: "High", variant: "warning", icon: "🟠" },
  medium: { label: "Medium", variant: "info", icon: "🟡" },
  low: { label: "Low", variant: "muted", icon: "⚪" },
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeTab, setActiveTab] = useState<TaskStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filtered = tasks.filter((t) => {
    const matchTab = activeTab === "all" || t.status === activeTab;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "todo" : ("done" as TaskStatus), completedAt: t.status !== "done" ? new Date().toISOString() : undefined }
          : t
      )
    );
  };

  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-(--text-primary) tracking-tight">Tasks</h1>
          <p className="text-sm text-(--text-muted) mt-0.5">{todoCount} pending · {inProgressCount} in progress · {doneCount} done</p>
        </div>
        <Button icon={<Plus size={15} />} onClick={() => setShowAddModal(true)}>
          New Task
        </Button>
      </div>

      {/* Progress stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "To Do", count: todoCount, color: "#94a3b8", bg: "bg-slate-100 text-slate-600" },
          { label: "In Progress", count: inProgressCount, color: "#38bdf8", bg: "bg-sky-100 text-sky-600" },
          { label: "Done", count: doneCount, color: "#10b981", bg: "bg-emerald-100 text-emerald-600" },
        ].map((s) => (
          <Card key={s.label} padding="sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-(--text-muted)">{s.label}</p>
                <p className="font-display text-2xl font-bold text-(--text-primary) font-num">{s.count}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.bg}`}>{s.count}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-0.5 bg-(--bg-muted) rounded-xl p-1 border border-(--border-color)">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-(--bg-surface) text-(--text-primary) shadow-sm"
                  : "text-(--text-muted) hover:text-(--text-primary)"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={14} />}
          className="max-w-xs sm:ml-auto"
        />
      </div>

      {/* Task list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<CheckSquare size={24} />}
          title="No tasks found"
          description="Create a new task to get started."
          action={<Button icon={<Plus size={14} />} onClick={() => setShowAddModal(true)}>New Task</Button>}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((task) => {
            const priorityCfg = priorityConfig[task.priority] || priorityConfig.medium;
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";

            return (
              <div
                key={task.id}
                className="bg-(--bg-surface) border border-(--border-color) rounded-xl px-4 py-3 flex items-start gap-3 hover:shadow-sm hover:border-(--border-strong) transition-all duration-200 group"
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 shrink-0 text-(--text-muted) hover:text-[#1e3a8a] transition-colors"
                >
                  {task.status === "done" ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : task.status === "in_progress" ? (
                    <Clock size={18} className="text-sky-500" />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-medium text-(--text-primary)", task.status === "done" && "line-through text-(--text-muted)")}>
                      {task.title}
                    </p>
                    <Button variant="ghost" size="xs" className="opacity-0 group-hover:opacity-100 shrink-0">
                      <MoreHorizontal size={13} />
                    </Button>
                  </div>

                  <div className="flex items-center flex-wrap gap-2 mt-1.5">
                    <Badge variant={priorityCfg.variant} size="sm">
                      {priorityCfg.icon} {priorityCfg.label}
                    </Badge>

                    {task.status !== "done" && (
                      <Badge
                        variant={task.status === "in_progress" ? "info" : "muted"}
                        size="sm"
                        dot
                      >
                        {task.status === "in_progress" ? "In Progress" : "To Do"}
                      </Badge>
                    )}

                    {task.dueDate && (
                      <div className={cn("flex items-center gap-1 text-[11px]", isOverdue ? "text-red-500 font-medium" : "text-(--text-muted)")}>
                        <Calendar size={10} />
                        {formatDate(task.dueDate)}
                        {isOverdue && " · Overdue"}
                      </div>
                    )}

                    {task.relatedTo && (
                      <span className="text-[11px] text-(--text-muted) bg-(--bg-muted) px-1.5 py-0.5 rounded-md">
                        {task.relatedTo.name}
                      </span>
                    )}

                    {task.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-(--text-muted) bg-(--bg-muted) px-1.5 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Task Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Task"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAddModal(false)}>Create Task</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Task Title" placeholder="e.g. Follow up with client" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Priority</label>
              <select className="w-full h-9 text-sm bg-(--bg-surface) text-(--text-primary) border border-(--border-color) rounded-lg px-3 focus:outline-none">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <Input label="Due Date" type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Assign To</label>
            <select className="w-full h-9 text-sm bg-(--bg-surface) text-(--text-primary) border border-(--border-color) rounded-lg px-3 focus:outline-none">
              <option>John Santoso</option>
              <option>Sarah</option>
              <option>Rachel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Description</label>
            <textarea className="w-full h-24 text-sm bg-(--bg-surface) text-(--text-primary) border border-(--border-color) rounded-lg px-3 py-2 placeholder:text-(--text-muted) resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30 focus:border-[#1e3a8a]" placeholder="Optional description..." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
