'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure all elements are visible by default
    if (titleRef.current) {
      titleRef.current.style.opacity = '1';
    }
    if (subtitleRef.current) {
      subtitleRef.current.style.opacity = '1';
    }
    if (ctaRef.current) {
      Array.from(ctaRef.current.children).forEach((button) => {
        (button as HTMLElement).style.opacity = '1';
      });
    }

    const ctx = gsap.context(() => {
      // Title animation with split text effect
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
          }
        );
      }

      // CTA buttons with stagger
      if (ctaRef.current && ctaRef.current.children.length > 0) {
        Array.from(ctaRef.current.children).forEach((button, index) => {
          gsap.fromTo(
            button,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: 0.6 + index * 0.15,
              ease: 'back.out(1.7)',
            }
          );
        });
      }

      // Animated mesh background
      if (meshRef.current) {
        gsap.to(meshRef.current, {
          backgroundPosition: '200% 200%',
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      }

      // Floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.to(particles, {
          y: 'random(-100, 100)',
          x: 'random(-50, 50)',
          rotation: 'random(0, 360)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: {
            amount: 2,
            from: 'random',
          },
        });
      }

      // Magnetic effect on buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        buttons.forEach((btn) => {
          btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
              x: x * 0.3,
              y: y * 0.3,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)',
            });
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pb-20 pt-24 md:pt-28"
    >
      {/* Animated mesh gradient background */}
      <div
        ref={meshRef}
        className="absolute inset-0 gradient-mesh opacity-40"
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center">
        <div className="mb-6 mt-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Now available in public beta
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Preserve Your
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
            Most Precious
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
            Memories
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Create time capsules, share with family, and build your digital legacy.
          <br />
          <span className="text-gray-500">All secured with end-to-end encryption.</span>
        </p>

        <div 
          ref={ctaRef} 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 sm:mb-24"
          style={{ opacity: 1 }}
        >
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              className="group text-lg px-8 py-6 bg-white text-black hover:bg-gray-100 transition-all duration-300 rounded-full font-semibold shadow-2xl hover:shadow-emerald-500/50"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 glass border-white/20 text-white hover:bg-white/10 transition-all duration-300 rounded-full font-semibold"
          >
            Watch Demo
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
