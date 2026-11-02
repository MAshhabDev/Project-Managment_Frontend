"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useCreateProjectMutation,
  useMyOrganizationsQuery,
  useProjectsQuery,
} from "@/hooks";
import { ProjectStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FolderKanban,
  Plus,
  Building2,
  Calendar,
  Search,
  Filter,
  KanbanSquare,
  ArrowRight,
  X,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function ManagerProjectsPage() {
  const { data: orgsData } = useMyOrganizationsQuery();
  const organizations = orgsData?.data || [];

  const { data: projectsData, isLoading } = useProjectsQuery();
  const projects = projectsData?.data || [];

  const createProjectMutation = useCreateProjectMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const targetOrgId = orgId || organizations[0]?.id;
    if (!targetOrgId || !name.trim()) return;

    createProjectMutation.mutate(
      {
        organizationId: targetOrgId,
        name: name.trim(),
        description: description.trim() || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setStartDate("");
          setEndDate("");
          setIsCreateOpen(false);
        },
      },
    );
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <FolderKanban className="size-4" />
            <span>Sprint Architecture</span>
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-foreground">
            Projects & Agile Boards
          </h1>
          <p className="text-xs text-muted-foreground">
            Create agile workspaces, configure sprint boards, and monitor task
            completion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl"
            />
          </div>

          <Button
            onClick={() => {
              if (organizations.length > 0 && !orgId) {
                setOrgId(organizations[0].id);
              }
              setIsCreateOpen(true);
            }}
            className="rounded-xl text-xs gap-1.5 shadow-sm shrink-0"
          >
            <Plus className="size-3.5" />
            New Project
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-muted-foreground flex items-center gap-1 font-semibold text-xs mr-1 shrink-0">
          <Filter className="size-3.5" /> Status:
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

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-56 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border/70 bg-card/30 space-y-3">
          <FolderKanban className="size-10 text-muted-foreground mx-auto" />
          <h3 className="text-base font-bold text-foreground">
            No Projects Found
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {searchTerm || statusFilter !== "ALL"
              ? "No projects match your search or filter criteria."
              : "No projects created yet. Start by creating an agile workspace."}
          </p>
          <Button
            onClick={() => setIsCreateOpen(true)}
            size="sm"
            className="mt-2 rounded-xl text-xs gap-1.5"
          >
            <Plus className="size-3.5" />
            Create First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const columns = project.boards?.[0]?.columns || [];
            const totalTasks = columns.reduce(
              (acc, col) => acc + (col.tasks?.length || 0),
              0,
            );
            const doneTasks =
              columns.find((col) => col.title.toLowerCase().includes("done"))
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
                        project.status,
                      )}`}
                    >
                      {project.status.replace("_", " ")}
                    </span>

                    {project.organization && (
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 truncate max-w-[150px]">
                        <Building2 className="size-3 shrink-0" />
                        <span className="truncate">
                          {project.organization.name}
                        </span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {project.description || "Agile project workspace."}
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

                <div className="pt-4 mt-4 border-t border-border/50 flex items-center justify-between gap-2">
                  <div className="space-y-0.5 text-[10px] text-muted-foreground">
                    {project.endDate ? (
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                        <Clock className="size-3" /> Due:{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

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

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsCreateOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                  <FolderKanban className="size-4 text-primary" />
                  Create Agile Project
                </h3>
                <p className="text-xs text-muted-foreground">
                  Initializes a dedicated workspace with an interactive Kanban
                  sprint board.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Organization</Label>
                {organizations.length > 0 ? (
                  <select
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary"
                    required
                  >
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name} (/{org.slug})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-destructive p-2.5 bg-destructive/10 rounded-xl">
                    You have no organizations. Please create an organization
                    first.
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Project Name</Label>
                <Input
                  placeholder="e.g. Next.js SaaS MVP, Mobile App Sprint"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 text-xs rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Description (Optional)
                </Label>
                <Input
                  placeholder="Goals, deliverables, and architecture notes"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-9 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Start Date</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">
                    End Date (Deadline)
                  </Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-2.5 text-xs text-muted-foreground">
                <Sparkles className="size-4 text-primary shrink-0" />
                <span>
                  Automatically sets up 4 sprint columns: <strong>To Do</strong>
                  , <strong>In Progress</strong>, <strong>In Review</strong>,
                  and <strong>Done</strong>.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!name.trim() || createProjectMutation.isPending}
                  className="rounded-xl text-xs"
                >
                  {createProjectMutation.isPending
                    ? "Creating Board..."
                    : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
