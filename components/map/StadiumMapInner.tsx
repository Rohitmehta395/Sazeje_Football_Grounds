/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { Ground } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import "leaflet/dist/leaflet.css";

export interface StadiumMapInnerProps {
  grounds: Ground[];
  className?: string;
}

// Helper component to auto-fit map bounds to markers
function MapBounds({ grounds }: { grounds: Ground[] }) {
  const map = useMap();

  React.useEffect(() => {
    if (grounds && grounds.length > 0) {
      const bounds = L.latLngBounds(grounds.map((g) => [g.lat, g.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [grounds, map]);

  return null;
}

export function StadiumMapInner({
  grounds,
  className = "",
}: StadiumMapInnerProps) {
  const { t, lang } = useTranslation();

  const createClubMarker = (clubName: string, clubLogo?: string) => {
    if (clubLogo) {
      return L.divIcon({
        className: "custom-leaflet-marker",
        html: `<div className="club-marker" style="width:36px;height:36px;border-radius:50%;background:#ffffff;display:flex;align-items:center;justify-content:center;border:2px solid var(--accent);box-shadow:0 3px 8px rgba(0,0,0,0.35);overflow:hidden;padding:3px;"><img src="${clubLogo}" alt="${clubName || "Club logo"}" style="width:100%;height:100%;object-fit:contain;border-radius:50%;" /></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
    }

    const initials =
      (clubName || "")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 3)
        .toUpperCase() || "•";

    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `<div className="club-marker" style="width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:12px;font-weight:700;border:3px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,0.35);">${initials}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  };

  const defaultCenter: [number, number] =
    grounds.length > 0 ? [grounds[0].lat, grounds[0].lng] : [52.1326, 5.2913]; // Netherlands center default

  return (
    <div
      className={`h-[560px] rounded border border-border overflow-hidden relative shadow-card ${className}`.trim()}
    >
      <MapContainer
        center={defaultCenter}
        zoom={6}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds grounds={grounds} />

        {grounds.map((ground) => (
          <Marker
            key={ground.id}
            position={[ground.lat, ground.lng]}
            icon={createClubMarker(ground.club, ground.clubLogo)}
          >
            <Popup>
              <div className="p-1 max-w-[220px]">
                {ground.photo && (
                  <img
                    src={ground.photo}
                    alt={ground.name}
                    className="w-full h-[100px] object-cover rounded-[6px] mb-2"
                  />
                )}
                <h4 className="font-bebas text-lg m-0 text-text leading-tight">
                  {ground.name}
                </h4>
                <p className="font-mono text-xs text-azg uppercase m-0 mb-1">
                  {ground.club} • {getCountryDisplayName(ground.country, lang)}
                </p>
                <p className="font-inter text-xs text-text-muted m-0 mb-2 line-clamp-2">
                  {ground.description}
                </p>
                <Link
                  href={`/grounds/${ground.id}`}
                  className="inline-block font-semibold text-xs text-accent underline"
                >
                  {t.map.popupViewGround}
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
