"use client";

import { IColumn, ITask } from "@/types";
import { TaskCard } from "./task-card";
import { Plus, Inbox } from "lucide-react";

interface IKanbanColumnProps {
  column: IColumn;
  allColumns: IColumn[];
  onTaskClick: (task: ITask) => void;
  onAddTaskClick?: (columnId: string) => void;
}

export function KanbanColumn({
  column,
  allColumns,
  onTaskClick,
  onAddTaskClick,
}: IKanbanColumnProps) {
  const tasks = column.tasks || [];

  const getStageIndicator = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("done")) {
      return {
        dot: "bg-emerald-500 ring-emerald-500/20",
        badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      };
    }
    if (t.includes("review")) {
      return {
        dot: "bg-amber-500 ring-amber-500/20",
        badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      };
    }
    if (t.includes("progress")) {
      return {
        dot: "bg-blue-500 ring-blue-500/20",
        badge: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      };
    }
    return {
      dot: "bg-slate-400 ring-slate-400/20",
      badge: "bg-muted text-muted-foreground border-border",
    };
  };

  const indicator = getStageIndicator(column.title);

  return (
    <div className="flex flex-col rounded-2xl border border-border/70 bg-muted/30 backdrop-blur-sm p-3.5 min-w-[280px] sm:min-w-[300px] w-full max-w-sm shrink-0">
      <div className="flex items-center justify-between pb-3 px-1 border-b border-border/50 mb-3">
        <div className="flex items-center gap-2.5">
          <span className={`size-2.5 rounded-full ring-4 ${indicator.dot}`} />
          <h3 className="font-heading font-bold text-sm text-foreground tracking-tight">
            {column.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full border ${indicator.badge}`}
          >
            {tasks.length}
          </span>

          {onAddTaskClick && (
            <button
              onClick={() => onAddTaskClick(column.id)}
              className="size-6 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Add task to this column"
            >
              <Plus className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
        {tasks.length === 0 ? (
          <div className="h-36 rounded-xl border border-dashed border-border/70 flex flex-col items-center justify-center text-center p-4">
            <Inbox className="size-6 text-muted-foreground/40 mb-1.5" />
            <p className="text-xs text-muted-foreground/80 font-medium">No tasks yet</p>
            <p className="text-[10px] text-muted-foreground/60">
              Drag or move tasks here
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columns={allColumns}
              onTaskClick={onTaskClick}
            />
          ))
        )}
      </div>
    </div>
  );
}