"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 border bg-card/40 p-8 text-center rounded-none shadow-none">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center border bg-muted/30 rounded-none">
            <FileQuestion className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Error 404 — Resource Missing
          </span>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight">Content Unreachable</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The requested company profile or page schema could not be retrieved from the server.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-none shadow-none text-xs gap-2 font-mono"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </Button>
          <Link href="/">
            <Button
              size="sm"
              className="rounded-none shadow-none text-xs gap-2 font-mono"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}