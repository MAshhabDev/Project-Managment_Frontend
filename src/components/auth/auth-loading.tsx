import { Loader2, KanbanSquare } from "lucide-react";

export default function AuthLoading({
  label = "Verifying session...",
}: {
  label?: string;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-3 bg-background/50 backdrop-blur-sm">
      <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center animate-pulse">
        <KanbanSquare className="size-6" />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
        <Loader2 className="size-4 animate-spin text-primary" />
        <span>{label}</span>
      </div>
    </div>
  );
}