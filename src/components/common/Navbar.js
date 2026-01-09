import Image from "next/image";
import { HiOutlineMenu, HiX, HiMoon, HiSun } from 'react-icons/hi'
import Link from 'next/link'
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";


export default function Navbar() {
    const { currentUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (

        <nav className="flex flex-wrap items-center justify-between px-4 py-2 dark:bg-black bg-zinc-50 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <div className="flex items-center shrink-0 mr-6">
                <Link href="/employees">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={40}
                        className="bg-zinc-50 dark:invert transition-all duration-300"
                    />
                </Link>
            </div>
            <div className="lg:hidden flex items-center gap-4">                <button onClick={toggleMenu} className="flex items-center px-3 py-2 text-zinc-800 dark:text-zinc-200 border rounded border-zinc-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white">
                {isMenuOpen ? <HiX className="size-6" /> : <HiOutlineMenu className="size-6" />}
            </button>
            </div>


            <div className={`w-full block grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="text-sm lg:grow lg:flex lg:justify-end items-center">
                    <Link href="/attendance" className="block mt-4 lg:inline-block lg:mt-0 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white mr-4 font-medium transition-colors">
                        Attendance
                    </Link>
                    <Link href="/payroll" className="block mt-4 lg:inline-block lg:mt-0 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white mr-4 font-medium transition-colors">
                        Payroll
                    </Link>
                    <Link href="/tasks" className="block mt-4 lg:inline-block lg:mt-0 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white mr-4 font-medium transition-colors">
                        Tasks
                    </Link>

                </div>
            </div>

        </nav>

    );
}