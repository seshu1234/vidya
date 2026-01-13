"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

const ANIMATION_DURATION = 0.6;
const DELAY_INCREMENT = 0.1;
const HOVER_SCALE = 1.1;
const TAP_SCALE = 0.9;
const BUTTON_HOVER_SCALE = 1.02;
const BUTTON_TAP_SCALE = 0.98;
const DELAY_PRODUCT = DELAY_INCREMENT * 2;
const DELAY_COMPANY = DELAY_INCREMENT * 3;
const DELAY_SUPPORT = DELAY_INCREMENT * 4;
const DELAY_LEGAL = DELAY_INCREMENT * 5;
const DELAY_COPYRIGHT = DELAY_INCREMENT * 6;

type FooterComplexProps = {
  companyName?: string;
  description?: string;
  newsletter?: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  links?: {
    product?: Array<{ name: string; url: string }>;
    company?: Array<{ name: string; url: string }>;
    support?: Array<{ name: string; url: string }>;
    legal?: Array<{ name: string; url: string }>;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    discord?: string;
    youtube?: string;
  };
  copyright?: string;
};

export function Footer({
  companyName = "NextGovJob",
  description = "India's most loved coding platform. Learn specific skills like React, Next.js, and GenAI with interactive lessons and simple Hinglish analogies.",
  newsletter = {
    title: "Stay updated",
    description: "Get the latest tutorials and course updates delivered to your inbox.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
  links = {
    product: [
      { name: "All Courses", url: "/courses" },
      { name: "Web Development", url: "/courses/web-development" },
      { name: "AI & Data Science", url: "/courses/ai-data-science" },
      { name: "Mobile Development", url: "/courses/mobile-development" },
      { name: "Masters Paths", url: "/paths" },
    ],
    company: [
      { name: "About Us", url: "/about" },
      { name: "Success Stories", url: "/testimonials" },
      { name: "Careers", url: "/careers" },
      { name: "Press Kit", url: "/press" },
      { name: "Contact", url: "/contact" },
    ],
    support: [
      { name: "Help Center", url: "/help" },
      { name: "Community", url: "/community" },
      { name: "Status Page", url: "/status" },
      { name: "Report Bug", url: "/help" },
      { name: "Request Feature", url: "/help" },
    ],
    legal: [
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" },
      { name: "Cookie Policy", url: "/cookies" },
      { name: "Refund Policy", url: "/refund" },
    ],
  },
  social = {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    discord: "https://discord.com",
    youtube: "https://youtube.com",
  },
  copyright = "© 2024 Vidya EdTech. All rights reserved.",
}: FooterComplexProps) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-black font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_DURATION }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-5">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: DELAY_INCREMENT,
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-2 font-bold text-xl text-navy-900 dark:text-white mb-6">
                    <div className="h-8 w-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-display font-bold text-lg">
                        NJ
                    </div>
                    {companyName}
                </div>
              <p className="mb-8 max-w-md text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {description}
              </p>

              {/* Newsletter */}
              <div className="mb-8">
                <h4 className="mb-2 font-semibold text-navy-900 dark:text-white text-lg">
                  {newsletter.title}
                </h4>
                <p className="mb-4 text-slate-500 dark:text-slate-400 text-sm">
                  {newsletter.description}
                </p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm placeholder:text-slate-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:border-white dark:focus:ring-white/20"
                    placeholder={newsletter.placeholder}
                    type="email"
                  />
                  <motion.button
                    className="rounded-lg bg-black dark:bg-white px-6 py-2 font-bold text-white dark:text-black text-sm transition-colors hover:bg-slate-800 dark:hover:bg-slate-200"
                    whileHover={{ scale: BUTTON_HOVER_SCALE }}
                    whileTap={{ scale: BUTTON_TAP_SCALE }}
                  >
                    {newsletter.buttonText}
                  </motion.button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                 <SocialIcon href={social.twitter} icon={<Twitter className="h-5 w-5" />} label="Twitter" />
                 <SocialIcon href={social.linkedin} icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
                 <SocialIcon href={social.github} icon={<Github className="h-5 w-5" />} label="GitHub" />
                 <SocialIcon href={social.youtube} icon={<Youtube className="h-5 w-5" />} label="YouTube" />
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-4">
             <LinksGroup title="Courses" links={links.product} delay={DELAY_PRODUCT} />
             <LinksGroup title="Company" links={links.company} delay={DELAY_COMPANY} />
             <LinksGroup title="Support" links={links.support} delay={DELAY_SUPPORT} />
             <LinksGroup title="Legal" links={links.legal} delay={DELAY_LEGAL} />
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: DELAY_COPYRIGHT,
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="text-slate-400 text-sm">{copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon, label }: { href?: string; icon: React.ReactNode; label: string }) {
    if (!href) return null;
    return (
        <motion.a
            aria-label={label}
            className="text-slate-400 transition-colors hover:text-black dark:hover:text-white"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            whileHover={{ scale: HOVER_SCALE }}
            whileTap={{ scale: TAP_SCALE }}
        >
            {icon}
            <span className="sr-only">{label}</span>
        </motion.a>
    );
}

function LinksGroup({ title, links, delay }: { title: string; links?: { name: string; url: string }[]; delay: number }) {
    if (!links) return null;
    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
                duration: ANIMATION_DURATION,
                delay: delay,
            }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <h4 className="mb-4 font-bold text-navy-900 dark:text-white text-sm uppercase tracking-wide">
                {title}
            </h4>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.name}>
                        <a
                            className="text-slate-500 dark:text-slate-400 text-sm transition-colors hover:text-black dark:hover:text-white hover:underline"
                            href={link.url}
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
