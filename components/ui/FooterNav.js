import Link from 'next/link';
import navigation from '@/lib/navigation.json';
import { usePathname } from 'next/navigation';

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row md:space-x-4 py-1 justify-center max-w-3xl m-auto divide-y divide-slate-600 md:divide-none">
      {/* {navigation.main.map(item => {
        const isActive = item.url === pathname; // Determine if the item is active
        const colorClass = isActive ? 'text-gray-100' : 'text-gray-400';
        return (
          <li className="w-full" key={item.url}>
            <Link href={item.url} className={`block md:inline-block ${colorClass} hover:text-gray-100 px-4 py-5 md:py-2 rounded-md text-base text-xl md:text-2xl hover:underline w-full md:text-center`}>
              {item.text}
            </Link>
          </li>
        );
      })} */}
      <li>nav</li>
    </ul>
  );
}
