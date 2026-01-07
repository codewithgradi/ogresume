import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { FormProvider } from "@/components/FormProvider";

const robotSan = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Resume Builder",
  description: "This is the landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotSan.variable}  antialiased`}
      >
        <main>
          <FormProvider>
            {children}
            </FormProvider>
        </main>
        <Footer/>
      </body>
    </html>
  );
}
