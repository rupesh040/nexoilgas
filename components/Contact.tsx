"use client";

import React, { useState } from "react";
import contentData from "@/data/content.json";
import { ContactVariant } from "@/data/type";

interface ContactProps {
  data?: ContactVariant;
}

export default function Contact({ data }: ContactProps) {
  const contactData =
    data ||
    (contentData.NexOilGas.sections.Contact?.variants.NexOilGasContact1 as ContactVariant);

  const {
    tagline = "CONTACT US",
    heading = "Get In Touch With NexOilGas",
    description = "Have a question, partnership opportunity, or a project inquiry?\nWe'd be happy to hear from you.",
    infoItems = [
      {
        icon: "map-pin",
        title: "Our Address",
        detail: "123 Energy Parkway, Houston, TX 77002, USA",
      },
      {
        icon: "mail",
        title: "Email Us",
        detail: "info@nexoilgas.com",
        href: "mailto:info@nexoilgas.com",
      },
      {
        icon: "phone",
        title: "Call Us",
        detail: "+1 (528) 456-7592",
        href: "tel:+15284567592",
      },
    ],
    formTitle = "Send Us a Message",
    formButtonText = "Submit Inquiry",
    inquiryOptions = [
      "Inquiry Type",
      "Offshore Drilling & Exploration",
      "Pipeline Transportation & Logistics",
      "Storage & Distribution",
      "Refining & Chemical Processing",
      "Field Operations & Maintenance",
      "Partnership Opportunity",
    ],
  } = contactData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: inquiryOptions[0] || "Inquiry Type",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const renderInfoIcon = (iconName: string) => {
    switch (iconName) {
      case "map-pin":
        return (
          <svg
            className="w-5 h-5 text-[#ea580c]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        );
      case "mail":
        return (
          <svg
            className="w-5 h-5 text-[#ea580c]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "phone":
        return (
          <svg
            className="w-5 h-5 text-[#ea580c]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-[#ea580c]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  return (
    <section id="contact" className="w-full bg-[#fbfbfb] py-16 sm:py-20 lg:py-28 text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#ea580c] font-black text-sm tracking-widest uppercase">
                {tagline}
              </span>
              <span className="w-12 h-[2.5px] bg-[#ea580c] inline-block" />
            </div>

            <h2 className="text-[#0a192f] font-black text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] leading-[1.14] tracking-tight mb-4">
              {heading}
            </h2>

            <div className="border-l-[3.5px] border-[#ea580c] pl-4 py-0.5 mb-8 sm:mb-10">
              <p className="text-zinc-600 text-sm sm:text-[15px] leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-5 sm:gap-6">
              {infoItems.map((item, idx) => {
                const ItemWrapper = item.href ? "a" : "div";
                return (
                  <ItemWrapper
                    key={idx}
                    href={item.href}
                    className="group flex items-center gap-4 transition-transform duration-300 hover:translate-x-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#ffede0] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                      {renderInfoIcon(item.icon)}
                    </div>
                    <div>
                      <h3 className="text-zinc-900 font-bold text-base leading-tight mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-zinc-600 text-sm leading-normal">
                        {item.detail}
                      </p>
                    </div>
                  </ItemWrapper>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-xl bg-white rounded-3xl border border-zinc-200/90 shadow-[0_12px_45px_rgba(0,0,0,0.06)] p-7 sm:p-9 lg:p-10 transition-all duration-500 hover:shadow-[0_20px_55px_rgba(234,88,12,0.08)]">
              <div className="mb-6 sm:mb-7">
                <h3 className="text-[#0a192f] font-black text-2xl sm:text-[26px] leading-tight">
                  {formTitle}
                </h3>
                <div className="w-12 h-[3.5px] bg-[#ea580c] rounded-full mt-2" />
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-[#ea580c] mb-4 shadow-sm">
                    <svg
                      className="w-8 h-8 stroke-[2.5]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <h4 className="text-[#0a192f] font-bold text-xl mb-2">
                    Inquiry Received!
                  </h4>
                  <p className="text-zinc-600 text-sm max-w-xs mb-6">
                    Thank you for reaching out. A NexOilGas technical specialist will review your message and reply promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        inquiryType: inquiryOptions[0] || "Inquiry Type",
                        message: "",
                      });
                    }}
                    className="text-[#ea580c] font-bold text-sm hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative border border-zinc-200 rounded-xl px-4 py-3 bg-white flex items-center gap-3 transition-all duration-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-orange-500/20">
                    <svg
                      className="w-5 h-5 text-zinc-600 shrink-0 stroke-[1.8]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-600 focus:outline-none"
                    />
                  </div>

                  <div className="relative border border-zinc-200 rounded-xl px-4 py-3 bg-white flex items-center gap-3 transition-all duration-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-orange-500/20">
                    <svg
                      className="w-5 h-5 text-zinc-600 shrink-0 stroke-[1.8]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-600 focus:outline-none"
                    />
                  </div>

                  <div className="relative border border-zinc-200 rounded-xl px-4 py-3 bg-white flex items-center gap-3 transition-all duration-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-orange-500/20">
                    <svg
                      className="w-5 h-5 text-zinc-600 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-600 focus:outline-none"
                    />
                  </div>

                  <div className="relative border border-zinc-200 rounded-xl px-4 py-3 bg-white flex items-center gap-3 transition-all duration-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-orange-500/20">
                    <svg
                      className="w-5 h-5 text-zinc-600 shrink-0 stroke-[1.8]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18h19.5M4.5 18V9.75a7.5 7.5 0 0115 0V18"
                      />
                    </svg>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryType: e.target.value })
                      }
                      className="w-full bg-transparent text-sm text-zinc-700 focus:outline-none appearance-none cursor-pointer"
                    >
                      {inquiryOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="w-4 h-4 text-zinc-600 shrink-0 pointer-events-none stroke-[2]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>

                  <div className="relative border border-zinc-200 rounded-xl px-4 py-3 bg-white flex items-start gap-3 transition-all duration-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-orange-500/20">
                    <svg
                      className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5 stroke-[1.8]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v5.518z"
                      />
                    </svg>
                    <textarea
                      required
                      rows={3}
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-600 focus:outline-none resize-none min-h-[90px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full bg-[#ea580c] hover:bg-orange-600 active:scale-[0.99] text-white font-bold text-base py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    <span>{isSubmitting ? "Sending..." : formButtonText}</span>
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
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
