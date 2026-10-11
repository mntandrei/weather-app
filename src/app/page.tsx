'use client';

import SearchInput from "./components/SearchInput";
import SearchButton from "./components/SearchButton";
import ThemeToggle from "./components/ThemeToggle";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleSearch(e: any) {
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget);
    const rawCity = formData.get("city") as string;

    if (!rawCity || rawCity.trim() === "") return;

    const cleanCity = rawCity.trim();
    const safeCityURL = encodeURIComponent(cleanCity);
    router.push(`/weather/${safeCityURL}`);
  }

  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-slate-200 to-indigo-500 dark:from-slate-950 dark:to-indigo-950 transition-colors duration-500 p-4">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center bg-white/5 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-3xl p-10 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bold text-white hover:scale-102 transition">Weather App ⛅</h1>
        <form onSubmit={handleSearch} className="flex flex-col gap-3 items-center justify-center w-full max-w-sm">
          <SearchInput />
          <SearchButton />
        </form> 
      </div>
    </main>
  );
}
