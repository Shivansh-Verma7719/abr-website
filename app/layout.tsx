import type { Metadata } from "next";
import "./globals.css";
import * as React from "react";
import LayoutWrapper from "./layoutWrapper";
import { League_Spartan, Josefin_Sans, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
})
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Ashoka Business Review",
  description: "Welcome to the Ashoka Business Review | Magazine | Monocle",
  metadataBase: new URL('https://ashokabusinessreview.com'),
  openGraph: {
    title: "Ashoka Business Review",
    description: "Welcome to the Ashoka Business Review | Magazine | Monocle",
    url: 'https://ashokabusinessreview.com',
    siteName: 'Ashoka Business Review',
    images: [
      {
        url: '/abr-logo.png',
        width: 1200,
        height: 630,
        alt: 'Ashoka Business Review',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: "Ashoka Business Review",
    description: "Welcome to the Ashoka Business Review | Magazine | Monocle",
    images: ['/abr-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`
    ${leagueSpartan.className} 
    ${josefinSans.className} 
    ${montserrat.className}
    `} suppressHydrationWarning>
      <body className={`antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html >
  );
}
