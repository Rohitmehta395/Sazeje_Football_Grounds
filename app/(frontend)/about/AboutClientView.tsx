"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { GoalCard } from "@/components/about/GoalCard";
import { MatchdayGallery } from "@/components/about/MatchdayGallery";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Goal, AboutContent } from "@/types";
import {
  Compass,
  Target,
  Clock,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

export interface AboutStats {
  groundsCount: number;
  countriesCount: number;
  scarvesCount?: number;
  completedGoalsCount: number;
  totalGoalsCount: number;
}

export interface AboutClientViewProps {
  aboutContent: AboutContent;
  goals: Goal[];
  stats: AboutStats;
}

export function AboutClientView({
  aboutContent,
  goals,
  stats,
}: AboutClientViewProps) {
  const { t, lang } = useTranslation();
  const [goalFilter, setGoalFilter] = React.useState<"all" | "in_progress" | "completed">("all");

  // Localized Hero Content
  const heroTitle = lang === "en" && aboutContent.hero.titleEn ? aboutContent.hero.titleEn : aboutContent.hero.title;
  const heroSubtitle = lang === "en" && aboutContent.hero.subtitleEn ? aboutContent.hero.subtitleEn : aboutContent.hero.subtitle;
  const heroEyebrow = lang === "en" && aboutContent.hero.eyebrowEn ? aboutContent.hero.eyebrowEn : aboutContent.hero.eyebrow;
  const heroImage = aboutContent.hero.heroImage || "/Hero_Image.jpg";

  // Localized Story Content
  const bioBadge = lang === "en" && aboutContent.story.badgeEn ? aboutContent.story.badgeEn : aboutContent.story.badge;
  const bioTitle = lang === "en" && aboutContent.story.titleEn ? aboutContent.story.titleEn : aboutContent.story.title;
  const bioLead = lang === "en" && aboutContent.story.leadEn ? aboutContent.story.leadEn : aboutContent.story.lead;

  // Localized Media
  const secondaryImage = aboutContent.media.secondaryImage || "/Hero_Image.jpg";

  // Filter goals
  const filteredGoals = React.useMemo(() => {
    if (goalFilter === "completed") {
      return goals.filter((g) => g.status === "completed" || (g.currentCount >= g.targetCount));
    }
    if (goalFilter === "in_progress") {
      return goals.filter((g) => g.status !== "completed" && g.currentCount < g.targetCount);
    }
    return goals;
  }, [goals, goalFilter]);

  // Overall Goals progress calculation
  const overallProgressPercentage = React.useMemo(() => {
    if (!goals.length) return 0;
    const totalPerc = goals.reduce((acc, g) => {
      return acc + Math.min(100, Math.round((g.currentCount / g.targetCount) * 100));
    }, 0);
    return Math.round(totalPerc / goals.length);
  }, [goals]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. Page Hero */}
      <PageHero
        title={heroTitle}
        description={heroSubtitle}
        eyebrow={heroEyebrow}
        backgroundImage={heroImage}
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 space-y-16 pt-8 sm:pt-10">
        {/* 2. The Groundhopper Story & Full-width Quote */}
        <section aria-label="About the Groundhopper" className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Visual Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-card bg-surface group">
                <div className="relative w-full h-[360px] sm:h-[420px] overflow-hidden">
                  <img
                    src={secondaryImage}
                    alt="Groundhopping matchday atmosphere"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Author / Identity Label Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-surface/90 backdrop-blur-md border border-border/80 px-4 py-3 rounded-xl shadow-lg">
                  <div className="min-w-0">
                    <span className="font-bebas text-xl text-text leading-none block truncate">
                      SaZeJe Football
                    </span>
                    <span className="font-mono text-[11px] text-azg uppercase tracking-wider block truncate">
                      {lang === "en" ? "European Groundhopper" : "Europese Groundhopper"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Bio & Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                {bioBadge && (
                  <div className="font-mono text-xs uppercase tracking-widest text-azg font-bold flex items-center gap-1.5 mb-2">
                    <Compass className="w-3.5 h-3.5 text-accent" />
                    <span>{bioBadge}</span>
                  </div>
                )}

                <h2 className="font-bebas text-3xl sm:text-5xl text-text m-0 tracking-wide leading-tight">
                  {bioTitle}
                </h2>
              </div>

              {/* Editorial Lead Highlight */}
              {bioLead && (
                <p className="font-inter text-base sm:text-lg text-text font-medium leading-relaxed border-l-2 border-accent pl-4 my-4">
                  {bioLead}
                </p>
              )}

              {/* Dynamic Paragraphs from Payload CMS */}
              <div className="space-y-4 font-inter text-[15px] text-text-muted leading-relaxed">
                {aboutContent.story.paragraphs.map((p, idx) => {
                  const text = lang === "en" && p.paragraphEn ? p.paragraphEn : p.paragraph;
                  return (
                    <p key={p.id || idx} className="m-0">
                      {text}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Full-width Quote Banner */}
          {aboutContent.story.quote && (
            <div className="relative bg-surface border border-border rounded-xl px-5 py-3.5 sm:py-4 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center">
                <p className="font-inter italic text-xs sm:text-sm text-text leading-relaxed m-0">
                  &ldquo;{lang === "en" && aboutContent.story.quoteEn ? aboutContent.story.quoteEn : aboutContent.story.quote}&rdquo;
                </p>
                {aboutContent.story.quoteAuthor && (
                  <span className="font-mono text-[11px] text-accent uppercase tracking-wider font-semibold shrink-0">
                    — {aboutContent.story.quoteAuthor}
                  </span>
                )}
              </div>
            </div>
          )}
        </section>

        {/* 3. Matchday & Grounds Gallery Section */}
        {aboutContent.media.gallery && aboutContent.media.gallery.length > 0 && (
          <MatchdayGallery items={aboutContent.media.gallery} />
        )}

        {/* 4. Personal Goals Section */}
        <section id="goals" className="scroll-mt-24 pt-4 border-t border-border space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-azg font-bold flex items-center gap-1.5 mb-1.5">
                <Target className="w-3.5 h-3.5 text-accent" />
                <span>{lang === "en" ? "MILESTONES & BUCKETLIST" : "MIJLPALEN & BUCKETLIST"}</span>
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
                {t.about.goalsTitle}
              </h2>
              <p className="font-inter text-sm text-text-muted m-0 mt-1 max-w-2xl">
                {t.about.goalsSubtitle}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-surface border border-border p-1 rounded-xl shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setGoalFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  goalFilter === "all"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {lang === "en" ? "All" : "Alle"} ({goals.length})
              </button>
              <button
                type="button"
                onClick={() => setGoalFilter("in_progress")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  goalFilter === "in_progress"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {t.about.statusInProgress} ({goals.filter(g => g.status !== "completed" && g.currentCount < g.targetCount).length})
              </button>
              <button
                type="button"
                onClick={() => setGoalFilter("completed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  goalFilter === "completed"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {t.about.statusCompleted} ({stats.completedGoalsCount})
              </button>
            </div>
          </div>

          {/* Overall Progress Banner */}
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="font-bebas text-2xl text-text m-0">
                  {lang === "en" ? "Cumulative Goals Progress" : "Totale Voortgang Doelen"}
                </span>
                <span className="font-mono text-xs text-azg font-bold px-2 py-0.5 rounded-full bg-azg/10 border border-azg/20">
                  {overallProgressPercentage}%
                </span>
              </div>
              <p className="font-inter text-xs text-text-muted m-0">
                {lang === "en"
                  ? `${stats.completedGoalsCount} of ${stats.totalGoalsCount} personal milestones fully achieved`
                  : `${stats.completedGoalsCount} van de ${stats.totalGoalsCount} persoonlijke doelstellingen voltooid`}
              </p>
            </div>

            <div className="w-full sm:w-64 shrink-0 space-y-1.5">
              <div className="w-full bg-surface-2 h-3 rounded-full overflow-hidden border border-border/40 p-[1px]">
                <div
                  className="bg-azg h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(46,139,132,0.3)]"
                  style={{ width: `${overallProgressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} href={`/about/goals/${goal.id}`} />
            ))}
          </div>

          {filteredGoals.length === 0 && (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-surface/50">
              <Clock className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-60" />
              <p className="font-inter text-sm text-text-muted m-0">
                {lang === "en" ? "No goals match the selected filter." : "Geen doelen gevonden voor deze filter."}
              </p>
            </div>
          )}
        </section>

        {/* 5. Community & Collaboration Banner */}
        <section aria-label="Community CTA" className="bg-surface-2/70 border border-border rounded-3xl p-6 sm:p-10 shadow-card flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
              {lang === "en" ? "COMMUNITY & GROUND TIPS" : "COMMUNITY & STADIONTIPS"}
            </span>
            <h2 className="font-bebas text-2xl sm:text-3xl text-text m-0">
              {lang === "en"
                ? "Have a stadium tip or match report?"
                : "Heb je een stadiontip of wedstrijdverhaal?"}
            </h2>
            <p className="font-inter text-xs sm:text-sm text-text-muted m-0 leading-relaxed">
              {lang === "en"
                ? "We are always eager to discover rare European grounds or hear from fellow passionate groundhoppers."
                : "We staan altijd open voor unieke Europese stadionaanbevelingen of verhalen van medegroundhoppers."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-inter text-xs font-semibold hover:bg-accent/90 transition-colors shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Get in Touch" : "Neem Contact Op"}</span>
            </Link>
            <Link
              href="/scarves"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border text-text font-inter text-xs font-semibold hover:bg-surface-2 transition-colors"
            >
              <span>{lang === "en" ? "View Scarves" : "Bekijk Sjaals"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
