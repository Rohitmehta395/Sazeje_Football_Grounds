"use client";

import * as React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Scarf } from "@/types";
import { ScarvesFilterBar, ScarvesFilterValues } from "@/components/scarves/ScarvesFilterBar";
import { ScarfCard } from "@/components/scarves/ScarfCard";
import { ScarfLightbox } from "@/components/scarves/ScarfLightbox";
import { ScarfPagination } from "@/components/scarves/ScarfPagination";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Search } from "lucide-react";

export interface ScarvesBrowseViewProps {
  initialScarves: Scarf[];
  categoryLabel: string;
  countryName: string;
}

const ITEMS_PER_PAGE = 12;

export function ScarvesBrowseView({
  initialScarves,
  categoryLabel,
  countryName,
}: ScarvesBrowseViewProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [activeLightboxScarf, setActiveLightboxScarf] = React.useState<Scarf | null>(null);

  // Read state from URL search params
  const currentFilters: ScarvesFilterValues = React.useMemo(() => {
    return {
      search: searchParams.get("search") || "",
      club: searchParams.get("club") || (isEn ? "All clubs" : "Alle clubs"),
    };
  }, [searchParams, isEn]);

  const currentPage = React.useMemo(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(p) || p < 1 ? 1 : p;
  }, [searchParams]);

  const allClubsLabel = isEn ? "All clubs" : "Alle clubs";
  const clubs = React.useMemo(
    () => [allClubsLabel, ...Array.from(new Set(initialScarves.map((s) => s.club)))].sort(),
    [initialScarves, allClubsLabel]
  );

  // Synchronize filter & page changes with URL search params
  const updateQueryParams = (newFilters: ScarvesFilterValues, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newFilters.search) {
      params.set("search", newFilters.search);
    } else {
      params.delete("search");
    }

    if (newFilters.club && newFilters.club !== allClubsLabel && newFilters.club !== "Alle clubs" && newFilters.club !== "All clubs") {
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
      if (
        currentFilters.club !== allClubsLabel &&
        currentFilters.club !== "Alle clubs" &&
        currentFilters.club !== "All clubs" &&
        s.club !== currentFilters.club
      ) {
        return false;
      }

      if (currentFilters.search) {
        const q = currentFilters.search.toLowerCase();
        const haystack = `${s.club} ${s.stadium} ${s.type} ${s.description || ""} ${s.descriptionEn || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [initialScarves, currentFilters, allClubsLabel]);

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

      {/* Matching Results Counter */}
      <div className="text-xs font-mono text-text-muted pb-2 border-b border-border/60 flex items-center justify-between">
        <span>
          <strong className="text-text">{filteredScarves.length}</strong>{" "}
          {filteredScarves.length === 1
            ? isEn
              ? "scarf found"
              : "sjaal gevonden"
            : isEn
            ? "scarves found"
            : "sjaals gevonden"}
        </span>
      </div>

      {/* Grid of ScarfCards */}
      {paginatedScarves.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedScarves.map((scarf) => (
            <ScarfCard
              key={scarf.id}
              scarf={scarf}
              onOpenLightbox={(s) => setActiveLightboxScarf(s)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-surface border border-border shadow-card space-y-3">
          <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-text-muted mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-bebas text-2xl text-text m-0">
            {isEn ? "No scarves found" : "Geen sjaals gevonden"}
          </h3>
          <p className="font-inter text-sm text-text-muted max-w-md mx-auto">
            {t.scarves.empty}
          </p>
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

      {/* Photo Lightbox */}
      <ScarfLightbox
        scarf={activeLightboxScarf}
        isOpen={Boolean(activeLightboxScarf)}
        onClose={() => setActiveLightboxScarf(null)}
      />
    </div>
  );
}
