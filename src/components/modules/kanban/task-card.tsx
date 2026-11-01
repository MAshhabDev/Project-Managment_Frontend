"use client";

import { IColumn, ITask, TaskPriority, TaskStatus } from "@/types";
import { useUpdateTaskStatusMutation } from "@/hooks";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MessageSquare,
  User,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface ITaskCardProps {
  task: ITask;
  columns: IColumn[];
  onTaskClick: (task: ITask) => void;
}

export function TaskCard({ task, columns, onTaskClick }: ITaskCardProps) {
  const updateStatusMutation = useUpdateTaskStatusMutation();

  const priorityConfig = {
    [TaskPriority.URGENT]: {
      label: "Urgent",
      color: "bg-red-500/10 text-red-600 border-red-500/20",
    },
    [TaskPriority.HIGH]: {
      label: "High",
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    [TaskPriority.MEDIUM]: {
      label: "Medium",
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    [TaskPriority.LOW]: {
      label: "Low",
      color: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    },
  };

  const currentPriority =
    priorityConfig[task.priority] || priorityConfig[TaskPriority.MEDIUM];

  const currentColumnIndex = columns.findIndex(
    (col) => col.id === task.columnId,
  );
  const prevColumn =
    currentColumnIndex > 0 ? columns[currentColumnIndex - 1] : null;
  const nextColumn =
    currentColumnIndex < columns.length - 1
      ? columns[currentColumnIndex + 1]
      : null;

  const handleMove = (e: React.MouseEvent, targetColumn: IColumn) => {
    e.stopPropagation();

    let newStatus = TaskStatus.TODO;
    const titleLower = targetColumn.title.toLowerCase();
    if (titleLower.includes("done")) newStatus = TaskStatus.DONE;
    else if (titleLower.includes("review")) newStatus = TaskStatus.IN_REVIEW;
    else if (titleLower.includes("progress"))
      newStatus = TaskStatus.IN_PROGRESS;

    updateStatusMutation.mutate({
      taskId: task.id,
      payload: {
        columnId: targetColumn.id,
        status: newStatus,
      },
    });
  };

  return (
    <div
      onClick={() => onTaskClick(task)}
      className="group p-4 rounded-xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer space-y-3 relative"
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${currentPriority.color}`}
        >
          {currentPriority.label}
        </span>

        {task.status === TaskStatus.DONE && (
          <span className="text-emerald-500 flex items-center gap-1 text-[11px] font-semibold">
            <CheckCircle2 className="size-3.5" /> Done
          </span>
        )}
      </div>

      <div>
        <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
          {task.title}
        </h4>
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="size-3 text-muted-foreground/80" />
              {new Date(task.dueDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}

          {task.comments && task.comments.length > 0 && (
            <span className="flex items-center gap-1 text-[11px]">
              <MessageSquare className="size-3 text-muted-foreground/80" />
              {task.comments.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <div className="size-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-[10px] font-bold">
            {task.user?.name ? (
              task.user.name.charAt(0).toUpperCase()
            ) : (
              <User className="size-3 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        {prevColumn ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={updateStatusMutation.isPending}
            onClick={(e) => handleMove(e, prevColumn)}
            className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3 mr-1" />
            {prevColumn.title}
          </Button>
        ) : (
          <div />
        )}

        {nextColumn ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={updateStatusMutation.isPending}
            onClick={(e) => handleMove(e, nextColumn)}
            className="h-6 px-2 text-[10px] font-semibold text-primary hover:bg-primary/10 hover:border-primary/40 ml-auto"
          >
            {nextColumn.title}
            <ArrowRight className="size-3 ml-1" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
