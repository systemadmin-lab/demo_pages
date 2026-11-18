"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { regions, type Region } from "../regions";
import { lockBodyScroll } from "./scroll-lock";

const menuGroups = [
  {
    id: "about",
    title: "About Us",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Why Music is Important", href: "/why-music-is-important" },
      { label: "Our Tutors", href: "/our-tutors" },
      { label: "FAQ", href: "/faq" },
      { label: "Prices", href: "/prices" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Teach with Us", href: "https://tutor.musecool.com/" },
      { label: "MusicOnWheels", href: "/musiconwheels" },
    ],
  },
  {
    id: "services",
    title: "What We Do",
    links: [
      { label: "What We Do", href: "/what-we-do" },
      { label: "The Muse for Students", href: "/#the-muse-heading" },
      { label: "The Muse for Tutors", href: null },
      { label: "Private Lessons at Home", href: "/private-lessons-at-home" },
      { label: "Private Lessons Online", href: "/private-lessons-online" },
      { label: "Live Workshops & Concerts", href: "/workshops-concerts" },
      { label: "Online Group Courses", href: "/what-we-do#virtual-group-courses-heading" },
      { label: "ABRSM Exam Training", href: "/abrsm-exam-training" },
      { label: "Events Gallery", href: "/events-gallery" },
    ],
  },
  {
    id: "blog",
    title: "Blog",
    links: [
      { label: "Our Blog", href: "/blog" },
      { label: "Glossary", href: "/glossary" },
      { label: "Podcasts", href: "/podcasts" },
    ],
  },
] as const;

