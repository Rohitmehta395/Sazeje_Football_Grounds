import * as React from "react";
import Image from "next/image";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
}

export function PageHero({
  eyebrow = "GROUNDHOPPING LOG",
  title,
  description,
  backgroundImage = "/Hero_Image.jpg",
}: PageHeroProps) {
  return (
    <div className="relative h-[230px] flex flex-col text-white rounded-b-radius overflow-hidden mb-0">
      {/* Background Stadium Photo */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,19,25,0.2)] to-[rgba(15,19,25,0.82)] z-0" />

      {/* Hero Content Inner */}
      <div className="relative z-10 px-[24px] pb-[22px] max-w-[1160px] mx-auto w-full flex-1 flex flex-col justify-end">
        {eyebrow && (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded bg-accent text-white font-mono text-[11px] sm:text-[11.5px] tracking-[0.14em] uppercase font-bold mb-2 shadow-sm w-fit">
            {eyebrow}
          </div>
        )}
        <h1 className="font-bebas text-[clamp(26px,4vw,38px)] leading-[1.05] my-[2px] text-white [text-shadow:0_3px_12px_rgba(0,0,0,0.4)]">
          {title}
        </h1>
        {description && (
          <p className="font-inter text-[13.5px] text-white/88 m-0 max-w-[560px]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
