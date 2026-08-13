/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export interface GroundGalleryProps {
  images: string[];
  alt?: string;
}

export function GroundGallery({ images, alt = "Ground photo" }: GroundGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[10px] mt-[20px]">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${alt} ${idx + 1}`}
          className="w-full h-[110px] object-cover rounded-[8px] border border-border"
        />
      ))}
    </div>
  );
}
