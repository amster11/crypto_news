import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { siteConfig } from "@/config/site";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.logo.wordmark} — регистрация бизнеса и юридические адреса в Москве`,
    template: `%s | ${siteConfig.logo.wordmark}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.logo.wordmark,
  openGraph: { type: "website", locale: siteConfig.locale, siteName: siteConfig.logo.wordmark, images: ["/og.png"] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1628",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.language} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        {/* Enables reveal animations only when JavaScript is available */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 bg-navy-950 px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
      </body>
    </html>
  );
}
