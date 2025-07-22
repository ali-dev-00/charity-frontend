"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutHero() {
    return (
        <div className="relative">
            {/* ───────── Hero background ───────── */}
            <section className="bg-[#007466] text-white ">
                <div className="max-w-[1366px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 items-center">
                        {/* Left */}
                        <div className="space-y-6">
                            <p className="text-sm tracking-wider  opacity-80">
                                Your Kindness Can Be Someone's Lifeline
                            </p>

                            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                                Every Act of Giving
                                <br />
                                Creates a Ripple of Change.
                            </h1>
                            <p className="text-sm tracking-wider  opacity-80 max-w-xl">
                                Your donation helps us provide food, shelter, education, and hope to vulnerable communities. Together, we can transform lives and build a brighter future.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="rounded-full px-8 py-6 bg-[#f25f4a] hover:bg-[#f25f4a]/90">
                                    Donate Now
                                </Button>
                                <Button
                                    variant="outline"
                                    className="rounded-full px-8 py-6 border border-white text-white hover:bg-white hover:text-[#007466]"
                                >
                                    Learn More
                                </Button>
                            </div>

                        </div>

                        {/* Right image */}
                        <div className="space-y-6 flex justify-end">
                            
                                <Image
                                    src="/about/cuate.svg"
                                    alt="Children sitting together"
                                    width={200}
                                    height={300}
                                    className="w-full max-h-[400px] "
                                    priority
                                />
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
