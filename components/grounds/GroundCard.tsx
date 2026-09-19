import * as React from "react";
import Link from "next/link";
import { Ground } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import { formatDate } from "@/lib/utils/formatDate";

export interface GroundCardProps {
  ground: Ground;
  href?: string;
  isStatic?: boolean;
}

export function GroundCard({
  ground,
  href = `/grounds/${ground.id}`,
  isStatic = false,
}: GroundCardProps) {
  const { t, lang } = useTranslation();
  const formattedDate = formatDate(ground.visitDate, lang);
  const countryName = getCountryDisplayName(ground.country, lang);
  const displayMatchInfo = lang === "en" && ground.matchInfoEn ? ground.matchInfoEn : ground.matchInfo;
  const displayDescription = lang === "en" && ground.descriptionEn ? ground.descriptionEn : ground.description;

  const content = (
    <Card isStatic={isStatic} className="relative group overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300">
      {/* Photo Header */}
      <div
        className="h-[185px] bg-cover bg-center relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ backgroundImage: `url('${ground.photo || "/placeholder-ground.jpg"}')` }}
        role="img"
        aria-label={lang === "en" ? `Photo of stadium ${ground.name}` : `Foto van stadion ${ground.name}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <Badge variant="dark" className="absolute top-[12px] left-[12px] shadow-sm backdrop-blur-md bg-black/50 border border-white/20">
          {countryName}
        </Badge>
        {displayMatchInfo && (
          <div className="absolute bottom-[10px] left-[12px] right-[12px] font-mono text-[11px] text-white/95 truncate bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
            ⚽ {displayMatchInfo}
          </div>
        )}
      </div>

      {/* Ticket-stub Cut Detail */}
      <div className="h-0 relative border-t-2 border-dashed border-border mx-[14px]">
        <div className="absolute -top-[9px] -left-[23px] w-[18px] h-[18px] rounded-full bg-bg border border-border" />
        <div className="absolute -top-[9px] -right-[23px] w-[18px] h-[18px] rounded-full bg-bg border border-border" />
      </div>

      {/* Card Body */}
      <div className="p-[16px_18px_18px] flex-1 flex flex-col gap-[6px] justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.08em] font-semibold">
              {ground.competition}
            </span>
          </div>

          <h3 className="font-bebas text-[23px] text-text m-0 mt-1 leading-tight group-hover:text-accent transition-colors">
            {ground.name}
          </h3>

          <p className="text-text-muted text-[13px] m-[4px_0_0] line-clamp-2 leading-relaxed">
            {displayDescription}
          </p>
        </div>

        <div>
          <div className="text-text text-[12px] m-[10px_0_0] pt-[10px] border-t border-dashed border-border/80 flex items-center justify-between">
            <span className="text-text-muted">Club:</span>
            <span className="font-semibold text-text truncate max-w-[170px]">{ground.club}</span>
          </div>

          {/* Foot Row */}
          <div className="flex justify-between items-center mt-[10px] text-[12px] text-text-muted">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-azg" />
              {formattedDate || ground.visitDate}
            </span>
            <span className="flex items-center gap-1 font-semibold text-accent group-hover:translate-x-1 transition-transform">
              {t.grounds.viewDetails} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Card>
  );

  if (isStatic) {
    return content;
  }

  return <Link href={href} className="h-full block">{content}</Link>;
}
