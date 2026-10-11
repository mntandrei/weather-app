import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather App ⛅",
  description: "A simple weather app built by Andrei"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
