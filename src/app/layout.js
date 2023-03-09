import { Roboto } from "next/font/google";
import "./globals.scss";

export const metadata = {
  title: "Rick & Morty | Сharacters",
  description: "Test app",
  icons: {
    icon: "https://fav-gen.com/public/assets/img/emoji/svg/1f952.svg",
  },
};

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
