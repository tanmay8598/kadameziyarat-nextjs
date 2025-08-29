import ClientLayout from "./client-layout";
import Script from "next/script";

export const metadata = {
  title: "Kadam-e-Ziyarat | Ground and group packages to Iran, Iraq & Umrah",
  description:
    "Looking for a trusted Ziyarat tour? Kadam-e-Ziyarat offers customized group & ground packages for Iran, Iraq & Umrah. Book now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9723649193676693"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
