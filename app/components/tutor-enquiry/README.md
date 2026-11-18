# Tutor enquiry form

UK and US layouts mount one `TutorEnquiryProvider`. The shared `TutorLink` button opens a lazily loaded native dialog; existing imports from `Hero` continue to work. Ordinary navigation links to the tutor pages remain links.

The four steps collect general information, a student profile, an instrument, and lesson goals. Students aged 15 or older see musical dreams instead of child goals. Prices come from `regions/pricing.ts`; the Postcode / ZIP Code field is optional and accepts free text without format or field-length validation. Drafts and inquiry IDs stay in component memory when closing or going back. Only an anonymous visit identifier is written to local storage.

Submission uses the existing Lycaeum v4 flow through the same-origin `POST /api/tutor-enquiry` route. The API key is hardcoded in `app/api/tutor-enquiry/route.ts`, so no environment-variable setup is required. UK uses upstream `country=uk`; US uses `country=usa` and source `musecool.com/us`.

Opening the modal records an optional anonymous form-open event. Step 1 saves email and lesson preferences; step 2 validates locally; step 3 sends the student profile and instrument to `/inquiry/v4/child`; step 4 sends the goal and optional note to `/inquiry/v4`. The server validates input, applies timeouts, sanitizes errors, and accepts only HTTPS `app.musecool.com` redirect URLs. Requests are not automatically retried. Pending controls prevent duplicate clicks, and failures retain the draft on the current step for an explicit retry.

After the final response, the browser follows the returned authentication URL. The MuseCool app handles authentication and its own session; this site does not store passwords, login tokens or handoff URLs in browser storage. Both desktop and mobile Log In links point to `https://app.musecool.com/`, allowing that app to reuse its existing session. Closing a form during submission postpones the redirect until the form is reopened.

Artwork is reused from the existing MuseCool form, with local WebP photos and SVG illustrations. Modal styles are isolated in the CSS module.

Run the model and API checks with `node --test tests/tutor-enquiry*.test.mjs`. Browser verification should cover both regions, Back/Next, required fields, expanded instruments, focus containment, Escape/backdrop dismissal, pending/error states, menu handoff and narrow screens. Use mocked API responses for routine checks; real submissions create live inquiries.
