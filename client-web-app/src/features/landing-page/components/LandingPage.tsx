'use client';

import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { Features } from './Features';
import { Pricing } from './Pricing';
import { Footer } from './Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}

