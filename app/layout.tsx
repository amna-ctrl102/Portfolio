import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amna Atiq | Full Stack Engineer",
  description:
    "Portfolio of Amna Atiq, a Computer Science student and Full Stack Engineer building scalable web applications, backend services, and AI-powered solutions.",
  icons: {
    icon: [
      {
        url: "/Assests/Favicon.png",
        type: "image/png",
        sizes: "128x128",
      },
    ]
  },
  openGraph: {
    title: "Amna Atiq | Full Stack Engineer",
    description:
      "Portfolio of Amna Atiq, a Computer Science student and Full Stack Engineer building scalable web applications, backend services, and AI-powered solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
