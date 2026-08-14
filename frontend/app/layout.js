import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Eco Tashkent — Shahar ekologiyasi va buyumlar almashinuvi",
  description:
    "Kerak bo'lmagan buyumlaringizni bepul bering, almashing yoki xayriya qiling. Yaqiningizdagi qayta ishlash va saralash punktlarini toping.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
