import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans-main",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono-main",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Usmaan Khan (Masterchief) | Backend & Distributed Systems Engineer",
  description:
    "Portfolio of Usmaan Khan — Backend & Systems Software Engineer specializing in Java, C++, Distributed Systems, high-throughput microservices, and competitive programming.",
  keywords: [
    "Backend Engineer",
    "Systems Engineer",
    "Java",
    "C++",
    "Spring Boot",
    "Distributed Systems",
    "Codeforces",
    "Data Structures",
    "Algorithms",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kafka",
  ],
  authors: [{ name: "Usmaan Khan", url: "https://github.com/urfav-masterchief" }],
  openGraph: {
    title: "Usmaan Khan | Backend & Distributed Systems Engineer",
    description:
      "Engineering resilient backend architectures and low-latency systems in Java & C++.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#05070c] text-[#e2e8f0] selection:bg-cyan-500/25 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
