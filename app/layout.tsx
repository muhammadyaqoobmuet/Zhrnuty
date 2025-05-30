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

export const metadata: Metadata = {
  title: "Zhrnuty – AI-Powered PDF Summarizer ",
  description:
    "Zhrnuty is an advanced AI tool that instantly summarizes PDFs into  concise short notes. Perfect for students, professionals, and researchers who want to save time and boost productivity with smart, accurate summaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${fontSans.variable} ${fontSans.variable} font-sans  antialiased`}
        >
          <div className="realtive flex min-h-screen flex-col ">
            <Header />
            <main>
              {children}
              <Toaster  position="bottom-right" richColors={true} />
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
