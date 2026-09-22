import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07080c] text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
