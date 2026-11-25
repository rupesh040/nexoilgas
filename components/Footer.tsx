
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import contentData from "@/data/content.json";
import { FooterVariant } from "@/data/type";

interface FooterProps {
  data?: FooterVariant;
}

export default function Footer({ data }: FooterProps) {
  const footerData =
    data ||
    (contentData.NexOilGas.sections.Footer?.variants
      .NexOilGasFooter1 as FooterVariant);

  const {
    logo = "/logo.png",
    logoAlt = "NexOilGas Logo",
    backgroundImage = "/footer.png",
    description = "Delivering integrated oil & gas solutions with a focus on safety, efficiency, and sustainable energy operations worldwide.",
    quickLinks = [
      { name: "Home", href: "/" },
      { name: "About Us", href: "#about" },
      { name: "Our Services", href: "#services" },
      { name: "Team", href: "#team" },
      { name: "Testimonials", href: "#testimonial" },
      { name: "FAQs", href: "#faq" },
      { name: "Contact Us", href: "#contact" },
    ],
    contact = {
      email: "info@nexoilgas.com",
      phone: "+1 (528) 456-7592",
      address: "123 Energy Parkway,\nHouston, TX 77002, USA",
    },
    socialLinks = [
      { name: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
      { name: "Facebook", icon: "facebook", href: "https://facebook.com" },
      { name: "Twitter", icon: "x", href: "https://x.com" },
      { name: "Instagram", icon: "instagram", href: "https://instagram.com" },
      { name: "YouTube", icon: "youtube", href: "https://youtube.com" },
    ],
    copyright = "© 2026 NexOilGas. All Rights Reserved. Powered by Lestow",
  } = footerData;

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      const target = document.getElementById(href.substring(1));

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  const renderSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "linkedin":
        return (
          <span className="font-bold text-[19px] leading-none">in</span>
        );

      case "facebook":
        return (
          <span className="font-bold text-[25px] leading-none">f</span>
        );

      case "x":
      case "twitter":
        return (
          <span className="font-medium text-[23px] leading-none">𝕏</span>
        );

      case "instagram":
        return (
          <svg
            className="w-[23px] h-[23px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="18" cy="6" r="0.8" fill="currentColor" />
          </svg>
        );

      case "youtube":
        return (
          <svg
            className="w-[24px] h-[24px]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.5 15.6V8.4l6.3 3.6-6.3 3.6Z" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#00101d] text-white">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Offshore oil and gas platform"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#00101d]/90 via-[#00101d]/75 to-[#00101d]/45" />

        <div className="absolute inset-0 bg-[#00101d]/20" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 lg:pt-[52px] pb-7">

        {/* Main Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1px_0.8fr_1px_1.05fr] gap-9 lg:gap-8 xl:gap-12 items-start">

          {/* Company Information */}
          <div className="flex flex-col items-start">

            <Link
              href="/"
              className="inline-flex items-center mb-4 sm:mb-5"
            >
              <Image
                src={logo}
                alt={logoAlt}
                width={260}
                height={90}
                className="w-[165px] sm:w-[195px] lg:w-[225px] h-auto object-contain object-left"
              />
            </Link>

            <div className="border-l-[6px] border-[#f39200] pl-5 py-1 max-w-[475px]">
              <p className="text-white/95 text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.55] font-normal">
                {description}
              </p>
            </div>

          </div>

          {/* First Vertical Divider */}
          <div className="hidden lg:block w-px h-[250px] bg-gradient-to-b from-white/0 via-white/70 to-white/0" />

          {/* Quick Links */}
          <div className="flex flex-col items-start lg:pl-1">

            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/flame_mark.png"
                alt="NexOilGas"
                width={35}
                height={40}
                className="w-[34px] h-[40px] object-contain"
              />

              <h3 className="text-white text-[25px] sm:text-[28px] font-extrabold tracking-tight whitespace-nowrap">
                Quick Links
              </h3>
            </div>

            <div className="w-[126px] h-[7px] bg-[#f39200] rounded-full mb-3" />

            <ul className="flex flex-col gap-[5px]">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="group flex items-center gap-4 text-white/90 hover:text-[#ff9d00] transition-colors duration-200"
                  >
                    <span className="text-[#f39200] text-[25px] font-black leading-none transition-transform duration-200 group-hover:translate-x-1">
                      ›
                    </span>

                    <span className="text-[17px] sm:text-[19px] lg:text-[20px] leading-tight font-medium">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Second Vertical Divider */}
          <div className="hidden lg:block w-px h-[250px] bg-gradient-to-b from-white/0 via-white/70 to-white/0" />

          {/* Contact Information */}
          <div className="flex flex-col items-start lg:pl-1">

            <div className="flex items-center gap-4 mb-3">

              <svg
                className="w-[37px] h-[37px] text-[#f39200] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12V10a8 8 0 0 1 16 0v2" />
                <rect x="2" y="11" width="4" height="7" rx="2" fill="currentColor" stroke="none" />
                <rect x="18" y="11" width="4" height="7" rx="2" fill="currentColor" stroke="none" />
                <path d="M19 17v1a3 3 0 0 1-3 3h-4" />
              </svg>

              <h3 className="text-white text-[25px] sm:text-[28px] font-extrabold tracking-tight whitespace-nowrap">
                Get In Touch
              </h3>

            </div>

            <div className="w-[115px] h-[7px] bg-[#f39200] rounded-full mb-5" />

            <div className="flex flex-col gap-5 sm:gap-6 w-full">

              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-5 text-white/95 hover:text-[#ff9d00] transition-colors"
              >
                <svg
                  className="w-[36px] h-[32px] text-[#f39200] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="1" />
                  <path d="m3 6 9 7 9-7" />
                </svg>

                <span className="text-[17px] sm:text-[19px] lg:text-[21px] font-medium break-all">
                  {contact.email}
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                className="group flex items-center gap-5 text-white/95 hover:text-[#ff9d00] transition-colors"
              >
                <svg
                  className="w-[36px] h-[34px] text-[#f39200] shrink-0 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z" />
                </svg>

                <span className="text-[17px] sm:text-[19px] lg:text-[21px] font-medium">
                  {contact.phone}
                </span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-5 text-white/95">

                <svg
                  className="w-[36px] h-[42px] text-[#f39200] shrink-0 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a9 9 0 0 0-9 9c0 6.5 9 13 9 13s9-6.5 9-13a9 9 0 0 0-9-9zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>

                <span className="whitespace-pre-line text-[17px] sm:text-[19px] lg:text-[20px] font-medium leading-[1.55]">
                  {contact.address}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Industrial Orange Divider */}
        <div className="w-full mt-12 sm:mt-14 lg:mt-[75px] mb-7 sm:mb-8">

          <svg
            className="w-full h-[36px] sm:h-[42px] overflow-visible"
            viewBox="0 0 1400 42"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 25 H535 L565 42 H835 L865 25 H1400"
              stroke="#f39200"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M580 2 L604 2 L587 38 L563 38 Z
                 M617 2 L641 2 L624 38 L600 38 Z
                 M654 2 L678 2 L661 38 L637 38 Z
                 M691 2 L715 2 L698 38 L674 38 Z
                 M728 2 L752 2 L735 38 L711 38 Z
                 M765 2 L789 2 L772 38 L748 38 Z
                 M802 2 L826 2 L809 38 L785 38 Z"
              fill="#f39200"
            />
          </svg>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/70 pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-5">

          <p className="text-white/90 text-[14px] sm:text-[17px] font-medium text-center sm:text-left">
            {copyright}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">

            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-[42px] h-[42px] sm:w-[49px] sm:h-[49px] rounded-full border-[2px] border-[#f39200] bg-[#00101d]/50 hover:bg-[#f39200] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(243,146,0,0.4)]"
              >
                {renderSocialIcon(social.icon)}
              </a>
            ))}

          </div>

        </div>

      </div>
    </footer>
  );
}
