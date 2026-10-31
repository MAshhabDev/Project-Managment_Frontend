import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AccessDenied() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-md shadow-2xl border-destructive/20 text-center">
        <CardHeader className="space-y-2">
          <div className="size-14 rounded-2xl bg-destructive/10 text-destructive mx-auto flex items-center justify-center mb-1">
            <ShieldAlert className="size-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Access Restricted</CardTitle>
          <CardDescription>
            You do not have permission to view this page with your current account role.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            If you believe this is a mistake, please contact your organization administrator or log in with an authorized role.
          </p>
          <Button className="w-full font-semibold">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 size-4" />
              Return to Your Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}