import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Greeting() {
    return (
        <div className="bg-zinc-50 dark:bg-black w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-start justify-center max-w-lg text-left p-8">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={200}
                    height={200}
                    className="bg-zinc-50 dark:invert mb-8"
                />
                <h1
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 ${geistSans.variable} font-sans`}
                >
                    Welcome to Employee Management System
                </h1>
                <p
                    className={`text-lg md:text-xl text-zinc-700 dark:text-zinc-300 ${geistMono.variable} font-mono`}
                >
                    
                </p>
            </div>
        </div>

    );
}