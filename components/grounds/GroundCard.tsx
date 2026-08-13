import * as React from "react";
import Link from "next/link";
import { Ground } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, MapPin } from "lucide-react";

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
  const content = (
    <Card isStatic={isStatic} className="relative group">
      {/* Photo Header */}
      <div
        className="h-[170px] bg-cover bg-center relative"
        style={{ backgroundImage: `url('${ground.photo}')` }}
        role="img"
        aria-label={`Foto van stadion ${ground.name}`}
      >
        <Badge variant="dark" className="absolute top-[10px] left-[10px]">
          {ground.country}
        </Badge>
      </div>

      {/* Ticket-stub Cut Detail */}
      <div className="h-0 relative border-t-2 border-dashed border-border mx-[14px]">
        <div className="absolute -top-[9px] -left-[23px] w-[18px] h-[18px] rounded-full bg-bg border border-border" />
        <div className="absolute -top-[9px] -right-[23px] w-[18px] h-[18px] rounded-full bg-bg border border-border" />
      </div>

      {/* Card Body */}
      <div className="p-[16px_18px_18px] flex-1 flex flex-col gap-[6px]">
        <div className="font-mono text-[11px] text-accent uppercase tracking-[0.06em]">
          {ground.competition}
        </div>
        <h3 className="font-bebas text-[22px] text-text m-0 group-hover:text-accent transition-colors">
          {ground.name}
        </h3>
        <p className="text-text-muted text-[13.5px] m-[2px_0_0] flex-1 line-clamp-2">
          {ground.description}
        </p>

        <p className="text-text text-[12px] m-[10px_0_0] pt-[10px] border-t border-dashed border-border leading-[1.5]">
          <strong>Club:</strong> {ground.club}
        </p>

        {/* Foot Row */}
        <div className="flex justify-between items-center mt-[10px] text-[12px] text-text-muted">
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <MapPin className="w-3 h-3 text-azg" /> {ground.visitDate}
          </span>
          <span className="flex items-center gap-1 font-semibold text-accent group-hover:translate-x-1 transition-transform">
            Details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Card>
  );

  if (isStatic) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
