import "./globals.css";

export const metadata = {
  title: "Rick & Morty | Сharacters",
  description: "Test app",
  icons: {
    icon: "https://fav-gen.com/public/assets/img/emoji/svg/1f952.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