function MenuGroup({ group, region }: { group: (typeof menuGroups)[number]; region: Region }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `navigation-${group.id}-links`;
  const regionalLinks: Record<string, string> = {
    "/about-us": regions[region].aboutHref,
    "/why-music-is-important": regions[region].musicImportanceHref,
    "/our-tutors": regions[region].tutorHref,
    "/testimonials": regions[region].testimonialsHref,
    "/musiconwheels": regions[region].musicOnWheelsHref,
    "/what-we-do": regions[region].whatWeDoHref,
    "/private-lessons-at-home": regions[region].privateLessonsAtHomeHref,
    "/private-lessons-online": regions[region].privateLessonsOnlineHref,
    "/workshops-concerts": regions[region].workshopsConcertsHref,
    "/what-we-do#virtual-group-courses-heading": regions[region].onlineGroupCoursesHref,
    "/abrsm-exam-training": regions[region].abrsmExamTrainingHref,
    "/events-gallery": regions[region].eventsGalleryHref,
    "/blog": regions[region].blogHref,
    "/glossary": regions[region].glossaryHref,
    "/podcasts": regions[region].podcastsHref,
  };

  return (
    <section className="w-full desktop:w-max desktop:max-w-full">
      <h2 className="font-heading text-lg leading-8 font-normal text-[#0e92ba] desktop:mb-4 desktop:border-b desktop:border-[#e5e7eb] desktop:pb-2 desktop:text-center">
        <span className="hidden desktop:block">{group.title}</span>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded(!expanded)}
          className="flex min-h-11 w-full items-center justify-between gap-4 text-left desktop:hidden"
        >
          {group.title}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={`shrink-0 transition-transform motion-reduce:transition-none ${expanded ? "rotate-90" : ""}`}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </h2>
      <ul id={panelId} className={`${expanded ? "block" : "hidden"} mt-2 space-y-1 pb-2 text-[15px] leading-[26px] font-medium desktop:mt-0 desktop:block desktop:space-y-2 desktop:pb-0`}>
        {group.links.map(({ label, href }) => (
          <li key={label}>
            {href ? (
              <Link href={regionalLinks[href] ?? href} className="block py-2 underline-offset-4 hover:text-[#0e92ba] hover:underline desktop:py-0">{label}</Link>
            ) : (
              <span role="link" aria-disabled="true" title="Coming soon" className="block hover:text-[#087f9c] py-2 desktop:py-0">
                {label}<span className="sr-only"> (coming soon)</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NavigationMenu({ tutorAction, region = "uk", onDarkBackground = false }: { tutorAction: ReactNode; region?: Region; onDarkBackground?: boolean }) {
  const currentRegion = regions[region];
  const menuLineClass = `block h-0.5 w-6 bg-[#ff8700] ${onDarkBackground ? "tablet:bg-white" : region === "uk" ? "tablet:bg-heading" : ""}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    return lockBodyScroll();
  }, [isOpen]);

  function openMenu() {
    if (!dialogRef.current || dialogRef.current.open) return;
    dialogRef.current.showModal();
    setIsOpen(true);
    closeRef.current?.focus({ preventScroll: true });
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="site-navigation-dialog"
        onClick={openMenu}
        className="flex size-11 shrink-0 flex-col items-center justify-center gap-1 rounded-md hover:bg-white/40"
      >
        <span className={menuLineClass} />
        <span className={menuLineClass} />
        <span className={menuLineClass} />
      </button>

      <dialog
        ref={dialogRef}
        id="site-navigation-dialog"
        aria-label="Site navigation"
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onClose={() => {
          setIsOpen(false);
          if (!document.querySelector("dialog[open]")) triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget && event.clientY > event.currentTarget.getBoundingClientRect().bottom) closeMenu();
        }}
        className="fixed inset-x-0 top-0 bottom-auto m-0 hidden h-dvh max-h-none w-full max-w-none flex-col overflow-hidden border-0 bg-cream p-0 font-sans font-normal text-[#2b2b2b] shadow-[0_10px_25px_#0000001a] backdrop:bg-black/10 open:flex desktop:h-auto desktop:max-h-[80dvh] desktop:rounded-b-[40px]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 p-5 tablet:p-6">
          <Link href={currentRegion.homeHref} aria-label="MuseCool home" onClick={closeMenu} className="block w-[130px] shrink-0 phone:w-[156px] tablet:w-[162px]">
            <Image src="/images/musecool/logo.webp" alt="MuseCool" width={387} height={120} className="h-auto w-full" />
          </Link>
          <div className="flex items-center gap-2 tablet:gap-4">
            <a href="https://app.musecool.com/" onClick={closeMenu} aria-label="Log in" className="flex min-h-10 min-w-10 hover:text-[#087f9c] items-center justify-center gap-2 rounded-full bg-white p-2 text-[15px] leading-5 font-semibold text-heading shadow-[0_7px_18px_#4b342b0c] tablet:min-h-9 tablet:px-4">
              <Image src="/homehero/decorations/user.svg" alt="" width={20} height={20} />
              <span className="hidden tablet:inline">Log In</span>
            </a>
            <div className="hidden desktop:block" onClick={closeMenu}>{tutorAction}</div>
            <button ref={closeRef} type="button" onClick={closeMenu} aria-label="Close navigation menu" className="flex size-11 shrink-0 items-center justify-center rounded-md text-heading hover:bg-white/40">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <nav
            aria-label="Main navigation"
            onClick={(event) => { if ((event.target as HTMLElement).closest("a[href]")) closeMenu(); }}
            className="mx-auto flex w-full max-w-[1352px] flex-col gap-3 px-6 pt-4 pb-8 desktop:grid desktop:grid-cols-4 desktop:items-start desktop:justify-items-center desktop:gap-8 desktop:p-8"
          >
            <section className="mb-4 self-center desktop:mb-0 desktop:self-start" aria-labelledby="navigation-versions-heading">
              <h2 id="navigation-versions-heading" className="sr-only font-heading text-lg leading-8 font-normal text-[#0e92ba] desktop:not-sr-only desktop:mb-4 desktop:border-b desktop:border-[#e5e7eb] desktop:pb-2">Versions</h2>
              <div className="inline-flex rounded-full border-2 border-[#fed7aa] bg-white p-1 shadow-[0_4px_14px_#0000001a]">
                {(["uk", "us"] as const).map((version) => (
                  <Link
                    key={version}
                    href={regions[version].homeHref}
                    aria-current={region === version ? "page" : undefined}
                    aria-label={version === "uk" ? "United Kingdom version" : "United States version"}
                    className={`flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-[#fdba74] ${region === version ? "bg-[#fed7aa] font-semibold text-[#f97316]" : "font-medium text-heading"}`}
                  >
                    <Image src={`/images/navigation/${version}.svg`} alt="" width={16} height={16} /> {version.toUpperCase()}
                  </Link>
                ))}
              </div>
            </section>
            {menuGroups.map((group) => <MenuGroup key={group.id} group={group} region={region} />)}
          </nav>
          <div className="px-6 pt-2 pb-8 desktop:hidden [&>a]:w-full [&>button]:w-full" onClick={closeMenu}>{tutorAction}</div>
        </div>
      </dialog>
    </>
  );
}
