
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
const ogImageUrl = "https://safarwanderlust.com/assets/svgs/logo/HeroSectionImage.webp";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  description:"Discover unforgettable group travel with Safar Wanderlust.Enjoy curated trips, local culture, and fun activities led by passionate guides. Travel better,together.",
  metadataBase: new URL("https://safarwanderLust.com"),
  keywords: [],
  title: {
    default: "Safar Wanderlust | Personalized Group Travel Adventures",
    template: "%s | Safar Wanderlust",
  },
  twitter: {
    card: "summary_large_image",
    images:[ogImageUrl]
  },
  site:"https://safarwanderlust.com",

alternates: {
  canonical: "https://safarwanderlust.com",
},
  openGraph: {
    title:"Safar Wanderlust | Personalized Group Travel Adventures",
    url:"https://safarwanderlust.com",
    description: "Discover unforgettable group travel with Safar Wanderlust.Enjoy curated trips, local culture, and fun activities led by passionate guides. Travel better,together",
    type:"website",
    images: ogImageUrl,
  },
};





export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <head>

 <script type="application/ld+json"  dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "Safar Wanderlust",
            "url": "https://safarwanderlust.com",
            "logo": "https://safarwanderlust.com/assets/safar_wanderlust_bag_icon-DOgRAhLv.webp",
            "alternateName": "Safar Wanderlust | Personalized Group Travel Adventures",
            "sameAs": [
              "https://www.facebook.com/safarwanderlust/",
              "https://twitter.com/SafarWanderlust/",
              "https://www.instagram.com/safar_wanderlust/",
              "https://in.linkedin.com/company/safar-wanderlust/"
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "075818 15249",
                "contactType": "customer service"
              }
            ]
          }),
        }} />

        <script  type="application/ld+json"  dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Safar Wanderlust",
            "image": "https://safarwanderlust.com/assets/safar_wanderlust_bag_icon-DOgRAhLv.webp",
            "@id": "https://safarwanderlust.com",
            "url": "https://safarwanderlust.com",
            "telephone": "075818 15249",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Upside Singh Photocopy, Ankur Annex, 202, near Nera Satya Sai Square, Vijay Nagar, Scheme no.54, Indore, Madhya Pradesh 452010",
              "addressLocality": "Indore",
              "postalCode": "452010",
              "addressCountry": "IN"
            }
          }),
        }} />

        
      </head>
        
      

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
