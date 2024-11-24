"use client"
import SocialMediaLinks from '@/components/SocialMediaLinks';
import FooterNav from '@/components/ui/FooterNav';
const appName = process.env.NEXT_PUBLIC_SITE_NAME;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto mt-10 bg-gray-700">

      <div className="text-2xl px-4 py-0 md:py-2 mb-10 bg-gray-800 border-t border-t-slate-700">
        <FooterNav />
      </div>

      <div className="flex justify-between items-center flex-col">
        <SocialMediaLinks />
        <div className="text-gray-400 cursor-default text-sm md:text-md mb-10 mt-5">
          © {appName} {currentYear} - All rights reserved
        </div>
      </div>
    </footer>
  )
}
