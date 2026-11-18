import type { Metadata } from "next";
import Home from "../(uk)/home/Home";

export const metadata: Metadata = {
  title: "Halloween Music Lessons | MuseCool",
  description: "A little Halloween magic from MuseCool. Explore one-to-one music lessons at home or online with professional tutors.",
};

export default function HalloweenPage() {
  return <Home season="halloween" />;
}
