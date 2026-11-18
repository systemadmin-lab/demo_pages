import { TutorLink } from "./Hero";

export default function MobileTutorBar({ href }: { href: string }) {
  return (
    <div data-mobile-tutor-bar className="fixed inset-x-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-40 tablet:hidden">
      <TutorLink variant="mobile" href={href}>
        Meet your tutor
        <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8v13" />
          <path d="M12 8H8.5A2.5 2.5 0 1 1 11 5.5L12 8Zm0 0h3.5A2.5 2.5 0 1 0 13 5.5L12 8Z" />
        </svg>
      </TutorLink>
    </div>
  );
}
