"use client"

import { Phone, Mail, Facebook, Linkedin, Youtube, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";

const socialIcons = [
    { href: "#", Icon: Facebook },
    { href: "#", Icon: Linkedin },
    { href: "#", Icon: Youtube },
    { href: "#", Icon: Instagram },
];
export default function Footer() {
    const handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.currentTarget.style.backgroundColor = "#f25f4a";
        const svg = e.currentTarget.querySelector("svg");
        if (svg) svg.style.color = "#007466";
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
        const svg = e.currentTarget.querySelector("svg");
        if (svg) svg.style.color = "black";
    };
    return (
        <footer className="bg-[#02544A] text-white">
            <div className="max-w-[1366px] mx-auto" >
                <div className="px-6 md:px-12 lg:px-12 pt-8 pb-6 ">
                    <div className="rounded-2xl p-8 bg-[#f25f4a]">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Stay Connected with Us</h2>
                                <p className="text-white/90 text-sm leading-relaxed">
                                    Get impact updates, inspiring stories, and event news—
                                    <br className="hidden sm:block" />
                                    straight to your inbox. No spam, just real change you're part of.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 lg:min-w-[380px]">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-white text-gray-900 border-0 rounded-full px-4 py-5 placeholder:text-gray-500 text-sm"
                                />
                                <Button className="bg-teal-800 hover:bg-teal-900 text-white rounded-full px-6 py-5 font-medium text-sm">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="px-6 md:px-12 lg:px-16 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        {/* Brand and Contact Info */}
                        <div className="lg:col-span-3">
                        <Image src="/logo.svg" height={80} width={150} alt="site logo" className="mb-4" />

                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#f25f4a] rounded-full p-2.5">
                                        <Image src="/home/calling.svg" alt="contact number" width={20} height={20}/>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-300">Contact Us</p>
                                        <p className="font-medium text-sm">(703) 348-9111</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-[#f25f4a] rounded-full p-2.5">
                                       <Image src="/home/clock-circle.svg" alt="email" width={20} height={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-300">Email Us</p>
                                        <p className="font-medium text-sm">aliolad323@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:col-span-2">
                            <h4 className="text-base font-semibold mb-3">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        News
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        Blogs
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Programmes */}
                        <div className="lg:col-span-3">
                            <h4 className="text-base font-semibold mb-3">Programmes</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        Orphan Support
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        School Opening
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        School Building Construction
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        School Enhancement
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        Alumni and Volunteer Engagement
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legals */}
                        <div className="lg:col-span-2">
                            <h4 className="text-base font-semibold mb-3">Legals</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        Terms of Services
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                        Licenses
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="flex gap-2 lg:justify-end">
                                {socialIcons.map(({ href, Icon }, index) => (
                                   <a
                                   key={index}
                                   href={href}
                                   className="bg-white/10 rounded-full p-2 transition-all duration-300 hover:-translate-y-1 hover:text-white"
                                   onMouseEnter={handleMouseEnter}
                                   onMouseLeave={handleMouseLeave}
                                 >
                                   <Icon className="w-4 h-4 text-black transition-colors duration-300" />
                                 </a>
                                 
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-white/10 mt-6 pt-4">
                        <p className="text-center text-xs text-gray-300">
                            © 2025 Ali Olad Foundation. All rights reserved. Under Construction for better ADA compliance.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
