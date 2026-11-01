"use client";

import Link from "next/link";
import { useGetMe, useProjectsQuery } from "@/hooks";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

export default function MemberDashboardPage() {
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const { data: projectsData, isLoading } = useProjectsQuery();
  const projects = projectsData?.data || [];

  // মেম্বারের মোট টাস্ক ও কমপ্লিটেড টাস্ক ক্যালকুলেশন
  let totalTasks = 0;
  let completedTasks = 0;
  let inProgressTasks = 0;

  projects.forEach((p) => {
    p.boards?.forEach((b) => {
      b.columns?.forEach((c) => {
        const count = c.tasks?.length || 0;
        totalTasks += count;
        if (c.title.toLowerCase().includes("done")) {
          completedTasks += count;
        } else if (c.title.toLowerCase().includes("progress")) {
          inProgressTasks += count;
        }
      });
    });
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome header */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 lg:p-8">
        <div className="relative z-10 space-y-2">
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
            <CardContent className="space-y-3">
              <AlertCircle className="size-10 text-muted-foreground mx-auto" />
              <h3 className="font-bold text-base">No Projects Found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                You haven&apos;t been assigned to any projects yet. Ask your
                Organization Manager to invite you to a team.
              </p>
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

                    <Button
                      className="w-full font-semibold shadow-xs"
                      size="sm"
                    >
                      <Link href={`/dashboard/projects/${project.id}`}>
                        Open Kanban Board
                        <ArrowRight className="ml-2 size-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
