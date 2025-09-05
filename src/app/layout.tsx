import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buncheong Quest",
  description: "Missions app",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },
  // ⛔ 여기서 themeColor 쓰지 말 것
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9", // ✅ 여기로 이동
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
