'use client';

import { useEffect } from "react";
import Link from "next/link"; 

export default function Error({error, reset}: {error: Error, reset: () => void}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-slate-200 to-indigo-500 p-4">
            <div className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/30 w-full max-w-sm backdrop-blur-md shadow-2xl">
                <h2 className="text-3xl font-bold text-red-600 hover:scale-105 transition">Error</h2>
                <p className="text-white text-center mt-2 hover:scale-105 transition">City not found or the server is unavailable.</p>
                <div className="flex gap-2 w-full mt-4">
                    <button 
                        onClick={reset}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-zinc-700 transition cursor-pointer text-sm font-medium hover:scale-105 transition"
                    >
                        Try again
                    </button>
                    
                    <Link 
                        href="/"
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-center text-sm font-medium hover:scale-105 transition"
                    >
                        Search another city
                    </Link>
                </div>
            </div>
        </main>
    );
}
