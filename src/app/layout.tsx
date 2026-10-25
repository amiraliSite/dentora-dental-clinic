import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "دنتورا | کلینیک تخصصی دندان‌پزشکی در استانبول — Dentora Dental Clinic",
  description:
    "کلینیک دندان‌پزشکی مدرن دنتورا در استانبول؛ ایمپلنت، ارتودنسی، لمینت، بلیچینگ و طراحی لبخند با تیمی متخصص به سه زبان فارسی، ترکی و عربی. Modern dental clinic in Istanbul with trilingual service (FA / TR / AR).",
  keywords: [
    "کلینیک دندانپزشکی",
    "ایمپلنت استانبول",
    "دندانپزشکی ترکیه",
    "dental clinic istanbul",
    "diş kliniği",
    "عيادة أسنان",
    "Dentora",
  ],
  authors: [{ name: "amiraliSite" }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "Dentora Dental Clinic | کلینیک دندان‌پزشکی دنتورا",
    description: "لبخندی درخشان با تیمی متخصص به سه زبان فارسی، ترکی و عربی در استانبول",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6fdfb" },
    { media: "(prefers-color-scheme: dark)", color: "#101d22" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
