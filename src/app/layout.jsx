import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import RouteProgress from "@/components/ui/RouteProgress";
import SplashScreen from "@/components/ui/SplashScreen";
import SplashStyles from "@/components/ui/SplashStyles";
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

// CSS আসার আগেই background ঠিক থাকে
const criticalCss = `
html { background: #ffffff; color-scheme: light; }
html.dark { background: #0b0f1a; color-scheme: dark; }
`;

// Theme, ভাষা ও splash, তিনটিই paint-এর আগে ঠিক হয়
const initScript = `
(function () {
  try {
    var html = document.documentElement;

    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    html.classList.toggle('dark', t === 'dark');
    html.style.colorScheme = t;

    var l = localStorage.getItem('lang');
    if (l === 'bn') {
      html.classList.remove('lang-en');
      html.classList.add('lang-bn');
      html.lang = 'bn';
    }

    // নতুন tab/window-তে প্রথমবার খুললে splash; reload, back বা পরের page-এ নয়
    var nav = performance.getEntriesByType('navigation')[0];
    var freshVisit = !nav || nav.type === 'navigate';
    var seen = sessionStorage.getItem('splash-seen') === '1';
    if (!freshVisit || seen) html.classList.add('splash-skip');
    sessionStorage.setItem('splash-seen', '1');
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
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <SplashStyles />
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SplashScreen />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
          <RouteProgress />
        </ThemeProvider>
      </body>
    </html>
  );
}