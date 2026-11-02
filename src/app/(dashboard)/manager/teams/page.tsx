"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useAddTeamMemberMutation,
  useCreateTeamMutation,
  useMyOrganizationsQuery,
  useOrganizationQuery,
} from "@/hooks";
import { ITeam } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users2,
  Plus,
  Building2,
  UserPlus,
  Shield,
  X,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export default function TeamsManagementPage() {
  const { data: myOrgsData, isLoading: isLoadingMyOrgs } =
    useMyOrganizationsQuery();
  const organizations = myOrgsData?.data || [];

  const [selectedOrgId, setSelectedOrgId] = useState<string>("");

  const activeOrgId = selectedOrgId || organizations[0]?.id || "";

  const { data: orgDetailsData, isLoading: isLoadingOrgDetails } =
    useOrganizationQuery(activeOrgId);
  const activeOrg = orgDetailsData?.data;

  const createTeamMutation = useCreateTeamMutation();
  const addTeamMemberMutation = useAddTeamMemberMutation();

  // Modals state
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const [activeTeamForMember, setActiveTeamForMember] = useState<ITeam | null>(
    null
  );
  const [selectedMemberUserId, setSelectedMemberUserId] = useState("");

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !activeOrgId) return;

    createTeamMutation.mutate(
      {
        organizationId: activeOrgId,
        name: teamName.trim(),
        description: teamDescription.trim() || undefined,
      },
      {
        onSuccess: () => {
          setTeamName("");
          setTeamDescription("");
          setIsCreateTeamOpen(false);
        },
      }
    );
  };

  const handleAddMemberToTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTeamForMember || !selectedMemberUserId) return;

    addTeamMemberMutation.mutate(
      {
        teamId: activeTeamForMember.id,
        payload: { userId: selectedMemberUserId },
      },
      {
        onSuccess: () => {
          setSelectedMemberUserId("");
          setActiveTeamForMember(null);
        },
      }
    );
  };

  const teams = activeOrg?.teams || [];
  const orgMembers = activeOrg?.members || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Users2 className="size-4" />
            <span>Squads & Workgroups</span>
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-foreground">
            Team Management
          </h1>
          <p className="text-xs text-muted-foreground">
            Organize collaborators into specialized teams and functional squads.
          </p>
        </div>

        {organizations.length > 0 && (
          <Button
            onClick={() => setIsCreateTeamOpen(true)}
            className="rounded-xl text-xs gap-1.5 shadow-sm"
          >
            <Plus className="size-3.5" />
            Create Team Squad
          </Button>
        )}
      </div>

      {/* Organization Switcher Tabs */}
      {organizations.length > 0 ? (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-muted-foreground flex items-center gap-1 font-semibold text-xs mr-1 shrink-0">
            <Building2 className="size-3.5" /> Workspace:
          </span>
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => setSelectedOrgId(org.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 border ${
                activeOrgId === org.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-muted/30 text-muted-foreground border-border hover:text-foreground hover:bg-muted"
              }`}
            >
              {org.name}
            </button>
          ))}
        </div>
      ) : null}

      {isLoadingMyOrgs || isLoadingOrgDetails ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-48 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"
            />
          ))}
        </div>
      ) : organizations.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border/70 bg-card/30 space-y-3">
          <Building2 className="size-10 text-muted-foreground mx-auto" />
          <h3 className="text-base font-bold text-foreground">
            No Organizations Available
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            You must create an organization first before setting up teams and squads.
          </p>
          <Link href="/manager/organizations">
            <Button size="sm" className="mt-2 rounded-xl text-xs gap-1">
              Create Organization First
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      ) : teams.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border/70 bg-card/30 space-y-3">
          <Users2 className="size-10 text-muted-foreground mx-auto" />
          <h3 className="text-base font-bold text-foreground">
            No Teams in {activeOrg?.name}
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Create functional squads (e.g. Engineering, Design, QA) to assign tasks and manage sprint workflows.
          </p>
          <Button
            onClick={() => setIsCreateTeamOpen(true)}
            size="sm"
            className="mt-2 rounded-xl text-xs gap-1.5"
          >
            <Plus className="size-3.5" />
            Create Your First Team
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.map((team) => (
            <div
              key={team.id}
              className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Users2 className="size-4" />
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border uppercase">
                    Active Squad
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-heading text-foreground">
                    {team.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {team.description || "Agile delivery and task squad."}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3" />
                  {team.createdAt
                    ? new Date(team.createdAt).toLocaleDateString()
                    : "Recent"}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveTeamForMember(team)}
                  className="rounded-xl text-xs gap-1"
                >
                  <UserPlus className="size-3.5" />
                  Add Member
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreateTeamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsCreateTeamOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                  <Users2 className="size-4 text-primary" />
                  Create Squad / Team
                </h3>
                <p className="text-xs text-muted-foreground">
                  Adding to workspace: <strong>{activeOrg?.name}</strong>
                </p>
              </div>
              <button
                onClick={() => setIsCreateTeamOpen(false)}
                className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Team Name</Label>
                <Input
                  placeholder="e.g. Frontend Engineering, QA Team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="h-9 text-xs rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Description (Optional)</Label>
                <Input
                  placeholder="Brief summary of this team's scope"
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  className="h-9 text-xs rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateTeamOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!teamName.trim() || createTeamMutation.isPending}
                  className="rounded-xl text-xs"
                >
                  {createTeamMutation.isPending ? "Creating..." : "Create Team"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Add Member to Team Modal */}
      {activeTeamForMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setActiveTeamForMember(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                  <UserPlus className="size-4 text-primary" />
                  Add to {activeTeamForMember.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Select an enrolled member from {activeOrg?.name}.
                </p>
              </div>
              <button
                onClick={() => setActiveTeamForMember(null)}
                className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemberToTeam} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Select Organization Member
                </Label>
                {orgMembers.length > 0 ? (
                  <select
                    value={selectedMemberUserId}
                    onChange={(e) => setSelectedMemberUserId(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary"
                    required
                  >
                    <option value="">-- Choose a teammate --</option>
                    {orgMembers.map((m) => (
                      <option key={m.userId} value={m.userId}>
                        {m.user?.name || "Member"} ({m.user?.email}) - [{m.role}]
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-xl">
                    No members found in this organization. Invite teammates first from the Organizations page.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTeamForMember(null)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    !selectedMemberUserId || addTeamMemberMutation.isPending
                  }
                  className="rounded-xl text-xs"
                >
                  {addTeamMemberMutation.isPending ? "Adding..." : "Add to Squad"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}