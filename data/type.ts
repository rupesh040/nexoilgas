// Type definitions for NexOilGas dynamic content schema

export interface NavLink {
  name: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
  children?: NavLink[];
}

export interface HeaderVariant {
  logo: string;
  logoAlt?: string;
  links: NavLink[];
  button: string;
  buttonHref?: string;
}

export interface HeroCtaButton {
  text: string;
  href: string;
}

export interface HeroVariant {
  tagline: string;
  heading: string;
  headingLines?: string[];
  description?: string;
  backgroundImage: string;
  ctaButton?: HeroCtaButton;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutVariant {
  tagline: string;
  heading: string;
  headingPart1?: string;
  headingPart2?: string;
  description: string;
  image: string;
  stats?: AboutStat[];
}

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  href?: string;
  isFeatured?: boolean;
}

export interface ServicesVariant {
  tagline: string;
  taglinePrefix?: string;
  headingPart1?: string;
  headingPart2?: string;
  headingHighlight?: string;
  description: string;
  items: ServiceItem[];
}

export interface WhyChooseUsFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface WhyChooseUsCard {
  title: string;
  description: string;
}

export interface WhyChooseUsVariant {
  tagline: string;
  headingPart1?: string;
  headingPart2?: string;
  headingHighlight?: string;
  description: string;
  image: string;
  features?: WhyChooseUsFeature[];
  overlayCard?: WhyChooseUsCard;
  points?: string[];
}

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  company?: string;
  image: string;
  quote: string;
  rating?: number;
}

export interface TestimonialVariant {
  tagline: string;
  headingPart1?: string;
  headingHighlight?: string;
  heading?: string;
  description: string;
  backgroundImage?: string;
  items: TestimonialItem[];
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  detail: string;
  href?: string;
}

export interface ContactVariant {
  tagline: string;
  heading: string;
  description: string;
  infoItems: ContactInfoItem[];
  formTitle: string;
  formButtonText: string;
  inquiryOptions: string[];
}

export interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

export interface FooterContact {
  address: string;
  phone: string;
  email: string;
}

export interface FooterVariant {
  logo: string;
  logoAlt?: string;
  backgroundImage?: string;
  description: string;
  contact: FooterContact;
  quickLinks: NavLink[];
  socialLinks?: SocialLink[];
  copyright: string;
}

export interface SectionVariantMap {
  Header: {
    variants: Record<string, HeaderVariant>;
  };
  Hero: {
    variants: Record<string, HeroVariant>;
  };
  About?: {
    variants: Record<string, AboutVariant>;
  };
  Services?: {
    variants: Record<string, ServicesVariant>;
  };
  WhyChooseUs?: {
    variants: Record<string, WhyChooseUsVariant>;
  };
  Testimonial?: {
    variants: Record<string, TestimonialVariant>;
  };
  Contact?: {
    variants: Record<string, ContactVariant>;
  };
  Footer?: {
    variants: Record<string, FooterVariant>;
  };
  [key: string]: {
    variants: Record<string, unknown>;
  } | undefined;
}

export interface ComponentConfig {
  key: string;
  component: string;
}

export interface PageConfig {
  components: ComponentConfig[];
  expand?: string;
}

export interface TemplateConfig {
  shared: Record<string, string>;
  pages: Record<string, PageConfig>;
}

export interface BrandContent {
  templateComponents: Record<string, TemplateConfig>;
  sections: SectionVariantMap;
}

export interface ContentData {
  NexOilGas: BrandContent;
  [key: string]: BrandContent | unknown;
}
