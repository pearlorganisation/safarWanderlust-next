
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/User/Navbar/Navbar";
import StoreProvider from "@/app/storeProvider";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // console.log("Pathname:", pathname);
    // Hide navbar on any admin route
    setShowNavbar(!pathname.startsWith("/admin"));
  }, [pathname]);

  return (
    <StoreProvider>
      {showNavbar && <Navbar />}
      {children}
    </StoreProvider>
  );
}
