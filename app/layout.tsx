import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const isDev = process.env.NODE_ENV === "development";
export const ORIGIN_URL = isDev
  ? "http://localhost:3000"
  : `https://${process.env.VERCEL_URL}`;

export const metadata: Metadata = {
  title: "Zhrnuty – AI-Powered PDF Summarizer",
  description:
    "Zhrnuty is an advanced AI tool that instantly summarizes PDFs into concise short notes...",
  metadataBase: new URL(ORIGIN_URL),
  openGraph: {
    images: [{ url: `${ORIGIN_URL}/Zhrnuty.png` }],
  },
  alternates: {
    canonical: ORIGIN_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* If you ever want to add more <meta> tags, wrap them here: */}
        {/* <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head> */}
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main>
              {children}
              <Toaster position="bottom-right" richColors={true} />
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
