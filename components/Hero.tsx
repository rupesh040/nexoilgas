"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import { HeaderVariant, HeroVariant } from "@/data/type";

interface HeroProps {
  heroData?: HeroVariant;
  headerData?: HeaderVariant;
}

export default function Hero({ heroData }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hero: HeroVariant =
    heroData ||
    (contentData.NexOilGas.sections.Hero.variants.NexOilGasHero1 as HeroVariant);

  const {
    tagline = "POWERING A SUSTAINABLE TOMORROW",
    heading = "Reliable Oil & Gas Solutions",
    headingLines = ["Reliable", "Oil & Gas", "Solutions"],
    backgroundImage = "/home.webp",
  } = hero;

  const mobileHeadingLines =
    headingLines.length >= 3
      ? [
          `${headingLines[0]} ${headingLines[1]}`,
          headingLines.slice(2).join(" "),
        ]
      : headingLines;

  return (
    <section id="hero" className="relative w-full flex flex-col justify-between overflow-hidden bg-[#042d47] min-h-[460px] sm:min-h-[520px] md:min-h-[740px] lg:min-h-[820px] xl:min-h-[880px]">
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src={backgroundImage}
          alt={heading}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-[70%_center] lg:object-center select-none transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />

        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(90deg, #042d47 0%, #042d47 25%, rgba(4, 45, 71, 0.96) 35%, rgba(4, 45, 71, 0.86) 45%, rgba(4, 45, 71, 0.64) 55%, rgba(4, 45, 71, 0.38) 65%, rgba(4, 45, 71, 0.15) 75%, rgba(4, 45, 71, 0) 85%)",
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-28 lg:h-32 bg-gradient-to-b from-[#042d47]/85 via-[#042d47]/30 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 h-20 lg:h-24 bg-gradient-to-t from-[#042d47]/90 to-transparent pointer-events-none" />

        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage:
              "radial-gradient(rgba(145, 195, 230, 0.45) 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(90deg, black 0%, black 30%, transparent 52%)",
            WebkitMaskImage: "linear-gradient(90deg, black 0%, black 30%, transparent 52%)",
          }}
        />
      </div>

      <div
        className={`absolute inset-0 z-0 md:hidden pointer-events-none transition-opacity duration-1000 delay-200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(rgba(145, 195, 230, 0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(180deg, black 0%, black 45%, transparent 65%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, black 45%, transparent 65%)",
        }}
      />

      <div className="w-full h-20 sm:h-24 md:h-28 lg:h-32 pointer-events-none relative z-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-2 sm:py-4 md:py-24 flex-1 flex flex-col justify-center">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
          <p
            className={`text-[#e5cf58] font-bold tracking-[0.16em] sm:tracking-[0.2em] text-xs sm:text-sm md:text-[15px] uppercase mb-2 sm:mb-3 md:mb-4 drop-shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {tagline}
          </p>

          <h1 className="text-white font-black text-2xl sm:text-4xl md:text-6xl lg:text-[76px] xl:text-[84px] leading-[1.08] tracking-tight drop-shadow-md">
            <span className="block md:hidden">
              {mobileHeadingLines.map((line, index) => (
                <span
                  key={index}
                  className={`block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{
                    transitionDelay: `${150 + index * 100}ms`,
                  }}
                >
                  {line}
                </span>
              ))}
            </span>
            <span className="hidden md:block">
              {headingLines.map((line, index) => (
                <span
                  key={index}
                  className={`block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: `${150 + index * 120}ms`,
                  }}
                >
                  {line}
                </span>
              ))}
            </span>
          </h1>
        </div>
      </div>

      <div
        className={`relative w-full aspect-[16/9] sm:aspect-[21/9] md:hidden overflow-hidden mt-auto z-10 transition-all duration-1000 ease-out ${
          mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <Image
          src={backgroundImage}
          alt={heading}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] select-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #042d47 0%, rgba(4, 45, 71, 0.94) 8%, rgba(4, 45, 71, 0.82) 16%, rgba(4, 45, 71, 0.58) 26%, rgba(4, 45, 71, 0.3) 38%, rgba(4, 45, 71, 0.1) 50%, transparent 62%, transparent 82%, rgba(4, 45, 71, 0.35) 92%, #042d47 100%)",
          }}
        />
      </div>

      <div className="relative z-10 pb-2 sm:pb-4 md:pb-8 hidden md:block" />
    </section>
  );
}
