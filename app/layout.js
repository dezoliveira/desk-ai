import { Roboto } from "next/font/google";
import "./globals.css";

// Import bootstrap CSS

import "bootstrap/dist/css/bootstrap.min.css"

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
