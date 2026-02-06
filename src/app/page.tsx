import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-background to-muted">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <h1 className="text-xl font-semibold tracking-tight">
          AI Tool Assistant
        </h1>
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Chat with AI that can
          <span className="text-primary"> use real tools</span>
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          An AI-powered assistant that fetches live weather, F1 race details,
          and stock prices — all in one conversational interface.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>

          <Link href="https://github.com/nayan-raj-shah/ai-tool-assistant" target="_blank">
            <Button size="lg" variant="outline">
              View GitHub
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="AI with Tool Calling"
            description="The assistant intelligently decides when to call real-world APIs like weather, F1 races, and stock prices."
          />
          <FeatureCard
            title="Secure Authentication"
            description="OAuth login with Google and GitHub, protected routes, and per-user chat history."
          />
          <FeatureCard
            title="Modern Stack"
            description="Built with Next.js App Router, Server Actions, Drizzle ORM, and Vercel AI SDK."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Built with Next.js · Drizzle · NextAuth · Vercel AI SDK
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}