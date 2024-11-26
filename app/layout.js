import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from '@/components/AuthProvider';
import ClientWrapper from '@/components/store/ClientWrapper';
import GlobalStateInitializer from '@/components/GlobalStateInitializer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { generateMetadata } from '@/lib/metadataHelper';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = generateMetadata();

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

export const classNames = "bg-gradient-to-br from-orange-500/5 via-orange-400/10 to-amber-300/5 pb-20";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${classNames}`}>
        <AuthProvider>
          <ClientWrapper>
            <GlobalStateInitializer />
            <Header />
            <main>{children}</main>
            <Footer />
          </ClientWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
