import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import contentData from "@/data/content.json";
import { BrandContent } from "@/data/type";

export default function Home() {
  const brand = contentData.NexOilGas as BrandContent;
  const headerVariant = brand.sections.Header.variants.NexOilGasHeader1;
  const heroVariant = brand.sections.Hero.variants.NexOilGasHero1;
  const aboutVariant = brand.sections.About?.variants.NexOilGasAbout1;
  const servicesVariant = brand.sections.Services?.variants.NexOilGasServices1;
  const whyChooseUsVariant = brand.sections.WhyChooseUs?.variants.NexOilGasWhyChooseUs1;
  const testimonialVariant = brand.sections.Testimonial?.variants.NexOilGasTestimonial1;
  const contactVariant = brand.sections.Contact?.variants.NexOilGasContact1;
  const footerVariant = brand.sections.Footer?.variants.NexOilGasFooter1;

  return (
    <main className="min-h-screen bg-white">
      <Navbar data={headerVariant} />
      <Hero heroData={heroVariant} />
      <About data={aboutVariant} />
      <Services data={servicesVariant} />
      <WhyChooseUs data={whyChooseUsVariant} />
      <Testimonial data={testimonialVariant} />
      <Contact data={contactVariant} />
      <Footer data={footerVariant} />
    </main>
  );
}
