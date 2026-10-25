"use client";

import { Providers } from "./Providers";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { Services } from "./Services";
import { About } from "./About";
import { Doctors } from "./Doctors";
import { Gallery } from "./Gallery";
import { Testimonials } from "./Testimonials";
import { Booking } from "./Booking";
import { FAQ } from "./FAQ";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { FloatingButtons } from "./FloatingButtons";

export default function DentalSite() {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Stats />
          <Services />
          <About />
          <Doctors />
          <Gallery />
          <Testimonials />
          <Booking />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Providers>
  );
}
