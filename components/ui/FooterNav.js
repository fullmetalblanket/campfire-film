import Link from 'next/link';
import navigation from '@/lib/navigation.json';
import { usePathname } from 'next/navigation';
import UserIcon from '@/components/icons/UserIcon';


export default function FooterNav() {
  const pathname = usePathname();

  const getIcon = (path) => {
    switch (path) {
      case 'profile':
        return <UserIcon />;
      // case 'Finalist':
      //   return <Finalist className="w-6 h-6" />;
      // case 'Nomination':
      //   return <Nomination className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <ul className="flex justify-center max-w-3xl m-auto">
      {navigation.main.map(item => {
        const isActive = item.url === pathname; // Determine if the item is active
        const colorClass = isActive ? 'text-gray-100' : 'text-gray-400';
        return (
          <li className="w-full text-center" key={item.url}>
            <Link href={item.url} className={`py-4 flex items-center justify-center ${colorClass} hover:text-gray-100 rounded-md text-base text-xl md:text-2xl hover:underline w-full text-center`}>
              {getIcon(item.text)}
              {/* {item.text} */}
            </Link>
          </li>
        );
      })}
      {/* <li>nav</li> */}
    </ul>
  );
}
