"use client";

import * as React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Ground } from "@/types";
import {
  GroundsFilterBar,
  GroundsFilterValues,
} from "@/components/grounds/GroundsFilterBar";
import { GroundCard } from "@/components/grounds/GroundCard";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";

export interface GroundsViewProps {
  allGrounds: Ground[];
}

export function GroundsView({ allGrounds }: GroundsViewProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useTranslation();

  // Local state for 100% instant client-side filtering without server navigation roundtrips
  const [currentFilters, setCurrentFilters] = React.useState<GroundsFilterValues>(() => {
    return {
      search: searchParams.get("search") || "",
      country: searchParams.get("country") || "Alle landen",
      competition: searchParams.get("competition") || "Alle competities",
      club: searchParams.get("club") || "Alle clubs",
      sort: searchParams.get("sort") || "date-desc",
    };
  });

  // Unique options derived from all grounds data
  const countries = React.useMemo(
    () => ["Alle landen", ...Array.from(new Set(allGrounds.map((g) => g.country)))].sort(),
    [allGrounds]
  );
  const competitions = React.useMemo(
    () => ["Alle competities", ...Array.from(new Set(allGrounds.map((g) => g.competition)))].sort(),
    [allGrounds]
  );
  const clubs = React.useMemo(
    () => ["Alle clubs", ...Array.from(new Set(allGrounds.map((g) => g.club)))].sort(),
    [allGrounds]
  );

  // Debounced background URL synchronization using window.history.replaceState
  // This updates the URL bar for sharing/bookmarks WITHOUT triggering Next.js server component re-fetches
  const urlSyncTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleFilterChange = React.useCallback(
    (newValues: GroundsFilterValues) => {
      // 1. Instantly update React state in memory (0ms delay)
      setCurrentFilters(newValues);

      // 2. Debounce URL sync to keep browser address bar current without blocking typing
      if (urlSyncTimerRef.current) {
        clearTimeout(urlSyncTimerRef.current);
      }

      urlSyncTimerRef.current = setTimeout(() => {
        const params = new URLSearchParams();

        if (newValues.search && newValues.search.trim()) {
          params.set("search", newValues.search.trim());
        }
        if (newValues.country && newValues.country !== "Alle landen") {
          params.set("country", newValues.country);
        }
        if (newValues.competition && newValues.competition !== "Alle competities") {
          params.set("competition", newValues.competition);
        }
        if (newValues.club && newValues.club !== "Alle clubs") {
          params.set("club", newValues.club);
        }
        if (newValues.sort && newValues.sort !== "date-desc") {
          params.set("sort", newValues.sort);
        }

        const queryStr = params.toString();
        const newUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
        window.history.replaceState(null, "", newUrl);
      }, 200);
    },
    [pathname]
  );

  // Synchronize on browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentFilters({
        search: params.get("search") || "",
        country: params.get("country") || "Alle landen",
        competition: params.get("competition") || "Alle competities",
        club: params.get("club") || "Alle clubs",
        sort: params.get("sort") || "date-desc",
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Instant in-memory filtering and sorting (executes in <1ms)
  const filteredGrounds = React.useMemo(() => {
    const q = (currentFilters.search || "").toLowerCase().trim();

    const result = allGrounds.filter((g) => {
      if (
        currentFilters.country !== "Alle landen" &&
        g.country !== currentFilters.country
      ) {
        return false;
      }

      if (
        currentFilters.competition !== "Alle competities" &&
        g.competition !== currentFilters.competition
      ) {
        return false;
      }

      if (
        currentFilters.club !== "Alle clubs" &&
        g.club !== currentFilters.club
      ) {
        return false;
      }

      if (q) {
        const name = (g.name || "").toLowerCase();
        const club = (g.club || "").toLowerCase();
        const comp = (g.competition || "").toLowerCase();
        const countryNL = (g.country || "").toLowerCase();
        const countryEN = getCountryDisplayName(g.country, "en").toLowerCase();
        const desc = (g.description || "").toLowerCase();
        const story = (g.story || "").toLowerCase();
        const match = (g.matchInfo || "").toLowerCase();
        const extra = (g.extra || "").toLowerCase();

        const matchesQuery =
          name.includes(q) ||
          club.includes(q) ||
          comp.includes(q) ||
          countryNL.includes(q) ||
          countryEN.includes(q) ||
          desc.includes(q) ||
          story.includes(q) ||
          match.includes(q) ||
          extra.includes(q);

        if (!matchesQuery) return false;
      }

      return true;
    });

    if (currentFilters.sort === "date-desc") {
      result.sort(
        (a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
      );
    } else if (currentFilters.sort === "date-asc") {
      result.sort(
        (a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime()
      );
    } else if (currentFilters.sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [allGrounds, currentFilters]);

  return (
    <div>
      <GroundsFilterBar
        values={currentFilters}
        onChange={handleFilterChange}
        countries={countries}
        competitions={competitions}
        clubs={clubs}
        totalResults={filteredGrounds.length}
      />

      {filteredGrounds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]">
          {filteredGrounds.map((ground) => (
            <GroundCard key={ground.id} ground={ground} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-border rounded-xl bg-surface text-text-muted font-mono text-sm shadow-card">
          {t.grounds.empty}
        </div>
      )}
    </div>
  );
}
