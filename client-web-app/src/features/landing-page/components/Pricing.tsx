'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '5GB storage',
      'Basic vaults',
      'Limited time capsules (max 3)',
      'Basic Memory Stream',
      'Basic AI tagging',
    ],
    cta: 'Get Started',
    popular: false,
    gradient: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Premium',
    price: '$4-9',
    period: 'per month',
    description: 'For individuals who want more',
    features: [
      'Unlimited storage',
      'Unlimited time capsules',
      'AI restoration, scrapbook, highlight reel',
      'Legacy Mode',
      'Private/hidden vaults',
      'Priority backup & encryption',
      'Advanced Storybooks',
      'High-resolution uploads',
    ],
    cta: 'Start Premium',
    popular: true,
    gradient: 'from-emerald-500 via-cyan-500 to-blue-500',
  },
  {
    name: 'Family Plan',
    price: '$9-14',
    period: 'per month',
    description: 'For families who want to share',
    features: [
      '5-10 family members',
      '1 shared storage pool',
      'Shared AI features',
      'Family Tree Pro',
      'Family Storybook Generator',
      'Multi-vault management',
      'Backup space for older relatives',
      'Everything in Premium',
    ],
    cta: 'Start Family Plan',
    popular: false,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
  },
];

const addOns = [
  'Printed memory books',
  'Extra cloud storage (100GB–2TB)',
  'Premium themes & scrapbook templates',
  'AI-generated "Life Podcast" episodes',
  'Special event capsules (weddings, births, funerals, graduations)',
];

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const addOnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure elements are visible by default
    if (titleRef.current) {
      titleRef.current.style.opacity = '1';
    }
    if (cardsRef.current) {
      Array.from(cardsRef.current.children).forEach((card) => {
        (card as HTMLElement).style.opacity = '1';
      });
    }
    if (addOnsRef.current) {
      Array.from(addOnsRef.current.children).forEach((item) => {
        (item as HTMLElement).style.opacity = '1';
      });
    }

    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Animate pricing cards
      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });

        // Hover animations
        Array.from(cards).forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
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

      // Animate add-ons
      if (addOnsRef.current && addOnsRef.current.children.length > 0) {
        Array.from(addOnsRef.current.children).forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: addOnsRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
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
              Choose Your
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. All plans include secure encryption and privacy protection.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          style={{ opacity: 1 }}
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 glass rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? 'border-white/30 scale-105 md:scale-110 shadow-2xl'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Gradient glow for popular plan */}
              {plan.popular && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} opacity-20 blur-xl -z-10`} />
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${plan.gradient}`}>
                    {plan.price}
                  </span>
                  {plan.period !== 'forever' && (
                    <span className="text-gray-400 text-lg ml-2">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/auth/sign-up" className="w-full">
                <Button
                  className={`w-full py-6 text-lg font-semibold rounded-full transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-emerald-500/50'
                      : 'glass border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Add-On Purchases
          </h3>
          <div
            ref={addOnsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
            style={{ opacity: 1 }}
          >
            {addOns.map((addOn, index) => (
              <div
                key={index}
                className="p-5 glass rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <p className="text-gray-300 flex items-center">
                  <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  {addOn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
