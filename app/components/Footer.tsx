"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { footerContent } from "../regions/footer";
import { regions } from "../regions";
import type { Region } from "../regions/types";

const socialLinks = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/share/1BEuHrQ5qR/" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/lycaeummusic/posts/?feedView=all" },
] as const;

function NewsletterForm({ privacyPolicyHref }: { privacyPolicyHref: string }) {
  const [showNotice, setShowNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setShowNotice(true);
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} aria-label="Newsletter signup" className="flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
          <Image
            src="/images/footer/mail-input.svg"
            alt=""
            width={20}
            height={20}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            id="footer-newsletter-email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            aria-describedby={showNotice ? "footer-newsletter-notice" : undefined}
            onChange={() => setShowNotice(false)}
            className="h-12 w-full rounded-xl border-2 border-white bg-[#f3f3f3] pr-3 pl-10 text-sm text-[#545454] placeholder:text-[#858585] focus-visible:outline-white"
          />
        </div>
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-white/10 focus-visible:outline-white tablet:w-16"
        >
          <Image src="/images/footer/subscribe.svg" alt="" width={24} height={24} />
        </button>
      </form>
      <p id="footer-newsletter-notice" role="status" className={showNotice ? "mt-3 text-sm leading-5" : "sr-only"}>
        {showNotice && "Newsletter signup is coming soon. For updates, please email info@musecool.com."}
      </p>
      <p className="mt-5 text-sm leading-5">
        We care about the protection of your data. {" "}
        <a className="text-[#0e92ba] hover:underline" href={privacyPolicyHref}>Read our Privacy Policy</a>.
      </p>
    </div>
  );
}

export default function Footer({ region = "uk" }: { region?: Region }) {
  const content = footerContent[region];
  const currentRegion = regions[region];
  const quickLinks = [
    { label: "Book a Lesson", href: "https://musecool.com/uk/book-a-lesson/" },
    { label: "What We Do", href: currentRegion.whatWeDoHref },
    { label: "Help Getting an Instrument", href: "https://musecool.com/uk/help-getting-an-instrument/" },
    { label: "Privacy Policy", href: currentRegion.privacyPolicyHref },
    { label: "Sitemap", href: "https://musecool.com/uk/sitemap" },
  ];
  const contacts = [
    { icon: "location", label: content.address, href: null },
    { icon: "phone", ...content.phone },
    { icon: "mail", label: "info@musecool.com", href: "mailto:info@musecool.com" },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[#08143a] pt-12 text-white tablet:pt-16 desktop:pt-24">
      <Image
        src="/images/footer/musician.png"
        alt=""
        width={377}
        height={544}
        className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden h-auto w-[377px] -translate-y-1/2 opacity-20 wide:block"
      />

      <div className="mx-auto grid max-w-[1352px] grid-cols-12 gap-x-[30px] gap-y-10 px-5 tablet:px-8 desktop:px-4">
        <div className="col-span-12 tablet:col-span-6 desktop:col-span-5">
          <Link href={content.homeHref} aria-label="MuseCool home" className="block w-fit rounded-sm focus-visible:outline-white">
            <Image src="/images/musecool/logo.webp" alt="MuseCool" width={387} height={120} className="h-auto w-[162px]" />
          </Link>
          <p className="mt-[30px] text-base leading-7 desktop:text-lg">
            {content.description}
          </p>
          <div className="mt-8">
            <h2 className="font-heading text-2xl leading-8 font-normal">Follow Us</h2>
            <ul className="mt-3 flex items-center gap-4">
              {socialLinks.map(({ label, icon, href }) => (
                <li key={icon}>
                  <a
                    href={href}
                    aria-label={`MuseCool on ${label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-6 items-center justify-center rounded-sm transition-opacity hover:opacity-75 focus-visible:outline-white"
                  >
                    <Image src={`/images/footer/${icon}.svg`} alt="" width={24} height={24} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-labelledby="footer-links-heading" className="col-span-12 tablet:col-span-6 desktop:col-span-3">
          <h2 id="footer-links-heading" className="font-heading text-2xl leading-8 font-normal">Quick Links</h2>
          <ul className="mt-6 flex flex-col gap-3 text-base leading-6 font-bold text-[#0e92ba]">
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="inline-block hover:underline focus-visible:outline-white">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-12 tablet:max-w-[560px] desktop:col-span-4 desktop:max-w-none">
          <h2 className="font-heading text-2xl leading-8 font-normal">Newsletter</h2>
          <address className="mt-6 flex flex-col gap-4 text-base leading-7 not-italic desktop:text-lg">
            {contacts.map(({ icon, label, href }) => (
              <div key={icon} className="flex items-start gap-3">
                <Image src={`/images/footer/${icon}.svg`} alt="" width={20} height={20} className="mt-1 shrink-0" />
                {href ? <a href={href} className="break-words hover:underline focus-visible:outline-white">{label}</a> : <p>{label}</p>}
              </div>
            ))}
          </address>
          <NewsletterForm privacyPolicyHref={currentRegion.privacyPolicyHref} />
        </div>
      </div>

      <div className="mx-5 mt-12 max-w-[1352px] border-t border-white px-4 py-8 tablet:mx-8 tablet:mt-16 desktop:mx-auto desktop:mt-[100px]">
        <p className="text-center text-base leading-7 desktop:text-lg">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}
