"use client";

import { useState } from "react";
import {
  useCreateOrgMutation,
  useInviteMemberMutation,
  useMyOrganizationsQuery,
} from "@/hooks";
import { IOrganization, Role } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Plus,
  Mail,
  Users,
  UserPlus,
  Shield,
  X,
  Sparkles,
  Calendar,
  CheckCircle2,
  User,
} from "lucide-react";

export default function OrganizationsPage() {
  const { data: orgsData, isLoading } = useMyOrganizationsQuery();
  const organizations = orgsData?.data || [];

  const createOrgMutation = useCreateOrgMutation();
  const inviteMemberMutation = useInviteMemberMutation();

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [orgName, setOrgName] = useState("");

  const [invitingOrg, setInvitingOrg] = useState<IOrganization | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>(Role.MEMBER);

  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;

    createOrgMutation.mutate(
      { name: orgName.trim() },
      {
        onSuccess: () => {
          setOrgName("");
          setIsCreateOpen(false);
        },
      }
    );
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitingOrg || !inviteEmail.trim()) return;

    inviteMemberMutation.mutate(
      {
        orgId: invitingOrg.id,
        payload: {
          email: inviteEmail.trim(),
          role: inviteRole,
        },
      },
      {
        onSuccess: () => {
          setInviteEmail("");
          setInvitingOrg(null);
        },
      }
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Building2 className="size-4" />
            <span>Enterprise Workspaces</span>
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-foreground">
            My Organizations
          </h1>
          <p className="text-xs text-muted-foreground">
            Create organization workspaces, manage enterprise settings, and invite collaborators.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="rounded-xl text-xs gap-1.5 shadow-sm"
        >
          <Plus className="size-3.5" />
          Create Organization
        </Button>
      </div>

      {/* Organizations Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="h-64 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"
            />
          ))}
        </div>
      ) : organizations.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border/70 bg-card/30 space-y-3">
          <Building2 className="size-10 text-muted-foreground mx-auto" />
          <h3 className="text-base font-bold text-foreground">No Organizations Yet</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            You have not created any organizations yet. Start by establishing your first company workspace.
          </p>
          <Button
            onClick={() => setIsCreateOpen(true)}
            size="sm"
            className="mt-2 rounded-xl text-xs gap-1.5"
          >
            <Plus className="size-3.5" />
            Create Your First Organization
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Org Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                        <Building2 className="size-4" />
                      </div>
                      <h2 className="text-lg font-bold font-heading text-foreground">
                        {org.name}
                      </h2>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground block pl-10">
                      Slug: /{org.slug}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setInvitingOrg(org)}
                    className="rounded-xl text-xs gap-1 shrink-0"
                  >
                    <UserPlus className="size-3.5" />
                    Invite Member
                  </Button>
                </div>

                {/* Members Count & List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Users className="size-3.5 text-primary" />
                      Enrolled Members ({org.members?.length || 0})
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Created: {new Date(org.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {org.members && org.members.length > 0 ? (
                      org.members.map((member) => (
                        <div
                          key={member.id}
                          className="p-2.5 rounded-xl border border-border/40 bg-muted/20 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[11px]">
                              {member.user?.name?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">
                                {member.user?.name || "Member"}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {member.user?.email}
                              </p>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border uppercase">
                            {member.role}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground text-center py-4 bg-muted/10 rounded-xl">
                        No members added yet. Click &ldquo;Invite Member&rdquo; to add teammates.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="size-3 text-emerald-500" />
                  Owner: {org.owner?.name || "You"}
                </span>
                <span className="font-mono text-[10px]">ID: {org.id.slice(0, 8)}...</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsCreateOpen(false)}
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
                  Enter a unique company or workspace name.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Organization Name</Label>
                <Input
                  placeholder="e.g. Acme Corporation, Dev Team"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="h-9 text-xs rounded-xl"
                  required
                />
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
                  disabled={!orgName.trim() || createOrgMutation.isPending}
                  className="rounded-xl text-xs"
                >
                  {createOrgMutation.isPending ? "Creating..." : "Create Organization"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {invitingOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setInvitingOrg(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                  <UserPlus className="size-4 text-primary" />
                  Invite to {invitingOrg.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Send an organization invitation to a colleague&apos;s email.
                </p>
              </div>
              <button
                onClick={() => setInvitingOrg(null)}
                className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleInviteMember} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Teammate Email Address</Label>
                <Input
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="h-9 text-xs rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Organization Role</Label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Role)}
                  className="w-full h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary"
                >
                  <option value={Role.MEMBER}>MEMBER (Standard Workspace Access)</option>
                  <option value={Role.MANAGER}>MANAGER (Full Team & Project Rights)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setInvitingOrg(null)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!inviteEmail.trim() || inviteMemberMutation.isPending}
                  className="rounded-xl text-xs"
                >
                  {inviteMemberMutation.isPending ? "Sending..." : "Send Invitation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}