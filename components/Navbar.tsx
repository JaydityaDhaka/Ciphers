"use client"; // Ensure this component is only rendered on the client side

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const currentPath = usePathname(); // Use usePathname to get the current path

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold font-mono">Ciphers</div>
        <ul className="flex space-x-6">
          <li>
            <Link 
              href="/" 
              className={`text-white hover:text-yellow-400 ${currentPath === '/' ? 'border-b-2 font-mono border-yellow-400 font-bold' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/caesar" 
              className={`text-white hover:text-yellow-400 ${currentPath === '/caesar' ? 'border-b-2 font-mono border-yellow-400 font-bold' : ''}`}
            >
              Caesar Cipher
            </Link>
          </li>
          <li>
            <Link 
              href="/playFair" 
              className={`text-white hover:text-yellow-400 ${currentPath === '/playFair' ? 'border-b-2 font-mono border-yellow-400 font-bold' : ''}`}
            >
              Playfair Cipher
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
