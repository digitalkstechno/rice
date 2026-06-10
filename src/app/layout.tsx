import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Rise CRM - Enterprise Rice Export Management",
  description: "Modern enterprise-grade rice export pricing and CRM system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen bg-brand-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
