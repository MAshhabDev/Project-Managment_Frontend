import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import { Toaster } from "sonner";

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "TaskFlow SaaS | Agile Project Management Platform",
    template: "%s | TaskFlow SaaS",
  },
  description:
    "Enterprise-grade agile project management SaaS platform with automated Kanban boards, multi-tenant organizations, functional squads, real-time threaded comments, and bKash PGW billing integration.",
  keywords: [
    "Project Management",
    "Agile Kanban",
    "Sprint Tracking",
    "Task Management",
    "Next.js 16",
    "React 19",
    "Tailwind CSS v4",
    "PostgreSQL",
    "bKash Payment Gateway",
    "Domain 8 SaaS",
  ],
  authors: [{ name: "Fullstack Engineering Team" }],
  creator: "Fullstack SaaS Project Assignment",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskflow-saas.local",
    title: "TaskFlow SaaS | Agile Project Management Platform",
    description:
      "Supercharge sprint velocity with automated Kanban boards, team squads, and secure bKash subscriptions.",
    siteName: "TaskFlow SaaS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        geistSans.variable,
        geistMono.variable,
        ibmPlexSans.variable,
        spaceGroteskHeading.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          {children}
          {/* Notification Sonner Toaster */}
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}