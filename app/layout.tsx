import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Lessons in London | MuseCool",
  description: "Learn music with MuseCool. One-to-one music lessons at home or online with professional, DBS-checked tutors.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
