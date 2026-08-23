import { Hind_Siliguri, Great_Vibes, Outfit } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Happy Birthday Sristy! 🎂❤️ | A Special Surprise For You",
  description: "A special birthday gift website crafted with love for Sristy.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${greatVibes.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-['Hind_Siliguri',sans-serif] bg-[#0F0824] text-white selection:bg-[#FF6F91] selection:text-white">
        {children}
      </body>
    </html>
  );
}

