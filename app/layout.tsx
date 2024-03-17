import { ToastContainer } from "react-toastify";
import "./globals.css";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer autoClose={3000} theme="colored" />
      </body>
    </html>
  );
}
