"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import { WhyChooseUsVariant } from "@/data/type";

interface WhyChooseUsProps {
  data?: WhyChooseUsVariant;
}

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sectionData: WhyChooseUsVariant =
    data ||
    (contentData.NexOilGas.sections.WhyChooseUs?.variants.NexOilGasWhyChooseUs1 as WhyChooseUsVariant);

  const tagline = sectionData?.tagline || "";
  const headingPart1 = sectionData?.headingPart1 || "";
  const headingPart2 = sectionData?.headingPart2 || "";
  const headingHighlight = sectionData?.headingHighlight || "";
  const description = sectionData?.description || "";
  const image = sectionData?.image || "/whychooseus.webp";
  const features = sectionData?.features || [];
  const overlayCard = sectionData?.overlayCard || {
    title: "",
    description: "",
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "shield":
        return (
          <svg
            className="w-8 h-8 text-[#f97316] transition-transform duration-300 group-hover/feat:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );
      case "gear":
        return (
          <svg
            className="w-8 h-8 text-[#f97316] transition-transform duration-300 group-hover/feat:scale-110 group-hover/feat:rotate-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case "leaf":
        return (
          <svg
            className="w-8 h-8 text-[#f97316] transition-transform duration-300 group-hover/feat:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        );
      case "handshake":
        return (
          <svg
            className="w-8 h-8 text-[#f97316] transition-transform duration-300 group-hover/feat:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.4-2.4a1 1 0 0 0-1.4 0L13.5 12" />
            <path d="m7 13 2 2a1 1 0 0 0 1.4 0l1.6-1.6" />
            <path d="M19 14.5 22 13a2 2 0 0 0 .5-2.8l-1.8-2.4a2 2 0 0 0-2.4-.7l-3.3 1.2" />
            <path d="m2 11 3 1.5a2 2 0 0 0 2.4-.7l1.8-2.4A2 2 0 0 0 8.7 6.6L5.4 5.4a2 2 0 0 0-2.4.7L1.2 8.5A2 2 0 0 0 2 11Z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-8 h-8 text-[#f97316] transition-transform duration-300 group-hover/feat:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="w-full bg-[#011027] text-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[640px] lg:min-h-[720px]">
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center px-5 sm:px-10 lg:px-12 xl:px-16 py-14 sm:py-18 lg:py-22">
          <p
            className={`text-zinc-400 font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase mb-3 sm:mb-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            {tagline}
          </p>

          <h2
            className={`text-white font-extrabold text-[clamp(24px,6.4vw,32px)] sm:text-4xl lg:text-[46px] xl:text-[50px] leading-[1.15] sm:leading-[1.12] tracking-tight transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="block">{headingPart1}</span>
            <span className="block">
              {headingPart2}{" "}
              <span className="text-[#f97316]">{headingHighlight}</span>
            </span>
          </h2>

          <div
            className={`flex items-center gap-2 my-5 sm:my-6 transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
          >
            <div
              className={`h-1 sm:h-1.5 bg-[#f97316] rounded-full transition-all duration-700 delay-300 ${
                isVisible ? "w-14" : "w-0"
              }`}
            />
            <div
              className={`h-1 sm:h-1.5 bg-white/70 rounded-full transition-all duration-700 delay-400 ${
                isVisible ? "w-6" : "w-0"
              }`}
            />
          </div>

          <p
            className={`text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl transition-all duration-700 delay-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {description}
          </p>

          <div
            className={`w-full max-w-xl h-px bg-white/20 my-7 sm:my-8 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
              isVisible
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
            }`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 max-w-xl">
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  transitionDelay: `${isVisible ? 300 + idx * 100 : 0}ms`,
                }}
                className={`group/feat flex items-start gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1.5 cursor-default ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="shrink-0 mt-0.5">{renderIcon(feature.icon)}</div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-[17px] mb-1 transition-colors duration-300 group-hover/feat:text-[#f97316]">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-[13.5px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-5 relative min-h-[420px] sm:min-h-[480px] lg:min-h-[640px] h-full overflow-hidden">
          <Image
            src={image}
            alt={`${headingPart1} ${headingPart2}`}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className={`object-cover object-center select-none transition-all duration-1000 ease-out hover:scale-105 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />

          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-start pointer-events-none">
            <div
              className={`w-[92%] sm:w-[88%] max-w-md sm:max-w-lg lg:max-w-md xl:max-w-lg bg-[#ea580c] p-6 sm:p-8 lg:p-10 shadow-2xl pointer-events-auto transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_20px_50px_rgba(234,88,12,0.35)] hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <h3 className="text-white font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug mb-3 sm:mb-4">
                {overlayCard.title}
              </h3>
              <p className="text-white/95 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed">
                {overlayCard.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
