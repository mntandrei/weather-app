'use client';

import { useRouter } from 'next/navigation';

export default function ButtonSearchAnotherCity() {
    const router = useRouter();
    async function handleback() {
      router.push('/');
    }
  return (
        <button
        onClick={handleback}
        type="button" 
        className="min-w-full p-2 px-6 w-min-full rounded-2xl border-2 border-indigo-400 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-600 active:bg-indigo-800 text-white font-bold transition-colors duration-200 cursor-pointer"
      >
        Search another city
        </button>
  );
}
