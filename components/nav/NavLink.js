import Link from 'next/link';

export default function NavLink({ href, children, mobile = false, className='', onClick }){

  return (
    <Link 
      href={href} 
      className={`px-5 py-3 text-white-800 hover:text-white-400 rounded-md text-sm font-medium 
                ${mobile ? 'block w-full' : ''} 
                ${className}
              `}
      onClick={onClick}
    >
      {children}
    </Link>
  )
};