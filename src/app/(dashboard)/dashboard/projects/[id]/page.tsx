"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useProjectsQuery } from "@/hooks";
import { ITask } from "@/types";
import { KanbanColumn } from "@/components/modules/kanban/kanban-column";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Filter,
  KanbanSquare,
  Search,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { TaskModal } from "@/components/modules/kanban/task-modal";

export default function ProjectKanbanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const { data: projectsData, isLoading } = useProjectsQuery();
  const project = projectsData?.data?.find((p) => p.id === projectId);

  const mainBoard = project?.boards?.[0];
  const rawColumns = mainBoard?.columns || [];

  const filteredColumns = rawColumns.map((col) => ({
    ...col,
    tasks: (col.tasks || []).filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase())),
    ),
  }));

  const totalTasks = rawColumns.reduce(
    (acc, col) => acc + (col.tasks?.length || 0),
    0,
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 rounded-2xl bg-muted/40 border border-border/40 animate-pulse" />
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-[500px] w-80 rounded-2xl bg-muted/30 border border-border/40 animate-pulse shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-3">
          <AlertCircle className="size-8" />
        </div>
        <h2 className="text-xl font-bold font-heading">Project Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          The project you are looking for does not exist or you do not have
          permission to view it.
        </p>
        <Button className="mt-4" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 size-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Link href="/dashboard">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>

            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              {project.status}
            </span>

            {project.organization && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Building2 className="size-3.5" />
                {project.organization.name}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-extrabold font-heading tracking-tight flex items-center gap-2.5">
            <KanbanSquare className="size-6 text-primary" />
            {project.name}
          </h1>

          {project.description && (
            <p className="text-xs text-muted-foreground max-w-2xl">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-border bg-muted/40 shrink-0">
            <Sparkles className="size-3.5 text-primary" />
            <span>{totalTasks} Total Tasks</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 overflow-x-auto pb-6 pt-1">
        {filteredColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            allColumns={rawColumns}
            onTaskClick={(task) => setSelectedTask(task)}
          />
        ))}
      </div>

      {/* Task Details & Discussion Modal */}
      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}
