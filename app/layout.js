import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import CommonLayout from "./component/common-layout";
import Loading from "./loading";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Portal App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading/>}>
          <CommonLayout>{children}</CommonLayout>
        </Suspense>
      </body>
    </html>
    </ClerkProvider>
  );
}
