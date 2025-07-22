
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Header";
import WhiteHeader from "./WhiteHeader";

export default function HeaderWrapper() {
  const pathname = usePathname();

  return pathname.includes("single-blog") ? <WhiteHeader /> : <Navbar />;
}
