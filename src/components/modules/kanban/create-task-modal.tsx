"use client";

import { useState, useEffect } from "react";
import { useCreateTaskMutation, useOrganizationQuery } from "@/hooks";
import { IColumn, TaskPriority } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckSquare,
  X,
  Calendar,
  Flag,
  User,
  Sparkles,
  Plus,
} from "lucide-react";

interface ICreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  columns: IColumn[];
  defaultColumnId?: string;
  organizationId?: string;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  projectId,
  columns,
  defaultColumnId,
  organizationId,
}: ICreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const createTaskMutation = useCreateTaskMutation();

  const { data: orgData } = useOrganizationQuery(organizationId || "");
  const members = orgData?.data?.members || [];

  useEffect(() => {
    if (defaultColumnId) {
      setColumnId(defaultColumnId);
    } else if (columns.length > 0 && !columnId) {
      setColumnId(columns[0].id);
    }
  }, [defaultColumnId, columns, columnId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetColumnId = columnId || columns[0]?.id;
    if (!title.trim() || !targetColumnId) return;

    createTaskMutation.mutate(
      {
        projectId,
        columnId: targetColumnId,
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
        assigneeId: assigneeId || undefined,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setDueDate("");
          setAssigneeId("");
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
              <CheckSquare className="size-4 text-primary" />
              Create New Task
            </h3>
            <p className="text-xs text-muted-foreground">
              Add a new actionable item to your sprint board.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Task Title</Label>
            <Input
              placeholder="e.g. Implement user profile API, Fix navbar bug"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-9 text-xs rounded-xl"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">
              Description (Optional)
            </Label>
            <textarea
              placeholder="Add acceptance criteria or technical notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Sprint Column</Label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary"
                required
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Priority Level</Label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary"
              >
                <option value={TaskPriority.LOW}>Low Priority</option>
                <option value={TaskPriority.MEDIUM}>Medium Priority</option>
                <option value={TaskPriority.HIGH}>High Priority</option>
                <option value={TaskPriority.URGENT}>Urgent (Critical)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Due Date (Optional)
              </Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-9 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Assign To (Optional)
              </Label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="">-- Unassigned --</option>
                {members.map((m) => (
                  <option key={m.userId} value={m.userId}>
                    {m.user?.name || "Member"} ({m.user?.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!title.trim() || createTaskMutation.isPending}
              className="rounded-xl text-xs gap-1"
            >
              <Plus className="size-3.5" />
              {createTaskMutation.isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
