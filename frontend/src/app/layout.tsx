import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/font/fonts";


export const metadata: Metadata = {
  title: {
    template: "%s | XupChat",
    default: "XupChat",
  },
  description: "XupChat reimagines group chats with a minimalist design and real-time updates. Designed for small, focused discussions, it offers a responsive UI that works flawlessly on both mobile and desktop.",
  metadataBase: new URL("https://www.google.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
