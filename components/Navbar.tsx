"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import contentData from "@/data/content.json";
import { HeaderVariant, NavLink } from "@/data/type";

interface NavbarProps {
  data?: HeaderVariant;
}

export default function Navbar({ data }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = [
        "about",
        "services",
        "why-choose-us",
        "testimonial",
        "contact",
      ];
      const scrollPosition = window.scrollY + 160;

      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      let currentSection = "home";
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
            break;
          }
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        currentSection = "contact";
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerData: HeaderVariant =
    data ||
    (contentData.NexOilGas.sections.Header.variants.NexOilGasHeader1 as HeaderVariant);

  const {
    logo = "/logo.png",
    logoAlt = "NexOilGas Logo",
    links = [],
    button = "Contact Us",
    buttonHref = "#contact",
  } = headerData;

  const isLinkActive = (linkHref: string) => {
    if (linkHref === "/" || linkHref === "#hero") {
      return activeSection === "home" || activeSection === "hero";
    }
    const cleanHref = linkHref.replace("#", "");
    return activeSection === cleanHref;
  };

  const isContactActive = activeSection === "contact";

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.substring(1);
      setActiveSection(targetId);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    } else if (href === "/") {
      setMobileMenuOpen(false);
      setActiveSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-none ${
        isScrolled
          ? "bg-[#042d47]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.3)] py-3 sm:py-3.5"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => handleSmoothScroll(e, "/")}
          className="flex items-center shrink-0 transition-all duration-300 hover:opacity-95"
        >
          <Image
            src={logo}
            alt={logoAlt}
            width={260}
            height={70}
            priority
            className={`h-12 sm:h-14 md:h-15 lg:h-16 w-auto object-contain transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] ${
              isScrolled ? "scale-[0.96]" : "scale-100"
            }`}
          />
        </Link>

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center bg-white rounded-full px-7 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)]"
        >
          <ul className="flex items-center space-x-7 xl:space-x-9 text-[15px] font-semibold text-zinc-900">
            {links.map((link: NavLink) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`group/nav relative py-1 inline-block transition-colors duration-300 hover:text-amber-500 ${
                      active ? "text-amber-500 font-bold" : "text-zinc-800"
                    }`}
                  >
                    <span>{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 rounded-full transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover/nav:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center">
          <Link
            href={buttonHref}
            onClick={(e) => handleSmoothScroll(e, buttonHref)}
            className={`group inline-flex items-center gap-3 font-bold text-sm md:text-base px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
              isContactActive
                ? "bg-amber-400 text-zinc-950 ring-2 ring-amber-400 ring-offset-2 ring-offset-[#042d47] shadow-amber-500/50 scale-105"
                : "bg-amber-500 hover:bg-amber-400 text-zinc-950 hover:shadow-amber-500/40"
            }`}
          >
            <span>{button}</span>
            <span className="w-8 h-8 rounded-full border border-black/40 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105">
              <svg
                className="w-4 h-4 stroke-[2.5]"
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
          </Link>
        </div>

        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white backdrop-blur-md transition-all duration-300"
            aria-label="Toggle Navigation Menu"
          >
            <div
              className={`transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6 stroke-[2]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 stroke-[2]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden bg-[#042d47]/98 backdrop-blur-2xl shadow-2xl ${
          mobileMenuOpen
            ? "max-h-[440px] opacity-100 pt-3 pb-6 pointer-events-auto"
            : "max-h-0 opacity-0 py-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-md mx-auto flex flex-col gap-4 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1.5 py-2">
            {links.map((link: NavLink) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`block py-2.5 px-4 text-left text-base font-semibold rounded-xl border-l-4 transition-all duration-300 ${
                      active
                        ? "text-amber-400 bg-white/10 font-bold border-amber-400"
                        : "text-zinc-100 border-transparent hover:text-amber-400 hover:bg-white/5 hover:border-amber-400/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={buttonHref}
            onClick={(e) => handleSmoothScroll(e, buttonHref)}
            className={`group inline-flex items-center justify-center gap-3 font-bold text-base px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] ${
              isContactActive
                ? "bg-amber-400 text-zinc-950 ring-2 ring-amber-400 ring-offset-2 ring-offset-[#042d47]"
                : "bg-amber-500 hover:bg-amber-400 text-zinc-950"
            }`}
          >
            <span>{button}</span>
            <span className="w-7 h-7 rounded-full border border-black/40 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <svg
                className="w-3.5 h-3.5 stroke-[2.5]"
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
          </Link>
        </div>
      </div>
    </header>
  );
}
