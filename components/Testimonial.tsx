"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import { TestimonialVariant } from "@/data/type";

interface TestimonialProps {
  data?: TestimonialVariant;
}

export default function Testimonial({ data }: TestimonialProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const testimonialData: TestimonialVariant =
    data ||
    (contentData.NexOilGas.sections.Testimonial?.variants.NexOilGasTestimonial1 as TestimonialVariant);

  const tagline = testimonialData?.tagline || "";
  const heading = testimonialData?.heading || "";
  const headingPart1 =
    testimonialData?.headingPart1 ||
    (heading ? heading.split(" ").slice(0, -1).join(" ") : "");
  const headingHighlight =
    testimonialData?.headingHighlight ||
    (heading ? heading.split(" ").slice(-1).join("") : "");
  const description = testimonialData?.description || "";
  const backgroundImage =
    testimonialData?.backgroundImage || "/testimonial-bg.webp";
  const items = testimonialData?.items || [];

  const totalSlides = Math.max(1, isMobile ? items.length : items.length - 1);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [totalSlides, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`absolute top-0 bottom-0 left-0 w-[22%] md:w-[25%] lg:w-[27%] hidden md:block overflow-hidden pointer-events-none z-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-12"
        }`}
      >
        <div
          className="relative w-full h-full"
          style={{ clipPath: "polygon(0 0, 84% 0, 100% 100%, 0 100%)" }}
        >
          <Image
            src={backgroundImage}
            alt={heading || tagline}
            fill
            sizes="30vw"
            className="object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/25 via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div
            className={`flex items-center justify-center gap-3 mb-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <span className="w-8 h-[2px] bg-zinc-800 rounded-full" />
            <span className="text-[#ea580c] font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase">
              {tagline}
            </span>
            <span className="w-8 h-[2px] bg-zinc-800 rounded-full" />
          </div>

          <h2
            className={`text-[#0a192f] font-black text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {headingPart1}{" "}
            <span className="text-[#ea580c]">{headingHighlight}</span>
          </h2>

          <p
            className={`text-zinc-600 text-sm sm:text-base mt-3 max-w-xl mx-auto transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {description}
          </p>
        </div>

        <div
          className={`relative flex items-center gap-4 sm:gap-6 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)`,
              }}
            >
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="w-full md:w-1/2 shrink-0 px-2.5 sm:px-3 lg:px-4"
                >
                  <div className="group h-full bg-white rounded-3xl border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all duration-500 hover:border-[#ea580c]/50 hover:shadow-[0_16px_45px_rgba(234,88,12,0.12)] hover:-translate-y-2">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <svg
                            className="w-9 h-9 text-zinc-300 group-hover:text-[#ea580c] mb-3 shrink-0 transition-all duration-400 group-hover:scale-110"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>

                          <p className="italic text-zinc-700 text-[13.5px] sm:text-[14px] leading-relaxed font-medium mb-6">
                            &ldquo;{item.quote}&rdquo;
                          </p>
                        </div>

                        <div className="border-l-[3.5px] border-zinc-300 group-hover:border-[#ea580c] pl-3.5 py-0.5 transition-colors duration-400">
                          <h3 className="text-zinc-900 font-extrabold text-base sm:text-[17px] leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-zinc-500 text-xs sm:text-[13px] font-medium leading-tight mt-0.5">
                            {item.role}
                          </p>
                          {item.company && (
                            <p className="text-zinc-500 text-xs sm:text-[13px] font-medium leading-tight">
                              {item.company}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="relative w-36 sm:w-40 md:w-44 aspect-[4/5] rounded-2xl overflow-hidden shrink-0 shadow-sm bg-zinc-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 150px, 200px"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-2.5 shrink-0 ml-1">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Testimonial"
              className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/70 flex items-center justify-center transition-all duration-300 hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] hover:shadow-lg hover:shadow-orange-500/25 hover:scale-110 active:scale-95"
            >
              <svg
                className="w-5 h-5 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Testimonial"
              className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/70 flex items-center justify-center transition-all duration-300 hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] hover:shadow-lg hover:shadow-orange-500/25 hover:scale-110 active:scale-95"
            >
              <svg
                className="w-5 h-5 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-10 sm:mt-12">
          {Array.from({ length: totalSlides }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`rounded-full transition-all duration-400 ease-out ${
                currentIndex === dotIdx
                  ? "w-8 h-2.5 bg-[#ea580c]"
                  : "w-2.5 h-2.5 bg-zinc-300 hover:bg-[#ea580c]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
