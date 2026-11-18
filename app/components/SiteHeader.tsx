import Image from "next/image";
import Link from "next/link";
import { regions, type Region } from "../regions";
import { TutorLink } from "./Hero";
import NavigationMenu from "./NavigationMenu";

export default function SiteHeader({ region = "uk", onDarkBackground = false }: { region?: Region; onDarkBackground?: boolean }) {
  const currentRegion = regions[region];
  const contacts = [
    { ...currentRegion.phone, accessibleLabel: `Call ${currentRegion.phone.label}`, icon: "phone" },
    { ...currentRegion.email, accessibleLabel: currentRegion.email.label, icon: "mail" },
  ];
  const tutorAction = (
    <TutorLink variant="header" href={currentRegion.headerCta.href}>
      {currentRegion.headerCta.label}
    </TutorLink>
  );

  return (
    <header className="sticky top-0 z-30 mx-auto flex min-h-[76px] max-w-full items-center justify-between gap-2 bg-cream px-4 py-3 phone:px-6 tablet:relative tablet:top-auto tablet:z-5 tablet:min-h-[74px] tablet:max-w-[calc(100%-64px)] tablet:gap-8 tablet:bg-transparent tablet:px-2 tablet:pt-2 tablet:pb-[7px] desktop:max-w-[calc(100%-112px)] wide:max-w-[1260px]">
      <Link className="w-[clamp(130px,36vw,194px)] shrink-0 tablet:w-[194px]" href={currentRegion.homeHref} aria-label="MuseCool home">
        <Image
          src="/images/musecool/logo.webp"
          alt="MuseCool"
          width={388}
          height={121}
          loading="eager"
          className="block h-auto w-full"
        />
      </Link>
      <div className={`flex items-center gap-1 text-[15px] font-semibold text-heading tablet:gap-3 desktop:gap-4 ${onDarkBackground ? "tablet:text-white" : ""}`}>
        {contacts.map(({ href, label, accessibleLabel, icon }) => (
          <a
            key={icon}
            className={`inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap hover:text-[#087f9c] tablet:min-h-0 ${onDarkBackground ? "tablet:hover:text-white tablet:hover:underline" : ""}`}
            href={href}
            aria-label={accessibleLabel}
          >
            <span className="grid size-9 place-items-center text-[#ff8700] tablet:size-7 tablet:rounded-full tablet:bg-[#ff8100] tablet:text-white">
              <svg className="size-6 tablet:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {icon === "phone" ? (
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L9 11a16 16 0 0 0 4 4l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
                ) : (
                  <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3 6 9 7 9-7" /></>
                )}
              </svg>
              <Image src={`/homehero/decorations/${icon}.svg`} width={14} height={14} alt="" className="hidden tablet:block" />
            </span>
            <span className="hidden desktop:inline">{label}</span>
          </a>
        ))}
        <a
          href="https://app.musecool.com/"
          className="hidden min-h-10 min-w-10 text-heading hover:text-[#087f9c] items-center justify-center gap-[11px] rounded-[30px] bg-white p-2.5 shadow-[0_7px_18px_#4b342b0c] tablet:flex tablet:min-h-11 tablet:min-w-[117px] tablet:px-[22px] tablet:py-3"
          aria-label="Log in"
        >
          <Image src="/homehero/decorations/user.svg" width={20} height={20} alt="" />
          <span className="hidden tablet:inline">Log In</span>
        </a>
        <div className="hidden tablet:block">{tutorAction}</div>
        <NavigationMenu region={region} tutorAction={tutorAction} onDarkBackground={onDarkBackground} />
      </div>
    </header>
  );
}
