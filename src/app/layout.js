// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
export const metadata = {
  title: "Safar Wanderlust | Personalized Group Travel Adventures",
  description: "Discover unforgettable group travel with Safar Wanderlust. Enjoy curated trips, local culture, and fun activities led by passionate guides. Travel better, together.",
   url:"https://safarwanderlust.com",
   metadataBase: new URL(`https://safarwanderlust.com`),
      alternates: {
        canonical: `https://safarwanderlust.com`,
        languages: {
          "en-US": "/en-US",
          "de-DE": "/de-DE",
        },
      },
openGraph: {
  title: "Safar Wanderlust | Personalized Group Travel Adventures",
  description: "Discover unforgettable group travel with Safar Wanderlust. Enjoy curated trips, local culture, and fun activities led by passionate guides. Travel better, together.",
  images: [
    {
      url: "https://localhost:3000/assets/svgs/logo/HeroSectionImage.webp", 
      width: 1200,
      height: 630,
      alt: "Safar Wanderlust Hero Image",
    }
  ],
},

  twitter: {
    card: "summary_large_image",
  },


};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
    
  );
}
// export default function RootLayout({ children }) {
//   return (
//     // <html lang="en">
//     //   <body
//     //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//     //   >
//     //     <LayoutWrapper>{children}</LayoutWrapper>
//     //   </body>
//     // </html>
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <SessionProviderWrapper> 
//           <LayoutWrapper>{children}</LayoutWrapper>
//         </SessionProviderWrapper>
//       </body>
//     </html>
//   );
// }
