import Header from "@/components/header";
import "./globals.css";
import JwtRefresher from "@/components/JWTrefresher"; // Импортируем клиентский компонент

export const metadata = {
  title: "Alexander's Digital marketplace",
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
        <JwtRefresher /> {/* Клиентский компонент для работы с токеном */}
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}