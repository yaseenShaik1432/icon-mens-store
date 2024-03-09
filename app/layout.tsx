import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Icon Men's Store",
  description: "The Next Generation Men's Fashion Application",
  category: "Fashion",
  icons: {
    icon: "../public/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-white">
        <div className="min-h-screen h-full">{children}</div>
      </body>
    </html>
  );
}
