'use client';

import OnboardingProcess from '@/components/OnboardingProcess';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';

export default function Home() {
  return (
    <main className="relative bg-zinc-950 min-h-screen flex items-center justify-center">
      {/* Background animations */}
      <div className="absolute inset-0 z-10">
        <StarsBackground />
        <ShootingStars />
      </div>

      {/* Onboarding process should be on top */}
      <div className="relative z-10 w-full max-w-7xl">
        <OnboardingProcess />
      </div>
    </main>
  );
}
