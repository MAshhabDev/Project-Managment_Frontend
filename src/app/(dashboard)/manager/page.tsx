"use client";

import Link from "next/link";
import { useGetMe, useMyOrganizationsQuery, useProjectsQuery } from "@/hooks";
import { IProject } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Users2,
  FolderKanban,
  Sparkles,
  ArrowRight,
  Plus,
  TrendingUp,
} from "lucide-react";

export default function ManagerDashboardPage() {
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const { data: orgsData, isLoading: isLoadingOrgs } =
    useMyOrganizationsQuery();
  const organizations = orgsData?.data || [];

  const { data: projectsData, isLoading: isLoadingProjects } =
    useProjectsQuery();

  const rawProjects = projectsData?.data;
  const projects: IProject[] = Array.isArray(rawProjects)
    ? rawProjects
    : Array.isArray((rawProjects as any)?.data)
      ? (rawProjects as any).data
      : [];

  const totalMembers = organizations.reduce(
    (acc, org) => acc + (org.members?.length || 0),
    0,
  );

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

  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const isLoading = isLoadingOrgs || isLoadingProjects;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Sparkles className="size-3.5" />
              <span>Manager Workspace</span>
            </div>
            <h1 className="text-3xl font-black font-heading tracking-tight text-foreground">
              Welcome back, {user?.name || "Manager"}! 💼
            </h1>
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
              Monitor team agility, create new organizations, and coordinate
              project deliverables across your agile Kanban boards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/manager/organizations"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-input bg-background hover:bg-muted transition-colors shadow-xs"
            >
              <Building2 className="size-3.5" />
              Manage Orgs
            </Link>

            <Link
              href="/manager/projects"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="size-3.5" />
              New Project
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Organizations
            </CardTitle>
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Building2 className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-heading text-foreground">
              {organizations.length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Active company workspaces
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Team Members
            </CardTitle>
            <div className="size-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users2 className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-heading text-foreground">
              {totalMembers}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Collaborators enrolled
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Active Projects
            </CardTitle>
            <div className="size-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FolderKanban className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-heading text-foreground">
              {projects.length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Across all organizations
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Sprint Completion
            </CardTitle>
            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-heading text-foreground">
              {overallProgress}%
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {completedTasks}/{totalTasks} total tasks done
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground">
                Active Projects & Kanban Health
              </h2>
              <p className="text-xs text-muted-foreground">
                Track deliverables and sprint status for your teams.
              </p>
            </div>
            <Link
              href="/manager/projects"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-24 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"
                />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-border/70 bg-card/40 space-y-3">
              <FolderKanban className="size-8 text-muted-foreground mx-auto" />
              <h4 className="text-sm font-bold text-foreground">
                No Projects Created Yet
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Start by creating your first agile project with automated Kanban
                workflow boards.
              </p>
              <Link
                href="/manager/projects"
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
              >
                Create First Project
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 4).map((project) => {
                const columns = project.boards?.[0]?.columns || [];
                const projTotal = columns.reduce(
                  (acc, col) => acc + (col.tasks?.length || 0),
                  0,
                );
                const projDone =
                  columns.find((col) =>
                    col.title?.toLowerCase().includes("done"),
                  )?.tasks?.length || 0;
                const percent =
                  projTotal > 0 ? Math.round((projDone / projTotal) * 100) : 0;

                return (
                  <div
                    key={project.id}
                    className="p-4 rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
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
                      <h4 className="text-sm font-bold font-heading text-foreground">
                        {project.name}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {project.description || "Agile project workspace."}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-28 space-y-1 text-right">
                        <span className="text-[11px] font-semibold text-foreground">
                          {projDone}/{projTotal} Tasks ({percent}%)
                        </span>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-input bg-background hover:bg-muted transition-colors"
                      >
                        <span>Board</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground">
                Organizations
              </h2>
              <p className="text-xs text-muted-foreground">Managed entities.</p>
            </div>
            <Link
              href="/manager/organizations"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="h-24 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"
                />
              ))}
            </div>
          ) : organizations.length === 0 ? (
            <div className="p-6 text-center rounded-2xl border border-dashed border-border/70 bg-card/40 space-y-2">
              <Building2 className="size-7 text-muted-foreground mx-auto" />
              <h4 className="text-xs font-bold text-foreground">
                No Organizations
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Create an organization to invite teammates.
              </p>
              <Link
                href="/manager/organizations"
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-input text-xs font-semibold hover:bg-muted transition-colors"
              >
                Add Organization
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className="p-4 rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold font-heading text-foreground flex items-center gap-2">
                      <Building2 className="size-4 text-primary" />
                      {org.name}
                    </h4>
                    <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded-md bg-muted">
                      /{org.slug}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Users2 className="size-3" />
                      {org.members?.length || 0} Members
                    </span>
                    <span className="text-[10px]">
                      Created: {new Date(org.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
