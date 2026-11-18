"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

type Review = {
  id: string;
  author: string;
  quote: string;
  demo?: boolean;
};

// The first three reviews reproduce the supplied screenshot. The remaining six
// are explicitly labelled demo content until the final reviews are supplied.
const reviews: Review[] = [
  {
    id: "anna-j",
    author: "Anna J",
    quote: "A fantastic team, passionate about music, great engaging lessons, prompt emails. My son learnt to see music in an exciting way!’",
  },
  {
    id: "mehlika-r",
    author: "Mehlika R",
    quote: "'I warmly recommend MuseCool for their professionalism, for being flexible and understanding. My daughter is very happy with her teacher and she has made a tremendous progress since starting her piano lessons.'",
  },
  {
    id: "kateryna-s",
    author: "Kateryna S",
    quote: "'This is great value for music learning, as in addition to the private instrumental lessons you get lots of complimentary online courses and various events... I had a blast learning with them!'",
  },
  {
    id: "demo-1",
    author: "Demo parent 1",
    quote: "Our daughter looks forward to her piano lesson every week. Her tutor makes each new piece feel achievable, and it is lovely to hear her practising with a smile.",
    demo: true,
  },
  {
    id: "demo-2",
    author: "Demo student 2",
    quote: "Starting guitar as an adult felt daunting, but the lessons move at a pace that works for me. Clear explanations and small weekly goals have helped me enjoy learning.",
    demo: true,
  },
  {
    id: "demo-3",
    author: "Demo parent 3",
    quote: "Online lessons fit comfortably around our family routine. Our son stays engaged throughout, and his teacher always leaves him with something fun to practise before the next session.",
    demo: true,
  },
  {
    id: "demo-4",
    author: "Demo student 4",
    quote: "I wanted to build my confidence with singing. My tutor listens to my goals and brings a thoughtful mix of technique and songs I love to every lesson.",
    demo: true,
  },
  {
    id: "demo-5",
    author: "Demo parent 5",
    quote: "Having lessons at home makes the week easier to organise. Our child enjoys the patient approach and is becoming more confident reading music and trying new pieces.",
    demo: true,
  },
  {
    id: "demo-6",
    author: "Demo student 6",
    quote: "Returning to the piano after a long break has been a pleasure. The lessons give me structure, encouragement and a clear idea of what to work on next.",
    demo: true,
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full min-h-[300px] flex-col rounded-[20px] border border-[#0e92ba]/24 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] motion-safe:hover:-translate-y-1 tablet:p-6">
      <div
        className="mb-4 flex gap-1 text-[#ff9800]"
        role="img"
        aria-label={review.demo ? "Demo rating: 5 out of 5 stars" : "5 out of 5 stars"}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <svg key={index} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            {/* Original rounded star path from the saved MuseCool homepage. */}
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="mb-5 grow text-base leading-[26px] text-[#525252]">
        <p>{review.quote}</p>
      </blockquote>
      <figcaption className="mt-auto pb-1">
        {review.demo && (
          <span className="mb-1 block text-xs leading-5 font-medium text-[#087f9c]">
            Demo review
          </span>
        )}
        <span className="font-heading text-lg leading-7 text-[#2b2b2b]">{review.author}</span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [pagination, setPagination] = useState({ perPage: 3, page: 0, firstReview: 0 });
  const pageCount = Math.ceil(reviews.length / pagination.perPage);

  const syncPagination = useCallback(() => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    // Read the Tailwind-controlled value so CSS and pagination share breakpoints.
    const styles = getComputedStyle(track);
    const perPage = Number(styles.getPropertyValue("--reviews-per-page"));
    const cardStride = firstCard.getBoundingClientRect().width + parseFloat(styles.columnGap);
    const firstReview = Math.max(0, Math.min(reviews.length - perPage, Math.round(track.scrollLeft / cardStride)));
    const page = Math.min(Math.ceil(reviews.length / perPage) - 1, Math.round(firstReview / perPage));

    setPagination((previous) =>
      previous.perPage === perPage && previous.page === page && previous.firstReview === firstReview
        ? previous
        : { perPage, page, firstReview },
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(syncPagination);
    observer.observe(track);
    track.addEventListener("scroll", syncPagination, { passive: true });

    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", syncPagination);
    };
  }, [syncPagination]);

  function goToPage(page: number) {
    const track = trackRef.current;
    if (!track) return;

    const nextPage = Math.max(0, Math.min(pageCount - 1, page));
    const firstReview = Math.min(nextPage * pagination.perPage, reviews.length - pagination.perPage);
    const card = track.children[firstReview] as HTMLElement;
    const firstCard = track.firstElementChild as HTMLElement;

    track.scrollTo({
      left: card.offsetLeft - firstCard.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLOListElement>) {
    const destinations: Record<string, number> = {
      ArrowLeft: pagination.page - 1,
      ArrowRight: pagination.page + 1,
      Home: 0,
      End: pageCount - 1,
    };

    if (!(event.key in destinations)) return;
    event.preventDefault();
    goToPage(destinations[event.key]);
  }

  return (
    <section
      className="bg-white px-5 pt-10 pb-4 tablet:px-8 tablet:pt-12"
      aria-labelledby="reviews-heading"
      aria-roledescription="carousel"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="reviews-heading"
          className="text-center font-heading text-[30px] leading-[50px] font-normal tracking-[0.2px] text-[#2b2b2b] tablet:text-4xl"
        >
          What our students say
        </h2>
        <p id="reviews-instructions" className="sr-only">
          Use the left and right arrow keys or the page buttons to browse all nine reviews.
        </p>
        <ol
          id="reviews-track"
          ref={trackRef}
          tabIndex={0}
          aria-label="Student reviews"
          aria-describedby="reviews-instructions"
          onKeyDown={handleKeyDown}
          className="relative mt-5 flex snap-x snap-mandatory list-none gap-5 overflow-x-auto overscroll-x-contain py-5 [--reviews-per-page:1] [scrollbar-width:none] tablet:mt-7 tablet:[--reviews-per-page:2] desktop:[--reviews-per-page:3] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <li
              key={review.id}
              className="min-w-0 shrink-0 basis-full snap-start tablet:basis-[calc((100%_-_20px)/2)] desktop:basis-[calc((100%_-_40px)/3)]"
            >
              <ReviewCard review={review} />
            </li>
          ))}
        </ol>
        <div className="mt-6 flex justify-center tablet:mt-8" role="group" aria-label="Review pages">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              key={page}
              type="button"
              className="flex h-11 w-8 items-center justify-center rounded-full"
              aria-label={`Go to reviews page ${page + 1} of ${pageCount}`}
              aria-controls="reviews-track"
              aria-current={pagination.page === page ? "page" : undefined}
              onClick={() => goToPage(page)}
            >
              <span
                className={`size-3 rounded-full transition-[background-color,transform] motion-reduce:transition-none ${pagination.page === page ? "scale-120 bg-[#0e92ba]" : "bg-[#f3f3f3] hover:bg-[#d4eaf1]"}`}
              />
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Reviews {pagination.firstReview + 1}–{Math.min(pagination.firstReview + pagination.perPage, reviews.length)} of {reviews.length}
        </p>
      </div>
    </section>
  );
}
