"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
    /* form state */
    const [currency, setCurrency] = useState("Currency (USD)");
    const [donationType, setDonationType] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState(2);
    const [category, setCategory] = useState("General");

    const inc = () => setQuantity((q) => q + 1);
    const dec = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <div className="relative">
            {/* ───────── Hero background ───────── */}
            <section className="bg-[#007466] text-white pb-0 lg:pb-32">
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

                            {/* metric + avatars */}
                            <div className=" flex items-center gap-4">
                                <p className="text-lg md:text-sm font-medium max-w-[12rem]">
                                    We have helped over{" "}
                                    <span className="font-bold text-[#f25f4a]">2M+</span>{" "}
                                    people worldwide.
                                </p>

                                <div className="flex -space-x-2">
                                    {[
                                        "/home/hero-people-1.jpg",
                                        "/home/hero-people-2.png",
                                        "/home/hero-people-3.jpg",
                                    ].map((src, i) => (
                                        <div key={i} className="relative w-10 h-10">
                                            <Image
                                                src={src}
                                                alt=""
                                                fill
                                                className="rounded-full object-cover"
                                                sizes="40px"
                                            />
                                            <span className="absolute -bottom-1 right-0 bg-[#01c397] p-[3px] rounded-full">
                                                <svg
                                                    viewBox="0 0 12 12"
                                                    className="w-[7px] h-[7px] text-white"
                                                    fill="currentColor"
                                                >
                                                    <path d="M4.6 8.2 2.4 6l1-1 1.2 1.2L8.5 2 9.6 3.1 4.6 8.2Z" />
                                                </svg>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right image */}
                        <div className="space-y-6">
                            <div className="rounded-2xl overflow-hidden shadow-md">
                                <Image
                                    src="/home/group-sad-kids.svg"
                                    alt="Children sitting together"
                                    width={800}
                                    height={500}
                                    className="w-full h-64 md:h-80 lg:h-[20rem] object-cover"
                                    priority
                                />
                            </div>
                            <p className="text-sm leading-relaxed opacity-90">
                                Your donation helps us provide food, shelter, education, and
                                hope to vulnerable communities. Together, we can transform lives
                                and build a brighter future.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── Donate panel ───────── */}
            <div className="max-w-[1366px] lg:mt-0 mt-5 mx-auto px-4 md:px-8 lg:px-40 translate-y-0 lg:-translate-y-1/2">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    {/* header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                Donate for Orphans
                            </h3>
                            <p className="text-gray-600">
                                Your donation transforms the lives of orphans.
                            </p>
                        </div>
                        <Image
                            src="/home/hands.svg"
                            alt=""
                            width={48}
                            height={48}
                            className="bg-gray-50 rounded-2xl p-2"
                        />
                    </div>

                    {/* rows */}
                    <div className="space-y-6">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SelectPill
                                value={currency}
                                onChange={setCurrency}
                                options={["Currency (USD)", "Currency (EUR)", "Currency (GBP)"]}
                            />
                            <SelectPill
                                value={donationType}
                                onChange={setDonationType}
                                options={[
                                    "I would like to donate to",
                                    "Orphan Support",
                                    "Education",
                                    "Healthcare",
                                    "Emergency Relief",
                                ]}
                            />
                            <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full h-12 rounded-full bg-gray-50 border border-gray-200 pl-4 text-sm font-medium text-gray-700
                           placeholder:text-gray-400 focus:ring-2 focus:ring-[#f25f4a] outline-none"
                            />
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-4">
                                <QuantityPill quantity={quantity} inc={inc} dec={dec} />
                            </div>
                            <div className="md:col-span-5">
                                <SelectPill
                                    value={category}
                                    onChange={setCategory}
                                    options={["General", "Emergency", "Education", "Healthcare"]}
                                />
                            </div>
                            <div className="md:col-span-3">
                                <Button className="w-full h-12 rounded-full bg-[#f25f4a] hover:bg-[#f25f4a]/90 text-white font-semibold">
                                    Donate Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ───── Helper pills ───── */
function SelectPill({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-12 rounded-full bg-gray-50 border border-gray-200 pl-6 pr-10 text-sm font-medium text-gray-700
                   appearance-none focus:ring-2 focus:ring-[#f25f4a] outline-none"
            >
                {options.map((op) => (
                    <option key={op}>{op}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
    );
}

function QuantityPill({
    quantity,
    inc,
    dec,
}: {
    quantity: number;
    inc: () => void;
    dec: () => void;
}) {
    return (
        <div className="flex items-center justify-between w-full h-12 rounded-full bg-gray-50 border border-gray-200 px-6">
            <span className="text-sm text-gray-500">Quantity</span>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={dec}
                    disabled={quantity <= 1}
                    className="text-gray-500 hover:text-gray-700 disabled:opacity-40"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold">{quantity}</span>
                <button
                    type="button"
                    onClick={inc}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
