import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-serif" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
