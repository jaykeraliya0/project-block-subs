import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Block Subs",
  description:
    "The BlockSubs smart contract is a decentralized subscription management system implemented on the Ethereum blockchain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",
            },
            success: {
              duration: 2000,
            },
            error: {
              duration: 2000,
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
