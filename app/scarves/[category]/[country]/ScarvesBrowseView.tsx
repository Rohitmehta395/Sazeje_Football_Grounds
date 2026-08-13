"use client";

import * as React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Scarf } from "@/types";
import { ScarvesFilterBar, ScarvesFilterValues } from "@/components/scarves/ScarvesFilterBar";
import { ScarfEntry } from "@/components/scarves/ScarfEntry";
import { ScarfPagination } from "@/components/scarves/ScarfPagination";

export interface ScarvesBrowseViewProps {
  initialScarves: Scarf[];
  categoryLabel: string;
  countryName: string;
}

const ITEMS_PER_PAGE = 10;

export function ScarvesBrowseView({
  initialScarves,
}: ScarvesBrowseViewProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Read state from URL search params
  const currentFilters: ScarvesFilterValues = React.useMemo(() => {
    return {
      search: searchParams.get("search") || "",
      club: searchParams.get("club") || "Alle clubs",
    };
  }, [searchParams]);

  const currentPage = React.useMemo(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(p) || p < 1 ? 1 : p;
  }, [searchParams]);

  const clubs = React.useMemo(
    () => ["Alle clubs", ...Array.from(new Set(initialScarves.map((s) => s.club)))].sort(),
    [initialScarves]
  );

  // Synchronize filter & page changes with URL search params
  const updateQueryParams = (newFilters: ScarvesFilterValues, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newFilters.search) {
      params.set("search", newFilters.search);
    } else {
      params.delete("search");
    }

    if (newFilters.club && newFilters.club !== "Alle clubs") {
      params.set("club", newFilters.club);
    } else {
      params.delete("club");
    }

    if (newPage > 1) {
      params.set("page", String(newPage));
    } else {
      params.delete("page");
    }

    const queryStr = params.toString();
    const newUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
    router.push(newUrl, { scroll: false });
  };

  const handleFilterChange = (newFilters: ScarvesFilterValues) => {
    updateQueryParams(newFilters, 1);
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams(currentFilters, newPage);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // Filter list based on search params
  const filteredScarves = React.useMemo(() => {
    return initialScarves.filter((s) => {
      if (currentFilters.club !== "Alle clubs" && s.club !== currentFilters.club) return false;
      if (currentFilters.search) {
        const q = currentFilters.search.toLowerCase();
        const haystack = `${s.club} ${s.type} ${s.description || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [initialScarves, currentFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredScarves.length / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);

  const paginatedScarves = React.useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredScarves.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredScarves, validPage]);

  return (
    <div className="space-y-8">
      {/* Scarves Filter Bar */}
      <ScarvesFilterBar
        values={currentFilters}
        onChange={handleFilterChange}
        clubs={clubs}
      />

      {/* Scarves Entries */}
      {paginatedScarves.length > 0 ? (
        <div className="max-w-[640px] mx-auto space-y-12">
          {paginatedScarves.map((scarf) => (
            <ScarfEntry key={scarf.id} scarf={scarf} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-border rounded-xl bg-surface text-text-muted font-mono text-sm shadow-card">
          Nog geen sjaals gevonden in deze selectie.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <ScarfPagination
          currentPage={validPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
