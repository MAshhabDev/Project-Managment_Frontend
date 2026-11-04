"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetMe, useProjectsQuery, useCreateOrgMutation } from "@/hooks";
import { IProject } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  ArrowRight,
  KanbanSquare,
  Sparkles,
  Building2,
  Calendar,
  AlertCircle,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function MemberDashboardPage() {
  const router = useRouter();
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const { data: projectsData, isLoading } = useProjectsQuery();
  const createOrgMutation = useCreateOrgMutation();

  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  const [orgName, setOrgName] = useState("");

  // Defensively ensure projects is always an array
  const rawProjects = projectsData?.data;
  const projects: IProject[] = Array.isArray(rawProjects)
    ? rawProjects
    : Array.isArray((rawProjects as any)?.data)
      ? (rawProjects as any).data
      : [];

  let totalTasks = 0;
  let completedTasks = 0;
  let inProgressTasks = 0;

  projects.forEach((p) => {
    p.boards?.forEach((b) => {
      b.columns?.forEach((c) => {
        const count = c.tasks?.length || 0;
        totalTasks += count;
        if (c.title?.toLowerCase().includes("done")) {
          completedTasks += count;
        } else if (c.title?.toLowerCase().includes("progress")) {
          inProgressTasks += count;
        }
      });
    });
  });

  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;

    createOrgMutation.mutate(
      { name: orgName.trim() },
      {
        onSuccess: () => {
          setIsCreateOrgOpen(false);
          setOrgName("");
          toast.success(
            "Organization created! You are now an Organization Manager 🎉",
          );
          router.push("/manager");
        },
      },
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome header with quick action */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 lg:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="size-3.5" />
              <span>Member Workspace</span>
            </div>
            <h1 className="text-3xl font-extrabold font-heading tracking-tight">
              Welcome back, {user?.name || "Team Member"}! 👋
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Here is what&apos;s happening with your assigned projects today.
              Open any project to start moving tasks across the agile Kanban
              board.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setIsCreateOrgOpen(true)}
              className="rounded-xl text-xs gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Building2 className="size-3.5" />
              <span>Create Organization (Become Manager)</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Assigned Projects
            </CardTitle>
            <FolderKanban className="size-4.5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">
              {projects.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active workspaces
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              In Progress Tasks
            </CardTitle>
            <Clock className="size-4.5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">
              {inProgressTasks}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently working on
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Completed Tasks
            </CardTitle>
            <CheckCircle2 className="size-4.5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">
              {completedTasks}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of {totalTasks} total tasks
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-heading tracking-tight">
              Your Projects & Kanban Boards
            </h2>
            <p className="text-xs text-muted-foreground">
              Select a project to access its interactive Kanban workflow
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-44 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Card className="border-dashed border-2 text-center p-8">
            <CardContent className="space-y-4">
              <AlertCircle className="size-10 text-muted-foreground mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-base">No Assigned Projects</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  You haven&apos;t been assigned to any projects yet. You can
                  wait for your Manager to invite you, or launch your own
                  organization workspace right now to lead as a Manager!
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setIsCreateOrgOpen(true)}
                className="rounded-xl text-xs gap-1.5"
              >
                <Plus className="size-3.5" />
                Launch Organization Workspace
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => {
              let projTaskCount = 0;
              project.boards?.forEach((b) => {
                b.columns?.forEach((c) => {
                  projTaskCount += c.tasks?.length || 0;
                });
              });

              return (
                <Card
                  key={project.id}
                  className="hover:border-primary/40 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                        {project.status}
                      </span>
                      {project.organization && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Building2 className="size-3" />
                          {project.organization.name}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors mt-2">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">
                      {project.description ||
                        "Agile project tracking workspace."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/60">
                      <span className="flex items-center gap-1.5 font-medium">
                        <KanbanSquare className="size-3.5 text-primary" />
                        {projTaskCount} Tasks
                      </span>
                      {project.createdAt && (
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="size-3" />
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
                    >
                      Open Kanban Board
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Organization Modal */}
      {isCreateOrgOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsCreateOrgOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                  <Building2 className="size-4 text-primary" />
                  Create Organization
                </h3>
                <p className="text-xs text-muted-foreground">
                  Creating an organization workspace automatically promotes your
                  account to <strong>Organization Manager</strong> with full team leadership privileges.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOrgOpen(false)}
                className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Organization / Company Name
                </Label>
                <Input
                  placeholder="e.g. Acme Studio, Tech Ventures, FinTech Lab"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="h-10 text-xs rounded-xl"
                  required
                  autoFocus
                />
              </div>

              <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  <Sparkles className="size-3.5" />
                  <span>Automatic Role Promotion</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  You will gain instant access to Squad and Team Member management, Project Kanban generation, and Sprint tracking.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateOrgOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!orgName.trim() || createOrgMutation.isPending}
                  className="rounded-xl text-xs"
                >
                  {createOrgMutation.isPending
                    ? "Creating Workspace..."
                    : "Create & Upgrade Role"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
