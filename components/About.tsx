"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import { AboutVariant } from "@/data/type";

interface AboutProps {
  data?: AboutVariant;
}

function StatCounter({ value, start }: { value: string; start: boolean }) {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  const hasMatch = Boolean(match);
  const prefix = match ? match[1] : "";
  const rawNumber = match ? match[2] : "0";
  const suffix = match ? match[3] : "";
  const target = parseFloat(rawNumber);
  const isDecimal = rawNumber.includes(".");
  const decimals = isDecimal ? rawNumber.split(".")[1].length : 0;
  const [animatedVal, setAnimatedVal] = useState<number>(0);

  useEffect(() => {
    if (!hasMatch || !start) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const reducedFrame = requestAnimationFrame(() => setAnimatedVal(target));
      return () => cancelAnimationFrame(reducedFrame);
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
      setAnimatedVal(easedProgress * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setAnimatedVal(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasMatch, target, start]);

  if (!hasMatch) {
    return <span>{value}</span>;
  }

  const shownVal = start ? animatedVal : 0;
  const formattedNumber = isDecimal
    ? shownVal.toFixed(decimals)
    : Math.round(shownVal).toString();

  return (
    <span>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
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
            <div className="relative w-full max-w-[590px] aspect-[3/4]">
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
              className={`text-[#082416] text-[clamp(21px,6.3vw,32px)] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[62px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-[-0.035em] mb-5 sm:mb-6 transition-all duration-700 delay-200 ${
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
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center text-center px-2 sm:px-3 py-3 sm:py-0 transition-transform duration-300 hover:scale-105 ${
                      idx % 2 === 1 ? "border-l border-[#d6d6d6]" : ""
                    } ${
                      idx >= 2 ? "border-t border-[#d6d6d6] sm:border-t-0" : ""
                    } ${
                      idx > 0 ? "sm:border-l sm:border-[#d6d6d6]" : "sm:border-l-0"
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
