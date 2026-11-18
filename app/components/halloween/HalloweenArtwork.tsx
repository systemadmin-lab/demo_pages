import Image from "next/image";

export function Ghost({ className, sizes = "90px" }: { className?: string; sizes?: string }) {
  return <Image src="/halloween/ghost.png" width={1536} height={1024} alt="" className={className} sizes={sizes} />;
}

export function WitchHat({ className, sizes = "90px" }: { className?: string; sizes?: string }) {
  return <Image src="/halloween/witch-hat.png" width={1536} height={1024} alt="" className={className} sizes={sizes} />;
}

/** Small geometric web and spider, kept away from interactive elements. */
export function Cobweb({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 90 100" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity=".55">
      <path d="M2 2h73M2 2l67 28M2 2l51 51M2 2l28 67M2 2v73M2 21q8-3 17 0 0-10 4-11M2 43q14-8 33-7 0-16 6-17 8-1 8-17M2 65q18-10 25-4 3-18 18-16 0-16 16-18-6-7 4-25" />
      <path d="M53 53v27m-5 5-6-4m6 8-7 2m16-6 6-4m-6 8 7 2" />
    </g>
    <ellipse cx="52.5" cy="86" rx="4.5" ry="6" fill="currentColor" />
  </svg>;
}
