import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventory Management",
  description: "The Inventory Management App is a web application that allows users to manage an inventory by adding, updating, and removing items. It provides a user-friendly interface to view and search through inventory items. The app features a modal for adding new items and a search functionality to easily find items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
