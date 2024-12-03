// src/app/layout.tsx
import Header from "@/components/header";  // Импортируем Header
import "./globals.css";  // Глобальные стили

export const metadata = {
  title: "Alexander's Digital markerplace",
  description: "Лучшие цифровые товары",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />  {/* Вставляем Header в layout */}
        <main className="pt-20"> {/* Добавляем отступ сверху для основного контента */}
          {children}
        </main>
      </body>
    </html>
  );
}
