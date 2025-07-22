"use client";

import Image from "next/image";
import DonateForOrphansForm from "../../our-appeals/_components/DonateForOrphansForm";
import { Card, CardContent } from "@/components/ui/card";

export default function ProgramDetailHero() {

    return (
        <div className="relative">
            {/* ───────── Hero background ───────── */}
            <section className="bg-[#007466] text-white ">
                <div className="max-w-[1366px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 items-center">
                        {/* Right image */}
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                                Sponsor an Orphan
                            </h1>
                            <p className="text-sm leading-relaxed opacity-90">
                                Our Orphan Support Program provides vulnerable children with education, healthcare, and emotional care — giving them a safe, dignified path toward a brighter tomorrow.
                            </p>
                            <div className="rounded-2xl overflow-hidden shadow-md">
                                <Image
                                    src="/programs/our-program/our-program-01.svg"
                                    alt="Children sitting together"
                                    width={800}
                                    height={500}
                                    className="w-full h-64 md:h-80 lg:h-[20rem] object-cover object-[center_5%]"
                                    priority
                                />

                            </div>

                        </div>
                        <div className="space-y-6">
                            <Card className="border-gray-200 rounded-3xl h-full bg-white">
                                <CardContent className="px-4 sm:px-6 lg:px-8 flex items-center h-full">
                                    <DonateForOrphansForm />
                                </CardContent>
                            </Card>
                        </div>


                    </div>
                </div>
            </section>


        </div>
    );
}
