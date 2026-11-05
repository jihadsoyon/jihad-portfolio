import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import SplashScreen from "@/components/ui/SplashScreen";
import { site } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.designation}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  keywords: ["MERN Stack", "Next.js", "React", "Node.js", "Portfolio", "Jihad Soyon"],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} | ${site.designation}`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: ["/images/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.designation}`,
    description: site.tagline,
    images: ["/images/og-image.jpg"],
  },
};

// পেজ paint হওয়ার আগেই theme ও ভাষা ঠিক করা, যাতে flash না হয়
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

const langScript = `
(function () {
  try {
    var l = localStorage.getItem('lang');
    if (l === 'bn') {
      var h = document.documentElement;
      h.classList.remove('lang-en');
      h.classList.add('lang-bn');
      h.lang = 'bn';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bengali.variable} lang-en h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SplashScreen>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
          </SplashScreen>
        </ThemeProvider>
      </body>
    </html>
  );
}