
 

import RoleRedirect from "@/components/Admin/RoleRedirect";
import Sidebar from "@/components/Sidebar";
// import { Geist, Geist_Mono } from "next/font/google";
 

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Safar Wanderlust- Group Travel Company",
  description: "Generated by create next app",
};



export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      {/* <RoleRedirect /> */}
      <div className="flex">
          <Sidebar />
          <main className="flex-1 ">{children}</main>
        </div>
      </body>
    </html>
    
  );
}