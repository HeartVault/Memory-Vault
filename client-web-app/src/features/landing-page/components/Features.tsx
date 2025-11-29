'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Clock,
  Network,
  Shield,
  Activity,
  BookOpen,
  Lock,
  Sparkles,
  Globe,
  Heart
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Users,
    title: 'Family Vaults',
    description: 'Private, invite-only spaces for organizing memories with specific groups. Separate vaults for Immediate Family, Extended Family, Friends, Partner, and Public.',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    icon: Clock,
    title: 'Time Capsules',
    description: 'Digital capsules that unlock at a scheduled future date. Perfect for birthdays, milestones, or legacy messages. Auto-notification when it unlocks.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Network,
    title: 'Family Link System',
    description: 'Visual connection system that links family members across generations. Build a family tree + memory timeline with auto-created shared vaults.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Legacy Mode',
    description: 'Your digital inheritance space for loved ones. Assign legacy contacts, auto-unlock letters and videos, and create a memorial vault.',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    icon: Activity,
    title: 'Memory Stream',
    description: 'A unified timeline of your life in chronological order. Smart search, auto-generated recap reels, and tag by people, places, emotions, and age.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: BookOpen,
    title: 'Shared Storybooks',
    description: 'Automatically generated books from shared memories. Baby books, wedding books, friendship journals, vacation books, and annual recaps.',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Lock,
    title: 'Secure Vault & Encryption',
    description: 'High-trust privacy features with end-to-end encryption, biometric lock, private/hidden vaults, and zero-knowledge storage.',
    gradient: 'from-red-500 to-rose-500',
  },
  {
    icon: Sparkles,
    title: 'AI Memory Tools',
    description: 'AI-powered features to enhance, restore, and organize memories. Auto-tagging, facial recognition, colorize old photos, and generate highlight reels.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Globe,
    title: 'World Memories',
    description: 'A global feed for users who want to share publicly. Short memory posts, life lessons, inspirational moments, and cultural traditions.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Couple & Friendship Capsules',
    description: 'Special vaults dedicated to relationships. Relationship timeline, shared music playlists, anniversary capsules, and friendship milestones.',
    gradient: 'from-pink-500 to-rose-500',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animate cards with stagger and 3D effect
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          rotationX: -15,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        // Hover animations
        Array.from(cards).forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Everything You Need
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              to Preserve Memories
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to help you capture, organize, and share your most precious moments
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 glass rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
