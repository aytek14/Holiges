import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className=" py-6 shadow-md h-full flex px-6 md:px-10 text-white">
      <div className="flex items-center justify-between px-2 md:px-12 w-full">
        <div className="flex items-center gap-4">
          <img src="/image1.jpg" className='rounded-full object-fill w-14 h-14' alt="Wondero Logo" />
          <span className="ml-3 text-4xl font-bold font-nightydemo">Holiges</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/"><div className="hover:text-purple-950">Home</div></Link>
          <Link href="/about"><div className="hover:text-purple-950">About</div></Link>
          <Link href="/tournaments"><div className="hover:text-purple-950">Tournaments</div></Link>
          <Link href="/gallery"><div className="hover:text-purple-950">Gallery</div></Link>
          <Link href="/blogs"><div className="hover:text-purple-950">Blogs</div></Link>
        </nav>
        <div className="hidden md:flex items-center">
          <Link href="/live-streaming">
            <div className="rounded bg-purple-950 px-5 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50">
              START HERE
            </div>
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-950">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
