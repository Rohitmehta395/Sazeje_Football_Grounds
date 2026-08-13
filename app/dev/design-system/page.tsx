"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { InfoBox } from "@/components/ui/InfoBox";
import { EmptyState } from "@/components/ui/EmptyState";
import { AlertTriangle, Moon, Sun } from "lucide-react";

import { notFound } from "next/navigation";

export default function DesignSystemPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const tokens = [
    { name: "--bg", class: "bg-bg", label: "Background" },
    { name: "--surface", class: "bg-surface", label: "Surface" },
    { name: "--surface-2", class: "bg-surface-2", label: "Surface 2" },
    { name: "--border", class: "bg-border", label: "Border" },
    { name: "--text", class: "bg-text", label: "Text" },
    { name: "--text-muted", class: "bg-text-muted", label: "Text Muted" },
    { name: "--accent", class: "bg-accent", label: "Accent" },
    { name: "--accent-2", class: "bg-accent-2", label: "Accent 2" },
    { name: "--azg", class: "bg-azg", label: "AZG Accent" },
    { name: "--accent-soft", class: "bg-accent-soft", label: "Accent Soft" },
  ];

  return (
    <div className="min-h-screen bg-bg text-text p-8 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Banner Warning */}
        <div className="bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 p-4 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold text-sm m-0">
                DEV SCAFFOLDING ONLY — DO NOT DEPLOY TO PRODUCTION
              </p>
              <p className="text-xs opacity-90 m-0">
                This page (`/dev/design-system`) is created for visual verification of tokens & primitives. It must be removed or route-gated before production release.
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-2 border border-border text-text font-mono text-xs font-semibold hover:border-accent cursor-pointer transition-colors"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-4 h-4 text-accent" /> Mode: Light
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-accent-2" /> Mode: Dark
              </>
            )}
          </button>
        </div>

        <header className="border-b border-border pb-6">
          <h1 className="font-bebas text-5xl tracking-wide text-text mb-2">
            SaZeJe Football Design System
          </h1>
          <p className="text-text-muted font-inter text-sm">
            Phase 2 Design System Migration Preview (Theme Tokens, Typography, and UI Primitives)
          </p>
        </header>

        {/* 1. Color Swatches */}
        <section className="space-y-4">
          <h2 className="font-bebas text-3xl text-azg tracking-wider">
            1. Color Tokens & Swatches
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {tokens.map((token) => (
              <div
                key={token.name}
                className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-2 shadow-card"
              >
                <div
                  className={`h-16 w-full rounded-lg border border-border/50 ${token.class}`}
                />
                <div>
                  <p className="font-mono text-xs font-bold text-text m-0">
                    {token.name}
                  </p>
                  <p className="text-text-muted text-[11px] font-inter m-0">
                    {token.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Typography */}
        <section className="space-y-4">
          <h2 className="font-bebas text-3xl text-azg tracking-wider">
            2. Typography System
          </h2>
          <div className="bg-surface border border-border rounded-xl p-6 space-y-6 shadow-card">
            <div>
              <span className="font-mono text-xs text-azg uppercase tracking-wider block mb-1">
                Display Font — Bebas Neue (`font-bebas`)
              </span>
              <h3 className="font-bebas text-4xl text-text m-0">
                DE ADELAARSHORST — GA EAGLES 1920
              </h3>
            </div>
            <div>
              <span className="font-mono text-xs text-azg uppercase tracking-wider block mb-1">
                Monospace / Labels — Space Mono (`font-mono`)
              </span>
              <p className="font-mono text-sm text-text-muted m-0">
                MATCHDAY #142 • CAPACITY: 10,400 • VISIT DATE: 12 OCT 2024
              </p>
            </div>
            <div>
              <span className="font-mono text-xs text-azg uppercase tracking-wider block mb-1">
                Body Font — Inter (`font-inter`)
              </span>
              <p className="font-inter text-sm text-text-muted leading-relaxed m-0">
                Atmospheric evening match in De Deventer Adelaarshorst. Classic floodlights, intense home crowd, and traditional stadium architecture.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Primitives */}
        <section className="space-y-8">
          <h2 className="font-bebas text-3xl text-azg tracking-wider">
            3. UI Primitives
          </h2>

          {/* Button Primitive */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4 shadow-card">
            <h3 className="font-bebas text-2xl text-text m-0">
              Button Primitive
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="default">
                Primary Button
              </Button>
              <Button variant="primary" size="small">
                Primary Small
              </Button>
              <Button variant="ghost" size="default">
                Ghost Button
              </Button>
              <Button variant="ghost" size="small">
                Ghost Small
              </Button>
              <Button variant="primary" disabled>
                Disabled Button
              </Button>
            </div>
          </div>

          {/* Card Primitive */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4 shadow-card">
            <h3 className="font-bebas text-2xl text-text m-0">
              Card Primitive (Base Container)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card isStatic={false} className="p-5">
                <Badge variant="azg" className="self-start mb-2">
                  Interactive Card
                </Badge>
                <h4 className="font-bebas text-2xl text-text m-0 mb-1">
                  Hover Lift Card Container
                </h4>
                <p className="font-inter text-xs text-text-muted m-0">
                  This card has interactive hover translateY effect matching `.card:hover`.
                </p>
              </Card>

              <Card isStatic={true} className="p-5">
                <Badge variant="surface" className="self-start mb-2">
                  Static Card
                </Badge>
                <h4 className="font-bebas text-2xl text-text m-0 mb-1">
                  Static Card Container
                </h4>
                <p className="font-inter text-xs text-text-muted m-0">
                  This card is static (`isStatic=true`) with cursor default and no transform lift.
                </p>
              </Card>
            </div>
          </div>

          {/* Badge Primitive */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4 shadow-card">
            <h3 className="font-bebas text-2xl text-text m-0">
              Badge Primitive
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="dark">Dark Tag (.card .tag)</Badge>
              <Badge variant="azg">AZG Badge</Badge>
              <Badge variant="accent">Accent Soft Badge</Badge>
              <Badge variant="surface">Surface Muted Badge</Badge>
            </div>
          </div>

          {/* InfoBox Primitive */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4 shadow-card">
            <h3 className="font-bebas text-2xl text-text m-0">
              InfoBox Primitive (.info-box)
            </h3>
            <div className="max-w-md">
              <InfoBox
                items={[
                  { label: "Club", value: "Go Ahead Eagles" },
                  { label: "Country", value: "🇳🇱 Nederland" },
                  { label: "Competition", value: "Eredivisie" },
                  { label: "Visit Date", value: "2024-10-12" },
                ]}
              />
            </div>
          </div>

          {/* EmptyState Primitive */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4 shadow-card">
            <h3 className="font-bebas text-2xl text-text m-0">
              EmptyState Primitive (.empty-state)
            </h3>
            <EmptyState
              title="Geen scarfs gevonden"
              message="Er zijn op dit moment geen sjaals beschikbaar in deze categorie."
              action={<Button variant="ghost" size="small">Reset Filter</Button>}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
