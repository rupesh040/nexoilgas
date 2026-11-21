"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import { ServicesVariant } from "@/data/type";

interface ServicesProps {
  data?: ServicesVariant;
}

export default function Services({ data }: ServicesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const servicesData: ServicesVariant =
    data ||
    (contentData.NexOilGas.sections.Services?.variants.NexOilGasServices1 as ServicesVariant);

  const tagline = servicesData?.tagline || "";
  const taglinePrefix = servicesData?.taglinePrefix || "";
  const headingPart1 = servicesData?.headingPart1 || "";
  const headingPart2 = servicesData?.headingPart2 || "";
  const headingHighlight = servicesData?.headingHighlight || "";
  const description = servicesData?.description || "";
  const items = servicesData?.items || [];

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full bg-white py-12 sm:py-16 text-zinc-900 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <div
              className={`flex items-center gap-1.5 mb-2.5 sm:mb-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-6"
              }`}
            >
              <span className="text-[#ea580c] font-black text-lg sm:text-xl">
                {taglinePrefix}
              </span>
              <span className="text-[#ea580c] font-bold text-base sm:text-lg tracking-wide">
                {tagline}
              </span>
            </div>

            <h2
              className={`text-[#07182c] font-black text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-[1.12] tracking-tight transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="block">{headingPart1}</span>
              <span className="block">
                {headingPart2}{" "}
                <span className="text-[#ea580c]">{headingHighlight}</span>
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:max-w-lg">
            <p
              className={`text-zinc-600 text-sm sm:text-base leading-relaxed transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4 xl:gap-6">
          {items.map((item, idx) => (
            <a
              key={item.id}
              href={item.href || "#contact"}
              onClick={(e) => handleSmoothScroll(e, item.href || "#contact")}
              style={{
                transitionDelay: `${isVisible ? 100 + idx * 90 : 0}ms`,
              }}
              className={`group flex flex-col bg-[#07182c] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-[0.98]"
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
              </div>

              <div className="p-4 sm:p-5 flex items-center justify-between gap-3 min-h-[82px] sm:min-h-[88px] bg-[#07182c]">
                <h3 className="text-white font-bold text-[15px] sm:text-base leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-amber-400">
                  {item.title}
                </h3>

                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/45 text-white bg-transparent flex items-center justify-center shrink-0 transition-all duration-400 ease-out group-hover:border-[#ea580c] group-hover:bg-[#ea580c] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(234,88,12,0.4)] pointer-events-none">
                  <svg
                    className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
