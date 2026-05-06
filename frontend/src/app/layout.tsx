import type { Metadata } from "next";
import "./globals.css";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ConfirmProvider } from "@/context/ConfirmContext";
import { AuthProvider } from "@/context/AuthContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Цахим дипломын портал",
    description: "Цахим дипломын портал",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn("font-sans", inter.variable)}>
            <body>
                <ConfirmProvider>
                    <AuthProvider>{children}</AuthProvider>
                </ConfirmProvider>
            </body>
        </html>
    );
}
