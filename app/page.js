"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid";
import Marquee from "@/components/magicui/marquee";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { cn } from "@/lib/utils";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const outputRef1 = useRef(null);
  const outputRef2 = useRef(null);
  const outputRef3 = useRef(null);

  const inputRefs = [inputRef1, inputRef2, inputRef3];
  const outputRefs = [outputRef1, outputRef2, outputRef3];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        // User not logged in
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Everything you need to manage your finances
          </h2>
          <BentoGrid className="max-w-4xl mx-auto">
            {featuresData.map((feature, index) => (
              <BentoGridItem
                key={index}
                title={feature.title}
                description={feature.description}
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center">
                    {feature.icon}
                  </div>
                }
                className={index === 3 || index === 6 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">How It Works</h2>
          <div ref={containerRef} className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-10 md:shadow-xl">
            <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-4xl">
              <div className="flex flex-col justify-center gap-2">
                {howItWorksData.inputs.map((item, idx) => (
                  <div key={idx} ref={inputRefs[idx]} className="z-10 flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 w-40">
                    <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{item.title}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <div ref={centerRef} className="z-10 flex flex-col items-center justify-center gap-2 rounded-full border border-violet-200 bg-gradient-to-b from-violet-500 to-indigo-600 p-6 shadow-lg dark:border-violet-800">
                  {howItWorksData.center.icon}
                  <span className="text-sm font-bold text-white text-center">{howItWorksData.center.title}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                {howItWorksData.outputs.map((item, idx) => (
                  <div key={idx} ref={outputRefs[idx]} className="z-10 flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 w-40">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Beams from Inputs to Center */}
            {inputRefs.map((ref, idx) => (
              <AnimatedBeam
                key={`input-${idx}`}
                containerRef={containerRef}
                fromRef={ref}
                toRef={centerRef}
                curvature={20}
                endYOffset={0}
              />
            ))}

            {/* Beams from Center to Outputs */}
            {outputRefs.map((ref, idx) => (
              <AnimatedBeam
                key={`output-${idx}`}
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={ref}
                curvature={20}
                startYOffset={0}
                reverse
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
            What Our Users Say
          </h2>
          <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
            <Marquee pauseOnHover className="[--duration:20s]">
              {testimonialsData.map((testimonial, index) => (
                <Card key={index} className="w-64 p-6 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mx-4">
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of users who are already managing their finances
            smarter with Tracklet
          </p>
          {!user && (
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Start Free Trial
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
