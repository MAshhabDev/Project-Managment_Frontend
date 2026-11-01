"use client";

import { useState } from "react";
import { ITask, TaskPriority, TaskStatus } from "@/types";
import {
  useAddCommentMutation,
  useDeleteTaskMutation,
  useTaskActivityLogsQuery,
} from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  MessageSquare,
  History,
  Send,
  Trash2,
  Calendar,
  User,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

interface ITaskModalProps {
  task: ITask | null;
  onClose: () => void;
}

export function TaskModal({ task, onClose }: ITaskModalProps) {
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState<"comments" | "activity">(
    "comments",
  );

  const addCommentMutation = useAddCommentMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const { data: activityLogsData, isLoading: isLoadingLogs } =
    useTaskActivityLogsQuery(task?.id || "");

  if (!task) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addCommentMutation.mutate(
      {
        taskId: task.id,
        payload: { content: commentText.trim() },
      },
      {
        onSuccess: () => {
          setCommentText("");
        },
      },
    );
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(task.id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const priorityColors = {
    [TaskPriority.URGENT]: "bg-red-500/10 text-red-600 border-red-500/20",
    [TaskPriority.HIGH]: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    [TaskPriority.MEDIUM]: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    [TaskPriority.LOW]: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-5 border-b border-border/60 bg-muted/20">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                  priorityColors[task.priority] ||
                  priorityColors[TaskPriority.MEDIUM]
                }`}
              >
                {task.priority} Priority
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border">
                {task.status.replace("_", " ")}
              </span>
            </div>
            <h2 className="text-xl font-bold font-heading text-foreground">
              {task.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Description
            </h4>
            <p className="text-sm text-foreground/90 bg-muted/30 p-3.5 rounded-xl border border-border/50 whitespace-pre-wrap leading-relaxed">
              {task.description ||
                "No detailed description provided for this task."}
            </p>
          </div>

          {/* Meta details grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border border-border/60 bg-card/50">
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <User className="size-3" /> Assignee
              </span>
              <p className="text-xs font-semibold text-foreground">
                {task.user?.name || "Unassigned"}
              </p>
              {task.user?.email && (
                <p className="text-[10px] text-muted-foreground">
                  {task.user.email}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3" /> Due Date
              </span>
              <p className="text-xs font-semibold text-foreground">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })
                  : "No deadline"}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Tabs for Comments vs Activity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60">
              <button
                onClick={() => setActiveTab("comments")}
                className={`pb-2.5 text-xs font-bold transition-all relative ${
                  activeTab === "comments"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="size-3.5" />
                  Comments ({task.comments?.length || 0})
                </span>
              </button>

              <button
                onClick={() => setActiveTab("activity")}
                className={`pb-2.5 text-xs font-bold transition-all relative ml-4 ${
                  activeTab === "activity"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <History className="size-3.5" />
                  Activity History
                </span>
              </button>
            </div>

            {/* Comments Tab */}
            {activeTab === "comments" && (
              <div className="space-y-4">
                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <Input
                    placeholder="Write a comment or update..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="h-9 text-xs rounded-xl"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={
                      !commentText.trim() || addCommentMutation.isPending
                    }
                    className="shrink-0 gap-1 rounded-xl"
                  >
                    <Send className="size-3.5" />
                    {addCommentMutation.isPending ? "Posting..." : "Post"}
                  </Button>
                </form>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {task.comments && task.comments.length > 0 ? (
                    task.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-3 rounded-xl border border-border/50 bg-muted/20 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {comment.user?.name || "Team Member"}
                          </span>
                          <span className="text-[10px]">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-foreground/90 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground text-xs">
                      No comments yet. Start the conversation!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity History Tab */}
            {activeTab === "activity" && (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {isLoadingLogs ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Loading activity history...
                  </p>
                ) : activityLogsData?.data &&
                  activityLogsData.data.length > 0 ? (
                  activityLogsData.data.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-xl border border-border/40 bg-muted/10 text-xs flex items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <p className="font-medium text-foreground">
                          {log.action}: {log.details}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          By {log.user?.name || "System"}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground text-xs">
                    No activity logs recorded yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-border/60 bg-muted/10">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleteTaskMutation.isPending}
            className="rounded-xl gap-1 text-xs"
          >
            <Trash2 className="size-3.5" />
            {deleteTaskMutation.isPending ? "Deleting..." : "Delete Task"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-xl text-xs"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
