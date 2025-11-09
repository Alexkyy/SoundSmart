import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SoundSmart",
  description: "AI Financial Co-Pilot for Sound Credit Union",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#F4F7FB] text-gray-900" suppressHydrationWarning>
        <nav className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="text-lg font-semibold text-gray-800">SoundSmart</div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/connect" className="hover:text-blue-600 transition">
              Connect
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
          </div>
        </nav>
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}
