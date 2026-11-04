"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProjectsQuery } from "@/hooks";
import { IProject, ProjectStatus } from "@/types";
import { Input } from "@/components/ui/input";
import {
  KanbanSquare,
  Search,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowRight,
  FolderKanban,
  Filter,
  Sparkles,
} from "lucide-react";

export default function MemberProjectsDirectoryPage() {
  const { data: projectsData, isLoading } = useProjectsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const rawProjects = projectsData?.data;
  const projects: IProject[] = Array.isArray(rawProjects)
    ? rawProjects
    : Array.isArray((rawProjects as any)?.data)
      ? (rawProjects as any).data
      : [];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description &&
          p.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.organization?.name &&
          p.organization.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "ALL" ? true : p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.IN_PROGRESS:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case ProjectStatus.COMPLETED:
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case ProjectStatus.PLANNING:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case ProjectStatus.ARCHIVED:
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Sparkles className="size-3.5" />
            <span>Workspace Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold font-heading tracking-tight">
            Assigned Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse all the initiatives, client workflows, and agile projects you
            are part of.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-border/70 bg-card/50 backdrop-blur-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by title, description or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-background/80"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="size-4 text-muted-foreground hidden sm:inline" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-input bg-background/80 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-ring cursor-pointer w-full sm:w-auto"
          >
            <option value="ALL">All Statuses</option>
            <option value={ProjectStatus.PLANNING}>Planning</option>
            <option value={ProjectStatus.IN_PROGRESS}>In Progress</option>
            <option value={ProjectStatus.COMPLETED}>Completed</option>
            <option value={ProjectStatus.ARCHIVED}>Archived</option>
          </select>
        </div>
      </div>

      {/* Projects Grid or Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border/70 bg-card/20 space-y-3">
          <FolderKanban className="size-12 text-muted-foreground mx-auto stroke-1" />
          <h3 className="text-base font-bold">No matching projects</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {searchTerm || statusFilter !== "ALL"
              ? "Try adjusting your search criteria or resetting filters."
              : "You have not been added to any projects yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const mainBoard = project.boards?.[0];
            const columns = mainBoard?.columns || [];

            let totalTasks = 0;
            let doneTasks = 0;

            columns.forEach((col) => {
              const taskCount = col.tasks?.length || 0;
              totalTasks += taskCount;
              if (col.title?.toLowerCase().includes("done")) {
                doneTasks += taskCount;
              }
            });

            const progress =
              totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

            return (
              <div
                key={project.id}
                className="group p-5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status.replace("_", " ")}
                    </span>

                    {project.organization && (
                      <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1 truncate max-w-[140px]">
                        <Building2 className="size-3 shrink-0" />
                        <span className="truncate">
                          {project.organization.name}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {project.description ||
                        "No project description provided."}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium">
                        <CheckCircle2 className="size-3 text-emerald-500" />
                        Sprint Progress
                      </span>
                      <span className="font-semibold text-foreground">
                        {doneTasks}/{totalTasks} Tasks ({progress}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Info & Action */}
                <div className="pt-4 mt-4 border-t border-border/50 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" />
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>

                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-input bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <span>Open Board</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
