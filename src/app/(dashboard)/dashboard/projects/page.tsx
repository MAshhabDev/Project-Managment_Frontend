"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProjectsQuery } from "@/hooks";
import { ProjectStatus } from "@/types";
import { Button } from "@/components/ui/button";
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

  const projects = projectsData?.data || [];

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
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <FolderKanban className="size-4" />
            <span>Workspace Overview</span>
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-foreground">
            Projects & Kanban Boards
          </h1>
          <p className="text-xs text-muted-foreground">
            Select any assigned project to view its interactive sprint workflow and task columns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search projects or org..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-muted-foreground flex items-center gap-1 font-semibold text-xs mr-1 shrink-0">
          <Filter className="size-3.5" /> Filter:
        </span>
        {[
          { key: "ALL", label: "All Projects" },
          { key: ProjectStatus.IN_PROGRESS, label: "In Progress" },
          { key: ProjectStatus.PLANNING, label: "Planning" },
          { key: ProjectStatus.COMPLETED, label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 border ${
              statusFilter === tab.key
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-muted/30 text-muted-foreground border-border hover:text-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-56 rounded-2xl border border-border/50 bg-muted/20 animate-pulse"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 border border-dashed border-border/80 rounded-2xl bg-card/30">
          <div className="size-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-3">
            <FolderKanban className="size-6" />
          </div>
          <h3 className="text-sm font-bold text-foreground">No projects found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            {searchTerm || statusFilter !== "ALL"
              ? "No projects match your search or filter criteria. Try resetting filters."
              : "You are not assigned to any projects yet. Contact your manager to get added to a team."}
          </p>
          {(searchTerm || statusFilter !== "ALL") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("ALL");
              }}
              className="mt-4 rounded-xl text-xs"
            >
              Reset Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const columns = project.boards?.[0]?.columns || [];
            const totalTasks = columns.reduce(
              (acc, col) => acc + (col.tasks?.length || 0),
              0
            );
            const doneTasks =
              columns
                .find((col) => col.title.toLowerCase().includes("done"))
                ?.tasks?.length || 0;
            const progress =
              totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between p-5 rounded-2xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status.replace("_", " ")}
                    </span>

                    {project.organization && (
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 truncate max-w-[150px]">
                        <Building2 className="size-3 shrink-0" />
                        <span className="truncate">{project.organization.name}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {project.description || "No project description provided."}
                    </p>
                  </div>

                  {/* Task Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground flex items-center gap-1 font-medium">
                        <KanbanSquare className="size-3 text-primary" />
                        Progress
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

                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl text-xs gap-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                    >
                      <span>Open Board</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
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