"use client";

import * as React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Ground } from "@/types";
import { GroundsFilterBar, GroundsFilterValues } from "@/components/grounds/GroundsFilterBar";
import { GroundCard } from "@/components/grounds/GroundCard";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GroundsViewProps {
  allGrounds: Ground[];
}

export function GroundsView({ allGrounds }: GroundsViewProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  // Read current filters from URL search params
  const currentFilters: GroundsFilterValues = React.useMemo(() => {
    return {
      country: searchParams.get("country") || "Alle landen",
      competition: searchParams.get("competition") || "Alle competities",
      club: searchParams.get("club") || "Alle clubs",
      sort: searchParams.get("sort") || "date-desc",
    };
  }, [searchParams]);

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

  // Synchronize filter changes with URL search params
  const handleFilterChange = (newValues: GroundsFilterValues) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newValues.country && newValues.country !== "Alle landen") {
      params.set("country", newValues.country);
    } else {
      params.delete("country");
    }

    if (newValues.competition && newValues.competition !== "Alle competities") {
      params.set("competition", newValues.competition);
    } else {
      params.delete("competition");
    }

    if (newValues.club && newValues.club !== "Alle clubs") {
      params.set("club", newValues.club);
    } else {
      params.delete("club");
    }

    if (newValues.sort && newValues.sort !== "date-desc") {
      params.set("sort", newValues.sort);
    } else {
      params.delete("sort");
    }

    const queryStr = params.toString();
    const newUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
    router.push(newUrl, { scroll: false });
  };

  // Filter and sort grounds list
  const filteredGrounds = React.useMemo(() => {
    const result = allGrounds.filter((g) => {
      if (currentFilters.country !== "Alle landen" && g.country !== currentFilters.country) return false;
      if (currentFilters.competition !== "Alle competities" && g.competition !== currentFilters.competition) return false;
      if (currentFilters.club !== "Alle clubs" && g.club !== currentFilters.club) return false;
      return true;
    });

    if (currentFilters.sort === "date-desc") {
      result.sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime());
    } else if (currentFilters.sort === "date-asc") {
      result.sort((a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime());
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
