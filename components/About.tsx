"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import { AboutVariant } from "@/data/type";

interface AboutProps {
  data?: AboutVariant;
}

function StatCounter({ value, start }: { value: string; start: boolean }) {
  const [displayValue, setDisplayValue] = useState<string>(() => {
    const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return value;
    return `${match[1]}0${match[3]}`;
  });

  useEffect(() => {
    const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const isDecimal = match[2].includes(".");
    const decimals = isDecimal ? match[2].split(".")[1].length : 0;

    if (!start) {
      setDisplayValue(`${prefix}0${suffix}`);
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2000;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentVal = easedProgress * target;

      const formattedNumber = isDecimal
        ? currentVal.toFixed(decimals)
        : Math.round(currentVal).toString();

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        const finalFormatted = isDecimal
          ? target.toFixed(decimals)
          : target.toString();
        setDisplayValue(`${prefix}${finalFormatted}${suffix}`);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, start]);

  return <span>{displayValue}</span>;
}

export default function About({ data }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, []);

  const aboutData: AboutVariant =
    data ||
    (contentData.NexOilGas.sections.About?.variants
      .NexOilGasAbout1 as AboutVariant);

  const tagline = aboutData?.tagline || "";
  const heading = aboutData?.heading || "";

  const headingPart1 =
    aboutData?.headingPart1 ||
    (heading ? heading.split(" ").slice(0, 4).join(" ") : "");

  const headingPart2 =
    aboutData?.headingPart2 ||
    (heading ? heading.split(" ").slice(4).join(" ") : "");

  const description = aboutData?.description || "";
  const image = aboutData?.image || "/about.webp";
  const stats = aboutData?.stats || [];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white text-[#101b12] overflow-hidden py-10 sm:py-14 lg:py-7"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-7 lg:gap-5">
          <div
            className={`relative flex items-center justify-center w-full transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative w-full max-w-[590px] aspect-[4/5] lg:aspect-[4/5]">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 500 625"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="aboutOrangeArc"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ff7900" />
                    <stop offset="100%" stopColor="#e85b00" />
                  </linearGradient>

                  <radialGradient id="aboutGlow">
                    <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <ellipse
                  cx="250"
                  cy="305"
                  rx="230"
                  ry="265"
                  fill="url(#aboutGlow)"
                />

                <path
                  d="M 183 35 C 85 45 20 145 20 250 C 20 282 23 320 30 355"
                  stroke="url(#aboutOrangeArc)"
                  strokeWidth="11"
                  strokeLinecap="round"
                />

                <path
                  d="M 440 360 C 480 420 475 505 430 570"
                  stroke="url(#aboutOrangeArc)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={image}
                  alt="NexOilGas oil and gas industry professional"
                  width={650}
                  height={800}
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="w-full h-full object-contain object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full lg:pl-2 xl:pl-5">
            <div
              className={`flex items-center gap-5 mb-3 sm:mb-4 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <span className="text-[#ed7900] text-[19px] sm:text-[22px] font-bold tracking-tight">
                {tagline}
              </span>

              <span className="w-14 sm:w-[68px] h-[2px] bg-[#ed7900]" />
            </div>

            <h2
              className={`text-[#082416] text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[62px] font-extrabold leading-[1.1] tracking-[-0.035em] mb-5 sm:mb-6 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="block">{headingPart1}</span>
              <span className="block">{headingPart2}</span>
            </h2>

            <p
              className={`text-[#292929] text-[16px] sm:text-[19px] lg:text-[20px] xl:text-[22px] font-normal leading-[1.55] max-w-[850px] mb-9 sm:mb-12 lg:mb-[72px] transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {description}
            </p>

            <div
              className={`w-full bg-[#fffaf6] border border-[#f8e9df] rounded-[22px] sm:rounded-[25px] px-3 sm:px-4 py-5 sm:py-6 lg:py-6 transition-all duration-700 delay-400 hover:shadow-[0_8px_25px_rgba(234,88,12,0.07)] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#d6d6d6]">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center text-center px-2 sm:px-3 py-3 sm:py-0 transition-transform duration-300 hover:scale-105 ${
                      idx >= 2 ? "sm:border-l" : ""
                    }`}
                  >
                    <span className="text-[#ed7900] text-[34px] sm:text-[40px] lg:text-[43px] xl:text-[48px] leading-none font-extrabold tracking-tight">
                      <StatCounter value={stat.value} start={isVisible} />
                    </span>

                    <span className="text-[#282828] text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[17px] font-medium mt-3 whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
