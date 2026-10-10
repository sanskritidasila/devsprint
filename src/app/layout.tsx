import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";

export const metadata: Metadata = {
  title: "DevSprint — Engineering Task Workspace",
  description: "Task orchestration built with Next.js, React Query, and Zustand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 min-h-screen antialiased selection:bg-indigo-100 selection:text-indigo-900">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}