// import Link from "next/link";
"use client";
import Menu from "./sidermenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-yellow-100 to-orange-200 min-h-screen flex overflow-x-hidden w-screen h-screen" style={{ overflow: 'hidden', width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
        <Menu />
        <main className="flex-1 flex flex-col items-center justify-center min-w-0 w-full h-full" style={{ width: '100vw', height: '100vh', minWidth: 0, minHeight: 0, margin: 0, padding: 0 }}>
          {children}
        </main>
      </body>
    </html>
  );
}